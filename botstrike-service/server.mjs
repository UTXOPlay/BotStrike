import http from 'node:http';
import {isTactical,tacticalOptions,lobbyHeroes,requireTacticalStart,bindPurchase} from './tactical.mjs';
import {WebSocketServer,WebSocket} from 'ws';
import {spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
import {randomBytes,timingSafeEqual} from 'node:crypto';
import {mkdirSync,readFileSync,writeFileSync,renameSync,existsSync,statfsSync,openSync,writeSync,closeSync,ftruncateSync} from 'node:fs';
import path from 'node:path';
import {Worker} from 'node:worker_threads';
import {createReadStream} from 'node:fs';
import {pipeline} from 'node:stream/promises';
import {writeAll} from './io.mjs';
import {collectFeedback} from './feedback.mjs';
import {communicationCommand} from './communications.mjs';
import {CareerStore,trackHumanFrame} from './career.mjs';
import {publicState} from './visibility.mjs';
import {pruneReplays} from './retention.mjs';
import {QualityStore,QUALITY_METRICS,QUALITY_COHORTS} from './quality.mjs';
import {RuntimeResourceSampler} from './quality-resources.mjs';
import {ingestQualityReport,takeQualityReport,ingestGatewayReport,takeGatewayReport} from './quality-report.mjs';
import {ViewHistory} from './view-history.mjs';
import {DeliveryReceipts,DELIVERY_RECEIPT_VERSION,DELIVERY_RECEIPT_MAX_AGE_MS} from './delivery-receipts.mjs';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const spec=JSON.parse(readFileSync(path.join(root,'botstrike/spec.json'),'utf8')),weaponCount=spec.weapons.length,itemCount=spec.items.length;
export const neutral=()=>({seq:0,x:0,y:0,yaw:0,pitch:0,fire:false,reload:false,walk:false,crouch:false,jump:false,ability:false,interact:false,scope:false,drop:false,item:0,practice:0,throw_mode:0,preview_item:0});
export function gatewayProcessId(value){const text=typeof value==='number'?String(value):value;if(typeof text!=='string'||!/^[1-9][0-9]{0,9}$/.test(text))return null;const pid=Number(text);return Number.isSafeInteger(pid)&&pid<=2147483647?pid:null;}
export function safeInput(value){
 if(!value||typeof value!=='object'||!Number.isInteger(value.seq)||value.seq<0||value.seq>0xffffffff)throw Error('Invalid input sequence');
 for(const k of ['x','y','yaw','pitch'])if(!Number.isFinite(value[k]))throw Error('Invalid aim or movement');
 if(Math.abs(value.x)>1||Math.abs(value.y)>1||Math.abs(value.yaw)>Math.PI+0.001||Math.abs(value.pitch)>1.5)throw Error('Input out of bounds');
 const result={seq:value.seq,x:value.x,y:value.y,yaw:value.yaw,pitch:value.pitch};
 for(const k of ['fire','reload','walk','crouch','jump','ability','interact','scope']){if(typeof value[k]!=='boolean')throw Error('Invalid control');result[k]=value[k];}
 if(value.drop!==undefined&&typeof value.drop!=='boolean')throw Error('Invalid drop control');result.drop=value.drop??false;
 if(value.action_life!==undefined){if(!Number.isInteger(value.action_life)||value.action_life<1||value.action_life>31)throw Error('Invalid action life');result.action_life=value.action_life;}
 if(!Number.isInteger(value.item)||value.item<0||value.item>=itemCount)throw Error('Invalid utility');result.item=value.item;
 if(value.weapon!==undefined&&value.weapon!==null){if(!Number.isInteger(value.weapon)||value.weapon<0||value.weapon>=weaponCount)throw Error('Invalid weapon');result.weapon=value.weapon;}
 if(value.viewTick!==undefined){if(!Number.isInteger(value.viewTick)||value.viewTick<0||value.viewTick>230400)throw Error('Invalid render tick');result.view_tick=value.viewTick;}
 if(value.preview_item!==undefined){if(!Number.isInteger(value.preview_item)||value.preview_item<0||value.preview_item>=itemCount)throw Error('Invalid preview equipment');result.preview_item=value.preview_item;}
 if(value.throw_mode!==undefined){if(!Number.isInteger(value.throw_mode)||value.throw_mode<0||value.throw_mode>2)throw Error('Invalid throw mode');result.throw_mode=value.throw_mode;}
 if(value.practice!==undefined){if(!Number.isInteger(value.practice)||value.practice<0||value.practice>8)throw Error('Invalid practice command');result.practice=value.practice;}
 return result; // takeover, hero, bot flags and purchases are never copied from input packets.
}
export function pack(input){
 if(!input.takeover&&input.hero===undefined&&input.buy===undefined)return null;
 const flags=['fire','reload','walk','crouch','jump','ability','interact','scope','takeover','drop'].reduce((n,key,i)=>n+(input[key]?1<<i:0),0)+((input.action_life||0)<<10);
 const round=n=>Math.round((n||0)*1e6)/1e6;
 const packed=[input.seq||0,round(input.x),round(input.y),round(input.yaw),round(input.pitch),flags,input.weapon??null,input.buy??null,input.hero??null,input.item||0,input.view_tick??null];
 const release=(input.throw_mode||0)+3*(input.preview_item||0);
 if(input.practice||release)packed.push(input.practice||0);
 if(release)packed.push(release);
 return packed;
}
export function practiceOptions(b){
 if(b.drill===undefined)return null;
 if(b.kind!=='practice'||!Number.isInteger(b.drill)||b.drill<0||b.drill>7)throw Error('Choose a valid solo drill');
 const settings={drill:b.drill,distance:b.distance??1,target_hero:b.targetHero??0,moving:b.moving??false,combat_map:b.map,armor:b.armor??0};
 if(!Number.isInteger(settings.distance)||settings.distance<0||settings.distance>3||!Number.isInteger(settings.target_hero)||settings.target_hero<0||settings.target_hero>5||typeof settings.moving!=='boolean'||!Number.isInteger(settings.armor)||settings.armor<0||settings.armor>2)throw Error('Choose valid range settings');
 return settings;
}
export function createBotStrike({secret=process.env.RUNTIME_TOKEN,data=process.env.DATA_DIR||path.join(root,'botstrike-service/data'),assets=process.env.BOTSTRIKE_ASSETS||path.join(root,'release'),maxRooms=4,tickMs=1000/64,queueMs=10000,heartbeatMs=5000,retentionDays=Number(process.env.REPLAY_RETENTION_DAYS||30),recordWrite=writeAll,observe,qualityOptions={},qualityProvenance={sourceRevision:process.env.BOTSTRIKE_SOURCE_REVISION,imageId:process.env.BOTSTRIKE_IMAGE_ID,nativeProfile:process.env.BOTSTRIKE_NATIVE_PROFILE},sampleResources=true,gatewayPid=process.env.BOTSTRIKE_GATEWAY_PID}={}){
 if(!Number.isFinite(retentionDays)||retentionDays<1)throw Error('Invalid replay retention');
 if(!Number.isFinite(heartbeatMs)||heartbeatMs<50)throw Error('Invalid heartbeat interval');
 if(!secret||secret.length<32)throw Error('RUNTIME_TOKEN must contain at least 32 characters');
 for(const name of ['botstrike-engine','myelin-botstrike'])if(!existsSync(path.join(assets,name)))throw Error('Missing artifact '+name);
 const rooms=new Map(),accounts=new Map(),peers=new Map(),controllers=new Map();let sealing=Promise.resolve(),closed=false,draining=false,pruning=false;const creationQuotas=new Map(),queueWaits=[],socketRtts=[],publicSocketRtts=[],socketJitters=[],publicSocketJitters=[],reconnectDelays=[],publicReconnectDelays=[],metrics={failedRooms:0,sealingJobs:0,lastSealMs:0,sealingFailures:0,verifiedMatches:0,publicVerifiedMatches:0,expiredReplays:0,recordingErrors:0,reconnections:0,publicReconnects:0,publicQueueRequests:0,publicQueueJoins:0,publicQueueAbandons:0,publicLateJoins:0,publicMatchesStarted:0,publicHumanSeatsAtStart:0,publicBotSeatsAtStart:0};
 const pendingRecordings=new Set();
 function recordSample(samples,value){samples.push(Math.max(0,Math.round(value)));if(samples.length>256)samples.shift();}
 function sampleSummary(samples){const sorted=[...samples].sort((a,b)=>a-b),percentile=p=>sorted.length?sorted[Math.ceil(sorted.length*p)-1]:null;return{samples:sorted.length,p50:percentile(.5),p95:percentile(.95)};}
 function recordQueueWait(ms){recordSample(queueWaits,ms);quality.sample('queueWaitMs',ms,{cohort:'public'});quality.sample('queueWaitMs',ms);}
 function recordPublicStart(r){if(r.kind!=='public'||r.publicStartRecorded)return;r.publicStartRecorded=true;metrics.publicMatchesStarted++;const now=Date.now();for(const id of r.members){if(id.startsWith('bot-'))metrics.publicBotSeatsAtStart++;else{metrics.publicHumanSeatsAtStart++;recordQueueWait(now-(r.queueJoinedAt?.[id]??r.created));}}delete r.queueJoinedAt;}
 for(const name of ['rooms','accounts'])mkdirSync(path.join(data,name),{recursive:true,mode:0o700});
 const quality=new QualityStore({...qualityOptions,directory:path.join(data,'quality'),provenance:qualityProvenance});
 const resourceSampler=sampleResources?new RuntimeResourceSampler({onSample:(name,value)=>{const definition=QUALITY_METRICS[name];if(definition&&value!==null)quality[definition.kind==='counter'?'record':definition.kind](name,value);}}):null;
 const gateway=gatewayProcessId(gatewayPid);if(resourceSampler&&gateway!==null)resourceSampler.track('gateway',gateway);
 const qualityCohorts=r=>r?[...new Set(['all',r.kind,r.config?.mode==='practice'?'practice':isTactical(r)?'tactical':'casual'])].filter(name=>QUALITY_COHORTS.includes(name)):['all'];
 function instrument(method,name,value,r){for(const cohort of qualityCohorts(r))quality[method](name,value,{cohort});}
 function emit(type,value){if(typeof observe==='function')try{observe({type,at:Date.now(),monotonicMs:performance.now(),...value});}catch{console.error('Private diagnostic observer failed');}}
 function recoveryAlert(){quality.record('careerRecoveryFailures');quality.alert('career_recovery_failed');}
 const career=new CareerStore(data,{onAlert:recoveryAlert});
 function drainState(){const pendingIO=pendingRecordings.size,live=[...rooms.values()].some(r=>['waiting','running','sealing'].includes(r.status));quality.alert('drain_blocked',{active:draining&&[...pendingRecordings].some(r=>r.status==='failed')});return{pendingIO,drainReady:!live&&pendingIO===0};}
 function occupancy(){const active=[...rooms.values()];for(const [name,status]of [['liveRooms','running'],['waitingRooms','waiting'],['sealingRooms','sealing']])quality.gauge(name,active.filter(r=>r.status===status).length);quality.gauge('sealBacklog',metrics.sealingJobs);const disk=statfsSync(data);quality.gauge('diskAvailableBytes',disk.bavail*disk.bsize);quality.alert('storage_low',{active:disk.bavail*disk.bsize<2*1024**3});for(const [name,bot]of [['publicHumanSeats',false],['publicBotSeats',true]])quality.gauge(name,active.filter(r=>r.kind==='public'&&['waiting','running'].includes(r.status)).reduce((n,r)=>n+r.members.filter(id=>id.startsWith('bot-')===bot).length,0));}
 const qualityTimer=setInterval(()=>{if(!closed)try{occupancy();}catch{quality.alert('storage_low');}},1000);qualityTimer.unref();
 const roomDir=id=>path.join(data,'rooms',id);
 function save(file,value){writeFileSync(file+'.tmp',JSON.stringify(value),{mode:0o600});renameSync(file+'.tmp',file);}
 function persist(r){save(path.join(roomDir(r.id),'room.json'),{id:r.id,kind:r.kind,config:r.config,members:r.members,host:r.host,status:r.status,created:r.created,state:r.state,proof:r.proof,error:r.error,selected:r.selected,ready:r.ready,finishedAt:r.finishedAt,queueDeadline:r.queueDeadline,participants:r.participants,careerCommitted:r.careerCommitted,departed:[...(r.departed||[])]});}
 function bind(account,id){accounts.set(account,id);const r=rooms.get(id);if(r&&peers.get(account)?.size)(r.connectedEver??=new Set()).add(account);save(path.join(data,'accounts',account+'.json'),{room:id});}
 function load(id){if(!/^[a-f0-9]{24}$/.test(id||''))return null;if(rooms.has(id))return rooms.get(id);try{const r=JSON.parse(readFileSync(path.join(roomDir(id),'room.json')));r.departed=new Set(r.departed||[]);if(['running','waiting','sealing'].includes(r.status)){r.status='interrupted';r.error='The server restarted. This incomplete match is not marked verified.';persist(r)}rooms.set(id,r);return r;}catch{return null;}}
 function current(account){if(!accounts.has(account)){try{accounts.set(account,JSON.parse(readFileSync(path.join(data,'accounts',account+'.json'))).room);}catch{accounts.set(account,null)}}return load(accounts.get(account));}
 function view(r,account,afterTick=-Infinity){if(!r)return{room:null};const slot=r.members.indexOf(account);if(slot<0)return{room:null};
 const state=publicState(r.state,slot,spec,r.spectating?.[account],r.audioGait),comms=r.comms?.view(r,account,id=>!!peers.get(id)?.size)||{events:[],muted:[],revision:0};
 return{room:{id:r.id,kind:r.kind,config:{map:r.config.map,mode:r.config.mode,heroes:r.config.heroes,difficulty:r.config.difficulty,...(isTactical(r)?{ruleset:'tactical'}:{}),...(r.config.practice?{practice:r.config.practice}:{})},status:r.status,slot,queueDeadline:r.queueDeadline||null,queueRemainingMs:r.status==='waiting'&&r.queueDeadline?Math.max(0,r.queueDeadline-Date.now()):null,host:account===r.host,roster:r.members.map((id,i)=>({slot:i,name:id.startsWith('bot-')?'BOT '+(i+1):'Pilot '+(i+1),bot:id.startsWith('bot-'),hero:r.config.heroes[i],ready:!!r.ready?.[id],connected:!!peers.get(id)?.size})),state,spectate:r.spectating?.[account]??null,comms,feedback:(r.feedback?.get(account)||[]).filter(e=>e.tick>afterTick),selectedHero:r.selected?.[slot]??r.config.heroes[slot],proof:r.proof||null,error:r.error||null}};}
 function send(ws,v,complete){if(ws.readyState!==WebSocket.OPEN)return false;if(ws.bufferedAmount>256000){ws.terminate();return false;}try{ws.send(JSON.stringify(v),complete||(()=>{}));return true;}catch(error){complete?.(error);ws.terminate();return false;}}
 function receiptContext(ws,r,account){
  const receipts=ws.deliveryReceipts??=new DeliveryReceipts(),slot=r?.members.indexOf(account)??-1,life=r?.state?.players[slot]?.life??null;
  const generation=receipts.prepare({owner:controllers.get(account)===ws&&!ws.needsUpdate?ws.controlToken:null,room:r?.id??null,life});return{receipts,generation,slot,life};
 }
 function deliverState(ws,r,account){
  if(ws.needsUpdate)return;
  const tick=r?.state?.tick||0,slot=r?.members.indexOf(account)??-1,life=r?.state?.players[slot]?.life??null;
  const history=ws.viewHistory??=new ViewHistory(),generation=history.prepare(r?.id??null,life),queueBytes=ws.bufferedAmount;
  const context=receiptContext(ws,r,account),delivery=context.receipts.issue(tick,context.generation);
  if(r?.state)instrument('sample','snapshotQueueBytes',queueBytes,r);
  const queued=send(ws,{type:'state',...view(r,account,ws.feedbackRoom===r?.id?ws.feedbackTick:tick-128),delivery},error=>{
   if(error){if(r)instrument('record','snapshotWriteFailures',1,r);emit('snapshot_write',{room:r?.id,slot,tick,success:false});return;}
   if(delivery)context.receipts.written(delivery.nonce,context.generation);
   if(!r?.state||!history.written(tick,generation))return;
   const now=performance.now();if(ws.qualityStateRoom===r.id&&ws.qualityStateAt!==undefined)instrument('sample','snapshotDeliveryIntervalMs',now-ws.qualityStateAt,r);ws.qualityStateAt=now;ws.qualityStateRoom=r.id;instrument('record','snapshotSent',1,r);emit('snapshot_write',{room:r.id,slot,tick,life,success:true,queueBytes});
  });
  if(!queued&&r?.state&&queueBytes>256000)instrument('record','snapshotBackpressureDrops',1,r);
  if(queued){ws.feedbackRoom=r?.id;ws.feedbackTick=tick;}
 }

 function broadcast(r){for(const account of r.members)for(const ws of peers.get(account)||[])deliverState(ws,r,account);}
 function broadcastCommunication(r,account,privatePreference=false){const slot=r.members.indexOf(account),team=r.state.players[slot].team;for(const [i,id]of r.members.entries())if(privatePreference?id===account:r.state.players[i].team===team)for(const ws of peers.get(id)||[])send(ws,{type:'communication',room:r.id,tick:r.state.tick,comms:r.comms.view(r,id,pilot=>!!peers.get(pilot)?.size)});}
 function closeTape(r){if(r.fd===undefined)return;const fd=r.fd;delete r.fd;if(r.recordingPending)r.pendingTapeClose=fd;else try{closeSync(fd);}catch{}}
 async function appendRecorded(r,line){
  const fd=r.fd,writing=Promise.resolve().then(()=>recordWrite(fd,line));r.recordingPending=writing;pendingRecordings.add(r);let timeout;
  writing.finally(()=>{if(r.recordingPending===writing)delete r.recordingPending;pendingRecordings.delete(r);if(r.pendingTapeClose===fd){delete r.pendingTapeClose;try{closeSync(fd);}catch{}}drainState();}).catch(()=>{});
  try{await Promise.race([writing,new Promise((_,reject)=>{timeout=setTimeout(()=>reject(Error('Match recording timed out')),10000);})]);}finally{clearTimeout(timeout);}
 }
 function fail(r,message){
  if(['failed','cancelled','finished'].includes(r.status))return;
  clearTimeout(r.timer);clearTimeout(r.queueTimer);clearTimeout(r.watchdog);r.status='failed';r.finishedAt=Date.now();r.error=message;metrics.failedRooms++;instrument('record','matchFailed',1,r);emit('room_failed',{room:r.id,message});
  r.child?.kill();closeTape(r);
  drainState();
  try{persist(r);}catch(error){console.error('Room failure could not persist',r.id,error.code||error.message);}
  try{broadcast(r);}catch(error){console.error('Room failure notification',error.message);}
 }
 function cancelEmpty(r){
  if(r.status!=='running'||r.members.some(id=>!id.startsWith('bot-')&&!r.departed?.has(id)))return;
  r.status='cancelled';r.finishedAt=Date.now();instrument('record','matchAbandoned',1,r);emit('room_cancelled',{room:r.id});clearTimeout(r.timer);clearTimeout(r.watchdog);
  r.child?.kill();closeTape(r);
 }
 function seal(r,result){
  r.status='sealing';clearTimeout(r.watchdog);persist(r);broadcast(r);metrics.sealingJobs++;const queuedAt=performance.now();quality.gauge('sealBacklog',metrics.sealingJobs);
  const job=async()=>{const started=performance.now();instrument('sample','sealQueueAgeMs',started-queuedAt,r);emit('seal_started',{room:r.id,queueAgeMs:started-queuedAt});const verifierPids=new Set();try{
   const proof=await new Promise((resolve,reject)=>{
    let delivered=false;const worker=new Worker(new URL('./seal-worker.mjs',import.meta.url),{workerData:{directory:roomDir(r.id),assets,room:r.id,players:r.members,result}});
    worker.on('message',value=>{if(value.type==='quality_process'){if(value.event==='exit'){resourceSampler?.untrack('verifier',value.pid);verifierPids.delete(value.pid);}else if(Number.isSafeInteger(value.pid)&&value.pid>0){verifierPids.add(value.pid);resourceSampler?.track('verifier',value.pid);}return;}if(delivered)return;delivered=true;value.error?reject(Error(value.error)):resolve(value.proof);});
    worker.once('error',reject);worker.once('exit',code=>{if(code||!delivered)reject(Error('Replay worker exited without a result: '+code));});
   });
   r.proof=proof;r.status='finished';r.finishedAt=Date.now();persist(r);broadcast(r);metrics.verifiedMatches++;instrument('record','matchCompleted',1,r);instrument('record','sealCompleted',1,r);emit('seal_completed',{room:r.id,verified:!!proof.verified});if(r.kind==='public')metrics.publicVerifiedMatches++;try{await career.commit(r);r.careerCommitted=true;persist(r);}catch(error){recoveryAlert();console.error('Career commit deferred',r.id,error.message);}
  }catch(error){metrics.sealingFailures++;instrument('record','sealFailures',1,r);quality.alert('sealing_failed');console.error('BotStrike verification',r.id,error.message);fail(r,'The match ended but replay verification failed. No verified result was issued.');}
  finally{for(const pid of verifierPids)resourceSampler?.untrack('verifier',pid);metrics.sealingJobs--;metrics.lastSealMs=Math.round(performance.now()-started);instrument('sample','sealDurationMs',metrics.lastSealMs,r);quality.gauge('sealBacklog',metrics.sealingJobs);}};
  sealing=sealing.then(job,job);
 }
 function start(r){requireTacticalStart(r,id=>!!peers.get(id)?.size);clearTimeout(r.queueTimer);r.queueDeadline=null;r.status='running';r.inputs=Array.from({length:10},(_,slot)=>({...neutral(),yaw:slot<5?0:Math.PI}));r.seen=Array(10).fill(-Infinity);r.inputDelivery=Array(10).fill(null);r.buyDelivery=Array(10).fill(null);r.pulses=Array.from({length:10},()=>({}));r.pulseDelivery=Array.from({length:10},()=>({}));r.weaponRequests=Array(10).fill(null);r.buy=Array(10).fill(null);r.state=null;instrument('record','matchStarted',1,r);emit('room_started',{room:r.id,kind:r.kind,config:r.config});r.fd=openSync(path.join(roomDir(r.id),'tape.jsonl'),'ax',0o600);const header=JSON.stringify({config:r.config})+'\n';writeSync(r.fd,header);r.bytes=Buffer.byteLength(header);persist(r);
 const child=spawn(path.join(assets,'botstrike-engine'),[],{stdio:['pipe','pipe','pipe']});r.child=child;resourceSampler?.track('native',child.pid);let resultSeen=false,pending=false,pendingAt=null,deadline=performance.now(),lastBroadcast=-1;child.stdin.on('error',()=>{});child.on('error',()=>fail(r,'The native engine could not start'));child.stderr.on('data',b=>console.error('BotStrike engine',String(b).slice(0,500)));
 const lines=createInterface({input:child.stdout});lines.on('line',line=>{if(r.status!=='running'||closed)return;try{const msg=JSON.parse(line);if(msg.type==='ready'){r.state=msg.state;recordPublicStart(r);broadcast(r);step();}else if(msg.type==='frame'){clearTimeout(r.watchdog);pending=false;if(pendingAt!==null)instrument('sample','nativeTickProcessingMs',performance.now()-pendingAt,r);pendingAt=null;const previous=r.state,oldPhase=previous?.phase;r.state=msg.state;trackHumanFrame(r,r.state);collectFeedback(r,previous,spec);const tick=r.state.tick;emit('native_frame',{room:r.id,state:r.state,rawLine:line});if(tick-lastBroadcast>=4||r.state.events.some(e=>e.kind!=='shot')||r.state.phase!==oldPhase){lastBroadcast=tick;broadcast(r)}
 if(tick%640===0||r.state.phase!==oldPhase)persist(r);
 if(r.state.phase==='finished'){closeSync(r.fd);delete r.fd;child.stdin.end();}else{deadline+=tickMs;if(deadline<performance.now()-250)deadline=performance.now();r.timer=setTimeout(()=>void step(),Math.max(0,deadline-performance.now()));}
 }else if(msg.type==='result'){resultSeen=true;if(!msg.result.completed)throw Error('Incomplete match');seal(r,msg.result)}}catch(e){console.error(e);fail(r,'The native engine returned an invalid match')}});
 child.on('exit',()=>{resourceSampler?.untrack('native',child.pid);if(!resultSeen&&r.status==='running'&&!closed)fail(r,'The native engine stopped before match completion')});child.stdin.write(header);
 async function step(){
  if(r.status!=='running'||pending||closed)return;
  if(r.backpressured){r.timer=setTimeout(()=>void step(),10);return;}
  pending=true;
  try {
   const now=performance.now(),controlled=Array(10).fill(null),tickets=Array.from({length:10},()=>[]),capturedPulses=Array.from({length:10},()=>[]);instrument('sample','nativeTickOverrunMs',Math.max(0,now-deadline),r);
   const inputs=r.members.map((id,slot)=>{
    const human=!id.startsWith('bot-'),owner=controllers.get(id),connected=human&&peers.get(id)?.size,age=now-r.seen[slot],ticket=r.inputDelivery[slot],lease=ticket?checkTicket(ticket,r,slot):{ok:false,reason:'unknown'},recent=age<400&&lease.ok,active=connected&&age<2000;
    if(ticket&&!lease.ok){rejectDelivery(ticket.ws,id,r,slot,r.inputs[slot].seq,lease.reason,'native_step',needsRecovery({...r.inputs[slot],...r.pulses[slot]}));if(r.inputDelivery[slot]===ticket){r.inputDelivery[slot]=null;clearPulses(r,slot);r.weaponRequests[slot]=null;}}
    // Keep an unconnected pilot's buy budget intact; combat still yields to AI.
    const input=active?(recent?{...r.inputs[slot],takeover:true}:{...neutral(),seq:r.inputs[slot].seq,yaw:r.inputs[slot].yaw,pitch:r.inputs[slot].pitch,takeover:true}):human&&r.state?.phase==='buy'?{...neutral(),seq:r.inputs[slot].seq,yaw:r.inputs[slot].yaw,pitch:r.inputs[slot].pitch,takeover:true}:{};
    if(recent)tickets[slot].push(ticket);
    if(active)controlled[slot]=id;
    if(connected&&recent&&(!isTactical(r)||r.pulses[slot].action_life===input.action_life))for(const [field,value]of Object.entries(r.pulses[slot])){
     if(field==='action_life')continue;const source=r.pulseDelivery[slot][field],valid=checkTicket(source?.ticket,r,slot);
     if(!valid.ok){rejectDelivery(source?.ticket.ws||owner,id,r,slot,source?.sourceSeq??r.inputs[slot].seq,valid.reason,'native_step',needsRecovery({[field]:value}));if(field==='weapon'&&r.weaponRequests[slot]===value)r.weaponRequests[slot]=null;continue;}
     input[field]=value;tickets[slot].push(source.ticket);capturedPulses[slot].push({field,value,...source});
    }clearPulses(r,slot);
    if(input.view_tick!==undefined){const admitted=owner.deliveryReceipts.admit({version:DELIVERY_RECEIPT_VERSION,nonce:ticket.nonce},input.view_tick,r.state?.tick||0,ticket.generation);input.view_tick=admitted.acceptedViewTick??(r.state?.tick||0);}
    if(r.selected[slot]!==undefined)input.hero=r.selected[slot];
    if(r.buy[slot]!==null){const purchaseTicket=r.buyDelivery[slot],valid=checkTicket(purchaseTicket,r,slot);if(valid.ok){bindPurchase(input,r.buy[slot],r.state?.players[slot]?.life,isTactical(r));tickets[slot].push(purchaseTicket);}else if(purchaseTicket)rejectDelivery(purchaseTicket.ws,id,r,slot,undefined,valid.reason,'buy',true,purchaseTicket.requestId);r.buy[slot]=null;r.buyDelivery[slot]=null;}
    return input;
   });
   r.controlled=controlled;const activeSlots=controlled.flatMap((id,slot)=>id?[slot]:[]);if(activeSlots.length){const slot=activeSlots[(r.state?.tick||0)%activeSlots.length];instrument('sample','inputAgeMs',Math.max(0,now-r.seen[slot]),r);}
   const baseBytes=r.bytes,neutralized=new Set();let packed,line;
   // A slow append may cross a receipt deadline. Only its unsent tail is
   // rewritten, on an O_APPEND descriptor, so Native and tape stay identical.
   for(let pass=0;pass<=10;pass++){
    packed=inputs.map(pack);line=JSON.stringify({inputs:packed})+'\n';if(baseBytes+Buffer.byteLength(line)>194_000_000)throw Error('Match recording exceeded its safety limit');
    await appendRecorded(r,line);if(closed||r.status!=='running')return;
    const stale=[];
    for(let slot=0;slot<10;slot++)if(!neutralized.has(slot)&&hasTransportControl(inputs[slot]))for(const ticket of tickets[slot]){const valid=checkTicket(ticket,r,slot);if(!valid.ok){stale.push({slot,ticket,reason:valid.reason});break;}}
    if(!stale.length)break;
    ftruncateSync(r.fd,baseBytes);instrument('record','inputRecordingRewrites',1,r);
    for(const {slot,ticket,reason}of stale){const old=inputs[slot],purchase=tickets[slot].find(value=>Number.isSafeInteger(value.requestId)),pulse=capturedPulses[slot].find(value=>value.ticket===ticket);inputs[slot]={...neutral(),seq:old.seq||0,yaw:old.yaw||0,pitch:old.pitch||0,...(old.takeover?{takeover:true}:{}),...(old.hero!==undefined?{hero:old.hero}:{})};neutralized.add(slot);rejectDelivery(ticket.ws,ticket.account,r,slot,pulse?.sourceSeq??old.seq,reason,'native_step',needsRecovery(old),purchase?.requestId);discardPulseTicket(r,slot,ticket);if(r.inputDelivery[slot]===ticket){r.inputDelivery[slot]=null;clearPulses(r,slot);r.weaponRequests[slot]=null;}}
    if(pass===10)throw Error('Recording freshness rewrite limit exceeded');
   }
   const purchaseTickets=packed.flatMap((input,slot)=>{if(input?.[7]===null||input?.[7]===undefined)return[];const ticket=tickets[slot].find(value=>Number.isSafeInteger(value.requestId)&&value.purchaseItem===input[7]);return ticket?[{slot,requestId:ticket.requestId,item:ticket.purchaseItem,life:ticket.life,issuedAt:ticket.issuedAt,deadlineAt:ticket.deadlineAt,generation:ticket.generation}]:[];});
   const pulseTickets=capturedPulses.flatMap((values,slot)=>neutralized.has(slot)?[]:values.filter(value=>inputs[slot][value.field]===value.value).map(({field,sourceSeq,ticket})=>({slot,field,sourceSeq,issuedAt:ticket.issuedAt,deadlineAt:ticket.deadlineAt,generation:ticket.generation,life:ticket.life})));
   r.bytes=baseBytes+Buffer.byteLength(line);emit('native_input',{room:r.id,tick:(r.state?.tick||0)+1,inputs:packed,purchaseTickets,pulseTickets});
   // false means accepted into the stream buffer, not a failed native input.
   pendingAt=performance.now();if(!child.stdin.write(line)){r.backpressured=true;child.stdin.once('drain',()=>{r.backpressured=false;});}
   r.watchdog=setTimeout(()=>{quality.alert('native_stalled');fail(r,'The native engine stopped responding');},10000);
  }catch(error){if(r.status!=='running'||closed)return;metrics.recordingErrors++;instrument('record','recordingFailures',1,r);quality.alert('recording_failed');console.error('Room step failed',r.id,error.code||error.message);fail(r,'Match recording unavailable. This incomplete match is not verified.');}
 }

 }
 function available(account){if(draining)throw Error('Server update in progress. Please try again shortly.');const r=current(account);if(r&&['waiting','running','sealing'].includes(r.status))throw Error('Leave your current match first');if(new Set([...rooms.values()].filter(r=>['waiting','running','sealing'].includes(r.status)).concat([...pendingRecordings])).size>=maxRooms)throw Error('All servers are busy. Try joining a public match.');const disk=statfsSync(data);if(disk.bavail*disk.bsize<2*1024**3){quality.alert('storage_low');throw Error('Match storage is temporarily full');}}
 function options(b){tacticalOptions(b);if(!['deathmatch','demolition'].includes(b.mode)||!Number.isInteger(b.map)||b.map<0||b.map>2||!Number.isInteger(b.hero)||b.hero<0||b.hero>5||!Number.isInteger(b.difficulty)||b.difficulty<0||b.difficulty>2)throw Error('Choose valid mode, map, hero and difficulty');}
 function make(account,b){options(b);const training=practiceOptions(b);available(account);let quota=creationQuotas.get(account);if(!quota||quota.until<Date.now()){quota={count:0,until:Date.now()+3600000};creationQuotas.set(account,quota);}if(++quota.count>20)throw Error('Match creation limit reached.');if(!['practice','public','private'].includes(b.kind))throw Error('Choose a room type');const id=randomBytes(12).toString('hex'),heroes=Array.from({length:10},(_,i)=>i%6);heroes[0]=b.hero;const r={id,kind:b.kind,host:account,status:'waiting',created:Date.now(),members:[account,...Array.from({length:9},(_,i)=>'bot-'+(i+1))],selected:{0:b.hero},config:{map:b.map,mode:b.mode,...(b.ruleset==='tactical'?{ruleset:'tactical'}:{}),heroes,bots:Array(10).fill(b.ruleset!=='tactical'),difficulty:b.difficulty,seed:randomBytes(4).readUInt32LE()},state:null};if(isTactical(r)){r.config.heroes=lobbyHeroes(r.config,r.members,0,b.hero);r.ready={};}if(training)r.config={...r.config,mode:'practice',map:training.drill<5?3:training.combat_map,practice:training};if(b.kind==='public')r.queueJoinedAt={[account]:r.created};mkdirSync(roomDir(id),{mode:0o700});rooms.set(id,r);bind(account,id);persist(r);if(b.kind==='practice')try{start(r);}catch(error){fail(r,'Unable to start match');throw error;}else if(b.kind==='public'){r.queueDeadline=Date.now()+queueMs;persist(r);r.queueTimer=setTimeout(()=>{try{if(r.status==='waiting'&&r.host)start(r);}catch(error){fail(r,'Unable to start queued match');}},queueMs);}return r;}
 function join(account,r,hero){if(draining)throw Error('Server update in progress.');if(!r||!['waiting','running'].includes(r.status)||r.kind==='practice')throw Error('Room unavailable');if(!Number.isInteger(hero)||hero<0||hero>5)throw Error('Choose a valid hero');const existing=current(account);if(isTactical(r)&&r.status==='running'){if(!r.members.includes(account)||existing&&existing.id!==r.id&&['waiting','running','sealing'].includes(existing.status))throw Error('Tactical seats are reserved after start');r.departed?.delete(account);bind(account,r.id);return r;}if(existing&&['waiting','running','sealing'].includes(existing.status))throw Error('Leave your current room first');const teamCounts=[0,0];r.members.forEach((id,i)=>{if(!id.startsWith('bot-'))teamCounts[Math.floor(i/5)]++});const preferred=teamCounts[0]<=teamCounts[1]?0:1;let slot=r.members.findIndex((id,i)=>id.startsWith('bot-')&&Math.floor(i/5)===preferred);if(slot<0)slot=r.members.findIndex(id=>id.startsWith('bot-'));if(slot<0)throw Error('Room is full');if(isTactical(r)){r.config.heroes=lobbyHeroes(r.config,r.members,slot,hero);r.ready={};}r.members[slot]=account;r.selected[slot]=hero;if(r.status==='waiting'){r.config.heroes[slot]=hero;if(r.kind==='public')r.queueJoinedAt[account]=Date.now();}else if(r.kind==='public'){metrics.publicLateJoins++;recordQueueWait(0);}bind(account,r.id);persist(r);broadcast(r);if(r.kind==='public'&&r.status==='waiting'&&!r.members.some(id=>id.startsWith('bot-')))try{start(r);}catch(error){fail(r,'Unable to start match');throw error;}return r;}
 function authenticate(req){const a=Buffer.from(req.headers['x-runtime-token']||''),b=Buffer.from(secret),id=req.headers['x-utxoplay-account'];return a.length===b.length&&timingSafeEqual(a,b)&&/^[a-f0-9]{64}$/.test(id||'')?id:null;}
 const CLIENT_UPDATE_ERROR='Client update required. Reload this page; online match continues.';
 function receiptProtocol(){return{version:DELIVERY_RECEIPT_VERSION,maxAgeMs:DELIVERY_RECEIPT_MAX_AGE_MS};}
 function clearPulses(r,slot){r.pulses[slot]={};r.pulseDelivery[slot]={};}
 function latchPulse(r,slot,field,value,ticket,sourceSeq){r.pulses[slot][field]=value;r.pulseDelivery[slot][field]={ticket,sourceSeq};}
 function discardPulseTicket(r,slot,ticket){for(const [field,source]of Object.entries(r.pulseDelivery[slot]))if(source.ticket===ticket){if(field==='weapon'&&r.weaponRequests[slot]===r.pulses[slot][field])r.weaponRequests[slot]=null;delete r.pulses[slot][field];delete r.pulseDelivery[slot][field];}}
 function hasTransportControl(input){return!!(input.x||input.y||input.item||input.practice||input.throw_mode||input.preview_item||input.weapon!==undefined||input.buy!==undefined||['fire','reload','walk','crouch','jump','ability','interact','scope','drop'].some(key=>input[key]));}
 // Configuration-only expiry still revokes and neutralizes its transport ticket.
 // Interrupt play only when an actual control, pulse or purchase was discarded.
 function needsRecovery(input){return!!(input.x||input.y||input.item||input.practice||input.weapon!==undefined&&input.weapon!==null||input.buy!==undefined&&input.buy!==null||['fire','reload','walk','crouch','jump','ability','interact','scope','drop'].some(key=>input[key]));}
 function checkTicket(ticket,r,slot){
  if(!ticket)return{ok:false,reason:'unknown'};
  const account=r.members[slot],owner=controllers.get(account);
  if(owner!==ticket.ws||owner?.needsUpdate||owner?.controlToken!==ticket.ownerToken)return{ok:false,reason:'old_owner'};
  if(ticket.room!==r.id)return{ok:false,reason:'old_room'};
  if(ticket.life!==r.state?.players[slot]?.life)return{ok:false,reason:'old_life'};
  const context=receiptContext(owner,r,account);
  if(context.generation!==ticket.generation)return{ok:false,reason:'old_generation'};
  if(!context.receipts.isFresh(ticket.deadlineAt,ticket.generation,ticket.nonce))return{ok:false,reason:performance.now()>=ticket.deadlineAt?'expired':'unknown'};
  return{ok:true};
 }
 function rejectDelivery(ws,account,r,slot,seq,reason,stage='arrival',recoverControls=true,requestId){
  instrument('record','inputRejected',1,r);
  if(!['invalid_input','stale_sequence'].includes(reason))instrument('record','inputDeliveryRejected',1,r);
  if(reason==='expired')instrument('record','inputDeliveryExpired',1,r);
  else if(reason==='unknown')instrument('record','inputDeliveryUnknown',1,r);
  else if(reason.startsWith('old_'))instrument('record','inputDeliveryContextRejected',1,r);
  emit('input_rejected',{room:r?.id,slot,...(Number.isInteger(seq)?{seq}:{}),...(Number.isSafeInteger(requestId)&&requestId>0?{requestId}:{}),reason,stage});
  if(!ws)return;
  if(['missing','unsupported_version'].includes(reason)){
   if(ws.needsUpdate)return;ws.needsUpdate=true;instrument('record','inputClientUpdateRequired',1,r);ws.deliveryReceipts?.reset();ws.viewHistory?.reset();
   if(controllers.get(account)===ws){controllers.delete(account);releaseInput(r,account);}control(ws,account,false);send(ws,{type:'error',error:CLIENT_UPDATE_ERROR});return;
  }
  if(ws.needsUpdate)return;
  const now=performance.now();
  if(recoverControls&&(reason==='expired'||reason==='unknown')&&now>=(ws.nextInputResyncAt??-Infinity)){ws.nextInputResyncAt=now+250;send(ws,{type:'input_resync',code:'stale_delivery',error:'Input delivery expired. Refreshing controls; online match continues.'});}
  if(now>=(ws.nextInputRefreshAt??-Infinity)){ws.nextInputRefreshAt=now+250;deliverState(ws,r,account);}
 }
 function admitDelivery(ws,account,r,slot,delivery,requested,seq,stage='arrival',recoverControls=true){
  if(!ws){rejectDelivery(ws,account,r,slot,seq,'old_owner',stage);return null;}
  const context=receiptContext(ws,r,account);
  if(delivery===undefined||delivery===null){rejectDelivery(ws,account,r,slot,seq,'missing',stage);return null;}
  if(typeof delivery!=='object'||delivery.version!==DELIVERY_RECEIPT_VERSION){rejectDelivery(ws,account,r,slot,seq,'unsupported_version',stage);return null;}
  if(ws.needsUpdate||controllers.get(account)!==ws){rejectDelivery(ws,account,r,slot,seq,'old_owner',stage);return null;}
  const admission=context.receipts.admit(delivery,requested,r.state?.tick||0,context.generation);
  if(!admission.ok){rejectDelivery(ws,account,r,slot,seq,admission.reason,stage,recoverControls);return null;}
  return{admission,ticket:{ws,account,ownerToken:ws.controlToken,nonce:delivery.nonce,issuedAt:admission.issuedAt,deadlineAt:admission.deadlineAt,generation:admission.generation,room:r.id,life:context.life}};
 }
 function input(account,b,ws){
  const r=current(account),slot=r?.members.indexOf(account)??-1;
  if(!r||r.id!==b.room||r.status!=='running'||slot<0){rejectDelivery(ws,account,r,slot,b.input?.seq,'old_room');return;}
  if(!b.delivery||b.delivery.version!==DELIVERY_RECEIPT_VERSION){admitDelivery(ws,account,r,slot,b.delivery,undefined,b.input?.seq);return;}
  let next;try{next=safeInput(b.input);if(next.practice&&(r.config.mode!=='practice'||r.kind!=='practice'||slot!==0))throw Error('Practice commands require your solo range');}catch(error){rejectDelivery(ws,account,r,slot,b.input?.seq,'invalid_input');send(ws,{type:'error',error:error.message});return;}
  if(next.seq<=r.inputs[slot].seq){instrument('record','staleInputRejected',1,r);rejectDelivery(ws,account,r,slot,next.seq,'stale_sequence');return;}
  const accepted=admitDelivery(ws,account,r,slot,b.delivery,next.view_tick,next.seq,'arrival',needsRecovery(next));if(!accepted)return;
  const {admission,ticket}=accepted,requested=next.view_tick;if(next.view_tick!==undefined)next.view_tick=admission.acceptedViewTick;
  emit('input_arrival',{room:r.id,slot,seq:next.seq,accepted:true,admission:{...admission,requested:requested??null},input:{...next}});
  if(requested!==undefined&&admission.acceptedViewTick!==requested)instrument('record','viewTickAdjusted',1,r);
  instrument('record','inputAccepted',1,r);
  if(isTactical(r)&&next.action_life!==r.inputs[slot].action_life){clearPulses(r,slot);r.weaponRequests[slot]=null;}if(isTactical(r))r.pulses[slot].action_life=next.action_life;
  if(next.practice){clearPulses(r,slot);latchPulse(r,slot,'practice',next.practice,ticket,next.seq);r.weaponRequests[slot]=null;Object.assign(next,neutral(),{seq:next.seq,yaw:next.yaw,pitch:next.pitch,throw_mode:next.throw_mode??0,preview_item:next.preview_item??0});}
  for(const key of ['fire','reload','jump','ability','interact','drop'])if(next[key]&&!r.inputs[slot][key])latchPulse(r,slot,key,true,ticket,next.seq);
  if(next.item&&next.item!==r.inputs[slot].item)latchPulse(r,slot,'item',next.item,ticket,next.seq);if(next.weapon!==undefined&&next.weapon!==r.weaponRequests[slot])latchPulse(r,slot,'weapon',next.weapon,ticket,next.seq);r.weaponRequests[slot]=next.weapon??null;delete next.weapon;
  r.inputs[slot]=next;r.inputDelivery[slot]=ticket;r.seen[slot]=performance.now();
 }
 function releaseInput(r,account){
  r?.comms?.disconnect(account);controllers.get(account)?.deliveryReceipts?.reset();const slot=r?.members.indexOf(account)??-1;if(r?.status!=='running'||slot<0||!r.inputs)return;
  const previous=r.inputs[slot],pilot=r.state?.players[slot];r.inputs[slot]={...neutral(),seq:previous.seq,yaw:pilot?.yaw??previous.yaw,pitch:pilot?.pitch??previous.pitch};clearPulses(r,slot);r.weaponRequests[slot]=null;r.seen[slot]=-Infinity;r.inputDelivery[slot]=null;r.buy[slot]=null;r.buyDelivery[slot]=null;
 }
 function control(ws,account,active){const r=current(account),slot=r?.members.indexOf(account)??-1;send(ws,{type:'control',active:active&&!ws.needsUpdate,inputProtocol:receiptProtocol(),room:r?.id||null,nextSeq:slot>=0?r.inputs?.[slot]?.seq??0:0,...(active&&!ws.needsUpdate?{token:ws.controlToken}:{})});}
 function requireControl(account,b){if(!peers.get(account)?.size)return;const owner=controllers.get(account);if(!owner||owner.needsUpdate||typeof b.controlToken!=='string'||b.controlToken!==owner.controlToken)throw Error('Resume this tab to control the match');}
 const server=http.createServer(async(req,res)=>{const reply=(status,v)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(v));};const account=authenticate(req);if(!account)return reply(403,{error:'Forbidden'});try{
 if(req.method==='GET'&&req.url.startsWith('/api/quality')){const url=new URL(req.url,'http://runtime');if(url.pathname!=='/api/quality')return reply(404,{error:'Unknown endpoint'});await quality.ready;const windowMs=Number(url.searchParams.get('windowMs')||300000);return reply(200,{quality:quality.snapshot({windowMs,includeHistory:url.searchParams.get('history')==='1'}),resources:resourceSampler?.snapshot()??null,sampling:{inputAge:'one rotating controlled slot per native frame; age since last admitted input on runtime monotonic clock',inputFreshness:'absolute 400ms since issued state receipt; never renewed by input arrival; exact nonce/generation rechecked before Native',snapshotHistory:'explicit same-owner/room/life delivery ACK endpoints authorize rewind; inner writes alone do not',runtimeHeartbeat:'runtime peer only (commonly inner host proxy)',gatewayHeartbeat:'authenticated host to immediate peer (possibly Store proxy); not end-to-end browser RTT; separate from JS application ping',cohorts:'overlapping all/kind/ruleset sets; never sum them'}});}
 if(req.method==='GET'&&['/api/health','/api/metrics'].includes(req.url)){
  const disk=statfsSync(data),publicRooms=[...rooms.values()].filter(r=>r.kind==='public'&&['waiting','running'].includes(r.status));
  const roomCounts=[...rooms.values()].reduce((counts,r)=>(counts[r.status]=(counts[r.status]||0)+1,counts),{});
  const humans=r=>r.members.filter(id=>!id.startsWith('bot-')).length;
  await quality.ready;occupancy();const drain=drainState();return reply(200,{ok:!closed,draining,...drain,rooms:roomCounts,qualityHealth:quality.health(),socketRttScope:'runtime_peer_only',...(req.url==='/api/metrics'?{quality:quality.snapshot(),resources:resourceSampler?.snapshot()??null}:{}),
   publicWaitingHumans:publicRooms.filter(r=>r.status==='waiting').reduce((n,r)=>n+humans(r),0),
   publicRunningHumans:publicRooms.filter(r=>r.status==='running').reduce((n,r)=>n+humans(r),0),
   publicBotSeats:publicRooms.reduce((n,r)=>n+10-humans(r),0),
   publicQueueWaitMs:sampleSummary(queueWaits),socketRttMs:sampleSummary(socketRtts),publicSocketRttMs:sampleSummary(publicSocketRtts),socketJitterMs:sampleSummary(socketJitters),publicSocketJitterMs:sampleSummary(publicSocketJitters),reconnectDelayMs:sampleSummary(reconnectDelays),publicReconnectDelayMs:sampleSummary(publicReconnectDelays),diskAvailableBytes:disk.bavail*disk.bsize,retentionDays,...metrics});
 }
 if(req.method==='POST'&&req.url==='/api/admin/drain'){draining=true;return reply(200,{draining:true,...drainState()});}
 if(req.method==='GET'&&req.url==='/api/career')return reply(200,await career.view(account));
 if(req.method==='GET'&&req.url==='/api/state')return reply(200,view(current(account),account));
 if(req.method==='GET'&&req.url==='/api/export'){const r=current(account);if(!r||r.status!=='finished'||!r.proof?.verified)return reply(409,{error:'Finish a verified match before exporting'});res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});await pipeline(createReadStream(path.join(roomDir(r.id),'export.json')),res);return;}
 if(req.method!=='POST'||req.url!=='/api/action')return reply(404,{error:'Unknown endpoint'});let raw='';for await(const chunk of req){raw+=chunk;if(raw.length>4096)return reply(413,{error:'Request too large'})}const b=JSON.parse(raw);let r=current(account);
 if(['start','buy','spectate','hero','ready'].includes(b.type)||b.type==='leave'&&['waiting','running'].includes(r?.status))requireControl(account,b);
 if(b.type==='create')r=make(account,b);
 else if(b.type==='queue'){options(b);const match=[...rooms.values()].find(r=>r.kind==='public'&&['waiting','running'].includes(r.status)&&r.config.mode===b.mode&&r.config.map===b.map&&r.config.difficulty===b.difficulty&&(r.status==='waiting'||r.state?.tick<64*60)&&r.members.some(id=>id.startsWith('bot-')));r=match?join(account,match,b.hero):make(account,{...b,kind:'public'});metrics.publicQueueRequests++;if(match)metrics.publicQueueJoins++;}
 else if(b.type==='join')r=join(account,load(b.room),b.hero);
 else if(b.type==='start'){if(draining)throw Error('Server update in progress.');if(!r||r.kind==='public'||r.host!==account||r.status!=='waiting')throw Error('Only the host can start this lobby');requireTacticalStart(r,id=>!!peers.get(id)?.size);try{start(r);}catch(error){fail(r,'Unable to start match');throw error;}}
 else if(b.type==='buy'){if(!r||r.status!=='running'||r.state?.phase!=='buy'||!Number.isInteger(b.item)||b.item<0||b.item>=weaponCount+itemCount)throw Error('Purchases are available during buy time');const slot=r.members.indexOf(account);if(isTactical(r)&&(!peers.get(account)?.size||b.life!==r.state.players[slot].life))throw Error('Refresh your current life before buying');const accepted=admitDelivery(controllers.get(account),account,r,slot,b.delivery,undefined,undefined,'buy');if(!accepted)throw Error('Current input delivery required before buying; online match continues.');const requestId=r.purchaseSerial=(r.purchaseSerial||0)+1;Object.assign(accepted.ticket,{requestId,purchaseItem:b.item});r.buy[slot]=isTactical(r)?{item:b.item,life:b.life}:b.item;r.buyDelivery[slot]=accepted.ticket;emit('purchase_arrival',{room:r.id,slot,requestId,item:b.item,life:accepted.ticket.life,issuedAt:accepted.admission.issuedAt,deadlineAt:accepted.admission.deadlineAt,generation:accepted.admission.generation,accepted:true});}
 else if(b.type==='spectate'){const self=r?.state?.players[r.members.indexOf(account)],target=r?.state?.players[b.slot];if(!self||self.alive||!Number.isInteger(b.slot)||!target?.alive||target.team!==self.team)throw Error('Choose a living teammate while spectating');r.spectating??={};r.spectating[account]=b.slot;}
 else if(b.type==='hero'){if(!r||!['waiting','running'].includes(r.status)||!Number.isInteger(b.hero)||b.hero<0||b.hero>5)throw Error('Invalid hero');const slot=r.members.indexOf(account);if(isTactical(r)){if(r.status!=='waiting')throw Error('Tactical chassis are locked for the match');r.config.heroes=lobbyHeroes(r.config,r.members,slot,b.hero);r.ready={};}r.selected[slot]=b.hero;if(r.status==='waiting')r.config.heroes[slot]=b.hero;persist(r);}
 else if(b.type==='ready'){if(!isTactical(r)||r.status!=='waiting'||!peers.get(account)?.size||typeof b.ready!=='boolean')throw Error('READY requires a connected Tactical lobby');r.ready??={};r.ready[account]=b.ready;persist(r);}
 else if(b.type==='leave'){if(r&&['running','waiting'].includes(r.status)){if(r.kind==='public'&&r.status==='waiting')metrics.publicQueueAbandons++;const slot=r.members.indexOf(account);if(isTactical(r)&&r.status==='running'){(r.departed??=new Set()).add(account);releaseInput(r,account);}else{r.members[slot]='bot-'+slot;if(isTactical(r)){r.ready={};r.config.heroes=lobbyHeroes(r.config,r.members,slot,r.config.heroes[slot]);}}delete r.selected[slot];if(r.inputs)r.inputs[slot]=neutral();if(r.host===account)r.host=r.members.find(id=>!id.startsWith('bot-')&&!r.departed?.has(id))||null;if(r.status==='waiting'&&!r.host)r.status='cancelled';cancelEmpty(r);persist(r);broadcast(r)}bind(account,null);r=null;for(const ws of peers.get(account)||[])deliverState(ws,null,account);}
 else throw Error('Unknown action');if(r)broadcast(r);reply(200,view(r,account));
 }catch(e){if(res.headersSent){res.destroy();return;}reply(400,{error:e.message||'Request failed'})}});
 const sockets=new WebSocketServer({noServer:true,maxPayload:4096,perMessageDeflate:false});
 server.on('upgrade',(req,socket,head)=>{
  socket.on('error',()=>socket.destroy());const account=authenticate(req);
  if(!account||req.url!=='/api/socket'||sockets.clients.size>=160||(peers.get(account)?.size||0)>=3){socket.end('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n');return}
  sockets.handleUpgrade(req,socket,head,ws=>{
   ws.gatewayTransport=req.headers['x-botstrike-transport']==='host-proxy-v1';
   const set=peers.get(account)||new Set(),first=!set.size,r=current(account);
   if(first&&r){
    const disconnectedAt=r.disconnectedAt?.get(account);
    if(r.status==='running'&&disconnectedAt!==undefined){const delay=Date.now()-disconnectedAt;metrics.reconnections++;instrument('record','reconnects',1,r);instrument('sample','reconnectGapMs',delay,r);recordSample(reconnectDelays,delay);if(r.kind==='public'){metrics.publicReconnects++;recordSample(publicReconnectDelays,delay)}}
    r.disconnectedAt?.delete(account);(r.connectedEver??=new Set()).add(account);
   }
   set.add(ws);peers.set(account,set);if(first){controllers.set(account,ws);ws.controlToken=randomBytes(16).toString('hex')}let since=Date.now(),count=0;ws.alive=true;
   ws.on('pong',payload=>{
    if(ws.pingAt===undefined||!payload.equals(ws.pingNonce))return;
    ws.alive=true;const room=current(account),rtt=performance.now()-ws.pingAt;ws.pingAt=undefined;ws.pingNonce=undefined;
    if(room?.status!=='running')return;
    if(ws.rttRoom!==room.id){ws.lastRtt=undefined;ws.rttRoom=room.id}
    instrument('sample','socketRttMs',rtt,room);recordSample(socketRtts,rtt);if(room.kind==='public')recordSample(publicSocketRtts,rtt);
    if(ws.lastRtt!==undefined){const jitter=Math.abs(rtt-ws.lastRtt);instrument('sample','socketJitterMs',jitter,room);recordSample(socketJitters,jitter);if(room.kind==='public')recordSample(publicSocketJitters,jitter)}
    ws.lastRtt=rtt;
   });
   ws.on('error',()=>ws.terminate());
   ws.on('close',()=>{ws.deliveryReceipts?.reset();ws.viewHistory?.reset();instrument('record','socketClosed',1,current(account));set.delete(ws);if(controllers.get(account)===ws){controllers.delete(account);releaseInput(current(account),account)}if(!set.size){peers.delete(account);const room=current(account);if(isTactical(room)&&room.status==='waiting'){room.ready={};persist(room);broadcast(room);}if(room?.status==='running'&&room.connectedEver?.has(account))(room.disconnectedAt??=new Map()).set(account,Date.now())}});
   ws.on('message',(raw,binary)=>{
    let parsed,parseError;
    if(!binary&&ws.gatewayTransport){
     try{parsed=JSON.parse(raw);}catch(error){parseError=error;}
     if(parsed?.type==='host_quality'){
      if(!takeGatewayReport(ws,performance.now())){quality.record('gatewayReportsRejected');return;}
      try{ingestGatewayReport(quality,parsed,{cohort:isTactical(current(account))?'tactical':current(account)?.kind||'all'});}catch{quality.record('gatewayReportsRejected');send(ws,{type:'error',error:'Gateway summary rejected'});}
      return;
     }
    }
    if(Date.now()-since>=1000){since=Date.now();count=0}if(binary||++count>100){ws.close(1008,'Input limit');return}let commandType;try{if(parseError)throw parseError;const b=ws.gatewayTransport?parsed:JSON.parse(raw);commandType=b.type;if(b.type==='ping'&&Number.isFinite(b.time))send(ws,{type:'pong',time:b.time});else if(b.type==='input'){input(account,b,ws)}else if(b.type==='host_quality'){quality.record('gatewayReportsRejected');send(ws,{type:'error',error:'Gateway summary rejected'});}else if(b.type==='quality'){try{if(controllers.get(account)!==ws||!takeQualityReport(ws,performance.now()))throw Error('Quality summary unavailable');ingestQualityReport(quality,b,{cohort:isTactical(current(account))?'tactical':current(account)?.kind||'all'});}catch{quality.record('clientReportsRejected');send(ws,{type:'quality_error',error:'Quality summary rejected'});}}else if(['comms','comms_mute'].includes(b.type)){try{const room=current(account);communicationCommand(room,account,ws,controllers.get(account),b,spec,id=>!!peers.get(id)?.size);broadcastCommunication(room,account,b.type==='comms_mute');}catch(error){send(ws,{type:'communication_error',room:b.room,error:error.message});}}else if(b.type==='claim'){
    if(ws.needsUpdate){send(ws,{type:'error',error:CLIENT_UPDATE_ERROR});return;}const room=current(account);if(!room||room.id!==b.room||!['waiting','running'].includes(room.status)||!room.members.includes(account))throw Error('No active seat to control');
    const previous=controllers.get(account);if(previous!==ws){releaseInput(room,account);controllers.set(account,ws);ws.deliveryReceipts?.reset();ws.viewHistory?.reset();ws.controlToken=randomBytes(16).toString('hex');if(previous)control(previous,account,false)}
    control(ws,account,true);deliverState(ws,room,account);
   }else throw Error('Unknown realtime command')}catch(e){if(commandType==='input')instrument('record','inputRejected',1,current(account));send(ws,{type:'error',error:e.message})}});
   control(ws,account,controllers.get(account)===ws);deliverState(ws,r,account);
  });
 });
 async function prune(){if(pruning||closed)return;pruning=true;try{const report=await career.recover();quality.alert('career_recovery_failed',{active:!report.complete});if(!report.scanComplete){quality.record('retentionFailures');quality.alert('retention_failed');return;}const protectedRooms=new Set([...report.protectedRooms,...[...rooms.values()].filter(r=>['waiting','running','sealing'].includes(r.status)).map(r=>r.id),...[...pendingRecordings].map(r=>r.id)]);let failed=false;const removed=await pruneReplays(data,{days:retentionDays,protectedRooms,onAlert:()=>{failed=true;quality.record('retentionFailures');}});quality.alert('retention_failed',{active:failed});quality.record('retentionPruned',removed.length);metrics.expiredReplays+=removed.length;for(const id of removed){rooms.delete(id);for(const [account,room]of accounts)if(room===id)accounts.delete(account);}}catch(error){quality.record('retentionFailures');quality.alert('retention_failed');console.error('Replay retention',error.message);}finally{pruning=false;}}
 const retentionTimer=setInterval(()=>void prune(),3600000);retentionTimer.unref();void prune();
 const heartbeat=setInterval(()=>{
  for(const ws of sockets.clients){if(!ws.alive){ws.terminate();continue;}ws.alive=false;ws.pingNonce=randomBytes(8);ws.pingAt=performance.now();ws.ping(ws.pingNonce);}
  for(const r of rooms.values())try{if(r.status==='waiting'&&Date.now()-r.created>600000){clearTimeout(r.queueTimer);r.status='expired';r.queueDeadline=null;r.finishedAt=Date.now();r.error='Matchmaking room expired. Start another match.';persist(r);broadcast(r);}if(!['waiting','running','sealing'].includes(r.status)&&Date.now()-(r.finishedAt||r.created)>3600000)rooms.delete(r.id);}catch(error){fail(r,'Room maintenance failed');}
  for(const [id,quota]of creationQuotas)if(quota.until<Date.now())creationQuotas.delete(id);
 },heartbeatMs);heartbeat.unref();
 server.requestTimeout=5000;server.headersTimeout=5000;
 async function close(){closed=true;clearInterval(qualityTimer);clearInterval(heartbeat);clearInterval(retentionTimer);for(const r of rooms.values()){clearTimeout(r.timer);clearTimeout(r.queueTimer);clearTimeout(r.watchdog);r.child?.kill();closeTape(r);}for(const ws of sockets.clients)ws.terminate();await new Promise(resolve=>server.close(resolve));await resourceSampler?.close();await quality.close();}
 return{server,close,rooms,metrics,prune,quality,resourceSampler};
}
if(process.argv[1]===fileURLToPath(import.meta.url)){const service=createBotStrike();service.server.listen(Number(process.env.PORT||8785),process.env.BIND||'127.0.0.1',()=>console.log('BotStrike 2050 room service ready'));for(const s of ['SIGINT','SIGTERM'])process.on(s,()=>service.close().then(()=>process.exit(0)));}
