import {waitBrowserCondition} from './browser-condition.mjs';
import assert from 'node:assert/strict';

export async function leaveBrowserRoom(page,surface=page){
 if(page.isClosed())return false;
 await page.bringToFront();
 const room=await surface.evaluate(()=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(value=>value.room?.id).catch(()=>null));
 if(!room)return false;
 // A background page may have reconnected as an observer during long captures.
 // Claim through the normal UI before invoking its disabled leave button.
 if(await surface.locator('#leave').isDisabled()){
  await surface.locator('#resume').evaluate(button=>button.click());
  await surface.waitForFunction(()=>!document.querySelector('#leave').disabled,undefined,{timeout:15000});
 }
 const [departure]=await Promise.all([
  page.waitForResponse(response=>response.url().endsWith('/api/action')&&response.request().postDataJSON()?.type==='leave',{timeout:15000}),
  surface.locator('#leave').evaluate(button=>button.click())
 ]);
 assert.equal(departure.status(),200);
 await waitBrowserCondition(surface,()=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(value=>value.room===null),undefined,{timeout:5000});
 return true;
}
