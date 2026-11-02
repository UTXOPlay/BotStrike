import test from 'node:test';
import assert from 'node:assert/strict';
import {AnimationMotion} from '../games/botstrike/client/animation-motion.mjs';
import {LocomotionBlend,locomotionTargets} from '../games/botstrike/client/locomotion-blend.mjs';
import {advanceStridePlan,calculateRunAmount} from '../games/botstrike/client/locomotion-gait.mjs';
import spec from '../botstrike/spec.json' with {type:'json'};

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

test('gradual start and stop cross hysteresis at 30, 60 and 120 fps',()=>{
 for(const fps of [30,60,120]){
  const signals=new AnimationMotion(),p={life:1,alive:true,position:[0,0,0],velocity:[0,0,0],yaw:0};let starts=0,stops=0;
  signals.update(p,1/fps);
  for(let frame=1;frame<=fps;frame++){
   const t=frame/fps,speed=t<=.5?t*1000:Math.max(0,500-(t-.5)*1200);p.velocity[2]=-speed;p.position[2]-=speed/fps;
   const m=signals.update(p,1/fps);starts+=Number(m.starting);stops+=Number(m.stopping);
  }
  assert.equal(starts,1,`${fps} fps start`);assert.equal(stops,1,`${fps} fps stop`);
 }
});

test('walk/run style follows each native hero/weapon speed range',()=>{
 for(const hero of spec.heroes)for(const weapon of spec.weapons){
  const maximum=hero.speed*weapon.mobility;
  near(calculateRunAmount(maximum*.55,maximum),0);
  near(calculateRunAmount(maximum,maximum),1);
  near(calculateRunAmount(maximum,maximum,false,true),0);
  near(calculateRunAmount(maximum,maximum,true,false),0);
  const signals=new AnimationMotion(),p={life:1,alive:true,position:[0,0,0],velocity:[0,0,-maximum*.55],yaw:0},before=structuredClone(p);
  const m=signals.update(p,1/60,0,maximum);near(m.runAmount,0);near(m.runSpeed,maximum);assert.deepEqual(p,before);
  p.velocity[2]=-maximum;near(signals.update(p,1/60,0,maximum).runAmount,1);signals.clear();near(signals.output.runAmount,0);
 }
});

test('first/third-person stride plans retain one clock through walk/run changes',()=>{
 for(const fps of [30,60,120]){
  const a={legLength:28,footWidth:23,supportTravel:25,cycleDuration:.7},b={...a},x=new LocomotionBlend(),y=new LocomotionBlend();
  for(let frame=0;frame<fps*4;frame++){
   const ratio=frame<fps?.55:frame<fps*2?1:frame<fps*3?.55:.75+.01*Math.sin(frame*1.7),m={...motion(305*ratio),runSpeed:305,reset:frame===0?'initial':null};
   const ca=advanceStridePlan(a,m,1/fps),cb=advanceStridePlan(b,m,1/fps),previous=x.phase;
   x.update(m,1/fps,{cycleDuration:ca});y.update(m,1/fps,{cycleDuration:cb});
   near(x.phase,y.phase);near(ca,cb);near(((x.phase-previous+1)%1),1/fps/ca,1e-9);
   assert.ok(ca>=.26&&ca<=1.25);assert.ok(x.weights.every(v=>v>=0&&v<=1));near(x.weights.reduce((n,v)=>n+v,0),1);
  }
 }
});
