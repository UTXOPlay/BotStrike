import test from 'node:test';import assert from 'node:assert/strict';
import * as THREE from 'three';
import {auditCover,auditCoverRays} from '../tools/cover-readability-audit.mjs';
test('cover audit selects the scenery floor rather than the earlier objective prop',()=>{
 const scene=new THREE.Scene(),prop=new THREE.Group(),scenery=new THREE.Group();scene.add(prop,scenery);
 for(let i=0;i<24;i++)prop.add(new THREE.Mesh(new THREE.BoxGeometry(20,10,10),new THREE.MeshBasicMaterial()));
 const floor=new THREE.Mesh(new THREE.BoxGeometry(1040,10,1040),new THREE.MeshBasicMaterial());floor.position.y=-5;scenery.add(floor);
 const wall=new THREE.Mesh(new THREE.BoxGeometry(100,100,100),new THREE.MeshBasicMaterial());wall.position.set(0,50,0);scenery.add(wall);
 const map={id:'fixture',extent:500,obstacles:[{min:[-50,0,-50],max:[50,100,50]}]};
 const result=auditCover({scene},map,{samples:12});assert.ok(result.visualHits>0);assert.equal(result.nativeOnly,0);assert.equal(result.visualOnly,0);assert.equal(result.edgeMismatch,0);
 const exact=auditCoverRays({scene},map,[{origin:[0,56,200],target:[0,56,0],expected:150},{origin:[400,56,200],target:[400,56,-200],expected:null}]);assert.equal(exact.rays,2);assert.equal(exact.nativeOnly+exact.visualOnly+exact.edgeMismatch,0);
 assert.throws(()=>auditCoverRays({scene},map,[{origin:[NaN,0,0],target:[0,0,0],expected:null}]));
 scene.traverse(n=>{n.geometry?.dispose();n.material?.dispose();});
});
