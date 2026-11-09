// Service-envelope proof only. Native Input fields and replay rules are unchanged.
const sequence=value=>Number.isSafeInteger(value)&&value>=0;
const receipt=value=>value&&typeof value==='object'&&!Array.isArray(value)&&value.version===2&&typeof value.nonce==='string'&&/^[a-f0-9]{32}$/.test(value.nonce)&&Object.keys(value).length===2;
const actions=['fire','reload','walk','crouch','jump','ability','interact','scope','drop'];
// Preview item and throw mode are persistent configuration, not gameplay actions.
const neutral=input=>!(input.x||input.y||input.item||input.practice)&&input.buy==null&&input.weapon==null&&!actions.some(key=>input[key]);
export const INPUT_DELIVERY_PENDING_LIMIT=256;
export class InputDelivery{
 constructor(){this.transportReset();}
 clearProof(){this.ack=null;this.ackSentAt=null;this.pending=new Map();}
 transportReset(){this.mode='legacy';this.delivery=null;this.room=null;this.life=null;this.tick=null;this.recovering=false;this.clearProof();}
 advertise(protocol){
  this.mode=protocol===undefined?'legacy':protocol?.version===2&&protocol?.maxAgeMs===400?'receipt':'unsupported';
  if(this.mode!=='receipt'){this.delivery=null;this.clearProof();if(this.mode==='legacy')this.recovering=false;}
  return this.mode;
 }
 resetOwner(){this.delivery=null;this.recovering=true;this.clearProof();}
 context(room,life){
  if(room!==this.room||life!==this.life){if(room!==this.room&&this.mode==='receipt')this.recovering=true;this.delivery=null;this.tick=null;this.clearProof();this.room=room;this.life=life;}
 }
 receive(delivery,{room,life,lastSeq,tick,inputAck}={}){
  this.context(room??null,life??null);this.ack=null;this.ackSentAt=null;
  if(sequence(tick))this.tick=tick;
  if(this.mode!=='receipt')return false;
  this.delivery=receipt(delivery)?Object.freeze({version:2,nonce:delivery.nonce}):null;
  const sent=this.pending.get(inputAck?.seq);
  if(!this.delivery||!inputAck||Object.keys(inputAck).length!==5||inputAck.version!==1||!sequence(inputAck.seq)||!sequence(inputAck.tick)||!sequence(inputAck.life)||typeof inputAck.neutral!=='boolean'||!sent||!sequence(tick)||inputAck.seq!==lastSeq||inputAck.life!==this.life||sent.room!==this.room||sent.life!==this.life||inputAck.tick<=sent.tick||inputAck.tick>tick||inputAck.neutral&&!sent.neutral)return false;
  this.ack=Object.freeze({...inputAck});this.ackSentAt=sent.sentAt;
  if(this.recovering&&inputAck.neutral){this.recovering=false;return true;}
  return false;
 }
 recover(){this.delivery=null;this.recovering=true;this.clearProof();}
 canSend(){return this.mode==='legacy'||this.mode==='receipt'&&this.delivery!==null;}
 envelope(){return this.mode==='receipt'&&this.delivery?{delivery:this.delivery}:{};}
 control(input,{forceNeutral=false}={}){return this.recovering||forceNeutral?{...input,...Object.fromEntries(actions.map(key=>[key,false])),x:0,y:0,item:0,practice:0,weapon:null,...(Object.hasOwn(input,'buy')?{buy:null}:{})}:input;}
 sent(input,sentAt=null){
  if(this.mode!=='receipt'||!this.canSend()||!this.room||!sequence(this.life)||!sequence(this.tick)||!sequence(input.seq)||this.pending.has(input.seq))return;
  this.pending.set(input.seq,{room:this.room,life:this.life,tick:this.tick,sentAt:Number.isFinite(sentAt)&&sentAt>=0?sentAt:null,neutral:neutral(input)});
  while(this.pending.size>INPUT_DELIVERY_PENDING_LIMIT)this.pending.delete(this.pending.keys().next().value);
 }
}
