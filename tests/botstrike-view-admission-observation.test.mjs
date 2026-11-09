// Private observer metadata is separate from public messages and Native tape.
// Actual WS + retained Native; explicit recorder gates are not WAN evidence.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {neutral} from '../botstrike-service/server.mjs';
import {writeAll} from '../botstrike-service/io.mjs';
import {observerFixture,until} from './botstrike-observer-fixture.mjs';
import {createNetworkCapture} from '../tools/start-network-runtime.mjs';
import {joinNativeViewAdmissionChecks} from '../tools/network-shot-boundary-report.mjs';

function selection(event,seq){return event.viewAdmissionChecks.selection.find(value=>value.slot===0&&value.seq===seq);}
function assertPrivateBounded(event){
 const v=event.viewAdmissionChecks;assert.equal(v.version,1);assert.equal(v.checksComplete,true);assert.equal(v.checksDropped,0);assert.ok(v.selection.length<=10&&v.checks.length<=1220&&v.neutralizedSlots.length<=10);
 const serialized=JSON.stringify(v);for(const forbidden of ['nonce','token','account','ownerToken','ws','context','room'])assert.equal(new RegExp('"'+forbidden+'"\\s*:','i').test(serialized),false,forbidden);
 for(const row of [...v.selection,...v.checks]){assert.ok(Number.isFinite(row.checkedFromMs)&&row.checkedFromMs<=row.checkedThroughMs&&row.checkedThroughMs<=event.monotonicMs);}
}

test('actual selection interval and separate post-record/base ACK checks join the admitted sequence, without entering wire or tape',async()=>{
 const f=await observerFixture();
 try{
  f.send({...neutral(),seq:100,viewTick:0,x:1,fire:true});
  const arrival=await until(()=>f.events.find(value=>value.type==='input_arrival'&&value.seq===100));
  const event=await until(()=>f.events.find(value=>value.type==='native_input'&&selection(value,100)));
  assertPrivateBounded(event);const s=selection(event,100),input=event.inputs[0],a=s.admission;
  assert.equal(s.requestedViewTick,arrival.admission.acceptedViewTick,'selection requests arrival-normalized history, not original browser tick');
  assert.equal(s.seq,arrival.seq);assert.equal(s.life,f.room.state.players[0].life);assert.equal(s.generation,arrival.admission.generation);assert.equal(s.currentTick,event.tick-1);assert.equal(a.ok,true);assert.equal(a.generation,s.generation);assert.equal(a.issuedAt,arrival.admission.issuedAt);assert.equal(a.deadlineAt,arrival.admission.deadlineAt);
  assert.equal(a.oldest,Math.max(0,s.currentTick-12));assert.ok(a.low<=a.high);assert.equal(a.acceptedViewTick,Math.max(a.low,Math.min(a.high,s.requestedViewTick)));assert.equal(input[10],a.acceptedViewTick);assert.ok(arrival.monotonicMs<=s.checkedFromMs&&s.checkedThroughMs<a.deadlineAt);
  const checks=event.viewAdmissionChecks.checks.filter(value=>value.slot===0&&value.sourceSeq===100);assert.ok(checks.some(value=>value.stage==='post_record'&&value.base&&value.pulseFields.includes('fire')));assert.equal(checks.filter(value=>value.stage==='ack_candidate').length,1);
  for(const c of checks){assert.equal(c.ok,true);assert.equal(c.reason,null);assert.equal(c.life,s.life);assert.equal(c.generation,s.generation);assert.equal(c.issuedAt,a.issuedAt);assert.equal(c.deadlineAt,a.deadlineAt);assert.equal(c.requestId,null);assert.ok(c.checkedFromMs>=s.checkedThroughMs&&c.checkedThroughMs<c.deadlineAt);}
  const joined=joinNativeViewAdmissionChecks({native:event,slot:0,packed:input,baseAdmission:arrival.admission,sourceAdmission:arrival.admission,sourceSeq:100,life:s.life,baseArrivedAtMs:arrival.monotonicMs,sourceArrivedAtMs:arrival.monotonicMs});assert.equal(joined.valid,true,joined.reason);assert.equal(joined.available,true);assert.equal(joined.selectionAdmission.stage,'selection_before_recording');assert.equal(joined.finalFreshness.physicalStdinWriteFreshnessEstablished,false);
  const frame=await until(()=>f.events.find(value=>value.type==='native_frame'&&value.state.tick===event.tick));assert.equal(frame.state.players[0].last_seq,100);await f.stop();
  const lines=(await readFile(path.join(f.data,'rooms',f.room.id,'tape.jsonl'),'utf8')).trim().split('\n').map(JSON.parse);assert.deepEqual(lines[event.tick],{inputs:event.inputs});
  assert.equal(JSON.stringify(lines).includes('viewAdmissionChecks'),false);assert.equal(JSON.stringify(f.messages).includes('viewAdmissionChecks'),false);
  const directory=path.join(f.data,'network-diagnostics');await mkdir(directory,{mode:0o700});await writeFile(path.join(directory,'.network-lab-owner'),'view-admission-observation\n',{mode:0o600});const capture=await createNetworkCapture({directory,data:f.data});capture.observe(event);const closed=await capture.close();assert.equal(closed.status,'complete');assert.equal(closed.dropped,0);assert.deepEqual(JSON.parse(await readFile(path.join(directory,'runtime.jsonl'),'utf8')).viewAdmissionChecks,event.viewAdmissionChecks,'actual service evidence survives the bounded private capture without projection');
 }finally{await f.cleanup();}
});

test('absolute lease expiration during append keeps the actual successful selection and failed post-record check, then records neutralization',async()=>{
 let gate,armed=true,delayed=false;const hold=new Promise(resolve=>gate=resolve);
 const f=await observerFixture({recordWrite:async(fd,line)=>{const input=JSON.parse(line).inputs[0];if(armed&&input?.[0]===100&&input[5]&1){armed=false;delayed=true;await hold;}await writeAll(fd,line);}});
 try{
  f.send({...neutral(),seq:100,viewTick:0,x:1,fire:true});await until(()=>delayed);const arrival=f.events.find(value=>value.type==='input_arrival'&&value.seq===100);await until(()=>performance.now()>arrival.admission.deadlineAt+10);gate();
  const event=await until(()=>f.events.find(value=>value.type==='native_input'&&selection(value,100)));assertPrivateBounded(event);const s=selection(event,100),v=event.viewAdmissionChecks;assert.equal(s.admission.ok,true);assert.ok(s.checkedThroughMs<s.admission.deadlineAt);
  const failed=v.checks.find(value=>value.slot===0&&value.sourceSeq===100&&!value.ok);assert.ok(failed);assert.equal(failed.stage,'post_record');assert.equal(failed.base,true);assert.equal(failed.reason,'expired');assert.ok(failed.checkedFromMs>=failed.deadlineAt);assert.deepEqual(v.neutralizedSlots,[0]);assert.equal(v.checks.some(value=>value.slot===0&&value.stage==='ack_candidate'),false);
  assert.equal(event.inputs[0][10],null);assert.equal(event.inputs[0][5]&255,0);assert.deepEqual(event.pulseTickets,[]);assert.ok(event.monotonicMs>failed.deadlineAt);
  const joined=joinNativeViewAdmissionChecks({native:event,slot:0,packed:event.inputs[0],baseAdmission:arrival.admission,life:s.life});assert.equal(joined.valid,false);assert.equal(joined.reason,'native_view_checks_selected_slot_neutralized');
  await until(()=>f.events.find(value=>value.type==='native_frame'&&value.state.tick===event.tick));await f.stop();const lines=(await readFile(path.join(f.data,'rooms',f.room.id,'tape.jsonl'),'utf8')).trim().split('\n').map(JSON.parse);assert.deepEqual(lines[event.tick],{inputs:event.inputs});assert.equal(JSON.stringify(lines).includes('viewAdmissionChecks'),false);
 }finally{gate();await f.cleanup();}
});

test('neutral selected controls honestly have no post-record action check but retain the existing base ACK check',async()=>{
 const f=await observerFixture();
 try{
  f.send({...neutral(),seq:100,viewTick:0});const event=await until(()=>f.events.find(value=>value.type==='native_input'&&selection(value,100)));assertPrivateBounded(event);const c=event.viewAdmissionChecks.checks.filter(value=>value.slot===0&&value.sourceSeq===100);
  assert.deepEqual(c.map(value=>value.stage),['ack_candidate']);assert.equal(c[0].base,true);assert.equal(c[0].ok,true);assert.deepEqual(c[0].pulseFields,[]);assert.equal(c[0].pass,null);assert.deepEqual(event.viewAdmissionChecks.neutralizedSlots,[]);
 }finally{await f.cleanup();}
});

test('a real stalled receipt history keeps original request, arrival fallback and later selection fallback distinct',async()=>{
 let armed=false,gated=false,release;const hold=new Promise(resolve=>release=resolve);
 const f=await observerFixture({tickMs:2,recordWrite:async(fd,line)=>{if(armed){armed=false;gated=true;await hold;}await writeAll(fd,line);}});
 try{
  const original=f.delivery.snapshot(),receipt=original.delivery;f.send({...neutral(),seq:1},receipt);await until(()=>f.room.state.tick>=original.tick+14);armed=true;await until(()=>gated);
  f.send({...neutral(),seq:100,viewTick:0,x:1},receipt);const arrival=await until(()=>f.events.find(value=>value.type==='input_arrival'&&value.seq===100));assert.equal(arrival.admission.requested,0);assert.equal(arrival.admission.reason,'no_current_history');release();
  const event=await until(()=>f.events.find(value=>value.type==='native_input'&&selection(value,100)));assertPrivateBounded(event);const s=selection(event,100);assert.equal(s.requestedViewTick,arrival.admission.acceptedViewTick);assert.equal(s.admission.reason,'no_current_history');assert.equal(s.admission.low,null);assert.equal(s.admission.high,null);assert.equal(s.admission.acceptedViewTick,s.currentTick);assert.equal(event.inputs[0][10],s.admission.acceptedViewTick);
  assert.ok(0<arrival.admission.acceptedViewTick&&arrival.admission.acceptedViewTick<s.admission.acceptedViewTick,'actual original, arrival and selection ticks are all different');
  const joined=joinNativeViewAdmissionChecks({native:event,slot:0,packed:event.inputs[0],baseAdmission:arrival.admission,life:s.life,baseArrivedAtMs:arrival.monotonicMs});assert.equal(joined.valid,true,joined.reason);assert.equal(joined.selectionAdmission.record.admission.reason,'no_current_history');
 }finally{release();await f.cleanup();}
});

test('a disabled or throwing private observer cannot turn diagnostics into replay fields or stop Native progression',async()=>{
 for(const throwing of [false,true]){
  const observed=[],originalError=console.error;let failures=0,f;
  console.error=(...args)=>{if(args[0]==='Private diagnostic observer failed')failures++;else originalError(...args);};
  try{
   f=await observerFixture({observe:throwing?event=>{observed.push(event);if(event.type==='native_input')throw Error('explicit private observer fault');}:undefined});
   f.send({...neutral(),seq:100,viewTick:0,x:1});await until(()=>f.room.state.players[0].last_seq===100);assert.equal(f.room.status,'running');assert.equal(f.service.metrics.recordingErrors,0);await f.stop();
   const lines=(await readFile(path.join(f.data,'rooms',f.room.id,'tape.jsonl'),'utf8')).trim().split('\n').map(JSON.parse);assert.ok(lines.slice(1).some(value=>value.inputs[0]?.[0]===100));assert.ok(lines.slice(1).every(value=>Object.keys(value).length===1&&Array.isArray(value.inputs)));assert.equal(JSON.stringify(f.messages).includes('viewAdmissionChecks'),false);
   if(throwing){assert.ok(failures>0);const events=observed.filter(value=>value.type==='native_input');assert.ok(events.length>0);for(const event of events){assertPrivateBounded(event);assert.deepEqual(lines[event.tick],{inputs:event.inputs});}}
   else{assert.deepEqual(f.events,[]);assert.equal(failures,0);}
  }finally{try{await f?.cleanup();}finally{console.error=originalError;}}
 }
});
