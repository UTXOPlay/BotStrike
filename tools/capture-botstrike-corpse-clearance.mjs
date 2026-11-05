// Paired F03 visual fixtures, with real map AABBs and identical cameras/assets.
import {mkdtemp,mkdir,readFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync,spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
import {createHash} from 'node:crypto';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const root=process.cwd(),reference=process.env.MOTION_REFERENCE_WORKTREE&&resolve(process.env.MOTION_REFERENCE_WORKTREE),expected='aba577836bb9244cdd7a8556ac4db4e0f8352e75';
if(!reference||execFileSync('git',['rev-parse','HEAD'],{cwd:reference,encoding:'utf8'}).trim()!==expected)throw Error('Set MOTION_REFERENCE_WORKTREE to an unchanged aba5778 checkout.');
if(execFileSync('git',['status','--porcelain','--untracked-files=no'],{cwd:reference,encoding:'utf8'}).trim())throw Error('The reference has tracked modifications.');
const frames=await mkdtemp(join(tmpdir(),'botstrike-cover-capture-')),out=resolve(process.env.ART_OUTPUT||'artifacts/corpse-clearance-capture');await mkdir(out,{recursive:true});
const hook=`
 const coverStage=new THREE.Group();scene.add(coverStage);
 window.motionLab.coverSetup=fixture=>{
  motionLab.stop();motionLab.reset({hero:fixture.hero,count:1,diagnostics:false});debugGroup.visible=false;
  for(const child of [...coverStage.children]){child.geometry.dispose();child.material.dispose();coverStage.remove(child);}
  for(const index of fixture.obstacles){const b=spec.maps[fixture.map].obstacles[index],size=b.max.map((v,i)=>v-b.min[i]);
   const mesh=new THREE.Mesh(new THREE.BoxGeometry(...size),new THREE.MeshStandardMaterial({color:0x41606b,roughness:.8}));mesh.position.set(...b.max.map((v,i)=>(v+b.min[i])/2));coverStage.add(mesh);
  }
 };
 window.motionLab.coverDraw=fixture=>{
  const p=fixture.position,c=fixture.camera;camera.position.set(p[0]+c[0],p[1]+c[1],p[2]+c[2]);camera.lookAt(p[0],p[1]+18,p[2]+10);renderer.render(scene,camera);
 };
 installHardwareBenchmark(window.motionLab,options);`;
const servers=[],pages=[],bundles=[];let browser;
async function startServer(directory,index){
 const bundlePath=join(frames,`lab-${index}.js`),moduleUrl=pathToFileURL(join(directory,'tools/serve-botstrike-motion-lab.mjs')).href;
 const code=`import {build} from 'esbuild';import {readFile,writeFile} from 'node:fs/promises';import {startMotionLab} from ${JSON.stringify(moduleUrl)};
 const bundle=await build({entryPoints:['tools/botstrike-motion-lab.mjs'],bundle:true,format:'esm',write:false,plugins:[{name:'cover-fixture',setup(b){b.onLoad({filter:/\\/botstrike-motion-lab\\.mjs$/},async a=>({loader:'js',resolveDir:a.path.slice(0,a.path.lastIndexOf('/')),contents:(await readFile(a.path,'utf8')).replace('installHardwareBenchmark(window.motionLab,options);',${JSON.stringify(hook)})}));}}]});
 await writeFile(${JSON.stringify(bundlePath)},bundle.outputFiles[0].contents);const server=await startMotionLab();console.log(JSON.stringify({port:server.address().port}));process.on('SIGTERM',()=>{server.closeAllConnections();server.close(()=>process.exit(0));});`;
 const child=spawn(process.execPath,['--input-type=module','-e',code],{cwd:directory,stdio:['ignore','pipe','inherit']}),record={child};servers.push(record);
 record.port=await new Promise((resolve,reject)=>{const lines=createInterface({input:child.stdout}),timer=setTimeout(()=>reject(Error('Capture server timed out')),120000);
  child.once('error',reject);child.once('exit',c=>reject(Error('Capture server exited '+c)));lines.once('line',line=>{clearTimeout(timer);lines.close();resolve(JSON.parse(line).port);});});
 bundles.push(await readFile(bundlePath));
}
try{
 // Separate bundler processes are required: esbuild caches its first cwd.
 for(const [i,directory]of [reference,root].entries())await startServer(directory,i);
 if(bundles[0].equals(bundles[1]))throw Error('Both panes contain the same runtime.');
 browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
 for(const [i,server]of servers.entries()){
  const page=await browser.newPage({viewport:{width:960,height:720}});page.setDefaultTimeout(180000);await page.route('**/lab.js',r=>r.fulfill({body:bundles[i],contentType:'text/javascript'}));
  await page.goto(`http://127.0.0.1:${server.port}`);await page.evaluate(()=>motionLabReady);await page.addStyleTag({content:'aside{display:none}#capture-label{position:fixed;bottom:8px;left:8px;padding:8px;background:#091622ed;color:white;font:14px monospace}'});await page.evaluate(()=>{const label=document.createElement('div');label.id='capture-label';document.body.append(label);});pages.push(page);
 }
 const manifests=await Promise.all(pages.map(p=>p.evaluate(()=>fetch('./manifest.json').then(r=>r.json()))));
 for(const [file,hash]of Object.entries(manifests[0].sha256))if(file!=='/lab.js'&&manifests[1].sha256[file]!==hash)throw Error('Different assets: '+file);
 const fixtures=[{name:'bastion-cover',hero:2,life:3,map:0,position:[-650,0,307],yaw:0,obstacles:[0],camera:[90,95,-115]},
  {name:'forge-corridor',hero:5,life:1,map:0,position:[-405,0,85],yaw:Math.PI/2,obstacles:[1,10],camera:[25,185,-145]}],fps=24,seconds=1.6;
 for(const fixture of fixtures){
  for(const [i,page]of pages.entries()){
   await page.evaluate(f=>{motionLab.coverSetup(f);const p={slot:0,team:0,hero:f.hero,weapon:2,position:f.position,velocity:[0,0,0],yaw:f.yaw,pitch:0,life:f.life,alive:true,crouch:false,reload:0};for(let j=0;j<30;j++)motionLab.sample({player:p,now:1+j*1000/60});window.coverPlayer={...p,alive:false};},fixture);
   for(let frame=0;frame<=Math.ceil(seconds*fps);frame++){
    await page.evaluate(({fixture,frame,fps,before})=>{motionLab.sample({player:coverPlayer,now:501+frame*1000/fps,dt:1/fps});motionLab.coverDraw(fixture);document.querySelector('#capture-label').textContent=(before?'Before: floor-only fall':'After: map-aware cosmetic fall')+' | 2x slow motion';},{fixture,frame,fps,before:i===0});
    await page.screenshot({path:join(frames,`${i}-${String(frame).padStart(3,'0')}.png`)});
   }
  }
  execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-framerate',String(fps),'-i',join(frames,'0-%03d.png'),'-framerate',String(fps),'-i',join(frames,'1-%03d.png'),'-filter_complex','[0:v][1:v]hstack=inputs=2,setpts=2*PTS[v]','-map','[v]','-r',String(fps),'-c:v','libx264','-crf','21','-pix_fmt','yuv420p','-movflags','+faststart',join(out,fixture.name+'.mp4')]);
  execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',join(frames,'0-030.png'),'-i',join(frames,'1-030.png'),'-filter_complex','[0:v][1:v]hstack=inputs=2','-frames:v','1',join(out,fixture.name+'.png')]);console.log('Captured '+fixture.name);
 }
 await writeFile(join(out,'capture.json'),JSON.stringify({baselineCommit:expected,paneMode:'candidate',nestedBaselineMeaning:'The nested manifests also describe the unused original-main lab mode. Both displayed panes use candidate mode of their respective checkout.',fixtures,viewport:[960,720],renderHz:fps,seconds,playbackSlowdown:2,interpretation:'Fixed-step selected visual fixtures, not physical timing or human acceptance.',bundleSha256:bundles.map(b=>createHash('sha256').update(b).digest('hex')),manifests},null,2));
}finally{
 await browser?.close();for(const {child}of servers)if(child.exitCode===null&&child.signalCode===null){child.kill('SIGTERM');await new Promise(resolve=>{const timer=setTimeout(()=>{child.kill('SIGKILL');resolve();},5000);child.once('exit',()=>{clearTimeout(timer);resolve();});});}
 await rm(frames,{recursive:true,force:true});
}
