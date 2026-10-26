import test from 'node:test';import assert from 'node:assert/strict';
import {LocalPrediction,advanceMotion} from '../games/botstrike/client/prediction.mjs';import {ResolutionBudget} from '../shared/game-performance.mjs';
const map={extent:10000,obstacles:[]},hero={speed:300},weapon={mobility:1,scoped:true},neutral={seq:0,x:0,y:0,yaw:0,pitch:0,jump:false};
for(const latency of [0,80,180])test(`movement stays immediate with ${latency} ms round trip and 16 Hz snapshots`,()=>{
 const p=new LocalPrediction(),server={position:[0,0,0],vy:0,jumpHeld:false},packets=[],snapshots=[];let control=neutral,seq=0,sendAt=0,serverAt=0,frameAt=0,tick=0;const observations=[];p.reset({position:[0,0,0],velocity:[0,0,0]},0);
 for(let now=0;now<=3200;now++){if(now>=sendAt){const input={...neutral,seq:++seq,x:now<1000?1:0,y:now>=1000&&now<2000?1:0};p.record(input,now);packets.push({at:now+latency/2,input});sendAt+=1000/60}
  while(packets[0]?.at<=now)control=packets.shift().input;
  if(now>=serverAt){advanceMotion(server,control,1/64,map,hero,weapon);tick++;if(tick%4===0)snapshots.push({at:now+latency/2,player:{position:[...server.position],velocity:[0,server.vy,0],last_seq:control.seq}});serverAt+=1000/64}
  while(snapshots[0]?.at<=now)p.reconcile(snapshots.shift().player,now,map,hero,weapon);
  if(now>=frameAt){p.step({...neutral,x:now<1000?1:0,y:now>=1000&&now<2000?1:0},now,map,hero,weapon);observations.push({at:now,p:[...p.position]});frameAt+=1000/60}
 }
 assert.ok(observations.find(o=>o.at>=17).p[0]>3,'movement appears on the first frame without a round trip');
 const moving=observations.find(o=>o.at>=950);assert.ok(Math.abs(moving.p[0]-moving.at*.3)<25,JSON.stringify({latency,moving}));
 const turn=observations.find(o=>o.at>=1034);assert.ok(turn.p[2]<-4,'direction change appears locally');assert.ok(Math.hypot(...p.position.map((v,i)=>v-server.position[i]))<1,'settles to native authority after stopping');
});
test('prediction snaps teleports and bounds stale unacknowledged history',()=>{const p=new LocalPrediction();p.reset({position:[0,0,0]},0);for(let n=1;n<300;n++)p.record({...neutral,seq:n,x:1},n*20);assert.equal(p.history.length,128);p.reconcile({position:[1000,0,0],velocity:[0,0,0],last_seq:0},10000,map,hero,weapon);assert.ok(p.position[0]<=1075);assert.ok(p.position[0]>=1000)});
test('slow rendering reduces resolution in milliseconds, not after 90 slow frames',()=>{const b=new ResolutionBudget(1);assert.equal(b.sample(400),1);for(let i=0;i<7;i++)b.sample(50);assert.equal(b.ratio,.75);for(let i=0;i<100;i++)b.sample(16);assert.equal(b.ratio,.75);for(let i=0;i<500;i++)b.sample(16);assert.equal(b.ratio,1)});
