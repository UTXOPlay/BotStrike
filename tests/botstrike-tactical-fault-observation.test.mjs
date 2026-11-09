// Pure observation contract tests: no server listen, Native process, browser,
// Docker command or fabricated acceptance data is used here.
import test from 'node:test';
import assert from 'node:assert/strict';
import {controllerClaimMessage,isNeutralPacked,isNeutralControl,matchesNeutralAck,assertNoReleasedAction} from './botstrike-tactical-active-flow.mjs';
import {inExpectedFaultWindow,isExpectedFaultEvent,mapKernelBoundary} from './botstrike-tactical-fault-completion.mjs';

function valid(){return {
 ack:{version:1,seq:21,tick:100,life:4,neutral:true},
 source:{seq:21,life:4,neutral:true,context:'socket2:owner3:room:life4',minTick:99,sentAt:1100},
 proof:{seq:21,tick:100,life:4,neutral:true,context:'socket2:owner3:room:life4',admissionIssuedAt:1050,admissionDeadlineAt:1450,nativeAt:1120},
 context:'socket2:owner3:room:life4',life:4,floorMs:1000,
};}
const packed=(seq=21)=>[seq,0,0,1,-.2,256+(4<<10),null,null,2,0,99];

test('neutral ACK requires this exact sequence and actual packed Native tick, not a seq high-water mark',()=>{
 assert.equal(matchesNeutralAck(valid()),true);
 for(const changes of [{seq:22},{seq:20},{seq:0},{tick:101},{life:3},{neutral:false},{version:2},{extra:1}]){
  const value=valid();Object.assign(value.ack,changes);assert.equal(matchesNeutralAck(value),false,JSON.stringify(changes));
 }
 const premature=valid();premature.source.minTick=100;assert.equal(matchesNeutralAck(premature),false,'An ACK must be after the sent input snapshot, not cached from that snapshot');
 const coalesced=valid();coalesced.source.seq=20;assert.equal(matchesNeutralAck(coalesced),false,'A skipped/coalesced sent seq cannot borrow later ACK evidence');
});

test('recovery ACK cannot cross socket ownership, room, life, release or restoration context',()=>{
 for(const field of ['source','proof']){const value=valid();value[field].context='socket1:owner2:other-room:life4';assert.equal(matchesNeutralAck(value),false);}
 for(const field of ['source','proof']){const value=valid();value[field].life=3;assert.equal(matchesNeutralAck(value),false);}
 const preRestoreReceipt=valid();preRestoreReceipt.proof.admissionIssuedAt=999;preRestoreReceipt.proof.admissionDeadlineAt=1399;assert.equal(matchesNeutralAck(preRestoreReceipt),false);
 const preRestoreSend=valid();preRestoreSend.source.sentAt=999;assert.equal(matchesNeutralAck(preRestoreSend),false);
 const rewritten=valid();rewritten.proof.neutral=false;assert.equal(matchesNeutralAck(rewritten),false);
});

test('400ms receipt deadline uses exact issued + 400 and strictly excludes expiry',()=>{
 const exact=valid();exact.proof.admissionIssuedAt=0.3;exact.proof.admissionDeadlineAt=.3+400;exact.proof.nativeAt=400;exact.floorMs=0;assert.equal(matchesNeutralAck(exact),true);
 exact.proof.nativeAt=exact.proof.admissionDeadlineAt;assert.equal(matchesNeutralAck(exact),false);
 const early=valid();early.proof.nativeAt=1049;assert.equal(matchesNeutralAck(early),false);
 const extension=valid();extension.proof.admissionDeadlineAt+=.000001;assert.equal(matchesNeutralAck(extension),false);
});

test('aim/preview/throw metadata and repeat selected hero are neutral, actual commands are not',()=>{
 const pose=packed();pose.push(0,20);assert.equal(isNeutralPacked(pose),true);
 assert.equal(isNeutralControl({seq:1,x:0,y:0,yaw:1,pitch:-.3,preview_item:6,throw_mode:2,hero:2}),true);
 for(const [index,value]of [[1,.01],[2,-1],[5,256+(4<<10)+1],[5,256+(4<<10)+512],[6,0],[7,0],[9,1],[11,1]]){const input=packed();input[index]=value;assert.equal(isNeutralPacked(input),false);}
 for(const command of [{fire:true},{weapon:0},{buy:0},{practice:1},{item:1},{x:.01}])assert.equal(isNeutralControl(command),false);
});

test('released held and pulse sequences cannot act after restore, including exact restore boundary',()=>{
 const event={monotonicMs:1000,inputs:[packed()],pulseTickets:[],purchaseTickets:[]},releaseHighSeq=new Map([[0,21]]);
 assert.doesNotThrow(()=>assertNoReleasedAction({event,releaseHighSeq,restoredMs:1000}));
 event.inputs[0][1]=1;assert.throws(()=>assertNoReleasedAction({event,releaseHighSeq,restoredMs:1000}),/released pre-fault held/);
 assert.doesNotThrow(()=>assertNoReleasedAction({event,releaseHighSeq,restoredMs:1001}),'The release proof is an after-restore invariant, with independent expiry checks during the fault');
 event.inputs[0]=packed(22);event.inputs[0][1]=1;assert.doesNotThrow(()=>assertNoReleasedAction({event,releaseHighSeq,restoredMs:1000}));
 event.pulseTickets=[{slot:0,sourceSeq:21}];assert.throws(()=>assertNoReleasedAction({event,releaseHighSeq,restoredMs:1000}),/released pre-fault pulse/);
 event.pulseTickets=[{slot:0,sourceSeq:22}];assert.doesNotThrow(()=>assertNoReleasedAction({event,releaseHighSeq,restoredMs:1000}));
});

test('expected recovery errors have one bounded fault window and end at explicit new intent',()=>{
 const params={cut:{applyStartNs:'1000000000'},restored:{restoredNs:'2000000000'}};
 assert.equal(inExpectedFaultWindow({...params,nowNs:'999999999'}),false);
 assert.equal(inExpectedFaultWindow({...params,nowNs:'1000000000'}),true);
 assert.equal(inExpectedFaultWindow({...params,nowNs:'22000000000'}),true);
 assert.equal(inExpectedFaultWindow({...params,nowNs:'22000000001'}),false);
 assert.equal(inExpectedFaultWindow({...params,nowNs:'2100000000',recoveryComplete:true}),false);
 assert.equal(inExpectedFaultWindow({nowNs:'1000000000',cut:null}),false);
 assert.equal(inExpectedFaultWindow({nowNs:'26000000001',cut:params.cut}),false,'A missing restoration cannot keep recovery exceptions open indefinitely');
});


test('a real fault never excuses protocol mistakes, missing metadata or the unchanged rate limit',()=>{
 assert.equal(isExpectedFaultEvent('input_rejected',{reason:'expired'}),true);
 assert.equal(isExpectedFaultEvent('input_rejected',{reason:'unknown'}),true);
 for(const reason of ['missing','unsupported_version','invalid','owner'])assert.equal(isExpectedFaultEvent('input_rejected',{reason}),false);
 assert.equal(isExpectedFaultEvent('socket_close',{code:1006}),true);
 for(const code of [1000,1001,1002,1003,1007,1008,1009,1011,1013,undefined])assert.equal(isExpectedFaultEvent('socket_close',{code}),false,'WS protocol, application or policy close must not be excused by TCP loss: '+code);
 for(const code of ['ECONNRESET','EPIPE','ETIMEDOUT'])assert.equal(isExpectedFaultEvent('socket_error',{code}),true);
 for(const code of ['WS_ERR_INVALID_UTF8','WS_ERR_UNEXPECTED_RSV_1','ECONNREFUSED','ENOTFOUND',undefined])assert.equal(isExpectedFaultEvent('socket_error',{code}),false);
 assert.equal(isExpectedFaultEvent('input_resync',{code:'stale_delivery'}),true);
 assert.equal(isExpectedFaultEvent('input_resync',{code:'other'}),false);
 assert.equal(isExpectedFaultEvent('error',{}),false);
});


test('kernel restore audit starts at the conservative actual command boundary, before later poll observation',()=>{
 const anchor={beforeNs:'1000000000',afterNs:'1000002000',performanceMs:100,paddingMs:.001};
 const boundary=mapKernelBoundary(anchor,'2000000000');assert.ok(boundary.lowerMs<1100);assert.ok(boundary.upperMs>1100);assert.ok(boundary.uncertaintyMs>=.0039);
 const old=packed(21);old[1]=1;const pending={monotonicMs:1101,inputs:[old]};
 assert.throws(()=>assertNoReleasedAction({event:pending,releaseHighSeq:new Map([[0,21]]),restoredMs:boundary.lowerMs}),/released/,'Input after kernel restore but before a hypothetical 1150ms poll must be audited');
});


test('reconnect claim retains the actual room and an obsolete socket cannot reclaim ownership',()=>{
 const current={},old={},actor={ws:current,room:{id:'current-room'}};
 assert.deepEqual(controllerClaimMessage(actor,current,'fallback-room'),{type:'claim',room:'current-room'});
 assert.equal(controllerClaimMessage(actor,old,'fallback-room'),null);
 actor.room=null;assert.deepEqual(controllerClaimMessage(actor,current,'fallback-room'),{type:'claim',room:'fallback-room'});
 assert.equal(controllerClaimMessage(actor,current,null),null);
});
