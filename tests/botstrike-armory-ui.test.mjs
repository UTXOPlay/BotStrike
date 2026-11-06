import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {purchaseHint} from '../games/botstrike/client/armory-interface.mjs';
import {teamForecast,teamForecastRows} from '../games/botstrike/client/tactical-view.mjs';

const spec=JSON.parse(readFileSync(new URL('../botstrike/spec.json',import.meta.url),'utf8'));
const weapon=index=>({...spec.weapons[index],kind:'weapon',index});
const equipment=index=>({...spec.items[index],kind:'equipment',index});
function player(overrides={}){
 return {slot:0,team:0,weapon:0,credits:spec.economy.start,armor:0,
  owned:spec.weapons.map((_,i)=>i===0),ammo:spec.weapons.map(w=>w.magazine),
  reserve:spec.weapons.map(w=>w.reserve),items:spec.items.map(()=>0),...overrides};
}
function match(){
 return {round:2,loss_streak:[2,0],players:Array.from({length:10},(_,slot)=>player({slot,team:slot<5?0:1,credits:1000+slot*100,armor:slot*7}))};
}
function assertLegacyForecastAgreement(state,slot){
 const text=teamForecast(state,slot,spec),rows=teamForecastRows(state,slot,spec);
 for(const row of rows){
  const line=text.split('\n').find(value=>value.startsWith(`PILOT ${row.slot+1} ·`));
  assert.ok(line,'Every visible squad card has a corresponding forecast');
  if(row.halfReset){
   const amount=/HALF RESET (\d+)$/.exec(line);
   assert.ok(amount);assert.equal(row.nextWin,Number(amount[1]));assert.equal(row.nextLoss,Number(amount[1]));
  }else{
   const amounts=/NEXT WIN (\d+) \/ LOSS (\d+)$/.exec(line);
   assert.ok(amounts);assert.equal(row.nextWin,Number(amounts[1]));assert.equal(row.nextLoss,Number(amounts[2]));
  }
 }
 return rows;
}

test('catalog distinguishes a full loadout from an unaffordable purchase and explains the shortfall',()=>{
 const p=player({credits:0,armor:100});p.items[1]=spec.items[1].capacity;
 const armor=purchaseHint(equipment(0),p,'buy',true),flash=purchaseHint(equipment(1),p,'buy',true);
 assert.equal(armor.state,'stocked');assert.match(armor.detail,/armor is full/i);
 assert.equal(flash.state,'stocked');assert.match(flash.detail,new RegExp(`${spec.items[1].capacity} / ${spec.items[1].capacity} carried`));
 p.items[1]--;
 const shortage=purchaseHint(equipment(1),p,'buy',true);
 assert.equal(shortage.state,'unaffordable');assert.match(shortage.label,/insufficient credits/i);assert.match(shortage.detail,new RegExp(`Need ₡ ${spec.items[1].cost} more`));
 p.credits=spec.weapons[2].cost-1;
 assert.equal(purchaseHint(weapon(2),p,'buy',true).state,'unaffordable');
 assert.match(purchaseHint(weapon(2),p,'buy',true).detail,/Need ₡ 1 more/);
 p.credits=spec.weapons[2].cost+73;
 const affordable=purchaseHint(weapon(2),p,'buy',true);
 assert.equal(affordable.state,'available');assert.match(affordable.detail,/After purchase: ₡ 73/);
});

test('Tactical empty sidearm slot never advertises a free ARC reissue',()=>{
 const p=player({credits:spec.economy.cap});p.owned[0]=false;p.ammo[0]=0;p.reserve[0]=0;
 assert.equal(spec.weapons[0].cost,0,'This protects the existing zero-priced casual sidearm');
 for(const phase of ['buy','live','round_end']){
  const hint=purchaseHint(weapon(0),p,phase,true);
  assert.equal(hint.state,'restricted');assert.match(hint.label,/recovery only/i);
  assert.match(hint.detail,/death or half reset/i);assert.match(hint.detail,/pick up/i);
  assert.doesNotMatch(hint.detail,/after purchase|free buy/i);
 }
 assert.equal(purchaseHint(weapon(0),p,'buy',false).state,'available','Casual keeps its original purchasing policy');
});

test('owned weapon cards show actual remaining ammunition instead of capacity or a fresh purchase promise',()=>{
 const p=player({weapon:2,credits:0});p.owned[2]=true;p.ammo[2]=3;p.reserve[2]=11;
 const active=purchaseHint(weapon(2),p,'live',true);
 assert.equal(active.state,'equipped');assert.match(active.detail,/^3 in magazine · 11 reserve$/);
 assert.notEqual(p.ammo[2],spec.weapons[2].magazine);assert.notEqual(p.reserve[2],spec.weapons[2].reserve);
 p.weapon=0;p.ammo[2]=0;p.reserve[2]=0;
 const stored=purchaseHint(weapon(2),p,'buy',true);
 assert.equal(stored.state,'owned');assert.match(stored.detail,/^0 in magazine · 0 reserve$/);
 assert.doesNotMatch(stored.detail,/after purchase/i);
});

test('squad budget cards never inspect or include the other team private budget or loadout',()=>{
 for(const slot of [0,5]){
  const state=match(),team=state.players[slot].team;
  for(const p of state.players.filter(p=>p.team!==team))for(const field of ['credits','armor','owned']){
   Object.defineProperty(p,field,{get(){throw Error('Read unauthorized enemy '+field);}});
  }
  const rows=assertLegacyForecastAgreement(state,slot);
  assert.deepEqual(rows.map(r=>r.slot),team===0?[0,1,2,3,4]:[5,6,7,8,9]);
  assert.ok(rows.every(r=>Number.isFinite(r.credits)&&Number.isFinite(r.nextWin)&&Number.isFinite(r.nextLoss)));
 }
});

test('normal, capped and halftime card numbers agree with the existing source-derived team forecast',()=>{
 const state=match();let rows=assertLegacyForecastAgreement(state,0);
 assert.equal(rows[0].nextWin,1000+spec.economy.win);
 assert.equal(rows[0].nextLoss,1000+spec.economy.loss[2]);
 state.loss_streak[0]=100;
 for(const p of state.players.filter(p=>p.team===0))p.credits=spec.economy.cap-1;
 rows=assertLegacyForecastAgreement(state,0);
 assert.ok(rows.every(r=>!r.halfReset&&r.nextWin===spec.economy.cap&&r.nextLoss===spec.economy.cap));
 state.round=12;rows=assertLegacyForecastAgreement(state,0);
 assert.ok(rows.every(r=>r.halfReset&&r.nextWin===spec.economy.start&&r.nextLoss===spec.economy.start));
});
