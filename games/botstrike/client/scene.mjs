import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {createArt,createAtmosphere} from './art-direction.mjs';
import {createCharacters} from './characters.mjs';
import {scopeFov} from './preferences.mjs';
import {FeedbackCursor} from './preferences.mjs';
import {createTeamSignals} from './team-signals.mjs';
import {mergeParts} from './geometry.mjs';

const metal=(color,emissive=0)=>new THREE.MeshStandardMaterial({color,roughness:.55,metalness:.55,emissive,emissiveIntensity:1.6});
export function createWorld(canvas,spec){
 const mobile=matchMedia('(pointer:coarse)').matches;
 const renderer=new THREE.WebGLRenderer({canvas,antialias:false,powerPreference:'high-performance'});renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.shadowMap.enabled=true;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.type=mobile?THREE.BasicShadowMap:THREE.PCFShadowMap;
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(80,1,.5,9000);camera.rotation.order='YXZ';scene.add(camera);scene.add(new THREE.HemisphereLight(0xc9e7f2,0x7b8174,1.4));const sun=new THREE.DirectionalLight(0xffe3bc,2.2);sun.position.set(-800,1400,500);scene.add(sun);sun.castShadow=true;sun.shadow.mapSize.set(mobile?512:1024,mobile?512:1024);sun.shadow.normalBias=1.2;sun.shadow.bias=-.0001;let env;function restoreEnvironment(){env?.dispose();const pmrem=new THREE.PMREMGenerator(renderer),environment=new RoomEnvironment();env=pmrem.fromScene(environment,.05);scene.environment=env.texture;scene.environmentIntensity=.75;environment.dispose();pmrem.dispose();renderer.shadowMap.needsUpdate=true;}
 let contextLost=false,disposed=false;function lost(){contextLost=true;}function restored(){if(disposed)return;restoreEnvironment();contextLost=false;resize();}canvas.addEventListener('webglcontextlost',lost);canvas.addEventListener('webglcontextrestored',restored);restoreEnvironment();
 const floor=metal('#162536'),dark=metal('#121922'),edge=metal('#607187'),body=metal('#253849'),white=metal('#c2ccdb');const heroMaterials=spec.heroes.map(h=>metal(h.color,h.color));const teamMaterials=[metal('#26dfff','#26dfff'),metal('#ff7e5d','#ff7e5d')];
 function box(parent,w,h,d,x,y,z,mat){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 function cylinder(parent,r,h,x,y,z,mat){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,12),mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 function label(text,color='#8ae6ff',width=512,height=128){const c=document.createElement('canvas');c.width=width;c.height=height;const ctx=c.getContext('2d');ctx.fillStyle='#08121f';ctx.fillRect(0,0,width,height);ctx.strokeStyle=color;ctx.lineWidth=5;ctx.strokeRect(8,8,width-16,height-16);ctx.font='bold 56px monospace';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=color;ctx.fillText(text,width/2,height/2);const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;return new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide});}
 function consolidate(group){const batches=new Map();for(const m of [...group.children])if(m.isMesh){m.updateMatrix();const g=m.geometry.clone().applyMatrix4(m.matrix);if(!batches.has(m.material))batches.set(m.material,[]);batches.get(m.material).push(g);group.remove(m);m.geometry.dispose();}for(const [material,parts]of batches){const merged=new THREE.Mesh(mergeParts(parts),material);merged.castShadow=true;merged.receiveShadow=true;group.add(merged);parts.forEach(g=>g.dispose());}}
 const art=createArt(renderer,{mobile}),atmosphere=createAtmosphere(scene,2400,{mobile}),bots=[];
 const rim=new THREE.DirectionalLight(0x8ddae3,.9);rim.position.set(900,700,-1100);scene.add(rim);
 const signals=createTeamSignals(scene);const characters=createCharacters(art);let firstPerson=null;
 function robot(slot,hero,weapon){const bot=characters.actor(slot,hero,weapon);bot.rig.name=`hero-${hero}-slot-${slot}`;scene.add(bot.rig);return bot;}
 function viewModel(player){if(firstPerson?.hero!==player.hero){firstPerson?.dispose();firstPerson=characters.actor(player.slot,player.hero,player.weapon,{firstPerson:true});firstPerson.rig.scale.setScalar(.8);camera.add(firstPerson.rig);}return firstPerson;}
 const flash=new THREE.PointLight(0x80eaff,0,160,2);flash.visible=!mobile;camera.add(flash);flash.position.set(5,-4,-30);
 let staticRoot=new THREE.Group(),mapId=-1,ratio=.75,fov=80;scene.add(staticRoot);const generatedMaterials=[];
 function disposeStatic(){staticRoot.traverse(m=>m.geometry?.dispose());scene.remove(staticRoot);for(const m of generatedMaterials){m.map?.dispose();m.dispose()}generatedMaterials.length=0;staticRoot=new THREE.Group();scene.add(staticRoot);}
 function setMap(id){if(mapId===id)return;mapId=id;disposeStatic();const map=spec.maps[id],e=map.extent;Object.assign(sun.shadow.camera,{left:-e,right:e,top:e,bottom:-e,near:1,far:5000});sun.shadow.camera.updateProjectionMatrix();scene.background=new THREE.Color(map.colors[0]);scene.fog=new THREE.FogExp2(map.colors[0],.00012);atmosphere.setMap(id);art.dressMap(staticRoot,map,id);renderer.shadowMap.needsUpdate=true;}
 const utilities=[];for(let i=0;i<40;i++){const material=mobile?new THREE.MeshBasicMaterial({color:'#b4c1d8',transparent:true,opacity:.93,depthWrite:false}):new THREE.MeshStandardMaterial({color:'#b4c1d8',transparent:true,opacity:.93,roughness:1,depthWrite:false});const mesh=new THREE.Mesh(new THREE.SphereGeometry(1,12,8),material);mesh.visible=false;scene.add(mesh);utilities.push(mesh)}
 const objective=new THREE.Group();box(objective,20,10,16,0,5,0,dark);box(objective,14,2,10,0,11,0,heroMaterials[4]);scene.add(objective);
 const trails=[];for(let n=0;n<32;n++){const mesh=new THREE.Mesh(new THREE.CylinderGeometry(.6,.6,1,4),new THREE.MeshBasicMaterial({color:'#baf6ff',transparent:true,opacity:.6}));mesh.visible=false;scene.add(mesh);trails.push({mesh,until:0})}let trailIndex=0,shotUntil=0,recoilAt=-Infinity,impactAt=-Infinity;
 function shoot(slot,player,now){const d=new THREE.Vector3(-Math.sin(player.yaw)*Math.cos(player.pitch),Math.sin(player.pitch),-Math.cos(player.yaw)*Math.cos(player.pitch));const t=trails[trailIndex++%trails.length];t.mesh.position.set(player.position[0],player.position[1]+50,player.position[2]).addScaledVector(d,130);t.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d);t.mesh.scale.y=230;t.until=now+55;t.mesh.visible=true;if(slot===localSlot){shotUntil=now+40;recoilAt=now;firstPerson?.trigger('fire',now);}else bots[slot]?.trigger('fire',now);}
 let localSlot=0,roomId=null,motionCursor=new FeedbackCursor();
 function accept(room){if(!room?.state)return;const now=performance.now();if(room.id!==roomId){motionCursor=new FeedbackCursor();roomId=room.id;}
  for(const e of motionCursor.consume(room.feedback,room.state.tick)){
   if(room.state.tick-e.tick>32)continue;
   if(e.kind==='motion'){const p=room.state.players[e.actor];if(!p||p.hidden||p.life!==e.life)continue;
    if(e.action==='fire'){if(e.actor!==room.slot)shoot(e.actor,p,now);}
    else {bots[e.actor]?.trigger(e.action,now,e.action==='reload'?p.reload/64:undefined,e.value);if(e.actor===room.slot)firstPerson?.trigger(e.action,now,e.action==='reload'?p.reload/64:undefined,e.value);}
    if(e.action==='hit'){sparks(p,now);if(e.actor===room.slot)impactAt=now;}
   }
  }
 }
 const sparkPositions=new Float32Array(32*3),sparkGeometry=new THREE.BufferGeometry();sparkGeometry.setAttribute('position',new THREE.BufferAttribute(sparkPositions,3));
 const sparkMaterial=new THREE.PointsMaterial({color:0xffd580,size:2,sizeAttenuation:true,transparent:true,depthWrite:false,opacity:0});const sparkCloud=new THREE.Points(sparkGeometry,sparkMaterial);sparkCloud.frustumCulled=false;scene.add(sparkCloud);let sparkOrigin=null,sparkAt=0;
 function sparks(player,now){sparkOrigin=[player.position[0],player.position[1]+(player.crouch?32:46),player.position[2]];sparkAt=now;}
const positions=Array.from({length:10},()=>new THREE.Vector3());
 function frame(state,slot,now,dt,{active=false,yaw=0,pitch=0,local=null,spectator=null,reduced=false,weapon=0}={}){if(contextLost||disposed)return;localSlot=slot;if(state){const me=state.players[slot],chosen=state.players[spectator],viewing=me.alive?me:chosen?.alive&&chosen.team===me.team?chosen:state.players.find(p=>p.team===me.team&&p.alive);setMap(state.config.map);for(const p of state.players){let bot=bots[p.slot];if(!bot)continue;if(!p.hidden&&bot.hero!==p.hero){bot.dispose();bot=bots[p.slot]=robot(p.slot,p.hero,p.weapon);}
 const shown=!p.hidden&&!!p.position&&(!active||p.slot!==viewing?.slot);bot.rig.visible=shown;if(!shown)continue;
 bot.setAlly(p.team===me.team);bot.rig.position.copy(positions[p.slot].fromArray(p.position));bot.rig.rotation.y=p.yaw;const motion=bot.update(p,state,now,dt,{reduced});if(!p.alive&&now-motion.deadAt>5000)bot.rig.visible=false;}

 for(let i=0;i<utilities.length;i++){const u=state.utilities[i],mesh=utilities[i];mesh.visible=!!u;if(!u)continue;mesh.position.fromArray(u.position);mesh.scale.setScalar(u.kind===2&&u.fuse===0?175:6);mesh.material.opacity=u.kind===2&&u.fuse===0?Math.min(.93,u.life/64):u.fuse===0?.12:1;mesh.material.color.set(spec.items[u.kind]?.color||'#b4c1d8');if(u.fuse===0&&u.kind===5)mesh.scale.set(450,3,450);if(u.fuse===0&&u.kind===10)mesh.scale.set(220,3,220);}
 objective.visible=!state.objective.hidden&&!!state.objective.position&&state.config.mode==='demolition'&&(state.objective.planted||state.objective.carrier===null);if(state.objective.position)objective.position.fromArray(state.objective.position);

 if(active&&me.alive){camera.position.fromArray(local||me.position);camera.position.y+=me.crouch?37:56;camera.rotation.set(pitch,yaw,0,'YXZ');}else if(active){if(viewing){camera.position.fromArray(viewing.position);camera.position.y+=viewing.crouch?37:56;camera.rotation.set(viewing.pitch,viewing.yaw,0,'YXZ')}else{camera.position.set(0,700,900);camera.lookAt(0,0,0)}}else{const a=reduced?.6:now*.000035;camera.position.set(Math.sin(a)*spec.maps[mapId].extent*.8,400,Math.cos(a)*spec.maps[mapId].extent*.8);camera.lookAt(0,40,0)}
 if(firstPerson)firstPerson.rig.visible=false;if(active&&viewing?.alive){const arms=viewModel(viewing);arms.rig.visible=!viewing.scoped;const kick=reduced?0:Math.exp(-Math.max(0,now-recoilAt)/65),hurt=reduced?0:Math.exp(-Math.max(0,now-impactAt)/100);arms.rig.position.set(0,(viewing.crouch?-39:-56)*.8-5,-10+kick*1.2);arms.update({...viewing,pitch:0},state,now,dt,{reduced});camera.rotation.x+=kick*.009;camera.rotation.z+=hurt*.012;}

 const nextFov=viewing?.scoped&&active?scopeFov(spec.weapons[viewing.weapon]):fov;if(camera.fov!==nextFov){camera.fov=nextFov;camera.updateProjectionMatrix();}
 signals.update(state,viewing,camera,innerHeight,active,spec.maps[mapId]);
 }else{signals.hide();setMap(mapId<0?0:mapId);bots.forEach(b=>b.rig.visible=false);if(firstPerson)firstPerson.rig.visible=false;const a=reduced?.6:now*.00004;camera.position.set(Math.sin(a)*1000,400,Math.cos(a)*1000);camera.lookAt(0,30,0);}
 if(sparkOrigin&&!reduced){const age=(now-sparkAt)/1000;sparkMaterial.opacity=Math.max(0,1-age/.25);if(age<.25){for(let i=0;i<32;i++){const angle=i*2.39996,speed=30+(i%7)*11;sparkPositions[i*3]=sparkOrigin[0]+Math.cos(angle)*age*speed;sparkPositions[i*3+1]=sparkOrigin[1]+(20+(i%5)*15)*age-180*age*age;sparkPositions[i*3+2]=sparkOrigin[2]+Math.sin(angle)*age*speed;}sparkGeometry.attributes.position.needsUpdate=true;}}else sparkMaterial.opacity=0;
 atmosphere.frame(now,reduced,ratio<1);flash.intensity=reduced?0:now<shotUntil?150:0;for(const t of trails)if(t.until<now)t.mesh.visible=false;renderer.render(scene,camera);
 }
 function resize(nextFov=fov){fov=nextFov;const w=innerWidth,h=innerHeight;renderer.setPixelRatio(Math.min(ratio,Math.sqrt((mobile?1280*720:2560*1440)/(w*h))));renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=fov;camera.updateProjectionMatrix();}
 function exposure(value){renderer.toneMappingExposure=1.05*value;}
 function resolution(value){ratio=Math.min(value,mobile?1:1.5);resize()}
 function dispose(){disposed=true;signals.dispose();firstPerson?.dispose();for(const bot of bots)bot.dispose();characters.dispose();canvas.removeEventListener('webglcontextlost',lost);canvas.removeEventListener('webglcontextrestored',restored);atmosphere.dispose();art.dispose();scene.traverse(n=>{n.geometry?.dispose();if(n.material){for(const m of Array.isArray(n.material)?n.material:[n.material]){m.map?.dispose();m.dispose()}}});env.dispose();renderer.dispose();}
 async function preload(progress){await characters.preload(progress).catch(error=>{error.asset=true;throw error;});for(let i=0;i<10;i++)bots.push(robot(i,i%6));for(const b of bots){b.rig.position.fromArray(spec.maps[0].spawns[Math.floor(b.slot/5)][b.slot%5]);}camera.position.set(0,400,900);camera.lookAt(0,30,0);const arms=viewModel({slot:0,hero:0,weapon:2});arms.rig.position.set(0,-49,-10);await renderer.compileAsync(scene,camera);arms.rig.visible=false;renderer.render(scene,camera);await new Promise(requestAnimationFrame);}
 setMap(0);resize();return{preload,renderer,scene,camera,setMap,frame,resize,resolution,exposure,dispose,shoot,accept,get viewModelTriangles(){return firstPerson?.armTriangles||0}};
}
