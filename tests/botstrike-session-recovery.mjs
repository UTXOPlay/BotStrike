// Exercise the real store/iframe handshake with transient HTTP and prolonged socket failure.
import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const base=process.env.STORE_URL||'https://store.utxoplay.io';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--enable-unsafe-swiftshader']});
try{
 const context=await browser.newContext({viewport:{width:844,height:390},hasTouch:true,isMobile:true,storageState:process.env.STORAGE_STATE||undefined}),page=await context.newPage();page.setDefaultTimeout(120000);
 let requests=0,sockets=0,started=0;const reports=[],errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.exposeFunction('captureLaunch',data=>{reports.push(data);if(data.error||data.ready)console.log('Launch state',data.phase,data.error||'ready')});
 await page.addInitScript(()=>addEventListener('message',e=>{if(e.origin===location.origin&&e.data?.type==='utxoplay:load')window.captureLaunch(e.data)}));
 await page.route(base+'/games/botstrike/**',route=>{const file=new URL(route.request().url()).pathname.slice('/games/botstrike/'.length)||'index.html';if(file==='api/state'&&++requests===1)return route.fulfill({status:503,contentType:'application/json',body:'{"error":"temporary test outage"}'});if(file.startsWith('api/')||!process.env.LOCAL_WEB)return route.continue();const source=path.join(process.env.LOCAL_WEB,file);return fs.existsSync(source)?route.fulfill({path:source}):route.continue()});
 await page.routeWebSocket('**/games/botstrike/api/socket',ws=>{sockets++;if(!started)started=Date.now();if(Date.now()-started<47000)return;ws.connectToServer()});
 await page.goto(base+'/play/botstrike');await page.locator('.game-stage.is-ready').waitFor();
 const frame=page.frames().find(f=>f.url().includes('/games/botstrike/'));const state=await frame.evaluate(()=>window.BotStrikeStartup.state);
 assert.ok(requests>=2,'initial HTTP failure was retried');assert.ok(sockets>=2,'stalled socket was replaced');assert.ok(reports.some(r=>r.phase==='Preparing your scene'),'graphics has its own stage');assert.ok(reports.some(r=>r.error?.includes('session could not connect')),'test crossed the startup timeout');assert.equal(state.ready,true);assert.equal(state.error,'');assert.ok(reports.every(r=>r.attempt===state.attempt),'recovery did not reload the iframe');assert.deepEqual(errors,[]);
 console.log(JSON.stringify({httpAttempts:requests,socketAttempts:sockets,attempt:state.attempt,recoveredWithoutReload:true}));
}finally{await browser.close()}
