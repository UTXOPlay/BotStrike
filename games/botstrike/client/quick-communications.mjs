import {CommsInbox} from './comms-inbox.mjs';
import {pointerTerrain,pointerRadar,projectPing,pickableEnemy} from './ping-projection.mjs';
import {terrainPoint,radarProject} from '../../../shared/ping-geometry.mjs';
import {commsKinds,commsEnglish,mapCallouts,calloutAt} from '../../../shared/tactical-callouts.mjs';
const glyphs={enemy:'!',rotate:'↻',hold:'Ⅱ',utility:'◇',objective:'◎',help:'+',mark:'•'};
export function installQuickCommunications({hud,radar,canvas,spec,getRoom,getWorld,enabled,getKey,onOpen,onClose,onSend}){
 const inbox=new CommsInbox(),root=document.createElement('section');root.id='quick-comms';hud.after(root);
 root.innerHTML='<button id="comms-open" type="button" aria-label="Open quick communication">PING / COMMS</button><span id="comms-location"></span><canvas id="comms-radar" width="240" height="240" aria-hidden="true"></canvas><div id="comms-pins" aria-hidden="true"></div><div id="comms-feed" role="status" aria-live="polite" aria-atomic="true"></div><div id="comms-wheel" role="dialog" aria-label="Quick communication" hidden><div class="comms-heading"><b>QUICK COMMS</b><button type="button" id="comms-close" aria-label="Close quick communication">×</button></div><p>Squad only. Matches continue. Pick terrain or the radar, then a message.</p><label>Location<select id="comms-area"></select></label><label>Enemy report<select id="comms-target"><option value="">Location only</option></select></label><div id="comms-choices"></div><details><summary>Squad mute controls</summary><div id="comms-mutes"></div></details><small id="comms-hint"></small></div>';
 const $=id=>root.querySelector('#'+id),wheel=$('comms-wheel'),openButton=$('comms-open'),location=$('comms-location'),area=$('comms-area'),target=$('comms-target'),choices=$('comms-choices'),pins=$('comms-pins'),feed=$('comms-feed'),mutes=$('comms-mutes'),radarOverlay=$('comms-radar');
 let noticeUntil=0,noticeText='',point=null,feedKey='',rosterKey='',contextKey='',lastLocation='',lastRoom=null;
 const buttons=commsKinds.map((kind,i)=>{const b=document.createElement('button');b.type='button';b.dataset.comms=kind;b.textContent=glyphs[kind]+' '+(kind==='mark'?'Ping here':commsEnglish[kind]);b.setAttribute('aria-keyshortcuts',i<6?String(i+1):'');b.onclick=()=>send(kind);choices.append(b);return b;});
 const markerNodes=Array.from({length:6},()=>{const p=document.createElement('span');p.hidden=true;p.className='comms-pin';pins.append(p);return p;});
 const current=()=>{const room=getRoom(),s=room?.state,me=s?.players[room.slot],chosen=s?.players[room.spectate];return {room,s,me,viewer:me?.alive?me:chosen?.alive&&chosen.team===me?.team?chosen:s?.players.find(p=>p.alive&&p.team===me?.team),map:s?spec.maps[s.config.map]:null};};
 function updatePoint(next){point=next;target.value='';if(next){const {s,map}=current();$('comms-hint').textContent='Location: '+calloutAt(map,s.config.map,next).name;}else $('comms-hint').textContent='Aim at map terrain or choose a named area.';for(const b of buttons)b.disabled=!point;}
 function pointAt(x,y){const world=getWorld(),{map}=current();return world&&map?pointerTerrain(world.camera,map,canvas.getBoundingClientRect(),x,y):null;}
 function close(resume=true){if(wheel.hidden)return;wheel.hidden=true;delete document.documentElement.dataset.commsOpen;radar.style.pointerEvents='';openButton.setAttribute('aria-expanded','false');onClose(resume);}
 function open(){
  if(!enabled())return;if(!wheel.hidden){close();return;}
  const {s,map,viewer}=current();if(!viewer)return;wheel.hidden=false;document.documentElement.dataset.commsOpen='true';openButton.setAttribute('aria-expanded','true');onOpen();if(document.pointerLockElement)document.exitPointerLock?.();radar.style.pointerEvents='auto';
  area.replaceChildren(new Option('Crosshair / your location',''),...mapCallouts(map,s.config.map).map(c=>new Option(c.name,c.id)));const rect=canvas.getBoundingClientRect();updatePoint(pointAt(rect.left+rect.width/2,rect.top+rect.height/2)||terrainPoint(map,viewer.position[0],viewer.position[2]));
  rosterKey='';updateChoices();$('comms-hint').textContent+=' · 1–6 select; Escape cancels.';buttons[0].focus();
 }
 function send(kind){
  const {room,s,me}=current();if(!enabled()||!point||!me)return;
  const attach=kind==='enemy'&&target.value!==''?Number(target.value):null;
  onSend({type:'comms',kind,map:s.config.map,life:me.life,...(attach!==null?{target:attach}:{position:[...point]})});close();
 }
 function updateChoices(){
  const {room,s,me}=current();if(!s||!me)return;
  const world=getWorld(),rect=canvas.getBoundingClientRect(),available=world?s.players.filter(p=>pickableEnemy(p,me.team,world.camera,rect,spec.hit_regions)):[],squad=room.roster.filter(p=>!p.bot&&p.slot!==room.slot&&s.players[p.slot]?.team===me.team);
  const key=JSON.stringify([available.map(p=>[p.slot,p.life]),squad.map(p=>[p.slot,p.name]),inbox.muted]);if(key===rosterKey)return;rosterKey=key;
  const focusedMute=document.activeElement?.dataset?.commsMute,old=target.value;target.replaceChildren(new Option('Location only',''),...available.map(p=>new Option('Last seen: '+(room.roster[p.slot]?.name||'Opponent'),String(p.slot))));if([...target.options].some(o=>o.value===old))target.value=old;
  mutes.replaceChildren(...squad.map(p=>{const label=document.createElement('label'),input=document.createElement('input');input.type='checkbox';input.dataset.commsMute=String(p.slot);input.checked=inbox.muted.includes(p.slot);input.onchange=()=>onSend({type:'comms_mute',slot:p.slot,muted:input.checked});label.append(input,document.createTextNode('Mute '+p.name));return label;}));if(focusedMute)mutes.querySelector('[data-comms-mute="'+focusedMute+'"]')?.focus();
 }
 function accept(room,now=performance.now()){
  if(room?.id!==lastRoom){lastRoom=room?.id;close(false);contextKey='';feedKey='';rosterKey='';}
  inbox.accept(room,now);if(!room?.state||room.status!=='running'){close(false);return;}const me=room.state.players[room.slot],key=room.id+':'+me.life;
  if(contextKey&&contextKey!==key)close(false);contextKey=key;if(!wheel.hidden)updateChoices();
 }
 function disconnect(){close(false);inbox.reset();noticeUntil=0;noticeText='';feedKey='';feed.textContent='';for(const n of markerNodes)n.hidden=true;}
 function render(now){
  const {room,s,me,viewer,map}=current(),world=getWorld();if(!room||!s||!me||!world)return;
  openButton.disabled=!enabled();const r=radar.getBoundingClientRect(),safe=getComputedStyle(root),safeTop=parseFloat(safe.paddingTop)||0,safeLeft=parseFloat(safe.paddingLeft)||0;openButton.style.left=(r.width?r.right+8:Math.max(8,safeLeft+8))+'px';openButton.style.top=(r.width?r.top:Math.max(8,safeTop+8))+'px';location.hidden=!r.width;radarOverlay.hidden=!r.width;location.style.left=r.left+'px';location.style.top=Math.max(4,safeTop,r.top-22)+'px';
  if(viewer?.position){const label=calloutAt(map,s.config.map,viewer.position).name;if(label!==lastLocation){location.textContent=label;lastLocation=label;}}
  const viewport=canvas.getBoundingClientRect(),names=mapCallouts(map,s.config.map),rows=inbox.active(now),key=noticeUntil>now?'notice:'+noticeText:rows.slice(-4).map(e=>e.id).join('|');
  const description=e=>{const callout=names.find(c=>c.id===e.callout)?.name||'Map position';return glyphs[e.kind]+' '+(room.roster[e.sender]?.name||'Pilot')+' · '+(e.kind==='enemy'&&!e.target?'Enemy report':commsEnglish[e.kind])+' · '+callout+(e.target?' · LAST SEEN':'');};
  if(key!==feedKey){feedKey=key;feed.replaceChildren(...(noticeUntil>now?[{notice:noticeText}]:rows.slice(-4)).map(e=>{const line=document.createElement('div');line.textContent=e.notice||description(e);return line;}));}
  for(const [i,node]of markerNodes.entries()){const e=rows.slice(-6)[i],xy=e?projectPing(world.camera,viewport,[e.position[0],e.position[1]+12,e.position[2]]):null;node.hidden=!xy;if(xy){node.textContent=glyphs[e.kind]+' '+(names.find(c=>c.id===e.callout)?.name||'Ping');node.style.left=xy[0]+'px';node.style.top=xy[1]+'px';node.dataset.kind=e.kind;}}
  // The overlay is in the same 240-unit backing coordinate system as drawMap.
  const rr=radar.getBoundingClientRect(),style=getComputedStyle(radar),bl=parseFloat(style.borderLeftWidth)||0,br=parseFloat(style.borderRightWidth)||0,bt=parseFloat(style.borderTopWidth)||0,bb=parseFloat(style.borderBottomWidth)||0;Object.assign(radarOverlay.style,{left:(rr.left+bl)+'px',top:(rr.top+bt)+'px',width:(rr.width-bl-br)+'px',height:(rr.height-bt-bb)+'px'});const ctx=radarOverlay.getContext('2d');ctx.clearRect(0,0,240,240);for(const e of rows){const [x,y]=radarProject(map,240,e.position);ctx.fillStyle='#0a1924';ctx.strokeStyle='#fff0ab';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,7,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle='#fff';ctx.font='bold 11px monospace';ctx.textAlign='center';ctx.fillText(glyphs[e.kind],x,y+4);}
 }
 function radarRect(){const r=radar.getBoundingClientRect(),s=getComputedStyle(radar),l=parseFloat(s.borderLeftWidth)||0,t=parseFloat(s.borderTopWidth)||0;return {left:r.left+l,top:r.top+t,width:r.width-l-(parseFloat(s.borderRightWidth)||0),height:r.height-t-(parseFloat(s.borderBottomWidth)||0)};}
 function pickRadar(e){if(wheel.hidden)return;e.preventDefault();e.stopPropagation();const {map}=current();updatePoint(pointerRadar(map,240,radarRect(),e.clientX,e.clientY));area.value='';}
 function pickWorld(e){if(wheel.hidden||e.button!==0)return;e.preventDefault();e.stopImmediatePropagation();updatePoint(pointAt(e.clientX,e.clientY));area.value='';}
 function keydown(e){if(wheel.hidden||e.ctrlKey||e.metaKey||e.altKey||e.repeat)return;if(e.code==='Escape'||e.code===getKey()){e.preventDefault();e.stopImmediatePropagation();close();return;}if(e.target===area||e.target===target)return;
  if(/^Digit[1-6]$/.test(e.code)){e.preventDefault();e.stopImmediatePropagation();buttons[Number(e.code.slice(-1))-1].click();}
  else if(e.key==='Tab'){const nodes=[...wheel.querySelectorAll('button:not(:disabled),select,input,summary')].filter(n=>n.getClientRects().length),i=nodes.indexOf(document.activeElement);e.preventDefault();nodes[(i+(e.shiftKey?-1:1)+nodes.length)%nodes.length]?.focus();}
 }
 function gamepad(state){if(wheel.hidden)return false;if(state.pressed.includes(1)){close();return true;}const nodes=[...wheel.querySelectorAll('button:not(:disabled),select,summary,input')].filter(n=>n.getClientRects().length),focused=document.activeElement;
  if(state.navigation){if(focused?.tagName==='SELECT'&&['left','right'].includes(state.navigation)){focused.selectedIndex=Math.max(0,Math.min(focused.options.length-1,focused.selectedIndex+(state.navigation==='right'?1:-1)));focused.dispatchEvent(new Event('change',{bubbles:true}));}else{const i=nodes.indexOf(focused),delta=['up','left'].includes(state.navigation)?-1:1;nodes[(i+delta+nodes.length)%nodes.length]?.focus();}}
  if(state.pressed.includes(0))document.activeElement?.click();return true;
 }
 area.onchange=()=>{const {s,map}=current(),c=mapCallouts(map,s.config.map).find(c=>c.id===area.value);if(c)updatePoint(terrainPoint(map,c.position[0],c.position[2]));};
 openButton.onclick=open;$('comms-close').onclick=()=>close();radar.addEventListener('pointerdown',pickRadar);canvas.addEventListener('pointerdown',pickWorld,true);document.addEventListener('keydown',keydown,true);const resized=()=>close(false);addEventListener('resize',resized);
 return {open,close,accept,disconnect,render,gamepad,notice(text){noticeText=String(text).slice(0,180);noticeUntil=performance.now()+3000;feedKey='';},quickPing(){
  if(!enabled())return;if(!wheel.hidden){send('mark');return;}
  // A one-click mark must not briefly open a menu, release mouse capture or
  // clear movement/fire. Pointer-lock changes are asynchronous browser events.
  const {s,me,viewer,map}=current();if(!viewer)return;const r=canvas.getBoundingClientRect(),position=pointAt(r.left+r.width/2,r.top+r.height/2)||terrainPoint(map,viewer.position[0],viewer.position[2]);
  if(position)onSend({type:'comms',kind:'mark',map:s.config.map,life:me.life,position});
 },get isOpen(){return !wheel.hidden;},dispose(){disconnect();radar.removeEventListener('pointerdown',pickRadar);canvas.removeEventListener('pointerdown',pickWorld,true);document.removeEventListener('keydown',keydown,true);removeEventListener('resize',resized);root.remove();}};
}
