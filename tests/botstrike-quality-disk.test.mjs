// Source/sandbox guards only. No Docker container, engine or verifier is run.
import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {createHash,randomUUID} from 'node:crypto';
import {inspectOpsSource,parseDiskDrillArguments,diskContainerArguments,runDiskDrill,DISK_ARTIFACTS_ROOT,DISK_PROFILE} from '../tools/botstrike-quality-disk-drill.mjs';
const write=(file,value)=>fs.writeFile(file,JSON.stringify(value),{mode:0o600});
async function fixture(t,base='/tmp'){
 const root=await fs.mkdtemp(path.join(base,'botstrike-quality-ops-'));t.after(()=>fs.rm(root,{recursive:true,force:true}));await fs.chmod(root,0o700);
 const roomId='a'.repeat(24),account='1'.padStart(64,'0'),data=path.join(root,'live-data');for(const directory of ['assets','exports','live-data/rooms/'+roomId,'live-data/careers','live-data/accounts'])await fs.mkdir(path.join(root,directory),{recursive:true,mode:0o700});
 const exported={application:'myelin-botstrike',fixture:'guard-only-not-a-signed-export'},bytes=JSON.stringify(exported),sha256={'botstrike-engine':'b'.repeat(64),'myelin-botstrike':'c'.repeat(64)},proof={verified:true,profile:DISK_PROFILE};
 await fs.writeFile(path.join(root,'.ops-drill-owner'),Buffer.alloc(32,1),{mode:0o600});await fs.writeFile(path.join(root,'exports/current.json'),bytes,{mode:0o600});await fs.writeFile(path.join(data,'rooms',roomId,'export.json'),bytes,{mode:0o600});await fs.writeFile(path.join(data,'rooms',roomId,'tape.jsonl'),'guard fixture',{mode:0o600});
 await write(path.join(data,'rooms',roomId,'room.json'),{id:roomId,status:'finished',config:{mode:'deathmatch'},proof,careerCommitted:true,participants:{[account]:{ticks:1}}});await write(path.join(data,'careers',account+'.json'),{version:1,matches:1,applied:{[roomId]:true}});await write(path.join(root,'assets/verifiers.json'),[{directory:'.',name:'tactical-v5',sha256}]);
 const report={root,status:'passed',isolation:{onlyDisposableData:true,productionAccess:false},stages:{activeMatch:{data,roomId,humanParticipants:0,source:'two_automated_active_clients_eight_native_bots',proof,exportSha256:createHash('sha256').update(bytes).digest('hex')},artifacts:{profiles:[{name:'tactical-v5',sha256}]}}};await write(path.join(root,'report.json'),report);return{root,data,report,roomId};
}
test('owned passed synthetic ops input binds its original export, attribution and exact profile without invoking verification',async t=>{
 const f=await fixture(t),source=await inspectOpsSource(f.root);assert.equal(source.root,f.root);assert.equal(source.profile,DISK_PROFILE);assert.equal(source.roomId,f.roomId);assert.equal(source.expectedPair['botstrike-engine'],'b'.repeat(64));assert.equal(Object.keys(source.expectedCareers).length,1);assert.ok(source.sourceInventory.every(row=>/^[a-f0-9]{64}$/.test(row.sha256)));
 assert.deepEqual(source.sourceAuthorization,{kind:'legacy_tmp',base:'/tmp'});
});
test('an explicit owned private base permits only its direct ops child and retains original report/export guards',async t=>{
 const base=await fs.mkdtemp(path.join(tmpdir(),'disk-source-base-'));t.after(()=>fs.rm(base,{recursive:true,force:true}));await fs.chmod(base,0o700);const f=await fixture(t,base);
 await assert.rejects(inspectOpsSource(f.root),/authorized source base/);const source=await inspectOpsSource(f.root,{sourceBase:base});assert.deepEqual(source.sourceAuthorization,{kind:'explicit_owned_base',base});assert.equal(source.exportSha256,f.report.stages.activeMatch.exportSha256);
 await fs.chmod(base,0o755);await assert.rejects(inspectOpsSource(f.root,{sourceBase:base}),/mode-0700/);await fs.chmod(base,0o500);await assert.rejects(inspectOpsSource(f.root,{sourceBase:base}),/mode-0700/);await fs.chmod(base,0o700);
 const nested=path.join(base,'nested');await fs.mkdir(nested,{mode:0o700});const deeper=await fixture(t,nested);await assert.rejects(inspectOpsSource(deeper.root,{sourceBase:base}),/direct disposable ops/);
 const unrelated=await fixture(t);await assert.rejects(inspectOpsSource(unrelated.root,{sourceBase:base}),/authorized source base/);
 const alias=path.join(base,'base-alias');await fs.symlink(base,alias);await assert.rejects(inspectOpsSource(f.root,{sourceBase:alias}),/cannot redirect/);const rootAlias=path.join(base,'botstrike-quality-ops-alias');await fs.symlink(f.root,rootAlias);await assert.rejects(inspectOpsSource(rootAlias,{sourceBase:base}),/cannot redirect/);
 f.report.root=path.join('/tmp',path.basename(f.root));await write(path.join(f.root,'report.json'),f.report);await assert.rejects(inspectOpsSource(f.root,{sourceBase:base}));f.report.root=f.root;f.report.stages.activeMatch.data=path.join('/tmp',path.basename(f.root),'live-data');await write(path.join(f.root,'report.json'),f.report);await assert.rejects(inspectOpsSource(f.root,{sourceBase:base}),/bind its own live-data/);
 await assert.rejects(inspectOpsSource(f.root,{sourceBase:'ssh://host/tmp'}),/explicit owned local/);
});
test('CLI source authorization requires both absolute local paths, rejects duplicates and never widens by default',()=>{
 assert.deepEqual(parseDiskDrillArguments([]),{});assert.deepEqual(parseDiskDrillArguments(['--preflight','--source-base','/owned/base','--source-root','/owned/base/botstrike-quality-ops-abc']),{preflightOnly:true,sourceBase:'/owned/base',sourceRoot:'/owned/base/botstrike-quality-ops-abc'});
 for(const args of [['--source-root','/tmp/botstrike-quality-ops-a'],['--source-base','/owned/base'],['--source-base'],['--source-root','relative'],['--source-base','ssh://host/tmp'],['--preflight','--preflight'],['--source-base','/owned','--source-root','/owned/botstrike-quality-ops-a','--source-root','/owned/botstrike-quality-ops-b'],['--output','/other']])assert.throws(()=>parseDiskDrillArguments(args));
});
test('source guards reject missing/private-owner violations, failed reports, signed-byte changes, foreign profiles and redirecting files',async t=>{
 const f=await fixture(t),marker=path.join(f.root,'.ops-drill-owner');await fs.unlink(marker);await assert.rejects(inspectOpsSource(f.root));await fs.writeFile(marker,Buffer.alloc(31),{mode:0o644});await assert.rejects(inspectOpsSource(f.root),/Ops owner marker required/);await fs.writeFile(marker,Buffer.alloc(32));await fs.chmod(f.root,0o755);await assert.rejects(inspectOpsSource(f.root),/mode-0700/);await fs.chmod(f.root,0o700);
 f.report.status='failed';await write(path.join(f.root,'report.json'),f.report);await assert.rejects(inspectOpsSource(f.root),/successful synthetic/);f.report.status='passed';f.report.stages.activeMatch.proof.profile='d'.repeat(64);await write(path.join(f.root,'report.json'),f.report);await assert.rejects(inspectOpsSource(f.root),/exact current profile/);f.report.stages.activeMatch.proof.profile=DISK_PROFILE;await write(path.join(f.root,'report.json'),f.report);
 const exported=path.join(f.root,'exports/current.json'),before=await fs.readFile(exported);await fs.appendFile(exported,' ');await assert.rejects(inspectOpsSource(f.root),/export hash mismatch/);await fs.writeFile(exported,before);
 await fs.symlink('/etc/passwd',path.join(f.data,'unexpected-link'));await assert.rejects(inspectOpsSource(f.root),/symlink/);
 await assert.rejects(inspectOpsSource('https://production.example/data'),/owned local ops root/);const foreign=path.join(f.root,'non-ops-root');await fs.mkdir(foreign,{mode:0o700});await assert.rejects(inspectOpsSource(foreign),/disposable ops roots/);
});
test('container arguments enforce exact owned clone, nonroot bounded tmpfs and no network/capabilities/root writes',()=>{
 const runId=randomUUID(),dataDir=DISK_ARTIFACTS_ROOT+'/disk-drill-abc123/data',applicationImageId='sha256:'+'a'.repeat(64),args=diskContainerArguments({runId,dataDir,applicationImageId});
 const value=flag=>args[args.indexOf(flag)+1];assert.equal(value('--network'),'none');assert.equal(value('--cap-drop'),'ALL');assert.equal(value('--user'),'1000:1000');assert.ok(args.includes('--read-only'));assert.equal(value('--memory'),'4g');assert.equal(value('--pids-limit'),'128');assert.ok(args.includes('/app/data/careers:rw,nosuid,nodev,noexec,size=64k,uid=1000,gid=1000,mode=700'));assert.ok(args.includes('--security-opt'));assert.ok(args.includes('no-new-privileges'));assert.ok(!args.includes('--privileged'));assert.ok(!args.includes('--publish'));assert.ok(!args.some(value=>value.includes('/var/run/docker.sock')));
 for(const unsafe of ['/app/data',DISK_ARTIFACTS_ROOT+'/../production/data',DISK_ARTIFACTS_ROOT+'/disk-drill-a/../production/data',DISK_ARTIFACTS_ROOT.replace('.codex','Xcodex')+'/disk-drill-a/data'])assert.throws(()=>diskContainerArguments({runId,dataDir:unsafe,applicationImageId}));
 assert.throws(()=>diskContainerArguments({runId,dataDir,applicationImageId,devSource:'/tmp/foreign'}),/this checkout/);assert.throws(()=>diskContainerArguments({runId,dataDir,applicationImageId:'registry.example/remote:latest'}));
});
test('the API rejects arbitrary output roots, URLs, SSH and external-data option surfaces before execution',async()=>{
 for(const option of [{url:'https://example.com'},{ssh:'host'},{data:'/srv/production'},{artifactsRoot:'/tmp/elsewhere'},{sourceRoot:'ssh://host/data'},{sourceBase:'/owned/base'},{applicationImage:'https://registry.example/image'}])await assert.rejects(runDiskDrill(option));
});
