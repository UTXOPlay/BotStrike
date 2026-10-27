import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {clone} from 'three/addons/utils/SkeletonUtils.js';

export const chassisNames=['vector','patch','bastion','spectre','glitch','forge'];
export const motionNames=['idle','walk','run','backpedal','strafe_left','strafe_right','crouch','crouch_walk','jump','fall','land','fire','reload','equip','use_item','utility','skill','interact','hit','death_back','death_left','death_right','respawn','victory','defeat'];
const lower=/^(root|hips|thigh|shin|foot)/;
const boneName=track=>track.name.slice(0,track.name.lastIndexOf('.'));
const tmp=new THREE.Vector3(),identity=new THREE.Quaternion();

// Models and textures are shared; every actor owns an independent cloned rig.
export function createCharacters(art){
 const templates=[],weaponTemplates=new Map(),teamMaterials=[0x69efff,0xffae67].map(color=>new THREE.MeshBasicMaterial({color,toneMapped:false})),badgeGeometry=new THREE.BoxGeometry(.09,.025,.035);
 const stamp=document.createElement('canvas');stamp.width=stamp.height=64;const ctx=stamp.getContext('2d'),gradient=ctx.createRadialGradient(32,32,5,32,32,32);gradient.addColorStop(0,'rgba(0,0,0,.5)');gradient.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,64,64);const shadowTexture=new THREE.CanvasTexture(stamp),shadowMaterial=new THREE.MeshBasicMaterial({map:shadowTexture,transparent:true,depthWrite:false}),shadowGeometry=new THREE.PlaneGeometry(43,36);
 async function preload(progress=()=>{}){
  const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  for(let offset=0;offset<6;offset+=2)await Promise.all(chassisNames.slice(offset,offset+2).map(async(name,index)=>{
   const response=await fetch('./models/'+name+'.glb',{signal:AbortSignal.timeout(60000)});
   if(!response.ok)throw Error('Could not load '+name+' chassis. Please retry.');
   const model=await loader.parseAsync(await response.arrayBuffer(),'./models/');
   let textured=false;model.scene.traverse(o=>{for(const m of o.material?(Array.isArray(o.material)?o.material:[o.material]):[])if(m.map&&m.normalMap&&m.roughnessMap)textured=true;});
   if(!textured)throw Error('Could not load '+name+' chassis textures. Please retry.');
   const clips=Object.fromEntries(model.animations.map(c=>[c.name.split('|').pop(),c]));
   for(const required of motionNames)if(!clips[required])throw Error(name+' is missing its '+required+' animation.');
   model.scene.traverse(o=>{if(o.isMesh){o.castShadow=false;o.receiveShadow=true;o.frustumCulled=true;if(o.isSkinnedMesh)o.boundingSphere=new THREE.Sphere(new THREE.Vector3(0,1,0),2.5);}});
   model.scene.traverse(o=>{for(const m of o.material?(Array.isArray(o.material)?o.material:[o.material]):[]){m.fog=false;m.envMapIntensity=1.1;if(m.emissive?.getHex()===0){m.emissive.set('#30404a');m.emissiveIntensity=.12;}}});
   templates[offset+index]={model:model.scene,clips};progress(templates.filter(Boolean).length,6);
  }));
  for(let kind=0;kind<12;kind++){weaponTemplates.set(kind,art.weaponModel(kind));await new Promise(requestAnimationFrame);}
 }
 function actor(slot,hero,weapon=2,{firstPerson=false}={}){
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
  // First-person support arm uses a dedicated shoulder stance. The world rig
  // remains unchanged; its shorter reach cannot wrap around every rifle.
  let gripRestore=null,lookRestore=null;
  function supportGrip(target){
   const a=bones['upper_arm.L'],b=bones['forearm.L'],c=bones['hand.L'];
   gripRestore=[a,b,c].map(bone=>({bone,position:bone.position.clone(),quaternion:bone.quaternion.clone()}));
   a.position.x+=.15;model.updateMatrixWorld(true);
   const start=a.getWorldPosition(new THREE.Vector3()),joint=b.getWorldPosition(new THREE.Vector3()),end=c.getWorldPosition(new THREE.Vector3());
   const goal=model.localToWorld(target.clone()),u=start.distanceTo(joint),v=joint.distanceTo(end),delta=goal.clone().sub(start),d=Math.min(delta.length(),(u+v)*.98),axis=delta.normalize();
   const along=(u*u-v*v+d*d)/(2*d),height=Math.sqrt(Math.max(0,u*u-along*along));
   const bend=new THREE.Vector3(-.7,-1,.3).transformDirection(model.matrixWorld);bend.addScaledVector(axis,-bend.dot(axis)).normalize();
   const elbow=start.clone().addScaledVector(axis,along).addScaledVector(bend,height);
   function aim(bone,child,point){const origin=bone.getWorldPosition(new THREE.Vector3()),from=child.getWorldPosition(new THREE.Vector3()).sub(origin).normalize(),to=point.clone().sub(origin).normalize(),delta=new THREE.Quaternion().setFromUnitVectors(from,to),world=bone.getWorldQuaternion(new THREE.Quaternion());bone.quaternion.copy(bone.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(delta.multiply(world)));bone.updateMatrixWorld(true);}
   aim(a,b,elbow);aim(b,c,start.clone().addScaledVector(axis,d));
  }
  const mixer=new THREE.AnimationMixer(model),actions=new Map();
  function action(name,layer='full'){
   const key=layer+':'+name;if(actions.has(key))return actions.get(key);
   const original=source.clips[name];const clip=layer==='full'?original:new THREE.AnimationClip(key,original.duration,original.tracks.filter(t=>lower.test(boneName(t))===(layer==='lower')));
   const a=mixer.clipAction(clip);actions.set(key,a);return a;
  }
  let base=null,upper=null,full=null,upperUntil=0,fullUntil=0,lastLife=null,lastAlive=null,lastAir=false,lastReload=0,lastWeapon=weapon,deadAt=0,lastNow=0,lastPhase=null,reloadDuration=0,prop=null,propUntil=0;
  let gun=null,magazine=null;const gunAnchor=new THREE.Group();model.add(gunAnchor);
  function equip(kind){if(gun)gunAnchor.remove(gun);gun=weaponTemplates.get(kind).clone(true);magazine=gun.getObjectByName('magazine');gun.scale.setScalar(.016);gunAnchor.add(gun);lastWeapon=kind;}
  equip(weapon);
  function swap(current,next,loop=true,fade=.12){
   if(current===next)return current;next.reset().setEffectiveTimeScale(1).setEffectiveWeight(1);next.setLoop(loop?THREE.LoopRepeat:THREE.LoopOnce,loop?Infinity:1);next.clampWhenFinished=!loop;next.play();
   if(current)current.crossFadeTo(next,fade,false);return next;
  }
  function reset(p,now){mixer.stopAllAction();base=upper=full=null;upperUntil=fullUntil=0;lastLife=p.life;lastAlive=p.alive;lastAir=false;lastReload=0;deadAt=0;
   base=swap(null,action('idle','lower'));upper=swap(null,action('idle','upper'));lastNow=now;
  }
  function trigger(name,now,duration,value){
   if(!source.clips[name]||lastAlive===false)return;
   if(['utility','use_item'].includes(name)&&Number.isInteger(value)&&value>=0&&value<12){if(prop){prop.removeFromParent();prop.traverse(o=>o.geometry?.dispose());}prop=art.equipment(value);prop.scale.setScalar(.012);model.add(prop);propUntil=now+900;}
   const next=action(name,'upper');if(upper===next){next.reset().play();}else upper=swap(upper,next,false,name==='hit'?.045:.08);
   const seconds=duration||source.clips[name].duration;next.setEffectiveTimeScale(source.clips[name].duration/Math.max(.1,seconds));upperUntil=now+seconds*1000;
  }
  function update(p,state,now,dt,{reduced=false}={}){
   if(lastLife!==p.life||lastAlive===null){const reboot=lastLife!==null&&p.alive;reset(p,now);if(reboot)lastAlive=false;}
   if(lastPhase!==state.phase&&state.phase!=='finished'&&state.phase!=='round_end'&&fullUntil===Infinity&&p.alive)fullUntil=0;lastPhase=state.phase;
   if(p.weapon!==lastWeapon){equip(p.weapon);if(p.alive)trigger('equip',now,.4);}
   if(!p.alive){
    if(lastAlive){deadAt=now;const name=['death_back','death_left','death_right'][(slot+(p.life||0))%3];full=swap(full,action(name),false,.07);base?.fadeOut(.07);upper?.fadeOut(.07);fullUntil=Infinity;}
    if(!deadAt){deadAt=now;full=swap(full,action('death_back'),false,0);full.time=source.clips.death_back.duration;}
   }else{
    if(!lastAlive){reset(p,now);full=swap(null,action('respawn'),false,.1);base.fadeOut(.1);upper.fadeOut(.1);fullUntil=now+850;}
    const air=p.position[1]>1,vertical=p.velocity[1],speed=Math.hypot(p.velocity[0],p.velocity[2]);
    let motion='idle';if(air)motion=vertical>0?'jump':'fall';else if(p.crouch)motion=speed>12?'crouch_walk':'crouch';else if(speed>12){const forward=-p.velocity[0]*Math.sin(p.yaw)-p.velocity[2]*Math.cos(p.yaw),side=p.velocity[0]*Math.cos(p.yaw)-p.velocity[2]*Math.sin(p.yaw);motion=Math.abs(side)>Math.abs(forward)*1.4?(side>0?'strafe_right':'strafe_left'):forward<-20?'backpedal':speed>180?'run':'walk';}
    if(lastAir&&!air)trigger('land',now,.3);lastAir=air;
    if(state.phase==='finished'||state.phase==='round_end'){
     const name=reduced?'idle':state.winner===p.team?'victory':'defeat';full=swap(full,action(name),true,.25);base?.fadeOut(.15);upper?.fadeOut(.15);fullUntil=Infinity;
    }else if(full&&now>=fullUntil){full.fadeOut(.16);full=null;base?.reset().fadeIn(.16).play();upper?.reset().fadeIn(.16).play();}
    if(!full){base=swap(base,action(motion,'lower'));base.setEffectiveTimeScale(speed>12&&!air?THREE.MathUtils.clamp(speed/(motion==='run'?250:145),.6,1.6):1);
     if(p.reload>0&&!lastReload){reloadDuration=p.reload;trigger('reload',now,p.reload/64);}
     if(state.objective?.actor===slot&&state.objective.progress>0){if(upper!==action('interact','upper'))upper=swap(upper,action('interact','upper'));upperUntil=now+100;}
     else if(now>=upperUntil)upper=swap(upper,action('idle','upper'),true,.16);
    }
   }
   lastReload=p.reload||0;lastAlive=p.alive;lastNow=now;
   if(gripRestore){for(const saved of gripRestore){saved.bone.position.copy(saved.position);saved.bone.quaternion.copy(saved.quaternion);}gripRestore=null;}
   if(lookRestore){for(const saved of lookRestore)saved.bone.quaternion.copy(saved.quaternion);lookRestore=null;}
   if(upper)upper.paused=reduced&&upper===action('idle','upper');mixer.update(Math.min(.1,Math.max(0,dt)));
   // Small tracking offsets follow the gameplay look direction after blending.
   if(p.alive&&!reduced){lookRestore=[bones.head,bones.chest].map(bone=>({bone,quaternion:bone.quaternion.clone()}));bones.head.rotation.x-=p.pitch*.5;bones.chest.rotation.x-=p.pitch*.22;}
   model.updateMatrixWorld(true);
   // A weapon follows its articulated trigger hand; aim remains authoritative.
   bones['hand.R'].getWorldPosition(tmp);model.worldToLocal(tmp);gunAnchor.position.copy(tmp).add(new THREE.Vector3(0,.096,-.048));
   if(firstPerson&&p.alive&&!p.reload&&now>=propUntil&&(!upperUntil||now>=upperUntil||['upper:fire','upper:hit'].includes(upper?.getClip().name)))supportGrip(gunAnchor.position.clone().add(new THREE.Vector3(-.025,-.11,-.12)));
   gunAnchor.quaternion.copy(identity);gunAnchor.rotation.x=p.pitch||0;gunAnchor.rotation.z=p.reload?-.15*Math.sin((p.reload/64)*4):0;
   if(magazine)magazine.position.y=-6-(p.reload&&reloadDuration?Math.sin(Math.PI*(1-p.reload/reloadDuration))*8:0);
   if(prop){prop.visible=p.alive&&now<propUntil;if(prop.visible){bones['hand.L'].getWorldPosition(tmp);model.worldToLocal(tmp);prop.position.copy(tmp);prop.rotation.z=.5;}}
   gun.visible=p.alive;rig.userData.motion=full?.getClip().name||base?.getClip().name;
   return {deadAt,motion:rig.userData.motion};
  }
  function dispose(){prop?.traverse(o=>o.geometry?.dispose());mixer.stopAllAction();mixer.uncacheRoot(model);if(firstPerson)model.traverse(o=>{if(o.isSkinnedMesh)o.geometry.dispose();});rig.removeFromParent();}
  let armTriangles=0;if(firstPerson)model.traverse(o=>{if(o.isSkinnedMesh)armTriangles+=(o.geometry.index?.count||0)/3;});
  return {rig,model,bones,mixer,hero,slot,armTriangles,setAlly(ally){for(const badge of badges)badge.material=teamMaterials[ally?0:1];},get weapon(){return lastWeapon;},update,trigger,dispose};
 }
 function dispose(){const geometries=new Set(),materials=new Set(),textures=new Set();for(const t of templates)t.model.traverse(o=>{if(o.geometry)geometries.add(o.geometry);for(const m of o.material?(Array.isArray(o.material)?o.material:[o.material]):[]){materials.add(m);for(const v of Object.values(m))if(v?.isTexture)textures.add(v);}});for(const gun of weaponTemplates.values())gun.traverse(o=>{if(o.geometry)geometries.add(o.geometry)});badgeGeometry.dispose();teamMaterials.forEach(m=>m.dispose());shadowGeometry.dispose();shadowMaterial.dispose();shadowTexture.dispose();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());}
 return {preload,actor,dispose};
}
