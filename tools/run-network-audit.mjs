import {spawn} from 'node:child_process';
import {createHash} from 'node:crypto';
import {createReadStream,createWriteStream} from 'node:fs';
import {readFile,writeFile,mkdir,chmod,stat,realpath,mkdtemp} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {pipeline} from 'node:stream/promises';
import {createInterface} from 'node:readline';
import {modelDigest} from './damage-contract-source.mjs';

const repo=fileURLToPath(new URL('../',import.meta.url));
const MODEL='4cb119b7638d14fb08cafad9905e9d8bc808d04b233e8d0c4599e6cd79e4ed49';
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const digest=async file=>sha(await readFile(file));
function launch(file,args,{timeoutMs=180000,...options}={}){
 const child=spawn(file,args,{cwd:repo,stdio:['pipe','pipe','pipe'],...options});let stderr='',stdout='';
 child.stderr.on('data',chunk=>{if(stderr.length<8192)stderr+=String(chunk).slice(0,8192-stderr.length);});
 const timer=setTimeout(()=>child.kill('SIGKILL'),timeoutMs);timer.unref();
 const done=new Promise((resolve,reject)=>{child.once('error',reject);child.once('close',(code,signal)=>code===0?resolve():reject(new Error(`${path.basename(file)} failed (${signal||code}): ${stderr}`)));}).finally(()=>clearTimeout(timer));
 // Attach rejection now, before streams complete, so early process failures do
 // not become unhandled rejections. Callers still await the original promise.
 done.catch(()=>{});
 return {child,done,get stderr(){return stderr;},async capture(limit=65536){for await(const chunk of child.stdout){stdout+=chunk;if(Buffer.byteLength(stdout)>limit){child.kill('SIGKILL');throw Error('Tool stdout limit');}}await done;return stdout;}};
}
export async function buildNetworkAudit({targetDir=path.join(tmpdir(),'botstrike-network-audit-target')}={}){
 await mkdir(path.resolve(targetDir),{recursive:true});
 const canonical=await realpath(targetDir),release=await realpath(path.join(repo,'release'));
 if(canonical===release||canonical.startsWith(release+path.sep))throw Error('Independent target directory required');
 const p=launch('cargo',['build','--release','--locked','--manifest-path','botstrike/Cargo.toml','--example','network_audit','--target-dir',path.resolve(targetDir)]);p.child.stdin.end();await p.capture();
 return path.resolve(targetDir,'release/examples/network_audit');
}
export async function compareNetworkHashes(source,exact,ticks=new Set()){
 const sources=createInterface({input:createReadStream(source),crlfDelay:Infinity}),exactLines=createInterface({input:createReadStream(exact),crlfDelay:Infinity});
 const iterator=sources[Symbol.asyncIterator]();let count=0,firstMismatch=null,result=null;const selected=[];
 try{for await(const line of exactLines){const row=JSON.parse(line);if(row.result){result=row.result;continue;}const next=await iterator.next();const s=next.done?null:JSON.parse(next.value);count++;if((!s||row.tick!==s.tick||row.stateHash!==s.stateHash)&&!firstMismatch)firstMismatch={tick:row.tick,source:s,exact:row};if(ticks.has(row.tick))selected.push({tick:row.tick,source:s?.stateHash,exact:row.stateHash,matched:row.stateHash===s?.stateHash});}const extra=await iterator.next();if(!extra.done&&!firstMismatch)firstMismatch={reason:'source_has_extra_ticks'};}finally{sources.close();exactLines.close();}
 if(!result)throw Error('Missing exact engine result');return {count,firstMismatch,result,selected};
}
export async function runNetworkAudit({tape,out,binary,targetDir,ticks=[]}={}){
 if(process.cwd()!==repo.replace(/\/$/,''))throw Error('Run network audit from repository root');
 if(!tape)throw Error('A private production tape is required');
 if(!Array.isArray(ticks)||ticks.length>4096||ticks.some(t=>!Number.isInteger(t)||t<1||t>230400))throw Error('Selected tick bounds');
 tape=await realpath(tape);if((await stat(tape)).size>194000000)throw Error('Tape size limit');
 if(!out)out=await mkdtemp(path.join(tmpdir(),'botstrike-network-audit-'));else {out=path.resolve(out);await mkdir(out,{mode:0o700});}
 await chmod(out,0o700);
 const tapeSha256=await digest(tape),exampleSourceSha256=await digest(path.join(repo,'botstrike/examples/network_audit.rs'));
 if(modelDigest()!==MODEL)throw Error('Production source model changed; do not reinterpret this native profile');
 const engine=path.join(repo,'release/botstrike-engine'),verifier=path.join(repo,'release/myelin-botstrike');
 const pair={engine:await digest(engine),verifier:await digest(verifier)};
 const bound=JSON.parse(await readFile(path.join(repo,'docs/acceptance/arsenal-audio/bound-application.json'),'utf8'));
 if(bound.modelSha256!==MODEL||bound.base.files['release/botstrike-engine']!==pair.engine||bound.base.files['release/myelin-botstrike']!==pair.verifier)throw Error('Exact retained application artifact pair does not match native binding');
 const sourceBuildPerformed=!binary;
 binary=path.resolve(binary||await buildNetworkAudit({targetDir}));
 const audit=launch(binary,[tape,out,[...new Set(ticks)].sort((a,b)=>a-b).join(',')]);audit.child.stdin.end();
 const source=JSON.parse(await audit.capture());
 // Stream the exact retained application through the inspector's deserialize /
 // serialize hash mode. Its computed trace must equal the application's own
 // trace result; this detects a float round-trip or helper mismatch as well.
 const exact=launch(engine,[]),hasher=launch(binary,['hash-states']);
 const output=createWriteStream(path.join(out,'exact-hashes.jsonl'),{flags:'wx',mode:0o600});
 try{await Promise.all([pipeline(createReadStream(tape),exact.child.stdin),pipeline(exact.child.stdout,hasher.child.stdin),pipeline(hasher.child.stdout,output),exact.done,hasher.done]);}catch(error){exact.child.kill('SIGKILL');hasher.child.kill('SIGKILL');throw error;}
 const comparison=await compareNetworkHashes(path.join(out,'source-hashes.jsonl'),path.join(out,'exact-hashes.jsonl'),new Set(ticks));
 const agreed=!comparison.firstMismatch&&comparison.count===source.ticks&&comparison.result.trace_hash===source.trace_hash&&comparison.result.state_hash===source.state_hash;
 const spec=launch(engine,['spec']);spec.child.stdin.end();const exactSpec=await spec.capture(262144);
 const specMatched=sha(exactSpec.trim())===sha((await readFile(path.join(repo,'botstrike/spec.json'),'utf8')).trim());
 if(await digest(tape)!==tapeSha256||await digest(path.join(repo,'botstrike/examples/network_audit.rs'))!==exampleSourceSha256||await digest(engine)!==pair.engine||await digest(verifier)!==pair.verifier||modelDigest()!==MODEL)throw Error('Tape, native artifact or inspector source changed during audit');
 const missingSelectedTicks=[...new Set(ticks)].filter(t=>t>source.ticks);
 const report={schema:1,sourceNativeReplayMatched:agreed&&specMatched,sourceNativeWitness:sourceBuildPerformed&&agreed&&specMatched&&source.rejectedWitnesses===0&&source.omittedDetailFrames===0&&missingSelectedTicks.length===0,source,agreement:{allFrameStateHashesMatched:!comparison.firstMismatch&&comparison.count===source.ticks,comparedTicks:comparison.count,firstMismatch:comparison.firstMismatch,traceHashMatched:comparison.result.trace_hash===source.trace_hash,finalStateHashMatched:comparison.result.state_hash===source.state_hash,specMatched,missingSelectedTicks,selectedTicks:comparison.selected},provenance:{sourceBuildPerformed,modelSha256:MODEL,retainedProfileSha256:bound.profileSha256,profileBinding:'retained bound-application.json with exact engine+verifier byte match; no new signed proof produced',engineSha256:pair.engine,verifierSha256:pair.verifier,exampleSha256:await digest(binary),exampleSourceSha256,runnerSha256:await digest(fileURLToPath(import.meta.url)),specSha256:await digest(path.join(repo,'botstrike/spec.json')),tapeSha256,toolchain:(await (async()=>{const p=launch('rustc',['--version']);p.child.stdin.end();return p.capture(2048);})()).trim(),target:process.arch+'-'+process.platform},limits:{maxTapeBytes:194000000,maxTicks:230400,maxDetailedFrames:4096,detailOmissionReported:source.omittedDetailFrames,privateHiddenPoses:true},limitations:['Offline replay and synthetic geometry are not real network impairment, human reaction or physical display/controller acceptance.','Tape viewTick is the admitted native value; prove service admission and browser presented-view linkage with the private lab trace.','Only isolated ARC/ION/RAIL single-pellet shots without bot/practice/utility/combat side effects receive reconstructed ray witnesses. Other native events remain authoritative.','Omitted detailed frames and unavailable ray witnesses must not be counted as covered fairness cases.']};
 await writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2)+'\n',{flag:'wx',mode:0o600});
 if(!report.sourceNativeWitness){const error=new Error('Source/native agreement gate failed; inspect private report.json (floating-point differences are not tolerated)');error.report=report;error.out=out;throw error;}
 return {out,report};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const args=process.argv.slice(2),options={};for(let i=0;i<args.length;i+=2){if(!['--tape','--out','--binary','--target-dir','--ticks'].includes(args[i])||args[i+1]===undefined)throw Error('Usage: node tools/run-network-audit.mjs --tape private.jsonl [--out NEW_DIR] [--ticks 123,124] [--binary PATH] [--target-dir PATH]');const key={'--tape':'tape','--out':'out','--binary':'binary','--target-dir':'targetDir','--ticks':'ticks'}[args[i]];options[key]=key==='ticks'?args[i+1].split(',').filter(Boolean).map(Number):args[i+1];}const {out,report}=await runNetworkAudit(options);console.log(JSON.stringify({out,sourceNativeWitness:report.sourceNativeWitness,ticks:report.source.ticks,shots:report.source.shots,availableWitnesses:report.source.availableWitnesses,omittedDetailFrames:report.source.omittedDetailFrames}));}catch(error){console.error(error.message);process.exitCode=1;}
}
