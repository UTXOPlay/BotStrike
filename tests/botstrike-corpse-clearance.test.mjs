import test from 'node:test';
import assert from 'node:assert/strict';
import {Bone,Box3,BufferGeometry,Float32BufferAttribute,Group,Matrix4,MeshBasicMaterial,PlaneGeometry,Skeleton,SkinnedMesh,SphereGeometry,Uint16BufferAttribute,Vector3} from 'three';
import {CorpseBounds,clearancePlanes,clearanceTurn,solveClearance} from '../games/botstrike/client/corpse-clearance.mjs';

test('proxy encloses independently skinned referenced vertices through bind, root and joint transforms',()=>{
 const geometry=new BufferGeometry();geometry.setAttribute('position',new Float32BufferAttribute([-.5,0,0,.5,0,0,0,1,0,0,.5,.4,999,999,999],3));
 geometry.setAttribute('skinIndex',new Uint16BufferAttribute([0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0],4));
 geometry.setAttribute('skinWeight',new Float32BufferAttribute([1,0,0,0,.25,.75,0,0,1,0,0,0,.5,.5,0,0,1,0,0,0],4));geometry.setIndex([0,1,2,0,2,3]);
 const group=new Group(),root=new Bone(),joint=new Bone(),mesh=new SkinnedMesh(geometry,new MeshBasicMaterial());joint.position.y=.5;root.add(joint);mesh.add(root);group.add(mesh);group.updateMatrixWorld(true);
 mesh.bind(new Skeleton([root,joint]),new Matrix4().makeRotationX(-Math.PI/2));
 const bounds=new CorpseBounds(mesh),point=new Vector3();
 for(const mode of ['attached','detached'])for(let i=0;i<40;i++){
  mesh.bindMode=mode;group.position.set(i-20,8,-i);group.rotation.set(.12,i*.1,.03);group.scale.set(2,3,4);joint.rotation.z=i*.12;root.rotation.y=i*.03;group.updateMatrixWorld(true);mesh.skeleton.update();
  const box=bounds.measure();assert.ok(box.getSize(point).length()<100,'unused position must not inflate the proxy');
  for(const v of [0,1,2,3]){mesh.getVertexPosition(v,point).applyMatrix4(mesh.matrixWorld);assert.ok(box.clone().expandByScalar(1e-5).containsPoint(point),`${mode} vertex ${v} escaped`);}
 }
});

test('fixed wall faces clear a corner and keep a body resting on top of cover',()=>{
 const obstacles=[{min:[0,0,0],max:[200,95,100]},{min:[-80,0,-200],max:[-30,120,0]}],body=new Box3(new Vector3(-28,0,-25),new Vector3(40,20,45));
 const planes=clearancePlanes([-18,0,-18],obstacles),shift=solveClearance(body,planes),moved=body.clone().translate(shift);
 assert.ok(!moved.intersectsBox(new Box3(new Vector3(...obstacles[0].min),new Vector3(...obstacles[0].max))));
 assert.ok(!moved.intersectsBox(new Box3(new Vector3(...obstacles[1].min),new Vector3(...obstacles[1].max))));
 const top=solveClearance(new Box3(new Vector3(35,0,20),new Vector3(115,12,75)),clearancePlanes([75,110,45],obstacles));
 assert.deepEqual([top.x,top.z],[0,0]);assert.equal(top.y,95.15);
});

test('a narrow corridor selects a longitudinal fall and impossible width uses a finite escape',()=>{
 const obstacles=[{min:[-200,0,-100],max:[-25,120,100]},{min:[25,0,-100],max:[200,120,100]}],planes=clearancePlanes([0,0,0],obstacles);
 for(const yaw of [0,Math.PI/4,Math.PI/2,-Math.PI/2,20*Math.PI]){
  const turn=clearanceTurn([0,0,0],yaw,.55,planes);assert.ok(Math.abs(Math.sin(yaw+.55+turn))<1e-12);assert.ok(Math.abs(turn)<=Math.PI/2);
 }
 const body=new Box3(new Vector3(-40,0,-10),new Vector3(40,12,10)),shift=solveClearance(body,planes),moved=body.clone().translate(shift);
 assert.ok(shift.toArray().every(Number.isFinite));for(const box of obstacles)assert.ok(!moved.intersectsBox(new Box3(new Vector3(...box.min),new Vector3(...box.max))));
});

test('shared-weight hulls cover curved skins and retain safe coplanar and collinear groups',()=>{
 const line=new BufferGeometry().setAttribute('position',new Float32BufferAttribute(Array.from({length:20},(_,i)=>[i/20,0,0]).flat(),3));
 for(const geometry of [new SphereGeometry(1,16,10),new PlaneGeometry(1,1,8,8),line]){
  const count=geometry.attributes.position.count;geometry.setAttribute('skinIndex',new Uint16BufferAttribute(Array.from({length:count},()=>[0,1,0,0]).flat(),4));geometry.setAttribute('skinWeight',new Float32BufferAttribute(Array.from({length:count},()=>[.375,.625,0,0]).flat(),4));
  const mesh=new SkinnedMesh(geometry,new MeshBasicMaterial()),root=new Bone(),joint=new Bone();root.add(joint);mesh.add(root);mesh.updateMatrixWorld(true);mesh.bind(new Skeleton([root,joint]));const bounds=new CorpseBounds(mesh),point=new Vector3();
  for(let frame=0;frame<10;frame++){
   mesh.position.set(10,3,-12);mesh.scale.set(3,2,4);mesh.rotation.y=frame*.15;joint.rotation.set(.2,frame*.2,.5);mesh.updateMatrixWorld(true);mesh.skeleton.update();const box=bounds.measure();
   for(let i=0;i<count;i++){mesh.getVertexPosition(i,point).applyMatrix4(mesh.matrixWorld);assert.ok(box.containsPoint(point),`shape ${geometry.type}, frame ${frame}, vertex ${i}`);}
  }
 }
});

test('a clear outgoing corner pose keeps its separating side without an initial shove',()=>{
 const obstacle={min:[0,0,0],max:[200,95,100]},origin=[-18,0,-80],body=new Box3(new Vector3(-40,0,-95),new Vector3(5,70,-65));
 const planes=clearancePlanes(origin,[obstacle],body);assert.equal(planes[0].face.axis,'z');assert.equal(solveClearance(body,planes).length(),0);
 let last=0;for(let z=-65;z<=20;z+=2){body.max.z=z;const shift=solveClearance(body,planes);assert.ok(Math.abs(shift.z-last)<=2.15);assert.equal(shift.x,0);last=shift.z;}
});
