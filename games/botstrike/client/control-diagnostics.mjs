// Two bounded, non-visible local diagnostics; no wire authority.
const epochAttribute='data-control-recovery-epoch',pausedAttribute='data-control-paused';
export function controlDiagnosticValues({epoch,paused}={}){
 if(!Number.isSafeInteger(epoch)||epoch<0||typeof paused!=='boolean')return null;
 return Object.freeze({[epochAttribute]:String(epoch),[pausedAttribute]:paused?'1':'0'});
}
export function publishControlDiagnostics(element,value){
 const values=controlDiagnosticValues(value);let mutations=0;
 for(const name of [epochAttribute,pausedAttribute]){
  const desired=values?.[name],current=element.getAttribute(name);
  if(desired===undefined){if(current!==null){element.removeAttribute(name);mutations++;}}
  else if(current!==desired){element.setAttribute(name,desired);mutations++;}
 }
 return mutations;
}
// Continued recovery may synchronously schedule/send a neutral. It must run
// only after original proof and held intent are gone and the epoch is visible.
export function controlRecoveryBoundary({clearProof,clearHeld,publish,continueRecovery}){
 for(const fn of [clearProof,clearHeld,publish,continueRecovery])if(typeof fn!=='function')throw Error('Complete recovery boundary required');
 clearProof();clearHeld();publish();continueRecovery();
}
