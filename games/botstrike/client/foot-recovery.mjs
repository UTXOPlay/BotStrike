import {Vector3} from 'three';

// A short, finite correction to a moving target. Its initial position and
// velocity match the outgoing solved foot; both corrections reach zero at the
// endpoint. This only changes presentation, never the character's native root.
export class FootRecovery{
 constructor(){this.offset=new Vector3();this.velocity=new Vector3();this.elapsed=0;this.duration=0;}
 get active(){return this.elapsed<this.duration;}
 clear(){this.elapsed=this.duration=0;}
 begin(position,velocity,target,targetVelocity,dt,duration=.10){
  this.duration=duration;this.elapsed=0;
  // target is sampled at the end of this frame; recover from the preceding
  // solved frame rather than treating that already-elapsed time as a teleport.
  this.offset.copy(position).sub(target).addScaledVector(targetVelocity,dt);
  this.velocity.copy(velocity).sub(targetVelocity);
 }
 apply(target,dt){
  if(!this.active)return target;
  this.elapsed=Math.min(this.duration,this.elapsed+Math.max(0,dt));
  const u=this.elapsed/this.duration,u2=u*u,u3=u2*u;
  return target.addScaledVector(this.offset,1-3*u2+2*u3).addScaledVector(this.velocity,this.duration*(u-2*u2+u3));
 }
 sampleVelocity(targetVelocity,out){
  out.copy(targetVelocity);
  if(!this.active)return out;
  const u=this.elapsed/this.duration;
  return out.addScaledVector(this.offset,(6*u*u-6*u)/this.duration).addScaledVector(this.velocity,3*u*u-4*u+1);
 }
}
