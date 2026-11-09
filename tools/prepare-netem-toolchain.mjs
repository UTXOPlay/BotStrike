import {mkdirSync,copyFileSync,existsSync,readFileSync,writeFileSync,readdirSync,statSync,chmodSync} from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';

// The lab uses the host's recorded iproute2 build in a private Docker network
// namespace. Its ELF loader/libraries are bundled alongside it: the production
// Bookworm runtime and its native/verifier artifacts are never replaced.
const output=path.resolve(process.argv[2]||'artifacts/netem-toolchain');
mkdirSync(path.join(output,'root'),{recursive:true});mkdirSync(path.join(output,'bin'),{recursive:true});
const files=new Map(),directories=new Set();let loader;
function copy(source){
 if(files.has(source))return;
 const destination=path.join(output,'root',source);mkdirSync(path.dirname(destination),{recursive:true});copyFileSync(source,destination);
 files.set(source,createHash('sha256').update(readFileSync(source)).digest('hex'));directories.add(path.dirname(source));
}
const tools={tc:['/usr/sbin/tc','/sbin/tc'],ip:['/usr/sbin/ip','/sbin/ip'],ss:['/usr/bin/ss','/bin/ss'],nstat:['/usr/bin/nstat','/bin/nstat']};
const executables={};
for(const [name,candidates]of Object.entries(tools)){
 const executable=candidates.find(existsSync);if(!executable)throw Error('Install iproute2 before preparing the isolated lab: '+name);
 copy(executable);executables[name]=executable;
 const result=spawnSync('ldd',[executable],{encoding:'utf8'});if(result.status!==0)throw Error('Unable to inspect '+name);
 for(const line of result.stdout.split('\n')){const library=line.match(/(?:=>\s*)?(\/[^\s()]+)/)?.[1];if(!library)continue;copy(library);if(/\/ld(?:-linux[^/]*)?\.so/.test(library))loader=library;}
}
if(!loader)throw Error('ELF loader was not identified');
const tcData=['/usr/lib/tc','/usr/lib64/tc','/usr/lib/x86_64-linux-gnu/tc'].find(existsSync);
if(tcData){for(const name of readdirSync(tcData)){const p=path.join(tcData,name);if(statSync(p).isFile()&&name.endsWith('.dist'))copy(p);}}
const libraryPath=[...directories].map(p=>'/opt/netem-tools/root'+p).join(':');
for(const [name,executable]of Object.entries(executables)){
 const script='#!/bin/sh\n'+(tcData?'export TC_LIB_DIR=/opt/netem-tools/root'+tcData+'\n':'')+'exec /opt/netem-tools/root'+loader+' --library-path '+libraryPath+' /opt/netem-tools/root'+executable+' "$@"\n';
 const file=path.join(output,'bin',name);writeFileSync(file,script);chmodSync(file,0o755);
}
const version=spawnSync(executables.tc,['-V'],{encoding:'utf8'}).stdout.trim();
const manifest={schema:1,classification:'host toolchain for isolated transport experiments; not a production runtime',version,platform:process.platform,arch:process.arch,loader,files:Object.fromEntries([...files].sort(([a],[b])=>a.localeCompare(b)))};
writeFileSync(path.join(output,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');console.log(JSON.stringify({output,version,files:files.size}));
