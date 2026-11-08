// Local pause policy; never grants a server receipt or rewind lease.
// These thresholds are independent of server authority and transport SLOs.
export const CONTROL_WATCHDOG_LIMITS=Object.freeze({stateAgeMs:400,schedulerGapMs:400,controlAckMs:1000});
const time=n=>Number.isFinite(n)&&n>=0;
const identity=c=>JSON.stringify([c.socketEpoch,c.ownerEpoch,c.room,c.life]);
const owned=c=>c.owned&&c.running&&c.visible;
const expectsAck=c=>owned(c)&&c.active&&c.alive&&c.phase==='live'&&!c.outcome&&c.protocol==='receipt';
// Pure visible-control model. Passive tabs retain claim access while an owner
// with a local latch sees waiting/ready states, never a misleading Deploy/Buy.
export function watchdogControls(readiness,{owned,waiting=false,claimPending=false,protocol='receipt',deliveryRecovering=false,canSend=true}={}){
 if(protocol==='unsupported')return{paused:!!owned&&readiness.paused,ready:false,reloadRequired:true,resumeDisabled:true,resumeLabel:'RELOAD REQUIRED',buyDisabled:true};
 const paused=!!owned&&readiness.paused,ready=paused&&readiness.ready&&!deliveryRecovering&&canSend;
 return{paused,ready,reloadRequired:false,resumeDisabled:!!(claimPending||owned&&(deliveryRecovering||paused&&!ready)),resumeLabel:!owned||waiting?'TAKE CONTROL':paused?ready?'RESUME ↗':'WAITING FOR CONTROLS…':deliveryRecovering?'SYNCING CONTROLS…':'DEPLOY ↗',buyDisabled:!!(!owned||deliveryRecovering||!canSend||paused)};
}
export class ControlWatchdog{
 constructor(thresholds=CONTROL_WATCHDOG_LIMITS){
  this.thresholds={...CONTROL_WATCHDOG_LIMITS,...thresholds};
  for(const n of Object.values(this.thresholds))if(!Number.isFinite(n)||n<=0)throw Error('Positive timing limits required');
  this.key=null;this.schedulerAt=null;this.renderAt=null;this.renderGapMs=null;this.epoch=0;this.latch=null;this.clearContext();
 }
 clearContext(){this.stateAt=null;this.tick=null;this.tickAt=null;this.liveSince=null;this.ackSentAt=null;this.neutralSentAt=null;this.ready=false;}
 context(c,now){
  const key=identity(c);if(key!==this.key){this.key=key;this.clearContext();}
  if(expectsAck(c)){if(this.liveSince===null)this.liveSince=now;}else{this.liveSince=null;this.ackSentAt=null;}
 }
 inspect(c,now,{intent=false}={}){
  if(!time(now))throw Error('Monotonic local time required');this.context(c,now);
  const engaged=owned(c)&&(c.active||intent);
  const observation={stateAgeMs:this.stateAt===null?null:now-this.stateAt,schedulerGapMs:this.schedulerAt===null?null:now-this.schedulerAt,tickProgressAgeMs:this.tickAt===null?null:now-this.tickAt,ackAgeMs:this.liveSince===null?null:now-Math.max(this.liveSince,this.ackSentAt??-Infinity),renderGapMs:this.renderGapMs,explicitAckSupported:c.protocol==='receipt'};
  let reason=null;
  if(engaged&&observation.schedulerGapMs>this.thresholds.schedulerGapMs)reason='scheduler-gap';
  else if(engaged&&observation.stateAgeMs!==null&&observation.stateAgeMs>this.thresholds.stateAgeMs)reason='state-age';
  else if(expectsAck(c)&&observation.ackAgeMs>this.thresholds.controlAckMs)reason='control-unconfirmed';
  const tripped=!this.latch&&!!reason;
  if(tripped){this.latch={reason,at:now,epoch:++this.epoch};this.ready=false;}
  return{tripped,paused:!!this.latch,reason:this.latch?.reason??null,observation};
 }
 scheduler(c,now){const result=this.inspect(c,now);this.schedulerAt=now;return result;}
 state(c,now,{tick,ack,ackSentAt}={}){
  // A newly validated ACK may advance its ORIGINAL send-time anchor. It never
  // replaces the state/scheduler clocks before those independent gap checks.
  this.context(c,now);
  if(expectsAck(c)&&ack&&time(ackSentAt)&&ackSentAt<=now)this.ackSentAt=Math.max(this.ackSentAt??-Infinity,ackSentAt);
  const result=this.inspect(c,now);if(!owned(c))return result;
  this.stateAt=now;if(Number.isSafeInteger(tick)&&tick>=0&&tick!==this.tick){this.tick=tick;this.tickAt=now;}
  // Only InputDelivery's current-context validated ACK metadata may enter here.
  // Repeated/late ACKs retain their ORIGINAL send time, never callback `now`.
  if(c.protocol==='receipt'&&ack&&time(ackSentAt)&&ackSentAt<=now){
   if(this.liveSince!==null)this.ackSentAt=Math.max(this.ackSentAt??-Infinity,ackSentAt);
   if(this.latch&&ack.neutral&&ackSentAt>=this.latch.at&&now-ackSentAt<=this.thresholds.controlAckMs){this.neutralSentAt=Math.max(this.neutralSentAt??-Infinity,ackSentAt);this.ready=true;}
  }else if(this.latch&&c.protocol==='legacy'&&now>this.latch.at)this.ready=true;
  return result;
 }
 invalidateRecovery(now){if(this.latch){this.latch={...this.latch,at:now,epoch:++this.epoch};this.ready=false;this.neutralSentAt=null;}}
 render(now){if(this.renderAt!==null)this.renderGapMs=now-this.renderAt;this.renderAt=now;}
 readiness(c,now){
  // Read only: querying UI readiness must never renew any observation clock.
  const age=at=>time(at)&&time(now)&&now>=at?now-at:null;
  const stateAgeMs=age(this.stateAt),schedulerGapMs=age(this.schedulerAt),neutralAgeMs=age(this.neutralSentAt);
  const sameContext=identity(c)===this.key,stateFresh=stateAgeMs!==null&&stateAgeMs<=this.thresholds.stateAgeMs,schedulerFresh=schedulerGapMs!==null&&schedulerGapMs<=this.thresholds.schedulerGapMs;
  const receiptReady=c.protocol==='receipt'&&neutralAgeMs!==null&&neutralAgeMs<=this.thresholds.controlAckMs&&this.neutralSentAt>=this.latch?.at;
  const legacyReady=c.protocol==='legacy'&&this.stateAt>this.latch?.at;
  return{paused:!!this.latch,ready:!!(this.latch&&this.ready&&owned(c)&&sameContext&&stateFresh&&schedulerFresh&&(receiptReady||legacyReady)),explicitAckSupported:c.protocol==='receipt',stateAgeMs,schedulerGapMs,neutralAgeMs};
 }
 resume(c,now,{explicit=false}={}){
  this.inspect(c,now,{intent:true});
  if(!explicit||!this.readiness(c,now).ready)return false;
  this.latch=null;this.ready=false;this.liveSince=expectsAck(c)?now:null;this.ackSentAt=null;return true;
 }
}
