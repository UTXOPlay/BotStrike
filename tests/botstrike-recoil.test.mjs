import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {advanceWeaponTick,WeaponPrediction,weaponAim} from '../games/botstrike/client/weapon-recoil.mjs';
const spec=JSON.parse(readFileSync(new URL('../botstrike/spec.json',import.meta.url)));
const engine=process.env.BOTSTRIKE_TEST_ENGINE||'release/botstrike-engine';
const fields=['weapon','ammo','reserve','reload','fire_wait','burst_remaining','recoil_index','recoil_idle','shots'];
function frames(hero,controls){
 const config={map:1,mode:'deathmatch',heroes:Array(10).fill(hero),bots:Array(10).fill(false),difficulty:1,seed:2050};
 const tape=JSON.stringify({config})+'\n'+controls.map(c=>JSON.stringify({inputs:[c,...Array(9).fill(null)]})).join('\n')+'\n';
 return execFileSync(engine,[],{input:tape,maxBuffer:32e6}).toString().trim().split('\n').map(JSON.parse);
}
test('native and browser agree on every gun tick for all twelve weapons and six chassis',()=>{
 for(let hero=0;hero<6;hero++)for(let weapon=0;weapon<12;weapon++){
  const controls=Array.from({length:440},(_,t)=>({seq:t+1,yaw:.2,pitch:.1,
   weapon:t<365?weapon:2,fire:t<100||t>=345,reload:t===120||t===368}));
  const out=frames(hero,controls),p=structuredClone(out[0].state.players[0]);
  assert.ok(Array.isArray(p.aim_punch),'Rebuild the tactical engine before this test');
  for(let t=0;t<controls.length;t++){
   const shot=advanceWeaponTick(p,controls[t],spec.weapons),native=out[t+1].state.players[0],context=`hero=${hero} weapon=${weapon} tick=${t}`;
   for(const field of fields)assert.deepEqual(p[field],native[field],context+' '+field);
   assert.ok(Math.abs(p.recoil-native.recoil)<1e-12,context+' dispersion');
   assert.ok(p.aim_punch.every((v,a)=>Math.abs(v-native.aim_punch[a])<1e-12),context+' aim punch');
   assert.equal(!!shot,out[t+1].state.events.some(e=>e.kind==='shot'&&e.actor===0),context+' emitted shot');
  }
 }
});
test('prediction is frame-rate independent and replay reconciliation emits no duplicate shots',()=>{
 const out=frames(0,[{seq:1}]),initial=out[0].state.players[0];
 const timelines=[Array(300).fill(1000/30),Array(600).fill(1000/60),Array(1200).fill(1000/120),Array.from({length:1000},(_,i)=>[7,13,9,11][i%4])];
 const results=[];
 for(const timeline of timelines){
  const pred=new WeaponPrediction(spec.weapons);pred.reset(initial,0);let time=0,shots=0;
  for(const dt of timeline){time+=dt;pred.step({yaw:0,pitch:0,fire:true},time,true,()=>shots++);}
  results.push({shots,ammo:pred.state.ammo,recoil:pred.state.recoil,punch:pred.state.aim_punch});
  pred.record({seq:10,yaw:0,pitch:0,fire:true},time-20);pred.reconcile({...initial,last_seq:9},time,true);
  assert.equal(shots,results.at(-1).shots,'replay must not present shots again');
  pred.reset({...initial,life:initial.life+1},time);assert.deepEqual(pred.state.aim_punch,[0,0]);
 }
 for(const r of results)assert.deepEqual(r,results[0]);
});
test('predicted recoil preserves burst cadence and native fire-rate effects',()=>{
 for(const weapon of [0,2,5,7])for(const hero of [0,5])for(const overclock of [0,120]){
  const initial=frames(hero,[{seq:1}])[0].state.players[0];initial.weapon=weapon;initial.overclock=overclock;initial.effect=hero===5?120:0;
  const shots=[];
  for(let tick=0;tick<80;tick++)if(advanceWeaponTick(initial,{yaw:0,pitch:0,fire:tick===0},spec.weapons))shots.push(tick);
  assert.equal(shots.length,spec.weapons[weapon].burst);
  if(shots.length>1){const interval=spec.weapons[weapon].burst_interval,expected=hero===5||overclock?Math.floor(interval*2/3):interval;assert.deepEqual(shots,[0,expected,expected*2]);}
 }
});
test('a pending single-click fires once across a long frame and aim clamps at pitch limits',()=>{
 const initial=frames(0,[{seq:1}])[0].state.players[0],pred=new WeaponPrediction(spec.weapons);pred.reset(initial,0);
 pred.record({seq:2,yaw:0,pitch:0,fire:true},1);let shots=0;
 pred.step({yaw:0,pitch:0,fire:false},200,true,()=>shots++);assert.equal(shots,1);
 assert.deepEqual(weaponAim(.1,1.49,[.2,.3]),[.1+.2,1.5]);
});

test('snapshot replays never present the same life and shot number twice',()=>{
 const initial=frames(0,[{seq:1}])[0].state.players[0],pred=new WeaponPrediction(spec.weapons);pred.reset(initial,0);const numbers=[];
 const input={seq:2,yaw:0,pitch:0,fire:true};pred.record(input,1);
 pred.step(input,100,true,s=>numbers.push(s.number));
 pred.reconcile({...initial,last_seq:1},100,true);
 pred.step(input,200,true,s=>numbers.push(s.number));
 assert.equal(new Set(numbers).size,numbers.length);assert.ok(numbers.length>0);
});
