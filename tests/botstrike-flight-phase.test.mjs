import test from 'node:test';
import assert from 'node:assert/strict';
import {AnimationMotion} from '../games/botstrike/client/animation-motion.mjs';
import {LocomotionBlend} from '../games/botstrike/client/locomotion-blend.mjs';
import {execFileSync} from 'node:child_process';
import {existsSync} from 'node:fs';
const player=()=>({life:1,alive:true,position:[0,0,0],velocity:[0,0,0],yaw:0,crouch:false});
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-12,`${a} != ${b}`);
function nativeJump(){
 const result=[player()];let y=0,vy=220;
 for(let tick=1;tick<=46;tick++){vy-=600/64;y+=vy/64;result.push({...player(),position:[0,Math.max(0,y),0],velocity:[0,y<0?0:vy,0]});}return result;
}

test('native ascent snapshots have the same phase when first observed at any render rate',()=>{
 const snapshots=nativeJump();
 for(const fps of [30,60,64,120]){
  const motion=new AnimationMotion();motion.update(snapshots[0],0);
  for(let frame=1;frame<=Math.ceil(46*fps/64);frame++){
   const tick=Math.min(46,Math.floor(frame*64/fps)),p=snapshots[tick],m=motion.update(p,1/fps),fresh=new AnimationMotion().update(p,0);
   near(m.riseProgress,fresh.riseProgress);near(m.fallTime,fresh.fallTime);
   if(tick>0&&tick<=23)near(m.riseProgress,(tick-1)*9.375/210.625);
   assert.equal(m.grounded,tick===0||tick===46);
  }
 }
});

test('same-flight invalidation retains crouch/blend history while derivatives remain reset',()=>{
 for(const reason of ['visibility','gap','correction']){
  const a=new AnimationMotion(),b=new LocomotionBlend(),snapshots=nativeJump();
  for(let tick=0;tick<=12;tick++){const p={...snapshots[tick],crouch:tick>=10};b.update(a.update(p,1/64,0,250,tick*1000/64),1/64);}
  const crouch=a.output.crouchAmount,weights=[...b.weights],phase=a.output.riseProgress,p={...snapshots[12],crouch:true},before=structuredClone(p);
  a.clear(reason);const m=a.update(p,0,0,250,187.5);b.update(m,0);
  assert.equal(m.reset,reason);assert.equal(m.flightContinuity,true);near(m.crouchAmount,crouch);near(m.riseProgress,phase);assert.deepEqual([...b.weights],weights);assert.deepEqual(p,before);assert.equal(m.takeoff,false);assert.equal(m.acceleration,0);assert.equal(m.turnRate,0);
 }
});

test('new room/map/life, a completed flight and an upward restart discard retained history',()=>{
 const snapshots=nativeJump();
 for(const scenario of ['room','map','life','landing','timeout','restart']){
  const a=new AnimationMotion();for(let t=0;t<=12;t++)a.update({...snapshots[t],crouch:t>=10},1/64,0,250,t*1000/64);
  a.clear(scenario==='room'?'room':'visibility');let p={...snapshots[14],crouch:true},map=0,now=14*1000/64;
  if(scenario==='map')map=1;if(scenario==='life')p={...p,life:2};if(scenario==='landing')p={...p,position:[0,0,0],velocity:[0,0,0]};if(scenario==='timeout')now=2000;if(scenario==='restart')p={...snapshots[1],crouch:true};
  const m=a.update(p,0,map,250,now);assert.equal(m.flightContinuity,false,scenario);near(m.crouchAmount,1);assert.equal(m.takeoff,false);
 }
});

test('phase references agree with the actual native engine snapshots',{skip:!existsSync('release/botstrike-engine')},()=>{
 const config={map:1,mode:'deathmatch',heroes:Array(10).fill(0),bots:Array(10).fill(false),difficulty:1,seed:2050};
 const input=JSON.stringify({config})+'\n'+Array.from({length:46},(_,i)=>JSON.stringify({inputs:[{seq:i+1,jump:i===0},...Array(9).fill(null)]})).join('\n')+'\n';
 const frames=execFileSync('release/botstrike-engine',[],{input,maxBuffer:8e6}).toString().trim().split('\n').map(JSON.parse).filter(f=>f.type==='frame');
 const first=frames[0].state.players[0],middle=frames[11].state.players[0];assert.equal(first.velocity[1],210.625);assert.equal(middle.position[1],29.82421875);
 near(new AnimationMotion().update(first,0).riseProgress,0);near(new AnimationMotion().update(middle,0).riseProgress,.48961424332344217);assert.equal(frames[45].state.players[0].position[1],0);
});

test('native ticks distinguish a repeated first-jump snapshot from a new jump at the same velocity',()=>{
 const p=nativeJump()[1],a=new AnimationMotion();a.update(p,1/64,0,250,16,1);
 // Rendering a held packet must not age a native episode or invent a takeoff.
 for(let i=0;i<120;i++)a.update(p,1/120,0,250,16+i*1000/120,1);
 a.clear('visibility');assert.equal(a.update(p,0,0,250,1100,1).flightContinuity,true);
 a.clear('visibility');assert.equal(a.update(p,0,0,250,1110,47).flightContinuity,false,'46 native ticks later the equal velocity belongs to a new jump');
 const b=new AnimationMotion();b.update(p,1/64,0,250,16);b.clear('visibility');assert.equal(b.update(p,0,0,250,16+46*1000/64).flightContinuity,false,'the tickless lab fallback also expires');
});
