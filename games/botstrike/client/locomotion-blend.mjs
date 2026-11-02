import {runningAmount} from './locomotion-gait.mjs';
export const locomotionClips=['idle','walk','run','backpedal','strafe_left','strafe_right','crouch','crouch_walk','jump','fall'];
const clamp=(value,low,high)=>Math.max(low,Math.min(high,value));
const smooth=(low,high,value)=>{const t=clamp((value-low)/(high-low),0,1);return t*t*(3-2*t);};
const moving=[1,2,3,4,5,7];
const referenceFraction=[0,.55,1,.55,.55,.55,0,.45,0,0];
const duration=[3,1,.66,1.1,1,1,2,1.2,.5,1];

export function locomotionTargets(motion,out=new Float64Array(locomotionClips.length)){
 out.fill(0);
 if(!motion.grounded){out[motion.crouch?6:motion.rising?8:9]=1;return out;}
 const amount=smooth(0,24,motion.speed),run=runningAmount(motion);
 if(motion.crouch){out[6]=1-amount;out[7]=amount;return out;}
 const total=Math.abs(motion.forward)+Math.abs(motion.side);
 const forward=total?Math.max(0,motion.forward)/total:0,back=total?Math.max(0,-motion.forward)/total:0;
 out[0]=1-amount;out[1]=amount*forward*(1-run);out[2]=amount*forward*run;
 out[3]=amount*back;out[4]=total?amount*Math.max(0,-motion.side)/total:0;out[5]=total?amount*Math.max(0,motion.side)/total:0;
 return out;
}

// The shared cycle is independent of clip duration. Only pose weights are smoothed;
// simulation position, camera facing and weapon input are never delayed here.
export class LocomotionBlend{
 constructor(durations=duration){this.durations=durations;this.weights=new Float64Array(10);this.targets=new Float64Array(10);this.times=new Float64Array(10);this.clear();}
 clear(phase=0){this.ready=false;this.phase=((phase%1)+1)%1;this.idleTime=this.phase*this.durations[0];this.airTime=0;this.airKind=null;this.gain=1;this.orientation=0;this.cadenceScale=1;this.dominant='idle';this.weights.fill(0);this.weights[0]=1;}
 update(motion,dt,{active=true,reduced=false,phase=this.phase,cycleDuration=null}={}){
  const seconds=Number.isFinite(dt)?clamp(dt,0,.1):0;
  locomotionTargets(motion,this.targets);
  if(!this.ready||motion.reset){this.clear(phase);this.weights.set(this.targets);this.ready=true;if(!active)this.gain=0;}
  else{
   const blend=-Math.expm1(-seconds/.07);
   for(let i=0;i<this.weights.length;i++)this.weights[i]+=(this.targets[i]-this.weights[i])*blend;
  }
  let sum=0,travel=0,reference=0,cycle=0,largest=-1;
  for(let i=0;i<this.weights.length;i++){sum+=this.weights[i];if(this.weights[i]>largest){largest=this.weights[i];this.dominant=locomotionClips[i];}}
  for(let i=0;i<this.weights.length;i++)this.weights[i]/=sum;
  const runSpeed=Number.isFinite(motion.runSpeed)&&motion.runSpeed>0?motion.runSpeed:250;
  for(const i of moving){travel+=this.weights[i];reference+=this.weights[i]*referenceFraction[i]*runSpeed;cycle+=this.weights[i]*this.durations[i];}
  this.cadenceScale=travel>1e-5?clamp(motion.speed/(reference/travel),.6,1.6):1;
  if(Number.isFinite(cycleDuration)&&cycleDuration>0&&travel>1e-5)this.cadenceScale=(cycle/travel)/clamp(cycleDuration,.26,1.25);
  if(active&&motion.grounded&&motion.speed>1&&travel>1e-5)this.phase=(this.phase+seconds*this.cadenceScale/(cycle/travel))%1;
  this.idleTime+=seconds;
  const airKind=motion.grounded?null:motion.rising?'jump':'fall';
  if(airKind!==this.airKind){this.airKind=airKind;this.airTime=0;}else this.airTime+=seconds;
  for(let i=0;i<this.times.length;i++)this.times[i]=moving.includes(i)?this.phase*this.durations[i]:i<8?this.idleTime%this.durations[i]:Math.min(this.airTime,this.durations[i]);
  if(!motion.grounded&&motion.rising&&Number.isFinite(motion.riseProgress))this.times[8]=clamp(motion.riseProgress,0,1)*this.durations[8];
  // Fade to zero at pure lateral travel, where the forward/backward convention
  // changes, so circling never flips the pelvis by 180 degrees.
  const total=Math.abs(motion.forward)+Math.abs(motion.side);
  const direction=motion.forward>=0?Math.atan2(-motion.side,motion.forward):Math.atan2(motion.side,-motion.forward);
  const target=active&&!reduced&&motion.grounded&&total>1?clamp(direction,-.55,.55)*Math.abs(motion.forward)/total*smooth(0,50,motion.speed):0;
  this.orientation+=(target-this.orientation)*-Math.expm1(-seconds/.065);
  if(reduced||!active)this.orientation=0;
  this.gain=active?Math.min(1,this.gain+seconds/.16):Math.max(0,this.gain-seconds/.07);
  return this;
 }
}
