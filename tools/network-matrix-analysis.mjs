import {createReadStream} from 'node:fs';
import {createInterface} from 'node:readline';
export async function visitJsonLines(file,visit,{maxLines=1000000,maxLineBytes=1048576}={}){
 const stream=createReadStream(file),reader=createInterface({input:stream,crlfDelay:Infinity});let count=0;
 try{for await(const line of reader){if(!line)continue;if(++count>maxLines||Buffer.byteLength(line)>maxLineBytes)throw Error('Matrix JSONL evidence bound exceeded');await visit(JSON.parse(line));}}finally{reader.close();stream.destroy();}return count;
}
export function runtimeNativeState(event){
 if(event.type!=='native_frame')throw Error('A Native frame event is required');
 if(typeof event.rawLine==='string'){const message=JSON.parse(event.rawLine);if(message.type!=='frame'||!message.state||!Number.isSafeInteger(message.state.tick))throw Error('Invalid original Native frame line');return message.state;}
 // Legacy projections may support numerical diagnostics, but the replay gate
 // refuses them as exact state evidence. Never synthesize rawLine from state.
 if(event.state&&Number.isSafeInteger(event.state.tick))return event.state;
 throw Error('Native frame source missing');
}
const pulseBits={fire:1,reload:2,jump:16,ability:32,interact:64,drop:512};
const packedPulse=(input,field)=>Object.hasOwn(pulseBits,field)?!!(input?.[5]&pulseBits[field]):field==='weapon'?input?.[6]:field==='item'?(input?.[9]||0):field==='practice'?(input?.[11]||0):undefined;
const active=input=>!!(input&&(input[1]||input[2]||input[9]||input[6]!==null||(input[5]&255)||(input[5]&512)||(input[11]||0)||(input[12]||0)));
export function analyzeRuntimeRows(rows,{roomId,actions=[],controlIntervals=[],faultWindow=null,requirePulseTickets=false}={}){
 const failures=[],accepted=new Map(),nativeInputs=new Map(),frames=new Map(),rejections={},missingTakeover=[],shots=[],controlFrames=[],positiveAcks=[],buyRejections=[],purchaseAdmissions=new Map(),purchases=[],pulses=[],pulseFields={};let pulseCount=0,maxPulseAgeMs=null;let cancelled=false,sealingStarted=false,sealingCompleted=false,bots=null,expiredControlFrames=0,aiEligibleFrames=0;
 for(const event of rows){if(event.room!==roomId)continue;
  if(event.type==='room_started')bots=event.config.bots;
  if(event.type==='purchase_arrival'&&event.accepted===true)purchaseAdmissions.set(event.requestId,event);
  if(event.type==='input_arrival'&&event.accepted!==false)accepted.set(event.slot+':'+event.seq,event);
  if(event.type==='input_rejected'){rejections[event.reason]=(rejections[event.reason]||0)+1;if(event.stage==='buy')buyRejections.push({reason:event.reason,at:event.at,slot:event.slot});}if(event.type==='room_cancelled')cancelled=true;if(event.type==='seal_started')sealingStarted=true;if(event.type==='seal_completed')sealingCompleted=true;
  if(event.type==='native_input'){
   nativeInputs.set(event.tick,event);let missing=false;if(requirePulseTickets&&!Array.isArray(event.pulseTickets)&&failures.length<32)failures.push({code:'missing_pulse_origin_observation',tick:event.tick});
   const pulseKeys=new Set();for(const ticket of event.pulseTickets||[]){const key=ticket.slot+':'+ticket.field,source=accepted.get(ticket.slot+':'+ticket.sourceSeq),input=event.inputs?.[ticket.slot],value=packedPulse(input,ticket.field);if(pulseKeys.has(key)||!source||value===undefined||source.input?.[ticket.field]!==value||source.admission?.issuedAt!==ticket.issuedAt||source.admission?.deadlineAt!==ticket.deadlineAt||source.admission?.generation!==ticket.generation||ticket.deadlineAt-ticket.issuedAt!==400){if(failures.length<32)failures.push({code:'pulse_receipt_correlation_missing',tick:event.tick,slot:ticket.slot,field:ticket.field,sourceSeq:ticket.sourceSeq});continue;}pulseKeys.add(key);if(event.monotonicMs>=ticket.deadlineAt&&failures.length<32)failures.push({code:'pulse_past_original_absolute_deadline',tick:event.tick,slot:ticket.slot,field:ticket.field,sourceSeq:ticket.sourceSeq});pulseCount++;pulseFields[ticket.field]=(pulseFields[ticket.field]||0)+1;const age=event.monotonicMs-ticket.issuedAt;maxPulseAgeMs=Math.max(maxPulseAgeMs??0,age);if(pulses.length<64)pulses.push({tick:event.tick,...ticket,packedSeq:input[0],appliedAgeMs:age});}
   for(let slot=0;slot<10;slot++){
    const input=event.inputs?.[slot];if(bots?.[slot]&&!(input?.[5]&256)){missing=true;if(controlIntervals.some(v=>event.tick>=v.fromTick&&event.tick<=v.toTick)&&missingTakeover.length<32)missingTakeover.push({tick:event.tick,slot});}
    if(input?.[5]&256&&active(input)){const admission=accepted.get(slot+':'+input[0]);if(!admission||!Number.isFinite(admission.admission?.deadlineAt)){if(failures.length<32)failures.push({code:'active_input_without_receipt_admission',tick:event.tick,slot,seq:input[0]});}else if(event.monotonicMs>=admission.admission.deadlineAt){expiredControlFrames++;if(failures.length<32)failures.push({code:'control_past_absolute_400ms_deadline',tick:event.tick,slot,seq:input[0],deadlineAt:admission.admission.deadlineAt,appliedAt:event.monotonicMs});}}
   }
   for(let slot=0;slot<10;slot++){const input=event.inputs?.[slot];if(!input||input[7]===null||input[7]===undefined)continue;const tickets=(event.purchaseTickets||[]).filter(ticket=>ticket.slot===slot),ticket=tickets[0],admitted=ticket&&purchaseAdmissions.get(ticket.requestId);if(tickets.length!==1||!admitted||admitted.slot!==slot||admitted.item!==input[7]||ticket.item!==input[7]||admitted.life!==ticket.life||admitted.generation!==ticket.generation||admitted.issuedAt!==ticket.issuedAt||admitted.deadlineAt!==ticket.deadlineAt||ticket.deadlineAt-ticket.issuedAt!==400){failures.push({code:'purchase_receipt_correlation_missing',tick:event.tick,slot});continue;}if(event.monotonicMs>=ticket.deadlineAt)failures.push({code:'purchase_past_absolute_400ms_deadline',tick:event.tick,slot,requestId:ticket.requestId});purchases.push({tick:event.tick,slot,requestId:ticket.requestId,item:ticket.item,life:ticket.life,issuedAt:ticket.issuedAt,deadlineAt:ticket.deadlineAt});}
   if(missing)aiEligibleFrames++;controlFrames.push(event.tick);
  }
  if(event.type==='native_frame'){frames.set(event.state.tick,event);for(const shot of event.state.events.filter(v=>v.kind==='shot'))shots.push({tick:event.state.tick,actor:shot.actor,weapon:shot.value,at:event.at});}
 }
 if(!Array.isArray(bots)||bots.length!==10)failures.push({code:'missing_native_configuration'});
 if(missingTakeover.length)failures.push({code:'bots_capable_seat_not_taken_over_in_combat_interval',examples:missingTakeover});
 for(const interval of controlIntervals){let count=0;for(let tick=interval.fromTick;tick<=interval.toTick;tick++)if(nativeInputs.has(tick))count++;if(count!==interval.toTick-interval.fromTick+1)failures.push({code:'incomplete_control_interval',...interval,observed:count});}
 const actionResults=[];
 for(const action of actions){
  const matching=shots.filter(shot=>shot.actor===action.slot&&shot.weapon===action.weapon&&shot.tick>=action.fromTick&&shot.tick<=action.toTick).map(shot=>{const input=nativeInputs.get(shot.tick)?.inputs?.[action.slot],receipt=input&&accepted.get(action.slot+':'+input[0]);const pulse=(nativeInputs.get(shot.tick)?.pulseTickets||[]).find(ticket=>ticket.slot===action.slot&&ticket.field==='fire'),fireSource=pulse&&accepted.get(action.slot+':'+pulse.sourceSeq);return{...shot,seq:input?.[0]??null,controlSourceSeq:pulse?.sourceSeq??input?.[0]??null,packedViewTick:input?.[10]??null,fireReceipt:fireSource?{issuedAt:fireSource.admission?.issuedAt,deadlineAt:fireSource.admission?.deadlineAt,generation:fireSource.admission?.generation,requestedViewTick:fireSource.admission?.requested,acceptedViewTick:fireSource.admission?.acceptedViewTick}:null,receipt:receipt?{issuedAt:receipt.admission?.issuedAt,deadlineAt:receipt.admission?.deadlineAt,generation:receipt.admission?.generation,requestedViewTick:receipt.admission?.requested,acceptedViewTick:receipt.admission?.acceptedViewTick}:null};});
  let ack=null;for(const frame of frames.values())if(frame.state.tick>=action.fromTick&&frame.state.tick<=action.toTick&&frame.state.players[action.slot].last_seq>=action.seq){const packed=nativeInputs.get(frame.state.tick)?.inputs?.[action.slot],admitted=packed&&accepted.get(action.slot+':'+packed[0]);ack={tick:frame.state.tick,lastSeq:frame.state.players[action.slot].last_seq,requestedSeqAppliedExactly:packed?.[0]===action.seq,appliedSeq:packed?.[0]??null,packedViewTick:packed?.[10]??null,nativeAt:frame.at,admission:admitted?{issuedAt:admitted.admission?.issuedAt,deadlineAt:admitted.admission?.deadlineAt,generation:admitted.admission?.generation,requestedViewTick:admitted.admission?.requested,acceptedViewTick:admitted.admission?.acceptedViewTick}:null};break;}
  const result={...action,nativeShots:matching,ack,cosmeticMeaning:'client trigger/flash is request evidence only; Native events decide outcome'};actionResults.push(result);
  if(!ack)failures.push({code:'missing_positive_native_ack',label:action.label,slot:action.slot,seq:action.seq});else positiveAcks.push({label:action.label,...ack});
  if(action.kind==='shot'&&matching.length!==action.expectedShots)failures.push({code:'single_gesture_native_shot_count',label:action.label,expected:action.expectedShots,actual:matching.length});
 }
 let recovery=null;
 if(faultWindow){
  const neutral=[],obsolete=[];for(const [tick,event]of nativeInputs){if(event.at<faultWindow.restoredAt)continue;const input=event.inputs?.[faultWindow.slot];if(!input||!(input[5]&256))continue;const admission=accepted.get(faultWindow.slot+':'+input[0]);if(!active(input)&&admission?.at>=faultWindow.restoredAt){const frame=frames.get(tick);if(frame?.state.players[faultWindow.slot].last_seq>=input[0])neutral.push({tick,seq:input[0],elapsedMs:frame.at-faultWindow.restoredAt});}
   if(event.at>faultWindow.releasedAt+400&&event.at<faultWindow.freshActionAt&&(input[1]||input[2]||input[5]&1))obsolete.push({tick,seq:input[0]});
  }
  recovery={neutralAck:neutral[0]??null,obsoleteHeldFrames:obsolete.slice(0,32),budgetMs:faultWindow.recoveryBudgetMs};
  if(!recovery.neutralAck||recovery.neutralAck.elapsedMs>faultWindow.recoveryBudgetMs)failures.push({code:'missing_or_late_recovery_neutral_ack'});if(obsolete.length)failures.push({code:'obsolete_held_replayed_after_restore',examples:obsolete.slice(0,32)});
 }
 for(const purchase of purchases)purchase.nativeConfirmed=frames.get(purchase.tick)?.state.events.some(event=>event.kind==='buy'&&event.actor===purchase.slot&&event.value===purchase.item)===true;
 return{failures,deadlineScope:'WS and HTTP purchase receipts have independent admitted tickets',purchases,pulses,pulseSummary:{observed:pulseCount,fields:pulseFields,maxAppliedAgeMs:maxPulseAgeMs,exampleLimit:64,examplesMeaning:'bounded examples; every original pulse ticket remains in private raw Native input observations'},pulseOriginScope:requirePulseTickets?'required_original_sourceSeq_and_deadline':'legacy_sequence_only_not_full_pulse_proof',buyRejections,cancelled,sealingStarted,sealingCompleted,headerBotsCapable:bots,aiEligibleFrames,controlIntervals,missingTakeover,expiredControlFrames,rejections,actionResults,positiveAcks,recovery,shotTicks:shots.map(v=>v.tick),nativeFrames:frames.size,nativeInputFrames:nativeInputs.size};
}
export async function analyzeRuntimeFile(file,options){const rows=[];await visitJsonLines(file,row=>{if(rows.length>=150000)throw Error('Case runtime row bound exceeded');if(row.type==='native_frame'){const state=runtimeNativeState(row);rows.push({type:row.type,room:row.room,at:row.at,monotonicMs:row.monotonicMs,state:{tick:state.tick,events:state.events,players:state.players.map(p=>({last_seq:p.last_seq}))},fidelity:typeof row.rawLine==='string'?'original_native_line':'legacy_js_projection'});}else rows.push(row);});return analyzeRuntimeRows(rows,options);}
export function validateKernelEvidence(caseDefinition,samples){
 const failures=[];if(samples.length<2)return[{code:'missing_kernel_samples'}];
 for(const sample of samples)for(const actor of ['A','B','C'])if(!sample.value?.actors?.[actor]?.ss||!sample.value.actors[actor].nstat||!Array.isArray(sample.value.actors[actor].qdisc))failures.push({code:'incomplete_kernel_observations',label:sample.label,actor});
 const needsLoss=['outage','tactical'].includes(caseDefinition.kind)||Object.values(caseDefinition.profiles).some(p=>p.upstream.lossPct||p.downstream.lossPct||p.upstream.burstLoss||p.downstream.burstLoss);
 if(needsLoss&&!samples.some(sample=>[...sample.value.server.qdisc,...Object.values(sample.value.actors).flatMap(a=>a.qdisc)].some(q=>q.kind==='netem'&&q.drops>0)))failures.push({code:'configured_packet_loss_not_observed'});
 return failures;
}

const scalarMetrics=['appRttMs','inputAckMs','snapshotGapMs','snapshotAgeMs','interpolationAgeTicks','predictionCorrectionUnits','renderFrameMs','mainThreadLongTaskMs'];
const counterMetrics=['ackSkipped','ackUnmatched','pendingExpired','disconnects','predictionSnaps'];
export function rawDistribution(values){
 if(!values.length)return null;const sorted=[...values].sort((a,b)=>a-b),pick=p=>sorted[Math.max(0,Math.ceil(sorted.length*p)-1)];
 return{n:sorted.length,p50:pick(.5),p95:pick(.95),p99:pick(.99),max:sorted.at(-1)};
}
// These are observations from a trusted local lab subscriber, not authoritative
// hit rules. A CDP framesent event does not expose JS input-send performance.now.
// Only the browser's own scalar inputAck samples are exact matched-seq latency;
// cross-process wall/CDP differences below remain observation estimates.
export async function analyzeBrowserTrace(file,{actorId,slot,actions=[],window}={}){
 const metrics=Object.fromEntries(scalarMetrics.map(name=>[name,[]])),counts=Object.fromEntries(counterMetrics.map(name=>[name,0]));
 const correlations=actions.filter(action=>action.actor===actorId).map(action=>({label:action.label,kind:action.kind,seq:action.seq,input:null,firstAckSnapshot:null,firstFollowingPresentation:null,aimPresentation:action.presentation??null,recordedAimPresentation:null,nativeShotInputs:(action.nativeShots||[]).map(shot=>({tick:shot.tick,seq:shot.controlSourceSeq??shot.seq,packedSeq:shot.seq,packedViewTick:shot.packedViewTick,receipt:shot.fireReceipt??shot.receipt,input:null}))}));
 let frameCount=0,firstFrameAt=null,lastFrameAt=null,socketOpens=0,resyncs=0;const failures=[];
 await visitJsonLines(file,row=>{
  const value=row.data||{};
  if(row.kind==='socket_opening')socketOpens++;
  if(row.kind==='socket_error'&&value.type==='input_resync')resyncs++;
  const measured=Number.isFinite(value.atMs)&&window&&value.atMs>=window.fromBrowserMs&&value.atMs<=window.toBrowserMs;
  if(row.kind==='scalar'&&measured&&Number.isFinite(value.value)&&value.value>=0){
   if(Object.hasOwn(metrics,value.metric)){const samples=metrics[value.metric];if(samples.length>=50000)throw Error('Browser raw metric sample bound exceeded');samples.push(value.value);}
   if(Object.hasOwn(counts,value.metric))counts[value.metric]+=value.value;
  }
  if(row.kind==='presentation'&&measured){frameCount++;firstFrameAt??=value.atMs;lastFrameAt=value.atMs;}
  for(const correlation of correlations){
   if(row.kind==='presentation'&&row.index===correlation.aimPresentation?.frameIndex)correlation.recordedAimPresentation={index:row.index,atMs:value.atMs,animationAtMs:value.animationAtMs,viewTick:value.viewTick,renderTick:value.renderTick,visibleSlots:(value.players||[]).filter(player=>player.alive).map(player=>player.slot)};
   if(row.kind==='input')for(const shot of correlation.nativeShotInputs)if(value.input?.seq===shot.seq&&!shot.input)shot.input={index:row.index,socketGeneration:value.socketGeneration,roomGeneration:value.roomGeneration,deliveryAttached:value.deliveryAttached,requestedViewTick:value.input.viewTick,fireRequested:value.input.fire===true};
   if(row.kind==='input'&&value.input?.seq===correlation.seq&&!correlation.input)correlation.input={index:row.index,nodeUnixMs:row.nodeUnixMs,socketGeneration:value.socketGeneration,roomGeneration:value.roomGeneration,deliveryAttached:value.deliveryAttached,seq:value.input.seq,requestedViewTick:value.input.viewTick};
   const sent=correlation.input;if(!sent||row.index<=sent.index)continue;
   if(row.kind==='snapshot'&&value.currentSocket!==false&&value.socketGeneration===sent.socketGeneration&&value.roomGeneration===sent.roomGeneration&&!correlation.firstAckSnapshot){const self=value.players?.find(player=>player.slot===slot);if(self?.last_seq>=correlation.seq)correlation.firstAckSnapshot={index:row.index,nodeUnixMs:row.nodeUnixMs,tick:value.tick,life:self.life,lastSeq:self.last_seq,exactRequestedSeq:self.last_seq===correlation.seq,cdpObservationElapsedMs:row.nodeUnixMs-sent.nodeUnixMs};}
   if(row.kind==='presentation'&&!correlation.firstFollowingPresentation)correlation.firstFollowingPresentation={index:row.index,atMs:value.atMs,animationAtMs:value.animationAtMs,tick:value.tick,viewTick:value.viewTick,renderTick:value.renderTick,sequence:value.sequence,visibleSlots:(value.players||[]).map(player=>player.slot),meaning:'first render observation drained after CDP input event; callback may precede that send because capture is buffered; client sequence is not a Native ACK'};
  }
 });
 for(const correlation of correlations){
  if(correlation.kind==='shot'){
   const recorded=correlation.recordedAimPresentation,expected=correlation.aimPresentation;
   if(!recorded||recorded.viewTick!==expected?.viewTick||recorded.renderTick!==expected?.renderTick||Number.isInteger(expected?.targetSlot)&&!recorded.visibleSlots.includes(expected.targetSlot))failures.push({code:'shot_aim_not_correlated_to_authorized_render',actor:actorId,label:correlation.label});
   for(const shot of correlation.nativeShotInputs)if(!shot.input?.deliveryAttached||!shot.input.fireRequested||!shot.receipt)failures.push({code:'native_shot_missing_browser_receipt_input',actor:actorId,label:correlation.label,tick:shot.tick});
  }
  if(!correlation.input?.deliveryAttached)failures.push({code:'browser_action_missing_receipted_input',actor:actorId,label:correlation.label});if(!correlation.firstAckSnapshot)failures.push({code:'browser_action_missing_snapshot_ack_observation',actor:actorId,label:correlation.label});if(!correlation.firstFollowingPresentation)failures.push({code:'browser_action_missing_following_render',actor:actorId,label:correlation.label});}
 if(!window||frameCount<20)failures.push({code:'browser_measured_render_window_missing',actor:actorId});
 return{actor:actorId,slot,window,trust:'local automated browser observations; never authoritative gameplay',sampleUnit:'one raw ephemeral subscriber sample; percentiles are not percentiles-of-window-percentiles',clockMeaning:'metric/render atMs use the same browser monotonic clock; CDP observationElapsedMs is a driver wall-clock estimate, not one-way transit or exact application ACK latency',metrics:Object.fromEntries(Object.entries(metrics).map(([name,values])=>[name,rawDistribution(values)])),counts,render:{sampledCallbacks:frameCount,firstAtMs:firstFrameAt,lastAtMs:lastFrameAt,observedMeanHz:frameCount>1?(frameCount-1)*1000/(lastFrameAt-firstFrameAt):null},socketOpens,resyncs,correlations,failures};
}
