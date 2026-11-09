import test from 'node:test';
import assert from 'node:assert/strict';
import {installLocalRecoveryPageCapture,storeLocalFenceObservation} from '../tools/local-recovery-fence.mjs';
import {ExactSendJoin,NetworkLocalFenceObservation,matchNetworkLocalNeutral} from '../tools/network-local-fence.mjs';
import {NetworkBrowserActor,NETWORK_GAME_ORIGIN} from '../tools/network-browser-actors.mjs';
function fixture(options={}){
 let time=10;const attrs=new Map([['data-control-recovery-epoch','0'],['data-control-paused','1']]);
 class Socket{constructor(url){this.url=url;this.listeners=new Map();this.sent=[];}addEventListener(k,fn){const a=this.listeners.get(k)||[];a.push(fn);this.listeners.set(k,a);}removeEventListener(k,fn){this.listeners.set(k,(this.listeners.get(k)||[]).filter(f=>f!==fn));}send(data){if(this.fail)throw Error('failed native send');this.sent.push(data);this.onSend?.();}receive(value){for(const f of this.listeners.get('message')||[])f({data:JSON.stringify(value)});}}
 const env={WebSocket:Socket,URL,TextEncoder,crypto:{randomUUID:()=> 'private-page'},performance:{now:()=>time},document:{documentElement:{getAttribute:k=>attrs.get(k)??null}}},capture=installLocalRecoveryPageCapture(env,{wireJoin:true,...options}),socket=new env.WebSocket('ws://game/games/botstrike/api/socket');
 const state=(seq=0,inputAck=null,tick=10)=>socket.receive({type:'state',room:{id:'room',slot:0,state:{tick,players:[{life:1,last_seq:seq,alive:true}]}},delivery:{version:2,nonce:'SECRET_NONCE'},inputAck});socket.receive({type:'control',active:true,token:'SECRET_TOKEN',inputProtocol:{version:2,maxAgeMs:400}});state();
 const send=(seq,extra={})=>{const raw=JSON.stringify({type:'input',room:'room',input:{seq,x:0,y:0,...extra},delivery:{version:2,nonce:'SECRET_NONCE'}});socket.send(raw);return raw;};
 return{capture,socket,attrs,state,send,env,time:n=>{time=n;}};
}
function presentation(extra={}){return{atMs:10,animationAtMs:10,tick:10,viewTick:9,renderTick:9.5,slot:0,sequence:0,camera:{position:[0,56,0],yaw:0,pitch:0,roll:0,fov:80},local:{position:[0,0,0],velocity:[0,0,0],stance:0},players:[{slot:0,life:1,alive:true,position:[0,0,0],yaw:0,pitch:0,stance:0},{slot:5,life:1,alive:true,position:[0,0,-300],yaw:0,pitch:0,stance:.5}],...extra};}
test('real send hook retains original epoch/time and exact bytes despite delayed CDP observation',()=>{
 const f=fixture();f.time(20);const raw=f.send(1);f.attrs.set('data-control-recovery-epoch','2');f.time(30);const batch=f.capture.read(),input=batch.events.find(e=>e.kind==='input');assert.equal(input.localRecoveryEpoch,0);assert.equal(input.pageSentAt,20);assert.equal(input.wirePayload,raw);assert.equal(batch.currentContext.localRecoveryEpoch,2);
 const j=new ExactSendJoin();j.page(input);j.frame(7,raw);const [joined]=j.take();assert.equal(joined.localRecoveryEpoch,0);assert.equal(joined.pageSentAt,20);assert.equal(joined.cdpSocketGeneration,7);assert.equal(joined.wireVerified,true);assert.equal(JSON.stringify(joined).includes('SECRET_'),false);assert.equal(Object.hasOwn(joined,'wirePayload'),false);
});
test('wire join requires exact original string, not equivalent parsed JSON or callback epoch',()=>{
 const f=fixture(),raw=f.send(1),input=f.capture.read().events.find(e=>e.kind==='input'),j=new ExactSendJoin();j.page(input);j.frame(1,raw.replace('{','{ '));assert.deepEqual(j.take(),[]);j.frame(1,raw);assert.equal(j.take().length,1);assert.equal(j.receipt().pendingCdp,1,'unmatched different bytes remain unknown');
});
test('duplicate bytes, ambiguous socket mapping, binary and overflow cannot make a verified join',()=>{
 const j=new ExactSendJoin();j.frame(1,'same');j.frame(1,'same');assert.equal(j.receipt().available,false);assert.deepEqual(j.take(),[]);
 const k=new ExactSendJoin();k.page({socketGeneration:1,wirePayload:'one'});k.frame(1,'one');assert.equal(k.take().length,1);k.page({socketGeneration:2,wirePayload:'two'});k.frame(1,'two');assert.deepEqual(k.take(),[]);assert.equal(k.receipt().reason,'ambiguous_socket_mapping');
 const binary=new ExactSendJoin();binary.frame(1,Buffer.from('text'));assert.equal(binary.receipt().available,false);
 const bounded=new ExactSendJoin({maxBytes:64});bounded.frame(1,'x'.repeat(65));assert.equal(bounded.receipt().available,false);
});
test('failed native send emits no witness and temporary raw wire queue is hard bounded',()=>{
 const f=fixture();f.socket.fail=true;assert.throws(()=>f.send(1));assert.equal(f.capture.read().events.some(e=>e.kind==='input'),false);
 const q=fixture({maxWireBytes:4096});q.send(1,{padding:'x'.repeat(5000)});const batch=q.capture.read();assert.equal(batch.unavailableReason,'wire_stamp_overflow');assert.ok(batch.dropped>0);assert.equal(batch.currentContext.captureEvidenceAvailable,false);
});
test('same WS/proof generation cannot reuse a neutral from before a local latch',()=>{
 const f=fixture(),o=new NetworkLocalFenceObservation(),old=f.send(1);o.observeFrame(1,old);f.time(21);f.state(1,{version:1,seq:1,tick:11,life:1,neutral:true},11);o.ingest(f.capture.read());assert.ok(matchNetworkLocalNeutral(o.read()));const oldGeneration=o.read().currentContext.proofGeneration;
 f.attrs.set('data-control-recovery-epoch','2');f.time(30);f.state(1,{version:1,seq:1,tick:11,life:1,neutral:true},12);o.ingest(f.capture.read());assert.equal(o.read().currentContext.proofGeneration,oldGeneration);assert.equal(matchNetworkLocalNeutral(o.read()),null);
 f.time(40);const fresh=f.send(2);f.time(50);f.state(2,{version:1,seq:2,tick:13,life:1,neutral:true},13);o.ingest(f.capture.read());assert.equal(matchNetworkLocalNeutral(o.read()),null,'page witness alone cannot replace exact CDP wire identity');o.observeFrame(1,fresh);const proof=matchNetworkLocalNeutral(o.read());assert.equal(proof.input.localRecoveryEpoch,2);assert.equal(proof.input.pageSentAt,40);assert.equal(proof.current.localPaused,true);
 f.time(1040);o.ingest(f.capture.read());assert.equal(matchNetworkLocalNeutral(o.read(),{maxOriginalSendAgeMs:999999}),null,'fixed1000 original age cannot be extended by options');
});
test('absent D2 attributes and page overflow are explicit unknown, without raw credentials in records',()=>{
 const f=fixture(),records=[],o=new NetworkLocalFenceObservation({record:(kind,data)=>records.push({kind,data})});f.attrs.clear();const raw=f.send(1);o.observeFrame(1,raw);o.ingest(f.capture.read());assert.equal(o.read().unavailableReason,'local_diagnostics_unavailable');assert.equal(matchNetworkLocalNeutral(o.read()),null);assert.equal(JSON.stringify(records).includes('SECRET_'),false);
 o.ingest({schema:'botstrike-local-send-fence-1',currentContext:o.read().currentContext,dropped:1,unavailableReason:'capture_overflow',events:[]});assert.equal(o.read().currentContext.captureEvidenceAvailable,false);
});
test('fresh refresh follows an older in-flight DOM drain instead of treating its old context as current',async()=>{
 const pending=[],game={locator:()=>({evaluate:()=>new Promise(resolve=>pending.push(resolve))})},adapter=storeLocalFenceObservation(game),batch=epoch=>({schema:'botstrike-local-send-fence-1',events:[],dropped:0,unavailableReason:null,currentContext:{localRecoveryEpoch:epoch,captureEvidenceAvailable:true}});
 const old=adapter.refresh(),fresh=adapter.refresh({fresh:true});assert.equal(pending.length,1);pending[0](batch(0));await old;await Promise.resolve();assert.equal(pending.length,2);pending[1](batch(2));await fresh;assert.equal(adapter.observation.currentContext.localRecoveryEpoch,2);
});
test('a timed-out destructive drain fails closed and its late result never restores context',async()=>{
 let late;const game={locator:()=>({evaluate:()=>new Promise(resolve=>{late=resolve;})})},adapter=storeLocalFenceObservation(game,{refreshTimeoutMs:5});await assert.rejects(adapter.refresh(),/timed out/);late({schema:'botstrike-local-send-fence-1',events:[],dropped:0,currentContext:{localRecoveryEpoch:0}});await Promise.resolve();assert.equal(adapter.observation.currentContext,null);await assert.rejects(adapter.refresh({fresh:true}),/unavailable/);
});
test('actor API joins its actual framesent listener with page stamps and refreshes after an older drain',async()=>{
 const f=fixture(),records=[],trace={closed:false,append:r=>{records.push(r);return true;}},actor=new NetworkBrowserActor('A',null,null,{setDefaultTimeout(){},on(){}},trace,{localRecoveryFence:true}),handlers=new Map();
 actor.watchSocket({url:()=>NETWORK_GAME_ORIGIN.replace(/^http/,'ws')+'/games/botstrike/api/socket',on:(kind,fn)=>handlers.set(kind,fn)});
 f.time(20);const raw=f.send(1);handlers.get('framesent')({payload:raw});f.time(30);f.state(1,{version:1,seq:1,tick:11,life:1,neutral:true},11);let finishOld,reads=0;actor.drainInFlight=new Promise(resolve=>{finishOld=resolve;});actor.drain=async()=>{reads++;actor.localFence.ingest(f.capture.read());};
 const reading=actor.currentLocalNeutral();assert.equal(reads,0);finishOld();const proof=await reading;assert.equal(reads,1);assert.equal(proof.input.pageSentAt,20);assert.equal(proof.input.localRecoveryEpoch,0);assert.equal(records.some(r=>r.kind==='local_input'),true);assert.equal(JSON.stringify(records).includes('SECRET_'),false);
});
test('local capture is opt-in and a closed actor never returns a cached current proof',async()=>{
 const actor=new NetworkBrowserActor('A',null,null,{setDefaultTimeout(){},on(){}},{closed:false,append(){return true;}});assert.equal((await actor.readLocalRecovery()).unavailableReason,'local_capture_not_enabled');actor.localFenceEnabled=true;actor.closed=true;assert.equal((await actor.readLocalRecovery()).unavailableReason,'actor_closed');assert.equal(await actor.currentLocalNeutral(),null);assert.throws(()=>new NetworkLocalFenceObservation({maxRows:Infinity}),/Bounded/);
});

test('a frame whose callback entry predates a send cannot become its completed presentation later',()=>{
 const f=fixture();f.attrs.set('data-control-paused','0');f.time(20);const previous=f.capture.observePresentation(presentation({atMs:20}));
 f.time(25);f.send(1,{fire:true,viewTick:9});f.time(30);const future=f.capture.observePresentation(presentation({atMs:21,sequence:1}));
 const batch=f.capture.read(),input=batch.events.find(row=>row.kind==='input'),later=batch.events.find(row=>row.kind==='presentation'&&row.eventIndex===future.eventIndex);
 assert.equal(input.presentationReferenceVersion,1);assert.equal(input.presentationReferenceAvailable,true);assert.deepEqual(input.lastCompletedPresentationRef,previous);
 assert.ok(later.frame.atMs<input.pageSentAt);assert.ok(later.callbackObservedAtMs>input.pageSentAt);assert.ok(future.eventIndex>input.eventIndex);
 assert.ok(input.lastCompletedPresentationRef.eventIndex<=input.pageEventIndexBeforeNativeSend);assert.ok(input.pageEventIndexBeforeNativeSend<input.eventIndex);
});

test('a nativeSend side effect cannot replace the pre-call reference even with tied clocks',()=>{
 const f=fixture();f.attrs.set('data-control-paused','0');f.time(20);const previous=f.capture.observePresentation(presentation({atMs:20}));let nested;
 f.socket.onSend=()=>{nested=f.capture.observePresentation(presentation({atMs:20,sequence:1}));};f.send(1,{fire:true,viewTick:9});
 const batch=f.capture.read(),input=batch.events.find(row=>row.kind==='input');
 assert.deepEqual(input.lastCompletedPresentationRef,previous);assert.equal(input.pageSentAt,nested.callbackObservedAtMs);
 assert.ok(previous.eventIndex<=input.pageEventIndexBeforeNativeSend);assert.ok(nested.eventIndex>input.pageEventIndexBeforeNativeSend);assert.ok(nested.eventIndex<input.eventIndex);
 assert.equal(input.lastCompletedPresentationRef.eventIndex===nested.eventIndex,false);
});

test('shared page serial orders completed frames and original sends when every timestamp ties',()=>{
 const f=fixture();f.attrs.set('data-control-paused','0');f.time(20);const first=f.capture.observePresentation(presentation({atMs:20}));f.send(1,{viewTick:9});
 const second=f.capture.observePresentation(presentation({atMs:20,sequence:1}));f.send(2,{viewTick:9});const batch=f.capture.read(),inputs=batch.events.filter(row=>row.kind==='input');
 assert.equal(inputs[0].pageSentAt,inputs[1].pageSentAt);assert.equal(inputs[0].lastCompletedPresentationRef.eventIndex,first.eventIndex);assert.equal(inputs[1].lastCompletedPresentationRef.eventIndex,second.eventIndex);
 assert.ok(first.eventIndex<inputs[0].eventIndex&&inputs[0].eventIndex<second.eventIndex&&second.eventIndex<inputs[1].eventIndex);assert.equal(batch.pageEventIndex,inputs[1].eventIndex);
});

test('presentation records copy and freeze only bounded authorized quality-frame fields',()=>{
 const f=fixture();f.time(20);const frame=presentation();frame.secret='PRESENTATION_SECRET';frame.camera.token='PRESENTATION_SECRET';frame.local.account='PRESENTATION_SECRET';frame.players[1].credential='PRESENTATION_SECRET';frame.players.push({slot:6,life:1,alive:true,position:[777,888,999],yaw:0,pitch:0,stance:0,hidden:true});
 const ref=f.capture.observePresentation(frame);assert.ok(ref);frame.camera.position[0]=999;frame.local.position[0]=999;frame.players[1].position[0]=999;frame.players.length=0;
 const row=f.capture.read().events.find(value=>value.kind==='presentation');assert.equal(row.frame.camera.position[0],0);assert.equal(row.frame.local.position[0],0);assert.equal(row.frame.players[1].position[0],0);assert.deepEqual(row.frame.players.map(player=>player.slot),[0,5]);
 assert.equal(JSON.stringify(row).includes('PRESENTATION_SECRET'),false);assert.equal(JSON.stringify(row).includes('777'),false);assert.equal(Object.isFrozen(row.frame),true);assert.equal(Object.isFrozen(row.frame.players[1].position),true);assert.equal(Object.isFrozen(ref),true);assert.throws(()=>{row.frame.camera.position[0]=123;},TypeError);
 const malformed=presentation({players:Array(11).fill(presentation().players[0])});assert.equal(f.capture.observePresentation(malformed),null);f.send(1);const input=f.capture.read().events.find(value=>value.kind==='input');assert.equal(input.presentationReferenceAvailable,false);assert.equal(input.lastCompletedPresentationRef,null);
});

test('owner, room, life, socket, resync and local epoch changes revoke presentation references',()=>{
 const changes=[
  f=>f.socket.receive({type:'control',active:true,token:'REPLACEMENT_SECRET',inputProtocol:{version:2,maxAgeMs:400}}),
  f=>f.socket.receive({type:'state',room:{id:'other-room',slot:0,state:{tick:11,players:[{life:1,last_seq:0}]}},delivery:{version:2}}),
  f=>f.socket.receive({type:'state',room:{id:'room',slot:0,state:{tick:11,players:[{life:2,last_seq:0}]}},delivery:{version:2}}),
  f=>new f.env.WebSocket('ws://game/games/botstrike/api/socket'),
  f=>f.socket.receive({type:'input_resync',code:'stale_delivery'}),
  f=>f.attrs.set('data-control-recovery-epoch','1')
 ];
 for(const change of changes){const f=fixture();f.time(20);assert.ok(f.capture.observePresentation(presentation()));change(f);f.time(30);f.send(1,{viewTick:9});const input=f.capture.read().events.find(row=>row.kind==='input');assert.equal(input.presentationReferenceAvailable,false);assert.equal(input.lastCompletedPresentationRef,null);}
});

test('missing presentations remain unknown without preventing an ordinary neutral recovery proof',()=>{
 const f=fixture(),observation=new NetworkLocalFenceObservation();f.time(20);const raw=f.send(1);observation.observeFrame(1,raw);f.time(30);f.state(1,{version:1,seq:1,tick:11,life:1,neutral:true},11);observation.ingest(f.capture.read());
 const value=observation.read(),input=value.inputs[0];assert.equal(input.presentationReferenceVersion,1);assert.equal(input.presentationReferenceAvailable,false);assert.equal(input.lastCompletedPresentationRef,null);assert.ok(matchNetworkLocalNeutral(value));assert.equal(observation.receipt().evidenceAvailable,true);
});

test('exact CDP join retains atomic references and bounded presentation history fails closed',()=>{
 const f=fixture(),recorded=[],observation=new NetworkLocalFenceObservation({record:(kind,data)=>recorded.push({kind,data}),maxRows:4});f.time(20);const ref=f.capture.observePresentation(presentation());const raw=f.send(1,{viewTick:9});observation.observeFrame(3,raw);observation.ingest(f.capture.read());
 const first=observation.read();assert.equal(first.presentationReferenceVersion,1);assert.equal(first.presentations.length,1);assert.deepEqual(first.inputs[0].lastCompletedPresentationRef,ref);assert.equal(first.inputs[0].cdpSocketGeneration,3);assert.equal(recorded.filter(row=>row.kind==='local_presentation').length,1);assert.equal(Object.hasOwn(first.inputs[0],'wirePayload'),false);
 for(let i=1;i<=4;i++){f.time(20+i);f.capture.observePresentation(presentation());observation.ingest(f.capture.read());}
 const status=observation.receipt();assert.equal(status.evidenceAvailable,false);assert.equal(status.unavailableReason,'local_history_overflow');assert.equal(status.historyCounts.presentations,4);assert.equal(observation.read().presentations[0].eventIndex,ref.eventIndex);assert.equal(recorded.filter(row=>row.kind==='local_capture_status').length,1);
 const small=fixture({limit:4});small.time(20);assert.equal(small.capture.observePresentation(presentation()),null);const batch=small.capture.read();assert.equal(batch.unavailableReason,'capture_overflow');assert.ok(batch.dropped>0);assert.equal(batch.currentContext.captureEvidenceAvailable,false);
});

test('latest-presentation query never clones whole history or substitutes an older partial stance',()=>{
 const f=fixture(),observation=new NetworkLocalFenceObservation();f.time(20);const older=f.capture.observePresentation(presentation());observation.ingest(f.capture.read());
 f.time(30);const frame=presentation();frame.players[1].stance=1;const latest=f.capture.observePresentation(frame);observation.ingest(f.capture.read());
 const query=observation.readPresentation();assert.equal(query.presentations.length,1);assert.equal(query.presentations[0].eventIndex,latest.eventIndex);assert.equal(query.presentations[0].frame.players[1].stance,1);assert.equal(query.pageEventIndex,latest.eventIndex);assert.equal(query.currentContext.pageNowMs,30);assert.equal(query.sourceStatus.evidenceAvailable,true);assert.equal(Object.hasOwn(query,'inputs'),false);assert.equal(Object.hasOwn(query,'snapshots'),false);
 assert.equal(observation.value.presentations.length,2);assert.equal(observation.value.presentations[0].eventIndex,older.eventIndex);query.presentations[0].frame.players[1].stance=.25;assert.equal(observation.value.presentations.at(-1).frame.players[1].stance,1);
});

test('invalid new callback revokes the cheap current view without deleting historical or neutral evidence',()=>{
 const f=fixture(),observation=new NetworkLocalFenceObservation();f.time(20);const previous=f.capture.observePresentation(presentation());observation.ingest(f.capture.read());assert.equal(observation.readPresentation().presentations[0].eventIndex,previous.eventIndex);
 f.time(30);assert.equal(f.capture.observePresentation(presentation({players:[]})),null);const invalid=f.capture.read();assert.equal(invalid.currentPresentationRef,null);assert.equal(invalid.presentationReferenceAvailable,false);assert.equal(invalid.presentationReferenceUnavailableReason,'invalid_presentation_payload');observation.ingest(invalid);
 const unknown=observation.readPresentation();assert.equal(unknown.currentPresentationRef,null);assert.equal(unknown.presentationReferenceAvailable,false);assert.equal(unknown.unavailableReason,'invalid_presentation_payload');assert.deepEqual(unknown.presentations,[]);assert.equal(unknown.sourceStatus.evidenceAvailable,true);assert.equal(observation.value.presentations.length,1,'The older partial frame stays history, never current');
 f.time(31);const raw=f.send(1);observation.observeFrame(1,raw);f.time(32);f.state(1,{version:1,seq:1,tick:11,life:1,neutral:true},11);observation.ingest(f.capture.read());assert.ok(matchNetworkLocalNeutral(observation.read()),'Invalid presentation alone cannot invalidate an applied neutral');
 f.time(40);const fresh=f.capture.observePresentation(presentation({sequence:1}));observation.ingest(f.capture.read());const restored=observation.readPresentation();assert.equal(restored.unavailableReason,null);assert.equal(restored.presentationReferenceAvailable,true);assert.equal(restored.currentPresentationRef.eventIndex,fresh.eventIndex);assert.equal(restored.presentations[0].eventIndex,fresh.eventIndex);assert.equal(observation.value.presentations.length,2);
 const mismatch=f.capture.read();mismatch.currentPresentationRef={...fresh,eventIndex:previous.eventIndex};observation.ingest(mismatch);const rejected=observation.readPresentation();assert.equal(rejected.unavailableReason,'presentation_reference_mismatch');assert.deepEqual(rejected.presentations,[]);
});
