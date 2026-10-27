// BotStrike's original, code-authored production art. The cover is the visual
// reference; these meshes are real 3D assets shared by gameplay and the showroom.
// Decorative surfaces stay within native collision bounds; skyline props stay
// outside the playable area. No scenery changes hit tests or simulation rules.
import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {mergeParts} from './geometry.mjs';

export function createArt(renderer,{mobile=false}={}){
 const materials=[],textures=[],mobileBatches=new Map();
 let seed=2050;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 function texture(paint,size=512){const c=document.createElement('canvas');c.width=c.height=size;paint(c.getContext('2d'),size);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());textures.push(t);return t;}
 const wear=texture((c,s)=>{c.fillStyle='#c4c6c8';c.fillRect(0,0,s,s);for(let i=0;i<7500;i++){const v=150+random()*95|0;c.fillStyle=`rgb(${v},${v},${v})`;const x=random()*s,y=random()*s;c.fillRect(x,y,random()*3+.4,random()*1.4+.3)}for(let i=0;i<340;i++){const x=random()*s,y=random()*s;c.strokeStyle=i%3?'#7c8185':'#242b30';c.lineWidth=.5+random()*1.6;c.beginPath();c.moveTo(x,y);c.lineTo(x+random()*25,y+random()*3);c.stroke()}for(let i=0;i<140;i++){const x=random()*s,y=random()*s;c.fillStyle=i%4?'#39434a':'#82949e';c.beginPath();c.moveTo(x,y);c.lineTo(x+random()*7+1,y+1);c.lineTo(x+random()*4,y+random()*6+1);c.fill()}c.strokeStyle='#45494c';c.lineWidth=3;c.strokeRect(7,7,s-14,s-14);c.strokeStyle='#fff';c.lineWidth=1;c.strokeRect(10,10,s-20,s-20)});
 const floorMap=texture((c,s)=>{c.fillStyle='#27333c';c.fillRect(0,0,s,s);for(let i=0;i<16000;i++){const a=.04+random()*.14;c.fillStyle=`rgba(180,201,211,${a})`;c.fillRect(random()*s,random()*s,1,1)}c.strokeStyle='#1b242b';c.lineWidth=4;c.strokeRect(2,2,s-4,s-4);for(let i=0;i<12;i++){c.fillStyle='#17232c';c.fillRect(17+i*40,23,17,4);c.fillRect(17+i*40,s-27,17,4)}for(let i=0;i<16;i++){c.fillStyle='#6e767c';c.beginPath();c.arc(i%4*128+14,(i/4|0)*128+14,2,0,Math.PI*2);c.fill()}});floorMap.repeat.set(12,12);
 const wet=texture((c,s)=>{const image=c.createImageData(s,s);for(let y=0;y<s;y++)for(let x=0;x<s;x++){const v=Math.max(65,Math.min(235,157+28*Math.sin(x*.027+Math.sin(y*.039)*2)+23*Math.cos(y*.035+Math.sin(x*.021)*3)+12*Math.sin(x*.11+y*.15)));const i=(y*s+x)*4;image.data[i]=image.data[i+1]=image.data[i+2]=v;image.data[i+3]=255}c.putImageData(image,0,0)});wet.repeat.set(5,5);

 function mat(color,opts={}){const m=new THREE.MeshStandardMaterial({color,roughness:.44,metalness:.72,map:wear,bumpMap:wear,bumpScale:.12,...opts,...(mobile?{bumpMap:null}:{} )});materials.push(m);return m;}
 const m={steel:mat('#747e87'),black:mat('#111b24',{roughness:.66}),rubber:mat('#14171d',{metalness:.1,roughness:.88}),silver:mat('#acb5be',{roughness:.27}),warm:mat('#bd7651'),hull:mat('#1d333f'),container:mat('#34464e'),floor:mat('#657983',{map:floorMap,bumpMap:floorMap,bumpScale:.12,roughnessMap:wet,roughness:.85,metalness:.3,envMapIntensity:.2})};
 const colors=['#139fb7','#d3dfd7','#c08b2b','#684e97','#aa346e','#c46122'];
 const armor=colors.map(c=>mat(c));
 const glow=['#47edff','#76ffba','#ffb733','#bc70ff','#ff4dad','#ff8b2b'].map(c=>mat(c,{map:null,bumpMap:null,emissive:c,emissiveIntensity:1.7,roughness:.25,metalness:.15}));
 const team=['#33ccff','#ff7550'].map(c=>mat(c,{map:null,bumpMap:null,emissive:c,emissiveIntensity:2.2}));
 const amber=glow[5],cyan=glow[0];
 const contactTexture=texture((c,s)=>{const g=c.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);g.addColorStop(0,'rgba(0,0,0,.48)');g.addColorStop(.55,'rgba(0,0,0,.2)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,s,s)},64);
 const contactMaterial=new THREE.MeshBasicMaterial({map:contactTexture,transparent:true,depthWrite:false});materials.push(contactMaterial);
 function mesh(root,g,material,x=0,y=0,z=0){const n=new THREE.Mesh(g,material);n.position.set(x,y,z);n.castShadow=!material.isMeshBasicMaterial;n.receiveShadow=true;root.add(n);return n;}
 function plate(root,w,h,d,x,y,z,material=m.steel,r=Math.min(w,h,d)*.13){
  // Faceted hard-surface panels, not inflated toy cubes. Each shell has clipped
  // corners, a narrower lower edge, a bevel catching the key light, and wear UVs.
  if(armor.includes(material)&&w>6&&h>6){const c=Math.min(w,h)*.18,s=new THREE.Shape();s.moveTo(-w/2+c,h/2);s.lineTo(w/2-c,h/2);s.lineTo(w/2,h/2-c);s.lineTo(w*.44,-h/2+c);s.lineTo(w*.3,-h/2);s.lineTo(-w*.3,-h/2);s.lineTo(-w*.44,-h/2+c);s.lineTo(-w/2,h/2-c);s.closePath();const g=new THREE.ExtrudeGeometry(s,{depth:d-.7,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.35,bevelThickness:.35});g.translate(0,0,-(d-.7)/2);const uv=g.getAttribute('uv');for(let i=0;i<uv.count;i++)uv.setXY(i,uv.getX(i)/w+.5,uv.getY(i)/h+.5);return mesh(root,g,material,x,y,z)}
  return mesh(root,new RoundedBoxGeometry(w,h,d,1,Math.min(r,w/3,h/3,d/3)),material,x,y,z)
 }
 function box(root,w,h,d,x,y,z,material){return mesh(root,new THREE.BoxGeometry(w,h,d),material,x,y,z)}
 function cyl(root,r,h,x,y,z,material=m.steel,segments=10){return mesh(root,new THREE.CylinderGeometry(r,r,h,segments),material,x,y,z)}
 function sphere(root,r,x,y,z,material){return mesh(root,new THREE.SphereGeometry(r,10,6),material,x,y,z)}
 function beam(root,a,b,r,material=m.steel){const from=new THREE.Vector3(...a),to=new THREE.Vector3(...b),v=to.clone().sub(from);const n=cyl(root,r,v.length(),...from.add(to).multiplyScalar(.5).toArray(),material,8);n.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize());return n;}
 function cable(root,points,r=.8,material=m.rubber){return mesh(root,new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),12,r,5,false),material)}
 function fin(root,x,y,z,side,material){const s=new THREE.Shape();s.moveTo(0,0);s.lineTo(5*side,9);s.lineTo(11*side,19);s.lineTo(7*side,3);s.closePath();const g=new THREE.ExtrudeGeometry(s,{depth:2,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.4,bevelThickness:.4});return mesh(root,g,material,x,y,z)}
 function bolts(root,w,h,x,y,z){for(const dx of [-1,1])for(const dy of [-1,1]){const n=cyl(root,.65,.45,x+dx*w*.37,y+dy*h*.36,z,m.silver,6);n.rotation.x=Math.PI/2;}}
 function vent(root,w,h,x,y,z){plate(root,w,h,.5,x,y,z,m.black,.1);for(let i=0;i<4;i++)box(root,w*.83,.35,.65,x,y-h*.3+i*h*.2,z-.3,m.steel);}
 function bake(root){root.updateMatrixWorld(true);const inverse=root.matrixWorld.clone().invert(),groups=new Map(),children=[];root.traverse(n=>{if(!n.isMesh)return;const g=n.geometry.clone().applyMatrix4(inverse.clone().multiply(n.matrixWorld));let material=n.material;
  // Keep every authored surface and silhouette; combine its pigment into vertex colors.
  if(mobile&&!material.transparent&&(material.map===wear||!material.map)&&material.isMeshStandardMaterial){const glowing=material.emissiveIntensity>1&&material.emissive?.getHex()!==0,key=glowing?'glow':'metal';if(!mobileBatches.has(key)){const shared=glowing?new THREE.MeshBasicMaterial({vertexColors:true,toneMapped:false}):new THREE.MeshStandardMaterial({vertexColors:true,map:wear,roughness:.58,metalness:.4});mobileBatches.set(key,shared);materials.push(shared)}const colors=new Float32Array(g.attributes.position.count*3),c=material.color;for(let i=0;i<colors.length;i+=3){colors[i]=c.r;colors[i+1]=c.g;colors[i+2]=c.b}g.setAttribute('color',new THREE.BufferAttribute(colors,3));material=mobileBatches.get(key)}
  if(!groups.has(material))groups.set(material,[]);groups.get(material).push(g);children.push(n)});for(const n of children){n.removeFromParent();n.geometry.dispose()}for(const [material,parts]of groups){const g=mergeParts(parts);mesh(root,g,material);parts.forEach(p=>p.dispose())}}

 function rifle(root,kind=2){const gun=new THREE.Group();root.add(gun);const length=[16,24,33,48,30,35,31,43,29,42,26,40][kind];plate(gun,5,6,length,0,0,0,m.black,.7);plate(gun,5.5,2.8,length*.65,0,3.1,2,m.hull,.5);plate(gun,4.5,4,7,0,0,length*.5+3,m.rubber);plate(gun,3,9,5,0,-6,3,m.black,.4).rotation.x=-.22;const magazine=plate(gun,3.3,8,5,0,-6,-5,m.steel,.4);magazine.rotation.x=.12;magazine.name='magazine';
 const barrel=cyl(gun,1.2,12,0,1,-length*.5-5,m.black);barrel.rotation.x=Math.PI/2;const muzzle=cyl(gun,1.9,3,0,1,-length*.5-11,m.steel);muzzle.rotation.x=Math.PI/2;
 for(let i=0;i<7;i++){box(gun,4.9,.6,1,0,5,-length*.3+i*2,m.steel);box(gun,.3,1.2,1.3,2.6,0,-length*.3+i*2,m.silver)}
 box(gun,.2,.5,9,2.85,2,0,cyan);plate(gun,1,2.5,4,3.1,1,7,m.warm,.2);bolts(gun,3,4,0,0,length*.5+.2);
 if(kind===3||kind===9){const scope=cyl(gun,2.6,15,0,9,-2,m.black,14);scope.rotation.x=Math.PI/2;for(const z of [-10,6]){const ring=cyl(gun,3.2,2,0,9,z,m.steel,14);ring.rotation.x=Math.PI/2;}const lens=cyl(gun,2.4,.3,0,9,7.2,glow[3],16);lens.rotation.x=Math.PI/2;beam(gun,[0,4,-6],[0,8,-6],1.2)}else{plate(gun,2.3,2.5,3,0,6.2,-4,m.black,.3);box(gun,1.3,.6,.4,0,7,-2.3,cyan)}
 const energy=glow[[0,0,0,3,5,2,1,5,4,3,1,4][kind]];
 if(kind===5){for(const side of [-1,1])for(let i=0;i<3;i++)plate(gun,1,2,6,side*3.2,2,-9+i*8,i===1?energy:m.steel,.2);plate(gun,7,5,9,0,-2,10,m.hull,.6)}
 if(kind===6||kind===8||kind===11){for(let i=0;i<4;i++){const ring=mesh(gun,new THREE.TorusGeometry(kind===11?4:3,.55,6,16),i%2?m.silver:energy,0,1,-10-i*4);ring.rotation.z=i*.4}for(const side of [-1,1]){plate(gun,2,3,22,side*4,1,-13,m.steel,.5);box(gun,.4,1,16,side*5.1,1,-13,energy)}plate(gun,4,5,8,0,0,9,energy,.5);}
 if(kind===7){plate(gun,12,10,13,0,-4,7,m.black,1);for(const side of [-1,1]){const drum=cyl(gun,6.5,5,side*7,-4,7,m.steel,16);drum.rotation.z=Math.PI/2;}for(let i=0;i<6;i++){const a=i*Math.PI/3,x=Math.cos(a)*3,y=1+Math.sin(a)*3;const tube=cyl(gun,.8,24,x,y,-26,m.black,10);tube.rotation.x=Math.PI/2;}for(const z of [-17,-32]){const collar=cyl(gun,4.4,2,0,1,z,m.steel,16);collar.rotation.x=Math.PI/2;}box(gun,1,1,12,3.5,3,7,energy);}
 if(kind===9){plate(gun,5,2,24,0,-3,-15,m.steel,.3);for(const side of [-1,1])beam(gun,[side*2,-3,-16],[side*5,-12,-23],.65,m.black);}
 if(kind===10){for(const side of [-1,1]){cyl(gun,2,12,side*4,0,3,energy,12);for(const y of [-6,6])cyl(gun,2.4,1.2,side*4,y,3,m.steel,12);cable(gun,[[side*4,6,3],[side*6,8,-5],[side*3,4,-13]],.6,m.black)}plate(gun,6,2,14,0,5,4,m.hull,.4);}
 if(kind===11){for(const side of [-1,1]){plate(gun,3,7,26,side*5,0,-20,m.hull,.6);box(gun,.4,4,21,side*6.6,0,-20,energy);}sphere(gun,4.2,0,1,-9,energy);plate(gun,9,9,12,0,-2,12,m.black,1);}
 if(kind===4){const pump=cyl(gun,2.3,13,0,-3,-12,m.rubber);pump.rotation.x=Math.PI/2;for(let i=0;i<6;i++)box(gun,4.2,.6,.5,0,-5,-17+i*2,m.steel)}return gun;}
 function robot(slot,hero,weapon=hero===3?3:hero===0?1:2){const rig=new THREE.Group(),torso=new THREE.Group(),head=new THREE.Group(),legs=[],arms=[];rig.name=`hero-${hero}-slot-${slot}`;rig.add(torso,head);const paint=armor[hero],light=glow[hero],bulk=hero===2?1.22:hero===0?.83:hero===5?1.08:1;
 // Mechanical spine, suspended abdominal plates and separately bevelled shell.
 cyl(torso,5,24,0,34,1,m.black);for(let i=0;i<4;i++)plate(torso,15*bulk,3,13,0,27+i*4,1,m.steel,.5);
 plate(torso,26*bulk,20,16,0,46,1,m.black,2);for(const side of [-1,1]){const breast=plate(torso,13*bulk,15,5,side*7*bulk,47,-9,paint,1.4);breast.rotation.z=side*-.12;bolts(torso,11*bulk,12,side*8*bulk,47,-12);plate(torso,5,13,12,side*15*bulk,43,1,paint,.8);cable(torso,[[side*12,52,8],[side*16,55,13],[side*18,44,14],[side*12,34,9]],1.15);}
 plate(torso,11,6,3,0,37,-10,paint,.8);vent(torso,9,5,0,44,-12.6);box(torso,8,1,1,0,53,-12,light);plate(torso,22*bulk,8,15,0,31,0,m.black,1);for(const side of [-1,1])plate(torso,9*bulk,8,4,side*6*bulk,31,-8,paint,.7).rotation.z=side*.12;
 plate(torso,20,23,9,0,44,14,m.black,1.4);plate(torso,16,18,2,0,44,19,paint,.7);vent(torso,9,8,0,44,20.3);box(torso,12,2,1,0,53,20.2,team[Math.floor(slot/5)]);
 // Helmet: recessed visor, separate cheek guards, temple disks and neck bearing.
 head.position.y=64;head.scale.setScalar(hero===2?.75:.65);cyl(head,5,7,0,-10,0,m.steel);plate(head,20*bulk,17,18,0,0,0,paint,2);plate(head,19*bulk,8,3,0,0,-9,m.black,.7);plate(head,16*bulk,2.3,1,0,0,-11,light,.3);plate(head,12,5,6,0,-7,-7,m.black,.7);for(const side of [-1,1]){plate(head,3.5,9,5,side*9*bulk,-4,-7,paint,.6);const ear=cyl(head,3.7,3,side*11*bulk,0,0,m.black,12);ear.rotation.z=Math.PI/2;const ring=cyl(head,2.3,3.3,side*11*bulk,0,0,m.steel,12);ring.rotation.z=Math.PI/2;bolts(head,17*bulk,14,0,0,9.2)}
 plate(head,11,2,9,0,9,0,m.steel,.4);for(const side of [-1,1]){plate(head,2,5,4,side*7,-5,-10,m.steel,.3).rotation.z=side*.25;const pin=cyl(head,.7,.4,side*6,6,-9.7,m.silver,6);pin.rotation.x=Math.PI/2;}
 if(hero===0){for(const side of [-1,1]){fin(head,side*8,5,0,side,paint);fin(torso,side*16,49,5,side,paint);plate(torso,4,19,15,side*14,44,13,m.black,.6);box(torso,2,8,1,side*14,47,21,light)}}
 if(hero===1){for(const side of [-1,1]){plate(torso,7,24,9,side*9,43,18,paint,1.2);box(torso,2,13,1,side*9,44,23,light)}box(torso,3,10,1,0,48,-13,light);box(torso,9,3,1,0,48,-13.2,light);}
 if(hero===2){plate(torso,34,8,22,0,55,1,paint,1.4);for(const side of [-1,1]){plate(torso,16,16,25,side*23,52,0,paint,2);plate(torso,15,7,22,side*23,43,0,m.steel,1);bolts(torso,13,12,side*23,52,-13);cable(torso,[[side*14,57,2],[side*19,64,8],[side*25,59,10],[side*27,50,8]],1.4)}}
 if(hero===3){plate(head,21,12,5,0,1,-10,m.black,1);const eye=cyl(head,5,3,5,1,-13,m.steel,16);eye.rotation.x=Math.PI/2;const lens=cyl(head,3.7,3.4,5,1,-13,light,18);lens.rotation.x=Math.PI/2;plate(head,6,3,2,-6,0,-13,light,.5);beam(torso,[-9,47,17],[-9,77,17],1.2,m.black);plate(torso,4,18,4,-9,68,17,paint,.5);}
 if(hero===4){for(const side of [-1,1]){beam(head,[side*8,5,0],[side*10,25,1],.7,m.steel);box(head,1,6,1,side*10,23,1,light)}plate(torso,9,10,2,0,45,-13,m.black,.5);for(let i=0;i<3;i++)box(torso,6,.6,.5,0,42+i*2,-14.2,light);}
 if(hero===5){for(const side of [-1,1]){cyl(torso,4.4,29,side*10,49,17,m.black,14);for(const y of [36,45,58,63])cyl(torso,5.2,2,side*10,y,17,y===58?light:m.steel,14);cyl(torso,3.5,6,side*10,63,17,light,14);cable(torso,[[side*10,34,17],[side*16,29,17],[side*17,35,9]],1.2)}}
 for(const side of [-1,1]){
  const leg=new THREE.Group();leg.position.set(side*7.5,31,0);rig.add(leg);sphere(leg,4.2,0,-1,0,m.black);beam(leg,[0,-2,0],[0,-13,0],2,m.silver);plate(leg,9*bulk,14,10,0,-8,0,paint,1);const knee=cyl(leg,3.7,12*bulk,0,-17,0,m.black);knee.rotation.z=Math.PI/2;plate(leg,8*bulk,6,3,0,-17,-6,paint,.6);plate(leg,7*bulk,13,8,0,-24,0,paint,.7);beam(leg,[side*4,-17,2],[side*4,-29,2],.8,m.silver);plate(leg,10*bulk,5,17,0,-30,-4,m.black,.8);plate(leg,9*bulk,3,10,0,-28,-7,paint,.7);box(leg,5,.8,.5,0,-22,-5,light);for(const sidePanel of [-1,1]){plate(leg,2,11,6,sidePanel*4.2,-8,0,m.black,.4);beam(leg,[sidePanel*3.6,-19,2],[sidePanel*3.6,-28,2],.65,m.silver);}for(let toe=0;toe<3;toe++)plate(leg,2.2,2,5,-2.5+toe*2.5,-28.6,-11,paint,.3);bake(leg);legs.push(leg);
  const shoulder=[side*(hero===2?25:18)*bulk,49,0],elbow=[side*16*bulk,34,-15],hand=side===1?[0,34,-21]:[0,35,-31];
  sphere(torso,4.2,...shoulder,m.black);const cap=plate(torso,11*bulk,8,14,...shoulder,paint,1);cap.rotation.z=side*-.18;
  function segment(from,to,w,d){const v=new THREE.Vector3(...to).sub(new THREE.Vector3(...from)),length=v.length(),part=new THREE.Group();part.position.fromArray(from);part.quaternion.setFromUnitVectors(new THREE.Vector3(0,-1,0),v.normalize());torso.add(part);cyl(part,2,length,0,-length/2,0,m.silver);plate(part,w,Math.min(13,length*.7),d,0,-length*.48,-1,paint,.6);beam(part,[w*.45,-2,2],[w*.45,-length+2,2],.8,m.silver);vent(part,w*.65,4,0,-length*.4,-d*.5-1.4);return part;}
  segment(shoulder,elbow,7*bulk,8);sphere(torso,3.5,...elbow,m.black);segment(elbow,hand,8*bulk,9);
  const palm=new THREE.Group();palm.position.fromArray(hand);torso.add(palm);plate(palm,6,4,6,0,0,0,m.black,.6);plate(palm,5,1.3,5,0,2,0,paint,.3);for(let finger=0;finger<4;finger++){const x=-2.1+finger*1.4;plate(palm,1.1,3,2,x,-2,-2.5,m.steel,.2);plate(palm,1.1,1.3,3,x,-3.7,-1.4,m.black,.2);}plate(palm,1.4,3.5,2,3,-1,0,m.steel,.3);

 }
 const gun=rifle(torso,weapon);gun.position.set(0,40,-24);gun.rotation.x=0;gun.rotation.y=0;
 bake(torso);bake(head);rig.traverse(n=>{n.castShadow=false});const contact=mesh(rig,new THREE.PlaneGeometry(48*bulk,44),contactMaterial,0,.24,0);contact.rotation.x=-Math.PI/2;contact.castShadow=false;return {rig,torso,head,legs,hero,slot,weapon};
 }
 function gun(kind,hero=0){const group=new THREE.Group(),g=rifle(group,kind);g.scale.setScalar(1.1);for(const side of [-1,1]){plate(group,6,6,15,side===1?4:-5,-9,side===1?10:-3,armor[hero],1);plate(group,5,5,7,side===1?3:-4,-6,side===1?5:-9,m.black,.6)}bake(group);group.traverse(n=>{n.castShadow=false});group.position.set(9,-9,-23);group.scale.setScalar(.55);return group}
 function equipment(kind){const root=new THREE.Group(),light=glow[[2,0,3,5,4,3,1,2,0,5,1,0][kind]];
 if(kind===0){for(const side of [-1,1])plate(root,11,23,4,side*5.8,0,0,armor[2],1);plate(root,18,8,5,0,-12,0,m.black,1);for(const side of [-1,1]){bolts(root,8,18,side*6,0,-2.4);box(root,6,.6,.3,side*6,6,-2.7,light)}}
 else if(kind===6||kind===11){cyl(root,4,21,0,0,0,m.black,16);cyl(root,3.4,15,0,0,0,light,16);for(const y of [-11,10])cyl(root,4.5,3,0,y,0,m.steel,16);for(const side of [-1,1])plate(root,2,17,3,side*3.6,0,0,m.hull,.4);if(kind===6){cyl(root,.4,7,0,-16,0,m.silver,8);plate(root,12,2,4,0,13,0,m.black,.3)}else{for(const side of [-1,1])cyl(root,1,5,side*2.2,13,0,m.silver,8)}}
 else if(kind===7||kind===8||kind===9){plate(root,15,19,4,0,0,0,m.black,.8);plate(root,12,16,1,0,0,-2.6,kind===7?armor[2]:m.hull,.3);for(let i=0;i<4;i++){box(root,8,.7,.5,0,-5+i*3,-3.3,light);for(const side of [-1,1])box(root,2,1.2,2,side*8,-6+i*4,0,m.silver)}bolts(root,12,16,0,0,-3);}
 else if(kind===5||kind===10){plate(root,13,6,13,0,0,0,m.hull,1);sphere(root,4,0,4,0,light);for(const side of [-1,1]){beam(root,[side*4,0,0],[side*12,-5,side*7],1.2,m.steel);plate(root,7,2,8,side*12,-5,side*7,m.black,.4);beam(root,[side*4,0,0],[side*12,-5,-side*7],1.2,m.steel);plate(root,7,2,8,side*12,-5,-side*7,m.black,.4)}beam(root,[0,5,0],[0,18,0],.7,m.steel);sphere(root,1.2,0,18,0,light)}
 else{cyl(root,5,18,0,0,0,m.black,12);for(const y of [-9,-4,4,9])cyl(root,5.4,1.3,0,y,0,y===-4||y===4?light:m.steel,12);for(let i=0;i<6;i++){const a=i*Math.PI/3;plate(root,2.1,12,2.1,Math.cos(a)*4.6,0,Math.sin(a)*4.6,m.hull,.4)}plate(root,5,4,5,0,11,0,m.steel,.4);beam(root,[2,12,0],[6,6,0],.8,m.silver)}
 bake(root);return root;}
 function weaponModel(kind){const root=new THREE.Group(),rifleRoot=rifle(root,kind),magazine=rifleRoot.getObjectByName('magazine');magazine?.removeFromParent();bake(root);if(magazine){root.add(magazine);root.userData.magazineName='magazine';}return root;}
 function sign(text,color='#8deaff',width=512,height=128){const c=document.createElement('canvas');c.width=width;c.height=height;const ctx=c.getContext('2d');ctx.fillStyle='#09141c';ctx.fillRect(0,0,width,height);ctx.fillStyle=color;ctx.font='700 54px monospace';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,width/2,height/2);ctx.globalAlpha=.6;ctx.fillRect(10,10,width-20,3);ctx.fillRect(10,height-13,width-20,3);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;textures.push(t);const material=new THREE.MeshStandardMaterial({map:t,emissiveMap:t,emissive:color,emissiveIntensity:1.3,roughness:.5,metalness:.1,side:THREE.DoubleSide});materials.push(material);return material;}
 function panel(root,text,x,y,z,w=100,h=24,color='#85eaff',ry=0){const n=mesh(root,new THREE.PlaneGeometry(w,h),sign(text,color),x,y,z);n.rotation.y=ry;return n;}
 for(const key of ['metal','glow'])if(mobile&&!mobileBatches.has(key)){const shared=key==='glow'?new THREE.MeshBasicMaterial({vertexColors:true,toneMapped:false}):new THREE.MeshStandardMaterial({vertexColors:true,map:wear,roughness:.58,metalness:.4});mobileBatches.set(key,shared);materials.push(shared)}
 const mapMaterialStart=materials.length,mapTextureStart=textures.length;
 function dressMap(root,map,id){for(const material of materials.splice(mapMaterialStart))material.dispose();for(const t of textures.splice(mapTextureStart))t.dispose();seed=2050+id;const e=map.extent;
 // Traversable ground remains perfectly flat. The material carries all grooves,
 // paint wear and puddles; no invisible steps or decorative collision volumes.
 box(root,e*2+40,10,e*2+40,0,-5,0,m.floor);
 for(let z=-e+80;z<e;z+=160){for(const side of [-1,1]){box(root,35,.18,5,side*(e-65),.12,z,m.warm);box(root,35,.18,5,side*(e-65),.12,z+16,m.warm)}}
 map.obstacles.forEach((o,index)=>{const w=o.max[0]-o.min[0],h=o.max[1],d=o.max[2]-o.min[2],x=(o.min[0]+o.max[0])/2,z=(o.min[2]+o.max[2])/2;
  box(root,w,h,d,x,h/2,z,id===2?m.hull:m.container);
  for(const side of [-1,1]){const face=z+side*(d/2+.08);for(let px=-w/2+8;px<w/2-5;px+=16){box(root,2.5,h-12,.6,x+px,h/2,face,m.steel)}box(root,w-8,5,.8,x,5,face,m.black);box(root,w-8,4,.8,x,h-4,face,m.black);box(root,w-16,1.3,1,x,h-10,face, index%3?cyan:amber);
   const p=panel(root,`${id===0?'NDC':id===1?'SKY':'RX9'} / ${String(index+1).padStart(2,'0')}`,x,h*.59,face+side*.7,Math.min(w*.55,98),Math.min(23,h*.24),index%3?'#8be7f1':'#ffb56f',side<0?Math.PI:0);
   for(const sx of [-1,1])box(root,4,Math.min(24,h*.3),1,x+sx*(w*.5-12),h*.3,face,m.warm);
  }
  for(const side of [-1,1]){const fx=x+side*(w/2+.1);for(let pz=-d/2+12;pz<d/2-5;pz+=22)box(root,.6,h-12,2.5,fx,h/2,z+pz,m.black);box(root,1,1.3,d-12,fx,h-10,z,cyan)}
  for(let px=-w/2+12;px<w/2-4;px+=24)box(root,2,.5,d-8,x+px,h+.1,z,m.black);
 });
 // Railings sit on the solid perimeter; the harbour and catwalks beyond cannot
 // be reached by players. Every route and sight line inside is native-authored.
 for(const side of [-1,1]){box(root,e*2,100,20,0,50,side*(e+10),m.hull);box(root,20,100,e*2,side*(e+10),50,0,m.hull);for(let p=-e;p<=e;p+=100){beam(root,[p,104,side*(e+10)],[p,136,side*(e+10)],2);beam(root,[side*(e+10),104,p],[side*(e+10),136,p],2)}beam(root,[-e,137,side*(e+10)],[e,137,side*(e+10)],2);beam(root,[side*(e+10),137,-e],[side*(e+10),137,e],2);box(root,e*2,2,2,0,101,side*(e-1),cyan);box(root,2,2,e*2,side*(e-1),101,0,cyan)}
 // Dense, individually articulated skyline instead of repeated unlit columns.
 for(let i=0;i<62;i++){const a=i*2.39996,r=e+330+(i%4)*360,x=Math.sin(a)*r,z=Math.cos(a)*r,w=110+random()*150,d=100+random()*130,h=260+random()*1300;
  box(root,w,h,d,x,h/2-90,z,m.hull);box(root,w*.7,50,d*.7,x,h-70,z,m.black);beam(root,[x,h-50,z],[x,h+60+random()*100,z],2,m.steel);sphere(root,3,x,h+65,z,i%3?amber:cyan);
  for(let y=25;y<h-110;y+=26){for(let j=-w/2+10;j<w/2-8;j+=18){if(random()>.35){mesh(root,new THREE.PlaneGeometry(7,9),random()>.77?amber:cyan,x+j,y,z-d/2-.4).rotation.y=Math.PI;mesh(root,new THREE.PlaneGeometry(7,9),random()>.77?amber:cyan,x+j,y,z+d/2+.4)}}}
  for(let j=-d/2+10;j<d/2-8;j+=21)box(root,.5,h*.6,2,x+w/2+.3,h*.4,z+j,i%3?m.steel:cyan);
  if(i%7===0){const ring=mesh(root,new THREE.TorusGeometry(w*.7,2,5,32),cyan,x,h*.7,z);ring.rotation.x=Math.PI/2;box(root,8,h*.3,8,x+w*.5,h*.6,z,amber)}
 }
 // Hero port: freight gantries, suspension stays, industrial service decks.
 if(id===0){for(const side of [-1,1]){const x=side*(e+190);for(const z of [-700,700]){for(const dx of [-65,65]){beam(root,[x+dx,-45,z],[x+dx,530,z],12,m.steel);beam(root,[x-65,0,z],[x+65,260,z],5,m.steel);beam(root,[x+65,260,z],[x-65,510,z],5,m.steel)}box(root,500,22,30,x+side*140,535,z,m.container);for(let p=-100;p<=300;p+=55){beam(root,[x+side*p,535,z],[x+side*(p+55),585,z],3,m.steel);beam(root,[x+side*p,585,z],[x+side*(p+55),535,z],3,m.steel)}beam(root,[x-100,585,z],[x+450,585,z],4,m.steel);beam(root,[x+side*180,535,z],[x+side*180,200,z],1.1,m.black);box(root,34,15,12,x+side*180,193,z,amber)}
   for(let z=-1000;z<1100;z+=180){box(root,150,50,130,x,-25,z,m.container);for(let dx=-60;dx<=60;dx+=15)box(root,2,46,132,x+dx,-25,z,m.steel)}
  }panel(root,'NEON DOCKS  /  07',0,185,-e-14,420,44,'#ffaa67');
 }else if(id===1){for(const side of [-1,1]){for(const z of [-600,300,900]){const x=side*(e+150);cyl(root,70,280,x,60,z,m.steel,20);for(const y of [60,140,220]){const ring=mesh(root,new THREE.TorusGeometry(110,3,6,32),cyan,x,y,z);ring.rotation.x=Math.PI/2}beam(root,[x,-70,z],[x,520,z],4,m.steel);sphere(root,6,x,530,z,amber)}box(root,170,e*.12,e*2,side*(e+300),-80,0,m.hull)}panel(root,'SKYLINE ARRAY',0,190,-e-14,400,48,'#bba2ff');
 }else{for(const side of [-1,1]){for(const x of [-e-160,e+160]){cyl(root,100,420,x,140,side*550,m.hull,24);for(const y of [0,120,240,350])cyl(root,105,8,x,y,side*550,amber,24);cable(root,[[x,340,side*550],[x,460,side*550],[0,460,side*(e+160)]],15,m.steel)}}panel(root,'REACTOR NINE',0,200,-e-14,400,48,'#ffb060');}
 for(let i=0;i<2;i++){const s=map.sites[i],ring=mesh(root,new THREE.RingGeometry(112,115,48),i?amber:cyan,s[0],.35,s[2]);ring.rotation.x=-Math.PI/2;}
 bake(root);root.updateMatrixWorld(true);root.traverse(n=>{n.matrixAutoUpdate=false;if(n.material?.emissiveIntensity>1)n.castShadow=false});
 }
 function dispose(){materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose())}
 return {m,armor,glow,team,robot,gun,equipment,weaponModel,sign,dressMap,plate,beam,bake,dispose};
}

export function createAtmosphere(scene,e=2400,{mobile=false}={}){
 const sky=new THREE.Mesh(new THREE.SphereGeometry(8000,24,12),new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:{},vertexShader:`varying vec3 vPos;void main(){vPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`varying vec3 vPos;float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}void main(){vec3 d=normalize(vPos);float h=max(d.y,0.);vec2 p=d.xz/(.4+h)*4.;float n=noise(p)*.5+noise(p*2.)*.25+noise(p*4.)*.125;vec3 c=mix(vec3(.055,.12,.17),vec3(.006,.014,.029),pow(h,.5));c+=n*vec3(.045,.065,.075)*smoothstep(.0,.2,h);c+=pow(max(0.,1.-abs(d.x+.6)*1.1),7.)*.025*vec3(1.,.45,.2);gl_FragColor=vec4(c,1.);}` }));if(mobile)sky.material.fragmentShader='varying vec3 vPos;void main(){float h=max(normalize(vPos).y,0.);gl_FragColor=vec4(mix(vec3(.055,.12,.17),vec3(.006,.014,.029),sqrt(h)),1.); }';sky.frustumCulled=false;scene.add(sky);
 let seed=99;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};const p=new Float32Array(1800*3);for(let i=0;i<p.length;i+=3){p[i]=(rand()-.5)*e*2;p[i+1]=rand()*650;p[i+2]=(rand()-.5)*e*2}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(p,3));const material=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{time:{value:0}},vertexShader:`uniform float time;varying float alpha;void main(){vec3 p=position;p.y=mod(p.y-time*280.,650.);vec4 mv=modelViewMatrix*vec4(p,1.);alpha=clamp(1.-length(mv.xyz)/2800.,0.,1.)*.2;gl_PointSize=clamp(1100./-mv.z,1.,3.);gl_Position=projectionMatrix*mv;}`,fragmentShader:`varying float alpha;void main(){gl_FragColor=vec4(.55,.8,.92,alpha);}`});const rain=new THREE.Points(g,material);rain.frustumCulled=false;scene.add(rain);
 return {frame(now,reduced,low){rain.visible=!mobile&&!reduced&&!low;material.uniforms.time.value=now/1000},dispose(){scene.remove(sky,rain);sky.geometry.dispose();sky.material.dispose();g.dispose();material.dispose()}};
}
