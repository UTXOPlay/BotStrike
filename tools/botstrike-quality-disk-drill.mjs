// Owned synthetic repair clone + real bounded tmpfs ENOSPC. Never accepts a
// production URL, host data directory, SSH target, or foreign container ID.
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {fileURLToPath} from 'node:url';
const execute=promisify(execFile),here=fileURLToPath(import.meta.url),repo=path.resolve(path.dirname(here),'..');
export const DISK_ARTIFACTS_ROOT='/home/arthur/.codex/artifacts/botstrike-network-20261108';
export const DISK_PROFILE='c5a72be9466ddd4efa23aa6574541714c8112510ba7f2d7008dd0849f8a9925d';
const BASE_IMAGE='sha256:de2b4bfc2ffdcb9607d7594fc825deb5a956478d735fb1fd208c5b45ab0f5631',OWNER='io.utxoplay.disk-drill.run';
const modules=['tools/botstrike-quality-disk-drill.mjs','botstrike-service/career.mjs','botstrike-service/retention.mjs'];
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const json=async file=>JSON.parse(await fs.readFile(file,'utf8'));
const save=(file,value)=>fs.writeFile(file,JSON.stringify(value,null,2)+'\n',{mode:0o600});
const inside=(base,target)=>{const absolute=path.resolve(target);assert.ok(absolute.startsWith(path.resolve(base)+path.sep),'Path escapes owned drill root');return absolute;};
async function privateDirectory(directory){const real=await fs.realpath(directory),s=await fs.lstat(directory);assert.equal(real,path.resolve(directory),'Owned directories cannot redirect');assert.ok(s.isDirectory()&&!s.isSymbolicLink()&&s.uid===process.getuid()&&(s.mode&0o777)===0o700,'Owned mode-0700 directory required');return real;}
async function regular(file,maxBytes=64*1024**2){const s=await fs.lstat(file);assert.ok(s.isFile()&&!s.isSymbolicLink()&&s.size<=maxBytes,'Bounded regular file required: '+file);return fs.readFile(file);}
async function inventory(directory){const rows=[];async function walk(base,relative=''){for(const entry of(await fs.readdir(base,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){const file=path.join(base,entry.name),name=path.join(relative,entry.name);assert.ok(!entry.isSymbolicLink(),'Source contains a symlink');if(entry.isDirectory())await walk(file,name);else{const bytes=await regular(file);rows.push({file:name,bytes:bytes.length,sha256:hash(bytes)});assert.ok(rows.length<=2048&&rows.reduce((n,r)=>n+r.bytes,0)<=512*1024**2,'Source inventory exceeds drill bound');}}}await walk(directory);return rows;}
async function sourceHashes(base){return Object.fromEntries(await Promise.all(modules.map(async file=>[file,hash(await regular(path.join(base,file)))])));}

export async function inspectOpsSource(sourceRoot,{sourceBase}={}){
 assert.ok(typeof sourceRoot==='string'&&path.isAbsolute(sourceRoot)&&!sourceRoot.includes('://'),'Only an owned local ops root is accepted');
 let base='/tmp';
 if(sourceBase!==undefined){assert.ok(typeof sourceBase==='string'&&path.isAbsolute(sourceBase)&&!sourceBase.includes('://'),'An explicit owned local source base is required');base=await privateDirectory(sourceBase);}
 const root=await privateDirectory(sourceRoot);assert.ok(path.dirname(root)===base&&/^botstrike-quality-ops-[A-Za-z0-9]+$/.test(path.basename(root)),'Only direct disposable ops roots below the authorized source base are accepted');
 // The original ops tool created its marker with default file permissions;
 // its enclosing owned 0700 directory supplies the privacy boundary.
 const marker=path.join(root,'.ops-drill-owner'),m=await fs.lstat(marker);assert.equal(m.uid,process.getuid(),'Ops owner marker must belong to this user');assert.equal((await regular(marker,128)).length,32,'Ops owner marker required');
 const report=JSON.parse(await regular(path.join(root,'report.json'),2*1024**2)),match=report.stages?.activeMatch;
 assert.equal(report.root,root);assert.equal(report.status,'passed','A completed successful synthetic ops source is required');assert.equal(report.isolation?.onlyDisposableData,true);assert.equal(report.isolation?.productionAccess,false);assert.equal(match?.humanParticipants,0);assert.equal(match.source,'two_automated_active_clients_eight_native_bots');assert.match(match.roomId,/^[a-f0-9]{24}$/);
 assert.equal(match.data,path.join(root,'live-data'),'Report must bind its own live-data');assert.equal(match.proof?.verified,true);assert.equal(match.proof.profile,DISK_PROFILE,'Use the recorded exact current profile');
 const data=inside(root,match.data),roomDirectory=path.join(data,'rooms',match.roomId);assert.equal(await fs.realpath(data),data);assert.equal(await fs.realpath(roomDirectory),roomDirectory);
 const room=JSON.parse(await regular(path.join(roomDirectory,'room.json')));assert.equal(room.id,match.roomId);assert.equal(room.status,'finished');assert.equal(room.proof?.verified,true);assert.equal(room.proof.profile,DISK_PROFILE);assert.notEqual(room.config?.mode,'practice');assert.notEqual(room.config?.ruleset,'tactical');assert.equal(room.careerCommitted,true);
 const exported=await regular(path.join(root,'exports','current.json'));assert.equal(hash(exported),match.exportSha256,'Recorded export hash mismatch');assert.deepEqual(JSON.parse(exported),JSON.parse(await regular(path.join(roomDirectory,'export.json'))),'Room and recorded exports differ');
 const manifest=JSON.parse(await regular(path.join(root,'assets','verifiers.json'))),current=manifest.find(entry=>entry.directory==='.');assert.ok(current);const recorded=report.stages.artifacts.profiles.find(entry=>entry.name===current.name);assert.deepEqual(current.sha256,recorded?.sha256);
 for(const name of ['botstrike-engine','myelin-botstrike'])assert.match(current.sha256[name],/^[a-f0-9]{64}$/);
 const expected={};for(const [id,p]of Object.entries(room.participants||{}))if(p.ticks>0){assert.match(id,/^[a-f0-9]{64}$/);const ledger=JSON.parse(await regular(path.join(data,'careers',id+'.json')));assert.equal(ledger.version,1);assert.equal(ledger.matches,1);assert.deepEqual(ledger.applied,{[room.id]:true});expected[id]=ledger;}
 assert.ok(Object.keys(expected).length>0&&Object.keys(expected).length<=10,'Attributed synthetic career source required');
 return{root,data,sourceAuthorization:{kind:sourceBase===undefined?'legacy_tmp':'explicit_owned_base',base},roomId:room.id,profile:DISK_PROFILE,expectedPair:current.sha256,expectedCareers:expected,sourceInventory:await inventory(data),exportSha256:hash(exported)};
}

export function parseDiskDrillArguments(args){
 assert.ok(Array.isArray(args),'Disk drill arguments must be an array');const result={},seen=new Set();
 for(let i=0;i<args.length;i++){
  const flag=args[i];assert.ok(['--preflight','--prototype','--source-base','--source-root'].includes(flag),'Unsupported disk drill argument');assert.ok(!seen.has(flag),'Duplicate disk drill argument');seen.add(flag);
  if(flag==='--preflight')result.preflightOnly=true;
  else if(flag==='--prototype')result.devSource=repo;
  else{const value=args[++i];assert.ok(typeof value==='string'&&path.isAbsolute(value)&&!value.includes('://'),'Source paths must be absolute local paths');result[flag==='--source-base'?'sourceBase':'sourceRoot']=value;}
 }
 assert.equal(seen.has('--source-base'),seen.has('--source-root'),'--source-base and --source-root must be supplied together');return result;
}

export function diskContainerArguments({runId,dataDir,applicationImageId,devSource=null}){
 assert.match(runId,/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/);assert.match(applicationImageId,/^sha256:[a-f0-9]{64}$/);assert.equal(path.resolve(dataDir),dataDir);assert.match(path.relative(DISK_ARTIFACTS_ROOT,dataDir),/^disk-drill-[A-Za-z0-9]+\/data$/);
 const args=['create','--label',OWNER+'='+runId,'--network','none','--read-only','--security-opt','no-new-privileges','--cap-drop','ALL','--user','1000:1000','--cpus','2','--memory','4g','--pids-limit','128','--tmpfs','/tmp:rw,nosuid,nodev,size=128m,uid=1000,gid=1000,mode=1777','--tmpfs','/app/data/careers:rw,nosuid,nodev,noexec,size=64k,uid=1000,gid=1000,mode=700','--mount','type=bind,src='+dataDir+',dst=/app/data'];
 if(devSource!==null){assert.equal(path.resolve(devSource),repo,'Prototype source must be this checkout');for(const name of ['botstrike-service','tools'])args.push('--mount','type=bind,src='+path.join(devSource,name)+',dst=/app/'+name+',readonly');}
 return[...args,'--env','BOTSTRIKE_DISK_DRILL_RUN='+runId,'--env','TMPDIR=/tmp','--entrypoint','node',applicationImageId,'/app/tools/botstrike-quality-disk-drill.mjs','--container-worker'];
}
const serializeRecovery=value=>({...value,protectedRooms:[...value.protectedRooms]});
async function signedHashes(data,roomId){const rows={};for(const name of ['tape.jsonl','export.json','match.json'])rows[name]=hash(await regular(path.join(data,'rooms',roomId,name)));return rows;}
async function containerWorker(){
 const data='/app/data',runId=process.env.BOTSTRIKE_DISK_DRILL_RUN;assert.match(runId||'',/^[a-f0-9-]{36}$/);await privateDirectory(data);assert.equal((await regular(path.join(data,'.disk-drill-owner'),128)).toString(),runId);assert.equal(process.getuid(),1000);
 const status=await fs.readFile('/proc/self/status','utf8');assert.match(status,/CapEff:\s+0+\s/);assert.match(status,/NoNewPrivs:\s+1\s/);
 const plan=await json(path.join(data,'drill-plan.json'));assert.equal(plan.runId,runId);assert.equal(plan.syntheticRepairClone,true);assert.equal(plan.profile,DISK_PROFILE);
 const careerDirectory=path.join(data,'careers'),mount=(await fs.readFile('/proc/self/mountinfo','utf8')).split('\n').find(line=>line.split(' ')[4]===careerDirectory);assert.ok(mount&&mount.includes(' - tmpfs '),'Career aggregate must be the dedicated actual tmpfs mount');
 const disk=await fs.statfs(careerDirectory);assert.equal(disk.type,0x01021994);assert.ok(disk.blocks*disk.bsize<=65536&&disk.blocks*disk.bsize>=4096,'Expected at most 64KiB tmpfs');assert.equal((await fs.stat(careerDirectory)).mode&0o777,0o700);assert.deepEqual(await fs.readdir(careerDirectory),[]);
 const report={schemaVersion:1,status:'running',syntheticRepairClone:true,scope:'Real 64KiB career tmpfs exhaustion only; not whole-host disk full, inode exhaustion, power loss, production data, or new gameplay verification.',runId,sourceHashes:await sourceHashes('/app'),kernel:{mount,statfs:disk,uid:process.getuid(),capEff:'0',noNewPrivileges:true},stages:{}};
 const evidence=path.join(data,'evidence');await fs.mkdir(evidence,{recursive:true,mode:0o700});
 try{
  const pair={};for(const name of ['botstrike-engine','myelin-botstrike'])pair[name]=hash(await regular('/app/release/'+name));assert.deepEqual(pair,plan.expectedPair,'Image engine/verifier differ from the recorded original pair');report.stages.exactPair={profile:DISK_PROFILE,sha256:pair};
  const verified=await execute('/app/release/myelin-botstrike',['verify',path.join(data,'current-signed-export.json')],{cwd:'/app',env:{...process.env,BOTSTRIKE_ASSETS:'/app/release'},timeout:300000,maxBuffer:8*1024**2});await fs.writeFile(path.join(evidence,'exact-verify-stdout.json'),verified.stdout,{mode:0o600});await fs.writeFile(path.join(evidence,'exact-verify-stderr.log'),verified.stderr,{mode:0o600});const result=JSON.parse(verified.stdout);assert.equal(result.verified,true);report.stages.signedExportVerification={verified:true,frames:result.frames,authority:result.authority,exportSha256:hash(await regular(path.join(data,'current-signed-export.json'))),stdout:'evidence/exact-verify-stdout.json',stderr:'evidence/exact-verify-stderr.log'};
  const before=await signedHashes(data,plan.roomId),filler=path.join(careerDirectory,'.drill-filler');let filledBytes=0,observedError=null,handle=await fs.open(filler,'wx',0o600);
  try{for(let attempt=0;attempt<64;attempt++){try{const wrote=await handle.write(Buffer.alloc(4096,0xa5));assert.ok(wrote.bytesWritten>0);filledBytes+=wrote.bytesWritten;}catch(error){observedError=error.code;break;}}}finally{await handle.close();}
  assert.equal(observedError,'ENOSPC','Filler must observe actual kernel ENOSPC');assert.ok(filledBytes>0&&filledBytes<=65536);report.stages.full={errorCode:observedError,filledBytes,statfs:await fs.statfs(careerDirectory),ioInjection:false};
  const {CareerStore}=await import('../botstrike-service/career.mjs'),{pruneReplays}=await import('../botstrike-service/retention.mjs'),alerts=[],store=new CareerStore(data,{onAlert:alert=>alerts.push(alert)});
  const failed=await store.recover();assert.equal(failed.complete,false);assert.equal(failed.recovered,0);assert.ok(failed.protectedRooms.has(plan.roomId));assert.ok(alerts.some(alert=>alert.code==='ENOSPC'));assert.equal((await json(path.join(data,'rooms',plan.roomId,'room.json'))).careerCommitted,false);
  const future=Date.now()+40*86400000,retentionAlerts=[],removed=await pruneReplays(data,{now:future,protectedRooms:failed.protectedRooms,onAlert:alert=>retentionAlerts.push(alert)});assert.deepEqual(removed,[]);assert.deepEqual(await signedHashes(data,plan.roomId),before);report.stages.failedRecovery={...serializeRecovery(failed),alerts,retentionAlerts,sourceProtectedAtFortyDays:true,signedHashes:before};
  await fs.unlink(filler);const recovered=await store.recover();assert.equal(recovered.complete,true);assert.equal(recovered.recovered,1);assert.equal(recovered.protectedRooms.size,0);for(const [id,expected]of Object.entries(plan.expectedCareers))assert.deepEqual(await store.read(id),expected);
  const repeated=await new CareerStore(data).recover();assert.equal(repeated.complete,true);assert.equal(repeated.recovered,0);for(const [id,expected]of Object.entries(plan.expectedCareers))assert.deepEqual(await new CareerStore(data).read(id),expected);assert.deepEqual(await signedHashes(data,plan.roomId),before);report.stages.recovery={releasedFiller:true,statfs:await fs.statfs(careerDirectory),first:serializeRecovery(recovered),repeated:serializeRecovery(repeated),exactlyOnce:true,signedHashesUnchanged:true};
  const expired=await pruneReplays(data,{now:future,protectedRooms:repeated.protectedRooms,onAlert:alert=>retentionAlerts.push(alert)});assert.deepEqual(expired,[plan.roomId]);for(const [id,expected]of Object.entries(plan.expectedCareers))assert.deepEqual(await new CareerStore(data).read(id),expected);
  await fs.cp(careerDirectory,path.join(evidence,'recovered-careers'),{recursive:true,errorOnExist:true,force:false});report.stages.expiry={removed:expired,careerSurvives:true,ledgerEvidence:await inventory(path.join(evidence,'recovered-careers')),ephemeralTmpfsLedgerCopiedBeforeContainerExit:true};report.status='passed';
 }catch(error){report.status='failed';report.failure={name:error.name,message:error.message};throw error;}
 finally{await save(path.join(evidence,'disk-worker.json'),report);}
}

export async function runDiskDrill(options={}){
 assert.ok(options&&typeof options==='object'&&!Array.isArray(options)&&Object.keys(options).every(key=>['sourceRoot','sourceBase','applicationImage','devSource','preflightOnly'].includes(key)),'Unsupported disk drill option');
 const {sourceRoot='/tmp/botstrike-quality-ops-xoAg8l',sourceBase,applicationImage=BASE_IMAGE,devSource=null,preflightOnly=false}=options;assert.equal(typeof preflightOnly,'boolean');assert.ok(sourceBase===undefined||typeof options.sourceRoot==='string','An explicit source base requires its explicit source root');assert.ok(typeof applicationImage==='string'&&/^[A-Za-z0-9][A-Za-z0-9._/:@-]{1,200}$/.test(applicationImage)&&!applicationImage.includes('://'),'Local application image reference required');
 if(devSource!==null)assert.equal(await fs.realpath(devSource),repo,'Only this read-only development checkout is supported');
 const source=await inspectOpsSource(sourceRoot,{sourceBase});await fs.mkdir(DISK_ARTIFACTS_ROOT,{recursive:true,mode:0o700});await privateDirectory(DISK_ARTIFACTS_ROOT);
 const root=await fs.mkdtemp(path.join(DISK_ARTIFACTS_ROOT,'disk-drill-'));await fs.chmod(root,0o700);const runId=randomUUID(),data=path.join(root,'data'),reportFile=path.join(root,'report.json');await fs.writeFile(path.join(root,'.ops-drill-owner'),runId,{mode:0o600});
 const report={schemaVersion:1,status:'preparing',runId,root,startedAt:new Date().toISOString(),syntheticRepairClone:true,developmentBind:devSource!==null,immutableImageAcceptance:false,limitations:['Only the synthetic career aggregate tmpfs is exhausted; no whole-host disk-full, power-loss, production-save, or public network acceptance is claimed.','The source signed export is reverified on its recorded exact original pair; no rules or signed bytes are reinterpreted.','The tmpfs is ephemeral; its recovered ledger is copied to owned evidence before shutdown and cold-copied into the clone after unmount.'],source:{root:source.root,authorization:source.sourceAuthorization,roomId:source.roomId,profile:source.profile,exportSha256:source.exportSha256},commands:[]};let id;
 async function docker(args,timeout=30000){report.commands.push(args);let result;try{result=await execute('docker',args,{encoding:'utf8',timeout,maxBuffer:8*1024**2});}catch(error){if(args[0]==='start'){await fs.writeFile(path.join(root,'container-stdout.log'),String(error.stdout||''),{mode:0o600});await fs.writeFile(path.join(root,'container-stderr.log'),String(error.stderr||''),{mode:0o600});}throw error;}if(args[0]==='start'){await fs.writeFile(path.join(root,'container-stdout.log'),result.stdout,{mode:0o600});await fs.writeFile(path.join(root,'container-stderr.log'),result.stderr,{mode:0o600});report.containerCapture={stdout:'container-stdout.log',stderr:'container-stderr.log',complete:true};}return result.stdout.trim();}
 try{
  const image=JSON.parse(await docker(['image','inspect',applicationImage]))[0];report.image={reference:applicationImage,id:image.Id,sourceRevision:image.Config.Labels?.['org.opencontainers.image.revision']??null};
  await fs.cp(source.data,data,{recursive:true,preserveTimestamps:true,errorOnExist:true,force:false});await fs.chmod(data,0o700);await fs.rm(path.join(data,'careers'),{recursive:true});await fs.mkdir(path.join(data,'careers'),{mode:0o700});
  const roomFile=path.join(data,'rooms',source.roomId,'room.json'),metadata=await json(roomFile);metadata.careerCommitted=false;await save(roomFile,metadata);await fs.writeFile(path.join(data,'.disk-drill-owner'),runId,{mode:0o600});
  await fs.copyFile(path.join(source.root,'exports','current.json'),path.join(data,'current-signed-export.json'));await fs.mkdir(path.join(data,'evidence'),{mode:0o700});for(const name of ['tape.jsonl','export.json'])await fs.copyFile(path.join(data,'rooms',source.roomId,name),path.join(data,'evidence','original-'+name));
  const boundSources=await sourceHashes(repo);await save(path.join(data,'drill-plan.json'),{runId,syntheticRepairClone:true,roomId:source.roomId,profile:source.profile,expectedPair:source.expectedPair,expectedCareers:source.expectedCareers});report.sourceHashes=boundSources;
  const args=diskContainerArguments({runId,dataDir:data,applicationImageId:image.Id,devSource});report.containerArguments=args;
  if(preflightOnly){report.status='preflight_only';return{root,reportFile,report};}
  id=await docker(args);assert.match(id,/^[a-f0-9]{64}$/);report.containerId=id;await save(reportFile,report);
  const actual=JSON.parse(await docker(['container','inspect',id]))[0];assert.equal(actual.Config.Labels?.[OWNER],runId);assert.equal(actual.HostConfig.NetworkMode,'none');assert.equal(actual.HostConfig.ReadonlyRootfs,true);assert.deepEqual(actual.HostConfig.CapDrop,['ALL']);assert.equal(actual.Config.User,'1000:1000');assert.ok(actual.HostConfig.SecurityOpt.includes('no-new-privileges'));report.sandbox={network:'none',readOnlyRoot:true,capDrop:['ALL'],user:'1000:1000',memoryBytes:actual.HostConfig.Memory,pidsLimit:actual.HostConfig.PidsLimit,tmpfs:actual.HostConfig.Tmpfs};
  await docker(['start','--attach',id],360000);const ended=JSON.parse(await docker(['container','inspect',id]))[0];assert.equal(ended.State.ExitCode,0,'Disk worker exited unsuccessfully');
  const worker=await json(path.join(data,'evidence','disk-worker.json'));assert.equal(worker.status,'passed');assert.deepEqual(worker.sourceHashes,boundSources,'Worker code differs from the recorded source');assert.equal(worker.stages.signedExportVerification.exportSha256,source.exportSha256);report.worker=worker;
  await docker(['rm',id]);id=null;assert.deepEqual(await fs.readdir(path.join(data,'careers')),[],'Only the empty unmounted clone aggregate may be restored');await fs.rmdir(path.join(data,'careers'));await fs.cp(path.join(data,'evidence','recovered-careers'),path.join(data,'careers'),{recursive:true,errorOnExist:true,force:false});assert.deepEqual(await inventory(path.join(data,'careers')),worker.stages.expiry.ledgerEvidence);report.coldLedgerRestored=true;report.immutableImageAcceptance=devSource===null;report.status='passed';
 }catch(error){report.status='failed';report.failure={name:error.name,message:error.message,stderr:String(error.stderr||'').slice(0,2000)};throw Object.assign(error,{diskReport:reportFile});}
 finally{
  if(id)try{const owned=JSON.parse(await docker(['container','inspect',id]))[0];assert.equal(owned.Config.Labels?.[OWNER],runId,'Refuse to remove a foreign container');await docker(['rm','-f',id]);}catch(error){report.cleanupFailure=error.message;report.status='failed';}
  try{assert.deepEqual(await inventory(source.data),source.sourceInventory,'Original source data changed');assert.equal(hash(await regular(path.join(source.root,'exports','current.json'))),source.exportSha256);report.originalSourceUnchanged=true;}catch(error){report.status='failed';report.sourceIntegrityFailure=error.message;}
  if(report.status!=='passed')report.immutableImageAcceptance=false;report.finishedAt=new Date().toISOString();await save(reportFile,report);
 }
 return{root,reportFile,report};
}
if(process.argv[1]&&path.resolve(process.argv[1])===here){
 if(process.argv[2]==='--container-worker')await containerWorker();
 else try{const result=await runDiskDrill({applicationImage:process.env.BOTSTRIKE_DISK_APPLICATION_IMAGE||BASE_IMAGE,...parseDiskDrillArguments(process.argv.slice(2))});console.log(JSON.stringify({status:result.report.status,immutableImageAcceptance:result.report.immutableImageAcceptance,report:result.reportFile}));if(result.report.status==='failed')process.exitCode=1;}
 catch(error){console.error(JSON.stringify({status:'failed',message:error.message,report:error.diskReport||null}));process.exitCode=1;}
}
