import test from 'node:test';
import assert from 'node:assert/strict';
import {makeImpactSample} from '../games/botstrike/client/impact-sound.mjs';

function rms(samples,start,end){let energy=0;for(let i=start;i<end;i++)energy+=samples[i]*samples[i];return Math.sqrt(energy/(end-start));}
function crossings(samples,start,end){let count=0;for(let i=start+1;i<end;i++)if((samples[i]>0)!==(samples[i-1]>0))count++;return count;}

test('confirmed impact samples are bounded, short and decay at browser sample rates',()=>{
 for(const rate of [44100,48000])for(const kind of ['body','head','damage']){
  const samples=makeImpactSample(kind,rate),head=rms(samples,0,Math.floor(rate*.025)),tail=rms(samples,samples.length-Math.floor(rate*.025),samples.length);
  assert.ok(samples.length>=rate*.1&&samples.length<=rate*.2);
  assert.ok(samples.every(Number.isFinite));
  assert.ok(Math.max(...samples)<.83&&Math.min(...samples)>-.83);
  assert.ok(head>.1&&tail<head*.2);
  assert.deepEqual(samples,makeImpactSample(kind,rate));
 }
 assert.equal(makeImpactSample('unknown'),null);
});

test('head, body and received damage have separate impact textures',()=>{
 const rate=48000,body=makeImpactSample('body',rate),head=makeImpactSample('head',rate),damage=makeImpactSample('damage',rate);
 const texture=samples=>crossings(samples,Math.floor(rate*.03),Math.floor(rate*.08));
 assert.ok(head.length>body.length&&damage.length>head.length);
 assert.ok(texture(head)>texture(body)*2);
 assert.ok(texture(body)>texture(damage)*3);
});
