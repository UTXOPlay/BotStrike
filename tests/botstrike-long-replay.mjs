// A six-minute match with all ten seats human-controlled exceeds the old 8 MB
// frame allowance. Exercise the real native replay and exact Myelin profile.
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,readFileSync,openSync,writeSync,closeSync,statSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const dir=mkdtempSync(path.join(tmpdir(),'botstrike-ten-human-')),tapeFile=path.join(dir,'tape.jsonl');
const config={map:0,mode:'deathmatch',heroes:[0,1,2,3,4,5,0,1,2,3],bots:Array(10).fill(false),difficulty:1,seed:2050};
const fd=openSync(tapeFile,'w');writeSync(fd,JSON.stringify({config})+'\n');
for(let tick=1;tick<=23040;tick++)writeSync(fd,JSON.stringify({inputs:Array.from({length:10},(_,slot)=>[tick,.123456,-.123456,slot<5?.123456:3.141593,-.123456,256,11,23,slot%6,0])})+'\n');closeSync(fd);
const bytes=statSync(tapeFile).size;assert.ok(bytes>8_000_000,'fixture must exceed old profile capacity');
const env={...process.env,BOTSTRIKE_ASSETS:path.resolve('release')},result=JSON.parse(execFileSync('release/botstrike-engine',['replay',tapeFile],{timeout:180000,maxBuffer:2e6}));assert.equal(result.completed,true);
const action={type:'match',room:'a'.repeat(24),players:Array.from({length:10},(_,i)=>(i+1).toString(16).repeat(64)),tape:readFileSync(tapeFile,'utf8'),result};const actionFile=path.join(dir,'match.json');writeFileSync(actionFile,JSON.stringify(action));
const record=JSON.parse(execFileSync('release/myelin-botstrike',['record',path.join(dir,'session'),actionFile],{env,timeout:300000,maxBuffer:100e6}));assert.equal(record.replay.verified,true);const exported=path.join(dir,'export.json');writeFileSync(exported,JSON.stringify(record.export));
const verify=JSON.parse(execFileSync('release/myelin-botstrike',['verify',exported],{env,timeout:300000,maxBuffer:100e6}));assert.equal(verify.verified,true);
console.log(JSON.stringify({tenHumanSeats:true,ticks:23040,tapeBytes:bytes,exportBytes:statSync(exported).size,profile:record.session.profile,verified:true},null,2));
