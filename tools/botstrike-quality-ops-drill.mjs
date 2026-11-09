// Disposable local operations rehearsal. No deployment, container or production access.
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import {createWriteStream} from 'node:fs';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {createHash,randomBytes} from 'node:crypto';
import {execFile,fork} from 'node:child_process';
import {promisify} from 'node:util';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {WebSocket} from 'ws';
import {trackSocketDelivery} from '../tests/ws-delivery-client.mjs';
import {verifyRollbackBundle,requireRollbackRef,ROLLBACK_COMMIT} from './quality-rollback-bundle.mjs';
const execute=promisify(execFile),here=fileURLToPath(import.meta.url),repo=path.resolve(path.dirname(here),'..');
const digest=bytes=>createHash('sha256').update(bytes).digest('hex'),delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const account=n=>n.toString(16).padStart(64,'0');
const neutral=()=>({seq:0,x:0,y:0,yaw:0,pitch:0,fire:false,reload:false,walk:false,crouch:false,jump:false,ability:false,interact:false,scope:false,drop:false,item:0,practice:0,throw_mode:0,preview_item:0});
const inside=(root,target)=>{const absolute=path.resolve(target);assert.ok(absolute.startsWith(path.resolve(root)+path.sep),'Mutation must stay below the disposable drill root');return absolute;};
const writeJSON=async(file,value)=>fs.writeFile(file,JSON.stringify(value,null,2)+'\n',{mode:0o600});
const readJSON=async file=>JSON.parse(await fs.readFile(file,'utf8'));

export async function inventoryTree(directory){
 const rows=[];
 async function walk(base,relative=''){
  for(const entry of (await fs.readdir(base,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){
   const child=path.join(base,entry.name),name=path.join(relative,entry.name);
   assert.ok(!entry.isSymbolicLink(),'Backup input contains a symlink: '+name);
   if(entry.isDirectory())await walk(child,name);
   else{assert.ok(entry.isFile(),'Backup input is not a regular file: '+name);const bytes=await fs.readFile(child);rows.push({file:name,bytes:bytes.length,sha256:digest(bytes)});}
  }
 }
 await walk(directory);return rows;
}
export async function copySnapshot(root,source,target){
 inside(root,target);assert.notEqual(path.resolve(source),path.resolve(target));
 assert.ok(!path.resolve(target).startsWith(path.resolve(source)+path.sep),'Snapshot destination cannot be nested inside its source');
 const before=await inventoryTree(source);
 await fs.cp(source,target,{recursive:true,preserveTimestamps:true,errorOnExist:true,force:false});
 const after=await inventoryTree(target);assert.deepEqual(after,before,'Backup/restore file bytes changed');return{files:before.length,bytes:before.reduce((n,r)=>n+r.bytes,0),inventoryDigest:digest(JSON.stringify(before))};
}
export async function exactArtifacts(directory){
 const root=await fs.realpath(directory),manifest=await readJSON(path.join(root,'verifiers.json')),names=new Set();
 assert.ok(Array.isArray(manifest)&&manifest.length>1,'Current and retained artifact manifest required');
 for(const entry of manifest){
  assert.match(entry.name,/^[a-z0-9-]+$/);assert.ok(!names.has(entry.name),'Duplicate verifier name');names.add(entry.name);
  const assets=path.resolve(root,entry.directory);assert.ok(assets===root||assets.startsWith(root+path.sep),'Manifest escapes release directory');
  assert.equal(await fs.realpath(assets),assets,'Artifact directory must not redirect outside snapshot');
  assert.deepEqual(Object.keys(entry.sha256).sort(),['botstrike-engine','myelin-botstrike']);
  for(const [file,expected]of Object.entries(entry.sha256)){
   assert.match(expected,/^[a-f0-9]{64}$/);const target=path.join(assets,file),metadata=await fs.lstat(target);assert.ok(metadata.isFile()&&!metadata.isSymbolicLink(),'Artifact must be a regular file');assert.equal(digest(await fs.readFile(target)),expected,'Exact artifact mismatch: '+entry.name+'/'+file);
  }
 }
 assert.equal(manifest.filter(e=>e.directory==='.').length,1);return manifest;
}
async function command(binary,args,{assets,work,expectFailure=false}={}){
 const options={cwd:repo,encoding:'utf8',timeout:300000,maxBuffer:400000000,env:{...process.env,...(assets?{BOTSTRIKE_ASSETS:assets}:{}),...(work?{TMPDIR:work}:{})}};let output;
 try{output=(await execute(binary,args,options)).stdout;}
 catch(error){if(!expectFailure)throw error;assert.ok(error.code!==0);return{rejected:true,code:typeof error.code==='number'?error.code:null,message:String(error.stderr||error.message).slice(0,2000)};}
 assert.equal(expectFailure,false,'Verifier unexpectedly accepted a rejected fixture');return output;
}
async function nativeProbe(binary,input){
 const {spawn}=await import('node:child_process');
 return new Promise((resolve,reject)=>{const child=spawn(binary,[],{stdio:['pipe','pipe','pipe']}),chunks=[];let bytes=0;const timer=setTimeout(()=>child.kill('SIGKILL'),15000);child.stdout.on('data',chunk=>{bytes+=chunk.length;if(bytes>1000000)child.kill('SIGKILL');else chunks.push(chunk);});child.on('error',reject);child.on('exit',code=>{clearTimeout(timer);code===0?resolve(Buffer.concat(chunks).toString()):reject(Error('Native probe failed: '+code));});child.stdin.on('error',()=>{});child.stderr.resume();child.stdin.end(input);});
}
// Same complete no-AI fixture as tests/botstrike-historical-profiles.mjs.
// It is generated on each original engine, never imported as a past human match.
async function historicalFixture(root,release,entry){
 const assets=path.join(release,entry.directory),work=inside(root,path.join(root,'fixture-work',entry.name));await fs.mkdir(work,{recursive:true,mode:0o700});
 const config={map:0,mode:'deathmatch',heroes:[0,1,2,3,4,5,0,1,2,3],bots:Array(10).fill(false),difficulty:1,seed:2050},header=JSON.stringify({config})+'\n',frame=JSON.stringify({inputs:Array(10).fill(null)})+'\n';
 const initial=JSON.parse((await nativeProbe(path.join(assets,'botstrike-engine'),header+frame)).trim().split('\n')[0]).state,ticks=initial.phase_ticks;assert.ok(Number.isInteger(ticks)&&ticks>0&&ticks<=64*3600);
 const tape=header+frame.repeat(ticks),tapeFile=path.join(work,'tape.jsonl');await fs.writeFile(tapeFile,tape,{mode:0o600});
 const result=JSON.parse(await command(path.join(assets,'botstrike-engine'),['replay',tapeFile],{assets,work}));assert.equal(result.completed,true);
 const action={type:'match',room:'f'.repeat(24),players:Array.from({length:10},(_,i)=>account(i+101)),tape,result},actionFile=path.join(work,'match.json');await writeJSON(actionFile,action);
 const record=JSON.parse(await command(path.join(assets,'myelin-botstrike'),['record',path.join(work,'session'),actionFile],{assets,work}));assert.equal(record.replay.verified,true);
 const file=path.join(root,'exports',entry.name+'.json');await writeJSON(file,record.export);
 return{verifier:entry.name,file:path.relative(root,file),profile:record.session.profile,ticks,synthetic:true,origin:'fresh_exact_retained_engine_fixture',tapeBytes:Buffer.byteLength(tape),exportSha256:digest(await fs.readFile(file))};
}
async function routedVerify(release,file,expected,work){
 const manifest=await exactArtifacts(release),attempts=[];
 for(const entry of manifest){
  const assets=path.join(release,entry.directory);
  try{const result=JSON.parse(await command(path.join(assets,'myelin-botstrike'),['verify',file],{assets,work}));assert.equal(result.verified,true);assert.equal(entry.name,expected,'Wrong profile dispatcher');return{verifier:entry.name,verified:true,frames:result.frames,authority:result.authority,attempts};}
  catch(error){assert.match(String(error.stderr||error.message),/Application artifact or rules do not match this build/,'Unexpected verifier failure');attempts.push({verifier:entry.name,profileRejected:true});}
 }
 throw Error('No exact retained verifier accepted export');
}
async function waitFor(label,predicate,{timeout=240000,poll=100,onPoll}={}){
 const deadline=Date.now()+timeout;while(Date.now()<deadline){const value=await predicate();if(value)return value;await onPoll?.();await delay(poll);}throw Error('Operations drill timed out: '+label);
}

async function startRuntime({root,data,assets,moduleUrl=pathToFileURL(path.join(repo,'botstrike-service/server.mjs')).href,provenance,tickMs=0}){
 inside(root,data);inside(root,assets);await fs.mkdir(data,{recursive:true,mode:0o700});const token=randomBytes(32).toString('hex');
 const child=fork(here,['--runtime-child'],{cwd:repo,stdio:['ignore','pipe','pipe','ipc']}),pending=new Map();let serial=0,readyResolve,readyReject;
 const ready=new Promise((resolve,reject)=>{readyResolve=resolve;readyReject=reject;}),errors=[];
 child.stdout.on('data',()=>{});child.stderr.on('data',bytes=>{if(errors.length<20)errors.push(String(bytes).slice(0,1000));});
 child.on('message',message=>{if(message.type==='ready')readyResolve(message);else if(message.type==='startup-error')readyReject(Error(message.message));else if(message.id&&pending.has(message.id)){const job=pending.get(message.id);pending.delete(message.id);clearTimeout(job.timer);message.error?job.reject(Error(message.error)):job.resolve(message.value);}});
 const exited=new Promise(resolve=>child.once('exit',(code,signal)=>{readyReject(Error('Runtime exited before readiness'));for(const job of pending.values()){clearTimeout(job.timer);job.reject(Error('Runtime process exited'));}pending.clear();resolve({code,signal});}));child.once('error',readyReject);
 const startup=setTimeout(()=>readyReject(Error('Runtime startup timeout')),15000);child.send({type:'start',root,data,assets,moduleUrl,provenance,tickMs,token});
 let address;try{address=await ready;}catch(error){child.kill('SIGTERM');await exited;throw error;}finally{clearTimeout(startup);}
 const base='http://127.0.0.1:'+address.port;
 async function ipc(op){const id=++serial;return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{pending.delete(id);reject(Error('Runtime IPC timeout: '+op));},20000);pending.set(id,{resolve,reject,timer});child.send({type:op,id});});}
 async function request(id,endpoint,body,expected=200){const response=await fetch(base+endpoint,{method:body===undefined?'GET':'POST',headers:{'Content-Type':'application/json','X-Runtime-Token':token,'X-UTXOPlay-Account':id},body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(20000)});const value=await response.json();assert.equal(response.status,expected,JSON.stringify(value));return value;}
 let stopped=false;
 return{base,token,pid:address.pid,request,ipc,errors,async stop(){if(stopped)return;stopped=true;if(child.exitCode===null&&child.signalCode===null){const value=await ipc('close');await exited;return value;}},async terminate(){if(stopped)return;stopped=true;child.kill('SIGTERM');await exited;}};
}
async function runtimeChild(){
 let service,closing=false,trace,traceInfo;
 async function finishTrace(){if(trace&&!trace.destroyed)await new Promise(resolve=>trace.end(resolve));return traceInfo;}
 async function close(){if(closing)return;closing=true;try{await service?.close();await finishTrace();}finally{process.exit(0);}}
 process.on('SIGTERM',close);process.on('SIGINT',close);
 process.on('message',async message=>{
  if(message.type==='start')try{
   await fs.access(path.join(message.root,'.ops-drill-owner'));inside(message.root,message.data);inside(message.root,message.assets);
   const traceFile=inside(message.root,path.join(message.root,'evidence','runtime-'+path.basename(message.data)+'-'+process.pid+'.jsonl'));trace=createWriteStream(traceFile,{flags:'wx',mode:0o600});traceInfo={file:path.relative(message.root,traceFile),bytes:0,dropped:0,errorCode:null};trace.on('error',error=>{traceInfo.errorCode=error.code||'IO_ERROR';});
   const observe=event=>{const value=event.type==='native_frame'?{type:event.type,at:event.at,monotonicMs:event.monotonicMs,room:event.room,tick:event.state.tick,phase:event.state.phase,score:event.state.score,acknowledgedSequences:event.state.players.map(p=>p.last_seq)}:event.type==='native_input'?null:event;if(!value)return;if(traceInfo.errorCode||trace.writableLength>1048576){traceInfo.dropped++;return;}const line=JSON.stringify(value)+'\n';traceInfo.bytes+=Buffer.byteLength(line);trace.write(line);};
   const {createBotStrike}=await import(message.moduleUrl);service=createBotStrike({secret:message.token,data:message.data,assets:message.assets,tickMs:message.tickMs,heartbeatMs:1000,qualityOptions:{flushIntervalMs:1000},qualityProvenance:message.provenance,observe});
   await new Promise((resolve,reject)=>{service.server.once('error',reject);service.server.listen(0,'127.0.0.1',resolve);});process.send({type:'ready',port:service.server.address().port,pid:process.pid});
  }catch(error){process.send({type:'startup-error',message:error.message});await close();}
  else if(message.id)try{
   let value;if(message.type==='sample')value=await service.resourceSampler?.sampleNow()??null;
   else if(message.type==='prune'){await service.prune();value=true;}
   else if(message.type==='flush'){await service.quality?.flush();value=service.quality?.health()??null;}
   else if(message.type==='close'){await service.close();const trace=await finishTrace();process.send({id:message.id,value:{trace}},()=>process.exit(0));return;}
   else throw Error('Unknown drill IPC');process.send({id:message.id,value});
  }catch(error){process.send({id:message.id,error:error.message});}
 });
}
async function openPilot(runtime,id,roomId){
 const ws=new WebSocket(runtime.base.replace('http','ws')+'/api/socket',{headers:{'X-Runtime-Token':runtime.token,'X-UTXOPlay-Account':id}}),pilot={ws,id,roomId,token:null,state:null,sent:0,highestAck:0,snapshots:0,errors:[]};
 pilot.delivery=trackSocketDelivery(ws);pilot.inputProof=createPilotInputProof(roomId);
 ws.on('error',error=>pilot.errors.push(error.message));ws.on('close',()=>{pilot.token=null;pilot.inputProof.close();pilot.highestAck=0;});ws.on('message',raw=>{const message=JSON.parse(raw);pilot.inputProof.receive(message);pilot.highestAck=pilot.inputProof.highestAck;if(message.type==='control')pilot.token=message.active?message.token:null;else if(message.type==='state'){pilot.state=message.room;pilot.snapshots++;}else if(message.type==='error')pilot.errors.push(message.error);});
 await waitFor('pilot controller',()=>pilot.token,{timeout:15000});return pilot;
}
function startInputs(pilot){pilot.timer=setInterval(()=>{if(pilot.ws.readyState!==WebSocket.OPEN||pilot.state?.status!=='running'||!pilot.delivery.get(pilot.roomId))return;const seq=++pilot.sent,input={...neutral(),seq,x:.4*Math.sin(seq/19),y:.3,yaw:pilot.state.slot<5?0:Math.PI,pitch:0,fire:seq%3!==0,reload:seq%90===0,jump:seq%120===0,viewTick:Math.max(0,pilot.state.state?.tick-4||0)},envelope=pilot.delivery.envelope(pilot.roomId,input);if(pilot.inputProof.sent(envelope))pilot.ws.send(JSON.stringify(envelope));},25);}
function closePilots(pilots){for(const pilot of pilots){clearInterval(pilot.timer);pilot.ws.terminate();}}
// Local tool guard, not a second service ACK issuer. The bounded sent map binds
// the canonical controller-only wire proof to this pilot's current WS context.
export function createPilotInputProof(roomId){
 assert.match(roomId,/^[a-f0-9]{24}$/);let owner=null,context=null,highestAck=0,lastNativeSeq=null,verifiedAckCount=0;const known=new Map();
 const reset=()=>{known.clear();context=null;highestAck=0;lastNativeSeq=null;};
 const isNeutral=input=>!['x','y','fire','reload','walk','crouch','jump','ability','interact','scope','drop','item','practice'].some(key=>!!input[key])&&input.weapon==null&&input.buy==null;
 return{
  get highestAck(){return highestAck;},get lastNativeSeq(){return lastNativeSeq;},get verifiedAckCount(){return verifiedAckCount;},get pending(){return known.size;},
  close(){owner=null;reset();},
  sent(envelope){
   const input=envelope?.input,delivery=envelope?.delivery;if(!owner||!context||envelope.type!=='input'||envelope.room!==roomId||delivery?.version!==2||!/^[a-f0-9]{32}$/.test(delivery.nonce||'')||!Number.isSafeInteger(input?.seq)||input.seq<1||input.seq>0xffffffff||known.has(input.seq)||input.seq<=highestAck)return false;
   known.set(input.seq,{...context,neutral:isNeutral(input)});while(known.size>256)known.delete(known.keys().next().value);return true;
  },
  receive(message){
   if(message?.type==='control'){reset();owner=message.active===true&&typeof message.token==='string'&&message.token.length>0&&message.inputProtocol?.version===2&&message.inputProtocol.maxAgeMs===400?message.token:null;return null;}
   if(message?.type==='input_resync'){reset();return null;}if(message?.type!=='state')return null;
   const room=message.room,player=room?.state?.players?.[room.slot],tick=room?.state?.tick,life=player?.life;
   if(!owner||room?.id!==roomId||!Number.isSafeInteger(life)||life<1||!Number.isSafeInteger(tick)||tick<0||message.delivery?.version!==2||!/^[a-f0-9]{32}$/.test(message.delivery.nonce||'')){reset();return null;}
   if(context&&(context.life!==life||context.owner!==owner||context.room!==room.id))reset();context={owner,room:room.id,life,minNativeTick:tick};lastNativeSeq=Number.isSafeInteger(player.last_seq)?player.last_seq:null;
   const ack=message.inputAck;if(!ack||Array.isArray(ack)||Object.keys(ack).sort().join(',')!=='life,neutral,seq,tick,version'||ack.version!==1||!Number.isSafeInteger(ack.seq)||ack.seq<1||ack.seq>0xffffffff||!Number.isSafeInteger(ack.tick)||ack.tick<1||ack.life!==life||typeof ack.neutral!=='boolean'||ack.seq!==player.last_seq||ack.tick>tick)return null;
   const sent=known.get(ack.seq);if(!sent||sent.owner!==owner||sent.room!==room.id||sent.life!==life||ack.tick<=sent.minNativeTick||(ack.neutral&&!sent.neutral))return null;
   highestAck=Math.max(highestAck,ack.seq);verifiedAckCount++;for(const seq of known.keys())if(seq<=ack.seq)known.delete(seq);return Object.freeze({...ack});
  },
 };
}
const liveStatuses=new Set(['running','waiting','sealing']);
export function drainedForBackup(metrics){return!!(metrics?.draining===true&&metrics.drainReady===true&&metrics.pendingIO===0&&metrics.sealingJobs===0&&metrics.rooms&&typeof metrics.rooms==='object'&&!Array.isArray(metrics.rooms)&&Object.entries(metrics.rooms).every(([status,count])=>Number.isSafeInteger(count)&&count>=0&&(!liveStatuses.has(status)||count===0)));}

async function currentMatch(root,assets,provenance,progress){
 const data=path.join(root,'live-data'),runtime=await startRuntime({root,data,assets,provenance}),pilots=[],samples=[];let stopped=false;
 try{
  const a=account(1),b=account(2),created=await runtime.request(a,'/api/action',{type:'create',kind:'private',mode:'deathmatch',map:0,hero:0,difficulty:1}),id=created.room.id;
  await runtime.request(b,'/api/action',{type:'join',room:id,hero:4});for(const player of [a,b])pilots.push(await openPilot(runtime,player,id));
  for(const pilot of pilots)startInputs(pilot);await runtime.request(a,'/api/action',{type:'start',controlToken:pilots[0].token});
  await waitFor('first accepted active input',()=>pilots.every(p=>p.highestAck>=3));
  const beforeDrain=await runtime.request(a,'/api/metrics');assert.ok(beforeDrain.rooms.running>=1);
  await runtime.request(a,'/api/admin/drain',{});await runtime.request(account(3),'/api/action',{type:'create',kind:'private',mode:'deathmatch',map:0,hero:0,difficulty:1},400);
  let lastStatus='',lastSample=0;
  const completed=await waitFor('complete live match and sealing',async()=>{
   const room=(await runtime.request(a,'/api/state')).room;if(room.status==='failed')throw Error(room.error);
   if(room.status!==lastStatus){progress('Current match: '+room.status);lastStatus=room.status;}
   const metrics=await runtime.request(a,'/api/metrics');
   if(Date.now()-lastSample>=150){lastSample=Date.now();samples.push({phase:room.status,at:Date.now(),sample:await runtime.ipc('sample')});}
   return room.status==='finished'&&drainedForBackup(metrics)?{room,metrics}:null;
  });
  const career=await waitFor('career durable commit',async()=>{const value=await runtime.request(a,'/api/career');return value.matches===1?value:null;},{timeout:15000});
  assert.equal(completed.room.proof.verified,true);assert.ok(pilots.every(p=>p.sent>=3&&p.highestAck>=3&&p.errors.length===0));
  assert.ok(drainedForBackup(completed.metrics),'Drain did not reach zero active rooms and zero pending recording I/O');
  const file=path.join(root,'exports','current.json');await writeJSON(file,await runtime.request(a,'/api/export'));
  const quality=await runtime.request(a,'/api/quality?history=1');await writeJSON(path.join(root,'evidence','active-match-quality.json'),quality);await writeJSON(path.join(root,'evidence','active-match-resources.json'),samples);
  const pilotEvidence=pilots.map(p=>({slot:p.state?.slot,sent:p.sent,highestAck:p.highestAck,verifiedAckCount:p.inputProof.verifiedAckCount,lastNativeSeqDiagnostic:p.inputProof.lastNativeSeq,ackProof:'controller_inputAck_exact_known_sent_v2',proofSnapshot:'before_pilot_close',snapshots:p.snapshots,errors:[...p.errors]}));
  await runtime.ipc('flush');closePilots(pilots);const stoppedRuntime=await runtime.stop();stopped=true;assert.equal(stoppedRuntime.trace.dropped,0);assert.equal(stoppedRuntime.trace.errorCode,null);
  return{data,roomId:id,account:a,proof:completed.room.proof,career,ticks:completed.room.state.tick,source:'two_automated_active_clients_eight_native_bots',humanParticipants:0,drain:{requestedWhileRunning:true,newMatchRejected:true,activeAtCompletion:0,pendingIO:completed.metrics.pendingIO,drainReady:completed.metrics.drainReady},pilots:pilotEvidence,resources:{samples:samples.length,live:samples.filter(s=>s.phase==='running').length,sealing:samples.filter(s=>s.phase==='sealing').length,nativeObserved:samples.filter(s=>(s.sample?.native?.processes||0)>0).length,verifierObserved:samples.filter(s=>(s.sample?.verifier?.processes||0)>0).length,artifact:'evidence/active-match-resources.json',boundary:'separate_runtime_Node_process_including_seal_worker_threads; native_child_family_and_verifier_child_family_reported_separately; driver_and_clients_in_parent_excluded'},trace:stoppedRuntime.trace,qualityArtifact:'evidence/active-match-quality.json',exportSha256:digest(await fs.readFile(file))};
 }finally{closePilots(pilots);if(!stopped)await runtime.terminate();}
}
export async function baselineSource(root,ref,{bundleDirectory=path.join(repo,'build-validation/network-quality/rollback-source'),requireBundle=process.env.BOTSTRIKE_OPS_REQUIRE_BUNDLE==='1'}={}){
 const revision=requireRollbackRef(ref),directory=inside(root,path.join(root,'baseline-source'));let bundle,files,bundlePresent=false;
 try{await fs.lstat(bundleDirectory);bundlePresent=true;let expectedManifestSha256;try{expectedManifestSha256=(await readJSON(path.join(repo,'build-validation/network-quality/binding.json'))).rollbackBundle?.manifestSha256;}catch(error){if(error.code!=='ENOENT')throw error;}bundle=await verifyRollbackBundle(bundleDirectory,{ref,expectedManifestSha256});files=bundle.files.map(row=>row.file);}
 catch(error){if(error.code!=='ENOENT'||requireBundle||bundlePresent)throw error;files=(await execute('git',['ls-tree','-r','--name-only',revision,'botstrike-service','shared','botstrike/spec.json'],{cwd:repo})).stdout.trim().split('\n');}
 await fs.mkdir(directory,{mode:0o700});
 for(const file of files){assert.ok(/^(?:botstrike-service|shared)\/[a-z-]+\.mjs$/.test(file)||file==='botstrike/spec.json','Unexpected baseline source entry');const target=inside(root,path.join(directory,file));await fs.mkdir(path.dirname(target),{recursive:true});if(bundle){await fs.copyFile(path.join(bundleDirectory,'source',file),target);assert.equal(digest(await fs.readFile(target)),bundle.files.find(row=>row.file===file).sha256,'Copied rollback source differs');}else{const {stdout}=await execute('git',['show',revision+':'+file],{cwd:repo,maxBuffer:10000000});await fs.writeFile(target,stdout);}}
 await writeJSON(path.join(directory,'package.json'),{type:'module'});await fs.symlink(path.join(repo,'node_modules'),path.join(directory,'node_modules'),'dir');
 return{revision,moduleUrl:pathToFileURL(path.join(directory,'botstrike-service/server.mjs')).href,files:files.length,bundle:bundle||null};
}
export async function sourceInventory(directory=repo){
 const files=(await fs.readdir(path.join(directory,'botstrike-service'))).filter(name=>name.endsWith('.mjs')).sort();
 return Promise.all([...files.map(name=>'botstrike-service/'+name),'tests/ws-delivery-client.mjs','tools/botstrike-quality-ops-drill.mjs','tools/quality-rollback-bundle.mjs','tools/quality-release-binding.mjs'].map(async file=>({file,sha256:digest(await fs.readFile(path.join(directory,file)))})));
}
export async function opsProvenance({directory=repo,environment=process.env}={}){
 const inventory=await sourceInventory(directory),unknown={sourceRevision:'unknown',imageId:'unknown',nativeProfile:'unknown'},result={provenance:unknown,sourceKind:'unknown',provenanceBound:false,reason:'no_image_binding',inventory};let guard,bytes;
 try{bytes=await fs.readFile(path.join(directory,'build-validation/network-quality/binding.json'));guard=JSON.parse(bytes);}catch(error){if(error.code==='ENOENT')return result;throw error;}
 assert.equal(guard.sourceKind,'git_tree');assert.match(guard.sourceRevision||'',/^[a-f0-9]{40}$/);assert.equal(environment.BOTSTRIKE_SOURCE_KIND,'git_tree','Image ENV/source kind mismatch');assert.equal(environment.BOTSTRIKE_SOURCE_REVISION,guard.sourceRevision,'Image ENV/build source mismatch');
 if(JSON.stringify(guard.opsSourceInventory)!==JSON.stringify(inventory))return{...result,reason:'source_bytes_differ_from_image_binding'};
 const bound=await readJSON(path.join(directory,'docs/acceptance/arsenal-audio/bound-application.json'));assert.equal(guard.nativeModelSha256,bound.modelSha256);assert.equal(guard.portableProfileSha256,bound.profileSha256);
 for(const file of ['release/botstrike-engine','release/myelin-botstrike','botstrike/spec.json']){assert.equal(digest(await fs.readFile(path.join(directory,file))),bound.base.files[file],'Native bytes differ from retained binding');assert.equal(guard.protectedFiles[file],bound.base.files[file]);}
 const imageId=environment.BOTSTRIKE_IMAGE_ID||'unknown';if(imageId!=='unknown')assert.match(imageId,/^sha256:[a-f0-9]{64}$/);
 return{provenance:{sourceRevision:guard.sourceRevision,imageId,nativeProfile:bound.profileSha256},sourceKind:'git_tree',sourceBound:true,provenanceBound:false,provenanceFieldsComplete:imageId!=='unknown',imageIdentityOrigin:imageId==='unknown'?'unknown':'launcher_supplied',imageIdentityVerifiedInsideContainer:false,requiresExternalDockerInspectMatch:true,reason:imageId==='unknown'?'image_id_not_supplied':'source_bytes_matched_image_identity_requires_external_inspection',bindingSha256:digest(bytes),inventory};
}

export async function runOpsDrill({preflightOnly=false,baselineRef='01dee05',progress=message=>console.error(message)}={}){
 const root=await fs.mkdtemp(path.join(tmpdir(),'botstrike-quality-ops-'));await fs.chmod(root,0o700);await fs.writeFile(path.join(root,'.ops-drill-owner'),randomBytes(32));
 for(const name of ['exports','evidence','tmp'])await fs.mkdir(path.join(root,name),{mode:0o700});
 const report={schemaVersion:1,startedAt:new Date().toISOString(),root,status:'running',isolation:{onlyDisposableData:true,productionAccess:false,containerOperations:false,externalRequests:false},clock:{runtimeTickMs:0,label:'accelerated_wall_clock_only_native_64Hz_rules_unchanged'},limitations:['Local loopback automation and synthetic exports are not human play, internet transport, physical hardware or historical production-save acceptance.','Resource CPU/RSS are sampled process intervals; missed processes and peaks remain unavailable.','Fault injection is not an actual full-disk/power-cut experiment.','Rollback uses the locally retained baseline service source with the identical V5 native pair; no old engine interprets a new profile.'],stages:{}};
 const reportFile=path.join(root,'report.json');let runtime;
 try{
  const originalRelease=path.join(repo,'release'),manifest=await exactArtifacts(originalRelease),assets=path.join(root,'assets');report.stages.serviceSource=await sourceInventory();report.stages.artifacts={profiles:manifest.map(e=>({name:e.name,sha256:e.sha256})),snapshot:await copySnapshot(root,originalRelease,assets)};
  const baseline=await baselineSource(root,baselineRef);report.stages.baselineSource={revision:baseline.revision,files:baseline.files,bundle:baseline.bundle};await writeJSON(reportFile,report);
  if(preflightOnly){report.status='preflight_only';report.finishedAt=new Date().toISOString();await writeJSON(reportFile,report);return report;}
  const current=manifest.find(e=>e.directory==='.'),binding=await opsProvenance(),provenance=binding.provenance;report.provenance=binding;
  progress('Running isolated active match, complete seal and drain');const match=await currentMatch(root,assets,provenance,progress);report.stages.activeMatch=match;
  for(const entry of manifest.filter(e=>e.directory!=='.')){progress('Generating original-profile synthetic export: '+entry.name);(report.stages.retainedFixtures??=[]).push(await historicalFixture(root,assets,entry));await writeJSON(reportFile,report);}
  assert.equal(match.drain.drainReady,true);assert.equal(match.drain.pendingIO,0);
  const backup=path.join(root,'backup');await fs.mkdir(backup,{mode:0o700});report.stages.backup={coherent:'runtime_drained_zero_live_waiting_sealing_and_pendingIO_then_closed',data:await copySnapshot(root,match.data,path.join(backup,'data')),assets:await copySnapshot(root,assets,path.join(backup,'assets')),exports:await copySnapshot(root,path.join(root,'exports'),path.join(backup,'exports'))};
  const restored=path.join(root,'restored');await fs.mkdir(restored,{mode:0o700});report.stages.restore={data:await copySnapshot(root,path.join(backup,'data'),path.join(restored,'data')),assets:await copySnapshot(root,path.join(backup,'assets'),path.join(restored,'assets')),exports:await copySnapshot(root,path.join(backup,'exports'),path.join(restored,'exports'))};
  report.stages.restoredExports=[];
  for(const entry of manifest){const file=path.join(restored,'exports',entry.directory==='.'?'current.json':entry.name+'.json');progress('Verifying restored original profile: '+entry.name);report.stages.restoredExports.push(await routedVerify(path.join(restored,'assets'),file,entry.name,path.join(root,'tmp')));}
  runtime=await startRuntime({root,data:path.join(restored,'data'),assets:path.join(restored,'assets'),provenance:{...provenance,nativeProfile:match.proof.profile}});
  const restoredRoom=(await runtime.request(match.account,'/api/state')).room,restoredCareer=await runtime.request(match.account,'/api/career');assert.equal(restoredRoom.id,match.roomId);assert.equal(restoredRoom.proof.verified,true);assert.deepEqual(restoredCareer,match.career);
  await runtime.ipc('prune');await runtime.ipc('prune');assert.deepEqual(await runtime.request(match.account,'/api/career'),match.career);const restoredStop=await runtime.stop();runtime=null;
  report.stages.restoredRuntime={sameRoom:true,verifiedExportAvailable:true,sameCareer:true,repeatedRecoveryIdempotent:true,trace:restoredStop.trace};
  // Remove only derived career state in a second disposable clone, then replay
  // accepted host metadata. Signed tape/export bytes are never edited.
  const recoveryData=path.join(root,'recovery-data');await copySnapshot(root,path.join(backup,'data'),recoveryData);await fs.rm(path.join(recoveryData,'careers'),{recursive:true,force:true});const metadataFile=path.join(recoveryData,'rooms',match.roomId,'room.json'),metadata=await readJSON(metadataFile);metadata.careerCommitted=false;await writeJSON(metadataFile,metadata);
  const {CareerStore}=await import('../botstrike-service/career.mjs'),{pruneReplays}=await import('../botstrike-service/retention.mjs'),recoveryAlerts=[];
  const fault=new CareerStore(recoveryData,{onAlert:a=>recoveryAlerts.push(a),io:{open:async(file,...args)=>{if(file.includes(path.sep+'careers'+path.sep)&&file.includes('.tmp-'))throw Object.assign(Error('Explicit drill fault injection'),{code:'ENOSPC'});return fs.open(file,...args);}}});
  const blocked=await fault.recover();assert.equal(blocked.complete,false);const future=Date.now()+40*86400000;assert.deepEqual(await pruneReplays(recoveryData,{now:future,protectedRooms:blocked.protectedRooms,onAlert:a=>recoveryAlerts.push(a)}),[]);
  const recovered=new CareerStore(recoveryData,{onAlert:a=>recoveryAlerts.push(a)}),fixed=await recovered.recover();assert.equal(fixed.complete,true);assert.deepEqual(await recovered.view(match.account),match.career);assert.equal((await recovered.recover()).recovered,0);
  const removed=await pruneReplays(recoveryData,{now:future,protectedRooms:fixed.protectedRooms,onAlert:a=>recoveryAlerts.push(a)});assert.ok(removed.includes(match.roomId));assert.deepEqual(await new CareerStore(recoveryData).view(match.account),match.career);
  report.stages.recoveryRetention={fault:'explicit_open_ENOSPC_injection_not_real_full_disk',sourceProtectedUntilCommit:true,idempotent:true,expiredAfterRecovery:true,careerSurvivesExpiry:true,alerts:recoveryAlerts};
  // A completed native match with an unavailable verifier must fail closed.
  const brokenAssets=path.join(root,'broken-assets');await fs.mkdir(brokenAssets);await fs.copyFile(path.join(assets,'botstrike-engine'),path.join(brokenAssets,'botstrike-engine'));await fs.chmod(path.join(brokenAssets,'botstrike-engine'),0o700);await fs.writeFile(path.join(brokenAssets,'myelin-botstrike'),'unavailable verifier fixture',{mode:0o600});
  runtime=await startRuntime({root,data:path.join(root,'sealing-failure-data'),assets:brokenAssets,provenance});await runtime.request(account(4),'/api/action',{type:'create',kind:'practice',mode:'deathmatch',map:0,hero:0,difficulty:1});progress('Running complete native match with deliberate verifier-launch failure');
  const failed=await waitFor('sealing failure',async()=>{const room=(await runtime.request(account(4),'/api/state')).room;return room.status==='failed'?room:null;});assert.equal(failed.state.phase,'finished');assert.equal(failed.proof,null);await runtime.request(account(4),'/api/export',undefined,409);const failureMetrics=await runtime.request(account(4),'/api/metrics');assert.equal(failureMetrics.sealingFailures,1);assert.equal(failureMetrics.verifiedMatches,0);const failedStop=await runtime.stop();runtime=null;
  report.stages.sealingFailure={nativeCompleted:true,exportRejected:true,verifiedMatches:0,sealingFailures:1,trace:failedStop.trace};
  const interruptedData=path.join(root,'interrupted-data');runtime=await startRuntime({root,data:interruptedData,assets,provenance});const unfinished=(await runtime.request(account(5),'/api/action',{type:'create',kind:'practice',mode:'deathmatch',map:0,hero:0,difficulty:1})).room;await waitFor('unfinished native ticks',async()=>((await runtime.request(account(5),'/api/state')).room?.state?.tick||0)>4);const unfinishedStop=await runtime.stop();runtime=null;
  runtime=await startRuntime({root,data:interruptedData,assets,provenance});const interrupted=(await runtime.request(account(5),'/api/state')).room;assert.equal(interrupted.id,unfinished.id);assert.equal(interrupted.status,'interrupted');assert.equal(interrupted.proof,null);await runtime.request(account(5),'/api/export',undefined,409);const interruptedStop=await runtime.stop();runtime=null;
  report.stages.startupInterruption={processRestart:true,stopWithUnfinishedNativeMatch:true,hardCrash:false,sameRoom:true,status:'interrupted',exportRejected:true,firstTrace:unfinishedStop.trace,restartTrace:interruptedStop.trace};
  // Verify a result mismatch separately from unavailable-executable handling.
  const tamperWork=path.join(root,'tamper');await fs.mkdir(tamperWork);const action=await readJSON(path.join(backup,'data','rooms',match.roomId,'match.json'));action.result.score[0]++;const tamperFile=path.join(tamperWork,'match.json');await writeJSON(tamperFile,action);const rejection=await command(path.join(assets,'myelin-botstrike'),['record',path.join(tamperWork,'session'),tamperFile],{assets,work:tamperWork,expectFailure:true});assert.match(rejection.message,/Live result differs|native replay/i);report.stages.verifierMismatch={tamperedResultRejected:true};
  const rollbackData=path.join(root,'rollback-data');await copySnapshot(root,path.join(backup,'data'),rollbackData);runtime=await startRuntime({root,data:rollbackData,assets:path.join(backup,'assets'),moduleUrl:baseline.moduleUrl,provenance:{sourceRevision:ROLLBACK_COMMIT,imageId:'unknown',nativeProfile:match.proof.profile}});const rollbackRoom=(await runtime.request(match.account,'/api/state')).room;assert.equal(rollbackRoom.id,match.roomId);assert.equal(rollbackRoom.proof.verified,true);assert.deepEqual(await runtime.request(match.account,'/api/career'),match.career);await runtime.request(match.account,'/api/export');const rollbackStop=await runtime.stop();runtime=null;
  assert.deepEqual(await inventoryTree(path.join(backup,'assets')),await inventoryTree(assets));assert.deepEqual(await inventoryTree(path.join(backup,'exports')),await inventoryTree(path.join(restored,'exports')));assert.deepEqual(await exactArtifacts(originalRelease),manifest,'Release artifacts changed during operations rehearsal');assert.deepEqual(await sourceInventory(),report.stages.serviceSource,'Service source changed during operations rehearsal');
  report.stages.rollback={baselineSourceRevision:baseline.revision,sourceKind:'verified_historical_snapshot',bundle:baseline.bundle,executionContainerImage:provenance.imageId,qualityImageId:'unknown',identicalNativePair:current.sha256,restoredPrivateData:true,sameCareer:true,verifiedExportAvailable:true,otherInstancesTouched:0,otherContainersTouched:0,trace:rollbackStop.trace};report.status='passed';
 }catch(error){report.status='failed';report.failure={name:error.name,message:error.message};throw Object.assign(error,{opsReport:reportFile});}
 finally{await runtime?.terminate();report.finishedAt=new Date().toISOString();await writeJSON(reportFile,report);}
 return report;
}

if(process.argv[1]&&path.resolve(process.argv[1])===here){
 if(process.argv.includes('--runtime-child'))await runtimeChild();
 else try{assert.ok(process.argv.slice(2).every(a=>a==='--preflight'),'Usage: node tools/botstrike-quality-ops-drill.mjs [--preflight]');const result=await runOpsDrill({preflightOnly:process.argv.includes('--preflight')});console.log(JSON.stringify({status:result.status,report:path.join(result.root,'report.json'),profiles:result.stages.artifacts.profiles.length}));}
 catch(error){console.error(JSON.stringify({status:'failed',message:error.message,report:error.opsReport||null}));process.exitCode=1;}
}
