// Service/UI overlay guard: preserve exact Native and historical artifact bytes.
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {modelDigest} from './damage-contract-source.mjs';
import {exactArtifacts,sourceInventory} from './botstrike-quality-ops-drill.mjs';
import {verifyRollbackBundle,readRegular} from './quality-rollback-bundle.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const allowed=new Set(['botstrike-service/career.mjs','botstrike-service/retention.mjs','botstrike-service/seal-worker.mjs','botstrike-service/server.mjs','game-host.json','host/server.mjs','host/socket-proxy.mjs','host/start.mjs']);
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
export async function qualityAuxiliaryBinding(directory=root){
 const rollbackBundle=await verifyRollbackBundle(path.join(directory,'build-validation/network-quality/rollback-source'));
 const file='tools/network-audit-inspector',sourceFile='botstrike/examples/network_audit.rs',bytes=await readRegular(path.join(directory,file),64*1024**2);assert.ok((await fs.stat(path.join(directory,file))).mode&0o111,'Tested inspector must remain executable');
 const driver='tests/botstrike-tactical-active-flow.mjs',validationDrivers={[driver]:sha(await readRegular(path.join(directory,driver)))};
 return{rollbackBundle,networkAuditInspector:{file,sha256:sha(bytes),sourceFile,sourceSha256:sha(await readRegular(path.join(directory,sourceFile))),mode:'frame-hashes',productionEngineReplaced:false},validationDrivers};
}
export async function qualityReleaseBinding({sourceRevision,sourceKind='git_tree'}={}){
 assert.match(sourceRevision||'',/^[a-f0-9]{40}$/,'An explicit complete Git tree OID is required');assert.equal(sourceKind,'git_tree');
 const base=JSON.parse(await fs.readFile(path.join(root,'docs/acceptance/tactical-interface/binding.json'),'utf8'));
 assert.equal(modelDigest(),base.nativeModelSha256,'Native source model changed');
 const manifest=await exactArtifacts(path.join(root,'release')),protectedFiles={},intentionalChanges={};
 for(const [file,expected]of Object.entries(base.protectedFiles)){
  const actual=sha(await fs.readFile(path.join(root,file)));
  if(allowed.has(file))intentionalChanges[file]={before:expected,after:actual};
  else{assert.equal(actual,expected,'Protected artifact changed: '+file);protectedFiles[file]=actual;}
 }
 const nativeBinding=JSON.parse(await fs.readFile(path.join(root,'docs/acceptance/arsenal-audio/bound-application.json'),'utf8'));
 for(const file of ['release/botstrike-engine','release/myelin-botstrike'])assert.equal(protectedFiles[file],nativeBinding.base.files[file]);
 const libc=process.report.getReport().header.glibcVersionRuntime;assert.equal(libc,'2.36','Build must use the deployment Bookworm libc generation');
 return{schemaVersion:1,sourceRevision,sourceKind,nativeModelSha256:base.nativeModelSha256,portableProfileSha256:base.portableProfileSha256,nativeRulesChanged:false,offChainReplay:true,build:{node:process.version,platform:process.platform,arch:process.arch,libc},baseProtectedFiles:Object.keys(base.protectedFiles).length,protectedFiles,intentionalChanges,retainedArtifacts:manifest,opsSourceInventory:await sourceInventory(root),...await qualityAuxiliaryBinding(root),limitations:['A Git tree binds source bytes, not a signed commit or deployment approval.','This build record is not physical-device, internet, human or rollout acceptance.']};
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
 const result=await qualityReleaseBinding({sourceRevision:process.env.BOTSTRIKE_SOURCE_REVISION});const out=process.argv[2];assert.ok(out,'Explicit output file required');await fs.writeFile(out,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({protectedFiles:Object.keys(result.protectedFiles).length,retainedPairs:result.retainedArtifacts.length,sourceRevision:result.sourceRevision,sourceKind:result.sourceKind}));
}
