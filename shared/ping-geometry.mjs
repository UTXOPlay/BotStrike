// Public native map geometry only. Never ray-test hidden player poses.
export function terrainPoint(map,x,z){
 if(!Number.isFinite(x)||!Number.isFinite(z)||Math.abs(x)>map.extent+1e-7||Math.abs(z)>map.extent+1e-7)return null;
 x=Math.max(-map.extent,Math.min(map.extent,x));z=Math.max(-map.extent,Math.min(map.extent,z));
 let y=0;for(const b of map.obstacles)if(x>=b.min[0]&&x<=b.max[0]&&z>=b.min[2]&&z<=b.max[2])y=Math.max(y,b.max[1]);return [x,y,z];
}
export function onTerrain(map,p){
 if(!Array.isArray(p)||p.length!==3||!p.every(Number.isFinite)||Math.abs(p[0])>map.extent||Math.abs(p[2])>map.extent||p[1]<0)return false;
 const inside=b=>p.every((v,i)=>v>b.min[i]+.05&&v<b.max[i]-.05);
 if(p[1]<=.05&&!map.obstacles.some(b=>p[0]>b.min[0]+.05&&p[0]<b.max[0]-.05&&p[2]>b.min[2]+.05&&p[2]<b.max[2]-.05&&b.max[1]>.05))return true;
 return !map.obstacles.some(inside)&&map.obstacles.some(b=>p.every((v,i)=>v>=b.min[i]-.05&&v<=b.max[i]+.05)&&p.some((v,i)=>i===1?Math.abs(v-b.max[i])<=.05:Math.min(Math.abs(v-b.min[i]),Math.abs(v-b.max[i]))<=.05));
}
export function rayTerrain(map,origin,direction){
 if(!origin?.every(Number.isFinite)||!direction?.every(Number.isFinite)||origin.length!==3||direction.length!==3)return null;
 let nearest=Infinity;
 if(direction[1]<-1e-9){const t=-origin[1]/direction[1],x=origin[0]+direction[0]*t,z=origin[2]+direction[2]*t;if(t>=0&&Math.abs(x)<=map.extent&&Math.abs(z)<=map.extent)nearest=t;}
 for(const b of map.obstacles){let near=-Infinity,far=Infinity;for(let i=0;i<3;i++){if(Math.abs(direction[i])<1e-9){if(origin[i]<b.min[i]||origin[i]>b.max[i]){far=-Infinity;break;}}else{const a=(b.min[i]-origin[i])/direction[i],c=(b.max[i]-origin[i])/direction[i];near=Math.max(near,Math.min(a,c));far=Math.min(far,Math.max(a,c));}}
  const t=near>=0?near:far;if(far>=near&&t>=0)nearest=Math.min(nearest,t);
 }
 if(!Number.isFinite(nearest))return null;const p=origin.map((v,i)=>v+direction[i]*nearest);p[1]=Math.max(0,p[1]);return onTerrain(map,p)?p:null;
}
export function radarProject(map,size,position){const scale=(size-16)/(map.extent*2);return [size/2+position[0]*scale,size/2+position[2]*scale];}
export function radarPoint(map,size,x,y){const scale=(size-16)/(map.extent*2);return size>16?terrainPoint(map,(x-size/2)/scale,(y-size/2)/scale):null;}
