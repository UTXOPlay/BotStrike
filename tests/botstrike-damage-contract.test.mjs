import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {indexDamage,damageRow,damageSourceName} from '../games/botstrike/client/damage-guide.mjs';
import {modelDigest} from '../tools/damage-contract-source.mjs';
const matrix=JSON.parse(readFileSync('games/botstrike/web/damage-contract.json'));
const spec=JSON.parse(readFileSync('botstrike/spec.json'));
test('published damage guide is bound to the current native sources and complete for the selected controls',()=>{
 assert.equal(matrix.model_sha256,modelDigest());assert.equal(matrix.rows.length,6048);
 const index=indexDamage(matrix,spec.version);
 for(let weapon=0;weapon<12;weapon++)for(let hero=0;hero<6;hero++)for(const armor of [0,spec.heroes[hero].armor,100])for(const distance of [100,600,1500,3000])for(const head of [false,true])for(const shield of hero===2?[false,true]:[false])for(const boost of [0,1,2]){
  const row=damageRow(index,{weapon,hero,armor,distance,head,shield,boost});assert.ok(row);
  assert.ok(row.first_health_damage>0&&row.first_health_damage<=spec.heroes[hero].health);assert.ok(row.first_armor_damage>=0&&row.first_armor_damage<=armor);
  assert.ok(row.rounds<=spec.weapons[weapon].magazine+spec.weapons[weapon].reserve);
 }
});
test('native generated data explains an instant ideal pellet kill, burst timing, reload and EMP shield break',()=>{
 const index=indexDamage(matrix,spec.version),get=overrides=>damageRow(index,{weapon:5,hero:1,armor:0,distance:100,head:false,shield:false,boost:0,...overrides});
 assert.equal(get({weapon:3,head:true}).rounds,1);assert.equal(get({weapon:3,head:true}).ttk_ticks,0);
 assert.equal(get({weapon:4}).rounds,1);assert.equal(get({weapon:4}).ttk_ticks,0);
 const burst=get({});assert.equal(burst.rounds,5);assert.equal(burst.ttk_ticks,spec.weapons[5].burst_interval*3+spec.weapons[5].interval);
 const slow=get({weapon:11,hero:2,armor:100,distance:3000,shield:true});assert.ok(slow.reloads>0&&slow.ttk_ticks>320);
 const emp=get({weapon:8,hero:2,armor:100,shield:true}),noShield=get({weapon:8,hero:2,armor:100});assert.ok(emp.rounds<=noShield.rounds+1);
 assert.throws(()=>indexDamage(matrix,'old-rule-version'));
});

test('damage explanations distinguish equipment and splash from the equipped gun',()=>{
 assert.equal(damageSourceName({kind:'utility',id:3},spec,2),spec.items[3].name);
 assert.equal(damageSourceName({kind:'splash',id:11},spec,0),spec.weapons[11].name+' splash');
 assert.equal(damageSourceName({kind:'other'},spec,3),'Combat damage');
});
