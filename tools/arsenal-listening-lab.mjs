import {createAudio} from '../games/botstrike/client/audio.mjs';
import {identityLabels,identityActions,identityPlan,identityCues,identitySummary,participantSeed} from './arsenal-listening-protocol.mjs';
const $=id=>document.getElementById(id),manifest=await fetch('./manifest.json').then(r=>r.json());
const prefs={sound:true,volume:.6,effectsVolume:1,alertsVolume:1};
let context,audio,active=false,current=null,index=0,plan=[],timers=[],timing=[],started=0,answer,timeout=false,practiceCount=0,sessionLocked=false;
const report={schema:1,study:'botstrike-arsenal-identity-v1',automated:navigator.webdriver===true||new URL(location.href).searchParams.has('qa'),manifest,metadata:null,rows:[],outputs:[],references:[]};
function status(s){$('status').textContent=s;}
function stop(){for(const id of timers)clearTimeout(id);timers=[];audio?.reset();}
function ready(){
 if(!context){
  context=new AudioContext({latencyHint:'interactive'});audio=createAudio(()=>prefs,{contextFactory:()=>context});
  context.addEventListener('statechange',()=>{if(active&&context.state!=='running')pause('Audio suspended');});
 }
 audio.ready();if(context.state==='suspended')void context.resume().catch(()=>{});return context.state==='running';
}
function schedule(fn,ms){timers.push(setTimeout(fn,ms));}
function emit(cue){
 if(cue.kind==='shot')return audio.shot(cue.weapon,cue.spatial);
 if(identityActions.includes(cue.kind))return audio.weaponAction(cue.kind,cue.weapon,cue.spatial);
 // cue() intentionally has no admission return value. Source-start counters
 // below independently check every requested contact and distractor.
 audio.cue(cue.kind,cue.spatial);
}
function starts(){const s=audio.stats();return s.stereoStarted+s.monoStarted+s.hrtfStarted;}
function resetAnswers(){answer=undefined;timeout=false;$('submit').disabled=true;$('confidence').value='0';$('choices').replaceChildren();
 for(const [value,label]of [...identityLabels[current.family],'Unsure'].entries()){
  const b=document.createElement('button');b.type='button';b.textContent=label;b.disabled=true;b.setAttribute('aria-pressed','false');
  b.onclick=()=>{if(!active||b.disabled)return;answer=value===identityLabels[current.family].length?null:value;for(const other of $('choices').children)other.setAttribute('aria-pressed',String(other===b));$('submit').disabled=false;};$('choices').append(b);
 }
}
function setupView(){stop();$('task').hidden=true;$('setup').hidden=false;$('download').disabled=!report.rows.length;}
function pause(reason){
 if(active){report.rows.push({trial:current,valid:false,reason,timing:[...timing],audioState:context?.state});active=false;delete report.pending;}
 setupView();status(reason+'. Repeat the current trial when ready.');
}
function lockSetup(){for(const e of document.querySelectorAll('[data-lock]'))e.disabled=true;sessionLocked=true;}
function begin(){
 if(!ready()){status('Audio is enabling. Tap START again.');return;}
 if(!plan.length){
  const participant=$('participant').value.trim();if(!/^[a-z0-9_-]{1,40}$/i.test(participant)){status('Enter an anonymous code: letters, digits, _ or -.');return;}
  const seed=participantSeed(participant);plan=identityPlan(seed,{paired:$('paired').checked,output:$('output').value});
  report.metadata={participant,seed,paired:$('paired').checked,device:$('device').value.trim().slice(0,160),notes:$('notes').value.trim().slice(0,240),volume:prefs.volume,practiceCount,
   sampleRate:context.sampleRate,baseLatency:context.baseLatency,reviewerObserved:false,reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches,startedAt:new Date().toISOString()};lockSetup();
 }
 if(index>=plan.length){status('Complete. Download for review; no acceptance is inferred.');return;}
 current=plan[index];
 if(!report.outputs.some(r=>r.block===current.block)){
  if($('physical-output').value!==current.output||!$('physical').checked){status('Next block requires '+current.output+'. Select and confirm the actual physical output before starting.');return;}
  report.outputs.push({block:current.block,output:current.output,physicalOutputSelfReported:true,at:new Date().toISOString()});$('physical').checked=false;$('physical').disabled=true;$('physical-output').disabled=true;
 }
 stop();active=true;timing=[];started=performance.now();resetAnswers();$('setup').hidden=true;$('task').hidden=false;
 $('progress').textContent=`${current.output} · ${current.family} · ${index+1} / ${plan.length}`;
 $('prompt').textContent={weapon:'Identify the repeated centre weapon shots.',action:'Identify the repeated centre mechanical action.',surface:'Identify the surface of the repeated centre footsteps or landings.'}[current.family];
 audio.listener(0,'identity');const before=starts(),cues=identityCues(current);
 for(const cue of cues)schedule(()=>{if(!active)return;timing.push({expectedMs:cue.ms,actualMs:performance.now()-started,before:starts()});emit(cue);timing.at(-1).after=starts();timing.at(-1).completedMs=performance.now()-started;},cue.ms);
 report.pending={expected:cues.length,before};
 schedule(()=>{if(active)for(const b of $('choices').children)b.disabled=false;},1150);
 schedule(()=>{if(active){timeout=true;answer=null;submit();}},15000);
}
function submit(){
 if(!active||answer===undefined)return;
 const pending=report.pending,valid=context.state==='running'&&timing.length===pending.expected&&timing.every(t=>Math.abs(t.actualMs-t.expectedMs)<=80&&Math.abs(t.completedMs-t.expectedMs)<=80&&t.after===t.before+1)&&starts()-pending.before===pending.expected;
 report.rows.push({trial:current,valid,reason:valid?null:'Playback timing or source admission failed',answer,timeout,confidence:Number($('confidence').value),reactionMs:performance.now()-started,timing:[...timing],audioState:context.state,rendererStats:audio.stats()});
 delete report.pending;active=false;if(valid)index++;setupView();
 const next=plan[index];if(next&&next.block!==current.block){$('physical').disabled=false;$('physical-output').disabled=false;}status(!valid?'Trial interrupted; repeat it.':!next?'Complete. Download results for review.':next.block!==current.block?'Output block complete. Switch to '+next.output+' and confirm the physical output.':`Response recorded. ${index} / ${plan.length}. Start when ready.`);
 if(!next){$('start').disabled=true;$('summary').textContent=JSON.stringify(identitySummary(report),null,2);}
}
function practice(){
 if(sessionLocked)return;if(!ready()){status('Tap PLAY REFERENCE again after audio enables.');return;}
 stop();practiceCount++;const family=$('reference-family').value,target=Number($('reference').value),trial={family,target,weapon:0,contact:'step',range:'near',muffled:false,dense:false};report.references.push({family,target,volume:prefs.volume,at:new Date().toISOString()});
 for(const cue of identityCues(trial))schedule(()=>emit(cue),cue.ms);
 status('Labelled reference: '+identityLabels[family][target]+'. Practice is recorded separately from blind responses.');
}
function references(){const family=$('reference-family').value;$('reference').replaceChildren(...identityLabels[family].map((label,value)=>{const o=document.createElement('option');o.value=value;o.textContent=label;return o;}));}
references();$('reference-family').onchange=references;$('practice').onclick=practice;
$('start').onclick=begin;$('pause').onclick=()=>pause('Paused by participant');$('submit').onclick=submit;
$('volume').oninput=()=>{if(sessionLocked)return;prefs.volume=Number($('volume').value);audio?.setVolume();};
$('download').onclick=()=>{const data={...report,summary:identitySummary(report)},url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'})),link=document.createElement('a');link.href=url;link.download='botstrike-identity-'+report.metadata.participant+'.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
for(const event of ['resize','blur'])addEventListener(event,()=>{if(active)pause('Interrupted by '+event);else stop();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){if(active)pause('Page hidden');stop();void context?.suspend().catch(()=>{});}});
addEventListener('pagehide',()=>{stop();void audio?.dispose();});
globalThis.BotStrikeIdentityLab={snapshot:()=>structuredClone({index,total:plan.length,active,report:{...report,summary:identitySummary(report)}})};
status('Ready. 160 trials per output; 320 for the paired headphone/speaker task. Results stay on this device.');
