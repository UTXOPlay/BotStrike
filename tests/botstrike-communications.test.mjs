import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {Communications,communicationCommand} from '../botstrike-service/communications.mjs';
import {terrainPoint,onTerrain,rayTerrain,radarProject,radarPoint} from '../shared/ping-geometry.mjs';
import {flagshipCallouts,calloutAt} from '../shared/tactical-callouts.mjs';
const spec=JSON.parse(readFileSync(new URL('../botstrike/spec.json',import.meta.url)));
const pilot=(slot,team)=>({slot,team,life:1,alive:true,hero:0,weapon:2,position:[0,0,0],velocity:[0,0,0],yaw:0,pitch:0,stance:0,flash:0});
function fixture(){let now=1000;const comms=new Communications({now:()=>now}),members=['a'.repeat(64),'b'.repeat(64),'c'.repeat(64)];const room={id:'1'.repeat(24),status:'running',members,state:{tick:100,phase:'live',config:{map:0},players:[pilot(0,0),pilot(1,0),pilot(2,1)],utilities:[]}};room.state.players[2].position=[0,0,-300];const message={type:'comms',room:room.id,kind:'hold',position:terrainPoint(spec.maps[0],0,0),map:0,life:1};return {comms,room,members,message,advance:n=>now+=n};}
test('manual terrain reports never attach guessed enemies; sender/team/expiry/labels cannot be spoofed',()=>{
 const {comms,room,members,message}=fixture();comms.send(room,members[0],{...message,kind:'enemy'},spec);
 const own=comms.view(room,members[0],()=>true).events[0],ally=comms.view(room,members[1],()=>true).events[0];assert.deepEqual(own,ally);assert.equal(own.sender,0);assert.equal(own.target,undefined);assert.equal(own.callout,calloutAt(spec.maps[0],0,message.position).id);assert.equal(comms.view(room,members[2],()=>true).events.length,0);
 for(const extra of [{sender:1},{team:1},{remainingMs:999999},{callout:'<script>'}])assert.throws(()=>comms.send(room,members[0],{...message,...extra},spec),/fields/);
 for(const bad of [{room:'old'},{life:2},{map:1},{kind:'anything'},{position:[0,9999,0]}])assert.throws(()=>comms.send(room,members[0],{...message,...bad},spec));
});
test('socket commands require the authenticated active controller, current token, room and connection',()=>{
 const {room,members,message,comms}=fixture(),socket={controlToken:'fresh'};room.comms=comms;const request={...message,controlToken:'fresh'};
 for(const [owner,b,connected]of [[{},request,()=>true],[socket,{...request,controlToken:'stale'},()=>true],[socket,{...request,room:'old'},()=>true],[socket,request,()=>false]])assert.throws(()=>communicationCommand(room,members[0],socket,owner,b,spec,connected),/session/);
 communicationCommand(room,members[0],socket,socket,request,spec,()=>true);assert.equal(comms.events.length,1);
 const mute={type:'comms_mute',room:room.id,controlToken:'fresh',slot:1,muted:true};communicationCommand(room,members[0],socket,socket,mute,spec,()=>true);assert.deepEqual(comms.view(room,members[0],()=>true).muted,[1]);assert.throws(()=>communicationCommand(room,members[0],socket,socket,{...mute,sender:2},spec,()=>true));
});
test('enemy attachment requires current sight/reveal from the authorized living or squad spectator viewpoint',()=>{
 const {comms,room,members,message}=fixture(),wall={min:[-1000,0,-200],max:[1000,300,-190]},rules={...spec,maps:[{...spec.maps[0],obstacles:[wall]}]},request={...message,kind:'enemy',target:2};delete request.position;
 assert.throws(()=>comms.send(room,members[0],request,rules),/authorized/);room.state.players[2].revealed=64;comms.send(room,members[0],request,rules);const event=comms.view(room,members[1],()=>true).events[0];assert.deepEqual(event.target,{slot:2,life:1,seenTick:100});assert.deepEqual(event.position,[0,0,-300]);
 room.state.players[2].position[0]=700;assert.deepEqual(comms.view(room,members[1],()=>true).events[0].position,[0,0,-300],'last seen is a snapshot, never tracking hidden movement');
 room.state.players[0].alive=false;room.state.players[2].revealed=0;room.spectating={[members[0]]:2};assert.throws(()=>comms.send(room,members[0],request,rules),/authorized/);room.state.players[1].position=[0,0,-400];comms.send(room,members[0],request,rules);assert.equal(comms.view(room,members[0],()=>true).events.length,2);
});
test('quotas survive reconnect; muted, expired and disconnected messages cannot resurrect in later views',()=>{
 const {comms,room,members,message,advance}=fixture();for(let i=0;i<3;i++)comms.send(room,members[0],message,spec);assert.equal(comms.view(room,members[1],()=>true).events.length,3);assert.throws(()=>comms.send(room,members[0],message,spec),/limit/);
 comms.disconnect(members[0]);assert.deepEqual(comms.view(room,members[1],()=>true).events,[]);assert.throws(()=>comms.send(room,members[0],message,spec),/limit/);advance(1500);comms.send(room,members[0],message,spec);
 comms.mute(room,members[1],members[0],true);assert.deepEqual(comms.view(room,members[1],()=>true).events,[]);assert.deepEqual(comms.view(room,members[1],()=>true).muted,[0]);assert.throws(()=>comms.mute(room,members[2],members[0],true));comms.mute(room,members[1],members[0],false);assert.equal(comms.view(room,members[1],()=>true).events.length,1);
 advance(5000);assert.equal(comms.view(room,members[1],()=>true).events.length,0);comms.send(room,members[0],message,spec);room.state.tick+=320;assert.equal(comms.view(room,members[1],()=>true).events.length,0);
 comms.send(room,members[0],message,spec);assert.equal(comms.view(room,members[1],id=>id!==members[0]).events.length,0);assert.equal(comms.view(room,members[1],()=>true).events.length,0);
});
test('enemy activity cannot advance another team wire revision or share its sequence counter',()=>{
 const {comms,room,members,message}=fixture();const before=comms.view(room,members[2],()=>true);comms.send(room,members[0],message,spec);assert.deepEqual(comms.view(room,members[2],()=>true),before);assert.equal(comms.view(room,members[1],()=>true).revision,1);comms.send(room,members[2],message,spec);comms.send(room,members[0],message,spec);assert.equal(comms.view(room,members[1],()=>true).events.at(-1).id,room.id+':0:2');
});
test('an enemy team cannot consume the other team quota bookkeeping capacity',()=>{
 const {comms,room,members,message}=fixture();for(let i=0;i<32;i++)comms.quotas.set('enemy-'+i,{team:1,tokens:0,at:1000});comms.send(room,members[0],message,spec);assert.equal(comms.events.length,1);assert.throws(()=>comms.send(room,members[2],message,spec),/capacity/);
});
test('terrain rays use the nearest native surface and radar uses the exact inverse of its draw transform',()=>{
 const map={extent:1000,obstacles:[{min:[-50,0,-150],max:[50,100,-100]}]};assert.deepEqual(rayTerrain(map,[0,56,0],[0,0,-1]),[0,56,-100]);assert.deepEqual(rayTerrain(map,[300,56,0],[0,-1,0]),[300,0,0]);assert.equal(rayTerrain(map,[300,56,0],[0,1,0]),null);assert.equal(onTerrain(map,[0,0,-120]),false);assert.deepEqual(terrainPoint(map,0,-120),[0,100,-120]);assert.equal(onTerrain(map,[0,100,-120]),true);
 for(const size of [180,240,390,720,1440])for(const m of spec.maps)for(const x of [-m.extent,-333.25,0,127.75,m.extent])for(const z of [-m.extent,0,m.extent]){const p=terrainPoint(m,x,z),[u,v]=radarProject(m,size,p),back=radarPoint(m,size,u,v);assert.ok(back.every((n,i)=>Math.abs(n-p[i])<1e-8));}
 assert.equal(new Set(flagshipCallouts.map(c=>c.id)).size,12);for(const c of flagshipCallouts)assert.equal(calloutAt(spec.maps[0],0,c.position).id,c.id);
});
