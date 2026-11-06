export function shotTrailEnd(origin,direction,obstacles,maxDistance=245){
 let end=direction[1]<0?Math.min(maxDistance,Math.max(0,-origin[1]/direction[1])):maxDistance;
 for(const box of obstacles){
  let near=0,far=end;
  for(let axis=0;axis<3;axis++){
   if(Math.abs(direction[axis])<1e-9){
    if(origin[axis]<box.min[axis]||origin[axis]>box.max[axis]){far=-1;break;}
   }else{
    const a=(box.min[axis]-origin[axis])/direction[axis],b=(box.max[axis]-origin[axis])/direction[axis];
    near=Math.max(near,Math.min(a,b));far=Math.min(far,Math.max(a,b));
    if(near>far)break;
   }
  }
  if(near<=far)end=near;
 }
 return end;
}
