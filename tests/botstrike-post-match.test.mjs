import test from 'node:test';
import assert from 'node:assert/strict';
import {matchResults} from '../games/botstrike/client/post-match.mjs';

const players=()=>Array.from({length:10},(_,slot)=>({slot,team:Math.floor(slot/5),hero:slot%6,kills:0,deaths:0,assists:0,damage:0}));
const room=(roster=players(),status='finished',slot=0)=>({status,slot,state:{phase:'finished',config:{mode:'deathmatch'},score:[50,47],winner:0,players:roster}});

test('post-match results require a completed native state and an attached final room',()=>{
 assert.equal(matchResults(null),null);
 assert.equal(matchResults(room(players(),'running')),null);
 assert.equal(matchResults(room(players(),'failed')),null);
 const unfinished=room();unfinished.state.phase='live';assert.equal(matchResults(unfinished),null);
 assert.ok(matchResults(room(players(),'sealing')));
});

test('combat MVP uses recorded stats with stable tie breaks',()=>{
 const roster=players();
 roster[0]={...roster[0],kills:8,assists:1,damage:1600,deaths:4};
 roster[1]={...roster[1],kills:8,assists:2,damage:1200,deaths:5};
 roster[2]={...roster[2],kills:8,assists:2,damage:1400,deaths:6};
 roster[3]={...roster[3],kills:8,assists:2,damage:1400,deaths:3};
 roster[4]={...roster[4],kills:8,assists:2,damage:1400,deaths:3};
 roster[5]={...roster[5],kills:9,assists:0,damage:300,deaths:12};
 assert.equal(matchResults(room(roster)).mvp.slot,5,'kills outrank secondary stats');
 roster[5].kills=7;
 const result=matchResults(room(roster,'finished',8));
 assert.equal(result.mvp.slot,3,'fewer deaths and then lower slot settle the tie');
 assert.deepEqual(result.teams.map(team=>team.team),[1,0]);
 assert.deepEqual(result.teams[1].players.slice(0,2).map(player=>player.slot),[3,4]);
});

test('a scoreless draw has no fabricated MVP',()=>{
 const fixture=room();fixture.state.winner=null;fixture.state.score=[0,0];
 const result=matchResults(fixture);
 assert.equal(result.mvp,null);
 assert.equal(result.winner,null);
 assert.equal(result.teams.reduce((count,team)=>count+team.players.length,0),10);
});
