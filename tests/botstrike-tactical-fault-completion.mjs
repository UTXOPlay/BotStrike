// External automated all-ten loopback TCP fault cohort. This is neither a
// human match nor independent A/B WAN fairness or a physical input measurement.
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import {readFileSync,readlinkSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {exerciseActiveTactical,auditActiveTactical,assertNoReleasedAction} from './botstrike-tactical-active-flow.mjs';

const driver=fileURLToPath(import.meta.url),hr=()=>process.hrtime.bigint();
const read=file=>{try{return JSON.parse(readFileSync(file,'utf8'));}catch(error){if(error.code==='ENOENT')return null;throw error;}};
async function atomic(file,value){await fs.writeFile(file+'.tmp',JSON.stringify(value,null,2)+'\n',{mode:0o600});await fs.rename(file+'.tmp',file);}
export function isExpectedFaultEvent(kind,event){return kind==='input_rejected'?['expired','unknown'].includes(event?.reason):kind==='socket_close'?event?.code===1006:kind==='socket_error'?['ECONNRESET','EPIPE','ETIMEDOUT'].includes(event?.code):kind==='input_resync'?event?.code==='stale_delivery':kind==='owner_change';}
export function inExpectedFaultWindow({nowNs,cut,restored,recoveryComplete=false,recoveryLimitMs=20000}){
 if(!cut||recoveryComplete)return false;
 const start=BigInt(cut.applyStartNs),end=restored?BigInt(restored.restoredNs)+BigInt(recoveryLimitMs)*1000000n:start+25000000000n;
 return BigInt(nowNs)>=start&&BigInt(nowNs)<=end;
}
export function mapKernelBoundary(anchor,boundaryNs){
 // performance.now() was read between these two CLOCK_MONOTONIC readings.
 // The lower edge is deliberately earlier; uncertainty never excuses an action.
 const lowerMs=anchor.performanceMs+Number(BigInt(boundaryNs)-BigInt(anchor.afterNs))/1e6-anchor.paddingMs;
 const upperMs=anchor.performanceMs+Number(BigInt(boundaryNs)-BigInt(anchor.beforeNs))/1e6+anchor.paddingMs;
 return {lowerMs,upperMs,uncertaintyMs:upperMs-lowerMs};
}

export function faultCompletionController(controlDir){
 let context,ready=false,released=false,restored=false,recovered=false,resumed=false,releaseHighSeq=new Map(),restoredMs=Infinity,signalCount=0,boundaryKnown=false,backlog=[];
 const fault={scope:'all ten authenticated controllers share one isolated loopback TCP port; not independent A/B links',expectedLossMs:1000,releaseTargetAfterCutMs:650,recoveryLimitMs:20000,signals:[],expectedEvents:{},expectedExamples:[],initialActiveProofs:[],recoveryProofs:[],afterResumeActiveProofs:[],complete:false,backlog:{limitBytes:4*1024**2,bytes:0,peakBytes:0,acceptedEvents:0,recheckedEvents:0,droppedEvents:0,captureInvalid:false}};
 const cut=()=>read(path.join(controlDir,'kernel-cut.json')),restore=()=>read(path.join(controlDir,'kernel-restored.json'));
 const allowed=(kind,event)=>{
  const acceptable=isExpectedFaultEvent(kind,event);
  const ok=acceptable&&['input_rejected','input_resync','socket_error','socket_close','owner_change'].includes(kind)&&inExpectedFaultWindow({nowNs:hr(),cut:cut(),restored:restore(),recoveryComplete:resumed});
  if(ok){fault.expectedEvents[kind]=(fault.expectedEvents[kind]||0)+1;if(fault.expectedExamples.length<32)fault.expectedExamples.push({kind,atNs:hr().toString(),slot:event?.slot??null,seq:event?.seq??null,reason:event?.reason??null,code:event?.code??null,stage:event?.stage??null});}return ok;
 };
 function signal(){try{
  signalCount++;const nowNs=hr().toString();fault.signals.push({number:signalCount,atNs:nowNs,atMs:performance.now()});assert.ok(fault.signals.length<=2,'Only release and explicit new software intent signals are allowed');
  if(signalCount===1){const loss=cut();assert.ok(ready&&loss&&!restore(),'Release must occur inside the actual TCP loss window');assert.ok(BigInt(nowNs)>=BigInt(loss.appliedNs));released=true;for(const actor of context.actors){releaseHighSeq.set(actor.slot,actor.sequence);context.invalidate(actor);}fault.release={atNs:nowNs,highSequences:[...releaseHighSeq].map(([slot,seq])=>({slot,seq}))};}
  else{assert.ok(recovered&&restored&&!resumed&&context.allNeutral(),'Explicit software intent requires all ten current-context neutral ACK proofs');resumed=true;fault.resume={atNs:nowNs,atMs:performance.now(),kind:'host delivered SIGUSR2 is explicit software intent, not a human click'};fault.resumeBaseline=context.actors.map(actor=>({slot:actor.slot,activeAcks:actor.metrics.distinctActiveAcknowledgedSequences}));}
 }catch(error){context.fail(error);}}
 return {
  get paused(){return released&&!resumed;},
  allowsExpected:allowed,
  async start(value){context=value;const beforeNs=hr().toString(),performanceMs=performance.now(),afterNs=hr().toString();fault.clockMapping={beforeNs,afterNs,performanceMs,timeNamespace:readlinkSync('/proc/self/ns/time'),paddingMs:.001,basis:'performance.now sample bracketed by Linux CLOCK_MONOTONIC hrtime; one microsecond conservative numeric/sample pad; restore command-start lower edge is audited'};context.report.fault=fault;context.report.limitations.push('The existing always-takeover gate remains strict. An outage exceeding the service 2-second controller activity window is a cohort failure, not automatically an application defect.');context.report.limitations.push('One real namespace-local TCP blackhole is followed by explicit software neutral recovery and new software intent; this is not human/manual browser recovery acceptance.');await fs.mkdir(controlDir,{recursive:true,mode:0o700});process.on('SIGUSR2',signal);},
  observe(event){
   if(event.type!=='native_input'||!ready)return;
   if(boundaryKnown){assertNoReleasedAction({event,releaseHighSeq,restoredMs});return;}
   const compact={tick:event.tick,monotonicMs:event.monotonicMs,inputs:event.inputs,pulseTickets:event.pulseTickets,purchaseTickets:event.purchaseTickets},bytes=Buffer.byteLength(JSON.stringify(compact));
   if(fault.backlog.captureInvalid||fault.backlog.bytes+bytes>fault.backlog.limitBytes){fault.backlog.captureInvalid=true;fault.backlog.droppedEvents++;throw Error('Pending actual-restore Native input audit exceeds its 4 MiB bound; capture invalid');}
   backlog.push(compact);fault.backlog.bytes+=bytes;fault.backlog.acceptedEvents++;fault.backlog.peakBytes=Math.max(fault.backlog.peakBytes,fault.backlog.bytes);
   const restoration=restore();if(restoration){assert.ok(released,'Actual restoration cannot precede software held release');fault.actualRestoreBoundary={commandStart:mapKernelBoundary(fault.clockMapping,restoration.restoreStartNs),commandComplete:mapKernelBoundary(fault.clockMapping,restoration.restoredNs)};restoredMs=fault.actualRestoreBoundary.commandStart.lowerMs;boundaryKnown=true;for(const pending of backlog){assertNoReleasedAction({event:pending,releaseHighSeq,restoredMs});fault.backlog.recheckedEvents++;}backlog=[];fault.backlog.bytes=0;}
  },
  async poll(value){context={...context,...value};
   if(!ready&&value.initialBarrierComplete&&value.actors.every(actor=>actor.room?.state?.phase==='live'&&actor.metrics.distinctActiveAcknowledgedSequences>=5&&actor.metrics.activeByPhase.live>0&&!actor.needsNeutral&&actor.sent.get(actor.sequence)?.neutral===false)){
    ready=true;fault.initialActiveProofs=value.actors.map(actor=>({slot:actor.slot,activeAcks:actor.metrics.distinctActiveAcknowledgedSequences,lastActiveAck:actor.lastActiveAck,liveActivePacked:actor.metrics.activeByPhase.live,firePackedFrames:actor.metrics.firePackedFrames,life:actor.room.state.players[actor.slot].life,context:actor.context}));
    await atomic(path.join(controlDir,'fault-ready.json'),{port:context.port,pid:process.pid,netns:readlinkSync('/proc/self/ns/net'),timeNamespace:readlinkSync('/proc/self/ns/time'),room:context.roomId,readyNs:hr().toString(),scope:fault.scope});
   }
   const loss=cut(),restoration=restore();
   if(loss&&!restoration)assert.ok(hr()-BigInt(loss.applyStartNs)<5000000000n,'Kernel cut must restore within a bounded five-second failure ceiling');
   if(restoration&&!restored){assert.ok(released,'The held controls must be released before restoration');restored=true;const observedAt=performance.now();fault.kernel={cut:loss,restored:restoration};fault.restoreObserved={atNs:hr().toString(),atMs:observedAt,basis:'receipt/barrier invalidation only; never the old-action audit start'};for(const actor of value.actors)context.invalidate(actor,{floorMs:observedAt});}
   if(restored&&!resumed){assert.ok(hr()-BigInt(restoration.restoredNs)<=20000000000n,'All ten fresh neutral ACKs and explicit intent must complete in 20 seconds');if(value.allNeutral()&&!recovered){recovered=true;fault.recoveryProofs=value.actors.map(actor=>({slot:actor.slot,...actor.neutralProof}));await atomic(path.join(controlDir,'neutral-ready.json'),{atNs:hr().toString(),proofs:fault.recoveryProofs});}}
   if(resumed&&!fault.complete&&value.actors.every(actor=>actor.metrics.distinctActiveAcknowledgedSequences>(fault.resumeBaseline.find(row=>row.slot===actor.slot)?.activeAcks??Infinity))){fault.complete=true;fault.afterResumeActiveProofs=value.actors.map(actor=>({slot:actor.slot,activeAcks:actor.metrics.distinctActiveAcknowledgedSequences,lastActiveAck:actor.lastActiveAck,liveActivePacked:actor.metrics.activeByPhase.live,firePackedFrames:actor.metrics.firePackedFrames,life:actor.room.state.players[actor.slot].life,context:actor.context}));}
  },
  async beforeFinished(){assert.ok(ready&&released&&restored&&boundaryKnown&&recovered&&resumed&&fault.complete,'Actual fault, release, exact neutral recovery, new intent and active ACKs are required before sealing');assert.equal(fault.backlog.captureInvalid,false);assert.equal(fault.backlog.droppedEvents,0);assert.equal(fault.backlog.acceptedEvents,fault.backlog.recheckedEvents);assert.equal(signalCount,2);const loss=cut(),restoration=restore();assert.ok(BigInt(fault.release.atNs)>=BigInt(loss.appliedNs)&&BigInt(fault.release.atNs)<BigInt(restoration.restoreStartNs),'Release handler itself ran while kernel loss was installed');},
  stop(){process.off('SIGUSR2',signal);},
 };
}

if(process.argv[1]===driver){
 try{
  assert.equal(process.env.TACTICAL_ACTIVE_EXTERNAL_DRIVER,'1','Explicit external-driver declaration is required');const args=process.argv.slice(2);let result;
  if(args[0]==='--audit-only'&&args.length===2)result=await auditActiveTactical(args[1],{driverFile:driver});
  else{assert.deepEqual(args,['--exercise-only']);assert.ok(process.env.TACTICAL_FAULT_CONTROL_DIR,'Private control directory required');result=await exerciseActiveTactical({driverFile:driver,controller:faultCompletionController(process.env.TACTICAL_FAULT_CONTROL_DIR),hasherBinary:process.env.TACTICAL_ACTIVE_HASHER||'/app/tools/network-audit-inspector'});}
  console.log(JSON.stringify({status:result.report.status,out:result.out,ticks:result.report.final?.tick,faultComplete:result.report.fault?.complete,driverSha256:result.report.driver.sha256}));
 }catch(error){console.error(JSON.stringify({status:'failed',message:error.message,file:typeof error.report==='string'?error.report:null}));process.exitCode=1;}
}
