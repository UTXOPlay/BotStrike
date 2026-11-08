// Real TCP outage investigation. This is a development probe, not acceptance.
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {createReadStream} from 'node:fs';
import {createInterface} from 'node:readline';
import {fileURLToPath} from 'node:url';
import {createNetworkLab,labRequest} from './network-lab.mjs';
import {openNetworkNodeActor,waitNetworkCondition} from './network-node-actors.mjs';
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms)),repo=fileURLToPath(new URL('../',import.meta.url));
async function rows(file,visit){const stream=createReadStream(file),reader=createInterface({input:stream,crlfDelay:Infinity});try{for await(const line of reader)if(line){const row=JSON.parse(line);if(row.type==='native_frame'&&row.rawLine)row.state=JSON.parse(row.rawLine).state;await visit(row);}}finally{reader.close();stream.destroy();}}
export async function runOutageProbe({applicationImage='botstrike:interface-v5-20261107-v3',toolImage='botstrike:netem-tools-20261108',devSource=repo,outageMs=3000,bandwidthKbit=32,assertNoObsolete=false}={}){
 if(!Number.isInteger(outageMs)||outageMs<500||outageMs>4000||!Number.isInteger(bandwidthKbit)||bandwidthKbit<16||bandwidthKbit>1024)throw Error('Probe bounds');
 const lab=await createNetworkLab({applicationImage,toolImage,devSource,runtimeConfig:{runtimeCommand:['node','tools/start-network-runtime.mjs']},runtimeEnv:{BOTSTRIKE_NATIVE_PROFILE:'c5a72be9466ddd4efa23aa6574541714c8112510ba7f2d7008dd0849f8a9925d'}});
 const report={schemaVersion:1,status:'running',development:true,mutableSource:!!devSource,automated:true,humanParticipants:0,root:lab.root,parameters:{outageMs,recoveryBandwidthKbit:bandwidthKbit,clientHz:30,inputLeaseMs:400},clock:'Node driver and runtime wall clocks share this local Linux host; elapsed includes all queues and scheduling, not pure one-way network time.',marks:[],kernel:[],counts:{},examples:[],limitations:['One automated Node actor and exact Native solo range, not browser rendering or human acceptance.','Probe only; no threshold is accepted and no issue is closed by this result.','Application service policy, native profile and TCP retransmission are observed, not mocked.']};
 let pilot,failed;
 const mark=label=>report.marks.push({label,wallAt:Date.now(),monotonicMs:performance.now()});
 async function stats(label){report.kernel.push({label,wallAt:Date.now(),value:await lab.stats()});}
 try{
  await waitNetworkCondition(async()=>{try{return(await labRequest(lab.actors.C.tcpUrl,{timeout:1000})).status===200;}catch{return false;}},{timeout:20000,poll:250,label:'isolated application ready'});
  pilot=await openNetworkNodeActor({id:'A',proxyUrl:lab.actors.A.proxyUrl,directory:path.join(lab.root,'node-actors'),hz:30});
  await pilot.action({type:'create',kind:'practice',mode:'deathmatch',map:0,hero:0,difficulty:0,drill:0});
  await pilot.waitRoom(room=>room?.state?.tick>20);mark('healthy');await delay(500);await stats('healthy');
  await lab.outage('A',{direction:'upstream'});mark('uplink_blackhole');pilot.mark('uplink_blackhole');pilot.setControl({x:1,fire:true});
  await delay(700);pilot.neutral();mark('released_during_blackhole');pilot.mark('released_during_blackhole');
  await delay(outageMs-700>0?outageMs-700:0);await stats('blackhole');
  await lab.shape('A',{upstream:{bandwidthKbit,seed:20261108},downstream:{seed:20261108}});mark('bandwidth_limited_recovery');pilot.mark('bandwidth_limited_recovery');
  await delay(5000);await stats('limited_recovery');await lab.shape('A',{upstream:{seed:20261108},downstream:{seed:20261108}});mark('full_speed_restored');
  await delay(2500);await stats('restored');
  if(pilot.socketState===1){
   await waitNetworkCondition(()=>pilot.setControl({x:.25}),{timeout:5000,label:'fresh neutral recovery'});mark('fresh_action_requested');
   const start=pilot.room.state.players[pilot.room.slot].position[0],sent=pilot.send();await delay(180);pilot.neutral();
   if(!sent)throw Error('Fresh post-recovery input was not sent');
   await pilot.waitRoom(room=>room?.state?.players[room.slot]?.last_seq>=sent.seq&&Math.abs(room.state.players[room.slot].position[0]-start)>1,{timeout:5000,label:'fresh movement Native ACK'});report.freshMovementNativeAcknowledged=true;
  }
  report.socketState=pilot.socketState;report.clientErrors=[...pilot.errors];report.lastObservedTick=pilot.room?.state?.tick??null;report.lastObservedNativeAck=pilot.room?.state?.players[pilot.room.slot]?.last_seq??null;
 }catch(error){failed=error;report.failure={name:error.name,message:String(error.message).slice(0,400)};}
 finally{await pilot?.close();await lab.close();}
 try{
  const capture=JSON.parse(await fs.readFile(path.join(lab.dataDir,'network-diagnostics','capture.json'),'utf8'));report.capture=capture;
  if(capture.status!=='complete')throw Error('Incomplete or invalid private capture');
  const sent=new Map();await rows(path.join(lab.root,'node-actors','A.jsonl'),row=>{if(row.kind==='input_sent'){if(sent.size>=8192)throw Error('Probe input correlation bound exceeded');sent.set(row.seq,row);}});
  let staleArrivals=0,staleApplied=0,movingApplied=0,fireApplied=0,shots=0,fireFramesAfterRestoration=0,freshAcceptedAfterRecovery=0,pastReceiptDeadlineFrames=0,neutralAckRecoveryMs=null;const restoration=report.marks.find(row=>row.label==='bandwidth_limited_recovery')?.wallAt??Infinity,accepted=new Map(),rejections={};
  await rows(path.join(lab.dataDir,'network-diagnostics','runtime.jsonl'),event=>{
   if(event.type==='input_arrival'){accepted.set(event.seq,event);const input=sent.get(event.seq);if(input&&event.at-input.wallAt>400)staleArrivals++;if(event.at>=restoration)freshAcceptedAfterRecovery++;}
   if(event.type==='input_rejected')rejections[event.reason]=(rejections[event.reason]||0)+1;
   if(event.type==='native_input'&&event.at>=restoration){const input=event.inputs?.[0],source=input&&sent.get(input[0]);if(!source)return;const moving=!!(input[1]||input[2]),fire=!!(input[5]&1);if(fire)fireFramesAfterRestoration++;if(event.at-source.wallAt>400&&(moving||fire)){staleApplied++;if(moving)movingApplied++;if(fire)fireApplied++;if(report.examples.length<12)report.examples.push({nativeTick:event.tick,seq:input[0],ageSinceClientEnqueueMs:event.at-source.wallAt,x:input[1],y:input[2],fire,clientEnqueueAt:source.wallAt,nativeApplicationAt:event.at});}}
   if(event.type==='native_input'){const input=event.inputs?.[0],admission=input&&accepted.get(input[0]);if(input&&(input[1]||input[2]||input[5]&1)&&Number.isFinite(admission?.admission?.deadlineAt)&&event.monotonicMs>=admission.admission.deadlineAt)pastReceiptDeadlineFrames++;}
   if(event.type==='native_frame'&&event.at>=restoration){shots+=event.state.events.filter(row=>row.kind==='shot'&&row.actor===0).length;const seq=event.state.players[0].last_seq,admission=accepted.get(seq),source=sent.get(seq);if(neutralAckRecoveryMs===null&&admission?.at>=restoration&&source&&!source.input.x&&!source.input.y&&!source.input.fire)neutralAckRecoveryMs=event.at-restoration;}
  });
  report.counts={correlatedClientInputs:sent.size,arrivalsOlderThan400ms:staleArrivals,obsoleteControlNativeFrames:staleApplied,obsoleteMovementNativeFrames:movingApplied,obsoleteFireNativeFrames:fireApplied,nativeShotEventsAfterRestoration:shots,nativeFireFramesAfterRestoration:fireFramesAfterRestoration,freshAcceptedAfterRecovery,pastReceiptDeadlineFrames,rejections};report.neutralNativeAckRecoveryMs=neutralAckRecoveryMs;
  report.realKernelDropsObserved=report.kernel.some(row=>row.value.server.qdisc.some(q=>q.dev==='ifbuA'&&q.kind==='netem'&&q.drops>0));
  report.finding=staleApplied||shots||fireFramesAfterRestoration?'obsolete_controls_reacquire_fresh_lease':'not_observed';report.status=failed?'failed':'investigated';
  if(assertNoObsolete){if(staleApplied||pastReceiptDeadlineFrames||shots||fireFramesAfterRestoration||!freshAcceptedAfterRecovery||neutralAckRecoveryMs===null||!report.freshMovementNativeAcknowledged||report.socketState!==1||!report.realKernelDropsObserved||!(rejections.expired||rejections.unknown))throw Error('TCP outage recovery invariant failed; inspect the complete private report');report.status='passed';}
 }catch(error){failed??=error;report.status='failed';report.analysisFailure=String(error.message).slice(0,400);}
 report.finishedAt=Date.now();const file=path.join(lab.root,'outage-probe.json');await fs.writeFile(file,JSON.stringify(report,null,2)+'\n',{mode:0o600});
 if(failed){failed.report=file;throw failed;}return{file,report};
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
 const args=process.argv.slice(2);if(args.some(value=>!['--immutable','--assert-no-obsolete'].includes(value)))throw Error('Only --immutable and --assert-no-obsolete are supported; configure images through NETWORK_APPLICATION_IMAGE/NETWORK_TOOL_IMAGE.');
 try{const result=await runOutageProbe({applicationImage:process.env.NETWORK_APPLICATION_IMAGE||undefined,toolImage:process.env.NETWORK_TOOL_IMAGE||undefined,devSource:args.includes('--immutable')?null:repo,assertNoObsolete:args.includes('--assert-no-obsolete')});console.log(JSON.stringify({status:result.report.status,finding:result.report.finding,counts:result.report.counts,report:result.file}));}
 catch(error){console.error(JSON.stringify({status:'failed',message:error.message,report:error.report??null}));process.exitCode=1;}
}
