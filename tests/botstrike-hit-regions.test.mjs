import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {hitVolumes} from '../games/botstrike/client/hit-regions.mjs';
import {visibilitySamples} from '../shared/sight-geometry.mjs';
import {readFileSync} from 'node:fs';
const profile=JSON.parse(readFileSync(new URL('../botstrike/spec.json',import.meta.url))).hit_regions;
const engine=process.env.BOTSTRIKE_TEST_ENGINE||'release/botstrike-engine';
test('offline native hit inspector and development overlay agree at 501 stances and world transforms',()=>{
 const probes=Array.from({length:501},(_,i)=>{const position=[Math.sin(i)*1300,i%17,Math.cos(i)*1300],stance=i/500,yaw=Math.sin(i)*3.14,pitch=Math.cos(i)*1.4,v=hitVolumes(position,stance,[yaw,pitch]),up=[Math.sin(yaw)*Math.sin(v.head_pitch),Math.cos(v.head_pitch),Math.cos(yaw)*Math.sin(v.head_pitch)];return {position,stance,yaw,pitch,origin:v.head.map((x,a)=>x+up[a]*100),direction:up.map(x=>-x)};});
 const results=execFileSync(engine,['hit-probe'],{input:probes.map(p=>JSON.stringify(p)).join('\n')+'\n',maxBuffer:2e6}).toString().trim().split('\n').map(JSON.parse);
 for(let i=0;i<probes.length;i++){
  const p=probes[i],v=hitVolumes(p.position,p.stance,[p.yaw,p.pitch]),out=results[i];for(const [key,value]of Object.entries(v)){const a=Array.isArray(value)?value:[value],b=Array.isArray(out.volumes[key])?out.volumes[key]:[out.volumes[key]];assert.ok(a.every((x,j)=>Math.abs(x-b[j])<1e-9),key);}
  const samples=visibilitySamples(p,profile);assert.equal(out.samples.length,14);samples.forEach((point,j)=>point.forEach((x,k)=>assert.ok(Math.abs(x-out.samples[j][k])<1e-9)));
  assert.equal(out.hit.region,'head');assert.ok(Math.abs(out.hit.distance-(100-v.head_half_extents[1]))<1e-9);
 }
});
test('native inspector rejects zero directions, non-finite/out-of-range fixtures and unknown fields',()=>{
 const p={position:[0,0,0],stance:0,origin:[0,61,100],direction:[0,0,-1]};
 for(const bad of [{...p,direction:[0,0,0]},{...p,stance:1.1},{...p,origin:[100001,0,0]},{...p,hidden_room:'unavailable'}])assert.throws(()=>execFileSync(engine,['hit-probe'],{input:JSON.stringify(bad)+'\n',stdio:'pipe'}));
});
