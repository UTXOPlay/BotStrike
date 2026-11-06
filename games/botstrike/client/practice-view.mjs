import * as THREE from 'three';
export function practiceView(scene){
 const positions=new Float32Array(128*3),colors=new Float32Array(128*3),g=new THREE.BufferGeometry();
 g.setAttribute('position',new THREE.BufferAttribute(positions,3));g.setAttribute('color',new THREE.BufferAttribute(colors,3));g.setDrawRange(0,0);
 const points=new THREE.Points(g,new THREE.PointsMaterial({size:4,sizeAttenuation:true,vertexColors:true}));points.frustumCulled=false;scene.add(points);
 const lineG=new THREE.BufferGeometry(),lineP=new Float32Array(65*3);lineG.setAttribute('position',new THREE.BufferAttribute(lineP,3));lineG.setDrawRange(0,0);
 const line=new THREE.Line(lineG,new THREE.LineBasicMaterial({color:0xffcc79,transparent:true,opacity:.7}));line.frustumCulled=false;scene.add(line);
 let lastTick=-1,lastAttempt=-1;
 return {update(s){
  points.visible=line.visible=!!s;
  if(!s){lastTick=-1;return;}
  if(s.episode_tick===lastTick&&s.attempt===lastAttempt)return;lastTick=s.episode_tick;lastAttempt=s.attempt;
  const marks=s.impacts.slice(-128);marks.forEach((v,i)=>{positions.set(v.point,i*3);colors.set(v.head?[1,.7,.2]:v.health_damage>0?[.3,1,1]:[1,.35,.25],i*3)});
  g.attributes.position.needsUpdate=g.attributes.color.needsUpdate=true;g.setDrawRange(0,marks.length);
  const preview=s.preview.slice(0,65);preview.forEach((v,i)=>lineP.set(v,i*3));lineG.attributes.position.needsUpdate=true;lineG.setDrawRange(0,preview.length);
 },dispose(){scene.remove(points,line);g.dispose();lineG.dispose();points.material.dispose();line.material.dispose();}};
}
