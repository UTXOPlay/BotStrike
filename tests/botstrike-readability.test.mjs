import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {assistTarget,assistStep} from '../games/botstrike/client/aim-assist.mjs';
import {loadPreferences,aimScale,scopeFov} from '../games/botstrike/client/preferences.mjs';
const make=()=>({phase:'live',utilities:[],players:[{slot:0,team:0,alive:true,position:[0,0,0]},{slot:1,team:1,alive:true,hidden:false,position:[10,0,-400]}]});
test('aim assistance only selects visible enemies, never smoke, walls or revealed targets behind cover',()=>{
 const s=make(),map={obstacles:[]};assert.equal(assistTarget(s,0,0,0,map).slot,1);
 map.obstacles.push({min:[-50,0,-200],max:[50,100,-150]});assert.equal(assistTarget(s,0,0,0,map),null);map.obstacles=[];
 s.utilities=[{kind:2,fuse:0,position:[0,0,-200]}];assert.equal(assistTarget(s,0,0,0,map),null);s.utilities=[];
 for(const change of [{hidden:true},{alive:false},{team:0},{position:[300,0,-400]}]){const q=make();Object.assign(q.players[1],change);assert.equal(assistTarget(q,0,0,0,map),null);}
 s.players[0].flash=1;assert.equal(assistTarget(s,0,0,0,map),null);
});
test('assistance is opt-in for mouse, on for touch, bounded per frame and targets the body',()=>{
 assert.equal(loadPreferences({},false).aimAssist,0);assert.equal(loadPreferences({},true).aimAssist,1);assert.equal(loadPreferences({aimAssist:0},true).aimAssist,0);
 const s=make(),t=assistTarget(s,0,0,0,{obstacles:[]});assert.ok(t.dpitch<0);const [yaw,pitch]=assistStep(t,10,2);assert.ok(Math.hypot(yaw,pitch)<=.42*.05+1e-10);assert.equal(assistTarget(s,0,0,0,{obstacles:[]},{strength:0}),null);assert.deepEqual(assistStep(null,.016),[0,0]);
});
test('rail optic has greater magnification with proportionate aim sensitivity',()=>{const p=loadPreferences({});assert.equal(scopeFov({id:'rail'}),20);assert.equal(scopeFov({id:'echo'}),38);assert.ok(aimScale(p,true,{id:'rail'})<aimScale(p,true,{id:'echo'}));});
test('shipped interface and specification contain no Chinese text',()=>{
 const files=['games/botstrike/web/index.html','botstrike/spec.json',...fs.readdirSync('games/botstrike/client').filter(n=>n.endsWith('.mjs')).map(n=>'games/botstrike/client/'+n)];for(const file of files)assert.ok(!/\p{Script=Han}/u.test(fs.readFileSync(file,'utf8')),file);
});

import {ResolutionBudget} from '../shared/game-performance.mjs';
test('first playable frame starts at a bounded render budget and can recover on fast hardware',()=>{const b=new ResolutionBudget(1.5,.75);assert.equal(b.ratio,.75);for(let i=0;i<9*60;i++)b.sample(1000/60);assert.ok(b.ratio>.75&&b.ratio<=1.5);const d=new ResolutionBudget(.5,.75);assert.equal(d.ratio,.5);});
