// Automated production-input controller. Geometry/shot verdicts come only from
// unchanged native Game and the independently matched Rust inspector.
import {spawn} from 'node:child_process';
import {open,writeFile} from 'node:fs/promises';
import {createInterface} from 'node:readline';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const repo=fileURLToPath(new URL('../',import.meta.url));
export async function recordNetworkFixture(tape,{onFrame,maxTicks=6000}={}){
 if(!Number.isInteger(maxTicks)||maxTicks<1||maxTicks>6000)throw Error('Fixture tick bounds');
 const output=await open(tape,'wx',0o600);
 const engine=spawn(path.join(repo,'release/botstrike-engine'),[],{cwd:repo,stdio:['pipe','pipe','pipe']});let stderr='';engine.stderr.on('data',b=>{if(stderr.length<4096)stderr+=b;});
 const done=new Promise((resolve,reject)=>{engine.once('error',reject);engine.once('close',code=>code===0?resolve():reject(Error('Fixture engine failed: '+stderr)));});done.catch(()=>{});
 const timeout=setTimeout(()=>engine.kill('SIGKILL'),60000);timeout.unref();
 engine.stdin.on('error',()=>{});
 const reader=createInterface({input:engine.stdout,crlfDelay:Infinity}),messages=reader[Symbol.asyncIterator]();let state;const labels=[];
 async function receive(type){const next=await messages.next();if(next.done)throw Error('Fixture engine ended early: '+stderr);const message=JSON.parse(next.value);if(message.type!==type)throw Error('Unexpected fixture engine message');return message;}
 const config={map:0,mode:'deathmatch',heroes:Array(10).fill(0),bots:Array(10).fill(false),difficulty:1,seed:20811};

 async function step(controls={}){
  if(state.tick>=maxTicks)throw Error('Fixture tick limit');
  const inputs=Array.from({length:10},(_,slot)=>{const p=state.players[slot],c=controls[slot]||{},yaw=c.yaw??p.yaw,pitch=c.pitch??p.pitch;const bits=256|(Math.min(31,p.life)<<10)|(c.fire?1:0)|(c.crouch?8:0)|(c.jump?16:0)|(c.scope?128:0)|(c.reload?2:0);return [state.tick+1,c.x||0,c.y||0,yaw,pitch,bits,c.weapon??null,null,null,0,Object.hasOwn(c,'viewTick')?c.viewTick:Math.max(0,state.tick-(c.lag??0)),0,0];});
  const line=JSON.stringify({inputs})+'\n';await output.write(line);engine.stdin.write(line);state=(await receive('frame')).state;await onFrame?.(state);return state;
 }
 async function wait(n,controls={}){for(let i=0;i<n;i++)await step(controls);}
 async function move(slot,goals){for(const goal of goals){let arrived=false;for(let i=0;i<650;i++){const p=state.players[slot],dx=goal[0]-p.position[0],dz=goal[1]-p.position[2],distance=Math.hypot(dx,dz);if(distance<2){arrived=true;break;}const fraction=Math.min(1,Math.sqrt(Math.max(0,2*1750*(distance-1)))/305);await step({[slot]:{x:dx/distance*fraction,y:-dz/distance*fraction,yaw:0,pitch:0}});}if(!arrived)throw Error('Fixture route did not arrive: '+JSON.stringify({slot,goal,pose:state.players[slot].position}));}await wait(24);}
 function aim(slot=5){const a=state.players[0],b=state.players[slot],dx=b.position[0]-a.position[0],dz=b.position[2]-a.position[2],dy=b.position[1]+44-(a.position[1]+56-19*a.stance);return {yaw:Math.atan2(-dx,-dz),pitch:Math.atan2(dy,Math.hypot(dx,dz))};}
 async function shot(name,weapon,extra={}){await wait(16,{0:{weapon}});labels.push({name,tick:state.tick+1,weapon});await step({0:{...aim(),weapon,fire:true,...extra}});await wait(4);}
 try{
  const header=JSON.stringify({config})+'\n';await output.write(header);engine.stdin.write(header);state=(await receive('ready')).state;
  await move(0,[[-100,1050],[-100,600]]);
  await move(5,[[400,-1050],[400,240],[-100,240]]);
  await move(6,[[400,-1050],[400,160],[-100,160]]);
  // Aim above targets for moving/stance diagnostics so these cases don't consume
  // the later death/respawn scenario. Native RNG still exercises weapon spread.
  await shot('arc-stationary',0);
  await shot('ion-crouch-transition',2,{crouch:true,pitch:0.5});
  await wait(16,{0:{crouch:true}});
  labels.push({name:'ion-stand-transition',tick:state.tick+1,weapon:2});await step({0:{...aim(),weapon:2,fire:true,pitch:0.5}});await wait(4);
  await shot('rail-jump',3,{jump:true,pitch:0.5,scope:true});
  await wait(60);await wait(16,{0:{weapon:2}});await wait(20,{0:{x:1}});
  labels.push({name:'ion-counter-strafe',tick:state.tick+1,weapon:2});await step({0:{...aim(),weapon:2,fire:true,x:-1,pitch:0.5}});await wait(4);
  await move(0,[[-100,600]]);
  // Real target strafes from the exposed side into existing production cover.
  // A six-tick historical pose is an interpolation interval reference, not an
  // assertion that a real socket delivered that view tick.
  for(let i=0;i<42;i++){const c={5:{x:1,yaw:0}};if(i===4||i===24||i===40){labels.push({name:i===4?'current-pose-slot-order':'retreat-cover-lag6',tick:state.tick+1,weapon:2});c[0]={...aim(),fire:true,weapon:2,lag:6,...(i===4?{viewTick:null}:{})};}await step(c);}
  await wait(24);await shot('front-cover-blocks-target',3,{scope:true});
  await move(5,[[-100,240]]);
  await shot('peek-and-multiple-target-nearest',3,{scope:true,lag:6});
  // Repeated ordinary controls cause a genuine native death, not edited HP.
  let killed=!state.players[5].alive;
  for(let i=0;i<28&&!killed;i++){await wait(70,{0:{weapon:3,scope:true}});labels.push({name:'native-damage-and-death',tick:state.tick+1,weapon:3});await step({0:{...aim(),weapon:3,scope:true,fire:true}});killed=!state.players[5].alive;}
  if(!killed)throw Error('Fixture failed to produce native death');
  const deadLife=state.players[5].life;let respawned=false;
  for(let i=0;i<260;i++){await step();if(state.players[5].alive&&state.players[5].life!==deadLife){respawned=true;break;}}
  if(!respawned)throw Error('Fixture failed to observe a new native life');
  labels.push({name:'old-dead-history-isolated-from-new-life',tick:state.tick+1,weapon:3});await step({0:{...aim(),weapon:3,scope:true,fire:true,lag:6}});
  engine.stdin.end();const result=(await receive('result')).result;await done;await output.close();
  const metadata={schema:1,synthetic:true,humanParticipants:0,config,ticks:state.tick,labels,result,limitations:['Generated by automated controls through exact retained engine; no teleports, health edits, rule changes or injected native state.','No socket/netem impairment, human reaction or physical device acceptance. Production deathmatch supply is used; this is not a ten-controller Tactical match.']};
  await writeFile(tape+'.fixture.json',JSON.stringify(metadata,null,2)+'\n',{flag:'wx',mode:0o600});return metadata;
 }catch(error){engine.kill('SIGKILL');await output.close().catch(()=>{});throw error;}finally{clearTimeout(timeout);reader.close();}
}
