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
