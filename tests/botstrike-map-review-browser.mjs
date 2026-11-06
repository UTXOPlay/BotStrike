import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const out=process.env.CONTROL_ARTIFACTS||'/tmp/botstrike-map-review-browser',base=process.env.MAP_REVIEW_URL||'http://127.0.0.1:19901';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:1920,height:1080},deviceScaleFactor:1}),page=await context.newPage(),errors=[],results=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto(base);await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
 for(const [width,height]of [[1920,1080],[2560,1080],[2560,1440],[3840,2160],[390,844],[844,390]]){
  await page.setViewportSize({width,height});await page.waitForTimeout(70);
  const target=await page.evaluate(()=>window.mapReview.screen('west_gate'));await page.mouse.click(target[0],target[1]);
  const state=await page.evaluate(()=>window.mapReview.state());assert.equal(state.observer,'west_gate');assert.ok(Math.abs(state.lastPointer[0]+1100)*state.transform.scale<1.5&&Math.abs(state.lastPointer[2]-250)*state.transform.scale<1.5);
  assert.ok(state.backing[0]*state.backing[1]<=2560*1440);assert.deepEqual(state.viewport,[width,height]);
  for(const id of ['search','route','tick','observer','target','observer-stance','target-stance','cover','snapshot']){
   await page.locator('#'+id).focus();const box=await page.locator('#'+id).boundingBox();assert.ok(box.x>=0&&box.y>=0&&box.x+box.width<=width&&box.y+box.height<=height,`${id} reachable at ${width}x${height}`);assert.ok(box.height>=44);
  }
  await page.locator('aside').evaluate(el=>el.scrollTop=0);await page.screenshot({path:`${out}/map-${width}x${height}.png`});results.push({width,height,backing:state.backing,pointerInverse:true,controlsReachable:true});
 }
 await page.locator('#search').fill('SPECTRE');const count=await page.locator('#route option').count();assert.ok(count>0&&count<484);await page.locator('#search').fill('');
 await page.locator('#route').selectOption('spawn-0-a_pad-h3-w2-run');await page.locator('#tick').focus();await page.keyboard.press('Home');await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>window.mapReview.state().frame===1);
 await page.locator('#target').selectOption('mid_east');await page.locator('#observer-stance').selectOption('1');assert.match(await page.locator('#sight').textContent(),/14 authored samples/);
 const download=page.waitForEvent('download');await page.locator('#snapshot').click();await(await download).saveAs(out+'/exported-plan.png');
 assert.equal((await page.request.post(base+'/')).status(),405);assert.equal((await page.request.get(base+'/api/state')).status(),404);assert.deepEqual(errors,[]);
 const record={automated:true,humanParticipants:0,results,routeFilter:true,tickScrubber:true,snapshotDownload:true,noLiveEndpoints:true,errors};writeFileSync(out+'/measurements.json',JSON.stringify(record,null,2));console.log(JSON.stringify(record,null,2));
}finally{await browser.close();}
