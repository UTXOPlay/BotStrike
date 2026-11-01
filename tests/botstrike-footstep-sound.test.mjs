import test from 'node:test';
import assert from 'node:assert/strict';
import {makeFootstepSample} from '../games/botstrike/client/footstep-sound.mjs';

function rms(samples,start,end){let energy=0;for(let i=start;i<end;i++)energy+=samples[i]*samples[i];return Math.sqrt(energy/(end-start));}

test('industrial footfalls and landing stay bounded and decay at common sample rates',()=>{
 for(const rate of [44100,48000])for(const kind of ['step0','step1','land']){
  const samples=makeFootstepSample(kind,rate),head=rms(samples,0,Math.floor(rate*.025)),tail=rms(samples,samples.length-Math.floor(rate*.025),samples.length);
  assert.ok(samples.length>=rate*.10&&samples.length<=rate*.20);
  assert.ok(samples.every(Number.isFinite));
  assert.ok(Math.max(...samples)<.81&&Math.min(...samples)>-.81);
  assert.ok(head>.1&&tail<head*.2);
  let transient=0,signal=0;for(let i=1;i<Math.floor(rate*.025);i++){transient+=(samples[i]-samples[i-1])**2;signal+=samples[i]**2;}
  assert.ok(Math.sqrt(transient/signal)<.25,'footfall transient should stay below the low body of the sound');
  assert.deepEqual(samples,makeFootstepSample(kind,rate));
 }
 assert.equal(makeFootstepSample('unknown'),null);
});

test('landing sustains a heavier tail than either running footfall',()=>{
 const rate=48000,step0=makeFootstepSample('step0',rate),step1=makeFootstepSample('step1',rate),land=makeFootstepSample('land',rate);
 const late=samples=>rms(samples,Math.floor(rate*.07),Math.floor(rate*.09));
 assert.ok(step0.length<step1.length&&step1.length<land.length);
 assert.ok(late(land)>late(step0)*2.5&&late(land)>late(step1)*2);
});
