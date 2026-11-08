// Private, offline engineering-budget report. Does not change runtime alerts.
import * as fs from 'node:fs/promises';
import {constants} from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

const MINUTE=60000,MAX_BYTES=8*1024*1024,MAX_COUNT=2**37;
// QualityStore schema 1: each bin includes its upper bound; the next bin is > it.
const MS_BOUNDS=Object.freeze([0,.5,1,2,4,8,16,32,64,125,250,500,1000,2000,5000,10000,30000,60000,300000,3600000,86400000]);
export const QUALITY_OBJECTIVE_POLICY=Object.freeze({
 version:1,bucketMs:MINUTE,completeBuckets:2,maximumExceededPercent:1,
 nativeTickProcessingMs:Object.freeze({thresholdMs:16,minimumSamplesPerBucket:512,component:'native',observationUnit:'individual_observation',
  operatorResponse:'Inspect Native command scheduling, pipe backpressure and CPU contention; reduce admitted concurrency if necessary, then remeasure the same normal-clock candidate.'}),
 nativeTickOverrunMs:Object.freeze({thresholdMs:32,minimumSamplesPerBucket:512,component:'native',observationUnit:'individual_observation',
  operatorResponse:'Inspect runtime scheduling, recording I/O and Native stalls; preserve the 15.625ms clock and 400ms input deadline while investigating.'}),
 hostEventLoopWindowP95Ms:Object.freeze({thresholdMs:32,minimumSamplesPerBucket:10,component:'host',observationUnit:'measured_window_p95',
  operatorResponse:'Inspect runtime Node main-thread blocking, serialization and worker load; compare original monitor sample counts and remeasure with the same monitor resolution.'}),
});
const METRICS=['nativeTickProcessingMs','nativeTickOverrunMs','hostEventLoopWindowP95Ms'];
const ALERTS=Object.freeze({
 quality_write_failed:'error',quality_read_failed:'error',quality_corrupt_primary:'warning',quality_corrupt_backup:'warning',
 quality_recovered_backup:'warning',quality_history_unavailable:'error',quality_capacity:'warning',quality_provenance_unbound:'warning',
 career_recovery_failed:'error',retention_failed:'error',sealing_failed:'error',recording_failed:'error',
 native_stalled:'error',storage_low:'warning',drain_blocked:'warning',
});
const HISTORY_ALERTS=new Set(['quality_read_failed','quality_corrupt_primary','quality_corrupt_backup','quality_recovered_backup','quality_history_unavailable','quality_capacity']);
const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const integer=v=>Number.isSafeInteger(v)&&v>=0;
const number=v=>Number.isFinite(v)&&v>=0;
const sha=b=>createHash('sha256').update(b).digest('hex');
const sum=values=>values.reduce((a,b)=>a+b,0);
const own=(v,k)=>object(v)&&Object.hasOwn(v,k);
const issue=code=>Object.assign(Error(code),{code});
function provenanceValid(p){
 return object(p)&&/^[a-f0-9]{7,64}$/.test(p.sourceRevision||'')&&/^sha256:[a-f0-9]{64}$/.test(p.imageId||'')&&/^[a-f0-9]{64}$/.test(p.nativeProfile||'');
}
function activeAlerts(health){
 const alerts=[],errors=[];let invalid=false;
 if(!Array.isArray(health?.alerts)||health.alerts.length>32)return{alerts,errors,invalid:true};
 for(const a of health.alerts){
  if(!object(a)||typeof a.active!=='boolean'){invalid=true;continue;}
  if(!a.active)continue;
  const known=own(ALERTS,a.code)&&ALERTS[a.code]===a.severity;
  const row={code:known?a.code:'unrecognized_alert',severity:known?a.severity:'error'};
  alerts.push(row);if(row.severity==='error')errors.push(row);
  if(!known)invalid=true;
 }
 return{alerts,errors,invalid};
}
function globalConditions(q){
 const reasons=[];
 if(!object(q)||q.schemaVersion!==1)return{reasons:['unsupported_quality_schema'],alerts:[],errors:[],window:null};
 const h=q.health,clock=h?.clock,alerts=activeAlerts(h);
 if(q.provenanceBound!==true||!provenanceValid(q.provenance))reasons.push('provenance_unbound_or_invalid');
 if(!object(h)||h.loaded!==true||h.ok!==true||!['ok','degraded'].includes(h.status))reasons.push('quality_health_unavailable');
 if(h?.historyLost!==false)reasons.push('quality_history_incomplete');
 if(!integer(h?.rejectedObservations)||h.rejectedObservations!==0)reasons.push('rejected_or_missing_observation_count');
 if(!integer(h?.evictedBuckets)||h.evictedBuckets!==0)reasons.push('evicted_or_missing_bucket_count');
 if(alerts.invalid)reasons.push('invalid_health_alerts');
 if(alerts.errors.length)reasons.push('active_error_alerts');
 if(alerts.alerts.some(a=>HISTORY_ALERTS.has(a.code)))reasons.push('active_history_integrity_alert');
 if(!object(clock)||clock.basis!=='wall_clock_with_monotonic_persisted_floor'||clock.backwardSkewMs!==0||
  !integer(clock.rawWallAt)||clock.rawWallAt!==clock.effectiveAt||!integer(q.generatedAt)||clock.effectiveAt<q.generatedAt||
  !(clock.restoredFloorAt===null||integer(clock.restoredFloorAt)&&clock.restoredFloorAt<=clock.rawWallAt))reasons.push('clock_skew_or_missing_clock_evidence');
 const g=Array.isArray(q.generations)&&q.generations.length<=8?q.generations.filter(g=>g?.id===q.currentGeneration):[];
 if(!/^[a-f0-9]{24}$/.test(q.currentGeneration||'')||g.length!==1||!provenanceValid(g[0])||
  !integer(g[0]?.lastAt)||g[0].firstAt>g[0].lastAt||g[0].lastAt>q.generatedAt||
  ['sourceRevision','imageId','nativeProfile'].some(k=>g[0]?.[k]!==q.provenance?.[k]))reasons.push('current_generation_unverified');
 let window=null;
 if(integer(q.generatedAt)&&q.generatedAt>=2*MINUTE){
  const to=Math.floor(q.generatedAt/MINUTE)*MINUTE,from=to-2*MINUTE;
  window={from,to,interval:'[from,to)',bucketMs:MINUTE,bucketStarts:[from,from+MINUTE],reference:'snapshot.generatedAt; historical file, not current wall time'};
  if(q.window?.bucketMs!==MINUTE||q.limits?.bucketMs!==MINUTE||!integer(q.window?.requestedStart)||
   !integer(q.window?.requestedMs)||q.window.requestedMs<2*MINUTE||q.generatedAt-q.window.requestedStart!==q.window.requestedMs||
   q.window.requestedStart>from)reasons.push('requested_history_window_incomplete');
  if(!integer(q.startedAt)||q.startedAt>from||!integer(g[0]?.firstAt)||g[0].firstAt>from)reasons.push('generation_or_process_warming');
 }else reasons.push('invalid_snapshot_time');
 if(!Array.isArray(q.series)||q.series.length>1024)reasons.push('invalid_series_inventory');
 return{reasons:[...new Set(reasons)],alerts:alerts.alerts,errors:alerts.errors,window};
}
function validateHistory(series,generatedAt){
 if(!Array.isArray(series.history)||!series.history.length||series.history.length>32768)return{reason:'missing_histogram_history'};
 const seen=new Set();let observations=0;
 for(const b of series.history){
  if(!object(b)||!integer(b.bucketAt)||b.bucketAt%MINUTE||b.bucketAt>generatedAt||seen.has(b.bucketAt))return{reason:'duplicate_or_invalid_bucket'};
  seen.add(b.bucketAt);
  if(!integer(b.observations)||b.observations<1||b.observations>MAX_COUNT||!Array.isArray(b.histogram)||b.histogram.length!==MS_BOUNDS.length+1||
   b.histogram.some(n=>!integer(n)||n>MAX_COUNT)||sum(b.histogram)!==b.observations)return{reason:'invalid_histogram_count'};
  if(![b.min,b.max,b.mean,b.last].every(number)||b.min>b.max||b.max>MS_BOUNDS.at(-1)||b.mean<b.min||b.mean>b.max||
   b.last<b.min||b.last>b.max||!integer(b.lastAt)||b.lastAt<b.bucketAt||b.lastAt>=b.bucketAt+MINUTE||b.lastAt>generatedAt)return{reason:'invalid_bucket_observations'};
  const bin=v=>{const i=MS_BOUNDS.findIndex(bound=>v<=bound);return i<0?MS_BOUNDS.length:i;};
  const first=b.histogram.findIndex(n=>n>0),last=b.histogram.findLastIndex(n=>n>0);
  if(bin(b.min)!==first||bin(b.max)!==last||!b.histogram[bin(b.last)])return{reason:'histogram_value_bounds_disagree'};
  observations+=b.observations;if(!Number.isSafeInteger(observations))return{reason:'histogram_count_overflow'};
 }
 if(series.observations!==observations||series.buckets!==series.history.length)return{reason:'series_history_count_disagrees'};
 return{buckets:new Map(series.history.map(b=>[b.bucketAt,b]))};
}
function evaluateMetric(q,name,global){
 const policy=QUALITY_OBJECTIVE_POLICY[name],result={metric:name,status:'unknown',thresholdMs:policy.thresholdMs,comparison:'strictly_greater_than',
  maximumExceededPercent:1,sampleUnit:policy.observationUnit,minimumSamplesPerBucket:policy.minimumSamplesPerBucket,coveredWindow:global.window,
  samples:null,exceeded:null,exceededPercent:null,buckets:[],reasons:[...global.reasons],operatorResponse:policy.operatorResponse};
 const rows=Array.isArray(q?.series)?q.series.filter(s=>s?.metric===name&&s.generation===q.currentGeneration&&s.cohort==='all'):[];
 if(rows.length!==1){result.reasons.push(rows.length?'duplicate_current_generation_all_series':'missing_current_generation_all_series');return result;}
 const s=rows[0];
 if(s.kind!=='sample'||s.component!==policy.component||s.unit!=='ms'||s.trust!=='server'||s.observationUnit!==policy.observationUnit||
  s.quantiles?.method!=='fixed_histogram_bin_bounds'){result.reasons.push('metric_contract_mismatch');return result;}
 const history=validateHistory(s,q.generatedAt);
 if(history.reason){result.reasons.push(history.reason);return result;}
 if(!global.window)return result;
 for(const at of global.window.bucketStarts){
  const b=history.buckets.get(at);
  if(!b){result.reasons.push('missing_complete_minute_bucket');continue;}
  const exceeded=sum(b.histogram.slice(MS_BOUNDS.indexOf(policy.thresholdMs)+1));
  result.buckets.push({from:at,to:at+MINUTE,samples:b.observations,exceeded,thresholdUpperBoundInclusiveMs:policy.thresholdMs});
  if(b.observations<policy.minimumSamplesPerBucket)result.reasons.push('insufficient_samples_in_complete_bucket');
 }
 result.reasons=[...new Set(result.reasons)];
 if(result.buckets.length===2){
  result.samples=sum(result.buckets.map(b=>b.samples));result.exceeded=sum(result.buckets.map(b=>b.exceeded));
  result.exceededPercent=100*result.exceeded/result.samples;
  if(!result.reasons.length)result.status=BigInt(result.exceeded)*100n<=BigInt(result.samples)?'met':'breached';
 }
 return result;
}
function metadata(q,payload){
 const singleSeal={};
 for(const name of ['sealQueueAgeMs','sealDurationMs']){
  const rows=Array.isArray(q?.series)?q.series.filter(s=>s?.metric===name&&s.generation===q.currentGeneration&&s.cohort==='all'):[];
  const s=rows.length===1?rows[0]:null,valid=s&&s.kind==='sample'&&s.component==='sealer'&&s.unit==='ms'&&s.trust==='server'&&s.observationUnit==='individual_observation'&&!validateHistory(s,q.generatedAt).reason;
  singleSeal[name]=valid?{observations:s.observations,minMs:Math.min(...s.history.map(b=>b.min)),maxMs:Math.max(...s.history.map(b=>b.max)),objective:false,percentilesReported:false}:{observations:null,minMs:null,maxMs:null,objective:false,percentilesReported:false};
 }
 const r=payload?.resources,resources={measurement:'sampled process intervals; may miss peaks or short-lived processes; no capacity objective'};
 for(const role of ['host','gateway','native','verifier']){
  const v=r?.[role],available=object(v)&&r.available!==false&&(role==='host'?number(v.cpuPercent)&&number(v.rssBytes):v.available===true);
  resources[role]={available,cpuPercent:available&&number(v.cpuPercent)?v.cpuPercent:null,rssBytes:available&&integer(v.rssBytes)?v.rssBytes:null,
   sampled:true,scope:role==='host'?'runtime_Node_including_workers':role==='gateway'?'configured_shared_gateway_process_only':'separate_'+role+'_process_family'};
 }
 return{singleSeal,sampledResources:resources,staleGaugesUsedAsMeasurements:false,scope:'Metadata only, from the snapshot; no new seal or sampled-resource SLO.'};
}
export function evaluateQualityObjectives(payload){
 const q=payload?.quality,global=globalConditions(q),objectives=METRICS.map(name=>evaluateMetric(q,name,global));
 const status=objectives.some(o=>o.status==='breached')?'breached':objectives.some(o=>o.status==='unknown')?'unknown':'met';
 return{schemaVersion:1,private:true,status,inputSha256:null,inputBytes:null,policyVersion:1,qualitySchemaVersion:q?.schemaVersion??null,
  generation:/^[a-f0-9]{24}$/.test(q?.currentGeneration||'')?q.currentGeneration:null,cohort:'all',snapshotGeneratedAt:integer(q?.generatedAt)?q.generatedAt:null,
  declaredProvenance:{sourceRevision:/^[a-f0-9]{7,64}$/.test(q?.provenance?.sourceRevision||'')?q.provenance.sourceRevision:'unknown',
   imageId:/^sha256:[a-f0-9]{64}$/.test(q?.provenance?.imageId||'')?q.provenance.imageId:'unknown',
   nativeProfile:/^[a-f0-9]{64}$/.test(q?.provenance?.nativeProfile||'')?q.provenance.nativeProfile:'unknown'},
  provenanceBound:q?.provenanceBound===true,externalImageMetadataDoesNotOverrideQualityProvenance:true,
  policy:{completeNonoverlappingMinuteBuckets:2,nativeTickMs:15.625,inputDeadlineMs:400,msHistogramUpperBounds:MS_BOUNDS,
   thresholdMeaning:'16/32ms are quantized operating budgets near one/two Native ticks; no rule, tick cadence or input-deadline change.',
   eventLoopMeaning:'Count directly measured reporting-window p95 values above32ms. Denominator is reporting windows, never original delays or hostEventLoopSamples.'},
  coveredWindow:global.window,objectives,activeAlerts:global.alerts,activeErrorAlerts:global.errors,
  errorAlertOperatorResponse:'Resolve active runtime/storage/history errors and restore trustworthy measurement before using a met result as operational evidence.',
  metadata:metadata(q,payload),acceptanceComplete:false,networkAcceptance:false,
  limitations:['Private offline engineering budgets for the two completed minutes identified here; not a current live monitor or notification service.',
   'File SHA binds input bytes; declared provenance is checked, not independently authenticated against an image or signed measurement.',
   'No Internet SLO, room/player capacity, physical-device, competitive fairness or issue-completion acceptance follows from this report.',
   'Incomplete history, provenance, clock, trust, units, sample counts or active errors produce unknown; unavailable is never zero.']};
}
function identity(s){return['dev','ino','size','mtimeNs','ctimeNs'].map(k=>String(s[k])).join(':');}
export async function reportQualityFile(file){
 if(typeof file!=='string'||!file)throw issue('QUALITY_FILE_REQUIRED');
 const resolved=path.resolve(file);
 if(await fs.realpath(resolved)!==resolved)throw issue('QUALITY_FILE_SYMLINK');
 const before=await fs.lstat(resolved,{bigint:true});
 if(!before.isFile()||before.isSymbolicLink())throw issue('QUALITY_FILE_NOT_REGULAR');
 if(before.size>BigInt(MAX_BYTES))throw issue('QUALITY_FILE_TOO_LARGE');
 const handle=await fs.open(resolved,constants.O_RDONLY|constants.O_NOFOLLOW|constants.O_NONBLOCK);let bytes;
 try{
  if(identity(before)!==identity(await handle.stat({bigint:true})))throw issue('QUALITY_FILE_CHANGED');
  const chunks=[];let length=0;
  while(true){const buffer=Buffer.alloc(65536),r=await handle.read(buffer,0,buffer.length,null);if(!r.bytesRead)break;length+=r.bytesRead;if(length>MAX_BYTES)throw issue('QUALITY_FILE_TOO_LARGE');chunks.push(buffer.subarray(0,r.bytesRead));}
  if(identity(before)!==identity(await handle.stat({bigint:true}))||identity(before)!==identity(await fs.lstat(resolved,{bigint:true})))throw issue('QUALITY_FILE_CHANGED');
  bytes=Buffer.concat(chunks,length);
 }finally{await handle.close();}
 let payload;
 try{payload=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));}catch{throw issue('QUALITY_INPUT_JSON_INVALID');}
 return{...evaluateQualityObjectives(payload),inputSha256:sha(bytes),inputBytes:bytes.length};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  const args=process.argv.slice(2);
  if(args.length!==2||args[0]!=='--file'||!args[1])throw issue('USAGE_NODE_QUALITY_OBJECTIVES_REPORT_--file_PRIVATE_JSON');
  const report=await reportQualityFile(args[1]);console.log(JSON.stringify(report,null,2));process.exitCode=report.status==='met'?0:report.status==='breached'?1:2;
 }catch(error){console.error(JSON.stringify({private:true,status:'error',code:/^QUALITY_|^USAGE_/.test(error.code||'')?error.code:'QUALITY_INPUT_UNAVAILABLE'}));process.exitCode=2;}
}
