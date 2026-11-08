import test from 'node:test';
import assert from 'node:assert/strict';
import {installLocalRecoveryPageCapture,storeLocalFenceObservation,localRecoveryProofMatches} from '../tools/local-recovery-fence.mjs';
import {storeInputAck,observeStoreProtocol} from './botstrike-store-observations.mjs';
import {selectCurrentStoreNeutral,selectCurrentStoreNeutralLive,storeNeutralProofRecord} from './botstrike-store-recovery-selection.mjs';
let realm=0;
function fixture(options={}){
 let time=10,reads=0;const attrs=new Map([['data-control-recovery-epoch','0'],['data-control-paused','1']]);
 class FakeWS{
  constructor(url='ws://game.example/games/botstrike/api/socket'){this.url=url;this.listeners=new Map();this.sent=[];this.closed=false;}
  addEventListener(k,fn){const list=this.listeners.get(k)||[];list.push(fn);this.listeners.set(k,list);}
  removeEventListener(k,fn){this.listeners.set(k,(this.listeners.get(k)||[]).filter(v=>v!==fn));}
  send(data){if(this.closed)throw Error('Socket closed');this.sent.push(data);}
  receive(value){for(const fn of this.listeners.get('message')||[])fn({data:JSON.stringify(value)});}
  close(){this.closed=true;for(const fn of this.listeners.get('close')||[])fn();}
 }
 const env={WebSocket:FakeWS,URL,crypto:{randomUUID:()=> 'private-observer-page-'+(++realm)},performance:{now:()=>time},document:{documentElement:{getAttribute:name=>attrs.has(name)?attrs.get(name):null}}};
 const api=installLocalRecoveryPageCapture(env,options),capture=storeLocalFenceObservation({locator(){return{evaluate(){reads++;return api.read();}};}});
 const socket=()=>new env.WebSocket(),control=(ws,active=true,token='SECRET_OWNER')=>ws.receive({type:'control',active,token:active?token:undefined,inputProtocol:{version:2,maxAgeMs:400}}),state=(ws,{room='room',life=1,tick=10,seq=0,inputAck=null}={})=>ws.receive({type:'state',delivery:{version:2,nonce:'SECRET_NONCE'},inputAck,room:{id:room,slot:0,state:{tick,players:[{life,last_seq:seq,alive:true}]}}});
 const send=(ws,seq,{x=0,room='room'}={})=>ws.send(JSON.stringify({type:'input',room,delivery:{version:2,nonce:'SECRET_NONCE'},controlToken:'SECRET_OWNER',input:{seq,x,y:0}}));
 const ack=(ws,seq,{tick=11,life=1,room='room',neutral=true}={})=>state(ws,{room,life,tick:tick+1,seq,inputAck:{version:1,seq,tick,life,neutral}});
 const first=socket();control(first);state(first);
 return{env,attrs,api,capture,first,socket,control,state,send,ack,setTime:v=>{time=v;},getTime:()=>time,reads:()=>reads,select:()=>selectCurrentStoreNeutralLive(capture,{room:'room',life:1})};
}

test('late pre-latch ACK keeps its original send epoch and cannot be relabelled by ACK arrival or a cached current context',async()=>{
 const f=fixture();f.send(f.first,5);f.attrs.set('data-control-recovery-epoch','1');f.setTime(20);f.ack(f.first,5);
 assert.equal(await f.select(),null);const o=f.capture.observation,input=o.inputs[0],snapshot=o.snapshots.at(-1);
 assert.equal(input.localRecoveryEpoch,0);assert.equal(snapshot.originalSendStamp.localRecoveryEpoch,0);assert.equal(snapshot.localRecoveryEpoch,0);assert.equal(o.currentContext.localRecoveryEpoch,1);assert.equal(input.pageSentAt,10);
 assert.equal(snapshot.proofGeneration,input.proofGeneration,'Local trip alone must not be hidden by inventing a WS resync generation');
 assert.equal(selectCurrentStoreNeutral(o,{room:'room',life:1}),null,'Required D3 cannot use the legacy cached-context selector');
 assert.equal(storeInputAck(snapshot,input,{requireNeutral:true,current:o.currentContext}),false);
});

test('fresh post-epoch neutral becomes ready while paused1; manual Resume changes only paused and later new intent remains separately acknowledged',async()=>{
 const f=fixture();f.attrs.set('data-control-recovery-epoch','1');f.setTime(30);f.send(f.first,5);f.ack(f.first,5);f.setTime(40);
 const proof=await f.select();assert.ok(proof);assert.equal(proof.input.localPaused,true);assert.equal(proof.current.localPaused,true);const record=storeNeutralProofRecord(proof,{phase:'pre-intent'});assert.equal(record.pageSentAt,30);
 const reads=f.reads();f.attrs.set('data-control-paused','0');assert.equal(await f.select(),null);assert.ok(f.reads()>reads,'Live selection reads DOM again, not the last snapshot');
 f.setTime(50);f.send(f.first,6,{x:1});f.ack(f.first,6,{tick:13,neutral:false});await f.capture.refresh();const o=f.capture.observation;
 assert.equal(storeInputAck(o.snapshots.at(-1),o.inputs.at(-1),{current:o.currentContext}),true);assert.equal(o.inputs.at(-1).localPaused,false);
 assert.equal(record.localPausedAtSend,true,'A later Resume must not rewrite the original ready witness');
});

test('successive same-socket local resets revoke each earlier ready witness and retain every original stamp',async()=>{
 const f=fixture(),proofs=[];
 for(let epoch=0;epoch<3;epoch++){f.attrs.set('data-control-recovery-epoch',String(epoch));f.attrs.set('data-control-paused','1');f.setTime(20+epoch*20);f.send(f.first,5+epoch);f.ack(f.first,5+epoch,{tick:11+epoch*2});const proof=await f.select();assert.ok(proof);proofs.push(proof);}
 const current=f.capture.observation.currentContext;assert.equal(current.localRecoveryEpoch,2);
 for(const old of proofs.slice(0,-1))assert.equal(storeInputAck(old.snapshot,old.input,{requireNeutral:true,current}),false);
 assert.deepEqual(proofs.map(p=>p.input.localRecoveryEpoch),[0,1,2]);assert.deepEqual(proofs.map(p=>p.input.pageSentAt),[20,40,60]);
});

test('original send age expires at exactly1000ms; receiving a later ACK cannot renew it',async()=>{
 const f=fixture();f.setTime(20);f.send(f.first,5);f.setTime(1019.999);f.ack(f.first,5);assert.ok(await f.select());
 f.setTime(1020);assert.equal(await f.select(),null);await f.capture.refresh();const s=f.capture.observation.snapshots.at(-1);assert.equal(s.originalSendStamp.pageSentAt,20);
 assert.equal(localRecoveryProofMatches(s,f.capture.observation.inputs[0],f.capture.observation.currentContext,{requireNeutral:true,maxOriginalSendAgeMs:999999}),false,'Caller cannot extend fixed1000ms original-send age');
});

test('actual socket identity, owner and life fences compose with local epoch, and late old-socket close never replaces current live context',async()=>{
 const f=fixture();f.send(f.first,5);f.ack(f.first,5);const old=await f.select();const second=f.socket();f.control(second);f.state(second,{tick:20});f.setTime(30);f.send(second,5);f.ack(second,5,{tick:21});const fresh=await f.select();assert.ok(fresh);assert.notEqual(old.input.socketGeneration,fresh.input.socketGeneration);
 f.first.close();await f.capture.refresh();assert.equal(f.capture.observation.currentContext.connected,true);assert.equal(storeInputAck(old.snapshot,old.input,{requireNeutral:true,current:f.capture.observation.currentContext}),false);
 f.control(second,true,'SECRET_OWNER_TWO');await f.capture.refresh();assert.equal(storeInputAck(fresh.snapshot,fresh.input,{requireNeutral:true,current:f.capture.observation.currentContext}),false);
 f.state(second,{life:2,tick:25});f.setTime(40);f.send(second,1);f.ack(second,1,{tick:26,life:2});const o=await f.capture.refresh();assert.equal(storeInputAck(o.snapshots.at(-1),o.inputs.at(-1),{requireNeutral:true,current:o.currentContext}),true);
 assert.equal(storeInputAck(fresh.snapshot,fresh.input,{requireNeutral:true,current:o.currentContext}),false);assert.equal(JSON.stringify(o).includes('SECRET_'),false);
});

test('required missing/invalid scalar attributes are unavailable, including safe-integer overflow, with no D2 zero backfill',async()=>{
 for(const [epoch,paused]of [[null,'1'],['1',null],['-1','1'],['1.0','1'],[' 1','1'],['00','1'],['9007199254740992','1'],['10000000000000000','1'],['1','true']]){
  const f=fixture();if(epoch===null)f.attrs.delete('data-control-recovery-epoch');else f.attrs.set('data-control-recovery-epoch',epoch);if(paused===null)f.attrs.delete('data-control-paused');else f.attrs.set('data-control-paused',paused);f.send(f.first,5);f.ack(f.first,5);
  assert.equal(await f.select(),null);assert.equal(f.capture.observation.inputs[0].localFenceAvailable,false);assert.equal(f.capture.observation.inputs[0].localRecoveryEpoch,null);
 }
 const max=fixture();max.attrs.set('data-control-recovery-epoch','9007199254740991');max.send(max.first,5);max.ack(max.first,5);assert.ok(await max.select());
});

test('bounded pending/trace/socket overflow and duplicate sequence are unavailable rather than an ambiguous join',async()=>{
 const f=fixture({maxPending:2});for(const seq of [1,2,3])f.send(f.first,seq);f.ack(f.first,2);assert.equal(await f.select(),null);assert.equal(f.capture.observation.currentContext.captureEvidenceAvailable,false);
 const repeated=fixture();repeated.send(repeated.first,5);repeated.send(repeated.first,5);repeated.ack(repeated.first,5);assert.equal(await repeated.select(),null);assert.equal(repeated.capture.observation.snapshots.at(-1).originalSendStamp,null);
 const overflow=fixture({limit:4});overflow.send(overflow.first,5);overflow.ack(overflow.first,5);assert.equal(await overflow.select(),null);assert.ok(overflow.capture.observation.dropped>0);
 const sockets=fixture({maxSockets:1});sockets.socket();assert.equal((await sockets.capture.refresh()).currentContext.captureEvidenceAvailable,false);
});

test('original send stamps survive host drain delay; failed native sends and borrowed receivers cannot create a proof',async()=>{
 const f=fixture();f.setTime(20);f.send(f.first,5);f.setTime(30);f.ack(f.first,5);f.setTime(80);const proof=await f.select();assert.ok(proof);assert.equal(proof.input.pageSentAt,20);assert.equal(proof.snapshot.originalSendStamp.pageSentAt,20);
 const before=f.capture.observation.inputs.length;f.first.closed=true;assert.throws(()=>f.send(f.first,6),/closed/);await f.capture.refresh();assert.equal(f.capture.observation.inputs.length,before);
 const borrowed=fixture(),second=borrowed.socket();borrowed.first.send.call(second,JSON.stringify({type:'input',room:'room',input:{seq:5,x:0,y:0}}));assert.equal((await borrowed.capture.refresh()).currentContext.captureEvidenceAvailable,false);
});

test('page reload identity and page-clock/epoch regressions cannot resurrect an earlier proof',async()=>{
 const a=fixture();a.send(a.first,5);a.ack(a.first,5);const old=await a.select();const b=fixture();b.send(b.first,5);b.ack(b.first,5);const fresh=await b.select();assert.notEqual(old.current.pageInstance,fresh.current.pageInstance);assert.equal(storeInputAck(old.snapshot,old.input,{requireNeutral:true,current:fresh.current}),false);
 b.attrs.set('data-control-recovery-epoch','2');await b.capture.refresh();b.attrs.set('data-control-recovery-epoch','1');assert.equal((await b.capture.refresh()).currentContext.captureEvidenceAvailable,false);
 const clock=fixture();clock.send(clock.first,5);clock.ack(clock.first,5);clock.setTime(9);assert.equal(await clock.select(),null);
});

test('D3 evidence cannot silently downgrade through a caller that omits the required binding, and same-socket room sequence reuse stays isolated',async()=>{
 const f=fixture();f.send(f.first,5);f.ack(f.first,5);const old=await f.select();assert.ok(old);
 for(const value of [undefined,false]){const current={...old.current};if(value===undefined)delete current.localFenceRequired;else current.localFenceRequired=value;assert.equal(storeInputAck(old.snapshot,old.input,{requireNeutral:true,current}),false);}
 f.state(f.first,{room:'other',tick:1});f.setTime(30);f.send(f.first,5,{room:'other'});f.ack(f.first,5,{room:'other',tick:2});const fresh=await selectCurrentStoreNeutralLive(f.capture,{room:'other',life:1});assert.ok(fresh);assert.equal(fresh.input.seq,old.input.seq);assert.notEqual(fresh.input.room,old.input.room);
 assert.equal(storeInputAck(old.snapshot,old.input,{requireNeutral:true,current:fresh.current}),false);
 f.ack(f.first,5,{room:'room',tick:11});await f.capture.refresh();assert.equal(f.capture.observation.snapshots.at(-1).originalSendStamp,null,'Returning late old-room data cannot be relabelled to the new-room original send');
});

test('the old CDP Store observer cannot silently accept a D3-required binding',()=>{
 assert.throws(()=>observeStoreProtocol({on(){}},'http://game.example',{localFenceRequired:true}),/synchronous page-side/);
});

test('live selection never reuses a pre-call DOM poll; fresh mode waits then reads the current epoch again',async()=>{
 const f=fixture();f.send(f.first,5);f.ack(f.first,5);const oldValue=f.api.read();let resolveOld,calls=0;const waiting=new Promise(resolve=>{resolveOld=resolve;});
 const capture=storeLocalFenceObservation({locator(){return{evaluate(){return ++calls===1?waiting:f.api.read();}};}});
 const poll=capture.refresh();f.attrs.set('data-control-recovery-epoch','1');f.setTime(20);const selection=selectCurrentStoreNeutralLive(capture,{room:'room',life:1});resolveOld(oldValue);await poll;
 assert.equal(await selection,null);assert.ok(calls>=2);assert.equal(capture.observation.currentContext.localRecoveryEpoch,1);assert.equal(capture.observation.inputs[0].localRecoveryEpoch,0);
});
test('Store adapter strips temporary exact-wire data and a timed-out read stays unavailable after its late completion',async()=>{
 const f=fixture();f.send(f.first,5);f.ack(f.first,5);const value=f.api.read();value.events.find(row=>row.kind==='input').wirePayload='SECRET_RAW_FRAME';
 const capture=storeLocalFenceObservation({locator(){return{evaluate:()=>value};}});await capture.refresh();assert.ok(!JSON.stringify(capture.observation).includes('SECRET_'));
 let finish;const delayed=new Promise(resolve=>{finish=resolve;}),timed=storeLocalFenceObservation({locator(){return{evaluate:()=>delayed};}},{refreshTimeoutMs:1});
 await assert.rejects(timed.refresh(),/timed out/);finish(value);await new Promise(resolve=>setTimeout(resolve,1));assert.equal(timed.observation.currentContext,null);await assert.rejects(timed.refresh({fresh:true}),/unavailable/);
 const original=JSON.parse(f.first.sent[0]);assert.equal(original.delivery.nonce,'SECRET_NONCE');assert.equal(Object.hasOwn(original,'localRecoveryEpoch'),false,'Observer must not change server wire');
});

test('host history overflow stays unavailable after an empty fresh read and preserves the old fresh neutral only as history',async()=>{
 const f=fixture();f.send(f.first,5);f.ack(f.first,5);const proof=await f.select(),observation=f.capture.observation,original=proof.input;
 // Fill the host storage boundary directly; this is a pure adapter fixture,
 // not 16k simulated network exchanges or a mutation of game/Native state.
 observation.inputs.splice(0,observation.inputs.length,...Array.from({length:16384},(_,i)=>i===0?original:{...original,seq:i+100,sendSerial:i+100,eventIndex:i+100}));
 f.setTime(20);f.send(f.first,6);f.ack(f.first,6,{tick:13});await f.capture.refresh({fresh:true});assert.equal(observation.dropped,1);assert.equal(observation.currentContext.captureEvidenceAvailable,false);
 f.setTime(30);await f.capture.refresh({fresh:true});assert.equal(observation.dropped,1,'an empty page batch must not erase the host loss count');assert.equal(observation.inputs.length,16384);assert.equal(observation.inputs[0],original,'retain the original history instead of rotating evidence');
 assert.equal(storeInputAck(proof.snapshot,original,{requireNeutral:true,current:{...observation.currentContext,captureEvidenceAvailable:true}}),true,'the old neutral is still within its original age and context, making the loss fence necessary');
 assert.equal(observation.currentContext.captureEvidenceAvailable,false,'a healthy empty page read cannot restore overflowed host evidence');assert.equal(await f.select(),null,'the still-fresh old neutral must not be selected after host loss');
});

test('D3 live selection requires an explicit zero host loss count even when the current page context looks healthy',async()=>{
 const f=fixture();f.send(f.first,5);f.ack(f.first,5);assert.ok(await f.select());const observation=f.capture.observation;
 for(const dropped of [1,undefined,NaN]){const value={...observation,currentContext:{...observation.currentContext,captureEvidenceAvailable:true},dropped};if(dropped===undefined)delete value.dropped;const capture={refresh:async()=>value};assert.equal(await selectCurrentStoreNeutralLive(capture,{room:'room',life:1}),null,'missing or nonzero host loss is unknown, never a current proof');}
});
