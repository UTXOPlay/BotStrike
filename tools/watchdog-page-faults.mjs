// Private targeted QA only. Serialized into one owned page before application JS.
// Synthetic client-message omission and an explicit main-thread task are never
// described as real packet loss, a server defect or physical/human input.
export function installWatchdogPageFaults(env){
 if(env.__botstrikeWatchdogFaults)throw Error('Fault observer already installed');
 const Native=env.WebSocket,rows=[],uiRows=[],delivered=[];let serial=0,dropped=0,invalid=null,bytes=0,socketCount=0,current=null,usedOmission=false,usedTask=false,usedReplay=false,active=false,until=null,startedAt=null,endedAt=null,frozen=null,lastOriginal=null,lastUi;
 const now=()=>env.performance.now(),limits={rows:4096,ui:512,delivered:1024,totalBytes:2*1024*1024,maxMessageBytes:65536,maxSockets:8};
 const keep=(kind,data)=>{const row={kind,index:++serial,atMs:now(),...data},size=new env.TextEncoder().encode(JSON.stringify(row)).length;if(rows.length>=limits.rows||bytes+size>limits.totalBytes){dropped++;invalid='fault_journal_cap';return;}bytes+=size;rows.push(row);};
 const fence=()=>{const root=env.document.documentElement,e=root.getAttribute('data-control-recovery-epoch'),p=root.getAttribute('data-control-paused');return{epoch:typeof e==='string'&&/^(0|[1-9][0-9]{0,15})$/.test(e)&&Number.isSafeInteger(Number(e))?Number(e):null,paused:p==='1'?true:p==='0'?false:null,playing:root.getAttribute('data-playing')==='true'};};
 const ui=()=>{const f=fence(),resume=env.document.getElementById('resume'),buy=env.document.getElementById('buy-open'),status=env.document.getElementById('status');return{atMs:now(),...f,resumeDisabled:resume?.disabled??null,buyDisabled:buy?.disabled??null,resume:String(resume?.textContent??'').slice(0,100),status:String(status?.textContent??'').slice(0,400)};};
 const sampleUi=()=>{const v=ui(),signature=JSON.stringify({...v,atMs:0});if(signature===lastUi)return;lastUi=signature;if(uiRows.length>=limits.ui){dropped++;invalid='ui_journal_cap';return;}uiRows.push(v);};
 const end=reason=>{if(active){active=false;endedAt=now();keep('omission_end',{reason,startedAt,endedAt});}};
 const expire=()=>{if(active&&now()>=until)end('fixed_duration_elapsed');};
 const ack=value=>value&&Object.keys(value).sort().join(',')==='life,neutral,seq,tick,version'&&value.version===1&&['seq','tick','life'].every(k=>Number.isSafeInteger(value[k])&&value[k]>0)&&typeof value.neutral==='boolean'?{version:1,seq:value.seq,tick:value.tick,life:value.life,neutral:value.neutral}:null;
 const attach=socket=>{
  let url;try{url=new env.URL(socket.url);}catch{return socket;}if(url.origin!=='ws://botstrike.localhost:8080'||url.pathname!=='/games/botstrike/api/socket')return socket;
  if(++socketCount>limits.maxSockets){invalid='fault_socket_cap';return socket;}
  let descriptor,proto=socket;for(let i=0;proto&&i<12;i++,proto=Object.getPrototypeOf(proto)){const candidate=Object.getOwnPropertyDescriptor(proto,'onmessage');if(candidate?.set){descriptor=candidate;break;}}
  if(!descriptor)throw Error('Native onmessage descriptor required for targeted app-only omission');
  const state={socket,id:socketCount,handler:null,controller:false,protocolVersion:null};current=state;
  const nativeSend=socket.send;socket.send=function(data){const atMs=now(),local=fence(),result=Reflect.apply(nativeSend,this,arguments);if(this!==socket){invalid='send_receiver_mismatch';return result;}if(typeof data==='string'&&data.length<=65536){let packet;try{packet=JSON.parse(data);}catch{return result;}if(packet.type==='input'){const input={};for(const key of ['seq','x','y','yaw','pitch','fire','reload','walk','crouch','jump','ability','interact','scope','drop','item','weapon','practice','preview_item','throw_mode','action_life','viewTick']){const v=packet.input?.[key];if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v))input[key]=v;}keep('input_send',{socket:state.id,sentAtMs:atMs,epoch:local.epoch,paused:local.paused,playing:local.playing,input,deliveryAttached:!!packet.delivery,protocolVersion:packet.delivery?.version??null});}}return result;};
  Object.defineProperty(socket,'onmessage',{configurable:true,enumerable:true,get(){return state.handler;},set(handler){state.handler=typeof handler==='function'?handler:null;descriptor.set.call(socket,state.handler?function(event){
   expire();const raw=event.data;if(typeof raw!=='string'||new env.TextEncoder().encode(raw).length>limits.maxMessageBytes){invalid='fault_message_shape_or_cap';return state.handler.call(socket,event);}
   let value;try{value=JSON.parse(raw);}catch{return state.handler.call(socket,event);}
   if(value.type==='control'){state.controller=value.active===true;state.protocolVersion=value.inputProtocol?.version??null;}if(value.type!=='state')return state.handler.call(socket,event);
   const originalAck=ack(value.inputAck),room=value.room,me=room?.state?.players?.[room?.slot];
   const safe={socket:state.id,tick:room?.state?.tick??null,phase:room?.state?.phase??null,life:me?.life??null,alive:me?.alive??null,originalAck,deliveryPresent:!!value.delivery,mode:room?.state?.config?.mode??null,practiceDrill:room?.state?.practice?.settings?.drill??null,practiceOutcome:room?.state?.practice?.outcome??null,controller:state.controller,protocolVersion:state.protocolVersion,playingAtForward:fence().playing};
   if(!active&&originalAck)lastOriginal={raw,event,safe,capturedAt:now()};
   keep('state_forward',{...safe,omitted:active,syntheticClientEvent:active});
   if(active){const forwarded={...value};delete forwarded.inputAck;const replacement=new env.MessageEvent('message',{data:JSON.stringify(forwarded),origin:event.origin,lastEventId:event.lastEventId});return state.handler.call(socket,replacement);}
   if(originalAck){if(delivered.length>=limits.delivered){dropped++;invalid='delivered_ack_cap';}else delivered.push({atMs:now(),socket:state.id,ack:originalAck,tick:safe.tick});}
   return state.handler.call(socket,event);
  }:null);}});
  return socket;
 };
 const Wrapped=new Proxy(Native,{construct(target,args,newTarget){return attach(Reflect.construct(target,args,newTarget));}});env.WebSocket=Wrapped;
 const click=event=>{if(event.target?.closest?.('#resume'))keep('resume_click',{trusted:event.isTrusted===true,...fence()});};env.document.addEventListener('click',click,true);
 const observer=new env.MutationObserver(sampleUi);observer.observe(env.document.documentElement,{attributes:true,childList:true,characterData:true,subtree:true});sampleUi();
 const api={
  beginOmission(){if(usedOmission||!current||!lastOriginal)throw Error('One omission needs an original actual ACK state');usedOmission=true;frozen=lastOriginal;startedAt=now();until=startedAt+1600;active=true;keep('omission_start',{requestedMs:1600,classification:'synthetic app-message inputAck omission; original wire unchanged',frozenOriginalAck:frozen.safe.originalAck,frozenOriginalTick:frozen.safe.tick,...fence()});return{startedAt,until,frozenOriginalAck:{...frozen.safe.originalAck},frozenOriginalTick:frozen.safe.tick};},
  endOmission(){end('explicit_stop');return endedAt;},
  replayCachedOriginal(){if(usedReplay||!frozen||!current?.handler||fence().paused!==true)throw Error('One cached original message replay only while latched');usedReplay=true;const atMs=now(),event=new env.MessageEvent('message',{data:frozen.raw,origin:frozen.event.origin,lastEventId:frozen.event.lastEventId});keep('cached_original_app_message_replay',{classification:'synthetic delayed original state message; not fabricated ACK or a new wire frame',originalAck:frozen.safe.originalAck,originalTick:frozen.safe.tick,capturedAt:frozen.capturedAt,...fence()});current.handler.call(current.socket,event);sampleUi();return{atMs,originalAck:{...frozen.safe.originalAck},originalTick:frozen.safe.tick,after:ui()};},
  blockMainThread(){if(usedTask)throw Error('One explicit main-thread task only');usedTask=true;const before=ui(),startAt=now();keep('mainthread_task_start',{requestedMs:800,classification:'explicit synthetic synchronous page task',before});let iterations=0;while(now()-startAt<800&&++iterations<200000000){}const endAt=now();keep('mainthread_task_end',{startAt,endAt,durationMs:endAt-startAt,iterations});if(endAt-startAt<800)throw Error('Monotonic task bound failed');return{startAt,endAt,durationMs:endAt-startAt,before};},
  read(){expire();sampleUi();return{schema:'targeted-watchdog-page-faults-1',classification:'owned synthetic client fault; not actual network impairment',active,startedAt,endedAt,until,socketCount,dropped,invalid,bytes,limits,ui:ui(),events:rows.slice(),uiRows:uiRows.slice(),deliveredAcks:delivered.slice()};}
 };Object.defineProperty(env,'__botstrikeWatchdogFaults',{value:api,configurable:true});return api;
}
export const neutralInput=i=>!!i&&i.x===0&&i.y===0&&!['fire','reload','walk','crouch','jump','ability','interact','scope','drop'].some(k=>i[k])&&!i.item&&!i.practice&&i.weapon==null&&i.buy==null;
// Shared local fence is a supplement, not standalone wire authority. These
// exact-known-sent/socket/owner/room/life/nativeTick checks precede it.
export function selectTargetAck(observation,{afterPageSentAt=0,epoch,paused,neutral=false,movement=false,deliveredAcks,deliveredAfterPageMs=afterPageSentAt,match}={}){
 const c=observation?.currentContext;if(typeof match!=='function'||observation.dropped!==0||!c?.connected||!c.controller||c.protocolVersion!==2||c.maxAgeMs!==400||c.captureEvidenceAvailable!==true||!c.localFenceAvailable||c.localRecoveryEpoch!==epoch||c.localPaused!==paused)return null;
 const inputs=new Map(observation.inputs.map(i=>[JSON.stringify([i.pageInstance,i.socketGeneration,i.sendSerial,i.seq]),i]));
 for(const s of [...observation.snapshots].reverse()){
  const a=s.inputAck,o=s.originalSendStamp,i=o&&inputs.get(JSON.stringify([o.pageInstance,o.socketGeneration,o.sendSerial,o.seq]));
  if(!i||i.wireVerified!==true||!a||Object.keys(a).sort().join(',')!=='life,neutral,seq,tick,version'||a.version!==1||!['seq','tick','life'].every(k=>Number.isSafeInteger(a[k])&&a[k]>0)||typeof a.neutral!=='boolean'||s.currentSocket!==true||s.currentContext!==true||i.currentSocket!==true||!s.deliveryAttached||!i.deliveryAttached||i.protocolVersion!==2||i.pageSentAt<afterPageSentAt||i.localPaused!==paused||!Number.isSafeInteger(i.nativeTick)||a.tick<=i.nativeTick||a.tick>s.tick||a.seq!==s.lastSeq||a.seq!==i.seq||a.life!==i.life)continue;
  if(['socketGeneration','ownerEpoch','proofGeneration','room','life'].some(k=>i[k]!==c[k]||s[k]!==i[k]))continue;
  if(neutral&&(!a.neutral||!neutralInput(i))||movement&&(!(i.x||i.y)||a.neutral))continue;
  if(deliveredAcks&&!deliveredAcks.some(d=>d.socket===i.socketGeneration&&['seq','tick','life','neutral','version'].every(k=>d.ack[k]===a[k])&&d.atMs>=deliveredAfterPageMs))continue;
  if(match(s,i,c,{requireNeutral:neutral&&paused}))return{ack:{...a},input:{...i},snapshot:{...s},current:{...c}};
 }
 return null;
}
