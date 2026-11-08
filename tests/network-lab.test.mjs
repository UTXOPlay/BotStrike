import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeDirection,netemArguments} from '../tools/network-lab.mjs';

test('directional netem configuration keeps explicit seed, delay/jitter, queue, rate and packet-loss semantics',()=>{
 assert.deepEqual(netemArguments({delayMs:15,jitterMs:3,lossPct:2,bandwidthKbit:512,seed:42,limitPackets:200}),['limit','200','delay','15ms','3ms','distribution','normal','loss','random','2%','rate','512kbit','seed','42']);
 assert.deepEqual(netemArguments({burstLoss:{p:1,r:30,badLoss:100,goodLoss:0},seed:99}),['limit','1000','loss','gemodel','1%','30%','100%','0%','seed','99']);
 const baseline=normalizeDirection();assert.equal(baseline.lossPct,0);assert.equal(baseline.delayMs,0);assert.equal(baseline.seed,2050);assert.equal(baseline.limitPackets,1000);
});
test('unsafe, excessive or ambiguous shaper inputs are rejected before a Docker/tc mutation',()=>{
 for(const input of [null,[],{unexpected:1},{delayMs:'10; touch /tmp/x'},{delayMs:-1},{delayMs:60001},{jitterMs:1},{lossPct:100.1},{lossPct:NaN},{bandwidthKbit:0},{bandwidthKbit:Infinity},{seed:0},{seed:1.2},{seed:2**32},{limitPackets:100001},{lossPct:1,burstLoss:{p:1,r:1,badLoss:100,goodLoss:0}},{burstLoss:{p:1,r:1,badLoss:100,goodLoss:0,extra:1}}])assert.throws(()=>normalizeDirection(input));
});
