import {hitVolumes} from './hit-volumes.mjs';
// Geometry only. Disclosure/reveal/team policy belongs to the room service.
export function stanceOf(player){return Number.isFinite(player.stance)?Math.max(0,Math.min(1,player.stance)):Number(!!player.crouch);}
export function eyeHeight(player){return 56-19*stanceOf(player);}
export function segmentSphere(a,b,center,radius){
 const d=b.map((v,i)=>v-a[i]),length=d.reduce((n,v)=>n+v*v,0);
 const t=length>0?Math.max(0,Math.min(1,d.reduce((n,v,i)=>n+(center[i]-a[i])*v,0)/length)):0;
 return d.reduce((n,v,i)=>n+(a[i]+t*v-center[i])**2,0)<radius*radius;
}
export function smokeBlocks(a,b,u){return u.kind===2&&u.fuse===0&&u.life!==0&&segmentSphere(a,b,u.position,175);}

export function visibilitySamples(player,profile){
 const stance=stanceOf(player);
 if(!profile){const height=70-23*stance;return [[0,height-6,0],[0,height*.5,0],[-18,height*.5,0],[18,height*.5,0],[0,height*.5,18],[0,height*.5,-18]].map(o=>player.position.map((v,i)=>v+o[i]));}
 const v=hitVolumes(player.position,stance,[player.yaw||0,player.pitch||0],profile),points=[];
 for(const sx of [-1,1])for(const sy of [-1,1])for(const sz of [-1,1]){
  const [x,y,z]=v.head_half_extents.map((h,i)=>h*[sx,sy,sz][i]),ry=Math.cos(v.head_pitch)*y-Math.sin(v.head_pitch)*z,rz=Math.sin(v.head_pitch)*y+Math.cos(v.head_pitch)*z;
  points.push([v.head[0]+Math.cos(v.head_yaw)*x+Math.sin(v.head_yaw)*rz,v.head[1]+ry,v.head[2]-Math.sin(v.head_yaw)*x+Math.cos(v.head_yaw)*rz]);
 }
 points.push(v.upper,v.lower);
 for(const axis of [0,2])for(const sign of [-1,1]){const p=[...v.upper];p[axis]+=sign*v.body_radius;points.push(p);}
 return points;
}
