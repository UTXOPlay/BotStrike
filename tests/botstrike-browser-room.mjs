import assert from 'node:assert/strict';

export async function leaveBrowserRoom(page){
 if(page.isClosed())return false;
 const room=await page.evaluate(()=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(value=>value.room?.id).catch(()=>null));
 if(!room)return false;
 const departure=page.waitForResponse(response=>response.url().endsWith('/api/action')&&response.request().postDataJSON()?.type==='leave',{timeout:5000});
 await page.locator('#leave').evaluate(button=>button.click());
 assert.equal((await departure).status(),200);
 await page.waitForFunction(()=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(value=>value.room===null),undefined,{timeout:5000});
 return true;
}
