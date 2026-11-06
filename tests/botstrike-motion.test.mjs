import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {advanceMotion} from '../games/botstrike/client/prediction.mjs';
const spec=JSON.parse(readFileSync(new URL('../botstrike/spec.json',import.meta.url)));
const engine=process.env.BOTSTRIKE_TEST_ENGINE||'release/botstrike-engine';
function trace(map,hero,weapon,controls){
 const config={map,mode:'deathmatch',heroes:Array(10).fill(hero),bots:Array(10).fill(false),difficulty:1,seed:2050};
 const out=execFileSync(engine,[],{input:JSON.stringify({config})+'\n'+controls.map(c=>JSON.stringify({inputs:[{...c,weapon},...Array(9).fill(null)]})).join('\n')+'\n',maxBuffer:32e6}).toString().trim().split('\n').map(JSON.parse);
 return {initial:out[0].state.players[0],frames:out.filter(v=>v.type==='frame')};
}
test('fixed-step browser motion matches every native tick on all maps, chassis and weapons',()=>{
 for(let map=0;map<3;map++)for(let hero=0;hero<6;hero++)for(let weapon=0;weapon<12;weapon++){
  const controls=Array.from({length:360},(_,t)=>({seq:t+1,x:t>=140&&t<176?.7:0,
   y:t<40||t>=72&&t<112||t>=176&&t<256?1:t>=112&&t<140?-1:0,
   yaw:hero%2?-.25:0,pitch:0,crouch:t>=176&&t<200,walk:t>=200&&t<225,
   scope:t>=225&&t<256,jump:t>=256&&t<280||t>=330&&t<350}));
  const {initial,frames}=trace(map,hero,weapon,controls),visual={position:[...initial.position],velocity:[...initial.velocity],vy:0,jumpHeld:false};
  for(let tick=0;tick<controls.length;tick++){
   advanceMotion(visual,controls[tick],1/64,spec.maps[map],spec.heroes[hero],spec.weapons[weapon]);
   const p=frames[tick].state.players[0],context=JSON.stringify({map,hero,weapon,tick});
   assert.ok(visual.position.every((v,a)=>Math.abs(v-p.position[a])<1e-7),context+' position');
   assert.ok([0,2].every(a=>Math.abs(visual.velocity[a]-p.velocity[a])<1e-7),context+' velocity');
   assert.equal(visual.landing,p.landing,context+' landing recovery');assert.ok(Math.abs(visual.stance-p.stance)<1e-12,context+' native stance');
  }
 }
});
test('30/60/120 Hz and jitter integrate the same acceleration, jump, boundary and stop ticks',()=>{
 const map={extent:130,obstacles:[]},hero=spec.heroes[0],weapon=spec.weapons[2];
 const paths=[Array(300).fill(1000/30),Array(600).fill(1000/60),Array(1200).fill(1000/120),Array.from({length:1000},(_,i)=>[7,13,9,11][i%4])];
 const results=[];
 for(const timeline of paths){const state={position:[0,0,0],velocity:[0,0,0],vy:0,jumpHeld:false};
  for(const dt of timeline)advanceMotion(state,{x:1,y:1,yaw:0,jump:true},dt/1000,map,hero,weapon);
  results.push({position:state.position,velocity:state.velocity,vy:state.vy,landing:state.landing,jumpHeld:state.jumpHeld});
 }
 for(const result of results)assert.deepEqual(result,results[0]);
 assert.ok(results[0].position.every(Number.isFinite));assert.ok(results[0].position[0]<=110);assert.equal(results[0].velocity[0],0);assert.equal(results[0].position[1],0);
});
