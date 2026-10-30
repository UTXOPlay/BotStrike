import assert from 'node:assert/strict';

const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const base=process.env.STORE_URL||'http://127.0.0.1:19885';
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1920,height:1080}});
await context.addInitScript(()=>{
 window.__shotBuffers=[];
 const original=AudioContext.prototype.createBuffer;
 AudioContext.prototype.createBuffer=function(channels,length,rate){window.__shotBuffers.push({channels,length,rate});return original.call(this,channels,length,rate)};
});
const page=await context.newPage(),errors=[];
page.on('pageerror',error=>errors.push(error.message));
try{
 await page.goto(base+'/games/botstrike/');
 await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
 await page.locator('#practice').click();
 await page.waitForFunction(()=>document.documentElement.dataset.playing==='true'&&document.querySelector('#phase').textContent==='TEAM DEATHMATCH');
 for(const [key,name]of [['Digit1','ARC-9'],['Digit2','NEEDLE']]){
  await page.keyboard.press(key);
  await page.waitForFunction(expected=>document.querySelector('#weapon-label').textContent===expected,name);
  await page.mouse.down();await page.waitForTimeout(110);await page.mouse.up();
 }
 await page.waitForFunction(()=>window.__shotBuffers.length>=2);
 const buffers=await page.evaluate(()=>window.__shotBuffers);
 assert.ok(buffers.some(buffer=>buffer.length/buffer.rate>.27&&buffer.length/buffer.rate<.29),'ARC-9 sample reached Web Audio');
 assert.ok(buffers.some(buffer=>buffer.length/buffer.rate>.14&&buffer.length/buffer.rate<.16),'NEEDLE sample reached Web Audio');
 assert.deepEqual(errors,[]);
 console.log('ARC-9 and NEEDLE sampled playback reached Web Audio without page errors');
}finally{
 try{if(await page.locator('#room-info').isVisible()){const departure=page.waitForResponse(response=>response.url().endsWith('/api/action')&&response.request().postDataJSON()?.type==='leave',{timeout:3000});await page.locator('#leave').evaluate(button=>button.click());assert.equal((await departure).status(),200)}}finally{await browser.close()}
}
