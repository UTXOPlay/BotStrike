import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {startMotionLab} from '../tools/serve-botstrike-motion-lab.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const out=process.env.ART_OUTPUT||'/tmp/botstrike-corpse-clearance';await mkdir(out,{recursive:true});
const sourcePaths=['games/botstrike/client/characters.mjs','games/botstrike/client/death-presentation.mjs','games/botstrike/client/corpse-clearance.mjs','games/botstrike/client/scene.mjs','tools/botstrike-motion-lab.mjs','tests/botstrike-corpse-clearance-browser.mjs','botstrike/spec.json'];
const sourceSha256=Object.fromEntries(await Promise.all(sourcePaths.map(async p=>{try{return [p,createHash('sha256').update(await readFile(p)).digest('hex')];}catch{return [p,null];}})));
// Independent CPU skinning probe. It uses Three's public vertex evaluator rather
// than the runtime collision proxy, and counts only referenced mesh vertices.
const bundle=await build({entryPoints:['tools/botstrike-motion-lab.mjs'],bundle:true,format:'esm',write:false,plugins:[{name:'mesh-collision-probe',setup(b){b.onLoad({filter:/\/botstrike-motion-lab\.mjs$/},async a=>({loader:'js',resolveDir:a.path.slice(0,a.path.lastIndexOf('/')),contents:(await readFile(a.path,'utf8')).replace('installHardwareBenchmark(window.motionLab,options);',`
window.motionLab.coverMaps=spec.maps;
const coverVertices=new WeakMap();
const coverPoseCache=new Map();let coverCacheHero=null;
const coverCacheStats={hits:0,misses:0,peakEntries:0};window.motionLab.coverCacheStats=coverCacheStats;
window.motionLab.coverGeometry=(map,useCache=false)=>{
 const actor=actors[current.mode][0],obstacles=spec.maps[map].obstacles,counts=obstacles.map(()=>0),point=new THREE.Vector3();let total=0,minY=Infinity;
 if(coverCacheHero!==actor.hero){coverPoseCache.clear();coverCacheHero=actor.hero;}
 const origin=actor.model.getWorldPosition(new THREE.Vector3()),key=useCache?[...actor.rig.quaternion,...actor.rig.scale,...actor.model.quaternion,...actor.model.scale,...[...new Set(Object.values(actor.bones))].flatMap(b=>[...b.position,...b.quaternion,...b.scale])].join(','):null;
 const count=(points,box,delta)=>{
  total+=points.length/3;minY=Math.min(minY,box.min.y+delta.y);
  for(let j=0;j<obstacles.length;j++){const b=obstacles[j];if(box.max.x+delta.x<=b.min[0]||box.min.x+delta.x>=b.max[0]||box.max.y+delta.y<=b.min[1]||box.min.y+delta.y>=b.max[1]||box.max.z+delta.z<=b.min[2]||box.min.z+delta.z>=b.max[2])continue;
   for(let k=0;k<points.length;k+=3){const x=points[k]+delta.x,y=points[k+1]+delta.y,z=points[k+2]+delta.z;if(x>b.min[0]+.001&&x<b.max[0]-.001&&y>b.min[1]+.001&&y<b.max[1]-.001&&z>b.min[2]+.001&&z<b.max[2]-.001)counts[j]++;}
  }
 };
 const cached=useCache&&coverPoseCache.get(key);
 if(cached){coverCacheStats.hits++;const delta=origin.clone().sub(cached.origin);for(const r of cached.meshes)count(r.points,r.box,delta);}
 else{
 const meshes=[],zero=new THREE.Vector3();
 actor.model.traverse(mesh=>{if(!mesh.isSkinnedMesh&&!(mesh.isMesh&&mesh.parent?.isBone))return;if(mesh.isSkinnedMesh)mesh.skeleton.update();
  let data=coverVertices.get(mesh.geometry);if(!data){const used=[...new Set(mesh.geometry.index.array)];data={used,points:new Float64Array(used.length*3)};coverVertices.set(mesh.geometry,data);}
  const box=new THREE.Box3();let n=0;for(const i of data.used){
   mesh.getVertexPosition(i,point).applyMatrix4(mesh.matrixWorld);box.expandByPoint(point);data.points[n++]=point.x;data.points[n++]=point.y;data.points[n++]=point.z;
  }
  count(data.points,box,zero);if(useCache)meshes.push({points:data.points.slice(),box});
 });if(useCache){coverCacheStats.misses++;if(coverPoseCache.size>=32)coverPoseCache.delete(coverPoseCache.keys().next().value);coverPoseCache.set(key,{origin,meshes});coverCacheStats.peakEntries=Math.max(coverCacheStats.peakEntries,coverPoseCache.size);}
 }
 return {counts,total,minY,modelPosition:actor.model.position.toArray(),rigPosition:actor.rig.position.toArray(),rigYaw:actor.rig.rotation.y};
};
installHardwareBenchmark(window.motionLab,options);`)}));}}]});
const server=await startMotionLab(),browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(180000);
 await page.route('**/lab.js',r=>r.fulfill({body:Buffer.from(bundle.outputFiles[0].contents),contentType:'text/javascript'}));
 await page.goto(`http://127.0.0.1:${server.address().port}`);await page.evaluate(()=>motionLabReady);
 const report=await page.evaluate(({smoke,fallsOnly})=>{
  motionLab.stop();const settled=[],falls=[],maps=motionLab.coverMaps;let cacheChecks=0;
  const sample=(p,now,map,extra={})=>motionLab.sample({player:p,now,state:{phase:'live',config:{map},objective:{}},...extra});
  const player=(hero,position,yaw,life=3,crouch=false)=>({slot:0,team:0,hero,weapon:2,life,position,velocity:[0,0,0],yaw,pitch:0,alive:false,crouch,reload:0});
  for(let hero=0;hero<(fallsOnly?0:6);hero++){
  motionLab.reset({hero,count:1,diagnostics:false});
  for(let map=0;map<3;map++)for(let obstacle=0;obstacle<maps[map].obstacles.length;obstacle++){
   const box=maps[map].obstacles[obstacle],cx=(box.min[0]+box.max[0])/2,cz=(box.min[2]+box.max[2])/2;
   for(const [face,position] of [[0,[box.min[0]-18,0,cz]],[1,[box.max[0]+18,0,cz]],[2,[cx,0,box.min[2]-18]],[3,[cx,0,box.max[2]+18]]]){
    // Skip points invalidated by another native AABB expanded by radius 18.
    if(maps[map].obstacles.some((b,j)=>j!==obstacle&&position[0]>b.min[0]-17.99&&position[0]<b.max[0]+17.99&&position[2]>b.min[2]-17.99&&position[2]<b.max[2]+17.99))continue;
    for(const yaw of smoke?[0]:[0,Math.PI/4,Math.PI/2])for(const life of smoke?[3]:[1,2,3]){
     const p=player(hero,position,yaw,life),before=JSON.stringify(p),r=sample(p,1,map,{invalidate:'room'}),g=motionLab.coverGeometry(map,true);
     // Only repeated settled poses reuse CPU-skinned points under rigid world
     // translation. Verify the cache independently; moving falls never use it.
     if(settled.length%137===0){const raw=motionLab.coverGeometry(map);if(raw.counts.join()!==g.counts.join()||Math.abs(raw.minY-g.minY)>1e-7)throw Error('Static skinning cache differs from direct evaluation');cacheChecks++;}
     settled.push({hero,map,obstacle,face,yaw,life,finite:r.finite,unchanged:JSON.stringify(p)===before,...g});
    }
   }
  }
  }
  const fixtures=[{map:0,position:[-650,0,307],yaw:0},{map:0,position:[-405,0,85],yaw:Math.PI/2},{map:0,position:[-405,0,85],yaw:Math.PI/4},
   {map:1,position:[0,0,-108],yaw:0},{map:2,position:[-168,0,0],yaw:Math.PI/2},{map:0,position:[-650,110,400],yaw:0},
   {map:0,position:[-828,0,245],yaw:0},{map:0,position:[-828,0,307],yaw:Math.PI/2}];
  for(let hero=0;hero<6;hero++)for(const [fixture,f] of fixtures.entries())for(const life of smoke?[3]:[1,2,3])for(const crouch of smoke?[false]:[false,true]){
   motionLab.reset({hero,count:1,diagnostics:false});const p=player(hero,[...f.position],f.yaw,life,crouch);p.alive=true;
   for(let i=0;i<30;i++)sample(p,1+i*1000/60,f.map,{...(i===0?{invalidate:'room'}:{})});
   const initial=motionLab.coverGeometry(f.map);p.alive=false;const before=JSON.stringify(p);let maxStep=0,maxJointStep=0,last=null,lastBody=null,finite=true,inside=0,minY=Infinity,firstOffset=0;const samples=[];
   for(let i=0;i<=90;i++){
    const r=sample(p,501+i*1000/60,f.map);finite&&=r.finite;const b=motionLab.bodyMetrics();
    if(last)maxStep=Math.max(maxStep,Math.hypot(...b.modelPosition.map((v,j)=>v-last[j])));else firstOffset=Math.hypot(...b.modelPosition.map((v,j)=>v-initial.modelPosition[j]));last=b.modelPosition;
    if(lastBody)for(const key of Object.keys(b.points))maxJointStep=Math.max(maxJointStep,Math.hypot(...b.points[key].map((v,j)=>v-lastBody.points[key][j])));lastBody=b;
    if(i%6===0){const g=motionLab.coverGeometry(f.map);inside=Math.max(inside,...g.counts);minY=Math.min(minY,g.minY);samples.push({frame:i,geometry:g});}
   }
   const end=motionLab.coverGeometry(f.map),frame=sample(p,2001,f.map,{dt:0,invalidate:'visibility'}),returned=motionLab.coverGeometry(f.map);
   falls.push({hero,fixture,life,crouch,initial,finite:finite&&frame.finite,unchanged:JSON.stringify(p)===before,inside,minY,maxStep,maxJointStep,firstOffset,returnShift:Math.hypot(...end.modelPosition.map((v,j)=>v-returned.modelPosition[j])),samples});
  }
  return {settled,falls,cacheChecks,probeCache:{...motionLab.coverCacheStats}};
 },{smoke:process.env.SMOKE==='1',fallsOnly:process.env.FALLS_ONLY==='1'});
 await writeFile(out+'/report.json',JSON.stringify({scope:'F03 existing-map corpse mesh clearance; software correctness, no physical timing claim',sourceSha256,bundleSha256:createHash('sha256').update(bundle.outputFiles[0].contents).digest('hex'),report,errors},null,2));
 const failures={settled:report.settled.filter(r=>!r.finite||!r.unchanged||r.counts.some(n=>n>0)),falls:report.falls.filter(r=>!r.finite||!r.unchanged||r.inside>0||r.returnShift>.001||r.maxStep>4||r.maxJointStep>8||r.initial.counts.every(n=>n===0)&&r.firstOffset>.25)};
 console.log(JSON.stringify({cases:{settled:report.settled.length,falls:report.falls.length},failures:{settled:failures.settled.length,falls:failures.falls.length},maxStep:Math.max(...report.falls.map(r=>r.maxStep)),out}));
 assert.deepEqual(errors,[]);assert.equal(failures.settled.length,0,JSON.stringify(failures.settled[0]));assert.equal(failures.falls.length,0,JSON.stringify(failures.falls[0]));
}finally{await browser.close();server.close();server.closeAllConnections();}
