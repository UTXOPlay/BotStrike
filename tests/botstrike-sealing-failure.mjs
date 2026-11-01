// Opt-in integration: finish a real native match, then fail only the verifier launch.
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,copyFile,chmod,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {createBotStrike} from '../botstrike-service/server.mjs';

const data=await mkdtemp(path.join(tmpdir(),'botstrike-seal-failure-')),assets=path.join(data,'assets');
await mkdir(assets);
await copyFile(path.resolve('release/botstrike-engine'),path.join(assets,'botstrike-engine'));
await chmod(path.join(assets,'botstrike-engine'),0o700);
await writeFile(path.join(assets,'myelin-botstrike'),'unavailable verifier fixture',{mode:0o600});
const secret='seal-failure-test-'.repeat(3),account='a'.repeat(64);
const service=createBotStrike({secret,data,assets,tickMs:0});
await new Promise(resolve=>service.server.listen(0,'127.0.0.1',resolve));
const base='http://127.0.0.1:'+service.server.address().port;
const headers={'Content-Type':'application/json','X-Runtime-Token':secret,'X-UTXOPlay-Account':account};

try{
 const response=await fetch(base+'/api/action',{method:'POST',headers,body:JSON.stringify({type:'create',kind:'practice',mode:'deathmatch',map:0,hero:0,difficulty:1})});
 assert.equal(response.status,200);const id=(await response.json()).room.id,room=service.rooms.get(id);
 const deadline=Date.now()+180000;
 while(!['failed','finished'].includes(room.status)){
  if(Date.now()>deadline)throw Error('Native room did not finish and seal in time');
  await new Promise(resolve=>setTimeout(resolve,250));
 }
 assert.equal(room.status,'failed');assert.match(room.error,/replay verification failed/i);
 assert.equal(room.proof,undefined);assert.equal(service.metrics.sealingFailures,1);
 assert.equal(service.metrics.verifiedMatches,0);assert.equal(service.metrics.failedRooms,1);
 const exportResponse=await fetch(base+'/api/export',{headers});assert.equal(exportResponse.status,409);
 const state=(await(await fetch(base+'/api/state',{headers})).json()).room;
 assert.equal(state.status,'failed');assert.equal(state.proof,null);
 console.log(JSON.stringify({ticks:room.state.tick,sealingFailures:service.metrics.sealingFailures,verifiedMatches:service.metrics.verifiedMatches,exportRejected:true},null,2));
}finally{await service.close();await rm(data,{recursive:true,force:true});}
