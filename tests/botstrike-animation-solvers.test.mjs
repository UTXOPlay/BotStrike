import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Bone,Vector3,Quaternion} from 'three';
import {TwoBoneIK} from '../games/botstrike/client/two-bone-ik.mjs';
import {BonePose} from '../games/botstrike/client/bone-pose.mjs';
import {DampedSpring,AnimationSprings} from '../games/botstrike/client/animation-springs.mjs';
import {motionProfiles} from '../games/botstrike/client/motion-profiles.mjs';
import {PoseInertia} from '../games/botstrike/client/pose-inertia.mjs';

const near=(a,b,tolerance=1e-8)=>assert.ok(Math.abs(a-b)<tolerance,`${a} != ${b}`);
function limb(){const root=new Group(),upper=new Bone(),middle=new Bone(),end=new Bone();root.add(upper);upper.add(middle);middle.add(end);middle.position.set(0,-.4,0);end.position.set(0,-.38,0);return {root,upper,middle,end,solver:new TwoBoneIK(upper,middle,end),pose:new BonePose({upper,middle,end})};}

test('two-bone IK reaches targets without changing segment lengths under world transforms',()=>{
 const l=limb(),target=new Vector3(),end=new Vector3(),pole=new Vector3(0,0,-1);l.pose.capture();
 l.root.position.set(100,45,-70);l.root.scale.setScalar(36);l.root.rotation.set(.1,1.2,-.05);
 for(let i=0;i<1000;i++){
  l.pose.restore();l.pose.capture();l.root.updateMatrixWorld(true);
  const distance=.20+(i%100)/100*.54,a=i*2.39996;
  target.set(Math.cos(a)*distance*.3,-distance,Math.sin(a)*distance*.3);l.root.localToWorld(target);
  const result=l.solver.solve(target,pole);assert.equal(result.reachable,true);assert.ok(result.error<1e-7,JSON.stringify(result));
  const p=l.upper.getWorldPosition(new Vector3()),q=l.middle.getWorldPosition(new Vector3());l.end.getWorldPosition(end);
  near(p.distanceTo(q),.4*36);near(q.distanceTo(end),.38*36);
  for(const bone of [l.upper,l.middle,l.end])near(bone.quaternion.length(),1);
 }
});

test('IK clamps unreachable and singular targets without extending or flipping a limb',()=>{
 const l=limb(),pole=new Vector3(0,-1,0);l.pose.capture();
 for(const target of [new Vector3(0,-10,0),new Vector3(),new Vector3(0,-.01,0)]){
  l.pose.restore();l.pose.capture();l.root.updateMatrixWorld(true);const r=l.solver.solve(target,pole);
  assert.equal(r.reachable,false);assert.ok(Number.isFinite(r.error));assert.ok(r.bend>=.08-1e-8&&r.bend<=2.7+1e-8);
  near(l.middle.position.length(),.4);near(l.end.position.length(),.38);
  for(const bone of [l.upper,l.middle,l.end])assert.ok(bone.quaternion.toArray().every(Number.isFinite));
 }
});

test('a shared pose baseline restores every procedural translation and rotation',()=>{
 const l=limb();l.pose.capture();const q=new Quaternion().setFromAxisAngle(new Vector3(1,0,0),.8);
 for(let i=0;i<1000;i++){l.upper.quaternion.multiply(q);l.middle.position.x+=.1;l.end.position.z-=.3;l.pose.restore();near(l.upper.quaternion.w,1);near(l.middle.position.x,0);near(l.end.position.z,0);l.pose.capture();}
});

test('critical springs retain velocity, settle, and match across frame subdivisions',()=>{
 const target=[.08,-.1,.15],run=fps=>{const s=new DampedSpring();s.velocity.set([1,-1,2]);for(let i=0;i<fps/2;i++)s.step(target,1/fps,9,.2);return s;};
 const reference=run(60);for(const fps of [30,120])run(fps).value.forEach((v,i)=>near(v,reference.value[i]));
 reference.value.forEach((v,i)=>near(v,target[i],1e-7));
 const impulse=new DampedSpring();impulse.velocity[0]=3;impulse.step([0,0,0],1/60,8,.2);assert.ok(impulse.value[0]>0);for(let i=0;i<120;i++)impulse.step([0,0,0],1/60,8,.2);near(impulse.value[0],0);
});

test('six cosmetic profiles are distinct and optional inertia clears under reduced motion',()=>{
 assert.equal(motionProfiles.length,6);assert.equal(new Set(motionProfiles.map(p=>p.bodyHz)).size,6);
 const m={accelerationForward:2000,accelerationSide:-1000,turnRate:4,landed:false};
 for(const p of motionProfiles){const s=new AnimationSprings(p);s.fire(3);s.update(m,1/60);assert.ok(s.recoil.value[0]>0);assert.ok(s.lean.value[0]<0);s.update(m,1/60,{reduced:true});assert.ok(s.recoil.value.every(v=>v===0));assert.ok(s.lean.value.every(v=>v===0));}
});

test('pose inertia preserves bounded outgoing motion and clears for immediate combat/reset',()=>{
 const bones=Object.fromEntries(['hips','spine','chest','head','upper_arm.L','upper_arm.R'].map(name=>[name,new Bone()]));
 const inertia=new PoseInertia(bones,motionProfiles[2]);inertia.apply('idle',1/60);
 bones.chest.rotation.x=.2;inertia.apply('reload',1/60);assert.ok(bones.chest.rotation.x<.2&&bones.chest.rotation.x>.09);
 for(let i=0;i<120;i++){for(const b of Object.values(bones))b.quaternion.identity();bones.chest.rotation.x=.2;inertia.apply('reload',1/60);}
 near(bones.chest.rotation.x,.2);assert.ok(inertia.maxAngle<1e-6);
 bones.chest.rotation.x=-.2;inertia.apply('fire',1/60,{immediate:true});near(bones.chest.rotation.x,-.2);near(inertia.maxAngle,0);
 inertia.apply('idle',1/60,{enabled:false});assert.equal(inertia.ready,false);near(inertia.maxTranslation,0);
 for(let i=0;i<1000;i++){bones.hips.rotation.z=i%2?.3:-.3;inertia.apply(String(i),1/120);assert.ok(inertia.maxAngle<=.18+1e-8);assert.ok(inertia.maxTranslation<=.045+1e-8);}
});
