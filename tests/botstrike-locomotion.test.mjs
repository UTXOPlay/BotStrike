import test from 'node:test';
import assert from 'node:assert/strict';
import {AnimationMotion} from '../games/botstrike/client/animation-motion.mjs';
import {LocomotionBlend,locomotionTargets} from '../games/botstrike/client/locomotion-blend.mjs';

const near=(a,b,tolerance=1e-10)=>assert.ok(Math.abs(a-b)<tolerance,`${a} != ${b}`);
const motion=(forward,side=0)=>({forward,side,speed:Math.hypot(forward,side),grounded:true,rising:false,crouch:false,reset:null});

test('directional weights cover the full circle continuously and sum to one',()=>{
 for(const speed of [0,1,12,24,144,180,250,400]){
  let previous;
  for(let i=0;i<=3600;i++){
   const a=i*Math.PI/1800,w=locomotionTargets(motion(speed*Math.cos(a),speed*Math.sin(a)));
   near(w.reduce((sum,v)=>sum+v,0),1);
   assert.ok(w.every(v=>Number.isFinite(v)&&v>=0&&v<=1));
   if(previous)assert.ok(Math.max(...w.map((v,j)=>Math.abs(v-previous[j])))<.004,'direction threshold introduced a discontinuity');
   previous=w;
  }
 }
 near(locomotionTargets(motion(250))[2],1);
 near(locomotionTargets(motion(-145))[3],1);
 near(locomotionTargets(motion(0,-145))[4],1);
 near(locomotionTargets(motion(0,145))[5],1);
 const diagonal=locomotionTargets(motion(150,150));
 near(diagonal[1]+diagonal[2],.5);near(diagonal[5],.5);
});

test('gait clips share a normalized clock using actual asset durations',()=>{
 const durations=[3.03,1.03,.7,1.1,1.03,1.03,2.03,1.23,.53,1.03];
 const blend=new LocomotionBlend(durations);blend.clear(.37);
 for(let i=0;i<600;i++){
  const m=motion(Math.cos(i/33)*220,Math.sin(i/33)*160);blend.update(m,1/60);
  for(const j of [1,2,3,4,5,7])near(blend.times[j]/durations[j],blend.phase);
  assert.ok(blend.cadenceScale>=.6&&blend.cadenceScale<=1.6);
  assert.ok(Math.abs(blend.orientation)<=.55);
 }
 const phase=blend.phase;blend.update({...motion(250),grounded:false,rising:true},1/60);
 near(phase,blend.phase);
});

test('pose smoothing is independent of frame rate and releases on resets/full body/reduced motion',()=>{
 const run=fps=>{const b=new LocomotionBlend();b.update(motion(250),0);for(let i=0;i<fps;i++)b.update(motion(-250),1/fps);return b;};
 const reference=run(60);
 for(const fps of [30,120])run(fps).weights.forEach((w,i)=>near(w,reference.weights[i]));
 const b=new LocomotionBlend();b.update(motion(200,150),.1);assert.ok(Math.abs(b.orientation)>.1);
 b.update(motion(200,150),.01,{reduced:true});near(b.orientation,0);
 for(let i=0;i<10;i++)b.update(motion(200,150),.01,{active:false});near(b.gain,0);near(b.orientation,0);
 b.update({...motion(0),reset:'correction'},.01);near(b.weights[0],1);
 b.update({...motion(100),crouch:true,reset:'life'},.01);near(b.weights[7],1);
 b.update({...motion(0),grounded:false,rising:true,reset:'map'},.01);near(b.weights[8],1);
});

test('render signals preserve authoritative state, wrap yaw and detect discontinuities',()=>{
 const signals=new AnimationMotion(),p={life:1,position:[0,0,0],velocity:[0,0,-250],yaw:Math.PI-.01};
 signals.update(p,1/60,0);p.yaw=-Math.PI+.01;
 const before=structuredClone(p),m=signals.update(p,1/60,0);
 near(m.turnRate,1.2);near(m.speed,250);assert.equal(m.reset,null);assert.deepEqual(p,before);
 p.position[0]=500;assert.equal(signals.update(p,1/60,0).reset,'correction');
 assert.equal(signals.update(p,1/60,1).reset,'map');
 p.life++;assert.equal(signals.update(p,1/60,1).reset,'life');
 assert.equal(signals.update(p,.5,1).reset,'gap');
 signals.clear();assert.equal(signals.update(p,1/60,1).reset,'initial');
});
