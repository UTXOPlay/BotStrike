import {advanceStridePlan} from '../shared/gait-plan.mjs';
import {gaitGeometry} from '../shared/gait-geometry.mjs';
import {groundSurfaceAt} from '../shared/ground-surfaces.mjs';
export const gaitSeed=(slot,life)=>((slot*.38196601125+life*.1414213562)%1+1)%1;
// Service-owned presentation clock. It reads trusted 64 Hz native frames and
// asset dimensions, never client poses, controls or wall time. No replay writes.
export class MovementAudioClock{
 constructor(){this.entries=new Map();this.tick=null;this.map=null;}
 advance(state,previous,spec){
  if(this.tick===state.tick&&this.map===state.config.map)return [];
  if(this.map!==state.config.map||this.tick!==null&&state.tick!==this.tick+1)this.entries.clear();
  this.tick=state.tick;this.map=state.config.map;const events=[];
  for(const p of state.players){
   const old=previous?.players[p.slot];let entry=this.entries.get(p.slot);
   const reset=!entry||entry.life!==p.life||entry.hero!==p.hero;
   if(reset){entry={...gaitGeometry[p.hero],life:p.life,hero:p.hero,phase:gaitSeed(p.slot,p.life||0),cycleDuration:.7};this.entries.set(p.slot,entry);}
   const speed=Math.hypot(p.velocity[0],p.velocity[2]),runSpeed=spec.heroes[p.hero].speed*(spec.weapons[p.weapon].mobility||1),grounded=p.position[1]<=.001&&p.velocity[1]<=0;
   const motion={speed,runSpeed,side:p.velocity[0]*Math.cos(p.yaw)-p.velocity[2]*Math.sin(p.yaw),crouch:p.crouch,crouchAmount:p.stance,scoped:p.scoped,reset};
   advanceStridePlan(entry,motion,1/64);
   const before=entry.phase;
   if(state.phase==='live'&&p.alive&&grounded&&speed>1)entry.phase+=1/(64*entry.cycleDuration);
   entry.tick=state.tick;
   if(!old||!old.alive||!p.alive||p.life!==old.life||state.phase!=='live')continue;
   const value=groundSurfaceAt(spec.maps[state.config.map],state.config.map,p.position);
   const landed=old.position[1]>.001&&grounded;
   if(landed)events.push({kind:'land',actor:p.slot,value});
   // Each half cycle enters one sole's support interval. Walking, crouching,
   // airborne movement and stopped actors remain quiet under the existing rule.
   if(!landed&&!p.crouch&&grounded&&speed>runSpeed*.7&&Math.floor(entry.phase*2)>Math.floor(before*2))events.push({kind:'step',actor:p.slot,value});
  }
  return events;
 }
 view(){return Object.fromEntries([...this.entries].map(([slot,e])=>[slot,{phase:e.phase,cycleDuration:e.cycleDuration,duty:e.duty,life:e.life,tick:e.tick}]));}
}
