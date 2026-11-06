import test from 'node:test';
import assert from 'node:assert/strict';
import {waitBrowserCondition} from './browser-condition.mjs';
test('browser wait polls resolved async results rather than Promise truthiness',async()=>{
 let calls=0;
 const page={evaluate:async(predicate,arg)=>{calls++;return predicate(arg);}};
 await waitBrowserCondition(page,async target=>calls>=target,3,{polling:1,timeout:1000});
 assert.equal(calls,3);
});
test('a false async browser condition fails instead of reporting success',async()=>{
 const page={evaluate:async predicate=>predicate()};
 await assert.rejects(waitBrowserCondition(page,async()=>false,undefined,{polling:1,timeout:5}),/timed out/);
});
