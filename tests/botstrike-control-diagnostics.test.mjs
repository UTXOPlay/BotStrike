import test from 'node:test';
import assert from 'node:assert/strict';
import {controlDiagnosticValues,publishControlDiagnostics,controlRecoveryBoundary} from '../games/botstrike/client/control-diagnostics.mjs';
import {ControlWatchdog} from '../games/botstrike/client/control-watchdog.mjs';
function element(){const values=new Map(),events=[];return{values,events,getAttribute:name=>values.get(name)??null,setAttribute(name,value){events.push(['set',name,value]);values.set(name,value);},removeAttribute(name){events.push(['remove',name]);values.delete(name);}};}
const epoch='data-control-recovery-epoch',paused='data-control-paused';
test('D3 initial scalar contract is exactly epoch0 and paused0, with no extra observation data',()=>{
 assert.deepEqual(controlDiagnosticValues({epoch:0,paused:false,token:'secret',room:'private',seq:77,pose:[1,2,3],clock:55}),{[epoch]:'0',[paused]:'0'});
 assert.deepEqual(controlDiagnosticValues({epoch:Number.MAX_SAFE_INTEGER,paused:true}),{[epoch]:'9007199254740991',[paused]:'1'});
});
test('invalid or absent values are unknown and remove both attributes without backfilling zero',()=>{
 for(const value of [{},{epoch:undefined,paused:false},{epoch:null,paused:false},{epoch:'0',paused:false},{epoch:-1,paused:false},{epoch:.5,paused:false},{epoch:NaN,paused:false},{epoch:Infinity,paused:false},{epoch:Number.MAX_SAFE_INTEGER+1,paused:false},{epoch:1,paused:1}]){
  const el=element();publishControlDiagnostics(el,{epoch:0,paused:false});assert.equal(controlDiagnosticValues(value),null);assert.equal(publishControlDiagnostics(el,value),2);assert.equal(el.values.size,0);assert.equal(publishControlDiagnostics(el,value),0);assert.equal(el.values.has(epoch),false);
 }
});
test('unchanged scalar values cause no DOM mutations under frequent observation',()=>{
 const el=element();assert.equal(publishControlDiagnostics(el,{epoch:0,paused:false}),2);for(let i=0;i<1000;i++)assert.equal(publishControlDiagnostics(el,{epoch:0,paused:false}),0);assert.equal(el.events.length,2);
 assert.equal(publishControlDiagnostics(el,{epoch:2,paused:true}),2);assert.equal(publishControlDiagnostics(el,{epoch:2,paused:false}),1);assert.equal(el.values.get(epoch),'2');
});
test('recovery boundary clears proof and held intent, then publishes before continued neutral transmission',()=>{
 const el=element(),events=[];let proof=true,held=true;
 controlRecoveryBoundary({clearProof(){events.push('proof');proof=false;},clearHeld(){events.push('held');held=false;},publish(){events.push('publish');assert.equal(proof,false);assert.equal(held,false);publishControlDiagnostics(el,{epoch:4,paused:true});},continueRecovery(){events.push('neutral-send');assert.equal(proof,false);assert.equal(held,false);assert.equal(el.values.get(epoch),'4');assert.equal(el.values.get(paused),'1');}});
 assert.deepEqual(events,['proof','held','publish','neutral-send']);
 let started=false;assert.throws(()=>controlRecoveryBoundary({clearProof(){started=true;},clearHeld(){},publish(){}}));assert.equal(started,false,'incomplete boundary fails before any partial mutation');
});
test('fresh neutral readiness keeps paused1; only admitted manual Resume publishes paused0',()=>{
 const el=element(),w=new ControlWatchdog(),c={socketEpoch:1,ownerEpoch:1,room:'private',life:1,owned:true,running:true,visible:true,active:true,alive:true,phase:'live',outcome:false,protocol:'receipt'};
 w.scheduler(c,0);w.state(c,0,{tick:1});w.scheduler(c,900);w.invalidateRecovery(901);publishControlDiagnostics(el,{epoch:w.epoch,paused:!!w.latch});const tripEpoch=el.values.get(epoch),menu={...c,active:false};w.scheduler(menu,910);w.state(menu,930,{tick:2,ack:{version:1,seq:1,tick:2,life:1,neutral:true},ackSentAt:920});
 assert.equal(w.readiness(menu,940).ready,true);assert.equal(publishControlDiagnostics(el,{epoch:w.epoch,paused:!!w.latch}),0);assert.equal(el.values.get(paused),'1');assert.equal(w.resume(menu,940),false);assert.equal(el.values.get(paused),'1');assert.equal(w.resume(menu,940,{explicit:true}),true);publishControlDiagnostics(el,{epoch:w.epoch,paused:!!w.latch});assert.equal(el.values.get(paused),'0');assert.equal(el.values.get(epoch),tripEpoch);
});
