import test from 'node:test';
import assert from 'node:assert/strict';
import {makeShotSample} from '../games/botstrike/client/shot-sound.mjs';

function rms(samples,start=0,end=samples.length){let energy=0;for(let i=start;i<end;i++)energy+=samples[i]*samples[i];return Math.sqrt(energy/(end-start));}

test('sampled shots have bounded peaks and decays at common sample rates',()=>{
 for(const rate of [44100,48000])for(const weapon of [0,1,4]){
  const samples=makeShotSample(weapon,rate),head=rms(samples,0,Math.floor(rate*.025)),tail=rms(samples,samples.length-Math.floor(rate*.025));
  assert.ok(samples.length>=rate*.14&&samples.length<=rate*.39);
  assert.ok(samples.every(Number.isFinite));
  assert.ok(Math.max(...samples)<.87&&Math.min(...samples)>-.87);
  assert.ok(head>.08&&tail<head*.25);
 }
});

test('ARC-9 and NEEDLE have distinct durations and transient texture',()=>{
 const arc=makeShotSample(0),needle=makeShotSample(1);
 assert.ok(arc.length>needle.length*1.7);
 const roughness=samples=>{let change=0,energy=0;for(let i=1;i<samples.length;i++){change+=(samples[i]-samples[i-1])**2;energy+=samples[i]**2;}return change/energy;};
 assert.ok(roughness(needle)>roughness(arc)*1.4);
 assert.equal(makeShotSample(2),null);
});

test('SCATTER has a longer blast and a distinct pump return transient',()=>{
 const rate=48000,scatter=makeShotSample(4,rate),arc=makeShotSample(0,rate);
 const window=(samples,start)=>rms(samples,Math.floor(start*rate),Math.floor((start+.01)*rate));
 assert.ok(scatter.length>arc.length*1.3);
 assert.ok(window(scatter,.05)>window(arc,.05));
 assert.ok(window(scatter,.30)>window(scatter,.25)*1.8);
 assert.deepEqual(scatter,makeShotSample(4,rate),'sample generation remains deterministic');
});
