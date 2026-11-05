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
 const seconds=Number.isFinite(dt)?Math.max(0,dt):0,lateral=motion.speed>1?Math.abs(motion.side)/motion.speed:0,crouch=crouchAmount(motion),run=runningAmount(motion);
 // Walking keeps overlapping support. Shorten the cycle to fit the available
 // step instead of silently turning a side-step into a gait with aerial gaps.
 plan.travelGoal=Math.min(plan.legLength*(.90-.32*lateral*(1-run)*(1-crouch)-.20*crouch),lateral>.001?plan.footWidth*(.74-.02*run)/lateral:Infinity);
 if(motion.reset||!Number.isFinite(plan.travelLimit))plan.travelLimit=plan.travelGoal;else plan.travelLimit+=(plan.travelGoal-plan.travelLimit)*-Math.expm1(-seconds/.06);
 const standingDuty=.52+(.25-.52)*run,styleDuty=standingDuty+(.54-standingDuty)*crouch;
 const minimum=.18+.08*run,speed=Math.max(1,motion.speed);
 plan.duty=Math.min(styleDuty,plan.travelLimit/(speed*minimum));
 const limit=plan.travelLimit/(speed*plan.duty),goal=clamp(limit,minimum,1.25);
 if(motion.reset)plan.cycleDuration=goal;else plan.cycleDuration+=(goal-plan.cycleDuration)*-Math.expm1(-seconds/.06);
 plan.cycleDuration=Math.min(plan.cycleDuration,Math.max(minimum,limit));
 // Placement and playback must describe the same distance travelled while a
 // foot is planted, including small analog speeds and the maximum cycle cap.
 plan.supportTravel=speed*plan.cycleDuration*plan.duty;
 return plan.cycleDuration;
}
