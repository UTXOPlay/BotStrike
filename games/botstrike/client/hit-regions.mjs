import spec from '../../../botstrike/spec.json' with {type:'json'};
// Presentation only; native uses the same authored, render-independent contract.
export function hitVolumes(position,stance,look=[0,0],profile=spec.hit_regions){
 const t=Math.max(0,Math.min(1,stance)),lerp=key=>profile.standing[key]+(profile.crouched[key]-profile.standing[key])*t,point=y=>[position[0],position[1]+y,position[2]];
 const chest=look[1]*profile.pitch_chest,pitch=look[1]*profile.pitch_head;
 const dy=profile.neck_length*(Math.cos(chest)-1)+profile.head_center_up*(Math.cos(pitch)-1)-profile.head_center_z*Math.sin(pitch);
 const dz=profile.neck_length*Math.sin(chest)+profile.head_center_up*Math.sin(pitch)+profile.head_center_z*(Math.cos(pitch)-1),z=lerp('head_z')+dz;
 return {head:[position[0]+Math.sin(look[0])*z,position[1]+lerp('head_y')+dy,position[2]+Math.cos(look[0])*z],head_half_extents:[0,1,2].map(i=>profile.standing.head_half_extents[i]+(profile.crouched.head_half_extents[i]-profile.standing.head_half_extents[i])*t),head_yaw:look[0],head_pitch:pitch,lower:point(lerp('body_lower')),upper:point(lerp('body_upper')),body_radius:lerp('body_radius')};
}
