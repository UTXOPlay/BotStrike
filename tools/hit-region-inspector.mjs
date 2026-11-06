// Development lab only. Hidden room positions/history are never requested.
import * as THREE from 'three';
import {hitVolumes} from '../games/botstrike/client/hit-regions.mjs';
export function createHitInspector(scene,count=10){
 const group=new THREE.Group();group.visible=false;scene.add(group);
 const sphere=new THREE.SphereGeometry(1,20,12),headBox=new THREE.BoxGeometry(2,2,2),cylinder=new THREE.CylinderGeometry(1,1,1,20,1,true);
 const headMaterial=new THREE.MeshBasicMaterial({color:0xffd06b,wireframe:true,transparent:true,opacity:.8,depthTest:false});
 const bodyMaterial=new THREE.MeshBasicMaterial({color:0x6ceaff,wireframe:true,transparent:true,opacity:.5,depthTest:false});
 const actors=Array.from({length:count},()=>{
  const head=new THREE.Mesh(headBox,headMaterial),body=new THREE.Mesh(cylinder,bodyMaterial),lo=new THREE.Mesh(sphere,bodyMaterial),hi=new THREE.Mesh(sphere,bodyMaterial);
  group.add(head,body,lo,hi);return {head,body,lo,hi};
 });
 const ray=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3()]),new THREE.LineBasicMaterial({color:0xffffff,depthTest:false}));group.add(ray);ray.visible=false;
 return {
  clear(){group.visible=false;ray.visible=false;},
  update(players,stanceFor,enabled){
   group.visible=enabled;if(!enabled)return;
   for(let i=0;i<actors.length;i++){
    const actor=actors[i],p=players[i],visible=!!p?.alive&&!!p.position&&!p.hidden;
    for(const mesh of Object.values(actor))mesh.visible=visible;if(!visible)continue;
    const v=hitVolumes(p.position,Number.isFinite(p.stance)?p.stance:stanceFor(i),[p.yaw||0,p.pitch||0]);
    actor.head.position.fromArray(v.head);actor.head.scale.fromArray(v.head_half_extents);actor.head.rotation.set(v.head_pitch,v.head_yaw,0,'YXZ');
    actor.lo.position.fromArray(v.lower);actor.hi.position.fromArray(v.upper);actor.lo.scale.setScalar(v.body_radius);actor.hi.scale.setScalar(v.body_radius);
    actor.body.position.copy(actor.lo.position).add(actor.hi.position).multiplyScalar(.5);actor.body.scale.set(v.body_radius,v.upper[1]-v.lower[1],v.body_radius);
   }
  },
  trace(origin,direction,nativeHit){
   const start=new THREE.Vector3(...origin),end=start.clone().addScaledVector(new THREE.Vector3(...direction).normalize(),nativeHit?.distance??300);
   const positions=ray.geometry.attributes.position;positions.setXYZ(0,...start);positions.setXYZ(1,...end);positions.needsUpdate=true;ray.geometry.computeBoundingSphere();ray.material.color.set(nativeHit?.region==='head'?0xffd06b:nativeHit?0x6ceaff:0xffffff);ray.visible=true;group.updateWorldMatrix(true,true);const caster=new THREE.Raycaster(start,new THREE.Vector3(...direction).normalize());const hits=caster.intersectObjects(actors.filter(a=>a.head.visible).map(a=>a.head));return {renderedHeadDistance:hits[0]?.distance??null};
  },
 };
}
