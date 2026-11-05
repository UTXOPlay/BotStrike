import test from 'node:test';
import assert from 'node:assert/strict';
import {Vector3} from 'three';
import {FootRecovery} from '../games/botstrike/client/foot-recovery.mjs';
const near=(a,b,epsilon=1e-7)=>assert.ok(a.distanceTo(b)<epsilon,`${a.toArray()} != ${b.toArray()}`);
test('an interrupted foot starts at the outgoing solved position and velocity',()=>{
 const recovery=new FootRecovery(),position=new Vector3(4,2,-5),velocity=new Vector3(0,-3,20),target=new Vector3(-8,0,12),targetVelocity=new Vector3(50,0,-10);
 recovery.begin(position,velocity,target,targetVelocity,0);
 near(recovery.apply(target.clone(),0),position);
 const dt=1e-6,next=recovery.apply(target.clone().addScaledVector(targetVelocity,dt),dt);
 near(next.sub(position).multiplyScalar(1/dt),velocity,.02);
});
test('foot recovery reaches the moving destination with zero position and velocity correction',()=>{
 const recovery=new FootRecovery(),target=new Vector3(20,0,0),velocity=new Vector3(30,0,0);
 recovery.begin(new Vector3(0,3,0),new Vector3(0,-10,0),target,velocity,0,.1);
 const before=recovery.apply(target.clone().addScaledVector(velocity,.1-1e-6),.1-1e-6),end=recovery.apply(target.clone().addScaledVector(velocity,.1),1e-6);
 near(end,target.clone().addScaledVector(velocity,.1));
 near(end.clone().sub(before).multiplyScalar(1e6),velocity,.02);
 assert.equal(recovery.active,false);
});
test('repeated interruptions retain the latest outgoing position instead of an older trajectory',()=>{
 const recovery=new FootRecovery(),target=new Vector3(20,0,0);
 recovery.begin(new Vector3(0,2,0),new Vector3(),target,new Vector3(),0);
 const outgoing=recovery.apply(target.clone(),.03),velocity=new Vector3(2,-4,10),next=new Vector3(-10,0,4);
 recovery.begin(outgoing,velocity,next,new Vector3(),0);
 near(recovery.apply(next.clone(),0),outgoing);
 recovery.clear();assert.equal(recovery.active,false);near(recovery.apply(next.clone(),1),next);
});
test('analytic recovery velocity agrees with the trajectory without snapshot-difference noise',()=>{
 const recovery=new FootRecovery(),target=new Vector3(20,0,-10),targetVelocity=new Vector3(30,0,20),outgoingVelocity=new Vector3(0,-5,-20);
 recovery.begin(new Vector3(0,2,0),outgoingVelocity,target,targetVelocity,0);
 near(recovery.sampleVelocity(targetVelocity,new Vector3()),outgoingVelocity);
 const time=.04,dt=1e-7,point=recovery.apply(target.clone().addScaledVector(targetVelocity,time),time),velocity=recovery.sampleVelocity(targetVelocity,new Vector3());
 const next=recovery.apply(target.clone().addScaledVector(targetVelocity,time+dt),dt);
 near(next.sub(point).multiplyScalar(1/dt),velocity,.002);
 recovery.clear();near(recovery.sampleVelocity(targetVelocity,new Vector3()),targetVelocity);
});
