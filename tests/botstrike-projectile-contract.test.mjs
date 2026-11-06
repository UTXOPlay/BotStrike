import test from 'node:test';import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';import {readFileSync} from 'node:fs';
const spec=JSON.parse(readFileSync(new URL('../botstrike/spec.json',import.meta.url))),engine=process.env.BOTSTRIKE_TEST_ENGINE||'release/botstrike-engine';
test('810 fixed native releases cover modes, motion, throw equipment, pitches and combat maps',()=>{
 const fixtures=[];
 for(let map=0;map<3;map++)for(let mode=0;mode<3;mode++)for(const velocity of [[0,0,0],[150,0,0],[0,212,0],[200,-80,-100],[850,0,0]])for(const pitch of [-.5,0,.7])for(const kind of [1,2,3,4,5,10])fixtures.push({map,mode,kind,velocity,pitch,position:spec.maps[map].spawns[0][0],yaw:.3,stance:.5});
 assert.equal(fixtures.length,810);
 const rows=execFileSync(engine,['projectile-probe'],{input:fixtures.map(v=>JSON.stringify(v)).join('\n')+'\n',maxBuffer:20e6}).toString().trim().split('\n').map(JSON.parse);
 rows.forEach((row,i)=>{const f=fixtures[i],mode=spec.projectile.modes[f.mode],d=[-Math.sin(f.yaw)*Math.cos(f.pitch),Math.sin(f.pitch),-Math.cos(f.yaw)*Math.cos(f.pitch)];
  for(let axis=0;axis<3;axis++)assert.ok(Math.abs(row.initial.velocity[axis]-(d[axis]*mode.speed+f.velocity[axis]*spec.projectile.inherit_velocity+(axis===1?mode.lift:0)))<1e-9);
  assert.equal(row.initial.position[1],f.position[1]+46.5);assert.equal(row.detonation_tick,[5,10].includes(f.kind)?64:128);assert.equal(row.points.length,row.detonation_tick+1);
  assert.deepEqual(row.preview,row.points.filter((_,tick)=>tick%2===0));
  for(const p of row.points){assert.ok(p.every(Number.isFinite));assert.ok(Math.abs(p[0])<=spec.maps[f.map].extent-spec.projectile.radius+1e-4);assert.ok(Math.abs(p[2])<=spec.maps[f.map].extent-spec.projectile.radius+1e-4);assert.ok(p[1]>=spec.projectile.radius-1e-4);}
 });
});
test('offline projectile inspection rejects invalid modes, self-use items and unknown score fields',()=>{
 const valid={map:0,mode:0,kind:3,position:[0,0,0],velocity:[0,0,0],yaw:0,pitch:0,stance:0};
 for(const change of [{map:4},{mode:3},{kind:6},{velocity:[5001,0,0]},{stance:1.1},{score:999}])assert.throws(()=>execFileSync(engine,['projectile-probe'],{input:JSON.stringify({...valid,...change})+'\n',stdio:'pipe'}));
});
