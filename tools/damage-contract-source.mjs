import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
export const sourceFiles=['botstrike/spec.json','botstrike/src/lib.rs','botstrike/src/main.rs','botstrike/src/recoil.rs','botstrike/src/movement.rs','botstrike/src/hit.rs','botstrike/src/damage_contract.rs','botstrike/src/ai.rs','botstrike/Cargo.lock','botstrike/Cargo.toml'];
export const modelDigest=()=>{const h=createHash('sha256');for(const file of sourceFiles){h.update(file);h.update('\0');h.update(readFileSync(file));h.update('\0');}return h.digest('hex');};
