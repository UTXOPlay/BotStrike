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
const packets=[];
const context=await browser.newContext(mobile?{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1}:{viewport:{width:1920,height:1080},deviceScaleFactor:.5}),page=await context.newPage();page.setDefaultTimeout(60000);page.on('pageerror',e=>errors.push(e.message));page.on('websocket',socket=>socket.on('framesent',({payload})=>{try{const value=JSON.parse(payload);if(value.type==='input'){packets.push(value.input);if(packets.length>30)packets.shift();}}catch{}}));
try{
 await page.goto(base+'/games/botstrike/');await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
 if(mobile){await page.locator('#immersive-gate').waitFor({state:'visible'});await screenshotMobile(page,out+'/portrait.png');await page.locator('#immersive-enter').click();await resizeMobile(page,844,390);await page.locator('#immersive-gate').waitFor({state:'hidden'});results.push({width:390,height:844,portraitRotationGate:true});}
 await page.locator('#private-ruleset').selectOption('tactical');await page.locator('#private').click();
 let room=await waitNativeState(page,r=>r.config.ruleset==='tactical'&&r.status==='waiting');const id=room.id;
 assert.equal(await page.locator('#start').isDisabled(),true);assert.equal(await page.locator('#tactical-ready').isVisible(),true);
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
 await page.locator('#tactical-ready').click();await page.waitForFunction(()=>!document.querySelector('#start').disabled);if(mobile)await screenshotMobile(page,out+'/ready-lobby.png');else await page.screenshot({path:out+'/ready-lobby.png'});
 await page.locator('#start').click();await waitNativeState(page,r=>r.state?.phase==='buy');
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
 if(mobile)await page.locator('#touch-interact').tap();else{await page.keyboard.down('KeyE');await page.waitForTimeout(150);await page.keyboard.up('KeyE');}await waitNativeState(page,r=>r.state?.players[0].owned[0]===true);
 await page.waitForFunction(()=>getComputedStyle(document.querySelector('#crosshair')).display!=='none');
 if(mobile){await page.evaluate(()=>document.exitFullscreen());await page.locator('#immersive-gate').waitFor({state:'visible'});assert.equal((await page.evaluate(()=>fetch('/games/botstrike/api/state').then(r=>r.json()))).room.id,id);await page.locator('#immersive-enter').click();await page.locator('#immersive-gate').waitFor({state:'hidden'});await page.locator('#menu-toggle').tap();}else await page.keyboard.press('Escape');await leaveBrowserRoom(page);
 assert.deepEqual(errors,[]);const result={automated:true,humanParticipants:0,readyGate:true,privateRuleset:true,keyboardDrop:!mobile,touchDrop:mobile,unarmedPresentation:true,nativeRecovery:true,teamBudgetPrivate:true,results,errors};writeFileSync(out+'/measurements.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
}catch(error){writeFileSync(out+'/failure-debug.json',JSON.stringify({error:String(error),packets,ui:await page.evaluate(()=>({playing:document.documentElement.dataset.playing,panelHidden:document.querySelector('#panel').hidden,buyHidden:document.querySelector('#buy-menu').hidden,gateHidden:document.querySelector('#immersive-gate')?.hidden,fullscreen:!!document.fullscreenElement,dimensions:[innerWidth,innerHeight],use:document.querySelector('#touch-interact').outerHTML})).catch(()=>null)},null,2));throw error;}finally{sockets.forEach(s=>s.terminate());for(const c of clients)await c.dispose();await browser.close();}
