// Service-envelope handshake and recovery. Never changes Native Input fields.
const receipt=value=>value&&value.version===1&&typeof value.nonce==='string'&&/^[a-f0-9]{32}$/.test(value.nonce)&&Object.keys(value).length===2;
const actions=['fire','reload','walk','crouch','jump','ability','interact','scope','drop'];
export class InputDelivery{
 constructor(){this.transportReset();}
 transportReset(){this.mode='legacy';this.delivery=null;this.room=null;this.life=null;this.recovering=false;this.neutralSeq=null;}
 advertise(protocol){this.mode=protocol===undefined?'legacy':protocol?.version===1&&protocol?.maxAgeMs===400?'receipt':'unsupported';if(this.mode!=='receipt')this.delivery=null;return this.mode;}
 resetOwner(){this.delivery=null;this.recovering=false;this.neutralSeq=null;}
 context(room,life){
  if(room!==this.room||life!==this.life){if(room!==this.room)this.recovering=false;this.delivery=null;this.neutralSeq=null;this.room=room;this.life=life;}
 }
 receive(delivery,{room,life,lastSeq}={}){
  this.context(room??null,life??null);if(this.mode==='receipt')this.delivery=receipt(delivery)?Object.freeze({version:1,nonce:delivery.nonce}):null;
  if(this.recovering&&this.delivery&&this.neutralSeq!==null&&Number.isSafeInteger(lastSeq)&&lastSeq>=this.neutralSeq){this.recovering=false;this.neutralSeq=null;return true;}return false;
 }
 recover(){this.delivery=null;this.recovering=true;this.neutralSeq=null;}
 canSend(){return this.mode==='legacy'||this.mode==='receipt'&&this.delivery!==null;}
 envelope(){return this.mode==='receipt'&&this.delivery?{delivery:this.delivery}:{};}
 control(input){return this.recovering?{...input,...Object.fromEntries(actions.map(key=>[key,false])),x:0,y:0,item:0,practice:0,weapon:null}:input;}
 sent(input){if(this.recovering&&this.neutralSeq===null)this.neutralSeq=input.seq;}
}
