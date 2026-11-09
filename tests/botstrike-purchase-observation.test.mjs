// One actual release Native + HTTP/WS fixture. Recording delay is explicit
// fault injection; diagnostics never become Native/tape/public protocol fields.
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {WebSocket} from 'ws';
import {createBotStrike} from '../botstrike-service/server.mjs';
import {writeAll} from '../botstrike-service/io.mjs';
import {trackSocketDelivery} from './ws-delivery-client.mjs';
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function until(predicate,timeout=5000){const end=performance.now()+timeout;while(performance.now()<end){const value=await predicate();if(value)return value;await delay(3);}throw Error('Purchase observation fixture timed out');}
test('purchase diagnostics bind only actually dispatched buys to their original admission and omit rewritten buys',async()=>{
 const data=await mkdtemp(path.join(tmpdir(),'botstrike-purchase-observation-')),secret='isolated-purchase-observation-fixture-2050',account='1'.padStart(64,'0'),events=[],messages=[];let gateArmed=false,gated=false,release;
 const gate=new Promise(resolve=>release=resolve),service=createBotStrike({data,secret,sampleResources:false,qualityOptions:{flushIntervalMs:0},observe:event=>events.push(event),recordWrite:async(fd,line)=>{if(gateArmed&&JSON.parse(line).inputs[0]?.[7]===13){gateArmed=false;gated=true;await gate;}await writeAll(fd,line);}});let ws,room;
 try{
  await new Promise(resolve=>service.server.listen(0,'127.0.0.1',resolve));const base='http://127.0.0.1:'+service.server.address().port,headers={'Content-Type':'application/json','X-Runtime-Token':secret,'X-UTXOPlay-Account':account};
  async function action(body){const response=await fetch(base+'/api/action',{method:'POST',headers,body:JSON.stringify(body)});return{status:response.status,body:await response.json()};}
  const made=await action({type:'create',kind:'private',mode:'demolition',map:0,hero:0,difficulty:0});assert.equal(made.status,200);room=service.rooms.get(made.body.room.id);
  ws=new WebSocket(base.replace('http','ws')+'/api/socket',{headers});const delivery=trackSocketDelivery(ws);ws.on('message',raw=>messages.push(JSON.parse(raw)));await new Promise((resolve,reject)=>{ws.once('open',resolve);ws.once('error',reject);});const control=await until(()=>messages.find(message=>message.type==='control'&&message.active));assert.equal((await action({type:'start',controlToken:control.token})).status,200);await delivery.ready(room.id);assert.equal(room.state.phase,'buy');
  const firstReceipt=delivery.get(room.id);assert.equal((await action({type:'buy',item:12,life:room.state.players[0].life,controlToken:control.token,delivery:firstReceipt})).status,200);
  const first=await until(()=>events.find(event=>event.type==='purchase_arrival'));assert.equal(first.requestId,1);assert.equal(first.item,12);assert.equal(first.life,room.state.players[0].life);assert.equal(first.accepted,true);assert.equal(first.deadlineAt,first.issuedAt+400);
  const applied=await until(()=>events.find(event=>event.type==='native_input'&&event.purchaseTickets.some(ticket=>ticket.requestId===1))),ticket=applied.purchaseTickets.find(ticket=>ticket.requestId===1);
  assert.deepEqual(ticket,{slot:0,requestId:1,item:12,life:first.life,issuedAt:first.issuedAt,deadlineAt:first.deadlineAt,generation:first.generation});assert.equal(applied.inputs[0][7],12);assert.ok(applied.monotonicMs<ticket.deadlineAt);await until(()=>room.state.players[0].armor===100);
  const checked=applied.viewAdmissionChecks.checks.find(value=>value.requestId===1);assert.ok(checked);assert.equal(checked.sourceSeq,null);assert.equal(checked.base,false);assert.equal(checked.stage,'post_record');assert.equal(checked.ok,true);assert.equal(checked.deadlineAt,first.deadlineAt);assert.deepEqual(checked.pulseFields,[]);
  gateArmed=true;await delivery.ready(room.id);const delayedReceipt=delivery.get(room.id);assert.equal((await action({type:'buy',item:13,life:room.state.players[0].life,controlToken:control.token,delivery:delayedReceipt})).status,200);await until(()=>gated);
  const second=events.find(event=>event.type==='purchase_arrival'&&event.requestId===2);assert.ok(second);await until(()=>performance.now()>second.deadlineAt+25);release();
  await until(()=>events.some(event=>event.type==='input_rejected'&&event.requestId===2&&event.reason==='expired'&&event.stage==='native_step'));await until(()=>events.some(event=>event.type==='native_input'&&event.monotonicMs>second.deadlineAt));
  assert.equal(events.some(event=>event.type==='native_input'&&event.purchaseTickets.some(ticket=>ticket.requestId===2)),false);assert.equal(events.some(event=>event.type==='native_input'&&event.inputs[0]?.[7]===13),false,'rewritten purchase never reaches Native or its application evidence');
  const failed=events.flatMap(event=>event.type==='native_input'?event.viewAdmissionChecks.checks:[]).find(value=>value.requestId===2);assert.ok(failed);assert.equal(failed.sourceSeq,null);assert.equal(failed.ok,false);assert.equal(failed.reason,'expired');assert.equal(failed.deadlineAt,second.deadlineAt);
  assert.equal((await action({type:'buy',item:14,life:room.state.players[0].life,controlToken:control.token,delivery:delayedReceipt})).status,400);assert.ok(events.some(event=>event.type==='input_rejected'&&event.reason==='expired'&&event.stage==='buy'));assert.equal(events.filter(event=>event.type==='purchase_arrival').length,2,'a rejected HTTP buy grants no private admission ID');
  await delivery.ready(room.id);assert.equal((await action({type:'buy',item:0,life:room.state.players[0].life,controlToken:control.token,delivery:delivery.get(room.id)})).status,200);await until(()=>events.some(event=>event.type==='native_input'&&event.purchaseTickets.some(ticket=>ticket.requestId===3)));
  const diagnostics=JSON.stringify(events);for(const forbidden of [secret,account,control.token,firstReceipt.nonce,delayedReceipt.nonce])assert.equal(diagnostics.includes(forbidden),false,'private diagnostic event contains no account/token/raw nonce');
  const tape=await readFile(path.join(data,'rooms',room.id,'tape.jsonl'),'utf8');for(const forbidden of ['requestId','purchaseTickets','purchase_arrival','deadlineAt','generation'])assert.equal(tape.includes(forbidden),false,'observation never changes replay input fields');assert.equal(room.status,'running');assert.equal(room.proof,undefined);
 }finally{release();ws?.terminate();await service.close();if(room)await until(()=>!room.recordingPending);await rm(data,{recursive:true,force:true});}
});
