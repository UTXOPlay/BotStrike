import test from 'node:test';
import assert from 'node:assert/strict';
import {Bone,Group} from 'three';
import {AnimationMotion} from '../games/botstrike/client/animation-motion.mjs';
import {LocomotionBlend} from '../games/botstrike/client/locomotion-blend.mjs';
import {DeathPresentation} from '../games/botstrike/client/death-presentation.mjs';

test('feet stay airborne until actual ground contact and landing fires once',()=>{
 const a=new AnimationMotion(),p={life:1,alive:true,position:[0,0,0],velocity:[0,0,0],yaw:0};a.update(p,1/60);
 p.position[1]=.5;p.velocity[1]=210;let r=a.update(p,1/60);assert.ok(!r.grounded&&r.takeoff);assert.equal(r.riseProgress,0);
 p.velocity[1]=105;p.position[1]=30;r=a.update(p,1/60);assert.ok(Math.abs(r.riseProgress-.5)<1e-12);
 const b=new LocomotionBlend();b.update(r,1/60);assert.equal(b.times[8],b.durations[8]*.5);
 p.position[1]=.5;p.velocity[1]=-210;r=a.update(p,1/60);assert.ok(!r.grounded&&!r.landed,'low descending feet must not lock early');
 p.position[1]=0;p.velocity[1]=0;r=a.update(p,1/60);assert.ok(r.grounded&&r.landed);assert.equal(r.landingSpeed,210);
 assert.equal(a.update(p,1/60).landed,false);
});

test('airborne crouching uses the same continuous pose fraction as grounded crouching',()=>{
 const sample=fps=>{
  const a=new AnimationMotion(),b=new LocomotionBlend(),p={life:1,alive:true,position:[0,20,0],velocity:[0,100,0],yaw:0,crouch:false};a.update(p,0);b.update(a.output,0);
  p.crouch=true;for(let i=0;i<fps/2;i++){const m=a.update(p,1/fps);b.update(m,1/fps);assert.ok(Math.abs(m.crouchAmount-b.weights[6]-b.weights[7])<1e-12);}return a.output.crouchAmount;
 };
 for(const fps of [30,60,120])assert.ok(Math.abs(sample(fps)-(1-Math.exp(-.5/.07)))<1e-12);
});

test('corpse pose starts at the outgoing crouch and elapsed-time falling does not mutate native state',()=>{
 const hips=new Bone(),rig=new Group(),model=new Group();rig.add(model);model.add(hips);hips.position.y=.4;hips.rotation.x=.8;
 const a=new DeathPresentation({hips}),p={position:[0,35,0],yaw:2},before=structuredClone(p);
 a.begin(p,100,{fromPose:true,yaw:.4,vertical:-100});hips.position.y=1;hips.quaternion.identity();a.apply(100,model,rig);
 assert.equal(hips.position.y,.4);assert.ok(Math.abs(hips.rotation.x-.8)<1e-12);assert.equal(rig.rotation.y,.4);
 for(const fps of [30,60,120]){for(let frame=0;frame<=fps;frame++){model.position.y=0;rig.rotation.y=2;a.apply(100+frame*1000/fps,model,rig);assert.ok(model.position.y>=-35);assert.equal(rig.rotation.y,.4);}assert.equal(model.position.y,-35);}
 assert.deepEqual(p,before);a.reset();model.position.y=0;a.apply(2000,model,rig);assert.equal(model.position.y,0);
});

test('a dead or full-body reset cannot reactivate the lower locomotion layer',()=>{
 const b=new LocomotionBlend(),motion={speed:0,forward:0,side:0,grounded:true,crouch:false};b.update(motion,1/60);
 b.update({...motion,reset:'map'},1/60,{active:false});assert.equal(b.gain,0);
 for(let i=0;i<20;i++)b.update(motion,1/60,{active:false});assert.equal(b.gain,0);
 b.update(motion,1/60,{active:true});assert.ok(b.gain>0&&b.gain<1);
});

test('a corrected native corpse origin retains the same cosmetic fall height',()=>{
 const hips=new Bone(),rig=new Group(),model=new Group();rig.add(model);model.add(hips);
 const p={life:2,position:[0,35,0],yaw:.8},before=structuredClone(p),corpse=new DeathPresentation({hips});
 corpse.begin(p,100,{vertical:-100,clip:'death_right',map:0});
 for(const now of [200,1100]){
  const expected=Math.max(0,35-100*(now-100)/1000-300*((now-100)/1000)**2);
  for(const originY of [35,10,0]){
   rig.position.y=originY;model.position.y=0;corpse.apply(now,model,rig,{originY});
   assert.ok(Math.abs(rig.position.y+model.position.y-expected)<1e-10);
  }
 }
 assert.deepEqual(p,before);
});
