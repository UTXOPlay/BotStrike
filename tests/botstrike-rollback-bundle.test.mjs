// Plain historical source and provenance guards; no Native, verifier or Docker.
import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {createHash} from 'node:crypto';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {fileURLToPath} from 'node:url';
import {buildRollbackBundle,verifyRollbackBundle,ROLLBACK_COMMIT,ROLLBACK_TREE} from '../tools/quality-rollback-bundle.mjs';
import {baselineSource,opsProvenance,sourceInventory} from '../tools/botstrike-quality-ops-drill.mjs';
import {qualityAuxiliaryBinding} from '../tools/quality-release-binding.mjs';
const execute=promisify(execFile),repo=fileURLToPath(new URL('../',import.meta.url)),sha=bytes=>createHash('sha256').update(bytes).digest('hex'),json=(file,value)=>fs.writeFile(file,JSON.stringify(value),{mode:0o600});
let master,masterRoot;
after(async()=>{if(masterRoot)await fs.rm(masterRoot,{recursive:true,force:true});});
async function plainBundle(){
 if(!master)master=(async()=>{
  masterRoot=await fs.mkdtemp(path.join(tmpdir(),'botstrike-plain-rollback-'));const out=path.join(masterRoot,'bundle'),built=path.join(repo,'build-validation/network-quality/rollback-source');
  try{await fs.access(built);await verifyRollbackBundle(built);await fs.cp(built,out,{recursive:true});}
  catch(error){if(error.code!=='ENOENT')throw error;assert.notEqual(process.env.BOTSTRIKE_OPS_REQUIRE_BUNDLE,'1','Validation full suite requires its already-built offline bundle');let fixture=process.env.BOTSTRIKE_VALIDATION_GIT_FIXTURE;try{if(!fixture){await fs.access('/validation-git');fixture='/validation-git';}}catch{}if(!fixture){const {prepareQualityValidationGit}=await import('../tools/prepare-quality-validation-git.mjs');fixture=(await prepareQualityValidationGit()).directory;}await buildRollbackBundle({fixtureDirectory:fixture,outputDirectory:out});}
  return out;
 })();return master;
}
async function workspace(t){const root=await fs.mkdtemp(path.join(tmpdir(),'botstrike-bundle-guard-'));t.after(()=>fs.rm(root,{recursive:true,force:true}));return root;}
test('the exact plain bundle imports historical service/shared/spec with no Git executable or HEAD',async t=>{
 const bundle=await plainBundle(),root=await workspace(t),descriptor=await verifyRollbackBundle(bundle);assert.equal(descriptor.commit,ROLLBACK_COMMIT);assert.equal(descriptor.tree,ROLLBACK_TREE);assert.equal(descriptor.files.length,21);
 const moduleUrl=new URL('../tools/botstrike-quality-ops-drill.mjs',import.meta.url).href;
 const code="const {baselineSource}=await import("+JSON.stringify(moduleUrl)+");const value=await baselineSource("+JSON.stringify(root)+",'01dee05',{bundleDirectory:"+JSON.stringify(bundle)+",requireBundle:true});const original=await import(value.moduleUrl);if(typeof original.createBotStrike!=='function')throw Error('Historical import failed');console.log(JSON.stringify({commit:value.revision,files:value.files,manifest:value.bundle.manifestSha256}));";
 const output=JSON.parse((await execute(process.execPath,['--input-type=module','-e',code],{cwd:repo,env:{...process.env,PATH:'/nonexistent',GIT_DIR:'/deliberately-unavailable',BOTSTRIKE_OPS_REQUIRE_BUNDLE:'1'},timeout:10000})).stdout);
 assert.equal(output.commit,ROLLBACK_COMMIT);assert.equal(output.files,21);assert.equal(output.manifest,descriptor.manifestSha256);await assert.rejects(fs.stat(path.join(root,'baseline-source','.git')),{code:'ENOENT'});
});
test('unknown refs, bad file bytes, replaced blob identities, missing payload and links fail closed without a Git fallback',async t=>{
 const root=await workspace(t),bundle=path.join(root,'bundle');await fs.cp(await plainBundle(),bundle,{recursive:true});
 await assert.rejects(verifyRollbackBundle(bundle,{ref:'HEAD'}),/Unsupported rollback ref/);await assert.rejects(baselineSource(path.join(root,'run'),'main',{bundleDirectory:bundle}),/Unsupported rollback ref/);
 const file=path.join(bundle,'source/botstrike-service/server.mjs'),bytes=await fs.readFile(file);await fs.appendFile(file,' ');await assert.rejects(verifyRollbackBundle(bundle),/SHA256|length|Assertion/);await fs.writeFile(file,bytes);
 const manifestFile=path.join(bundle,'manifest.json'),original=await fs.readFile(manifestFile),manifest=JSON.parse(original);manifest.files[0].blobOid='a'.repeat(40);await json(manifestFile,manifest);await fs.writeFile(path.join(bundle,'manifest.sha256'),sha(await fs.readFile(manifestFile))+'\n');await assert.rejects(verifyRollbackBundle(bundle),/blob identity/);await fs.writeFile(manifestFile,original);await fs.writeFile(path.join(bundle,'manifest.sha256'),sha(original)+'\n');
 await fs.unlink(file);await assert.rejects(baselineSource(path.join(root,'missing'),'01dee05',{bundleDirectory:bundle}),/file set|ENOENT/);await fs.symlink('/etc/passwd',file);await assert.rejects(verifyRollbackBundle(bundle),/symlink/);
});
test('binding records exact rollback manifest/file hashes plus tested inspector binary/source hashes',async t=>{
 const root=await workspace(t),dir=path.join(root,'build-validation/network-quality');await fs.mkdir(dir,{recursive:true});await fs.cp(await plainBundle(),path.join(dir,'rollback-source'),{recursive:true});await fs.mkdir(path.join(root,'tools'));await fs.mkdir(path.join(root,'tests'));await fs.mkdir(path.join(root,'botstrike/examples'),{recursive:true});await fs.writeFile(path.join(root,'tools/network-audit-inspector'),'guard-only inspector fixture',{mode:0o755});await fs.writeFile(path.join(root,'botstrike/examples/network_audit.rs'),'guard-only source');await fs.writeFile(path.join(root,'tests/botstrike-tactical-active-flow.mjs'),'guard-only validation driver');
 const bound=await qualityAuxiliaryBinding(root);assert.equal(bound.rollbackBundle.files.length,21);assert.equal(bound.networkAuditInspector.sha256,sha('guard-only inspector fixture'));assert.equal(bound.networkAuditInspector.sourceSha256,sha('guard-only source'));assert.equal(bound.networkAuditInspector.productionEngineReplaced,false);assert.deepEqual(bound.validationDrivers,{'tests/botstrike-tactical-active-flow.mjs':sha('guard-only validation driver')});
 await fs.unlink(path.join(root,'tools/network-audit-inspector'));await fs.symlink('/etc/passwd',path.join(root,'tools/network-audit-inspector'));await assert.rejects(qualityAuxiliaryBinding(root),/regular file/);
});
test('current provenance never queries HEAD, requires strict image ENV/guard agreement and leaves dirty source unbound',async t=>{
 const root=await workspace(t);for(const file of ['botstrike-service/server.mjs','tests/ws-delivery-client.mjs','tools/botstrike-quality-ops-drill.mjs','tools/quality-rollback-bundle.mjs','tools/quality-release-binding.mjs']){await fs.mkdir(path.dirname(path.join(root,file)),{recursive:true});await fs.writeFile(path.join(root,file),'source guard fixture');}
 const env={BOTSTRIKE_SOURCE_REVISION:'a'.repeat(40),BOTSTRIKE_SOURCE_KIND:'git_tree',BOTSTRIKE_IMAGE_ID:'sha256:'+'b'.repeat(64)},unbound=await opsProvenance({directory:root,environment:env});assert.equal(unbound.provenance.sourceRevision,'unknown');
 const files={};for(const file of ['release/botstrike-engine','release/myelin-botstrike','botstrike/spec.json']){await fs.mkdir(path.dirname(path.join(root,file)),{recursive:true});await fs.writeFile(path.join(root,file),file);files[file]=sha(file);}
 const native={modelSha256:'c'.repeat(64),profileSha256:'d'.repeat(64),base:{files}};await fs.mkdir(path.join(root,'docs/acceptance/arsenal-audio'),{recursive:true});await json(path.join(root,'docs/acceptance/arsenal-audio/bound-application.json'),native);await fs.mkdir(path.join(root,'build-validation/network-quality'),{recursive:true});
 const guard={sourceKind:'git_tree',sourceRevision:env.BOTSTRIKE_SOURCE_REVISION,opsSourceInventory:await sourceInventory(root),nativeModelSha256:native.modelSha256,portableProfileSha256:native.profileSha256,protectedFiles:files};await json(path.join(root,'build-validation/network-quality/binding.json'),guard);
 const verified=await opsProvenance({directory:root,environment:env});assert.equal(verified.sourceBound,true);assert.equal(verified.provenance.sourceRevision,env.BOTSTRIKE_SOURCE_REVISION);assert.equal(verified.imageIdentityOrigin,'launcher_supplied');assert.equal(verified.provenanceBound,false);assert.equal(verified.requiresExternalDockerInspectMatch,true);
 await assert.rejects(opsProvenance({directory:root,environment:{...env,BOTSTRIKE_SOURCE_REVISION:'e'.repeat(40)}}),/ENV\/build/);await assert.rejects(opsProvenance({directory:root,environment:{...env,BOTSTRIKE_SOURCE_KIND:'git_commit'}}),/source kind/);
 await fs.appendFile(path.join(root,'botstrike-service/server.mjs'),'dirty');const dirty=await opsProvenance({directory:root,environment:env});assert.deepEqual(dirty.provenance,{sourceRevision:'unknown',imageId:'unknown',nativeProfile:'unknown'});assert.equal(dirty.reason,'source_bytes_differ_from_image_binding');
});
