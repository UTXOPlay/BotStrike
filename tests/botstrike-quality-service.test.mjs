// Actual runtime HTTP/WebSocket and native processes. Socket write callback
// faults below are explicitly unit fault injection, not transport/netem evidence.
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm,readFile} from 'node:fs/promises';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {WebSocket} from 'ws';
import {spawn} from 'node:child_process';
import {writeAll} from '../botstrike-service/io.mjs';
import {createBotStrike,neutral} from '../botstrike-service/server.mjs';
import {createGameHost} from '../host/server.mjs';
import {trackSocketDelivery} from './ws-delivery-client.mjs';

const account=index=>(index+1).toString(16).padStart(64,'0');
const provenance={sourceRevision:'01dee05'.padEnd(40,'0'),imageId:'sha256:'+'d'.repeat(64),nativeProfile:'c5a72be9466ddd4efa23aa6574541714c8112510ba7f2d7008dd0849f8a9925d'};
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function until(predicate,timeout=5000){const deadline=performance.now()+timeout;while(performance.now()<deadline){const value=await predicate();if(value)return value;await delay(5);}throw Error('Quality service condition timed out');}
function summary(){return{type:'quality',version:1,windowMs:15000,metrics:Object.fromEntries(['appRttMs','inputAckMs','snapshotGapMs','snapshotAgeMs','interpolationAgeTicks','predictionCorrectionUnits','renderFrameMs','mainThreadLongTaskMs'].map(key=>[key,null])),counts:{ackSkipped:0,ackUnmatched:0,pendingExpired:0,disconnects:0,predictionSnaps:0}};}
function observed(store,name,cohort='all'){return store.snapshot().series.find(row=>row.metric===name&&row.cohort===cohort&&row.generation===store.generation);}
function count(store,name,cohort='all'){return observed(store,name,cohort)?.count||0;}
async function fixture(options={}){
 const data=await mkdtemp(path.join(tmpdir(),'botstrike-quality-service-')),secret='private-quality-service-fixture-2050',events=[],sockets=[];let service,base,stopped=true;
 async function start(){service=createBotStrike({data,secret,qualityOptions:{flushIntervalMs:0},qualityProvenance:provenance,sampleResources:false,observe:event=>events.push(event),...options});await new Promise(resolve=>service.server.listen(0,'127.0.0.1',resolve));base='http://127.0.0.1:'+service.server.address().port;stopped=false;await service.quality.ready;}
 const headers=id=>({'Content-Type':'application/json','X-Runtime-Token':secret,'X-UTXOPlay-Account':account(id)});
 async function request(id,endpoint,body,extraHeaders={}){const response=await fetch(base+endpoint,{method:body?'POST':'GET',headers:{...headers(id),...extraHeaders},body:body?JSON.stringify(body):undefined});return{status:response.status,body:await response.json()};}
 const action=(id,body)=>request(id,'/api/action',body);
 async function connect(id){const ws=new WebSocket(base.replace('http','ws')+'/api/socket',{headers:headers(id)}),messages=[],delivery=trackSocketDelivery(ws);sockets.push(ws);ws.on('message',raw=>messages.push(JSON.parse(raw)));await new Promise((resolve,reject)=>{ws.once('open',resolve);ws.once('error',reject);});await until(()=>messages.some(message=>message.type==='control'));const rawSend=value=>ws.send(JSON.stringify(value));return{ws,messages,delivery,rawSend,send:value=>rawSend(value.type==='input'&&!Object.hasOwn(value,'delivery')?delivery.envelope(value.room,value.input):value),control:()=>messages.findLast(message=>message.type==='control'&&message.active)};}
 async function stop(){if(stopped)return;stopped=true;for(const ws of sockets)ws.terminate();await service.close();}
 await start();
 return{data,secret,events,sockets,headers,request,action,connect,stop,start,get service(){return service;},get base(){return base;},cleanup:async()=>{await stop();await rm(data,{recursive:true,force:true});}};
}
const training={type:'create',kind:'practice',mode:'deathmatch',map:0,hero:0,difficulty:0,drill:0};

test('quality stays runtime-private, persists across restart, and WS summary admission remains separate from Native input',async()=>{
 const f=await fixture();let publicHost,publicServer;
 try{
  for(const endpoint of ['/api/quality','/api/quality?history=1','/api/metrics']){
   assert.equal((await fetch(f.base+endpoint)).status,403);assert.equal((await f.request(0,endpoint,undefined,{'X-Runtime-Token':'wrong'})).status,403);
  }
  const created=await f.action(0,training);assert.equal(created.status,200);const room=f.service.rooms.get(created.body.room.id);await until(()=>room.state?.tick>0);
  const owner=await f.connect(0),observer=await f.connect(0),report=summary();assert.deepEqual(owner.control().inputProtocol,{version:1,maxAgeMs:400});report.metrics.appRttMs={n:17,p50:12,p95:30,max:40};
  owner.send(report);owner.send(report);await until(()=>count(f.service.quality,'clientAppRttSamples','practice')===34);
  assert.equal(observed(f.service.quality,'clientAppRttWindowP95Ms','practice').observations,2);
  owner.send(report);observer.send(report);await until(()=>count(f.service.quality,'clientReportsRejected')===2);
  await until(()=>observer.messages.some(message=>message.type==='quality_error')&&owner.messages.some(message=>message.type==='quality_error'));
  assert.equal(observer.messages.filter(message=>message.type==='quality_error').length,1);assert.equal(owner.messages.filter(message=>message.type==='quality_error').length,1);
  owner.send({type:'input',room:room.id,input:{...neutral(),seq:1,x:.25}});await until(()=>room.state.players[0].last_seq===1);
  assert.ok(count(f.service.quality,'inputAccepted')>=1,'summary rejection does not reject accepted Native input');
  const before=performance.now();await until(()=>performance.now()-before>=15050,16000);owner.send(report);
  await until(()=>count(f.service.quality,'clientAppRttSamples','practice')===51);assert.equal(observed(f.service.quality,'clientAppRttWindowP95Ms','practice').observations,3,'one real 15-second refill is admitted');
  const response=await f.request(0,'/api/quality?history=1');assert.equal(response.status,200);const serialized=JSON.stringify(response.body);
  for(const forbidden of [f.secret,account(0),account(1),owner.control().token,room.id,owner.delivery.get(room.id).nonce])assert.equal(serialized.includes(forbidden),false,'broad private metrics contain no account/token/room/receipt identity');
  function noCoordinates(value){if(!value||typeof value!=='object')return;for(const [key,child]of Object.entries(value)){assert.equal(['position','players','yaw','pitch','account','token','ip'].includes(key),false,key);noCoordinates(child);}}
  noCoordinates(response.body);assert.equal(response.body.quality.provenanceBound,true);assert.equal(response.body.resources,null);
  publicHost=createGameHost({config:{name:'quality-private-test',games:[{id:'botstrike',runtimePath:'',webRoot:path.resolve('dist/botstrike'),socket:true}]},origin:'http://127.0.0.1',runtimeUrl:f.base,runtimeToken:f.secret});
  publicServer=publicHost.app.listen(0,'127.0.0.1');await new Promise(resolve=>publicServer.once('listening',resolve));
  const hostBase='http://127.0.0.1:'+publicServer.address().port;
  assert.equal((await fetch(hostBase+'/games/botstrike/api/quality',{headers:f.headers(0)})).status,404,'public host API allowlist never proxies operational quality');
  assert.equal((await fetch(hostBase+'/games/botstrike/api/metrics',{headers:f.headers(0)})).status,404);
  const completedSamples=count(f.service.quality,'clientAppRttSamples','practice'),started=count(f.service.quality,'matchStarted');
  await f.stop();await f.start();assert.equal(count(f.service.quality,'clientAppRttSamples','practice'),completedSamples);assert.equal(count(f.service.quality,'matchStarted'),started);
  const stored=(await f.request(0,'/api/quality')).body.quality;assert.equal(stored.series.find(row=>row.metric==='clientAppRttWindowP95Ms').trust,'untrusted_client');
 }finally{publicHost?.close();if(publicServer)await new Promise(resolve=>publicServer.close(resolve));await f.cleanup();}
});

test('WS validation rejects extra/raw fields atomically and leaves a live seat controllable',async()=>{
 const f=await fixture();
 try{
  const made=await f.action(0,training);const room=f.service.rooms.get(made.body.room.id);await until(()=>room.state?.tick>0);
  let peer=await f.connect(0),seq=0;
  const mutations=[r=>r.account=account(1),r=>r.metrics.position=[9,8,7],r=>r.metrics.appRttMs={n:2,p50:11,p95:10,max:20},r=>r.counts.extra=1,r=>r.windowMs=60001];
  for(const mutate of mutations){
   const invalid=summary();invalid.metrics.renderFrameMs={n:5,p50:10,p95:20,max:30};mutate(invalid);const rejected=count(f.service.quality,'clientReportsRejected');peer.send(invalid);await until(()=>count(f.service.quality,'clientReportsRejected')===rejected+1);
   assert.equal(observed(f.service.quality,'clientFrameWindowP95Ms','practice'),undefined,'invalid report cannot partially ingest valid fields');
   peer.send({type:'input',room:room.id,input:{...neutral(),seq:++seq}});await until(()=>room.state.players[0].last_seq===seq);
   peer.ws.terminate();await new Promise(resolve=>peer.ws.once('close',resolve));await delay(10);peer=await f.connect(0);
  }
  const valid=summary();valid.metrics.renderFrameMs={n:5,p50:10,p95:20,max:30};peer.send(valid);await until(()=>count(f.service.quality,'clientFrameSamples','practice')===5);
 }finally{await f.cleanup();}
});

test('written callbacks and explicit receipt ACKs bound interpolation across owner, life and room generations',async()=>{
 const f=await fixture({tickMs:8}),original=WebSocket.prototype.send,serverPeers=[],blocked=new Set(),held=[];
 WebSocket.prototype.send=function(data,...args){
  let message;try{message=JSON.parse(String(data));}catch{}
  if(this._isServer&&message?.type==='control'&&!serverPeers.includes(this))serverPeers.push(this);
  if(this._isServer&&message?.type==='state'&&blocked.has(this)){held.push({socket:this,data,args,message,callback:args.find(value=>typeof value==='function')});return;}
  return original.call(this,data,...args);
 };
 const deliver=message=>original.call(message.socket,message.data,...message.args);
 try{
  const made=await f.action(0,training),room=f.service.rooms.get(made.body.room.id);await until(()=>room.state?.tick>0);
  const capture=WebSocket.prototype.send;WebSocket.prototype.send=function(data,...args){let m;try{m=JSON.parse(String(data));}catch{}if(this._isServer&&m?.type==='control')blocked.add(this);return capture.call(this,data,...args);};
  const owner=await f.connect(0),observer=await f.connect(0),serverOwner=serverPeers[0],serverObserver=serverPeers[1];WebSocket.prototype.send=capture;
  const initial=held.find(value=>value.socket===serverOwner&&value.message.delivery);assert.ok(initial);const initialTick=initial.message.room.state.tick;
  await until(()=>room.state.tick>=initialTick+14);deliver(initial);await owner.delivery.ready(room.id);
  owner.send({type:'input',room:room.id,input:{...neutral(),seq:100,viewTick:initialTick}});let arrival=await until(()=>f.events.findLast(event=>event.type==='input_arrival'&&event.seq===100));
  assert.equal(arrival.admission.reason,'no_current_history','captured old tick is not mutable room.state.tick');assert.equal(arrival.admission.acceptedViewTick,arrival.admission.oldest+12);
  const failed=held.findLast(value=>value.socket===serverOwner&&value!==initial);failed.callback(Error('injected unit socket write failure'));await until(()=>count(f.service.quality,'snapshotWriteFailures')>=1);
  await until(()=>held.filter(value=>value.socket===serverOwner&&value.message.delivery&&value.message.room.state.tick>=room.state.tick-8).length>=2);
  const fresh=held.filter(value=>value.socket===serverOwner&&value.message.delivery).slice(-2),left=fresh[0].message.room.state.tick,right=fresh[1].message.room.state.tick;assert.ok(right-left>1);
  deliver(fresh[0]);await until(()=>owner.delivery.snapshot()?.tick===left);owner.send({type:'input',room:room.id,input:{...neutral(),seq:101,viewTick:left}});await until(()=>f.events.some(e=>e.type==='input_arrival'&&e.seq===101));
  deliver(fresh[1]);await until(()=>owner.delivery.snapshot()?.tick===right);const requested=left+1;owner.send({type:'input',room:room.id,input:{...neutral(),seq:102,viewTick:requested}});arrival=await until(()=>f.events.findLast(e=>e.type==='input_arrival'&&e.seq===102));
  assert.equal(arrival.admission.acceptedViewTick,requested);assert.equal(arrival.admission.reason,'received_interval','both endpoint receipts were explicitly ACKed');
  const previousOwnerReceipt=owner.delivery.get(room.id),beforeClaim=held.findLast(value=>value.socket===serverObserver);blocked.delete(serverObserver);observer.send({type:'claim',room:room.id});await until(()=>observer.control());await observer.delivery.ready(room.id);beforeClaim.callback();
  observer.rawSend({type:'input',room:room.id,delivery:previousOwnerReceipt,input:{...neutral(),seq:103,fire:true}});await until(()=>f.events.some(e=>e.type==='input_rejected'&&e.seq===103&&e.reason==='unknown'));
  await observer.delivery.ready(room.id);observer.send({type:'input',room:room.id,input:{...neutral(),seq:104,viewTick:requested}});arrival=await until(()=>f.events.findLast(e=>e.type==='input_arrival'&&e.seq===104));assert.ok(arrival.admission.low>left,'old owner ACK endpoints cannot survive claim');
  owner.rawSend({type:'input',room:room.id,delivery:previousOwnerReceipt,input:{...neutral(),seq:999,fire:true}});await delay(15);assert.equal(room.inputs[0].seq,104,'old owner cannot advance sequence or fire');
  const oldLife=room.state.players[0].life,oldLifeReceipt=observer.delivery.get(room.id),lifeFence=held.length;blocked.add(serverObserver);await until(()=>held.slice(lifeFence).some(v=>v.socket===serverObserver&&v.message.delivery&&v.message.room?.state?.players[0]?.life===oldLife));
  const oldLifeCallback=held.slice(lifeFence).findLast(v=>v.socket===serverObserver&&v.message.delivery);blocked.delete(serverObserver);
  observer.send({type:'input',room:room.id,input:{...neutral(),seq:105,practice:1}});observer.send({type:'input',room:room.id,input:{...neutral(),seq:106}});await until(()=>room.state.players[0].life>oldLife);await observer.delivery.ready(room.id,{life:room.state.players[0].life});oldLifeCallback.callback();
  observer.rawSend({type:'input',room:room.id,delivery:oldLifeReceipt,input:{...neutral(),seq:107,fire:true}});await until(()=>f.events.some(e=>e.type==='input_rejected'&&e.seq===107&&e.reason==='old_life'));
  const oldRoomReceipt=observer.delivery.get(room.id),roomFence=held.length;blocked.add(serverObserver);await until(()=>held.slice(roomFence).some(v=>v.socket===serverObserver&&v.message.delivery));const oldRoomCallback=held.slice(roomFence).findLast(v=>v.socket===serverObserver&&v.message.delivery);assert.equal((await f.action(0,{type:'leave',controlToken:observer.control().token})).status,200);
  const next=await f.action(0,training),nextRoom=f.service.rooms.get(next.body.room.id);await until(()=>nextRoom.state?.tick>0);oldRoomCallback.callback();blocked.delete(serverObserver);
  observer.rawSend({type:'input',room:nextRoom.id,delivery:oldRoomReceipt,input:{...neutral(),seq:1,fire:true}});await until(()=>f.events.some(e=>e.type==='input_rejected'&&e.seq===1&&e.room===nextRoom.id&&e.reason==='old_room'));
  await observer.delivery.ready(nextRoom.id);observer.send({type:'input',room:nextRoom.id,input:{...neutral(),seq:2}});await until(()=>nextRoom.state.players[0].last_seq===2);
  assert.equal(nextRoom.proof,undefined);
 }finally{WebSocket.prototype.send=original;await f.cleanup();}
});

test('absolute delivery expiry rejects delayed high-sequence held input and does not renew Native application lease',async()=>{
 const f=await fixture();
 try{
  const made=await f.action(0,training),room=f.service.rooms.get(made.body.room.id);await until(()=>room.state?.tick>0);const owner=await f.connect(0);await owner.delivery.ready(room.id);
  const staleDelivery=owner.delivery.get(room.id);owner.send({type:'input',room:room.id,delivery:staleDelivery,input:{...neutral(),seq:1,x:1,fire:true}});await until(()=>room.state.players[0].last_seq===1);
  const ticket=room.inputDelivery[0],admission=f.events.findLast(e=>e.type==='input_arrival'&&e.seq===1).admission;assert.ok(ticket.deadlineAt>admission.issuedAt);assert.equal(ticket.deadlineAt-admission.issuedAt,400);
  await until(()=>performance.now()>ticket.deadlineAt+40);const beforeSeq=room.inputs[0].seq,beforeSeen=room.seen[0];
  owner.rawSend({type:'input',room:room.id,delivery:staleDelivery,input:{...neutral(),seq:200,x:-1,fire:true,jump:true,item:3,weapon:3}});
  await until(()=>f.events.some(e=>e.type==='input_rejected'&&e.seq===200&&e.reason==='expired'));
  assert.equal(JSON.stringify(f.events).includes(staleDelivery.nonce),false,'diagnostic observer never records the raw receipt nonce');
  assert.equal(room.inputs[0].seq,beforeSeq);assert.equal(room.seen[0],beforeSeen,'late new sequence cannot renew arrival lease');assert.equal(owner.ws.readyState,WebSocket.OPEN);
  await until(()=>f.events.filter(e=>e.type==='native_input'&&e.monotonicMs>ticket.deadlineAt+20).length>=3);
  const after=f.events.filter(e=>e.type==='native_input'&&e.monotonicMs>ticket.deadlineAt+20);
  assert.ok(after.every(e=>{const i=e.inputs[0];return !i||i[1]===0&&i[2]===0&&(i[5]&(1|16))===0&&i[9]===0;}),'expired control is neutral; ordinary Native braking may continue');
  const expiredTicks=new Set(after.map(e=>e.tick));assert.ok(f.events.filter(e=>e.type==='native_frame'&&expiredTicks.has(e.state.tick)).every(e=>!e.state.events.some(v=>v.kind==='shot'&&v.actor===0)),'Native outcomes for the expired-input ticks contain no obsolete shot');
  await until(()=>owner.messages.some(m=>m.type==='input_resync'&&m.code==='stale_delivery'));await owner.delivery.ready(room.id);owner.send({type:'input',room:room.id,input:{...neutral(),seq:201}});await until(()=>room.state.players[0].last_seq===201);
  assert.equal(room.status,'running');assert.equal(room.proof,undefined);
 }finally{await f.cleanup();}
});

test('slow recording crosses expiry, rewrites only the unsent tail, and the persisted tape matches every exact Native frame',async()=>{
 // This is an injected asynchronous filesystem-boundary delay, not netem.
 let armed=false,stage='idle',releaseDelay,releaseCapture;
 const delayGate=new Promise(resolve=>releaseDelay=resolve),captureGate=new Promise(resolve=>releaseCapture=resolve);
 const f=await fixture({tickMs:2,recordWrite:async(fd,line)=>{
  const input=JSON.parse(line).inputs[0];
  if(armed&&input?.[0]===1&&(input[5]&1)){armed=false;stage='delayed';await delayGate;await writeAll(fd,line);stage='awaiting_rewrite';return;}
  if(stage==='awaiting_rewrite'){assert.equal(input[1],0);assert.equal(input[2],0);assert.equal(input[5]&(1|16),0);assert.equal(input[9],0);await writeAll(fd,line);stage='rewritten';return;}
  if(stage==='rewritten'){stage='captured';await captureGate;}
  await writeAll(fd,line);
 }});
 try{
  const made=await f.action(0,training),room=f.service.rooms.get(made.body.room.id);await until(()=>room.state?.tick>0);const owner=await f.connect(0);await owner.delivery.ready(room.id);armed=true;
  owner.send({type:'input',room:room.id,input:{...neutral(),seq:1,x:1,fire:true,jump:true,item:3}});await until(()=>stage==='delayed');
  const deadline=room.inputDelivery[0].deadlineAt;await until(()=>performance.now()>deadline+25);releaseDelay();await until(()=>stage==='captured');
  assert.ok(f.events.some(e=>e.type==='input_rejected'&&e.seq===1&&e.stage==='native_step'&&e.reason==='expired'));
  const applied=f.events.find(e=>e.type==='native_input'&&e.inputs[0]?.[0]===1);assert.ok(applied);assert.equal(applied.inputs[0][1],0);assert.equal(applied.inputs[0][5]&(1|16),0);assert.equal(applied.inputs[0][9],0);
  const tape=await readFile(path.join(f.data,'rooms',room.id,'tape.jsonl'),'utf8'),lines=tape.trim().split('\n');assert.equal(Buffer.byteLength(tape),room.bytes);assert.ok(lines.every(line=>{JSON.parse(line);return true;}));
  const output=await new Promise((resolve,reject)=>{
   const child=spawn(path.resolve('release/botstrike-engine'),[],{stdio:['pipe','pipe','pipe']}),chunks=[];let bytes=0,error='';const timer=setTimeout(()=>child.kill('SIGKILL'),10000);
   child.stdout.on('data',chunk=>{bytes+=chunk.length;if(bytes>4*1024*1024)child.kill('SIGKILL');else chunks.push(chunk);});child.stderr.on('data',chunk=>{if(error.length<2000)error+=chunk;});child.once('error',reject);child.once('close',code=>{clearTimeout(timer);code===0?resolve(Buffer.concat(chunks).toString()):reject(Error('Exact tape replay failed: '+error));});child.stdin.on('error',()=>{});child.stdin.end(tape);
  });
  const replay=output.trim().split('\n').map(JSON.parse),actual=f.events.filter(e=>e.type==='native_frame').map(e=>e.state);
  assert.deepEqual(replay.filter(e=>e.type==='frame').map(e=>e.state),actual,'every frame of the rewritten production tape equals the real Native timeline');assert.equal(actual.at(-1).players[0].last_seq,1);assert.ok(actual.every(state=>!state.events.some(e=>e.kind==='shot'&&e.actor===0)));
  assert.equal(room.status,'running');assert.equal(room.proof,undefined);
 }finally{releaseDelay();releaseCapture();await f.cleanup();}
});

for(const delivery of [undefined,{version:99,nonce:'a'.repeat(32)}])test(`legacy ${delivery?'unsupported':'missing'} receipt is quarantined with a persistent upgrade prompt and no later states`,async()=>{
 const f=await fixture();
 try{
  const made=await f.action(0,training),room=f.service.rooms.get(made.body.room.id);await until(()=>room.state?.tick>0);const peer=await f.connect(0);await peer.delivery.ready(room.id);
  peer.rawSend({type:'input',room:room.id,...(delivery?{delivery}:{}),input:{...neutral(),seq:1,x:1,fire:true}});
  const prompt='Client update required. Reload this page; online match continues.';await until(()=>peer.messages.some(m=>m.type==='error'&&m.error===prompt));
  assert.equal(peer.messages.findLast(m=>m.type==='control').active,false);const states=peer.messages.filter(m=>m.type==='state').length,tick=room.state.tick;
  await until(()=>room.state.tick>tick+8);assert.equal(peer.messages.filter(m=>m.type==='state').length,states,'no later state can overwrite old-client status text');assert.equal(peer.messages.at(-1).error,prompt);
  peer.rawSend({type:'claim',room:room.id});await delay(20);assert.equal(peer.messages.at(-1).error,prompt);assert.equal(peer.messages.filter(m=>m.type==='state').length,states);
  peer.ws.terminate();await new Promise(resolve=>peer.ws.once('close',resolve));await delay(10);const updated=await f.connect(0);await updated.delivery.ready(room.id);updated.send({type:'input',room:room.id,input:{...neutral(),seq:2}});await until(()=>room.state.players[0].last_seq===2);assert.equal(room.status,'running');
 }finally{await f.cleanup();}
});

test('ten automated Tactical seats retain membership on explicit departure but the final departure releases capacity without verification',async()=>{
 const f=await fixture({maxRooms:1}),peers=[];
 try{
  const made=await f.action(0,{type:'create',kind:'private',mode:'demolition',ruleset:'tactical',map:0,hero:0,difficulty:0});assert.equal(made.status,200);const room=f.service.rooms.get(made.body.room.id);
  peers.push(await f.connect(0));
  for(let id=1;id<10;id++){assert.equal((await f.action(id,{type:'join',room:room.id,hero:Math.floor(id/2)})).status,200);peers.push(await f.connect(id));}
  for(let id=0;id<10;id++)assert.equal((await f.action(id,{type:'ready',ready:true,controlToken:peers[id].control().token})).status,200);
  assert.equal((await f.action(0,{type:'start',controlToken:peers[0].control().token})).status,200);await until(()=>room.state?.tick>0);
  const life=room.state.players[0].life,oldDelivery=await peers[0].delivery.ready(room.id,{life});await delay(420);
  const credits=room.state.players[0].credits;
  assert.equal((await f.action(0,{type:'buy',item:12,life,controlToken:peers[0].control().token,delivery:oldDelivery})).status,400,'same-life expired HTTP purchase cannot acquire a new delivery lease');
  assert.equal(room.state.players[0].credits,credits);assert.equal(room.state.players[0].armor,0);
  await peers[1].delivery.ready(room.id);assert.equal((await f.action(0,{type:'buy',item:12,life,controlToken:peers[0].control().token,delivery:peers[1].delivery.get(room.id)})).status,400,'another seat receipt cannot authorize a purchase');
  await peers[0].delivery.ready(room.id);assert.equal((await f.action(0,{type:'buy',item:12,life,controlToken:peers[0].control().token,delivery:peers[0].delivery.get(room.id)})).status,200);await until(()=>room.state.players[0].armor===100);
  assert.equal((await f.action(0,{type:'leave',controlToken:peers[0].control().token})).status,200);assert.equal(room.members[0],account(0));assert.equal(room.departed.has(account(0)),true);assert.equal(room.status,'running');
  assert.equal((await f.action(0,{type:'join',room:room.id,hero:0})).status,200);assert.equal(room.departed.has(account(0)),false,'explicit rejoin restores active reserved seat');
  assert.equal((await f.action(10,{type:'join',room:room.id,hero:0})).status,400,'a newcomer cannot take reserved Tactical ownership');
  for(let id=0;id<10;id++)assert.equal((await f.action(id,{type:'leave',controlToken:peers[id].control().token})).status,200);
  assert.equal(room.status,'cancelled');assert.equal(room.departed.size,10);assert.equal(room.members.length,10);assert.equal(room.proof,undefined);assert.equal(f.service.metrics.verifiedMatches,0);assert.equal(f.service.metrics.sealingJobs,0);
  assert.equal((await f.request(0,'/api/export')).status,409);assert.equal(count(f.service.quality,'matchAbandoned','tactical'),1);assert.equal(count(f.service.quality,'matchCompleted'),0);
  const saved=JSON.parse(await readFile(path.join(f.data,'rooms',room.id,'room.json')));assert.equal(saved.status,'cancelled');assert.equal(saved.departed.length,10);
  const replacement=await f.action(10,{type:'create',kind:'private',mode:'deathmatch',map:0,hero:0,difficulty:0});assert.equal(replacement.status,200,'cancelled incomplete Tactical match no longer consumes maxRooms');
 }finally{await f.cleanup();}
});

test('a tiny real Native practice completion demultiplexes recorder process telemetry before issuing a verified proof',async()=>{
 const f=await fixture({sampleResources:true}),processEvents=[];
 const sampler=f.service.resourceSampler,track=sampler.track.bind(sampler),untrack=sampler.untrack.bind(sampler);
 sampler.track=(role,pid)=>{processEvents.push({event:'spawn',role,pid});return track(role,pid);};sampler.untrack=(role,pid)=>{processEvents.push({event:'exit',role,pid});return untrack(role,pid);};
 try{
  const made=await f.action(0,training),room=f.service.rooms.get(made.body.room.id),peer=await f.connect(0);await until(()=>room.state?.practice);
  peer.send({type:'input',room:room.id,input:{...neutral(),seq:1,practice:2}});
  await until(()=>['finished','failed'].includes(room.status),30000);assert.equal(room.status,'finished',room.error);assert.equal(room.proof?.verified,true,'quality_process is never mistaken for a final worker proof');
  assert.ok(processEvents.some(event=>event.role==='verifier'&&event.event==='spawn'&&Number.isSafeInteger(event.pid)));assert.ok(processEvents.some(event=>event.role==='verifier'&&event.event==='exit'));
  assert.equal(f.service.metrics.verifiedMatches,1);assert.equal(f.service.metrics.sealingFailures,0);assert.equal(f.service.metrics.sealingJobs,0);assert.equal(count(f.service.quality,'sealCompleted'),1);assert.equal(count(f.service.quality,'sealFailures'),0);
  assert.ok(observed(f.service.quality,'sealQueueAgeMs').observations>=1);assert.ok(observed(f.service.quality,'sealDurationMs').observations>=1);assert.equal((await f.request(0,'/api/export')).status,200);
  assert.ok(room.state.tick<512,'explicit practice Finish is a small native replay, not a full-match/load claim');
 }finally{await f.cleanup();}
});
