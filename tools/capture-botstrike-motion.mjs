// Fixed-step capture: ffmpeg converts identical simulated times into A/B clips.
// Encoding is deliberately outside the browser and the shipping game.
import {mkdtemp,mkdir,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {startMotionLab} from './serve-botstrike-motion-lab.mjs';
import {scenarios} from './motion-sequences.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const scenario=process.env.MOTION_SCENARIO||'circle';if(!scenarios.includes(scenario))throw Error('Unknown motion scenario');
const out=process.env.ART_OUTPUT||'/tmp/botstrike-motion-capture',frames=await mkdtemp(join(tmpdir(),'botstrike-motion-frames-'));
await mkdir(out,{recursive:true});const server=await startMotionLab();
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1280,height:720}});page.setDefaultTimeout(180000);
 await page.goto(`http://127.0.0.1:${server.address().port}`);await page.evaluate(()=>motionLabReady);
 for(const mode of ['baseline','candidate']){
  await page.evaluate(config=>{motionLab.reset(config);motionLab.step(0);},{mode,scenario,fps:30});
  for(let frame=0;frame<180;frame++){
   await page.evaluate(()=>motionLab.step(1/30));
   await page.screenshot({path:join(frames,`${mode}-${String(frame).padStart(4,'0')}.png`)});
  }
  execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-framerate','30','-i',join(frames,`${mode}-%04d.png`),'-c:v','libx264','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart',join(out,`${mode}-${scenario}.mp4`)]);
 }
 console.log(`Fixed-step A/B clips: ${out}`);
}finally{await browser.close();server.close();await rm(frames,{recursive:true,force:true});}
