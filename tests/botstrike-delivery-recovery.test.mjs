// Real WS + release Native fixtures. Slow recording is explicit fault injection,
// and tickMs:2 accelerates fixture scheduling; neither is internet evidence.
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {WebSocket} from 'ws';
import {createBotStrike,neutral} from '../botstrike-service/server.mjs';
import {writeAll} from '../botstrike-service/io.mjs';
import {trackSocketDelivery} from './ws-delivery-client.mjs';

const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function until(predicate,timeout=5000){const end=performance.now()+timeout;while(performance.now()<end){const value=await predicate();if(value)return value;await delay(3);}throw Error('Delivery recovery fixture timed out');}
async function fixture(options={}){
 const data=await mkdtemp(path.join(tmpdir(),'botstrike-delivery-recovery-')),secret='isolated-delivery-recovery-fixture-2050',events=[],messages=[],account='1'.padStart(64,'0');
 const service=createBotStrike({data,secret,sampleResources:false,qualityOptions:{flushIntervalMs:0},observe:event=>events.push(event),...options});
 await new Promise(resolve=>service.server.listen(0,'127.0.0.1',resolve));await service.quality.ready;
 const base='http://127.0.0.1:'+service.server.address().port,headers={'Content-Type':'application/json','X-Runtime-Token':secret,'X-UTXOPlay-Account':account};
 let ws;
 try{
  const response=await fetch(base+'/api/action',{method:'POST',headers,body:JSON.stringify({type:'create',kind:'practice',mode:'deathmatch',map:0,hero:0,difficulty:0,drill:0})});assert.equal(response.status,200);const result=await response.json(),room=service.rooms.get(result.room.id);await until(()=>room.state?.tick>0);
  ws=new WebSocket(base.replace('http','ws')+'/api/socket',{headers});const delivery=trackSocketDelivery(ws);ws.on('message',raw=>messages.push(JSON.parse(raw)));await new Promise((resolve,reject)=>{ws.once('open',resolve);ws.once('error',reject);});await delivery.ready(room.id);
  return{data,service,events,messages,room,delivery,send:(input,receipt=delivery.get(room.id))=>ws.send(JSON.stringify({type:'input',room:room.id,input,delivery:receipt})),cleanup:async()=>{ws.terminate();await service.close();await until(()=>!room.recordingPending);await rm(data,{recursive:true,force:true});}};
 }catch(error){ws?.terminate();await service.close();await rm(data,{recursive:true,force:true});throw error;}
}
const resyncs=f=>f.messages.filter(message=>message.type==='input_resync');
const rejection=(f,seq,stage)=>f.events.find(event=>event.type==='input_rejected'&&event.seq===seq&&event.stage===stage&&event.reason==='expired');

test('idle preview/mode expiry revokes its lease without a menu; late neutral is rejected and cannot suppress subsequent action recovery',async()=>{
 const f=await fixture();
 try{
  const neverAcknowledged=f.delivery.get(f.room.id);await until(()=>f.delivery.get(f.room.id)?.nonce!==neverAcknowledged.nonce);
  f.send({...neutral(),seq:1,preview_item:2,throw_mode:2,viewTick:f.room.state.tick});await until(()=>f.room.state.players[0].last_seq===1);
  const ticket=f.room.inputDelivery[0],seen=f.room.seen[0],receipts=ticket.ws.deliveryReceipts;
  assert.equal(receipts.entries.get(neverAcknowledged.nonce).acknowledged,false);
  const expired=await until(()=>rejection(f,1,'native_step'));await until(()=>f.messages.some(message=>message.type==='state'&&message.room?.state?.tick>f.room.state.tick-4));
  assert.equal(f.room.inputDelivery[0],null);assert.equal(f.room.seen[0],seen);assert.equal(f.room.inputs[0].seq,1);assert.deepEqual(f.room.pulses[0],{});assert.equal(f.room.weaponRequests[0],null);assert.equal(resyncs(f).length,0);
  f.send({...neutral(),seq:200,preview_item:2,throw_mode:2,viewTick:0},neverAcknowledged);await until(()=>rejection(f,200,'arrival'));await delay(10);
  assert.equal(resyncs(f).length,0,'idle rejection must not force an otherwise live client into recovery UI');assert.equal(receipts.entries.get(neverAcknowledged.nonce).acknowledged,false,'expired neutral cannot grant ACK history');
  assert.equal(f.room.inputs[0].seq,1);assert.equal(f.room.seen[0],seen);
  // This arrives inside the idle refresh's 250ms budget. Actual action recovery
  // has its own bounded notification budget and must still notify the client.
  f.send({...neutral(),seq:201,fire:true,x:1,item:3,weapon:3},neverAcknowledged);await until(()=>rejection(f,201,'arrival'));await until(()=>resyncs(f).length===1);
  assert.equal(f.room.inputs[0].seq,1);assert.equal(f.room.seen[0],seen);assert.deepEqual(f.room.pulses[0],{});assert.equal(f.room.weaponRequests[0],null);
  await until(()=>f.events.filter(event=>event.type==='native_input'&&event.monotonicMs>expired.monotonicMs).length>=3);
  const after=f.events.filter(event=>event.type==='native_input'&&event.monotonicMs>expired.monotonicMs);
  assert.ok(after.every(event=>{const input=event.inputs[0];return input[0]===1&&input[1]===0&&input[2]===0&&(input[5]&255)===0&&input[9]===0&&input[12]===undefined;}),'expired preview/mode and late action never enter Native');
  const count=resyncs(f).length;for(let seq=202;seq<208;seq++)f.send({...neutral(),seq,fire:true},neverAcknowledged);await until(()=>rejection(f,207,'arrival'));await delay(10);assert.equal(resyncs(f).length,count,'repeated action failures retain the 250ms notification bound');
  assert.equal(f.room.status,'running');assert.equal(f.room.proof,undefined);
 }finally{await f.cleanup();}
});

test('expiry of retained held movement/fire still notifies recovery and sends only neutral controls after its absolute deadline',async()=>{
 const f=await fixture();
 try{
  f.send({...neutral(),seq:1,x:1,fire:true,preview_item:2});await until(()=>f.room.state.players[0].last_seq===1);const ticket=f.room.inputDelivery[0],seen=f.room.seen[0];
  await until(()=>rejection(f,1,'native_step'));await until(()=>resyncs(f).length===1);
  await until(()=>f.events.filter(event=>event.type==='native_input'&&event.monotonicMs>ticket.deadlineAt+20).length>=3);
  const after=f.events.filter(event=>event.type==='native_input'&&event.monotonicMs>ticket.deadlineAt+20);
  assert.ok(after.every(event=>{const input=event.inputs[0];return input[1]===0&&input[2]===0&&(input[5]&255)===0&&input[9]===0&&input[12]===undefined;}));
  const ticks=new Set(after.map(event=>event.tick));assert.ok(f.events.filter(event=>event.type==='native_frame'&&ticks.has(event.state.tick)).every(event=>!event.state.events.some(value=>value.kind==='shot'&&value.actor===0)));
  assert.equal(f.room.inputDelivery[0],null);assert.equal(f.room.seen[0],seen);assert.equal(f.room.inputs[0].seq,1);assert.equal(f.room.status,'running');
 }finally{await f.cleanup();}
});

test('slow recording still rewrites expired configuration-only preview before Native without a resync notification',async()=>{
 let armed=false,stage='idle',releaseDelay,releaseCapture;
 const delayGate=new Promise(resolve=>releaseDelay=resolve),captureGate=new Promise(resolve=>releaseCapture=resolve);
 const f=await fixture({tickMs:2,recordWrite:async(fd,line)=>{
  const input=JSON.parse(line).inputs[0];
  if(armed&&input?.[0]===1&&input[12]===8){armed=false;stage='delayed';await delayGate;await writeAll(fd,line);stage='needs_rewrite';return;}
  if(stage==='needs_rewrite'){assert.equal(input[12],undefined);await writeAll(fd,line);stage='rewritten';return;}
  if(stage==='rewritten'){stage='captured';await captureGate;}
  await writeAll(fd,line);
 }});
 try{
  armed=true;f.send({...neutral(),seq:1,preview_item:2,throw_mode:2});await until(()=>stage==='delayed');const ticket=f.room.inputDelivery[0];await until(()=>performance.now()>ticket.deadlineAt+25);releaseDelay();await until(()=>stage==='captured');
  assert.ok(rejection(f,1,'native_step'));assert.equal(resyncs(f).length,0);assert.equal(f.room.inputDelivery[0],null);
  const tape=await readFile(path.join(f.data,'rooms',f.room.id,'tape.jsonl'),'utf8'),lines=tape.trim().split('\n').map(JSON.parse),committed=f.events.filter(event=>event.type==='native_input');
  assert.equal(Buffer.byteLength(tape),f.room.bytes);assert.deepEqual(lines.slice(1).map(line=>line.inputs),committed.map(event=>event.inputs),'no stale preview, duplicate line, offset hole, or unsent prospective tail survives');
  const final=committed.at(-1);assert.equal(final.inputs[0][0],1);assert.equal(final.inputs[0][12],undefined);assert.equal(f.events.filter(event=>event.type==='native_frame').at(-1).state.tick,final.tick,'the rewritten line actually completed in the release Native engine');assert.equal(f.room.status,'running');assert.equal(f.room.proof,undefined);
 }finally{releaseDelay();releaseCapture();await f.cleanup();}
});
