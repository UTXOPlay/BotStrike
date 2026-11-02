import {Vector3,Quaternion,Matrix4} from 'three';
const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));

// World-space analytic solver. Scratch storage belongs to each limb, so the hot
// path allocates nothing. Bone translations and limb lengths are never changed.
export class TwoBoneIK{
 constructor(upper,middle,end,{minBend=.08,maxBend=2.7}={}){
  this.upper=upper;this.middle=middle;this.end=end;this.minBend=minBend;this.maxBend=maxBend;
  for(const name of ['a','b','c','axis','pole','elbow','goal','from','to','scale'])this[name]=new Vector3();
  this.delta=new Quaternion();this.world=new Quaternion();this.parent=new Quaternion();this.rotationMatrix=new Matrix4();
  this.result={reachable:false,error:0,bend:0,reach:0,requested:0};
 }
 aim(bone,child,point){
  this.goal.setFromMatrixPosition(bone.matrixWorld);this.to.setFromMatrixPosition(child.matrixWorld).sub(this.goal).normalize();this.from.copy(point).sub(this.goal).normalize();
  this.delta.setFromUnitVectors(this.to,this.from);
  this.world.setFromRotationMatrix(this.rotationMatrix.extractRotation(bone.matrixWorld)).normalize();this.parent.setFromRotationMatrix(this.rotationMatrix.extractRotation(bone.parent.matrixWorld)).normalize();
  bone.quaternion.copy(this.parent.invert().multiply(this.delta.multiply(this.world))).normalize();bone.updateWorldMatrix(false,true);
 }
 solve(target,poleDirection,refresh=true){
  const r=this.result;
  // Refresh the chain once. Each aim refreshes its descendants, so all remaining
  // reads can use matrixWorld without recursively visiting the same ancestors.
  if(refresh)this.upper.updateWorldMatrix(true,true);
  this.a.setFromMatrixPosition(this.upper.matrixWorld);this.b.setFromMatrixPosition(this.middle.matrixWorld);this.c.setFromMatrixPosition(this.end.matrixWorld);this.scale.setFromMatrixScale(this.upper.matrixWorld);
  const u=this.a.distanceTo(this.b),v=this.b.distanceTo(this.c),requested=this.a.distanceTo(target);
  const scaleTolerance=Math.max(this.scale.x,this.scale.y,this.scale.z)*.001;
  // Meshopt quaternion quantization can introduce a few parts in 100000 of
  // apparent scale error. Reject genuinely anisotropic rigs, not that noise.
  if(!Number.isFinite(requested)||u<1e-6||v<1e-6||Math.abs(this.scale.x-this.scale.y)>scaleTolerance||Math.abs(this.scale.x-this.scale.z)>scaleTolerance){r.reachable=false;r.error=Number.isFinite(requested)?requested:Infinity;r.requested=requested;r.reach=r.bend=0;return r;}
  const lo=Math.sqrt(Math.max(1e-10,u*u+v*v+2*u*v*Math.cos(this.maxBend))),hi=Math.sqrt(u*u+v*v+2*u*v*Math.cos(this.minBend));
  const d=clamp(requested,lo,hi);this.axis.copy(target).sub(this.a);if(this.axis.lengthSq()<1e-12)this.axis.set(0,-1,0);else this.axis.normalize();
  this.pole.copy(poleDirection).addScaledVector(this.axis,-poleDirection.dot(this.axis));
  if(this.pole.lengthSq()<1e-8){this.pole.copy(this.b).sub(this.a);this.pole.addScaledVector(this.axis,-this.pole.dot(this.axis));}
  if(this.pole.lengthSq()<1e-8){this.pole.set(1,0,0);if(Math.abs(this.axis.x)>.9)this.pole.set(0,0,1);this.pole.addScaledVector(this.axis,-this.pole.dot(this.axis));}
  this.pole.normalize();const along=(u*u-v*v+d*d)/(2*d),height=Math.sqrt(Math.max(0,u*u-along*along));
  this.elbow.copy(this.a).addScaledVector(this.axis,along).addScaledVector(this.pole,height);
  this.goal.copy(this.a).addScaledVector(this.axis,d);
  // aim() uses goal as scratch, so keep the end target in c across both calls.
  this.c.copy(this.goal);this.aim(this.upper,this.middle,this.elbow);this.aim(this.middle,this.end,this.c);
  this.b.setFromMatrixPosition(this.end.matrixWorld);
  r.error=this.b.distanceTo(target);r.reachable=requested>=lo-1e-5&&requested<=hi+1e-5;r.bend=Math.acos(clamp((d*d-u*u-v*v)/(2*u*v),-1,1));r.reach=d;r.requested=requested;
  return r;
 }
}
