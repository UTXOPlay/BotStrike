import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {gzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
import {modelDigest} from './damage-contract-source.mjs';
const target=resolve(process.env.CARGO_TARGET_DIR||'target-botstrike'),compiled=process.argv.find(arg=>arg.startsWith('--engine='));
// The portable image passes the engine compiled from the same immutable Docker
// build context. Local generation compiles by default to prevent stale inputs.
if(!compiled)execFileSync('cargo',['build','--release','--locked','--manifest-path','botstrike/Cargo.toml'],{stdio:'inherit',env:{...process.env,CARGO_TARGET_DIR:target}});
const engine=compiled?resolve(compiled.slice('--engine='.length)):target+'/release/botstrike-engine',spec=readFileSync('botstrike/spec.json');
if(execFileSync(engine,['spec']).toString().trim()!==spec.toString().trim())throw Error('Compiled spec does not match the source');
const matrix=JSON.parse(execFileSync(engine,['damage-matrix'],{maxBuffer:8e6,timeout:180000}));
if(matrix.rows.length!==6048)throw Error('Incomplete damage matrix: '+matrix.rows.length);
const artifact={...matrix,engine_sha256:createHash('sha256').update(readFileSync(engine)).digest('hex'),model_sha256:modelDigest(),notes:['Root-to-root range in native units; all pellets hit the selected region.','First round at time zero. Perfect aim removes recoil/dispersion.','Earliest empty-magazine reload included. Native armor rounding, burst cadence, EMP shield break, shield/boost expiration and finite reserves retained.','Boost 0: none; 1: FORGE overclock for five seconds; 2: Power Core for four seconds.','Healing, cover, missed pellets, travel, aiming and player reaction can increase actual time. Splash excludes the directly hit target.']};
const bytes=Buffer.from(JSON.stringify(artifact)+'\n');writeFileSync('games/botstrike/web/damage-contract.json',bytes);
mkdirSync('docs/acceptance/tactical-core',{recursive:true});writeFileSync('docs/acceptance/tactical-core/damage-contract.json.gz',gzipSync(bytes,{mtime:0}));
console.log(JSON.stringify({cases:matrix.rows.length,bytes:bytes.length,model:artifact.model_sha256}));
