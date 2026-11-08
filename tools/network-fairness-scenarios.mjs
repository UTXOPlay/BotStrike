// Automated normal-control scenarios. No pose, HP, clock, RNG or Native state
// is assigned. Hit/cover verdicts belong to exact replay and its matched oracle.
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createReadStream} from 'node:fs';
import {createInterface} from 'node:readline';
import {createNetworkLab} from './network-lab.mjs';
import {createBrowserActors} from './network-browser-actors.mjs';
import {openNetworkNodeActor,waitNetworkCondition} from './network-node-actors.mjs';
const repo=fileURLToPath(new URL('../',import.meta.url)),pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const wrap=value=>Math.atan2(Math.sin(value),Math.cos(value));
const moveKeys=['KeyW','KeyA','KeyS','KeyD','ShiftLeft'];
const browserPair=value=>value?.actors||value;
const nodeList=value=>Array.isArray(value)?value:Object.values(value||{});
const own=room=>room?.state?.players[room.slot];
const speed=player=>Math.hypot(player.velocity?.[0]||0,player.velocity?.[2]||0);
export function movementKeys(yaw,dx,dz,{walk=false}={}){
 const x=Math.cos(yaw)*dx-Math.sin(yaw)*dz,y=-Math.sin(yaw)*dx-Math.cos(yaw)*dz,maximum=Math.max(Math.abs(x),Math.abs(y));
 const keys=[];if(maximum<1e-8)return keys;if(Math.abs(x)>maximum*.35)keys.push(x>0?'KeyD':'KeyA');if(Math.abs(y)>maximum*.35)keys.push(y>0?'KeyW':'KeyS');if(walk)keys.push('ShiftLeft');return keys;
}
export function visibleAim(frame,targetSlot,{height=44}={}){
 const target=frame?.players?.find(player=>player.slot===targetSlot&&player.alive&&!player.hidden&&player.optical!==false);if(!target?.position||!frame.camera?.position)throw Error('Aim target has no currently authorized visible presentation pose.');
 const point=[target.position[0],target.position[1]+height-18*(target.stance||0),target.position[2]],eye=frame.camera.position,dx=point[0]-eye[0],dy=point[1]-eye[1],dz=point[2]-eye[2];
 return {yaw:Math.atan2(-dx,-dz),pitch:Math.atan2(dy,Math.hypot(dx,dz)),point,eye:[...eye],targetSlot,renderTick:frame.renderTick,viewTick:frame.viewTick};
}
export async function verifyControlledTape(tape,{fromTick,toTick}={}){
 if(!Number.isSafeInteger(fromTick)||!Number.isSafeInteger(toTick)||fromTick<1||toTick<fromTick)throw Error('A bounded Native tick interval is required.');
 const stream=createReadStream(tape),reader=createInterface({input:stream,crlfDelay:Infinity});let config,tick=0,checked=0;const missing=[];
 try{for await(const line of reader){if(!line)continue;const row=JSON.parse(line);if(!config){assert.ok(Array.isArray(row.config?.bots)&&row.config.bots.length===10);config=row.config;continue;}assert.ok(Array.isArray(row.inputs)&&row.inputs.length===10);tick++;if(tick<fromTick||tick>toTick)continue;checked++;for(let slot=0;slot<10;slot++)if(config.bots[slot]&&!(row.inputs[slot][5]&256)&&missing.length<32)missing.push({tick,slot});}}
 finally{reader.close();stream.destroy();}
 assert.equal(checked,toTick-fromTick+1,'The selected Native tape interval must be complete');assert.deepEqual(missing,[],'Every bots-capable seat must have real packed takeover bit 256 throughout the baseline interval');
 return {fromTick,toTick,checkedNativeFrames:checked,headerBotsCapable:[...config.bots],allBotsCapableSeatsTakenOver:true,meaning:'Control proof for this recorded interval; not a global bots=false configuration or whole-match no-AI claim'};
}
async function setKeys(actor,current,desired){const wanted=new Set(desired);for(const key of current)if(!wanted.has(key))await actor.key(key,'up');for(const key of wanted)if(!current.has(key))await actor.key(key,'down');current.clear();for(const key of wanted)current.add(key);}
async function release(actor,current){await setKeys(actor,current,[]);}

export async function moveBrowser(actor,waypoints,{timeoutPerWaypoint=30000,tolerance=2,mark=()=>{}}={}){
 const held=new Set(),arrivals=[];
 try{
  for(const goal of waypoints){
   if(!Array.isArray(goal)||goal.length!==2||!goal.every(Number.isFinite))throw Error('Use static map [x,z] waypoints.');
   const aligned=await aimOrientation(actor,{yaw:0,pitch:0});await mark('route-heading-aligned',{actor:actor.id,goal,...aligned});
   const started=performance.now();let lastDistance=Infinity,progressAt=started,arrived=false;
   await mark('route-waypoint-start',{actor:actor.id,goal});
   while(performance.now()-started<timeoutPerWaypoint){
    const observed=await actor.sample();if(!observed.window.playing||observed.window.visibility!=='visible'||!observed.window.hasFocus)throw Error(actor.id+' real browser controls are paused: '+JSON.stringify({window:observed.window,status:observed.status}));
    const room=await actor.room(),player=own(room);if(!player?.alive)throw Error(actor.id+' died or has no own public pose while navigating');
    const dx=goal[0]-player.position[0],dz=goal[1]-player.position[2],distance=Math.hypot(dx,dz);
    if(distance<=tolerance&&speed(player)<8){arrived=true;arrivals.push({goal,position:[...player.position],tick:room.state.tick,lastSeq:player.last_seq});break;}
    if(distance<lastDistance-.2){lastDistance=distance;progressAt=performance.now();}if(performance.now()-progressAt>5000)throw Error('Route made no progress: '+JSON.stringify({actor:actor.id,goal,position:player.position,distance}));
    // Move one world axis at a time. Short real pulses near corners avoid
    // cutting across the production obstacles or relying on exact JS timers.
    const axis=Math.abs(dx)>Math.abs(dz)?[Math.sign(dx),0]:[0,Math.sign(dz)],walk=distance<150;
    const pulse=distance>180?260:distance>60?90:distance>15?40:20;
    await setKeys(actor,held,movementKeys(player.yaw,axis[0],axis[1],{walk}));await pause(pulse);const releasedAfter=actor.lastInput?.index??0;await release(actor,held);
    const stopped=await actor.waitInput(row=>row.input.x===0&&row.input.y===0,{afterIndex:releasedAfter,timeout:2000});await actor.waitRoom(value=>own(value)?.last_seq>=stopped.input.seq&&speed(own(value))<8,{timeout:2000});await pause(35);
   }
   if(!arrived)throw Error(actor.id+' waypoint timeout: '+JSON.stringify({goal,position:own(await actor.room())?.position}));await mark('route-waypoint-arrived',{actor:actor.id,...arrivals.at(-1)});
  }
  return arrivals;
 }finally{await release(actor,held);}
}

export async function aimOrientation(actor,{yaw=0,pitch=0}={}, {tolerance=.002,maxSteps=20}={}){
 if(!Number.isFinite(yaw)||!Number.isFinite(pitch)||Math.abs(pitch)>1.5)throw Error('Use bounded camera orientation angles.');
 const afterIndex=actor.lastInput?.index??0;let last;
 for(let step=0;step<maxSteps;step++){
  await actor.drain();const frame=actor.lastPresentation;if(!frame)throw Error('No actual rendered camera to align.');const dyaw=wrap(yaw-frame.camera.yaw),dpitch=pitch-frame.camera.pitch;last={dyaw,dpitch,frameIndex:frame.index};
  if(Math.hypot(dyaw,dpitch)<=tolerance){const sent=await actor.waitInput(row=>Math.abs(wrap(row.input.yaw-yaw))<=tolerance&&Math.abs(row.input.pitch-pitch)<=tolerance,{afterIndex});const accepted=await actor.waitRoom(room=>own(room)?.last_seq>=sent.input.seq&&Math.abs(wrap(own(room).yaw-yaw))<=tolerance&&Math.abs(own(room).pitch-pitch)<=tolerance);return {yaw,pitch,observedYaw:own(accepted).yaw,observedPitch:own(accepted).pitch,seq:sent.input.seq,nativeTick:accepted.state.tick,frameIndex:frame.index};}
  await actor.aim(Math.max(-240,Math.min(240,-dyaw/.0025)),Math.max(-120,Math.min(120,-dpitch/.0025)));await actor.waitPresentation(()=>true,{afterIndex:frame.index});
 }
 throw Error('Real mouse heading alignment did not converge: '+JSON.stringify(last));
}

export async function aimVisible(actor,targetSlot,{tolerance=.002,maxSteps=20,height=44}={}){
 let latest;
 for(let step=0;step<maxSteps;step++){
  await actor.drain();const frame=actor.lastPresentation;if(!frame)throw Error('No actual rendered frame has been observed.');const aim=visibleAim(frame,targetSlot,{height}),dyaw=wrap(aim.yaw-frame.camera.yaw),dpitch=aim.pitch-frame.camera.pitch;
  latest={...aim,yawError:dyaw,pitchError:dpitch,frameIndex:frame.index,atMs:frame.atMs,animationAtMs:frame.animationAtMs};
  if(Math.hypot(dyaw,dpitch)<=tolerance)return latest;
  // Boot fixes the public sensitivity to 1, invert off and assistance off.
  // ARC is unscoped: .0025 radians per received mouse pixel. Feedback comes
  // from the real camera, so missed/clamped mouse delivery cannot pass silently.
  const dx=Math.max(-240,Math.min(240,-dyaw/.0025)),dy=Math.max(-120,Math.min(120,-dpitch/.0025));await actor.aim(dx,dy);await actor.waitPresentation(()=>true,{afterIndex:frame.index});
 }
 throw Error('Visible aim did not converge: '+JSON.stringify(latest));
}

export async function setupControlledBaseline({browserActors,nodeActors,mark=()=>{}}){
 const {A,B}=browserPair(browserActors),nodes=nodeList(nodeActors);assert.ok(A&&B&&nodes.length===8,'Need browsers A/B and eight independent Node actors');for(const node of nodes)node.neutral();
 const room=await A.action('private',{ruleset:'casual',mode:'deathmatch',map:0,hero:0,difficulty:0}),slots=[];
 await B.action('join',{room:room.id,hero:0});assert.equal((await B.waitRoom(value=>value?.slot===5)).slot,5);
 const expected=[1,6,2,7,3,8,4,9];for(let i=0;i<8;i++){await nodes[i].action({type:'join',room:room.id,hero:0});assert.equal(nodes[i].room.slot,expected[i]);slots.push({actor:nodes[i].id,slot:expected[i]});}
 const waiting=await A.waitRoom(value=>value?.roster?.every(player=>!player.bot&&player.connected));assert.equal(waiting.roster.length,10);await mark('ten-controlled-seats-ready',{slots:[{actor:'A',slot:0},{actor:'B',slot:5},...slots]});await A.action('start');await B.action('resume');await Promise.all([A.capturePointer(),B.capturePointer()]);
 await mark('default-weapon-warmup-start');await pause(4000);
 for(const actor of [A,B]){
  const state=await actor.sample();assert.equal(state.window.playing,true,'Cold passive warmup must not require automatic Resume');
  const current=await actor.room();if(own(current).weapon!==0){const afterIndex=actor.lastInput?.index??0;await actor.key('Digit1');const request=await actor.waitInput(row=>row.input.weapon===0,{afterIndex});await actor.waitRoom(value=>own(value)?.weapon===0&&own(value).last_seq>=request.input.seq);await mark('arc-selection-acknowledged',{actor:actor.id,seq:request.input.seq,tick:(await actor.room()).state.tick});}
  assert.equal(own(await actor.room()).weapon,0);await pause(350);
 }
 const running=await A.room();assert.equal(running.config.mode,'deathmatch');assert.equal(running.config.map,0);assert.ok(running.roster.every(player=>!player.bot&&player.connected));
 await mark('controlled-baseline-running',{tick:running.state.tick,nonBotRoster:true,nativeBotConfiguration:'read exact private tape header; public state does not disclose this field'});return {roomId:room.id,slots};
}

export async function runFairnessScenarios({browserActors,nodeActors,mark=()=>{}}){
 const {A,B}=browserPair(browserActors),nodes=nodeList(nodeActors),marks=[],startedAt=Date.now();assert.ok(A&&B&&nodes.length===8);
 async function checkpoint(label,data={}){const room=await A.room(),row={label,wallAt:Date.now(),monotonicMs:performance.now(),nativeTickObserved:room?.state?.tick??null,...data};marks.push(row);for(const node of nodes)node.mark(label);const stamped=await Promise.all([A.mark(label),B.mark(label)]);row.actorIndexes={A:stamped[0].index,B:stamped[1].index};await mark(label,row);return row;}
 let setup;if(!(await A.room()))setup=await setupControlledBaseline({browserActors:{A,B},nodeActors:nodes,mark:checkpoint});
 const initial=await A.room();assert.equal(initial.slot,0);assert.equal((await B.room()).slot,5);assert.equal(initial.config.mode,'deathmatch');assert.equal(initial.config.map,0);assert.ok(initial.roster.length===10&&initial.roster.every(player=>!player.bot&&player.connected),'Every seat must remain connected and controlled');
 await checkpoint('warmup-start');await pause(4000);const warmupSamples=await Promise.all([A.sample(),B.sample()]);for(const sample of warmupSamples){assert.equal(sample.window.playing,true,'Passive warmup must not require automatic Resume');assert.equal(sample.window.visibility,'visible');assert.equal(sample.window.hasFocus,true);}await checkpoint('baseline-start',{actualWindows:warmupSamples.map(sample=>({actor:sample.id,...sample.window})),warmupMs:4000});
 const routeA=await moveBrowser(A,[[-100,1050],[-100,600]],{mark:checkpoint}),routeB=await moveBrowser(B,[[400,-1050],[400,240],[-100,240]],{mark:checkpoint});
 await A.waitPresentation(frame=>frame.players.some(player=>player.slot===5&&player.alive));await checkpoint('stationary-visible');
 const aimed=await aimVisible(A,5),before=await A.room(),shots=own(before).shots,markFire=await checkpoint('arc-stationary-request',{aim:aimed});let sent;
 try{await A.mouse('left','down');sent=await A.waitInput(row=>row.input.fire,{afterIndex:markFire.actorIndexes.A});await pause(35);}finally{await A.mouse('left','up');}
 const confirmed=await A.waitRoom(room=>own(room).shots>shots&&own(room).last_seq>=sent.input.seq),shotCount=own(confirmed).shots-shots;assert.equal(shotCount,1,'The unshaped baseline must produce exactly one ARC shot');await checkpoint('arc-stationary-native-confirmed',{fireSeq:sent.input.seq,requestedViewTick:sent.input.viewTick,acknowledgedSeq:own(confirmed).last_seq,shotCount,observedNativeTick:confirmed.state.tick});
 await A.key('KeyF','down');const crouched=await A.waitRoom(room=>own(room).crouch&&own(room).stance>.7);await checkpoint('crouch-observed',{stance:own(crouched).stance,lastSeq:own(crouched).last_seq});await A.key('KeyF','up');const stood=await A.waitRoom(room=>!own(room).crouch&&own(room).stance<.1);await checkpoint('stand-observed',{stance:own(stood).stance,lastSeq:own(stood).last_seq});
 await A.key('Space');const jumped=await A.waitRoom(room=>own(room).position[1]>0&&own(room).velocity[1]>0);await checkpoint('jump-observed',{position:own(jumped).position,velocity:own(jumped).velocity,lastSeq:own(jumped).last_seq});await A.waitRoom(room=>own(room).position[1]===0&&own(room).landing===0);
 await A.key('KeyD','down');await pause(250);await checkpoint('reversal-request');await A.key('KeyD','up');await A.key('KeyA','down');await pause(70);await A.key('KeyA','up');await A.waitRoom(room=>speed(own(room))<8);await checkpoint('reversal-settled');await moveBrowser(A,[[-100,600]],{mark:checkpoint});
 await checkpoint('target-retreat-cover-start');await moveBrowser(B,[[100,240]],{mark:checkpoint});await A.drain();const retreatFrame=A.lastPresentation;await checkpoint('target-retreat-cover-observed',{presentationIndex:retreatFrame?.index,targetVisible:retreatFrame?.players.some(player=>player.slot===5)??null,viewTick:retreatFrame?.viewTick??null});
 await checkpoint('target-peek-start');await moveBrowser(B,[[-100,240]],{mark:checkpoint});const peek=await A.waitPresentation(frame=>frame.players.some(player=>player.slot===5&&player.alive));await checkpoint('target-peek-visible',{presentationIndex:peek.index,viewTick:peek.viewTick,renderTick:peek.renderTick});
 const samples=await Promise.all([A.sample(),B.sample()]);for(const sample of samples){assert.equal(sample.window.visibility,'visible');assert.equal(sample.window.hasFocus,true);assert.equal(sample.captureDropped,0);assert.equal(sample.trace.dropped,0);assert.equal(sample.trace.persistenceError,null);assert.deepEqual(sample.errors,[]);}for(const node of nodes){assert.equal(node.info.dropped,0);assert.equal(node.info.errorCode,null);}
 await checkpoint('baseline-finished');return {schemaVersion:1,status:'baseline-complete',automated:true,humanParticipants:0,networkAcceptance:false,startedAt,finishedAt:Date.now(),roomId:initial.id,setup,routeA,routeB,arc:{fireSeq:sent.input.seq,viewTick:sent.input.viewTick,shotCount},marks,samples,warmupSamples,limitations:['Zero-shaping automated normal-control baseline only; not human or physical/network fairness acceptance.','Casual header permits bots; only the selected tape interval can prove all bots-capable seats were taken over. Warmup is outside that proof.','Public self pose drives navigation; only actual authorized visible presentation drives aim.','No hit verdict is guessed from cosmetics; correlate fire seq and Native tape with the exact oracle.','C6 second-target navigation and impaired-network scenario matrix remain subsequent work.']};
}

export async function runZeroShapingBaseline({devSource=repo,applicationImage,toolImage,gpuMode='hardware',presentationCohort='desktop'}={}){
 const lab=await createNetworkLab({devSource,...(applicationImage?{applicationImage}:{}),...(toolImage?{toolImage}:{}),runtimeConfig:{runtimeCommand:['node','tools/start-network-runtime.mjs']},runtimeEnv:{BOTSTRIKE_NATIVE_PROFILE:'c5a72be9466ddd4efa23aa6574541714c8112510ba7f2d7008dd0849f8a9925d'}});let browsers,result,error;const nodes=[];
 try{await lab.stats();browsers=await createBrowserActors({directory:path.join(lab.root,'browser-actors'),actors:['A','B'].map(id=>({id,proxyPort:Number(new URL(lab.actors[id].proxyUrl).port)})),viewport:{width:1280,height:720},deviceScaleFactor:.5,renderFps:30,gpuMode,presentationCohort});for(let i=0;i<8;i++)nodes.push(await openNetworkNodeActor({id:'C'+(i+1),proxyUrl:lab.actors.C.tcpUrl,directory:path.join(lab.root,'node-actors'),hz:30}));result=await runFairnessScenarios({browserActors:browsers.actors,nodeActors:nodes});result.browserParameters={viewport:{width:1280,height:720},requestedDeviceScaleFactor:.5,requestedRenderFps:30,gpuMode,presentationCohort,actualBacking:'recorded from each real presentation/sample window.canvasBacking'};await browsers.flush();await lab.stats();}
 catch(failure){error=failure;result={status:'failed',humanParticipants:0,networkAcceptance:false,error:{name:failure.name,message:failure.message},root:lab.root};}
 finally{await browsers?.close().catch(failure=>{error??=failure;});for(const node of nodes)await node.close({leave:true}).catch(failure=>{error??=failure;});await lab.close().catch(failure=>{error??=failure;});}
 result.root=lab.root;result.developmentBind=!!devSource;result.imageBindings=lab.imageBindings;try{result.capture=JSON.parse(await fs.readFile(path.join(lab.dataDir,'network-diagnostics','capture.json'),'utf8'));if(result.capture.status!=='complete')throw Error('Private Native capture did not complete');if(result.roomId){result.tape=path.join(lab.dataDir,'rooms',result.roomId,'tape.jsonl');await fs.access(result.tape);const fromTick=result.marks.find(mark=>mark.label==='baseline-start').nativeTickObserved+1,toTick=result.marks.find(mark=>mark.label==='baseline-finished').nativeTickObserved;result.controlProof=await verifyControlledTape(result.tape,{fromTick,toTick});}}catch(failure){error??=failure;result.captureFailure=failure.message;}
 if(error)result.status='failed';const file=path.join(lab.root,'fairness-baseline.json');await fs.writeFile(file,JSON.stringify(result,null,2)+'\n',{mode:0o600});if(error)throw Object.assign(error,{report:file});return {file,result};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){assert.equal(process.argv[2],'--baseline','Use --baseline for a disposable zero-shaping development run.');try{const result=await runZeroShapingBaseline();console.log(JSON.stringify({status:result.result.status,file:result.file,humanParticipants:0,networkAcceptance:false}));}catch(error){console.error(JSON.stringify({status:'failed',message:error.message,file:error.report??null}));process.exitCode=1;}}
