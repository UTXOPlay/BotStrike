// Do not pass a Promise predicate to waitForFunction: the installed Playwright
// poller treats that Promise as truthy, even when it later resolves to false.
export async function waitNativeState(page,predicate,arg,{timeout=15000}={}){
 const deadline=Date.now()+timeout;let value;
 while(Date.now()<deadline){
  value=await page.evaluate(()=>fetch('/games/botstrike/api/state').then(r=>r.json()).then(r=>r.room));
  if(await predicate(value,arg))return value;
  await new Promise(resolve=>setTimeout(resolve,50));
 }
 throw Error('Native state wait timed out: '+JSON.stringify({room:value?.id,status:value?.status,tick:value?.state?.tick,practice:value?.state?.practice?.attempt}));
}
