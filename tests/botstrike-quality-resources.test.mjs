import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {spawn} from 'node:child_process';
import {RuntimeResourceSampler,parseProcessStat} from '../botstrike-service/quality-resources.mjs';

function procStat(pid,{ppid=1,start=100,ticks=0,rss=10,comm='process'}={}){
 const fields=Array(30).fill('0');fields[0]='R';fields[1]=String(ppid);fields[11]=String(ticks);fields[12]='0';fields[19]=String(start);fields[21]=String(rss);return`${pid} (${comm}) ${fields.join(' ')}`;
}
async function fixture(options={}){
 const procRoot=await fs.mkdtemp(path.join(tmpdir(),'botstrike-proc-'));let now=0,cpu=0,disabled=false;
 const events=[],monitor={count:4,mean:2e6,max:8e6,enable(){},disable(){disabled=true;},reset(){},percentile:p=>(p===50?2:8)*1e6};
 const sampler=new RuntimeResourceSampler({procRoot,intervalMs:0,platform:'linux',clockTicks:async()=>250,pageSize:async()=>8192,now:()=>now,processInfo:{cpuUsage:()=>({user:cpu,system:0}),memoryUsage:()=>({rss:123456})},eventLoopMonitor:monitor,onSample:(...args)=>events.push(args),...options});
 const put=async(pid,fields)=>{await fs.mkdir(path.join(procRoot,String(pid)),{recursive:true});await fs.writeFile(path.join(procRoot,String(pid),'stat'),procStat(pid,fields));};
 const advance=async(ms,hostCpu=ms*100)=>{now+=ms;cpu+=hostCpu;await fs.writeFile(path.join(procRoot,'uptime'),`${100+now/1000} 0`);};
 await advance(0);await sampler.ready;
 return{sampler,procRoot,put,advance,events,disabled:()=>disabled,cleanup:async()=>{await sampler.close();await fs.rm(procRoot,{recursive:true,force:true});}};
}

test('process stat parsing handles spaces and parentheses and never assumes clock ticks or page size',async()=>{
 assert.deepEqual(parseProcessStat(procStat(123,{ppid:10,start:999,ticks:456,rss:20,comm:'a ) strange ( command'})),{pid:123,ppid:10,state:'R',ticks:456n,startTime:'999',rssPages:20});
 assert.throws(()=>parseProcessStat('invalid'));assert.throws(()=>parseProcessStat(procStat(2,{rss:'9007199254740993'})));
 const f=await fixture();
 try{
  await f.put(10,{start:100,ticks:100,rss:2});await f.put(20,{start:200,ticks:200,rss:3});await f.put(21,{ppid:20,start:201,ticks:300,rss:4});
  f.sampler.track('native',10);f.sampler.track('verifier',20);let report=await f.sampler.sampleNow();
  assert.equal(report.native.cpuPercent,null);assert.equal(report.native.cpuReason,'warming_up');assert.equal(report.native.rssBytes,2*8192);assert.equal(report.verifier.processes,2);assert.equal(report.verifier.rssBytes,7*8192);
  await f.advance(1000);await f.put(10,{start:100,ticks:150,rss:2});await f.put(20,{start:200,ticks:225,rss:3});await f.put(21,{ppid:20,start:201,ticks:325,rss:4});
  report=await f.sampler.sampleNow();assert.equal(report.native.cpuPercent,20);assert.equal(report.verifier.cpuPercent,20);assert.equal(report.host.cpuPercent,10);
  assert.equal(report.capabilities.clockTicks,250);assert.equal(report.capabilities.pageSize,8192);assert.equal(report.host.cpuIncludesWorkerThreads,true);assert.equal(report.host.eventLoopScope,'main_thread_only');
  assert.equal(f.events.findLast(([name])=>name==='hostEventLoopDelayMs')[1],null,'window p95 is not a raw delay');
  assert.equal(f.events.findLast(([name])=>name==='hostEventLoopWindowP95Ms')[1],8);assert.equal(f.events.findLast(([name])=>name==='hostEventLoopSamples')[1],4);
 }finally{await f.cleanup();assert.equal(f.disabled(),true);}
});

test('PID reuse cannot inherit a prior family identity or produce a negative/huge CPU delta',async()=>{
 const f=await fixture();
 try{
  await f.put(10,{start:100,ticks:100});f.sampler.track('native',10);await f.sampler.sampleNow();
  await f.advance(1000);await f.put(10,{start:999,ticks:1000000});const reused=await f.sampler.sampleNow();
  assert.equal(reused.native.cpuPercent,null);assert.equal(reused.native.rssBytes,null);assert.equal(reused.native.reason,'pid_identity_changed');
  assert.equal(f.sampler.track('verifier',10),false,'one PID cannot be assigned two roles');
 }finally{await f.cleanup();}
});

test('known recorder descendants stay attributed after reparenting, while exited-process CPU gaps are explicit',async()=>{
 const f=await fixture();
 try{
  await f.put(20,{start:200,ticks:10});await f.put(21,{ppid:20,start:201,ticks:10});f.sampler.track('verifier',20);await f.sampler.sampleNow();
  f.sampler.untrack('verifier',20);await fs.rm(path.join(f.procRoot,'20'),{recursive:true});await f.put(21,{ppid:1,start:201,ticks:35});await f.advance(1000);
  const adopted=await f.sampler.sampleNow();assert.equal(adopted.verifier.processes,1);assert.equal(adopted.verifier.cpuPercent,null,'root exit leaves unsampled final CPU ticks');assert.equal(adopted.verifier.reason,'process_exit_sampling_gap');assert.equal(adopted.verifier.trackedRoots,0);
  await f.put(21,{ppid:1,start:201,ticks:60});await f.advance(1000);assert.equal((await f.sampler.sampleNow()).verifier.cpuPercent,10,'known orphan stays attributed in the next complete interval');
  await fs.rm(path.join(f.procRoot,'21'),{recursive:true});await f.advance(1000);const gone=await f.sampler.sampleNow();assert.equal(gone.verifier.cpuPercent,null);assert.equal(gone.verifier.reason,'process_exit_sampling_gap');
  await f.advance(1000);const empty=await f.sampler.sampleNow();assert.equal(empty.verifier.cpuPercent,0);assert.equal(empty.verifier.rssBytes,0);assert.equal(empty.verifier.processes,0);
 }finally{await f.cleanup();}
});

test('unsupported platforms, missing system constants and permission failures produce null, not zero',async()=>{
 for(const options of [{platform:'darwin'},{clockTicks:async()=>{throw Error('unavailable');}},{io:{...fs,readdir:async()=>{throw Object.assign(Error('private path'),{code:'EACCES'});}}}]){
  const f=await fixture(options);
  try{await f.advance(1000);const report=await f.sampler.sampleNow();assert.equal(report.native.cpuPercent,null);assert.equal(report.native.rssBytes,null);assert.equal(report.verifier.cpuPercent,null);assert.equal(report.verifier.rssBytes,null);assert.ok(report.native.reason);assert.equal(JSON.stringify(report).includes('private path'),false);assert.equal(report.host.cpuPercent,10);}finally{await f.cleanup();}
 }
});

test('root/process capacity and unreadable inventories remain bounded and do not masquerade as complete samples',async()=>{
 const f=await fixture({maxRoots:1,maxProcesses:1});
 try{
  await f.put(10,{start:100});await f.put(11,{start:110});assert.equal(f.sampler.track('native',10),true);assert.equal(f.sampler.track('native',10),true);assert.equal(f.sampler.track('native',11),false);assert.equal(f.sampler.track('native',-1),false);
  await f.advance(1000);const report=await f.sampler.sampleNow();assert.equal(report.native.cpuPercent,null);assert.equal(report.native.rssBytes,null);assert.equal(report.native.reason,'process_inventory_capacity');assert.equal(report.limits.maxProcesses,1);
 }finally{await f.cleanup();}
});

test('close releases the main-thread monitor and waits for a coalesced in-flight sample',async()=>{
 let release;const gate=new Promise(resolve=>release=resolve),f=await fixture({io:{...fs,readdir:async(...args)=>{await gate;return fs.readdir(...args);}}});
 try{
  const first=f.sampler.sampleNow(),second=f.sampler.sampleNow(),closing=f.sampler.close();assert.equal(first,second);assert.equal(f.disabled(),true);release();await Promise.all([first,second,closing]);assert.equal(f.sampler.track('native',123),false);
 }finally{release();await f.cleanup();}
});

test('the shared gateway is exact PID only while native/verifier descendants retain separate ownership',async()=>{
 const f=await fixture();
 try{
  await f.put(5,{ticks:50,rss:1});await f.put(6,{ppid:5,ticks:900000,rss:90000});await f.put(7,{ppid:5,ticks:800000,rss:80000});
  await f.put(10,{ppid:6,ticks:100,rss:2});await f.put(11,{ppid:10,ticks:100,rss:3});await f.put(20,{ppid:6,ticks:100,rss:4});await f.put(21,{ppid:20,ticks:100,rss:5});
  assert.equal(f.sampler.track('gateway',5),true);assert.equal(f.sampler.track('gateway',7),false,'only one configured shared gateway');assert.equal(f.sampler.track('native',5),false);f.sampler.track('native',10);f.sampler.track('verifier',20);
  const first=await f.sampler.sampleNow();assert.equal(first.gateway.cpuPercent,null);assert.equal(first.gateway.cpuReason,'warming_up');assert.equal(first.gateway.rssBytes,8192);assert.equal(first.gateway.processes,1);
  await f.advance(1000);await f.put(5,{ticks:75,rss:1});await f.put(6,{ppid:5,ticks:9999999,rss:990000});await f.put(7,{ppid:5,ticks:8888888,rss:880000});
  await f.put(10,{ppid:6,ticks:125,rss:2});await f.put(11,{ppid:10,ticks:150,rss:3});await f.put(20,{ppid:6,ticks:125,rss:4});await f.put(21,{ppid:20,ticks:150,rss:5});
  const report=await f.sampler.sampleNow();assert.equal(report.gateway.cpuPercent,10);assert.equal(report.gateway.rssBytes,8192);assert.equal(report.gateway.processes,1);assert.equal(report.native.processes,2);assert.equal(report.native.cpuPercent,30);assert.equal(report.native.rssBytes,5*8192);assert.equal(report.verifier.processes,2);assert.equal(report.verifier.cpuPercent,30);assert.equal(report.verifier.rssBytes,9*8192);
  assert.equal(f.events.findLast(([name])=>name==='gatewayNodeCpuPercent')[1],10);assert.equal(f.events.findLast(([name])=>name==='gatewayRssBytes')[1],8192);assert.match(report.gateway.scope,/no_descendants/);assert.doesNotMatch(JSON.stringify(report),/"(?:pid|ppid|startTime)"/,'broad metrics expose counts/reasons, never PID identities');
 }finally{await f.cleanup();}
});

test('an unspecified/removed gateway is unknown rather than zero and the runtime cannot be its own gateway',async()=>{
 const f=await fixture();
 try{
  assert.equal(f.sampler.snapshot().gateway.reason,'gateway_not_supplied');await f.advance(1000);let report=await f.sampler.sampleNow();assert.equal(report.gateway.cpuPercent,null);assert.equal(report.gateway.rssBytes,null);assert.equal(report.gateway.reason,'gateway_not_supplied');
  f.sampler.processInfo.pid=5;await f.put(5,{ticks:100});assert.equal(f.sampler.track('gateway',5),false,'no runtime/gateway double counting');assert.equal(f.sampler.track('gateway',-1),false);assert.equal(f.sampler.track('gateway',NaN),false);
  await f.put(6,{ticks:100});f.sampler.track('gateway',6);await f.sampler.sampleNow();f.sampler.untrack('gateway',6);await f.advance(1000);report=await f.sampler.sampleNow();assert.equal(report.gateway.reason,'gateway_not_supplied');assert.equal(report.gateway.cpuPercent,null);assert.equal(report.gateway.rssBytes,null);
  assert.equal(f.events.findLast(([name])=>name==='gatewayNodeCpuPercent')[1],null);
 }finally{await f.cleanup();}
});

test('gateway exit/PID reuse never reports zero or transfers the configured identity to another process',async()=>{
 const f=await fixture();
 try{
  await f.put(5,{start:100,ticks:100});f.sampler.track('gateway',5);await f.sampler.sampleNow();await fs.rm(path.join(f.procRoot,'5'),{recursive:true});await f.advance(1000);
  const missing=await f.sampler.sampleNow();assert.equal(missing.gateway.reason,'tracked_process_missing');assert.equal(missing.gateway.errorCode,'ENOENT');assert.equal(missing.gateway.cpuPercent,null);assert.equal(missing.gateway.rssBytes,null);await f.advance(1000);assert.equal((await f.sampler.sampleNow()).gateway.cpuPercent,null);
  await f.put(5,{start:999,ticks:1000000});await f.advance(1000);const reused=await f.sampler.sampleNow();assert.equal(reused.gateway.reason,'pid_identity_changed');assert.equal(reused.gateway.cpuPercent,null);assert.equal(reused.gateway.rssBytes,null);
  f.sampler.untrack('gateway',5);assert.equal(f.sampler.track('gateway',5),true);assert.equal((await f.sampler.sampleNow()).gateway.cpuReason,'warming_up');await f.advance(1000);await f.put(5,{start:999,ticks:1000025});assert.equal((await f.sampler.sampleNow()).gateway.cpuPercent,10);
 }finally{await f.cleanup();}
});

test('gateway unsupported/missing/unreadable observations retain safe reasons and can recover a lost readable interval',async()=>{
 for(const options of [{platform:'darwin'},{clockTicks:async()=>{throw Error('unsupported');}},{io:{...fs,readFile:async(file,...args)=>{if(String(file).endsWith('/5/stat'))throw Object.assign(Error('private path'),{code:'EACCES'});return fs.readFile(file,...args);}}}]){
  const f=await fixture(options);try{await f.put(5,{ticks:100});f.sampler.track('gateway',5);await f.advance(1000);const report=await f.sampler.sampleNow();assert.equal(report.gateway.cpuPercent,null);assert.equal(report.gateway.rssBytes,null);assert.ok(report.gateway.reason);assert.equal(JSON.stringify(report).includes('private path'),false);}finally{await f.cleanup();}
 }
 const missing=await fixture();try{missing.sampler.track('gateway',5);const report=await missing.sampler.sampleNow();assert.equal(report.gateway.reason,'tracked_process_missing');assert.equal(report.gateway.rssBytes,null);}finally{await missing.cleanup();}
 let denied=false;const f=await fixture({io:{...fs,readFile:async(file,...args)=>{if(denied&&String(file).endsWith('/5/stat'))throw Object.assign(Error('private path'),{code:'EACCES'});return fs.readFile(file,...args);}}});
 try{
  await f.put(5,{ticks:100});f.sampler.track('gateway',5);await f.sampler.sampleNow();denied=true;await f.advance(1000);const blocked=await f.sampler.sampleNow();assert.equal(blocked.gateway.reason,'tracked_process_unreadable');assert.equal(blocked.gateway.errorCode,'EACCES');assert.equal(blocked.gateway.cpuPercent,null);denied=false;await f.advance(1000);assert.equal((await f.sampler.sampleNow()).gateway.cpuReason,'warming_up');await f.put(5,{ticks:125});await f.advance(1000);assert.equal((await f.sampler.sampleNow()).gateway.cpuPercent,10);
 }finally{await f.cleanup();}
});

test('exact gateway reading does not require an unrelated complete /proc descendant inventory',async()=>{
 const f=await fixture({io:{...fs,readdir:async()=>{throw Object.assign(Error('private inventory path'),{code:'EACCES'});}}});
 try{await f.put(5,{ticks:100,rss:2});f.sampler.track('gateway',5);await f.sampler.sampleNow();await f.advance(1000);await f.put(5,{ticks:125,rss:2});const report=await f.sampler.sampleNow();assert.equal(report.native.cpuPercent,null);assert.equal(report.gateway.cpuPercent,10);assert.equal(report.gateway.rssBytes,2*8192);assert.equal(report.gateway.processes,1);}finally{await f.cleanup();}
});

test('Linux samples actual native and recorder process families with runtime getconf constants',async context=>{
 if(process.platform!=='linux')return context.skip('actual /proc process-family measurement requires Linux');
 const busy="setInterval(()=>{const until=Date.now()+20;while(Date.now()<until)Math.sqrt(Math.random());},1)";
 const native=spawn(process.execPath,['-e',busy],{stdio:'ignore'}),verifier=spawn(process.execPath,['-e',`const {spawn}=require('node:child_process');const child=spawn(process.execPath,['-e',${JSON.stringify(busy)}],{stdio:'ignore'});console.log(child.pid);process.on('SIGTERM',()=>{child.kill();process.exit()});setInterval(()=>{},1000);`],{stdio:['ignore','pipe','ignore']});
 const sampler=new RuntimeResourceSampler({intervalMs:0});
 try{
  await Promise.all([new Promise((resolve,reject)=>{native.once('spawn',resolve);native.once('error',reject);}),new Promise((resolve,reject)=>{verifier.once('spawn',resolve);verifier.once('error',reject);})]);
  await new Promise(resolve=>verifier.stdout.once('data',resolve));await sampler.ready;assert.equal(sampler.capabilities.proc,true);
  sampler.track('native',native.pid);sampler.track('verifier',verifier.pid);await sampler.sampleNow();await new Promise(resolve=>setTimeout(resolve,250));const report=await sampler.sampleNow();
  assert.ok(report.capabilities.clockTicks>0);assert.ok(report.capabilities.pageSize>0);assert.equal(report.native.processes,1);assert.ok(report.verifier.processes>=2);assert.ok(report.native.rssBytes>0);assert.ok(report.verifier.rssBytes>0);assert.ok(report.native.cpuPercent>0);assert.ok(report.verifier.cpuPercent>0);assert.match(report.measurement,/sampled_process_intervals/);
 }finally{native.kill();verifier.kill();await sampler.close();}
});

test('Linux shared gateway parent is sampled alone alongside separately attributed active child families',async context=>{
 if(process.platform!=='linux')return context.skip('actual exact-PID /proc accounting requires Linux');
 const busy="setInterval(()=>{const until=Date.now()+15;while(Date.now()<until)Math.sqrt(Math.random());},1)";
 const recorder=`const {spawn}=require('node:child_process');const replay=spawn(process.execPath,['-e',${JSON.stringify(busy)}],{stdio:'ignore'});console.log(replay.pid);process.on('SIGTERM',()=>{replay.kill();process.exit()});setInterval(()=>{},1000);`;
 const gateway=spawn(process.execPath,['-e',`const {spawn}=require('node:child_process');const native=spawn(process.execPath,['-e',${JSON.stringify(busy)}],{stdio:'ignore'}),verifier=spawn(process.execPath,['-e',${JSON.stringify(recorder)}],{stdio:['ignore','pipe','ignore']});verifier.stdout.once('data',bytes=>console.log(JSON.stringify({native:native.pid,verifier:verifier.pid,replay:Number(bytes.toString().trim())})));process.on('SIGTERM',()=>{native.kill();verifier.kill();process.exit()});setInterval(()=>{const end=Date.now()+4;while(Date.now()<end)Math.sqrt(Math.random());},10);`],{stdio:['ignore','pipe','ignore']});
 const sampler=new RuntimeResourceSampler({intervalMs:0});
 try{
  const identities=await new Promise((resolve,reject)=>{gateway.once('error',reject);gateway.stdout.once('data',bytes=>resolve(JSON.parse(bytes.toString())));});
  assert.equal(sampler.track('gateway',gateway.pid),true);sampler.track('native',identities.native);sampler.track('verifier',identities.verifier);await sampler.sampleNow();await new Promise(resolve=>setTimeout(resolve,300));const report=await sampler.sampleNow();
  assert.equal(report.gateway.processes,1);assert.equal(report.native.processes,1);assert.equal(report.verifier.processes,2);assert.ok(report.gateway.cpuPercent>0);assert.ok(report.native.cpuPercent>0);assert.ok(report.verifier.cpuPercent>0);assert.ok(report.gateway.rssBytes>0);assert.doesNotMatch(JSON.stringify(report),/"(?:pid|ppid|startTime)"/);
 }finally{gateway.kill();await sampler.close();}
});
