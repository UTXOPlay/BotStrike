import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {createNetworkCapture,networkCaptureLimit} from '../tools/start-network-runtime.mjs';
async function fixture(){const data=await fs.mkdtemp(path.join(tmpdir(),'botstrike-private-capture-')),directory=path.join(data,'network-diagnostics');await fs.mkdir(directory,{mode:0o700});await fs.writeFile(path.join(directory,'.network-lab-owner'),'synthetic-private-capture-owner',{mode:0o600});return{data,directory,cleanup:()=>fs.rm(data,{recursive:true,force:true})};}
test('private capture requires an owned child directory, retains exact Native events, and never overwrites an earlier trace',async()=>{
 const f=await fixture();try{
  await assert.rejects(createNetworkCapture({data:f.directory,directory:f.data}),/Owned private/);
  const capture=await createNetworkCapture(f),rawLine='{"type":"frame","state":{"tick":8,"players":[{"position":[1,-0.0,3]}]}}',frame={type:'native_frame',room:'a'.repeat(24),at:12345,monotonicMs:42,rawLine,state:JSON.parse(rawLine).state};
  capture.observe({type:'not_a_native_observation',secret:'never_record_this'});capture.observe(frame);const info=await capture.close();
  assert.equal(info.status,'complete');assert.equal(info.events,1);assert.equal(info.dropped,0);
  const persisted=JSON.parse(await fs.readFile(path.join(f.directory,'runtime.jsonl'),'utf8'));assert.equal(persisted.rawLine,rawLine);assert.equal(persisted.state,undefined,'do not duplicate or canonicalize Native numbers through JS');
  assert.equal(Object.is(JSON.parse(persisted.rawLine).state.players[0].position[1],-0),true);
  const latest=JSON.parse(await fs.readFile(path.join(f.directory,'latest.json'),'utf8'));assert.equal(latest.numericProjection,true);assert.equal(latest.signedZeroPreserved,false);assert.equal(latest.state.tick,8);
  assert.equal((await fs.stat(f.directory)).mode&0o777,0o700);
  for(const name of ['runtime.jsonl','capture.json','latest.json'])assert.equal((await fs.stat(path.join(f.directory,name))).mode&0o777,0o600);
  await assert.rejects(createNetworkCapture(f),{code:'EEXIST'});
  assert.equal(JSON.parse(await fs.readFile(path.join(f.directory,'capture.json'),'utf8')).status,'complete');
 }finally{await f.cleanup();}
});
test('capture overflow is bounded and invalidates evidence rather than hiding omissions',async()=>{
 const f=await fixture();try{const capture=await createNetworkCapture({...f,maxBytes:4096,maxQueuedBytes:4096});for(let n=0;n<100;n++)capture.observe({type:'native_input',tick:n,inputs:Array(10).fill([n,1,1,0,0,257,null,null,null,0,null])});const info=await capture.close();assert.equal(info.status,'invalid');assert.ok(info.dropped>0);assert.ok(info.bytes<=4096);assert.ok((await fs.stat(path.join(f.directory,'runtime.jsonl'))).size<=4096);}finally{await f.cleanup();}
});

test('private entry capture override is explicit, bounded to512MiB and leaves the4MiB queue policy unchanged',()=>{assert.equal(networkCaptureLimit({}),256*1024**2);assert.equal(networkCaptureLimit({BOTSTRIKE_NETWORK_CAPTURE_MAX_BYTES:String(512*1024**2)}),512*1024**2);for(const value of ['', '0','-1','01','1e8',' 268435456','268435456 ','536870913','Infinity','4294967296',512*1024**2])assert.throws(()=>networkCaptureLimit({BOTSTRIKE_NETWORK_CAPTURE_MAX_BYTES:value}));});

test('explicit Tactical-size capture records512MiB while keeping the default4MiB writer queue',async()=>{const f=await fixture();try{const capture=await createNetworkCapture({...f,maxBytes:networkCaptureLimit({BOTSTRIKE_NETWORK_CAPTURE_MAX_BYTES:String(512*1024**2)})});capture.observe({type:'native_input',tick:1,inputs:[]});const info=await capture.close();assert.deepEqual(info.limits,{maxBytes:512*1024**2,maxQueuedBytes:4*1024**2});assert.equal(info.status,'complete');}finally{await f.cleanup();}});

test('private capture retains the authoritative ACK event needed for final-packed/frame correlation',async()=>{
 const f=await fixture();try{const capture=await createNetworkCapture(f),ack={type:'input_ack',room:'private-room',at:1000,monotonicMs:20,slot:0,seq:7,tick:2,life:1,neutral:true,generation:4};capture.observe(ack);const info=await capture.close();assert.equal(info.status,'complete');assert.equal(info.events,1);assert.equal(info.dropped,0);assert.deepEqual(JSON.parse(await fs.readFile(path.join(f.directory,'runtime.jsonl'),'utf8')),ack);}finally{await f.cleanup();}
});
