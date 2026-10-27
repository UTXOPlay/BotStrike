import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
const canvas=document.querySelector('canvas'),renderer=new THREE.WebGLRenderer({canvas,antialias:true,preserveDrawingBuffer:true});renderer.setSize(900,1000);renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.95;
const scene=new THREE.Scene();scene.background=new THREE.Color('#101b24');scene.add(new THREE.HemisphereLight(0xc3ddeb,0x182029,1.8));
for(const [color,intensity,x,y,z]of [[0xd7efff,3.6,-3,5,4],[0xffaa70,3,3,2,2],[0x64cbff,2,-3,2,-4]]){const l=new THREE.DirectionalLight(color,intensity);l.position.set(x,y,z);scene.add(l)}
const pmrem=new THREE.PMREMGenerator(renderer),env=pmrem.fromScene(new RoomEnvironment(),.04);scene.environment=env.texture;scene.environmentIntensity=.8;
const floor=new THREE.Mesh(new THREE.CircleGeometry(3,64),new THREE.MeshStandardMaterial({color:0x172831,metalness:.4,roughness:.5}));floor.rotation.x=-Math.PI/2;floor.position.y=-.01;scene.add(floor);
const camera=new THREE.PerspectiveCamera(32,.9,.01,30);camera.position.set(2.6,1.9,-4.6);camera.lookAt(0,1.02,0);
let model,mixer,actions;
window.loadHero=async(name='bastion')=>{if(model)scene.remove(model);const gltf=await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync('/models/'+name+'.glb');model=gltf.scene;scene.add(model);mixer=new THREE.AnimationMixer(model);actions=Object.fromEntries(gltf.animations.map(c=>[c.name.split('|').pop(),mixer.clipAction(c)]));window.clips=Object.keys(actions);window.pose('idle',.3);return {clips:window.clips,bounds:new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3()).toArray(),calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};};
window.pose=(name,time=0,angle=0)=>{mixer.stopAllAction();const a=actions[name];if(name!=='rest'){if(!a)throw Error('Missing clip '+name);a.reset().play();a.paused=true;a.time=time;}model.rotation.y=angle;mixer.update(0);scene.updateMatrixWorld(true);let low=Infinity;model.traverse(o=>{if(o.isSkinnedMesh){const v=new THREE.Vector3();for(let i=0;i<o.geometry.attributes.position.count;i++){o.getVertexPosition(i,v);v.applyMatrix4(o.matrixWorld);low=Math.min(low,v.y)}}});if(name.startsWith('death'))camera.lookAt(0,.25,0);else camera.lookAt(0,1.02,0);renderer.render(scene,camera);return {lowestVertex:low,calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};};
window.ready=true;
