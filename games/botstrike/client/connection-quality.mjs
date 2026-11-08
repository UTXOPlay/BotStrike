// Diagnostics only. These observations never enter native controls or decide hits.
export const QUALITY_WINDOW_MS=60000;
export const QUALITY_REPORT_MS=15000;
export const QUALITY_SAMPLE_LIMIT=4096;
export const QUALITY_TRACE_LIMIT=4096;
// Values at a catalog cap mean "at least this much", not an exact peak.
export const qualityMetrics=Object.freeze({
 appRttMs:60000,inputAckMs:60000,snapshotGapMs:60000,snapshotAgeMs:60000,
 interpolationAgeTicks:4096,predictionCorrectionUnits:100000,renderFrameMs:60000,mainThreadLongTaskMs:60000,
});
const countNames=['ackSkipped','ackUnmatched','pendingExpired','disconnects','predictionSnaps'];
const finite=value=>typeof value==='number'&&Number.isFinite(value)&&value>=0;
const sequence=value=>Number.isSafeInteger(value)&&value>=0;
const round=value=>Math.round(value*1000)/1000;
function append(list,entry,limit){
 if(!list.length||entry.at>=list.at(-1).at)list.push(entry);else list.splice(list.findLastIndex(value=>value.at<=entry.at)+1,0,entry);
 if(list.length>limit)list.shift();
}
function distribution(samples){
 if(!samples.length)return null;
 const values=samples.map(sample=>sample.value).sort((a,b)=>a-b),at=fraction=>round(values[Math.max(0,Math.ceil(values.length*fraction)-1)]);
 return {n:values.length,p50:at(.5),p95:at(.95),max:round(values.at(-1))};
}

export class ConnectionQuality{
 constructor({now=()=>performance.now()}={}){
  this.now=now;this.listeners=new Set();this.presentationListeners=new Set();this.connected=false;this.running=false;this.longTaskSupported=false;this.clear();
 }
 clear(at=this.now()){
  this.startedAt=at;this.reportBoundary=at;this.samples=Object.fromEntries(Object.keys(qualityMetrics).map(key=>[key,[]]));this.counters=Object.fromEntries(countNames.map(key=>[key,[]]));this.events=[];this.traceAt={};this.resetTracking();
 }
 resetTracking(){this.pending=new Map();this.pings=new Map();this.lastAck=null;this.snapshotAt=null;this.snapshotTick=null;this.frameAt=null;this.ageAt=null;}
 setRunning(running,at=this.now()){if(this.running!==!!running){this.running=!!running;this.runningSince=at;this.resetTracking();}}
 transport(connected,at=this.now()){
  if(this.connected&&!connected)this.count('disconnects',1,at);
  if(this.connected!==!!connected)this.resetTracking();this.connected=!!connected;
 }
 prune(at=this.now()){
  const cutoff=at-QUALITY_WINDOW_MS;
  for(const list of [...Object.values(this.samples),...Object.values(this.counters),this.events])while(list.length&&list[0].at<cutoff)list.shift();
  for(const [seq,sent]of this.pending)if(at-sent>10000){this.pending.delete(seq);this.count('pendingExpired',1,at);}
  for(const [time,sent]of this.pings)if(at-sent>10000)this.pings.delete(time);
 }
 event(kind,value,at){
  // High-rate frame diagnostics are decimated only in the local trace. Metric
  // distributions and ephemeral subscribers still see each measured draw.
  if(!['renderFrameMs','interpolationAgeTicks','snapshotAgeMs'].includes(kind)||at-(this.traceAt[kind]??-Infinity)>=250){
   append(this.events,{at,kind,value:round(value)},QUALITY_TRACE_LIMIT);this.traceAt[kind]=at;
  }
  if(this.listeners.size){const sample=Object.freeze({atMs:at,kind,value});for(const listener of this.listeners)try{listener(sample);}catch{}}
 }
 sample(kind,value,at=this.now()){
  if(!Object.hasOwn(qualityMetrics,kind)||!finite(value)||!finite(at))return;
  value=Math.min(qualityMetrics[kind],value);append(this.samples[kind],{at,value},QUALITY_SAMPLE_LIMIT);this.event(kind,value,at);
 }
 count(kind,value=1,at=this.now()){
  if(!countNames.includes(kind)||!Number.isSafeInteger(value)||value<=0||!finite(at))return;
  append(this.counters[kind],{at,value},QUALITY_SAMPLE_LIMIT);this.event(kind,value,at);
 }
 pingSent(time){if(!this.running||!this.connected||!finite(time))return;this.pings.set(time,time);while(this.pings.size>8)this.pings.delete(this.pings.keys().next().value);}
 pong(time,at=this.now()){
  const sent=this.pings.get(time);if(sent===undefined||at<sent)return null;this.pings.delete(time);const elapsed=at-sent;this.sample('appRttMs',elapsed,at);return elapsed;
 }
 inputSent(seq,at=this.now()){
  if(!this.running||!this.connected||!sequence(seq)||!finite(at))return;this.prune(at);this.pending.set(seq,at);
  while(this.pending.size>256){this.pending.delete(this.pending.keys().next().value);this.count('pendingExpired',1,at);}
 }
 acknowledge(lastSeq,at){
  if(!sequence(lastSeq)||this.lastAck!==null&&lastSeq<=this.lastAck)return;
  const baseline=this.lastAck;this.lastAck=lastSeq;let matched=false,skipped=0;
  for(const [seq,sent]of this.pending){if(seq>lastSeq)continue;this.pending.delete(seq);if(seq===lastSeq){matched=true;this.sample('inputAckMs',Math.max(0,at-sent),at);}else skipped++;}
  // Only the exact confirmed sequence is known to have executed. Earlier sent
  // sequences may have been coalesced; never invent per-command ACK latencies.
  if(skipped)this.count('ackSkipped',skipped,at);
  if(!matched&&baseline!==null)this.count('ackUnmatched',1,at);
 }
 snapshot(tick,lastSeq,at=this.now()){
  if(!this.running||!sequence(tick)||!finite(at)||this.snapshotTick!==null&&tick<=this.snapshotTick)return;
  this.prune(at);if(this.snapshotAt!==null)this.sample('snapshotGapMs',at-this.snapshotAt,at);
  this.snapshotAt=at;this.snapshotTick=tick;this.acknowledge(lastSeq,at);
 }
 correction({distance,snapped}={},at=this.now()){
  if(!this.running||!finite(distance))return;this.sample('predictionCorrectionUnits',distance,at);if(snapped)this.count('predictionSnaps',1,at);
 }
 frame(at,{rendered=false,viewTick=null}={}){
  if(!this.running){this.frameAt=null;return;}
  if(this.snapshotAt!==null&&(this.ageAt===null||at-this.ageAt>=100)){this.sample('snapshotAgeMs',Math.max(0,at-this.snapshotAt),at);this.ageAt=at;}
  if(!rendered){this.frameAt=null;return;}
  if(this.frameAt!==null)this.sample('renderFrameMs',Math.max(0,at-this.frameAt),at);this.frameAt=at;
  if(finite(viewTick)&&this.snapshotTick!==null)this.sample('interpolationAgeTicks',Math.max(0,this.snapshotTick-viewTick),at);
 }
 longTask(duration,at=this.now()){if(this.running&&this.longTaskSupported&&duration>=50&&at-duration>=(this.runningSince??0))this.sample('mainThreadLongTaskMs',duration,at);}
 summary(since,at,exclusiveStart=false){
  this.prune(at);since=Math.max(this.startedAt,since,at-QUALITY_WINDOW_MS);
  const included=sample=>(exclusiveStart?sample.at>since:sample.at>=since)&&sample.at<=at;
  return {version:1,windowMs:round(Math.max(0,Math.min(QUALITY_WINDOW_MS,at-since))),metrics:Object.fromEntries(Object.keys(qualityMetrics).map(key=>[key,distribution(this.samples[key].filter(included))])),counts:Object.fromEntries(countNames.map(key=>[key,Math.min(4096,this.counters[key].filter(included).reduce((sum,sample)=>sum+sample.value,0))]))};
 }
 read(at=this.now()){
  return {...this.summary(at-QUALITY_WINDOW_MS,at),live:{connected:this.connected,running:this.running,latestSnapshotAgeMs:this.snapshotAt===null?null:round(Math.max(0,at-this.snapshotAt)),pendingInputs:this.pending.size,longTaskSupported:this.longTaskSupported}};
 }
 beginReport(at=this.now()){this.reportBoundary=at;}
 report(at=this.now()){return this.summary(this.reportBoundary,at,true);}
 commitReport(at){this.reportBoundary=at;}
 trace(at=this.now()){
  const {live,...summary}=this.read(at);
  return {format:'botstrike-client-quality-1',...summary,limits:{windowMs:QUALITY_WINDOW_MS,samplesPerMetric:QUALITY_SAMPLE_LIMIT,traceEvents:QUALITY_TRACE_LIMIT,pendingInputs:256},longTaskSupported:live.longTaskSupported,events:this.events.map(event=>({atMs:round(event.at-this.startedAt),kind:event.kind,value:event.value}))};
 }
 subscribe(listener){return this.addListener(this.listeners,listener);}
 subscribePresentation(listener){return this.addListener(this.presentationListeners,listener);}
 addListener(listeners,listener){if(typeof listener!=='function'||listeners.size>=4)throw Error('Quality diagnostics support at most four local listeners per stream.');listeners.add(listener);return()=>listeners.delete(listener);}
 // The producer is evaluated only when an explicitly installed local lab
 // listens. Presentation frames are never retained, exported or shared.
 presentation(produce){if(!this.presentationListeners.size)return;const frame=produce();for(const listener of this.presentationListeners)try{listener(frame);}catch{}}
 dispose(){this.listeners.clear();this.presentationListeners.clear();this.resetTracking();}
}

const vector=value=>Array.isArray(value)&&value.length===3&&value.every(Number.isFinite)?Object.freeze([...value]):null;
export function presentationQualityFrame({atMs,animationAtMs=atMs,state,viewTick,renderTick=viewTick,slot,sequence,camera,local,predicted}){
 const players=(state?.players||[]).filter(player=>player&&!player.hidden&&player.optical!==false&&vector(player.position)).map(player=>Object.freeze({slot:player.slot,life:player.life,alive:player.alive,position:vector(player.position),yaw:player.yaw,pitch:player.pitch,stance:player.stance}));
 return Object.freeze({atMs,animationAtMs,tick:state?.tick??null,viewTick,renderTick,slot,sequence,camera:Object.freeze({position:vector(camera.position),yaw:camera.yaw,pitch:camera.pitch,roll:camera.roll,fov:camera.fov}),local:Object.freeze({position:vector(local),velocity:vector(predicted?.velocity),stance:predicted?.stance}),players:Object.freeze(players)});
}
