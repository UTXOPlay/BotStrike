import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';

const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const base=process.env.STORE_URL||'http://127.0.0.1:19885',out=process.env.CONTROL_ARTIFACTS||'/tmp/botstrike-queue-browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1920,height:1080}}),errors=[];
page.setDefaultTimeout(30000);page.on('pageerror',error=>errors.push(error.message));

try{
 await page.goto(base+'/games/botstrike/');
 await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
 await page.locator('#quick').click();
 await page.locator('#room-info').waitFor({state:'visible'});
 const remaining=async()=>{const label=await page.locator('#room-status').textContent(),match=label.match(/1\/10 pilots · match in (\d+)s/);assert.ok(match,label);return Number(match[1]);};
 const first=await remaining();assert.ok(first>1&&first<=10);
 assert.match(await page.locator('#status').textContent(),/Finding players/);
 await page.screenshot({path:out+'/waiting.png'});
 await page.setViewportSize({width:390,height:844});
 const mobileBounds=await page.locator('#room-status').boundingBox();assert.ok(mobileBounds.x>=0&&mobileBounds.x+mobileBounds.width<=390);
 const brand=await page.locator('.brand').boundingBox(),eyebrow=await page.locator('.intro .eyebrow').boundingBox();
 assert.ok(eyebrow.y>=brand.y+brand.height+8,'room intro must clear the fixed brand on portrait screens');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.screenshot({path:out+'/waiting-390x844.png'});
 await page.setViewportSize({width:1920,height:1080});
 await page.waitForTimeout(1250);assert.ok(await remaining()<first,'queue countdown advances');
 await page.waitForFunction(()=>!document.querySelector('#resume').hidden);
 assert.match(await page.locator('#result-title').textContent(),/YOUR SQUAD IS LIVE/);
 await page.locator('#resume').click();
 await page.waitForFunction(()=>document.documentElement.dataset.playing==='true'&&!document.querySelector('#hud').hidden);
 await page.screenshot({path:out+'/deployed.png'});
 assert.deepEqual(errors,[]);
 console.log('Public queue fill, countdown, bot fallback and Deploy passed');
}finally{await browser.close()}
