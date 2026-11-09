// Imports only two copied pure modules inside this private draft directory.
import test from 'node:test';
import assert from 'node:assert/strict';
import {ControlWatchdog,watchdogControls} from '../games/botstrike/client/control-watchdog.mjs';
import {InputDelivery} from '../games/botstrike/client/input-delivery.mjs';
const c={socketEpoch:1,ownerEpoch:1,room:'room',life:1,owned:true,running:true,visible:true,active:true,alive:true,phase:'live',outcome:false,protocol:'receipt'};
const protocol={version:2,maxAgeMs:400},delivery={version:2,nonce:'a'.repeat(32)};
const ack=(seq,tick=11)=>({version:1,seq,tick,life:1,neutral:true});
const context={room:'room',life:1,tick:10,lastSeq:0};
function client(){const d=new InputDelivery();d.resetOwner();d.advertise(protocol);d.receive(delivery,context);return d;}
const quiet=()=>new ControlWatchdog({stateAgeMs:100000,schedulerGapMs:100000});
test('local send time is separate metadata; exact wire ACK remains its original five fields',()=>{
 const d=client();d.sent({seq:1},25);assert.equal(d.receive(delivery,{...context,tick:12,lastSeq:1,inputAck:ack(1)}),true);
 assert.deepEqual(d.ack,ack(1));assert.equal(Object.keys(d.ack).length,5);assert.equal(d.ackSentAt,25);
 d.receive(delivery,{...context,tick:13,lastSeq:1,inputAck:ack(1)});assert.equal(d.ackSentAt,25);
 d.sent({seq:1},9999);assert.equal(d.pending.get(1).sentAt,25);
});
test('AI last_seq, unknown seq, wrong life/tick and fabricated ACK field cannot expose send-time proof',()=>{
 for(const a of [undefined,ack(2),{...ack(1),life:2},{...ack(1),tick:10},{...ack(1),sentAt:50}]){
  const d=client();d.sent({seq:1},25);d.receive(delivery,{...context,tick:12,lastSeq:1,inputAck:a});assert.equal(d.ack,null);assert.equal(d.ackSentAt,null);
 }
});
test('reset boundaries revoke both ACK and its local timing metadata',()=>{
 for(const reset of [d=>d.recover(),d=>d.resetOwner(),d=>d.transportReset(),d=>d.context('other',1),d=>d.context('room',2)]){
  const d=client();d.sent({seq:1},25);d.receive(delivery,{...context,tick:12,lastSeq:1,inputAck:ack(1)});reset(d);assert.equal(d.ackSentAt,null);assert.equal(d.pending.size,0);
 }
});
test('controls unconfirmed uses ORIGINAL validated send time despite fresh states and late/repeated ACKs',()=>{
 const w=quiet();w.scheduler(c,0);w.state(c,0,{tick:10});w.state(c,900,{tick:20,ack:ack(1),ackSentAt:10});
 assert.equal(w.inspect(c,1011).reason,'control-unconfirmed');
 const d=client();d.sent({seq:1},10);d.receive(delivery,{...context,tick:12,lastSeq:1,inputAck:ack(1)});
 w.state(c,2000,{tick:21,ack:d.ack,ackSentAt:d.ackSentAt});assert.equal(w.ready,false,'old neutral cannot authorize new recovery epoch');
});
test('fresh distinct ACKs advance from original send time, and slow rendering alone never trips',()=>{
 const w=new ControlWatchdog();w.render(0);w.scheduler(c,0);w.state(c,0,{tick:1});
 for(let n=100;n<=2000;n+=100){assert.equal(w.scheduler(c,n).tripped,false);assert.equal(w.state(c,n,{tick:n,ack:ack(n),ackSentAt:n-20}).tripped,false);}
 w.render(2100);assert.equal(w.inspect(c,2100).paused,false);assert.equal(w.renderGapMs,2100);
});
test('pongs or input events do not renew relevant-state or dedicated scheduler clocks',()=>{
 const w=new ControlWatchdog();w.scheduler(c,0);w.state(c,0,{tick:1});
 for(let n=10;n<=390;n+=10)assert.equal(w.inspect(c,n).paused,false);
 assert.equal(w.inspect(c,401).reason,'scheduler-gap');
 const s=new ControlWatchdog();s.scheduler(c,0);s.state(c,0,{tick:1});s.scheduler(c,200);s.scheduler(c,400);assert.equal(s.inspect(c,401).reason,'state-age');
});
test('first wake checks before replacing scheduler or state callback time',()=>{
 for(const boundary of ['send','buy','enter','prediction','state','scheduler']){
  const w=new ControlWatchdog();w.scheduler(c,0);w.state(c,0,{tick:1});
  const r=boundary==='state'?w.state(c,821,{tick:2}):boundary==='scheduler'?w.scheduler(c,821):w.inspect(c,821,{intent:['buy','enter'].includes(boundary)});
  assert.equal(r.tripped,true,boundary);assert.equal(r.reason,'scheduler-gap',boundary);
 }
});
test('round_end, death, practice outcome, passive and initial menu do not universally require active ACKs',()=>{
 for(const changed of [{phase:'round_end'},{phase:'buy'},{alive:false},{outcome:true},{owned:false},{active:false},{running:false},{protocol:'legacy'}]){
  const w=quiet(),v={...c,...changed};w.scheduler(v,0);w.state(v,0,{tick:1});assert.equal(w.inspect(v,10000).paused,false,JSON.stringify(changed));
 }
 const w=quiet();w.state(c,0,{tick:1});w.state({...c,phase:'round_end'},5000,{tick:2});w.state(c,10000,{tick:3});assert.equal(w.inspect(c,10999).paused,false);assert.equal(w.inspect(c,11001).reason,'control-unconfirmed');
});
test('life, room, owner and socket transitions cannot inherit liveness or neutral-ready proof',()=>{
 for(const change of [{life:2},{room:'next'},{ownerEpoch:2},{socketEpoch:2}]){
  const w=quiet();w.scheduler(c,0);w.state(c,0,{tick:1});w.inspect(c,1001);w.state(c,1002,{tick:2,ack:ack(2),ackSentAt:1001});assert.equal(w.ready,true);
  const next={...c,...change};w.state(next,1003,{tick:3});assert.equal(w.ready,false);assert.equal(w.resume(next,1004,{explicit:true}),false);
 }
});
test('v2 recovery needs a fresh post-trip exact ORIGINAL-neutral ACK plus a NEW explicit Resume',()=>{
 const w=new ControlWatchdog();w.scheduler(c,0);w.state(c,0,{tick:1});w.scheduler(c,900);const menu={...c,active:false};
 w.scheduler(menu,910);w.state(menu,910,{tick:2,ack:ack(1),ackSentAt:10});assert.equal(w.resume(menu,920,{explicit:true}),false);
 w.state(menu,930,{tick:3,ack:{...ack(2),neutral:false},ackSentAt:920});assert.equal(w.ready,false);
 w.state(menu,950,{tick:4,ack:ack(3),ackSentAt:940});assert.equal(w.ready,true);assert.equal(w.resume(menu,960),false,'old enterPending/automatic entry cannot resume');assert.equal(w.resume(menu,960,{explicit:true}),true);
});
test('delayed server resync invalidates a ready local recovery epoch',()=>{
 const w=quiet();w.state(c,0,{tick:1});w.inspect(c,1001);const menu={...c,active:false};w.state(menu,1100,{tick:2,ack:ack(1),ackSentAt:1050});assert.equal(w.ready,true);
 w.invalidateRecovery(1200);assert.equal(w.ready,false);w.state(menu,1250,{tick:3,ack:ack(1),ackSentAt:1050});assert.equal(w.resume(menu,1260,{explicit:true}),false);
});
test('legacy fallback is disclosed missing proof and cannot lock its existing Resume permanently',()=>{
 const w=new ControlWatchdog(),legacy={...c,protocol:'legacy'},d=new InputDelivery();w.scheduler(legacy,0);w.state(legacy,0,{tick:1});w.scheduler(legacy,900);
 d.recover();d.advertise(undefined);assert.equal(d.mode,'legacy');assert.equal(d.recovering,false);assert.equal(d.canSend(),true);assert.equal(d.ackSentAt,null);
 const menu={...legacy,active:false};w.scheduler(menu,910);assert.equal(w.resume(menu,920,{explicit:true}),false);w.state(menu,930,{tick:2});assert.equal(w.inspect(menu,940).observation.explicitAckSupported,false);assert.equal(w.resume(menu,940),false);assert.equal(w.resume(menu,940,{explicit:true}),true);
});
test('a fresh validated ACK advances only its original send time before the control-age decision',()=>{
 const w=quiet();w.state(c,0,{tick:1});assert.equal(w.state(c,1001,{tick:2,ack:ack(1),ackSentAt:999}).paused,false);
 assert.equal(w.inspect(c,2000).paused,true,'same ACK callback cannot renew send-time anchor');
});
test('state freshness, scheduler gaps and frozen Native tick progress remain separate observations',()=>{
 const w=quiet();w.scheduler(c,0);w.state(c,0,{tick:1});w.scheduler(c,300);w.state(c,300,{tick:1,ack:ack(1),ackSentAt:290});
 const o=w.inspect(c,310).observation;assert.equal(o.stateAgeMs,10);assert.equal(o.schedulerGapMs,10);assert.equal(o.tickProgressAgeMs,310);assert.equal(o.ackAgeMs,20);
});
test('late queued post-trip neutral does not become a fresh Resume proof at callback now',()=>{
 const w=quiet();w.state(c,0,{tick:1});w.inspect(c,1001);const menu={...c,active:false};
 w.state(menu,5000,{tick:2,ack:ack(2),ackSentAt:1050});assert.equal(w.ready,false);assert.equal(w.resume(menu,5001,{explicit:true}),false);
 w.state(menu,5100,{tick:3,ack:ack(3),ackSentAt:5090});assert.equal(w.ready,true);w.state(menu,6200,{tick:4,ack:ack(3),ackSentAt:5090});assert.equal(w.resume(menu,6201,{explicit:true}),false,'cached proof also expires from original send time');
});
test('manual-Resume latch keeps wire and prediction input neutral even AFTER InputDelivery recovery',()=>{
 const d=client();d.sent({seq:1},10);d.receive(delivery,{...context,tick:12,lastSeq:1,inputAck:ack(1)});assert.equal(d.recovering,false);
 const requested={seq:2,yaw:.3,pitch:.2,x:1,y:1,fire:true,reload:true,walk:true,crouch:true,jump:true,ability:true,interact:true,scope:true,drop:true,item:3,practice:4,weapon:5,buy:7,action_life:1,viewTick:11,preview_item:2,throw_mode:1};
 const paused=d.control(requested,{forceNeutral:true});for(const key of ['x','y','item','practice'])assert.equal(paused[key],0,key);for(const key of ['fire','reload','walk','crouch','jump','ability','interact','scope','drop'])assert.equal(paused[key],false,key);assert.equal(paused.weapon,null);assert.equal(paused.buy,null);
 for(const key of ['seq','yaw','pitch','action_life','viewTick','preview_item','throw_mode'])assert.equal(paused[key],requested[key],key);
 assert.equal(requested.weapon,5);assert.equal(d.control(requested).weapon,5,'new intent is admitted only after the local latch is explicitly released');
 d.sent(paused,20);d.receive(delivery,{...context,tick:14,lastSeq:2,inputAck:ack(2,13)});assert.equal(d.ack.neutral,true,'neutral traffic remains available while manual Resume is pending');
});
function readyWatchdog(){const w=new ControlWatchdog();w.scheduler(c,0);w.state(c,0,{tick:1});w.scheduler(c,900);const menu={...c,active:false};w.scheduler(menu,910);w.state(menu,930,{tick:2,ack:ack(1),ackSentAt:920});return{w,menu};}
test('shared readiness query independently checks state, scheduler and original neutral age without changing clocks',()=>{
 const {w,menu}=readyWatchdog();assert.equal(w.readiness(menu,940).ready,true);const clocks=[w.stateAt,w.schedulerAt,w.neutralSentAt,w.liveSince,w.epoch];w.readiness(menu,99999);assert.deepEqual([w.stateAt,w.schedulerAt,w.neutralSentAt,w.liveSince,w.epoch],clocks);
 w.scheduler(menu,1250);assert.equal(w.readiness(menu,1331).ready,false,'state aged independently of scheduler');
 const a=readyWatchdog();a.w.state(a.menu,1350,{tick:3});assert.equal(a.w.readiness(a.menu,1351).ready,false,'scheduler aged independently of state');
 const b=readyWatchdog();b.w.scheduler(b.menu,2100);b.w.state(b.menu,2100,{tick:3,ack:ack(1),ackSentAt:920});assert.equal(b.w.readiness(b.menu,2101).ready,false,'cached neutral expires from original send time');
 for(const change of [{life:2},{room:'other'},{ownerEpoch:2},{socketEpoch:2}])assert.equal(w.readiness({...menu,...change},940).ready,false,'query cannot inherit another context');
});
test('owner controls show waiting versus manual Resume and keep Buy disabled throughout the latch',()=>{
 const {w,menu}=readyWatchdog(),options={owned:true,protocol:'receipt',deliveryRecovering:false,canSend:true};
 const ready=watchdogControls(w.readiness(menu,940),options);assert.equal(ready.resumeLabel,'RESUME ↗');assert.equal(ready.resumeDisabled,false);assert.equal(ready.buyDisabled,true);assert.equal(w.latch!==null,true,'readiness does not activate play');
 w.scheduler(menu,2100);w.state(menu,2100,{tick:3,ack:ack(1),ackSentAt:920});const waiting=watchdogControls(w.readiness(menu,2101),options);assert.equal(waiting.resumeLabel,'WAITING FOR CONTROLS…');assert.equal(waiting.resumeDisabled,true);assert.equal(waiting.buyDisabled,true);
 const deliveryStillSyncing=watchdogControls({paused:true,ready:true},{...options,deliveryRecovering:true});assert.equal(deliveryStillSyncing.resumeDisabled,true);assert.equal(deliveryStillSyncing.resumeLabel,'WAITING FOR CONTROLS…');
});
test('passive TAKE CONTROL remains available even when local latch or delivery recovery exists',()=>{
 const view=watchdogControls({paused:true,ready:false},{owned:false,protocol:'receipt',deliveryRecovering:true,canSend:false});assert.equal(view.resumeLabel,'TAKE CONTROL');assert.equal(view.resumeDisabled,false);assert.equal(view.buyDisabled,true);assert.equal(view.paused,false);
 assert.equal(watchdogControls({paused:true,ready:false},{owned:false,claimPending:true}).resumeDisabled,true);
});
test('a delayed ACK can recover InputDelivery while the shared local UI remains visibly waiting',()=>{
 const {w,menu}=readyWatchdog(),d=client();d.sent({seq:1},920);assert.equal(d.receive(delivery,{...context,tick:12,lastSeq:1,inputAck:ack(1)}),true);assert.equal(d.recovering,false);
 w.scheduler(menu,2100);w.state(menu,2100,{tick:3,ack:d.ack,ackSentAt:d.ackSentAt});const view=watchdogControls(w.readiness(menu,2101),{owned:true,protocol:d.mode,deliveryRecovering:d.recovering,canSend:d.canSend()});assert.equal(view.ready,false);assert.equal(view.resumeDisabled,true);assert.equal(view.resumeLabel,'WAITING FOR CONTROLS…');assert.equal(view.buyDisabled,true);
});
test('explicit unsupported protocol outranks even a carried ready latch and requires Reload without legacy downgrade',()=>{
 for(const advertised of [{version:1,maxAgeMs:400},{version:99,maxAgeMs:400},null]){
  const d=client();assert.equal(d.advertise(advertised),'unsupported');assert.equal(d.canSend(),false);assert.equal(d.mode,'unsupported');
  for(const ready of [false,true])for(const owned of [false,true]){
   const view=watchdogControls({paused:true,ready},{owned,protocol:d.mode,deliveryRecovering:false,canSend:true});
   assert.equal(view.ready,false);assert.equal(view.reloadRequired,true);assert.equal(view.resumeDisabled,true);assert.equal(view.resumeLabel,'RELOAD REQUIRED');assert.equal(view.buyDisabled,true);
  }
 }
 const legacy=new InputDelivery();assert.equal(legacy.advertise(undefined),'legacy');assert.equal(watchdogControls({paused:true,ready:false},{owned:false,protocol:legacy.mode}).reloadRequired,false,'missing advertisement retains existing legacy claim semantics');
});
