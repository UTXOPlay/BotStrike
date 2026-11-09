import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,statSync,rmSync,mkdirSync,chmodSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {ActorTrace,publicSnapshot,publicInputAck,NetworkBrowserActor,NETWORK_GAME_ORIGIN,classifyWebGLRenderer,browserRuntimePaths} from '../tools/network-browser-actors.mjs';

test('latest completed-presentation query refreshes after an older drain without cloning full histories',async()=>{
 const actor=new NetworkBrowserActor('A',null,null,{setDefaultTimeout(){},on(){}},{closed:false,append(){return true;}},{localRecoveryFence:true});let finishOld,reads=0;
 actor.drainInFlight=new Promise(resolve=>{finishOld=resolve;});actor.drain=async()=>{reads++;};
 actor.localFence.read=()=>{throw Error('Full history must not be queried');};actor.localFence.readPresentation=()=>({currentContext:{pageNowMs:30},presentations:[{eventIndex:7}]});
 const pending=actor.readCurrentPresentation();assert.equal(reads,0);finishOld();const current=await pending;
 assert.equal(reads,1);assert.deepEqual(current.presentations,[{eventIndex:7}]);
});

test('closed browser trace receipt retains durable local capture health after departure',async t=>{
 const directory=mkdtempSync(path.join(tmpdir(),'network-presentation-footer-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));
 const trace=new ActorTrace(directory,'A'),actor=new NetworkBrowserActor('A',{async close(){}},null,{setDefaultTimeout(){},on(){}},trace,{localRecoveryFence:true});
 actor.localFence.ingest({schema:'botstrike-local-send-fence-1',presentationReferenceVersion:1,pageEventIndex:0,events:[],dropped:0,unavailableReason:null,currentContext:null});
 await actor.close({leave:false});const footer=JSON.parse(readFileSync(trace.receiptFile,'utf8'));
 assert.equal(footer.localFence.presentationReferenceVersion,1);assert.equal(footer.localFence.evidenceAvailable,true);assert.equal(footer.localFence.dropped,0);assert.equal(footer.localFence.wireJoin.available,true);
});

test('private actor trace is bounded, refuses overwrite and records truncation without dropping old evidence',t=>{
 const directory=mkdtempSync(path.join(tmpdir(),'network-browser-actors-test-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));const trace=new ActorTrace(directory,'A',{maxBytes:4096});const first={kind:'input',data:{input:{seq:1,viewTick:5,yaw:.1}}};assert.equal(trace.append(first),true);for(let i=0;i<100;i++)trace.append({kind:'presentation',data:{index:i,padding:'x'.repeat(100)}});const before=readFileSync(trace.file),receipt=trace.close({humanParticipants:0});assert.ok(receipt.bytes<=4096);assert.ok(receipt.dropped>0);assert.equal(receipt.persistenceError,null);assert.equal(receipt.sha256,createHash('sha256').update(before).digest('hex'));assert.deepEqual(JSON.parse(before.toString().split('\n')[0]),first);assert.equal(statSync(directory).mode&0o777,0o700);assert.equal(statSync(trace.file).mode&0o777,0o600);assert.equal(statSync(trace.receiptFile).mode&0o777,0o600);assert.throws(()=>new ActorTrace(directory,'A'),/EEXIST/);assert.throws(()=>new ActorTrace(directory,'../escape'),/actor ID/);
 const publicDirectory=path.join(directory,'public');mkdirSync(publicDirectory);chmodSync(publicDirectory,0o755);assert.throws(()=>new ActorTrace(publicDirectory,'B'),/private directory/);
});
test('public snapshot recording strips credentials and hidden poses while keeping exact own Native acknowledgements',()=>{
 const player={slot:0,life:2,alive:true,team:0,position:[1,2,3],velocity:[4,5,6],last_seq:35,yaw:.1,pitch:.2,account:'SECRET_ACCOUNT',token:'SECRET_TOKEN'},room={id:'private-invite-code',slot:0,status:'running',state:{tick:100,phase:'live',round:2,config:{mode:'demolition',map:0},players:[player,{...player,slot:5,hidden:true},{...player,slot:6,optical:false},{...player,slot:7,position:[7,8,9]}]},feedback:[{id:1,tick:100,kind:'hit',actor:0,target:7,value:20,account:'SECRET_ACCOUNT'}]};
 const result=publicSnapshot(room);assert.deepEqual(result.players.map(player=>player.slot),[0,7]);assert.equal(result.players[0].last_seq,35);assert.deepEqual(result.players[0].position,[1,2,3]);const json=JSON.stringify(result);for(const secret of ['SECRET_ACCOUNT','SECRET_TOKEN','private-invite-code'])assert.equal(json.includes(secret),false);assert.equal(result.events[0].kind,'hit');assert.deepEqual(publicSnapshot(null),{status:null,slot:null,tick:null});
});
test('old socket observations remain traceable but cannot replace the active room or ownership cache',t=>{
 const directory=mkdtempSync(path.join(tmpdir(),'network-browser-actors-sockets-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));const trace=new ActorTrace(directory,'B'),page={setDefaultTimeout(){},on(){}},actor=new NetworkBrowserActor('B',null,null,page,trace),fake=()=>{const handlers=new Map();return {url:()=>NETWORK_GAME_ORIGIN.replace(/^http/,'ws')+'/games/botstrike/api/socket',on:(name,fn)=>handlers.set(name,fn),receive:value=>handlers.get('framereceived')({payload:JSON.stringify(value)}),send:value=>handlers.get('framesent')({payload:JSON.stringify(value)})};};
 const a=fake(),b=fake();actor.watchSocket(a);a.receive({type:'state',room:{id:'first',slot:0,status:'waiting'}});actor.watchSocket(b);b.receive({type:'state',room:{id:'second',slot:5,status:'waiting'}});b.receive({type:'control',active:true,nextSeq:10,token:'DO_NOT_RECORD'});a.receive({type:'control',active:false,nextSeq:0,token:'DO_NOT_RECORD'});a.receive({type:'state',room:{id:'first',slot:0,status:'waiting'}});assert.equal(actor.currentRoom.id,'second');assert.equal(actor.control.active,true);assert.equal(actor.lastSnapshot.currentSocket,false);a.send({type:'input',room:'first',controlToken:'DO_NOT_RECORD',input:{seq:3,viewTick:20,yaw:.5}});assert.equal(actor.lastInput.roomGeneration,1);assert.equal(actor.roomGeneration,2);trace.close();assert.equal(readFileSync(trace.file,'utf8').includes('DO_NOT_RECORD'),false);
});

test('hardware capability rejects absent or software renderer evidence',()=>{
 assert.equal(classifyWebGLRenderer(null),'unknown');assert.equal(classifyWebGLRenderer({unmaskedRenderer:'ANGLE (Intel, Mesa Intel Iris Xe, OpenGL ES 3.2)'}),'hardware');for(const name of ['SwiftShader','llvmpipe','softpipe','software rasterizer'])assert.equal(classifyWebGLRenderer({unmaskedRenderer:name}),'software');assert.equal(classifyWebGLRenderer({unmaskedRenderer:'unrecognized vendor'}),'unknown');
});
test('closed actors cancel input, presentation and room waits before reading stale cache',async()=>{
 const actor=Object.create(NetworkBrowserActor.prototype);Object.assign(actor,{id:'A',closed:true,closing:false,timeout:1000,recent:new Map(),currentRoom:{status:'running'}});actor.drain=()=>{throw Error('closed capture must not be read');};
 await assert.rejects(actor.waitInput(()=>true),/actor is closed/);await assert.rejects(actor.waitPresentation(()=>true),/actor is closed/);await assert.rejects(actor.waitRoom(()=>true),/actor is closed/);actor.closed=false;actor.closing=true;await assert.rejects(actor.waitRoom(()=>true),/actor is closed/);
});

test('runtime paths resolve without launching and read current environment overrides on each call',t=>{
 const original={playwright:process.env.PLAYWRIGHT_ENTRY,chromium:process.env.CHROMIUM_PATH};t.after(()=>{for(const [name,value]of [['PLAYWRIGHT_ENTRY',original.playwright],['CHROMIUM_PATH',original.chromium]]){if(value===undefined)delete process.env[name];else process.env[name]=value;}});
 delete process.env.PLAYWRIGHT_ENTRY;delete process.env.CHROMIUM_PATH;const defaults=browserRuntimePaths();assert.equal(typeof defaults.playwrightEntry,'string');assert.ok(defaults.playwrightEntry.length>0);assert.ok(defaults.executablePath===undefined||typeof defaults.executablePath==='string');
 process.env.PLAYWRIGHT_ENTRY='/private/nonexistent/playwright/index.mjs';process.env.CHROMIUM_PATH='/private/nonexistent/chrome';assert.deepEqual(browserRuntimePaths(),{playwrightEntry:process.env.PLAYWRIGHT_ENTRY,executablePath:process.env.CHROMIUM_PATH});
 process.env.PLAYWRIGHT_ENTRY='';process.env.CHROMIUM_PATH='';assert.deepEqual(browserRuntimePaths(),defaults);
});

test('browser ACK observations retain context epochs and invalidate historical proof on same-socket recovery',t=>{
 const directory=mkdtempSync(path.join(tmpdir(),'network-browser-ack-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));const trace=new ActorTrace(directory,'A'),actor=new NetworkBrowserActor('A',null,null,{setDefaultTimeout(){},on(){}},trace),handlers=new Map(),socket={url:()=>NETWORK_GAME_ORIGIN.replace(/^http/,'ws')+'/games/botstrike/api/socket',on:(kind,fn)=>handlers.set(kind,fn)},receive=value=>handlers.get('framereceived')({payload:JSON.stringify(value)});
 actor.watchSocket(socket);receive({type:'control',active:true,token:'SECRET_OWNER',inputProtocol:{version:2,maxAgeMs:400},nextSeq:0});const room={id:'room',slot:0,status:'running',state:{tick:10,players:[{slot:0,life:1,last_seq:1,position:[0,0,0],velocity:[0,0,0]}]}};const ack={version:1,seq:1,tick:10,life:1,neutral:true};receive({type:'state',room,inputAck:ack});const first=actor.lastSnapshot;assert.deepEqual(first.inputAck,ack);assert.equal(first.ownerGeneration,1);assert.equal(first.controllerActive,true);
 handlers.get('framesent')({payload:JSON.stringify({type:'input',room:'room',delivery:{version:2,nonce:'SECRET_NONCE'},input:{seq:2,x:0,y:0}})});assert.equal(actor.lastInput.life,1);assert.equal(actor.lastInput.minTick,10);assert.equal(actor.lastInput.proofGeneration,first.proofGeneration);
 receive({type:'input_resync',code:'stale_delivery'});assert.ok(actor.proofGeneration>first.proofGeneration,'Old true ACK cannot cross a later resync on the same owner/socket');const recoveryEpoch=actor.proofGeneration;receive({type:'state',room:{...room,state:{...room.state,tick:9}},inputAck:ack});assert.equal(actor.lastSnapshot.currentContext,false);assert.equal(actor.proofGeneration,recoveryEpoch);
 handlers.get('close')();assert.equal(actor.control.active,false);assert.ok(actor.proofGeneration>recoveryEpoch);trace.close();const text=readFileSync(trace.file,'utf8');assert.equal(text.includes('SECRET_OWNER'),false);assert.equal(text.includes('SECRET_NONCE'),false);
 assert.equal(publicInputAck({...ack,token:'SECRET_EXTRA'}),null);assert.equal(publicInputAck({...ack,version:2}),null);
});

function sentActor(){
 const rows=[],trace={closed:false,append(row){rows.push(row);return true;},close(){this.closed=true;}},page={setDefaultTimeout(){},on(){},keyboard:{}},actor=new NetworkBrowserActor('Sent', {async close(){}},null,page,trace);
 const socket=()=>{const handlers=new Map();return{url:()=>NETWORK_GAME_ORIGIN.replace(/^http/,'ws')+'/games/botstrike/api/socket',on:(name,fn)=>handlers.set(name,fn),receive:value=>handlers.get('framereceived')({payload:JSON.stringify(value)}),send:input=>handlers.get('framesent')({payload:JSON.stringify({type:'input',room:actor.currentRoom.id,delivery:{version:2},input})}),close:()=>handlers.get('close')()};};
 const room={id:'sent-room',slot:0,status:'running',state:{tick:10,players:[{slot:0,life:1,last_seq:1,position:[0,0,0],velocity:[0,0,0]}]}};
 const wire=socket();actor.watchSocket(wire);wire.receive({type:'control',active:true,token:'owner',inputProtocol:{version:2,maxAgeMs:400}});wire.receive({type:'state',room});
 return{actor,wire,socket,room,page,rows};
}
const sentInput=(seq,x=1)=>({seq,x,y:0,walk:true,crouch:true});

test('sent-input watch arms synchronously and releases independently of an unresolved renderer drain',async()=>{
 const {actor,wire,page,rows}=sentActor();let finishDrain,drainCalls=0;
 actor.drain=()=>{drainCalls++;return new Promise(resolve=>{finishDrain=resolve;});};const unrelated=actor.drain();let drainDone=false;unrelated.then(()=>{drainDone=true;});
 page.keyboard.down=async()=>wire.send(sentInput(2));page.keyboard.up=async()=>wire.send(sentInput(3,0));
 const watch=actor.watchInputSent(row=>row.input.x===1,{timeout:1000});
 await actor.key('KeyD','down');const sent=await watch.promise;await actor.key('KeyD','up');
 assert.equal(sent.input.seq,2);assert.equal(drainDone,false,'An unrelated CDP drain must not extend a real keyboard hold');assert.equal(drainCalls,1,'The sent-input watch must not perform a drain');assert.equal(actor.inputSentWatchers.size,0);assert.ok(rows.some(row=>row.kind==='input'&&row.index===sent.index),'Success follows actual retained framesent recording');watch.cancel();finishDrain();await unrelated;
});

test('sent-input watch ignores historical and wrong-context observations until a new matching send',async()=>{
 const {actor,wire}=sentActor();wire.send(sentInput(2));const old=actor.lastInput,{index,nodeAtMs,nodeUnixMs,...body}=old;
 const watch=actor.watchInputSent(row=>row.input.x===1,{afterIndex:0,timeout:1000});let settled=false;watch.promise.then(()=>{settled=true;});
 actor.dispatchInputSentWatchers('input',old);
 for(const key of ['socketGeneration','ownerGeneration','proofGeneration','roomGeneration'])actor.record('input',{...body,[key]:old[key]+1,input:sentInput(3)});
 actor.record('input',{...body,life:2,input:sentInput(4)});await Promise.resolve();assert.equal(settled,false);assert.equal(actor.inputSentWatchers.size,1);
 wire.send(sentInput(5));assert.equal((await watch.promise).input.seq,5);assert.equal(actor.inputSentWatchers.size,0);
});

test('an old socket send cannot settle a current-socket input watch',async()=>{
 const {actor,wire,socket,room}=sentActor(),next=socket();actor.watchSocket(next);next.receive({type:'control',active:true,token:'new-owner',inputProtocol:{version:2,maxAgeMs:400}});next.receive({type:'state',room});
 const watch=actor.watchInputSent(()=>true,{timeout:1000});wire.send(sentInput(2));await Promise.resolve();assert.equal(actor.inputSentWatchers.size,1);next.send(sentInput(3));assert.equal((await watch.promise).input.seq,3);
});

test('sent-input watches fail closed and detach on every observed controller-context change',async()=>{
 const changes=[
  f=>f.actor.watchSocket(f.socket()),
  f=>f.wire.receive({type:'control',active:true,token:'other-owner',inputProtocol:{version:2,maxAgeMs:400}}),
  f=>f.wire.receive({type:'input_resync',code:'stale_delivery'}),
  f=>f.actor.trackRoom({...f.room,id:'another-room'}),
  f=>f.wire.receive({type:'state',room:{...f.room,state:{...f.room.state,players:[{...f.room.state.players[0],life:2}]}}}),
  f=>f.wire.receive({type:'control',active:false}),
  f=>f.wire.close()
 ];
 for(const change of changes){const fixture=sentActor(),watch=fixture.actor.watchInputSent(()=>true,{timeout:1000});change(fixture);assert.equal(fixture.actor.inputSentWatchers.size,0);await assert.rejects(watch.promise,/context changed|closed/);}
});

test('predicate exceptions, asynchronous predicates and predicate context mutations cannot become a sent-input success',async()=>{
 for(const make of [()=>()=>{throw Error('broken predicate');},()=>async()=>{throw Error('asynchronous predicate');},actor=>()=>{actor.proofGeneration++;return true;}]){
  const {actor,wire}=sentActor(),predicate=make(actor);
  const watch=actor.watchInputSent(predicate,{timeout:1000});wire.send(sentInput(2));await assert.rejects(watch.promise,/predicate failed/);assert.equal(actor.inputSentWatchers.size,0);
 }
});

test('timeout, cancellation and actor close detach sent-input watches without early unhandled rejections',async()=>{
 const {actor}=sentActor(),cancelled=actor.watchInputSent(()=>true,{timeout:1000});cancelled.cancel();cancelled.cancel();await new Promise(resolve=>setImmediate(resolve));await assert.rejects(cancelled.promise,/cancelled/);assert.equal(actor.inputSentWatchers.size,0);
 const timed=actor.watchInputSent(()=>true,{timeout:5});await new Promise(resolve=>setTimeout(resolve,15));await assert.rejects(timed.promise,/timed out/);assert.equal(actor.inputSentWatchers.size,0);
 const closing=actor.watchInputSent(()=>true,{timeout:1000});await actor.close({leave:false});await assert.rejects(closing.promise,/closing/);assert.equal(actor.inputSentWatchers.size,0);const closed=actor.watchInputSent(()=>true);await assert.rejects(closed.promise,/closed/);assert.equal(actor.inputSentWatchers.size,0);
});

test('sent-input watcher capacity and rejected trace writes remain bounded failures',async()=>{
 const {actor,wire}=sentActor(),watches=Array.from({length:64},()=>actor.watchInputSent(()=>true,{timeout:1000}));await assert.rejects(actor.watchInputSent(()=>true,{timeout:1000}).promise,/capacity/);assert.equal(actor.inputSentWatchers.size,64);for(const watch of watches)watch.cancel();await Promise.all(watches.map(watch=>assert.rejects(watch.promise,/cancelled/)));assert.equal(actor.inputSentWatchers.size,0);
 const watch=actor.watchInputSent(()=>true,{timeout:1000});actor.trace.append=()=>false;wire.send(sentInput(2));await assert.rejects(watch.promise,/did not retain/);assert.equal(actor.inputSentWatchers.size,0);
 assert.throws(()=>actor.watchInputSent(()=>true,{timeout:300001}),/bounded/);assert.throws(()=>actor.watchInputSent(null),/predicate/);assert.throws(()=>actor.watchInputSent(()=>true,{afterIndex:actor.index+1}),/existing index/);
});
