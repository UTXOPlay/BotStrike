// Public, presentation-only floor zoning. Both flat visual decals and trusted
// native-position sound classification use these same rectangles. No collision.
export const surfaceNames=['metal','concrete','tile'];
export function groundSurfaceLayout(map,id){
 const e=map.extent,base=id===1?2:map.practice_only?1:0;
 const patches=map.practice_only?[]:[
  ...[-1,1].map(side=>({surface:1,min:[-e,side<0?-e:e*.78],max:[e,side<0?-e*.78:e]})),
  ...(map.sites||[]).map(([x,,z])=>({surface:id===0?1:2,min:[x-180,z-180],max:[x+180,z+180]})),
 ];
 return {base,patches};
}
export function groundSurfaceAt(map,id,position){
 const {base,patches}=groundSurfaceLayout(map,id);let surface=base;
 for(const patch of patches)if(position[0]>=patch.min[0]&&position[0]<=patch.max[0]&&position[2]>=patch.min[1]&&position[2]<=patch.max[1])surface=patch.surface;
 return surface;
}
