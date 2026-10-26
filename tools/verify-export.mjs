// Each verifier checks its own complete application profile and native digest.
// Never rewrite an old export or feed an old tape to the current rule set.
import {spawnSync} from 'node:child_process';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const release=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../release');
const file=process.argv[2];if(!file)throw Error('Usage: node tools/verify-export.mjs <export.json>');
const manifest=JSON.parse(readFileSync(path.join(release,'verifiers.json')));
let matched=false;
for(const entry of manifest){
 const assets=path.resolve(release,entry.directory);
 for(const [name,digest]of Object.entries(entry.sha256)){
  const binary=path.join(assets,name);
  if(!existsSync(binary)||createHash('sha256').update(readFileSync(binary)).digest('hex')!==digest)throw Error('Verifier artifact mismatch: '+entry.name+'/'+name);
 }
 const result=spawnSync(path.join(assets,'myelin-botstrike'),['verify',path.resolve(file)],{env:{...process.env,BOTSTRIKE_ASSETS:assets},encoding:'utf8',timeout:300000,maxBuffer:400000000});
 if(result.status===0){const verification=JSON.parse(result.stdout);if(verification.verified!==true)throw Error('Replay not verified');console.log(JSON.stringify({verifier:entry.name,...verification}));matched=true;break;}
 if(!result.stderr.includes('Application artifact or rules do not match this build'))throw Error(result.error?.message||result.stderr||'Replay verification failed');
}
if(!matched)throw Error('No retained verifier matches this exact application profile');
