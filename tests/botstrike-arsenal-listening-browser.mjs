import assert from 'node:assert/strict';import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
import {startArsenalListeningLab} from '../tools/serve-arsenal-listening-lab.mjs';
import {identityPlan,participantSeed,identityLabels} from '../tools/arsenal-listening-protocol.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const out=process.env.CONTROL_ARTIFACTS||'/tmp/botstrike-arsenal-listening-browser';mkdirSync(out,{recursive:true});
const server=await startArsenalListeningLab(),base='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--mute-audio']}),errors=[],requests=[],viewports=[[1920,1080],[2560,1080],[2560,1440],[3840,2160],[390,844],[844,390]],results=[];
async function boot(options={}){const c=await browser.newContext({viewport:{width:1920,height:1080},reducedMotion:'reduce',acceptDownloads:true,...options}),p=await c.newPage();p.setDefaultTimeout(30000);p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>requests.push({method:r.method(),url:new URL(r.url()).pathname}));await p.goto(base+'/?qa=1');await p.waitForFunction(()=>!!window.BotStrikeIdentityLab);return p;}
const snapshot=p=>p.evaluate(()=>window.BotStrikeIdentityLab.snapshot());
async function start(p){await p.locator('#start').click();if(await p.locator('#task').isHidden())await p.locator('#start').click();await p.locator('#task').waitFor({state:'visible'});}
async function answer(p,target){await p.locator('#choices button').nth(target).click();await p.locator('#submit').click();await p.locator('#setup').waitFor({state:'visible'});}
let report;
try{
 const page=await boot(),participant='identity-automated',plan=identityPlan(participantSeed(participant));
 await page.locator('#participant').fill(participant);await page.locator('#physical').check();
 await page.locator('#practice').click();if((await snapshot(page)).report.references.length===0)await page.locator('#practice').click();assert.equal((await snapshot(page)).report.references.length,1);
 // Verify interruption repeats the same trial instead of silently dropping it.
 await start(page);assert.equal(await page.locator('#choices button').first().isDisabled(),true);await page.locator('#pause').click();let s=await snapshot(page);assert.equal(s.index,0);assert.equal(s.report.rows.at(-1).valid,false);
 await start(page);await page.setViewportSize({width:2560,height:1080});await page.locator('#setup').waitFor({state:'visible'});assert.equal((await snapshot(page)).index,0);
 await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
 // The real 15-second timeout records UNSURE, rather than a success or omission.
 await start(page);await page.locator('#setup').waitFor({state:'visible',timeout:20000});s=await snapshot(page);assert.equal(s.index,1);assert.equal(s.report.rows.at(-1).timeout,true);assert.equal(s.report.rows.at(-1).answer,null);
 const familyCounts={weapon:0,action:0,surface:0},coverage=new Set();
 let invalidRetries=0;
 while((s=await snapshot(page)).index<plan.length){
  const trial=plan[s.index],n=familyCounts[trial.family]++,size=viewports[n%viewports.length];
  if(n<viewports.length){await page.setViewportSize({width:size[0],height:size[1]});await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));await page.screenshot({path:`${out}/setup-${trial.family}-${size.join('x')}.png`});}
  await start(page);
  if(n<viewports.length){
   const layout=await page.locator('#choices button').evaluateAll(nodes=>({overflow:document.documentElement.scrollWidth>innerWidth+1,buttons:nodes.map(b=>{const r=b.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,font:parseFloat(getComputedStyle(b).fontSize)};})}));
   assert.equal(layout.overflow,false);assert.ok(layout.buttons.every(b=>b.width>=44&&b.height>=44&&b.x>=0&&b.x+b.width<=size[0]+1));if(size[0]>=2560)assert.ok(layout.buttons.every(b=>b.font>=20));
   await page.screenshot({path:`${out}/trial-${trial.family}-${size.join('x')}.png`});coverage.add(trial.family+':'+size.join('x'));results.push({family:trial.family,width:size[0],height:size[1],layout});
  }
  const target=n%3===0?identityLabels[trial.family].length:n%3===1?trial.target:(trial.target+1)%identityLabels[trial.family].length;
  await answer(page,target);const after=await snapshot(page);
  if(after.index===s.index){invalidRetries++;assert.ok(invalidRetries<8,'repeated playback timing failures');console.log('Retaining and repeating invalid trial',s.index);}
  if(after.index%20===0)console.log('Identity trials',after.index,'/',plan.length);
 }
 report=(await snapshot(page)).report;assert.equal(report.rows.filter(r=>r.valid).length,160);assert.equal(coverage.size,18);assert.equal(report.automated,true);assert.match(report.summary.evidence,/zero human/);assert.equal(await page.locator('#start').isDisabled(),true);
 const downloadEvent=page.waitForEvent('download');await page.locator('#download').click();const download=await downloadEvent;await download.saveAs(out+'/automated-report.json');assert.deepEqual(JSON.parse(readFileSync(out+'/automated-report.json','utf8')),report);
 // A new paired session cannot start on the unassigned physical output.
 const paired=await boot();await paired.locator('#participant').fill('paired-automated');await paired.locator('#paired').check();const expected=identityPlan(participantSeed('paired-automated'),{paired:true})[0].output;
 await paired.locator('#physical-output').selectOption(expected==='headphones'?'speakers':'headphones');await paired.locator('#physical').check();await paired.locator('#start').click();if(!(await snapshot(paired)).total)await paired.locator('#start').click();assert.equal((await snapshot(paired)).active,false);assert.match(await paired.locator('#status').textContent(),new RegExp(expected));await paired.locator('#physical-output').selectOption(expected);await start(paired);assert.equal(await paired.locator('#physical-output').isDisabled(),true);await paired.locator('#pause').click();
 // Physical touch browser: portrait-friendly form, no game orientation policy.
 const mobile=await boot({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});await mobile.locator('#participant').fill('touch-automated');await mobile.locator('#physical').check();await start(mobile);await mobile.locator('#choices button').last().tap();await mobile.locator('#submit').tap();assert.equal((await snapshot(mobile)).index,1);await mobile.setViewportSize({width:844,height:390});await mobile.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));await start(mobile);await mobile.locator('#choices button').last().tap();await mobile.locator('#submit').tap();assert.equal((await snapshot(mobile)).index,2);
 assert.deepEqual(errors,[]);assert.ok(requests.every(r=>r.method==='GET'&&['/','/manifest.json','/identity.js'].includes(r.url)));writeFileSync(out+'/measurements.json',JSON.stringify({automated:true,humanParticipants:0,physicalOutputReviewed:false,completeOutputTrials:160,responsiveCases:results.length,touchOrientations:2,pairedOutputGuard:true,invalidRows:report.rows.filter(r=>!r.valid).length,results,manifest:report.manifest,summary:report.summary,errors},null,2));console.log(JSON.stringify({completeOutputTrials:160,responsiveCases:results.length,errors,output:out}));
}catch(error){writeFileSync(out+'/failure.json',JSON.stringify({error:String(error),results,errors,report},null,2));throw error;}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
