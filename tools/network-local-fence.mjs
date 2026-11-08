// Opt-in observer adapter. No browser launch or application/runtime import.
import {createHash} from 'node:crypto';
import {localRecoveryProofMatches} from './local-recovery-fence.mjs';
const hash=s=>createHash('sha256').update(s).digest('hex');
const key=s=>JSON.stringify([s.pageInstance,s.socketGeneration,s.sendSerial,s.seq]);
const safe=s=>{const {wirePayload,...rest}=s;return rest;};
export class ExactSendJoin{
 constructor({maxPending=4096,maxBytes=512*1024}={}){if(!Number.isSafeInteger(maxPending)||maxPending<2||maxPending>4096||!Number.isSafeInteger(maxBytes)||maxBytes<64||maxBytes>1024*1024)throw Error('Bounded exact join required');this.maxPending=maxPending;this.maxBytes=maxBytes;this.pages=[];this.frames=[];this.bytes=0;this.reason=null;this.mapping=new Map();}
 add(side,row,payload){if(this.reason)return;const bytes=typeof payload==='string'?Buffer.byteLength(payload):-1;if(bytes<1||bytes>65536||this.pages.length+this.frames.length>=this.maxPending||this.bytes+bytes>this.maxBytes){this.reason='wire_join_overflow_or_invalid';return;}const rows=side==='page'?this.pages:this.frames;if(rows.some(r=>r.payload===payload)){this.reason='ambiguous_identical_wire_bytes';return;}rows.push({row,payload,bytes});this.bytes+=bytes;}
 frame(socketGeneration,payload){this.add('frame',{socketGeneration},payload);}
 page(row){this.add('page',safe(row),row.wirePayload);}
 take(){if(this.reason)return[];const out=[];for(const frame of [...this.frames]){const candidates=this.pages.filter(p=>p.payload===frame.payload);if(candidates.length>1){this.reason='ambiguous_identical_wire_bytes';return[];}if(!candidates.length)continue;const page=candidates[0],old=this.mapping.get(frame.row.socketGeneration),reverse=[...this.mapping].find(([k,v])=>v===page.row.socketGeneration&&k!==frame.row.socketGeneration);if(old!==undefined&&old!==page.row.socketGeneration||reverse){this.reason='ambiguous_socket_mapping';return[];}this.mapping.set(frame.row.socketGeneration,page.row.socketGeneration);this.frames.splice(this.frames.indexOf(frame),1);this.pages.splice(this.pages.indexOf(page),1);this.bytes-=frame.bytes+page.bytes;out.push({...page.row,wireVerified:true,wireSha256:hash(page.payload),wireBytes:page.bytes,cdpSocketGeneration:frame.row.socketGeneration,wireJoin:'exact_bytes_unique'});}return out;}
 receipt(){return{available:this.reason===null,reason:this.reason,pendingPage:this.pages.length,pendingCdp:this.frames.length,pendingBytes:this.bytes};}
}
export class NetworkLocalFenceObservation{
 constructor({record=()=>{},maxRows=16384,joinOptions}={}){if(!Number.isSafeInteger(maxRows)||maxRows<4||maxRows>16384)throw Error('Bounded local history required');this.record=record;this.maxRows=maxRows;this.join=new ExactSendJoin(joinOptions);this.invalid=null;this.value={localFenceRequired:true,currentContext:null,inputs:[],snapshots:[],controls:[],localBoundaries:[],dropped:0};}
 observeFrame(generation,payload){this.join.frame(generation,payload);this.matches();}
 matches(){for(const input of this.join.take()){if(this.value.inputs.length>=this.maxRows){this.invalid='local_history_overflow';break;}this.value.inputs.push(input);this.record('local_input',input);}if(this.join.reason)this.invalid=this.join.reason;}
 ingest(batch){
  if(!batch||batch.schema!=='botstrike-local-send-fence-1'){this.invalid='page_capture_unavailable';this.value.currentContext=null;return;}
  this.value.currentContext=batch.currentContext;this.value.dropped=batch.dropped;if(batch.dropped||batch.unavailableReason)this.invalid=batch.unavailableReason??'page_capture_dropped';
  for(const event of batch.events){if(event.kind==='input'){this.join.page(event);continue;}const name={snapshot:'snapshots',control:'controls',local_boundary:'localBoundaries'}[event.kind];if(name){if(this.value[name].length>=this.maxRows){this.invalid='local_history_overflow';continue;}this.value[name].push(safe(event));this.record('local_'+event.kind,safe(event));}}
  this.matches();
 }
 read(){const value=structuredClone(this.value);value.wireJoin=this.join.receipt();value.unavailableReason=this.invalid??(!value.currentContext?'current_context_unavailable':value.currentContext.localFenceAvailable!==true?'local_diagnostics_unavailable':null);if(value.currentContext&&this.invalid)value.currentContext.captureEvidenceAvailable=false;return value;}
}
// Pure supplemental matcher; acceptance must use actor.currentLocalNeutral(),
// which performs a new page-side read. Cached observations are history only.
export function matchNetworkLocalNeutral(observation,{afterEvent=0,afterPageSentAt=0}={}){
 const current=observation?.currentContext;if(observation?.unavailableReason||observation?.dropped||!current?.connected||!current.controller||current.protocolVersion!==2||current.maxAgeMs!==400)return null;
 const sends=new Map(observation.inputs.filter(s=>s.wireVerified===true&&s.eventIndex>afterEvent&&s.pageSentAt>=afterPageSentAt).map(s=>[key(s),s]));
 for(const snapshot of [...observation.snapshots].reverse()){
  const ack=snapshot.inputAck,original=snapshot.originalSendStamp,input=original?sends.get(key(original)):null;
  if(!input||!ack||Object.keys(ack).sort().join(',')!=='life,neutral,seq,tick,version'||ack.version!==1||!['seq','tick','life'].every(k=>Number.isSafeInteger(ack[k])&&ack[k]>0)||ack.neutral!==true||!input.originalNeutral||snapshot.currentSocket!==true||snapshot.currentContext!==true||!snapshot.controller||ack.seq!==input.seq||ack.seq!==snapshot.lastSeq||ack.life!==snapshot.life||ack.tick<=input.nativeTick||ack.tick>snapshot.tick||input.protocolVersion!==2||!input.deliveryAttached)continue;
  if(localRecoveryProofMatches(snapshot,input,current,{requireNeutral:true}))return{ack:{...ack},input:safe(input),snapshot:safe(snapshot),current:{...current},proof:'exact_wire_join_and_current_page_local_fence'};
 }
 return null;
}
