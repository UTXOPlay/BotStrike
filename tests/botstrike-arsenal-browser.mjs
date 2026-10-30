import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {leaveBrowserRoom} from './botstrike-browser-room.mjs';

const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const base=process.env.STORE_URL||'http://127.0.0.1:19885';
const out=process.env.CONTROL_ARTIFACTS||'/tmp/botstrike-arsenal';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
const desktop=await browser.newContext({viewport:{width:1920,height:1080}});
const touch=await browser.newContext({viewport:{width:844,height:390},hasTouch:true,isMobile:true});
const errors=[];
const pages=[await desktop.newPage(),await touch.newPage()];
for(const page of pages){page.setDefaultTimeout(60000);page.on('pageerror',error=>errors.push(error.message))}
const state=async context=>(await (await context.request.get(base+'/games/botstrike/api/state')).json()).room.state;
const live=()=>document.documentElement.dataset.playing==='true'&&!document.querySelector('#hud').hidden;

try{
 if(process.env.PUBLIC_GUEST)for(const context of [desktop,touch])assert.equal((await context.request.post(base+'/api/guest',{headers:{Origin:base},data:{}})).status(),200);
 const [desk,phone]=pages;
 await desk.goto(base+'/games/botstrike/');
 await desk.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
 await desk.locator('#mode').selectOption('demolition');
 await desk.locator('#practice').click();
 await desk.waitForFunction(live);
 assert.equal(await desk.locator('#rack-open span').textContent(),'1 OWNED');
 assert.equal(await desk.locator('#rack-next').isHidden(),true);
 await desk.keyboard.press('Digit2');
 await desk.waitForTimeout(150);
 assert.equal((await state(desktop)).players[0].weapon,0,'unowned demolition weapon cannot equip');
 await desk.keyboard.press('KeyB');
 await desk.locator('#buy-menu').waitFor({state:'visible'});
 assert.equal(await desk.locator('#buy-items button[data-item="1"]').isDisabled(),true);
 await desk.screenshot({path:out+'/demolition-armory.png'});
 await leaveBrowserRoom(desk);

 await desk.locator('#mode').selectOption('deathmatch');
 await desk.locator('#practice').click();
 await desk.waitForFunction(live);
 const spec=await (await desktop.request.get(base+'/games/botstrike/spec.json')).json();
 const desktopWeapon=(await state(desktop)).players[0].weapon;
 await desk.waitForFunction(name=>document.querySelector('#weapon-label').textContent===name,spec.weapons[desktopWeapon].name);
 assert.equal(await desk.locator('#rack-open span').textContent(),'12 OWNED');
 for(const [width,height] of [[1920,1080],[2560,1080],[2560,1440],[3840,2160],[390,844]]){
  await desk.setViewportSize({width,height});
  const boxes=await desk.evaluate(()=>Object.fromEntries(['#weapon-rack','.loadout'].map(selector=>{const r=document.querySelector(selector).getBoundingClientRect();return [selector,{x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height}]})));
  const rack=boxes['#weapon-rack'],ammo=boxes['.loadout'];
  assert.ok(rack.x>=0&&rack.y>=0&&rack.right<=width&&rack.bottom<=height,JSON.stringify({width,height,rack}));
  assert.ok(rack.bottom<=ammo.y+1,JSON.stringify({width,height,rack,ammo}));
  await desk.screenshot({path:`${out}/arsenal-${width}x${height}.png`});
 }
 await leaveBrowserRoom(desk);

 await phone.goto(base+'/games/botstrike/');
 await phone.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
 await phone.locator('#immersive-enter').click();
 await phone.locator('#immersive-gate').waitFor({state:'hidden'});
 await phone.locator('#mode').selectOption('deathmatch');
 await phone.locator('#practice').click();
 await phone.waitForFunction(live);
 let me=(await state(touch)).players[0];
 assert.equal(me.owned.filter(Boolean).length,12);
 assert.equal(await phone.locator('#rack-open span').textContent(),'12 OWNED');
 assert.equal(Number(await phone.locator('#rack-next').getAttribute('data-weapon')),(me.weapon+1)%12);
 assert.equal(await phone.locator('#rack-next small').textContent(),`NEXT · ${me.ammo[(me.weapon+1)%12]} / ${me.reserve[(me.weapon+1)%12]}`);
 const next=Number(await phone.locator('#rack-next').getAttribute('data-weapon'));
 await phone.locator('#rack-next').click();
 await phone.waitForFunction(async index=>{const r=await(await fetch('/games/botstrike/api/state')).json();return r.room.state.players[0].weapon===index},next);
 await phone.waitForFunction(name=>document.querySelector('#weapon-label').textContent===name,spec.weapons[next].name);
 assert.equal(await phone.locator('#weapon-label').textContent(),spec.weapons[next].name);
 await phone.locator('#rack-open').click();
 await phone.locator('#buy-menu').waitFor({state:'visible'});
 await phone.locator('#buy-items button[data-item="11"]').click();
 await phone.waitForFunction(async()=>{const r=await(await fetch('/games/botstrike/api/state')).json();return r.room.state.players[0].weapon===11});
 await phone.waitForFunction(name=>document.querySelector('#weapon-label').textContent===name,spec.weapons[11].name);
 assert.equal((await state(touch)).players[0].weapon,11);
 await phone.screenshot({path:out+'/mobile-arsenal.png'});
 await phone.setViewportSize({width:390,height:844});
 await phone.locator('#immersive-gate').waitFor({state:'visible'});
 await phone.screenshot({path:out+'/portrait-gate.png'});
 const portrait=await phone.evaluate(()=>{const r=document.querySelector('#weapon-rack').getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom}});
 assert.ok(portrait.x>=0&&portrait.y>=0&&portrait.right<=390&&portrait.bottom<=844,JSON.stringify(portrait));
 await leaveBrowserRoom(phone);
 assert.deepEqual(errors,[]);
 console.log('Native ownership, rejected unowned selection, touch preview equip and armory equip passed');
}finally{for(const page of pages)try{await leaveBrowserRoom(page)}catch{}await browser.close()}
