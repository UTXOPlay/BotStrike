import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const base=process.env.STORE_URL||'http://127.0.0.1:19885',out=process.env.FPS_OUTPUT||'/tmp/botstrike-fps';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--enable-unsafe-swiftshader']});
try{
 for(const mobile of [false,true]){
  const context=await browser.newContext({viewport:mobile?{width:844,height:390}:{width:1440,height:900},isMobile:mobile,hasTouch:mobile}),page=await context.newPage(),errors=[];page.setDefaultTimeout(60000);page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/games/botstrike/');await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
  if(mobile)await page.locator('#immersive-enter').click();const [created]=await Promise.all([page.waitForResponse(r=>r.url().endsWith('/api/action')&&r.request().method()==='POST'),page.locator('#practice').click()]);assert.ok(created.ok(),await created.text());await page.waitForFunction(()=>document.documentElement.dataset.playing==='true'&&Number(document.documentElement.dataset.viewModelTriangles)>500);
  await page.screenshot({path:out+'/'+(mobile?'mobile':'desktop')+'-arms.png'});assert.deepEqual(errors,[]);
  await page.evaluate(()=>fetch('/games/botstrike/api/action',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'leave'})}));await context.close();
 }
 const context=await browser.newContext(),page=await context.newPage();await page.route('**/models/bastion.glb',route=>route.fulfill({status:503,body:'Unavailable'}));await page.goto(base+'/games/botstrike/');await page.waitForFunction(()=>window.BotStrikeStartup?.state.error);assert.equal(await page.evaluate(()=>window.BotStrikeStartup.state.ready),false);assert.match(await page.locator('#fatal').textContent(),/bastion|chassis/i);await context.close();
 console.log('Desktop/mobile first-person skin geometry and failed-model launch gate passed');
}finally{await browser.close()}
