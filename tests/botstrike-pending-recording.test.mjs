// Private HTTP + actual release Native. The unresolved recordWrite is an
// explicit filesystem-boundary fault, not a real full-disk or transport test.
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,stat,utimes,rm} from 'node:fs/promises';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {createBotStrike} from '../botstrike-service/server.mjs';
import {writeAll} from '../botstrike-service/io.mjs';
import {drainedForBackup} from '../tools/botstrike-quality-ops-drill.mjs';

const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function until(predicate,timeout=5000){const end=performance.now()+timeout;while(performance.now()<end){const value=await predicate();if(value)return value;await delay(5);}throw Error('Pending recording fixture timed out');}
const account=index=>(index+1).toString(16).padStart(64,'0');
const lobby={type:'create',kind:'private',mode:'deathmatch',map:0,hero:0,difficulty:0};
async function fixture(options={}){
 const data=await mkdtemp(path.join(tmpdir(),'botstrike-pending-recording-')),secret='isolated-pending-recording-fixture-2050',events=[];let service,base,stopped=true;
 async function start(extra={}){service=createBotStrike({data,secret,maxRooms:1,sampleResources:false,qualityOptions:{flushIntervalMs:0},observe:event=>events.push(event),...options,...extra});await new Promise(resolve=>service.server.listen(0,'127.0.0.1',resolve));await service.quality.ready;base='http://127.0.0.1:'+service.server.address().port;stopped=false;}
 async function request(endpoint,body,id=0){const response=await fetch(base+endpoint,{method:body?'POST':'GET',headers:{'Content-Type':'application/json','X-Runtime-Token':secret,'X-UTXOPlay-Account':account(id)},body:body?JSON.stringify(body):undefined});return{status:response.status,body:await response.json()};}
 async function stop(){if(stopped)return;stopped=true;await service.close();}
 await start();return{data,events,start,stop,request,get service(){return service;},cleanup:async()=>{await stop();await rm(data,{recursive:true,force:true});}};
}
const blocked=body=>body.qualityHealth.alerts.some(alert=>alert.code==='drain_blocked'&&alert.active);

test('ordinary drain of a waiting lobby reports occupancy without a blocked-I/O warning',async()=>{
 const f=await fixture();
 try{
  assert.equal((await f.request('/api/action',lobby)).status,200);
  const drain=await f.request('/api/admin/drain',{});assert.equal(drain.status,200);assert.deepEqual(drain.body,{draining:true,pendingIO:0,drainReady:false});
  const health=await f.request('/api/health');assert.equal(health.body.ok,true);assert.equal(health.body.rooms.waiting,1);assert.equal(health.body.pendingIO,0);assert.equal(health.body.drainReady,false);assert.equal(blocked(health.body),false);
  assert.equal((await f.request('/api/action',{type:'leave'})).status,200);const metrics=await f.request('/api/metrics');assert.equal(metrics.body.pendingIO,0);assert.equal(metrics.body.drainReady,true);assert.equal(blocked(metrics.body),false);assert.equal(drainedForBackup(metrics.body),true);
 }finally{await f.cleanup();}
});

test('10-second recording timeout retains failed-room source, capacity and drain protection until its actual write settles',async()=>{
 let releaseWrite,entered=false;const gate=new Promise(resolve=>releaseWrite=resolve);
 const f=await fixture({recordWrite:async(fd,line)=>{entered=true;await gate;await writeAll(fd,line);}});let room;
 try{
  const made=await f.request('/api/action',{...lobby,kind:'practice',drill:0});assert.equal(made.status,200);room=f.service.rooms.get(made.body.room.id);await until(()=>entered&&!!room.recordingPending);
  const running=(await f.request('/api/health')).body;assert.equal(running.ok,true);assert.equal(running.rooms.running,1);assert.equal(running.pendingIO,1);assert.equal(running.drainReady,false);assert.equal(blocked(running),false);
  // Exercise the production finite watchdog, rather than shortening its clock.
  await until(()=>room.status==='failed',12000);assert.ok(room.recordingPending);assert.equal(room.fd,undefined);assert.ok(Number.isInteger(room.pendingTapeClose));
  const failed=(await f.request('/api/metrics')).body;assert.equal(failed.ok,true,'private readiness must not change listener-health semantics');assert.equal(failed.rooms.failed,1);assert.equal(failed.rooms.running||0,0);assert.equal(failed.pendingIO,1);assert.equal(failed.drainReady,false);assert.equal(blocked(failed),false,'a drain warning is only active when drain was requested');
  const capacity=await f.request('/api/action',lobby,1);assert.equal(capacity.status,400);assert.match(capacity.body.error,/All servers are busy/,'a failed but unsettled writer still occupies the one-room I/O capacity');
  const drain=await f.request('/api/admin/drain',{});assert.deepEqual(drain.body,{draining:true,pendingIO:1,drainReady:false});const unhealthy=(await f.request('/api/health')).body;assert.equal(blocked(unhealthy),true);assert.equal(drainedForBackup(unhealthy),false);
  const directory=path.join(f.data,'rooms',room.id),metadataFile=path.join(directory,'room.json'),accountFile=path.join(f.data,'accounts',account(0)+'.json'),old=Date.now()-40*86400000;
  const metadata=JSON.parse(await readFile(metadataFile,'utf8'));metadata.created=old;metadata.finishedAt=old;await writeFile(metadataFile,JSON.stringify(metadata));await utimes(metadataFile,old/1000,old/1000);await utimes(accountFile,old/1000,old/1000);
  const tapeBefore=await readFile(path.join(directory,'tape.jsonl'),'utf8');await f.service.prune();assert.ok((await stat(metadataFile)).isFile());assert.ok((await stat(accountFile)).isFile());assert.equal(await readFile(path.join(directory,'tape.jsonl'),'utf8'),tapeBefore,'retention leaves the unresolved writer and its source intact');
  releaseWrite();await until(()=>!room.recordingPending&&room.pendingTapeClose===undefined);
  const settled=(await f.request('/api/metrics')).body;assert.equal(settled.pendingIO,0);assert.equal(settled.drainReady,true);assert.equal(blocked(settled),false);assert.equal(drainedForBackup(settled),true);
  assert.equal(room.status,'failed');assert.equal(room.proof,undefined);assert.equal((await f.request('/api/export')).status,409);assert.equal(settled.verifiedMatches,0);assert.equal(settled.sealingJobs,0);assert.equal(f.events.filter(event=>event.type==='native_input').length,0,'a late completed write is never sent to the stopped Native engine');
  await f.service.prune();await assert.rejects(stat(directory),{code:'ENOENT'});await assert.rejects(stat(accountFile),{code:'ENOENT'});
  await f.stop();await f.start({recordWrite:writeAll});assert.equal((await f.request('/api/action',lobby,1)).status,200,'after settlement and a clean restart the old failed writer consumes no room capacity');
 }finally{releaseWrite();if(room)await until(()=>!room.recordingPending);await f.cleanup();}
});
