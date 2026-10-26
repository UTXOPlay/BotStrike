import http from 'node:http';
import {WebSocketServer,WebSocket} from 'ws';
import {spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
import {randomBytes,timingSafeEqual} from 'node:crypto';
import {mkdirSync,readFileSync,writeFileSync,renameSync,existsSync,statfsSync,openSync,writeSync,closeSync} from 'node:fs';
import path from 'node:path';
import {Worker} from 'node:worker_threads';
import {createReadStream} from 'node:fs';
import {pipeline} from 'node:stream/promises';
import {writeAll} from './io.mjs';
import {collectFeedback} from './feedback.mjs';
import {CareerStore,trackHumanFrame} from './career.mjs';
import {publicState} from './visibility.mjs';
import {pruneReplays} from './retention.mjs';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const spec=JSON.parse(readFileSync(path.join(root,'botstrike/spec.json'),'utf8')),weaponCount=spec.weapons.length,itemCount=spec.items.length;
export const neutral=()=>({seq:0,x:0,y:0,yaw:0,pitch:0,fire:false,reload:false,walk:false,crouch:false,jump:false,ability:false,interact:false,scope:false,item:0});
export function safeInput(value){
 if(!value||typeof value!=='object'||!Number.isInteger(value.seq)||value.seq<0||value.seq>0xffffffff)throw Error('Invalid input sequence');
 for(const k of ['x','y','yaw','pitch'])if(!Number.isFinite(value[k]))throw Error('Invalid aim or movement');
 if(Math.abs(value.x)>1||Math.abs(value.y)>1||Math.abs(value.yaw)>Math.PI+0.001||Math.abs(value.pitch)>1.5)throw Error('Input out of bounds');
 const result={seq:value.seq,x:value.x,y:value.y,yaw:value.yaw,pitch:value.pitch};
 for(const k of ['fire','reload','walk','crouch','jump','ability','interact','scope']){if(typeof value[k]!=='boolean')throw Error('Invalid control');result[k]=value[k];}
 if(!Number.isInteger(value.item)||value.item<0||value.item>=itemCount)throw Error('Invalid utility');result.item=value.item;
 if(value.weapon!==undefined&&value.weapon!==null){if(!Number.isInteger(value.weapon)||value.weapon<0||value.weapon>=weaponCount)throw Error('Invalid weapon');result.weapon=value.weapon;}
 if(value.viewTick!==undefined){if(!Number.isInteger(value.viewTick)||value.viewTick<0||value.viewTick>230400)throw Error('Invalid render tick');result.view_tick=value.viewTick;}
 return result; // takeover, hero, bot flags and purchases are never copied from input packets.
}
export function pack(input){
 if(!input.takeover&&input.hero===undefined&&input.buy===undefined)return null;
 const flags=['fire','reload','walk','crouch','jump','ability','interact','scope','takeover'].reduce((n,key,i)=>n+(input[key]?1<<i:0),0);
 const round=n=>Math.round((n||0)*1e6)/1e6;
 return [input.seq||0,round(input.x),round(input.y),round(input.yaw),round(input.pitch),flags,input.weapon??null,input.buy??null,input.hero??null,input.item||0,input.view_tick??null];
}
export function createBotStrike({secret=process.env.RUNTIME_TOKEN,data=process.env.DATA_DIR||path.join(root,'botstrike-service/data'),assets=process.env.BOTSTRIKE_ASSETS||path.join(root,'release'),maxRooms=4,tickMs=1000/64,queueMs=10000,retentionDays=Number(process.env.REPLAY_RETENTION_DAYS||30),recordWrite=writeAll}={}){
 if(!Number.isFinite(retentionDays)||retentionDays<1)throw Error('Invalid replay retention');
 if(!secret||secret.length<32)throw Error('RUNTIME_TOKEN must contain at least 32 characters');
 for(const name of ['botstrike-engine','myelin-botstrike'])if(!existsSync(path.join(assets,name)))throw Error('Missing artifact '+name);
 const rooms=new Map(),accounts=new Map(),peers=new Map();let sealing=Promise.resolve(),closed=false,draining=false,pruning=false;const creationQuotas=new Map(),metrics={failedRooms:0,sealingJobs:0,lastSealMs:0,expiredReplays:0,recordingErrors:0};
 for(const name of ['rooms','accounts'])mkdirSync(path.join(data,name),{recursive:true,mode:0o700});
 const career=new CareerStore(data);
 const roomDir=id=>path.join(data,'rooms',id);
 function save(file,value){writeFileSync(file+'.tmp',JSON.stringify(value),{mode:0o600});renameSync(file+'.tmp',file);}
 function persist(r){save(path.join(roomDir(r.id),'room.json'),{id:r.id,kind:r.kind,config:r.config,members:r.members,host:r.host,status:r.status,created:r.created,state:r.state,proof:r.proof,error:r.error,selected:r.selected,finishedAt:r.finishedAt,queueDeadline:r.queueDeadline,participants:r.participants,careerCommitted:r.careerCommitted});}
 function bind(account,id){accounts.set(account,id);save(path.join(data,'accounts',account+'.json'),{room:id});}
 function load(id){if(!/^[a-f0-9]{24}$/.test(id||''))return null;if(rooms.has(id))return rooms.get(id);try{const r=JSON.parse(readFileSync(path.join(roomDir(id),'room.json')));if(['running','waiting','sealing'].includes(r.status)){r.status='interrupted';r.error='The server restarted. This incomplete match is not marked verified.';persist(r)}rooms.set(id,r);return r;}catch{return null;}}
 function current(account){if(!accounts.has(account)){try{accounts.set(account,JSON.parse(readFileSync(path.join(data,'accounts',account+'.json'))).room);}catch{accounts.set(account,null)}}return load(accounts.get(account));}
 function view(r,account,afterTick=-Infinity){if(!r)return{room:null};const slot=r.members.indexOf(account);if(slot<0)return{room:null};
 const state=publicState(r.state,slot,spec,r.spectating?.[account]);
 return{room:{id:r.id,kind:r.kind,config:{map:r.config.map,mode:r.config.mode,heroes:r.config.heroes,difficulty:r.config.difficulty},status:r.status,slot,queueDeadline:r.queueDeadline||null,host:account===r.host,roster:r.members.map((id,i)=>({slot:i,name:id.startsWith('bot-')?'BOT '+(i+1):'Pilot '+(i+1),bot:id.startsWith('bot-'),connected:!!peers.get(id)?.size})),state,spectate:r.spectating?.[account]??null,feedback:(r.feedback?.get(account)||[]).filter(e=>e.tick>afterTick),selectedHero:r.selected?.[slot]??r.config.heroes[slot],proof:r.proof||null,error:r.error||null}};}
 function send(ws,v){if(ws.readyState!==WebSocket.OPEN)return;if(ws.bufferedAmount>256000){ws.terminate();return}ws.send(JSON.stringify(v));}
 function deliverState(ws,r,account){const tick=r?.state?.tick||0;send(ws,{type:'state',...view(r,account,ws.feedbackRoom===r?.id?ws.feedbackTick:tick-128)});ws.feedbackRoom=r?.id;ws.feedbackTick=tick;}
 function broadcast(r){if(r.state&&r.sentTicks)for(let slot=0;slot<10;slot++){const list=r.sentTicks[slot];list.push(r.state.tick);while(list.length>24)list.shift();}for(const account of r.members)for(const ws of peers.get(account)||[])deliverState(ws,r,account);}
 function fail(r,message){
  if(r.status==='failed')return;
  clearTimeout(r.timer);clearTimeout(r.queueTimer);clearTimeout(r.watchdog);r.status='failed';r.finishedAt=Date.now();r.error=message;metrics.failedRooms++;
  r.child?.kill();if(r.fd!==undefined){try{closeSync(r.fd);}catch{}delete r.fd;}
  try{persist(r);}catch(error){console.error('Room failure could not persist',r.id,error.code||error.message);}
  try{broadcast(r);}catch(error){console.error('Room failure notification',error.message);}
 }
 function seal(r,result){
  r.status='sealing';clearTimeout(r.watchdog);persist(r);broadcast(r);metrics.sealingJobs++;
  const job=async()=>{const started=performance.now();try{
   const proof=await new Promise((resolve,reject)=>{
    let delivered=false;const worker=new Worker(new URL('./seal-worker.mjs',import.meta.url),{workerData:{directory:roomDir(r.id),assets,room:r.id,players:r.members,result}});
    worker.once('message',value=>{delivered=true;value.error?reject(Error(value.error)):resolve(value.proof);});
    worker.once('error',reject);worker.once('exit',code=>{if(code||!delivered)reject(Error('Replay worker exited without a result: '+code));});
   });
   r.proof=proof;r.status='finished';r.finishedAt=Date.now();persist(r);broadcast(r);try{await career.commit(r);r.careerCommitted=true;persist(r);}catch(error){console.error('Career commit deferred',r.id,error.message);}
  }catch(error){console.error('BotStrike verification',r.id,error.message);fail(r,'The match ended but replay verification failed. No verified result was issued.');}
  finally{metrics.sealingJobs--;metrics.lastSealMs=Math.round(performance.now()-started);}};
  sealing=sealing.then(job,job);
 }
 function start(r){clearTimeout(r.queueTimer);r.queueDeadline=null;r.status='running';r.inputs=Array.from({length:10},(_,slot)=>({...neutral(),yaw:slot<5?0:Math.PI}));r.seen=Array(10).fill(0);r.sentTicks=Array.from({length:10},()=>[]);r.pulses=Array.from({length:10},()=>({}));r.buy=Array(10).fill(null);r.state=null;r.fd=openSync(path.join(roomDir(r.id),'tape.jsonl'),'w',0o600);const header=JSON.stringify({config:r.config})+'\n';writeSync(r.fd,header);r.bytes=Buffer.byteLength(header);persist(r);
 const child=spawn(path.join(assets,'botstrike-engine'),[],{stdio:['pipe','pipe','pipe']});r.child=child;let resultSeen=false,pending=false,deadline=performance.now(),lastBroadcast=-1;child.stdin.on('error',()=>{});child.on('error',()=>fail(r,'The native engine could not start'));child.stderr.on('data',b=>console.error('BotStrike engine',String(b).slice(0,500)));
 const lines=createInterface({input:child.stdout});lines.on('line',line=>{if(r.status==='failed'||closed)return;try{const msg=JSON.parse(line);if(msg.type==='ready'){r.state=msg.state;broadcast(r);step();}else if(msg.type==='frame'){clearTimeout(r.watchdog);pending=false;const previous=r.state,oldPhase=previous?.phase;r.state=msg.state;trackHumanFrame(r,r.state);collectFeedback(r,previous,spec);const tick=r.state.tick;if(tick-lastBroadcast>=2||r.state.events.some(e=>e.kind!=='shot')||r.state.phase!==oldPhase){lastBroadcast=tick;broadcast(r)}
 if(tick%640===0||r.state.phase!==oldPhase)persist(r);
 if(r.state.phase==='finished'){closeSync(r.fd);delete r.fd;child.stdin.end();}else{deadline+=tickMs;if(deadline<performance.now()-250)deadline=performance.now();r.timer=setTimeout(()=>void step(),Math.max(0,deadline-performance.now()));}
 }else if(msg.type==='result'){resultSeen=true;if(!msg.result.completed)throw Error('Incomplete match');seal(r,msg.result)}}catch(e){console.error(e);fail(r,'The native engine returned an invalid match')}});
 child.on('exit',()=>{if(!resultSeen&&r.status==='running'&&!closed)fail(r,'The native engine stopped before match completion')});child.stdin.write(header);
 async function step(){
  if(r.status!=='running'||pending||closed)return;
  if(r.backpressured){r.timer=setTimeout(()=>void step(),10);return;}
  pending=true;
  try {
   const inputs=r.members.map((id,slot)=>{
    const connected=!id.startsWith('bot-')&&peers.get(id)?.size,recent=Date.now()-r.seen[slot]<400;
    // Brief jitter holds neutral controls; a genuinely suspended tab yields to AI.
    const input=connected&&Date.now()-r.seen[slot]<2000?(recent?{...r.inputs[slot],takeover:true}:{...neutral(),seq:r.inputs[slot].seq,yaw:r.inputs[slot].yaw,pitch:r.inputs[slot].pitch,takeover:true}):{};
    if(connected&&recent)Object.assign(input,r.pulses[slot]);r.pulses[slot]={};
    if(input.view_tick!==undefined){const tick=r.state?.tick||0;input.view_tick=Math.max(tick-12,Math.min(tick,input.view_tick));}
    if(r.selected[slot]!==undefined)input.hero=r.selected[slot];
    if(r.buy[slot]!==null){input.buy=r.buy[slot];r.buy[slot]=null;}
    return input;
   });
   r.controlled=inputs.map((input,slot)=>input.takeover&&!r.members[slot].startsWith('bot-')?r.members[slot]:null);
   const line=JSON.stringify({inputs:inputs.map(pack)})+'\n';r.bytes+=Buffer.byteLength(line);
   if(r.bytes>180_000_000)throw Error('Match recording exceeded its safety limit');
   await recordWrite(r.fd,line);
   if(closed||r.status!=='running')return;
   // false means accepted into the stream buffer, not a failed native input.
   if(!child.stdin.write(line)){r.backpressured=true;child.stdin.once('drain',()=>{r.backpressured=false;});}
   r.watchdog=setTimeout(()=>fail(r,'The native engine stopped responding'),10000);
  }catch(error){metrics.recordingErrors++;console.error('Room step failed',r.id,error.code||error.message);fail(r,'Match recording unavailable. This incomplete match is not verified.');}
 }

 }
 function available(account){if(draining)throw Error('Server update in progress. Please try again shortly.');const r=current(account);if(r&&['waiting','running','sealing'].includes(r.status))throw Error('Leave your current match first');if([...rooms.values()].filter(r=>['waiting','running','sealing'].includes(r.status)).length>=maxRooms)throw Error('All servers are busy. Try joining a public match.');const disk=statfsSync(data);if(disk.bavail*disk.bsize<2*1024**3)throw Error('Match storage is temporarily full');}
 function options(b){if(!['deathmatch','demolition'].includes(b.mode)||!Number.isInteger(b.map)||b.map<0||b.map>2||!Number.isInteger(b.hero)||b.hero<0||b.hero>5||!Number.isInteger(b.difficulty)||b.difficulty<0||b.difficulty>2)throw Error('Choose valid mode, map, hero and difficulty');}
 function make(account,b){options(b);available(account);let quota=creationQuotas.get(account);if(!quota||quota.until<Date.now()){quota={count:0,until:Date.now()+3600000};creationQuotas.set(account,quota);}if(++quota.count>20)throw Error('Match creation limit reached.');if(!['practice','public','private'].includes(b.kind))throw Error('Choose a room type');const id=randomBytes(12).toString('hex'),heroes=Array.from({length:10},(_,i)=>i%6);heroes[0]=b.hero;const r={id,kind:b.kind,host:account,status:'waiting',created:Date.now(),members:[account,...Array.from({length:9},(_,i)=>'bot-'+(i+1))],selected:{0:b.hero},config:{map:b.map,mode:b.mode,heroes,bots:Array(10).fill(true),difficulty:b.difficulty,seed:randomBytes(4).readUInt32LE()},state:null};mkdirSync(roomDir(id),{mode:0o700});rooms.set(id,r);bind(account,id);persist(r);if(b.kind==='practice')try{start(r);}catch(error){fail(r,'Unable to start match');throw error;}else if(b.kind==='public'){r.queueDeadline=Date.now()+queueMs;persist(r);r.queueTimer=setTimeout(()=>{try{if(r.status==='waiting'&&r.host)start(r);}catch(error){fail(r,'Unable to start queued match');}},queueMs);}return r;}
 function join(account,r,hero){if(draining)throw Error('Server update in progress.');if(!r||!['waiting','running'].includes(r.status)||r.kind==='practice')throw Error('Room unavailable');if(!Number.isInteger(hero)||hero<0||hero>5)throw Error('Choose a valid hero');const existing=current(account);if(existing&&['waiting','running','sealing'].includes(existing.status))throw Error('Leave your current room first');const teamCounts=[0,0];r.members.forEach((id,i)=>{if(!id.startsWith('bot-'))teamCounts[Math.floor(i/5)]++});const preferred=teamCounts[0]<=teamCounts[1]?0:1;let slot=r.members.findIndex((id,i)=>id.startsWith('bot-')&&Math.floor(i/5)===preferred);if(slot<0)slot=r.members.findIndex(id=>id.startsWith('bot-'));if(slot<0)throw Error('Room is full');r.members[slot]=account;r.selected[slot]=hero;if(r.status==='waiting')r.config.heroes[slot]=hero;bind(account,r.id);persist(r);broadcast(r);if(r.kind==='public'&&r.status==='waiting'&&!r.members.some(id=>id.startsWith('bot-')))try{start(r);}catch(error){fail(r,'Unable to start match');throw error;}return r;}
 function authenticate(req){const a=Buffer.from(req.headers['x-runtime-token']||''),b=Buffer.from(secret),id=req.headers['x-utxoplay-account'];return a.length===b.length&&timingSafeEqual(a,b)&&/^[a-f0-9]{64}$/.test(id||'')?id:null;}
 function input(account,b){const r=current(account);if(!r||r.id!==b.room||r.status!=='running')throw Error('No active match');const slot=r.members.indexOf(account);if(slot<0)throw Error('Not a player');const next=safeInput(b.input);const tick=r.state?.tick||0;if(next.view_tick!==undefined){const oldest=Math.max(0,tick-12),latest=r.sentTicks[slot].at(-1)??tick;next.view_tick=Math.max(oldest,Math.min(latest,next.view_tick));}if(next.seq>r.inputs[slot].seq){for(const key of ['fire','reload','jump','ability'])if(next[key]&&!r.inputs[slot][key])r.pulses[slot][key]=true;if(next.item&&next.item!==r.inputs[slot].item)r.pulses[slot].item=next.item;r.inputs[slot]=next;r.seen[slot]=Date.now();}}
 const server=http.createServer(async(req,res)=>{const reply=(status,v)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(v));};const account=authenticate(req);if(!account)return reply(403,{error:'Forbidden'});try{
 if(req.method==='GET'&&['/api/health','/api/metrics'].includes(req.url)){const disk=statfsSync(data);return reply(200,{ok:!closed,draining,rooms:[...rooms.values()].reduce((counts,r)=>(counts[r.status]=(counts[r.status]||0)+1,counts),{}),diskAvailableBytes:disk.bavail*disk.bsize,retentionDays,...metrics});}
 if(req.method==='POST'&&req.url==='/api/admin/drain'){draining=true;return reply(200,{draining:true});}
 if(req.method==='GET'&&req.url==='/api/career')return reply(200,await career.view(account));
 if(req.method==='GET'&&req.url==='/api/state')return reply(200,view(current(account),account));
 if(req.method==='GET'&&req.url==='/api/export'){const r=current(account);if(!r||r.status!=='finished'||!r.proof?.verified)return reply(409,{error:'Finish a verified match before exporting'});res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});await pipeline(createReadStream(path.join(roomDir(r.id),'export.json')),res);return;}
 if(req.method!=='POST'||req.url!=='/api/action')return reply(404,{error:'Unknown endpoint'});let raw='';for await(const chunk of req){raw+=chunk;if(raw.length>4096)return reply(413,{error:'Request too large'})}const b=JSON.parse(raw);let r=current(account);
 if(b.type==='create')r=make(account,b);
 else if(b.type==='queue'){options(b);const match=[...rooms.values()].find(r=>r.kind==='public'&&['waiting','running'].includes(r.status)&&r.config.mode===b.mode&&r.config.map===b.map&&r.config.difficulty===b.difficulty&&(r.status==='waiting'||r.state?.tick<64*60)&&r.members.some(id=>id.startsWith('bot-')));r=match?join(account,match,b.hero):make(account,{...b,kind:'public'});}
 else if(b.type==='join')r=join(account,load(b.room),b.hero);
 else if(b.type==='start'){if(draining)throw Error('Server update in progress.');if(!r||r.kind==='public'||r.host!==account||r.status!=='waiting')throw Error('Only the host can start this lobby');try{start(r);}catch(error){fail(r,'Unable to start match');throw error;}}
 else if(b.type==='buy'){if(!r||r.status!=='running'||r.state?.phase!=='buy'||!Number.isInteger(b.item)||b.item<0||b.item>=weaponCount+itemCount)throw Error('Purchases are available during buy time');r.buy[r.members.indexOf(account)]=b.item;}
 else if(b.type==='spectate'){const self=r?.state?.players[r.members.indexOf(account)],target=r?.state?.players[b.slot];if(!self||self.alive||!Number.isInteger(b.slot)||!target?.alive||target.team!==self.team)throw Error('Choose a living teammate while spectating');r.spectating??={};r.spectating[account]=b.slot;}
 else if(b.type==='hero'){if(!r||!['waiting','running'].includes(r.status)||!Number.isInteger(b.hero)||b.hero<0||b.hero>5)throw Error('Invalid hero');const slot=r.members.indexOf(account);r.selected[slot]=b.hero;if(r.status==='waiting')r.config.heroes[slot]=b.hero;persist(r);}
 else if(b.type==='leave'){if(r&&['running','waiting'].includes(r.status)){const slot=r.members.indexOf(account);r.members[slot]='bot-'+slot;delete r.selected[slot];if(r.inputs)r.inputs[slot]=neutral();if(r.host===account)r.host=r.members.find(id=>!id.startsWith('bot-'))||null;if(r.status==='waiting'&&!r.host)r.status='cancelled';persist(r);broadcast(r)}bind(account,null);r=null;}
 else if(b.type==='input')input(account,b);
 else throw Error('Unknown action');if(r)broadcast(r);reply(200,view(r,account));
 }catch(e){if(res.headersSent){res.destroy();return;}reply(400,{error:e.message||'Request failed'})}});
 const sockets=new WebSocketServer({noServer:true,maxPayload:4096,perMessageDeflate:false});server.on('upgrade',(req,socket,head)=>{socket.on('error',()=>socket.destroy());const account=authenticate(req);if(!account||req.url!=='/api/socket'||sockets.clients.size>=160||(peers.get(account)?.size||0)>=3){socket.end('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n');return}sockets.handleUpgrade(req,socket,head,ws=>{const set=peers.get(account)||new Set();set.add(ws);peers.set(account,set);let since=Date.now(),count=0;ws.alive=true;ws.on('pong',()=>ws.alive=true);ws.on('error',()=>ws.terminate());ws.on('close',()=>{set.delete(ws);if(!set.size)peers.delete(account)});ws.on('message',(raw,binary)=>{if(Date.now()-since>=1000){since=Date.now();count=0}if(binary||++count>100){ws.close(1008,'Input limit');return}try{const b=JSON.parse(raw);if(b.type==='ping'&&Number.isFinite(b.time))send(ws,{type:'pong',time:b.time});else if(b.type==='input')input(account,b);else throw Error('Unknown realtime command')}catch(e){send(ws,{type:'error',error:e.message})}});deliverState(ws,current(account),account);});});
 async function prune(){if(pruning||closed)return;pruning=true;try{await career.recover();const protectedRooms=new Set([...rooms.values()].filter(r=>['waiting','running','sealing'].includes(r.status)).map(r=>r.id));const removed=await pruneReplays(data,{days:retentionDays,protectedRooms});metrics.expiredReplays+=removed.length;for(const id of removed){rooms.delete(id);for(const [account,room]of accounts)if(room===id)accounts.delete(account);}}catch(error){console.error('Replay retention',error.message);}finally{pruning=false;}}
 const retentionTimer=setInterval(()=>void prune(),3600000);retentionTimer.unref();void prune();
 const heartbeat=setInterval(()=>{
  for(const ws of sockets.clients){if(!ws.alive){ws.terminate();continue;}ws.alive=false;ws.ping();}
  for(const r of rooms.values())try{if(r.status==='waiting'&&Date.now()-r.created>600000){clearTimeout(r.queueTimer);r.status='expired';r.finishedAt=Date.now();persist(r);broadcast(r);}if(!['waiting','running','sealing'].includes(r.status)&&Date.now()-(r.finishedAt||r.created)>3600000)rooms.delete(r.id);}catch(error){fail(r,'Room maintenance failed');}
  for(const [id,quota]of creationQuotas)if(quota.until<Date.now())creationQuotas.delete(id);
 },15000);heartbeat.unref();
 server.requestTimeout=5000;server.headersTimeout=5000;
 async function close(){closed=true;clearInterval(heartbeat);clearInterval(retentionTimer);for(const r of rooms.values()){clearTimeout(r.timer);clearTimeout(r.queueTimer);clearTimeout(r.watchdog);r.child?.kill();if(r.fd!==undefined){try{closeSync(r.fd);}catch{}delete r.fd;}}for(const ws of sockets.clients)ws.terminate();await new Promise(resolve=>server.close(resolve));}
 return{server,close,rooms,metrics,prune};
}
if(process.argv[1]===fileURLToPath(import.meta.url)){const service=createBotStrike();service.server.listen(Number(process.env.PORT||8785),process.env.BIND||'127.0.0.1',()=>console.log('BotStrike 2050 room service ready'));for(const s of ['SIGINT','SIGTERM'])process.on(s,()=>service.close().then(()=>process.exit(0)));}
