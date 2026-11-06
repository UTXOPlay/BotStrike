import test from 'node:test';
import assert from 'node:assert/strict';
import {practiceHudMetrics,practiceAnnouncement,practiceSummary} from '../games/botstrike/client/practice.mjs';

const sample={attempt:2,shots:1,hits:6,headshots:2,damage:55,kills:1,movement_errors:3,scope_errors:4,outcome:null,settings:{drill:0}};
test('compact practice counters keep pellet impacts distinct from rounds and never invent accuracy',()=>{
 const rows=practiceHudMetrics(sample);
 assert.equal(rows.find(r=>r.key==='impacts').value,6);
 assert.equal(rows.find(r=>r.key==='damage').value,55);
 assert.ok(rows.every(r=>!r.label.includes('%')&&!String(r.value).includes('%')));
 assert.match(practiceSummary(sample),/1 rounds · 6 damaging impacts/);
});
test('practice HUD exposes the error relevant to the selected drill without discarding authoritative counts',()=>{
 const values=drill=>practiceHudMetrics({...sample,settings:{drill}});
 assert.equal(values(1).find(r=>r.key==='rounds').value,1);
 assert.equal(values(2).find(r=>r.key==='moving').value,3);
 assert.equal(values(3).find(r=>r.key==='unscoped').value,4);
 for(const drill of [5,6,7])assert.equal(values(drill).find(r=>r.key==='kills').value,1);
 for(let drill=0;drill<8;drill++)assert.equal(values(drill).length,2);
});
test('training live announcement changes at attempt or outcome boundaries, not on every shot or frame',()=>{
 const message=practiceAnnouncement(sample);
 assert.equal(practiceAnnouncement({...sample,shots:20,hits:100,damage:900}),message);
 assert.notEqual(practiceAnnouncement({...sample,attempt:3}),message);
 assert.notEqual(practiceAnnouncement({...sample,outcome:'defused'}),message);
});
