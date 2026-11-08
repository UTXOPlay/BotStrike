// Standalone browser-input calibration, no game or Native process. Uses only
// trusted browser/CDP mouse input and the native Pointer Lock API.
import {createServer} from 'node:http';
import {mkdtempSync,writeFileSync,mkdirSync} from 'node:fs';
import path from 'node:path';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'/opt/codex-desktop/resources/cua_node/lib/node_modules/playwright/index.mjs');
const base=process.env.BOTSTRIKE_NETWORK_LAB_ROOT||'/tmp';mkdirSync(base,{recursive:true,mode:0o700});const directory=mkdtempSync(path.join(base,'pointerlock-probe-'));
const html=`<!doctype html><meta charset="utf-8"><style>html,body{margin:0;width:100%;height:100%;overflow:hidden}canvas{position:fixed;inset:0;width:100%;height:100%}button{position:fixed;width:160px;height:60px;left:100px;top:70px}</style><canvas id="arena"></canvas><button id="lock">LOCK</button><script>
const canvas=document.querySelector('#arena');const gl=canvas.getContext('webgl2'),extension=gl.getExtension('WEBGL_debug_renderer_info');globalThis.probe={events:[],renderer:extension?gl.getParameter(extension.UNMASKED_RENDERER_WEBGL):null};document.querySelector('#lock').onclick=()=>canvas.requestPointerLock();addEventListener('mousemove',event=>{probe.events.push({atMs:performance.now(),trusted:event.isTrusted,movementX:event.movementX,movementY:event.movementY,clientX:event.clientX,clientY:event.clientY,screenX:event.screenX,screenY:event.screenY,locked:document.pointerLockElement===canvas});if(probe.events.length>256)probe.events.shift();});</script>`;
const server=createServer((_req,res)=>{res.setHeader('Content-Type','text/html');res.end(html);});await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||'/home/arthur/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell',args:['--no-sandbox','--enable-unsafe-swiftshader','--mute-audio','--enable-gpu']}),results=[];
try{
 for(const dpr of [.5,1]){
  const context=await browser.newContext({viewport:{width:1280,height:720},deviceScaleFactor:dpr}),page=await context.newPage(),cdp=await context.newCDPSession(page);await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForFunction(()=>window.probe);
  for(const anchor of ['button','center'])for(const method of ['accumulate','fixed-center','fixed-click','cdp-center','integer-accumulate']){
   if(await page.evaluate(()=>!!document.pointerLockElement)){await page.evaluate(()=>document.exitPointerLock());await page.waitForFunction(()=>!document.pointerLockElement);}
   await page.locator('#lock').evaluate((button,anchor)=>{button.style.left=anchor==='center'?'560px':'100px';button.style.top=anchor==='center'?'330px':'70px';},anchor);
   const box=await page.locator('#lock').boundingBox(),click={x:method==='integer-accumulate'?Math.round(box.x+box.width/2):box.x+box.width/2,y:method==='integer-accumulate'?Math.round(box.y+box.height/2):box.y+box.height/2};if(method==='integer-accumulate')await page.mouse.click(click.x,click.y);else await page.locator('#lock').click();await page.waitForFunction(()=>!!document.pointerLockElement);await page.evaluate(()=>probe.events.splice(0));let cursor={...click};const moves=[];
   for(const [intentX,intentY]of (method==='integer-accumulate'?[[1.5207,13.4089],[57.637,0],[.49,-.51],[-240,120],[2400,-720]]:[[125,120],[125,120],[-10,-8],[20,4]])){const dx=method==='integer-accumulate'?Math.round(intentX):intentX,dy=method==='integer-accumulate'?Math.round(intentY):intentY;
    const point=(method==='accumulate'||method==='integer-accumulate')?{x:cursor.x+dx,y:cursor.y+dy}:method==='fixed-click'?{x:click.x+dx,y:click.y+dy}:{x:640+dx,y:360+dy};cursor=point;
    if(method==='cdp-center')await cdp.send('Input.dispatchMouseEvent',{type:'mouseMoved',x:point.x,y:point.y,button:'none',buttons:0});else await page.mouse.move(point.x,point.y);
    await page.waitForTimeout(50);const events=await page.evaluate(()=>probe.events.splice(0));moves.push({intent:{dx:intentX,dy:intentY},requested:{dx,dy},point,events,receivedSum:events.filter(event=>event.locked).reduce((sum,event)=>({x:sum.x+event.movementX,y:sum.y+event.movementY}),{x:0,y:0})});
   }
   results.push({dpr,anchor,method,click,renderer:await page.evaluate(()=>probe.renderer),moves});
  }
  await context.close();
 }
 writeFileSync(path.join(directory,'report.json'),JSON.stringify({nativeProcesses:0,humanParticipants:0,gameStateInjected:false,browserVersion:browser.version(),results},null,2),{mode:0o600});console.log(JSON.stringify({directory,cases:results.length,received:results.map(row=>({dpr:row.dpr,anchor:row.anchor,method:row.method,moves:row.moves.map(move=>move.receivedSum)}))}));
}catch(error){writeFileSync(path.join(directory,'failure.json'),JSON.stringify({message:error.message,nativeProcesses:0,results},null,2),{mode:0o600});throw error;}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
