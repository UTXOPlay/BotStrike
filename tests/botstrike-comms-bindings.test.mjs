import test from 'node:test';import assert from 'node:assert/strict';import {bindings,loadPreferences,validBinding} from '../games/botstrike/client/preferences.mjs';
test('legacy controls retain every existing binding when new communication keys collide',()=>{
 const old={...bindings,flash:'KeyV',crouch:'Mouse1'};delete old.comms;delete old.ping;
 const next=loadPreferences({bindings:old}).bindings;for(const [action,key]of Object.entries(old))assert.equal(next[action],key);
 assert.ok(validBinding(next.comms)&&validBinding(next.ping));assert.equal(new Set(Object.values(next)).size,Object.keys(bindings).length);assert.notEqual(next.comms,'KeyV');assert.notEqual(next.ping,'Mouse1');
});
