// Render-only signals. Never write to player state or use these values as input.
import {calculateRunAmount} from './locomotion-gait.mjs';
const clamp=(value,low,high)=>Math.max(low,Math.min(high,value));
export const wrapAngle=angle=>Math.atan2(Math.sin(angle),Math.cos(angle));
export const isGrounded=player=>player.position[1]<=.001&&player.velocity[1]<=0;

export class AnimationMotion{
 constructor(){this.clear();}
 clear(reason='initial'){
  this.ready=false;this.resetReason=reason;this.map=null;this.life=null;this.alive=true;
  this.x=this.y=this.z=this.yaw=this.pitch=0;this.vx=this.vy=this.vz=0;this.speed=0;this.grounded=true;this.moving=false;this.launchSpeed=0;
  this.output??={};Object.assign(this.output,{forward:0,side:0,speed:0,runSpeed:250,speedFraction:0,runAmount:0,acceleration:0,accelerationForward:0,accelerationSide:0,turnRate:0,pitchRate:0,yawDelta:0,grounded:true,rising:false,riseProgress:0,takeoff:false,crouch:false,crouchAmount:0,scoped:false,starting:false,stopping:false,reversing:false,landed:false,landingSpeed:0,reset:reason});
 }
 update(player,dt,map=0,runSpeed=250){
  const seconds=Number.isFinite(dt)?clamp(dt,0,.1):0;
  const [x,y,z]=player.position,[vx,vy,vz]=player.velocity;
  const speed=Math.hypot(vx,vz),distance=Math.hypot(x-this.x,y-this.y,z-this.z),alive=player.alive!==false;
  const reason=!this.ready?this.resetReason:this.life!==player.life?'life':this.map!==map?'map':this.alive!==alive?(alive?'respawn':'death'):dt>.25?'gap':distance>120+speed*seconds?'correction':null;
  const out=this.output;
  out.forward=-vx*Math.sin(player.yaw)-vz*Math.cos(player.yaw);
  out.side=vx*Math.cos(player.yaw)-vz*Math.sin(player.yaw);
  out.speed=speed;out.grounded=isGrounded(player);out.rising=vy>0;out.crouch=!!player.crouch;out.scoped=!!player.scoped;out.reset=reason;
  out.crouchAmount=reason?Number(out.crouch):out.crouchAmount+(Number(out.crouch)-out.crouchAmount)*-Math.expm1(-seconds/.07);
  out.takeoff=!reason&&this.grounded&&!out.grounded&&out.rising;
  if(reason||out.takeoff)this.launchSpeed=Math.max(1,vy);
  out.riseProgress=clamp(1-Math.max(0,vy)/this.launchSpeed,0,1);
  out.runSpeed=Number.isFinite(runSpeed)&&runSpeed>0?runSpeed:250;out.speedFraction=speed/out.runSpeed;
  out.runAmount=calculateRunAmount(speed,out.runSpeed,out.crouch,out.scoped);
  const ax=!reason&&seconds>0?clamp((vx-this.vx)/seconds,-3000,3000):0,az=!reason&&seconds>0?clamp((vz-this.vz)/seconds,-3000,3000):0;
  out.acceleration=!reason&&seconds>0?Math.min(3000,Math.hypot(vx-this.vx,vz-this.vz)/seconds):0;
  out.accelerationForward=-ax*Math.sin(player.yaw)-az*Math.cos(player.yaw);out.accelerationSide=ax*Math.cos(player.yaw)-az*Math.sin(player.yaw);
  out.yawDelta=!reason?wrapAngle(player.yaw-this.yaw):0;
  out.turnRate=!reason&&seconds>0?clamp(wrapAngle(player.yaw-this.yaw)/seconds,-12,12):0;
  out.pitchRate=!reason&&seconds>0?clamp(((player.pitch||0)-this.pitch)/seconds,-8,8):0;
  out.starting=!reason&&!this.moving&&speed>12;out.stopping=!reason&&this.moving&&speed<5;
  out.reversing=!reason&&this.speed>30&&speed>30&&(vx*this.vx+vz*this.vz)<-.25*speed*this.speed;
  out.landed=!reason&&!this.grounded&&out.grounded;out.landingSpeed=out.landed?Math.max(0,-this.vy):0;
  this.moving=reason?speed>12:this.moving?speed>=5:speed>12;
  this.ready=true;this.map=map;this.life=player.life;this.alive=alive;this.x=x;this.y=y;this.z=z;this.yaw=player.yaw;this.pitch=player.pitch||0;this.vx=vx;this.vy=vy;this.vz=vz;this.speed=speed;this.grounded=out.grounded;
  return out;
 }
}
