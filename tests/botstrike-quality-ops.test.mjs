import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {createHash} from 'node:crypto';
import {inventoryTree,copySnapshot,exactArtifacts,baselineSource,drainedForBackup} from '../tools/botstrike-quality-ops-drill.mjs';
async function workspace(t){const root=await fs.mkdtemp(path.join(tmpdir(),'botstrike-ops-helper-'));t.after(()=>fs.rm(root,{recursive:true,force:true}));return root;}
test('backup requires explicit private drain readiness, zero pending I/O and internally consistent zero live occupancy',()=>{
 const ready={draining:true,drainReady:true,pendingIO:0,sealingJobs:0,rooms:{finished:1,failed:1}};assert.equal(drainedForBackup(ready),true);
 for(const change of [{draining:false},{drainReady:false},{pendingIO:1},{pendingIO:undefined},{pendingIO:null},{sealingJobs:1},{rooms:undefined},{rooms:{running:1}},{rooms:{waiting:1}},{rooms:{sealing:1}},{rooms:{failed:-1}},{rooms:{finished:'0'}}])assert.equal(drainedForBackup({...ready,...change}),false,JSON.stringify(change));
 assert.equal(drainedForBackup({draining:true,rooms:{failed:1},sealingJobs:0}),false,'an older rooms-only health response cannot authorize a coherent backup');
});
test('coherent snapshot copies every regular file, preserves age, verifies bytes and rejects mutation outside its root',async t=>{
 const root=await workspace(t),source=path.join(root,'source'),copy=path.join(root,'backup');await fs.mkdir(path.join(source,'rooms'),{recursive:true});await fs.writeFile(path.join(source,'rooms','room.json'),'persisted evidence');const old=1700000000;await fs.utimes(path.join(source,'rooms','room.json'),old,old);
 const result=await copySnapshot(root,source,copy);assert.equal(result.files,1);assert.equal(result.bytes,18);assert.deepEqual(await inventoryTree(copy),await inventoryTree(source));assert.ok(Math.abs((await fs.stat(path.join(copy,'rooms','room.json'))).mtimeMs-old*1000)<1);
 await assert.rejects(copySnapshot(root,source,path.join(root,'..','outside')),/Mutation must stay below/);await assert.rejects(copySnapshot(root,source,path.join(source,'nested')),/cannot be nested/);
 await fs.writeFile(path.join(copy,'rooms','room.json'),'tampered');assert.notDeepEqual(await inventoryTree(copy),await inventoryTree(source));
});
test('backup inventory rejects links instead of copying data outside the selected source tree',async t=>{
 const root=await workspace(t),source=path.join(root,'source');await fs.mkdir(source);await fs.writeFile(path.join(root,'sentinel'),'outside source');await fs.symlink(path.join(root,'sentinel'),path.join(source,'redirect'));
 await assert.rejects(copySnapshot(root,source,path.join(root,'backup')),/symlink/);assert.equal(await fs.readFile(path.join(root,'sentinel'),'utf8'),'outside source');
});
test('artifact preflight rejects changed bytes, escaping directories, duplicate names and missing exact pairs',async t=>{
 const root=await workspace(t),release=path.join(root,'release'),legacy=path.join(release,'legacy','old');await fs.mkdir(legacy,{recursive:true});
 const entry=async(name,directory)=>{const sha256={};for(const file of ['botstrike-engine','myelin-botstrike']){const bytes=Buffer.from(name+file);await fs.writeFile(path.join(release,directory,file),bytes);sha256[file]=createHash('sha256').update(bytes).digest('hex');}return{name,directory,sha256};};
 const current=await entry('current','.'),old=await entry('old','legacy/old'),file=path.join(release,'verifiers.json'),write=entries=>fs.writeFile(file,JSON.stringify(entries));await write([current,old]);assert.equal((await exactArtifacts(release)).length,2);
 await fs.writeFile(path.join(legacy,'botstrike-engine'),'different binary');await assert.rejects(exactArtifacts(release),/Exact artifact mismatch/);await entry('old','legacy/old');
 await write([current,{...old,directory:'../outside'}]);await assert.rejects(exactArtifacts(release),/escapes/);
 await write([current,{...old,name:'current'}]);await assert.rejects(exactArtifacts(release),/Duplicate/);
 await write([current,{...old,sha256:{'botstrike-engine':old.sha256['botstrike-engine']}}]);await assert.rejects(exactArtifacts(release));
});
test('immutable rollback source includes shared transitive modules and imports without executing a service',async t=>{
 const root=await workspace(t),baseline=await baselineSource(root,'01dee05');assert.match(baseline.revision,/^[a-f0-9]{40}$/);const module=await import(baseline.moduleUrl);assert.equal(typeof module.createBotStrike,'function');assert.ok(baseline.files>8);
});
