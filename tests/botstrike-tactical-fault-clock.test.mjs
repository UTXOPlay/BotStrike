// Pure cross-namespace clock contract guards; no Docker, Native or fault run.
import test from 'node:test';
import assert from 'node:assert/strict';
import {parseZeroTimeOffsets,assertClockBracket} from './run-botstrike-tactical-fault-completion.mjs';

const zero='monotonic           0         0\nboottime            0         0\n';
test('zero offsets normalize both clocks without requiring namespace inode identity',()=>{
 assert.deepEqual(parseZeroTimeOffsets(zero),{monotonic:{seconds:0,nanoseconds:0},boottime:{seconds:0,nanoseconds:0}});
 assert.deepEqual(parseZeroTimeOffsets(' boottime\t0 0\n monotonic 0 0\n'),parseZeroTimeOffsets(zero));
});
test('nonzero monotonic or boottime offsets never enter the shared-clock cohort',()=>{
 for(const text of ['monotonic 1 0\nboottime 0 0','monotonic 0 1\nboottime 0 0','monotonic 0 0\nboottime -1 0','monotonic 0 0\nboottime 0 1','monotonic -1 999999999\nboottime 0 0'])assert.throws(()=>parseZeroTimeOffsets(text),/offset must be zero/);
});
test('missing, duplicate, malformed and unknown clock records fail closed',()=>{
 for(const text of ['', 'monotonic 0 0', 'boottime 0 0', zero+'monotonic 0 0\n', 'monotonic 0 0\nrealtime 0 0', 'monotonic 0\nboottime 0 0', 'monotonic 0 0 extra\nboottime 0 0', 'monotonic 0.0 0\nboottime 0 0', 'monotonic 0 -1\nboottime 0 0', 'monotonic 0 1000000000\nboottime 0 0', 'x'.repeat(4097)])assert.throws(()=>parseZeroTimeOffsets(text));
 for(const value of [null,undefined,{},[]])assert.throws(()=>parseZeroTimeOffsets(value));
});
test('actual container hrtime must be inside its own host bracket with no timing tolerance',()=>{
 assert.doesNotThrow(()=>assertClockBracket('101','100','102'));
 assert.doesNotThrow(()=>assertClockBracket('100','100','100'));
 for(const values of [['99','100','102'],['103','100','102'],['101','102','100'],['101.1','100','102'],['-1','0','102'],['101',100,'102']])assert.throws(()=>assertClockBracket(...values));
});
