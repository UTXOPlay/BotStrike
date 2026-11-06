import {test} from 'node:test';
import assert from 'node:assert/strict';
import {safeInput,neutral,pack} from '../botstrike-service/server.mjs';
import {tacticalOptions,lobbyHeroes,requireTacticalStart,bindPurchase} from '../botstrike-service/tactical.mjs';
test('tactical requires explicit private demolition and ten ready connected seats',()=>{
 for(const b of [{kind:'public',mode:'demolition',ruleset:'tactical'},{kind:'private',mode:'deathmatch',ruleset:'tactical'},{kind:'private',mode:'demolition',ruleset:'ranked'}])assert.throws(()=>tacticalOptions(b));
 tacticalOptions({kind:'private',mode:'demolition',ruleset:'tactical'});
 const room={kind:'private',config:{mode:'demolition',ruleset:'tactical'},members:Array.from({length:10},(_,i)=>String(i)),ready:{}};
 assert.throws(()=>requireTacticalStart(room,()=>true));room.ready=Object.fromEntries(room.members.map(id=>[id,true]));requireTacticalStart(room,()=>true);
 assert.throws(()=>requireTacticalStart(room,id=>id!=='9'));room.members[9]='bot-9';assert.throws(()=>requireTacticalStart(room,()=>true));
});
test('human selections displace placeholders but cannot duplicate a squad chassis',()=>{
 const members=['a','b','bot-2','bot-3','bot-4','c','bot-6','bot-7','bot-8','bot-9'],config={heroes:[0,1,2,3,4,0,1,2,3,4]};
 const heroes=lobbyHeroes(config,members,0,2);assert.equal(heroes[0],2);assert.equal(heroes[1],1);assert.equal(new Set(heroes.slice(0,5)).size,5);assert.deepEqual(heroes.slice(5),config.heroes.slice(5));
 assert.throws(()=>lobbyHeroes(config,members,0,1));assert.deepEqual(config.heroes,[0,1,2,3,4,0,1,2,3,4]);
});
test('drop and life are bounded recorded actions with old casual input compatibility',()=>{
 const old=neutral();delete old.drop;assert.equal(safeInput(old).drop,false);
 for(const value of [{action_life:0},{action_life:32},{action_life:'1'},{drop:1}])assert.throws(()=>safeInput({...neutral(),...value}));
 const input=safeInput({...neutral(),drop:true,action_life:31});const tape=pack({...input,takeover:true});assert.equal(tape[5],31*1024+512+256);
});
test('fresh purchase cannot reauthorize stale drops, grenades or firing',()=>{
 const old={...neutral(),action_life:1,takeover:true,fire:true,drop:true,interact:true,ability:true,item:3,weapon:2};
 bindPurchase(old,{item:4,life:2},2,true);assert.equal(old.action_life,2);assert.equal(old.buy,4);assert.equal(old.item,0);assert.equal(old.weapon,undefined);assert.equal(old.fire,false);assert.equal(old.drop,false);
 const current={...neutral(),action_life:2};bindPurchase(current,{item:4,life:1},2,true);assert.equal(current.buy,undefined);
});

test('team forecast derives rewards and replacement from source and entitled squad only',async()=>{
 const {readFileSync}=await import('node:fs'),spec=JSON.parse(readFileSync(new URL('../botstrike/spec.json',import.meta.url)));
 const {replacementText,teamForecast}=await import('../games/botstrike/client/tactical-view.mjs');
 const owned=Array(12).fill(false);owned[0]=true;owned[2]=true;
 assert.match(replacementText(spec,owned,3),/PRIMARY · REPLACES ION/);
 const state={round:2,loss_streak:[2,0],players:[{slot:0,team:0,owned,armor:43,credits:1000},{slot:5,team:1,credits:9999}]};
 const text=teamForecast(state,0,spec);assert.match(text,/WIN 4250 \/ LOSS 3500/);assert.doesNotMatch(text,/9999|PILOT 6/);
 state.round=12;assert.match(teamForecast(state,0,spec),/HALF RESET 800/);
});
