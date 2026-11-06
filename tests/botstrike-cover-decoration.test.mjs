import test from 'node:test';
import assert from 'node:assert/strict';
import {BoxGeometry,PlaneGeometry,Mesh,MeshBasicMaterial,Raycaster,Vector3} from 'three';
import {confineCoverDecoration} from '../games/botstrike/client/cover-decoration.mjs';
test('clipped facing decals retain an exact native cover edge at a grazing angle',()=>{
 const bounds={min:[-30,0,340],max:[370,95,460]},material=new MeshBasicMaterial();
 const core=new Mesh(new BoxGeometry(400,95,120),material);core.position.set(170,47.5,400);core.updateMatrixWorld();
 const detail=new Mesh(new PlaneGeometry(300,40),material);detail.position.set(100,56,339.2);detail.rotation.y=Math.PI;detail.updateMatrixWorld();
 const origin=new Vector3(-1100,56,250),direction=new Vector3(1800,-13,150).normalize(),ray=new Raycaster(origin,direction);
 const native=ray.intersectObject(core)[0].distance,before=ray.intersectObjects([core,detail])[0].distance;assert.ok(native-before>3,'fixture exposes the earlier unbounded face');
 assert.equal(confineCoverDecoration(detail,bounds),true);detail.updateMatrixWorld();assert.ok(Math.abs(ray.intersectObjects([core,detail])[0].distance-native)<1e-7);
 const positions=detail.geometry.attributes.position;for(let i=0;i<positions.count;i++)for(let axis=0;axis<3;axis++)assert.ok(positions.array[i*3+axis]>=bounds.min[axis]&&positions.array[i*3+axis]<=bounds.max[axis]);
 for(const value of detail.geometry.attributes.normal.array)assert.ok(Number.isFinite(value));
 core.geometry.dispose();detail.geometry.dispose();material.dispose();
});
