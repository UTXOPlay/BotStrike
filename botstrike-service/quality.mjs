// Private operational metadata only. No account-, room-, address- or position labels.
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {createHash,randomBytes} from 'node:crypto';

const SCHEMA=1;
const MAX_BUCKET_COUNT=2**37; // Even 32,768 buckets sum exactly within safe integers.
const cohorts=Object.freeze(['all','public','private','practice','tactical','casual']);
export const QUALITY_COHORTS=cohorts;
const definitions=Object.create(null);
function define(kind,component,unit,description,names,{trust='server',max=Number.MAX_SAFE_INTEGER,observationUnit=kind==='sample'?'individual_observation':kind==='counter'?'event_count':'gauge_observation'}={}){
 for(const name of names)definitions[name]=Object.freeze({kind,component,unit,trust,max,observationUnit,description:description[name]||description});
}
define('counter','runtime','events','Accepted server event count.',['inputAccepted','inputRejected','staleInputRejected','snapshotSent','snapshotWriteFailures','viewTickAdjusted','snapshotBackpressureDrops','reconnects','socketClosed','matchStarted','matchCompleted','matchAbandoned','matchFailed','recordingFailures','careerRecoveryFailures','retentionFailures','retentionPruned','clientReportsRejected']);
define('counter','runtime','events','Service-envelope admission/dispatch rejections and bounded recording rewrites; fixed reasons remain in private diagnostics, not labels.',['inputDeliveryRejected','inputDeliveryExpired','inputDeliveryUnknown','inputDeliveryContextRejected','inputClientUpdateRequired','inputRecordingRewrites']);
define('counter','sealer','events','Replay worker result count.',['sealFailures','sealCompleted']);
define('sample','runtime','ms',{
 inputAgeMs:'Age since the last admitted input on runtime monotonic time; separate absolute 400ms state-delivery receipt gates application, excluding unknown client/network transit time.',
 snapshotDeliveryIntervalMs:'Interval between successful server-side snapshot socket-write completions; not a browser delivery or render acknowledgement.',
 queueWaitMs:'Server-observed successful matchmaking placement wait.',
},['inputAgeMs','snapshotDeliveryIntervalMs','queueWaitMs'],{max:86400000});
define('sample','runtime','bytes','WebSocket bufferedAmount at a snapshot enqueue attempt; excludes TCP/kernel buffers.',['snapshotQueueBytes'],{max:2**40});
define('sample','native','ms',{
 nativeTickProcessingMs:'Parent-observed native command write to native frame response; includes pipe and scheduling delay, not pure native CPU.',
 nativeTickOverrunMs:'Server-observed tick deadline lateness; not browser or transport latency.',
},['nativeTickProcessingMs','nativeTickOverrunMs'],{max:86400000});
define('sample','sealer','ms',{
 sealQueueAgeMs:'Completed match enqueue to serialized replay worker start.',
 sealDurationMs:'Replay worker start to terminal success/failure, including worker I/O.',
},['sealQueueAgeMs','sealDurationMs'],{max:86400000});
define('sample','transport','ms',{
 socketRttMs:'Runtime WebSocket peer heartbeat ping to matching pong. Through a host this measures the inner runtime/proxy hop, NOT the browser path.',
 socketJitterMs:'Absolute difference of consecutive runtime-peer heartbeat RTTs for the same room/socket; NOT browser-path jitter.',
 reconnectGapMs:'Last socket departure to first returning socket; duplicate-tab handoff excluded.',
},['socketRttMs','socketJitterMs','reconnectGapMs'],{max:86400000});
define('sample','host','ms','Node host event-loop scheduling delay; not network latency.',['hostEventLoopDelayMs'],{max:86400000});
define('sample','host','ms','One Node main-thread monitorEventLoopDelay reporting-window p95; histogram quantiles summarize window p95 values, not original individual delays.',['hostEventLoopWindowP95Ms'],{max:86400000,observationUnit:'measured_window_p95'});
define('counter','host','histogram_observations','Original monitorEventLoopDelay sample count across reported non-overlapping windows.',['hostEventLoopSamples']);
define('sample','host','percent','Runtime Node process CPU including worker threads, excluding the separate gateway/native/verifier processes. One busy core is 100%; aggregate may exceed 100%.',['hostNodeCpuPercent'],{max:100000});
define('sample','gateway','percent','Shared gateway Node process CPU for the explicitly configured PID only, excluding all descendants (runtime/native/verifier). Not per-game attributed CPU; unavailable without a readable PID. One busy core is 100%.',['gatewayNodeCpuPercent'],{max:100000});
define('sample','native','percent','Combined native child CPU time divided by wall time; excludes Node and verifier CPU.',['nativeCpuPercent'],{max:100000});
define('sample','sealer','percent','Combined verifier CPU time divided by wall time; excludes Node/native simulation.',['verifierCpuPercent'],{max:100000});
define('sample','browser','world_units','Self-reported local prediction correction magnitude; untrusted, not a validated authority error.',['clientCorrectionUnits'],{trust:'untrusted_client',max:1000000});
define('sample','browser','ms',{
 clientInputDelayMs:'Untrusted client input event to WebSocket enqueue delay; not end-to-end latency.',
 clientSnapshotAgeMs:'Untrusted client estimate of snapshot age; clock alignment and estimator must be stated by reporter.',
 clientInterpolationAgeMs:'Untrusted client estimate of authoritative minus rendered tick age.',
 clientFrameMs:'Untrusted client render callback interval; software/browser scheduling is not physical display latency.',
 clientSchedulingDelayMs:'Untrusted client scheduling delay; not transport latency.',
 clientRttMs:'Untrusted application ping RTT including browser scheduling; separate from server heartbeat RTT.',
},['clientInputDelayMs','clientSnapshotAgeMs','clientInterpolationAgeMs','clientFrameMs','clientSchedulingDelayMs','clientRttMs'],{trust:'untrusted_client',max:86400000});
define('sample','browser','ms','One untrusted client reporting window p95 (window <=60s, normally non-overlapping 15s). Histogram quantiles describe window-p95 values, never original individual delays. Original n is counted separately.',[
 'clientAppRttWindowP95Ms','clientInputAckWindowP95Ms','clientSnapshotGapWindowP95Ms','clientSnapshotAgeWindowP95Ms','clientFrameWindowP95Ms','clientSchedulingWindowP95Ms',
],{trust:'untrusted_client',max:86400000,observationUnit:'reported_window_p95'});
define('sample','browser','ticks','One untrusted reporting window interpolation-age p95 in native ticks; not a raw tick-age sample. Original n is counted separately.',['clientInterpolationAgeWindowP95Ticks'],{trust:'untrusted_client',max:230400,observationUnit:'reported_window_p95'});
define('sample','browser','world_units','One untrusted reporting window correction-magnitude p95; not a raw correction. Original n is counted separately.',['clientCorrectionWindowP95Units'],{trust:'untrusted_client',max:1000000,observationUnit:'reported_window_p95'});
define('counter','browser','reported_observations','Sum of original sample n reported by untrusted non-overlapping client intervals; not host-validated observations.',[
 'clientAppRttSamples','clientInputAckSamples','clientSnapshotGapSamples','clientSnapshotAgeSamples','clientInterpolationAgeSamples','clientCorrectionSamples','clientFrameSamples','clientSchedulingSamples',
],{trust:'untrusted_client'});
define('counter','browser','reported_events','Untrusted client interval event count; never a server-confirmed event.',[
 'clientAckSkipped','clientAckUnmatched','clientPendingExpired','clientDisconnects','clientPredictionSnaps',
],{trust:'untrusted_client'});
define('gauge','runtime','items','Latest server occupancy observation; not a time-weighted average.',['liveRooms','waitingRooms','sealingRooms','publicHumanSeats','publicBotSeats']);
define('gauge','sealer','items','Latest number of queued plus running replay jobs.',['sealBacklog']);
define('gauge','host','bytes','Latest available filesystem bytes at the game data directory.',['diskAvailableBytes'],{max:2**50});
define('gauge','host','bytes','Latest sampled runtime Node RSS including its worker threads; excludes the separate gateway/native/verifier processes. Sampled peak is not an allocation maximum.',['hostRssBytes'],{max:2**50});
define('gauge','gateway','bytes','Latest sampled shared gateway Node process RSS for the explicitly configured PID only, excluding every descendant. Not per-game attributed memory; unavailable without a readable PID.',['gatewayRssBytes'],{max:2**50});
define('gauge','native','bytes','Latest combined native simulation RSS; excludes host/verifier.',['nativeRssBytes'],{max:2**50});
define('gauge','sealer','bytes','Latest combined verifier RSS; excludes host/native simulation.',['verifierRssBytes'],{max:2**50});
define('sample','gateway','ms','Authenticated host to immediate WebSocket peer RTT (or consecutive-RTT jitter). A Store proxy can answer before the browser hop; this is not end-to-end browser RTT, pure wire time or a JavaScript/render callback.',['gatewayExternalRttMs','gatewayExternalJitterMs'],{trust:'authenticated_gateway',max:86400000});
define('sample','gateway','bytes','Authenticated gateway WebSocket bufferedAmount, excluding TCP/kernel buffers.',['gatewayUpstreamQueueBytes','gatewayDownstreamQueueBytes'],{trust:'authenticated_gateway',max:2**40});
define('counter','gateway','events','Authenticated gateway report admission count.',['gatewayReports','gatewayReportsRejected'],{trust:'authenticated_gateway'});
export const QUALITY_METRICS=Object.freeze(definitions);

const alertDefinitions=Object.freeze({
 quality_write_failed:'error',quality_read_failed:'error',quality_corrupt_primary:'warning',quality_corrupt_backup:'warning',
 quality_recovered_backup:'warning',quality_history_unavailable:'error',quality_capacity:'warning',quality_provenance_unbound:'warning',
 career_recovery_failed:'error',retention_failed:'error',sealing_failed:'error',recording_failed:'error',
 native_stalled:'error',storage_low:'warning',drain_blocked:'warning',
});
const msBounds=[0,.5,1,2,4,8,16,32,64,125,250,500,1000,2000,5000,10000,30000,60000,300000,3600000,86400000];
const byteBounds=[0,1024,4096,16384,65536,262144,1048576,4194304,16777216,67108864,268435456,1073741824,4294967296,17179869184,68719476736,2**40,2**44,2**50];
const unitBounds=[0,.01,.1,.5,1,2,4,8,16,32,64,100,200,400,800,1600,3200,10000,100000,1000000];
const boundsFor=definition=>definition.unit==='ms'?msBounds:definition.unit==='bytes'?byteBounds:unitBounds;
const digest=value=>createHash('sha256').update(value).digest('hex');
const keys=(object,allowed)=>object&&typeof object==='object'&&!Array.isArray(object)&&Object.keys(object).every(key=>allowed.includes(key));
const integer=value=>Number.isSafeInteger(value)&&value>=0;
const finite=value=>Number.isFinite(value)&&value>=0;
function safeProvenance(value={}){
 return{
  sourceRevision:/^[a-f0-9]{7,64}$/.test(value.sourceRevision||'')?value.sourceRevision:'unknown',
  imageId:/^sha256:[a-f0-9]{64}$/.test(value.imageId||'')?value.imageId:'unknown',
  nativeProfile:/^[a-f0-9]{64}$/.test(value.nativeProfile||'')?value.nativeProfile:'unknown',
 };
}
function provenanceId(value){return digest(JSON.stringify(value)).slice(0,24);}
function errorCode(error){return ['ENOSPC','EACCES','EIO','EROFS','EMFILE','ENFILE','ENOENT','INVALID_DATA'].includes(error?.code)?error.code:'UNKNOWN';}
function invalid(){return Object.assign(Error('Invalid private quality snapshot'),{code:'INVALID_DATA'});}
function limit(value,defaultValue,min,max){if(value===undefined)return defaultValue;if(!Number.isSafeInteger(value)||value<min||value>max)throw Error('Invalid QualityStore limit');return value;}

export class QualityStore{
 constructor({directory,provenance={},now=Date.now,flushIntervalMs=10000,retentionMs=86400000,bucketMs=60000,maxSeries=512,maxBuckets=8192,maxBytes=4*1024*1024,maxGenerations=4,io=fs}={}){
  if(typeof directory!=='string'||!directory)throw Error('QualityStore requires a private directory');
  this.directory=path.resolve(directory);this.io=io;this.clock=now;
  this.limits={flushIntervalMs:limit(flushIntervalMs,10000,0,3600000),retentionMs:limit(retentionMs,86400000,1000,30*86400000),bucketMs:limit(bucketMs,60000,100,3600000),maxSeries:limit(maxSeries,512,1,1024),maxBuckets:limit(maxBuckets,8192,1,32768),maxBytes:limit(maxBytes,4*1024*1024,4096,16*1024*1024),maxGenerations:limit(maxGenerations,4,1,8)};
  if(this.limits.bucketMs>this.limits.retentionMs)throw Error('QualityStore bucket exceeds retention');
  this.provenance=safeProvenance(provenance);this.generation=provenanceId(this.provenance);this.processId=randomBytes(8).toString('hex');
  this.lastClock=0;this.restoredClockFloor=null;this.startedAt=this._now();this.generations=new Map([[this.generation,{id:this.generation,...this.provenance,firstAt:this.startedAt,lastAt:this.startedAt}]]);
  this.series=new Map();this.alerts=new Map();this.rejectedObservations=0;this.evictedBuckets=0;this.historyLost=false;this.loaded=false;this.dirty=false;this.version=0;this.lastPrune=0;this.lastGoodBytes=null;this.lastPersistedAt=null;this.lastErrorCode=null;this.writeFailures=0;this.closed=false;this.closing=false;
  if(Object.values(this.provenance).includes('unknown'))this.alert('quality_provenance_unbound');
  this.ready=this._load();
  if(this.limits.flushIntervalMs){this.timer=setInterval(()=>void this.flush(),this.limits.flushIntervalMs);this.timer.unref?.();}
 }
 _now(){const value=this.clock();if(!Number.isFinite(value)||value<0)throw Error('Invalid QualityStore clock');this.rawWallAt=Math.floor(value);this.lastClock=Math.max(this.lastClock||0,this.rawWallAt);return this.lastClock;}
 _clockState(){return{basis:'wall_clock_with_monotonic_persisted_floor',rawWallAt:this.rawWallAt,effectiveAt:this.lastClock,restoredFloorAt:this.restoredClockFloor,backwardSkewMs:Math.max(0,this.lastClock-this.rawWallAt),semantics:'Effective timestamps, windows and retention stop advancing during backward wall-clock skew; elapsed real time and UTC placement in that interval are unknown.'};}
 _changed(){this.dirty=true;this.version++;}
 _reject(){this.rejectedObservations=Math.min(Number.MAX_SAFE_INTEGER,this.rejectedObservations+1);this._changed();return false;}
 alert(code,{active=true}={}){
  if(!Object.hasOwn(alertDefinitions,code)||typeof active!=='boolean'||this.closed)return false;
  const now=this._now(),old=this.alerts.get(code);
  if(!active&&!old)return true;
  this.alerts.set(code,{code,severity:alertDefinitions[code],active,firstAt:old?.firstAt??now,lastAt:now,occurrences:Math.min(Number.MAX_SAFE_INTEGER,(old?.occurrences||0)+(active?1:0)),resolvedAt:active?null:now});this._changed();return true;
 }
 record(name,count=1,options={}){return this._observe('counter',name,count,options);}
 sample(name,value,options={}){return this._observe('sample',name,value,options);}
 gauge(name,value,options={}){return this._observe('gauge',name,value,options);}
 _observe(kind,name,value,options){
  if(this.closed||this.closing)return false;
  const definition=definitions[name];
  if(!definition||definition.kind!==kind||!keys(options,['cohort'])||!cohorts.includes(options.cohort??'all')||!finite(value)||value>definition.max||kind==='counter'&&(!integer(value)||value>MAX_BUCKET_COUNT))return this._reject();
  if(kind==='counter'&&value===0)return true;
  const now=this._now();if(now-this.lastPrune>=this.limits.bucketMs)this._prune(now);
  const cohort=options.cohort??'all',key=[this.generation,name,cohort].join('/');let series=this.series.get(key);
  if(!series){
   if(this.series.size>=this.limits.maxSeries){
    const old=[...this.series.entries()].filter(([,row])=>row.generation!==this.generation).sort(([,a],[,b])=>Math.max(...a.buckets.keys())-Math.max(...b.buckets.keys()))[0];
    if(old){this.evictedBuckets+=old[1].buckets.size;this.series.delete(old[0]);this.alert('quality_capacity');}
    else{this.alert('quality_capacity');return this._reject();}
   }
   series={generation:this.generation,name,cohort,buckets:new Map()};this.series.set(key,series);
  }
  const at=Math.floor(now/this.limits.bucketMs)*this.limits.bucketMs;let bucket=series.buckets.get(at);
  if(!bucket){bucket={at,count:0,sum:0,min:value,max:value,last:value,lastAt:now,lastProcess:this.processId,...(kind==='sample'?{histogram:Array(boundsFor(definition).length+1).fill(0)}:{})};series.buckets.set(at,bucket);}
  const increment=kind==='counter'?value:1;
  if(bucket.count+increment>MAX_BUCKET_COUNT||!Number.isFinite(bucket.sum+value))return this._reject();
  bucket.count+=increment;bucket.sum+=value;bucket.min=Math.min(bucket.min,value);bucket.max=Math.max(bucket.max,value);bucket.last=value;bucket.lastAt=now;bucket.lastProcess=this.processId;
  if(bucket.histogram){const index=boundsFor(definition).findIndex(bound=>value<=bound);bucket.histogram[index<0?bucket.histogram.length-1:index]++;}
  this.generations.get(this.generation).lastAt=now;this._changed();
  if(this._bucketCount()>this.limits.maxBuckets)this._trimOldest();
  return true;
 }
 _bucketCount(){let count=0;for(const series of this.series.values())count+=series.buckets.size;return count;}
 _trimOldest(){
  let oldest=null;
  for(const [key,series]of this.series)for(const at of series.buckets.keys())if(!oldest||at<oldest.at)oldest={key,at};
  if(!oldest)return false;
  const series=this.series.get(oldest.key);series.buckets.delete(oldest.at);if(!series.buckets.size)this.series.delete(oldest.key);
  this.evictedBuckets++;this.alert('quality_capacity');this._changed();return true;
 }
 _prune(now=this._now()){
  const cutoff=now-this.limits.retentionMs;let changed=false;
  for(const [key,series]of this.series){for(const at of series.buckets.keys())if(at+this.limits.bucketMs<=cutoff){series.buckets.delete(at);changed=true;}if(!series.buckets.size)this.series.delete(key);}
  for(const [id,generation]of this.generations)if(id!==this.generation&&generation.lastAt<cutoff){this.generations.delete(id);changed=true;}
  const others=[...this.generations.values()].filter(g=>g.id!==this.generation).sort((a,b)=>a.lastAt-b.lastAt);
  while(this.generations.size>this.limits.maxGenerations){const removed=others.shift();this.generations.delete(removed.id);for(const [key,series]of this.series)if(series.generation===removed.id){this.evictedBuckets+=series.buckets.size;this.series.delete(key);}changed=true;this.alert('quality_capacity');}
  while(this._bucketCount()>this.limits.maxBuckets||this.series.size>this.limits.maxSeries)this._trimOldest();
  this.lastPrune=now;if(changed)this._changed();
 }
 health(){this._now();return{
  ok:this.loaded&&!this.historyLost&&![...this.alerts.values()].some(alert=>alert.active&&alert.severity==='error'),
  status:!this.loaded?'loading':this.closed?'closed':[...this.alerts.values()].some(alert=>alert.active)||this.historyLost||this.lastClock>this.rawWallAt?'degraded':'ok',
  loaded:this.loaded,historyLost:this.historyLost,lastPersistedAt:this.lastPersistedAt,lastErrorCode:this.lastErrorCode,writeFailures:this.writeFailures,
  dirty:this.dirty,rejectedObservations:this.rejectedObservations,evictedBuckets:this.evictedBuckets,series:this.series.size,buckets:this._bucketCount(),
  alerts:[...this.alerts.values()].map(alert=>({...alert})),clock:this._clockState(),
 };}
 snapshot({windowMs=Math.min(300000,this.limits.retentionMs),includeHistory=false}={}){
  if(!Number.isSafeInteger(windowMs)||windowMs<1||windowMs>this.limits.retentionMs||typeof includeHistory!=='boolean')throw Error('Invalid QualityStore reporting window');
  const now=this._now();this._prune(now);const start=now-windowMs,rows=[];
  for(const series of this.series.values()){
   const definition=definitions[series.name],buckets=[...series.buckets.values()].filter(bucket=>bucket.at+this.limits.bucketMs>start&&bucket.at<=now).sort((a,b)=>a.at-b.at);if(!buckets.length)continue;
   const count=buckets.reduce((sum,bucket)=>sum+bucket.count,0),sum=buckets.reduce((sum,bucket)=>sum+bucket.sum,0),min=Math.min(...buckets.map(b=>b.min)),max=Math.max(...buckets.map(b=>b.max)),last=buckets.reduce((a,b)=>a.lastAt>b.lastAt?a:b);
   const row={metric:series.name,generation:series.generation,cohort:series.cohort,component:definition.component,kind:definition.kind,unit:definition.unit,trust:definition.trust,observationUnit:definition.observationUnit,description:definition.description,observations:count,buckets:buckets.length,firstBucketAt:buckets[0].at,lastObservationAt:last.lastAt,min,max,...(definition.kind==='counter'?{count}:{mean:sum/count}),...(definition.kind==='gauge'?{value:last.last,staleAfterRestart:last.lastProcess!==this.processId}:{})};
   if(definition.kind==='sample'){
    const bounds=boundsFor(definition),histogram=Array(bounds.length+1).fill(0);for(const bucket of buckets)bucket.histogram.forEach((value,index)=>histogram[index]+=value);
    const quantile=p=>{const target=Math.ceil(count*p);let cumulative=0;for(let index=0;index<histogram.length;index++){cumulative+=histogram[index];if(cumulative>=target)return{lower:index===0?0:bounds[index-1],upper:Math.min(max,bounds[index]??max)};}return null;};
    row.quantiles={method:'fixed_histogram_bin_bounds',p50:quantile(.5),p95:quantile(.95),p99:quantile(.99)};row.p50=row.quantiles.p50.upper;row.p95=row.quantiles.p95.upper;row.p99=row.quantiles.p99.upper;
   }
   if(includeHistory)row.history=buckets.map(bucket=>({bucketAt:bucket.at,observations:bucket.count,...(definition.kind==='counter'?{count:bucket.count}:{min:bucket.min,max:bucket.max,mean:bucket.sum/bucket.count,last:bucket.last,lastAt:bucket.lastAt}),...(bucket.histogram?{histogram:[...bucket.histogram]}:{})}));
   rows.push(row);
  }
  return{schemaVersion:SCHEMA,generatedAt:now,startedAt:this.startedAt,currentGeneration:this.generation,provenance:{...this.provenance},provenanceBound:!Object.values(this.provenance).includes('unknown'),generations:[...this.generations.values()].map(g=>({...g})),window:{requestedMs:windowMs,requestedStart:start,bucketMs:this.limits.bucketMs,semantics:'intersecting_bucket_counts; up to one bucket of leading overhang',quantiles:'histogram bounds, not exact sample percentiles'},limits:{...this.limits},health:this.health(),series:rows};
 }
 _payload(){return{schemaVersion:SCHEMA,bucketMs:this.limits.bucketMs,savedAt:this._now(),generations:[...this.generations.values()],series:[...this.series.values()].map(series=>({...series,buckets:[...series.buckets.values()]})),alerts:[...this.alerts.values()],rejectedObservations:this.rejectedObservations,evictedBuckets:this.evictedBuckets,writeFailures:this.writeFailures,historyLost:this.historyLost};}
 _encode(){
  let text;
  do{const payload=this._payload(),body=JSON.stringify(payload);text=JSON.stringify({checksum:digest(body),payload})+'\n';if(Buffer.byteLength(text)<=this.limits.maxBytes)return text;}while(this._trimOldest());
  throw Object.assign(Error('Quality snapshot exceeds capacity'),{code:'ENOSPC'});
 }
 _decode(text){
  if(typeof text!=='string'||Buffer.byteLength(text)>this.limits.maxBytes)throw invalid();
  const envelope=JSON.parse(text);if(!keys(envelope,['checksum','payload'])||typeof envelope.checksum!=='string'||!envelope.payload||digest(JSON.stringify(envelope.payload))!==envelope.checksum)throw invalid();
  const p=envelope.payload;
  if(!keys(p,['schemaVersion','bucketMs','savedAt','generations','series','alerts','rejectedObservations','evictedBuckets','writeFailures','historyLost'])||p.schemaVersion!==SCHEMA||p.bucketMs!==this.limits.bucketMs||!integer(p.savedAt)||!Array.isArray(p.generations)||p.generations.length>8||!Array.isArray(p.series)||p.series.length>1024||!Array.isArray(p.alerts)||p.alerts.length>Object.keys(alertDefinitions).length||!integer(p.rejectedObservations)||!integer(p.evictedBuckets)||!integer(p.writeFailures)||typeof p.historyLost!=='boolean')throw invalid();
  const generations=new Map();for(const generation of p.generations){if(!keys(generation,['id','sourceRevision','imageId','nativeProfile','firstAt','lastAt'])||generation.id!==provenanceId(safeProvenance(generation))||JSON.stringify(safeProvenance(generation))!==JSON.stringify({sourceRevision:generation.sourceRevision,imageId:generation.imageId,nativeProfile:generation.nativeProfile})||!integer(generation.firstAt)||!integer(generation.lastAt)||generation.lastAt<generation.firstAt||generations.has(generation.id))throw invalid();generations.set(generation.id,generation);}
  let bucketCount=0;const seriesKeys=new Set();
  for(const series of p.series){const definition=definitions[series.name],key=[series.generation,series.name,series.cohort].join('/');if(!keys(series,['generation','name','cohort','buckets'])||!definition||!generations.has(series.generation)||!cohorts.includes(series.cohort)||!Array.isArray(series.buckets)||seriesKeys.has(key))throw invalid();seriesKeys.add(key);const ats=new Set();
   for(const bucket of series.buckets){if(++bucketCount>32768||!keys(bucket,['at','count','sum','min','max','last','lastAt','lastProcess','histogram'])||!integer(bucket.at)||bucket.at%this.limits.bucketMs!==0||!integer(bucket.count)||!bucket.count||bucket.count>MAX_BUCKET_COUNT||!finite(bucket.sum)||!finite(bucket.min)||!finite(bucket.max)||bucket.min>bucket.max||bucket.max>definition.max||!finite(bucket.last)||bucket.last<bucket.min||bucket.last>bucket.max||!integer(bucket.lastAt)||bucket.lastAt<bucket.at||bucket.lastAt>=bucket.at+this.limits.bucketMs||bucket.lastAt>p.savedAt||!/^[a-f0-9]{16}$/.test(bucket.lastProcess||'')||ats.has(bucket.at))throw invalid();ats.add(bucket.at);
    if(definition.kind==='sample'){if(!Array.isArray(bucket.histogram)||bucket.histogram.length!==boundsFor(definition).length+1||bucket.histogram.some(v=>!integer(v))||bucket.histogram.reduce((a,b)=>a+b,0)!==bucket.count)throw invalid();}else if(bucket.histogram!==undefined)throw invalid();
   }
  }
  const alertCodes=new Set();for(const alert of p.alerts){if(!keys(alert,['code','severity','active','firstAt','lastAt','occurrences','resolvedAt'])||!Object.hasOwn(alertDefinitions,alert.code)||alert.severity!==alertDefinitions[alert.code]||typeof alert.active!=='boolean'||!integer(alert.firstAt)||!integer(alert.lastAt)||alert.lastAt<alert.firstAt||!integer(alert.occurrences)||!(alert.resolvedAt===null||integer(alert.resolvedAt))||alertCodes.has(alert.code))throw invalid();alertCodes.add(alert.code);}
  return p;
 }
 async _read(file){
  const target=path.join(this.directory,file),metadata=await this.io.lstat(target);if(!metadata.isFile()||metadata.isSymbolicLink()||metadata.size>this.limits.maxBytes)throw invalid();
  const text=await this.io.readFile(target,'utf8');return{text,payload:this._decode(text)};
 }
 async _writeTemporary(file,text){
  const target=path.join(this.directory,file);
  try{await this.io.unlink(target);}catch(error){if(error.code!=='ENOENT')throw error;}
  // A stale temporary symlink must not turn a quality flush into another write.
  await this.io.writeFile(target,text,{mode:0o600,flag:'wx'});
 }
 _merge(payload){
  // Preserve the last valid persisted time across process restarts. A rolled
  // back wall clock must not publish savedAt before restored observations or
  // expire/rebucket them under a fabricated earlier timeline.
  this.restoredClockFloor=payload.savedAt;this.lastClock=Math.max(this.lastClock,payload.savedAt);
  for(const generation of payload.generations){const current=this.generations.get(generation.id);this.generations.set(generation.id,current?{...current,firstAt:Math.min(current.firstAt,generation.firstAt),lastAt:Math.max(current.lastAt,generation.lastAt)}:{...generation});}
  for(const loaded of payload.series){const key=[loaded.generation,loaded.name,loaded.cohort].join('/'),current=this.series.get(key)||{generation:loaded.generation,name:loaded.name,cohort:loaded.cohort,buckets:new Map()};
   for(const saved of loaded.buckets){const bucket=current.buckets.get(saved.at);if(!bucket){current.buckets.set(saved.at,{...saved,...(saved.histogram?{histogram:[...saved.histogram]}:{})});continue;}
    bucket.count+=saved.count;bucket.sum+=saved.sum;bucket.min=Math.min(bucket.min,saved.min);bucket.max=Math.max(bucket.max,saved.max);if(saved.lastAt>bucket.lastAt){bucket.last=saved.last;bucket.lastAt=saved.lastAt;bucket.lastProcess=saved.lastProcess;}if(saved.histogram)saved.histogram.forEach((value,index)=>bucket.histogram[index]+=value);
   }this.series.set(key,current);
  }
  for(const saved of payload.alerts){const current=this.alerts.get(saved.code);this.alerts.set(saved.code,current?{...current,firstAt:Math.min(current.firstAt,saved.firstAt),occurrences:current.occurrences+saved.occurrences}:{...saved});}
  this.rejectedObservations+=payload.rejectedObservations;this.evictedBuckets+=payload.evictedBuckets;this.writeFailures+=payload.writeFailures;this.historyLost ||= payload.historyLost;this.lastPersistedAt=payload.savedAt;
 }
 async _load(){
  let chosen,primaryFailure,backupFailure,fromBackup=false;
  try{chosen=await this._read('quality.json');}catch(error){if(error.code!=='ENOENT')primaryFailure=error;}
  if(!chosen)try{chosen=await this._read('quality.previous.json');fromBackup=true;}catch(error){if(error.code!=='ENOENT')backupFailure=error;}
  if(chosen){this._merge(chosen.payload);this.lastGoodBytes=chosen.text;this._changed();}
  if(primaryFailure){this.lastErrorCode=primaryFailure instanceof SyntaxError?'INVALID_DATA':errorCode(primaryFailure);this.alert(primaryFailure.code==='INVALID_DATA'||primaryFailure instanceof SyntaxError?'quality_corrupt_primary':'quality_read_failed');}
  if(fromBackup)this.alert('quality_recovered_backup');
  if(backupFailure)this.alert(backupFailure.code==='INVALID_DATA'||backupFailure instanceof SyntaxError?'quality_corrupt_backup':'quality_read_failed');
  if(!chosen&&(primaryFailure||backupFailure)){this.historyLost=true;this.alert('quality_history_unavailable');}
  this.loaded=true;this._prune();return this.health();
 }
 flush(){
  if(this.closed)return Promise.resolve(this.health());if(this.flushing)return this.flushing;
  this.flushing=(async()=>{
   await this.ready;if(!this.dirty)return this.health();
   try{
    this._prune();const text=this._encode(),version=this.version;
    await this.io.mkdir(this.directory,{recursive:true,mode:0o700});
    await this._writeTemporary('quality.previous.tmp',this.lastGoodBytes||text);await this.io.rename(path.join(this.directory,'quality.previous.tmp'),path.join(this.directory,'quality.previous.json'));
    await this._writeTemporary('quality.tmp',text);await this.io.rename(path.join(this.directory,'quality.tmp'),path.join(this.directory,'quality.json'));
    this.lastGoodBytes=text;this.lastPersistedAt=JSON.parse(text).payload.savedAt;this.lastErrorCode=null;this.dirty=this.version!==version;
    for(const code of ['quality_write_failed','quality_read_failed','quality_corrupt_primary','quality_corrupt_backup','quality_recovered_backup'])if(this.alerts.get(code)?.active)this.alert(code,{active:false});
   }catch(error){this.writeFailures++;this.lastErrorCode=errorCode(error);this.alert('quality_write_failed');}
   return this.health();
  })().finally(()=>{this.flushing=null;});return this.flushing;
 }
 async close(){
  if(this.closed)return this.health();this.closing=true;clearInterval(this.timer);await this.flush();if(this.dirty&&!this.alerts.get('quality_write_failed')?.active)await this.flush();this.closed=true;return this.health();
 }
}
