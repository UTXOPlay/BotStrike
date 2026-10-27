// Client input assistance only. Native simulation still owns every shot and hit.
const angle=v=>Math.atan2(Math.sin(v),Math.cos(v));
export function blocked(a,b,box){let lo=0,hi=1;for(let axis=0;axis<3;axis++){const d=b[axis]-a[axis];if(Math.abs(d)<1e-8){if(a[axis]<box.min[axis]||a[axis]>box.max[axis])return false;}else{const x=(box.min[axis]-a[axis])/d,y=(box.max[axis]-a[axis])/d;lo=Math.max(lo,Math.min(x,y));hi=Math.min(hi,Math.max(x,y));if(lo>hi)return false;}}return hi>=0&&lo<=1;}
export function smoke(a,b,u){if(u.kind!==2||u.fuse!==0)return false;const dx=b[0]-a[0],dz=b[2]-a[2],t=Math.max(0,Math.min(1,((u.position[0]-a[0])*dx+(u.position[2]-a[2])*dz)/(dx*dx+dz*dz||1)));return Math.hypot(a[0]+dx*t-u.position[0],a[2]+dz*t-u.position[2])<175;}
export function assistTarget(state,slot,yaw,pitch,map,{strength=1,scoped=false,position=null}={}){
 const me=state?.players[slot];if(!strength||!me?.alive||me.flash>0||state.phase!=='live')return null;
 const p=position||me.position,eye=[p[0],p[1]+(me.crouch?37:56),p[2]],cone=(scoped?2.8:strength>1?8:5)*Math.PI/180;let best=null;
 for(const enemy of state.players){if(!enemy.alive||enemy.team===me.team||enemy.hidden||!enemy.position)continue;
  const target=[enemy.position[0],enemy.position[1]+(enemy.crouch?28:40),enemy.position[2]],dx=target[0]-eye[0],dy=target[1]-eye[1],dz=target[2]-eye[2],distance=Math.hypot(dx,dy,dz);if(distance<30||distance>(scoped?1800:1000))continue;
  const dyaw=angle(Math.atan2(-dx,-dz)-yaw),dpitch=Math.atan2(dy,Math.hypot(dx,dz))-pitch,error=Math.hypot(dyaw*Math.cos(pitch),dpitch);
  if(error>cone||map.obstacles.some(box=>blocked(eye,target,box))||state.utilities?.some(u=>smoke(eye,target,u)))continue;
  if(!best||error<best.error)best={slot:enemy.slot,dyaw,dpitch,error,cone};
 }return best;
}
export function assistStep(target,dt,strength=1){if(!target)return[0,0];const max=(strength>1?.42:.25)*(target.cone<.06?.5:1)*Math.min(Math.max(dt,0),.05),length=Math.hypot(target.dyaw,target.dpitch),amount=Math.min(max,length*.18);return length?[target.dyaw/length*amount,target.dpitch/length*amount]:[0,0];}
