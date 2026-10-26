import {FeedbackCursor,spreadDegrees} from './preferences.mjs';
export function createFeedback({audio,getPrefs,getRoom,getYaw,spec}){
 const $=id=>document.getElementById(id);let cursor=new FeedbackCursor(),roomId=null,hitUntil=0,hitHead=false,hurtUntil=0,hurtLevel=0,bearing=null,bannerUntil=0,lastProgress=0,lastPlanted=false,lastBeep=-1,lastLife=null,lastVibration=0;
 const text=(id,v)=>{if($(id).textContent!==v)$(id).textContent=v;};
 function banner(message,ms=2600){text('combat-banner',message);bannerUntil=performance.now()+ms;}
 function vibrate(ms){const prefs=getPrefs(),now=performance.now();if(prefs.haptics&&prefs.motion&&navigator.vibrate&&now-lastVibration>100){lastVibration=now;navigator.vibrate(ms);}}
 function accept(room){
  if(!room?.state)return;
  if(room.id!==roomId){roomId=room.id;cursor=new FeedbackCursor();lastLife=null;lastProgress=0;lastPlanted=false;lastBeep=-1;hitUntil=hurtUntil=bannerUntil=0;}
  const s=room.state,me=s.players[room.slot],now=performance.now();
  if(me.life!==lastLife){lastLife=me.life;text('killer','Your squad is still in the fight.');bearing=null;}
  const name=slot=>slot===room.slot?'YOU':room.roster[slot]?.name||'Opponent';
  for(const e of cursor.consume(room.feedback,s.tick)){
   const fresh=s.tick-e.tick<=32;
   if(e.kind==='shot'){if(fresh&&!e.self)audio.shot(e.value,{pan:Math.sin(e.bearing+getYaw()),level:e.level,muffled:e.muffled});}
   else if(['step','land','reload','skill','item','utility','plasma'].includes(e.kind)){if(fresh)audio.cue(e.kind,{pan:e.self?0:Math.sin(e.bearing+getYaw()),level:e.level,muffled:e.muffled});}
   else if(e.kind==='hit'||e.kind==='headshot'){
    if(e.actor===room.slot){hitUntil=now+170;hitHead=e.kind==='headshot';if(fresh)audio.hit(hitHead);}
    if(e.target===room.slot){hurtUntil=now+550;hurtLevel=Math.min(.8,.2+e.value/100);bearing=e.bearing;if(fresh){audio.damage(e.value);vibrate(15);}}
   }else if(e.kind==='kill'){
    if(e.actor===room.slot){if(fresh){audio.kill();vibrate(12);}banner('ELIMINATED · '+name(e.target),1400);}
    if(e.target===room.slot)text('killer','Eliminated by '+name(e.actor));
    const feed=document.createElement('div');feed.textContent=name(e.actor)+' ▸ '+name(e.target);feed.dataset.until=String(now+4500);$('kill-feed').append(feed);while($('kill-feed').children.length>3)$('kill-feed').firstChild.remove();
   }else if(e.kind==='planted'){banner('RELAY PLANTED · SITE '+(e.value===0?'A':'B'));if(fresh)audio.cue('planted');}
   else if(['defused','detonation','elimination','time'].includes(e.kind)){const won=e.value===me.team;banner((won?'ROUND WON · ':'ROUND LOST · ')+({defused:'RELAY DEFUSED',detonation:'RELAY DETONATED',elimination:'SQUAD ELIMINATED',time:'TIME EXPIRED'}[e.kind]),4500);if(fresh)audio.cue(won?'win':'loss');}
   else if(e.kind==='round')banner('ROUND '+e.value+' · PREPARE YOUR LOADOUT');
   else if(e.kind==='match_end'){banner(s.winner===me.team?'MATCH WON':s.winner==null?'MATCH DRAW':'MATCH LOST',4500);if(fresh)audio.cue(s.winner===me.team?'win':'loss');}
   else if(e.kind==='respawn'&&fresh)audio.cue('respawn');
   else if(e.kind==='pickup')banner('RELAY ACQUIRED · HOLD USE AT A OR B');
   else if(e.kind==='buy')banner('LOADOUT UPDATED',1000);
  }
  const objective=s.objective,progress=objective.actor===room.slot?objective.progress:0,required=objective.planted?7:3;
  $('objective-progress').hidden=!progress;$('objective-progress').max=required*64;$('objective-progress').value=progress;
  if(lastProgress>0&&!progress&&objective.planted===lastPlanted&&s.phase==='live'&&me.alive)banner('INTERRUPTED · STAND STILL; DO NOT FIRE OR JUMP',2000);
  lastProgress=progress;lastPlanted=objective.planted;
  if(objective.planted&&s.phase==='live'){const second=Math.ceil(objective.fuse/64);if(second!==lastBeep&&second<=10)audio.cue('beep');lastBeep=second;}else lastBeep=-1;
  const effects=[];if(me.disabled)effects.push('EMP '+Math.ceil(me.disabled/64)+'s');if(me.protection)effects.push('SPAWN SHIELD '+Math.ceil(me.protection/64)+'s');if(me.effect)effects.push((me.hero===2?'SHIELD':me.hero===5?'OVERDRIVE':'SKILL')+' '+Math.ceil(me.effect/64)+'s');if(me.overclock)effects.push('REDLINE '+Math.ceil(me.overclock/64)+'s');if(me.revealed)effects.push('REVEALED '+Math.ceil(me.revealed/64)+'s');text('buffs',effects.slice(0,2).join(' · '));
  $('vitals-state').classList.toggle('low-health',me.alive&&me.health/spec.heroes[me.hero].health<.3);
 }
 function render(now){const room=getRoom(),me=room?.state?.players[room.slot],p=getPrefs();
  $('hit-marker').style.opacity=now<hitUntil?'1':'0';$('hit-marker').classList.toggle('headshot',hitHead);
  $('damage').style.opacity=String(Math.max(0,(hurtUntil-now)/550)*hurtLevel);
  $('damage-bearing').style.opacity=now<hurtUntil&&bearing!=null?'1':'0';if(bearing!=null)$('damage-bearing').style.transform=`translate(-50%,-50%) rotate(${bearing+getYaw()}rad)`;
  $('combat-banner').hidden=now>=bannerUntil;
  for(const feed of [...$('kill-feed').children])if(Number(feed.dataset.until)<now)feed.remove();
  if(me){const fov=me.scoped?38:p.fov,gap=Math.min(48,Math.max(3,Math.tan(spreadDegrees(me,spec.weapons[me.weapon])*Math.PI/360)*innerHeight/(2*Math.tan(fov*Math.PI/360))));$('crosshair').style.setProperty('--gap',gap+'px');$('crosshair').style.opacity=me.scoped||!me.alive?'0':'1';}
 }
 return {accept,render,banner};
}
