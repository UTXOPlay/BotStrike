import {Vector3,Quaternion} from 'three';
import {DampedSpring} from './animation-springs.mjs';
const names=['hips','spine','chest','head','upper_arm.L','upper_arm.R'];
const limits=[.18,.12,.10,.08,.10,.10];
function limit(values,bound){let length=0;for(const v of values)length+=v*v;length=Math.sqrt(length);if(length>bound)for(let i=0;i<values.length;i++)values[i]*=bound/length;}
function logarithm(q,out){const sign=q.w<0?-1:1,w=Math.max(-1,Math.min(1,q.w*sign)),scale=w>.999999?2:2*Math.acos(w)/Math.sqrt(Math.max(1e-16,1-w*w));out[0]=q.x*sign*scale;out[1]=q.y*sign*scale;out[2]=q.z*sign*scale;}
const magnitude=v=>Math.hypot(v[0],v[1],v[2]);
const active=s=>magnitude(s.value)+magnitude(s.velocity)>1e-10;
function exponential(values,q){const length=magnitude(values),scale=length>1e-8?Math.sin(length/2)/length:.5;return q.set(values[0]*scale,values[1]*scale,values[2]*scale,Math.cos(length/2)).normalize();}

// Bounded inertial offsets are reset from the outgoing pose at a transition,
// never added repeatedly to last frame's corrected bones. Sample before feet,
// aiming and grip IK so their constraints do not feed back into inertia.
export class PoseInertia{
 constructor(bones,profile){
  this.profile=profile;this.zero=new Float64Array(3);this.angular=new Float64Array(3);this.delta=new Quaternion();this.rotation=new Quaternion();this.position=new Vector3();
  this.tracks=names.map((name,i)=>({bone:bones[name],limit:limits[i],positionLimit:name==='hips'?.045:.012,rotation:new DampedSpring(),translation:new DampedSpring(),previousRotation:new Quaternion(),previousPosition:new Vector3(),angularVelocity:new Float64Array(3),linearVelocity:new Float64Array(3)}));
  this.reset();
 }
 reset(){this.ready=false;this.tag=null;this.maxAngle=0;this.maxTranslation=0;for(const t of this.tracks){t.rotation.clear();t.translation.clear();t.angularVelocity.fill(0);t.linearVelocity.fill(0);}}
 apply(tag,dt,{enabled=true,immediate=false}={}){
  const seconds=Number.isFinite(dt)?Math.max(0,Math.min(.1,dt)):0;
  if(!enabled)this.reset();
  const transition=this.ready&&tag!==this.tag;this.maxAngle=this.maxTranslation=0;
  for(const t of this.tracks){
   const b=t.bone;
   if(transition&&enabled&&!immediate){
    this.delta.copy(b.quaternion).invert().premultiply(t.previousRotation);logarithm(this.delta,t.rotation.value);limit(t.rotation.value,t.limit);
    t.rotation.velocity.set(t.angularVelocity);limit(t.rotation.velocity,4);
    this.position.copy(t.previousPosition).sub(b.position);t.translation.value[0]=this.position.x;t.translation.value[1]=this.position.y;t.translation.value[2]=this.position.z;limit(t.translation.value,t.positionLimit);
    t.translation.velocity.set(t.linearVelocity);limit(t.translation.velocity,.5);
   }
   if(immediate||!enabled){t.rotation.clear();t.translation.clear();}
   const rotating=active(t.rotation),translating=active(t.translation);
   if(rotating){t.rotation.step(this.zero,seconds,1/this.profile.settle,t.limit);limit(t.rotation.value,t.limit);b.quaternion.premultiply(exponential(t.rotation.value,this.rotation));this.maxAngle=Math.max(this.maxAngle,magnitude(t.rotation.value));}
   if(translating){t.translation.step(this.zero,seconds,1/this.profile.settle,t.positionLimit);limit(t.translation.value,t.positionLimit);b.position.x+=t.translation.value[0];b.position.y+=t.translation.value[1];b.position.z+=t.translation.value[2];this.maxTranslation=Math.max(this.maxTranslation,magnitude(t.translation.value));}
   if(this.ready&&seconds>0){
    this.delta.copy(t.previousRotation).invert().premultiply(b.quaternion);logarithm(this.delta,t.angularVelocity);for(let i=0;i<3;i++)t.angularVelocity[i]/=seconds;limit(t.angularVelocity,4);
    this.position.copy(b.position).sub(t.previousPosition).multiplyScalar(1/seconds);t.linearVelocity[0]=this.position.x;t.linearVelocity[1]=this.position.y;t.linearVelocity[2]=this.position.z;limit(t.linearVelocity,.5);
   }
   t.previousRotation.copy(b.quaternion);t.previousPosition.copy(b.position);
  }
  this.tag=tag;this.ready=enabled;
 }
}
