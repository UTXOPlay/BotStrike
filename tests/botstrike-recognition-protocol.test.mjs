import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {trials,summarize,lane,visionMatrices} from '../tools/recognition-protocol.mjs';
test('recognition schedule is repeatable, bounded and covers each chassis/relation/map pair twice',()=>{
 const a=trials();assert.equal(a.length,72);assert.deepEqual(a,trials());assert.notDeepEqual(a,trials(2051));
 for(let hero=0;hero<6;hero++)for(let map=0;map<3;map++)for(const relation of ['ally','enemy'])assert.equal(a.filter(t=>t.hero===hero&&t.map===map&&t.relation===relation).length,2);
 for(const key of Object.keys(visionMatrices))assert.ok(a.some(t=>t.vision===key));
 assert.equal(trials(0,4).length,144);assert.throws(()=>trials(-1));assert.throws(()=>trials(0,100));
});
test('recognition metrics retain timeouts and invalid trials with real per-condition counts',()=>{
 const trial=trials()[0],row={trial,input:'mouse',viewport:[1920,1080]};
 const result=summarize([{...row,answer:trial.expected,ms:200},{...row,answer:'timeout',ms:null},{...row,answer:trial.expected,ms:100,invalid:'resized'}]);
 assert.deepEqual(result.total,{attempted:3,n:2,invalid:1,correct:1,accuracy:.5,timeouts:1,correctReactionMedianMs:200,correctReactionP95Ms:200});
 assert.equal(result.by.viewport['1920x1080'].n,2);assert.equal(summarize([]).total.accuracy,null);
});
test('native-box-clear study lanes exist for every combat map and reference distance',()=>{
 const spec=JSON.parse(readFileSync(new URL('../botstrike/spec.json',import.meta.url)));
 for(const map of spec.maps.slice(0,3))for(const distance of [300,600,1200]){
  const pose=lane(map,distance);assert.ok(pose,map.id+' '+distance);assert.ok(Math.abs(Math.hypot(pose.origin[0]-pose.target[0],pose.origin[2]-pose.target[2])-distance)<1e-9);
 }
});
