// Opt-in page observation. No application or server wire mutation.
export const LOCAL_FENCE_SCHEMA='botstrike-local-send-fence-1';
// Supplement only: callers must first validate exact wire ACK/context authority.
export function localRecoveryProofMatches(snapshot,input,current,{requireNeutral=false}={}){
 const maxOriginalSendAgeMs=1000;
 const required=current?.localFenceRequired===true||input?.localFenceRequired===true||snapshot?.localFenceRequired===true;
 if(!required)return true;
 if(current?.localFenceRequired!==true)return false;
 const original=snapshot?.originalSendStamp;
 if(current.captureEvidenceAvailable!==true||current.localFenceAvailable!==true||input?.localFenceAvailable!==true||!original||original.localFenceAvailable!==true)return false;
 if(!Number.isSafeInteger(current.localRecoveryEpoch)||current.localRecoveryEpoch<0||typeof current.localPaused!=='boolean'||!Number.isFinite(current.pageNowMs)||!Number.isFinite(input.pageSentAt)||!Number.isFinite(input.localEpochObservedAt))return false;
 if(input.pageSentAt<input.localEpochObservedAt||current.pageNowMs<input.pageSentAt||current.pageNowMs-input.pageSentAt>=maxOriginalSendAgeMs)return false;
 for(const key of ['pageInstance','socketGeneration','ownerEpoch','proofGeneration','room','life'])if(input[key]!==current[key]||original[key]!==input[key])return false;
 for(const key of ['seq','sendSerial','pageSentAt','localRecoveryEpoch','localPaused','localEpochObservedAt'])if(original[key]!==input[key])return false;
 if(input.localRecoveryEpoch!==current.localRecoveryEpoch||snapshot.localRecoveryEpoch!==input.localRecoveryEpoch||snapshot.pageInstance!==input.pageInstance)return false;
 if(requireNeutral&&input.localPaused!==true)return false;
 return true;
}

// Standalone factory: serialized into an owned page before game code. Tests run
// this same function against fake WebSocket/DOM, not a source-text substitute.
export function installLocalRecoveryPageCapture(env,{limit=4096,maxPending=256,maxSockets=64,wireJoin=false,maxWireBytes=512*1024}={}){
 if(!Number.isSafeInteger(limit)||limit<4||limit>16384||!Number.isSafeInteger(maxPending)||maxPending<2||maxPending>256||!Number.isSafeInteger(maxSockets)||maxSockets<1||maxSockets>64)throw Error('Invalid local-fence capture bounds');
 if(typeof wireJoin!=='boolean'||!Number.isSafeInteger(maxWireBytes)||maxWireBytes<4096||maxWireBytes>1024*1024)throw Error('Invalid wire stamp bounds');
 if(env.__botstrikeLocalFenceCapture)throw Error('Local-fence capture already installed');
 const Native=env.WebSocket,rows=[],sockets=[];let serial=0,socketSerial=0,current=null,dropped=0,invalid=null,lastEpoch=null,epochObservedAt=null,lastAt=-Infinity,wireQueuedBytes=0,lastCompletedPresentationRef=null,presentationUnavailableReason='no_completed_presentation';
 const pageInstance=typeof env.crypto?.randomUUID==='function'?env.crypto.randomUUID():null;
 if(typeof pageInstance!=='string')invalid='page_identity_unavailable';
 const clearPresentation=reason=>{lastCompletedPresentationRef=null;presentationUnavailableReason=reason;};
 const now=()=>env.performance.now(),add=(kind,data)=>{const bytes=typeof data.wirePayload==='string'?new env.TextEncoder().encode(data.wirePayload).length:0;if(bytes>65536||wireQueuedBytes+bytes>maxWireBytes){dropped++;invalid='wire_stamp_overflow';clearPresentation('capture_unavailable');return null;}if(rows.length>=limit||serial>=Number.MAX_SAFE_INTEGER){dropped++;invalid='capture_overflow';clearPresentation('capture_unavailable');return null;}wireQueuedBytes+=bytes;const row={kind,eventIndex:++serial,pageObservedAt:now(),...data};rows.push(row);return row;};
 const readFence=()=>{
  const at=now(),root=env.document?.documentElement,epoch=root?.getAttribute('data-control-recovery-epoch'),paused=root?.getAttribute('data-control-paused');
  if(!Number.isFinite(at)||at<0||at<lastAt){invalid='page_clock_regressed';clearPresentation('page_clock_unavailable');return{localFenceAvailable:false,localRecoveryEpoch:null,localPaused:null,pageNowMs:null,localEpochObservedAt:null};}lastAt=at;
  const valid=typeof epoch==='string'&&/^(0|[1-9][0-9]{0,15})$/.test(epoch)&&Number.isSafeInteger(Number(epoch))&&(paused==='0'||paused==='1');
  if(!valid){clearPresentation('local_diagnostics_unavailable');return{localFenceAvailable:false,localRecoveryEpoch:null,localPaused:null,pageNowMs:at,localEpochObservedAt:null};}
  const value=Number(epoch);if(lastEpoch!==null&&value<lastEpoch)invalid='local_epoch_regressed';
  if(value!==lastEpoch){clearPresentation('local_epoch_changed');lastEpoch=value;epochObservedAt=at;add('local_boundary',{pageInstance,localRecoveryEpoch:value,localPaused:paused==='1',boundaryObservedAt:at});}
  return{localFenceAvailable:true,localRecoveryEpoch:value,localPaused:paused==='1',pageNowMs:at,localEpochObservedAt:epochObservedAt};
 };
 const context=s=>s?{pageInstance,socketGeneration:s.id,ownerEpoch:s.ownerEpoch,proofGeneration:s.proofGeneration,connected:s.connected,controller:s.controller,protocolVersion:s.protocolVersion,maxAgeMs:s.maxAgeMs,room:s.room,slot:s.slot,life:s.life,nativeTick:s.tick}:null;
 // These are logical post-world.frame observations, never compositor or
 // physical-display completion. Copy only the actual quality-frame contract.
 const vector=value=>Array.isArray(value)&&value.length===3&&value.every(Number.isFinite)?Object.freeze([...value]):null;
 const integer=(value,min=0,max=0xffffffff)=>Number.isSafeInteger(value)&&value>=min&&value<=max;
 const presentationFrame=frame=>{
  if(!frame||!Number.isFinite(frame.atMs)||frame.atMs<0||!Number.isFinite(frame.animationAtMs)||frame.animationAtMs<0||!integer(frame.tick)||!integer(frame.viewTick)||!Number.isFinite(frame.renderTick)||frame.renderTick<0||Math.floor(frame.renderTick)!==frame.viewTick||!integer(frame.slot,0,9)||!integer(frame.sequence)||!frame.camera||!frame.local||!Array.isArray(frame.players)||frame.players.length>10)return null;
  const cameraPosition=vector(frame.camera.position),localPosition=vector(frame.local.position),localVelocity=vector(frame.local.velocity);
  if(!cameraPosition||!['yaw','pitch','roll','fov'].every(key=>Number.isFinite(frame.camera[key]))||frame.camera.fov<=0||frame.camera.fov>=180||frame.local.position!==null&&!localPosition||frame.local.velocity!==null&&!localVelocity||frame.local.stance!==undefined&&(!Number.isFinite(frame.local.stance)||frame.local.stance<0||frame.local.stance>1))return null;
  const players=[],slots=new Set();
  for(const player of frame.players){
   if(player?.hidden===true||player?.optical===false)continue;
   const position=vector(player?.position);
   if(!player||!integer(player.slot,0,9)||slots.has(player.slot)||!integer(player.life,1)||typeof player.alive!=='boolean'||!position||!['yaw','pitch','stance'].every(key=>Number.isFinite(player[key]))||player.stance<0||player.stance>1)return null;
   slots.add(player.slot);players.push(Object.freeze({slot:player.slot,life:player.life,alive:player.alive,position,yaw:player.yaw,pitch:player.pitch,stance:player.stance}));
  }
  return Object.freeze({atMs:frame.atMs,animationAtMs:frame.animationAtMs,tick:frame.tick,viewTick:frame.viewTick,renderTick:frame.renderTick,slot:frame.slot,sequence:frame.sequence,camera:Object.freeze({position:cameraPosition,yaw:frame.camera.yaw,pitch:frame.camera.pitch,roll:frame.camera.roll,fov:frame.camera.fov}),local:Object.freeze({position:localPosition,velocity:localVelocity,...(frame.local.stance===undefined?{}:{stance:frame.local.stance})}),players:Object.freeze(players)});
 };
 const presentationContext=(s,fence)=>!!s&&s===current&&s.connected&&s.controller&&s.protocolVersion===2&&s.maxAgeMs===400&&typeof s.room==='string'&&s.room.length>0&&s.room.length<=64&&integer(s.slot,0,9)&&integer(s.life,1)&&integer(s.tick)&&fence.localFenceAvailable&&invalid===null;
 const refMatches=(ref,s,fence)=>!!ref&&presentationContext(s,fence)&&['pageInstance','socketGeneration','ownerEpoch','proofGeneration','room','slot','life'].every(key=>ref[key]===context(s)[key])&&ref.localRecoveryEpoch===fence.localRecoveryEpoch;
 const observePresentation=frame=>{
  const fence=readFence(),s=current,at=fence.pageNowMs;let payload;
  try{payload=presentationFrame(frame);}catch{clearPresentation('invalid_presentation_payload');return null;}
  if(!presentationContext(s,fence)){clearPresentation('presentation_context_unavailable');return null;}
  if(!payload||payload.atMs>at||payload.tick>s.tick||payload.renderTick>s.tick||payload.slot!==s.slot||!payload.players.some(player=>player.slot===s.slot&&player.life===s.life)){clearPresentation('invalid_presentation_payload');return null;}
  const row=add('presentation',{...context(s),localRecoveryEpoch:fence.localRecoveryEpoch,localPaused:fence.localPaused,localFenceAvailable:true,presentationReferenceVersion:1,callbackObservedAtMs:at,frame:payload});
  if(!row)return null;
  lastCompletedPresentationRef=Object.freeze({presentationReferenceVersion:1,pageInstance,eventIndex:row.eventIndex,callbackObservedAtMs:at,socketGeneration:s.id,ownerEpoch:s.ownerEpoch,proofGeneration:s.proofGeneration,room:s.room,slot:s.slot,life:s.life,localRecoveryEpoch:fence.localRecoveryEpoch});presentationUnavailableReason=null;
  return lastCompletedPresentationRef;
 };
 const parse=data=>{if(typeof data!=='string'||data.length>65536)return null;try{return JSON.parse(data);}catch{return null;}};
 const isNeutral=i=>!!i&&i.x===0&&i.y===0&&!['fire','reload','walk','crouch','jump','ability','interact','scope','drop'].some(k=>i[k])&&!i.item&&!i.practice&&i.weapon==null&&i.buy==null;
 const ack=value=>value&&Object.keys(value).sort().join(',')==='life,neutral,seq,tick,version'&&value.version===1&&['seq','tick','life'].every(k=>Number.isSafeInteger(value[k])&&value[k]>0)&&typeof value.neutral==='boolean'?{version:1,seq:value.seq,tick:value.tick,life:value.life,neutral:value.neutral}:null;
 const invalidate=s=>{s.proofGeneration++;s.pending.clear();if(s===current)clearPresentation('presentation_context_changed');};
 const attach=socket=>{
  try{if(new env.URL(socket.url).pathname!=='/games/botstrike/api/socket')return socket;}catch{return socket;}
  if(++socketSerial>maxSockets){invalid='socket_capture_overflow';return socket;}
  const s={id:socketSerial,ownerEpoch:0,proofGeneration:0,connected:true,controller:false,protocolVersion:null,maxAgeMs:null,room:null,slot:null,life:null,tick:null,ownerSecret:null,pending:new Map(),maxSeq:0,sendSerial:0};current=s;clearPresentation('presentation_socket_changed');
  const onMessage=event=>{const value=parse(event.data);if(!value)return;
   if(value.type==='control'){
    const owns=value.active===true&&typeof value.token==='string'&&value.token.length>0;
    if(s.controller!==owns||s.ownerSecret!==value.token){s.ownerEpoch++;invalidate(s);}s.controller=owns;s.ownerSecret=value.token;s.protocolVersion=value.inputProtocol?.version??null;s.maxAgeMs=value.inputProtocol?.maxAgeMs??null;
    add('control',{...context(s),active:owns,inputProtocol:{version:s.protocolVersion,maxAgeMs:s.maxAgeMs}});
   }
   if(value.type==='input_resync'){invalidate(s);add('resync',{...context(s),code:value.code==='stale_delivery'?'stale_delivery':'other'});}
   if(value.type==='state'){
    const room=value.room,player=room?.state?.players?.[room?.slot],roomId=room?.id??null,life=player?.life??null,tick=room?.state?.tick??null,stale=roomId===s.room&&Number.isSafeInteger(tick)&&Number.isSafeInteger(s.tick)&&tick<s.tick;
    if(!stale){if(roomId!==s.room||life!==s.life||room?.slot!==s.slot){invalidate(s);s.maxSeq=0;}s.room=roomId;s.slot=room?.slot??null;s.life=life;s.tick=tick;}
    const inputAck=ack(value.inputAck),original=inputAck?s.pending.get(inputAck.seq):null;
    const joined=original&&original.room===roomId&&original.life===life&&original.ownerEpoch===s.ownerEpoch&&original.proofGeneration===s.proofGeneration&&inputAck.life===life&&inputAck.seq===player?.last_seq&&inputAck.tick>original.nativeTick&&inputAck.tick<=tick&&(!inputAck.neutral||original.originalNeutral)?original:null;
    add('snapshot',{...context(s),localFenceRequired:true,room:roomId,life,tick,slot:room?.slot??null,lastSeq:player?.last_seq??null,alive:player?.alive??null,deliveryAttached:!!value.delivery,currentSocket:current===s,currentContext:current===s&&!stale,inputAck,originalSendStamp:joined?{...joined}:null,localRecoveryEpoch:joined?.localRecoveryEpoch??null});
   }
  };
  const onClose=()=>{s.connected=false;s.controller=false;s.ownerSecret=null;invalidate(s);add('close',{...context(s),closed:true,currentSocket:current===s});};
  socket.addEventListener('message',onMessage);socket.addEventListener('close',onClose);
  const nativeSend=socket.send;
  const observeSend=function(data){
   if(this!==socket){invalid='send_receiver_mismatch';return Reflect.apply(nativeSend,this,arguments);}
   const value=parse(data),fence=readFence(),at=now(),sendSerial=++s.sendSerial,sentContext=context(s),pageEventIndexBeforeNativeSend=serial;
   const presentationRef=value?.type==='input'&&value.room===sentContext.room&&refMatches(lastCompletedPresentationRef,s,fence)?lastCompletedPresentationRef:null,presentationReason=presentationRef?null:presentationUnavailableReason??'presentation_context_unavailable';
   const returned=Reflect.apply(nativeSend,this,arguments); // failed sends produce no witness
   if(value?.type!=='input')return returned;
   const seq=value.input?.seq,validSeq=Number.isSafeInteger(seq)&&seq>0&&seq<=0xffffffff;
   for(const [key,stamp]of s.pending)if(at-stamp.pageSentAt>=1000)s.pending.delete(key);
   const stamp={...sentContext,seq,sendSerial,pageSentAt:at,localRecoveryEpoch:fence.localRecoveryEpoch,localPaused:fence.localPaused,localEpochObservedAt:fence.localEpochObservedAt,localFenceAvailable:fence.localFenceAvailable,originalNeutral:isNeutral(value.input),presentationReferenceVersion:1,presentationReferenceAvailable:!!presentationRef,presentationReferenceUnavailableReason:presentationReason,pageEventIndexBeforeNativeSend,lastCompletedPresentationRef:presentationRef};
   const sameContext=current===s&&['socketGeneration','ownerEpoch','proofGeneration','room','slot','life'].every(key=>sentContext[key]===context(s)[key])&&lastEpoch===fence.localRecoveryEpoch&&value.room===sentContext.room&&sentContext.controller&&sentContext.protocolVersion===2&&sentContext.maxAgeMs===400&&Number.isSafeInteger(sentContext.nativeTick)&&Number.isSafeInteger(sentContext.life);
   if(!Number.isSafeInteger(sendSerial)||!validSeq||seq<=s.maxSeq){invalid='ambiguous_or_reused_send_sequence';s.pending.delete(seq);}
   else if(s.pending.size>=maxPending){invalid='send_stamp_overflow';}
   else if(sameContext&&fence.localFenceAvailable)s.pending.set(seq,stamp);
   if(validSeq)s.maxSeq=Math.max(s.maxSeq,seq);
   const input={};for(const key of ['seq','x','y','yaw','pitch','fire','reload','walk','crouch','jump','ability','interact','scope','drop','item','weapon','practice','preview_item','throw_mode','action_life','viewTick']){const v=value.input?.[key];if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v))input[key]=v;}
   add('input',{...input,...stamp,room:typeof value.room==='string'&&value.room.length<=64?value.room:null,protocolVersion:value.delivery?.version??null,deliveryAttached:!!value.delivery,currentSocket:current===s,localFenceRequired:true,...(wireJoin?{wirePayload:data}:{} )});return returned;
  };
  socket.send=observeSend;sockets.push({socket,nativeSend,onMessage,onClose});add('socket_open',{...context(s)});return socket;
 };
 const Wrapped=new Proxy(Native,{construct(target,args,newTarget){return attach(Reflect.construct(target,args,newTarget));}});env.WebSocket=Wrapped;
 const api={schema:'botstrike-local-send-fence-1',localFenceRequired:true,presentationReferenceVersion:1,observePresentation,
  read(){const fence=readFence(),events=rows.splice(0),available=refMatches(lastCompletedPresentationRef,current,fence);wireQueuedBytes=0;return{schema:this.schema,localFenceRequired:true,presentationReferenceVersion:1,pageEventIndex:serial,currentPresentationRef:available?lastCompletedPresentationRef:null,presentationReferenceAvailable:available,presentationReferenceUnavailableReason:available?null:presentationUnavailableReason??'presentation_context_unavailable',events,dropped,unavailableReason:invalid,currentContext:current?{...context(current),...fence,localFenceRequired:true,captureEvidenceAvailable:invalid===null}:null};},
  stop(){if(env.WebSocket===Wrapped)env.WebSocket=Native;for(const {socket,nativeSend,onMessage,onClose}of sockets){socket.send=nativeSend;socket.removeEventListener('message',onMessage);socket.removeEventListener('close',onClose);}invalid='capture_stopped';clearPresentation('capture_stopped');}};
 Object.defineProperty(env,'__botstrikeLocalFenceCapture',{value:api,configurable:true});return api;
}
export async function installStoreLocalRecoveryCapture(page,{limit=4096,maxPending=256,maxSockets=64}={}){
 await page.addInitScript({content:'('+installLocalRecoveryPageCapture.toString()+')(globalThis,'+JSON.stringify({limit,maxPending,maxSockets})+');'});
}
export function storeLocalFenceObservation(game,{refreshTimeoutMs=5000}={}){
 if(!Number.isSafeInteger(refreshTimeoutMs)||refreshTimeoutMs<1||refreshTimeoutMs>30000)throw Error('Bounded refresh deadline required');
 let lastCaptureDropped=0,inFlight=null,failed=false;
 const observation={localFenceRequired:true,presentationReferenceVersion:null,pageEventIndex:null,currentPresentationRef:null,presentationReferenceAvailable:false,presentationReferenceUnavailableReason:'presentation_reference_unavailable',inputs:[],snapshots:[],controls:[],resyncs:[],socketCloses:[],localBoundaries:[],presentations:[],dropped:0,currentContext:null};
 return{observation,async refresh({fresh=false}={}){
  if(failed)throw Error('Local-fence refresh unavailable');if(inFlight){const previous=inFlight;await previous;if(!fresh)return observation;if(inFlight&&inFlight!==previous)return inFlight;if(failed)throw Error('Local-fence refresh unavailable');}
  inFlight=(async()=>{let timer;try{
   const value=await Promise.race([game.locator('html').evaluate(()=>globalThis.__botstrikeLocalFenceCapture?.read()??null),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Local-fence refresh timed out')),refreshTimeoutMs);})]);
   if(!value||value.schema!==LOCAL_FENCE_SCHEMA){observation.currentContext=null;return observation;}
   observation.dropped+=Math.max(0,value.dropped-lastCaptureDropped);lastCaptureDropped=Math.max(lastCaptureDropped,value.dropped);observation.currentContext=value.currentContext;observation.presentationReferenceVersion=value.presentationReferenceVersion===1?1:null;observation.pageEventIndex=Number.isSafeInteger(value.pageEventIndex)?value.pageEventIndex:null;observation.presentationReferenceAvailable=value.presentationReferenceAvailable===true&&value.currentPresentationRef!==null&&typeof value.currentPresentationRef==='object';observation.currentPresentationRef=observation.presentationReferenceAvailable?structuredClone(value.currentPresentationRef):null;observation.presentationReferenceUnavailableReason=observation.presentationReferenceAvailable?null:value.presentationReferenceUnavailableReason??'presentation_reference_unavailable';
   if(observation.dropped!==0||value.dropped||value.unavailableReason)observation.currentContext=observation.currentContext?{...observation.currentContext,captureEvidenceAvailable:false}:null;
   for(const row of value.events){const key={input:'inputs',snapshot:'snapshots',control:'controls',resync:'resyncs',close:'socketCloses',local_boundary:'localBoundaries',presentation:'presentations'}[row.kind];if(!key)continue;if(observation[key].length>=16384){observation.dropped++;if(observation.currentContext)observation.currentContext.captureEvidenceAvailable=false;continue;}const {wirePayload,...safe}=row;observation[key].push({...safe,nodeUnixMs:Date.now(),nodeAtMs:performance.now()});}
   return observation;
  }catch(error){failed=true;observation.currentContext=null;observation.unavailableReason='refresh_failed';throw error;}finally{clearTimeout(timer);}})();
  try{return await inFlight;}finally{inFlight=null;}
 }};
}
