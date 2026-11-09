// Exact historical plaintext source, verified without Git at runtime.
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
export const ROLLBACK_COMMIT='01dee05170c84c3e5d4fde9887c2d10282229f21';
export const ROLLBACK_TREE='49a9a37472f893d9e6a4dacbf5a6ddc30e593cdc';
export const ROLLBACK_BLOBS=Object.freeze({
 'botstrike-service/career.mjs':'be5a8a28602556cce3b4a8f4f2d6c95ebf4e52d3',
 'botstrike-service/communications.mjs':'d08653299875a6bfe3e67a57689d1d8653e32d1e',
 'botstrike-service/feedback.mjs':'84acb7c88f1d60d2f0412f77460b2757e1b9a32f',
 'botstrike-service/io.mjs':'123f61e9ade14afcabe6af8f84331076689d97dc',
 'botstrike-service/movement-audio.mjs':'46cec46e94f906b76aeea4071ac55d8bae324367',
 'botstrike-service/retention.mjs':'d2c0cc0033ed4765c517487183de0829717b6926',
 'botstrike-service/seal-worker.mjs':'7f526c6bc2e836a8b7e7310637e329f78d1e3bfc',
 'botstrike-service/server.mjs':'7e5c3866e804f406cfeb6639c6db7b156fb6ff17',
 'botstrike-service/tactical.mjs':'4008d459b06799935d1b7a0b0a25b53dcd4e6d45',
 'botstrike-service/visibility.mjs':'d43fa7aa8e567c654e5c87d2983e2726b5744f03',
 'botstrike/spec.json':'aa2f30f6b7aa2718ea849164817cd63c197c60de',
 'shared/gait-geometry.mjs':'caed15b54bd7b12ccfa3d51092b4f789d1cd5dc5',
 'shared/gait-plan.mjs':'c26daf7c2eefb42907760283ee755ef1e915c7bc',
 'shared/game-performance.mjs':'d866995ba934b91640563bb52e6a2a5b6f3a273c',
 'shared/game-viewport.mjs':'f8f2d62638a9c172d9cd0012640899ae9d3aea16',
 'shared/ground-surfaces.mjs':'df9d8f38a47903c3f1d9ba414af71b1d5dad85e7',
 'shared/hit-volumes.mjs':'2ba49ed3cb3d392b389be43afdff449989c223e1',
 'shared/ping-geometry.mjs':'69d3eb2e3d47214fd9d630f2968d06af1d5f76dc',
 'shared/sight-geometry.mjs':'7352246d93f4ed28cc70a1dcda76afef26563c6f',
 'shared/tactical-callouts.mjs':'b02e7de00c02c2b32056b9f94b269620f9c1ffc3',
 'shared/weapon-audio-events.mjs':'c71429b5ed1c44819d7b035455175d7e593ddde8',
});
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const blob=bytes=>createHash('sha1').update(Buffer.from('blob '+bytes.length+'\0')).update(bytes).digest('hex');
export function requireRollbackRef(ref){assert.ok(ref==='01dee05'||ref===ROLLBACK_COMMIT,'Unsupported rollback ref');return ROLLBACK_COMMIT;}
export async function readRegular(file,maxBytes=4*1024**2){const s=await fs.lstat(file);assert.ok(s.isFile()&&!s.isSymbolicLink()&&s.size<=maxBytes,'Bounded regular file required');return fs.readFile(file);}
export async function verifyRollbackBundle(directory,{ref=ROLLBACK_COMMIT,expectedManifestSha256}={}){
 requireRollbackRef(ref);directory=path.resolve(directory);assert.equal(await fs.realpath(directory),directory,'Bundle cannot redirect');
 const bytes=await readRegular(path.join(directory,'manifest.json')),digest=sha(bytes),manifest=JSON.parse(bytes);
 assert.equal((await readRegular(path.join(directory,'manifest.sha256'),128)).toString().trim(),digest,'Bundle manifest digest mismatch');if(expectedManifestSha256!==undefined)assert.equal(digest,expectedManifestSha256,'Image binding differs from rollback bundle');
 assert.equal(manifest.format,'botstrike-rollback-source-1');assert.equal(manifest.commit,ROLLBACK_COMMIT);assert.equal(manifest.tree,ROLLBACK_TREE);assert.equal(manifest.gitMetadataIncluded,false);assert.match(manifest.fixtureManifestSha256,/^[a-f0-9]{64}$/);
 assert.deepEqual(manifest.files.map(row=>row.file),Object.keys(ROLLBACK_BLOBS).sort(),'Exact complete historical file set required');
 const allowedFiles=new Set(['manifest.json','manifest.sha256',...manifest.files.map(row=>'source/'+row.file)]),allowedDirs=new Set(['source','source/botstrike-service','source/botstrike','source/shared']),found=[];
 async function walk(base,relative=''){for(const entry of await fs.readdir(base,{withFileTypes:true})){const name=relative?relative+'/'+entry.name:entry.name;assert.ok(!entry.isSymbolicLink(),'Bundle symlink rejected');if(entry.isDirectory()){assert.ok(allowedDirs.has(name),'Unexpected bundle directory');await walk(path.join(base,entry.name),name);}else{assert.ok(allowedFiles.has(name),'Unexpected bundle file');await readRegular(path.join(base,entry.name));found.push(name);}}}
 await walk(directory);assert.deepEqual(found.sort(),[...allowedFiles].sort(),'Bundle file set differs');
 for(const row of manifest.files){assert.equal(row.mode,'100644');assert.equal(row.blobOid,ROLLBACK_BLOBS[row.file],'Historical blob identity differs');const file=path.join(directory,'source',row.file),content=await readRegular(file);assert.equal(content.length,row.bytes);assert.equal(sha(content),row.sha256,'Rollback file SHA256 mismatch');assert.equal(blob(content),row.blobOid,'Rollback Git blob mismatch');assert.equal((await fs.stat(file)).mode&0o111,0,'Historical source must not become executable');}
 return{format:manifest.format,commit:manifest.commit,tree:manifest.tree,manifestSha256:digest,fixtureManifestSha256:manifest.fixtureManifestSha256,files:manifest.files};
}
export async function buildRollbackBundle({fixtureDirectory,outputDirectory}){
 const {verifyQualityValidationGit}=await import('./prepare-quality-validation-git.mjs'),verified=await verifyQualityValidationGit(fixtureDirectory);
 const {execFile}=await import('node:child_process'),{promisify}=await import('node:util'),execute=promisify(execFile),env={...process.env};for(const key of Object.keys(env))if(key.startsWith('GIT_'))delete env[key];Object.assign(env,{GIT_CONFIG_NOSYSTEM:'1',GIT_CONFIG_GLOBAL:'/dev/null',GIT_NO_REPLACE_OBJECTS:'1',GIT_OPTIONAL_LOCKS:'0'});
 const gitDirectory=path.join(path.resolve(fixtureDirectory),'repository'),git=async args=>(await execute('git',['--git-dir='+gitDirectory,...args],{encoding:null,env,maxBuffer:8*1024**2,timeout:30000})).stdout;
 const listed=(await git(['ls-tree','-r','-z','--full-tree',ROLLBACK_COMMIT,'botstrike-service','shared','botstrike/spec.json'])).toString().split('\0').filter(Boolean).map(row=>{const [head,file]=row.split('\t'),[mode,type,oid]=head.split(' ');return{file,mode,type,oid};}).sort((a,b)=>a.file.localeCompare(b.file));
 assert.deepEqual(listed.map(row=>row.file),Object.keys(ROLLBACK_BLOBS).sort());outputDirectory=path.resolve(outputDirectory);await fs.mkdir(outputDirectory,{mode:0o755});const files=[];
 for(const row of listed){assert.equal(row.type,'blob');assert.equal(row.mode,'100644');assert.equal(row.oid,ROLLBACK_BLOBS[row.file]);const bytes=await git(['show',ROLLBACK_COMMIT+':'+row.file]),target=path.join(outputDirectory,'source',row.file);assert.equal(blob(bytes),row.oid);await fs.mkdir(path.dirname(target),{recursive:true,mode:0o755});await fs.writeFile(target,bytes,{flag:'wx',mode:0o644});files.push({file:row.file,mode:row.mode,blobOid:row.oid,bytes:bytes.length,sha256:sha(bytes)});}
 const manifest={format:'botstrike-rollback-source-1',commit:ROLLBACK_COMMIT,tree:ROLLBACK_TREE,fixtureManifestSha256:verified.manifestSha256,gitMetadataIncluded:false,files},bytes=Buffer.from(JSON.stringify(manifest,null,2)+'\n');await fs.writeFile(path.join(outputDirectory,'manifest.json'),bytes,{flag:'wx',mode:0o644});await fs.writeFile(path.join(outputDirectory,'manifest.sha256'),sha(bytes)+'\n',{flag:'wx',mode:0o644});return verifyRollbackBundle(outputDirectory);
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const args=process.argv.slice(2);if(args.length!==3||args[0]!=='--build')throw Error('Usage: quality-rollback-bundle.mjs --build VERIFIED_GIT_FIXTURE NEW_OUTPUT');console.log(JSON.stringify(await buildRollbackBundle({fixtureDirectory:args[1],outputDirectory:args[2]})));
}
