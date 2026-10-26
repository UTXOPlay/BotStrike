import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,utimes,stat,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {writeAll} from '../botstrike-service/io.mjs';
import {publicState} from '../botstrike-service/visibility.mjs';
import {pruneReplays} from '../botstrike-service/retention.mjs';
import {createBotStrike,safeInput,neutral} from '../botstrike-service/server.mjs';
import {SnapshotBuffer} from '../games/botstrike/client/snapshots.mjs';
import {ResolutionBudget} from '../shared/game-performance.mjs';
const player=(slot,position)=>({slot,team:Math.floor(slot/5),hero:0,alive:true,life:1,position,velocity:[0,0,0],yaw:0,pitch:0,crouch:false,weapon:0,health:100,armor:20,flash:0,revealed:0,kills:0,deaths:0,assists:0,damage:0,ammo:[20],ai_path:[[0,0,0]],attackers:[1]});
const state=(tick=0,x=0)=>({tick,config:{map:0,mode:'deathmatch',seed:123},random:12,players:[player(0,[0,0,0]),player(5,[x,0,-100])],utilities:[]});
test('partial async recording writes retain every byte and propagate disk failure',async()=>{
 let result='';await writeAll(1,'a full frame\n',(_fd,b,offset,length,_position,callback)=>{const n=Math.min(length,3);result+=b.subarray(offset,offset+n);queueMicrotask(()=>callback(null,n));});assert.equal(result,'a full frame\n');
 await assert.rejects(writeAll(1,'frame',(_fd,_b,_o,_l,_p,callback)=>callback(Object.assign(Error('full'),{code:'ENOSPC'}))),{code:'ENOSPC'});
});
test('opponent positions behind walls or smoke never reach client; own state and revealed opponents survive',()=>{
 const s=state(),spec={maps:[{obstacles:[{min:[-40,0,-60],max:[40,100,-40]}]}]};
 s.objective={carrier:5,position:[0,0,-100]};let view=publicState(s,0,spec);assert.equal(view.objective.position,null);assert.equal(view.players[1].hidden,true);assert.equal(view.players[1].position,null);assert.equal(view.players[1].ammo,undefined);assert.equal(view.random,undefined);assert.equal(view.config.seed,undefined);assert.deepEqual(view.players[0].ammo,[20]);assert.equal(view.players[0].ai_path,undefined);
 spec.maps[0].obstacles=[];view=publicState(s,0,spec);assert.equal(view.players[1].hidden,false);assert.deepEqual(view.players[1].position,[0,0,-100]);
 s.utilities=[{kind:2,fuse:0,position:[0,40,-50]}];assert.equal(publicState(s,0,spec).players[1].position,null);
 s.players[1].revealed=30;assert.deepEqual(publicState(s,0,spec).players[1].position,[0,0,-100]);
 assert.deepEqual(s.players[1].position,[0,0,-100],'authoritative source was not mutated');
});
test('remote interpolation follows server time without moving local prediction or revealing a hidden life',()=>{
 const buffer=new SnapshotBuffer();buffer.push(state(10,0),0);buffer.push(state(12,20),31.25);buffer.push(state(14,40),62.5);
 const sample=buffer.sample(78.125,0);assert.equal(buffer.viewTick(),11);assert.equal(sample.players[1].position[0],10);assert.equal(sample.players[0].position[0],0);
 const hidden=state(16,60);hidden.players[1].hidden=true;hidden.players[1].position=null;buffer.push(hidden,93.75);assert.equal(buffer.sample(94,0).players[1].position,null);
 const respawn=state(18,1000);respawn.players[1].life=2;buffer.push(respawn,125);assert.equal(buffer.sample(125,0).players[1].position[0],1000);
 buffer.push(state(15,-9000),140);assert.equal(buffer.frames.at(-1).state.tick,18,'stale snapshot ignored');
});
test('one long frame does not downscale; sustained overload still does, recovery tolerates a missed frame',()=>{
 const budget=new ResolutionBudget(1.5);assert.equal(budget.sample(600),1.5);
 for(let i=0;i<30;i++)budget.sample(16.67);assert.equal(budget.ratio,1.5);
 for(let i=0;i<10;i++)budget.sample(40);assert.equal(budget.ratio,1.25);
 for(let i=0;i<650;i++)budget.sample(i%120===119?25:16.67);assert.equal(budget.ratio,1.5);
});
test('only expired recordings and their stale account references are removed',async()=>{
 const data=await mkdtemp(path.join(tmpdir(),'botstrike-retention-')),now=Date.now(),old=now-31*86400000,expired='a'.repeat(24),live='b'.repeat(24),recent='c'.repeat(24),account='d'.repeat(64);
 try{await mkdir(path.join(data,'rooms'));await mkdir(path.join(data,'accounts'));
  for(const [id,time,status] of [[expired,old,'finished'],[live,old,'running'],[recent,now,'finished']]){const dir=path.join(data,'rooms',id);await mkdir(dir);const file=path.join(dir,'room.json');await writeFile(file,JSON.stringify({created:time,status}));await utimes(file,time/1000,time/1000);}
  const file=path.join(data,'accounts',account+'.json');await writeFile(file,JSON.stringify({room:expired}));await utimes(file,old/1000,old/1000);
  assert.deepEqual(await pruneReplays(data,{now,days:30,protectedRooms:new Set([live])}),[expired]);await assert.rejects(stat(path.join(data,'rooms',expired)));await stat(path.join(data,'rooms',live));await stat(path.join(data,'rooms',recent));await assert.rejects(stat(file));
 }finally{await rm(data,{recursive:true,force:true});}
});
test('untrusted rewind fields are bounded and authority fields cannot be injected',()=>{
 assert.equal(safeInput({...neutral(),viewTick:123,view_tick:0,takeover:true}).view_tick,123);
 for(const viewTick of [-1,NaN,3.5,230401])assert.throws(()=>safeInput({...neutral(),viewTick}));
 assert.equal(safeInput({...neutral(),view_tick:123}).view_tick,undefined);
});
test('a failed disk writer isolates its room; actual stdin backpressure preserves another match',async()=>{
 const data=await mkdtemp(path.join(tmpdir(),'botstrike-fault-')),secret='fault-test-'.repeat(5);let brokenFd,releaseFailure;
 const fault=new Promise(resolve=>releaseFailure=resolve);
 const service=createBotStrike({secret,data,recordWrite:async(fd,line)=>{if(brokenFd===undefined)brokenFd=fd;if(fd===brokenFd){await fault;throw Object.assign(Error('full'),{code:'ENOSPC'});}await writeAll(fd,line);}});
 await new Promise(resolve=>service.server.listen(0,'127.0.0.1',resolve));const base='http://127.0.0.1:'+service.server.address().port;
 const headers=id=>({'Content-Type':'application/json','X-Runtime-Token':secret,'X-UTXOPlay-Account':id.repeat(64)});
 const make=async id=>(await(await fetch(base+'/api/action',{method:'POST',headers:headers(id),body:JSON.stringify({type:'create',kind:'practice',mode:'deathmatch',map:0,hero:0,difficulty:0})})).json()).room;
 const until=async fn=>{const end=Date.now()+5000;while(!fn()){if(Date.now()>end)throw Error('Timed out');await new Promise(r=>setTimeout(r,20));}};
 try{const a=await make('a');await until(()=>brokenFd!==undefined);const b=await make('b');const healthy=service.rooms.get(b.id);healthy.child.stdin._writableState.highWaterMark=1;
  await until(()=>healthy.state?.tick>4);releaseFailure();await until(()=>service.rooms.get(a.id).status==='failed');const tick=healthy.state.tick;await until(()=>healthy.state.tick>tick+4);
  assert.equal(healthy.status,'running');assert.equal(service.metrics.failedRooms,1);assert.equal(service.metrics.recordingErrors,1);
  const health=await fetch(base+'/api/health',{headers:headers('b')});assert.equal(health.status,200);
  await fetch(base+'/api/admin/drain',{method:'POST',headers:headers('b')});const denied=await make('c');assert.equal(denied,undefined);assert.equal(healthy.status,'running');
 }finally{releaseFailure();await service.close();await new Promise(r=>setTimeout(r,100));await rm(data,{recursive:true,force:true});}
});
