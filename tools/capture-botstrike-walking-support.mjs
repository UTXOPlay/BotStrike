// Paired, deterministic support/cadence witness; no hardware timing claim.
import {mkdtemp,mkdir,readFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync,spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
import {createHash} from 'node:crypto';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const root=process.cwd(),reference=process.env.MOTION_REFERENCE_WORKTREE&&resolve(process.env.MOTION_REFERENCE_WORKTREE),expected='d216ec90f2d953f68d6a6964155af3b79a4d78f0';
if(!reference||execFileSync('git',['rev-parse','HEAD'],{cwd:reference,encoding:'utf8'}).trim()!==expected)throw Error('Set MOTION_REFERENCE_WORKTREE to unchanged d216ec9.');
if(execFileSync('git',['status','--porcelain','--untracked-files=no'],{cwd:reference,encoding:'utf8'}).trim())throw Error('Reference has tracked edits.');
const frames=await mkdtemp(join(tmpdir(),'botstrike-support-capture-')),out=resolve(process.env.ART_OUTPUT||'artifacts/walking-support-capture');await mkdir(out,{recursive:true});
const hook=`window.motionLab.supportDraw=p=>{debugGroup.visible=false;floor.visible=true;camera.position.set(p.position[0]-15,55,p.position[2]-120);camera.lookAt(p.position[0],27,p.position[2]);renderer.render(scene,camera);};installHardwareBenchmark(window.motionLab,options);`;
const servers=[],pages=[],bundles=[];let browser;
async function startServer(directory,index){
 const file=join(frames,`lab-${index}.js`),moduleUrl=pathToFileURL(join(directory,'tools/serve-botstrike-motion-lab.mjs')).href;
 const code=`import {build} from 'esbuild';import {readFile,writeFile} from 'node:fs/promises';import {startMotionLab} from ${JSON.stringify(moduleUrl)};const b=await build({entryPoints:['tools/botstrike-motion-lab.mjs'],bundle:true,format:'esm',write:false,plugins:[{name:'support-camera',setup(b){b.onLoad({filter:/\\/botstrike-motion-lab\\.mjs$/},async a=>({loader:'js',resolveDir:a.path.slice(0,a.path.lastIndexOf('/')),contents:(await readFile(a.path,'utf8')).replace('installHardwareBenchmark(window.motionLab,options);',${JSON.stringify(hook)})}));}}]});await writeFile(${JSON.stringify(file)},b.outputFiles[0].contents);const server=await startMotionLab();console.log(JSON.stringify({port:server.address().port}));process.on('SIGTERM',()=>{server.closeAllConnections();server.close(()=>process.exit(0));});`;
 const child=spawn(process.execPath,['--input-type=module','-e',code],{cwd:directory,stdio:['ignore','pipe','inherit']});servers.push({child});
 const port=await new Promise((resolve,reject)=>{const lines=createInterface({input:child.stdout}),timer=setTimeout(()=>reject(Error('Capture server timed out')),120000);child.once('error',reject);child.once('exit',c=>reject(Error('Capture server exited '+c)));lines.once('line',line=>{clearTimeout(timer);lines.close();resolve(JSON.parse(line).port);});});servers.at(-1).port=port;bundles.push(await readFile(file));
}
try{
 // Independent Node bundlers avoid esbuild reusing the first working directory.
 for(const [i,d]of [reference,root].entries())await startServer(d,i);if(bundles[0].equals(bundles[1]))throw Error('Identical runtime bundles.');
 browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
 for(const [i,s]of servers.entries()){const p=await browser.newPage({viewport:{width:768,height:576}});p.setDefaultTimeout(180000);await p.route('**/lab.js',r=>r.fulfill({body:bundles[i],contentType:'text/javascript'}));await p.goto(`http://127.0.0.1:${s.port}`);await p.evaluate(()=>motionLabReady);await p.addStyleTag({content:'aside{display:none}#capture-label{position:fixed;bottom:8px;left:8px;padding:8px;background:#091622ed;color:white;font:14px monospace;white-space:pre-line}'});await p.evaluate(()=>{motionLab.stop();const e=document.createElement('div');e.id='capture-label';document.body.append(e);});pages.push(p);}
 const manifests=await Promise.all(pages.map(p=>p.evaluate(()=>fetch('./manifest.json').then(r=>r.json()))));for(const [file,hash]of Object.entries(manifests[0].sha256))if(file!=='/lab.js'&&manifests[1].sha256[file]!==hash)throw Error('Different assets: '+file);
 const spec=JSON.parse(await readFile('botstrike/spec.json','utf8')),fixtures=[{name:'glitch-quiet-side',hero:4,crouch:false},{name:'forge-crouch-side',hero:5,crouch:true}],traces=[];
 for(const fixture of fixtures){fixture.speed=spec.heroes[fixture.hero].speed*(fixture.crouch?.45:.55);const pair=[];
  for(const [side,page]of pages.entries()){
   await page.evaluate(f=>motionLab.reset({hero:f.hero,count:1,view:'front',diagnostics:false}),fixture);const trace=[];
   for(let frame=0;frame<96;frame++){
    const t=frame/32,rt=Math.floor(t*64)/64,p={slot:0,team:0,hero:fixture.hero,weapon:2,life:1,position:[rt*fixture.speed,0,0],velocity:[fixture.speed,0,0],yaw:0,pitch:0,alive:true,crouch:fixture.crouch,reload:0};
    const sample=await page.evaluate(({p,t,side,fixture})=>{const r=motionLab.sample({player:p,dt:1/32,now:1+t*1000,state:{phase:'live',config:{map:1},objective:{},tick:Math.floor(t*64)},invalidate:t===0?'room':null}),locked=r.feet.filter(f=>f.feasible).length;motionLab.supportDraw(p);const label=document.querySelector('#capture-label');label.textContent=(side===0?'Before: fixed minimum cycle':'After: coupled stride and support')+'\n'+(fixture.crouch?'Crouch':'Quiet walk')+' | locked feet: '+locked+' | cycle: '+Math.round(r.gait.cycleDuration*1000)+' ms';label.style.borderLeft='4px solid '+(locked?'#74ffb0':'#ffb86b');return {t,locked,duty:r.gait.duty,cycle:r.gait.cycleDuration};},{p,t,side,fixture});
    if(frame>=32){trace.push(sample);await page.screenshot({path:join(frames,`${side}-${String(frame-32).padStart(3,'0')}.png`)});}
   }pair.push(trace);
  }
  const witness=Math.max(0,pair[0].findIndex((r,i)=>r.locked===0&&pair[1][i].locked>0));
  execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-framerate','32','-i',join(frames,'0-%03d.png'),'-framerate','32','-i',join(frames,'1-%03d.png'),'-filter_complex','[0:v][1:v]hstack=inputs=2,setpts=2*PTS[v]','-map','[v]','-r','32','-c:v','libx264','-crf','21','-pix_fmt','yuv420p','-movflags','+faststart',join(out,fixture.name+'.mp4')]);
  execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',join(frames,`0-${String(witness).padStart(3,'0')}.png`),'-i',join(frames,`1-${String(witness).padStart(3,'0')}.png`),'-filter_complex','[0:v][1:v]hstack=inputs=2','-frames:v','1',join(out,fixture.name+'.png')]);traces.push({fixture:fixture.name,witness,pair});console.log('Captured '+fixture.name);
 }
 await writeFile(join(out,'capture.json'),JSON.stringify({baselineCommit:expected,paneMode:'candidate',nestedBaselineMeaning:'Unused original-main lab mode; both panes use candidate mode in their respective checkout.',fixtures,traces,nativeHz:64,renderHz:32,playbackSlowdown:2,viewport:[768,576],interpretation:'Synthetic constant native-speed snapshots; fixed-step correctness and visual witness, no hardware timing or human acceptance claim.',bundleSha256:bundles.map(b=>createHash('sha256').update(b).digest('hex')),manifests},null,2));
}finally{await browser?.close();for(const {child}of servers)if(child.exitCode===null&&child.signalCode===null){child.kill('SIGTERM');await new Promise(resolve=>{const timer=setTimeout(()=>{child.kill('SIGKILL');resolve();},5000);child.once('exit',()=>{clearTimeout(timer);resolve();});});}await rm(frames,{recursive:true,force:true});}
