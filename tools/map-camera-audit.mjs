import {PerspectiveCamera,Vector3} from 'three';
import {eyeHeight,visibilitySamples} from '../shared/sight-geometry.mjs';
import {intersectsBox} from '../botstrike-service/visibility.mjs';
// Independent renderer-projection check of the native analysis tool's contact
// timestamps. This evaluates geometric potential, not pixel recognition.
export function verifyMapCameras(report,spec){
 const map=spec.maps.find(m=>m.id===report.map),rows=new Map(report.cases.map(r=>[r.case.id,r]));
 const camera=new PerspectiveCamera(80,16/9,.5,9000),point=new Vector3(),cache=new Map();let tested=0;
 const prepared=row=>{
  if(cache.has(row.case.id))return cache.get(row.case.id);
  const values=row.trace.map(f=>({eye:[f.position[0],f.position[1]+eyeHeight(f),f.position[2]],yaw:f.yaw,points:visibilitySamples({...f,pitch:0},spec.hit_regions)}));cache.set(row.case.id,values);return values;
 };
 const visible=(a,b)=>{
  camera.position.fromArray(a.eye);camera.rotation.set(0,a.yaw,0,'YXZ');camera.updateMatrixWorld(true);
  return b.points.some(p=>{point.fromArray(p).project(camera);return point.x>=-1&&point.x<=1&&point.y>=-1&&point.y<=1&&point.z>=-1&&point.z<=1&&!map.obstacles.some(o=>intersectsBox(a.eye,p,o));});
 };
 for(const contact of report.contacts){
  const a=prepared(rows.get(contact.attackerRoute)),b=prepared(rows.get(contact.defenderRoute));let ab=null,ba=null;
  for(let tick=0;tick<Math.max(a.length,b.length);tick++){
   const x=a[Math.min(tick,a.length-1)],y=b[Math.min(tick,b.length-1)];
   if(ab===null&&visible(x,y))ab=tick;if(ba===null&&visible(y,x))ba=tick;
   if(ab!==null&&ba!==null)break;
  }
  if(ab!==contact.attackerCameraTick||ba!==contact.defenderCameraTick)throw Error('Native/renderer camera mismatch: '+JSON.stringify({a:contact.attackerRoute,b:contact.defenderRoute,ab,ba,nativeAB:contact.attackerCameraTick,nativeBA:contact.defenderCameraTick}));
  tested++;
 }
 return {pairs:tested,directions:tested*2,matched:true,verticalFov:80,aspect:16/9,near:.5,far:9000,reference:'THREE.PerspectiveCamera projection and shared service-cover intersection',humanRecognition:false};
}
