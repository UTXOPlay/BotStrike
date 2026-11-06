// Isolated development fixture: real WebGL native hulls and browser pointer
// events, using the shipping projection helpers. Never loaded by the game.
import * as THREE from 'three';import spec from '../botstrike/spec.json';import {pointerTerrain,projectPing} from '../games/botstrike/client/ping-projection.mjs';
const canvas=document.querySelector('canvas'),renderer=new THREE.WebGLRenderer({canvas,antialias:false,preserveDrawingBuffer:true}),scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(80,innerWidth/innerHeight,1,10000),ray=new THREE.Raycaster(),ndc=new THREE.Vector2(),hulls=[];
scene.background=new THREE.Color('#183744');const material=new THREE.MeshBasicMaterial({color:'#77939a',side:THREE.DoubleSide}),floorMaterial=new THREE.MeshBasicMaterial({color:'#304a52',side:THREE.DoubleSide});let map,last;
function draw(){renderer.render(scene,camera);}
function resize(){renderer.setPixelRatio(Math.min(1,Math.sqrt(2560*1440/(innerWidth*innerHeight))));renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();draw();}
function set({mapId=0,fov=80,height=56}={}){
 for(const mesh of hulls){mesh.removeFromParent();mesh.geometry.dispose();}hulls.length=0;map=spec.maps[mapId];for(const b of map.obstacles){const mesh=new THREE.Mesh(new THREE.BoxGeometry(...b.max.map((v,i)=>v-b.min[i])),material);mesh.position.fromArray(b.max.map((v,i)=>(v+b.min[i])/2));scene.add(mesh);hulls.push(mesh);}
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(map.extent*2,map.extent*2),floorMaterial);floor.rotation.x=-Math.PI/2;scene.add(floor);hulls.push(floor);const spawn=map.spawns[0][2];camera.position.set(spawn[0],height,spawn[2]);camera.lookAt(0,0,0);camera.rotateZ(.012);camera.fov=fov;camera.updateProjectionMatrix();scene.updateMatrixWorld(true);resize();last=null;
}
canvas.addEventListener('pointerdown',e=>{const rect=canvas.getBoundingClientRect(),actual=pointerTerrain(camera,map,rect,e.clientX,e.clientY);ndc.set((e.clientX-rect.left)/rect.width*2-1,1-(e.clientY-rect.top)/rect.height*2);ray.setFromCamera(ndc,camera);const mesh=ray.intersectObjects(hulls,false)[0]?.point?.toArray()||null;const xy=actual?projectPing(camera,rect,actual):null;last={screen:[e.clientX,e.clientY],actual,mesh,screenError:xy?Math.hypot(xy[0]-e.clientX,xy[1]-e.clientY):null,backing:[canvas.width,canvas.height]};draw();});
window.CommsProjectionAudit={set,result:()=>last};addEventListener('resize',resize);set();
