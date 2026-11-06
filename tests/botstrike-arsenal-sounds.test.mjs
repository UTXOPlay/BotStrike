import test from 'node:test';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';import {readFileSync} from 'node:fs';
import {makeShotSample} from '../games/botstrike/client/shot-sound.mjs';import {makeShotSample as frozen} from '../tools/audio-baseline-v5/shot-sound.mjs';
import {makeWeaponActionSample,weaponActionKinds} from '../games/botstrike/client/weapon-action-sound.mjs';
const hash=b=>createHash('sha256').update(new Uint8Array(b.buffer)).digest('hex');
test('all twelve procedural shots are bounded deterministic distinct buffers; original five are preserved',()=>{
 for(const rate of [44100,48000]){const hashes=[];for(let w=0;w<12;w++){const a=makeShotSample(w,rate);assert.ok(a.every(Number.isFinite));assert.ok(a.every(x=>Math.abs(x)<=.861));assert.deepEqual(a,makeShotSample(w,rate));if(w<5)assert.deepEqual(a,frozen(w,rate));hashes.push(hash(a));}assert.equal(new Set(hashes).size,12);}
});
test('every weapon has bounded reload phases, equip and single-pull dry clicks',()=>{
 for(const rate of [44100,48000]){const hashes=[];let bytes=0;for(let w=0;w<12;w++)for(const kind of weaponActionKinds){const a=makeWeaponActionSample(kind,w,rate);assert.ok(a.length<=rate*.131);assert.ok(a.every(x=>Number.isFinite(x)&&Math.abs(x)<=.551));assert.deepEqual(a,makeWeaponActionSample(kind,w,rate));hashes.push(hash(a));bytes+=a.byteLength;}assert.equal(new Set(hashes).size,60);assert.ok(bytes<2e6);}
 assert.equal(makeWeaponActionSample('other',0),null);assert.equal(makeWeaponActionSample('empty',12),null);
});
