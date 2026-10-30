import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {leaveBrowserRoom} from './botstrike-browser-room.mjs';

const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const base=process.env.STORE_URL||'http://127.0.0.1:19885',out=process.env.ART_OUTPUT||'/tmp/botstrike-scatter-browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1920,height:1080}}),errors=[];
page.setDefaultTimeout(30000);page.on('pageerror',error=>errors.push(error.message));
try{
 await page.goto(base+'/games/botstrike/');
 await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
 await page.locator('#practice').click();
 await page.waitForFunction(()=>document.documentElement.dataset.playing==='true');
 await page.keyboard.press('Digit5');
 await page.waitForFunction(()=>document.querySelector('#weapon-label').textContent==='SCATTER');
 await page.waitForFunction(()=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(({room})=>{const pilot=room.state.players[room.slot];return pilot.weapon===4&&pilot.alive&&pilot.fire_wait===0}));
 const canvas=await page.locator('#arena').boundingBox();await page.mouse.move(canvas.x+canvas.width/2,canvas.y+canvas.height/2);
 const before=await page.evaluate(()=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(({room})=>({shots:room.state.players[room.slot].shots,seq:room.state.players[room.slot].last_seq})));
 await page.mouse.down();await page.waitForTimeout(120);await page.mouse.up();
 await page.waitForFunction(before=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(({room})=>{const pilot=room.state.players[room.slot];return pilot.shots>before.shots&&pilot.last_seq>before.seq}),before);
 for(const [width,height]of [[1920,1080],[844,390]]){
  await page.setViewportSize({width,height});
  await page.waitForTimeout(150);
  assert.ok(await page.evaluate(()=>Number(document.documentElement.dataset.viewModelTriangles)>500));
  await page.screenshot({path:`${out}/scatter-${width}x${height}.png`});
 }
 assert.deepEqual(errors,[]);
 console.log('SCATTER equips and fires in native practice, and renders at desktop and compact viewports');
}finally{
 try{await leaveBrowserRoom(page)}finally{await browser.close()}
}
