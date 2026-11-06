import {test} from 'node:test';
import assert from 'node:assert/strict';
import {accuracyState} from '../games/botstrike/client/preferences.mjs';
import spec from '../botstrike/spec.json' with {type:'json'};
test('precision feedback distinguishes moving, landing and recoil from a steady first shot',()=>{
 const p={hero:0,position:[0,0,0],velocity:[0,0,0],landing:0,recoil:0,aim_punch:[0,0],scoped:false};
 const w=spec.weapons[2];assert.match(accuracyState(p,w),/^STEADY/);
 assert.match(accuracyState({...p,velocity:[200,0,0]},w),/^MOVING/);
 assert.match(accuracyState({...p,position:[0,.1,0]},w),/^AIRBORNE/);
 assert.match(accuracyState({...p,landing:1},w),/^LANDING/);
 assert.match(accuracyState({...p,recoil:.1},w),/^RECOIL/);
 assert.match(accuracyState({...p,aim_punch:[0,.01]},w),/^RECOIL/);
 assert.match(accuracyState(p,spec.weapons[3]),/^USE SCOPE/);
 assert.match(accuracyState({...p,scoped:true},spec.weapons[3]),/^STEADY/);
});
