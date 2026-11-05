import {Vector3,Quaternion} from 'three';
import {TwoBoneIK} from './two-bone-ik.mjs';
import {advanceStridePlan,runningAmount,crouchAmount} from './locomotion-gait.mjs';
import {FootRecovery} from './foot-recovery.mjs';
const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
const smooth=t=>{t=clamp(t,0,1);return t*t*(3-2*t);};
const sides=['L','R'];
const bone=(model,name)=>model.getObjectByName(name)||model.getObjectByName(name.replace('.',''));

// Once per shared asset, calibrate the actual, fully foot-weighted mesh sole.
// Keep vertex references so acceptance can measure post-skinning geometry
// independently of the solver's foot-bone calculation.
export function calibrateFeet(model){
 model.updateMatrixWorld(true);model.traverse(o=>{if(o.isSkinnedMesh)o.skeleton.update();});
 const result={},point=new Vector3();
 for(const side of sides){
  const foot=bone(model,'foot.'+side),thigh=bone(model,'thigh.'+side),shin=bone(model,'shin.'+side),hip=thigh.getWorldPosition(new Vector3()),ankleHeight=foot.getWorldPosition(new Vector3()).y,hipX=[],surface=[],candidates=[];let lowest=Infinity;
  model.traverse(mesh=>{
   if(!mesh.isSkinnedMesh)return;
   const index=mesh.skeleton.bones.indexOf(foot),hipIndex=mesh.skeleton.bones.indexOf(thigh),shinIndex=mesh.skeleton.bones.indexOf(shin),skin=mesh.geometry.attributes.skinIndex,weights=mesh.geometry.attributes.skinWeight;
   for(let i=0;i<skin.count;i++){
    let influence=0,hipInfluence=0,shinInfluence=0;for(let j=0;j<4;j++){const joint=skin.getComponent(i,j),weight=weights.getComponent(i,j);if(joint===index)influence+=weight;if(joint===hipIndex)hipInfluence+=weight;if(joint===shinIndex)shinInfluence+=weight;}
    if(influence+shinInfluence<.98&&hipInfluence<.8)continue;
    mesh.getVertexPosition(i,point);point.applyMatrix4(mesh.matrixWorld);
    if(hipInfluence>=.8&&point.y>=hip.y-.10&&point.y<=hip.y-.025)hipX.push(model.worldToLocal(point.clone()).x);
    if(influence+shinInfluence>=.98&&point.y<=ankleHeight+.06)surface.push({meshName:mesh.name,index:i,world:point.clone()});
    if(influence<.999)continue;lowest=Math.min(lowest,point.y);
    candidates.push({meshName:mesh.name,index:i,world:point.clone()});
   }
  });
  const sole=candidates.filter(p=>p.world.y<=lowest+.006);
  if(sole.length<3)throw Error('Cannot calibrate '+side+' foot sole');
  const center=new Vector3();for(const p of sole)center.add(p.world);center.multiplyScalar(1/sole.length);
  const boot=surface.filter(p=>p.world.y<=lowest+.14),front=Math.min(...boot.map(p=>p.world.z)),back=Math.max(...boot.map(p=>p.world.z));
  const toes=boot.filter(p=>p.world.z<=front+.025),heels=boot.filter(p=>p.world.z>=back-.025),toeCenter=new Vector3(),heelCenter=new Vector3();
  if(toes.length<3||heels.length<3)throw Error('Cannot identify '+side+' toe and heel landmarks');
  for(const p of toes)toeCenter.add(p.world);toeCenter.multiplyScalar(1/toes.length);
  for(const p of heels)heelCenter.add(p.world);heelCenter.multiplyScalar(1/heels.length);
  const axis=toeCenter.clone().sub(heelCenter);axis.y=0;axis.normalize();const soleYaw=Math.atan2(-axis.x,-axis.z);
  const samples=new Set();for(const axis of ['x','z'])for(const sign of [-1,1])samples.add(sole.reduce((a,b)=>sign*a.world[axis]>sign*b.world[axis]?a:b));
  const toeAxis=foot.worldToLocal(center.clone().add(axis)).sub(foot.worldToLocal(center.clone())).normalize();
  hipX.sort((a,b)=>a-b);
  const references=points=>points.map(p=>({meshName:p.meshName,index:p.index}));
  // Width after toe-axis correction, not the wider/narrower bind-pose yaw.
  const bootX=boot.map(p=>p.world.x*Math.cos(soleYaw)-p.world.z*Math.sin(soleYaw));
  result[side]={bootWidth:Math.max(...bootX)-Math.min(...bootX),offset:foot.worldToLocal(center.clone()),home:model.worldToLocal(center.clone()),hipX:hipX.length?hipX[Math.floor(hipX.length/2)]:model.worldToLocal(hip).x,restRotation:foot.getWorldQuaternion(new Quaternion()),soleYaw,toeAxis,toes:references(toes),heels:references(heels),samples:[...samples].map(p=>({meshName:p.meshName,index:p.index,local:foot.worldToLocal(p.world.clone())})),vertices:sole.length};
 }
 return result;
}

function makeFoot(model,bones,side,calibration){
 return {side,bone:bones['foot.'+side],hip:bones['thigh.'+side],solver:new TwoBoneIK(bones['thigh.'+side],bones['shin.'+side],bones['foot.'+side]),
  offset:calibration.offset,home:calibration.home.clone().multiplyScalar(model.scale.x),restRotation:calibration.restRotation,soleYaw:calibration.soleYaw,toeAxis:calibration.toeAxis,
  samples:calibration.samples.map(p=>({...p,mesh:model.getObjectByName(p.meshName)})),
  toes:calibration.toes.map(p=>({...p,mesh:model.getObjectByName(p.meshName)})),heels:calibration.heels.map(p=>({...p,mesh:model.getObjectByName(p.meshName)})),
  anchor:new Vector3(),goal:new Vector3(),desired:new Vector3(),ankle:new Vector3(),sole:new Vector3(),homeWorld:new Vector3(),rotation:new Quaternion(),flat:new Quaternion(),anchorRig:new Quaternion(),
  previous:new Vector3(),velocity:new Vector3(),targetVelocity:new Vector3(),unconstrained:new Vector3(),recovery:new FootRecovery(),
  status:'inactive',reason:'initial',locked:false,feasible:false,ready:false,wasStance:false,released:false,cooldown:0,error:0,bend:0,reach:0,phase:0,plantId:0};
}

export class FootIK{
 constructor(rig,model,bones,calibration,profile){
  this.rig=rig;this.model=model;this.bones=bones;this.profile=profile;
  this.feet=sides.map(side=>makeFoot(model,bones,side,calibration[side]));
  this.footWidth=this.feet[0].home.distanceTo(this.feet[1].home);
  this.bootWidth=Math.max(calibration.L.bootWidth,calibration.R.bootWidth)*model.scale.x;
  this.hipWidth=Math.abs(calibration.R.hipX-calibration.L.hipX)*model.scale.x;
  this.laneCenter=(calibration.R.hipX+calibration.L.hipX)*.5*model.scale.x;
  for(const name of ['travel','previousTravel','travelRate','stepVelocity','nativeVelocity','previousRoot','rootStep','pole','offset','hip','knee','ankle','scale','next'])this[name]=new Vector3();
  this.rigRotation=new Quaternion();this.flatRotation=new Quaternion();this.parentRotation=new Quaternion();this.yawRotation=new Quaternion();
  this.up=new Vector3(0,1,0);this.cycleDuration=.7;this.duty=.3;this.supportTravel=25;this.drop=0;
  rig.updateMatrixWorld(true);bones['thigh.L'].getWorldPosition(this.hip);bones['shin.L'].getWorldPosition(this.knee);bones['foot.L'].getWorldPosition(this.ankle);
  this.legLength=this.hip.distanceTo(this.knee)+this.knee.distanceTo(this.ankle);this.clear('initial');
 }
 clear(reason='reset'){
  this.drop=0;this.pelvisReady=false;this.stepReady=false;this.speedEnvelope=this.runEnvelope=this.continuityTime=0;this.wasMoving=this.wasCrouching=this.previousRun=this.previousSpeed=null;
  for(const f of this.feet){f.status='inactive';f.reason=reason;f.locked=f.feasible=f.ready=f.wasStance=f.released=f.recoverPending=f.adjusted=f.tracking=false;f.cooldown=0;f.error=f.bend=0;f.plantId=0;f.velocity.set(0,0,0);f.recovery.clear();}
 }
 plan(motion,dt){
  advanceStridePlan(this,motion,dt);
  const lateral=motion.speed>1?Math.abs(motion.side)/motion.speed:0;
  // A model's wide bind pose is not a walking stance. Keep forward steps under
  // the visible hip lanes, opening only as much as lateral travel needs.
  const stanceWidth=motion.speed<5?1.25:1,run=runningAmount(motion);
  const neutral=this.hipWidth*(stanceWidth+(1.45-stanceWidth)*crouchAmount(motion));
  const runningWidth=Math.min(this.footWidth,Math.max(neutral,this.supportTravel*lateral+this.hipWidth*.18));
  // During double support the two roots are half a cycle apart. Reserve the
  // measured boot width as well as that lateral travel, preventing the trailing
  // sole from crossing the other foot at a support transfer. Reserve one
  // native 64 Hz position step too: render samples can hold a snapshot.
  const walkingWidth=Math.max(neutral,this.supportTravel*lateral/(2*this.duty)+this.bootWidth+1+Math.abs(motion.side)/64);
  const width=walkingWidth+(runningWidth-walkingWidth)*run;
  for(const f of this.feet){const x=this.laneCenter+(f.side==='L'?-1:1)*width*.5;f.home.x+=(x-f.home.x)*(motion.reset?1:-Math.expm1(-Math.max(0,dt)/.09));}
  return this.cycleDuration;
 }
 release(foot,reason){if(!foot.released)foot.recoverPending=true;foot.locked=foot.feasible=false;foot.released=true;foot.cooldown=.08;foot.reason=reason;foot.status='released';}
 neededDrop(foot,goal,rotation,compression){
  this.hip.setFromMatrixPosition(foot.hip.matrixWorld);this.offset.copy(foot.offset).multiply(this.scale).applyQuaternion(rotation);this.ankle.copy(goal).sub(this.offset);
  const dx=this.hip.x-this.ankle.x,dz=this.hip.z-this.ankle.z,reach=this.legLength*.995,horizontal=dx*dx+dz*dz;
  if(horizontal>=reach*reach)return Infinity;
  return Math.max(0,this.hip.y-this.ankle.y+compression-Math.sqrt(reach*reach-horizontal));
 }
 apply(motion,blend,dt,{active=true,reduced=false,compression=0}={}){
  if(!active||!motion.grounded){this.clear(!motion.grounded?'air':motion.reset||'full-body');return;}
  if(motion.reset)this.clear(motion.reset);
  const seconds=Number.isFinite(dt)?clamp(dt,0,.1):0,moving=motion.speed>5;
  this.speedEnvelope=Math.max(motion.speed,this.speedEnvelope*Math.exp(-seconds/.10));
  this.runEnvelope=Math.max(runningAmount(motion),this.runEnvelope*Math.exp(-seconds/.10));
  // A style/speed change redirects the same feet as a start or stop. Join
  // from the outgoing sole instead of replacing the path at the old phase.
  const run=runningAmount(motion);
  const interrupted=this.wasMoving!==null&&(moving!==this.wasMoving||motion.crouch!==this.wasCrouching||Math.abs(run-this.previousRun)>.2||Math.abs(motion.speed-this.previousSpeed)>Math.max(1,this.previousSpeed*.1));
  this.continuityTime=(interrupted||motion.reversing) ? .25 : Math.max(0,this.continuityTime-seconds);
  this.wasMoving=moving;this.wasCrouching=motion.crouch;this.previousRun=run;this.previousSpeed=motion.speed;
  // Only the skeleton needs an animation refresh here. Weapon render meshes
  // are independent siblings and receive their final matrices at render time.
  this.model.updateWorldMatrix(true,false);this.bones.root.parent.updateWorldMatrix(false,true,true);this.rig.getWorldQuaternion(this.rigRotation);this.model.getWorldScale(this.scale);
  this.nativeVelocity.set(motion.side,0,-motion.forward).applyQuaternion(this.rigRotation);
  this.previousTravel.copy(this.travel);
  this.rootStep.setFromMatrixPosition(this.rig.matrixWorld);
  if(!this.stepReady){this.previousRoot.copy(this.rootStep);this.stepVelocity.copy(this.nativeVelocity);}else this.stepVelocity.lerp(this.nativeVelocity,-Math.expm1(-seconds/.10));
  this.rootStep.sub(this.previousRoot);this.previousRoot.setFromMatrixPosition(this.rig.matrixWorld);
  this.stepReady=true;
  // Short reversals should shrink and redirect a step, rather than flipping a
  // full-length swing across the body. Native position/aim remain immediate.
  this.travel.copy(this.stepVelocity).multiplyScalar(moving?1/Math.max(12,motion.speed,this.stepVelocity.length()):0);
  this.travelRate.copy(this.travel).sub(this.previousTravel).multiplyScalar(seconds>0?1/seconds:0);
  this.pole.set(0,0,-1).applyQuaternion(this.rigRotation);
  // Prepare both world-space foot targets before adjusting the pelvis.
  let recovering=false;
  for(let i=0;i<this.feet.length;i++){
   const f=this.feet[i],phase=(blend.phase+i*.5)%1,stance=!moving||phase<this.duty,boundary=stance!==f.wasStance,held=f.locked;
   f.previous.copy(f.sole);
   f.cooldown=Math.max(0,f.cooldown-seconds);
   // A standing character has no next swing boundary. Replant after a short
   // recovery instead of leaving both feet permanently released after a pivot.
   if(!moving&&f.released&&f.cooldown===0){f.released=false;f.wasStance=false;}
   f.phase=phase;this.rig.localToWorld(f.homeWorld.copy(f.home));f.homeWorld.y=0;
   // Correct each mesh's measured toe axis in world-up space. Rotating around
   // a foot bone's local Z also rolls the sole and exaggerates toe-out.
   this.yawRotation.setFromAxisAngle(this.up,-f.soleYaw);
   this.flatRotation.copy(this.rigRotation).multiply(this.yawRotation).multiply(f.restRotation);
   f.flat.copy(this.flatRotation);
   if(!stance){f.released=false;f.wasStance=false;f.locked=false;f.status='swing';f.reason=null;}
   if(stance&&!f.wasStance&&!f.released){
    f.adjusted=false;
    const progress=moving?phase/this.duty:.5;
    f.anchor.copy(f.homeWorld).addScaledVector(this.travel,moving?this.supportTravel*(.5-progress):0);f.anchor.y=0;
    // Finish a stop at the outgoing sole, not at the neutral bind-pose home.
    if(!moving&&f.ready){f.anchor.copy(f.sole);f.anchor.y=0;}
    f.rotation.copy(this.flatRotation);f.anchorRig.copy(this.rigRotation);f.locked=true;f.status='stance';f.reason=null;
    f.plantId++;
   }
   f.wasStance=stance;
   if(!moving&&interrupted&&f.ready&&!held){f.anchor.copy(f.sole);f.anchor.y=0;f.anchorRig.copy(this.rigRotation);f.released=false;f.reason=null;}
   if((interrupted||motion.reversing)&&stance)f.adjusted=true;
   if(f.locked&&f.anchorRig.angleTo(this.rigRotation)>.75)this.release(f,'pivot');
   if(stance&&!f.released){f.desired.copy(f.anchor);f.targetVelocity.set(0,0,0);}
   else{
    const u=stance?clamp(phase/this.duty,0,1):clamp((phase-this.duty)/(1-this.duty),0,1),u2=u*u,u3=u2*u;
    // Hermite endpoint velocity cancels root travel at lift-off/touch-down.
    const tangent=-motion.speed*this.cycleDuration*(1-this.duty)/this.supportTravel;
    const travel=stance?.5-u:(2*u3-3*u2+1)*-.5+(u3-2*u2+u)*tangent+(-2*u3+3*u2)*.5+(u3-u2)*tangent;
    f.desired.copy(f.homeWorld).addScaledVector(this.travel,clamp(travel,-.65,.65)*this.supportTravel);
    const standingLift=1.25+2.25*runningAmount(motion),lift=standingLift+(.65+.45*smooth((motion.speed-40)/90)-standingLift)*crouchAmount(motion);
    f.desired.y=stance?0:Math.sin(Math.PI*u)**2*lift*this.profile.lift*(reduced?.65:1);
    const derivative=travel<=-.65||travel>=.65?0:stance?-1:6*u*(1-u)+(6*u2-6*u+1)*tangent;
    f.targetVelocity.copy(this.nativeVelocity).addScaledVector(this.travel,derivative*this.supportTravel/(this.cycleDuration*(stance?this.duty:1-this.duty))).addScaledVector(this.travelRate,clamp(travel,-.65,.65)*this.supportTravel);
    f.targetVelocity.y=stance?0:Math.sin(2*Math.PI*u)*Math.PI*lift*this.profile.lift*(reduced?.65:1)/(this.cycleDuration*(1-this.duty));
    if(!f.ready)f.rotation.copy(this.flatRotation);else f.rotation.slerp(this.flatRotation,-Math.expm1(-seconds/.045));
   }
   // A retained anchor can differ from the nominal gait path after a reversal.
   // Bridge that later lift too; ordinary uninterrupted cycles keep their
   // authored target path without an unnecessary recovery or pelvis drop.
   const retainSupport=held&&stance,bridgeBoundary=boundary&&(f.adjusted||f.recovery.active);
   if(f.ready&&(interrupted&&!retainSupport||f.recoverPending||bridgeBoundary))f.recovery.begin(f.sole,f.velocity,f.desired,f.targetVelocity,seconds,.05);
   if(!stance)f.adjusted=false;
   f.recoverPending=false;
   f.goal.copy(f.desired);f.recovery.apply(f.goal,seconds);
   // Bound a redirected step in body-relative space. A 64 Hz snapshot can
   // move the root between render samples; that displacement is preserved in
   // full. Only the additional cosmetic foot excursion has a speed budget.
   const tracking=f.tracking;f.tracking=false;
   if(f.ready&&(!retainSupport||f.recovery.active)&&(this.continuityTime>0||f.recovery.active||tracking)){
    this.next.copy(f.goal).sub(f.previous).sub(this.rootStep);
    const limit=((2.25-.75*this.runEnvelope)*this.speedEnvelope+80)*seconds,distance=this.next.length();
    if(distance>limit){f.goal.copy(f.previous).add(this.rootStep).addScaledVector(this.next,limit/distance);f.tracking=true;}
   }
   f.goal.y=Math.max(0,f.goal.y);
   f.unconstrained.copy(f.goal);
   f.recovery.sampleVelocity(f.targetVelocity,f.velocity);if(f.goal.y===0)f.velocity.y=Math.max(0,f.velocity.y);
   if(stance&&!f.released){f.locked=!f.recovery.active&&!f.tracking;f.status=f.locked?'stance':'settling';}
   recovering||=f.recovery.active||f.tracking;
  }
  // Extra reach during a handoff keeps a near-limit outgoing sole reachable
  // while the body braking pose changes. Steady locomotion keeps its old bound.
  const dropLimit=this.continuityTime>0||recovering?8:7;
  let required=0,anticipated=0;
  for(const f of this.feet){
   if(f.wasStance&&!f.released||this.continuityTime>0||f.recovery.active||f.tracking){
    const needed=this.neededDrop(f,f.goal,f.rotation,compression);
    if(needed>dropLimit)this.release(f,'unreachable');else required=Math.max(required,needed);
   }else if(moving&&!f.wasStance){
    const u=clamp((f.phase-this.duty)/(1-this.duty),0,1);
    if(u>.75){this.next.copy(f.homeWorld).addScaledVector(this.travel,this.supportTravel*.5);const needed=this.neededDrop(f,this.next,f.flat,compression);if(needed<=dropLimit)anticipated=Math.max(anticipated,needed*smooth((u-.75)/.25));}
   }
  }
  // Only actual support reach may force the pelvis down. Anticipation prepares
  // the next plant; recovery retains the source pose instead of flattening it
  // to a permanently crouched worst-case stride height.
  const target=clamp(Math.max(required,anticipated),0,dropLimit),recovery=motion.speed>180?.10:.04;
  this.drop=this.pelvisReady?Math.max(required,this.drop+(target-this.drop)*-Math.expm1(-seconds/recovery)):target;this.pelvisReady=true;
  this.bones.hips.position.z-=this.drop/this.scale.z;this.bones.hips.updateWorldMatrix(false,true);
  for(const f of this.feet){
   this.offset.copy(f.offset).multiply(this.scale).applyQuaternion(f.rotation);f.ankle.copy(f.goal).sub(this.offset);this.hip.setFromMatrixPosition(f.hip.matrixWorld);
   if(!f.locked){
    // Keep swing clearance and shorten an unreachable horizontal excursion.
    // Raising the whole flat foot to compensate produces a backward high kick.
    const reach=this.legLength*.995,vertical=this.hip.y-f.ankle.y;
    if(vertical>reach)f.ankle.y=this.hip.y-reach;
    const dy=this.hip.y-f.ankle.y,limit=Math.sqrt(Math.max(0,reach*reach-dy*dy)),dx=f.ankle.x-this.hip.x,dz=f.ankle.z-this.hip.z,distance=Math.hypot(dx,dz);
    if(distance>limit&&distance>1e-6){f.ankle.x=this.hip.x+dx*limit/distance;f.ankle.z=this.hip.z+dz*limit/distance;}
    f.goal.copy(f.ankle).add(this.offset);
   }
   const solved=f.solver.solve(f.ankle,this.pole,false);
   if(f.locked&&!solved.reachable)this.release(f,'joint-limit');
   this.parentRotation.setFromRotationMatrix(f.solver.rotationMatrix.extractRotation(f.bone.parent.matrixWorld)).normalize();f.bone.quaternion.copy(this.parentRotation.invert().multiply(f.rotation)).normalize();f.bone.updateWorldMatrix(false,true);
   f.sole.copy(f.offset).applyMatrix4(f.bone.matrixWorld);
   f.feasible=f.locked&&solved.reachable;f.error=f.locked?f.sole.distanceTo(f.anchor):0;f.bend=solved.bend;f.reach=solved.requested/this.legLength;
   // Snapshots arrive on a native tick clock. Estimate the outgoing velocity
   // in root-relative space, then restore native velocity; otherwise duplicate
   // snapshots followed by a tick can amplify recovery momentum at 120 Hz.
   if(f.feasible||!f.ready)f.velocity.set(0,0,0);
   else if(seconds>0&&(f.tracking||f.goal.distanceToSquared(f.unconstrained)>.0001))f.velocity.copy(f.sole).sub(f.previous).sub(this.rootStep).multiplyScalar(1/seconds).add(this.nativeVelocity);
   f.ready=true;
  }
 }
}
