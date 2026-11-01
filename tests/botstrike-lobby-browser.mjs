import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {leaveBrowserRoom} from './botstrike-browser-room.mjs';

const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const base=process.env.STORE_URL||'http://127.0.0.1:19885',out=process.env.CONTROL_ARTIFACTS||'/tmp/botstrike-lobby-browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1920,height:1080}}),errors=[];
const page=async()=>{const p=await context.newPage();p.setDefaultTimeout(120000);p.on('pageerror',error=>errors.push(error.message));await p.goto(base+'/games/botstrike/');return p;};
const state=async()=>(await(await context.request.get(base+'/games/botstrike/api/state')).json()).room;
let first,second;
try{
 first=await page();await first.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
 await first.locator('#private').click();await first.locator('#start').waitFor({state:'visible'});
 const id=(await state()).id;
 second=await page();await second.getByRole('button',{name:'TAKE CONTROL',exact:true}).waitFor();
 assert.equal(await second.locator('#start').isDisabled(),true);
 await second.locator('#resume').click();await second.waitForFunction(()=>!document.querySelector('#start').disabled);
 assert.equal((await state()).status,'waiting');assert.equal((await state()).id,id);
 assert.equal(await second.locator('html').getAttribute('data-playing'),'false');
 await first.getByRole('button',{name:'TAKE CONTROL',exact:true}).waitFor();
 assert.equal(await first.locator('#leave').isDisabled(),true);
 await second.locator('#room-hero').selectOption('3');
 await second.waitForFunction(()=>fetch('/games/botstrike/api/state').then(r=>r.json()).then(({room})=>room.selectedHero===3));
 await second.screenshot({path:out+'/waiting-handoff.png'});
 await second.close();
 await first.locator('#resume').click();await first.waitForFunction(()=>!document.querySelector('#start').disabled);
 assert.equal((await state()).status,'waiting');
 await first.locator('#start').click();await first.waitForFunction(()=>document.documentElement.dataset.playing==='true');
 assert.equal((await state()).status,'running');
 await first.keyboard.press('Escape');await leaveBrowserRoom(first);
 await first.locator('#private').click();await first.locator('#start').waitFor({state:'visible'});
 second=await page();await second.getByRole('button',{name:'TAKE CONTROL',exact:true}).waitFor();
 await first.close();await second.locator('#resume').click();await second.waitForFunction(()=>!document.querySelector('#leave').disabled);
 await leaveBrowserRoom(second);assert.equal(await state(),null);
 assert.deepEqual(errors,[]);
 console.log('Waiting lobby claims preserve the lobby, invalidate the old tab, survive controller closure, and permit hero selection, start and leave');
}finally{for(const p of [first,second])if(p&&!p.isClosed())try{await leaveBrowserRoom(p)}catch{}await browser.close();}
