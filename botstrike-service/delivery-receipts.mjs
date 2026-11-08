// Service-envelope policy only: nothing here enters a Native Config/Input/tape.
// A nonce echo proves receipt of state bytes by a cooperating JS client. It is
// neither rendered-pose evidence nor human-input attestation.
import {randomBytes} from 'node:crypto';
import {performance} from 'node:perf_hooks';

export const DELIVERY_RECEIPT_VERSION=2;
export const DELIVERY_RECEIPT_MAX_AGE_MS=400;
const tick=value=>Number.isSafeInteger(value)&&value>=0&&value<=230400;
const object=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
const token=value=>typeof value==='string'&&/^[a-f0-9]{32}$/.test(value);
const exactDelivery=value=>object(value)&&Object.keys(value).length===2&&Object.hasOwn(value,'version')&&Object.hasOwn(value,'nonce');

// Called only with a final, fresh-at-write controller candidate and its paired
// Native frame. A scalar last_seq, including an AI-generated one, is not proof.
export function appliedInputAcknowledgement(candidate,previousPlayer,player,frameTick){
 if(!candidate||candidate.freshAtWrite!==true||!tick(candidate.tick)||candidate.tick<1||candidate.tick!==frameTick||!Number.isSafeInteger(candidate.seq)||candidate.seq<1||candidate.seq>0xffffffff||!Number.isSafeInteger(candidate.life)||candidate.life<1||typeof candidate.neutral!=='boolean')return null;
 if(previousPlayer?.life!==candidate.life||player?.life!==candidate.life||player.last_seq!==candidate.seq||previousPlayer.last_seq===candidate.seq)return null;
 return Object.freeze({version:1,seq:candidate.seq,tick:candidate.tick,life:candidate.life,neutral:candidate.neutral});
}

export class DeliveryReceipts{
 constructor({capacity=24,maxAgeMs=DELIVERY_RECEIPT_MAX_AGE_MS,rewindTicks=12,now=()=>performance.now()}={}){
  if(!Number.isSafeInteger(capacity)||capacity<1||capacity>32)throw Error('Invalid delivery receipt capacity');
  if(maxAgeMs!==DELIVERY_RECEIPT_MAX_AGE_MS)throw Error('Delivery receipts require the 400ms absolute policy');
  if(!Number.isSafeInteger(rewindTicks)||rewindTicks<0||rewindTicks>12)throw Error('Invalid delivery receipt rewind bound');
  if(typeof now!=='function')throw Error('Delivery receipts require a monotonic clock');
  this.capacity=capacity;this.maxAgeMs=maxAgeMs;this.rewindTicks=rewindTicks;this.clock=now;this.lastNow=0;this.generation=0;this.owner=null;this.room=null;this.life=null;this.entries=new Map();
 }
 _now(){const value=this.clock();if(!Number.isFinite(value)||value<0||value<this.lastNow)throw Error('Delivery receipt clock must be monotonic');this.lastNow=value;return value;}
 // One instance belongs to one WebSocket. owner is an internal control epoch
 // (for example its current control token); it is never returned or logged.
 prepare({owner=null,room=null,life=null}={}){
  if(room!==null&&(typeof room!=='string'||!room||room.length>128))throw Error('Invalid delivery receipt room');
  if(life!==null&&(!Number.isSafeInteger(life)||life<1||life>0xffffffff))throw Error('Invalid delivery receipt life');
  if(owner===this.owner&&room===this.room&&life===this.life)return this.generation;
  const reason=owner!==this.owner?'old_owner':room!==this.room?'old_room':'old_life';
  for(const entry of this.entries.values())if(entry.generation===this.generation)entry.retiredReason=reason;
  this.owner=owner;this.room=room;this.life=life;return ++this.generation;
 }
 // Explicit ownership reset also revokes delayed send callbacks and input
 // tickets, even when prepare's next context has equal room/life values.
 reset(){for(const entry of this.entries.values())if(entry.generation===this.generation)entry.retiredReason='old_owner';this.owner=null;this.room=null;this.life=null;return ++this.generation;}
 issue(nativeTick,generation=this.generation){
  if(!tick(nativeTick))throw Error('Invalid delivery receipt tick');
  if(generation!==this.generation||this.owner===null||this.room===null||this.life===null)return null;
  const issuedAt=this._now();let nonce;
  for(let attempt=0;attempt<8;attempt++){nonce=randomBytes(16).toString('hex');if(!this.entries.has(nonce))break;nonce=null;}
  if(!nonce)throw Error('Delivery receipt nonce generation failed');
  this.entries.set(nonce,{generation,tick:nativeTick,issuedAt,deadlineAt:issuedAt+this.maxAgeMs,written:false,acknowledged:false,retiredReason:null});
  while(this.entries.size>this.capacity)this.entries.delete(this.entries.keys().next().value);
  return Object.freeze({version:DELIVERY_RECEIPT_VERSION,nonce});
 }
 written(nonce,generation=this.generation){
  const entry=token(nonce)?this.entries.get(nonce):null;
  if(!entry||generation!==this.generation||entry.generation!==generation||entry.retiredReason||this._now()>=entry.deadlineAt)return false;
  entry.written=true;return true;
 }
 admit(delivery,requestedViewTick,currentTick,generation=this.generation){
  const rejected=reason=>Object.freeze({ok:false,reason});
  if(delivery===undefined||delivery===null)return rejected('missing');
  if(!object(delivery)||delivery.version!==DELIVERY_RECEIPT_VERSION)return rejected('unsupported_version');
  if(!exactDelivery(delivery)||!token(delivery.nonce))return rejected('unknown');
  const entry=this.entries.get(delivery.nonce);if(!entry)return rejected('unknown');
  if(entry.retiredReason)return rejected(entry.retiredReason);
  if(generation!==this.generation||entry.generation!==generation)return rejected('old_generation');
  const at=this._now();if(at>=entry.deadlineAt)return rejected('expired');
  if(!entry.written)return rejected('unwritten');
  if(!tick(currentTick)||requestedViewTick!==undefined&&!tick(requestedViewTick))return rejected('invalid_tick');
  // Reject an impossible caller tick rather than granting future history.
  if(entry.tick>currentTick)return rejected('future_receipt');
  entry.acknowledged=true;
  const endpoints=[...this.entries.values()].filter(v=>v.generation===generation&&v.written&&v.acknowledged&&!v.retiredReason&&v.tick<=currentTick).map(v=>v.tick);
  const oldest=Math.max(0,currentTick-this.rewindTicks),low=Math.max(oldest,Math.min(...endpoints)),high=Math.min(currentTick,Math.max(...endpoints));
  const base={ok:true,generation,receiptTick:entry.tick,issuedAt:entry.issuedAt,deadlineAt:entry.deadlineAt,oldest,low:low<=high?low:null,high:low<=high?high:null};
  if(requestedViewTick===undefined)return Object.freeze({...base,reason:'not_requested',acceptedViewTick:null});
  // A fresh transport echo can coexist with old Native ticks if simulation is
  // stalled. In that case grant no historical interval, as ViewHistory does.
  if(low>high)return Object.freeze({...base,reason:'no_current_history',acceptedViewTick:currentTick});
  const acceptedViewTick=Math.max(low,Math.min(high,requestedViewTick));
  return Object.freeze({...base,reason:requestedViewTick<low?'before_received_history':requestedViewTick>high?'after_received_history':'received_interval',acceptedViewTick});
 }
 // The caller must retain admit().deadlineAt, never derive a new deadline from
 // arrival Date.now()/seen. Check again immediately before selecting controls
 // for Native. Eviction/reset is fail-closed as well as absolute expiration.
 isFresh(deadlineAt,generation,nonce){
  if(!Number.isFinite(deadlineAt)||generation!==this.generation)return false;
  const at=this._now();if(at>=deadlineAt)return false;
  if(nonce!==undefined){const entry=token(nonce)?this.entries.get(nonce):null;return!!(entry&&entry.generation===generation&&entry.acknowledged&&entry.written&&!entry.retiredReason&&entry.deadlineAt===deadlineAt);}
  return [...this.entries.values()].some(entry=>entry.generation===generation&&entry.acknowledged&&entry.written&&!entry.retiredReason&&entry.deadlineAt===deadlineAt);
 }
 snapshot(){return Object.freeze({version:DELIVERY_RECEIPT_VERSION,generation:this.generation,entries:this.entries.size,capacity:this.capacity,maxAgeMs:this.maxAgeMs,rewindTicks:this.rewindTicks,clock:'runtime_monotonic',authority:'state_byte_receipt_only_not_render_or_human'});}
}
