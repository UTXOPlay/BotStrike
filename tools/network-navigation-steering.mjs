// Public-map geometry for bounded normal-control navigation, not a motion model.
export const NAVIGATION_ENVELOPE=20;
const finitePoint=p=>Array.isArray(p)&&p.length===2&&p.every(Number.isFinite);
const wrap=x=>Math.atan2(Math.sin(x),Math.cos(x));

export function cardinalSteering(from,to,currentYaw){
 if(!finitePoint(from)||!finitePoint(to)||!Number.isFinite(currentYaw))return null;
 const dx=to[0]-from[0],dz=to[1]-from[1];if(Math.hypot(dx,dz)<1e-8)return null;
 const candidates=[['KeyW',Math.atan2(-dx,-dz)],['KeyD',Math.atan2(-dz,dx)],['KeyS',Math.atan2(dx,dz)],['KeyA',Math.atan2(dz,-dx)]];
 return candidates.map(([key,yaw],order)=>({key,yaw,turn:wrap(yaw-currentYaw),order})).sort((a,b)=>Math.abs(a.turn)-Math.abs(b.turn)||a.order-b.order)[0];
}

function segmentHitsBox(a,b,lo,hi){
 let near=0,far=1;
 for(let axis=0;axis<2;axis++){
  const delta=b[axis]-a[axis];
  if(Math.abs(delta)<1e-10){if(a[axis]<lo[axis]||a[axis]>hi[axis])return false;continue;}
  const values=[(lo[axis]-a[axis])/delta,(hi[axis]-a[axis])/delta].sort((x,y)=>x-y);
  near=Math.max(near,values[0]);far=Math.min(far,values[1]);if(near>far)return false;
 }
 return true;
}

export function navigationPathClear(map,points,goal,{groundY=0,envelope=NAVIGATION_ENVELOPE}={}){
 if(!map||!Number.isFinite(map.extent)||map.extent<=20||!Array.isArray(map.obstacles)||!finitePoint(goal)||!Array.isArray(points)||points.length<2||!points.every(finitePoint)||groundY!==0||!Number.isFinite(envelope)||envelope<=0||envelope>NAVIGATION_ENVELOPE)return false;
 const edge=map.extent-20;
 if(points.some(p=>Math.hypot(p[0]-goal[0],p[1]-goal[1])>envelope||p.some(value=>Math.abs(value)>edge)))return false;
 for(const box of map.obstacles){
  if(!Array.isArray(box.min)||!Array.isArray(box.max)||box.min.length!==3||box.max.length!==3||![...box.min,...box.max].every(Number.isFinite)||box.min.some((value,i)=>value>box.max[i]))return false;
  if(groundY>=box.max[1])continue;
  const lo=[box.min[0]-18,box.min[2]-18],hi=[box.max[0]+18,box.max[2]+18];
  // Contact is conservatively blocked, including segment interiors. Native
  // constrains strict interior penetration using the same 18-unit expansion.
  for(let i=1;i<points.length;i++)if(segmentHitsBox(points[i-1],points[i],lo,hi))return false;
 }
 return true;
}

export function planTwoLegSteering({from,goal,step,map,yaw,groundY=0,tolerance=2}){
 if(!finitePoint(from)||!finitePoint(goal)||!Number.isFinite(tolerance)||tolerance<=0||!Number.isFinite(step)||step<=2*tolerance||step>15||!Number.isFinite(yaw))return null;
 const distance=Math.hypot(goal[0]-from[0],goal[1]-from[1]);
 if(distance<=tolerance||distance>15||distance>2*step)return null;
 const middle=[(from[0]+goal[0])/2,(from[1]+goal[1])/2],normal=[-(goal[1]-from[1])/distance,(goal[0]-from[0])/distance],height=Math.sqrt(Math.max(0,step*step-distance*distance/4));
 const candidates=[];
 for(const side of [-1,1]){
  const via=middle.map((value,i)=>value+side*normal[i]*height);
  if(!navigationPathClear(map,[from,via,goal],goal,{groundY}))continue;
  const steering=cardinalSteering(from,via,yaw);if(steering)candidates.push({via,side,step,steering,envelope:NAVIGATION_ENVELOPE});
 }
 return candidates.sort((a,b)=>Math.abs(a.steering.turn)-Math.abs(b.steering.turn)||a.side-b.side)[0]||null;
}
