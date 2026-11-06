import {auditCover,auditCoverRays} from './cover-readability-audit.mjs';
import {createWorld} from '../games/botstrike/client/scene.mjs';
import {signalSvg} from '../games/botstrike/client/team-signals.mjs';
import {GamepadTracker,padButtons} from '../games/botstrike/client/gamepad.mjs';
import {advanceMotion} from '../games/botstrike/client/prediction.mjs';
import {canSee} from '../botstrike-service/visibility.mjs';
import {trials,summarize,lane,visionMatrices} from './recognition-protocol.mjs';
const $=id=>document.getElementById(id),canvas=$('arena');
const fatal=error=>{$('setup').hidden=false;$('status').textContent='Study unavailable: '+(error?.message||error);$('start').disabled=true;};addEventListener('error',event=>fatal(event.error||event.message));addEventListener('unhandledrejection',event=>fatal(event.reason));
const [spec,templates,manifest]=await Promise.all(['spec','states','manifest'].map(name=>fetch('./'+name+'.json').then(r=>r.json())));
const world=createWorld(canvas,spec),pad=new GamepadTracker(),reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
for(const [name,m]of Object.entries(visionMatrices)){
 const filter=document.createElementNS('http://www.w3.org/2000/svg','filter');filter.id='vision-'+name;filter.setAttribute('color-interpolation-filters','linearRGB');
 const matrix=document.createElementNS(filter.namespaceURI,'feColorMatrix');matrix.setAttribute('type','matrix');matrix.setAttribute('values',[...m.slice(0,3),0,0,...m.slice(3,6),0,0,...m.slice(6,9),0,0,0,0,0,1,0].join(' '));filter.append(matrix);$('filters').append(filter);
}
$('legend').innerHTML=`<span>${signalSvg('ally')} ALLY · shield / chevrons</span><span>${signalSvg('enemy')} ENEMY · split brackets / diamond</span>`;
let schedule=[],rows=[],index=0,phase='loading',trial=null,state=null,pose=null,motion=null,basePosition=null,moveSign=1,warm=0,start=0,betweenUntil=0,lastFrame=performance.now(),intervals=[],cohort=null,code=null,startedAt=null,frame=0;
const lanes=new Map();for(let map=0;map<3;map++)for(const distance of [300,600,1200])lanes.set(map+':'+distance,lane(spec.maps[map],distance,map+distance));
function report(){return {schema:1,kind:'offline-recognition-study',humanInputAttested:false,automatedBrowser:!!navigator.webdriver,manifest,participantCode:code,declaredInput:cohort,startedAt,seed:2050,plannedTrials:schedule.length,environment:{userAgent:navigator.userAgent,devicePixelRatio,screen:[screen.width,screen.height],reducedMotion:reduced()},limitations:['Offline repositioned native-state fixtures; this is not a signed match or a live visibility-policy validation.','Hidden-control trials deliberately omit the actor; edge smoke uses the candidate renderer/policy.','Balanced fractional coverage does not isolate every factor interaction.','Color simulations are approximate and cannot replace affected-player testing.','Correct-only reaction times exclude timeouts; counts and timeouts are reported separately.'],rows,summary:summarize(rows)};}
canvas.addEventListener('webglcontextlost',()=>invalidate('graphics context lost'));
window.recognitionLab={auditCoverRays(map,rays){if(phase==='active'||phase==='warm')throw Error('Pause the task before a geometry audit');if(!Number.isInteger(map)||map<0||map>2)throw Error('Choose a combat map');world.setMap(map);return auditCoverRays(world,spec.maps[map],rays);},auditCover(map){if(phase==='active'||phase==='warm')throw Error('Pause the task before a geometry audit');if(!Number.isInteger(map)||map<0||map>2)throw Error('Choose a combat map');world.setMap(map);return auditCover(world,spec.maps[map]);},get phase(){return phase},get index(){return index},get rows(){return rows.length},report};
function overlay(message){$('pause').hidden=true;$('setup').hidden=false;$('status').textContent=message;$('start').textContent=index>=schedule.length&&schedule.length?'TASK COMPLETE':'CONTINUE';$('start').disabled=index>=schedule.length&&schedule.length>0;$('download').disabled=!rows.length;$('responses').hidden=true;$('fixation').hidden=false;}
function finish(){phase='complete';overlay('Task complete. Download the raw trials and per-condition counts. These results require human review.');$('summary').textContent=JSON.stringify(report().summary.total,null,2);}
function next(now){
 if(index>=schedule.length){finish();return;}
 trial=schedule[index];pose=lanes.get(trial.map+':'+trial.distance);if(!pose)throw Error('No clear native lane for study case');
 state=structuredClone(templates[trial.map]);delete state.practice;state.utilities=[];state.drops=[];state.events=[];state.phase='live';state.tick=0;
 for(const p of state.players){p.hidden=true;p.alive=false;p.velocity=[0,0,0];p.effect=0;p.disabled=0;p.flash=0;p.stance=0;p.crouch=false;p.life=(p.life||0)+index+1;}
 const me=state.players[0];Object.assign(me,{alive:true,hidden:false,position:[...pose.origin],yaw:pose.yaw,pitch:0,weapon:2});
 const slot=trial.relation==='ally'?1:5,target=state.players[slot];
 Object.assign(target,{alive:true,hidden:trial.smoke==='hidden-control',hero:trial.hero,position:[...pose.target],yaw:Math.atan2(Math.sin(pose.yaw+Math.PI),Math.cos(pose.yaw+Math.PI)),pitch:0,weapon:2,health:spec.heroes[trial.hero].health});
 if(trial.smoke!=='clear'){
  const side=trial.smoke==='edge'?190:0;
  state.utilities=[{kind:2,owner:0,fuse:0,life:64*14,velocity:[0,0,0],position:[(pose.origin[0]+pose.target[0])/2+Math.cos(pose.yaw)*side,8,(pose.origin[2]+pose.target[2])/2-Math.sin(pose.yaw)*side]}];
 }
 motion={position:[...target.position],velocity:[0,0,0],vy:0,stance:0,landing:0,jumpHeld:false};basePosition=[...target.position];moveSign=1;warm=0;intervals=[];
 world.setMap(trial.map);world.resize(trial.fov);world.resolution(trial.scale);world.exposure(trial.brightness);canvas.style.filter='url(#vision-'+trial.vision+')';
 phase='warm';$('pause').hidden=false;$('setup').hidden=true;$('responses').hidden=true;$('fixation').hidden=false;$('progress').textContent=`DEVELOPMENT STUDY · ${index+1} / ${schedule.length}`;
}
function answer(answer,input,invalid=null){
 if(phase!=='active'&&!(invalid&&phase==='warm'))return;
 const ms=phase==='active'?Math.max(0,performance.now()-start):null;
 rows.push({trial:{...trial},answer,ms,input,declaredInput:cohort,invalid,viewport:[innerWidth,innerHeight],backing:[canvas.width,canvas.height],motionSuppressed:trial.motion&&reduced(),frames:intervals.length,maxFrameMs:intervals.length?Math.max(...intervals):null,meanFrameMs:intervals.length?intervals.reduce((a,b)=>a+b,0)/intervals.length:null});
 index++;$('download').disabled=false;$('responses').hidden=true;$('fixation').hidden=false;
 if(invalid){phase='paused';pad.reset();overlay('Trial marked invalid: '+invalid+'. Continue when ready.');}
 else{phase='between';betweenUntil=performance.now()+350;}
}
for(const b of $('responses').querySelectorAll('button'))b.onclick=e=>answer(b.dataset.answer,e.pointerType==='touch'?'touch':e.detail===0?'keyboard':'pointer');
addEventListener('keydown',e=>{if(e.code==='Escape'&&['active','warm','between'].includes(phase)){$('pause').click();return;}if(e.target.closest('input,select')||e.repeat)return;const value={KeyA:'ally',KeyE:'enemy',KeyN:'unseen'}[e.code];if(value&&phase==='active'){e.preventDefault();answer(value,'keyboard');}});
$('pause').onclick=()=>{if(['active','warm'].includes(phase))invalidate('manual pause');else{phase='paused';overlay('Paused. Continue when ready.');}};
function invalidate(reason){if(['active','warm'].includes(phase))answer(null,'none',reason);pad.reset();}
function rotation(){const blocked=matchMedia('(pointer:coarse)').matches&&innerHeight>innerWidth;$('rotate').hidden=!blocked;if(blocked)invalidate('portrait rotation');}
addEventListener('resize',()=>{invalidate('resize');world.resize(trial?.fov||80);rotation();});addEventListener('blur',()=>invalidate('focus loss'));document.addEventListener('visibilitychange',()=>{if(document.hidden)invalidate('page hidden')});
$('start').onclick=()=>{
 if(!schedule.length){code=$('participant').value.trim().replace(/[^a-zA-Z0-9_-]/g,'').slice(0,40)||'anonymous';cohort=$('cohort').value;startedAt=new Date().toISOString();schedule=trials();$('participant').disabled=$('cohort').disabled=true;}
 next(performance.now());
};
async function fullscreen(){try{await document.documentElement.requestFullscreen?.({navigationUI:'hide'});try{await screen.orientation?.lock?.('landscape')}catch{}}catch{}rotation();}
$('fullscreen').onclick=fullscreen;$('rotate-fullscreen').onclick=fullscreen;
$('download').onclick=()=>{const blob=new Blob([JSON.stringify(report(),null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='botstrike-recognition-'+(code||'anonymous')+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
await world.preload((n,total)=>$('status').textContent=`Loading chassis ${n}/${total}…`);phase='intro';$('start').disabled=false;$('status').textContent='Ready. Review the two glyph shapes, choose your input cohort and begin.';rotation();
let disposed=false;
function render(now){
 if(disposed)return;const gap=now-lastFrame,dt=Math.min(.05,Math.max(0,gap/1000));lastFrame=now;
 let pads=[];try{pads=navigator.getGamepads?.()||[]}catch{}
 const control=pad.update(pads,now);if(control.disconnected&&cohort==='controller')invalidate('controller disconnected');if(phase==='active')for(const [key,value]of [[padButtons.left,'ally'],[padButtons.right,'enemy'],[padButtons.utility,'unseen']])if(control.pressed.includes(key))answer(value,'controller');
 if(phase==='between'&&now>=betweenUntil)next(now);
 if(state&&['warm','active'].includes(phase)){
  const target=state.players[trial.relation==='ally'?1:5];
  if(trial.motion&&!reduced()){
   const side=(motion.position[0]-basePosition[0])*Math.cos(target.yaw)-(motion.position[2]-basePosition[2])*Math.sin(target.yaw);
   if(Math.abs(side)>40)moveSign=-Math.sign(side);
   advanceMotion(motion,{x:moveSign*.3,y:0,yaw:target.yaw,pitch:0,jump:false,crouch:false,scope:false},dt,spec.maps[trial.map],spec.heroes[trial.hero],spec.weapons[2]);target.position=[...motion.position];target.velocity=[...motion.velocity];
  }
  target.hidden=trial.smoke==='hidden-control'||(trial.relation==='enemy'&&!canSee(state,state.players[0],target,spec.maps[trial.map],spec.hit_regions));state.tick=frame++;
  world.frame(state,0,now,dt,{active:true,yaw:pose.yaw,pitch:0,reduced:reduced()});
  if(phase==='warm'&&++warm>=4){phase='active';start=performance.now();$('fixation').hidden=true;$('responses').hidden=false;}
  else if(phase==='active'){intervals.push(gap);if(gap>250)invalidate('render gap over 250 ms');else if(now-start>=3000)answer('timeout','none');}
 }else if(phase==='intro')world.frame(null,0,now,dt,{reduced:reduced()});
 requestAnimationFrame(render);
}
requestAnimationFrame(render);addEventListener('pagehide',()=>{disposed=true;world.dispose();});
