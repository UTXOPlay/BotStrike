import test from 'node:test';import assert from 'node:assert/strict';import {CommsInbox} from '../games/botstrike/client/comms-inbox.mjs';
const fixture=()=>({id:'room-a',status:'running',state:{tick:10,phase:'live'},comms:{revision:0,events:[],muted:[]}});
const event=(id='a',tick=11)=>({id,sender:1,kind:'mark',position:[0,0,0],tick,remainingMs:5000});
test('new session boundary drops old reports; duplicate snapshots cannot extend expiry',()=>{
 const inbox=new CommsInbox(),room=fixture();room.comms.events=[event('old',10)];inbox.accept(room,0);assert.equal(inbox.active(0).length,0);
 room.state.tick=11;room.comms={revision:1,events:[event()],muted:[]};inbox.accept(room,100);assert.equal(inbox.active(100).length,1);inbox.accept(room,1000);assert.equal(inbox.active(5101).length,0);inbox.accept(room,5102);assert.equal(inbox.active(5102).length,0);
 inbox.reset();inbox.accept(room,6000);assert.equal(inbox.active(6000).length,0,'reconnect never replays the first snapshot report');
});
test('a fresh higher-revision report in the boundary tick is distinguishable from the initial snapshot',()=>{
 const inbox=new CommsInbox(),room=fixture();room.comms.events=[event('baseline',10)];inbox.accept(room,0);room.comms={revision:1,events:[event('baseline',10),event('fresh',10)],muted:[]};inbox.accept(room,10);assert.deepEqual(inbox.active(10).map(e=>e.id),['fresh']);
});
test('expired, removed/muted, stale-revision, old-room and round reports cannot resurrect',()=>{
 const inbox=new CommsInbox(),room=fixture();inbox.accept(room,0);room.state.tick=11;room.comms={revision:1,events:[event()],muted:[]};inbox.accept(room,1);room.comms={revision:2,events:[],muted:[1]};inbox.accept(room,2);assert.deepEqual(inbox.muted,[1]);room.comms={revision:1,events:[event()],muted:[]};inbox.accept(room,3);assert.equal(inbox.active(3).length,0);
 room.comms={revision:3,events:[event()],muted:[]};inbox.accept(room,4);assert.equal(inbox.active(4).length,0);room.id='room-b';inbox.accept(room,5);assert.equal(inbox.active(5).length,0);
 room.state.tick=12;room.comms={revision:4,events:[event('next',12)],muted:[]};inbox.accept(room,6);assert.equal(inbox.active(6).length,1);room.state.phase='round_end';inbox.accept(room,7);assert.equal(inbox.active(7).length,0);room.state.phase='buy';inbox.accept(room,8);assert.equal(inbox.active(8).length,0);
});
