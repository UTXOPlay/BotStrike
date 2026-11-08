import * as fs from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
export async function fileSha256(file){const hash=createHash('sha256');for await(const bytes of createReadStream(file))hash.update(bytes);return hash.digest('hex');}
const omitted=new Set(['matrix-case.json','evidence-manifest.json']);
export async function matrixEvidenceManifest(root){
 const files=[],todo=[root];while(todo.length){const directory=todo.pop();for(const entry of await fs.readdir(directory,{withFileTypes:true})){const file=path.join(directory,entry.name),relative=path.relative(root,file),metadata=await fs.lstat(file);if(metadata.isSymbolicLink())throw Error('Evidence cannot follow symlinks');if(metadata.isDirectory())todo.push(file);else if(metadata.isFile()&&!omitted.has(relative)){if(metadata.size>512*1024**2||files.length>=20000)throw Error('Evidence manifest bound exceeded');files.push({file:relative,bytes:metadata.size,sha256:await fileSha256(file)});}}}
 return{schemaVersion:1,meaning:'All existing private case files except this manifest and the case report, which are bound separately by the public resume summary',files:files.sort((a,b)=>a.file.localeCompare(b.file))};
}
// No cookie, delivery nonce, account, position, raw events, IP/TCP state or browser
// session is copied into the report used to select resumable cases. Raw sources
// remain private under the owned lab directory and are integrity-bound here.
export function matrixCaseSummary(value){return{
 id:value.id,status:value.status,labRoot:value.labRoot,startedAt:value.startedAt,finishedAt:value.finishedAt,
 automated:true,humanParticipants:0,networkAcceptance:false,
 artifactBytes:value.artifactBytes??null,captureLimit:value.captureLimit?{bytes:value.captureLimit.bytes,queueBytes:value.captureLimit.queueBytes}:null,rawArchives:value.rawArchives?{status:value.rawArchives.status,files:value.rawArchives.files,originalBytes:value.rawArchives.originalBytes,compressedBytes:value.rawArchives.compressedBytes,manifestSha256:value.rawArchives.manifestSha256}:null,caseSha256:value.caseSha256??null,evidenceManifestSha256:value.evidenceManifestSha256??null,
 failureCodes:(value.failures||[]).map(row=>row.code),unsupportedCodes:(value.unsupported||[]).map(row=>row.code),
 observed:{nativeInputFrames:value.analysis?.nativeInputFrames??null,nativeFrames:value.analysis?.nativeFrames??null,shots:value.analysis?.shotTicks?.length??null,expiredControlFrames:value.analysis?.expiredControlFrames??null,recoveryNeutralAck:value.analysis?.recovery?.neutralAck?true:null,obsoleteHeldFrames:value.analysis?.recovery?.obsoleteHeldFrames?.length??null,positiveNativeAcks:value.analysis?.positiveAcks?.length??null,confirmedPurchases:value.analysis?.purchases?.filter(v=>v.nativeConfirmed).length??null,pulseOrigins:value.analysis?.pulseSummary?.observed??null},
 replay:value.replay?{sourceNativeReplayMatched:value.replay.sourceNativeReplayMatched,capturedRuntimePrefixMatched:value.replay.capturedRuntimePrefixMatched,comparedRuntimeTicks:value.replay.comparedRuntimeTicks,selectedToTick:value.replay.selectedToTick,unconfirmedTapeTailTicks:value.replay.unconfirmedTapeTailTicks}:null,
 browserMetrics:(value.browserAnalysis||[]).map(row=>({actor:row.actor,trust:row.trust,sampleUnit:row.sampleUnit,metrics:row.metrics,counts:row.counts,render:row.render,socketOpens:row.socketOpens,resyncs:row.resyncs})),
 tactical:value.tactical?{automatedControllers:value.tactical.automatedControllers,additionalCapacityProbeActors:value.tactical.additionalCapacityProbeActors,capacityOtherWaitingLobbies:value.tactical.capacityOtherWaitingLobbies,capacityReleaseWaitMs:value.tactical.capacityReleaseWaitMs,capacityExhaustedBeforeDeparture:value.tactical.capacityExhaustedBeforeDeparture,sameLifeExpiredBuyRejected:value.tactical.sameLifeExpiredBuyRejected,duplicateClaim:value.tactical.duplicateClaim,newLifeBuy:value.tactical.newLifeBuy,allExplicitlyDeparted:value.tactical.allExplicitlyDeparted,newRoomCreationAfterDeparture:value.tactical.newRoomCreationAfterDeparture,fullTacticalMatch:value.tactical.fullTacticalMatch}:null,
};}

export async function developmentArtifactBinding(source){
 const files=[],todo=['host','botstrike-service','dist','shared','tools','botstrike/spec.json'];
 while(todo.length){const relative=todo.pop(),file=path.join(source,relative),metadata=await fs.lstat(file);if(metadata.isSymbolicLink())throw Error('Development binds cannot contain symlinks');if(metadata.isDirectory()){for(const name of await fs.readdir(file))todo.push(path.join(relative,name));}else if(metadata.isFile()){if(files.length>=20000||metadata.size>512*1024**2)throw Error('Development source inventory bound exceeded');files.push({file:relative,bytes:metadata.size,sha256:await fileSha256(file)});}}
 return files.sort((a,b)=>a.file.localeCompare(b.file));
}
