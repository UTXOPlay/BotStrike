import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {homedir} from 'node:os';
import {createHash} from 'node:crypto';
import {localDockerArguments,requireOwnedObject,requireStopped,requireGracefulStop,requireColdBackup,requireSentinel,requirePublishedLoopbackPort,containerDiagnostics,objectAbsent,fileInventory,requireSourceClosure,requireProfileGuard,packedMatchesSent,pilotViewTick,pilotJournal,createPilotTapeAudit,approvedFixtures} from '../tools/botstrike-host-deployment-rehearsal.mjs';
import {createPilotInputProof} from '../tools/botstrike-quality-ops-drill.mjs';
const id='a'.repeat(64),owner='owned-run',label='io.utxoplay.host-deployment.run';
const stopped={Id:id,Config:{Labels:{[label]:owner}},State:{Running:false,ExitCode:0,OOMKilled:false}};
const ready={draining:true,drainReady:true,pendingIO:0,sealingJobs:0,rooms:{finished:1,cancelled:1}};
async function workspace(t){const base=path.join(homedir(),'.codex/artifacts');await fs.mkdir(base,{recursive:true});const root=await fs.mkdtemp(path.join(base,'host-deployment-pure-'));await fs.chmod(root,0o700);t.after(()=>fs.rm(root,{recursive:true,force:true}));return root;}

test('Docker transport is explicitly local; environment cannot redirect the rehearsal',()=>{
 assert.deepEqual(localDockerArguments({}),['-H','unix:///var/run/docker.sock']);
 assert.deepEqual(localDockerArguments({DOCKER_HOST:'unix:///var/run/docker.sock',DOCKER_CONTEXT:'default'}),['-H','unix:///var/run/docker.sock']);
 for(const env of [{DOCKER_HOST:'ssh://example.invalid'},{DOCKER_HOST:'tcp://127.0.0.1:2375'},{DOCKER_CONTEXT:'production'}])assert.throws(()=>localDockerArguments(env));
});
test('destructive operations require exact IDs and owner labels for both object kinds',()=>{
 assert.equal(requireOwnedObject(stopped,id,owner),stopped);
 assert.throws(()=>requireOwnedObject({...stopped,Id:'b'.repeat(64)},id,owner));
 assert.throws(()=>requireOwnedObject(stopped,id,'some-other-run'));
 assert.throws(()=>requireOwnedObject(stopped,'container-name',owner));
 const network={Id:id,Labels:{[label]:owner}};assert.equal(requireOwnedObject(network,id,owner,{network:true}),network);
 assert.throws(()=>requireOwnedObject(network,id,'other',{network:true}));
});
test('cold backup requires modern explicit drain proof and successful stopped runtime',()=>{
 assert.equal(requireColdBackup(ready,stopped),true);
 for(const change of [{pendingIO:1},{pendingIO:undefined},{drainReady:false},{sealingJobs:1},{rooms:{running:1}},{rooms:{waiting:1}},{rooms:{sealing:1}}])assert.throws(()=>requireColdBackup({...ready,...change},stopped));
 assert.throws(()=>requireColdBackup({draining:true,sealingJobs:0,rooms:{finished:1}},stopped),'Old-version occupancy cannot authorize backup');
 for(const change of [{Running:true},{ExitCode:137},{ExitCode:1},{OOMKilled:true}])assert.throws(()=>requireStopped({...stopped,State:{...stopped.State,...change}}));
});
test('exit0 alone cannot hide the normal host 3-second SIGKILL fallback',()=>{
 assert.equal(requireGracefulStop(stopped,2899.999),true);
 for(const elapsed of [2900,3000,5000,-1,NaN,Infinity])assert.throws(()=>requireGracefulStop(stopped,elapsed));
});
test('unrelated sentinel continuity binds Docker process lifecycle and actual HTTP identity',()=>{
 const before={id,pid:411,startedAt:'2026-11-08T00:00:00Z',restartCount:0,marker:'one-run',boot:'one-process',status:200};assert.equal(requireSentinel(before,{...before}),true);
 for(const change of [{id:'b'.repeat(64)},{pid:412},{startedAt:'later'},{restartCount:1},{marker:'other-run'},{boot:'other-process'},{status:503}])assert.throws(()=>requireSentinel(before,{...before,...change}));
});
test('actual published port must exist; internal-network requested bindings alone cannot pass',()=>{
 const binding=[{HostIp:'127.0.0.1',HostPort:'34567'}],value={HostConfig:{PortBindings:{'8081/tcp':binding}},NetworkSettings:{Ports:{'8081/tcp':binding}}};assert.equal(requirePublishedLoopbackPort(value,8081,34567),true);
 for(const ports of [undefined,{'8081/tcp':null},{'8081/tcp':[{HostIp:'0.0.0.0',HostPort:'34567'}]},{'8081/tcp':[{HostIp:'127.0.0.1',HostPort:'34568'}]}])assert.throws(()=>requirePublishedLoopbackPort({...value,NetworkSettings:{Ports:ports}},8081,34567));
});
test('cleanup diagnostics retain actual state/ports/limits and exclude Config Env and tokens',()=>{
 const value={...stopped,Image:'image',Config:{Env:['RUNTIME_TOKEN=secret'],Labels:{[label]:owner}},HostConfig:{Memory:67108864,PortBindings:{}},NetworkSettings:{Ports:{'8081/tcp':null}}};const result=containerDiagnostics(value);assert.equal(result.state.ExitCode,0);assert.equal(result.limits.memory,67108864);assert.equal(result.actualPorts['8081/tcp'],null);assert.equal(JSON.stringify(result).includes('secret'),false);assert.equal(Object.hasOwn(result,'Config'),false);
});
test('cleanup accepts only actual exit1 plus the specific Docker not-found diagnostic',()=>{
 assert.equal(objectAbsent({code:1,stderr:'Error: No such object: '+id}),true);
 assert.equal(objectAbsent({code:1,stderr:'Error: NO SUCH CONTAINER: '+id}),true);
 assert.equal(objectAbsent({code:1,stderr:'Error response from daemon: network '+id+' not found'},{network:true}),true);
 assert.equal(objectAbsent({code:1,stderr:'Error: No such object: '+'b'.repeat(64)},{id}),false);
 for(const result of [{code:0,stderr:'No such object'},{code:null,stderr:'No such object'},{code:1,stderr:'No such socket'},{code:1,stderr:'permission denied'},{code:1,stderr:'ENOENT docker'}])assert.equal(objectAbsent(result),false);
});
test('source closure cannot be inferred from a tag; actual blobs, modes and complete set must match',()=>{
 const expected=Array.from({length:12},(_,i)=>({file:'source/'+i+'.mjs',mode:'100644',blobOid:String(i).padStart(40,'0')}));
 assert.equal(requireSourceClosure(expected,expected.map(r=>({...r}))),true);
 assert.throws(()=>requireSourceClosure(expected,expected.slice(1)));
 assert.throws(()=>requireSourceClosure(expected,[...expected,{file:'source/extra.mjs',mode:'100644',blobOid:'f'.repeat(40)}]));
 assert.throws(()=>requireSourceClosure(expected,expected.map((r,i)=>i===1?{...r,mode:'100755'}:r)));
 assert.throws(()=>requireSourceClosure(expected,expected.map((r,i)=>i===2?{...r,blobOid:'e'.repeat(40)}:r)));
});
test('operator profile comes only from a digest/tree/retained-bound actual guard, never an unknown or fabricated value',()=>{
 const retained=Array.from({length:10},(_,i)=>({name:'test-pair-'+i,sha256:{engine:'unchanged'}})),sourceTree='a'.repeat(40),guard={sourceKind:'git_tree',sourceRevision:sourceTree,nativeRulesChanged:false,retainedArtifacts:retained,portableProfileSha256:'b'.repeat(64),nativeModelSha256:'c'.repeat(64)};
 const options=value=>{const bytes=Buffer.from(JSON.stringify(value));return{bytes,settings:{retained,sourceTree,expectedSha256:createHash('sha256').update(bytes).digest('hex')}};};
 const good=options(guard);assert.equal(requireProfileGuard(good.bytes,good.settings).nativeProfile,'b'.repeat(64));assert.throws(()=>requireProfileGuard(good.bytes,{...good.settings,expectedSha256:'d'.repeat(64)}));assert.throws(()=>requireProfileGuard(good.bytes,{...good.settings,retained:undefined}));
 for(const change of [{portableProfileSha256:undefined},{portableProfileSha256:'unknown'},{sourceRevision:'e'.repeat(40)},{nativeRulesChanged:true},{retainedArtifacts:[]}]){const bad=options({...guard,...change});assert.throws(()=>requireProfileGuard(bad.bytes,bad.settings));}
});
test('cold inventories retain byte and permission evidence and reject symlink aliases',async t=>{
 const root=await workspace(t),dir=path.join(root,'data');await fs.mkdir(dir);const file=path.join(dir,'ledger.json');await fs.writeFile(file,'{"applied":true}',{mode:0o600});
 const before=await fileInventory(dir);assert.equal(before[0].mode,'0600');assert.equal(before[0].bytes,16);assert.equal(before[0].sha256,createHash('sha256').update('{"applied":true}').digest('hex'));
 await fs.chmod(file,0o644);assert.notDeepEqual(await fileInventory(dir),before);await fs.symlink(dir,path.join(root,'redirect'));await assert.rejects(fileInventory(path.join(root,'redirect')),/regular directory/);await fs.symlink(file,path.join(dir,'alias.json'));await assert.rejects(fileInventory(dir),/symlink/);
});
test('packed controls require actual takeover and the exact sent payload, not an AI seq collision',()=>{
 const input={seq:17,x:.12345678,y:.3,yaw:Math.PI,pitch:0,fire:true,viewTick:33},packed=[17,.123457,.3,3.141593,0,257,null,null,0,0,33];
 assert.equal(packedMatchesSent(packed,input),true);
 for(const changed of [[18,...packed.slice(1)],[17,0,...packed.slice(2)],packed.map((v,i)=>i===5?1:v),packed.map((v,i)=>i===6?2:v),packed.map((v,i)=>i===7?1:v)])assert.equal(packedMatchesSent(changed,input),false);
 assert.equal(packedMatchesSent(packed,{...input,fire:false}),false);
 assert.equal(packedMatchesSent(packed.map((v,i)=>i===10?34:v),input),false);assert.equal(packedMatchesSent(packed.map((v,i)=>i===5?v|1024:v),input),false);
});
test('neutral barrier requests the actual snapshot tick; active requests retain the original four-tick lookback',()=>{
 assert.equal(pilotViewTick(true,100),100);assert.equal(pilotViewTick(false,100),96);assert.equal(pilotViewTick(false,2),0);assert.throws(()=>pilotViewTick(true,-1));
});
test('public-host proof requires current exact known-sent ACK, then resets immediately on resync or ownership change',()=>{
 const room='d'.repeat(24),nonce='e'.repeat(32),proof=createPilotInputProof(room),control=token=>({type:'control',active:true,token,inputProtocol:{version:2,maxAgeMs:400}});
 const state=(tick,lastSeq,inputAck)=>({type:'state',room:{id:room,slot:0,state:{tick,players:[{life:1,last_seq:lastSeq}]}},delivery:{version:2,nonce},inputAck});
 const envelope=seq=>({type:'input',room,input:{seq,x:0,y:0},delivery:{version:2,nonce}}),ack=(seq,tick)=>({version:1,seq,tick,life:1,neutral:true});
 proof.receive(control('first'));proof.receive(state(30,0,null));assert.equal(proof.sent(envelope(7)),true);
 assert.equal(proof.receive(state(31,8,ack(7,31))),null);assert.equal(proof.receive(state(31,7,ack(7,30))),null);
 assert.deepEqual(proof.receive(state(31,7,ack(7,31))),ack(7,31));
 proof.receive({type:'input_resync'});assert.equal(proof.receive(state(32,7,ack(7,31))),null);
 proof.receive(control('new-owner'));assert.equal(proof.receive(state(33,7,ack(7,31))),null);proof.close();assert.equal(proof.receive(state(34,7,ack(7,31))),null);
});
test('private pilot journal preserves exact sent/context/ACK evidence and excludes authentication fields',()=>{
 const room='d'.repeat(24),input={seq:8,x:0,y:0,fire:false,cookie:'secret-cookie',token:'secret-token',nonce:'secret-nonce'},context={room,slot:0,life:2,minNativeTick:20,socketEpoch:1,ownerEpoch:1,token:'secret-token'},ack={version:1,seq:8,tick:21,life:2,neutral:true},snapshot={room,slot:0,life:2,tick:22,lastSeq:8,socketEpoch:1,ownerEpoch:1};
 const p={inputs:new Map([[8,input]]),contexts:new Map([[8,context]]),acks:new Map([[8,ack]]),ackSnapshots:new Map([[8,snapshot]]),metrics:{slot:0}};
 const bytes=pilotJournal(p,room),value=JSON.parse(bytes);assert.equal(value.rows.length,1);assert.deepEqual(value.rows[0].ack,ack);assert.equal(value.rows[0].context.minNativeTick,20);assert.equal(bytes.includes('secret'),false);assert.equal(bytes.includes('nonce'),false);assert.equal(bytes.includes('cookie'),false);
 for(const change of [{life:3},{room:'e'.repeat(24)},{lastSeq:9},{ownerEpoch:2},{socketEpoch:2}]){p.ackSnapshots.set(8,{...snapshot,...change});assert.throws(()=>pilotJournal(p,room));}p.ackSnapshots.set(8,snapshot);p.acks.set(8,{...ack,tick:20});assert.throws(()=>pilotJournal(p,room));
});
function tapeFixture(){
 const room='d'.repeat(24),make=(seq,life,min,active,ackTick)=>{const input={seq,x:active?.2:0,y:0,yaw:0,pitch:0,fire:active,viewTick:active?0:min},context={room,slot:0,life,minNativeTick:min,socketEpoch:1,ownerEpoch:1},ack=ackTick?{version:1,seq,tick:ackTick,life,neutral:!active}:null;return{seq,input,context,ack,ackSnapshot:ack?{room,slot:0,life,tick:ackTick,lastSeq:seq,socketEpoch:1,ownerEpoch:1}:null};};
 const rows=[make(9,1,0,true,1),make(10,1,1,true,null),make(11,2,3,false,5)],pack=row=>[row.seq,row.input.x,0,0,0,row.input.fire?257:256,null,null,0,0,row.input.viewTick],fallback=[10,0,0,0,0,256,null,null,0,0,null],frame=p=>[p,...Array(9).fill(null)];
 return{journals:[{format:'botstrike-host-pilot-journal-1',room,slot:0,rows}],heroes:Array(10).fill(0),frames:[frame(pack(rows[0])),frame(pack(rows[1])),frame([...fallback]),frame([...fallback]),frame(pack(rows[2]))]};
}
function auditFixture(f){const audit=createPilotTapeAudit(f.journals,f.heroes);for(let i=0;i<f.frames.length;i++)audit.frame(i+1,f.frames[i]);return audit.finish(f.frames.length);}
test('life-boundary fallback requires prior public new-life observation and later exact fresh neutral ACK; never credits its source',()=>{
 const result=auditFixture(tapeFixture())[0];assert.equal(result.wireAcksJoined,2);assert.equal(result.activeWireAcksJoined,1);assert.equal(result.neutralFallbackFrames,2);assert.deepEqual(result.fallbackSourceSequencesExcludedFromActiveCredit,[10]);assert.equal(result.distinctActiveRequestsObserved,1);assert.deepEqual(result.neutralFallbacks.map(r=>[r.publicWitnessTick,r.freshNeutralTick]),[[3,5],[3,5]]);
});
test('neutral fallback cannot invent a new life, use a future observation, omit neutral proof or attach a late historical ACK',()=>{
 for(const mutate of [
  f=>{f.journals[0].rows[2].context.life=1;f.journals[0].rows[2].ack.life=1;f.journals[0].rows[2].ackSnapshot.life=1;},
  f=>{f.journals[0].rows[2].context.minNativeTick=4;},
  f=>{f.journals[0].rows[2].ack=null;f.journals[0].rows[2].ackSnapshot=null;},
  f=>{const r=f.journals[0].rows[2];r.context.ownerEpoch=2;r.ackSnapshot.ownerEpoch=2;},
  f=>{const r=f.journals[0].rows[2];r.context.socketEpoch=2;r.ackSnapshot.socketEpoch=2;},
  f=>{const r=f.journals[0].rows[2];r.context.minNativeTick=2;r.input.viewTick=2;r.ack.tick=3;r.ackSnapshot.tick=3;},
  f=>{const r=f.journals[0].rows[1];r.ack={version:1,seq:10,tick:3,life:1,neutral:false};r.ackSnapshot={room:r.context.room,slot:0,life:1,tick:3,lastSeq:10,socketEpoch:1,ownerEpoch:1};},
  f=>{const r=f.journals[0].rows[1];r.ack={version:1,seq:10,tick:2,life:1,neutral:false};r.ackSnapshot={room:r.context.room,slot:0,life:1,tick:3,lastSeq:10,socketEpoch:1,ownerEpoch:1};},
  f=>{const r=f.journals[0].rows[1];r.ack={version:1,seq:10,tick:4,life:1,neutral:false};r.ackSnapshot={room:r.context.room,slot:0,life:1,tick:4,lastSeq:10,socketEpoch:1,ownerEpoch:1};}
 ]){const f=tapeFixture();mutate(f);assert.throws(()=>auditFixture(f));}
});
test('a genuinely joined historical ACK remains valid before a later new-life neutral fallback',()=>{
 const f=tapeFixture(),r=f.journals[0].rows[1];r.ack={version:1,seq:10,tick:2,life:1,neutral:false};r.ackSnapshot={room:r.context.room,slot:0,life:1,tick:2,lastSeq:10,socketEpoch:1,ownerEpoch:1};const result=auditFixture(f)[0];assert.equal(result.wireAcksJoined,3);assert.equal(result.activeWireAcksJoined,2);assert.equal(result.distinctActiveRequestsObserved,2);assert.deepEqual(result.fallbackSourceSequencesExcludedFromActiveCredit,[]);assert.deepEqual(result.neutralFallbacks[0].historicalAck,{tick:2,snapshotTick:2,life:1});assert.equal(result.neutralFallbacks[0].fallbackCreatesAckCredit,false);assert.equal(result.neutralFallbacks[0].fallbackCreatesActiveCredit,false);
});
test('an unjoined historical ACK cannot be introduced retroactively at a fallback',()=>{
 const f=tapeFixture(),audit=createPilotTapeAudit(f.journals,f.heroes);audit.frame(1,f.frames[0]);audit.frame(2,f.frames[1]);const r=f.journals[0].rows[1];r.ack={version:1,seq:10,tick:2,life:1,neutral:false};r.ackSnapshot={room:r.context.room,slot:0,life:1,tick:2,lastSeq:10,socketEpoch:1,ownerEpoch:1};assert.throws(()=>audit.frame(3,f.frames[2]),/already have a literal taped-tick join/);
});
test('fallback does not excuse any active field, changed aim/hero, unknown flag, purchase or equipment',()=>{
 for(const change of [[1,.1],[3,.2],[4,.1],[5,257],[5,256|1024],[6,0],[7,1],[8,3],[9,1],[10,2],[11,1],[12,1]]){const f=tapeFixture();f.frames[2][0][change[0]]=change[1];assert.throws(()=>auditFixture(f));}
});
test('every ACK must join its actual tick, original payload/view and current logged owner/socket/life',()=>{
 for(const mutate of [
  f=>{f.frames[4][0][10]=2;},f=>{f.frames[1][0][1]=.3;},f=>{f.frames[1][0][10]=1;},f=>{f.frames[4][0][0]=12;},
  f=>{f.journals[0].rows[2].ackSnapshot.ownerEpoch=2;},f=>{f.journals[0].rows[2].ackSnapshot.socketEpoch=2;},f=>{f.journals[0].rows[2].ackSnapshot.life=3;},f=>{f.journals[0].rows[2].ackSnapshot.room='e'.repeat(24);}
 ]){const f=tapeFixture();mutate(f);assert.throws(()=>auditFixture(f));}
});
test('old-life active payload and loss of takeover remain hard failures after controller activation',()=>{
 const stale=tapeFixture();stale.frames[3][0]=[10,.2,0,0,0,257,null,null,0,0,0];assert.throws(()=>auditFixture(stale),/latest publicly observed context/);
 const dropped=tapeFixture();dropped.frames[3][0]=null;assert.throws(()=>auditFixture(dropped),/lost takeover/);
});
test('approved original fixtures are mandatory, SHA-bound, complete and unmodified',async t=>{
 const root=await workspace(t);await assert.rejects(approvedFixtures(root,undefined));await fs.mkdir(path.join(root,'exports'));
 const rows=Array.from({length:10},(_,i)=>({verifier:'profile-'+i,file:i?'exports/profile-'+i+'.json':'exports/current.json',exportSha256:createHash('sha256').update('fixture-'+i).digest('hex')}));
 for(let i=0;i<rows.length;i++)await fs.writeFile(path.join(root,rows[i].file),'fixture-'+i);
 const report={status:'passed',stages:{restoredExports:rows.map(r=>({verifier:r.verifier,verified:true})),activeMatch:{proof:{verified:true},exportSha256:rows[0].exportSha256},artifacts:{profiles:rows.map((r,i)=>({name:r.verifier,sha256:{'botstrike-engine':'engine-'+i,'myelin-botstrike':'verifier-'+i}}))},rollback:{identicalNativePair:{'botstrike-engine':'engine-0','myelin-botstrike':'verifier-0'}},retainedFixtures:rows.slice(1)}};
 const bytes=JSON.stringify(report),digest=createHash('sha256').update(bytes).digest('hex');await fs.writeFile(path.join(root,'report.json'),bytes);
 assert.equal((await approvedFixtures(root,digest)).rows.length,10);await assert.rejects(approvedFixtures(root,'a'.repeat(64)),/report mismatch/);
 await fs.writeFile(path.join(root,rows[3].file),'modified');await assert.rejects(approvedFixtures(root,digest),/export changed/);
});
