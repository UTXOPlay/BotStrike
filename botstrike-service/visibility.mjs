import {eyeHeight,smokeBlocks,visibilitySamples} from '../shared/sight-geometry.mjs';
// Presentation disclosure only. Authoritative simulation and signed tape stay complete.
export function intersectsBox(a,b,box){
 let lo=0,hi=1;
 for(let i=0;i<3;i++){
  const d=b[i]-a[i];
  if(Math.abs(d)<1e-8){if(a[i]<box.min[i]||a[i]>box.max[i])return false;continue;}
  const x=(box.min[i]-a[i])/d,y=(box.max[i]-a[i])/d;
  lo=Math.max(lo,Math.min(x,y));hi=Math.min(hi,Math.max(x,y));if(lo>hi)return false;
 }
 return hi>.001&&lo<.999;
}
export function canSee(state,viewer,target,map,profile=null){
 if(viewer.slot===target.slot||viewer.team===target.team)return true;
 if(viewer.alive===false)return false;
 if(target.revealed>0)return true;
 return canSeeOptically(state,viewer,target,map,profile);
}
export function canSeeOptically(state,viewer,target,map,profile=null){
 if(viewer.alive===false)return false;
 if(viewer.flash>0)return false;
 const eye=[viewer.position[0],viewer.position[1]+eyeHeight(viewer),viewer.position[2]];
 return visibilitySamples(target,profile).some(point=>{
  return !map.obstacles.some(box=>intersectsBox(eye,point,box))&&!state.utilities.some(u=>smokeBlocks(eye,point,u));
 });
}
function clearPoint(state,viewer,point,map,ignore=null){
 if(viewer.alive===false||viewer.flash>0)return false;
 const eye=[viewer.position[0],viewer.position[1]+eyeHeight(viewer),viewer.position[2]];
 return !map.obstacles.some(box=>intersectsBox(eye,point,box))&&!state.utilities.some(u=>u!==ignore&&smokeBlocks(eye,point,u));
}
// Test the effect's volume, not only its center: a smoke edge can be visible
// while its center is behind cover. Work is bounded to 28 rays per object.
export function utilityVisible(state,viewer,u,map,effects={}){
 if(viewer.alive===false||viewer.flash>0)return false;
 const radius=u.fuse===0?({2:175,5:effects.scan_radius||450,10:effects.repair_radius||220}[u.kind]||8):8;
 const eye=[viewer.position[0],viewer.position[1]+eyeHeight(viewer),viewer.position[2]],delta=eye.map((v,i)=>v-u.position[i]),distance=Math.hypot(...delta);
 if(distance<radius)return true;
 const points=[u.position,delta.map((v,i)=>u.position[i]+v*radius/distance)];
 for(const x of [-1,0,1])for(const y of [-1,0,1])for(const z of [-1,0,1]){
  const length=Math.hypot(x,y,z);if(length)points.push([x,y,z].map((v,i)=>u.position[i]+v*radius/length));
 }
 return points.some(point=>clearPoint(state,viewer,point,map,u));
}
export function publicState(state,slot,spec,spectate=null,audioGait=null){
 if(!state)return null;
 const self=state.players[slot];
 if(!self)return null;
 const chosen=state.players[spectate];
 const viewer=self.alive?self:chosen?.alive&&chosen.team===self.team?chosen:state.players.find(p=>p.team===self.team&&p.alive)||self;
 const result={...state,config:{map:state.config.map,mode:state.config.mode,...(state.config.ruleset==='tactical'?{ruleset:'tactical'}:{})}};
 delete result.random;
 if(result.practice){result.practice={...result.practice};delete result.practice.seed;delete result.practice.last_command;}
 // Raw native events are private replay state. The service's feedback stream
 // separately authorizes global, personal, visible-motion and coarse audio cues.
 result.events=[];
 result.players=state.players.map(p=>{
  const gait=audioGait?.[p.slot];
  const authorizedGait=gait&&gait.life===p.life&&gait.tick===state.tick?{...gait}:null;
  if(p.slot===slot){const own={...p,unarmed:!p.owned?.[p.weapon],...(authorizedGait?{gait:authorizedGait}:{})};for(const key of Object.keys(own))if(key.startsWith('ai_')||['attackers','skill_held','jump_held','interact_held','drop_held','item_held'].includes(key))delete own[key];return own;}
  const eligible=state.practice?.active_slots?.[p.slot]!==false;
  const optical=eligible&&canSeeOptically(state,viewer,p,spec.maps[state.config.map],spec.hit_regions);
  const visible=eligible&&canSee(state,viewer,p,spec.maps[state.config.map],spec.hit_regions);
  const out={};
  for(const key of ['slot','team','hero','alive','kills','deaths','assists','damage','life'])out[key]=p[key];
  out.hidden=!visible;
  out.optical=optical;
  if(visible){
   const keys=p.team===self.team||optical?['position','velocity','yaw','pitch','crouch','scoped','weapon','health','armor','revealed','reload','effect','disabled','aim_punch','stance']:['position','revealed'];
   for(const key of keys)out[key]=p[key];
   if(p.team===self.team||optical)out.unarmed=!p.owned?.[p.weapon];
   if((p.team===self.team||optical)&&authorizedGait)out.gait=authorizedGait;
   if(p.team===self.team){out.flash=p.flash;if(state.config.ruleset==='tactical'){for(const key of ['credits','owned','items'])out[key]=p[key];}}
  }
  else {out.position=null;out.velocity=[0,0,0];out.yaw=out.pitch=0;out.weapon=0;out.crouch=out.scoped=false;}
  return out;
 });
 const map=spec.maps[state.config.map],eye=[viewer.position[0],viewer.position[1]+eyeHeight(viewer),viewer.position[2]];
 result.utilities=(state.utilities||[]).flatMap(u=>{
  const owner=state.players.find(p=>p.slot===u.owner);
  // Own/squad radio retains the precise release for practice and team play.
  if(owner?.team===self.team)return [{...u,position:[...u.position],velocity:[...u.velocity]}];
  if(!utilityVisible(state,viewer,u,map,spec.utility_effects))return [];
  // A visible object is not permission to identify its hidden thrower or
  // reconstruct the thrower's inherited velocity.
  return [{kind:u.kind,position:[...u.position],fuse:u.fuse,life:u.life}];
 });
 result.drops=(state.drops||[]).filter(drop=>{
  const point=[drop.position[0],drop.position[1]+16,drop.position[2]];
  return Math.hypot(point[0]-eye[0],point[2]-eye[2])<900
   &&!map.obstacles.some(box=>intersectsBox(eye,point,box))
   &&!state.utilities.some(u=>smokeBlocks(eye,point,u));
 });
 if(state.objective){
  const objective={...state.objective},hiddenActor=id=>id!=null&&!result.players.some(p=>p.slot===id&&(id===slot||p.team===self.team||p.optical===true));
  if(hiddenActor(objective.carrier)){objective.carrier=null;objective.hidden=true;objective.position=null;}
  if(hiddenActor(objective.actor)){objective.actor=null;objective.progress=0;}
  if(objective.carrier==null&&!objective.planted&&!objective.hidden&&objective.position&&!clearPoint(state,viewer,objective.position.map((v,i)=>v+(i===1?16:0)),map)){objective.hidden=true;objective.position=null;}
  result.objective=objective;
 }
 return result;
}
