// Fresh synthetic complete matches on exact retained production binaries.
// These test fixtures are not past human matches or career/rank results.
import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,writeFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {tmpdir} from 'node:os';
import path from 'node:path';
const release=path.resolve('release'),dir=mkdtempSync(path.join(tmpdir(),'botstrike-tactical-historical-'));
const manifest=JSON.parse(readFileSync('release/verifiers.json')),evidence=[];
for(const entry of manifest.filter(e=>e.directory!=='.')){
 const assets=path.join(release,entry.directory),work=path.join(dir,entry.name),engine=path.join(assets,'botstrike-engine'),verifier=path.join(assets,'myelin-botstrike');
 for(const [name,hash]of Object.entries(entry.sha256))assert.equal(createHash('sha256').update(readFileSync(path.join(assets,name))).digest('hex'),hash);
 const config={map:0,mode:'deathmatch',heroes:[0,1,2,3,4,5,0,1,2,3],bots:Array(10).fill(false),difficulty:1,seed:2050},header=JSON.stringify({config})+'\n',frame=JSON.stringify({inputs:Array(10).fill(null)})+'\n';
 const initial=JSON.parse(execFileSync(engine,[],{input:header+frame,maxBuffer:1e6}).toString().trim().split('\n')[0]).state;
 const ticks=initial.phase_ticks;assert.ok(ticks>0&&ticks<=64*3600);
 const tape=header+frame.repeat(ticks),tapePath=work+'.jsonl';writeFileSync(tapePath,tape);
 const result=JSON.parse(execFileSync(engine,['replay',tapePath],{timeout:180000,maxBuffer:2e6}));assert.equal(result.completed,true);
 const action={type:'match',room:'a'.repeat(24),players:Array.from({length:10},(_,i)=>(i+1).toString(16).repeat(64)),tape,result},actionFile=work+'-match.json';writeFileSync(actionFile,JSON.stringify(action));
 const record=JSON.parse(execFileSync(verifier,['record',work+'-session',actionFile],{env:{...process.env,BOTSTRIKE_ASSETS:assets},timeout:300000,maxBuffer:100e6}));assert.equal(record.replay.verified,true);
 const file=work+'-export.json';writeFileSync(file,JSON.stringify(record.export));
 let rejected=false;try{execFileSync(path.join(release,'myelin-botstrike'),['verify',file],{env:{...process.env,BOTSTRIKE_ASSETS:release},timeout:300000,stdio:'pipe'});}catch(error){rejected=error.stderr.toString().includes('Application artifact or rules do not match this build');}assert.equal(rejected,true,'new rules must reject the old profile');
 const routed=JSON.parse(execFileSync(process.execPath,['tools/verify-export.mjs',file],{timeout:300000,maxBuffer:2e6}));assert.equal(routed.verified,true);assert.equal(routed.verifier,entry.name);
 evidence.push({verifier:entry.name,sha256:entry.sha256,profile:record.session.profile,ticks,exactRouting:true,newProfileRejected:true,verified:true,synthetic:true});console.log(JSON.stringify(evidence.at(-1)));
}
writeFileSync(path.join(dir,'evidence.json'),JSON.stringify({dir,evidence},null,2));console.log(JSON.stringify({dir,profiles:evidence.length}));
