// Disposable, external host QA. Importing this module never starts a process.
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {homedir} from 'node:os';
import {createServer} from 'node:net';
import {createInterface} from 'node:readline';
import {createHash,randomBytes,randomUUID} from 'node:crypto';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {fileURLToPath} from 'node:url';
import {WebSocket} from 'ws';
import {trackSocketDelivery} from '../tests/ws-delivery-client.mjs';
import {createPilotInputProof,drainedForBackup,copySnapshot} from './botstrike-quality-ops-drill.mjs';
import {ROLLBACK_COMMIT} from './quality-rollback-bundle.mjs';

export const APPLICATION_IMAGE='sha256:09eadfd30a716fefd53a35b35362bad0831d0fc8cd1c46cc1e81a020553dd3d9';
export const APPLICATION_TREE='839bdb9c5b9783cba6885f441b0729baa982b5c8';
export const BASE_IMAGE='sha256:de2b4bfc2ffdcb9607d7594fc825deb5a956478d735fb1fd208c5b45ab0f5631';
export const APPLICATION_GUARD_SHA256='1cc8602c5405daada04df65fe6ae00fecb67bb05fd52effa58201fa2d430bef9';
const OWNER='io.utxoplay.host-deployment.run',ORIGIN='http://botstrike.localhost:8080';
const here=fileURLToPath(import.meta.url),repo=path.resolve(path.dirname(here),'..'),execute=promisify(execFile);
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const blob=bytes=>createHash('sha1').update(Buffer.from('blob '+bytes.length+'\0')).update(bytes).digest('hex');
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const json=async file=>JSON.parse(await fs.readFile(file,'utf8'));
const write=async(file,value)=>fs.writeFile(file,JSON.stringify(value,null,2)+'\n',{mode:0o600});
const neutral=()=>({x:0,y:0,yaw:0,pitch:0,fire:false,reload:false,walk:false,crouch:false,jump:false,ability:false,interact:false,scope:false,drop:false,item:0,practice:0,throw_mode:0,preview_item:0});

export function localDockerArguments(environment=process.env){
 assert.ok(!environment.DOCKER_HOST||environment.DOCKER_HOST==='unix:///var/run/docker.sock','Remote Docker endpoint forbidden');
 assert.ok(!environment.DOCKER_CONTEXT||environment.DOCKER_CONTEXT==='default','Non-default Docker context forbidden');
 return ['-H','unix:///var/run/docker.sock'];
}
export function requireOwnedObject(value,id,owner,{network=false}={}){
 assert.match(id,/^[a-f0-9]{64}$/);assert.ok(typeof owner==='string'&&owner.length>0&&owner.length<=64);assert.equal(value.Id,id,'Exact Docker ID required');
 assert.equal((network?value.Labels:value.Config?.Labels)?.[OWNER],owner,'Foreign Docker object forbidden');return value;
}
export function requireStopped(value){assert.equal(value.State?.Running,false);assert.equal(value.State?.ExitCode,0);assert.equal(value.State?.OOMKilled,false);return true;}
export function requireGracefulStop(value,elapsedMs){requireStopped(value);assert.ok(Number.isFinite(elapsedMs)&&elapsedMs>=0&&elapsedMs<2900,'Host graceful exit must precede its 3-second kill cap');return true;}
export function requireColdBackup(metrics,container){assert.ok(drainedForBackup(metrics),'Modern explicit zero-I/O drain required');requireStopped(container);return true;}
export function requireSentinel(before,after){
 for(const key of ['id','pid','startedAt','restartCount','marker','boot','status'])assert.equal(after[key],before[key],'Unrelated sentinel changed: '+key);
 assert.equal(after.status,200);assert.equal(after.restartCount,0);assert.ok(after.pid>0);return true;
}
export function requirePublishedLoopbackPort(value,containerPort,hostPort){
 assert.ok(Number.isInteger(containerPort)&&containerPort>0&&containerPort<=65535&&Number.isInteger(hostPort)&&hostPort>0&&hostPort<=65535);
 assert.deepEqual(value.NetworkSettings?.Ports?.[containerPort+'/tcp'],[{HostIp:'127.0.0.1',HostPort:String(hostPort)}],'Actual loopback port publication required; requested bindings alone are insufficient');return true;
}
export function containerDiagnostics(value){
 const state=value.State||{},host=value.HostConfig||{};
 return{id:value.Id,image:value.Image,state:Object.fromEntries(['Status','Running','ExitCode','OOMKilled','Error','Pid','StartedAt','FinishedAt'].map(k=>[k,state[k]])),restartCount:value.RestartCount,requestedPorts:host.PortBindings,actualPorts:value.NetworkSettings?.Ports,networkMode:host.NetworkMode,limits:{nanoCpus:host.NanoCpus,memory:host.Memory,pids:host.PidsLimit,readOnly:host.ReadonlyRootfs}};
}
export function objectAbsent(result,{network=false,id:expectedId}={}){
 if(expectedId!==undefined)assert.match(expectedId,/^[a-f0-9]{64}$/);
 return result.code===1&&new RegExp(network?'network [a-f0-9]{64} not found':'no such (?:object|container)','i').test(result.stderr||'')&&(!expectedId||(result.stderr||'').includes(expectedId));
}
function inside(root,name){const target=path.resolve(root,name);assert.ok(target.startsWith(path.resolve(root)+path.sep),'Path escapes owned root');return target;}
export async function fileInventory(directory){
 const root=await fs.lstat(directory);assert.ok(root.isDirectory()&&!root.isSymbolicLink(),'Inventory root must be a regular directory');assert.equal(await fs.realpath(directory),path.resolve(directory),'Inventory root cannot redirect');
 const rows=[];let total=0;
 async function visit(base,relative=''){
  for(const entry of (await fs.readdir(base,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){
   const name=relative?relative+'/'+entry.name:entry.name,file=path.join(base,entry.name),s=await fs.lstat(file);
   assert.ok(!s.isSymbolicLink(),'Snapshot symlink forbidden');
   if(s.isDirectory())await visit(file,name);
   else{assert.ok(s.isFile()&&s.size<=256*1024**2,'Snapshot regular-file bound');assert.ok(rows.length<4096&&total+s.size<=2*1024**3,'Snapshot total bound');
    const digest=createHash('sha256');for await(const chunk of createReadStream(file))digest.update(chunk);
    total+=s.size;rows.push({file:name,bytes:s.size,mode:(s.mode&0o777).toString(8).padStart(4,'0'),sha256:digest.digest('hex')});}
  }
 }
 await visit(directory);return rows;
}
export function requireSourceClosure(expected,actual){
 assert.ok(expected.length>10,'Explicit complete source closure required');
 assert.deepEqual(actual.map(r=>r.file).sort(),expected.map(r=>r.file).sort(),'Runtime source file set changed');
 const byFile=new Map(actual.map(r=>[r.file,r]));
 for(const row of expected){const found=byFile.get(row.file);assert.equal(found.blobOid,row.blobOid,'Fixed source blob mismatch: '+row.file);assert.equal(found.mode,row.mode,'Source mode mismatch: '+row.file);}
 return true;
}
export function requireProfileGuard(bytes,{retained,expectedSha256=APPLICATION_GUARD_SHA256,sourceTree=APPLICATION_TREE}={}){
 assert.match(expectedSha256||'',/^[a-f0-9]{64}$/);assert.match(sourceTree||'',/^[a-f0-9]{40}$/);assert.ok(Array.isArray(retained)&&retained.length===10,'Actual ten-pair retained manifest required');assert.equal(sha(bytes),expectedSha256,'Actual candidate guard digest mismatch');const guard=JSON.parse(bytes);
 assert.equal(guard.sourceKind,'git_tree');assert.equal(guard.sourceRevision,sourceTree);assert.equal(guard.nativeRulesChanged,false);assert.deepEqual(guard.retainedArtifacts,retained,'Actual retained manifest differs from guard');
 assert.match(guard.portableProfileSha256||'',/^[a-f0-9]{64}$/,'Validated profile required');assert.match(guard.nativeModelSha256||'',/^[a-f0-9]{64}$/);return{bindingSha256:expectedSha256,nativeProfile:guard.portableProfileSha256,nativeModelSha256:guard.nativeModelSha256};
}
export function packedMatchesSent(packed,input,hero){
 if(!Array.isArray(packed)||packed.length<11||packed.length>13||!input||packed[0]!==input.seq||!(packed[5]&256))return false;
 const rounded=n=>Math.round((n||0)*1e6)/1e6;
 const flags=['fire','reload','walk','crouch','jump','ability','interact','scope','takeover','drop'].reduce((n,k,i)=>n+(k==='takeover'||input[k]?1<<i:0),0);
 return ['x','y','yaw','pitch'].every((k,i)=>packed[i+1]===rounded(input[k]))&&packed[5]===flags&&packed[6]===(input.weapon??null)&&packed[7]===(input.buy??null)&&(hero===undefined||packed[8]===null||packed[8]===hero)&&packed[9]===(input.item||0)&&packed[10]===(input.viewTick??null)&&(packed.length>11?packed[11]:0)===(input.practice||0)&&(packed.length>12?packed[12]:0)===((input.throw_mode||0)+3*(input.preview_item||0));
}
export function pilotViewTick(needsNeutral,snapshotTick){assert.ok(Number.isSafeInteger(snapshotTick)&&snapshotTick>=0);return needsNeutral?snapshotTick:Math.max(0,snapshotTick-4);}
export function pilotJournal(p,roomId){
 assert.match(roomId,/^[a-f0-9]{24}$/);assert.ok(p.inputs.size<=32768&&p.acks.size<=p.inputs.size&&p.contexts.size===p.inputs.size);
 const pick=(value,keys)=>Object.fromEntries(keys.filter(k=>Object.hasOwn(value,k)).map(k=>[k,value[k]]));
 const inputKeys=['seq','x','y','yaw','pitch','fire','reload','walk','crouch','jump','ability','interact','scope','drop','item','practice','throw_mode','preview_item','viewTick'];
 const contextKeys=['room','slot','life','minNativeTick','socketEpoch','ownerEpoch'];
 const snapshotKeys=['room','slot','life','tick','lastSeq','socketEpoch','ownerEpoch'];
 const rows=[];for(const [seq,input]of p.inputs){
  const context=p.contexts.get(seq),ack=p.acks.get(seq),snapshot=p.ackSnapshots.get(seq);assert.equal(input.seq,seq);assert.equal(context.room,roomId);assert.equal(context.slot,p.metrics.slot);
  if(ack){assert.ok(snapshot);assert.equal(ack.seq,seq);assert.equal(ack.life,context.life);assert.equal(snapshot.life,context.life);assert.equal(snapshot.room,context.room);assert.equal(snapshot.slot,context.slot);assert.equal(snapshot.socketEpoch,context.socketEpoch);assert.equal(snapshot.ownerEpoch,context.ownerEpoch);assert.equal(snapshot.lastSeq,seq);assert.ok(ack.tick>context.minNativeTick&&ack.tick<=snapshot.tick);}
  rows.push({seq,input:pick(input,inputKeys),context:pick(context,contextKeys),ack:ack?pick(ack,['version','seq','tick','life','neutral']):null,ackSnapshot:snapshot?pick(snapshot,snapshotKeys):null});
 }
 const document={format:'botstrike-host-pilot-journal-1',room:roomId,slot:p.metrics.slot,rows};const bytes=Buffer.from(JSON.stringify(document)+'\n');assert.ok(bytes.length<=32*1024**2,'Private pilot journal byte bound');return bytes;
}
const pilotActions=['fire','reload','walk','crouch','jump','ability','interact','scope','drop'];
const pilotClientNeutral=input=>!input.x&&!input.y&&!input.item&&!input.practice&&input.weapon==null&&input.buy==null&&!pilotActions.some(k=>input[k]);
const pilotRound=n=>Math.round((n||0)*1e6)/1e6;
function pilotPackedIsNeutral(p,hero){return Array.isArray(p)&&p.length>=11&&p.length<=13&&p[1]===0&&p[2]===0&&p[5]===256&&p[6]===null&&p[7]===null&&(p[8]===null||p[8]===hero)&&p[9]===0&&(p[10]===null||Number.isSafeInteger(p[10]))&&(p.length<=11||p[11]===0)&&(p.length<=12||p[12]===0);}
export function createPilotTapeAudit(journals,heroes){
 assert.ok(Array.isArray(heroes)&&heroes.length===10&&heroes.every(Number.isInteger));let lastTick=0;
 const pilots=journals.map(doc=>{
  assert.equal(doc.format,'botstrike-host-pilot-journal-1');assert.ok(Number.isSafeInteger(doc.slot)&&doc.slot>=0&&doc.slot<10);assert.match(doc.room,/^[a-f0-9]{24}$/);assert.ok(doc.rows.length>0&&doc.rows.length<=32768);
  const rows=new Map(),ackTicks=new Map(),lifeTransitions=[];let previousContext;
  for(const row of doc.rows){
   const c=row.context;assert.ok(Number.isSafeInteger(row.seq)&&row.seq>0&&!rows.has(row.seq));assert.equal(row.input.seq,row.seq);assert.equal(c.room,doc.room);assert.equal(c.slot,doc.slot);for(const k of ['life','socketEpoch','ownerEpoch'])assert.ok(Number.isSafeInteger(c[k])&&c[k]>0);assert.ok(Number.isSafeInteger(c.minNativeTick)&&c.minNativeTick>=0);assert.ok(!previousContext||c.minNativeTick>=previousContext.minNativeTick,'Public snapshot ticks must remain ordered');if(!previousContext||['life','socketEpoch','ownerEpoch'].some(k=>previousContext[k]!==c[k]))lifeTransitions.push(c);previousContext=c;
   if(row.ack){const a=row.ack,s=row.ackSnapshot;assert.deepEqual(Object.keys(a).sort(),['life','neutral','seq','tick','version']);assert.equal(a.version,1);assert.equal(a.seq,row.seq);assert.equal(a.life,c.life);assert.equal(typeof a.neutral,'boolean');for(const k of ['room','slot','life','socketEpoch','ownerEpoch'])assert.equal(s[k],c[k]);assert.equal(s.lastSeq,row.seq);assert.ok(Number.isSafeInteger(a.tick)&&Number.isSafeInteger(s.tick)&&a.tick>c.minNativeTick&&a.tick<=s.tick);assert.ok(!a.neutral||pilotClientNeutral(row.input));assert.ok(!ackTicks.has(a.tick),'Two input ACKs cannot share one slot/tick');ackTicks.set(a.tick,row);}
   rows.set(row.seq,row);
  }
  assert.ok(ackTicks.size>0);return{doc,rows,ackTicks,lifeTransitions,activationTick:Math.min(...ackTicks.keys()),checked:new Set(),active:new Map(),packedFrames:0,fallbacks:[],excluded:new Set()};
 });assert.equal(new Set(pilots.map(p=>p.doc.slot)).size,pilots.length);assert.equal(new Set(pilots.map(p=>p.doc.room)).size,1);
 function fallbackEvidence(p,row,tick){
  const c=row.context;
  for(const next of p.doc.rows){const n=next.context;
   if(n.room!==c.room||n.slot!==c.slot||n.socketEpoch!==c.socketEpoch||n.ownerEpoch!==c.ownerEpoch||n.life===c.life||n.minNativeTick<=c.minNativeTick||n.minNativeTick>tick)continue;
   const fresh=p.doc.rows.find(r=>r.seq>row.seq&&r.ack?.neutral===true&&pilotClientNeutral(r.input)&&r.context.room===c.room&&r.context.slot===c.slot&&r.context.socketEpoch===c.socketEpoch&&r.context.ownerEpoch===c.ownerEpoch&&r.context.life===n.life&&r.context.minNativeTick>=n.minNativeTick&&r.ack.tick>tick);
   if(fresh){let historicalAck=null;if(row.ack){assert.ok(row.ack.tick<n.minNativeTick&&row.ackSnapshot.tick<n.minNativeTick,'Historical ACK and its snapshot must precede the new-life witness');assert.ok(p.checked.has(row.ack.tick),'Historical ACK must already have a literal taped-tick join');historicalAck={tick:row.ack.tick,snapshotTick:row.ackSnapshot.tick,life:row.ack.life};}return{sourceLife:c.life,newLife:n.life,publicWitnessTick:n.minNativeTick,freshNeutralSeq:fresh.seq,freshNeutralTick:fresh.ack.tick,historicalAck,fallbackCreatesAckCredit:false,fallbackCreatesActiveCredit:false};}
  }throw Error('Neutral fallback requires actual public new-life witness and subsequent fresh neutral ACK');
 }
 return{
  frame(tick,inputs){assert.equal(tick,lastTick+1);lastTick=tick;assert.ok(Array.isArray(inputs)&&inputs.length===10);
   for(const p of pilots){const packed=inputs[p.doc.slot],expected=p.ackTicks.get(tick);
    if(tick>=p.activationTick)assert.ok(packed&&(packed[5]&256),'A continuously controlled slot lost takeover');
    if(!packed||!(packed[5]&256)||packed[0]===0){assert.ok(!expected,'Claimed ACK has no controlled taped input');assert.ok(tick<p.activationTick,'Controlled source sequence disappeared after activation');continue;}
    const row=p.rows.get(packed[0]);assert.ok(row,'Controlled taped seq was not actually sent');const hero=heroes[p.doc.slot],exact=packedMatchesSent(packed,row.input,hero);p.packedFrames++;
    if(expected){assert.equal(packed[0],expected.seq);assert.ok(packedMatchesSent(packed,expected.input,hero),'ACK.tick does not contain its original actual input');assert.equal(expected.ack.neutral,pilotPackedIsNeutral(packed,hero));p.checked.add(tick);}
    if(exact){assert.ok(tick>row.context.minNativeTick,'Taped input cannot precede its observed source snapshot');if(!pilotClientNeutral(row.input)){const before=p.lifeTransitions.filter(c=>c.minNativeTick<tick).at(-1);for(const k of ['life','socketEpoch','ownerEpoch'])assert.equal(before?.[k],row.context[k],'Active packet must use the latest publicly observed context');p.active.set(row.seq,(p.active.get(row.seq)||0)+1);}}
    else{assert.ok(pilotPackedIsNeutral(packed,hero)&&packed[10]===null&&packed[3]===pilotRound(row.input.yaw)&&packed[4]===pilotRound(row.input.pitch),'Unexplained active/pulse/hero/aim rewrite');const evidence=fallbackEvidence(p,row,tick);if(!row.ack)p.excluded.add(row.seq);p.fallbacks.push({tick,slot:p.doc.slot,seq:row.seq,...evidence});assert.ok(p.fallbacks.length<=230400,'Fallback evidence bound');}
   }
  },
  finish(expectedTicks){assert.equal(lastTick,expectedTicks);return pilots.map(p=>{assert.equal(p.checked.size,p.ackTicks.size,'Every credited wire ACK must join its exact taped tick');const credited=[...p.active].filter(([seq])=>!p.excluded.has(seq));return{slot:p.doc.slot,packedFrames:p.packedFrames,wireAcksJoined:p.checked.size,activeWireAcksJoined:[...p.ackTicks.values()].filter(r=>!r.ack.neutral).length,distinctActiveRequestsObserved:credited.length,activePackedRequestFramesObserved:credited.reduce((n,[,v])=>n+v,0),neutralFallbackFrames:p.fallbacks.length,fallbackSourceSequencesExcludedFromActiveCredit:[...p.excluded],neutralFallbacks:p.fallbacks};});}
 };
}

async function waitFor(label,predicate,{timeout=20000,poll=50,check=()=>{}}={}){
 const end=performance.now()+timeout;while(performance.now()<end){check();const value=await predicate();if(value)return value;await sleep(poll);}throw Error('Timed out: '+label);
}
async function portReservation(){const server=createServer();await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});return{port:server.address().port,release:()=>new Promise(resolve=>server.close(resolve))};}
async function publicRequest(port,endpoint,{body,cookie='',limit=32*1024**2}={}){
 return new Promise((resolve,reject)=>{
  const bytes=body===undefined?null:Buffer.from(JSON.stringify(body));
  const req=http.request({host:'127.0.0.1',port,path:endpoint,method:bytes?'POST':'GET',headers:{Host:new URL(ORIGIN).host,Origin:ORIGIN,...(cookie?{Cookie:cookie}:{}),...(bytes?{'Content-Type':'application/json','Content-Length':bytes.length}:{})}},res=>{
   const chunks=[];let size=0;res.on('data',chunk=>{size+=chunk.length;if(size>limit)res.destroy(Error('HTTP body bound'));else chunks.push(chunk);});res.on('error',reject);
   res.on('end',()=>{const raw=Buffer.concat(chunks);let value;try{value=JSON.parse(raw);}catch{reject(Error('Expected JSON from owned public host'));return;}resolve({status:res.statusCode,value,raw,cookie:res.headers['set-cookie']?.[0]?.split(';')[0]});});
  });req.setTimeout(20000,()=>req.destroy(Error('Public host timeout')));req.on('error',reject);req.end(bytes);
 });
}
async function guest(port){
 const result=await publicRequest(port,'/games/botstrike/api/guest',{body:{}});assert.equal(result.status,200);assert.ok(result.cookie);const identity=result.value.user?.id;assert.match(identity,/^[a-f0-9]{64}$/);const cookie=result.cookie;
 return{async request(endpoint,body){return publicRequest(port,'/games/botstrike/api'+endpoint,{body,cookie});},async me(){const value=await publicRequest(port,'/api/me',{cookie});assert.equal(value.status,200);assert.equal(value.value.user?.id,identity,'Guest identity changed across container generation');return true;},socket:()=>new WebSocket('ws://127.0.0.1:'+port+'/games/botstrike/api/socket',{headers:{Host:new URL(ORIGIN).host,Origin:ORIGIN,Cookie:cookie}})};
}
async function pilot(session,roomId,check){
 const ws=session.socket(),delivery=trackSocketDelivery(ws),proof=createPilotInputProof(roomId),sent=new Map(),acks=new Map();
 const p={ws,room:null,token:null,sequence:0,ownerEpoch:0,paused:false,needsNeutral:true,life:null,error:null,inputs:sent,contexts:new Map(),acks,ackSnapshots:new Map(),metrics:{sent:0,appliedDistinct:0,activeAppliedDistinct:0,neutralAppliedDistinct:0,maxSendGapMs:0,resyncs:0,slot:null}};
 let lastAt=null,timer,closing=false;
 ws.on('error',()=>{if(!closing)p.error=Error('Healthy public-host WebSocket error');});ws.on('close',()=>{proof.close();if(!closing)p.error=Error('Healthy public-host WebSocket closed');});
 ws.on('message',raw=>{try{
  const m=JSON.parse(raw),ack=proof.receive(m);
  if(m.type==='control'){assert.equal(m.active,true,'Pilot must own its seat');assert.deepEqual(m.inputProtocol,{version:2,maxAgeMs:400});p.token=m.token;p.ownerEpoch++;p.sequence=Math.max(p.sequence,m.nextSeq||0);p.needsNeutral=true;}
  else if(m.type==='state'){
   p.room=m.room;const life=m.room?.state?.players[m.room.slot]?.life;if(life!==p.life){p.life=life;p.needsNeutral=true;}
   const last=m.room?.state?.players[m.room.slot]?.last_seq;if(Number.isSafeInteger(last)&&last>=0)p.sequence=Math.max(p.sequence,last); // allocation only; never an ACK proof
   if(m.room)p.metrics.slot=m.room.slot;
   if(ack&&!acks.has(ack.seq)){const input=sent.get(ack.seq);assert.ok(input,'ACK must refer to known sent input');acks.set(ack.seq,{...ack});p.ackSnapshots.set(ack.seq,{room:m.room.id,slot:m.room.slot,life,tick:m.room.state.tick,lastSeq:m.room.state.players[m.room.slot].last_seq,socketEpoch:1,ownerEpoch:p.ownerEpoch});p.metrics.appliedDistinct++;if(ack.neutral){p.needsNeutral=false;p.metrics.neutralAppliedDistinct++;}else p.metrics.activeAppliedDistinct++;}
  }else if(m.type==='input_resync'){p.metrics.resyncs++;throw Error('Healthy normal host unexpectedly required input resync');}
  else if(m.type==='error')throw Error('Healthy public-host command rejected');
 }catch(error){p.error=error;}});
 p.check=()=>{check();if(p.error)throw p.error;};
 try{await waitFor('public pilot owner',()=>p.token,{check:p.check});}catch(error){closing=true;ws.terminate();throw error;}
 p.action=async body=>{const value=await session.request('/action',{...body,controlToken:p.token});assert.equal(value.status,200,'Public pilot action failed');return value.value;};
 p.close=async()=>{closing=true;clearInterval(timer);proof.close();if(ws.readyState!==WebSocket.CLOSED){ws.close();await Promise.race([new Promise(resolve=>ws.once('close',resolve)),sleep(1000)]);if(ws.readyState!==WebSocket.CLOSED)ws.terminate();}};
 p.start=()=>{timer=setInterval(()=>{try{
  p.check();if(p.paused||p.room?.status!=='running'||p.ws.readyState!==WebSocket.OPEN||!delivery.get(roomId)||p.room.state?.phase==='finished')return;
  assert.ok(sent.size<32768,'Pilot input capture bound');assert.ok(ws.bufferedAmount<16000,'Healthy pilot backpressure');
  const seq=++p.sequence,input={...neutral(),seq,viewTick:pilotViewTick(p.needsNeutral,p.room.state.tick)};
  if(!p.needsNeutral)Object.assign(input,{x:.4*Math.sin(seq/19),y:.3,yaw:p.room.slot<5?0:Math.PI,fire:true});
  const envelope=delivery.envelope(roomId,input);if(!proof.sent(envelope))return;
  const at=performance.now();if(lastAt!==null)p.metrics.maxSendGapMs=Math.max(p.metrics.maxSendGapMs,at-lastAt);lastAt=at;
  sent.set(seq,input);p.contexts.set(seq,{room:roomId,slot:p.room.slot,life:p.life,minNativeTick:p.room.state.tick,socketEpoch:1,ownerEpoch:p.ownerEpoch});ws.send(JSON.stringify(envelope));p.metrics.sent++;
 }catch(error){p.error=error;}},1000/30);};return p;
}
async function expectedSource(ref){
 const env={...process.env};for(const key of Object.keys(env))if(key.startsWith('GIT_'))delete env[key];Object.assign(env,{GIT_OPTIONAL_LOCKS:'0',GIT_NO_REPLACE_OBJECTS:'1',GIT_CONFIG_NOSYSTEM:'1',GIT_CONFIG_GLOBAL:'/dev/null'});
 const args=['ls-tree','-r','-z',ref,'host','botstrike-service','shared','game-host.json','botstrike/spec.json','package.json','package-lock.json','tools/verify-export.mjs'];
 const raw=(await execute('git',args,{cwd:repo,env,maxBuffer:2*1024**2,timeout:20000})).stdout;
 return raw.split('\0').filter(Boolean).map(line=>{const [head,file]=line.split('\t'),[mode,type,blobOid]=head.split(' ');assert.equal(type,'blob');return{file,mode,blobOid};}).filter(r=>!r.file.endsWith('.test.mjs'));
}
async function actualSource(directory){
 const rows=[];
 for(const dir of ['host','botstrike-service','shared'])for(const row of await fileInventory(path.join(directory,dir))){
  if(!row.file.endsWith('.mjs')||row.file.endsWith('.test.mjs'))continue;
  const file=dir+'/'+row.file,bytes=await fs.readFile(path.join(directory,file));rows.push({file,mode:row.mode==='0644'?'100644':row.mode==='0755'?'100755':row.mode,blobOid:blob(bytes),sha256:sha(bytes),bytes:bytes.length});
 }
 for(const file of ['game-host.json','botstrike/spec.json','package.json','package-lock.json','tools/verify-export.mjs']){const p=path.join(directory,file),s=await fs.lstat(p);assert.ok(s.isFile()&&!s.isSymbolicLink());const bytes=await fs.readFile(p);rows.push({file,mode:'100'+(s.mode&0o777).toString(8),blobOid:blob(bytes),sha256:sha(bytes),bytes:bytes.length});}
 return rows;
}
export async function approvedFixtures(directory,expectedReportSha256){
 assert.ok(directory&&path.isAbsolute(directory),'Explicit approved fixture directory required');assert.match(expectedReportSha256||'',/^[a-f0-9]{64}$/,'Explicit approved fixture report SHA required');
 directory=path.resolve(directory);assert.equal(await fs.realpath(directory),directory,'Fixture root cannot redirect');const reportFile=path.join(directory,'report.json'),reportStat=await fs.lstat(reportFile);assert.ok(reportStat.isFile()&&!reportStat.isSymbolicLink()&&reportStat.size<=4*1024**2,'Bounded regular approved report required');const bytes=await fs.readFile(reportFile);assert.equal(sha(bytes),expectedReportSha256,'Approved report mismatch');
 const report=JSON.parse(bytes);assert.equal(report.status,'passed');assert.equal(report.stages?.restoredExports?.length,10);assert.equal(report.stages.activeMatch?.proof?.verified,true);
 const pair=report.stages.rollback.identicalNativePair;
 const rows=[{verifier:report.stages.artifacts.profiles.find(x=>Object.keys(pair).every(k=>x.sha256[k]===pair[k]))?.name,file:'exports/current.json',sha256:report.stages.activeMatch.exportSha256},...(report.stages.retainedFixtures||[]).map(row=>({verifier:row.verifier,file:row.file,sha256:row.exportSha256}))];
 assert.equal(rows.length,10);assert.equal(new Set(rows.map(r=>r.verifier)).size,10);assert.equal(new Set(rows.map(r=>path.basename(r.file))).size,10);
 for(const row of rows){assert.match(row.verifier||'',/^[a-z0-9-]+$/);assert.match(row.sha256||'',/^[a-f0-9]{64}$/);assert.match(row.file,/^exports\/[a-z0-9-]+\.json$/);const file=inside(directory,row.file),s=await fs.lstat(file);assert.ok(s.isFile()&&!s.isSymbolicLink()&&s.size<=64*1024**2);assert.equal(await fs.realpath(file),file,'Approved fixture path cannot redirect');assert.equal(sha(await fs.readFile(file)),row.sha256,'Original approved export changed');}
 return{directory,reportSha256:expectedReportSha256,rows};
}

export async function runHostDeploymentRehearsal({artifactBase,fixtureDirectory,fixtureReportSha256,progress=value=>console.error(JSON.stringify(value))}={}){
 const dockerPrefix=localDockerArguments();assert.ok(artifactBase&&path.isAbsolute(artifactBase),'Explicit HOME artifact base required');const home=await fs.realpath(homedir());artifactBase=await fs.realpath(artifactBase);assert.ok(artifactBase.startsWith(home+path.sep),'Artifacts must be HOME-owned');assert.equal((await fs.stat(artifactBase)).uid,process.getuid());
 const fixtures=await approvedFixtures(fixtureDirectory,fixtureReportSha256),root=await fs.mkdtemp(path.join(artifactBase,'normal-host-deployment-'));await fs.chmod(root,0o700);
 const helpers=['tests/ws-delivery-client.mjs','tools/botstrike-quality-ops-drill.mjs','tools/quality-rollback-bundle.mjs'],helperSha256=Object.fromEntries(await Promise.all(helpers.map(async name=>[name,sha(await fs.readFile(path.join(repo,name)))])));
 const owner=randomUUID(),objects=[],pilots=[],commands=[],report={schemaVersion:1,status:'running',root,owner,driverSha256:sha(await fs.readFile(here)),hostHelperSha256:helperSha256,nodeVersion:process.version,externalHostDriver:true,applicationImage:APPLICATION_IMAGE,sourceTree:APPLICATION_TREE,baseImage:BASE_IMAGE,clock:{runtimeTickMs:1000/64,overrides:false,nativeRulesChanged:false},cohort:{humanParticipants:0,controlledPilots:2,nativeAiSlots:8,configBotsCapable:true},stages:{},limitations:['Local standalone host Docker recreation, not production/Store/Compose rollout or no-downtime migration.','Normally scheduled software inputs are not human, physical-device, public-WAN or capacity acceptance.','No independent live Native-frame observer is injected; exact wire ACK, final packed tape and signed replay are separate evidence.','Old base reads already completed data; its missing pendingIO/drainReady never authorizes a backup.']};
 progress({stage:'allocated',root,driverPid:process.pid,driverSha256:report.driverSha256});
 let aborted=null,sentinelTimer,sentinelBusy=false,sentinelBaseline,networkId,appPort,sentinelPort,reservations=[],envFile;
 const check=()=>{if(aborted)throw aborted;for(const p of pilots)if(p.error)throw p.error;};
 const signal=()=>{aborted=Error('Host rehearsal interrupted');};process.on('SIGINT',signal);process.on('SIGTERM',signal);
 async function save(){await write(path.join(root,'receipt.json'),report);}
 async function docker(args,{failure=false,timeout=60000,maxBuffer=8*1024**2}={}){
  assert.ok(commands.length<1024,'Docker command bound');commands.push({at:Date.now(),args});
  try{const result=await execute('docker',[...dockerPrefix,...args],{encoding:'utf8',timeout,maxBuffer});return failure?{code:0,stdout:result.stdout.trim(),stderr:result.stderr.trim()}:result.stdout.trim();}
  catch(error){if(failure)return{code:typeof error.code==='number'?error.code:null,stdout:String(error.stdout||'').trim(),stderr:String(error.stderr||'').trim()};throw Error('Owned Docker operation failed: '+args[0]+' (exit '+String(error.code)+')');}
 }
 async function inspect(id,network=false){const value=JSON.parse(await docker(network?['network','inspect',id]:['inspect',id]))[0];return requireOwnedObject(value,id,owner,{network});}
 async function create(role,image,args=[],command=[]){assert.ok(role==='sentinel'||command.length===0,'Application CMD override forbidden');const id=await docker(['create','--label',OWNER+'='+owner,'--label','io.utxoplay.host-deployment.role='+role,...args,image,...command]);assert.match(id,/^[a-f0-9]{64}$/);objects.push({id,role});return id;}
 async function preflight(image,ref,role){
  const metadata=JSON.parse(await docker(['image','inspect',image]))[0];assert.equal(metadata.Id,image);assert.deepEqual(metadata.Config.Cmd,['node','host/start.mjs']);assert.deepEqual(metadata.Config.Entrypoint,['docker-entrypoint.sh']);assert.equal(metadata.Config.User,'node');
  for(const key of ['RUNTIME_URL','RUNTIME_BINARY','GAME_HOST_CONFIG'])assert.ok(!(metadata.Config.Env||[]).some(e=>e.startsWith(key+'=')),'Image overrides normal runtime');
  const id=await create('inspect-'+role,image),directory=path.join(root,'image-source-'+role);await fs.mkdir(directory,{mode:0o700});
  for(const item of ['host','botstrike-service','shared','game-host.json','botstrike/spec.json','package.json','package-lock.json','tools/verify-export.mjs','release/verifiers.json',...(ref===APPLICATION_TREE?['build-validation/network-quality/binding.json']:[])]){const target=path.join(directory,item);await fs.mkdir(path.dirname(target),{recursive:true});await docker(['cp',id+':/app/'+item,target]);}
  const actual=await actualSource(directory),expected=await expectedSource(ref);requireSourceClosure(expected,actual);const manifest=await json(path.join(directory,'release/verifiers.json'));assert.equal(manifest.length,10);
  let bound=null;if(ref===APPLICATION_TREE)bound=requireProfileGuard(await fs.readFile(path.join(directory,'build-validation/network-quality/binding.json')),{retained:manifest});
  const config=await json(path.join(directory,'game-host.json'));assert.deepEqual(config.runtimeCommand,['node','botstrike-service/server.mjs']);assert.equal(config.name,'myelin-botstrike');
  return{imageId:image,sourceRef:ref,sourceClosureVerified:true,sourceFiles:actual,retained:manifest,retainedManifestSha256:sha(await fs.readFile(path.join(directory,'release/verifiers.json'))),config,bound};
 }
 async function admin(id,endpoint,body){await inspect(id);const code="const fs=require('fs'),c=JSON.parse(fs.readFileSync('/app/game-host.json'));fetch('http://127.0.0.1:'+(process.env.RUNTIME_PORT||c.runtimePort)+"+JSON.stringify(endpoint)+",{method:"+JSON.stringify(body===undefined?'GET':'POST')+",headers:{'Content-Type':'application/json','X-Runtime-Token':process.env.RUNTIME_TOKEN,'X-UTXOPlay-Account':'0'.repeat(64)},"+(body===undefined?'':'body:'+JSON.stringify(JSON.stringify(body))+',')+"signal:AbortSignal.timeout(20000)}).then(async r=>{if(!r.ok)throw Error('Admin status '+r.status);console.log(JSON.stringify(await r.json()))}).catch(()=>process.exit(1))";return JSON.parse(await docker(['exec',id,'node','-e',code]));}
 async function sentinelSnapshot(id){const value=await inspect(id),r=await publicRequest(sentinelPort,'/');assert.equal(r.status,200);return{id:value.Id,pid:value.State.Pid,startedAt:value.State.StartedAt,restartCount:value.RestartCount,status:r.status,...r.value};}
 async function sampleSentinel(){if(!sentinelBaseline)return;const id=objects.find(o=>o.role==='sentinel').id;const next=await sentinelSnapshot(id);requireSentinel(sentinelBaseline,next);report.sentinel.samples++;}
 async function startApp(role,image,data){
  const bound=report.stages.candidatePreflight.bound;assert.equal(bound.bindingSha256,APPLICATION_GUARD_SHA256);assert.match(bound.nativeProfile,/^[a-f0-9]{64}$/);
  const id=await create(role,image,['--network',networkId,'--read-only','--cap-drop','ALL','--security-opt','no-new-privileges','--cpus','2','--memory','4g','--pids-limit','256','--tmpfs','/tmp:rw,nosuid,nodev,size=32m','--env-file',envFile,'--env','BOTSTRIKE_IMAGE_ID='+image,'--env','BOTSTRIKE_NATIVE_PROFILE='+bound.nativeProfile,'--mount','type=bind,src='+data+',dst=/app/data','--mount','type=bind,src='+path.join(root,'exports')+',dst=/qa-exports,readonly','-p','127.0.0.1:'+appPort+':8080']);
  await docker(['start',id]);const identity=await inspect(id);assert.equal(identity.Image,image);assert.equal(identity.HostConfig.NanoCpus,2000000000);assert.equal(identity.HostConfig.Memory,4294967296);assert.equal(identity.HostConfig.ReadonlyRootfs,true);assert.deepEqual(identity.Config.Cmd,['node','host/start.mjs']);
  assert.equal(identity.HostConfig.PidsLimit,256);assert.equal(identity.Mounts.length,2);for(const mount of identity.Mounts){assert.equal(mount.Type,'bind');assert.equal(mount.Source,mount.Destination==='/app/data'?data:path.join(root,'exports'));assert.ok(['/app/data','/qa-exports'].includes(mount.Destination));assert.equal(mount.RW,mount.Destination==='/app/data');}
  assert.deepEqual(identity.Config.Env.filter(e=>e.startsWith('BOTSTRIKE_NATIVE_PROFILE=')),['BOTSTRIKE_NATIVE_PROFILE='+bound.nativeProfile]);assert.deepEqual(identity.Config.Env.filter(e=>e.startsWith('BOTSTRIKE_IMAGE_ID=')),['BOTSTRIKE_IMAGE_ID='+image]);
  requirePublishedLoopbackPort(identity,8080,appPort);await ready(role,appPort,'/health',30000);
  await sampleSentinel();progress({stage:role,containerId:id,imageId:image,hostPid:identity.State.Pid});return{id,image,pid:identity.State.Pid,startedAt:identity.State.StartedAt,normalImageCommand:true,operatorProfile:{value:bound.nativeProfile,fromActualGuardSha256:bound.bindingSha256,actualConfigVerified:true},limits:{actualNanoCpus:identity.HostConfig.NanoCpus,actualMemoryBytes:identity.HostConfig.Memory,actualPidsLimit:identity.HostConfig.PidsLimit,readOnlyRoot:identity.HostConfig.ReadonlyRootfs},resourceBoundary:'container includes standalone host, runtime Node, Native and verifier; automated clients and host QA driver run outside this cgroup'};
 }
 async function stopApp(app,metrics){
  await inspect(app.id);const at=performance.now();await docker(['stop','--time','10',app.id],{timeout:20000});const stopped=await inspect(app.id);const elapsedMs=performance.now()-at;requireGracefulStop(stopped,elapsedMs);
  if(metrics)requireColdBackup(metrics,stopped);await sampleSentinel();return{exitCode:stopped.State.ExitCode,oomKilled:stopped.State.OOMKilled,elapsedMs,cgroupStopped:true};
 }
 async function snapshot(data,name,metrics,app){const s=await inspect(app.id);requireColdBackup(metrics,s);const target=path.join(root,name),before=await fileInventory(data);await copySnapshot(root,data,target);assert.deepEqual(await fileInventory(target),before,'Cold snapshot bytes/modes changed');return{directory:target,files:before,inventorySha256:sha(JSON.stringify(before))};}
 async function drain(app){await admin(app.id,'/api/admin/drain',{});return waitFor('modern zero-I/O drain',async()=>{const m=await admin(app.id,'/api/metrics');return drainedForBackup(m)?m:false;},{timeout:30000,check});}
 async function verifyExports(app,rows){
  const script="const fs=require('fs'),c=require('crypto'),cp=require('child_process'),file=process.argv[1];function hash(){const s=fs.lstatSync(file);if(!s.isFile()||s.isSymbolicLink()||s.size>64*1024**2)throw Error('Export bound');return c.createHash('sha256').update(fs.readFileSync(file)).digest('hex')}const before=hash(),r=cp.spawnSync(process.execPath,['tools/verify-export.mjs',file],{encoding:'utf8',timeout:280000,maxBuffer:2*1024**2});if(r.status!==0)process.exit(1);console.log(JSON.stringify({beforeSha256:before,afterSha256:hash(),verification:JSON.parse(r.stdout)}))";
  const result=[];for(const row of rows){check();const value=JSON.parse(await docker(['exec',app.id,'node','-e',script,'/qa-exports/'+path.basename(row.file)],{timeout:300000,maxBuffer:2*1024**2}));assert.equal(value.beforeSha256,row.sha256,'Container verification input bytes differ');assert.equal(value.afterSha256,row.sha256,'Container verification input changed');const out=value.verification;assert.equal(out.verified,true);assert.equal(out.verifier,row.verifier);result.push({verifier:out.verifier,verified:true,containerInputSha256:value.beforeSha256,containerInputUnchanged:true});}return result;
 }
 async function qualitySnapshot(app,phase){const at=Date.now(),sample=await admin(app.id,'/api/quality?history=1');const bytes=Buffer.byteLength(JSON.stringify(sample));assert.ok(bytes<=16*1024**2,'Private quality snapshot bound');const name='normal-quality-'+phase+'.json';await write(path.join(root,name),{at,phase,imageId:app.image,applicationContainerId:app.id,normalClock:true,runtimeTickMs:1000/64,limits:app.limits,boundary:app.resourceBoundary,...sample});return{file:name,sha256:sha(await fs.readFile(path.join(root,name))),bytes};}
 async function savePilot(p,roomId,name){const bytes=pilotJournal(p,roomId);await fs.writeFile(path.join(root,name),bytes,{mode:0o600});return{file:name,bytes:bytes.length,sha256:sha(bytes),sent:p.inputs.size,knownApplied:p.acks.size,containsAuthenticationMaterial:false};}
 async function ready(role,port,endpoint,timeout){
  const row={attempts:0,lastError:null};(report.readiness??={})[role]=row;
  await waitFor(role+' readiness',async()=>{row.attempts++;try{const response=await publicRequest(port,endpoint);if(response.status===200){row.lastError=null;row.ready=true;return true;}row.lastError={status:response.status};}catch(error){row.lastError={code:typeof error.code==='string'?error.code:null,message:String(error.message).slice(0,512)};}return false;},{timeout,check});
 }
 try{
  await fs.writeFile(path.join(root,'.host-rehearsal-owner'),owner,{mode:0o600});report.stages.fixtureApproval={reportSha256:fixtures.reportSha256,profiles:fixtures.rows.map(r=>({verifier:r.verifier,sha256:r.sha256}))};
  await fs.mkdir(path.join(root,'exports'),{mode:0o755});for(const row of fixtures.rows){const target=path.join(root,'exports',path.basename(row.file));await fs.copyFile(path.join(fixtures.directory,row.file),target);await fs.chmod(target,0o444);}
  report.stages.candidatePreflight=await preflight(APPLICATION_IMAGE,APPLICATION_TREE,'candidate');report.stages.basePreflight=await preflight(BASE_IMAGE,ROLLBACK_COMMIT,'base');assert.deepEqual(report.stages.candidatePreflight.retained,report.stages.basePreflight.retained,'Retained pairs differ at backout');await save();
  envFile=path.join(root,'.synthetic-env');await fs.writeFile(envFile,'RUNTIME_TOKEN='+randomBytes(32).toString('hex')+'\nSESSION_SECRET='+randomBytes(32).toString('hex')+'\nGAME_ORIGIN='+ORIGIN+'\n',{mode:0o600});
  reservations=[await portReservation(),await portReservation()];appPort=reservations[0].port;sentinelPort=reservations[1].port;networkId=await docker(['network','create','--driver','bridge','--label',OWNER+'='+owner,'botstrike-host-'+owner]);assert.match(networkId,/^[a-f0-9]{64}$/);const actualNetwork=await inspect(networkId,true);assert.equal(actualNetwork.Internal,false);report.network={id:networkId,mode:'owned_user_defined_bridge',internal:actualNetwork.Internal,publication:'127.0.0.1_only',externalRequestsPerformed:false};
  const marker=randomBytes(16).toString('hex'),sentinelCode="const http=require('http'),crypto=require('crypto'),boot=crypto.randomUUID();http.createServer((q,s)=>{s.setHeader('Content-Type','application/json');s.end(JSON.stringify({marker:"+JSON.stringify(marker)+",boot}))}).listen(8081,'0.0.0.0',()=>console.log(JSON.stringify({listening:true,port:8081,pid:process.pid})))";
  const sentinelId=await create('sentinel',APPLICATION_IMAGE,['--network',networkId,'--read-only','--cap-drop','ALL','--security-opt','no-new-privileges','--cpus','0.1','--memory','64m','--pids-limit','16','-p','127.0.0.1:'+sentinelPort+':8081','--entrypoint','node'],['-e',sentinelCode]);
  await Promise.all(reservations.map(r=>r.release()));reservations=[];await docker(['start',sentinelId]);requirePublishedLoopbackPort(await inspect(sentinelId),8081,sentinelPort);await ready('sentinel',sentinelPort,'/',20000);
  sentinelBaseline=await sentinelSnapshot(sentinelId);report.sentinel={baseline:sentinelBaseline,samples:1};sentinelTimer=setInterval(()=>{if(sentinelBusy)return;sentinelBusy=true;sampleSentinel().catch(error=>{aborted=error;}).finally(()=>{sentinelBusy=false;});},1000);
  const data=path.join(root,'live-data');await fs.mkdir(data,{mode:0o700});const a=await startApp('application-A',APPLICATION_IMAGE,data);report.stages.generationA=a;await save();
  const sessions=[await guest(appPort),await guest(appPort)];for(const s of sessions)await s.me();const created=await sessions[0].request('/action',{type:'create',kind:'private',mode:'deathmatch',map:0,hero:0,difficulty:1});assert.equal(created.status,200);const roomId=created.value.room.id;assert.match(roomId,/^[a-f0-9]{24}$/);
  const joined=await sessions[1].request('/action',{type:'join',room:roomId,hero:4});assert.equal(joined.status,200);
  for(const s of sessions){const p=await pilot(s,roomId,check);pilots.push(p);p.start();}await pilots[0].action({type:'start'});
  await waitFor('two genuinely applied public-host controls',()=>pilots.every(p=>p.metrics.activeAppliedDistinct>=3),{check});assert.deepEqual(pilots.map(p=>p.metrics.slot),[0,5]);
  assert.equal(pilots[0].room.roster.filter(row=>row.bot).length,8);report.stages.normalQuality={running:await qualitySnapshot(a,'running'),performanceThresholds:'not asserted; normally scheduled bounded scalar baseline for later review'};
  assert.equal((await sessions[0].request('/admin/drain',{})).status,404,'Admin must not be exposed publicly');assert.equal((await sessions[0].request('/metrics')).status,404,'Metrics must not be exposed publicly');
  const newcomer=await guest(appPort);await admin(a.id,'/api/admin/drain',{});const denied=await sessions[0].request('/action',{type:'create',kind:'private',mode:'deathmatch',map:0,hero:0,difficulty:1});assert.equal(denied.status,400,'Drain must reject new room');assert.equal((await newcomer.request('/action',{type:'join',room:roomId,hero:2})).status,400,'Drain must reject new join');const liveTick=pilots[0].room.state.tick;
  await waitFor('draining existing game continues',()=>pilots.every(p=>p.room?.state?.tick>liveTick+4),{check});
  const healthyStarted=performance.now();let lastProgress=healthyStarted;
  await waitFor('normal-clock complete match and seal',async()=>{
   const now=performance.now();if(now-lastProgress>=30000){lastProgress=now;progress({stage:'normal-match-progress',nativeTicks:pilots[0].room?.state?.tick,status:pilots[0].room?.status,applied:pilots.map(p=>p.metrics.activeAppliedDistinct)});}
   if(pilots[0].room?.status==='running'&&now-healthyStarted>=60000&&!report.stages.normalQuality.steadyRunning)report.stages.normalQuality.steadyRunning=await qualitySnapshot(a,'steady-running');
   if(pilots[0].room?.status==='sealing'&&!report.stages.normalQuality.sealing)report.stages.normalQuality.sealing=await qualitySnapshot(a,'sealing');return pilots[0].room?.status==='finished'&&pilots[0].room.proof?.verified;
  },{timeout:12*60*1000,check});
  report.stages.normalQuality.afterSeal=await qualitySnapshot(a,'after-seal');report.stages.normalQuality.sealing??={status:'not_observed_as_separate_poll; afterSeal retains available bounded history, missed resource samples remain unknown'};
  progress({stage:'normal-match-sealed',nativeTicks:pilots[0].room.state.tick});
  const career=[];for(const s of sessions){const r=await s.request('/career');assert.equal(r.status,200);assert.equal(r.value.matches,1,'Fresh guest earns exactly one completed match');career.push(r.value);}
  const exported=await sessions[0].request('/export');assert.equal(exported.status,200);const ownExport=path.join(root,'exports','deployment-current.json');await fs.writeFile(ownExport,exported.raw,{mode:0o444});const exportSha256=sha(exported.raw);const currentName=report.stages.candidatePreflight.retained.find(r=>r.directory==='.').name;
  const proofProfile=pilots[0].room.proof.profile;assert.equal(proofProfile,report.stages.candidatePreflight.bound.nativeProfile);report.stages.completed={roomId,ticks:pilots[0].room.state.tick,verified:true,proofProfile,exportSha256,pilots:pilots.map(p=>({...p.metrics})),newCreatesRejected:true,continuedAfterDrain:true};
  for(const p of pilots){p.paused=true;assert.ok(p.metrics.activeAppliedDistinct>100,'Complete match needs sustained real applied controls');}for(const p of pilots)await p.close();report.stages.completed.pilotJournals=[];for(let i=0;i<pilots.length;i++)report.stages.completed.pilotJournals.push(await savePilot(pilots[i],roomId,'pilot-A-'+i+'.json'));
  const mA=await drain(a);report.stages.generationA.stop=await stopApp(a,mA);const backup=await snapshot(data,'backup-A',mA,a);report.stages.coldBackupA=backup;
  const roomDir=path.join(data,'rooms',roomId),roomMeta=await json(path.join(roomDir,'room.json'));assert.equal(roomMeta.careerCommitted,true);const protectedBefore=await fileInventory(roomDir);report.stages.completed.originalRoomInventory=protectedBefore;
  const ledgers=await fs.readdir(path.join(data,'careers'));assert.equal(ledgers.length,2);for(const file of ledgers){const value=await json(path.join(data,'careers',file));assert.equal(value.matches,1);assert.deepEqual(Object.keys(value.applied),[roomId]);}
  const journals=[];for(const row of report.stages.completed.pilotJournals){const bytes=await fs.readFile(path.join(root,row.file));assert.equal(sha(bytes),row.sha256);journals.push(JSON.parse(bytes));}
  let tapeAudit,lineNo=0;const lines=createInterface({input:createReadStream(path.join(roomDir,'tape.jsonl')),crlfDelay:Infinity});
  for await(const line of lines){assert.ok(Buffer.byteLength(line)<1024**2,'Tape line bound');const value=JSON.parse(line);if(lineNo++===0){tapeAudit=createPilotTapeAudit(journals,value.config.heroes);continue;}tapeAudit.frame(lineNo-1,value.inputs);}
  const audited=tapeAudit.finish(report.stages.completed.ticks),auditBytes=Buffer.from(JSON.stringify({format:'botstrike-host-tape-audit-1',ticks:lineNo-1,pilots:audited})+'\n');assert.ok(auditBytes.length<=32*1024**2,'Bounded tape audit required');await fs.writeFile(path.join(root,'tape-audit.json'),auditBytes,{mode:0o600});report.stages.completed.tapeAudit={file:'tape-audit.json',sha256:sha(auditBytes),strictAckTickPayloadAndViewJoin:true};
  for(let i=0;i<audited.length;i++){assert.equal(audited[i].wireAcksJoined,report.stages.completed.pilots[i].appliedDistinct);assert.equal(audited[i].activeWireAcksJoined,report.stages.completed.pilots[i].activeAppliedDistinct);assert.ok(audited[i].activeWireAcksJoined>100);report.stages.completed.pilots[i].tape=audited[i];}
  const b=await startApp('application-B',APPLICATION_IMAGE,data);assert.notEqual(a.id,b.id);assert.notEqual(a.startedAt,b.startedAt);report.stages.generationB=b;
  async function persisted(){for(let i=0;i<sessions.length;i++){await sessions[i].me();const c=await sessions[i].request('/career');assert.equal(c.status,200);assert.deepEqual(c.value,career[i]);}const state=await sessions[0].request('/state');assert.equal(state.value.room.id,roomId);assert.equal(state.value.room.proof.verified,true);assert.equal(sha((await sessions[0].request('/export')).raw),exportSha256);assert.deepEqual(await fileInventory(roomDir),protectedBefore);}
  await persisted();report.stages.restoredExports=await verifyExports(b,[...fixtures.rows,{file:'deployment-current.json',verifier:currentName,sha256:exportSha256}]);
  // The guest used for the rejected join also survives the replacement. Give
  // that identity the startup probe, preserving both completed-room bindings.
  await newcomer.me();const short=await newcomer.request('/action',{type:'create',kind:'private',mode:'deathmatch',map:0,hero:0,difficulty:1});assert.equal(short.status,200);const newRoom=short.value.room.id;assert.notEqual(newRoom,roomId);const nextPilot=await pilot(newcomer,newRoom,check);pilots.push(nextPilot);nextPilot.start();await nextPilot.action({type:'start'});
  await waitFor('new match fresh neutral and actual control',()=>nextPilot.metrics.neutralAppliedDistinct>0&&nextPilot.metrics.activeAppliedDistinct>=3,{check});report.stages.newMatch={roomId:newRoom,metrics:{...nextPilot.metrics},completed:false,disposition:'explicit_leave_cancelled_probe'};await nextPilot.action({type:'leave'});await nextPilot.close();report.stages.newMatch.journal=await savePilot(nextPilot,newRoom,'pilot-B-startup.json');const mB=await drain(b);report.stages.generationB.stop=await stopApp(b,mB);report.stages.coldBackupB=await snapshot(data,'backup-B',mB,b);
  const latest=report.stages.coldBackupB,rollbackData=path.join(root,'rollback-data');await copySnapshot(root,latest.directory,rollbackData);assert.deepEqual(await fileInventory(rollbackData),latest.files);const c=await startApp('application-C-base',BASE_IMAGE,rollbackData);report.stages.generationC=c;
  for(let i=0;i<sessions.length;i++){await sessions[i].me();assert.deepEqual((await sessions[i].request('/career')).value,career[i]);}const oldState=await sessions[0].request('/state');assert.equal(oldState.value.room.id,roomId);assert.equal(oldState.value.room.proof.verified,true);assert.equal(sha((await sessions[0].request('/export')).raw),exportSha256);
  report.stages.baseExports=await verifyExports(c,[...fixtures.rows,{file:'deployment-current.json',verifier:currentName,sha256:exportSha256}]);const oldMetrics=await admin(c.id,'/api/metrics');assert.equal(drainedForBackup(oldMetrics),false,'Old metrics cannot authorize modern backup');report.stages.baseReadCompatibility={sameGuests:true,sameCareer:true,sameExport:true,newMatchStarted:false,modernDrainUnsupported:true,sourceClosureVerified:true};report.stages.generationC.stop=await stopApp(c);assert.deepEqual(await fileInventory(path.join(rollbackData,'rooms',roomId)),protectedBefore);
  const ledger=await fileInventory(path.join(data,'careers'));assert.deepEqual(ledger,await fileInventory(path.join(rollbackData,'careers')),'Career ledger changed across generations');await sampleSentinel();report.sentinel.final=await sentinelSnapshot(sentinelId);requireSentinel(sentinelBaseline,report.sentinel.final);
  await approvedFixtures(fixtureDirectory,fixtureReportSha256);assert.equal(sha(await fs.readFile(here)),report.driverSha256,'External host driver changed during execution');for(const [name,digest]of Object.entries(helperSha256))assert.equal(sha(await fs.readFile(path.join(repo,name))),digest,'External host helper changed');report.hostSourcesStable=true;report.status='passed';
 }catch(error){report.status='failed';report.failure={name:error.name,message:error.message};}
 finally{
  clearInterval(sentinelTimer);while(sentinelBusy)await sleep(10);for(const p of pilots)try{await p.close();}catch{}for(const r of reservations)try{await r.release();}catch{}
  const cleanup=[];report.containerDiagnostics=[];
  for(const object of [...objects].reverse())try{
   const value=await inspect(object.id);
   try{const diagnostic={role:object.role,beforeCleanup:containerDiagnostics(value)};
    if(object.role==='sentinel')diagnostic.sentinelLogs=await docker(['logs','--tail','100',object.id],{failure:true,maxBuffer:512*1024});
    const file='container-'+object.role+'-diagnostic.json';await write(path.join(root,file),diagnostic);report.containerDiagnostics.push({file,sha256:sha(await fs.readFile(path.join(root,file)))});
   }catch(error){report.status='failed';(report.diagnosticFailures??=[]).push({id:object.id,role:object.role,message:error.message});}
   if(value.State.Running)await docker(['stop','--time','5',object.id],{timeout:15000});await docker(['rm',object.id]);const result=await docker(['inspect',object.id],{failure:true});assert.ok(objectAbsent(result,{id:object.id}));cleanup.push({id:object.id,role:object.role,removed:true});
  }catch(error){cleanup.push({id:object.id,role:object.role,removed:false,error:error.message});}
  if(networkId)try{await inspect(networkId,true);await docker(['network','rm',networkId]);assert.ok(objectAbsent(await docker(['network','inspect',networkId],{failure:true}),{network:true,id:networkId}));cleanup.push({id:networkId,role:'network',removed:true});}catch(error){cleanup.push({id:networkId,role:'network',removed:false,error:error.message});}
  if(envFile)try{await fs.rm(envFile,{force:true});}catch{cleanup.push({role:'synthetic-secret-file',removed:false,error:'Private temporary secret file removal failed'});}report.cleanup=cleanup;if(cleanup.some(r=>!r.removed)){report.status='failed';report.cleanupFailed=true;}if(aborted){report.status='failed';report.failure??={message:aborted.message};}
  report.finishedAt=new Date().toISOString();await write(path.join(root,'docker-commands.json'),commands);await save();process.off('SIGINT',signal);process.off('SIGTERM',signal);progress({stage:'finished',status:report.status,root,cleanupComplete:!cleanup.some(r=>!r.removed)});
 }
 return report;
}
if(process.argv[1]&&path.resolve(process.argv[1])===here){
 assert.deepEqual(process.argv.slice(2),['--run'],'Explicit --run required');
 runHostDeploymentRehearsal({artifactBase:process.env.BOTSTRIKE_NETWORK_LAB_ROOT,fixtureDirectory:process.env.HOST_REHEARSAL_FIXTURES,fixtureReportSha256:process.env.HOST_REHEARSAL_FIXTURE_REPORT_SHA256}).then(report=>{console.log(JSON.stringify({status:report.status,root:report.root}));if(report.status!=='passed')process.exitCode=1;}).catch(error=>{console.error(error.message);process.exitCode=1;});
}
