import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
import {waitNativeState} from './browser-native-state.mjs';
import {leaveBrowserRoom} from './botstrike-browser-room.mjs';
import {resizeMobile,screenshotMobile} from './mobile-viewport.mjs';
import {drills} from '../games/botstrike/client/practice.mjs';

const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const base=process.env.STORE_URL||'http://127.0.0.1:19921';
const out=process.env.CONTROL_ARTIFACTS||'/tmp/botstrike-tactical-ui-browser';mkdirSync(out,{recursive:true});
const cohort=process.env.UI_COHORT||'all';assert.ok(['all','desktop','mobile'].includes(cohort));
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--enable-unsafe-swiftshader','--mute-audio']});
const pages=[],contexts=[],errors=[],results=[];
const sizes=[[1920,1080],[2560,1080],[2560,1440],[3840,2160]];
const intersect=(a,b)=>!!a&&!!b&&a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y;
const inside=(r,w,h)=>r&&r.x>=-.5&&r.y>=-.5&&r.x+r.width<=w+.5&&r.y+r.height<=h+.5;
const state=page=>page.evaluate(()=>fetch('/games/botstrike/api/state').then(r=>r.json()).then(v=>v.room));
async function stable(page){await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));}
async function active(page){if(await page.evaluate(()=>document.documentElement.dataset.playing!=='true'))await page.locator('#resume').click();await page.waitForFunction(()=>document.documentElement.dataset.playing==='true');}
async function boot(options){
 const context=await browser.newContext({reducedMotion:'reduce',...options});contexts.push(context);
 await context.addInitScript(()=>localStorage.setItem('botstrike:settings',JSON.stringify({motion:false,sound:false,renderFps:30})));
 const page=await context.newPage();pages.push(page);page.inputs=[];page.mobile=!!options.isMobile;page.setDefaultTimeout(60000);
 page.on('pageerror',e=>errors.push(e.message));
 page.on('websocket',ws=>ws.on('framesent',({payload})=>{const m=JSON.parse(payload);if(m.type==='input')page.inputs.push({at:Date.now(),seq:m.input.seq,x:m.input.x,y:m.input.y,fire:m.input.fire});}));
 const response=await page.goto(base+'/games/botstrike/');assert.equal(response.status(),200,'candidate static game entry is available');
 await page.waitForFunction(()=>document.querySelector('#status')?.textContent.includes('Choose your chassis')||document.querySelector('#fatal')?.hidden===false);
 assert.equal(await page.locator('#fatal').isHidden(),true,await page.locator('#fatal').textContent());return page;
}
async function reachable(page,selector,{minimum=44,scroll=true}={}){
 const el=page.locator(selector);if(scroll)await el.scrollIntoViewIfNeeded();const r=await el.boundingBox();
 const viewport=await page.evaluate(()=>({w:innerWidth,h:innerHeight}));assert.ok(inside(r,viewport.w,viewport.h),selector+' is inside the viewport');
 assert.ok(r.width>=minimum&&r.height>=minimum,selector+' has a '+minimum+' px target');
 const clear=await el.evaluate(node=>{const r=node.getBoundingClientRect(),hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return node===hit||node.contains(hit);});
 assert.equal(clear,true,selector+' is not covered by another layer');return r;
}
async function armory(page,width,height,mobile,{checkPurchase=false}={}){
 if(mobile)await page.locator('#rack-open').tap();else await page.keyboard.press('KeyB');
 await page.locator('#buy-menu').waitFor({state:'visible'});
 const room=await state(page),player=room.state.players[room.slot];
 const spec=await(await page.request.get(base+'/games/botstrike/spec.json')).json();
 const owned=player.owned.findIndex(Boolean),unowned=player.owned.findIndex((yes,i)=>!yes&&i>0);
 const card=index=>page.locator('#buy-items>button[data-item="'+index+'"]');
 if(owned>=0){const ownedCard=card(owned);assert.match(await ownedCard.locator('.armory-availability').textContent(),/Owned|Equipped/);assert.match(await ownedCard.locator('.armory-consequence').textContent(),/magazine.*reserve/);}
 if(checkPurchase){
  assert.equal(room.state.phase,'buy','the opportunity-cost check uses a real native buy phase');assert.ok(unowned>=0,'casual native loadout has an unowned weapon');
  const affordable=player.owned.findIndex((yes,i)=>!yes&&i>0&&spec.weapons[i].cost<=player.credits),chosen=affordable>=0?affordable:unowned,entry=spec.weapons[chosen],selected=card(chosen);
  assert.equal(await selected.locator('.armory-price').textContent(),'₡ '+entry.cost);
  assert.equal(await selected.locator('.armory-consequence').textContent(),affordable>=0?'After purchase: ₡ '+(player.credits-entry.cost):'Need ₡ '+(entry.cost-player.credits)+' more');
  if(affordable>=0){
   await selected.click();const bought=await waitNativeState(page,(r,i)=>r.state.players[r.slot].owned[i],chosen);assert.equal(bought.state.players[bought.slot].credits,player.credits-entry.cost);await page.waitForFunction(i=>['owned','equipped'].includes(document.querySelector('#buy-items>button[data-item="'+i+'"]').dataset.availability),chosen);
  }
 }
 const layout=await page.evaluate(()=>{const boxes=s=>{const n=document.querySelector(s),r=n.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};};return {header:boxes('.armory-header'),firstCard:boxes('#buy-items>button:not([hidden])'),tools:boxes('.armory-tools'),catalogFirst:document.querySelector('.armory-workspace').firstElementChild.classList.contains('armory-catalog'),horizontalOverflow:document.querySelector('#buy-menu .dialog-content').scrollWidth>document.querySelector('#buy-menu .dialog-content').clientWidth+1};});
 assert.equal(layout.catalogFirst,true,'purchase choices precede setup details in document order');assert.equal(layout.horizontalOverflow,false,'armory has no horizontal overflow');
 assert.ok(layout.firstCard.y>=layout.header.y+layout.header.height-1&&layout.firstCard.y<height,'first-screen armory body starts with products');
 if(width>=3000){const fonts=await page.evaluate(()=>['#buy-balance','#buy-items>button:not([hidden]) .armory-price','#buy-items>button:not([hidden]) .armory-consequence'].map(s=>parseFloat(getComputedStyle(document.querySelector(s)).fontSize)));assert.ok(fonts.every(n=>n>=18),'4K price/consequence text is at least 18px');layout.fonts=fonts;}
 if(mobile)await screenshotMobile(page,`${out}/armory-${width}x${height}.png`);else await page.screenshot({path:`${out}/armory-${width}x${height}.png`});
 await reachable(page,'#armory-setup-open');if(mobile)await page.locator('#armory-setup-open').tap();else await page.locator('#armory-setup-open').click();
 assert.equal(await page.locator('#armory-equipment').getAttribute('open')!==null,true);assert.equal(await page.locator('#utility-choice').evaluate(n=>document.activeElement===n),true,'setup entry focuses the actual equipment selector');
 const setupBox=await reachable(page,'#utility-choice',{scroll:false});await reachable(page,'#throw-mode');
 await page.locator('#buy-close').click();await active(page);
 results.push({view:'armory',width,height,mobile,nativeOwned:owned,nativeUnowned:unowned,purchaseConsequenceChecked:checkPurchase,layout,setupBox});
}
async function training(page,width,height,mobile,{cssInsets=null}={}){
 const room=await state(page);assert.equal(room.config.mode,'practice');
 const hud=await page.locator('#practice-hud').boundingBox();assert.ok(inside(hud,width,height),'training HUD is inside the viewport');
 if(cssInsets)assert.ok(hud.x>=cssInsets.left&&hud.y>=cssInsets.top&&hud.x+hud.width<=width-cssInsets.right&&hud.y+hud.height<=height-cssInsets.bottom,'training HUD respects the simulated CSS safe rectangle');
 assert.equal(await page.locator('#practice-hud .practice-hud-stats>div').count(),2,'compact HUD retains two key native counters');
 const forbidden=mobile?['#vitals-state','#touch-jump','#touch-crouch','#crosshair']:['#radar'];const boxes={};
 for(const s of forbidden){boxes[s]=await page.locator(s).boundingBox();assert.equal(intersect(hud,boxes[s]),false,'training HUD must not overlap '+s+': '+JSON.stringify({hud,other:boxes[s]}));}
 for(const b of ['#practice-hud button:first-child','#practice-hud button:last-child'])await reachable(page,b);
 const suffix=cssInsets?'-safe-insets':'';
 if(mobile)await screenshotMobile(page,`${out}/training-${width}x${height}${suffix}.png`);else await page.screenshot({path:`${out}/training-${width}x${height}${suffix}.png`});
 if(mobile)await page.locator('#practice-hud button').nth(1).tap();else await page.keyboard.press('Escape');
 await page.locator('#practice-panel').waitFor({state:'visible'});assert.equal(await page.locator('.intro').isVisible(),false,'in-room menu removes the deployment marketing intro');
 if(width>=3000){const fonts=await page.evaluate(()=>['.practice-instruction','.practice-settings','.practice-history summary','.practice-retry-actions button'].map(s=>parseFloat(getComputedStyle(document.querySelector(s)).fontSize)));assert.ok(fonts.every(n=>n>=18),'4K training descriptions/actions are at least 18px');}
 await reachable(page,'#resume');await reachable(page,'#practice-panel [data-command="1"]');
 const oldAttempt=(await state(page)).state.practice.attempt;await page.locator('#practice-panel [data-command="1"]').click();const reset=await waitNativeState(page,(r,a)=>r.state.practice.attempt===a+1,oldAttempt);
 await page.waitForFunction(a=>document.querySelector('.practice-announcement').textContent.startsWith('Attempt '+a+'.'),reset.state.practice.attempt);
 let reportIdentityPreserved=false;
 if(reset.state.practice.reports.length){
  await page.locator('.practice-reports li').first().waitFor({state:'attached'});const report=await page.locator('.practice-reports li').first().elementHandle(),message=await page.locator('.practice-announcement').textContent(),announcementText=await page.locator('.practice-announcement').evaluateHandle(node=>node.firstChild);
  await waitNativeState(page,(r,tick)=>r.state.tick>=tick+8,reset.state.tick);
  reportIdentityPreserved=await report.evaluate(node=>node.isConnected&&node===document.querySelector('.practice-reports li'));assert.equal(reportIdentityPreserved,true,'unchanged attempt history is not rebuilt on later native frames');
  assert.equal(await page.locator('.practice-announcement').textContent(),message);assert.equal(await announcementText.evaluate(node=>node===document.querySelector('.practice-announcement').firstChild),true,'ongoing frames do not replace the live announcement');await report.dispose();await announcementText.dispose();
 }
 await page.locator('#panel').evaluate(n=>n.scrollTop=0);
 if(mobile)await screenshotMobile(page,`${out}/training-menu-${width}x${height}${suffix}.png`);else await page.screenshot({path:`${out}/training-menu-${width}x${height}${suffix}.png`});
 await page.locator('#resume').click();await active(page);assert.equal((await state(page)).id,room.id,'menu/reset keeps the native training room');
 results.push({view:'training',width,height,mobile,hud,forbiddenBoxes:boxes,resetAccepted:true,reportIdentityPreserved,simulatedCssInsets:cssInsets});
}
async function retakeUse(page,cssInsets){
 const initial=await state(page);assert.equal(initial.state.practice.settings.drill,0);
 await page.locator('#practice-hud button').nth(1).tap();await page.locator('#practice-panel').waitFor({state:'visible'});
 for(let drill=1;drill<=6;drill++){
  await page.locator('#practice-panel [data-command="6"]').click();await waitNativeState(page,(r,d)=>r.state.practice.settings.drill===d,drill);
  await page.waitForFunction(name=>document.querySelector('.practice-title').textContent===name,drills[drill][0]);await stable(page);
 }
 await page.locator('#resume').click();await page.waitForFunction(()=>document.documentElement.dataset.playing==='true');
 const native=await state(page);assert.equal(native.id,initial.id);assert.equal(native.state.practice.settings.drill,6);
 await page.locator('#touch-interact').waitFor({state:'visible'});const use=await reachable(page,'#touch-interact',{scroll:false}),hp=await page.locator('#vitals-state').boundingBox();
 assert.equal(intersect(use,hp),false,'Retake Use button does not cover HP');assert.ok(use.x>=cssInsets.left&&use.y>=cssInsets.top&&use.x+use.width<=844-cssInsets.right&&use.y+use.height<=390-cssInsets.bottom,'Retake Use target respects simulated CSS safe insets');
 await screenshotMobile(page,out+'/retake-use-safe-insets-844x390.png');results.push({view:'retake-touch-use',nativeDrill:6,nativeMap:native.state.config.map,sameNativeRoom:true,nextDrillCommands:6,use,hp,simulatedCssInsets:cssInsets});
}

try{
 if(cohort!=='mobile'){
 const desktop=await boot({viewport:{width:1920,height:1080},deviceScaleFactor:.5});
 await desktop.locator('#mode').selectOption('demolition');await desktop.locator('#practice').click();await desktop.waitForFunction(()=>document.documentElement.dataset.playing==='true');await waitNativeState(desktop,r=>r.state?.phase==='buy');
 await armory(desktop,1920,1080,false,{checkPurchase:true});await leaveBrowserRoom(desktop);
 await desktop.locator('#practice-drill').selectOption('0');await desktop.locator('#training-start').click();await desktop.waitForFunction(()=>document.documentElement.dataset.playing==='true');await waitNativeState(desktop,r=>!!r.state?.practice);
 for(const [width,height]of sizes){await desktop.setViewportSize({width,height});await stable(desktop);await active(desktop);await training(desktop,width,height,false);await armory(desktop,width,height,false);}
 await leaveBrowserRoom(desktop);await desktop.context().close();
 }
 if(cohort!=='desktop'){
 const phone=await boot({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});
 await phone.locator('#immersive-gate').waitFor({state:'visible'});assert.equal(await phone.locator('#game-content').evaluate(n=>n.inert),true);await screenshotMobile(phone,out+'/portrait-gate.png');results.push({view:'portrait',width:390,height:844,gameOwnedGate:true});
 await phone.locator('#immersive-enter').click();await resizeMobile(phone,844,390);await phone.locator('#immersive-gate').waitFor({state:'hidden'});await phone.locator('#training-start').click();await phone.waitForFunction(()=>document.documentElement.dataset.playing==='true');await waitNativeState(phone,r=>!!r.state?.practice);
 await training(phone,844,390,true);await armory(phone,844,390,true);
 const cdp=await phone.context().newCDPSession(phone),cssInsets={top:20,bottom:24,left:32,right:32},viewportBefore=await phone.evaluate(()=>[innerWidth,innerHeight]);
 await cdp.send('Emulation.setSafeAreaInsetsOverride',{insets:cssInsets});await stable(phone);assert.deepEqual(await phone.evaluate(()=>[innerWidth,innerHeight]),viewportBefore,'CSS safe-area emulation does not change the viewport/input transform');
 await training(phone,844,390,true,{cssInsets});
 const room=await state(phone),startShots=room.state.practice.shots,move=await phone.locator('#move-pad').boundingBox(),fire=await phone.locator('#touch-fire').boundingBox();
 const points=[{id:1,x:move.x+move.width/2,y:move.y+move.height/2},{id:2,x:fire.x+fire.width/2,y:fire.y+fire.height/2}];
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:points});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...points[0],x:points[0].x+28,y:points[0].y-28},points[1]]});
 const held=await waitNativeState(phone,(r,shots)=>r.state.practice.shots>shots&&Math.hypot(...r.state.players[r.slot].velocity)>1,startShots);const previousSeq=held.state.players[held.slot].last_seq,inputIndex=phone.inputs.length;
 await phone.evaluate(()=>document.exitFullscreen());await phone.locator('#immersive-gate').waitFor({state:'visible'});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 await waitNativeState(phone,(r,seq)=>r.id===room.id&&r.state.players[r.slot].last_seq>seq&&Math.hypot(...r.state.players[r.slot].velocity)<1,previousSeq);
 assert.ok(phone.inputs.slice(inputIndex).some(i=>!i.fire&&i.x===0&&i.y===0),'fullscreen exit sends fresh neutral held input');assert.equal((await state(phone)).id,room.id);
 await phone.locator('#immersive-enter').click();await phone.locator('#immersive-gate').waitFor({state:'hidden'});await active(phone);const afterResume=phone.inputs.length;await phone.waitForTimeout(200);assert.ok(phone.inputs.slice(afterResume).every(i=>!i.fire&&i.x===0&&i.y===0),'reentry does not replay held touches');
 await resizeMobile(phone,390,844);await phone.locator('#immersive-gate').waitFor({state:'visible'});assert.equal((await state(phone)).id,room.id);await screenshotMobile(phone,out+'/portrait-retained-room.png');
 await resizeMobile(phone,844,390);await stable(phone);if(await phone.locator('#immersive-gate').isVisible())await phone.locator('#immersive-enter').click();await phone.locator('#immersive-gate').waitFor({state:'hidden'});await active(phone);await retakeUse(phone,cssInsets);await leaveBrowserRoom(phone);await phone.context().close();
 results.push({view:'mobile-lifecycle',fullscreenHeldInputCleared:true,sameNativeRoomPreserved:true,rotationGate:true});
 }
 assert.deepEqual(errors,[]);writeFileSync(out+'/measurements.json',JSON.stringify({automated:true,humanParticipants:0,softwareRendering:true,physicalPerformanceAccepted:false,cohort,desktopDpr:.5,mobileDpr:1,results,errors},null,2));console.log(JSON.stringify({viewports:cohort==='all'?6:cohort==='desktop'?4:2,results:results.length,errors,output:out}));
}catch(error){
 const diagnostics=[];for(const [index,page]of pages.entries())if(!page.isClosed())try{diagnostics.push(await page.evaluate(()=>({url:location.href,playing:document.documentElement.dataset.playing,active:document.activeElement?.id,rects:Object.fromEntries(['#practice-hud','#radar','#vitals-state','#touch-jump','#touch-crouch','#practice-panel','#resume','.armory-header','#buy-items'].map(s=>{const n=document.querySelector(s),r=n?.getBoundingClientRect();return[s,r?{x:r.x,y:r.y,width:r.width,height:r.height}:null];}))})));if(page.mobile)await screenshotMobile(page,out+'/failure-'+index+'.png');else await page.screenshot({path:out+'/failure-'+index+'.png'});}catch{}
 writeFileSync(out+'/failure.json',JSON.stringify({error:String(error),results,errors,diagnostics},null,2));throw error;
}finally{for(const page of pages)if(!page.isClosed())try{await leaveBrowserRoom(page)}catch{}await browser.close();}
