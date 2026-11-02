import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {clone} from 'three/addons/utils/SkeletonUtils.js';
import {AnimationMotion} from './animation-motion.mjs';
import {LocomotionBlend,locomotionClips} from './locomotion-blend.mjs';
import {FootIK,calibrateFeet} from './foot-ik.mjs';
import {TwoBoneIK} from './two-bone-ik.mjs';
import {BonePose} from './bone-pose.mjs';
import {AnimationSprings} from './animation-springs.mjs';
import {motionProfiles} from './motion-profiles.mjs';
import {PoseInertia} from './pose-inertia.mjs';

export const chassisNames=['vector','patch','bastion','spectre','glitch','forge'];
export const transitionNames=['start','brake','pivot_left','pivot_right','pivot_back_left','pivot_back_right','land_hard','crouch_enter','weapon_ready'];
export const motionNames=['idle','walk','run','backpedal','strafe_left','strafe_right','crouch','crouch_walk','jump','fall','land','fire','reload','equip','use_item','utility','skill','interact','hit','death_back','death_left','death_right','respawn','victory','defeat',...transitionNames];
const lower=/^(root|hips|thigh|shin|foot)/;
const gaitMotion=/^lower:(?:idle|walk|run|backpedal|strafe_left|strafe_right|crouch|crouch_walk)$/;
const boneName=track=>track.name.slice(0,track.name.lastIndexOf('.'));
const tmp=new THREE.Vector3(),identity=new THREE.Quaternion();
function neutralHandFrames(model,idle){
 const mixer=new THREE.AnimationMixer(model);mixer.clipAction(idle).play();mixer.update(0);model.updateMatrixWorld(true);
 const hands={};model.traverse(b=>{if(b.isBone)for(const side of ['L','R'])if(b.name.replace('.','')==='hand'+side)hands[side]=b.getWorldQuaternion(new THREE.Quaternion()).normalize();});
 mixer.stopAllAction();mixer.uncacheRoot(model);model.updateMatrixWorld(true);return hands;
}
function trimRestTracks(model,clip){
 // The exporter includes rest translations/scales on every bone in every clip.
 // They carry no motion and otherwise multiply mixer work for each blend.
 clip.tracks=clip.tracks.filter(track=>{
  const object=model.getObjectByName(boneName(track)),property=track.name.slice(track.name.lastIndexOf('.')+1);
  if(!object||!['position','scale'].includes(property))return true;
  const rest=object[property],values=track.values;
  for(let i=0;i<values.length;i++)if(Math.abs(values[i]-rest.getComponent(i%3))>1e-5)return true;
  return false;
 });return clip;
}
// Models and textures are shared; every actor owns an independent cloned rig.
export function createCharacters(art,{weapons=null}={}){
 const templates=[],weaponTemplates=new Map(),teamMaterials=[0x69efff,0xffae67].map(color=>new THREE.MeshBasicMaterial({color,toneMapped:false})),badgeGeometry=new THREE.BoxGeometry(.09,.025,.035);
 const stamp=document.createElement('canvas');stamp.width=stamp.height=64;const ctx=stamp.getContext('2d'),gradient=ctx.createRadialGradient(32,32,5,32,32,32);gradient.addColorStop(0,'rgba(0,0,0,.5)');gradient.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,64,64);const shadowTexture=new THREE.CanvasTexture(stamp),shadowMaterial=new THREE.MeshBasicMaterial({map:shadowTexture,transparent:true,depthWrite:false}),shadowGeometry=new THREE.PlaneGeometry(43,36);
 async function preload(progress=()=>{}){
  const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  for(let offset=0;offset<6;offset+=2)await Promise.all(chassisNames.slice(offset,offset+2).map(async(name,index)=>{
   const response=await fetch('./models/'+name+'.glb',{cache:'no-cache',signal:AbortSignal.timeout(60000)});
   if(!response.ok)throw Error('Could not load '+name+' chassis. Please retry.');
   const model=await loader.parseAsync(await response.arrayBuffer(),'./models/');
   let textured=false;model.scene.traverse(o=>{for(const m of o.material?(Array.isArray(o.material)?o.material:[o.material]):[])if(m.map&&m.normalMap&&m.roughnessMap)textured=true;});
   if(!textured)throw Error('Could not load '+name+' chassis textures. Please retry.');
   const clips=Object.fromEntries(model.animations.map(c=>[c.name.split('|').pop(),trimRestTracks(model.scene,c)]));
   for(const required of motionNames)if(!clips[required])throw Error(name+' is missing its '+required+' animation.');
   model.scene.traverse(o=>{if(o!==model.scene&&!o.isBone){o.updateMatrix();o.matrixAutoUpdate=false;}if(o.isMesh){o.castShadow=false;o.receiveShadow=true;o.frustumCulled=true;if(o.isSkinnedMesh)o.boundingSphere=new THREE.Sphere(new THREE.Vector3(0,1,0),2.5);}});
   model.scene.traverse(o=>{for(const m of o.material?(Array.isArray(o.material)?o.material:[o.material]):[]){m.fog=false;m.envMapIntensity=1.1;if(m.emissive?.getHex()===0){m.emissive.set('#30404a');m.emissiveIntensity=.12;}}});
   const transitions={},compression={};for(const name of transitionNames){const clip=clips[name].clone();clip.name='transition:'+name;clip.tracks=clip.tracks.filter(t=>/^(hips|spine|chest|head)$/.test(boneName(t)));THREE.AnimationUtils.makeClipAdditive(clip,0,clips.idle);transitions[name]=clip;const track=clip.tracks.find(t=>t.name==='hips.position');if(track)compression[name]=track.createInterpolant(new Float32Array(3));}
   templates[offset+index]={model:model.scene,clips,transitions,compression,feet:calibrateFeet(model.scene),hands:neutralHandFrames(model.scene,clips.idle)};progress(templates.filter(Boolean).length,6);
  }));
  for(let kind=0;kind<12;kind++){weaponTemplates.set(kind,art.weaponModel(kind));await new Promise(requestAnimationFrame);}
 }
 function actor(slot,hero,weapon=2,{firstPerson=false,legacyLocomotion=false}={}){
  const source=templates[hero];if(!source)throw Error('Chassis has not loaded');
  const badges=[];const rig=new THREE.Group(),model=clone(source.model);rig.add(model);model.scale.setScalar(70/1.94);
  const bones={};model.traverse(o=>{if(o.isBone)bones[o.name]=o;for(const side of ['L','R'])for(const part of ['upper_arm','forearm','hand','thigh','shin','foot'])if(o.name===part+side)bones[part+'.'+side]=o;});
  if(firstPerson)model.traverse(o=>{if(!o.isSkinnedMesh)return;
   // Keep the original skeleton and weights, but render only arm triangles.
   const g=o.geometry.clone(),indices=g.index.array,skin=g.attributes.skinIndex,weights=g.attributes.skinWeight,keep=[];
   const arms=new Set(o.skeleton.bones.map((b,i)=>/forearm|hand|weapon/.test(b.name)?i:-1));
   const arm=v=>{let total=0;for(let j=0;j<4;j++)if(arms.has(skin.getComponent(v,j)))total+=weights.getComponent(v,j);return total>.8;};
   const groups=[];for(const group of g.groups.length?g.groups:[{start:0,count:indices.length,materialIndex:0}]){const begin=keep.length;for(let i=group.start;i<group.start+group.count;i+=3)if(arm(indices[i])&&arm(indices[i+1])&&arm(indices[i+2]))keep.push(indices[i],indices[i+1],indices[i+2]);groups.push({start:begin,count:keep.length-begin,materialIndex:group.materialIndex});}
   g.setIndex(keep);g.clearGroups();groups.forEach(x=>g.addGroup(x.start,x.count,x.materialIndex));o.geometry=g;o.receiveShadow=false;
  });
  if(!firstPerson){for(const side of ['L','R']){const badge=new THREE.Mesh(badgeGeometry,teamMaterials[slot<5?0:1]);badge.position.set(0,.04,-.13);bones['upper_arm.'+side].add(badge);badges.push(badge);}const shadow=new THREE.Mesh(shadowGeometry,shadowMaterial);shadow.rotation.x=-Math.PI/2;shadow.position.y=.15;rig.add(shadow);}
  // The support arm has a wider first-person stance. Reloads draw the weapon
  // inward with the trigger arm so the magazine remains within support reach.
  const pose=new BonePose(bones),profile=motionProfiles[hero],springs=new AnimationSprings(profile),inertia=new PoseInertia(bones,profile);
  const baseModelPosition=model.position.clone(),baseModelRotation=model.quaternion.clone();
  const armSolvers=Object.fromEntries(['L','R'].map(side=>[side,new TwoBoneIK(bones['upper_arm.'+side],bones['forearm.'+side],bones['hand.'+side],{minBend:.08,maxBend:2.95})]));
  const gripTarget=new THREE.Vector3(),gripPole=new THREE.Vector3(),triggerOffset=new THREE.Vector3();let leftWidened=false,fireAt=-Infinity,fireImpulses=0;
  const handWorld=new THREE.Quaternion(),handGoal=new THREE.Quaternion(),handParent=new THREE.Quaternion(),handMatrix=new THREE.Matrix4();
  const contacts={L:{error:0,reachable:true,engaged:false,wrist:0},R:{error:0,reachable:true,engaged:false,wrist:0}};
  const gripFit={delta:new THREE.Vector3(),point:new THREE.Vector3(),axis:new THREE.Vector3(),target:new THREE.Vector3(),local:new THREE.Vector3(),scale:new THREE.Vector3(),L:{shoulder:new THREE.Vector3(),point:new THREE.Vector3()},R:{shoulder:new THREE.Vector3(),point:new THREE.Vector3()}};
  for(const side of ['L','R']){const f=gripFit[side],solver=armSolvers[side],u=solver.middle.position.length(),v=solver.end.position.length();f.minLocal=Math.sqrt(u*u+v*v+2*u*v*Math.cos(solver.maxBend));f.maxLocal=Math.sqrt(u*u+v*v+2*u*v*Math.cos(solver.minBend));}
  const warpRestore={hips:new THREE.Quaternion(),spine:new THREE.Quaternion()};
  function restorePose(){
   pose.restore();model.position.copy(baseModelPosition);model.quaternion.copy(baseModelRotation);leftWidened=false;
  }
  function grip(side,target){
   if(firstPerson&&side==='L'&&!leftWidened){bones['upper_arm.L'].position.x+=.15;leftWidened=true;bones['upper_arm.L'].updateWorldMatrix(false,true);}
   model.localToWorld(gripTarget.copy(target));gripPole.set(side==='L'?-.7:.7,-1,.3).transformDirection(model.matrixWorld);
   const result=armSolvers[side].solve(gripTarget,gripPole,false);contacts[side].error=result.error;contacts[side].reachable=result.reachable;
  }
  function wrist(side){
   const hand=bones['hand.'+side];handGoal.setFromRotationMatrix(handMatrix.extractRotation(gunAnchor.matrixWorld)).normalize().multiply(source.hands[side]);handWorld.setFromRotationMatrix(handMatrix.extractRotation(hand.matrixWorld)).normalize();
   const angle=handWorld.angleTo(handGoal),bound=1.1;if(angle>bound)handWorld.slerp(handGoal,bound/angle);else handWorld.copy(handGoal);
   handParent.setFromRotationMatrix(handMatrix.extractRotation(hand.parent.matrixWorld)).normalize();hand.quaternion.copy(handParent.invert().multiply(handWorld)).normalize();contacts[side].wrist=Math.min(angle,bound);hand.updateWorldMatrix(false,true);
  }
  function updateWeaponFrames(){
   // IK needs the weapon root and contact markers. Static render meshes get
   // their world matrices during drawing, after the final weapon placement.
   // The model/skeleton were refreshed above, including airborne and full-body
   // paths. Reading contacts does not need another walk through those parents.
   gunAnchor.updateWorldMatrix(false,false);gun.updateWorldMatrix(false,false,true);
   triggerGrip.updateWorldMatrix(false,false,true);supportGrip.updateWorldMatrix(false,false,true);magazine?.updateWorldMatrix(false,false,true);
  }
  function fitWeaponGrip(leftTarget){
   // Project the rigid weapon translation into both arms' reachable shells.
   // Keep aim/orientation unchanged and preserve every authored bone length.
   if(firstPerson&&!leftWidened){bones['upper_arm.L'].position.x+=.15;leftWidened=true;bones['upper_arm.L'].updateWorldMatrix(false,true);}
   updateWeaponFrames();gripFit.delta.set(0,0,0);gripFit.scale.setFromMatrixScale(model.matrixWorld);
   for(const side of ['R','L']){
    const f=gripFit[side],solver=armSolvers[side];f.shoulder.setFromMatrixPosition(solver.upper.matrixWorld);
    f.min=f.minLocal*gripFit.scale.x+.05;f.max=f.maxLocal*gripFit.scale.x-.05;
    f.point.setFromMatrixPosition((side==='R'?triggerGrip:leftTarget).matrixWorld);
   }
   for(let iteration=0;iteration<12;iteration++){
    let correction=0;
    for(const side of ['R','L']){
     const f=gripFit[side];gripFit.axis.copy(f.point).add(gripFit.delta).sub(f.shoulder);const d=gripFit.axis.length(),offset=THREE.MathUtils.clamp(d,f.min,f.max)-d;
     correction=Math.max(correction,Math.abs(offset));if(d>1e-6)gripFit.delta.addScaledVector(gripFit.axis,offset/d);
    }
    if(correction<1e-5)break;
   }
   if(gripFit.delta.lengthSq()<1e-10)return;
   gripFit.target.copy(gripFit.R.point).add(gripFit.delta);grip('R',model.worldToLocal(gripFit.local.copy(gripFit.target)));
   bones['hand.R'].getWorldPosition(gripFit.target);model.worldToLocal(gripFit.target);gunAnchor.position.copy(gripFit.target).sub(triggerOffset);updateWeaponFrames();
  }
  const mixer=new THREE.AnimationMixer(model),actions=new Map();
  function action(name,layer='full'){
   const key=layer+':'+name;if(actions.has(key))return actions.get(key);
   const original=source.clips[name];const clip=layer==='transition'?source.transitions[name]:layer==='full'?original:new THREE.AnimationClip(key,original.duration,original.tracks.filter(t=>lower.test(boneName(t))===(layer==='lower')));
   const a=mixer.clipAction(clip);actions.set(key,a);return a;
  }
  let base=null,upper=null,full=null,upperUntil=0,fullUntil=0,lastLife=null,lastAlive=null,lastAir=false,lastReload=0,lastWeapon=weapon,deadAt=0,lastNow=0,lastPhase=null,reloadDuration=0,prop=null,propUntil=0,gaitPhase=0,hitAt=-Infinity,hitForce=0;
  let transition=null,transitionUntil=0,transitionKind=null,lastCrouch=false,lastScoped=false,pivotAngle=0;
  const pendingEvents=[];
  function transitionTo(name,now){
   if(transition)transition.fadeOut(.06);transition=action(name,'transition');transition.reset().setLoop(THREE.LoopOnce,1).setEffectiveWeight(.55);transition.clampWhenFinished=true;transition.play();transitionUntil=now+source.clips[name].duration*1000;transitionKind=name;
  }
  const hybrid=!firstPerson&&!legacyLocomotion,signals=new AnimationMotion(),blend=new LocomotionBlend(locomotionClips.map(name=>source.clips[name].duration));
  const feet=hybrid?new FootIK(rig,model,bones,source.feet,profile):null;
  const lowerActions=hybrid?locomotionClips.map(name=>action(name,'lower')):[];
  // The glTF root converts Blender's Z-up bone space into scene Y-up.
  const yawWarp=new THREE.Quaternion(),counterWarp=new THREE.Quaternion(),bodyEuler=new THREE.Euler();
  let gun=null,magazine=null,pump=null,triggerGrip=null,supportGrip=null,pumpAt=-Infinity;const gunAnchor=new THREE.Group();model.add(gunAnchor);
  function equip(kind){if(gun)gunAnchor.remove(gun);gun=weaponTemplates.get(kind).clone(true);magazine=gun.getObjectByName('magazine');pump=gun.getObjectByName('pump');pumpAt=fireAt=-Infinity;fireImpulses=0;springs.recoil.clear();springs.ready.clear();reloadDuration=0;const stock=gun.getObjectByName('stock');if(stock&&firstPerson)stock.visible=false;gun.scale.setScalar(.016);gunAnchor.add(gun);lastWeapon=kind;
   gun.traverse(o=>{if(o!==magazine&&o!==pump){o.updateMatrix();o.matrixAutoUpdate=false;}});
   triggerGrip=new THREE.Object3D();triggerGrip.name='grip-trigger';triggerGrip.position.set(0,-6.3,3);gun.add(triggerGrip);
   supportGrip=new THREE.Object3D();supportGrip.name='grip-support';supportGrip.position.set(-1.5625,-6.875,-7.5);gun.add(supportGrip);
  }
  equip(weapon);
  function swap(current,next,loop=true,fade=.12){
   if(current===next)return current;next.reset().setEffectiveTimeScale(1).setEffectiveWeight(1);next.setLoop(loop?THREE.LoopRepeat:THREE.LoopOnce,loop?Infinity:1);next.clampWhenFinished=!loop;
   if(!firstPerson&&loop&&gaitMotion.test(next.getClip().name)){const prior=current&&gaitMotion.test(current.getClip().name)?current.time/current.getClip().duration:gaitPhase;next.time=(prior%1)*next.getClip().duration;}
   next.play();
   if(current)current.crossFadeTo(next,fade,false);return next;
  }
  function reset(p,now,reason='life'){mixer.stopAllAction();base=upper=full=null;upperUntil=fullUntil=0;lastLife=p.life;lastAlive=p.alive;lastAir=false;lastReload=0;deadAt=0;hitAt=-Infinity;hitForce=0;
   // A stable per-life offset prevents identical run clips from marching in lockstep.
   gaitPhase=(slot*.38196601125+(p.life||0)*.1414213562)%1;
   signals.clear(reason);blend.clear(gaitPhase);feet?.clear(reason);springs.reset();inertia.reset();transition=null;transitionUntil=0;transitionKind=null;lastCrouch=!!p.crouch;lastScoped=!!p.scoped;pivotAngle=0;fireAt=pumpAt=-Infinity;fireImpulses=0;propUntil=0;reloadDuration=0;
   base=swap(null,action('idle','lower'));upper=swap(null,action('idle','upper'));lastNow=now;
  }
  function trigger(name,now,duration,value,life=null,sampled=false){
   if(!source.clips[name])return;
   // Feedback can arrive before this rig has sampled the new life. Bind that
   // event to its life instead of dropping it or animating a previous corpse.
   if(lastLife===null||life!==null&&life!==lastLife||name==='fire'&&!sampled){pendingEvents.push({name,now,duration,value,life});if(pendingEvents.length>16)pendingEvents.shift();return;}
   if(lastAlive===false)return;
   if(name==='fire'){fireAt=now;fireImpulses=Math.min(4,fireImpulses+1);}
   if(name==='fire'&&pump)pumpAt=now;
   if(name==='hit'&&!firstPerson){hitAt=now;hitForce=THREE.MathUtils.clamp((value||0)/35,.7,1.2);}
   if(name==='fire'&&upper?.getClip().name==='upper:hit'&&now<upperUntil)return;
   if(name==='hit'&&upper?.getClip().name==='upper:reload'&&now<upperUntil)return;
   if(name==='land'&&upper?.getClip().name!=='upper:idle'&&now<upperUntil)return;
   if(['utility','use_item'].includes(name)&&Number.isInteger(value)&&value>=0&&value<12){if(prop){prop.removeFromParent();prop.traverse(o=>o.geometry?.dispose());}prop=art.equipment(value);prop.scale.setScalar(.012);model.add(prop);propUntil=now+900;}
   const next=action(name,'upper');if(upper===next){next.reset().play();}else upper=swap(upper,next,false,name==='hit'?.045:.08);
   const seconds=duration||source.clips[name].duration;next.setEffectiveTimeScale(source.clips[name].duration/Math.max(.1,seconds));upperUntil=now+seconds*1000;
   if(name==='reload'){reloadDuration=Math.max(reloadDuration,Math.round(seconds*64),weapons?.[lastWeapon]?.reload||0);next.time=source.clips.reload.duration*Math.max(0,1-seconds*64/reloadDuration);next.setEffectiveTimeScale(source.clips.reload.duration/(reloadDuration/64));}
  }
  function update(p,state,now,dt,{reduced=false}={}){
   // Undo last frame's procedural pose before reset, crossfades or mixer sampling.
   restorePose();
   if(lastNow&&now-lastNow>250)signals.clear('gap');
   if(lastLife!==p.life||lastAlive===null){const reboot=lastLife!==null&&p.alive;reset(p,now,lastLife===null?signals.output.reset||'initial':'life');if(reboot)lastAlive=false;}
   if(lastPhase!==state.phase&&state.phase!=='finished'&&state.phase!=='round_end'&&fullUntil===Infinity&&p.alive)fullUntil=0;lastPhase=state.phase;
   if(p.weapon!==lastWeapon){equip(p.weapon);if(p.alive)trigger('equip',now,.4);}
   if(!p.alive){
    pendingEvents.length=0;
    if(lastAlive){deadAt=now;const name=['death_back','death_left','death_right'][(slot+(p.life||0))%3];full=swap(full,action(name),false,.07);base?.fadeOut(.07);upper?.fadeOut(.07);fullUntil=Infinity;}
    if(!deadAt){deadAt=now;full=swap(full,action('death_back'),false,0);full.time=source.clips.death_back.duration;}
   }else{
    if(!lastAlive){reset(p,now,'respawn');full=swap(null,action('respawn'),false,.1);base.fadeOut(.1);upper.fadeOut(.1);fullUntil=now+850;}
    if(pendingEvents.length){const events=pendingEvents.splice(0);for(const e of events)if(e.life===null||e.life===p.life)trigger(e.name,e.now,e.duration,e.value,p.life,true);}
    if(full?.getClip().name.endsWith('|respawn')&&(now-fireAt<180||p.reload>0||['upper:utility','upper:use_item','upper:skill'].includes(upper?.getClip().name))){full.fadeOut(.05);full=null;upper?.fadeIn(.05);base?.fadeIn(.05);}
    const air=p.position[1]>1,vertical=p.velocity[1],speed=Math.hypot(p.velocity[0],p.velocity[2]);
    let motion='idle';if(air)motion=vertical>0?'jump':'fall';else if(p.crouch)motion=speed>12?'crouch_walk':'crouch';else if(speed>12){const forward=-p.velocity[0]*Math.sin(p.yaw)-p.velocity[2]*Math.cos(p.yaw),side=p.velocity[0]*Math.cos(p.yaw)-p.velocity[2]*Math.sin(p.yaw);motion=Math.abs(side)>Math.abs(forward)*1.4?(side>0?'strafe_right':'strafe_left'):forward<-20?'backpedal':speed>180?'run':'walk';}
    if(lastAir&&!air)trigger('land',now,.3);lastAir=air;
    if(state.phase==='finished'||state.phase==='round_end'){
     const name=reduced?'idle':state.winner===p.team?'victory':'defeat';full=swap(full,action(name),true,.25);base?.fadeOut(.15);upper?.fadeOut(.15);fullUntil=Infinity;
    }else if(full&&now>=fullUntil){full.fadeOut(.16);full=null;base?.reset().fadeIn(.16).play();if(!firstPerson&&base)base.time=gaitPhase*base.getClip().duration;upper?.reset().fadeIn(.16).play();}
    if(!full){if(!hybrid){base=swap(base,action(motion,'lower'));base.setEffectiveTimeScale(speed>12&&!air?THREE.MathUtils.clamp(speed/(motion==='run'?250:145),.6,1.6):1);}
     if(p.reload>0&&!lastReload){reloadDuration=Math.max(reloadDuration,p.reload,weapons?.[p.weapon]?.reload||0);if(upper!==action('reload','upper'))trigger('reload',now,p.reload/64);}
     if(!p.reload&&lastReload&&upper===action('reload','upper'))upperUntil=now;
     if(state.objective?.actor===slot&&state.objective.progress>0){if(upper!==action('interact','upper'))upper=swap(upper,action('interact','upper'));upperUntil=now+100;}
     else if(now>=upperUntil){if(p.reload>0)trigger('reload',now,p.reload/64);else upper=swap(upper,action('idle','upper'),true,.16);}
    }
   }
   lastReload=p.reload||0;lastAlive=p.alive;lastNow=now;
   const motionSignals=signals.update(p,dt,state.config?.map??0);
   if(motionSignals.reset||full||!p.alive||reduced){transition?.stop();transition=null;transitionKind=null;pivotAngle=0;}
   else{
    pivotAngle+=motionSignals.yawDelta;
    if(motionSignals.landed&&motionSignals.landingSpeed>140)transitionTo('land_hard',now);
    else if(Math.abs(pivotAngle)>2.3){transitionTo(pivotAngle>0?'pivot_back_left':'pivot_back_right',now);pivotAngle=0;}
    else if(Math.abs(pivotAngle)>1.0&&!transition){transitionTo(pivotAngle>0?'pivot_left':'pivot_right',now);pivotAngle=0;}
    else if(p.crouch&&!lastCrouch)transitionTo('crouch_enter',now);
    else if(motionSignals.stopping||motionSignals.reversing)transitionTo('brake',now);
    else if(motionSignals.starting)transitionTo('start',now);
    else if(p.scoped&&!lastScoped)transitionTo('weapon_ready',now);
   }
   lastCrouch=!!p.crouch;lastScoped=!!p.scoped;
   if(transition&&now>=transitionUntil){transition.fadeOut(.06);transition=null;transitionKind=null;}
   if(hybrid){
    const cycleDuration=feet.plan(motionSignals,dt);
    blend.update(motionSignals,dt,{active:p.alive&&!full,reduced,phase:motionSignals.reset?gaitPhase:blend.phase,cycleDuration});
    for(let i=0;i<lowerActions.length;i++){const a=lowerActions[i],weight=blend.weights[i]*blend.gain;a.enabled=weight>1e-6;if(a.enabled)a.play();a.paused=true;a.time=blend.times[i];a.setEffectiveWeight(weight);}
    base=action(blend.dominant,'lower');gaitPhase=blend.phase;
   }
   if(upper)upper.paused=reduced&&upper===action('idle','upper');mixer.update(Math.min(.1,Math.max(0,dt)));pose.capture();
   springs.update(motionSignals,dt,{active:p.alive&&!full,reduced,firing:now-fireAt<180,reloading:p.reload>0});
   // Apply this frame's feedback after discontinuity cleanup, so a new life's
   // first shot keeps its impulse while the previous life's offsets are gone.
   if(p.alive&&!full&&!reduced&&now-fireAt<=100)for(let i=0;i<fireImpulses;i++)springs.fire(lastWeapon);fireImpulses=0;
   if(hybrid&&(blend.orientation||springs.lean.value.some(v=>v))){
    // Rotate the pelvis only. Counter-rotate its direct spine child so aiming,
    // hit reactions and weapon/hand placement retain their blended world pose.
    warpRestore.hips.copy(bones.hips.quaternion);warpRestore.spine.copy(bones.spine.quaternion);
    yawWarp.setFromEuler(bodyEuler.set(springs.lean.value[0]*.3,springs.lean.value[1]*.3,blend.orientation+springs.lean.value[2]));bones.hips.quaternion.premultiply(yawWarp);
    counterWarp.copy(bones.hips.quaternion).invert().multiply(warpRestore.hips);bones.spine.quaternion.premultiply(counterWarp);
   }
   if(p.alive&&!full&&!reduced){bones.hips.position.z+=springs.landing.value[0];bones.spine.rotation.x+=springs.lean.value[0]*.7;bones.spine.rotation.y+=springs.lean.value[1]*.6;bones.chest.rotation.x-=springs.recoil.value[0];}
   const inertialTag=(full?.getClip().name||(hybrid?(motionSignals.grounded?'ground':'air'):base?.getClip().name)||'idle')+'/'+(upper?.getClip().name||'idle');
   inertia.apply(inertialTag,dt,{enabled:p.alive&&!full&&!reduced&&!motionSignals.reset,immediate:now-fireAt<100||now-hitAt<320});
   if(p.alive&&!full){warpRestore.hips.copy(bones.hips.quaternion);bones.hips.rotation.x=THREE.MathUtils.clamp(bones.hips.rotation.x,-.25,.25);bones.hips.rotation.y=THREE.MathUtils.clamp(bones.hips.rotation.y,-.25,.25);bones.hips.rotation.z=THREE.MathUtils.clamp(bones.hips.rotation.z,-.85,.85);counterWarp.copy(bones.hips.quaternion).invert().multiply(warpRestore.hips);bones.spine.quaternion.premultiply(counterWarp);}
   const transitionDrop=transitionKind&&source.compression[transitionKind]?Math.max(0,-source.compression[transitionKind].evaluate(transition.time)[2]*.55):0;
   feet?.apply(motionSignals,blend,dt,{active:p.alive&&!full,reduced,compression:Math.min(motionSignals.crouch?1.5:5,(Math.max(0,-springs.landing.value[0])+transitionDrop)*model.scale.x)});
   if(firstPerson&&p.alive&&!reduced){
    const phase=base?.time/(base?.getClip().duration||1)*Math.PI*2,moving=THREE.MathUtils.clamp(motionSignals.speed/250,0,1),sway=profile.sway*(p.reload?.25:1);
    model.position.x+=springs.sway.value[0]+Math.sin(phase)*moving*.007*sway;
    model.position.y+=Math.cos(phase*2)*moving*.003*sway-springs.ready.value[0]*.023;
    model.position.z+=springs.recoil.value[2]+springs.ready.value[0]*.012;model.rotation.x+=springs.recoil.value[0]*.35+springs.ready.value[0]*.045+springs.sway.value[1];model.rotation.z+=Math.sin(phase)*moving*.008*sway+springs.sway.value[2];
   }
   // Small tracking offsets follow the gameplay look direction after blending.
   if(p.alive){bones.head.rotation.x+=(p.pitch||0)*.5;bones.chest.rotation.x+=(p.pitch||0)*.22;
    if(!firstPerson&&!reduced&&now-hitAt<320){const pulse=Math.sin(Math.PI*Math.max(0,now-hitAt)/320)*hitForce;bones.chest.rotation.x-=pulse*.30;bones.head.rotation.x+=pulse*.22;}
   }
   if(hybrid&&p.alive&&!full&&motionSignals.grounded)bones.chest.updateWorldMatrix(true,true);
   else{model.updateWorldMatrix(true,false);bones.root.parent.updateWorldMatrix(false,true,true);}
   // A weapon follows its articulated trigger hand; aim remains authoritative.
   const reloading=Boolean(p.alive&&p.reload>0&&reloadDuration&&upper?.getClip().name==='upper:reload'&&magazine);
   let reloadWeight=0;
   if(reloading){
    const phase=THREE.MathUtils.clamp(upper.time/source.clips.reload.duration,0,1);reloadWeight=Math.min(1,phase*5,(1-phase)*5);
    if(reloadWeight>.05){
     const right=bones['hand.R'].getWorldPosition(new THREE.Vector3()),left=bones['upper_arm.L'].getWorldPosition(new THREE.Vector3());
     left.add(bones['upper_arm.R'].getWorldPosition(new THREE.Vector3())).multiplyScalar(.5);
     const nearChest=model.worldToLocal(left).add(new THREE.Vector3(-.03,firstPerson?0:-.1,-.16));
     grip('R',model.worldToLocal(right).lerp(nearChest,reloadWeight));
    }
   }
   gunAnchor.quaternion.copy(identity);gunAnchor.rotation.x=p.pitch||0;gunAnchor.rotation.y=reloading ? .35*reloadWeight : 0;gunAnchor.rotation.z=reloading ? -.55*reloadWeight-.15*Math.sin((p.reload/64)*4) : 0;
   bones['hand.R'].getWorldPosition(tmp);model.worldToLocal(tmp);triggerOffset.copy(triggerGrip.position).multiplyScalar(.016).applyQuaternion(gunAnchor.quaternion);gunAnchor.position.copy(tmp).sub(triggerOffset);
   if(pump){const phase=(now-pumpAt)/320;pump.position.z=p.alive&&!reduced&&phase>=0&&phase<1?5.2*(phase<.45?phase/.45:(1-phase)/.55):0;}
   if(magazine)magazine.position.y=-6-(reloading?Math.sin(Math.PI*THREE.MathUtils.clamp(upper.time/source.clips.reload.duration,0,1))*8:0);
   const holding=p.alive&&!p.reload&&now>=propUntil&&(!upperUntil||now>=upperUntil||['upper:fire','upper:hit','upper:equip'].includes(upper?.getClip().name));
   supportGrip.position.z=-7.5+(pump?.position.z||0);
   if(reloading&&reloadWeight>.05)fitWeaponGrip(magazine);else if(holding)fitWeaponGrip(supportGrip);else updateWeaponFrames();
   contacts.R.engaged=p.alive;contacts.R.kind='trigger';contacts.R.weight=1;contacts.L.engaged=false;contacts.L.kind=null;contacts.L.weight=0;
   if(p.alive)wrist('R');
   if(reloading){
    if(reloadWeight>.05){const hand=bones['hand.L'].getWorldPosition(new THREE.Vector3()),contact=new THREE.Vector3().setFromMatrixPosition(magazine.matrixWorld);hand.lerp(contact,reloadWeight);grip('L',model.worldToLocal(hand));wrist('L');contacts.L.engaged=true;contacts.L.kind='magazine';contacts.L.weight=reloadWeight;}
   }else if(holding){
    tmp.setFromMatrixPosition(supportGrip.matrixWorld);grip('L',model.worldToLocal(tmp));wrist('L');contacts.L.engaged=true;contacts.L.kind='support';contacts.L.weight=1;
   }
   if(prop){prop.visible=p.alive&&now<propUntil;if(prop.visible){bones['hand.L'].getWorldPosition(tmp);model.worldToLocal(tmp);prop.position.copy(tmp);prop.rotation.z=.5;}}
   gun.visible=p.alive;rig.userData.motion=full?.getClip().name||base?.getClip().name;
   return {deadAt,motion:rig.userData.motion};
  }
  function dispose(){prop?.traverse(o=>o.geometry?.dispose());mixer.stopAllAction();mixer.uncacheRoot(model);if(firstPerson)model.traverse(o=>{if(o.isSkinnedMesh)o.geometry.dispose();});rig.removeFromParent();}
  let armTriangles=0;if(firstPerson)model.traverse(o=>{if(o.isSkinnedMesh)armTriangles+=(o.geometry.index?.count||0)/3;});
  return {rig,model,bones,mixer,hero,slot,armTriangles,animation:{signals:signals.output,blend,hybrid,feet,springs,inertia,contacts,profile,get transition(){return transitionKind;},get action(){return {upper:upper?.getClip().name,full:full?.getClip().name,reloadPhase:upper?.getClip().name==='upper:reload'?upper.time/source.clips.reload.duration:null};}},invalidate(reason='visibility'){pendingEvents.length=0;fireImpulses=0;signals.clear(reason);feet?.clear(reason);springs.reset();inertia.reset();lastLife=null;lastAlive=null;},setAlly(ally){for(const badge of badges)badge.material=teamMaterials[ally?0:1];},get weapon(){return lastWeapon;},update,trigger,dispose};
 }
 function dispose(){const geometries=new Set(),materials=new Set(),textures=new Set();for(const t of templates)t.model.traverse(o=>{if(o.geometry)geometries.add(o.geometry);for(const m of o.material?(Array.isArray(o.material)?o.material:[o.material]):[]){materials.add(m);for(const v of Object.values(m))if(v?.isTexture)textures.add(v);}});for(const gun of weaponTemplates.values())gun.traverse(o=>{if(o.geometry)geometries.add(o.geometry)});badgeGeometry.dispose();teamMaterials.forEach(m=>m.dispose());shadowGeometry.dispose();shadowMaterial.dispose();shadowTexture.dispose();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());}
 return {preload,actor,dispose,weaponModel:kind=>weaponTemplates.get(kind)?.clone(true)};
}
