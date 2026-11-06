// Playwright's installed waitForFunction poller accepts a Promise as truthy.
// Await each browser evaluation before deciding whether its condition passed.
export async function waitBrowserCondition(page,predicate,arg,options={}){
 const timeout=options.timeout??30000,deadline=Date.now()+timeout;
 do{
  if(await page.evaluate(predicate,arg))return;
  await new Promise(resolve=>setTimeout(resolve,typeof options.polling==='number'?options.polling:50));
 }while(Date.now()<deadline);
 throw Error('Browser condition timed out after '+timeout+'ms: '+String(predicate).slice(0,180));
}
