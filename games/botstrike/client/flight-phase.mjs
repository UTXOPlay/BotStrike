// Presentation references for the unchanged native jump in botstrike/src/lib.rs:
// vy=220, then vy-=600/64 before each position step. They do not drive physics.
const gravity=600,launch=220,step=gravity/64,firstRise=launch-step,landingTick=Math.ceil(2*launch/step-1);
export function flightPhase(vertical){
 return {riseProgress:Math.max(0,Math.min(1,1-Math.max(0,vertical)/firstRise)),fallTime:Math.max(0,-vertical)/gravity};
}

// A retained pose belongs to an observed flight, not every future jump in this
// life. Reject an upward velocity restart and a gap long enough to have landed.
export function continuesFlight(flight,player,map,now,tick=null){
 if(!flight||flight.life!==player.life||flight.map!==map||player.alive===false)return false;
 if(Number.isInteger(tick)&&Number.isInteger(flight.tick)){
  const elapsed=tick-flight.tick;
  return elapsed>=0&&Math.abs(player.velocity[1]-(flight.vertical-step*elapsed))<.001;
 }
 const elapsed=(now-flight.seenAt)/1000;
 const remaining=(landingTick-(launch-flight.vertical)/step)/64;
 return elapsed>=0&&elapsed<Math.max(0,remaining)+.5/64&&player.velocity[1]<=flight.vertical+.001;
}
