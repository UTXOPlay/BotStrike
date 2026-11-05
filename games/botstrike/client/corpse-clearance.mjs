import {Box3,Matrix4,Vector3} from 'three';
import {ConvexHull} from 'three/addons/math/ConvexHull.js';

// Vertices with identical skin weights share an affine transform. Its extrema
// lie on their convex hull, so the hull encloses the actual skin without the
// loose cross-joint boxes that can falsely reject a narrow corridor.
const templates=new WeakMap();
function hullPoints(points){
 if(points.length<9)return points;
 const a=points[0],ab=new Vector3(),normal=new Vector3(),scratch=new Vector3();let b=a,c=a,max=0;
 for(const p of points){const d=a.distanceToSquared(p);if(d>max){max=d;b=p;}}if(max<1e-16)return points;
 ab.subVectors(b,a);max=0;for(const p of points){const d=scratch.subVectors(p,a).cross(ab).lengthSq();if(d>max){max=d;c=p;}}if(max<1e-16)return points;
 normal.subVectors(c,a).cross(ab).normalize();if(!points.some(p=>Math.abs(scratch.subVectors(p,a).dot(normal))>1e-8))return points;
 const hull=new ConvexHull().setFromPoints(points),keep=new Set();for(const face of hull.faces){let edge=face.edge;do{keep.add(edge.head().point);edge=edge.next;}while(edge!==face.edge);}return [...keep];
}
function influenceBounds(mesh){
 let data=templates.get(mesh.geometry);if(data)return data;
 const {position,skinIndex,skinWeight}=mesh.geometry.attributes,point=new Vector3();
 const groups=new Map();
 const used=mesh.geometry.index?new Set(mesh.geometry.index.array):Array.from({length:position.count},(_,i)=>i);
 for(const i of used){
  const influences=[];for(let j=0;j<4;j++)if(skinWeight.getComponent(i,j)!==0)influences.push([skinIndex.getComponent(i,j),skinWeight.getComponent(i,j)]);
  const key=influences.flat().join(',');let group=groups.get(key);if(!group){group={influences,points:new Map()};groups.set(key,group);}
  point.fromBufferAttribute(position,i);group.points.set(point.toArray().join(','),point.clone());
 }
 data=[...groups.values()].map(g=>({influences:g.influences,points:hullPoints([...g.points.values()])}));
 templates.set(mesh.geometry,data);return data;
}

export class CorpseBounds{
 constructor(model,{rigid=[]}={}){
  this.meshes=[];model.traverse(mesh=>{if(mesh.isSkinnedMesh)this.meshes.push({mesh,groups:influenceBounds(mesh),skin:mesh.skeleton.bones.map(()=>new Matrix4())});});
  this.rigid=rigid.map(mesh=>{mesh.geometry.computeBoundingBox();return {mesh,box:mesh.geometry.boundingBox};});
  this.box=new Box3();this.matrix=new Matrix4();this.post=new Matrix4();this.point=new Vector3();
 }
 measure(){
  const {box,matrix,post,point}=this;box.makeEmpty();
  for(const {mesh,groups,skin} of this.meshes){
   // Attached skinning cancels mesh.matrixWorld against bindMatrixInverse.
   // Derive it directly: the renderer has not refreshed that inverse yet.
   if(mesh.bindMode==='attached')post.identity();else post.multiplyMatrices(mesh.matrixWorld,mesh.bindMatrixInverse);
   for(let i=0;i<skin.length;i++)skin[i].multiplyMatrices(mesh.skeleton.bones[i].matrixWorld,mesh.skeleton.boneInverses[i]).multiply(mesh.bindMatrix);
   for(const group of groups){
    const e=matrix.elements;e.fill(0);for(const [bone,weight] of group.influences){const m=skin[bone].elements;for(let i=0;i<16;i++)e[i]+=m[i]*weight;}
    // Three accumulates a Vector3, discarding the weighted homogeneous w.
    e[3]=e[7]=e[11]=0;e[15]=1;matrix.premultiply(post);
    for(const p of group.points)box.expandByPoint(point.copy(p).applyMatrix4(matrix));
   }
  }
  for(const {mesh,box:local} of this.rigid)for(let i=0;i<8;i++)box.expandByPoint(point.set(i&1?local.max.x:local.min.x,i&2?local.max.y:local.min.y,i&4?local.max.z:local.min.z).applyMatrix4(mesh.matrixWorld));
  return box.expandByScalar(.002);
 }
}

const margin=.15;
export function clearancePlanes(origin,obstacles,observed=null){
 return obstacles.map(box=>{
  const choices=[{axis:'x',side:-1,edge:box.min[0],gap:box.min[0]-origin[0]},{axis:'x',side:1,edge:box.max[0],gap:origin[0]-box.max[0]},
   {axis:'z',side:-1,edge:box.min[2],gap:box.min[2]-origin[2]},{axis:'z',side:1,edge:box.max[2],gap:origin[2]-box.max[2]}].filter(f=>f.gap>=0);
  choices.sort((a,b)=>a.gap-b.gap);
  const clear=observed?choices.filter(f=>f.side<0?observed.max[f.axis]<=f.edge:observed.min[f.axis]>=f.edge):choices;
  if(observed){const gap=f=>f.side<0?f.edge-observed.max[f.axis]:observed.min[f.axis]-f.edge;clear.sort((a,b)=>gap(b)-gap(a));}
  const top=origin[1]>=box.max[1]&&origin[0]>=box.min[0]&&origin[0]<=box.max[0]&&origin[2]>=box.min[2]&&origin[2]<=box.max[2];
  // Native-valid origins are outside a solid or above its top. A synthetic
  // lab origin inside a solid has no observed escape side to preserve.
  return {box,face:top?{axis:'y',side:1,edge:box.max[1]}:clear[0]||choices[0]};
 });
}

// A short corridor may fit an upright native capsule but not a body lying
// across it. Steer the authored fall's long axis along that corridor, retaining
// the outgoing pose at t=0. This angle is chosen once for the death descriptor.
export function clearanceTurn(origin,yaw,axis,planes){
 const bounds={x:[-Infinity,Infinity],z:[-Infinity,Infinity]};
 for(const {box,face} of planes){if(!face||face.axis==='y'||origin[1]>=box.max[1])continue;
  const other=face.axis==='x'?2:0;if(origin[other]<box.min[other]-18||origin[other]>box.max[other]+18)continue;
  const b=bounds[face.axis];if(face.side>0)b[0]=Math.max(b[0],face.edge);else b[1]=Math.min(b[1],face.edge);
 }
 const widthX=bounds.x[1]-bounds.x[0],widthZ=bounds.z[1]-bounds.z[0];
 if(Math.min(widthX,widthZ)>=90)return 0;
 const desired=widthX<widthZ?0:Math.PI/2;
 return ((desired-yaw-axis+Math.PI*1.5)%Math.PI+Math.PI)%Math.PI-Math.PI/2;
}

// A fixed separating face avoids choosing a different wall side halfway through
// the fall. The constraints are continuous in the sampled pose, with no delta-
// time integration. Visibility reconstruction evaluates exactly the same pose.
export function solveClearance(body,planes,result=new Vector3()){
 let minX=-Infinity,maxX=Infinity,minZ=-Infinity,maxZ=Infinity,minY=0;
 for(const {face} of planes)if(face?.axis==='y')minY=Math.max(minY,face.edge+margin-body.min.y);
 for(const {box,face} of planes){
  if(!face||face.axis==='y')continue;
  if(body.max.y<=box.min[1]||body.min.y+minY>=box.max[1])continue;
  const value=face.edge+(face.side<0?-margin:margin)-(face.side<0?body.max[face.axis]:body.min[face.axis]);
  if(face.axis==='x'){if(face.side<0)maxX=Math.min(maxX,value);else minX=Math.max(minX,value);}
  else if(face.side<0)maxZ=Math.min(maxZ,value);else minZ=Math.max(minZ,value);
 }
 if(minX<=maxX&&minZ<=maxZ){
  result.set(Math.max(minX,Math.min(maxX,0)),minY,Math.max(minZ,Math.min(maxZ,0)));
  if(!planes.some(({box,face})=>face&&body.max.y+minY>box.min[1]&&body.min.y+minY<box.max[1]&&body.max.x+result.x>box.min[0]&&body.min.x+result.x<box.max[0]&&body.max.z+result.z>box.min[2]&&body.min.z+result.z<box.max[2]))return result;
 }
 // A long corpse can span both sides of a short passage. Find the nearest
 // collision-free translation outside the union of forbidden rectangles.
 // Maps have at most 15 obstacles; the finite candidate set is bounded.
 const rects=[],xs=[0],zs=[0];
 for(const {box,face} of planes){if(!face||body.max.y+minY<=box.min[1]||body.min.y+minY>=box.max[1])continue;
  const r=[box.min[0]-body.max.x-margin,box.max[0]-body.min.x+margin,box.min[2]-body.max.z-margin,box.max[2]-body.min.z+margin];rects.push(r);xs.push(r[0],r[1]);zs.push(r[2],r[3]);
 }
 let best=Infinity;result.set(0,minY,0);
 for(const x of xs)for(const z of zs){const cost=x*x+z*z;if(cost>=best||rects.some(r=>x>r[0]+1e-8&&x<r[1]-1e-8&&z>r[2]+1e-8&&z<r[3]-1e-8))continue;best=cost;result.set(x,minY,z);}
 return result;
}
