import test from 'node:test';
import assert from 'node:assert/strict';
import {installLocalRecoveryPageCapture,storeLocalFenceObservation} from '../tools/local-recovery-fence.mjs';
import {ExactSendJoin,NetworkLocalFenceObservation,matchNetworkLocalNeutral} from '../tools/network-local-fence.mjs';
import {NetworkBrowserActor,NETWORK_GAME_ORIGIN} from '../tools/network-browser-actors.mjs';
function fixture(options={}){
 let time=10;const attrs=new Map([['data-control-recovery-epoch','0'],['data-control-paused','1']]);
 class Socket{constructor(url){this.url=url;this.listeners=new Map();this.sent=[];}addEventListener(k,fn){const a=this.listeners.get(k)||[];a.push(fn);this.listeners.set(k,a);}removeEventListener(k,fn){this.listeners.set(k,(this.listeners.get(k)||[]).filter(f=>f!==fn));}send(data){if(this.fail)throw Error('failed native send');this.sent.push(data);}receive(value){for(const f of this.listeners.get('message')||[])f({data:JSON.stringify(value)});}}
 const env={WebSocket:Socket,URL,TextEncoder,crypto:{randomUUID:()=> 'private-page'},performance:{now:()=>time},document:{documentElement:{getAttribute:k=>attrs.get(k)??null}}},capture=installLocalRecoveryPageCapture(env,{wireJoin:true,...options}),socket=new env.WebSocket('ws://game/games/botstrike/api/socket');
 const state=(seq=0,inputAck=null,tick=10)=>socket.receive({type:'state',room:{id:'room',slot:0,state:{tick,players:[{life:1,last_seq:seq,alive:true}]}},delivery:{version:2,nonce:'SECRET_NONCE'},inputAck});socket.receive({type:'control',active:true,token:'SECRET_TOKEN',inputProtocol:{version:2,maxAgeMs:400}});state();
 const send=(seq,extra={})=>{const raw=JSON.stringify({type:'input',room:'room',input:{seq,x:0,y:0,...extra},delivery:{version:2,nonce:'SECRET_NONCE'}});socket.send(raw);return raw;};
 return{capture,socket,attrs,state,send,time:n=>{time=n;}};
}
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
