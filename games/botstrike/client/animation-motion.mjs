// Render-only signals. Never write to player state or use these values as input.
const clamp=(value,low,high)=>Math.max(low,Math.min(high,value));
export const wrapAngle=angle=>Math.atan2(Math.sin(angle),Math.cos(angle));

export class AnimationMotion{
 constructor(){this.clear();}
 clear(){this.ready=false;this.map=null;this.life=null;this.x=this.z=this.yaw=0;this.vx=this.vz=0;this.output??={};Object.assign(this.output,{forward:0,side:0,speed:0,acceleration:0,turnRate:0,grounded:true,rising:false,crouch:false,reset:'initial'});}
 update(player,dt,map=0){
  const seconds=Number.isFinite(dt)?clamp(dt,0,.1):0;
  const [x,y,z]=player.position,[vx,vy,vz]=player.velocity;
  const speed=Math.hypot(vx,vz),distance=Math.hypot(x-this.x,z-this.z);
  const reason=!this.ready?'initial':this.life!==player.life?'life':this.map!==map?'map':dt>.25?'gap':distance>120+speed*seconds?'correction':null;
  const out=this.output;
  out.forward=-vx*Math.sin(player.yaw)-vz*Math.cos(player.yaw);
  out.side=vx*Math.cos(player.yaw)-vz*Math.sin(player.yaw);
  out.speed=speed;out.grounded=y<=1;out.rising=vy>0;out.crouch=!!player.crouch;out.reset=reason;
  out.acceleration=!reason&&seconds>0?Math.min(3000,Math.hypot(vx-this.vx,vz-this.vz)/seconds):0;
  out.turnRate=!reason&&seconds>0?clamp(wrapAngle(player.yaw-this.yaw)/seconds,-12,12):0;
  this.ready=true;this.map=map;this.life=player.life;this.x=x;this.z=z;this.yaw=player.yaw;this.vx=vx;this.vz=vz;
  return out;
 }
}
