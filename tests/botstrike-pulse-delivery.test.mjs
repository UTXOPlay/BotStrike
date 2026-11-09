// Actual WS + release Native; delayed recording is an explicit injected gate.
import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {createHash} from 'node:crypto';
import {neutral} from '../botstrike-service/server.mjs';
import {writeAll} from '../botstrike-service/io.mjs';
import {observerFixture,until,delay} from './botstrike-observer-fixture.mjs';

test('a latched old action cannot borrow a same-owner fresh neutral delivery ticket',async()=>{
 let armed=false,gated=false,release;const gate=new Promise(resolve=>release=resolve);
 const f=await observerFixture({recordWrite:async(fd,line)=>{if(armed){armed=false;gated=true;await gate;}await writeAll(fd,line);}});
 const artifact=await fs.mkdtemp(path.join(process.env.BOTSTRIKE_PULSE_EVIDENCE_ROOT||tmpdir(),'pulse-provenance-'));await fs.chmod(artifact,0o700);
 try{
  const oldDelivery=f.delivery.get(f.room.id);f.send({...neutral(),seq:1},oldDelivery);await until(()=>f.room.inputDelivery[0]?.nonce===oldDelivery.nonce);const old=f.room.inputDelivery[0],token=f.messages.findLast(message=>message.type==='control').token;
  armed=true;await until(()=>gated);await delay(Math.max(0,old.deadlineAt-performance.now()-14));await until(()=>performance.now()>=old.deadlineAt-12);
  f.send({...neutral(),seq:100,fire:true,jump:true,interact:true,drop:true,weapon:2,item:3},oldDelivery);
  const arrival=await until(()=>f.events.find(event=>event.type==='input_arrival'&&event.seq===100));assert.ok(arrival.monotonicMs<old.deadlineAt&&arrival.monotonicMs>=old.deadlineAt-20);
  await until(()=>performance.now()>old.deadlineAt+25);f.claim();await until(()=>f.messages.findLast(message=>message.type==='control').token===token&&f.delivery.get(f.room.id)?.nonce!==oldDelivery.nonce);
  const fresh=f.delivery.get(f.room.id);f.send({...neutral(),seq:101},fresh);const renewed=await until(()=>f.events.find(event=>event.type==='input_arrival'&&event.seq===101));assert.ok(renewed.admission.deadlineAt>old.deadlineAt);release();
  const applied=await until(()=>f.events.find(event=>event.type==='native_input'&&event.inputs[0]?.[0]===101));
  const native=await until(()=>f.events.find(event=>event.type==='native_frame'&&event.state.players[0].last_seq===101));
  const packed=applied.inputs[0],unsafe=!!(packed[5]&(1|16|64|512)||packed[6]!==null||packed[9]);
  const report={status:unsafe?'reproduced_old_pulse_renewal':'protected',serverSha256:createHash('sha256').update(await fs.readFile(new URL('../botstrike-service/server.mjs',import.meta.url))).digest('hex'),scope:'Actual isolated WS/Native, explicit recordWrite gate; no network or human acceptance',old:{sourceSeq:100,issuedAt:arrival.admission.issuedAt,deadlineAt:old.deadlineAt,arrivedAt:arrival.monotonicMs},fresh:{seq:101,issuedAt:renewed.admission.issuedAt,deadlineAt:renewed.admission.deadlineAt},applied:{at:applied.monotonicMs,packed,pulseTickets:applied.pulseTickets??null},unsafe};
  await fs.writeFile(path.join(artifact,'report.json'),JSON.stringify(report,null,2)+'\n',{mode:0o600});await fs.writeFile(path.join(artifact,'runtime.jsonl'),f.events.map(event=>JSON.stringify(event)).join('\n')+'\n',{mode:0o600});await fs.copyFile(path.join(f.data,'rooms',f.room.id,'tape.jsonl'),path.join(artifact,'tape.jsonl'));
  console.log('Private pulse provenance evidence: '+artifact);assert.equal(unsafe,false,'obsolete pulse was applied under fresh neutral seq101 after its original absolute deadline');assert.equal(applied.monotonicMs>old.deadlineAt,true);assert.equal(native.state.players[0].shots,0);assert.deepEqual(applied.pulseTickets,[]);assert.deepEqual(f.room.pulseDelivery[0],{});
 }finally{release();await f.cleanup();}
});

test('a fresh short Use survives a following neutral packet and keeps its original field ticket exactly once',async()=>{
 let armed=false,gated=false,release;const gate=new Promise(resolve=>release=resolve);
 const f=await observerFixture({recordWrite:async(fd,line)=>{if(armed){armed=false;gated=true;await gate;}await writeAll(fd,line);}});
 try{
  f.send({...neutral(),seq:1});await until(()=>f.room.inputs[0].seq===1);armed=true;await until(()=>gated);
  f.send({...neutral(),seq:100,interact:true});const original=await until(()=>f.events.find(event=>event.type==='input_arrival'&&event.seq===100));f.send({...neutral(),seq:101});await until(()=>f.room.inputs[0].seq===101);release();
  const applied=await until(()=>f.events.find(event=>event.type==='native_input'&&event.inputs[0]?.[0]===101));assert.equal(applied.inputs[0][5]&64,64);
  assert.deepEqual(applied.pulseTickets,[{slot:0,field:'interact',sourceSeq:100,issuedAt:original.admission.issuedAt,deadlineAt:original.admission.deadlineAt,generation:original.admission.generation,life:f.room.state.players[0].life}]);assert.ok(applied.monotonicMs<original.admission.deadlineAt);
  const checks=applied.viewAdmissionChecks.checks;assert.ok(checks.some(value=>value.slot===0&&value.base&&value.sourceSeq===101&&value.stage==='ack_candidate'&&value.ok));assert.ok(checks.some(value=>value.slot===0&&!value.base&&value.sourceSeq===100&&value.stage==='post_record'&&value.pulseFields.includes('interact')&&value.ok&&value.deadlineAt===original.admission.deadlineAt));
  await until(()=>f.events.some(event=>event.type==='native_frame'&&event.state.tick===applied.tick));const next=await until(()=>f.events.find(event=>event.type==='native_input'&&event.tick>applied.tick));assert.equal(next.inputs[0][5]&64,0);assert.deepEqual(next.pulseTickets,[]);assert.deepEqual(f.room.pulseDelivery[0],{});
 }finally{release();await f.cleanup();}
});

test('an individually fresh selected pulse is checked again after slow recording even when its neutral base has a later valid deadline',async()=>{
 let stage='idle',releasePre,releasePulse;const preGate=new Promise(resolve=>releasePre=resolve),pulseGate=new Promise(resolve=>releasePulse=resolve);
 const f=await observerFixture({recordWrite:async(fd,line)=>{
  const input=JSON.parse(line).inputs[0];
  if(stage==='arm_pre'){stage='pre_blocked';await preGate;stage='pre_released';}
  else if(stage==='pre_released'&&input?.[0]===101&&(input[5]&1)){stage='pulse_blocked';await pulseGate;stage='pulse_released';}
  await writeAll(fd,line);
 }});
 try{
  const oldDelivery=f.delivery.get(f.room.id);f.send({...neutral(),seq:1},oldDelivery);await until(()=>f.room.inputs[0].seq===1);const old=f.room.inputDelivery[0];stage='arm_pre';await until(()=>stage==='pre_blocked');
  await delay(Math.max(0,old.deadlineAt-performance.now()-90));f.send({...neutral(),seq:100,fire:true},oldDelivery);await until(()=>f.events.some(event=>event.type==='input_arrival'&&event.seq===100));f.claim();await until(()=>f.delivery.get(f.room.id)?.nonce!==oldDelivery.nonce);f.send({...neutral(),seq:101});await until(()=>f.room.inputs[0].seq===101);const fresh=f.room.inputDelivery[0];releasePre();
  await until(()=>stage==='pulse_blocked');assert.ok(performance.now()<old.deadlineAt);await until(()=>performance.now()>old.deadlineAt+25);assert.ok(performance.now()<fresh.deadlineAt);releasePulse();
  const applied=await until(()=>f.events.find(event=>event.type==='native_input'&&event.inputs[0]?.[0]===101));assert.equal(applied.inputs[0][5]&1,0);assert.deepEqual(applied.pulseTickets,[]);assert.ok(f.events.some(event=>event.type==='input_rejected'&&event.seq===100&&event.reason==='expired'&&event.stage==='native_step'));assert.equal(f.room.inputDelivery[0],fresh,'the newer neutral base ticket must not be cleared with the older pulse');await until(()=>f.events.some(event=>event.type==='native_frame'&&event.state.tick===applied.tick));assert.equal(f.room.state.players[0].shots,0);
  const checks=applied.viewAdmissionChecks.checks;assert.ok(checks.some(value=>value.base&&value.sourceSeq===101&&value.stage==='post_record'&&value.ok));assert.ok(checks.some(value=>!value.base&&value.sourceSeq===100&&value.stage==='post_record'&&!value.ok&&value.reason==='expired'&&value.pulseFields.includes('fire')));assert.deepEqual(applied.viewAdmissionChecks.neutralizedSlots,[0]);
  const tape=(await fs.readFile(path.join(f.data,'rooms',f.room.id,'tape.jsonl'),'utf8')).trim().split('\n').slice(1).map(JSON.parse);assert.ok(tape.every(line=>!(line.inputs[0]?.[5]&1)),'the expired prospective fire row was truncated instead of surviving in the tape');
 }finally{releasePre();releasePulse();await f.cleanup();}
});
