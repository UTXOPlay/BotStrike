import test from 'node:test';import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';import {readFileSync} from 'node:fs';
import {segmentSphere,smokeBlocks,eyeHeight,visibilitySamples} from '../shared/sight-geometry.mjs';
import {canSee} from '../botstrike-service/visibility.mjs';
const engine=process.env.BOTSTRIKE_TEST_ENGINE||'release/botstrike-engine',spec=JSON.parse(readFileSync(new URL('../botstrike/spec.json',import.meta.url)));
test('native and browser agree on 2004 sphere/eye fixtures including elevated, zero-length and tangent rays',()=>{
 const fixtures=Array.from({length:2000},(_,i)=>({a:[Math.sin(i)*900,i%400,Math.cos(i)*900],b:[Math.cos(i)*800,400-i%400,Math.sin(i)*800],center:[Math.sin(i*.5)*700,i%190,Math.cos(i*.5)*700],radius:175,stance:i/1999}));
 fixtures.push({a:[-300,175,0],b:[300,175,0],center:[0,0,0],radius:175,stance:1},{a:[0,0,0],b:[0,0,0],center:[0,0,0],radius:175,stance:0},{a:[-300,175.00001,0],b:[300,175.00001,0],center:[0,0,0],radius:175,stance:.5},{a:[-300,174.99999,0],b:[300,174.99999,0],center:[0,0,0],radius:175,stance:.25});
 const output=execFileSync(engine,['sight-probe'],{input:fixtures.map(v=>JSON.stringify(v)).join('\n')+'\n',maxBuffer:2e6}).toString().trim().split('\n').map(JSON.parse);
 output.forEach((v,i)=>{const f=fixtures[i];assert.equal(v.blocked,segmentSphere(f.a,f.b,f.center,f.radius));assert.ok(Math.abs(v.eye_height-eyeHeight({stance:f.stance}))<1e-10);});
});
test('smoke expiration and altitude are shared rather than an infinite column',()=>{
 const u={kind:2,fuse:0,life:1,position:[0,8,-150]};assert.ok(smokeBlocks([0,56,0],[0,56,-300],u));assert.equal(smokeBlocks([0,400,0],[0,400,-300],u),false);
 for(const change of [{life:0},{fuse:1},{kind:3}])assert.equal(smokeBlocks([0,56,0],[0,56,-300],{...u,...change}),false);
});
test('disclosure uses continuous eye height and rotated authored hit geometry at low cover',()=>{
 const viewer={slot:0,team:0,alive:true,position:[0,0,0],crouch:true,stance:.5,flash:0},target={slot:5,team:1,alive:true,position:[0,0,-300],crouch:true,stance:1,pitch:0,yaw:0},map={obstacles:[{min:[-100,0,-160],max:[100,48,-140]}]},state={utilities:[]};
 assert.equal(canSee(state,viewer,target,map,spec.hit_regions),true);assert.equal(canSee(state,{...viewer,stance:1},target,map,spec.hit_regions),false);
 const points=visibilitySamples({...target,pitch:1.2,yaw:1},spec.hit_regions);assert.equal(points.length,14);assert.ok(points.every(p=>p.every(Number.isFinite)));
});
