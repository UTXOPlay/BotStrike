import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {readFileSync} from 'node:fs';
import {leaveBrowserRoom} from './botstrike-browser-room.mjs';
import {resizeMobile,screenshotMobile} from './mobile-viewport.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const matrix=JSON.parse(readFileSync('games/botstrike/web/damage-contract.json'));
const base=process.env.STORE_URL||'http://127.0.0.1:18896',out=process.env.ART_OUTPUT||'/tmp/botstrike-tactical-damage-guide';await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']}),pages=[],errors=[];
try{
 for(const mobile of [false,true]){
  const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1920,height:1080},hasTouch:mobile,isMobile:mobile,deviceScaleFactor:mobile?1:.5}),page=await context.newPage();pages.push(page);page.setDefaultTimeout(90000);page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/games/botstrike/');await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
  if(mobile){await page.locator('#immersive-enter').click();await resizeMobile(page,844,390);await page.locator('#immersive-gate').waitFor({state:'hidden'});}
  await page.locator('#practice').click();await page.waitForFunction(()=>document.documentElement.dataset.playing==='true');
  await page.locator('#rack-open').evaluate(button=>button.click());await page.locator('.damage-guide summary').click();await page.waitForFunction(()=>document.querySelector('.damage-guide-value').textContent.includes('BODY'));
  await page.getByLabel('Target chassis',{exact:true}).selectOption('2');await page.getByLabel('Target armor',{exact:true}).selectOption('100');await page.getByLabel('Range',{exact:true}).selectOption('3000');await page.getByLabel('Shooter boost',{exact:true}).selectOption('2');await page.getByLabel('BASTION shield · 5 seconds',{exact:true}).check();
  const texts=await page.locator('.damage-guide-value').allTextContents();assert.equal(texts.length,12);
  for(let weapon=0;weapon<12;weapon++)for(const head of [false,true]){
   const row=matrix.rows.find(r=>r.weapon===weapon&&r.hero===2&&r.armor===100&&r.distance===3000&&r.shield&&r.boost===2&&r.head===head);
   assert.ok(texts[weapon].includes(`${head?'HEAD':'BODY'}: ${row.first_health_damage} HP / ${row.first_armor_damage} armor first · ${row.rounds} round`));assert.ok(texts[weapon].includes((row.ttk_ticks/64).toFixed(2)+'s'));
  }
  for(const [width,height]of mobile?[[844,390]]:[[1920,1080],[2560,1080],[2560,1440],[3840,2160]]){
   if(mobile)await resizeMobile(page,width,height);else await page.setViewportSize({width,height});
   const rect=await page.locator('#buy-menu .dialog-content').evaluate(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,scroll:document.documentElement.scrollWidth};});
   assert.ok(rect.x>=-1&&rect.y>=-1&&rect.x+rect.w<=width+1&&rect.y+rect.h<=height+1&&rect.scroll<=width,JSON.stringify({width,height,rect}));
   const file=`${out}/${width}x${height}.png`;if(mobile)await screenshotMobile(page,file);else await page.screenshot({path:file});
  }
  if(mobile){await resizeMobile(page,390,844);await page.locator('#immersive-gate').waitFor();assert.equal(await page.locator('html').getAttribute('data-playing'),'false');await screenshotMobile(page,out+'/390x844-rotation-gate.png');await resizeMobile(page,844,390);}
  await leaveBrowserRoom(page);await context.close();
 }
 assert.deepEqual(errors,[]);console.log(JSON.stringify({sixSizes:true,weaponCards:12,target:'BASTION',armor:100,distance:3000,boost:2,shield:true,out,desktopDpr:.5}));
}finally{for(const page of pages)if(!page.isClosed())await leaveBrowserRoom(page).catch(()=>{});await browser.close();}
