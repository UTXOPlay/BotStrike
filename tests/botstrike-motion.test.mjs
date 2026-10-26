import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {constrain,velocity} from '../games/botstrike/client/motion.mjs';
const spec=JSON.parse(readFileSync(new URL('../botstrike/spec.json',import.meta.url)));
test('browser movement and collision match native trajectories on every map and hero',{skip:!existsSync('release/botstrike-engine')},()=>{
 for(let map=0;map<3;map++)for(let hero=0;hero<6;hero++)for(const weapon of [2,7,9,11]){
  const config={map,mode:'deathmatch',heroes:Array(10).fill(hero),bots:Array(10).fill(false),difficulty:1,seed:2050};const controls={x:.7,y:1,yaw:hero%2?-.25:0,pitch:0,crouch:hero===2,walk:hero===1,scope:spec.weapons[weapon].scoped,weapon};const frame=JSON.stringify({inputs:[controls,...Array(9).fill(null)]})+'\n';
  const lines=execFileSync('release/botstrike-engine',[],{input:JSON.stringify({config})+'\n'+frame.repeat(180),maxBuffer:8e6}).toString().trim().split('\n').map(JSON.parse);const final=lines.at(-2).state.players[0];const p=[...spec.maps[map].spawns[0][0]],v=velocity(controls,spec.heroes[hero],spec.weapons[controls.weapon]);for(let tick=0;tick<180;tick++){p[0]+=v[0]/64;p[2]+=v[2]/64;constrain(p,spec.maps[map])}assert.ok(p.every((n,i)=>Math.abs(n-final.position[i])<1e-7),JSON.stringify({map,hero,weapon,p,native:final.position}));
 }
});

test('predicted jump and landing follow native gravity and held-button edges',async()=>{const {advanceMotion}=await import('../games/botstrike/client/prediction.mjs');const map=1,hero=2,weapon=2,config={map,mode:'deathmatch',heroes:Array(10).fill(hero),bots:Array(10).fill(false),difficulty:1,seed:2050};const controls=Array.from({length:180},(_,i)=>({seq:i+1,x:.3,y:.2,yaw:.3,pitch:0,jump:i<25||i>=90&&i<115,weapon}));const lines=execFileSync('release/botstrike-engine',[],{input:JSON.stringify({config})+'\n'+controls.map(c=>JSON.stringify({inputs:[c,...Array(9).fill(null)]})+'\n').join(''),maxBuffer:8e6}).toString().trim().split('\n').map(JSON.parse).filter(v=>v.type==='frame');const visual={position:[...spec.maps[map].spawns[0][0]],vy:0,jumpHeld:false};for(let tick=0;tick<180;tick++){advanceMotion(visual,controls[tick],1/64,spec.maps[map],spec.heroes[hero],spec.weapons[weapon]);assert.ok(visual.position.every((v,i)=>Math.abs(v-lines[tick].state.players[0].position[i])<1e-7),String(tick));}});
