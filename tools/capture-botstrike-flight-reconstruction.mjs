// Native-snapshot witness: one visibility return while native time is held.
import {mkdtemp,mkdir,readFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync,spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
import {createHash} from 'node:crypto';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const root=process.cwd(),reference=process.env.MOTION_REFERENCE_WORKTREE&&resolve(process.env.MOTION_REFERENCE_WORKTREE),expected='5f6d3c7c27f36610cdf83dbed681024eb1d609bb';
if(!reference||execFileSync('git',['rev-parse','HEAD'],{cwd:reference,encoding:'utf8'}).trim()!==expected)throw Error('Set MOTION_REFERENCE_WORKTREE to unchanged 5f6d3c7.');
if(execFileSync('git',['status','--porcelain','--untracked-files=no'],{cwd:reference,encoding:'utf8'}).trim())throw Error('Reference has tracked edits.');
const evidence=JSON.parse(await readFile(process.env.MOTION_FIXTURE_REPORT||'/tmp/botstrike-f04-accepted/report.json'));
const frames=await mkdtemp(join(tmpdir(),'botstrike-flight-capture-')),out=resolve(process.env.ART_OUTPUT||'artifacts/flight-reconstruction-capture');await mkdir(out,{recursive:true});
const hook=`window.motionLab.flightDraw=(p,firstPerson)=>{debugGroup.visible=false;floor.visible=!firstPerson;camera.fov=firstPerson?80:45;camera.updateProjectionMatrix();if(firstPerson){camera.position.set(0,0,0);camera.rotation.set(0,0,0);}else{camera.position.set(p.position[0]+170,85,p.position[2]+70);camera.lookAt(p.position[0],50,p.position[2]);}renderer.render(scene,camera);};installHardwareBenchmark(window.motionLab,options);`;
const servers=[],pages=[],bundles=[];let browser;
async function startServer(directory,index){
 const file=join(frames,`lab-${index}.js`),moduleUrl=pathToFileURL(join(directory,'tools/serve-botstrike-motion-lab.mjs')).href;
 const code=`import {build} from 'esbuild';import {readFile,writeFile} from 'node:fs/promises';import {startMotionLab} from ${JSON.stringify(moduleUrl)};const bundle=await build({entryPoints:['tools/botstrike-motion-lab.mjs'],bundle:true,format:'esm',write:false,plugins:[{name:'flight-camera',setup(b){b.onLoad({filter:/\\/botstrike-motion-lab\\.mjs$/},async a=>({loader:'js',resolveDir:a.path.slice(0,a.path.lastIndexOf('/')),contents:(await readFile(a.path,'utf8')).replace('installHardwareBenchmark(window.motionLab,options);',${JSON.stringify(hook)})}));}}]});await writeFile(${JSON.stringify(file)},bundle.outputFiles[0].contents);const server=await startMotionLab();console.log(JSON.stringify({port:server.address().port}));process.on('SIGTERM',()=>{server.closeAllConnections();server.close(()=>process.exit(0));});`;
 const child=spawn(process.execPath,['--input-type=module','-e',code],{cwd:directory,stdio:['ignore','pipe','inherit']}),record={child};servers.push(record);
 record.port=await new Promise((resolve,reject)=>{const lines=createInterface({input:child.stdout}),timer=setTimeout(()=>reject(Error('Capture server timed out')),120000);child.once('error',reject);child.once('exit',c=>reject(Error('Capture server exited '+c)));lines.once('line',line=>{clearTimeout(timer);lines.close();resolve(JSON.parse(line).port);});});bundles.push(await readFile(file));
}
try{
 for(const [i,d]of [reference,root].entries())await startServer(d,i);if(bundles[0].equals(bundles[1]))throw Error('Identical runtime bundles.');
 browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
 for(const [i,s]of servers.entries()){const p=await browser.newPage({viewport:{width:960,height:720}});p.setDefaultTimeout(180000);await p.route('**/lab.js',r=>r.fulfill({body:bundles[i],contentType:'text/javascript'}));await p.goto(`http://127.0.0.1:${s.port}`);await p.evaluate(()=>motionLabReady);await p.addStyleTag({content:'aside{display:none}#capture-label{position:fixed;bottom:8px;left:8px;padding:8px;background:#091622ed;color:white;font:14px monospace}'});await p.evaluate(()=>{motionLab.stop();const e=document.createElement('div');e.id='capture-label';document.body.append(e);});pages.push(p);}
 const manifests=await Promise.all(pages.map(p=>p.evaluate(()=>fetch('./manifest.json').then(r=>r.json()))));for(const [file,hash]of Object.entries(manifests[0].sha256))if(file!=='/lab.js'&&manifests[1].sha256[file]!==hash)throw Error('Different assets: '+file);
 const fixtures=[{name:'bastion-jump',hero:2,mode:'still',firstPerson:false},{name:'vector-air-crouch',hero:0,mode:'enter',firstPerson:true}];
 for(const fixture of fixtures){const native=evidence.fixtures.find(f=>f.hero===fixture.hero&&f.mode===fixture.mode);fixture.map=native.map;fixture.nativeTapeSha256=native.tapeSha256;
  for(const [side,page]of pages.entries()){
   await page.evaluate(({fixture,native})=>{motionLab.reset({hero:fixture.hero,count:1,view:fixture.firstPerson?'first-person':'side',diagnostics:false});for(let i=0;i<=60;i++)motionLab.sample({player:native.players[i],state:{tick:i,phase:'live',config:{map:native.map},objective:{}},now:1+i*1000/64,dt:1/64,...(i===0?{invalidate:'room'}:{})});},{fixture,native});
   let frame=0;const shot=async(label)=>{await page.evaluate(({label,side})=>{document.querySelector('#capture-label').textContent=(side===0?'Before: full animation reset':'After: validated flight continuity')+' | '+label;},{label,side});await page.screenshot({path:join(frames,`${side}-${String(frame++).padStart(3,'0')}.png`)});};
   for(let tick=2;tick<=44;tick+=2){const p=native.players[60+tick];await page.evaluate(({p,tick,firstPerson,map})=>{motionLab.sample({player:p,state:{tick:60+tick,phase:'live',config:{map},objective:{}},now:1+(60+tick)*1000/64,dt:2/64});motionLab.flightDraw(p,firstPerson);},{p,tick,firstPerson:fixture.firstPerson,map:native.map});await shot('native 64 Hz / render 32 Hz');
    if(tick===12){for(let i=0;i<3;i++)await shot('hold native tick 72');await page.evaluate(({p,firstPerson,map})=>{motionLab.sample({player:p,state:{tick:72,phase:'live',config:{map},objective:{}},now:1126,dt:0,invalidate:'visibility'});motionLab.flightDraw(p,firstPerson);},{p,firstPerson:fixture.firstPerson,map:native.map});for(let i=0;i<4;i++)await shot('visibility return; same native state');}
   }
  }
  execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-framerate','32','-i',join(frames,'0-%03d.png'),'-framerate','32','-i',join(frames,'1-%03d.png'),'-filter_complex','[0:v][1:v]hstack=inputs=2,setpts=3*PTS[v]','-map','[v]','-r','32','-c:v','libx264','-crf','21','-pix_fmt','yuv420p','-movflags','+faststart',join(out,fixture.name+'.mp4')]);
  execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',join(frames,'0-009.png'),'-i',join(frames,'1-009.png'),'-filter_complex','[0:v][1:v]hstack=inputs=2','-frames:v','1',join(out,fixture.name+'.png')]);console.log('Captured '+fixture.name);
 }
 await writeFile(join(out,'capture.json'),JSON.stringify({baselineCommit:expected,paneMode:'candidate',nestedBaselineMeaning:'Unused original-main lab mode; both displayed panes use candidate mode in their respective checkout.',nativeEngineSha256:evidence.nativeEngineSha256,fixtures,nativeHz:64,renderHz:32,heldTick:72,playbackSlowdown:3,viewport:[960,720],interpretation:'Fixed-step visibility-return witness; no physical timing or human acceptance claim.',bundleSha256:bundles.map(b=>createHash('sha256').update(b).digest('hex')),manifests},null,2));
}finally{await browser?.close();for(const {child}of servers)if(child.exitCode===null&&child.signalCode===null){child.kill('SIGTERM');await new Promise(resolve=>{const timer=setTimeout(()=>{child.kill('SIGKILL');resolve();},5000);child.once('exit',()=>{clearTimeout(timer);resolve();});});}await rm(frames,{recursive:true,force:true});}
