import {AudioBudget} from './audio-budget.mjs';
import {soundRoute,softCeiling} from './audio-spatial.mjs';
import {makeWeaponActionSample} from './weapon-action-sound.mjs';
import {makeShotSample} from './shot-sound.mjs';
import {makeImpactSample} from './impact-sound.mjs';
import {makeFootstepSample} from './footstep-sound.mjs';

const sampledWeapons=Array.from({length:12},(_,i)=>i);

// V5 native rules/profile stay unchanged. Only the bounded Web Audio graph changes.
export function createAudio(settings,{contextFactory=()=>new AudioContext(),now=()=>performance.now(),experimentalHrtf=false}={}){
 let context,bus,effects,alerts,ceiling,disposed=false,listenerYaw=0,listenerKey=null,settingsKey=null;
 const modeCounts={hrtfStarted:0,stereoStarted:0,monoStarted:0};
 const budget=new AudioBudget({now}),routes=new Set(),actionBuffers=new Map(),shotBuffers=new Map(),impactBuffers=new Map(),footstepBuffers=new Map(),stepPhaseByActor=new Map();
 function stopAll(){budget.reset();for(const route of routes)route.disconnect();routes.clear();stepPhaseByActor.clear();}
 function volume(){
  if(!bus)return;const p=settings(),key=[p.sound,p.volume,p.effectsVolume,p.alertsVolume].join(':');if(key===settingsKey)return;settingsKey=key;
  for(const [node,value]of [[bus,p.sound?Math.max(0,Math.min(1,p.volume??.6))*.3:0],[effects,Math.max(0,Math.min(1,p.effectsVolume??1))],[alerts,Math.max(0,Math.min(1,p.alertsVolume??1))]]){
   node.gain.cancelScheduledValues(context.currentTime);
   if(value===0)node.gain.setValueAtTime(0,context.currentTime);else node.gain.setTargetAtTime(value,context.currentTime,.01);
  }
  if(!p.sound)stopAll();
 }
 function ready(){
  if(disposed)return null;
  try{
   if(!context){context=contextFactory();context.addEventListener?.('statechange',()=>{if(context.state!=='running')stopAll();});}
   if(!bus){
    bus=context.createGain();effects=context.createGain();alerts=context.createGain();bus.gain.value=effects.gain.value=alerts.gain.value=0;ceiling=context.createWaveShaper();ceiling.curve=softCeiling();ceiling.oversample='none';
    effects.connect(bus);alerts.connect(bus);bus.connect(ceiling).connect(context.destination);volume();
   }
   for(const weapon of sampledWeapons)if(!shotBuffers.has(weapon)){
    const samples=makeShotSample(weapon,context.sampleRate),buffer=context.createBuffer(1,samples.length,context.sampleRate);buffer.copyToChannel(samples,0);shotBuffers.set(weapon,buffer);
   }
   for(const kind of ['body','head','damage'])if(!impactBuffers.has(kind)){
    const samples=makeImpactSample(kind,context.sampleRate),buffer=context.createBuffer(1,samples.length,context.sampleRate);buffer.copyToChannel(samples,0);impactBuffers.set(kind,buffer);
   }
   for(let surface=0;surface<3;surface++)for(const kind of ['step0','step1','land'])if(!footstepBuffers.has(surface+':'+kind)){
    const samples=makeFootstepSample(kind,context.sampleRate,surface),buffer=context.createBuffer(1,samples.length,context.sampleRate);buffer.copyToChannel(samples,0);footstepBuffers.set(surface+':'+kind,buffer);
   }
   volume();if(context.state==='suspended')void context.resume().catch(()=>{});
   return context;
  }catch{return null;}
 }
 function request(spatial,priority,start,essential=false){
  if(disposed||globalThis.document?.hidden||!settings().sound||(!essential&&(settings().effectsVolume??1)===0)||(essential&&(settings().alertsVolume??1)===0))return false;
  const c=ready();if(!c||c.state!=='running')return false;
  const remote=!essential&&!!spatial&&spatial.self!==true;
  return budget.request({remote,priority:remote?Math.min(priority,1):priority,start:ended=>{
   const route=soundRoute(c,spatial,{yaw:listenerYaw,experimentalHrtf});modeCounts[route.hrtf?'hrtfStarted':route.mono?'monoStarted':'stereoStarted']++;routes.add(route);route.output.connect(essential?alerts:effects);
   let built;try{built=start(c,route.input);}catch(error){route.disconnect();routes.delete(route);throw error;}
   const {source,nodes=[],startAt=c.currentTime,stopAt}=built;let finished=false,tailTimer;
   const cleanup=()=>{if(finished)return;finished=true;clearTimeout(tailTimer);source.onended=null;source.disconnect();for(const node of nodes)node.disconnect();route.disconnect();routes.delete(route);ended();};
   source.onended=()=>{if(route.hrtf)tailTimer=setTimeout(cleanup,50);else cleanup();};try{source.start(startAt);if(stopAt!==undefined)source.stop(stopAt);}catch(error){cleanup();throw error;}
   return immediate=>{
    if(finished)return;
    if(immediate){try{source.stop();}catch{}cleanup();}
    else{const at=c.currentTime;route.gain.gain.cancelScheduledValues(at);route.gain.gain.setValueAtTime(route.gain.gain.value,at);route.gain.gain.linearRampToValueAtTime(0,at+.004);try{source.stop(at+.005);}catch{cleanup();}}
   };
  }});
 }
 function pulse(frequency,duration=.12,level=.2,type='triangle',delay=0,spatial=null,priority=2,essential=false){
  return request(spatial,priority,(c,input)=>{
   const start=c.currentTime+delay,osc=c.createOscillator(),envelope=c.createGain();osc.type=type;
   osc.frequency.setValueAtTime(frequency,start);osc.frequency.exponentialRampToValueAtTime(Math.max(25,frequency*.22),start+duration);
   envelope.gain.setValueAtTime(.001,c.currentTime);envelope.gain.setValueAtTime(.001,start);envelope.gain.exponentialRampToValueAtTime(Math.max(.001,level),start+.004);envelope.gain.exponentialRampToValueAtTime(.001,start+duration);
   osc.connect(envelope).connect(input);
   return {source:osc,nodes:[envelope],startAt:start,stopAt:start+duration+.01};
  },essential);
 }
 function sampled(cache,key,spatial,priority=2,essential=false){
  if(disposed||globalThis.document?.hidden||!settings().sound)return false;ready();if(!cache.has(key))return false;
  return request(spatial,priority,(c,input)=>{const source=c.createBufferSource();source.buffer=cache.get(key);source.connect(input);return {source};},essential);
 }
 function listener(yaw,key){
  if(key!==listenerKey){stopAll();listenerKey=key;}
  if(Number.isFinite(yaw)){listenerYaw=yaw;for(const route of routes)route.orient(yaw);}
 }
 const visibility=()=>{if(globalThis.document?.hidden){stopAll();if(context?.state==='running')void context.suspend().catch(()=>{});}};
 globalThis.document?.addEventListener('visibilitychange',visibility);
 function weaponAction(kind,weapon=0,spatial){
  if(disposed||globalThis.document?.hidden||!settings().sound||(settings().effectsVolume??1)===0||!Number.isInteger(weapon)||weapon<0||weapon>=12)return false;
  const key=kind+':'+weapon,c=ready();if(!c)return false;if(!actionBuffers.has(key)){const samples=makeWeaponActionSample(kind,weapon,c.sampleRate);if(!samples)return false;const buffer=c.createBuffer(1,samples.length,c.sampleRate);buffer.copyToChannel(samples,0);actionBuffers.set(key,buffer);}
  return sampled(actionBuffers,key,spatial,2);
 }
 const shot=(weapon=0,spatial)=>sampledWeapons.includes(weapon)?sampled(shotBuffers,weapon,spatial):false;
 function cue(kind,spatial){
  if(kind==='step'||kind==='land'){
   const self=spatial?.self??true,actor=self?'self':null,phase=stepPhaseByActor.get(actor)||0;
   if(kind==='step')stepPhaseByActor.set(actor,(phase+1)%2);
   // Event IDs are deduplicated by FeedbackCursor. A wall-clock cooldown would
   // drop valid contacts during fast gaits or several anonymous nearby runners.
   const surface=Number.isInteger(spatial?.surface)&&spatial.surface>=0&&spatial.surface<3?spatial.surface:0;
   const mix=self?(kind==='land'?0.7:0.6):(kind==='land'?0.38:0.3);
   sampled(footstepBuffers,surface+':'+(kind==='land'?'land':'step'+phase%2),{...spatial,level:(spatial?.level??1)*mix},1);
  }
  else if(['reload','reload_feed','reload_close','equip','empty'].includes(kind))weaponAction(kind,spatial?.weapon??0,spatial);
  else if(kind==='skill'){pulse(300,.25,.15,'sine',0,spatial);pulse(900,.15,.12,'sine',.08,spatial);}
  else if(['item','utility','plasma'].includes(kind))pulse(kind==='plasma'?50:160,.18,.2,'sawtooth',0,spatial);
  else if(kind==='planted'){pulse(900,.16,.18,'square',0,null,3,true);pulse(1250,.12,.14,'sine',.2,null,3,true);}
  else if(kind==='beep')pulse(1100,.055,.1,'sine',0,null,3,true);
  else if(kind==='win')[440,660,880].forEach((hz,i)=>pulse(hz,.25,.16,'sine',i*.13,null,3,true));
  else if(kind==='loss')[440,330,220].forEach((hz,i)=>pulse(hz,.22,.13,'sine',i*.13,null,3,true));
  else if(kind==='respawn')pulse(650,.15,.12,'sine',0,null,3,true);
 }
 return {ready,setVolume:volume,listener,reset:stopAll,shot,weaponAction,cue,hit:(head=false)=>sampled(impactBuffers,head?'head':'body',null,3,true),kill:()=>{pulse(700,.09,.15,'sine',0,null,3,true);pulse(1400,.1,.12,'sine',.07,null,3,true)},damage:amount=>sampled(impactBuffers,'damage',{level:Math.min(1.2,.65+amount/150)},3,true),stats:()=>({...budget.snapshot(),...modeCounts,routes:routes.size,buffers:actionBuffers.size+shotBuffers.size+impactBuffers.size+footstepBuffers.size,bufferBytes:[...actionBuffers.values(),...shotBuffers.values(),...impactBuffers.values(),...footstepBuffers.values()].reduce((n,b)=>n+b.length*4,0),context:context?.state||'uninitialized',experimentalHrtf,hrtfVoices:[...routes].filter(r=>r.hrtf).length}),dispose:()=>{disposed=true;stopAll();globalThis.document?.removeEventListener('visibilitychange',visibility);for(const node of [effects,alerts,bus,ceiling])node?.disconnect();actionBuffers.clear();shotBuffers.clear();impactBuffers.clear();footstepBuffers.clear();return context?.close().catch(()=>{});}};
}
