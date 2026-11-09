// Private, opt-in lab entry point. Normal production runtimeCommand is unchanged.
// Full Native poses are intentionally confined to an owned disposable data tree.
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createBotStrike} from '../botstrike-service/server.mjs';

const allowed=new Set(['room_started','native_input','native_frame','input_arrival','input_ack','input_rejected','purchase_arrival','snapshot_write','seal_started','seal_completed','room_failed','room_cancelled']);
const safeCode=error=>/^[A-Z][A-Z0-9_]{0,31}$/.test(error?.code||'')?error.code:'IO_ERROR';
export async function createNetworkCapture({directory,data,maxBytes=256*1024**2,maxQueuedBytes=4*1024**2}={}){
 const base=path.resolve(data||''),out=path.resolve(directory||'');
 if(!data||!directory||!out.startsWith(base+path.sep)||await fs.realpath(out)!==out)throw Error('Owned private lab directory required');
 const marker=path.join(out,'.network-lab-owner'),metadata=await fs.lstat(marker),owner=await fs.readFile(marker,'utf8');
 if(!metadata.isFile()||metadata.isSymbolicLink()||owner.length<8||owner.length>128)throw Error('Private lab ownership marker required');
 if(!Number.isSafeInteger(maxBytes)||maxBytes<4096||maxBytes>1024**3||!Number.isSafeInteger(maxQueuedBytes)||maxQueuedBytes<1024||maxQueuedBytes>16*1024**2)throw Error('Invalid private capture bounds');
 await fs.chmod(out,0o700);
 const file=await fs.open(path.join(out,'runtime.jsonl'),'wx',0o600),trace=file.createWriteStream();
 const info={schemaVersion:2,status:'capturing',private:true,humanParticipants:0,owner:owner.trim(),startedAt:Date.now(),clockAnchor:{wallAt:Date.now(),monotonicMs:performance.now()},bytes:0,events:0,dropped:0,errorCode:null,latestCoalesced:0,latestErrorCode:null,limits:{maxBytes,maxQueuedBytes},nativeFrameFormat:'raw engine JSON line, preserving signed zero and every original numeric lexeme',latestFormat:'JavaScript numeric projection for navigation; not an exact Native hash source',clock:'runtime local Date.now and performance.now; no one-way transit claim',limitations:['Full private observation adds serialization and file-I/O overhead.','Runtime snapshot writes refer to its immediate peer, not browser receipt.','A capturing or interrupted manifest is not complete acceptance evidence.']};
 let closing=false,latest=null,latestWriting=false,manifestWriting=false,manifestAgain=false;
 trace.on('error',error=>{info.errorCode=safeCode(error);});
 async function atomic(file,value){const target=path.join(out,file);await fs.writeFile(target+'.tmp',JSON.stringify(value)+'\n',{mode:0o600});await fs.rename(target+'.tmp',target);}
 async function manifest(){if(manifestWriting){manifestAgain=true;return;}manifestWriting=true;try{do{manifestAgain=false;await atomic('capture.json',info);}while(manifestAgain);}catch(error){info.errorCode??=safeCode(error);}finally{manifestWriting=false;}}
 async function writeLatest(){
  if(latestWriting||!latest)return;latestWriting=true;const value=latest;latest=null;
  try{await atomic('latest.json',value);}catch(error){info.latestErrorCode=safeCode(error);}finally{latestWriting=false;}
 }
 const timer=setInterval(()=>{void manifest();void writeLatest();},250);timer.unref();
 function observe(event){
  if(closing||!allowed.has(event?.type))return;
  let persisted=event;
  if(event.type==='native_frame'){
   if(typeof event.rawLine!=='string'||!event.rawLine){info.dropped++;info.errorCode='RAW_FRAME_REQUIRED';return;}
   if(latest)info.latestCoalesced++;latest={type:event.type,room:event.room,at:event.at,monotonicMs:event.monotonicMs,numericProjection:true,signedZeroPreserved:false,state:event.state};
   persisted={type:event.type,room:event.room,at:event.at,monotonicMs:event.monotonicMs,rawLine:event.rawLine};
  }
  if(info.errorCode||trace.writableLength>maxQueuedBytes){info.dropped++;return;}
  let line;try{line=JSON.stringify(persisted)+'\n';}catch{info.dropped++;info.errorCode='SERIALIZATION_ERROR';return;}
  const bytes=Buffer.byteLength(line);if(info.bytes+bytes>maxBytes){info.dropped++;info.errorCode='CAPTURE_LIMIT';return;}
  info.bytes+=bytes;info.events++;trace.write(line);
 }
 await manifest();
 async function close(){
  if(closing)return info;closing=true;clearInterval(timer);
  while(latestWriting||manifestWriting)await new Promise(resolve=>setTimeout(resolve,5));await writeLatest();
  if(!trace.destroyed)await new Promise(resolve=>{trace.once('error',resolve);trace.end(resolve);});
  info.finishedAt=Date.now();info.status=info.dropped||info.errorCode||info.latestErrorCode?'invalid':'complete';await manifest();return info;
 }
 return{observe,close,info};
}

export function networkCaptureLimit(env=process.env){
 const value=env.BOTSTRIKE_NETWORK_CAPTURE_MAX_BYTES;if(value===undefined)return 256*1024**2;
 if(typeof value!=='string'||! /^[1-9][0-9]{0,9}$/.test(value))throw Error('Invalid explicit private capture limit');const bytes=Number(value);
 if(!Number.isSafeInteger(bytes)||bytes<4096||bytes>512*1024**2)throw Error('Private capture limit must be 4096 to 512MiB');return bytes;
}
export async function startNetworkRuntime(){
 if(!process.env.DATA_DIR||!process.env.BOTSTRIKE_NETWORK_LAB_DIR)throw Error('Explicit disposable lab data required');
 const capture=await createNetworkCapture({directory:process.env.BOTSTRIKE_NETWORK_LAB_DIR,data:process.env.DATA_DIR,maxBytes:networkCaptureLimit(),maxQueuedBytes:4*1024**2});let service,closing=false;
 try{service=createBotStrike({observe:capture.observe});await new Promise((resolve,reject)=>{service.server.once('error',reject);service.server.listen(Number(process.env.PORT||8785),process.env.BIND||'127.0.0.1',resolve);});}
 catch(error){await capture.close();throw error;}
 async function close(){if(closing)return;closing=true;try{await service.close();await capture.close();}finally{process.exit(0);}}
 for(const signal of ['SIGINT','SIGTERM'])process.on(signal,close);
 console.log('Private network lab runtime ready');return{service,capture};
}
if(process.argv[1]===fileURLToPath(import.meta.url))await startNetworkRuntime();
