import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {mkdtemp,rm} from 'node:fs/promises';
import {createBotStrike} from '../botstrike-service/server.mjs';

test('public queue metrics distinguish waiting, started and late-joined human seats',async()=>{
 const data=await mkdtemp(path.join(tmpdir(),'botstrike-queue-')),secret='queue-metrics-test-'.repeat(3);
 const service=createBotStrike({secret,data,queueMs:500});
 await new Promise(resolve=>service.server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+service.server.address().port;
 const headers=id=>({'Content-Type':'application/json','X-Runtime-Token':secret,'X-UTXOPlay-Account':id.repeat(64)});
 const queue=async(id,map=0)=>{const response=await fetch(base+'/api/action',{method:'POST',headers:headers(id),body:JSON.stringify({type:'queue',mode:'deathmatch',map,hero:0,difficulty:0})});assert.equal(response.status,200);return(await response.json()).room;};
 const metrics=async()=>{const response=await fetch(base+'/api/metrics',{headers:headers('a')});assert.equal(response.status,200);return response.json();};
 const until=async predicate=>{const end=Date.now()+5000;while(!predicate()){if(Date.now()>end)throw Error('Public room did not start');await new Promise(resolve=>setTimeout(resolve,20));}};
 try{
  const first=await queue('a'),second=await queue('b');assert.equal(first.id,second.id);
  const waiting=await metrics();assert.equal(waiting.publicWaitingHumans,2);assert.equal(waiting.publicRunningHumans,0);assert.equal(waiting.publicQueueRequests,2);assert.equal(waiting.publicQueueJoins,1);assert.equal(waiting.publicQueueWaitMs.samples,0);assert.equal(waiting.publicBotSeats,8);
  await until(()=>service.rooms.get(first.id)?.state);
  const started=await metrics();assert.equal(started.publicMatchesStarted,1);assert.equal(started.publicHumanSeatsAtStart,2);assert.equal(started.publicBotSeatsAtStart,8);assert.equal(started.publicQueueWaitMs.samples,2);assert.ok(started.publicQueueWaitMs.p95>=started.publicQueueWaitMs.p50);assert.equal(started.publicRunningHumans,2);
  const late=await queue('c');assert.equal(late.id,first.id);
  const joined=await metrics();assert.equal(joined.publicLateJoins,1);assert.equal(joined.publicQueueJoins,2);assert.equal(joined.publicQueueWaitMs.samples,3);assert.equal(joined.publicRunningHumans,3);assert.equal(joined.publicBotSeats,7);
  const abandoned=await queue('d',1);assert.notEqual(abandoned.id,first.id);
  const left=await fetch(base+'/api/action',{method:'POST',headers:headers('d'),body:JSON.stringify({type:'leave'})});assert.equal(left.status,200);
  const afterLeave=await metrics();assert.equal(afterLeave.publicQueueAbandons,1);assert.equal(afterLeave.publicWaitingHumans,0);assert.equal(afterLeave.publicQueueWaitMs.samples,3);
 }finally{await service.close();await rm(data,{recursive:true,force:true});}
});
