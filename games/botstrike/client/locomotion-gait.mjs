// Presentation-only gait mapping. Movement speeds and input rules remain in
// the native simulation; callers provide the current hero/weapon speed range.
const clamp=(value,lo,hi)=>Math.max(lo,Math.min(hi,value));
const smooth=t=>{t=clamp(t,0,1);return t*t*(3-2*t);};
export function calculateRunAmount(speed,runSpeed=250,crouch=false,scoped=false){
 if(crouch||scoped)return 0;
 const maximum=Number.isFinite(runSpeed)&&runSpeed>0?runSpeed:250;
 // Native quiet walking tops out at 55% of this range. Keep a margin before
 // blending toward running; partial analog movement fills the interval.
 return smooth((speed/maximum-.60)/.30);
}
export function runningAmount(motion){
 if(motion.crouch||motion.scoped)return 0;
 return Number.isFinite(motion.runAmount)?clamp(motion.runAmount,0,1):calculateRunAmount(motion.speed,motion.runSpeed);
}
export function crouchAmount(motion){return Number.isFinite(motion.crouchAmount)?clamp(motion.crouchAmount,0,1):Number(!!motion.crouch);}
export function advanceStridePlan(plan,motion,dt){
 const seconds=Number.isFinite(dt)?Math.max(0,dt):0,lateral=motion.speed>1?Math.abs(motion.side)/motion.speed:0,crouch=crouchAmount(motion);
 plan.travelGoal=Math.min(plan.legLength*(.90-.20*crouch),lateral>.001?plan.footWidth*.72/lateral:Infinity);
 if(motion.reset)plan.supportTravel=plan.travelGoal;else plan.supportTravel+=(plan.travelGoal-plan.supportTravel)*-Math.expm1(-seconds/.06);
 const standingDuty=.52+(.25-.52)*runningAmount(motion),styleDuty=standingDuty+(.50-standingDuty)*crouch;
 // Lateral steps have less room. Bound support duration so the minimum cycle
 // time cannot make a planted foot travel beyond its planned reach.
 plan.duty=Math.min(styleDuty,plan.supportTravel/(Math.max(12,motion.speed)*.26));
 const goal=clamp(plan.supportTravel/(Math.max(12,motion.speed)*plan.duty),.26,1.25);
 if(motion.reset)plan.cycleDuration=goal;else plan.cycleDuration+=(goal-plan.cycleDuration)*-Math.expm1(-seconds/.06);
 return plan.cycleDuration;
}
