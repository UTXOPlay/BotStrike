import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
export const sourceFiles=['botstrike/spec.json',...readdirSync('botstrike/src',{recursive:true}).filter(name=>name.endsWith('.rs')).sort().map(name=>'botstrike/src/'+name),'botstrike/Cargo.lock','botstrike/Cargo.toml'];
export const modelDigest=()=>{const h=createHash('sha256');for(const file of sourceFiles){h.update(file);h.update('\0');h.update(readFileSync(file));h.update('\0');}return h.digest('hex');};
