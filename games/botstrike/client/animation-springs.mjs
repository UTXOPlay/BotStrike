import {runningAmount} from './locomotion-gait.mjs';
const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));

// Exact critically damped solution for a piecewise-constant target. The state
// retains outgoing velocity; it is never used to filter gameplay or camera input.
export class DampedSpring{
 constructor(size=3){this.value=new Float64Array(size);this.velocity=new Float64Array(size);}
 clear(){this.value.fill(0);this.velocity.fill(0);return this;}
 step(target,dt,hz,bound=Infinity){
  const seconds=Number.isFinite(dt)?clamp(dt,0,.1):0,omega=2*Math.PI*hz,decay=Math.exp(-omega*seconds);
  for(let i=0;i<this.value.length;i++){
   const goal=clamp(target[i]||0,-bound,bound),offset=this.value[i]-goal,j=this.velocity[i]+omega*offset;
   const next=goal+(offset+j*seconds)*decay;
   this.velocity[i]=(this.velocity[i]-omega*j*seconds)*decay;
   this.value[i]=clamp(next,-bound,bound);
   if(next!==this.value[i])this.velocity[i]=0;
  }
  return this.value;
 }
}

export class AnimationSprings{
 constructor(profile){
  this.profile=profile;this.lean=new DampedSpring();this.recoil=new DampedSpring();this.landing=new DampedSpring(1);
  this.leanTarget=new Float64Array(3);this.zero=new Float64Array(3);this.zeroOne=new Float64Array(1);
  this.ready=new DampedSpring(1);this.readyTarget=new Float64Array(1);this.sway=new DampedSpring();this.swayTarget=new Float64Array(3);
  this.time=0;this.reset();
 }
 reset(){this.lean.clear();this.recoil.clear();this.landing.clear();this.ready.clear();this.sway.clear();this.time=0;}
 fire(weapon=2){
  const kick=[.008,.006,.010,.022,.025,.009,.006,.011,.010,.016,.008,.028][weapon]??.01;
  this.recoil.value[0]=Math.min(.055,this.recoil.value[0]+kick);
  this.recoil.value[2]=Math.min(.045,this.recoil.value[2]+kick*.65);
  this.recoil.velocity[0]+=kick*8;
  this.ready.clear();
 }
 update(motion,dt,{active=true,reduced=false,firing=false,reloading=false}={}){
  if((motion.reset&&!motion.flightContinuity)||!active||reduced){this.reset();return this;}
  if(motion.landed){this.landing.value[0]=-Math.min(.085,(motion.landingSpeed||0)*.0003)*this.profile.land;this.landing.velocity[0]=-.12;}
  this.leanTarget[0]=(-clamp((motion.accelerationForward||0)/3000,-1,1)*.10-(motion.grounded?clamp(motion.speed/250,0,1)*.035:0))*this.profile.lean;
  this.leanTarget[1]=clamp((motion.accelerationSide||0)/3000,-1,1)*.075*this.profile.lean;
  this.leanTarget[2]=-clamp((motion.turnRate||0)*.025,-.20,.20)*this.profile.lean;
  this.lean.step(this.leanTarget,dt,this.profile.bodyHz,.20);
  this.recoil.step(this.zero,dt,this.profile.recoilHz,.06);
  this.landing.step(this.zeroOne,dt,this.profile.bodyHz,.12);
  this.readyTarget[0]=motion.scoped||firing||reloading||!motion.grounded?0:runningAmount(motion);
  this.ready.step(this.readyTarget,dt,this.profile.bodyHz,1);
  this.swayTarget[0]=-clamp((motion.turnRate||0)*.002,-.018,.018)*this.profile.sway;
  this.swayTarget[1]=clamp((motion.pitchRate||0)*.0015,-.012,.012)*this.profile.sway;
  this.swayTarget[2]=clamp((motion.turnRate||0)*.003,-.025,.025)*this.profile.sway;
  this.sway.step(this.swayTarget,dt,this.profile.bodyHz,.025);
  this.time+=Number.isFinite(dt)?clamp(dt,0,.1):0;
  return this;
 }
}
