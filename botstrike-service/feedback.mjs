import {weaponAudioEvents} from '../shared/weapon-audio-events.mjs';
import {MovementAudioClock} from './movement-audio.mjs';
import {intersectsBox,canSeeOptically} from './visibility.mjs';
import {eyeHeight} from '../shared/sight-geometry.mjs';
const globalKinds=new Set(['round','planted','defused','detonation','elimination','time','match_end','kill']);
const personalKinds=new Set(['hit','headshot','buy','respawn','pickup','gun_pickup','gun_drop','ammo_pickup']);
const audibleKinds=new Set(['shot','step','land','reload','reload_feed','reload_close','equip','skill','item','utility','plasma']);
export function spatialCue(listener,source,map,range=1300){
 const eye=p=>p.world?p.position:[p.position[0],p.position[1]+eyeHeight(p),p.position[2]];
 const a=eye(listener),b=eye(source),dx=b[0]-a[0],dz=b[2]-a[2],distance=Math.hypot(dx,b[1]-a[1],dz);
 if(distance>range)return null;
 const occluded=map.obstacles.some(box=>intersectsBox(a,b,box));
 // Direction and loudness are deliberately coarse. Never send hidden positions.
 return {bearing:Math.round(Math.atan2(dx,-dz)/(Math.PI/4))*Math.PI/4,level:(distance<range/3?1:distance<range*2/3?.6:.3)*(occluded?.35:1),muffled:occluded};
}
export function frameEvents(state,previous,spec,movement=new MovementAudioClock()){
 const pending=weaponAudioEvents(state,previous,spec),events=[];
 for(const e of state.events){
  // A held shot may spend the replenished round in the completion tick. Keep
  // the mechanism close before that actor's first shot, without reordering the
  // native events or scheduling a completion after an interrupted reload.
  if(e.kind==='shot'){const i=pending.findIndex(a=>a.kind==='reload_close'&&a.actor===e.actor&&a.value===e.value);if(i>=0)events.push(...pending.splice(i,1));}
  events.push({...e});
 }
 events.push(...pending,...movement.advance(state,previous,spec));
 return events.map((e,i)=>({...e,id:state.tick+':'+i,tick:state.tick}));
}
export function feedbackFor(events,state,slot,spec,spectate=null){
 const self=state.players[slot];if(!self)return [];
 // Dead pilots only hear their squad's chosen first-person surroundings.
 const chosen=state.players[spectate];
 const listener=self.alive?self:chosen?.alive&&chosen.team===self.team?chosen:state.players.find(p=>p.team===self.team&&p.alive)||self;
 const map=spec.maps[state.config.map],out=[];
 for(const e of events){
  // Motion is disclosed only for a visible subject at event time. Audible
  // cues for hidden opponents still have no actor or precise coordinates.
  const action=e.kind==='item'&&e.value>=6?'use_item':({shot:'fire',reload:'reload',skill:'skill',item:'utility',hit:'hit',headshot:'hit',land:'land'})[e.kind];
  const subject=state.players[['hit','headshot'].includes(e.kind)?e.target:e.actor];
  if(action&&subject&&(listener.team===subject.team||canSeeOptically(state,listener,subject,map,spec.hit_regions)))out.push({id:e.id+':motion',tick:e.tick,kind:'motion',action,actor:subject.slot,life:subject.life,value:e.value});
  const {origin,...withoutOrigin}=e;
  if(globalKinds.has(e.kind)){const {damage,...publicEvent}=withoutOrigin;if(['planted','defused'].includes(e.kind)&&subject&&subject.team!==listener.team&&!canSeeOptically(state,listener,subject,map,spec.hit_regions))delete publicEvent.actor;out.push(e.actor===slot||e.target===slot?withoutOrigin:publicEvent);continue;}
  if(personalKinds.has(e.kind)){
   if(e.actor!==slot&&e.target!==slot)continue;
   const source=origin?{position:origin,world:true}:state.players[e.actor];
   out.push({...withoutOrigin,...(e.target===slot&&source?{bearing:spatialCue(self,source,{obstacles:[]},Infinity).bearing}:{} )});continue;
  }
  if(!audibleKinds.has(e.kind)||listener.alive===false)continue;
  const source=origin?{position:origin,world:true}:state.players[e.actor];if(!source)continue;
  const sound=spatialCue(listener,source,map,['step','land'].includes(e.kind)?600:1300);if(!sound)continue;
  out.push({id:e.id,tick:e.tick,kind:e.kind,value:e.value,self:e.actor===slot&&!origin,...sound});
 }
 return out;
}
// A short rolling window survives skipped snapshots and reconnects. The client
// deduplicates IDs and suppresses old sounds; this never changes the signed tape.
export function collectFeedback(room,previous,spec){
 const state=room.state;room.movementAudio??=new MovementAudioClock();const events=frameEvents(state,previous,spec,room.movementAudio);room.audioGait=room.movementAudio.view();room.feedback??=new Map();
 for(const [slot,id]of room.members.entries())if(!id.startsWith('bot-')){
  const ring=room.feedback.get(id)||[];ring.push(...feedbackFor(events,state,slot,spec,room.spectating?.[id]));
  room.feedback.set(id,ring.filter(e=>e.tick>=state.tick-128).slice(-192));
 }
 for(const id of room.feedback.keys())if(!room.members.includes(id))room.feedback.delete(id);
}
