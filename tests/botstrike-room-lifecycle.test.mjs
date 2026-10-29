import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {mkdtemp,rm} from 'node:fs/promises';
import {createBotStrike} from '../botstrike-service/server.mjs';

test('a departing host leaves teammates in play; the last departure frees room capacity',async()=>{
 const data=await mkdtemp(path.join(tmpdir(),'botstrike-lifecycle-')),secret='room-lifecycle-test-'.repeat(3);
 const service=createBotStrike({secret,data,maxRooms:1,queueMs:500});
 await new Promise(resolve=>service.server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+service.server.address().port;
 const request=async(id,action)=>{const response=await fetch(base+'/api/action',{method:'POST',headers:{'Content-Type':'application/json','X-Runtime-Token':secret,'X-UTXOPlay-Account':id.repeat(64)},body:JSON.stringify(action)});return{status:response.status,body:await response.json()};};
 const until=async predicate=>{const end=Date.now()+5000;while(!predicate()){if(Date.now()>end)throw Error('Room did not reach the expected state');await new Promise(resolve=>setTimeout(resolve,20));}};
 const queue={type:'queue',mode:'deathmatch',map:0,hero:0,difficulty:0};
 try{
  const first=await request('a',queue),second=await request('b',queue);
  assert.equal(first.status,200);assert.equal(second.status,200);assert.equal(second.body.room.id,first.body.room.id);
  const room=service.rooms.get(first.body.room.id);await until(()=>room.state?.tick>4);
  assert.equal((await request('a',{type:'leave'})).status,200);
  assert.equal(room.status,'running');assert.equal(room.host,'b'.repeat(64));
  const tick=room.state.tick;await until(()=>room.state.tick>tick+4);
  assert.equal((await request('b',{type:'hero',hero:2})).body.room.slot,5);
  const full=await request('c',{type:'create',kind:'practice',mode:'deathmatch',map:0,hero:0,difficulty:0});assert.equal(full.status,400);
  assert.equal((await request('b',{type:'leave'})).status,200);
  assert.equal(room.status,'cancelled');assert.equal(room.proof,undefined);assert.equal(service.metrics.failedRooms,0);
  const replacement=await request('c',{type:'create',kind:'practice',mode:'deathmatch',map:0,hero:0,difficulty:0});assert.equal(replacement.status,200);
 }finally{await service.close();await rm(data,{recursive:true,force:true});}
});
