import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {createHash} from 'node:crypto';
import {inventoryTree,copySnapshot,exactArtifacts,baselineSource,drainedForBackup,createPilotInputProof} from '../tools/botstrike-quality-ops-drill.mjs';
async function workspace(t){const root=await fs.mkdtemp(path.join(tmpdir(),'botstrike-ops-helper-'));t.after(()=>fs.rm(root,{recursive:true,force:true}));return root;}
const pilotRoom='a'.repeat(24),pilotDelivery={version:2,nonce:'d'.repeat(32)};
const pilotControl=(token='owner-a')=>({type:'control',active:true,token,inputProtocol:{version:2,maxAgeMs:400}});
const pilotState=(tick,lastSeq,inputAck=null,life=1,room=pilotRoom)=>({type:'state',room:{id:room,slot:0,state:{tick,players:[{life,last_seq:lastSeq}]}},delivery:pilotDelivery,inputAck});
const pilotInput=(seq,extra={})=>({type:'input',room:pilotRoom,delivery:pilotDelivery,input:{seq,x:0,y:0,...extra}});
const pilotAck=(seq,tick,life=1,neutral=true)=>({version:1,seq,tick,life,neutral});
test('pilot progress requires canonical explicit ACK of an exact known-sent input; AI scalar collisions do not advance it',()=>{
 const proof=createPilotInputProof(pilotRoom);proof.receive(pilotControl());proof.receive(pilotState(10,0));assert.equal(proof.sent(pilotInput(3)),true);
 assert.equal(proof.receive(pilotState(11,3)),null);assert.equal(proof.highestAck,0,'Native/AI last_seq is only diagnostic');assert.equal(proof.lastNativeSeq,3);
 assert.equal(proof.receive(pilotState(12,4,pilotAck(4,12))),null,'a greater but unsent sequence is not proof');assert.equal(proof.highestAck,0);
 assert.equal(proof.receive(pilotState(12,3,{...pilotAck(3,11),generation:1})),null,'noncanonical wire shape is rejected');
 assert.deepEqual(proof.receive(pilotState(12,3,pilotAck(3,11))),pilotAck(3,11));assert.equal(proof.highestAck,3);assert.equal(proof.verifiedAckCount,1);
 proof.receive(pilotState(13,3,pilotAck(3,11)));assert.equal(proof.verifiedAckCount,1,'repeated cached ACK does not create progress');
});
test('pilot gate permits a later coalesced exact input while bounding the known-sent map at 256',()=>{
 const proof=createPilotInputProof(pilotRoom);proof.receive(pilotControl());proof.receive(pilotState(10,0));proof.sent(pilotInput(1));proof.sent(pilotInput(2));assert.deepEqual(proof.receive(pilotState(12,2,pilotAck(2,11))),pilotAck(2,11));assert.equal(proof.highestAck,2);
 proof.receive({type:'input_resync'});proof.receive(pilotState(20,2));for(let seq=3;seq<=259;seq++)assert.equal(proof.sent(pilotInput(seq)),true);assert.equal(proof.pending,256);
 assert.equal(proof.receive(pilotState(21,3,pilotAck(3,21))),null,'evicted sent entries cannot authorize progress');assert.equal(proof.highestAck,0);
 assert.deepEqual(proof.receive(pilotState(22,259,pilotAck(259,22))),pilotAck(259,22));assert.equal(proof.highestAck,259);
});
test('owner, room, life, resync and close immediately revoke pilot proof and old pending inputs',()=>{
 for(const boundary of ['owner','room','life','resync','close']){
  const proof=createPilotInputProof(pilotRoom);proof.receive(pilotControl());proof.receive(pilotState(10,0));proof.sent(pilotInput(3));proof.receive(pilotState(11,3,pilotAck(3,11)));proof.sent(pilotInput(4));
  if(boundary==='owner')proof.receive(pilotControl('owner-b'));else if(boundary==='room')proof.receive(pilotState(12,3,null,1,'b'.repeat(24)));else if(boundary==='life')proof.receive(pilotState(12,3,null,2));else if(boundary==='resync')proof.receive({type:'input_resync'});else proof.close();
  assert.equal(proof.highestAck,0,boundary);assert.equal(proof.pending,0,boundary);assert.equal(proof.receive(pilotState(13,4,pilotAck(4,13))),null,boundary);assert.equal(proof.highestAck,0,boundary);
 }
});
test('pilot ACK must follow its send-time Native tick, match snapshot life/last_seq, and cannot claim action input neutral',()=>{
 const proof=createPilotInputProof(pilotRoom);proof.receive(pilotControl());proof.receive(pilotState(30,0));proof.sent(pilotInput(5,{fire:true}));
 for(const [snapshotTick,lastSeq,ack]of [[31,5,pilotAck(5,29,1,false)],[31,5,pilotAck(5,30,1,false)],[30,5,pilotAck(5,31,1,false)],[31,6,pilotAck(5,31,1,false)],[31,5,pilotAck(5,31,2,false)],[31,5,pilotAck(5,31,1,true)]])assert.equal(proof.receive(pilotState(snapshotTick,lastSeq,ack)),null);
 assert.equal(proof.highestAck,0);assert.deepEqual(proof.receive(pilotState(32,5,pilotAck(5,31,1,false))),pilotAck(5,31,1,false));assert.equal(proof.highestAck,5);
 const unsupported=createPilotInputProof(pilotRoom);unsupported.receive({...pilotControl(),inputProtocol:{version:1,maxAgeMs:400}});unsupported.receive(pilotState(30,0));assert.equal(unsupported.sent(pilotInput(6)),false);assert.equal(unsupported.receive(pilotState(31,6,pilotAck(6,31))),null);
});
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
