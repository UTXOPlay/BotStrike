import {intersectsBox} from './visibility.mjs';
const globalKinds=new Set(['round','planted','defused','detonation','elimination','time','match_end','kill']);
const personalKinds=new Set(['hit','headshot','buy','respawn','pickup']);
const audibleKinds=new Set(['shot','step','land','reload','skill','item','utility','plasma']);
export function spatialCue(listener,source,map,range=1300){
 const dx=source.position[0]-listener.position[0],dz=source.position[2]-listener.position[2],distance=Math.hypot(dx,dz);
 if(distance>range)return null;
 const eye=p=>[p.position[0],p.position[1]+45,p.position[2]];
 const occluded=map.obstacles.some(box=>intersectsBox(eye(listener),eye(source),box));
 // Direction and loudness are deliberately coarse. Never send hidden positions.
 return {bearing:Math.round(Math.atan2(dx,-dz)/(Math.PI/4))*Math.PI/4,level:(distance<range/3?1:distance<range*2/3?.6:.3)*(occluded?.35:1),muffled:occluded};
}
export function frameEvents(state,previous,spec){
 const events=state.events.map(e=>({...e}));
 for(const p of state.players){const old=previous?.players[p.slot];if(!old||!p.alive)continue;
  if(p.reload>0&&!old.reload)events.push({kind:'reload',actor:p.slot,value:p.weapon});
  if(old.position[1]>1&&p.position[1]<=.01)events.push({kind:'land',actor:p.slot});
  const threshold=spec.heroes[p.hero].speed*(spec.weapons[p.weapon].mobility||1)*.7;
  if(state.phase==='live'&&!p.crouch&&p.position[1]<=.01&&Math.hypot(p.velocity[0],p.velocity[2])>threshold&&(state.tick+p.slot*3)%22===0)events.push({kind:'step',actor:p.slot});
 }
 return events.map((e,i)=>({...e,id:state.tick+':'+i,tick:state.tick}));
}
export function feedbackFor(events,state,slot,spec,spectate=null){
 const self=state.players[slot];if(!self)return [];
 // Dead pilots only hear their squad's chosen first-person surroundings.
 const chosen=state.players[spectate];
 const listener=self.alive?self:chosen?.alive&&chosen.team===self.team?chosen:state.players.find(p=>p.team===self.team&&p.alive)||self;
 const map=spec.maps[state.config.map],out=[];
 for(const e of events){
  if(globalKinds.has(e.kind)){out.push(e);continue;}
  if(personalKinds.has(e.kind)){
   if(e.actor!==slot&&e.target!==slot)continue;
   const source=state.players[e.actor];
   out.push({...e,...(e.target===slot&&source?{bearing:spatialCue(self,source,{obstacles:[]},Infinity).bearing}:{} )});continue;
  }
  if(!audibleKinds.has(e.kind))continue;
  const source=state.players[e.actor];if(!source)continue;
  const sound=spatialCue(listener,source,map,['step','land'].includes(e.kind)?600:1300);if(!sound)continue;
  out.push({id:e.id,tick:e.tick,kind:e.kind,value:e.value,self:e.actor===slot,...sound});
 }
 return out;
}
// A short rolling window survives skipped snapshots and reconnects. The client
// deduplicates IDs and suppresses old sounds; this never changes the signed tape.
export function collectFeedback(room,previous,spec){
 const state=room.state,events=frameEvents(state,previous,spec);room.feedback??=new Map();
 for(const [slot,id]of room.members.entries())if(!id.startsWith('bot-')){
  const ring=room.feedback.get(id)||[];ring.push(...feedbackFor(events,state,slot,spec,room.spectating?.[id]));
  room.feedback.set(id,ring.filter(e=>e.tick>=state.tick-128).slice(-192));
 }
 for(const id of room.feedback.keys())if(!room.members.includes(id))room.feedback.delete(id);
}
