import {Vector3,Quaternion} from 'three';
const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
const smooth=t=>t*t*(3-2*t);

export function deathClipName(slot=0,life=0,crouched=false){
 const variant=((slot+(life||0))%3+3)%3;
 return ['death_back','death_left','death_right'][variant]+(crouched?'_crouch':'');
}

// Cosmetic corpse motion only. Native dead players keep their recorded pose
// origin; this layer never writes to a player, collision body, camera or replay.
export class DeathPresentation{
 constructor(bones){this.bones=[...new Set(Object.values(bones))];this.positions=this.bones.map(()=>new Vector3());this.rotations=this.bones.map(()=>new Quaternion());this.reset();}
 reset(){this.active=false;this.started=0;this.height=0;this.vertical=0;this.yaw=0;this.fromPose=false;this.settled=false;this.clip=null;this.life=this.map=null;}
 begin(player,now,{fromPose=false,yaw=player.yaw,vertical=0,settled=false,clip=null,map=0}={}){
  this.active=true;this.started=now;this.height=Math.max(0,player.position[1]);this.vertical=this.height>0?clamp(vertical,-300,220):0;this.yaw=yaw;this.fromPose=fromPose;this.settled=settled;this.clip=clip;this.life=player.life;this.map=map;
  if(fromPose)for(let i=0;i<this.bones.length;i++){this.positions[i].copy(this.bones[i].position);this.rotations[i].copy(this.bones[i].quaternion);}
 }
 apply(now,model,rig,{reduced=false,originY=this.height}={}){
  if(!this.active)return;
  const seconds=Math.max(0,(now-this.started)/1000),weight=this.fromPose?1-smooth(clamp(seconds/.18,0,1)):0;
  if(weight>0)for(let i=0;i<this.bones.length;i++){this.bones[i].position.lerp(this.positions[i],weight);this.bones[i].quaternion.slerp(this.rotations[i],weight).normalize();}
  // Keep inherited vertical motion, then settle onto the game's flat floor.
  // Use elapsed time so jitter cannot accumulate integration error.
  const height=this.settled?0:Math.max(0,this.height+(reduced?Math.min(0,this.vertical):this.vertical)*seconds-300*seconds*seconds);
  model.position.y+=height-originY;
  rig.rotation.y=this.yaw;
 }
}
