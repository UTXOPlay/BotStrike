import {eyeHeight as nativeEyeHeight} from '../../../shared/sight-geometry.mjs';
import spec from '../../../botstrike/spec.json' with {type:'json'};
export const movement=spec.movement;
// Mirrors the native movement transform and collision constants; never sends positions.
export function constrain(position,map){for(const box of map.obstacles){if(position[1]>=box.max[1])continue;const lo=[box.min[0]-18,box.min[2]-18],hi=[box.max[0]+18,box.max[2]+18];if(position[0]>lo[0]&&position[0]<hi[0]&&position[2]>lo[1]&&position[2]<hi[1]){const d=[position[0]-lo[0],hi[0]-position[0],position[2]-lo[1],hi[1]-position[2]],min=Math.min(...d);if(d[0]===min)position[0]=lo[0];else if(d[1]===min)position[0]=hi[0];else if(d[2]===min)position[2]=lo[1];else position[2]=hi[1];}}position[0]=Math.max(-map.extent+20,Math.min(map.extent-20,position[0]));position[2]=Math.max(-map.extent+20,Math.min(map.extent-20,position[2]));return position;}
export function velocity(input,hero,weapon={mobility:1}){const length=Math.max(1,Math.hypot(input.x,input.y)),speed=hero.speed*(weapon.mobility??1)*(input.crouch?.45:input.walk||input.scope?.55:1);return[(-Math.sin(input.yaw)*input.y+Math.cos(input.yaw)*input.x)/length*speed,0,(-Math.cos(input.yaw)*input.y-Math.sin(input.yaw)*input.x)/length*speed];}

export function horizontal(current,wish,grounded,p=movement){
 if(!grounded&&wish[0]===0&&wish[1]===0)return [...current];
 const acceleration=!grounded?p.air_acceleration:wish[0]===0&&wish[1]===0?p.braking:current[0]*wish[0]+current[1]*wish[1]<0?p.counter_strafe:p.acceleration;
 const delta=[wish[0]-current[0],wish[1]-current[1]],length=Math.hypot(...delta),step=acceleration/64;
 return length<=step?[...wish]:current.map((v,a)=>v+delta[a]/length*step);
}
export function movementAccuracy(speed,runningSpeed,airborne,landing=0,p=movement){
 const accurate=runningSpeed*p.accurate_speed_fraction,t=Math.max(0,Math.min(1,(speed-accurate)/Math.max(1,runningSpeed-accurate)));
 return (1+(p.moving_spread-1)*t*t*(3-2*t))*(airborne?p.airborne_spread:1+p.landing_spread*Math.min(1,landing/Math.max(1,p.landing_ticks)));
}
export function runningSpeed(player,weapon){return (spec.heroes[player.hero]?.speed||305)*(weapon.mobility??1);}

export function stanceAmount(current,crouch,p=movement){const target=Number(!!crouch),value=current+(target-current)*-Math.expm1(-1/(64*p.stance_seconds));return Math.abs(value-target)<1e-6?target:value;}
export const eyeHeight=nativeEyeHeight;
