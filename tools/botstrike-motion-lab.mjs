// Development only: deterministic A/B fixtures, measurements and an in-scene HUD.
// This entry point is never imported by the shipping client.
import * as THREE from 'three';
import {createArt} from '../games/botstrike/client/art-direction.mjs';
import {createCharacters} from '../games/botstrike/client/characters.mjs';
import {scenarios,motionFrame} from './motion-sequences.mjs';

const canvas=document.querySelector('canvas'),hud=document.querySelector('#debug');
const renderer=new THREE.WebGLRenderer({canvas,antialias:false,preserveDrawingBuffer:true});
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;
const scene=new THREE.Scene();scene.background=new THREE.Color('#101c29');
scene.add(new THREE.HemisphereLight(0xd0edff,0x5a6173,2));
for(const [x,y,z,color]of [[-200,300,-300,0xd5ecff],[250,150,100,0xffbb88]]){const light=new THREE.DirectionalLight(color,3);light.position.set(x,y,z);scene.add(light);}
const floor=new THREE.GridHelper(10000,200,0x537080,0x233747);scene.add(floor);
const camera=new THREE.PerspectiveCamera(45,1,.5,10000),art=createArt(renderer),characters=createCharacters(art);
const modes=['baseline','candidate'],actors={},vector=new THREE.Vector3();
const controls={mode:document.querySelector('#mode'),scenario:document.querySelector('#scenario'),fps:document.querySelector('#fps'),reduced:document.querySelector('#reduced')};
for(const value of scenarios)controls.scenario.add(new Option(value,value));
let playing=false,time=0,current,trailX=0,trailZ=0,frameIntervals=[];
function resize(){const w=innerWidth,h=innerHeight;renderer.setPixelRatio(Math.min(1,Math.sqrt(2560*1440/(w*h))));renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();if(current)draw();}
function options(){return {mode:controls.mode.value,scenario:controls.scenario.value,fps:Number(controls.fps.value),reduced:controls.reduced.checked,count:10};}
function reset(config){
 current={mode:'candidate',scenario:'circle',fps:60,count:10,reduced:false,...config};time=trailX=trailZ=0;
 controls.mode.value=current.mode;controls.scenario.value=current.scenario;controls.fps.value=String(current.fps);controls.reduced.checked=current.reduced;
 for(const mode of modes)for(const a of actors[mode]){a.invalidate();a.rig.visible=mode===current.mode&&a.slot<current.count;}
 contacts=Array.from({length:10},()=>({L:null,R:null}));maxDrift=0;lastDebug=null;
}
let contacts=[],maxDrift=0,lastDebug=null;
function step(dt,{check=false}={}){
 const next=time+dt,m=motionFrame(current.scenario,next);trailX+=m.velocity[0]*dt;trailZ+=m.velocity[2]*dt;
 const state={phase:'live',config:{map:m.map},objective:{}};let finite=true,unchanged=true;
 const active=actors[current.mode].slice(0,current.count);
 const players=active.map(a=>({slot:a.slot,team:a.slot<5?0:1,hero:a.hero,weapon:2,position:[(a.slot%5-2)*80+trailX+m.offset,m.y,Math.floor(a.slot/5)*90+trailZ],velocity:m.velocity,yaw:m.yaw,pitch:.25*Math.sin(next),life:m.life,alive:m.alive,crouch:m.crouch,reload:m.reload}));
 const before=check?players.map(p=>JSON.stringify(p)):null;
 const started=performance.now();
 for(let i=0;i<active.length;i++){
  const a=active[i],p=players[i];
  a.rig.position.fromArray(p.position);a.rig.rotation.y=p.yaw;
  for(const [at,name,duration,value]of m.events)if(time<at&&next>=at)a.trigger(name,at*1000,duration,value);
  a.update(p,state,next*1000,dt,{reduced:current.reduced});
  if(a.slot===0&&a.animation.signals.reset)contacts[0]={L:null,R:null};
 }
 const cpu=performance.now()-started;
 if(check)for(let i=0;i<active.length;i++){unchanged&&=before[i]===JSON.stringify(players[i]);for(const bone of new Set(Object.values(active[i].bones)))finite&&=[...bone.position,...bone.quaternion,...bone.scale].every(Number.isFinite)&&Math.abs(bone.quaternion.length()-1)<.001;}
 time=next;
 const first=actors[current.mode][0];scene.updateMatrixWorld(true);
 const lower=first.mixer._actions.filter(a=>a.getClip().name.startsWith('lower:')&&a.getEffectiveWeight()>.001);
 const phase=current.mode==='candidate'?first.animation.blend.phase:(lower.sort((a,b)=>b.getEffectiveWeight()-a.getEffectiveWeight())[0]?.time||0)/(lower[0]?.getClip().duration||1);
 const feet={};
 for(const side of ['L','R']){
  const stance=m.y<=1&&m.alive&&Math.hypot(m.velocity[0],m.velocity[2])>12&&Math.sin(phase*Math.PI*2+(side==='L'?0:Math.PI))>0;
  first.bones['foot.'+side].getWorldPosition(vector);
  if(!stance)contacts[0][side]=null;else contacts[0][side]??=vector.clone();
  const drift=contacts[0][side]?vector.distanceTo(contacts[0][side]):0;maxDrift=Math.max(maxDrift,drift);
  feet[side]={estimated:stance?'stance':'swing',position:vector.toArray(),drift};
 }
 lastDebug={time,mode:current.mode,velocity:m.velocity,facing:m.yaw,phase,weights:Object.fromEntries(lower.map(a=>[a.getClip().name,a.getEffectiveWeight()])),feet,orientation:first.animation.blend.orientation,stride:first.animation.blend.cadenceScale,reset:first.animation.signals.reset};
 return {cpu,finite,unchanged};
}
function draw(){
 const m=motionFrame(current.scenario,time),focus=new THREE.Vector3(trailX+m.offset,35,trailZ+45);
 camera.position.copy(focus).add(new THREE.Vector3(-250,190,-470));camera.lookAt(focus);
 renderer.render(scene,camera);
 const d=lastDebug;if(d)hud.textContent=`${d.mode} · ${current.scenario} · ${time.toFixed(2)} s\nvelocity ${d.velocity.map(v=>v.toFixed(1)).join(' / ')} · facing ${d.facing.toFixed(2)} rad\nphase ${d.phase.toFixed(3)} · pelvis ${d.orientation.toFixed(3)} · cadence ${d.stride.toFixed(2)}\n${Object.entries(d.weights).map(([k,v])=>`${k.replace('lower:','')} ${v.toFixed(2)}`).join(' | ')}\nESTIMATED foot state (no IK): L ${d.feet.L.estimated}, R ${d.feet.R.estimated}\nraw foot-bone drift L ${d.feet.L.drift.toFixed(1)}, R ${d.feet.R.drift.toFixed(1)} world units\n${current.count} rigs · ${renderer.info.render.calls} draw calls · reset ${d.reset||'none'}`;
}
function percentile(values,p){return [...values].sort((a,b)=>a-b)[Math.min(values.length-1,Math.floor(values.length*p))]||0;}
function run(config={}){
 playing=false;reset(config);const times=[];let finite=true,unchanged=true,frame=0;
 while(time<(config.seconds??6)-1e-7){const dt=Math.min(config.jitter?[.012,.026,.009,.022,.014][frame%5]:1/current.fps,(config.seconds??6)-time),r=step(dt,{check:true});if(frame>15)times.push(r.cpu);finite&&=r.finite;unchanged&&=r.unchanged;frame++;}
 draw();return {mode:current.mode,scenario:current.scenario,frames:frame,finite,unchanged,debug:lastDebug,maxEstimatedFootDrift:maxDrift,cpuMs:{median:percentile(times,.5),p95:percentile(times,.95)},calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,backing:[canvas.width,canvas.height],renderer:renderer.getContext().getParameter(renderer.getContext().RENDERER)};
}
function tick(now){requestAnimationFrame(tick);if(!playing)return;const dt=(now-lastTick)/1000;if(dt<1/current.fps)return;lastTick=now;frameIntervals.push(dt*1000);if(frameIntervals.length>600)frameIntervals.shift();step(Math.min(dt,.1));draw();if(time>=6)reset(current);}
let lastTick=0;
window.motionLabReady=(async()=>{
 await characters.preload((n,total)=>hud.textContent=`Loading chassis ${n}/${total}`);
 for(const mode of modes)actors[mode]=Array.from({length:10},(_,slot)=>{const a=characters.actor(slot,slot%6,2,{legacyLocomotion:mode==='baseline'});scene.add(a.rig);return a;});
 reset(options());resize();step(0);await renderer.compileAsync(scene,camera);draw();
 window.motionLab={run,step:dt=>{step(dt,{check:true});draw();return lastDebug;},reset:config=>reset(config),framePacing:()=>({samples:frameIntervals.length,p50:percentile(frameIntervals,.5),p95:percentile(frameIntervals,.95)}),play(){frameIntervals=[];lastTick=performance.now();playing=true;},stop(){playing=false;}};
 for(const control of Object.values(controls))control.addEventListener('change',()=>{playing=false;reset(options());step(0);draw();});
 document.querySelector('#restart').onclick=()=>{reset(options());step(0);draw();};
 document.querySelector('#play').onclick=()=>{playing=!playing;lastTick=performance.now();};
 addEventListener('resize',resize);requestAnimationFrame(tick);return true;
})();
