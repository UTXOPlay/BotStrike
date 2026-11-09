import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createReadStream,createWriteStream} from 'node:fs';
import {spawn} from 'node:child_process';
import {pipeline} from 'node:stream/promises';
import {createInterface} from 'node:readline';
import {once} from 'node:events';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {runNetworkAudit,buildNetworkAudit} from './run-network-audit.mjs';
import {visitJsonLines} from './network-matrix-analysis.mjs';
const digest=async file=>createHash('sha256').update(await readFile(file)).digest('hex');
export async function verifyCaseReplay({tape,runtimeFile,roomId,out,artifacts,selectedToTick=1}={}){
 for(const file of ['release/botstrike-engine','release/myelin-botstrike','botstrike/spec.json'])assert.equal(artifacts.find(v=>v.file===file)?.sha256,await digest(file),'Actual application image Native artifact must equal the retained local oracle pair: '+file);
 const {report}=await runNetworkAudit({tape,out});assert.equal(report.sourceNativeReplayMatched,true);
 const binary=await buildNetworkAudit(),child=spawn(binary,['frame-hashes'],{stdio:['pipe','pipe','pipe']}),hashes=path.join(out,'runtime-hashes.jsonl');let stderr='',captured=0;child.stderr.on('data',b=>{if(stderr.length<2000)stderr+=String(b).slice(0,2000-stderr.length);});child.stdin.on('error',()=>{});const done=new Promise((resolve,reject)=>{child.once('error',reject);child.once('close',code=>code===0?resolve():reject(Error('Runtime frame hash failed: '+stderr)));});done.catch(()=>{});
 const timer=setTimeout(()=>child.kill('SIGKILL'),180000);
 const feed=(async()=>{try{await visitJsonLines(runtimeFile,async row=>{if(row.type==='native_frame'&&row.room===roomId){assert.equal(typeof row.rawLine,'string','Original engine rawLine required; a legacy JS projection cannot prove exact Native state');captured++;if(!child.stdin.write(JSON.stringify(row)+'\n'))await once(child.stdin,'drain');}});}finally{child.stdin.end();}})();
 try{await Promise.all([feed,pipeline(child.stdout,createWriteStream(hashes,{flags:'wx',mode:0o600})),done]);}finally{clearTimeout(timer);if(child.exitCode===null)child.kill('SIGKILL');}
 const sourceStream=createReadStream(path.join(out,'source-hashes.jsonl')),runtimeStream=createReadStream(hashes),source=createInterface({input:sourceStream,crlfDelay:Infinity}),runtime=createInterface({input:runtimeStream,crlfDelay:Infinity}),iterator=source[Symbol.asyncIterator]();let compared=0;
 try{for await(const line of runtime){const actual=JSON.parse(line),expected=await iterator.next();assert.equal(expected.done,false);assert.deepEqual(actual,JSON.parse(expected.value),'Actual captured Native frame differs from exact replay');compared++;}}finally{source.close();runtime.close();sourceStream.destroy();runtimeStream.destroy();}
 assert.equal(compared,captured);assert.ok(compared>=selectedToTick,'Every measured case tick needs an exact captured Native state hash');
 const witnesses=[];await visitJsonLines(path.join(out,'timeline.jsonl'),row=>{if(row.events.some(e=>e.kind==='shot'))witnesses.push({tick:row.tick,available:row.witness.available,reason:row.witness.reason??null,rngMatched:row.witness.rng?.matched??null,damageAgrees:row.witness.damageAgrees??null,controlProvenance:row.witness.controlProvenance??null,ray:row.witness.ray??null,damageEvents:row.witness.damageEvents??[]});});
 const result={sourceNativeReplayMatched:true,fullTapeTraceMatched:report.agreement.traceHashMatched,capturedRuntimePrefixMatched:true,comparedRuntimeTicks:compared,tapeTicks:report.source.ticks,unconfirmedTapeTailTicks:report.source.ticks-compared,selectedToTick,tailMeaning:'Only measured ticks at or before capturedRuntimePrefix are confirmed; an unsent shutdown tail is not gameplay evidence.',provenance:report.provenance,witnesses};await writeFile(path.join(out,'runtime-agreement.json'),JSON.stringify(result,null,2)+'\n',{mode:0o600});return result;
}
