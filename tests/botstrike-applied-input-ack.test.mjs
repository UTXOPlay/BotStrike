// Real WS + unchanged release Native. Recording gates are explicit fault fixtures.
import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {WebSocket} from 'ws';
import {createBotStrike,neutral,pack,packedInputIsNeutral} from '../botstrike-service/server.mjs';
import {writeAll} from '../botstrike-service/io.mjs';
import {trackSocketDelivery} from './ws-delivery-client.mjs';

const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function until(predicate,timeout=6000){const end=performance.now()+timeout;while(performance.now()<end){const value=await predicate();if(value)return value;await delay(2);}throw Error('Applied input ACK fixture timed out');}
async function fixture({privateMatch=false,...options}={}){
 const data=await fs.mkdtemp(path.join(tmpdir(),'botstrike-applied-ack-')),secret='applied-ack-private-fixture-2050',account='a'.repeat(64),events=[],peers=[];
 const service=createBotStrike({data,secret,tickMs:8,sampleResources:false,qualityOptions:{flushIntervalMs:0},observe:event=>events.push(event),...options});await new Promise(resolve=>service.server.listen(0,'127.0.0.1',resolve));const base='http://127.0.0.1:'+service.server.address().port,headers={'Content-Type':'application/json','X-Runtime-Token':secret,'X-UTXOPlay-Account':account};
 async function request(endpoint,body){const response=await fetch(base+endpoint,{method:body===undefined?'GET':'POST',headers,body:body===undefined?undefined:JSON.stringify(body)});return{status:response.status,body:await response.json()};}
 const made=await request('/api/action',{type:'create',kind:privateMatch?'private':'practice',mode:'deathmatch',map:0,hero:0,difficulty:0,...(privateMatch?{}:{drill:0})});assert.equal(made.status,200);const room=service.rooms.get(made.body.room.id);
 async function connect(){const ws=new WebSocket(base.replace('http','ws')+'/api/socket',{headers}),messages=[],delivery=trackSocketDelivery(ws);ws.on('message',raw=>messages.push(JSON.parse(raw)));peers.push(ws);await new Promise((resolve,reject)=>{ws.once('open',resolve);ws.once('error',reject);});await until(()=>messages.some(m=>m.type==='control'));return{ws,messages,delivery,send:(input,d=delivery.get(room.id))=>ws.send(JSON.stringify({type:'input',room:room.id,input,delivery:d})),claim:()=>ws.send(JSON.stringify({type:'claim',room:room.id})),control:()=>messages.findLast(m=>m.type==='control'),latest:()=>messages.findLast(m=>m.type==='state')};}
 const owner=await connect();if(privateMatch)assert.equal((await request('/api/action',{type:'start',controlToken:owner.control().token})).status,200);await until(()=>room.state?.tick>=2);await owner.delivery.ready(room.id);
 return{data,service,room,events,owner,connect,request,async cleanup(){for(const ws of peers)ws.terminate();const exited=room.child&&room.child.exitCode===null&&room.child.signalCode===null?new Promise(resolve=>room.child.once('exit',resolve)):Promise.resolve();await service.close();await exited;await until(()=>!room.recordingPending);await fs.rm(data,{recursive:true,force:true});}};
}

test('packed neutral ignores preview/throw metadata while every real control, purchase and practice command remains active',()=>{
 const input={...neutral(),seq:100,takeover:true,hero:0,preview_item:2,throw_mode:2,action_life:1,view_tick:4};assert.equal(packedInputIsNeutral(pack(input)),true);assert.equal(pack(input)[12],8);
 for(const patch of [{x:.5},{y:-.5},{fire:true},{reload:true},{walk:true},{crouch:true},{jump:true},{ability:true},{interact:true},{scope:true},{drop:true},{weapon:0},{buy:0},{item:1},{practice:1}])assert.equal(packedInputIsNeutral(pack({...input,...patch})),false,JSON.stringify(patch));
});

test('real applied neutral ACK is controller-only, excludes HTTP state, and cached v1 inputs require reload',async()=>{
 const f=await fixture();try{
  const passive=await f.connect();assert.deepEqual(f.owner.control().inputProtocol,{version:2,maxAgeMs:400});assert.equal(f.owner.delivery.get(f.room.id).version,2);
  f.owner.send({...neutral(),seq:100,preview_item:2,throw_mode:1});const applied=await until(()=>f.events.find(e=>e.type==='input_ack'&&e.seq===100));assert.equal(applied.neutral,true);assert.equal(applied.version,1);assert.ok(Number.isSafeInteger(applied.generation));
  const message=await until(()=>f.owner.messages.find(m=>m.type==='state'&&m.inputAck?.seq===100));assert.deepEqual(message.inputAck,{version:1,seq:100,tick:applied.tick,life:f.room.state.players[0].life,neutral:true});assert.ok(f.events.some(e=>e.type==='native_input'&&e.tick===applied.tick&&e.inputs[0][0]===100&&(e.inputs[0][5]&256)));
  assert.ok(f.events.some(e=>e.type==='native_frame'&&e.state.tick===applied.tick&&e.state.players[0].last_seq===100));assert.ok(passive.messages.filter(m=>m.type==='state').every(m=>m.inputAck===null));assert.equal(Object.hasOwn((await f.request('/api/state')).body,'inputAck'),false);
  f.owner.send({...neutral(),seq:101,weapon:0});await until(()=>f.events.some(e=>e.type==='input_ack'&&e.seq===101&&!e.neutral));f.owner.send({...neutral(),seq:102,weapon:0});const deduplicated=await until(()=>f.events.find(e=>e.type==='input_ack'&&e.seq===102));assert.equal(deduplicated.neutral,false,'an original client weapon action cannot become a neutral ACK merely because its repeated switch was deduplicated');assert.equal(f.events.find(e=>e.type==='native_input'&&e.tick===deduplicated.tick).inputs[0][6],null);
  const old={...f.owner.delivery.get(f.room.id),version:1};f.owner.send({...neutral(),seq:103},old);await until(()=>f.owner.messages.some(m=>m.type==='error'&&/Client update required/.test(m.error)));assert.equal(f.owner.control().active,false);const states=f.owner.messages.filter(m=>m.type==='state').length;await delay(80);assert.equal(f.owner.messages.filter(m=>m.type==='state').length,states);assert.equal(f.room.status,'running');assert.ok(f.events.some(e=>e.type==='input_rejected'&&e.seq===103&&e.reason==='unsupported_version'));
 }finally{await f.cleanup();}
});

test('actual Native AI last_seq collision cannot be reported as applied controller ACK',async()=>{
 const f=await fixture({privateMatch:true,tickMs:70});try{
  const before=await until(()=>{const frame=f.events.findLast(e=>e.type==='native_frame');return frame?.state.tick>=2&&frame.state.players[0].last_seq===frame.state.tick?frame:null;});const seq=before.state.tick;f.owner.send({...neutral(),seq});await until(()=>f.events.some(e=>e.type==='input_arrival'&&e.seq===seq));
  const input=await until(()=>f.events.find(e=>e.type==='native_input'&&e.tick>before.state.tick&&e.inputs[0]?.[0]===seq&&(e.inputs[0][5]&256)));const frame=await until(()=>f.events.find(e=>e.type==='native_frame'&&e.state.tick===input.tick));assert.equal(frame.state.players[0].last_seq,seq);assert.equal(before.state.players[0].last_seq,seq);assert.ok(!f.events.some(e=>e.type==='input_ack'&&e.seq===seq),'unchanged Native seq is not fresh human-control evidence');
  f.owner.send({...neutral(),seq:seq+100,preview_item:2});await until(()=>f.events.some(e=>e.type==='input_ack'&&e.seq===seq+100&&e.neutral));
 }finally{await f.cleanup();}
});

test('coalesced later neutral gets its own exact ACK and a latched Use cannot make that ACK neutral',async()=>{
 let armed=false,gated=false,release;const gate=new Promise(resolve=>release=resolve);const f=await fixture({tickMs:35,recordWrite:async(fd,line)=>{if(armed){armed=false;gated=true;await gate;}await writeAll(fd,line);}});
 try{
  armed=true;await until(()=>gated);f.owner.send({...neutral(),seq:100});f.owner.send({...neutral(),seq:101,preview_item:2});await until(()=>f.room.inputs[0].seq===101);release();const ack=await until(()=>f.events.find(e=>e.type==='input_ack'&&e.seq===101));assert.equal(ack.neutral,true);assert.ok(!f.events.some(e=>e.type==='native_input'&&e.inputs[0]?.[0]===100));assert.ok(!f.events.some(e=>e.type==='input_ack'&&e.seq===100));
  f.owner.send({...neutral(),seq:102,interact:true});f.owner.send({...neutral(),seq:103});await until(()=>f.room.inputs[0].seq===103);const useAck=await until(()=>f.events.find(e=>e.type==='input_ack'&&e.seq===103));assert.equal(useAck.neutral,false,'original neutral plus an actually applied short Use is not a neutral acknowledgement');
  f.owner.send({...neutral(),seq:104});await until(()=>f.events.some(e=>e.type==='input_ack'&&e.seq===104&&e.neutral));
 }finally{release();await f.cleanup();}
});

test('an expired unsent recording tail may keep its Native sequence but never creates an input ACK',async()=>{
 let blocked=false,release;const gate=new Promise(resolve=>release=resolve);const f=await fixture({recordWrite:async(fd,line)=>{const input=JSON.parse(line).inputs[0];if(input?.[0]===100&&input[1]&&!blocked){blocked=true;await gate;}await writeAll(fd,line);}});
 try{
  f.owner.send({...neutral(),seq:100,x:1,fire:true});const arrival=await until(()=>f.events.find(e=>e.type==='input_arrival'&&e.seq===100));await until(()=>blocked);await delay(Math.max(0,arrival.admission.deadlineAt-performance.now()+25));release();const input=await until(()=>f.events.find(e=>e.type==='native_input'&&e.inputs[0]?.[0]===100));assert.equal(packedInputIsNeutral(input.inputs[0]),true);await until(()=>f.events.some(e=>e.type==='native_frame'&&e.state.tick===input.tick&&e.state.players[0].last_seq===100));await delay(50);assert.ok(!f.events.some(e=>e.type==='input_ack'&&e.seq===100));assert.ok(f.owner.messages.filter(m=>m.type==='state').every(m=>m.inputAck?.seq!==100));
  await f.owner.delivery.ready(f.room.id);f.owner.send({...neutral(),seq:101});await until(()=>f.events.some(e=>e.type==='input_ack'&&e.seq===101&&e.neutral));
 }finally{release();await f.cleanup();}
});

test('pending old-owner recording cannot ACK a new owner; real new life clears the old applied ACK',async()=>{
 let armed=false,gated=false,release;const gate=new Promise(resolve=>release=resolve);const f=await fixture({recordWrite:async(fd,line)=>{if(armed){armed=false;gated=true;await gate;}await writeAll(fd,line);}});
 try{
  f.owner.send({...neutral(),seq:100});await until(()=>f.events.some(e=>e.type==='input_ack'&&e.seq===100));const next=await f.connect();armed=true;await until(()=>gated);f.owner.send({...neutral(),seq:101,x:1});await until(()=>f.room.inputs[0].seq===101);next.claim();await until(()=>next.control().active&&f.owner.control().active===false);await next.delivery.ready(f.room.id);release();await delay(60);assert.ok(!f.events.some(e=>e.type==='input_ack'&&e.seq===101));assert.ok(next.messages.filter(m=>m.type==='state').every(m=>m.inputAck?.seq!==100&&m.inputAck?.seq!==101));
  next.send({...neutral(),seq:102});await until(()=>f.events.some(e=>e.type==='input_ack'&&e.seq===102));await until(()=>next.messages.some(m=>m.type==='state'&&m.inputAck?.seq===102));const life=f.room.state.players[0].life;next.send({...neutral(),seq:103,practice:1});await until(()=>f.room.state.players[0].life>life);const changed=await until(()=>next.messages.find(m=>m.type==='state'&&m.room?.state?.players[0]?.life>life));assert.equal(changed.inputAck,null);assert.ok(!f.events.some(e=>e.type==='input_ack'&&e.seq===103));await next.delivery.ready(f.room.id,{life:f.room.state.players[0].life});next.send({...neutral(),seq:104});await until(()=>f.events.some(e=>e.type==='input_ack'&&e.seq===104&&e.life>life));assert.ok(f.owner.messages.filter(m=>m.type==='state').every(m=>m.inputAck?.seq!==102&&m.inputAck?.seq!==104));
 }finally{release();await f.cleanup();}
});
