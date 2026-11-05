// Identical fixed-step input/camera capture; not a real-time performance test.
import {mkdtemp,mkdir,rm,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {startMotionLab} from './serve-botstrike-motion-lab.mjs';
import {scenarios} from './motion-sequences.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const selection=process.env.MOTION_SCENARIO||'circle',selected=selection==='all'?scenarios:selection.split(',');
if(selected.some(s=>!scenarios.includes(s)))throw Error('Unknown motion scenario');
const view=process.env.MOTION_VIEW||'lineup',hero=process.env.MOTION_HERO===undefined?null:Number(process.env.MOTION_HERO),weapon=Number(process.env.MOTION_WEAPON||2),seconds=Number(process.env.MOTION_SECONDS||6),fps=30;
const modes=(process.env.MOTION_MODES||'baseline,candidate').split(',');if(modes.some(m=>!['baseline','candidate'].includes(m)))throw Error('Unknown animation mode');
const out=process.env.ART_OUTPUT||'/tmp/botstrike-motion-capture',frames=await mkdtemp(join(tmpdir(),'botstrike-motion-frames-'));
await mkdir(out,{recursive:true});const server=process.env.MOTION_LAB_URL?null:await startMotionLab();
const browser=await chromium.launch({headless:process.env.HEADED!=='1',...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1280,height:720}});page.setDefaultTimeout(180000);
 await page.goto(process.env.MOTION_LAB_URL||`http://127.0.0.1:${server.address().port}`);await page.evaluate(()=>motionLabReady);
 const manifest=await page.evaluate(()=>fetch('./manifest.json').then(r=>r.json()));
 await page.addStyleTag({content:'aside{display:none}#capture-label{position:fixed;bottom:12px;left:12px;padding:8px;background:#091622df;color:white;font:16px monospace}'});
 await page.evaluate(()=>{const label=document.createElement('div');label.id='capture-label';document.body.append(label);});
 for(const scenario of selected){
  const suffix=scenario+(view==='lineup'?'':'-'+view+'-'+(hero??0)+'-'+weapon);
  for(const mode of modes){
   await page.evaluate(config=>{motionLab.reset(config);motionLab.step(0);},{mode,scenario,fps,hero,weapon,view,diagnostics:false});
   for(let frame=0;frame<Math.round(seconds*fps);frame++){
    await page.evaluate(({mode,scenario,view,frame,fps})=>{motionLab.step(1/fps);document.querySelector('#capture-label').textContent=`${mode} · ${scenario} · ${view} · ${((frame+1)/fps).toFixed(2)} s`;},{mode,scenario,view,frame,fps});
    await page.screenshot({path:join(frames,`${mode}-${String(frame).padStart(4,'0')}.png`)});
    if(frame===74)await page.screenshot({path:join(out,`${mode}-${suffix}.png`)});
   }
   execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-framerate',String(fps),'-i',join(frames,`${mode}-%04d.png`),'-c:v','libx264','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart',join(out,`${mode}-${suffix}.mp4`)]);
  }
  await writeFile(join(out,suffix+'-capture.json'),JSON.stringify({scenario,view,hero,weapon,seconds,fps,modes,viewport:[1280,720],manifest,interpretation:'Fixed-step render capture, not real-time performance or human gameplay.'},null,2));
  console.log('Captured '+suffix);
 }
 console.log(`Fixed-step A/B clips: ${out}`);
}finally{await browser.close();server?.close();server?.closeAllConnections();await rm(frames,{recursive:true,force:true});}
