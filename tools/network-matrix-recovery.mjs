// Host-only recovery evidence. A local fence supplements the exact wire ACK;
// neither a DOM epoch nor a historical CDP observation is authority by itself.
import {explicitBrowserInputAck} from './network-matrix-analysis.mjs';
import {neutralNetworkInput} from './network-node-actors.mjs';
import {localRecoveryProofMatches} from './local-recovery-fence.mjs';

const generationKeys=['socketGeneration','ownerGeneration','proofGeneration','roomGeneration'];
const ackKeys=['version','seq','tick','life','neutral'];
const sameAck=(a,b)=>!!a&&!!b&&ackKeys.every(key=>a[key]===b[key]);
const context=actor=>actor&&!actor.closed&&!actor.closing&&actor.control?.active===true&&generationKeys.every(key=>Number.isSafeInteger(actor[key])&&actor[key]>0)?generationKeys.map(key=>actor[key]):null;
const sameContext=(actor,before)=>{const after=context(actor);return !!after&&after.every((value,index)=>value===before[index]);};

export async function readMatrixRecoveryProof(actor,{afterPageSentAt,minimumLocalEpoch=0}={}){
 if(actor?.localFenceEnabled!==true||typeof actor.currentLocalNeutral!=='function'||typeof actor.room!=='function'||typeof actor.events!=='function'||!Number.isFinite(afterPageSentAt)||afterPageSentAt<0||!Number.isSafeInteger(minimumLocalEpoch)||minimumLocalEpoch<0)return null;
 const before=context(actor);if(!before)return null;
 try{
  const local=await actor.currentLocalNeutral({afterPageSentAt});
  if(!sameContext(actor,before)||!local)return null;
  const room=await actor.room(),self=room?.state?.players?.[room?.slot],current=local.current,input=local.input,localSnapshot=local.snapshot,ack=local.ack;
  if(!sameContext(actor,before)||room?.status!=='running'||!Number.isSafeInteger(self?.life)||self.life<1||current?.room!==room.id||current?.life!==self.life||current?.connected!==true||current?.controller!==true||current?.protocolVersion!==2||current?.maxAgeMs!==400||current?.localPaused!==true||current.localRecoveryEpoch<minimumLocalEpoch)return null;
  if(!ack||Object.keys(ack).sort().join(',')!=='life,neutral,seq,tick,version'||ack.version!==1||ack.neutral!==true||!['seq','tick','life'].every(key=>Number.isSafeInteger(ack[key])&&ack[key]>0))return null;
  if(!input||input.wireVerified!==true||input.wireJoin!=='exact_bytes_unique'||input.cdpSocketGeneration!==actor.socketGeneration||input.originalNeutral!==true||!Number.isFinite(input.pageSentAt)||input.pageSentAt<=afterPageSentAt||input.protocolVersion!==2||input.deliveryAttached!==true||input.seq!==ack.seq||input.life!==ack.life||!localSnapshot||!sameAck(localSnapshot.inputAck,ack)||localSnapshot.lastSeq!==ack.seq||localSnapshot.life!==ack.life||localSnapshot.currentSocket!==true||localSnapshot.currentContext!==true||localSnapshot.controller!==true||!localRecoveryProofMatches(localSnapshot,input,current,{requireNeutral:true}))return null;
  const sends=actor.events('input',{afterIndex:0,limit:512}).filter(sent=>sent.input?.seq===ack.seq&&generationKeys.every(key=>sent[key]===actor[key])&&sent.life===self.life);
  if(sends.length!==1)return null;
  const sent=sends[0];if(!neutralNetworkInput(sent.input))return null;
  const snapshots=actor.events('snapshot',{afterIndex:sent.index,limit:512});
  for(const snapshot of snapshots.reverse()){
   if(snapshot.currentSocket!==true||snapshot.currentContext!==true||snapshot.slot!==room.slot||snapshot.tick!==localSnapshot.tick||snapshot.slot!==localSnapshot.slot||!generationKeys.every(key=>snapshot[key]===actor[key]))continue;
   const wireAck=explicitBrowserInputAck(snapshot,sent);
   if(sameAck(wireAck,ack)&&sameContext(actor,before))return structuredClone({ack:wireAck,sent,snapshot,local});
  }
 }catch{return null;}
 return null;
}
