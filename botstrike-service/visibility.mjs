// Presentation disclosure only. Authoritative simulation and signed tape stay complete.
function intersectsBox(a,b,box){
 let lo=0,hi=1;
 for(let i=0;i<3;i++){
  const d=b[i]-a[i];
  if(Math.abs(d)<1e-8){if(a[i]<box.min[i]||a[i]>box.max[i])return false;continue;}
  const x=(box.min[i]-a[i])/d,y=(box.max[i]-a[i])/d;
  lo=Math.max(lo,Math.min(x,y));hi=Math.min(hi,Math.max(x,y));if(lo>hi)return false;
 }
 return hi>.001&&lo<.999;
}
function crossesSmoke(a,b,u){
 const d=b.map((v,i)=>v-a[i]),n=d.reduce((sum,v)=>sum+v*v,0);
 const t=Math.max(0,Math.min(1,d.reduce((sum,v,i)=>sum+(u.position[i]-a[i])*v,0)/Math.max(1,n)));
 return d.reduce((sum,v,i)=>sum+(a[i]+t*v-u.position[i])**2,0)<175**2;
}
export function canSee(state,viewer,target,map){
 if(viewer.slot===target.slot||viewer.team===target.team||target.revealed>0)return true;
 if(!target.alive||viewer.flash>0)return false;
 const eye=[viewer.position[0],viewer.position[1]+(viewer.crouch?37:56),viewer.position[2]];
 const height=target.crouch?47:70;
 return [[0,height-6,0],[0,height*.5,0],[-18,height*.5,0],[18,height*.5,0],[0,height*.5,18],[0,height*.5,-18]].some(offset=>{
  const point=target.position.map((v,i)=>v+offset[i]);
  return !map.obstacles.some(box=>intersectsBox(eye,point,box))&&!state.utilities.some(u=>u.kind===2&&u.fuse===0&&crossesSmoke(eye,point,u));
 });
}
export function publicState(state,slot,spec){
 if(!state)return null;
 const self=state.players[slot];
 if(!self)return null;
 const viewer=self.alive?self:state.players.find(p=>p.team===self.team&&p.alive)||self;
 const result={...state,config:{map:state.config.map,mode:state.config.mode}};
 delete result.random;
 result.players=state.players.map(p=>{
  if(p.slot===slot){const own={...p};for(const key of ['ai_path','ai_goal','ai_target','ai_since','attackers','skill_held','jump_held','item_held'])delete own[key];return own;}
  const visible=canSee(state,viewer,p,spec.maps[state.config.map]);
  const out={};
  for(const key of ['slot','team','hero','alive','kills','deaths','assists','damage','life'])out[key]=p[key];
  out.hidden=!visible;
  if(visible)for(const key of ['position','velocity','yaw','pitch','crouch','scoped','weapon','health','armor','revealed'])out[key]=p[key];
  else {out.position=null;out.velocity=[0,0,0];out.yaw=out.pitch=0;out.weapon=0;out.crouch=out.scoped=false;}
  return out;
 });
 if(state.objective?.carrier!=null&&result.players.find(p=>p.slot===state.objective.carrier)?.hidden)result.objective={...state.objective,hidden:true,position:null};
 return result;
}
