import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:844,height:390},hasTouch:true,isMobile:true}),errors=[];
page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(60000);
try{
 await page.goto((process.env.STORE_URL||'http://127.0.0.1:19885')+'/games/botstrike/');
 await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
 await page.locator('#immersive-enter').click();await page.locator('#practice').click();await page.waitForFunction(()=>document.documentElement.dataset.playing==='true');
 await page.evaluate(()=>{const canvas=document.querySelector('#arena'),gl=canvas.getContext('webgl2');window.restoreEvents=[];canvas.addEventListener('webglcontextlost',()=>restoreEvents.push('lost'));canvas.addEventListener('webglcontextrestored',()=>restoreEvents.push('restored'));window.loss=gl.getExtension('WEBGL_lose_context');loss.loseContext();});
 await page.waitForFunction(()=>restoreEvents.includes('lost'));await page.evaluate(()=>loss.restoreContext());
 await page.waitForFunction(()=>restoreEvents.includes('restored'));
 await page.waitForTimeout(2000);
 const result=await page.evaluate(()=>{const c=document.querySelector('#arena'),gl=c.getContext('webgl2'),pixels=new Uint8Array(4);gl.readPixels(c.width/2,c.height/2,1,1,gl.RGBA,gl.UNSIGNED_BYTE,pixels);return {events:restoreEvents,lost:gl.isContextLost(),drawCalls:Number(document.documentElement.dataset.drawCalls),width:c.width,height:c.height};});
 assert.equal(result.lost,false);assert.ok(result.drawCalls>0);assert.ok(result.width*result.height<=1280*720);assert.deepEqual(errors,[]);
 await page.screenshot({path:process.env.CONTEXT_SCREENSHOT||'/tmp/botstrike-context-restored.png'});
 console.log(JSON.stringify(result));
}finally{await page.evaluate(()=>fetch('/games/botstrike/api/action',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'leave'})})).catch(()=>{});await browser.close();}
