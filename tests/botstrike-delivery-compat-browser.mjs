// Opt-in real browser/Native compatibility check, with disposable guest data.
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {createNetworkLab} from '../tools/network-lab.mjs';
const repo=fileURLToPath(new URL('../',import.meta.url)),run=promisify(execFile),origin='http://botstrike.localhost:8080';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'/opt/codex-desktop/resources/cua_node/lib/node_modules/playwright/index.mjs');
const legacyRevision='01dee05170c84c3e5d4fde9887c2d10282229f21';
const legacyBundle=(await run('git',['show',legacyRevision+':games/botstrike/web/app.js'],{cwd:repo,maxBuffer:8*1024**2})).stdout;
const modernBundle=await fs.readFile(path.join(repo,'dist/botstrike/app.js'),'utf8');
const state=page=>page.evaluate(()=>fetch('/games/botstrike/api/state').then(r=>r.json()).then(v=>v.room));
async function one(mode){
 const modernServer=mode==='cached-client',lab=await createNetworkLab({...(modernServer?{devSource:repo,runtimeConfig:{runtimeCommand:['node','tools/start-network-runtime.mjs']}}:{})});
 let browser,page,failed;const bundleRoute=/\/app\.js(?:\?.*)?$/;let intercepted=0;const inputs=[],errors=[],report={schemaVersion:1,mode,automated:true,humanParticipants:0,legacyRevision,status:'running',development:modernServer,root:lab.root};
 try{
  browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||'/home/arthur/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell',args:['--no-sandbox','--enable-unsafe-swiftshader','--mute-audio']});
  const context=await browser.newContext({viewport:{width:1280,height:720},deviceScaleFactor:.5,reducedMotion:'reduce',proxy:{server:lab.actors.A.proxyUrl,bypass:'<-loopback>'}});
  await context.addInitScript(()=>localStorage.setItem('botstrike:settings',JSON.stringify({sound:false,motion:false,renderFps:30,aimAssist:0})));
  page=await context.newPage();page.setDefaultTimeout(60000);page.on('pageerror',error=>errors.push(error.message));
  const bundle=modernServer?legacyBundle:modernBundle;
  const intercept=route=>{intercepted++;return route.fulfill({status:200,contentType:'application/javascript',body:bundle});};await page.route(bundleRoute,intercept);
  page.on('websocket',socket=>socket.on('framesent',({payload})=>{const message=JSON.parse(payload);if(message.type==='input'){inputs.push({seq:message.input.seq,x:message.input.x,y:message.input.y,deliveryAttached:!!message.delivery});if(inputs.length>2048)inputs.shift();}}));
  assert.equal((await page.goto(origin+'/games/botstrike/')).status(),200);await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
  assert.equal(intercepted,1,'The requested bundle override must actually load');assert.equal(await page.evaluate(()=>!!window.BotStrikeQuality),!modernServer);report.phase='training-start';await page.locator('#training-start').click();
  if(modernServer){
   await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Client update required'));
   const before=await state(page),sent=inputs.length;assert.equal(before.status,'running');assert.equal(await page.locator('#panel').isVisible(),true);
   await page.waitForTimeout(2200);const later=await state(page);assert.ok(later.state.tick>before.state.tick,'online match keeps running');assert.equal(inputs.length,sent,'quarantined cached client stops sending controls');
   assert.match(await page.locator('#status').textContent(),/Client update required/);assert.equal(await page.evaluate(()=>document.documentElement.dataset.playing),'false');
   report.persistentUpdateMessage=true;report.onlineMatchContinued=true;
   report.phase='reload-modern-client';await page.unroute(bundleRoute,intercept);await page.reload();await page.waitForFunction(()=>window.BotStrikeQuality&&document.documentElement.dataset.inputProtocol==='receipt');
   const reloaded=await state(page);assert.equal(reloaded.id,before.id,'reload preserves the existing Native room');report.sameRoomAfterReload=true;
   await page.locator('#resume').click();await page.waitForFunction(()=>document.documentElement.dataset.playing==='true');
  }else{
   await page.waitForFunction(()=>document.documentElement.dataset.playing==='true'&&document.documentElement.dataset.inputProtocol==='legacy');report.explicitLegacyMode=true;
  }
  report.phase='native-input';const from=inputs.at(-1)?.seq||0;await page.keyboard.down('KeyW');await page.waitForTimeout(200);await page.keyboard.up('KeyW');
  await page.waitForFunction(async seq=>{const value=await fetch('/games/botstrike/api/state').then(r=>r.json());return value.room.state.players[value.room.slot].last_seq>seq;},from);
  const accepted=inputs.filter(input=>input.seq>from);assert.ok(accepted.some(input=>input.y>0));assert.ok(accepted.every(input=>input.deliveryAttached===modernServer));
  report.newControlsNativeAcknowledged=true;report.errors=errors;assert.deepEqual(errors,[]);report.status='passed';
 }catch(error){failed=error;report.status='failed';report.error={message:error.message,stack:error.stack};report.intercepted=intercepted;if(page&&!page.isClosed())report.window=await page.evaluate(()=>({status:document.querySelector('#status')?.textContent,playing:document.documentElement.dataset.playing,inputProtocol:document.documentElement.dataset.inputProtocol})).catch(()=>null);if(page&&!page.isClosed())await page.screenshot({path:path.join(lab.root,'compat-failure.png')}).catch(()=>{});}
 finally{
  if(page&&!page.isClosed())try{await page.keyboard.press('Escape');await page.locator('#leave').click({timeout:3000});}catch{}
  await browser?.close();await lab.close();await fs.writeFile(path.join(lab.root,'delivery-compat.json'),JSON.stringify(report,null,2)+'\n',{mode:0o600});
 }
 if(failed)throw Object.assign(failed,{report:path.join(lab.root,'delivery-compat.json')});return report;
}
const results=[];try{for(const mode of ['cached-client','legacy-server'])results.push(await one(mode));console.log(JSON.stringify({status:'passed',results:results.map(({mode,root})=>({mode,root})),humanParticipants:0}));}catch(error){console.error(JSON.stringify({status:'failed',message:error.message,report:error.report??null}));process.exitCode=1;}
