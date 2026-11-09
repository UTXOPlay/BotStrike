import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {createHash} from 'node:crypto';
import {QualityStore,QUALITY_METRICS,QUALITY_COHORTS} from '../botstrike-service/quality.mjs';

const provenance={sourceRevision:'01dee05'.padEnd(40,'0'),imageId:'sha256:'+'b'.repeat(64),nativeProfile:'c'.repeat(64)};
async function fixture(options={}){
 const directory=await fs.mkdtemp(path.join(tmpdir(),'botstrike-quality-'));let clock=100000;
 const create=overrides=>new QualityStore({directory,provenance,now:()=>clock,flushIntervalMs:0,...options,...overrides});
 const store=create();await store.ready;
 return{directory,store,create,advance:value=>clock+=value,set:value=>clock=value,cleanup:async()=>{await store.close();await fs.rm(directory,{recursive:true,force:true});}};
}
const row=(store,name,cohort='all',options={})=>store.snapshot(options).series.find(s=>s.metric===name&&s.cohort===cohort&&s.generation===store.generation);

test('quality windows count every observation and distinguish histogram bounds from exact percentiles',async()=>{
 const f=await fixture({bucketMs:1000,retentionMs:10000});
 try{
  for(let index=0;index<40000;index++)assert.equal(f.store.sample('socketRttMs',index%100,{cohort:'public'}),true);
  f.store.record('matchCompleted',3,{cohort:'public'});f.store.gauge('sealBacklog',2);
  const r=row(f.store,'socketRttMs','public');
  assert.equal(r.observations,40000);assert.equal(r.mean,49.5);assert.equal(r.min,0);assert.equal(r.max,99);
  assert.equal(r.component,'transport');assert.equal(r.trust,'server');assert.equal(r.quantiles.method,'fixed_histogram_bin_bounds');
  assert.ok(r.quantiles.p95.lower<=94&&r.quantiles.p95.upper>=94);assert.equal(r.quantiles.p95.upper,99);
  assert.equal(row(f.store,'matchCompleted','public').count,3);assert.equal(row(f.store,'sealBacklog').value,2);
  f.advance(1200);f.store.sample('socketRttMs',8,{cohort:'public'});f.advance(1000);
  assert.equal(row(f.store,'socketRttMs','public',{windowMs:1500}).observations,40001,'a boundary bucket is counted whole and disclosed');
  const recent=row(f.store,'socketRttMs','public',{windowMs:1000,includeHistory:true});
  assert.equal(recent.observations,1);assert.equal(recent.history.length,1);
  const report=f.store.snapshot();assert.match(report.window.semantics,/leading overhang/);assert.equal(report.provenanceBound,true);
 }finally{await f.cleanup();}
});

test('restart retains provenance-separated history and marks restored gauges stale until sampled',async()=>{
 const f=await fixture();let restored,changed;
 try{
  f.store.sample('nativeTickProcessingMs',5);f.store.record('matchCompleted',2);f.store.gauge('liveRooms',3);await f.store.flush();
  restored=f.create();await restored.ready;
  assert.equal(row(restored,'matchCompleted').count,2);assert.equal(row(restored,'nativeTickProcessingMs').observations,1);
  assert.equal(row(restored,'liveRooms').staleAfterRestart,true);restored.gauge('liveRooms',1);assert.equal(row(restored,'liveRooms').staleAfterRestart,false);
  await restored.close();changed=f.create({provenance:{...provenance,sourceRevision:'e'.repeat(40)}});await changed.ready;
  changed.sample('nativeTickProcessingMs',7);
  const rows=changed.snapshot().series.filter(s=>s.metric==='nativeTickProcessingMs');
  assert.equal(rows.length,2);assert.equal(new Set(rows.map(s=>s.generation)).size,2);assert.equal(row(changed,'nativeTickProcessingMs').observations,1);
  assert.equal(changed.snapshot().generations.length,2);
 }finally{await restored?.close();await changed?.close();await f.cleanup();}
});

test('observations arriving before asynchronous startup load are merged without overwriting persisted history',async()=>{
 const f=await fixture();let restored;
 try{
  f.store.record('matchCompleted',2);await f.store.flush();
  let release;const gate=new Promise(resolve=>release=resolve);
  restored=f.create({io:{...fs,readFile:async(...args)=>{await gate;return fs.readFile(...args);}}});
  restored.record('matchCompleted',3);release();await restored.ready;
  assert.equal(row(restored,'matchCompleted').count,5);
 }finally{await restored?.close();await f.cleanup();}
});

test('backward wall clock across repeated restarts preserves valid snapshots and discloses the logical clock floor',async()=>{
 const f=await fixture({bucketMs:1000,retentionMs:300000});let active;
 try{
  const floor=200000;f.set(floor);f.store.record('matchCompleted',2);await f.store.close();
  f.set(floor-120000);
  for(let attempt=0;attempt<3;attempt++){
   active=f.create();await active.ready;
   const health=active.health(),report=active.snapshot();
   assert.equal(health.historyLost,false);assert.equal(health.ok,true);assert.equal(health.status,'degraded');
   assert.equal(health.clock.rawWallAt,floor-120000);assert.equal(health.clock.effectiveAt,floor);assert.equal(health.clock.restoredFloorAt,floor);assert.equal(health.clock.backwardSkewMs,120000);
   assert.match(health.clock.semantics,/elapsed real time and UTC placement.*unknown/);
   assert.equal(report.generatedAt,floor);assert.equal(row(active,'matchCompleted').count,2+attempt);
   assert.equal(health.alerts.some(a=>a.code==='quality_corrupt_primary'||a.code==='quality_recovered_backup'),false);
   active.record('matchCompleted',1);await active.flush();
   const saved=JSON.parse(await fs.readFile(path.join(f.directory,'quality.json'),'utf8')).payload;
   assert.equal(saved.savedAt,floor);assert.ok(saved.series.every(s=>s.buckets.every(b=>b.lastAt<=saved.savedAt)));
   await active.close();active=null;
  }
  f.set(floor+1);active=f.create();await active.ready;
  assert.equal(row(active,'matchCompleted').count,5);assert.equal(active.health().historyLost,false);assert.equal(active.health().status,'ok');
  assert.equal(active.health().clock.backwardSkewMs,0);assert.equal(active.health().clock.rawWallAt,floor+1);assert.equal(active.snapshot().generatedAt,floor+1);
 }finally{await active?.close();await f.cleanup();}
});

test('cardinality, values and provenance reject dynamic labels without retaining credential material',async()=>{
 const f=await fixture({maxSeries:2});
 try{
  assert.deepEqual(QUALITY_COHORTS,['all','public','private','practice','tactical','casual']);
  assert.equal(f.store.sample('socketRttMs',1,{cohort:'public'}),true);assert.equal(f.store.gauge('liveRooms',1),true);
  assert.equal(f.store.sample('nativeTickOverrunMs',2),false,'fixed series ceiling');
  const secret='private-account-token-DO-NOT-RETAIN';
  assert.equal(f.store.sample(secret,1),false);assert.equal(f.store.sample('socketRttMs',1,{cohort:secret}),false);
  assert.equal(f.store.sample('socketRttMs',1,{cohort:'all',account:secret}),false);
  for(const value of [NaN,Infinity,-1,86400001])assert.equal(f.store.sample('socketRttMs',value),false);
  assert.equal(f.store.record('matchCompleted',.5),false);assert.equal(f.store.record('matchCompleted',0),true,'zero delta is a no-op');
  assert.equal(f.store.record('socketRttMs',1),false);assert.equal(f.store.alert(secret),false);
  await f.store.flush();assert.equal(f.store.health().series,2);assert.ok(f.store.health().rejectedObservations>=9);
  assert.ok(f.store.health().alerts.some(a=>a.code==='quality_capacity'));
  assert.equal((await fs.readFile(path.join(f.directory,'quality.json'),'utf8')).includes(secret),false);
  const unknown=f.create({provenance:{sourceRevision:secret,imageId:secret,nativeProfile:secret}});await unknown.ready;
  assert.equal(unknown.snapshot().provenanceBound,false);assert.equal(JSON.stringify(unknown.snapshot()).includes(secret),false);await unknown.close();
 }finally{await f.cleanup();}
});

test('client window-p95 observations remain untrusted window summaries with separate original n counters',async()=>{
 const f=await fixture();
 try{
  for(const value of [10,100])f.store.sample('clientAppRttWindowP95Ms',value,{cohort:'tactical'});
  f.store.record('clientAppRttSamples',900,{cohort:'tactical'});f.store.record('clientAppRttSamples',10,{cohort:'tactical'});
  f.store.sample('clientInterpolationAgeWindowP95Ticks',4,{cohort:'tactical'});
  const r=row(f.store,'clientAppRttWindowP95Ms','tactical');
  assert.equal(r.observations,2);assert.equal(r.observationUnit,'reported_window_p95');assert.equal(r.trust,'untrusted_client');assert.equal(r.component,'browser');assert.match(r.description,/never original individual delays/);
  assert.equal(row(f.store,'clientAppRttSamples','tactical').count,910);assert.equal(row(f.store,'clientInterpolationAgeWindowP95Ticks','tactical').unit,'ticks');
  for(const name of ['clientAppRttSamples','clientAckSkipped','clientPredictionSnaps'])assert.equal(QUALITY_METRICS[name].trust,'untrusted_client');
 }finally{await f.cleanup();}
});

test('time retention, bucket capacity, generation limits and serialized byte capacity are explicit and bounded',async()=>{
 const f=await fixture({bucketMs:1000,retentionMs:4000,maxBuckets:2,maxBytes:4096,maxGenerations:2});let later;
 try{
  for(let i=0;i<8;i++){f.store.sample('socketRttMs',i);f.advance(1000);}
  assert.ok(f.store.health().buckets<=2);assert.ok(f.store.health().evictedBuckets>0);await f.store.flush();
  assert.ok((await fs.stat(path.join(f.directory,'quality.json'))).size<=4096);
  f.advance(5000);assert.equal(f.store.snapshot().series.length,0);
  f.store.record('matchCompleted',1);await f.store.flush();
  for(let i=0;i<4;i++){later=f.create({provenance:{...provenance,sourceRevision:String(i+1).repeat(40)}});await later.ready;later.record('matchCompleted',1);await later.close();}
  const last=f.create();await last.ready;assert.ok(last.snapshot().generations.length<=2);assert.ok(last.health().series<=f.store.limits.maxSeries);await last.close();
 }finally{await later?.close();await f.cleanup();}
});

test('ENOSPC and atomic replacement failure leave the previous valid snapshot readable and health actionable',async()=>{
 const f=await fixture();let writer,recovered;let fail=false;
 try{
  f.store.record('matchCompleted',1);await f.store.flush();
  writer=f.create({io:{...fs,writeFile:async(...args)=>{if(fail)throw Object.assign(Error('secret path/token must not escape'),{code:'ENOSPC'});return fs.writeFile(...args);}}});await writer.ready;
  writer.record('matchCompleted',2);fail=true;let health=await writer.flush();
  assert.equal(health.ok,false);assert.equal(health.lastErrorCode,'ENOSPC');assert.equal(health.dirty,true);assert.equal(health.writeFailures,1);assert.ok(health.alerts.some(a=>a.code==='quality_write_failed'&&a.active));assert.equal(JSON.stringify(health).includes('secret path'),false);
  recovered=f.create();await recovered.ready;assert.equal(row(recovered,'matchCompleted').count,1);await recovered.close();
  fail=false;health=await writer.flush();assert.equal(health.ok,true);assert.equal(health.lastErrorCode,null);assert.equal(row(writer,'matchCompleted').count,3);assert.ok(health.alerts.some(a=>a.code==='quality_write_failed'&&!a.active));await writer.close();
  const restarted=f.create();await restarted.ready;assert.equal(row(restarted,'matchCompleted').count,3);assert.equal(restarted.health().writeFailures,1);await restarted.close();
 }finally{fail=false;await writer?.close();await recovered?.close();await f.cleanup();}
});

test('truncated or checksum-invalid primary recovers only the prior generation and reports the lost flush boundary',async()=>{
 for(const corrupt of ['{"checksum":',JSON.stringify({checksum:'0'.repeat(64),payload:{}})]){
  const f=await fixture();let restored;
  try{
   f.store.record('matchCompleted',1);await f.store.flush();f.store.record('matchCompleted',2);await f.store.flush();
   await fs.writeFile(path.join(f.directory,'quality.json'),corrupt);
   restored=f.create();await restored.ready;
   assert.equal(row(restored,'matchCompleted').count,1,'only last valid previous flush is recovered');
   assert.equal(restored.health().historyLost,false);assert.ok(restored.health().alerts.some(a=>a.code==='quality_recovered_backup'&&a.active));
   await restored.flush();assert.equal(restored.health().status,'ok');
  }finally{await restored?.close();await f.cleanup();}
 }
});

test('failure between backup rotation and primary rename preserves the old primary and repairs on retry',async()=>{
 const f=await fixture();let writer,restored,fail=true;
 try{
  f.store.record('matchCompleted',1);await f.store.flush();
  writer=f.create({io:{...fs,rename:async(from,to)=>{if(fail&&to===path.join(f.directory,'quality.json'))throw Object.assign(Error('do not expose file path'),{code:'EIO'});return fs.rename(from,to);}}});await writer.ready;
  writer.record('matchCompleted',2);const failure=await writer.flush();assert.equal(failure.lastErrorCode,'EIO');
  restored=f.create();await restored.ready;assert.equal(row(restored,'matchCompleted').count,1);await restored.close();
  fail=false;await writer.close();const result=f.create();await result.ready;assert.equal(row(result,'matchCompleted').count,3);assert.equal(result.health().ok,true);await result.close();
 }finally{fail=false;await writer?.close();await restored?.close();await f.cleanup();}
});

test('two corrupt snapshots and oversized/symlink primary are rejected without inventing restored observations',async()=>{
 const f=await fixture();let restored;
 try{
  await fs.writeFile(path.join(f.directory,'quality.json'),'broken');await fs.writeFile(path.join(f.directory,'quality.previous.json'),'also broken');
  restored=f.create();await restored.ready;assert.equal(restored.snapshot().series.length,0);assert.equal(restored.health().historyLost,true);assert.equal(restored.health().ok,false);await restored.close();
  await fs.rm(path.join(f.directory,'quality.json'));await fs.symlink('/etc/passwd',path.join(f.directory,'quality.json'));await fs.rm(path.join(f.directory,'quality.previous.json'),{force:true});
  const symlink=f.create();await symlink.ready;assert.equal(symlink.health().historyLost,true);assert.equal(JSON.stringify(symlink.snapshot()).includes('root:'),false);await symlink.close();
  await fs.writeFile(path.join(f.directory,'quality.json'),'x'.repeat(f.store.limits.maxBytes+1));await fs.rm(path.join(f.directory,'quality.previous.json'),{force:true});
  const large=f.create();await large.ready;assert.equal(large.health().historyLost,true);assert.equal(large.snapshot().series.length,0);await large.close();
 }finally{await restored?.close();await f.cleanup();}
});

test('unsupported schema and altered bucket semantics are rejected even with a valid checksum',async()=>{
 const f=await fixture();let restored;
 try{
  f.store.record('matchCompleted',1);await f.store.flush();
  const file=path.join(f.directory,'quality.json'),envelope=JSON.parse(await fs.readFile(file));envelope.payload.bucketMs=123;
  envelope.checksum=createHash('sha256').update(JSON.stringify(envelope.payload)).digest('hex');await fs.writeFile(file,JSON.stringify(envelope));
  await fs.rm(path.join(f.directory,'quality.previous.json'));
  restored=f.create();await restored.ready;assert.equal(restored.health().historyLost,true);assert.equal(restored.snapshot().series.length,0);
 }finally{await restored?.close();await f.cleanup();}
});

test('stale temporary symlinks are replaced without writing their targets and unusable oversized backup is bounded on repair',async()=>{
 const f=await fixture({maxBytes:4096});let restored;
 try{
  const sentinel=path.join(f.directory,'sentinel');await fs.writeFile(sentinel,'keep');
  await fs.symlink(sentinel,path.join(f.directory,'quality.tmp'));await fs.symlink(sentinel,path.join(f.directory,'quality.previous.tmp'));
  f.store.record('matchCompleted',1);await f.store.flush();assert.equal(await fs.readFile(sentinel,'utf8'),'keep');
  await fs.writeFile(path.join(f.directory,'quality.json'),'broken');await fs.writeFile(path.join(f.directory,'quality.previous.json'),'x'.repeat(5000));
  restored=f.create();await restored.ready;assert.equal(restored.health().historyLost,true);await restored.flush();
  for(const file of ['quality.json','quality.previous.json'])assert.ok((await fs.stat(path.join(f.directory,file))).size<=4096);
 }finally{await restored?.close();await f.cleanup();}
});

test('concurrent flushes use a single writer and close drains observations recorded during I/O',async()=>{
 const f=await fixture();let active=0,peak=0,release,writer;
 const gate=new Promise(resolve=>release=resolve);
 try{
  writer=f.create({io:{...fs,writeFile:async(...args)=>{active++;peak=Math.max(peak,active);await gate;try{return await fs.writeFile(...args);}finally{active--;}}}});await writer.ready;
  writer.record('matchCompleted',1);const pending=writer.flush();await new Promise(resolve=>setImmediate(resolve));
  writer.record('matchCompleted',2);const concurrent=writer.flush(),closing=writer.close();assert.equal(writer.record('matchCompleted',99),false);release();await Promise.all([pending,concurrent,closing]);
  assert.equal(peak,1);assert.equal(writer.health().dirty,false);
  const restored=f.create();await restored.ready;assert.equal(row(restored,'matchCompleted').count,3);await restored.close();
 }finally{release();await writer?.close();await f.cleanup();}
});
