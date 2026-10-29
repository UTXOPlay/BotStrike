import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {mkdtemp,rm} from 'node:fs/promises';
import {WebSocket} from 'ws';
import {createBotStrike} from '../botstrike-service/server.mjs';

test('public queue and socket metrics track fill, latency and real reconnects',async()=>{
 const data=await mkdtemp(path.join(tmpdir(),'botstrike-queue-')),secret='queue-metrics-test-'.repeat(3);
 const service=createBotStrike({secret,data,queueMs:500,heartbeatMs:100}),sockets=[];
 await new Promise(resolve=>service.server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+service.server.address().port;
 const headers=id=>({'Content-Type':'application/json','X-Runtime-Token':secret,'X-UTXOPlay-Account':id.repeat(64)});
 const queue=async(id,map=0)=>{const response=await fetch(base+'/api/action',{method:'POST',headers:headers(id),body:JSON.stringify({type:'queue',mode:'deathmatch',map,hero:0,difficulty:0})});assert.equal(response.status,200);return(await response.json()).room;};
 const metrics=async()=>{const response=await fetch(base+'/api/metrics',{headers:headers('a')});assert.equal(response.status,200);return response.json();};
 const until=async predicate=>{const end=Date.now()+5000;while(!(await predicate())){if(Date.now()>end)throw Error('Public room did not reach the expected state');await new Promise(resolve=>setTimeout(resolve,20));}};
 const connect=async id=>{const socket=new WebSocket(base.replace('http','ws')+'/api/socket',{headers:headers(id)});await new Promise((resolve,reject)=>{socket.once('open',resolve);socket.once('error',reject)});sockets.push(socket);return socket;};
 try{
  const first=await queue('a'),second=await queue('b');assert.equal(first.id,second.id);
  const waiting=await metrics();assert.equal(waiting.publicWaitingHumans,2);assert.equal(waiting.publicRunningHumans,0);assert.equal(waiting.publicQueueRequests,2);assert.equal(waiting.publicQueueJoins,1);assert.equal(waiting.publicQueueWaitMs.samples,0);assert.equal(waiting.publicBotSeats,8);
  await until(()=>service.rooms.get(first.id)?.state);
  const started=await metrics();assert.equal(started.publicMatchesStarted,1);assert.equal(started.publicHumanSeatsAtStart,2);assert.equal(started.publicBotSeatsAtStart,8);assert.equal(started.publicQueueWaitMs.samples,2);assert.ok(started.publicQueueWaitMs.p95>=started.publicQueueWaitMs.p50);assert.equal(started.publicRunningHumans,2);
  const primary=await connect('a'),duplicate=await connect('a');
  await until(async()=>{const current=await metrics();return current.publicSocketRttMs.samples>=2&&current.publicSocketJitterMs.samples>=1});
  const latency=await metrics();assert.ok(latency.publicSocketRttMs.p95>=latency.publicSocketRttMs.p50);assert.ok(latency.publicSocketJitterMs.p95>=0);assert.equal(latency.publicReconnects,0);
  duplicate.close();await new Promise(resolve=>duplicate.once('close',resolve));assert.equal((await metrics()).publicReconnects,0,'closing a duplicate tab is not a reconnect');
  primary.close();await new Promise(resolve=>primary.once('close',resolve));await until(()=>service.rooms.get(first.id).disconnectedAt?.has('a'.repeat(64)));
  await connect('a');const reconnected=await metrics();assert.equal(reconnected.publicReconnects,1);assert.equal(reconnected.reconnections,1);assert.equal(reconnected.publicReconnectDelayMs.samples,1);assert.equal(JSON.stringify(reconnected).includes('a'.repeat(64)),false);
  const late=await queue('c');assert.equal(late.id,first.id);
  const joined=await metrics();assert.equal(joined.publicLateJoins,1);assert.equal(joined.publicQueueJoins,2);assert.equal(joined.publicQueueWaitMs.samples,3);assert.equal(joined.publicRunningHumans,3);assert.equal(joined.publicBotSeats,7);
  const abandoned=await queue('d',1);assert.notEqual(abandoned.id,first.id);
  const left=await fetch(base+'/api/action',{method:'POST',headers:headers('d'),body:JSON.stringify({type:'leave'})});assert.equal(left.status,200);
  const afterLeave=await metrics();assert.equal(afterLeave.publicQueueAbandons,1);assert.equal(afterLeave.publicWaitingHumans,0);assert.equal(afterLeave.publicQueueWaitMs.samples,3);
 }finally{for(const socket of sockets)socket.terminate();await service.close();await rm(data,{recursive:true,force:true});}
});
