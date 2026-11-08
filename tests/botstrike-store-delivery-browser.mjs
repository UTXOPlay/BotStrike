// One disposable real Store → host → Native regression. No synthetic delivery
// event, receipt, game-private input or Native state is injected.
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {startNetworkStorePreview} from '../tools/start-network-store-preview.mjs';
import {browserRuntimePaths} from '../tools/network-browser-actors.mjs';
import {leaveBrowserRoom} from './botstrike-browser-room.mjs';
import {privateArtifacts,writePrivate,pause,until,neutral,observeStoreProtocol,assertReceiptProtocol,graphicsObservation,integerResume,installRecoveryUiObserver,kernelCDrops,analyzeStoreRecovery} from './botstrike-store-observations.mjs';

const repo=fileURLToPath(new URL('../',import.meta.url)),own=room=>room?.state?.players[room.slot];
export async function runStoreDeliveryBrowser({storeSource=process.env.BOTSTRIKE_STORE_SOURCE,applicationImage=process.env.NETWORK_APPLICATION_IMAGE,prototype=false}={}){
 assert.ok(storeSource&&path.isAbsolute(storeSource),'Explicit local BOTSTRIKE_STORE_SOURCE is required');
 assert.ok(prototype||applicationImage,'Final-candidate tests require explicit NETWORK_APPLICATION_IMAGE; development bind requires --prototype');
 const preview=await startNetworkStorePreview({storeSource,applicationImage,devSource:prototype?repo:null}),runtime=browserRuntimePaths();let out;try{out=privateArtifacts(process.env.CONTROL_ARTIFACTS||path.join(preview.root,'store-delivery'));}catch(error){await preview.close();throw error;}
 const report={schemaVersion:1,status:'running',private:true,automated:true,humanParticipants:0,networkAcceptance:false,prototype,developmentBind:prototype,imageBindings:preview.lab.imageBindings,startedAt:Date.now(),checks:[],runtime,limitations:['One software-driven Store encounter with real kernel TCP loss; not human, physical-device, internet or full impairment-matrix acceptance.','Casual Native seats remain bots-capable. AI cover is separated using the exact per-frame takeover flag, not aggregate shot counts.','BotStrike is a Native-backed same-origin frame. An unchanged sandbox attribute is not opaque browser-game sandbox acceptance.','Driver wall clocks correlate local processes; they are not one-way network measurements.']};
 const checkpoint=label=>{report.checks.push(label);console.log(JSON.stringify({phase:label,at:Date.now()}));};
 let browser,page,game,ui,observation,roomId,slot,failure,outageApplied=false,restored=false,restoreAt,neutralSeq,newMovementSeq;const heldSequences=[];
 try{
  const {chromium}=await import(runtime.playwrightEntry);browser=await chromium.launch({headless:true,executablePath:runtime.executablePath,args:['--no-sandbox','--enable-unsafe-swiftshader','--enable-gpu','--mute-audio']});
  const context=await browser.newContext({viewport:{width:1280,height:720},deviceScaleFactor:.5,reducedMotion:'reduce'});
  await context.addInitScript(()=>localStorage.setItem('botstrike:settings',JSON.stringify({aimAssist:0,sensitivity:1,invertY:false,sound:false,motion:false,renderFps:30})));
  page=await context.newPage();page.setDefaultTimeout(45000);observation=observeStoreProtocol(page,preview.origin);
  await page.goto(preview.origin+'/');await page.locator('.wallet-button[aria-busy="false"]').waitFor();await page.locator('.game-card.botstrike .card-launch').click();await page.waitForURL('**/games/botstrike/');
  game=page.frameLocator('iframe[title="BotStrike"]');await page.locator('.game-stage.is-ready').waitFor();await assertReceiptProtocol(game,observation);
  report.graphics=await graphicsObservation(game,browser,{hardware:true});checkpoint('actual_store_loader_and_hardware_renderer');
  const roomState=async()=>{const response=await context.request.get(preview.origin+'/games/botstrike/api/state',{timeout:15000});assert.equal(response.status(),200);return(await response.json()).room;};
  const native=async(predicate,{timeout=15000,label='Store Native state'}={})=>until(async()=>{const room=await roomState();return room?.state&&await predicate(own(room),room)?room:null;},{timeout,label});
  await game.locator('#private-ruleset').selectOption('casual');await game.locator('#mode').selectOption('demolition');await game.locator('#difficulty').selectOption('0');await game.locator('.hero-card').nth(0).click();await game.locator('.map-card').nth(0).click();await game.locator('#private').click();await game.locator('#start').waitFor();
  const waiting=await until(async()=>{const value=await roomState();return value?.status==='waiting'?value:null;});roomId=waiting.id;slot=waiting.slot;assert.equal(waiting.kind,'private');assert.equal(waiting.config.mode,'demolition');assert.notEqual(waiting.config.ruleset,'tactical','Casual is the existing omitted ruleset value');
  await game.locator('#start').click();await game.locator('html[data-playing=true]').waitFor();const buy=await native((_player,room)=>room.state.phase==='buy');await assertReceiptProtocol(game,observation);
  const spec=JSON.parse(await fs.readFile(new URL('../botstrike/spec.json',import.meta.url),'utf8')),armorItem=spec.weapons.length,beforeArmor=own(buy).armor,beforeCredits=own(buy).credits;
  assert.ok(beforeArmor<100&&beforeCredits>=spec.items[0].cost,'The selected actual Casual buy fixture must be able to purchase plating');
  await page.keyboard.press('KeyB');await game.locator('#buy-menu').waitFor({state:'visible'});await until(()=>game.locator('#arena').evaluate(canvas=>document.pointerLockElement!==canvas),{label:'Actual armory releases pointer lock for its UI'});await game.locator('#armory-tabs button').nth(1).click();const card=game.locator(`#buy-items>button[data-item="${armorItem}"]`);await card.waitFor();assert.equal(await card.isEnabled(),true);
  const buyFrom=observation.buys.length;const [buyResponse]=await Promise.all([page.waitForResponse(response=>{if(response.url()!==preview.origin+'/games/botstrike/api/action'||response.request().method()!=='POST')return false;try{return response.request().postDataJSON()?.type==='buy';}catch{return false;}}),card.click()]);assert.equal(buyResponse.status(),200);
  const purchased=await native(player=>player.armor===100&&player.credits===beforeCredits-spec.items[0].cost),request=observation.buys[buyFrom];assert.ok(request&&request.item===armorItem&&request.deliveryAttached&&request.controlTokenAttached,'The actual Store HTTP purchase carries the outer receipt and owner token without logging either');
  report.purchase={item:armorItem,beforeArmor,afterArmor:own(purchased).armor,beforeCredits,afterCredits:own(purchased).credits,httpStatus:buyResponse.status(),deliveryAttached:request.deliveryAttached,ownerTokenAttached:request.controlTokenAttached,nativeTick:purchased.state.tick};checkpoint('store_http_buy_receipt_and_native_armor_credits');
  await game.locator('#buy-close').click();await native((player,room)=>player.alive&&room.state.phase==='live',{timeout:45000,label:'Casual live phase'});
  if(await game.locator('html').getAttribute('data-playing')==='true')await page.keyboard.press('Escape');const anchor=await integerResume(page,game);report.pointerAnchor=anchor;
  const frame=await page.locator('iframe[title="BotStrike"]').elementHandle(),sandbox=await frame.getAttribute('sandbox'),baseline=await native(player=>player.alive),life=own(baseline).life;
  ui=await installRecoveryUiObserver(game);report.kernelBefore=await preview.lab.stats();const beforeCutSequence=observation.inputs.at(-1)?.seq??-1;
  await preview.lab.outage('C');outageApplied=true;const cutAt=Date.now(),cutMono=performance.now();report.outage={actor:'C',path:'actual Store gateway → standalone host',directions:'both',intendedDurationMs:1000,cutAt};let kernelDuringAt=null;const duringStats=preview.lab.stats().then(value=>{report.kernelDuring=value;kernelDuringAt=Date.now();return value;});duringStats.catch(()=>{});
  await page.keyboard.down('KeyW');await page.mouse.down({button:'left'});
  await until(()=>observation.inputs.some(input=>input.seq>beforeCutSequence&&input.y>0&&input.fire),{timeout:2000,label:'Actual held input queued during C kernel outage'});
  await pause(Math.max(0,650-(performance.now()-cutMono)));await page.mouse.up({button:'left'});await page.keyboard.up('KeyW');const releasedAt=Date.now();
  heldSequences.push(...observation.inputs.filter(input=>input.nodeUnixMs>=cutAt&&input.nodeUnixMs<=releasedAt&&(input.x||input.y||input.fire)).map(input=>input.seq));assert.ok(heldSequences.length>0);
  await pause(Math.max(0,1000-(performance.now()-cutMono)));restoreAt=Date.now();report.outage.restoreRequestedAt=restoreAt;await preview.lab.restore('C');restored=true;report.outage.restoreCompletedAt=Date.now();report.outage.actualBlackholeMs=report.outage.restoreCompletedAt-cutAt;report.outage.heldPackets=heldSequences.length;report.outage.heldSequences=[...heldSequences];await duringStats;assert.ok(kernelDuringAt!==null&&kernelDuringAt<=restoreAt,'Kernel outage statistics must finish inside the intended loss window');assert.ok(report.outage.actualBlackholeMs<=1250,'A one-second outage fixture must not be lengthened by statistics collection');report.outage.realKernelDrops=kernelCDrops(report.kernelDuring);assert.ok(report.outage.realKernelDrops>0,'Actual C-link netem counters must report dropped TCP packets');checkpoint('actual_one_second_C_kernel_outage_and_restore');
  await until(()=>{if(observation.socketCloses.length&&!observation.resyncs.length)throw Error('Store transport closed before receipt recovery UI; preserve this separate reconnect outcome');return observation.resyncs.length>0;},{timeout:20000,label:'Real stale receipt recovery notification through Store'});
  const syncing=await until(async()=>{const rows=await ui.evaluate(handle=>handle.read());return rows.find(row=>!row.playing&&row.disabled&&/SYNCING CONTROLS/.test(row.resume));},{timeout:10000,label:'Observed disabled SYNCING recovery UI'});
  const firstResync=observation.resyncs[0];let neutralInput;
  const neutralAck=await native((player,room)=>{const candidate=observation.inputs.find(input=>input.seq===player.last_seq&&input.eventIndex>firstResync.eventIndex&&input.nodeUnixMs>=restoreAt&&input.deliveryAttached&&neutral(input));if(room.id===roomId&&player.life===life&&candidate){neutralInput=candidate;return true;}return false;},{timeout:20000,label:'Same-room same-life fresh neutral Native ACK'});neutralSeq=neutralInput.seq;
  await until(async()=>!(await game.locator('#resume').isDisabled()),{timeout:10000,label:'Resume enabled only after recovery neutral ACK'});assert.equal(await game.locator('html').getAttribute('data-playing'),'false','Recovery never resumes the player automatically');await pause(300);assert.equal(await game.locator('html').getAttribute('data-playing'),'false');
  assert.ok(observation.inputs.filter(input=>input.eventIndex>firstResync.eventIndex).every(neutral),'Held controls stay cleared before the explicit Resume gesture');
  assert.equal(await page.evaluate(element=>element===document.querySelector('iframe[title="BotStrike"]'),frame),true,'Outage recovery preserves the same iframe');assert.equal(await frame.getAttribute('sandbox'),sandbox);assert.equal((await roomState()).id,roomId);
  report.recovery={syncingObserved:!!syncing,neutralSeq,neutralAckTick:neutralAck.state.tick,neutralAcknowledgedSequence:own(neutralAck).last_seq,automaticallyResumed:false,iframePreserved:true,roomPreserved:true,sandboxAttributePreserved:true,ui:await ui.evaluate(handle=>handle.read()),uiObservationDrops:await ui.evaluate(handle=>handle.dropped())};checkpoint('real_outage_syncing_fresh_neutral_ack_manual_same_iframe_room');
  const resumeFrom=observation.inputs.at(-1)?.seq??-1;await integerResume(page,game);await page.keyboard.down('KeyD');let movement;
  const moved=await native((player,room)=>{const candidate=observation.inputs.find(input=>input.seq===player.last_seq&&input.seq>resumeFrom&&input.x>0&&input.deliveryAttached);if(room.id===roomId&&player.life===life&&candidate&&Math.hypot(player.velocity[0],player.velocity[2])>20){movement=candidate;return true;}return false;},{label:'New intentional movement after explicit Store Resume and exact Native sequence ACK'});newMovementSeq=movement.seq;await page.keyboard.up('KeyD');
  assert.equal(report.recovery.uiObservationDrops,0);report.recovery.newMovementSeq=newMovementSeq;report.recovery.newMovementAckTick=moved.state.tick;report.kernelAfter=await preview.lab.stats();await assertReceiptProtocol(game,observation);
  assert.equal(observation.dropped,0);assert.deepEqual(observation.errors,[]);report.protocol={controls:observation.controls,inputCount:observation.inputs.length,allInputsHaveDelivery:observation.inputs.every(input=>input.deliveryAttached),recoveryNotifications:observation.resyncs.length,socketCloses:observation.socketCloses.length,observationDrops:observation.dropped};
  await leaveBrowserRoom(page,page.frames().find(frame=>frame.parentFrame()&&frame.url().includes('/games/botstrike/')));checkpoint('fresh_intentional_movement_native_ack_and_owned_room_leave');
 }catch(error){failure=error;report.error={name:error.name,message:error.message};}
 finally{
  if(outageApplied&&!restored)await preview.lab.restore('C').catch(error=>{report.restoreCleanupError=error.message;failure??=error;});
  try{await page?.keyboard.up('KeyW');await page?.keyboard.up('KeyD');await page?.mouse.up({button:'left'});if(page&&!page.isClosed()){const frame=page.frames().find(frame=>frame.parentFrame()&&frame.url().includes('/games/botstrike/'));if(frame)await leaveBrowserRoom(page,frame);}}catch(error){report.cleanupError=error.message;failure??=error;}
  try{if(ui)report.finalRecoveryUi={rows:await ui.evaluate(handle=>handle.read()),dropped:await ui.evaluate(handle=>handle.dropped())};await ui?.evaluate(handle=>handle.close());}catch(error){report.cleanupError??=error.message;failure??=error;}finally{try{await browser?.close();}catch(error){report.cleanupError??=error.message;failure??=error;}}
  try{if(observation)writePrivate(path.join(out,'browser-observations.json'),{inputs:observation.inputs,controls:observation.controls,resyncs:observation.resyncs,snapshots:observation.snapshots,buys:observation.buys,socketCloses:observation.socketCloses,errors:observation.errors,dropped:observation.dropped});}catch(error){report.observationWriteError=error.message;failure??=error;}
  try{await preview.close();}catch(error){report.cleanupError??=error.message;failure??=error;}
 }
 try{
  const capture=JSON.parse(await fs.readFile(path.join(preview.lab.dataDir,'network-diagnostics/capture.json'),'utf8'));report.capture=capture;assert.equal(capture.status,'complete');assert.equal(capture.dropped,0);assert.equal(capture.errorCode,null);assert.equal(capture.latestErrorCode,null);assert.equal(capture.schemaVersion,2);
  if(!failure){report.nativeRecovery=await analyzeStoreRecovery(path.join(preview.lab.dataDir,'network-diagnostics/runtime.jsonl'),{slot,restoreAt,heldSequences,neutralSeq,newMovementSeq});checkpoint('raw_native_capture_no_expired_or_obsolete_human_control_ai_cover_separated');}
 }catch(error){report.captureError=error.message;failure??=error;}
 report.finishedAt=Date.now();report.status=failure?'failed':'passed';report.labRoot=preview.root;const file=path.join(out,'store-delivery-receipt.json');writePrivate(file,report);
 if(failure)throw Object.assign(failure,{report:file});return {file,report};
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
 const args=process.argv.slice(2);assert.ok(args.every(arg=>arg==='--prototype'),'Only explicit --prototype is supported');
 try{const result=await runStoreDeliveryBrowser({prototype:args.includes('--prototype')});console.log(JSON.stringify({status:result.report.status,file:result.file,humanParticipants:0,networkAcceptance:false}));}catch(error){console.error(JSON.stringify({status:'failed',name:error.name,message:error.message,file:error.report??null}));process.exitCode=1;}
}
