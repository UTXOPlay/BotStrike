// Opt-in real browser/Native compatibility. Immutable modern image when supplied;
// otherwise explicitly labelled source-mounted development, never release proof.
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {createHash} from 'node:crypto';
import {createNetworkLab} from '../tools/network-lab.mjs';
import {browserRuntimePaths} from '../tools/network-browser-actors.mjs';
import {observeStoreProtocol,storeInputAck,neutral,until} from './botstrike-store-observations.mjs';
const repo=fileURLToPath(new URL('../',import.meta.url)),run=promisify(execFile),origin='http://botstrike.localhost:8080';
const runtime=browserRuntimePaths(),{chromium}=await import(runtime.playwrightEntry);
const legacyRevision='01dee05170c84c3e5d4fde9887c2d10282229f21';
const receiptV1Image='sha256:baa5709dcc6ac92ae1caa4be7e842177cc393be278e0a70f3baeca554a181965';
const legacyBundle=(await run('git',['show',legacyRevision+':games/botstrike/web/app.js'],{cwd:repo,maxBuffer:8*1024**2})).stdout;
const receiptV1Bundle=(await run('docker',['run','--rm','--network','none','--read-only','--cap-drop','ALL','--security-opt','no-new-privileges','--memory','128m','--pids-limit','32','--entrypoint','node',receiptV1Image,'-e',"process.stdout.write(require('node:fs').readFileSync('/app/dist/botstrike/app.js'))"],{cwd:repo,maxBuffer:8*1024**2})).stdout;
const modernBundle=await fs.readFile(path.join(repo,'dist/botstrike/app.js'),'utf8');
const sha=value=>createHash('sha256').update(value).digest('hex');
const state=page=>page.evaluate(()=>fetch('/games/botstrike/api/state').then(r=>r.json()).then(v=>v.room));
async function one(mode){
 const modernServer=mode.startsWith('cached-'),applicationImage=modernServer?process.env.NETWORK_APPLICATION_IMAGE:mode==='receipt-v1-server'?receiptV1Image:undefined;
 const development=modernServer&&!applicationImage;
 const lab=await createNetworkLab({...(applicationImage?{applicationImage}:{}),...(development?{devSource:repo,runtimeConfig:{runtimeCommand:['node','tools/start-network-runtime.mjs']}}:{}),artifactsRoot:process.env.COMPAT_ARTIFACTS||process.env.COMPAT_SCRATCH});
 let browser,page,failed;const bundleRoute=/\/app\.js(?:\?.*)?$/;let intercepted=0;
 const report={schemaVersion:2,mode,automated:true,humanParticipants:0,legacyRevision,receiptV1Image,status:'running',development,root:lab.root,imageBindings:lab.imageBindings,protocol:{receipt:2,inputAck:1}};
 try{
  browser=await chromium.launch({headless:true,executablePath:runtime.executablePath,args:['--no-sandbox','--enable-unsafe-swiftshader','--enable-gpu','--mute-audio'],proxy:{server:lab.actors.A.proxyUrl,bypass:'<-loopback>'}});
  const context=await browser.newContext({viewport:{width:1280,height:720},deviceScaleFactor:.5,reducedMotion:'reduce'});
  await context.addInitScript(()=>localStorage.setItem('botstrike:settings',JSON.stringify({sound:false,motion:false,renderFps:30,aimAssist:0})));
  page=await context.newPage();page.setDefaultTimeout(60000);const observation=observeStoreProtocol(page,origin);
  const bundle=mode==='cached-client'?legacyBundle:mode==='cached-receipt-v1-client'?receiptV1Bundle:modernBundle;
  const intercept=route=>{intercepted++;return route.fulfill({status:200,contentType:'application/javascript',body:bundle});};await page.route(bundleRoute,intercept);report.overrideBundleSha256=sha(bundle);
  assert.equal((await page.goto(origin+'/games/botstrike/')).status(),200);
  if(mode==='receipt-v1-server')await page.waitForFunction(()=>document.documentElement.dataset.inputProtocol==='unsupported');
  else await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
  assert.equal(intercepted,1,'The requested bundle override must actually load');report.phase='training-start';await page.locator('#training-start').click();
  if(modernServer||mode==='receipt-v1-server'){
   await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Client update required'));
   const before=await until(async()=>{const value=await state(page);return value?.status==='running'?value:null;}),sent=observation.inputs.length;assert.equal(await page.locator('#panel').isVisible(),true);
   await page.waitForTimeout(2200);const later=await state(page);assert.ok(later.state.tick>before.state.tick,'online match keeps running');assert.equal(observation.inputs.length,sent,'unsupported client stops sending controls');
   assert.match(await page.locator('#status').textContent(),/Client update required/);assert.equal(await page.evaluate(()=>document.documentElement.dataset.playing),'false');
   report.persistentUpdateMessage=true;report.onlineMatchContinued=true;
   if(mode==='receipt-v1-server'){
    assert.equal(sent,0,'new client never sends v1 controls or falls back to legacy');report.refusedUnsafeReceiptV1Fallback=true;
   }else{
    report.phase='reload-modern-client';await page.unroute(bundleRoute,intercept);await page.reload();await page.waitForFunction(()=>window.BotStrikeQuality&&document.documentElement.dataset.inputProtocol==='receipt');
    const reloaded=await state(page);assert.equal(reloaded.id,before.id,'reload preserves the existing Native room');report.sameRoomAfterReload=true;
    await page.waitForFunction(()=>!document.querySelector('#resume').disabled);await page.locator('#resume').click();await page.waitForFunction(()=>document.documentElement.dataset.playing==='true');
   }
  }else{
   await page.waitForFunction(()=>document.documentElement.dataset.playing==='true'&&document.documentElement.dataset.inputProtocol==='legacy');report.explicitLegacyMode=true;
  }
  if(mode!=='receipt-v1-server'){
   report.phase='native-input';const from=observation.inputs.at(-1)?.seq||0;await page.keyboard.down('KeyW');
   try{
    await until(()=>observation.snapshots.findLast(snapshot=>observation.inputs.some(input=>input.seq>from&&input.y>0&&(modernServer?storeInputAck(snapshot,input,{current:observation.currentContext})&&!snapshot.inputAck.neutral:input.seq===snapshot.lastSeq&&input.room===snapshot.room))),{timeout:15000,label:'Known new movement acknowledgement in received state'});
   }finally{await page.keyboard.up('KeyW');}
   const accepted=observation.inputs.filter(input=>input.seq>from);assert.ok(accepted.some(input=>input.y>0));assert.ok(accepted.every(input=>input.deliveryAttached===modernServer));
   report[modernServer?'explicitNativeInputAcknowledged':'legacySequenceObservationOnly']=true;
   if(modernServer){
    report.phase='same-socket-new-room';const oldRoom=await state(page),socketGeneration=observation.snapshots.at(-1).socketGeneration,closes=observation.socketCloses.length;
    await page.keyboard.press('Escape');await page.locator('#leave').click();await until(async()=>!(await state(page)),{label:'Leave first room on the existing connection'});
    await page.locator('#training-start').click();await page.waitForFunction(()=>document.documentElement.dataset.playing==='true');const next=await state(page);assert.notEqual(next.id,oldRoom.id);
    const proof=observation.snapshots.find(snapshot=>snapshot.room===next.id&&snapshot.socketGeneration===socketGeneration&&observation.inputs.some(input=>storeInputAck(snapshot,input,{requireNeutral:true,current:observation.currentContext})));
    assert.ok(proof,'New room cannot enter play before its own actually sent neutral input is explicitly acknowledged');assert.equal(observation.socketCloses.length,closes,'The new-room barrier is tested without reconnecting');
    const first=observation.inputs.find(input=>input.room===next.id);assert.ok(first&&neutral(first),'New-room first input must clear previous gameplay intent');report.sameSocketNewRoomNeutralBarrier={passed:true,ackSeq:proof.inputAck.seq,ackTick:proof.inputAck.tick};
   }
  }
  report.errors=observation.errors;assert.deepEqual(observation.errors,[]);assert.equal(observation.dropped,0);report.status='passed';
 }catch(error){failed=error;report.status='failed';report.error={message:error.message,stack:error.stack};report.intercepted=intercepted;if(page&&!page.isClosed())report.window=await page.evaluate(()=>({status:document.querySelector('#status')?.textContent,playing:document.documentElement.dataset.playing,inputProtocol:document.documentElement.dataset.inputProtocol})).catch(()=>null);if(page&&!page.isClosed())await page.screenshot({path:path.join(lab.root,'compat-failure.png')}).catch(()=>{});}
 finally{
  if(page&&!page.isClosed())try{await page.keyboard.press('Escape');await page.locator('#leave').click({timeout:3000});}catch{}
  await browser?.close();await lab.close();await fs.writeFile(path.join(lab.root,'delivery-compat.json'),JSON.stringify(report,null,2)+'\n',{mode:0o600});
 }
 if(failed)throw Object.assign(failed,{report:path.join(lab.root,'delivery-compat.json')});return report;
}
const results=[];try{for(const mode of ['cached-client','cached-receipt-v1-client','receipt-v1-server','legacy-server'])results.push(await one(mode));console.log(JSON.stringify({status:'passed',results:results.map(({mode,root,development})=>({mode,root,development})),humanParticipants:0,networkAcceptance:false}));}catch(error){console.error(JSON.stringify({status:'failed',message:error.message,report:error.report??null}));process.exitCode=1;}
