// Automated normal-control scenarios. No pose, HP, clock, RNG or Native state
// is assigned. Hit/cover verdicts belong to exact replay and its matched oracle.
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createReadStream} from 'node:fs';
import {createInterface} from 'node:readline';
import {createHash} from 'node:crypto';
import {createNetworkLab} from './network-lab.mjs';
import {createBrowserActors} from './network-browser-actors.mjs';
import {openNetworkNodeActor,waitNetworkCondition} from './network-node-actors.mjs';
import {cardinalSteering,navigationPathClear,planTwoLegSteering} from './network-navigation-steering.mjs';
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
async function setKeys(actor,current,desired,beforeDown=()=>{},afterOperation=null){const wanted=new Set(desired);for(const key of current)if(!wanted.has(key)){await actor.key(key,'up');current.delete(key);afterOperation?.();}for(const key of wanted)if(!current.has(key)){beforeDown();current.add(key);await actor.key(key,'down');afterOperation?.();}}
async function release(actor,current){await setKeys(actor,current,[]);}

export async function moveBrowser(actor,waypoints,{timeoutPerWaypoint=30000,tolerance=2,mark=()=>{},actuationGuard=null}={}){
 const guarded=()=>{if(actuationGuard!==null){if(typeof actuationGuard!=='function')throw Error('Actuation guard must be a function');const result=actuationGuard();if(result&&typeof result.then==='function')throw Error('Actuation guard must be synchronous');}};
 const originalModifiers=['ShiftLeft','KeyF'].filter(key=>actor.heldKeys?.has(key)),held=new Set(originalModifiers),arrivals=[];let failure;
 const stamp=()=>({wallAt:Date.now(),monotonicMs:performance.now(),index:actor.index});
 const stoppedInput=(row,walk,crouch)=>row.input.x===0&&row.input.y===0&&row.input.walk===walk&&row.input.crouch===crouch;
 async function assertActive(){const observed=await actor.sample();if(!observed.window.playing||observed.window.visibility!=='visible'||!observed.window.hasFocus)throw Error(actor.id+' real browser controls are paused: '+JSON.stringify({window:observed.window,status:observed.status}));}
 async function confirmStop(anchor,walk,crouch,bound=async operation=>operation(2000)){const sent=await bound(timeout=>actor.waitInput(row=>stoppedInput(row,walk,crouch),{afterIndex:anchor,timeout:Math.min(2000,timeout)}));const room=await bound(timeout=>actor.waitRoom(value=>own(value)?.last_seq>=sent.input.seq&&speed(own(value))<8&&own(value).crouch===crouch,{timeout:Math.min(2000,timeout)}));return {sent,room};}
 try{
  for(const goal of waypoints){
   if(!Array.isArray(goal)||goal.length!==2||!goal.every(Number.isFinite))throw Error('Use static map [x,z] waypoints.');
   guarded();await assertActive();guarded();const aligned=await aimOrientation(actor,{yaw:0,pitch:0},{actuationGuard});guarded();await mark('route-heading-aligned',{actor:actor.id,goal,...aligned});
   const started=performance.now();let lastDistance=Infinity,progressAt=started,arrived=false,fineHoldMs=0,pulseNumber=0,pair=null,steeringMap=null;
   const remaining=()=>{guarded();const now=performance.now(),ms=Math.min(started+timeoutPerWaypoint,progressAt+5000)-now;if(ms<=0)throw Error('Navigation steering deadline exceeded: '+JSON.stringify({actor:actor.id,goal,waypointElapsedMs:now-started,noProgressElapsedMs:now-progressAt}));return ms;};
   // Settle each in-flight operation before checking again. Racing an abandoned
   // mouse mutation could otherwise continue after cleanup. No late call earns
   // another command, a new clock, or credit for lateral motion.
   const bounded=async operation=>{const ms=remaining();const value=await operation(ms);remaining();return value;};
   async function mapFor(value){
    const index=value.config?.map;if(!Number.isSafeInteger(index)||index<0)throw Error('Navigation steering needs the selected public map index');
    if(!Number.isSafeInteger(own(value)?.life)||own(value).life<=0)throw Error('Navigation steering needs a valid current life');
    if(typeof value.id!=='string'||!value.id||!Number.isSafeInteger(value.slot)||value.slot<0||value.slot>9)throw Error('Navigation steering needs a valid current room and slot');
    const body=await bounded(()=>fs.readFile(path.join(repo,'botstrike/spec.json'))),spec=JSON.parse(body);if(!spec.maps?.[index])throw Error('Navigation steering public map is unavailable');
    return{index,map:spec.maps[index],specSha256:createHash('sha256').update(body).digest('hex'),life:own(value).life,roomId:value.id,slot:value.slot};
   }
   const steeringContextMatches=value=>{const p=own(value);return p?.alive&&p.life===steeringMap.life&&value.id===steeringMap.roomId&&value.slot===steeringMap.slot&&value.config?.map===steeringMap.index;};
   async function alignSteering(target){
    if([...held].some(key=>['KeyW','KeyA','KeyS','KeyD'].includes(key)))throw Error('Navigation steering requires neutral movement while turning');
    const afterIndex=actor.lastInput?.index??0;
    for(let step=0;step<20;step++){
     await bounded(()=>actor.drain());const frame=actor.lastPresentation;if(!Number.isFinite(frame?.camera?.yaw)||!Number.isFinite(frame?.camera?.pitch))throw Error('Navigation steering needs the real rendered camera');
     const observed=await bounded(()=>actor.room()),p=own(observed),from=[p?.position?.[0],p?.position?.[2]];
     if(!steeringContextMatches(observed)||!navigationPathClear(steeringMap.map,[from,target,goal],goal,{groundY:p.position[1]}))throw Error('Navigation steering pose or swept path is unavailable or unsafe');
     const choice=cardinalSteering(from,target,frame.camera.yaw);if(!choice)throw Error('Navigation steering has no nonzero normal-control direction');
     const dyaw=wrap(choice.yaw-frame.camera.yaw),dpitch=-frame.camera.pitch;
     if(Math.hypot(dyaw,dpitch)<=.002){
      const sent=await bounded(timeout=>actor.waitInput(row=>row.input.x===0&&row.input.y===0&&Math.abs(wrap(row.input.yaw-choice.yaw))<=.002&&Math.abs(row.input.pitch)<=.002,{afterIndex,timeout}));
      const current=await bounded(timeout=>actor.waitRoom(value=>own(value)?.last_seq>=sent.input.seq&&speed(own(value))<8&&Math.abs(wrap(own(value).yaw-choice.yaw))<=.002,{timeout})),player=own(current),position=[player.position[0],player.position[2]];
      if(!steeringContextMatches(current)||!navigationPathClear(steeringMap.map,[position,target,goal],goal,{groundY:player.position[1]}))throw Error('Navigation steering refreshed pose or swept path is unsafe');
      return{room:current,player,choice,target:[...target],frameIndex:frame.index,remainingMs:remaining()};
     }
     await bounded(()=>actor.aim(Math.max(-240,Math.min(240,-dyaw/.0025)),Math.max(-120,Math.min(120,-dpitch/.0025))));
     await bounded(timeout=>actor.waitPresentation(()=>true,{afterIndex:frame.index,timeout}));
    }
    throw Error('Navigation steering real camera did not converge');
   }
   await mark('route-waypoint-start',{actor:actor.id,goal});
   while(performance.now()-started<timeoutPerWaypoint){
    if(steeringMap)await bounded(()=>assertActive());else await assertActive();
    let room=steeringMap?await bounded(()=>actor.room()):await actor.room(),player=own(room);if(!player?.alive)throw Error(actor.id+' died or has no own public pose while navigating');
    if(steeringMap&&!steeringContextMatches(room))throw Error('Navigation steering room, slot, map or life changed');
    let dx=goal[0]-player.position[0],dz=goal[1]-player.position[2],distance=Math.hypot(dx,dz),steered=null;
    if(distance<=tolerance&&speed(player)<8){arrived=true;arrivals.push({goal,position:[...player.position],tick:room.state.tick,lastSeq:player.last_seq});break;}
    if(distance<lastDistance-.2){lastDistance=distance;progressAt=performance.now();}if(performance.now()-progressAt>5000)throw Error('Route made no progress: '+JSON.stringify({actor:actor.id,goal,position:player.position,distance}));
    // A WebSocket framesent observation is not a TCP arrival or a Native step.
    // Short intents may arrive together, or remain held longer on the server.
    // Adapt from the public stopped pose, rather than assuming timer duration
    // equals authoritative movement. No private capture drives these controls.
    if(steeringMap){
     steered=await alignSteering(pair?.phase==='detour'?pair.via:goal);room=steered.room;player=steered.player;dx=goal[0]-player.position[0];dz=goal[1]-player.position[2];distance=Math.hypot(dx,dz);
     if(distance<=tolerance&&speed(player)<8){arrived=true;arrivals.push({goal,position:[...player.position],tick:room.state.tick,lastSeq:player.last_seq});break;}
     await bounded(()=>mark('route-steering-aligned',{actor:actor.id,goal,phase:pair?.phase||'radial',target:steered.target,key:steered.choice.key,yaw:steered.choice.yaw,frameIndex:steered.frameIndex,remainingMs:steered.remainingMs}));
    }
    const axis=Math.abs(dx)>Math.abs(dz)?[Math.sign(dx),0]:[0,Math.sign(dz)],walk=distance<150,crouch=distance<30;
    const modifiers=[...(walk?['ShiftLeft']:[]),...(crouch?['KeyF']:[])],desired=[...modifiers,...(steered?[steered.choice.key]:movementKeys(player.yaw,axis[0],axis[1]))];
    const expected={x:Number(desired.includes('KeyD'))-Number(desired.includes('KeyA')),y:Number(desired.includes('KeyW'))-Number(desired.includes('KeyS')),walk,crouch};
    const pulse=pair?pair.hold:distance>180?260:distance>60?90:distance>15?40:fineHoldMs;
    const pulseStart={actor:actor.id,goal,pulseNumber:++pulseNumber,requestAnchor:stamp(),beforePublic:{tick:room.state.tick,position:[...player.position],distance},expected,extraHoldMs:pulse,...(steered?{steering:{phase:pair?.phase||'radial',target:steered.target,key:steered.choice.key,yaw:steered.choice.yaw}}:{})};
    if(steered)await bounded(()=>mark('route-pulse-start',pulseStart));else await mark('route-pulse-start',pulseStart);
    // Take the anchor after the marker: marker work must not allow an old
    // neutral or an input from before this actual keydown to satisfy the wait.
    if(steered)remaining();
    const down=stamp(),sendWait=actor.watchInputSent(row=>row.input.x===expected.x&&row.input.y===expected.y&&row.input.walk===walk&&row.input.crouch===crouch&&(!steered||Math.abs(wrap(row.input.yaw-steered.choice.yaw))<=.002&&Math.abs(row.input.pitch)<=.002),{afterIndex:down.index,timeout:steered?Math.min(2000,remaining()):2000});sendWait.promise.catch(()=>{});let sent,keyup,pulseFailure;
    try{
     await setKeys(actor,held,desired,actuationGuard?()=>{guarded();if(steered)remaining();}:steered?remaining:undefined,actuationGuard?guarded:null);if(steered)remaining();sent=await sendWait.promise;if(steered)remaining();
     const hold=pulse-(performance.now()-sent.nodeAtMs);if(hold>0)await pause(steered?Math.min(hold,remaining()):hold);if(steered)remaining();
    }catch(error){pulseFailure=error;throw error;}
    finally{
     sendWait.cancel();keyup=stamp();
     try{await setKeys(actor,held,actuationGuard&&pulseFailure?modifiers.filter(key=>held.has(key)):modifiers);}catch(error){if(!pulseFailure)throw error;pulseFailure.navigationPulseReleaseError=error.message;}
    }
    // Write potentially asynchronous markers only after releasing movement.
    const sentMarker=()=>mark('route-pulse-sent',{actor:actor.id,goal,pulseNumber,downAnchor:down,observedSend:{index:sent.index,seq:sent.input.seq,wallAt:sent.nodeUnixMs,monotonicMs:sent.nodeAtMs},extraHoldMs:pulse,meaning:'Real WebSocket framesent observation; not wire arrival or Native application'}),keyupMarker=()=>mark('route-pulse-keyup',{actor:actor.id,goal,pulseNumber,keyupAnchor:keyup});
    if(steered){await bounded(sentMarker);await bounded(keyupMarker);}else{await sentMarker();await keyupMarker();}
    const stopped=await confirmStop(keyup.index,walk,crouch,steered?bounded:undefined),after=own(stopped.room),moved=[after.position[0]-player.position[0],after.position[2]-player.position[2]],displacement=Math.hypot(...moved),afterDistance=Math.hypot(goal[0]-after.position[0],goal[1]-after.position[2]);
    if(steered){remaining();if(!steeringContextMatches(stopped.room)||!navigationPathClear(steeringMap.map,[[player.position[0],player.position[2]],[after.position[0],after.position[2]],goal],goal,{groundY:after.position[1]}))throw Error('Navigation steering actual stopped motion left its safe20-unit goal envelope or path');}
    const overshot=(goal[0]-after.position[0])*axis[0]+(goal[1]-after.position[2])*axis[1]<0;
    let fineAdjustmentReason=null;
    // Four milliseconds seeds the bounded search; it is no actuation floor or Native-step guarantee.
    // Productive observed-progress scaling may still choose a shorter hold.
    if(distance<=15){if(displacement<.05){fineHoldMs=Math.min(60,Math.max(4,pulse*2));fineAdjustmentReason='zero_displacement_double';}else if(overshot||afterDistance>=distance){fineHoldMs=Math.min(60,Math.max(4,Math.floor(pulse/2)));fineAdjustmentReason='overshoot_halve';}else{fineHoldMs=Math.max(0,Math.min(fineHoldMs,Math.floor(pulse*Math.max(0,afterDistance-tolerance)/displacement)));fineAdjustmentReason='observed_progress_scale';}}
    if(pair){if(pair.phase==='detour'&&displacement>=.05){pair.phase='closure';pair.hold=pulse;}else if(pair.phase==='detour')pair.hold=fineHoldMs;else pair=null;}
    else if(distance<=15&&overshot&&distance>tolerance&&afterDistance>tolerance&&displacement>2*tolerance&&displacement<=15){
     const selected=steeringMap||await mapFor(stopped.room),plan=planTwoLegSteering({from:[after.position[0],after.position[2]],goal,step:displacement,map:selected.map,yaw:after.yaw,groundY:after.position[1],tolerance});
     if(plan){steeringMap=selected;pair={phase:'detour',via:plan.via,hold:Math.min(60,pulse)};await bounded(()=>mark('route-steering-planned',{actor:actor.id,goal,from:[after.position[0],after.position[2]],via:plan.via,observedStep:displacement,requestedHoldMs:pair.hold,side:plan.side,envelope:plan.envelope,mapIndex:selected.index,specSha256:selected.specSha256,remainingMs:remaining(),meaning:'Two-leg geometry from a previous observed displacement; future pulse lengths remain unproven'}));}
    }
    await mark('route-pulse-stopped',{actor:actor.id,goal,pulseNumber,neutral:{index:stopped.sent.index,seq:stopped.sent.input.seq,wallAt:stopped.sent.nodeUnixMs},publicAck:{tick:stopped.room.state.tick,lastSeq:after.last_seq,position:[...after.position],speed:speed(after),distance:afterDistance},publicDisplacement:displacement,overshot,nextFineHoldMs:fineHoldMs,fineAdjustmentReason});await pause(35);
   }
   if(!arrived)throw Error(actor.id+' waypoint timeout: '+JSON.stringify({goal,position:own(await actor.room())?.position}));await mark('route-waypoint-arrived',{actor:actor.id,...arrivals.at(-1)});
  }
  return arrivals;
 }catch(error){failure=error;throw error;}
 finally{
  try{const restore=stamp(),restoredModifiers=actuationGuard&&failure?[]:originalModifiers;await setKeys(actor,held,restoredModifiers);const restored=await confirmStop(restore.index,restoredModifiers.includes('ShiftLeft'),restoredModifiers.includes('KeyF'));await mark('route-modifiers-restored',{actor:actor.id,restoreAnchor:restore,modifiers:restoredModifiers,seq:restored.sent.input.seq,tick:restored.room.state.tick,lastSeq:own(restored.room).last_seq});}
  catch(error){if(!failure)throw error;failure.navigationCleanupError=error.message;try{await mark('route-modifiers-unconfirmed',{actor:actor.id,error:error.message});}catch{}}
 }
}

export async function aimOrientation(actor,{yaw=0,pitch=0}={}, {tolerance=.002,maxSteps=20,actuationGuard=null}={}){
 const guard=()=>{if(actuationGuard!==null){const result=actuationGuard();if(result&&typeof result.then==='function')throw Error('Actuation guard must be synchronous');}};
 if(!Number.isFinite(yaw)||!Number.isFinite(pitch)||Math.abs(pitch)>1.5)throw Error('Use bounded camera orientation angles.');
 const afterIndex=actor.lastInput?.index??0;let last;
 for(let step=0;step<maxSteps;step++){
  guard();await actor.drain();guard();const frame=actor.lastPresentation;if(!frame)throw Error('No actual rendered camera to align.');const dyaw=wrap(yaw-frame.camera.yaw),dpitch=pitch-frame.camera.pitch;last={dyaw,dpitch,frameIndex:frame.index};
  if(Math.hypot(dyaw,dpitch)<=tolerance){const sent=await actor.waitInput(row=>Math.abs(wrap(row.input.yaw-yaw))<=tolerance&&Math.abs(row.input.pitch-pitch)<=tolerance,{afterIndex});guard();const accepted=await actor.waitRoom(room=>own(room)?.last_seq>=sent.input.seq&&Math.abs(wrap(own(room).yaw-yaw))<=tolerance&&Math.abs(own(room).pitch-pitch)<=tolerance);guard();return {yaw,pitch,observedYaw:own(accepted).yaw,observedPitch:own(accepted).pitch,seq:sent.input.seq,nativeTick:accepted.state.tick,frameIndex:frame.index};}
  guard();await actor.aim(Math.max(-240,Math.min(240,-dyaw/.0025)),Math.max(-120,Math.min(120,-dpitch/.0025)));guard();await actor.waitPresentation(()=>true,{afterIndex:frame.index});guard();
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
