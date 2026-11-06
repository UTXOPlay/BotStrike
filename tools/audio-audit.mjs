import {createAudio as frozenAudio} from './audio-baseline-v5/audio.mjs';
import {createAudio} from '../games/botstrike/client/audio.mjs';
import {makeImpactSample} from '../games/botstrike/client/impact-sound.mjs';
import {createFeedback} from '../games/botstrike/client/feedback.mjs';
import spec from '../botstrike/spec.json';
const essentialBuffer=buffer=>buffer&&['body','head','damage'].some(kind=>{
 const sample=makeImpactSample(kind,buffer.sampleRate),actual=buffer.getChannelData(0);return actual.length===sample.length&&actual.every((v,i)=>v===sample[i]);
});
function observedContext(context,{offline=false,at=()=>context.currentTime}={}){
 const sources=[],buffers=[],nodes=[];
 const proxy=new Proxy(context,{get(target,key){
  if(key==='currentTime')return at();if(offline&&key==='state')return 'running';if(offline&&['resume','suspend','close'].includes(key))return()=>Promise.resolve();
  if(key==='createBuffer')return(...args)=>{const b=target.createBuffer(...args);buffers.push(b);return b;};
  if(typeof key==='string'&&key.startsWith('create')&&typeof target[key]==='function')return(...args)=>{
   const node=target[key](...args);nodes.push({kind:key,node});
   if(['createBufferSource','createOscillator'].includes(key)){const start=node.start.bind(node);node.start=(time=at(),...rest)=>{sources.push({kind:key,buffer:buffers.indexOf(node.buffer),at:time});return start(time,...rest);};}
   return node;
  };
  const value=Reflect.get(target,key,target);return typeof value==='function'?value.bind(target):value;
 }});return {proxy,sources,buffers,nodes};
}
function makeEngine(mode,proxy,prefs){
 if(mode!=='baseline')return createAudio(()=>prefs,{contextFactory:()=>proxy,experimentalHrtf:mode==='hrtf'});
 const original=globalThis.AudioContext;try{globalThis.AudioContext=class{constructor(){return proxy;}};const e=frozenAudio(()=>prefs);e.ready();return e;}finally{globalThis.AudioContext=original;}
}
export async function renderAudioAudit({mode='candidate',rate=48000,bearing=0,mix=false,fallback=false}={}){
 globalThis.BotStrikeAudioAuditStage={task:'offline',mode,rate,phase:'create'};
 const context=new OfflineAudioContext(2,Math.round(rate*1.2),rate);let time=0;const observed=observedContext(context,{offline:true,at:()=>time});
 let proxy=observed.proxy;if(fallback)proxy=new Proxy(proxy,{get:(target,key)=>key==='createPanner'||fallback==='mono'&&key==='createStereoPanner'?undefined:Reflect.get(target,key)});
 const prefs={sound:true,volume:1,effectsVolume:1,alertsVolume:1},audio=makeEngine(mode,proxy,prefs);audio.ready();time=.1;audio.listener?.(0,'offline');
 const start=performance.now();for(let i=0;i<(mix?100:1);i++)audio.shot(2,{bearing,pan:Math.sin(bearing),level:1,muffled:false,self:false});
 if(mix){audio.damage(40);audio.hit(false);}
 globalThis.BotStrikeAudioAuditStage={task:'offline',mode,rate,phase:'render',state:context.state};
 const before=audio.stats?.()||null,rendered=await context.startRendering(),renderMs=performance.now()-start,channels=[...Array(2)].map((_,i)=>rendered.getChannelData(i));
 const stats=channels.map(values=>{let peak=0,energy=0,clipped=0,onset=null;for(let i=0;i<values.length;i++){const v=values[i];peak=Math.max(peak,Math.abs(v));energy+=v*v;if(Math.abs(v)>1)clipped++;if(onset===null&&Math.abs(v)>1e-5)onset=i/rate;}return {peak,rms:Math.sqrt(energy/values.length),clipped,onset};});
 let frontHash=0;for(let i=Math.round(rate*.1);i<Math.round(rate*.3);i++)frontHash+=channels[0][i]*(i%97+1);
 const result={mode,rate,bearing,mix,fallback,renderMs,channels:stats,waveProbe:frontHash,sourceCount:observed.sources.length,essentialSamples:observed.sources.filter(s=>essentialBuffer(observed.buffers[s.buffer])).length,bufferBytes:observed.buffers.reduce((n,b)=>n+b.length*4,0),before,after:audio.stats?.()||null,hrtfNodes:observed.nodes.filter(n=>n.kind==='createPanner').length};
 audio.reset?.();return result;
}
export async function realtimeAudioAudit(){
 globalThis.BotStrikeAudioAuditStage={task:'realtime',phase:'create'};
 const context=new AudioContext(),observed=observedContext(context),prefs={sound:true,volume:.6,effectsVolume:1,alertsVolume:1},audio=createAudio(()=>prefs,{contextFactory:()=>observed.proxy});globalThis.BotStrikeAudioAuditStage={task:'realtime',phase:'resume',state:context.state};await context.resume();globalThis.BotStrikeAudioAuditStage={task:'realtime',phase:'running',state:context.state};audio.ready();audio.listener(0,'first');
 for(let i=0;i<100;i++)audio.shot(2,{bearing:Math.PI/2,level:.6,self:false});
 audio.damage(50);audio.hit();const reserved=audio.stats();
 for(let i=0;i<12;i++)audio.shot(2);audio.damage(40);const retiring=audio.stats();await new Promise(r=>setTimeout(r,35));const drained=audio.stats();
 audio.listener(Math.PI/2,'second');const changed=audio.stats();
 audio.cue('step',{self:false,bearing:0,level:.6});audio.cue('step',{self:false,bearing:Math.PI,level:.6});const anonymousSteps=audio.stats();
 prefs.sound=false;audio.setVolume();const muted=audio.stats();prefs.sound=true;audio.setVolume();globalThis.BotStrikeAudioAuditStage={task:'realtime',phase:'suspend'};await context.suspend();audio.shot(2);const suspended=audio.stats();globalThis.BotStrikeAudioAuditStage={task:'realtime',phase:'second-resume',state:context.state};await context.resume();audio.ready();audio.shot(2);const resumed=audio.stats();
 await audio.dispose();return {reserved,retiring,drained,changed,anonymousSteps,muted,suspended,resumed,disposed:audio.stats(),sourceCount:observed.sources.length};
}
export async function arsenalAudioAudit(){
 const context=new AudioContext(),observed=observedContext(context),audio=createAudio(()=>({sound:true,volume:1}),{contextFactory:()=>observed.proxy});await context.resume();const start=performance.now();audio.ready();
 for(let weapon=0;weapon<12;weapon++)for(const kind of ['reload','reload_feed','reload_close','equip','empty'])audio.weaponAction(kind,weapon,{self:false,level:.6});
 const cached=audio.stats(),cacheMs=performance.now()-start;audio.reset();
 for(let i=0;i<100;i++){audio.shot(i%12,{self:false,bearing:i*Math.PI/4,level:1});audio.cue('step',{self:false,surface:i%3,level:1});}
 audio.hit();audio.damage(40);const pressure=audio.stats(),essentialSamples=observed.sources.filter(s=>essentialBuffer(observed.buffers[s.buffer])).length;
 await audio.dispose();return {cached,cacheMs,pressure,essentialSamples,disposed:audio.stats()};
}
export function feedbackEventAudit(){
 const fixture=document.createElement('div');fixture.hidden=true;for(const id of ['death-detail','death-tip','killer','objective-progress','vitals-state','buffs','hit-marker','damage','damage-bearing','combat-banner','kill-feed','crosshair','accuracy-state']){const el=document.createElement('div');el.id=id;fixture.append(el);}document.body.append(fixture);
 const played=[],audio={listener(){},cue:(kind,options)=>played.push({kind,...options}),shot:(weapon,options)=>played.push({kind:'shot',weapon,...options})};
 let room={id:'audio-qa',slot:0,roster:[],state:{tick:10,players:[{slot:0,team:0,life:1,alive:true,hero:0,health:100,weapon:2,velocity:[0,0,0],position:[0,0,0]},{slot:1,team:1,life:1,alive:true}],objective:{}},feedback:[]};
 const make=(extra={})=>createFeedback({audio,getPrefs:()=>({fov:90,sound:true}),getRoom:()=>room,getYaw:()=>0,spec,...extra});
 try{
  let feedback=make();feedback.accept(room);room.state.tick=11;
  for(let weapon=0;weapon<12;weapon++)for(const kind of ['shot','reload','reload_feed','reload_close','equip'])room.feedback.push({id:kind+':'+weapon,tick:11,kind,value:weapon,self:false,bearing:Math.PI/4,level:.6,muffled:true});
  feedback.accept(room);const first=played.length;feedback.accept(room);const duplicate=played.length;
  room.state.tick=14;room.feedback.push({id:'skip-feed',tick:12,kind:'reload_feed',value:5,self:true});feedback.accept(room);const skipped=played.length;
  room.state.players[0].life++;room.state.tick=15;feedback.accept(room);const lifeBoundary=played.length;
  room.state.tick=16;room.feedback.push({id:'next-life',tick:16,kind:'equip',value:5,self:true});feedback.accept(room);const nextLife=played.length;
  feedback=make();feedback.accept(room);const reconnect=played.length;
  room.state.tick=17;room.feedback.push({id:'after-reconnect',tick:17,kind:'reload',value:5,self:true});feedback.accept(room);const afterReconnect=played.length;
  let viewTick=18;room.state.tick=20;feedback=make({getViewTick:()=>viewTick});feedback.accept(room);room.state.tick=24;room.feedback.push({id:'queued-contact',tick:21,kind:'step',value:1,self:false,bearing:0,level:.6});feedback.accept(room);feedback.render(performance.now());const beforeContact=played.length;viewTick=21;feedback.render(performance.now());const atContact=played.length;
  room.state.tick=25;room.feedback.push({id:'canceled-contact',tick:25,kind:'land',value:1,self:false,bearing:0,level:.6});feedback.accept(room);room.state.players[0].life++;room.state.tick=26;viewTick=26;feedback.render(performance.now());const changedListener=played.length;
  return {first,duplicate,skipped,lifeBoundary,nextLife,reconnect,afterReconnect,beforeContact,atContact,changedListener,played};
 }finally{fixture.remove();}
}
