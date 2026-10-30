import assert from 'node:assert/strict';

const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const base=process.env.STORE_URL||'http://127.0.0.1:19885';
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1920,height:1080}});
await context.addInitScript(()=>{
 window.__shotBuffers=[];window.__startedShots=[];
 const original=AudioContext.prototype.createBuffer;
 AudioContext.prototype.createBuffer=function(channels,length,rate){window.__shotBuffers.push({channels,length,rate});return original.call(this,channels,length,rate)};
 const start=AudioBufferSourceNode.prototype.start;
 AudioBufferSourceNode.prototype.start=function(...args){window.__startedShots.push(this.buffer?.duration);return start.apply(this,args)};
});
const page=await context.newPage(),errors=[];
page.on('pageerror',error=>errors.push(error.message));
try{
 await page.goto(base+'/games/botstrike/');
 await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
 await page.locator('#practice').click();
 try{await page.waitForFunction(()=>document.documentElement.dataset.playing==='true'&&document.querySelector('#phase').textContent==='TEAM DEATHMATCH',undefined,{timeout:15000});}
 catch(error){console.error('Practice startup:',await page.evaluate(()=>({status:document.querySelector('#status').textContent,phase:document.querySelector('#phase').textContent,playing:document.documentElement.dataset.playing})),errors);throw error;}
 for(const [key,weapon,name,duration]of [['Digit1',0,'ARC-9',.28],['Digit2',1,'NEEDLE',.15],['Digit5',4,'SCATTER',.38]]){
  await page.keyboard.press(key);
  await page.waitForFunction(expected=>document.querySelector('#weapon-label').textContent===expected,name);
  await page.waitForFunction(expected=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(({room})=>room.state.players[room.slot].weapon===expected),weapon);
  const before=await page.evaluate(()=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(({room})=>room.state.players[room.slot].shots));
  const started=await page.evaluate(()=>window.__startedShots.length);
  await page.mouse.down();await page.waitForTimeout(110);await page.mouse.up();
  await page.waitForFunction(before=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(({room})=>room.state.players[room.slot].shots>before),before);
  await page.waitForFunction(([started,duration])=>window.__startedShots.slice(started).some(value=>Math.abs(value-duration)<.01),[started,duration]);
 }
 await page.waitForFunction(()=>window.__shotBuffers.length>=3);
 const buffers=await page.evaluate(()=>window.__shotBuffers);
 assert.ok(buffers.some(buffer=>buffer.length/buffer.rate>.27&&buffer.length/buffer.rate<.29),'ARC-9 sample reached Web Audio');
 assert.ok(buffers.some(buffer=>buffer.length/buffer.rate>.14&&buffer.length/buffer.rate<.16),'NEEDLE sample reached Web Audio');
 assert.ok(buffers.some(buffer=>buffer.length/buffer.rate>.37&&buffer.length/buffer.rate<.39),'SCATTER sample reached Web Audio');
 assert.deepEqual(errors,[]);
 console.log('ARC-9, NEEDLE and SCATTER sampled playback started in native practice without page errors');
}finally{
 try{if(await page.locator('#room-info').isVisible()){const departure=page.waitForResponse(response=>response.url().endsWith('/api/action')&&response.request().postDataJSON()?.type==='leave',{timeout:3000});await page.locator('#leave').evaluate(button=>button.click());assert.equal((await departure).status(),200)}}finally{await browser.close()}
}
