// Paired fixed-step review of the F01 interruption case, not a performance test.
import {mkdtemp,mkdir,readFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync,spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const root=process.cwd(),reference=process.env.MOTION_REFERENCE_WORKTREE&&resolve(process.env.MOTION_REFERENCE_WORKTREE);
if(!reference)throw Error('Set MOTION_REFERENCE_WORKTREE to an unchanged checkout of PR revision 9c005e1.');
const expected='9c005e148ca53eadb48084cb5083eb78ff80fea0';
if(execFileSync('git',['rev-parse','HEAD'],{cwd:reference,encoding:'utf8'}).trim()!==expected)throw Error('Unexpected reference revision.');
if(execFileSync('git',['status','--porcelain','--untracked-files=no'],{cwd:reference,encoding:'utf8'}).trim())throw Error('The reference has tracked modifications.');
const spec=JSON.parse(await readFile('botstrike/spec.json','utf8')),frames=await mkdtemp(join(tmpdir(),'botstrike-foot-capture-'));
const out=resolve(process.env.ART_OUTPUT||'artifacts/foot-continuity-capture');await mkdir(out,{recursive:true});
const servers=[],pages=[];let browser;
async function startServer(directory){
 const moduleUrl=pathToFileURL(join(directory,'tools/serve-botstrike-motion-lab.mjs')).href;
 const code=`import {startMotionLab} from ${JSON.stringify(moduleUrl)};const server=await startMotionLab();console.log(JSON.stringify({port:server.address().port}));process.on('SIGTERM',()=>{server.closeAllConnections();server.close(()=>process.exit(0));});`;
 const child=spawn(process.execPath,['--input-type=module','-e',code],{cwd:directory,stdio:['ignore','pipe','inherit']});
 const record={child,port:null};servers.push(record);
 record.port=await new Promise((resolve,reject)=>{
  const lines=createInterface({input:child.stdout}),timer=setTimeout(()=>reject(Error('Timed out starting capture server')),120000);
  child.once('error',error=>{clearTimeout(timer);lines.close();reject(error);});child.once('exit',code=>{clearTimeout(timer);lines.close();reject(Error('Capture server exited: '+code));});
  lines.once('line',line=>{clearTimeout(timer);lines.close();try{resolve(JSON.parse(line).port);}catch(error){reject(error);}});
 });
 return record;
}
try{
 // Separate processes prevent the bundler service from caching the first cwd.
 for(const directory of [reference,root])await startServer(directory);
 browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
 for(const server of servers){const page=await browser.newPage({viewport:{width:960,height:720}});page.setDefaultTimeout(180000);await page.goto(`http://127.0.0.1:${server.port}`);await page.evaluate(()=>motionLabReady);await page.addStyleTag({content:'aside{display:none}#capture-label{position:fixed;bottom:8px;left:8px;padding:8px;background:#091622ed;color:white;font:14px monospace}'});await page.evaluate(()=>{const label=document.createElement('div');label.id='capture-label';document.body.append(label);motionLab.stop();});pages.push(page);}
 const manifests=await Promise.all(pages.map(page=>page.evaluate(()=>fetch('./manifest.json').then(r=>r.json()))));
 if(manifests[0].sha256['/lab.js']===manifests[1].sha256['/lab.js'])throw Error('Both panes loaded the same runtime bundle.');
 for(const [file,hash]of Object.entries(manifests[0].sha256))if(file!=='/lab.js'&&manifests[1].sha256[file]!==hash)throw Error('Different capture assets: '+file);
 const fixtures=[{hero:0,mode:'run',name:'vector-run'},{hero:2,mode:'quiet-walk',name:'bastion-walk'}],fps=32,seconds=.75;
 for(const fixture of fixtures){
  const speed=spec.heroes[fixture.hero].speed*(fixture.mode==='run'?1:.55);
  for(const [index,page]of pages.entries()){
   const label=index===0?'Before: PR 9c005e1':'After: foot continuity correction';
   await page.evaluate(config=>{const setup={...config,count:1,view:'side',diagnostics:false};motionLab.reset(setup);motionLab.step(0);motionLab.reset(setup);},{hero:fixture.hero});
   let nativeTick=0,z=seconds*speed*.25;
   for(let frame=0;frame<seconds*fps;frame++){
    let velocity;
    for(let tick=0;tick<2;tick++){velocity=Math.floor(nativeTick/4)%2===0?-speed:0;z+=velocity/64;nativeTick++;}
    const player={slot:0,team:0,hero:fixture.hero,weapon:2,life:1,position:[0,0,z],velocity:[0,0,velocity],yaw:0,pitch:0,alive:true,crouch:false,reload:0};
    await page.evaluate(({player,frame,fps,label})=>{motionLab.sample({player,dt:1/fps,now:1+(frame+1)*1000/fps});motionLab.render();document.querySelector('#capture-label').textContent=`${label} | 64 Hz native / 32 Hz render | 3× slow motion`;},{player,frame,fps,label});
    await page.screenshot({path:join(frames,`${index}-${String(frame).padStart(3,'0')}.png`)});
   }
  }
  const output=join(out,fixture.name+'.mp4');
  execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-framerate',String(fps),'-i',join(frames,'0-%03d.png'),'-framerate',String(fps),'-i',join(frames,'1-%03d.png'),'-filter_complex','[0:v][1:v]hstack=inputs=2,setpts=3*PTS[v]','-map','[v]','-r',String(fps),'-c:v','libx264','-crf','21','-pix_fmt','yuv420p','-movflags','+faststart',output]);
  execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',join(frames,'0-007.png'),'-i',join(frames,'1-007.png'),'-filter_complex','[0:v][1:v]hstack=inputs=2','-frames:v','1',join(out,fixture.name+'.png')]);
  console.log('Captured '+fixture.name);
 }
 await writeFile(join(out,'capture.json'),JSON.stringify({baselineCommit:expected,paneMode:'candidate',nestedBaselineMeaning:'Each nested manifest also describes the unused original-main A/B mode; both displayed panes use candidate mode in their respective checkouts.',fixtures,viewport:[960,720],pairedViewport:[1920,720],nativeHz:64,renderHz:fps,seconds,playbackSlowdown:3,interpretation:'Identical input, assets and camera; fixed-step visual review, not real-time performance or human acceptance.',manifests},null,2));
}finally{
 await browser?.close();
 for(const {child}of servers)if(child.exitCode===null&&child.signalCode===null){child.kill('SIGTERM');await new Promise(resolve=>{const timer=setTimeout(()=>{child.kill('SIGKILL');resolve();},5000);child.once('exit',()=>{clearTimeout(timer);resolve();});});}
 await rm(frames,{recursive:true,force:true});
}
