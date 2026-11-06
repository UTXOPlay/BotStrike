import {createAudio as baselineAudio} from './audio-baseline-v5/audio.mjs';
import {createAudio} from '../games/botstrike/client/audio.mjs';
import {directions,distances,listeningPlan,listeningSummary} from './audio-listening-protocol.mjs';
const $=id=>document.getElementById(id),manifest=await fetch('./manifest.json').then(r=>r.json());
const prefs={sound:true,volume:.6,effectsVolume:1,alertsVolume:1};let context,baseline,stereo,hrtf,active=false,trial=null,started=0,handles=[],index=0,answer={};
let report={schema:1,study:'botstrike-audio-baseline-v1',automated:navigator.webdriver===true||new URL(location.href).searchParams.has('qa'),manifest,metadata:null,rows:[],startedAt:null};
let plan=[];
function seed(code){let h=2166136261;for(const c of code)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0;}
const baselineSources=new Set();
function ready(){
 if(!context){context=new AudioContext({latencyHint:'interactive'});
  // The baseline source is byte-frozen. A lab-owned context records sources so
  // pause can stop them without altering its active sound graph or samples.
  const proxy=new Proxy(context,{get(target,key){if(['createBufferSource','createOscillator'].includes(key))return(...args)=>{const s=target[key](...args);baselineSources.add(s);s.addEventListener('ended',()=>baselineSources.delete(s));return s;};const v=Reflect.get(target,key,target);return typeof v==='function'?v.bind(target):v;}});
  const original=globalThis.AudioContext;try{globalThis.AudioContext=class{constructor(){return proxy;}};baseline=baselineAudio(()=>prefs);baseline.ready();}finally{globalThis.AudioContext=original;}
  stereo=createAudio(()=>prefs,{contextFactory:()=>context});hrtf=createAudio(()=>prefs,{contextFactory:()=>context,experimentalHrtf:true});stereo.ready();hrtf.ready();
 }
 if(context.state==='suspended')void context.resume().catch(()=>{});return context;
}
function engine(mode){return mode==='baseline'?baseline:mode==='hrtf'?hrtf:stereo;}
function stop(){for(const h of handles)clearTimeout(h);handles=[];for(const s of baselineSources){try{s.stop();s.disconnect();}catch{}}baselineSources.clear();stereo?.reset();hrtf?.reset();}
function schedule(fn,ms){handles.push(setTimeout(()=>{if(active)fn();},ms));}
function rowsUi(){for(const [id,values]of [['direction',directions],['distance',distances],['front-back',['FRONT','BACK','SIDE']],['occlusion',['CLEAR','MUFFLED']]]){
 const root=$(id);for(const [n,name]of [...values,'UNSURE'].entries()){const button=document.createElement('button');button.textContent=name;button.type='button';const key={direction:'sector',distance:'range','front-back':'frontBack',occlusion:'muffled'}[id],value=n===values.length?null:key==='frontBack'?name.toLowerCase():key==='muffled'?n===1:n;button.onclick=()=>{if(!active)return;answer[key]=value;for(const b of root.children)b.setAttribute('aria-pressed',String(b===button));$('submit').disabled=!['sector','range','frontBack','muffled'].every(k=>k in answer);};root.append(button);}}
}
rowsUi();
function status(text){$('status').textContent=text;}
function exportRows(){const data={...report,summary:listeningSummary(report)},blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='botstrike-listening-'+report.metadata.participant+'.json';link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1000);}
function pause(reason){
 if(active){report.rows.push({trial,valid:false,reason,at:performance.now(),audioState:context?.state});active=false;}
 stop();$('task').hidden=true;$('setup').hidden=false;$('download').disabled=!report.rows.length;status(reason||'Paused. Start the current trial again when ready.');
}
function play(){
 ready();if(context.state!=='running'){status('Audio is suspended. Tap START again to enable it.');return;}
 if(!plan.length){
  const participant=$('participant').value.trim();if(!/^[a-z0-9_-]{1,40}$/i.test(participant)){status('Enter an anonymous code using letters, digits, _ or -.');return;}
  report.startedAt=new Date().toISOString();report.metadata={participant,output:$('output').value,device:$('device').value.trim().slice(0,160),notes:$('notes').value.trim().slice(0,240),sampleRate:context.sampleRate,baseLatency:context.baseLatency,volume:prefs.volume,reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches,physicalOutputSelfReported:$('physical').checked,reviewerObserved:false};
  report.seed=seed(participant);plan=listeningPlan(report.seed,{comparisons:$('comparisons').checked});
 }
 if(index>=plan.length){status('All trials complete. Download the results for review.');return;}
 stop();trial=plan[index];answer={};active=true;started=performance.now();$('setup').hidden=true;$('task').hidden=false;$('submit').disabled=true;
 for(const b of document.querySelectorAll('[aria-pressed]'))b.setAttribute('aria-pressed','false');
 $('progress').textContent=`BLOCK ${trial.block+1} · TRIAL ${index+1} / ${plan.length}`;
 const audio=engine(trial.mode);report.rendererBefore=audio.stats?.()||null;audio.ready();audio.listener?.(0,'lab:'+trial.block);
 const timing=[];report.pendingTiming=timing;
 for(const delay of [100,230,360])schedule(()=>{timing.push({expectedMs:delay,actualMs:performance.now()-started,audioTime:context.currentTime});audio.shot(2,{bearing:trial.bearing,pan:Math.sin(trial.bearing),level:trial.level,muffled:trial.muffled,self:false});},delay);
 if(trial.dense)for(const [n,delay]of [190,310].entries())schedule(()=>{const bearing=trial.bearing+(n?-1:1)*Math.PI/2;audio.cue('step',{bearing,pan:Math.sin(bearing),level:.6,muffled:false,self:false});},delay);
 schedule(()=>{if(active){for(const key of ['sector','range','frontBack','muffled'])answer[key]??=null;answer.timeout=true;submit();}},12000);
}
function submit(){
 if(!active)return;
 const timing=report.pendingTiming||[],valid=context.state==='running'&&timing.length===3&&timing.every(t=>Math.abs(t.actualMs-t.expectedMs)<=80);
 const rendererStats=engine(trial.mode).stats?.()||null,before=report.rendererBefore;const effectiveMode=trial.mode==='baseline'?'baseline':rendererStats.monoStarted>(before?.monoStarted||0)?trial.mode+'-mono':trial.mode==='hrtf'&&rendererStats.hrtfStarted===(before?.hrtfStarted||0)?'hrtf-stereo-fallback':trial.mode;
 report.rows.push({trial,effectiveMode,valid,reason:valid?null:'playback interruption or scheduling stall',answer:{...answer},confidence:Number($('confidence').value),reactionMs:performance.now()-started,timing,audioState:context.state,rendererStats});delete report.pendingTiming;active=false;stop();
 if(valid)index++;$('download').disabled=false;$('task').hidden=true;$('setup').hidden=false;
 status(valid?(index===plan.length?'Complete. Download results; no human acceptance is inferred automatically.':`Response recorded. ${index} / ${plan.length}. Start the next trial when ready.`):'Trial invalidated by timing. Repeat it when the browser is responsive.');
 $('summary').textContent=index===plan.length?JSON.stringify(listeningSummary(report),null,2):'';
}
$('start').onclick=play;$('pause').onclick=()=>pause('Paused by participant');$('submit').onclick=submit;$('download').onclick=exportRows;
$('calibrate').onclick=()=>{ready();if(context.state!=='running'){status('Tap level check again after enabling audio.');return;}stop();baseline.shot(2,{pan:0,level:.6,muffled:false});status('Comfortable level check only. Keep the same volume for the whole session.');};
$('volume').oninput=()=>{if(active||plan.length){pause('Volume changed: start a new session to compare levels fairly.');$('start').disabled=true;return;}prefs.volume=Number($('volume').value);baseline?.setVolume();stereo?.setVolume();hrtf?.setVolume();};
for(const event of ['resize','blur'])addEventListener(event,()=>{if(active)pause('Interrupted by '+event);});
document.addEventListener('visibilitychange',()=>{if(document.hidden){if(active)pause('Page hidden');stop();if(context?.state==='running')void context.suspend().catch(()=>{});}});
addEventListener('pagehide',()=>{stop();void context?.close();});
// Read-only QA observations; no answer setter, event injection or live game access.
globalThis.BotStrikeListeningLab={snapshot:()=>structuredClone({index,total:plan.length,active,report:{...report,summary:listeningSummary(report)}}),stop:()=>pause('Stopped')};
status('Ready. This page has no match data and sends no listening responses to a server.');
