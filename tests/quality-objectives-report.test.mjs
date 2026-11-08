import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {createHash} from 'node:crypto';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {evaluateQualityObjectives,reportQualityFile,QUALITY_OBJECTIVE_POLICY} from '../tools/quality-objectives-report.mjs';

const MINUTE=60000,BOUNDS=[0,.5,1,2,4,8,16,32,64,125,250,500,1000,2000,5000,10000,30000,60000,300000,3600000,86400000];
const sha=b=>createHash('sha256').update(b).digest('hex');
const provenance={sourceRevision:'a'.repeat(40),imageId:'sha256:'+'b'.repeat(64),nativeProfile:'c'.repeat(64)};
const generation=sha(JSON.stringify(provenance)).slice(0,24);
function bucket(at,n=1000,values=[[1,n]]){
 const histogram=Array(BOUNDS.length+1).fill(0);for(const [value,count]of values)histogram[BOUNDS.findIndex(b=>value<=b)]+=count;
 const nonempty=values.filter(([,count])=>count>0);
 return{bucketAt:at,observations:n,min:Math.min(...nonempty.map(v=>v[0])),max:Math.max(...nonempty.map(v=>v[0])),
  mean:values.reduce((s,[value,count])=>s+value*count,0)/n,last:nonempty[0][0],lastAt:at+59000,histogram};
}
function recount(row){
 row.observations=row.history.reduce((n,b)=>n+b.observations,0);row.buckets=row.history.length;
 row.min=Math.min(...row.history.map(b=>b.min));row.max=Math.max(...row.history.map(b=>b.max));return row;
}
function fixture(){
 const generatedAt=10*MINUTE+30000;
 return{quality:{schemaVersion:1,generatedAt,startedAt:MINUTE,currentGeneration:generation,provenance:{...provenance},provenanceBound:true,
  generations:[{id:generation,...provenance,firstAt:MINUTE,lastAt:generatedAt}],limits:{bucketMs:MINUTE},
  window:{requestedMs:300000,requestedStart:generatedAt-300000,bucketMs:MINUTE},
  health:{ok:true,status:'ok',loaded:true,historyLost:false,rejectedObservations:0,evictedBuckets:0,alerts:[],clock:{basis:'wall_clock_with_monotonic_persisted_floor',rawWallAt:generatedAt,effectiveAt:generatedAt,backwardSkewMs:0,restoredFloorAt:null}},
  series:Object.entries(QUALITY_OBJECTIVE_POLICY).filter(([,v])=>v?.thresholdMs).map(([metric,p])=>recount({metric,generation,cohort:'all',component:p.component,kind:'sample',unit:'ms',trust:'server',
   observationUnit:p.observationUnit,quantiles:{method:'fixed_histogram_bin_bounds'},history:[bucket(8*MINUTE,metric.startsWith('host')?100:1000),bucket(9*MINUTE,metric.startsWith('host')?100:1000)]}))}};
}
const row=(d,name='nativeTickProcessingMs')=>d.quality.series.find(s=>s.metric===name);
const result=(d,name='nativeTickProcessingMs')=>evaluateQualityObjectives(d).objectives.find(s=>s.metric===name);
const unknown=d=>assert.equal(evaluateQualityObjectives(d).status,'unknown');

test('evaluates only the latest two complete, aligned, non-overlapping minutes without mutating input',()=>{
 const d=fixture(),before=structuredClone(d),r=evaluateQualityObjectives(d);
 assert.equal(r.status,'met');assert.deepEqual(r.coveredWindow.bucketStarts,[480000,540000]);assert.equal(r.coveredWindow.to,600000);
 assert.equal(r.objectives[0].samples,2000);assert.equal(r.objectives[2].samples,200);assert.equal(r.acceptanceComplete,false);assert.equal(r.networkAcceptance,false);
 assert.deepEqual(d,before);assert.ok(r.objectives.every(o=>o.operatorResponse.length>40));
 const partial=bucket(10*MINUTE,5000,[[100,5000]]);partial.lastAt=d.quality.generatedAt-1;
 row(d).history.push(partial);row(d).history.push(bucket(7*MINUTE,1000,[[100,1000]]));recount(row(d));
 assert.equal(result(d).status,'met');assert.equal(result(d).samples,2000);assert.equal(result(d).exceeded,0);
});

test('strict >16 and >32 exclude values exactly on a bin boundary, including upper-bound 32 for event-loop windows',()=>{
 for(const name of ['nativeTickProcessingMs','nativeTickOverrunMs','hostEventLoopWindowP95Ms']){
  const d=fixture(),s=row(d,name),threshold=QUALITY_OBJECTIVE_POLICY[name].thresholdMs;
  s.history=[bucket(8*MINUTE,1000,[[threshold,1000]]),bucket(9*MINUTE,1000,[[threshold,1000]])];recount(s);
  assert.equal(result(d,name).exceeded,0);assert.equal(result(d,name).status,'met');
  s.history[1]=bucket(9*MINUTE,1000,[[threshold,979],[threshold+.1,21]]);recount(s);
  assert.equal(result(d,name).exceeded,21);assert.equal(result(d,name).status,'breached');
 }
});

test('one-percent inclusive target uses exact integer counts and combines raw histogram counts, not bucket percentages',()=>{
 const d=fixture(),s=row(d);s.history=[bucket(8*MINUTE,1000,[[1,980],[17,20]]),bucket(9*MINUTE)];recount(s);
 assert.equal(result(d).status,'met');assert.equal(result(d).exceededPercent,1);
 s.history[0]=bucket(8*MINUTE,1000,[[1,979],[17,21]]);recount(s);assert.equal(result(d).status,'breached');
 // Different bucket sizes: a 2% bucket and a 0% bucket give 0.5% overall here.
 s.history=[bucket(8*MINUTE,1000,[[1,980],[17,20]]),bucket(9*MINUTE,3000,[[1,3000]])];recount(s);
 assert.equal(result(d).exceededPercent,.5);assert.equal(result(d).status,'met');
});

test('other cohorts and generations cannot contribute observations or supply a missing current all bucket',()=>{
 const d=fixture(),other=structuredClone(row(d));other.cohort='public';other.history=[bucket(8*MINUTE,5000,[[100,5000]]),bucket(9*MINUTE,5000,[[100,5000]])];recount(other);
 d.quality.series.push(other,{...structuredClone(other),cohort:'all',generation:'d'.repeat(24)});
 assert.equal(result(d).status,'met');assert.equal(result(d).samples,2000);
 row(d).history.pop();recount(row(d));assert.equal(result(d).status,'unknown');assert.ok(result(d).reasons.includes('missing_complete_minute_bucket'));
});

test('duplicate series, duplicate/overlapping minute starts and gaps remain unknown instead of being summed',()=>{
 const duplicate=fixture();duplicate.quality.series.push(structuredClone(row(duplicate)));assert.equal(result(duplicate).status,'unknown');
 for(const change of [s=>s.history.push(structuredClone(s.history[0])),s=>{s.history[1].bucketAt=s.history[0].bucketAt+30000;},s=>s.history.pop()]){
  const d=fixture();change(row(d));recount(row(d));assert.equal(result(d).status,'unknown');
 }
});

test('every selected native bucket needs512 observations, every event-loop bucket needs10 reporting windows',()=>{
 for(const [name,n]of [['nativeTickProcessingMs',511],['nativeTickOverrunMs',511],['hostEventLoopWindowP95Ms',9]]){
  const d=fixture(),s=row(d,name);s.history[0]=bucket(8*MINUTE,n,[[1,n]]);recount(s);assert.equal(result(d,name).status,'unknown');
  assert.ok(result(d,name).reasons.includes('insufficient_samples_in_complete_bucket'));
 }
 const empty=fixture();empty.quality.series=[];unknown(empty);assert.ok(evaluateQualityObjectives(empty).objectives.every(o=>o.samples===null));
});

test('requires original complete histograms and consistent safe integer counts, not exported p95 scalars',()=>{
 const changes=[s=>delete s.history,s=>delete s.history[0].histogram,s=>{s.history[0].histogram.pop();},s=>{s.history[0].histogram[2]--;},
  s=>{s.history[0].histogram[2]=NaN;},s=>{s.history[0].histogram[2]=-1;},s=>s.observations++,s=>{s.history[0].min=33;}];
 for(const change of changes){const d=fixture();change(row(d));row(d).p95=0;assert.equal(result(d).status,'unknown');}
});

test('metric trust, kind, component, unit and observation unit must match the catalog contract',()=>{
 for(const change of [s=>{s.trust='untrusted_client';},s=>{s.kind='counter';},s=>{s.unit='seconds';},s=>{s.component='gateway';},
  s=>{s.observationUnit='reported_window_p95';},s=>{s.quantiles.method='exact_percentile';}]){
  const d=fixture();change(row(d));assert.equal(result(d).status,'unknown');
 }
 const d=fixture();row(d,'hostEventLoopWindowP95Ms').observationUnit='individual_observation';assert.equal(result(d,'hostEventLoopWindowP95Ms').status,'unknown');
});

test('event-loop budget counts reporting-window p95 samples; original counter and p95-of-p95 do not change the denominator',()=>{
 const d=fixture(),s=row(d,'hostEventLoopWindowP95Ms');s.history=[bucket(8*MINUTE,100,[[21,99],[33,1]]),bucket(9*MINUTE,100,[[21,100]])];recount(s);s.p95=999999;
 d.quality.series.push({metric:'hostEventLoopSamples',generation,cohort:'all',kind:'counter',count:100000000,observations:100000000});
 let r=result(d,s.metric);assert.equal(r.status,'met');assert.equal(r.samples,200);assert.equal(r.exceeded,1);assert.equal(r.sampleUnit,'measured_window_p95');
 s.history[0]=bucket(8*MINUTE,100,[[21,97],[33,3]]);recount(s);r=result(d,s.metric);assert.equal(r.status,'breached');assert.equal(r.exceededPercent,1.5);
});

test('unbound provenance cannot be repaired by external image metadata or a claimed true flag with unknown profile',()=>{
 const d=fixture();d.imageId=provenance.imageId;d.externalImageVerified=true;d.quality.provenanceBound=false;d.quality.provenance.nativeProfile='unknown';
 unknown(d);assert.equal(evaluateQualityObjectives(d).provenanceBound,false);assert.equal(evaluateQualityObjectives(d).declaredProvenance.imageId,provenance.imageId);
 assert.equal(evaluateQualityObjectives(d).declaredProvenance.nativeProfile,'unknown');d.quality.provenanceBound=true;unknown(d);
 const g=fixture();g.quality.generations[0].nativeProfile='d'.repeat(64);unknown(g);
});

test('clock skew, historical gaps, warming, short requests and health errors prevent a met result',()=>{
 const changes=[d=>{d.quality.health.clock.backwardSkewMs=1;},d=>{d.quality.health.clock.rawWallAt--;},d=>delete d.quality.health.clock,
  d=>{d.quality.health.historyLost=true;},d=>{d.quality.health.loaded=false;},d=>{d.quality.startedAt=500000;},
  d=>{d.quality.generations[0].firstAt=500000;},d=>{d.quality.window.requestedMs=60000;d.quality.window.requestedStart=d.quality.generatedAt-60000;},
  d=>{d.quality.window.bucketMs=30000;},d=>{d.quality.schemaVersion=2;}];
 for(const change of changes){const d=fixture();change(d);unknown(d);}
 const d=fixture();d.quality.health.clock.rawWallAt++;d.quality.health.clock.effectiveAt++;assert.equal(evaluateQualityObjectives(d).status,'met','Health clock may advance during synchronous snapshot construction');
});

test('active existing error alerts are surfaced and block green even if health.ok was inconsistent; resolved errors do not',()=>{
 const d=fixture();d.quality.health.alerts=[{code:'native_stalled',severity:'error',active:true}];let r=evaluateQualityObjectives(d);
 assert.equal(r.status,'unknown');assert.deepEqual(r.activeErrorAlerts,[{code:'native_stalled',severity:'error'}]);assert.ok(r.objectives.every(o=>o.reasons.includes('active_error_alerts')));
 d.quality.health.alerts[0].active=false;assert.equal(evaluateQualityObjectives(d).status,'met');
 d.quality.health.alerts=[{code:'quality_recovered_backup',severity:'warning',active:true}];unknown(d);
});

test('rejected observations and evicted buckets must explicitly be safe integer zero; historical write failures alone are not an active error',()=>{
 for(const name of ['rejectedObservations','evictedBuckets'])for(const value of [1,-1,.5,'0',null,Number.MAX_SAFE_INTEGER+1,undefined]){
  const d=fixture();if(value===undefined)delete d.quality.health[name];else d.quality.health[name]=value;
  unknown(d);assert.ok(evaluateQualityObjectives(d).objectives.every(o=>o.reasons.includes(name==='rejectedObservations'?'rejected_or_missing_observation_count':'evicted_or_missing_bucket_count')));
 }
 const resolved=fixture();resolved.quality.health.writeFailures=100;resolved.quality.health.alerts=[{code:'quality_write_failed',severity:'error',active:false}];
 assert.equal(evaluateQualityObjectives(resolved).status,'met');
});

test('a stale zero gauge is never a histogram or resource measurement; idle and unavailable resources remain distinct metadata',()=>{
 const d=fixture();Object.assign(row(d),{kind:'gauge',value:0,staleAfterRestart:true});assert.equal(result(d).status,'unknown');
 d.resources={native:{available:false,cpuPercent:0,rssBytes:0},verifier:{available:true,cpuPercent:0,rssBytes:0}};
 const r=evaluateQualityObjectives(d);assert.equal(r.metadata.sampledResources.native.cpuPercent,null);assert.equal(r.metadata.sampledResources.native.rssBytes,null);
 assert.equal(r.metadata.sampledResources.verifier.cpuPercent,0);assert.equal(r.metadata.staleGaugesUsedAsMeasurements,false);
});

test('a single seal is metadata only; no percentile or numeric seal SLO is introduced',()=>{
 const d=fixture();d.quality.series.push(recount({metric:'sealDurationMs',generation,cohort:'all',component:'sealer',kind:'sample',unit:'ms',trust:'server',observationUnit:'individual_observation',history:[bucket(8*MINUTE,1,[[1793,1]])]}));
 const r=evaluateQualityObjectives(d);assert.equal(r.status,'met');assert.deepEqual(r.metadata.singleSeal.sealDurationMs,{observations:1,minMs:1793,maxMs:1793,objective:false,percentilesReported:false});
 assert.equal(r.objectives.length,3);
 const seal=d.quality.series.at(-1);seal.min='DO_NOT_ECHO_PRIVATE_TEXT';seal.max={account:'DO_NOT_ECHO_PRIVATE_TEXT'};
 const safe=evaluateQualityObjectives(d);assert.equal(safe.metadata.singleSeal.sealDurationMs.minMs,1793);assert.equal(safe.metadata.singleSeal.sealDurationMs.maxMs,1793);
 assert.ok(!JSON.stringify(safe).includes('DO_NOT_ECHO_PRIVATE_TEXT'),'Only validated finite history extrema may reach metadata');
});

test('explicit regular input file is bounded, rejects symlinks and directories, preserves exact byte SHA and does not expose input paths',async t=>{
 const root=await fs.mkdtemp(path.join(await fs.realpath(tmpdir()),'quality-objectives-'));t.after(()=>fs.rm(root,{recursive:true,force:true}));
 const file=path.join(root,'quality.json'),bytes=JSON.stringify(fixture(),null,2)+'\n';await fs.writeFile(file,bytes);
 const r=await reportQualityFile(file);assert.equal(r.status,'met');assert.equal(r.inputSha256,sha(bytes));assert.equal(r.inputBytes,Buffer.byteLength(bytes));assert.ok(!JSON.stringify(r).includes(root));
 const link=path.join(root,'link.json');await fs.symlink(file,link);await assert.rejects(reportQualityFile(link),/QUALITY_FILE_SYMLINK/);
 await assert.rejects(reportQualityFile(root),/QUALITY_FILE_NOT_REGULAR/);const big=path.join(root,'big.json');const fd=await fs.open(big,'w');await fd.truncate(8*1024*1024+1);await fd.close();await assert.rejects(reportQualityFile(big),/QUALITY_FILE_TOO_LARGE/);
 await fs.writeFile(file,'{"quality":');await assert.rejects(reportQualityFile(file),/QUALITY_INPUT_JSON_INVALID/);
});

test('CLI requires --file, reports met/breached/unknown via distinct exit codes and never silently fetches an endpoint',async t=>{
 const root=await fs.mkdtemp(path.join(await fs.realpath(tmpdir()),'quality-objectives-cli-'));t.after(()=>fs.rm(root,{recursive:true,force:true}));
 const file=path.join(root,'quality.json'),script=path.resolve('tools/quality-objectives-report.mjs'),run=promisify(execFile);
 await fs.writeFile(file,JSON.stringify(fixture()));const ok=await run(process.execPath,[script,'--file',file]);assert.equal(JSON.parse(ok.stdout).status,'met');
 const d=fixture();row(d).history[0]=bucket(8*MINUTE,1000,[[1,900],[17,100]]);recount(row(d));await fs.writeFile(file,JSON.stringify(d));
 await assert.rejects(run(process.execPath,[script,'--file',file]),e=>e.code===1&&JSON.parse(e.stdout).status==='breached');
 d.quality.provenanceBound=false;await fs.writeFile(file,JSON.stringify(d));
 await assert.rejects(run(process.execPath,[script,'--file',file]),e=>e.code===2&&JSON.parse(e.stdout).status==='unknown');
 await assert.rejects(run(process.execPath,[script]),e=>e.code===2&&JSON.parse(e.stderr).code.startsWith('USAGE_'));
});
