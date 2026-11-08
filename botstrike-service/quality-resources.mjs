// Sampling never changes simulation or replay. Child process values are Linux
// /proc observations, not lifetime maxima or complete short-lived-child costs.
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {monitorEventLoopDelay,performance} from 'node:perf_hooks';

const execute=promisify(execFile),roles=['native','verifier'],trackedRoles=[...roles,'gateway'];
const safeCode=error=>['ENOENT','ESRCH','EACCES','EPERM','EIO','ENOTDIR'].includes(error?.code)?error.code:'UNAVAILABLE';
const pidValue=value=>Number.isSafeInteger(value)&&value>0&&value<=2147483647;
async function systemConstant(name){const {stdout}=await execute('getconf',[name],{timeout:3000,maxBuffer:1024});const value=Number(stdout.trim());if(!Number.isSafeInteger(value)||value<=0)throw Error('Invalid system constant');return value;}

export function parseProcessStat(text){
 const end=text.lastIndexOf(')'),match=/^(\d+) \(/.exec(text);if(!match||end<match[0].length)throw Error('Invalid process stat');
 const fields=text.slice(end+1).trim().split(/\s+/),pid=Number(match[1]),ppid=Number(fields[1]);
 if(!pidValue(pid)||!Number.isSafeInteger(ppid)||ppid<0||!/^\d+$/.test(fields[11]||'')||!/^\d+$/.test(fields[12]||'')||!/^\d+$/.test(fields[19]||'')||!/^\d+$/.test(fields[21]||''))throw Error('Invalid process stat fields');
 const rssPages=Number(fields[21]);if(!Number.isSafeInteger(rssPages)||rssPages<0)throw Error('Invalid process RSS');
 return{pid,ppid,state:fields[0],ticks:BigInt(fields[11])+BigInt(fields[12]),startTime:fields[19],rssPages};
}

export class RuntimeResourceSampler{
 constructor({onSample=()=>{},intervalMs=1000,now=()=>performance.now(),platform=process.platform,procRoot='/proc',io=fs,clockTicks=()=>systemConstant('CLK_TCK'),pageSize=()=>systemConstant('PAGESIZE'),processInfo=process,eventLoopMonitor,maxProcesses=4096,maxRoots=32,readConcurrency=16}={}){
  if(!Number.isSafeInteger(intervalMs)||intervalMs<0||intervalMs>60000||intervalMs>0&&intervalMs<100)throw Error('Invalid resource sample interval');
  for(const [value,min,max]of [[maxProcesses,1,16384],[maxRoots,1,128],[readConcurrency,1,64]])if(!Number.isSafeInteger(value)||value<min||value>max)throw Error('Invalid resource sampler limit');
  this.onSample=onSample;this.clock=now;this.platform=platform;this.procRoot=procRoot;this.io=io;this.processInfo=processInfo;this.maxProcesses=maxProcesses;this.maxRoots=maxRoots;this.readConcurrency=readConcurrency;this.intervalMs=intervalMs;
  this.roots=new Map();this.members=new Map();this.previous=new Map();this.gatewayPrevious=null;this.pendingGaps={native:0,verifier:0,gateway:0};this.missedProcesses={native:0,verifier:0,gateway:0};this.skippedIntervals=0;this.callbackFailures=0;this.closed=false;this.startedAt=now();this.lastAt=this.startedAt;
  this.lastHostCpu=processInfo.cpuUsage();this.lastUptime=null;this.report=null;
  this.monitor=eventLoopMonitor||monitorEventLoopDelay({resolution:20});this.monitor.enable();
  this.capabilities={platform,node:true,eventLoop:'main_thread_histogram',proc:platform==='linux',clockTicks:null,pageSize:null,reason:platform==='linux'?'initializing':'unsupported_platform'};
  this.ready=(async()=>{if(platform!=='linux')return this.capabilities;const values=await Promise.allSettled([clockTicks(),pageSize()]);
   if(values.every(v=>v.status==='fulfilled'&&Number.isSafeInteger(v.value)&&v.value>0)){this.capabilities.clockTicks=values[0].value;this.capabilities.pageSize=values[1].value;this.capabilities.reason=null;}
   else{this.capabilities.proc=false;this.capabilities.reason='system_constants_unavailable';}return{...this.capabilities};})();
  if(intervalMs){this.timer=setInterval(()=>{if(this.sampling){this.skippedIntervals++;return;}void this.sampleNow();},intervalMs);this.timer.unref?.();}
 }
 async _stat(pid){return parseProcessStat(await this.io.readFile(path.join(this.procRoot,String(pid),'stat'),'utf8'));}
 track(role,pid){
  if(this.closed||!trackedRoles.includes(role)||!pidValue(pid)||role==='gateway'&&pid===this.processInfo.pid)return false;
  const key=role+'/'+pid;if(this.roots.has(key))return true;
  if(role==='gateway'&&[...this.roots.values()].some(root=>root.role==='gateway'))return false;
  if(this.roots.size>=this.maxRoots||[...this.roots.values()].some(root=>root.pid===pid&&root.role!==role))return false;
  const root={role,pid,identity:null,error:null};this.roots.set(key,root);
  root.pending=this.platform==='linux'?this._stat(pid).then(stat=>{root.identity=stat.startTime;}).catch(error=>{root.error=safeCode(error);this.pendingGaps[role]++;this.missedProcesses[role]++;}):Promise.resolve();
  return true;
 }
 untrack(role,pid){
  const key=role+'/'+pid,root=this.roots.get(key);if(!root)return false;
  this.roots.delete(key);
  if(role==='gateway')this.gatewayPrevious=null;
  this.pendingGaps[role]++;this.missedProcesses[role]++;
  // Known surviving children stay attributed until exit, even if reparented.
  for(const [memberKey,member]of this.members)if(member.pid===pid&&member.role===role)this.members.delete(memberKey);
  return true;
 }
 _emit(name,value,details){try{this.onSample(name,value,details);}catch{this.callbackFailures++;}}
 async _inventory(){
  const entries=await this.io.readdir(this.procRoot,{withFileTypes:true}),pids=entries.filter(entry=>/^\d+$/.test(entry.name)&&entry.isDirectory()).map(entry=>Number(entry.name));
  if(pids.length>this.maxProcesses)return{processes:new Map(),reason:'process_inventory_capacity',failures:0,uptime:null};
  const processes=new Map();let cursor=0,failures=0;
  await Promise.all(Array.from({length:Math.min(this.readConcurrency,pids.length)},async()=>{while(cursor<pids.length){const pid=pids[cursor++];try{const stat=await this._stat(pid);processes.set(pid,stat);}catch(error){if(!['ENOENT','ESRCH'].includes(error.code))failures++;}}}));
  let uptime=null;try{const value=Number((await this.io.readFile(path.join(this.procRoot,'uptime'),'utf8')).trim().split(/\s+/)[0]);if(Number.isFinite(value)&&value>=0)uptime=value;}catch{}
  return{processes,reason:failures?'process_inventory_incomplete':null,failures,uptime};
 }
 async _children(at,elapsed){
  if(!this.capabilities.proc)return Object.fromEntries(roles.map(role=>[role,{available:false,reason:this.capabilities.reason,cpuPercent:null,rssBytes:null,processes:null,trackedRoots:[...this.roots.values()].filter(root=>root.role===role).length,missedProcesses:this.missedProcesses[role]}]));
  const familyRoots=[...this.roots.values()].filter(root=>roles.includes(root.role)),gatewayPids=new Set([...this.roots.values()].filter(root=>root.role==='gateway').map(root=>root.pid));
  await Promise.all(familyRoots.map(root=>root.pending));
  let inventory;try{inventory=await this._inventory();}catch(error){this.previous.clear();this.lastUptime=null;return Object.fromEntries(roles.map(role=>[role,{available:false,reason:'proc_read_'+safeCode(error),cpuPercent:null,rssBytes:null,processes:null,trackedRoots:[...this.roots.values()].filter(root=>root.role===role).length,missedProcesses:this.missedProcesses[role]}]));}
  if(inventory.reason==='process_inventory_capacity'){this.previous.clear();this.lastUptime=null;return Object.fromEntries(roles.map(role=>[role,{available:false,reason:inventory.reason,cpuPercent:null,rssBytes:null,processes:null,trackedRoots:[...this.roots.values()].filter(root=>root.role===role).length,missedProcesses:this.missedProcesses[role]}]));}
  const {processes}=inventory,assigned=new Map(),roleErrors={native:null,verifier:null};
  for(const root of familyRoots){
   const stat=processes.get(root.pid);
   if(root.error){roleErrors[root.role]='tracked_process_unreadable';continue;}
   if(!stat){roleErrors[root.role]='tracked_process_missing';continue;}
   if(stat.startTime!==root.identity){roleErrors[root.role]='pid_identity_changed';continue;}
   assigned.set(root.pid,root.role);
  }
  for(const member of this.members.values()){const stat=processes.get(member.pid);if(stat?.startTime===member.startTime&&!assigned.has(member.pid)&&!gatewayPids.has(member.pid))assigned.set(member.pid,member.role);}
  for(const stat of processes.values()){
   if(assigned.has(stat.pid)||gatewayPids.has(stat.pid))continue;let next=stat.ppid;const visited=new Set([stat.pid]);
   while(next&&!visited.has(next)){if(gatewayPids.has(next))break;if(assigned.has(next)){assigned.set(stat.pid,assigned.get(next));break;}visited.add(next);next=processes.get(next)?.ppid||0;}
  }
  const nextMembers=new Map(),nextPrevious=new Map(),results={};
  for(const role of roles){
   const selected=[...assigned].filter(([,value])=>value===role).map(([pid])=>processes.get(pid));let ticks=0n,warming=0,rss=0;
   for(const stat of selected){const key=stat.pid+'/'+stat.startTime,previous=this.previous.get(key);nextMembers.set(key,{role,pid:stat.pid,startTime:stat.startTime});nextPrevious.set(key,stat.ticks);rss+=stat.rssPages*this.capabilities.pageSize;
    if(previous!==undefined&&stat.ticks>=previous)ticks+=stat.ticks-previous;
    else if(this.lastUptime!==null&&Number(stat.startTime)/this.capabilities.clockTicks>=this.lastUptime)ticks+=stat.ticks;
    else warming++;
   }
   const trackedRoots=[...this.roots.values()].filter(root=>root.role===role).length;
   let reason=roleErrors[role]||((trackedRoots||selected.length)&&inventory.reason)||null;
   const vanished=[...this.members].filter(([key,member])=>member.role===role&&!nextMembers.has(key));
   // A process can exit between observations; its final ticks cannot be invented.
   const gaps=this.pendingGaps[role]+vanished.length;this.pendingGaps[role]=0;if(vanished.length)this.missedProcesses[role]+=vanished.length;
   if(!reason&&gaps)reason='process_exit_sampling_gap';
   const available=!reason;
   results[role]={available,reason,cpuPercent:available&&elapsed>0&&!warming?Number(ticks)/this.capabilities.clockTicks/(elapsed/1000)*100:null,rssBytes:available?rss:null,processes:selected.length,trackedRoots,warmingProcesses:warming,cpuReason:reason||(warming?'warming_up':elapsed<=0?'insufficient_interval':null),missedProcesses:this.missedProcesses[role],sampled:true};
  }
  this.members=nextMembers;this.previous=nextPrevious;this.lastUptime=inventory.uptime;return results;
 }
 async _gateway(elapsed){
  const root=[...this.roots.values()].find(root=>root.role==='gateway');
  const unavailable=(reason,errorCode)=>({available:false,reason,...(errorCode?{errorCode}:{}),cpuPercent:null,rssBytes:null,processes:null,trackedRoots:root?1:0,cpuReason:reason,missedProcesses:this.missedProcesses.gateway,sampled:true,scope:'exact_configured_gateway_PID_only_no_descendants'});
  if(!root)return unavailable('gateway_not_supplied');
  if(!this.capabilities.proc)return unavailable(this.capabilities.reason);
  await root.pending;
  if(root.error)return unavailable(['ENOENT','ESRCH'].includes(root.error)?'tracked_process_missing':'tracked_process_unreadable',root.error);
  let stat;
  try{stat=await this._stat(root.pid);}catch(error){if(this.gatewayPrevious)this.missedProcesses.gateway++;this.gatewayPrevious=null;return unavailable(['ENOENT','ESRCH'].includes(error.code)?'tracked_process_missing':'tracked_process_unreadable',safeCode(error));}
  if(stat.startTime!==root.identity||['Z','X'].includes(stat.state)){
   if(this.gatewayPrevious)this.missedProcesses.gateway++;this.gatewayPrevious=null;return unavailable(stat.startTime!==root.identity?'pid_identity_changed':'tracked_process_exited');
  }
  const previous=this.gatewayPrevious;this.gatewayPrevious={ticks:stat.ticks,startTime:stat.startTime};
  if(previous&&stat.ticks<previous.ticks)return unavailable('process_cpu_counter_decreased');
  const warming=!previous||previous.startTime!==stat.startTime,cpuReason=warming?'warming_up':elapsed<=0?'insufficient_interval':null;
  return{available:true,reason:null,cpuPercent:cpuReason?null:Number(stat.ticks-previous.ticks)/this.capabilities.clockTicks/(elapsed/1000)*100,rssBytes:stat.rssPages*this.capabilities.pageSize,processes:1,trackedRoots:1,warmingProcesses:warming?1:0,cpuReason,missedProcesses:this.missedProcesses.gateway,sampled:true,scope:'exact_configured_gateway_PID_only_no_descendants'};
 }
 sampleNow(){
  if(this.closed)return Promise.resolve(this.snapshot());if(this.sampling)return this.sampling;
  this.sampling=(async()=>{
   await this.ready;const at=this.clock(),elapsed=Math.max(0,at-this.lastAt),cpu=this.processInfo.cpuUsage(),memory=this.processInfo.memoryUsage();
   const cpuDelta=cpu.user+cpu.system-this.lastHostCpu.user-this.lastHostCpu.system;
   const hostCpuPercent=elapsed>0&&cpuDelta>=0?cpuDelta/1000/elapsed*100:null;
   const delayCount=this.monitor.count===undefined?null:Number(this.monitor.count),hasDelay=delayCount===null?Number.isFinite(this.monitor.mean):delayCount>0;
   const eventLoop=hasDelay?{samples:delayCount,p50:this.monitor.percentile(50)/1e6,p95:this.monitor.percentile(95)/1e6,max:this.monitor.max/1e6}:null;this.monitor.reset();
   const children=await this._children(at,elapsed),gateway=await this._gateway(elapsed);
   this.lastHostCpu=cpu;this.lastAt=at;
   this.report={sampledAt:at,elapsedMs:elapsed,capabilities:{...this.capabilities},host:{cpuPercent:hostCpuPercent,rssBytes:Number.isFinite(memory.rss)?memory.rss:null,eventLoopDelayMs:eventLoop,cpuIncludesWorkerThreads:true,eventLoopScope:'main_thread_only',scope:'runtime_Node_process_not_separate_gateway'},gateway,...children,skippedIntervals:this.skippedIntervals,callbackFailures:this.callbackFailures,limits:{intervalMs:this.intervalMs,maxProcesses:this.maxProcesses,maxRoots:this.maxRoots,readConcurrency:this.readConcurrency,maxGatewayRoots:1},measurement:'sampled_process_intervals; not lifetime or missed-peak maxima',limitations:['Short-lived descendants and between-sample peaks may be missed.','Runtime process CPU includes Node worker threads; event-loop delay describes only its main thread, not the separate gateway.','Gateway is the shared configured Node process alone, never its descendants or per-game attributable CPU.','Child CPU starts with an identity baseline; unreadable/reused/missing process intervals are null, never invented zeros.']};
   this._emit('hostNodeCpuPercent',hostCpuPercent,{kind:'sample',component:'host',availability:hostCpuPercent===null?'insufficient_interval':'available',measurement:'process_cpu_including_worker_threads'});
   this._emit('hostRssBytes',this.report.host.rssBytes,{kind:'gauge',component:'host',availability:this.report.host.rssBytes===null?'unavailable':'available',measurement:'sampled_rss'});
   // Preserve the histogram summary boundary: do not feed its p95 as a raw delay.
   this._emit('hostEventLoopDelayMs',null,{kind:'summary',component:'host',availability:eventLoop?'available':'no_samples',summary:eventLoop,measurement:'main_thread_histogram_summary'});
   this._emit('hostEventLoopWindowP95Ms',eventLoop?.p95??null,{kind:'sample',component:'host',availability:eventLoop?'available':'no_samples',measurement:'measured_window_p95'});
   if(eventLoop?.samples!==null&&eventLoop?.samples!==undefined)this._emit('hostEventLoopSamples',eventLoop.samples,{kind:'counter',component:'host',availability:'available',measurement:'original_histogram_sample_count'});
   for(const role of roles){const value=children[role],prefix=role==='native'?'native':'verifier',component=role==='native'?'native':'sealer';this._emit(prefix+'CpuPercent',value.cpuPercent,{kind:'sample',component,availability:value.cpuReason||'available',measurement:'sampled_process_family_cpu'});this._emit(prefix+'RssBytes',value.rssBytes,{kind:'gauge',component,availability:value.reason||'available',measurement:'sampled_process_family_rss'});}
   this._emit('gatewayNodeCpuPercent',gateway.cpuPercent,{kind:'sample',component:'gateway',availability:gateway.cpuReason||'available',measurement:'sampled_exact_shared_gateway_Node_process_cpu'});
   this._emit('gatewayRssBytes',gateway.rssBytes,{kind:'gauge',component:'gateway',availability:gateway.reason||'available',measurement:'sampled_exact_shared_gateway_Node_process_rss'});
   return this.snapshot();
  })().catch(()=>{
   this.report={sampledAt:this.clock(),capabilities:{...this.capabilities},available:false,reason:'resource_sampling_failed',gateway:{available:false,reason:'resource_sampling_failed',cpuPercent:null,rssBytes:null},skippedIntervals:this.skippedIntervals,callbackFailures:this.callbackFailures};return this.snapshot();
  }).finally(()=>{this.sampling=null;});return this.sampling;
 }
 snapshot(){if(this.report)return structuredClone(this.report);const gatewaySupplied=[...this.roots.values()].some(root=>root.role==='gateway'),reason=gatewaySupplied?(this.closed?'closed':'not_sampled'):'gateway_not_supplied';return{sampledAt:null,capabilities:{...this.capabilities},available:false,reason:this.closed?'closed':'not_sampled',gateway:{available:false,reason,cpuPercent:null,rssBytes:null,processes:null,trackedRoots:gatewaySupplied?1:0},skippedIntervals:this.skippedIntervals,callbackFailures:this.callbackFailures};}
 async close(){if(this.closed)return this.snapshot();this.closed=true;clearInterval(this.timer);this.monitor.disable();await this.sampling;await Promise.all([...this.roots.values()].map(root=>root.pending));this.roots.clear();this.members.clear();this.previous.clear();return this.snapshot();}
}
