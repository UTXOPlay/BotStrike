import * as THREE from 'three';
// Offline visual/native-box comparison only. Never runs on the live frame loop.
export function auditCoverRays(world,map,queries,{tolerance=3}={}){
 if(!Array.isArray(queries)||queries.length>12000||queries.some(q=>![q.origin,q.target].every(p=>Array.isArray(p)&&p.length===3&&p.every(v=>Number.isFinite(v)&&Math.abs(v)<=10000)))||queries.some(q=>q.expected!==null&&(!Number.isFinite(q.expected)||q.expected<0||q.expected>20000)))throw Error('Bounded native ray fixtures required');
 const {meshes}=scenery(world,map),ray=new THREE.Raycaster(),result={map:map.id,rays:queries.length,tolerance,nativeOnly:0,visualOnly:0,edgeMismatch:0,examples:[]};
 for(const q of queries){
  const delta=q.target.map((v,i)=>v-q.origin[i]),length=Math.hypot(...delta);if(length<1e-9)throw Error('Nonzero fixture ray required');
  ray.near=0;ray.far=length;ray.set(new THREE.Vector3(...q.origin),new THREE.Vector3(...delta.map(v=>v/length)));
  const visual=ray.intersectObjects(meshes,false).find(hit=>{const m=Array.isArray(hit.object.material)?hit.object.material[hit.face.materialIndex]:hit.object.material;return m.visible!==false&&m.opacity>=.8&&!m.transparent;})?.distance??null;
  const kind=q.expected===null&&visual!==null?'visualOnly':q.expected!==null&&visual===null?'nativeOnly':q.expected!==null&&Math.abs(q.expected-visual)>tolerance?'edgeMismatch':null;
  if(kind){result[kind]++;if(result.examples.length<24)result.examples.push({kind,origin:q.origin,target:q.target,native:q.expected,visual});}
 }
 return result;
}
function scenery(world,map){
 world.scene.updateMatrixWorld(true);
 const root=world.scene.children.find(n=>n.type==='Group'&&!n.name&&n.children.some(mesh=>{if(!mesh.isMesh)return false;mesh.geometry.computeBoundingBox();const size=mesh.geometry.boundingBox.getSize(new THREE.Vector3());return size.x>=map.extent*1.8&&size.z>=map.extent*1.8;}));
 if(!root)throw Error('Static scenery group unavailable');
 world.scene.updateMatrixWorld(true);root.updateMatrixWorld(true);const meshes=[];
 root.traverse(n=>{if(!n.isMesh)return;let visible=true;for(let p=n;p;p=p.parent)if(!p.visible)visible=false;
  if(visible)meshes.push(n);
 });
 return {root,meshes};
}
export function auditCover(world,map,{samples=24,tolerance=3}={}){
 if(!Number.isInteger(samples)||samples<1||samples>48)throw Error('Bounded cover samples required');
 const {root,meshes}=scenery(world,map);
 const boxHit=(origin,dir,box)=>{let lo=0,hi=Infinity;for(let a=0;a<3;a++){
  if(Math.abs(dir[a])<1e-9){if(origin[a]<box.min[a]||origin[a]>box.max[a])return null;}
  else{const t1=(box.min[a]-origin[a])/dir[a],t2=(box.max[a]-origin[a])/dir[a];lo=Math.max(lo,Math.min(t1,t2));hi=Math.min(hi,Math.max(t1,t2));if(lo>hi)return null;}
 }return lo;};
 const free=p=>Math.abs(p[0])<map.extent-30&&Math.abs(p[2])<map.extent-30&&!map.obstacles.some(o=>p[0]>o.min[0]-25&&p[0]<o.max[0]+25&&p[2]>o.min[2]-25&&p[2]<o.max[2]+25);
 const candidates=[];for(let z=-map.extent+100;z<map.extent;z+=160)for(let x=-map.extent+100;x<map.extent;x+=160)if(free([x,0,z]))candidates.push([x,0,z]);
 const origins=Array.from({length:Math.min(samples,candidates.length)},(_,i)=>candidates[Math.floor(i*candidates.length/samples)]),ray=new THREE.Raycaster();ray.near=0;ray.far=450;
 const result={reference:'native obstacle AABBs and movement floor plane; outside-playfield scenery excluded',map:map.id,samples:origins.length,rays:0,tolerance,nativeOnly:0,visualOnly:0,edgeMismatch:0,visualHits:0,meshCount:meshes.length,rootChildren:root.children.length,rawHits:0,examples:[]};
 for(const rootPosition of origins)for(const lift of [0,40])for(const yaw of [0,Math.PI/2,Math.PI,Math.PI*1.5])for(const pitch of [0,-.3]){
  const origin=[rootPosition[0],56+lift,rootPosition[2]],dir=[-Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),-Math.cos(yaw)*Math.cos(pitch)];
  ray.far=450;for(const axis of [0,2])if(Math.abs(dir[axis])>1e-9)ray.far=Math.min(ray.far,((dir[axis]>0?map.extent-2:-map.extent+2)-origin[axis])/dir[axis]);
  const hits=map.obstacles.map(box=>boxHit(origin,dir,box)).filter(v=>v!==null&&v<=ray.far);if(dir[1]<0){const floor=-origin[1]/dir[1];if(floor<=ray.far)hits.push(floor);}const native=hits.length?Math.min(...hits):null;
  ray.set(new THREE.Vector3(...origin),new THREE.Vector3(...dir));
  const intersections=ray.intersectObjects(meshes,false);result.rawHits+=intersections.length;const visible=intersections.find(hit=>{const m=Array.isArray(hit.object.material)?hit.object.material[hit.face.materialIndex]:hit.object.material;return m.visible!==false&&m.opacity>=.8&&!m.transparent;});
  const visual=visible?.distance??null;if(visual!==null)result.visualHits++;result.rays++;
  let kind=null;if(native===null&&visual!==null)kind='visualOnly';else if(native!==null&&visual===null)kind='nativeOnly';else if(native!==null&&Math.abs(native-visual)>tolerance)kind='edgeMismatch';
  if(kind){result[kind]++;if(result.examples.length<20)result.examples.push({kind,origin,dir,native,visual,point:visible?.point.toArray()??null});}
 }
 return result;
}
