// Retry transient startup requests in place; authentication errors need a new store session.
export async function loadSession({fetcher=fetch,wait=ms=>new Promise(resolve=>setTimeout(resolve,ms)),onRetry=()=>{},attempts=4,timeout=8000}={}) {
 let failure;
 for(let attempt=0;attempt<attempts;attempt++){
  try{
   const response=await fetcher('/games/botstrike/api/state',{signal:AbortSignal.timeout(timeout)});
   if(response.status===401||response.status===403){const error=Error('Open BotStrike through UTXOPlay to start your session.');error.permanent=true;throw error;}
   if(!response.ok){const error=Error('The squad service is temporarily unavailable.');error.permanent=response.status<500&&response.status!==429;throw error;}
   return await response.json();
  }catch(error){failure=error;if(error.permanent||attempt===attempts-1)throw error;onRetry(attempt+1);await wait(Math.min(4000,500*2**attempt));}
 }
 throw failure;
}
