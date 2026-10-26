// Development-only rendering harness. Bundled by tests/botstrike-art.mjs; never
// included in the shipped client. Uses the same geometry as the live match.
import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {createArt} from '../games/botstrike/client/art-direction.mjs';
import {createWorld} from '../games/botstrike/client/scene.mjs';
import spec from '../botstrike/spec.json';
const canvas=document.querySelector('canvas');
let world,showroom;
function clear(){world?.dispose();world=null;if(showroom){showroom.art.dispose();showroom.scene.traverse(n=>n.geometry?.dispose());showroom.env.dispose();showroom.renderer.dispose();showroom=null;}}
window.renderHero=(hero,width=720,height=900)=>{
 clear();const renderer=new THREE.WebGLRenderer({canvas,antialias:true,preserveDrawingBuffer:true});renderer.setSize(width,height,false);renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
 const scene=new THREE.Scene();scene.background=new THREE.Color('#0b1721');scene.add(new THREE.HemisphereLight(0xb7d7ef,0x11141e,1.0));const key=new THREE.DirectionalLight(0xc1e6ff,3.4);key.position.set(-60,120,-80);scene.add(key);const fill=new THREE.DirectionalLight(0xffaf75,2.6);fill.position.set(100,90,40);scene.add(fill);const edge=new THREE.DirectionalLight(0x48ddff,2);edge.position.set(-70,60,70);scene.add(edge);
 const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment(),env=pmrem.fromScene(room,.05);scene.environment=env.texture;scene.environmentIntensity=.7;room.dispose();pmrem.dispose();
 const art=createArt(renderer),bot=art.robot(0,hero);scene.add(bot.rig);bot.rig.rotation.y=-.25;const floor=new THREE.Mesh(new THREE.CylinderGeometry(40,44,3,64),art.m.black);floor.position.y=-3;scene.add(floor);const trim=new THREE.Mesh(new THREE.TorusGeometry(41,.35,6,64),art.glow[hero]);trim.rotation.x=Math.PI/2;trim.position.y=-1.3;scene.add(trim);
 const camera=new THREE.PerspectiveCamera(32,width/height,.1,2000);camera.position.set(-105,73,-190);camera.lookAt(0,43,0);renderer.render(scene,camera);showroom={scene,renderer,art,env};return{calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,geometries:renderer.info.memory.geometries,textures:renderer.info.memory.textures};
};
window.renderMap=(map,width=1920,height=1080)=>{clear();world=createWorld(canvas,spec);world.setMap(map);world.resize();world.renderer.setSize(width,height,false);world.camera.aspect=width/height;world.camera.updateProjectionMatrix();world.scene.traverse(n=>{if(n.name.startsWith('hero-'))n.visible=false});const e=spec.maps[map].extent;world.camera.position.set(-e*.73,80,e*.7);world.camera.lookAt(e*.3,140,-e*.7);world.renderer.render(world.scene,world.camera);return{calls:world.renderer.info.render.calls,triangles:world.renderer.info.render.triangles,geometries:world.renderer.info.memory.geometries,textures:world.renderer.info.memory.textures};};
window.renderLineup=()=>{clear();world=createWorld(canvas,spec);world.setMap(0);const bots=world.scene.children.filter(n=>n.name.startsWith('hero-'));bots.forEach((b,i)=>{b.visible=i<6;b.position.set((i-2.5)*62,0,950+i%2*9);b.rotation.y=0});world.camera.position.set(-60,100,600);world.camera.lookAt(0,40,950);world.camera.fov=45;world.camera.updateProjectionMatrix();world.renderer.render(world.scene,world.camera);return{calls:world.renderer.info.render.calls,triangles:world.renderer.info.render.triangles};};
window.checkMapResources=()=>{world.setMap(0);world.renderer.render(world.scene,world.camera);const before={...world.renderer.info.memory};for(let i=0;i<9;i++){world.setMap(i%3);world.renderer.render(world.scene,world.camera)}world.setMap(0);world.renderer.render(world.scene,world.camera);return{before,after:{...world.renderer.info.memory}}};
window.artReady=true;
window.renderArsenal=(kind,index)=>{
 clear();const width=640,height=360,renderer=new THREE.WebGLRenderer({canvas,antialias:true,preserveDrawingBuffer:true});renderer.setSize(width,height,false);renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
 const scene=new THREE.Scene();scene.background=new THREE.Color('#0b1721');scene.add(new THREE.HemisphereLight(0xc1e6ff,0x222232,1.3));for(const [color,intensity,x,y,z]of [[0xc9e8ff,4,-30,70,-50],[0xff9b67,2.7,50,25,40],[0x35dfff,2,-50,20,30]]){const light=new THREE.DirectionalLight(color,intensity);light.position.set(x,y,z);scene.add(light)}
 const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment(),env=pmrem.fromScene(room,.05);scene.environment=env.texture;scene.environmentIntensity=.7;room.dispose();pmrem.dispose();const art=createArt(renderer),model=kind==='weapon'?art.weaponModel(index):art.equipment(index);scene.add(model);model.rotation.y=kind==='weapon'?.28:-.5;
 const camera=new THREE.PerspectiveCamera(30,width/height,.1,1000);camera.position.set(kind==='weapon'?90:65,kind==='weapon'?40:35,kind==='weapon'?65:-85);camera.lookAt(0,0,kind==='weapon'?-5:0);renderer.render(scene,camera);showroom={scene,renderer,art,env};return{calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};
};
