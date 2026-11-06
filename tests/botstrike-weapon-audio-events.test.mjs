import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {weaponAudioEvents,weaponAudioPolicy,EmptyPull} from '../shared/weapon-audio-events.mjs';
import {frameEvents} from '../botstrike-service/feedback.mjs';
const spec=JSON.parse(readFileSync(new URL('../botstrike/spec.json',import.meta.url)));
const player=()=>({slot:0,alive:true,life:1,weapon:2,owned:Array(12).fill(true),ammo:Array(12).fill(0),reload:0});
const state=p=>({phase:'live',players:[p]});
test('all twelve native reloads emit each stage once, and interruptions never synthesize completion',()=>{
 for(let weapon=0;weapon<12;weapon++){
  let previous=player();previous.weapon=weapon;const seen=[];
  for(let remaining=spec.weapons[weapon].reload;remaining>=0;remaining--){const current={...previous,reload:remaining,ammo:[...previous.ammo]};if(!remaining)current.ammo[weapon]=spec.weapons[weapon].magazine;seen.push(...weaponAudioEvents(state(current),state(previous),spec).map(e=>e.kind));previous=current;}
  assert.deepEqual(seen,['reload','reload_feed','reload_close']);
  const before={...player(),weapon,reload:20};assert.deepEqual(weaponAudioEvents(state({...before,reload:0}),state(before),spec),[]);
  assert.deepEqual(weaponAudioEvents(state({...before,reload:0,life:2}),state(before),spec),[]);
 }
});
test('switching cancels old reload progression and begins only an owned active equip',()=>{
 const old={...player(),reload:80},p={...player(),weapon:3};assert.deepEqual(weaponAudioEvents(state(p),state(old),spec),[{kind:'equip',actor:0,value:3}]);
 p.owned[3]=false;assert.deepEqual(weaponAudioEvents(state(p),state(old),spec),[]);p.alive=false;assert.deepEqual(weaponAudioEvents(state(p),state(old),spec),[]);
});
test('dry click is local intent once per pull, never a shot or an unarmed/reload cue',()=>{
 const edge=new EmptyPull(),p=player();assert.equal(edge.update(p,{fire:true}),2);assert.equal(edge.update(p,{fire:true}),null);edge.update(p,{fire:false});assert.equal(edge.update({...p,reload:20},{fire:true}),null);
 edge.reset();p.owned[2]=false;assert.equal(edge.update(p,{fire:true}),null);p.owned[2]=true;edge.reset();assert.equal(edge.update(p,{fire:true},false),null);
 edge.reset();p.ammo[2]=1;assert.equal(edge.update(p,{fire:true}),null);p.ammo[2]=0;assert.equal(edge.update(p,{fire:true}),null);edge.update(p,{fire:false});assert.equal(edge.update(p,{fire:true}),2);
});

test('completion is retained when a held shot immediately spends the final replenished round',()=>{
 const old={...player(),reload:1,shots:10};old.ammo[2]=29;
 const current={...old,reload:0,shots:11,ammo:[...old.ammo]};current.ammo[2]=29;
 assert.deepEqual(weaponAudioEvents(state(current),state(old),spec),[{kind:'reload_close',actor:0,value:2}]);
 current.ammo[2]=28;assert.deepEqual(weaponAudioEvents(state(current),state(old),spec),[]);
});
test('the replenishment close precedes the held shot while native shot/hit ordering is preserved',()=>{
 const old={...player(),hero:0,reload:1,shots:10,position:[0,0,0],velocity:[0,0,0],yaw:0};old.ammo[2]=29;
 const p={...old,reload:0,shots:11,ammo:[...old.ammo]},previous={tick:9,phase:'live',config:{map:0},players:[old],events:[]},current={...previous,tick:10,players:[p],events:[{kind:'shot',actor:0,value:2},{kind:'hit',actor:0,target:1,value:20}]};
 assert.deepEqual(frameEvents(current,previous,spec).map(e=>e.kind),['reload_close','shot','hit']);
});
test('holding fire through a weapon/life change cannot create a second dry pull or click the outgoing gun',()=>{
 const edge=new EmptyPull(),p=player();assert.equal(edge.update(p,{fire:true}),2);p.weapon=3;assert.equal(edge.update(p,{fire:true}),null);p.life++;assert.equal(edge.update(p,{fire:true}),null);edge.update(p,{fire:false});assert.equal(edge.update(p,{fire:true}),3);
 edge.reset();assert.equal(edge.update(p,{fire:true,weapon:4}),null);p.weapon=4;assert.equal(edge.update(p,{fire:true}),null);edge.update(p,{fire:false});assert.equal(edge.update(p,{fire:true}),4);
});
