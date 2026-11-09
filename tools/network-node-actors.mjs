// Automated lab clients, not humans. Authentication stays in private closures.
// Real HTTP/WebSocket bytes go through the externally shaped TCP proxy.
import http from 'node:http';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {WebSocket} from 'ws';
import {InputDelivery} from '../games/botstrike/client/input-delivery.mjs';
const origin='http://botstrike.localhost:8080',authority='botstrike.localhost:8080',base='/games/botstrike';
const privateSession=Symbol('private lab session');
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
export async function waitNetworkCondition(predicate,{timeout=15000,poll=10,label='network condition'}={}){const deadline=performance.now()+timeout;while(performance.now()<deadline){const value=await predicate();if(value)return value;await delay(poll);}throw Error('Timed out: '+label);}
const neutral=()=>({x:0,y:0,yaw:0,pitch:0,fire:false,reload:false,walk:false,crouch:false,jump:false,ability:false,interact:false,scope:false,drop:false,item:0,practice:0,throw_mode:0,preview_item:0});
export const neutralNetworkInput=input=>!!input&&!input.x&&!input.y&&!input.item&&!input.practice&&input.weapon==null&&input.buy==null&&!['fire','reload','walk','crouch','jump','ability','interact','scope','drop'].some(key=>input[key]);
export async function openNetworkNodeActor(options={}){
 const {id,proxyUrl,directory,hz=30,expectActive=true,autoReconnect=true}=options,session=options[privateSession];
 if(!/^[A-Z][A-Za-z0-9_-]{0,23}$/.test(id||'')||!Number.isInteger(hz)||hz<1||hz>60)throw Error('Invalid controlled actor');
 const proxy=new URL(proxyUrl);if(proxy.protocol!=='http:'||proxy.hostname!=='127.0.0.1'||!proxy.port)throw Error('Explicit loopback lab proxy required');
 await fs.mkdir(directory,{recursive:true,mode:0o700});await fs.chmod(directory,0o700);
 const file=await fs.open(path.join(directory,id+'.jsonl'),'wx',0o600),trace=file.createWriteStream(),info={actor:id,automated:true,humanParticipants:0,events:0,bytes:0,dropped:0,errorCode:null,maxBytes:32*1024**2};trace.on('error',()=>{info.errorCode='IO_ERROR';});
 let cookie=session?.cookie||'',controlToken=null,room=session?.room||null,ws=null,closed=false,sequence=0,held=neutral(),sending=true,socketGeneration=0,retry=0,retryTimer=null,manualReconnect=false,reconnectWanted=false,autoConnecting=false;const delivery=new InputDelivery();
 const inputs=[],messages=[],errors=[];
 let ownerGeneration=0,roomGeneration=0,authorityGeneration=0,inputAck=null,protocolError=null,challengeCount=0,lastChallenge=null;
 const knownSent=new Map(),knownAcks=new Map(),frozenPurchases=new Set();
 const boundedSet=(map,key,value,limit=256)=>{map.set(key,value);while(map.size>limit)map.delete(map.keys().next().value);};
 function resetAuthority(){authorityGeneration++;inputAck=null;knownSent.clear();knownAcks.clear();lastChallenge=null;challengeCount=0;for(const handle of [...frozenPurchases])handle.close();}
 function setRoom(next){const previousLife=room?.state?.players[room.slot]?.life??null,nextLife=next?.state?.players[next.slot]?.life??null;if(room?.id!==next?.id||previousLife!==nextLife){if(room?.id!==next?.id)roomGeneration++;resetAuthority();held=neutral();}room=next;}
 function currentContext(entry){return !!controlToken&&entry.socketGeneration===socketGeneration&&entry.ownerGeneration===ownerGeneration&&entry.roomGeneration===roomGeneration&&entry.room===room?.id&&entry.life===(room?.state?.players[room.slot]?.life??null);}
 function record(kind,value={}){if(closed)return;const line=JSON.stringify({kind,actor:id,wallAt:Date.now(),monotonicMs:performance.now(),...value})+'\n',bytes=Buffer.byteLength(line);if(info.errorCode||info.bytes+bytes>info.maxBytes||trace.writableLength>1024**2){info.dropped++;return;}info.events++;info.bytes+=bytes;trace.write(line);}
 const keep=(list,value,limit=2048)=>{list.push(value);if(list.length>limit)list.shift();};
 async function request(endpoint,body){
  return new Promise((resolve,reject)=>{
   const bytes=body===undefined?null:JSON.stringify(body),request=http.request({host:proxy.hostname,port:proxy.port,path:base+endpoint,method:bytes===null?'GET':'POST',headers:{Host:authority,Origin:origin,...(cookie?{Cookie:cookie}:{}),...(bytes===null?{}:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(bytes)})}},response=>{
    const chunks=[];let length=0;for(const value of response.headers['set-cookie']||[])cookie=value.split(';')[0];
    response.on('data',chunk=>{length+=chunk.length;if(length>8*1024**2){response.destroy();reject(Error('Lab HTTP response exceeded bound'));}else chunks.push(chunk);});
    response.on('error',reject);response.on('end',()=>{try{const value=JSON.parse(Buffer.concat(chunks));if(response.statusCode!==200){const error=Error(value.error||'Lab HTTP action rejected');error.status=response.statusCode;reject(error);}else resolve(value);}catch(error){reject(error);}});
   });request.setTimeout(30000,()=>request.destroy(Error('Lab HTTP request timeout')));request.on('error',reject);request.end(bytes);
  });
 }
 let timer;
 async function close({leave=false}={}){
  if(closed)return info;clearInterval(timer);clearTimeout(retryTimer);retryTimer=null;sending=false;manualReconnect=true;
  if(leave&&room&&controlToken)try{await action({type:'leave'});}catch{}
  ws?.terminate();resetAuthority();closed=true;if(!trace.destroyed)await new Promise(resolve=>{trace.once('error',resolve);trace.end(resolve);});
  info.status=info.errorCode||info.dropped?'invalid':'complete';await fs.writeFile(path.join(directory,id+'-capture.json'),JSON.stringify(info)+'\n',{mode:0o600});return info;
 }
 async function action(body,override){const value=await request('/api/action',{...body,...(controlToken?{controlToken}:{}),...(body.type==='buy'?(override??delivery.envelope()):{})});if('room'in value){setRoom(value.room);delivery.context(room?.id??null,room?.state?.players[room.slot]?.life??null);}record('action',{type:body.type,room:room?.id??null,status:room?.status??null});return value;}
 function send(patch){
  if(!room||room.status!=='running'||!controlToken||!delivery.canSend()||ws?.readyState!==WebSocket.OPEN||ws.bufferedAmount>16000)return false;
  const input=delivery.control({...held,...patch,seq:++sequence,viewTick:Math.max(0,(room.state?.tick||0)-4),...(room.config.ruleset==='tactical'?{action_life:room.state?.players[room.slot]?.life}:{} )});
  const envelope=delivery.envelope(),value={type:'input',room:room.id,input,...envelope},row={seq:input.seq,room:room.id,slot:room.slot,life:room.state?.players[room.slot]?.life??null,socketGeneration,ownerGeneration,roomGeneration,input,wallAt:Date.now(),monotonicMs:performance.now(),bufferedBytes:ws.bufferedAmount,deliveryAttached:!!envelope.delivery,protocolVersion:2};
  try{ws.send(JSON.stringify(value));delivery.sent(input);boundedSet(knownSent,input.seq,{row,delivery:envelope.delivery,controlToken,authorityGeneration});keep(inputs,row);record('input_sent',row);return row;}catch{return false;}
 }
 async function waitInputAck({afterAt=0,neutral:requireNeutral=false,seq:exactSeq=null,predicate=()=>true,timeout=15000}={}){return waitNetworkCondition(()=>{if(closed)throw Error('Node actor closed while waiting for an applied input');for(const value of [...knownAcks.values()].reverse()){const sent=value.sent;if(currentContext(sent)&&sent.wallAt>=afterAt&&(exactSeq===null||value.ack.seq===exactSeq)&&(!requireNeutral||value.ack.neutral&&neutralNetworkInput(sent.input))&&predicate(sent.input))return {ack:{...value.ack},sent:structuredClone(sent)};}return false;},{timeout,label:'current-controller exact Native input ACK'});}
 function freezePurchaseReceipt(proof){
  const ack=proof?.ack??inputAck,known=ack&&knownAcks.get(ack.seq),entry=ack&&knownSent.get(ack.seq);
  if(!known||!entry?.delivery||known.ack.tick!==ack.tick||!currentContext(entry.row)||entry.authorityGeneration!==authorityGeneration)throw Error('A current known-applied input receipt is required');
  if(frozenPurchases.size>=8)throw Error('Frozen purchase receipt bound reached');
  let secret={delivery:{...entry.delivery},controlToken:entry.controlToken,authorityGeneration},used=false;
  const fingerprint=createHash('sha256').update(JSON.stringify(entry.delivery)).digest('hex'),startedChallenges=challengeCount,info={sourceSeq:ack.seq,sourceAckTick:ack.tick,life:ack.life,createdAt:Date.now(),receiptFingerprint:fingerprint};
  const handle={...info,get diagnostics(){return {...info,observedNewChallenges:challengeCount-startedChallenges,contextCurrent:!!secret&&secret.authorityGeneration===authorityGeneration&&currentContext(entry.row)};},async buy({item,life=info.life}={}){if(!secret||used||closed||secret.authorityGeneration!==authorityGeneration||secret.controlToken!==controlToken||!currentContext(entry.row))throw Error('Frozen purchase context changed or closed');const observedNewChallenges=challengeCount-startedChallenges;if(observedNewChallenges>=24)throw Error('Frozen receipt may have been evicted; expired-receipt assertion is unavailable');used=true;record('frozen_purchase_attempt',{...info,observedNewChallenges,elapsedMs:Date.now()-info.createdAt,item});try{return await action({type:'buy',item,life},{delivery:secret.delivery});}finally{handle.close();}},close(){secret=null;frozenPurchases.delete(handle);}};
  frozenPurchases.add(handle);record('frozen_purchase_receipt',{...info});return handle;
 }
 function scheduleReconnect(){
  if(closed||manualReconnect||!autoReconnect||!reconnectWanted||retryTimer||autoConnecting)return;
  const retryMs=Math.min(10000,250*2**Math.min(retry++,5));record('reconnect_scheduled',{generation:socketGeneration,retryMs});
  retryTimer=setTimeout(async()=>{retryTimer=null;autoConnecting=true;try{await connectSocket({needControl:true,claimIfPassive:true});reconnectWanted=false;}catch{keep(errors,'reconnect_failed',64);record('reconnect_failed');}finally{autoConnecting=false;scheduleReconnect();}},retryMs);retryTimer.unref();
 }
 async function connectSocket({needControl=expectActive,claimIfPassive=false}={}){
  const socket=new WebSocket(proxyUrl.replace(/^http/,'ws')+base+'/api/socket',{headers:{Host:authority,Origin:origin,Cookie:cookie}}),generation=++socketGeneration;ws=socket;controlToken=null;protocolError=null;resetAuthority();delivery.transportReset();let observedControl=false;
  socket.on('error',()=>{keep(errors,'socket_error',64);record('socket_error',{generation});});
  socket.on('close',(code)=>{
   if(socket!==ws){record('old_socket_close',{generation,code});return;}
   const wasOwner=!!controlToken;controlToken=null;resetAuthority();delivery.transportReset();held=neutral();record('socket_close',{generation,code});
   if(wasOwner&&!manualReconnect)reconnectWanted=true;scheduleReconnect();
  });
  socket.on('message',raw=>{
   let value;try{value=JSON.parse(raw);}catch{record('malformed_message',{generation});return;}
   if(socket!==ws){record('old_socket_message',{generation,type:value.type});return;}
   if(value.type==='control'){observedControl=true;const nextToken=value.active?value.token:null;if(nextToken!==controlToken){ownerGeneration++;resetAuthority();delivery.resetOwner();held=neutral();}controlToken=nextToken;delivery.advertise(value.inputProtocol);if(value.inputProtocol?.version!==2||value.inputProtocol?.maxAgeMs!==400){protocolError=Error('Node lab actor requires input protocol v2');controlToken=null;resetAuthority();}sequence=Math.max(sequence,value.nextSeq||0);record('control',{generation,ownerGeneration,active:!!value.active,nextSeq:value.nextSeq||0,protocolVersion:value.inputProtocol?.version??null});}
   else if(value.type==='state'){
    if(value.room&&room?.id===value.room.id&&(value.room.state?.tick||0)<(room.state?.tick||0))return;
    setRoom(value.room);const player=room?.state?.players[room.slot];delivery.receive(value.delivery,{room:room?.id??null,life:player?.life??null,lastSeq:player?.last_seq,tick:room?.state?.tick,inputAck:value.inputAck});
    if(value.delivery?.version===2&&value.delivery.nonce!==lastChallenge){lastChallenge=value.delivery.nonce;challengeCount++;}
    inputAck=null;const ack=delivery.ack,entry=ack&&knownSent.get(ack.seq);
    if(ack&&entry&&entry.authorityGeneration===authorityGeneration&&currentContext(entry.row)){inputAck={...ack};boundedSet(knownAcks,ack.seq,{ack:{...ack},sent:entry.row},64);}
    if(player)sequence=Math.max(sequence,player.last_seq);
    record('snapshot_received',{generation,ownerGeneration,roomGeneration,room:room?.id??null,tick:room?.state?.tick??null,slot:room?.slot??null,life:player?.life??null,lastSeq:player?.last_seq??null,inputAck:inputAck?{...inputAck}:null,position:player?.position??null});
   }else if(value.type==='error'||value.type==='input_resync'){if(value.type==='input_resync'){resetAuthority();delivery.recover();held=neutral();}keep(errors,String(value.error||value.code||'input_resync').slice(0,160),64);record('command_error',{generation,type:value.type,code:value.code??null});}
   keep(messages,{type:value.type,wallAt:Date.now()},128);
  });
  await waitNetworkCondition(()=>{if(protocolError)throw protocolError;if(closed||socket!==ws||socket.readyState===WebSocket.CLOSED)throw Error('Node control transport closed');return observedControl;},{label:'Node actor control response'});
  if(claimIfPassive&&!controlToken&&room?.id)socket.send(JSON.stringify({type:'claim',room:room.id}));
  if(needControl)await waitNetworkCondition(()=>{if(closed||socket!==ws||socket.readyState!==WebSocket.OPEN)throw Error('Node claim transport closed');return controlToken;},{label:'Node actor control'});retry=0;return socket;
 }
 async function claim(){if(!room?.id||ws?.readyState!==WebSocket.OPEN)throw Error('A connected reserved seat is required');held=neutral();ws.send(JSON.stringify({type:'claim',room:room.id}));await waitNetworkCondition(()=>controlToken,{label:'claimed Node seat'});record('claim');return room;}
 async function reconnect(){const resumeSending=sending;sending=false;held=neutral();manualReconnect=true;reconnectWanted=false;clearTimeout(retryTimer);retryTimer=null;const previous=ws;if(previous&&previous.readyState!==WebSocket.CLOSED){previous.terminate();await new Promise(resolve=>previous.once('close',resolve));}try{await connectSocket({needControl:true,claimIfPassive:true});}finally{manualReconnect=false;sending=resumeSending;}record('manual_reconnect');return room;}
 try{
  if(!cookie)await request('/api/guest',{});
  await connectSocket();
  timer=setInterval(()=>{if(sending)send();},1000/hz);timer.unref();
  return{id,get room(){return room;},get inputs(){return inputs;},get errors(){return errors;},get socketState(){return ws?.readyState;},get controlActive(){return !!controlToken;},get socketGeneration(){return socketGeneration;},get inputAck(){return inputAck?{...inputAck}:null;},get info(){return info;},request,action,send,claim,reconnect,waitInputAck,freezePurchaseReceipt,duplicate({id:duplicateId,directory:duplicateDirectory=directory}={}){return openNetworkNodeActor({id:duplicateId,proxyUrl,directory:duplicateDirectory,hz,expectActive:false,autoReconnect:false,[privateSession]:{cookie,room}});},setControl(patch){if(delivery.recovering)return false;held={...held,...patch};return true;},neutral(){held=neutral();},pause(){sending=false;held=neutral();},resume(){sending=true;},mark(label){if(!/^[a-z0-9_-]{1,64}$/.test(label))throw Error('Invalid marker');record('mark',{label});},waitRoom(predicate,options){return waitNetworkCondition(()=>{if(closed)throw Error('Node actor closed while waiting');return predicate(room);},options);},close};
 }catch(error){await close();throw error;}
}
