import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
import {WebSocket} from 'ws';
import {resizeMobile,screenshotMobile} from './mobile-viewport.mjs';
import {waitNativeState} from './browser-native-state.mjs';
import {waitBrowserCondition} from './browser-condition.mjs';
import {leaveBrowserRoom} from './botstrike-browser-room.mjs';
const {chromium,request}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const mobile=process.env.TACTICAL_TOUCH==='1';
const base=process.env.STORE_URL||'http://127.0.0.1:19903',out=process.env.CONTROL_ARTIFACTS||(mobile?'/tmp/botstrike-v5-tactical-touch':'/tmp/botstrike-v5-tactical-browser');mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--enable-unsafe-swiftshader']}),clients=[],sockets=[],errors=[],results=[];
const packets=[],useInputs=[];let observeUse=false;
const context=await browser.newContext(mobile?{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1}:{viewport:{width:1920,height:1080},deviceScaleFactor:.5}),page=await context.newPage();page.setDefaultTimeout(60000);page.on('pageerror',e=>errors.push(e.message));page.on('websocket',socket=>socket.on('framesent',({payload})=>{try{const value=JSON.parse(payload);if(value.type==='input'){packets.push(value.input);if(observeUse)useInputs.push({seq:value.input.seq,interact:value.input.interact,observedAt:Date.now()});if(packets.length>30)packets.shift();}}catch{}}));
let cssSafeInsets=null;
async function readiness(pilots,ready,label){
 const room=await waitNativeState(page,r=>r?.status==='waiting'&&r.roster.filter(p=>!p.bot&&p.connected).length===pilots&&r.roster.filter(p=>!p.bot&&p.connected&&p.ready).length===ready);
 await page.locator('#lobby-readiness').waitFor({state:'visible'});
 await page.waitForFunction(({pilots,ready})=>{const root=document.querySelector('#lobby-readiness'),p=root.querySelector('progress');return root.querySelector('span').textContent===pilots+' / 10 PILOTS · '+ready+' / 10 READY'&&p.max===10&&p.value===ready;},{pilots,ready});
 const progress=await page.locator('#lobby-readiness progress').evaluate(p=>({max:p.max,value:p.value,position:p.position,label:p.getAttribute('aria-label')}));
 assert.equal(progress.position,ready/10);assert.equal(progress.label,'Ready pilots');results.push({view:'lobby-readiness',stage:label,nativeConnectedPilots:pilots,nativeReadyPilots:ready,room:room.id,progress});
}
async function matchEntryControls(){
 await page.waitForFunction(()=>document.documentElement.dataset.playing==='true');
 for(const id of ['buy-open','comms-open'])await page.locator('#'+id).waitFor({state:'visible'});
 const controls=await page.evaluate(()=>Object.fromEntries(['buy-open','comms-open'].map(id=>{const node=document.getElementById(id),r=node.getBoundingClientRect(),hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return[id,{x:r.x,y:r.y,width:r.width,height:r.height,uncovered:hit===node||node.contains(hit),font:parseFloat(getComputedStyle(node).fontSize)}];}))),a=controls['buy-open'],b=controls['comms-open'];
 assert.equal(a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y,false,'armory and communication entry targets do not overlap');
 const viewport=await page.evaluate(()=>({width:innerWidth,height:innerHeight})),safe=cssSafeInsets||{left:0,right:0,top:0,bottom:0};
 for(const [name,r]of Object.entries(controls)){assert.ok(r.width>=44&&r.height>=44,name+' has a 44px target');assert.equal(r.uncovered,true,name+' is reachable by a real pointer');assert.ok(r.x>=safe.left&&r.y>=safe.top&&r.x+r.width<=viewport.width-safe.right&&r.y+r.height<=viewport.height-safe.bottom,name+' stays inside the safe viewport');}
 if(mobile)assert.ok(b.font>=12,'mobile communication entry text remains at least 12px');
 results.push({view:'match-entry-controls',mobile,controls,simulatedCssInsets:cssSafeInsets});
}
try{
 await page.goto(base+'/games/botstrike/');await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
 if(mobile){await page.locator('#immersive-gate').waitFor({state:'visible'});await screenshotMobile(page,out+'/portrait.png');await page.locator('#immersive-enter').click();await resizeMobile(page,844,390);await page.locator('#immersive-gate').waitFor({state:'hidden'});cssSafeInsets={top:20,bottom:24,left:32,right:32};const cdp=await context.newCDPSession(page);await cdp.send('Emulation.setSafeAreaInsetsOverride',{insets:cssSafeInsets});assert.deepEqual(await page.evaluate(()=>[innerWidth,innerHeight]),[844,390]);results.push({width:390,height:844,portraitRotationGate:true});}
 await page.locator('#private-ruleset').selectOption('tactical');await page.locator('#private').click();
 let room=await waitNativeState(page,r=>r.config.ruleset==='tactical'&&r.status==='waiting');const id=room.id;
 assert.equal(await page.locator('#start').isDisabled(),true);assert.equal(await page.locator('#tactical-ready').isVisible(),true);
 await readiness(1,0,'initial');
 for(let i=1;i<10;i++){
  const client=await request.newContext({baseURL:base,extraHTTPHeaders:{Origin:base}});clients.push(client);
  assert.equal((await client.post('/api/guest',{data:{}})).status(),200);
  const joined=await client.post('/games/botstrike/api/action',{data:{type:'join',room:id,hero:Math.floor(i/2)}});assert.equal(joined.status(),200,await joined.text());
  const cookies=(await client.storageState()).cookies.map(c=>c.name+'='+c.value).join(';');
  const ws=new WebSocket(base.replace('http','ws')+'/games/botstrike/api/socket',{headers:{Origin:base,Cookie:cookies}});sockets.push(ws);
  const token=await new Promise((resolve,reject)=>{ws.on('error',reject);ws.on('message',raw=>{const m=JSON.parse(raw);if(m.type==='control'&&m.active)resolve(m.token);});});
  assert.equal((await client.post('/games/botstrike/api/action',{data:{type:'ready',ready:true,controlToken:token}})).status(),200);
 }
 // Every roster change resets all readiness; mark the nine peers after assembly.
 for(let i=0;i<clients.length;i++){
  const ws=sockets[i];const control=await new Promise(resolve=>{const handler=raw=>{const m=JSON.parse(raw);if(m.type==='control'&&m.active){ws.off('message',handler);resolve(m.token);}};ws.on('message',handler);ws.send(JSON.stringify({type:'claim',room:id}));});
  assert.equal((await clients[i].post('/games/botstrike/api/action',{data:{type:'ready',ready:true,controlToken:control}})).status(),200);
 }
 await readiness(10,9,'peers-ready');assert.equal(await page.locator('#start').isDisabled(),true);
 await page.locator('#tactical-ready').click();await readiness(10,10,'all-ready');await page.waitForFunction(()=>!document.querySelector('#start').disabled);if(mobile)await screenshotMobile(page,out+'/ready-lobby.png');else await page.screenshot({path:out+'/ready-lobby.png'});
 await page.locator('#start').click();await waitNativeState(page,r=>r.state?.phase==='buy');
 await matchEntryControls();
 if(mobile)await page.locator('#buy-open').tap();else await page.keyboard.press('KeyB');await page.locator('#buy-menu').waitFor({state:'visible'});
 assert.match(await page.locator('#team-economy').textContent(),/PILOT 1.*₡ 800/);assert.doesNotMatch(await page.locator('#team-economy').textContent(),/PILOT 6/);
 assert.match(await page.locator('[data-item="2"] .armory-action').textContent(),/PRIMARY · EMPTY SLOT/);
 if(mobile)await page.locator('#drop-current').tap();else{await page.locator('#drop-current').focus();await page.keyboard.press('Enter');}
 room=await waitNativeState(page,r=>r.state?.players[0].unarmed===true);assert.equal(room.state.players[0].owned[0],false);
 assert.equal(await page.locator('#buy-items [data-item="0"]').isDisabled(),true);
 for(const [width,height]of (mobile?[[844,390]]:[[1920,1080],[2560,1080],[2560,1440],[3840,2160]])){
  if(mobile)await resizeMobile(page,width,height);else await page.setViewportSize({width,height});await page.waitForTimeout(100);if(mobile)await screenshotMobile(page,`${out}/armory-${width}x${height}.png`);else await page.screenshot({path:`${out}/armory-${width}x${height}.png`});
  const rect=await page.locator('#drop-current').boundingBox();assert.ok(rect.width>=44&&rect.height>=44);results.push({width,height,dropButton:rect});
 }
 await page.locator('#buy-close').focus();await page.keyboard.press('Enter');await page.waitForFunction(()=>document.documentElement.dataset.playing==='true'&&document.querySelector('#buy-menu').hidden);await waitNativeState(page,r=>r.state?.phase==='live');
 assert.equal(await page.locator('#crosshair').evaluate(el=>getComputedStyle(el).display),'none');assert.equal(await page.locator('#weapon-label').textContent(),'EMPTY HANDS');
 const throttle=mobile?Number(process.env.TACTICAL_CPU_THROTTLE||1):1;assert.ok(Number.isFinite(throttle)&&throttle>=1&&throttle<=16);const useCdp=mobile?await context.newCDPSession(page):null;
 if(mobile)await page.locator('#touch-interact').evaluate(node=>{window.usePointerEvents=[];for(const kind of ['pointerdown','pointerup','pointercancel','lostpointercapture'])node.addEventListener(kind,event=>window.usePointerEvents.push({kind,trusted:event.isTrusted,pointerType:event.pointerType,at:performance.timeOrigin+performance.now()}),true);});
 if(throttle>1)await useCdp.send('Emulation.setCPUThrottlingRate',{rate:throttle});observeUse=true;
 try{
  if(mobile)await page.locator('#touch-interact').tap();else{await page.keyboard.down('KeyE');await page.waitForTimeout(150);await page.keyboard.up('KeyE');}await waitNativeState(page,r=>r.state?.players[0].owned[0]===true);
  const released=()=>{const first=useInputs.find(input=>input.interact);return !!first&&useInputs.some(input=>input.seq>first.seq&&!input.interact);},until=Date.now()+15000;while(!released()&&Date.now()<until)await new Promise(resolve=>setTimeout(resolve,25));assert.ok(released(),'Use is emitted and then released');
 }finally{observeUse=false;if(throttle>1)await useCdp.send('Emulation.setCPUThrottlingRate',{rate:1});}
 const pointerEvents=mobile?await page.evaluate(()=>window.usePointerEvents):[];if(mobile){assert.ok(pointerEvents.some(event=>event.kind==='pointerdown'&&event.trusted&&event.pointerType==='touch'));assert.ok(pointerEvents.some(event=>event.kind==='pointerup'&&event.trusted));}
 results.push({view:'use-recovery',mobile,cpuThrottleRate:throttle,nativeRecoveryAcknowledged:true,releaseInputObserved:true,pointerEvents,inputs:useInputs});
 await page.waitForFunction(()=>getComputedStyle(document.querySelector('#crosshair')).display!=='none');
 if(mobile){await page.evaluate(()=>document.exitFullscreen());await page.locator('#immersive-gate').waitFor({state:'visible'});assert.equal((await page.evaluate(()=>fetch('/games/botstrike/api/state').then(r=>r.json()))).room.id,id);await page.locator('#immersive-enter').click();await page.locator('#immersive-gate').waitFor({state:'hidden'});await page.locator('#menu-toggle').tap();}else await page.keyboard.press('Escape');await leaveBrowserRoom(page);
 assert.deepEqual(errors,[]);const result={automated:true,humanParticipants:0,readyGate:true,privateRuleset:true,keyboardDrop:!mobile,touchDrop:mobile,unarmedPresentation:true,nativeRecovery:true,teamBudgetPrivate:true,results,errors};writeFileSync(out+'/measurements.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
}catch(error){writeFileSync(out+'/failure-debug.json',JSON.stringify({error:String(error),packets,useInputs,ui:await page.evaluate(()=>({playing:document.documentElement.dataset.playing,panelHidden:document.querySelector('#panel').hidden,buyHidden:document.querySelector('#buy-menu').hidden,gateHidden:document.querySelector('#immersive-gate')?.hidden,fullscreen:!!document.fullscreenElement,dimensions:[innerWidth,innerHeight],use:document.querySelector('#touch-interact').outerHTML})).catch(()=>null)},null,2));throw error;}finally{sockets.forEach(s=>s.terminate());for(const c of clients)await c.dispose();await browser.close();}
