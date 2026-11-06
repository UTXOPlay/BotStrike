import {Vector3} from 'three';
// Bake a decoration into map coordinates and confine every vertex to its
// authoritative solid. Coplanar details use a depth-biased material, never an
// extra opaque silhouette outside the native cover box.
export function confineCoverDecoration(mesh,bounds){
 mesh.updateMatrix();mesh.geometry.applyMatrix4(mesh.matrix);mesh.position.set(0,0,0);mesh.quaternion.identity();mesh.scale.set(1,1,1);mesh.updateMatrix();
 const p=mesh.geometry.attributes.position,v=new Vector3();let changed=false;
 for(let i=0;i<p.count;i++){
  v.fromBufferAttribute(p,i);const old=[v.x,v.y,v.z],next=old.map((x,a)=>Math.max(bounds.min[a],Math.min(bounds.max[a],x)));
  if(next.some((x,a)=>Math.abs(x-old[a])>1e-7)){p.setXYZ(i,...next);changed=true;}
 }
 if(changed){p.needsUpdate=true;mesh.geometry.computeVertexNormals();}
 mesh.geometry.computeBoundingBox();mesh.geometry.computeBoundingSphere();return changed;
}
