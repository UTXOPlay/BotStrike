// Development only: deterministic A/B fixtures, measurements and an in-scene HUD.
// This entry point is never imported by the shipping client.
import * as THREE from 'three';
import {createArt} from '../games/botstrike/client/art-direction.mjs';
import {createCharacters} from '../games/botstrike/client/characters.mjs';
import {createCharacters as createBaseline} from './motion-baseline/characters.mjs';
import {scenarios,motionFrame} from './motion-sequences.mjs';
import spec from '../botstrike/spec.json';
import {installHardwareBenchmark} from './motion-lab-benchmark.mjs';

const canvas=document.querySelector('canvas'),hud=document.querySelector('#debug'),mobile=matchMedia('(pointer:coarse)').matches;
const renderer=new THREE.WebGLRenderer({canvas,antialias:false,preserveDrawingBuffer:true});
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;
const scene=new THREE.Scene();scene.background=new THREE.Color('#101c29');
scene.add(new THREE.HemisphereLight(0xd0edff,0x5a6173,2));
for(const [x,y,z,color]of [[-200,300,-300,0xd5ecff],[250,150,100,0xffbb88]]){const light=new THREE.DirectionalLight(color,3);light.position.set(x,y,z);scene.add(light);}
const floor=new THREE.GridHelper(10000,200,0x537080,0x233747);scene.add(floor);
const camera=new THREE.PerspectiveCamera(45,1,.5,10000),art=createArt(renderer,{mobile}),characters=createCharacters(art,{weapons:spec.weapons,heroes:spec.heroes}),baselineCharacters=createBaseline(art);scene.add(camera);
const modes=['baseline','candidate'],actors={},vector=new THREE.Vector3();
const debugGroup=new THREE.Group();scene.add(debugGroup);
const markers=Array.from({length:20},()=>{
 const anchor=new THREE.Mesh(new THREE.SphereGeometry(1.2,6,4),new THREE.MeshBasicMaterial({color:0x74ffb0,depthTest:false}));
 const sole=new THREE.Mesh(new THREE.SphereGeometry(.8,6,4),new THREE.MeshBasicMaterial({color:0xffffff,depthTest:false}));
 const line=new THREE.Line(new THREE.BufferGeometry().setAttribute('position',new THREE.BufferAttribute(new Float32Array(6),3)),new THREE.LineBasicMaterial({color:0xff914a,depthTest:false}));debugGroup.add(anchor,sole,line);return {anchor,sole,line};
});
const velocityArrow=new THREE.ArrowHelper(new THREE.Vector3(0,0,-1),new THREE.Vector3(),35,0x5bceff),facingArrow=new THREE.ArrowHelper(new THREE.Vector3(0,0,-1),new THREE.Vector3(),25,0xffcc77);debugGroup.add(velocityArrow,facingArrow);
const controls=Object.fromEntries(['mode','scenario','hero','weapon','view','count','fps','reduced','diagnostics'].map(id=>[id,document.querySelector('#'+id)]));
for(const value of scenarios)controls.scenario.add(new Option(value,value));controls.scenario.value='walk_run';
spec.heroes.forEach((hero,i)=>controls.hero.add(new Option(hero.name,String(i))));
spec.weapons.forEach((weapon,i)=>controls.weapon.add(new Option(weapon.name,String(i))));controls.weapon.value='2';
let playing=false,time=0,current,trailX=0,trailZ=0,frameIntervals=[];
function resize(){const w=innerWidth,h=innerHeight;if(h>w&&mobile)playing=false;renderer.setPixelRatio(Math.min(1,Math.sqrt((mobile?1280*720:2560*1440)/(w*h))));renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();if(current)draw();}
function options(){return {mode:controls.mode.value,scenario:controls.scenario.value,fps:Number(controls.fps.value),reduced:controls.reduced.checked,count:Number(controls.count.value),hero:controls.hero.value==='mixed'?null:Number(controls.hero.value),weapon:Number(controls.weapon.value),view:controls.view.value,diagnostics:controls.diagnostics.checked};}
function makeActor(mode,slot,hero,weapon,firstPerson){
 const actor=(mode==='baseline'?baselineCharacters:characters).actor(slot,hero,weapon,{firstPerson});actor.labFirstPerson=firstPerson;
 if(firstPerson){actor.rig.scale.setScalar(.8);camera.add(actor.rig);}else scene.add(actor.rig);return actor;
}
function reset(config){
 current={mode:'candidate',scenario:'circle',fps:60,count:10,reduced:false,hero:null,weapon:2,view:'lineup',diagnostics:true,...config};time=trailX=trailZ=0;
 if(current.view!=='lineup')current.count=1;
 controls.mode.value=current.mode;controls.scenario.value=current.scenario;controls.fps.value=String(current.fps);controls.reduced.checked=current.reduced;
 controls.hero.value=current.hero===null?'mixed':String(current.hero);controls.weapon.value=String(current.weapon);controls.view.value=current.view;controls.count.value=String(current.count);controls.diagnostics.checked=current.diagnostics;
 for(const mode of modes)actors[mode]=actors[mode].map(a=>{const hero=current.hero??a.slot%6,firstPerson=current.view==='first-person'&&a.slot===0;if(mode==='baseline'||a.hero!==hero||a.labFirstPerson!==firstPerson){a.dispose();return makeActor(mode,a.slot,hero,current.weapon,firstPerson);}return a;});
 for(const mode of modes)for(const a of actors[mode]){a.invalidate?.();a.rig.visible=mode===current.mode&&a.slot<current.count;}
 contacts=Array.from({length:10},()=>({L:null,R:null}));maxDrift=0;lastDebug=null;
 contactStats=Array.from({length:10},()=>({scheduled:0,feasible:0,maxError:0,maxSoleHeight:0,maxSoleDrift:0,maxAnchorDrift:0,releases:{},previous:{}}));
}
let contacts=[],maxDrift=0,lastDebug=null,contactStats=[];
function step(dt,{check=false}={}){
 const next=time+dt,m=motionFrame(current.scenario,next),nativeGait=current.scenario==='walk_run';
 const firstRunSpeed=spec.heroes[current.hero??0].speed*(spec.weapons[current.weapon].mobility??1);
 if(nativeGait)m.velocity=m.velocity.map(v=>v*firstRunSpeed/250);
 trailX+=m.velocity[0]*dt;trailZ+=m.velocity[2]*dt;
 const state={phase:'live',config:{map:m.map},objective:{}};let finite=true,unchanged=true;
 const active=actors[current.mode].slice(0,current.count);
 const players=active.map(a=>{const ratio=nativeGait?spec.heroes[a.hero].speed*(spec.weapons[current.weapon].mobility??1)/firstRunSpeed:1;return {slot:a.slot,team:a.slot<5?0:1,hero:a.hero,weapon:current.weapon,position:[(current.count===1?0:a.slot%5-2)*80+trailX*ratio+m.offset,m.y,(current.count===1?0:Math.floor(a.slot/5))*90+trailZ*ratio],velocity:nativeGait?m.velocity.map(v=>v*ratio):m.velocity,yaw:m.yaw,pitch:a.labFirstPerson?0:.25*Math.sin(next),life:m.life,alive:m.alive,crouch:m.crouch,reload:current.scenario==='reload'&&next>=2?Math.max(0,Math.ceil(spec.weapons[current.weapon].reload-(next-2)*64)):m.reload};});
 const before=check?players.map(p=>JSON.stringify(p)):null;
 const started=performance.now();
 for(let i=0;i<active.length;i++){
  const a=active[i],p=players[i];
  if(a.labFirstPerson){a.rig.position.set(0,-49.8,-10);a.rig.rotation.y=0;}else{a.rig.position.fromArray(p.position);a.rig.rotation.y=p.yaw;}
  for(const [at,name,duration,value]of m.events)if(time<at&&next>=at)a.trigger(name,at*1000,name==='reload'?spec.weapons[current.weapon].reload/64:duration,value,p.life);
  a.update(p,state,next*1000,dt,{reduced:current.reduced});
  if(a.labFirstPerson)a.rig.position.y+=13.6*(a.animation?.signals.crouchAmount??Number(p.crouch));
  if(a.slot===0&&a.animation?.signals.reset)contacts[0]={L:null,R:null};
 }
 const cpu=performance.now()-started;
 if(check)for(let i=0;i<active.length;i++){unchanged&&=before[i]===JSON.stringify(players[i]);for(const bone of new Set(Object.values(active[i].bones)))finite&&=[...bone.position,...bone.quaternion,...bone.scale].every(Number.isFinite)&&Math.abs(bone.quaternion.length()-1)<.001;}
 time=next;
 debugGroup.visible=current.diagnostics&&current.view!=='first-person';
 if(!current.diagnostics)return {cpu,finite,unchanged};
 const first=actors[current.mode][0];scene.updateMatrixWorld(true);
 for(const marker of markers)for(const object of Object.values(marker))object.visible=false;
 for(const a of active){
  if(!a.animation?.feet)continue;
  const stats=contactStats[a.slot];if(a.animation.signals.reset)stats.previous={};
  a.model.traverse(o=>{if(o.isSkinnedMesh)o.skeleton.update();});
  for(const f of a.animation.feet.feet){
   const marker=markers[a.slot*2+(f.side==='R'?1:0)];marker.anchor.visible=f.feasible;marker.sole.visible=marker.line.visible=true;marker.anchor.position.copy(f.anchor);marker.sole.position.copy(f.sole);
   marker.line.geometry.attributes.position.array.set([...f.goal,...f.sole]);marker.line.geometry.attributes.position.needsUpdate=true;
   if(f.wasStance)stats.scheduled++;
   if(f.reason&&f.status==='released')stats.releases[f.reason]=(stats.releases[f.reason]||0)+1;
   if(!f.feasible){stats.previous[f.side]=null;continue;}
   stats.feasible++;
   const prior=stats.previous[f.side];
   if(prior?.plantId===f.plantId)stats.maxAnchorDrift=Math.max(stats.maxAnchorDrift,f.anchor.distanceTo(prior.anchor));
   else stats.previous[f.side]={plantId:f.plantId,anchor:f.anchor.clone(),samples:[]};
   const scale=a.model.getWorldScale(new THREE.Vector3());
   for(let j=0;j<f.samples.length;j++){
    const sample=f.samples[j];
    sample.mesh.getVertexPosition(sample.index,vector);vector.applyMatrix4(sample.mesh.matrixWorld);
    const target=sample.local.clone().sub(f.offset).multiply(scale).applyQuaternion(f.rotation).add(f.anchor);
    stats.maxError=Math.max(stats.maxError,vector.distanceTo(target));
    stats.maxSoleHeight=Math.max(stats.maxSoleHeight,Math.abs(vector.y));
    if(prior?.plantId===f.plantId)stats.maxSoleDrift=Math.max(stats.maxSoleDrift,vector.distanceTo(prior.samples[j]));
    else stats.previous[f.side].samples[j]=vector.clone();
   }
  }
 }
 for(let i=active.length*2;i<markers.length;i++)for(const o of Object.values(markers[i]))o.visible=false;
 velocityArrow.position.copy(first.rig.position);velocityArrow.position.y+=78;facingArrow.position.copy(velocityArrow.position);velocityArrow.setDirection(vector.fromArray(m.velocity).normalize().lengthSq()?vector:vector.set(0,0,-1));velocityArrow.setLength(Math.max(1,Math.hypot(...m.velocity)*.15));facingArrow.setDirection(vector.set(-Math.sin(m.yaw),0,-Math.cos(m.yaw)));
 const lower=first.mixer._actions.filter(a=>a.getClip().name.startsWith('lower:')&&a.getEffectiveWeight()>.001);
 const phase=current.mode==='candidate'?first.animation.blend.phase:(lower.sort((a,b)=>b.getEffectiveWeight()-a.getEffectiveWeight())[0]?.time||0)/(lower[0]?.getClip().duration||1);
 const feet={};
 for(const side of ['L','R']){
  const contact=first.animation?.feet?.feet.find(f=>f.side===side);
  const stance=contact?contact.feasible:m.y<=1&&m.alive&&Math.hypot(m.velocity[0],m.velocity[2])>12&&Math.sin(phase*Math.PI*2+(side==='L'?0:Math.PI))>0;
  first.bones['foot.'+side].getWorldPosition(vector);
  if(!stance)contacts[0][side]=null;else contacts[0][side]??=vector.clone();
  const drift=contacts[0][side]?vector.distanceTo(contacts[0][side]):0;maxDrift=Math.max(maxDrift,drift);
  feet[side]={estimated:stance?'stance':'swing',state:contact?.status||'estimated',reason:contact?.reason,contactError:contact?.error,position:vector.toArray(),drift};
 }
 lastDebug={time,mode:current.mode,solvedFeet:Boolean(first.animation?.feet),velocity:m.velocity,facing:m.yaw,phase,gait:first.animation?{runSpeed:first.animation.signals.runSpeed,speedFraction:first.animation.signals.speedFraction,runAmount:first.animation.signals.runAmount,cycleDuration:first.animation.stride?.cycleDuration}:null,weights:Object.fromEntries(lower.map(a=>[a.getClip().name,a.getEffectiveWeight()])),feet,orientation:first.animation?.blend.orientation||0,stride:first.animation?.blend.cadenceScale||1,reset:first.animation?.signals.reset,contactStats,springs:first.animation?Object.fromEntries(['lean','landing','ready','recoil','sway'].map(k=>[k,[...first.animation.springs[k].value]])):null,inertia:first.animation?.inertia.maxAngle};
 return {cpu,finite,unchanged};
}
function draw(){
 const m=motionFrame(current.scenario,time),focus=new THREE.Vector3(trailX+m.offset,current.view==='feet'?5:35,trailZ+(current.count===1?0:45));
 const desiredFov=current.view==='first-person'?80:45;if(camera.fov!==desiredFov){camera.fov=desiredFov;camera.updateProjectionMatrix();}
 if(current.view==='first-person'){camera.position.set(trailX+m.offset,m.y+(m.crouch?37:56),trailZ);camera.rotation.set(.25*Math.sin(time),m.yaw,0,'YXZ');}
 else{const offset={front:[-35,25,-150],side:[150,25,0],back:[0,25,150],feet:[-35,18,-65]}[current.view]||[-250,190,-470];camera.position.copy(focus).add(new THREE.Vector3(...offset));camera.lookAt(focus);}
 renderer.render(scene,camera);
 if(!current.diagnostics){hud.textContent=`${current.mode} · ${current.scenario} · ${time.toFixed(2)} s · diagnostics off`;return;}
 const d=lastDebug;if(d)hud.textContent=`${d.mode} · ${current.scenario} · ${time.toFixed(2)} s\nvelocity ${d.velocity.map(v=>v.toFixed(1)).join(' / ')} · facing ${d.facing.toFixed(2)} rad\n${d.gait?'visual run '+(d.gait.runAmount*100).toFixed(0)+'% · speed '+(d.gait.speedFraction*100).toFixed(0)+'% of '+d.gait.runSpeed.toFixed(1)+'\n':''}phase ${d.phase.toFixed(3)} · pelvis ${d.orientation.toFixed(3)} · cadence ${d.stride.toFixed(2)}\n${Object.entries(d.weights).map(([k,v])=>`${k.replace('lower:','')} ${v.toFixed(2)}`).join(' | ')}\n${d.solvedFeet?'SOLVED':'ESTIMATED'} feet: L ${d.feet.L.state}, R ${d.feet.R.state}\npost-skinning sole error max ${Math.max(...contactStats.map(s=>s.maxError)).toFixed(3)} world units\n${current.count} rigs · ${renderer.info.render.calls} draw calls · reset ${d.reset||'none'}\n${d.springs?Object.entries(d.springs).map(([name,v])=>name+' '+v.map(x=>x.toFixed(3)).join('/')).join(' · '):''}\npose inertia ${(d.inertia||0).toFixed(3)} rad · anchors green / soles white / error orange`;
}
function percentile(values,p){return [...values].sort((a,b)=>a-b)[Math.min(values.length-1,Math.floor(values.length*p))]||0;}
function run(config={}){
 playing=false;reset(config);const times=[];let finite=true,unchanged=true,frame=0;
 while(time<(config.seconds??6)-1e-7){const dt=Math.min(config.jitter?[.012,.026,.009,.022,.014][frame%5]:1/current.fps,(config.seconds??6)-time),r=step(dt,{check:true});if(frame>15)times.push(r.cpu);finite&&=r.finite;unchanged&&=r.unchanged;frame++;}
 draw();return {mode:current.mode,scenario:current.scenario,frames:frame,finite,unchanged,debug:lastDebug,maxEstimatedFootDrift:maxDrift,cpuMs:{median:percentile(times,.5),p95:percentile(times,.95)},calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,backing:[canvas.width,canvas.height],renderer:renderer.getContext().getParameter(renderer.getContext().RENDERER)};
}
function tick(now){requestAnimationFrame(tick);if(!playing)return;const dt=(now-lastTick)/1000;if(dt+.0002<1/current.fps)return;lastTick=now;frameIntervals.push(dt*1000);if(frameIntervals.length>600)frameIntervals.shift();step(Math.min(dt,.1));draw();if(time>=6)reset(current);}
let lastTick=0;
window.motionLabReady=(async()=>{
 await characters.preload((n,total)=>hud.textContent=`Loading chassis ${n}/${total}`);
 await baselineCharacters.preload();
 for(const mode of modes)actors[mode]=Array.from({length:10},(_,slot)=>makeActor(mode,slot,slot%6,2,false));
 reset(options());resize();step(0);await renderer.compileAsync(scene,camera);draw();
 window.motionLab={run,step:dt=>{step(dt,{check:true});draw();return lastDebug;},reset:config=>reset(config),diagnostics(){return actors[current.mode].map(a=>({slot:a.slot,hero:a.hero,feet:a.animation?.feet?.feet.map(f=>({side:f.side,soleYaw:f.soleYaw,home:f.home.toArray(),offset:f.offset.toArray(),goal:f.goal.toArray(),ankle:f.ankle.toArray(),hip:f.hip.getWorldPosition(new THREE.Vector3()).toArray(),scale:f.solver.upper.getWorldScale(new THREE.Vector3()).toArray(),segments:[f.solver.upper.getWorldPosition(new THREE.Vector3()).distanceTo(f.solver.middle.getWorldPosition(new THREE.Vector3())),f.solver.middle.getWorldPosition(new THREE.Vector3()).distanceTo(f.solver.end.getWorldPosition(new THREE.Vector3()))],legLength:a.animation.feet.legLength,drop:a.animation.feet.drop,status:f.status,reason:f.reason,result:{...f.solver.result}}))}));},framePacing:()=>({samples:frameIntervals.length,p50:percentile(frameIntervals,.5),p95:percentile(frameIntervals,.95)}),play(){frameIntervals=[];lastTick=performance.now();playing=true;},stop(){playing=false;}};
 for(const control of Object.values(controls))control.addEventListener('change',()=>{playing=false;reset(options());step(0);draw();});
 document.querySelector('#restart').onclick=()=>{reset(options());step(0);draw();};
 document.querySelector('#play').onclick=()=>{playing=!playing;lastTick=performance.now();};
 document.querySelector('#toggle-controls').onclick=()=>document.querySelector('aside').classList.toggle('folded');
 if(matchMedia('(pointer:coarse)').matches)document.querySelector('aside').classList.add('folded');
 document.querySelector('#fullscreen').onclick=async()=>{if(document.fullscreenElement)await document.exitFullscreen?.();else if(document.documentElement.requestFullscreen){await document.documentElement.requestFullscreen();try{await screen.orientation?.lock?.('landscape');}catch{}}else document.querySelector('#measure-status').textContent='Fullscreen is unavailable. Use landscape edge-to-edge, or add this page to your Home Screen.';};
 Object.assign(window.motionLab,{frame(dt){const start=performance.now(),result=step(dt);draw();return {...result,frameCpu:performance.now()-start};},config:()=>({...current}),device(){const gl=renderer.getContext(),ext=gl.getExtension('WEBGL_debug_renderer_info');return {renderer:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER),vendor:ext?gl.getParameter(ext.UNMASKED_VENDOR_WEBGL):gl.getParameter(gl.VENDOR),userAgent:navigator.userAgent,cores:navigator.hardwareConcurrency,memoryGB:navigator.deviceMemory,viewport:[innerWidth,innerHeight],backing:[canvas.width,canvas.height],dpr:devicePixelRatio};}});
 Object.assign(window.motionLab,{
  bodyMetrics({geometry=false,regions=false}={}){
   const a=actors[current.mode][0],points={};
   a.model.traverse(o=>{if(o.isSkinnedMesh)o.skeleton.update();});
   for(const name of ['root','hips','head','thigh.L','shin.L','foot.L','thigh.R','shin.R','foot.R'])points[name]=a.bones[name].getWorldPosition(new THREE.Vector3()).toArray();
   let minY=Infinity,maxY=-Infinity,torsoMinY=Infinity;
   if(geometry)a.model.traverse(o=>{if(o.isSkinnedMesh)for(let i=0;i<o.geometry.attributes.position.count;i++){o.getVertexPosition(i,vector);vector.applyMatrix4(o.matrixWorld);minY=Math.min(minY,vector.y);maxY=Math.max(maxY,vector.y);if(regions){let weight=0;for(let j=0;j<4;j++)if(/^(hips|spine|chest)$/.test(o.skeleton.bones[o.geometry.attributes.skinIndex.getComponent(i,j)].name))weight+=o.geometry.attributes.skinWeight.getComponent(i,j);if(weight>.8)torsoMinY=Math.min(torsoMinY,vector.y);}}});
   return {points,minY:geometry?minY:null,maxY:geometry?maxY:null,torsoMinY:regions?torsoMinY:null,shadowY:a.rig.getObjectByName('contact-shadow')?.getWorldPosition(new THREE.Vector3()).y??null,rigYaw:a.rig.rotation.y,rigPosition:a.rig.position.toArray(),modelPosition:a.model.position.toArray()};
  },
  sample({player,dt=1/60,now=(time+dt)*1000,state={phase:'live',config:{map:0},objective:{}},events=[],invalidate=null}){
   const a=actors[current.mode][0];if(invalidate)a.invalidate?.(invalidate);
   if(a.labFirstPerson){a.rig.position.set(0,-49.8,-10);a.rig.rotation.y=0;}else{a.rig.position.fromArray(player.position);a.rig.rotation.y=player.yaw;}
   for(const event of events)a.trigger(event.name,now,event.duration,event.value,event.life??player.life);
   a.update(player,state,now,dt,{reduced:current.reduced});time=now/1000;scene.updateMatrixWorld(true);
   if(a.labFirstPerson){a.rig.position.y+=13.6*(a.animation?.signals.crouchAmount??Number(player.crouch));scene.updateMatrixWorld(true);}
   const contacts={};
   for(const side of ['L','R']){
    const c=a.animation?.contacts[side],hand=a.bones['hand.'+side].getWorldPosition(new THREE.Vector3());
    const target=c?.kind==='magazine'?a.model.getObjectByName('magazine'):a.model.getObjectByName(side==='R'?'grip-trigger':'grip-support');
    contacts[side]={...c,position:hand.toArray(),actualError:target?hand.distanceTo(target.getWorldPosition(new THREE.Vector3())):null};
   }
   const bones=[...new Set(Object.values(a.bones))];
   return {contacts,action:a.animation?.action,transition:a.animation?.transition,reset:a.animation?.signals.reset,posture:a.animation?{crouchAmount:a.animation.signals.crouchAmount,grounded:a.animation.signals.grounded,takeoff:a.animation.signals.takeoff,riseProgress:a.animation.signals.riseProgress,landed:a.animation.signals.landed,landingSpeed:a.animation.signals.landingSpeed}:null,gait:a.animation?{runSpeed:a.animation.signals.runSpeed,speedFraction:a.animation.signals.speedFraction,runAmount:a.animation.signals.runAmount,phase:a.animation.blend.phase,weights:[...a.animation.blend.weights],cycleDuration:a.animation.stride?.cycleDuration,duty:a.animation.stride?.duty}:null,feet:a.animation?.feet?.feet.map(f=>({side:f.side,status:f.status,reason:f.reason,scheduled:f.wasStance,feasible:f.feasible,plantId:f.plantId,error:f.error,bend:f.solver.result.bend})),springs:a.animation?Object.fromEntries(['lean','recoil','landing','ready','sway'].map(k=>[k,[...a.animation.springs[k].value]])):null,finite:bones.every(b=>[...b.position,...b.quaternion,...b.scale].every(Number.isFinite)&&Math.abs(b.quaternion.length()-1)<.001),pose:bones.flatMap(b=>[...b.position,...b.quaternion]),modelPose:[...a.model.position,...a.model.quaternion]};
  },
  matrixWork(config={}){
   // Structural work count, not a timing benchmark. Restore shared prototypes
   // even on failure; this opt-in probe is absent from the shipping client.
   playing=false;reset({...config,count:10,view:'lineup',diagnostics:false});for(let i=0;i<30;i++)step(1/60);
   const objects=THREE.Object3D.prototype,matrices=THREE.Matrix4.prototype,world=objects.updateMatrixWorld,controlled=objects.updateWorldMatrix,multiply=matrices.multiplyMatrices;
   const counts={subtreeCalls:0,controlledCalls:0,matrixMultiplications:0};
   objects.updateMatrixWorld=function(force){counts.subtreeCalls++;return world.call(this,force);};
   objects.updateWorldMatrix=function(parents,children,force){counts.controlledCalls++;return controlled.call(this,parents,children,force);};
   matrices.multiplyMatrices=function(a,b){counts.matrixMultiplications++;return multiply.call(this,a,b);};
   try{for(let i=0;i<120;i++)step(1/60);}finally{objects.updateMatrixWorld=world;objects.updateWorldMatrix=controlled;matrices.multiplyMatrices=multiply;}
   return {mode:current.mode,frames:120,rigs:10,counts,scope:'Actor updates only; excludes drawing. Counts do not establish CPU/GPU timing.'};
  },
  soleMetrics(){
   const actor=actors[current.mode][0];actor.model.traverse(o=>{if(o.isSkinnedMesh)o.skeleton.update();});
   return actor.animation?.feet?.feet.map(f=>{
    const point=sample=>sample.mesh.getVertexPosition(sample.index,new THREE.Vector3()).applyMatrix4(sample.mesh.matrixWorld),points=f.samples.map(point),heights=points.map(p=>p.y),center=new THREE.Vector3();for(const p of points)center.add(p);center.multiplyScalar(1/points.length);
    const centroid=samples=>{const p=new THREE.Vector3();for(const sample of samples)p.add(point(sample));return p.multiplyScalar(1/samples.length);},axis=centroid(f.toes).sub(centroid(f.heels));
    return {side:f.side,state:f.status,feasible:f.feasible,toeYaw:Math.atan2(-axis.x,-axis.z),center:center.toArray(),hipWidth:actor.animation.feet.hipWidth,minHeight:Math.min(...heights),maxHeight:Math.max(...heights)};
   })||[];
  },render:draw
 });
 installHardwareBenchmark(window.motionLab,options);
 addEventListener('resize',resize);requestAnimationFrame(tick);return true;
})();
