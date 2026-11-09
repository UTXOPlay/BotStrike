// Run the actual local Store code with a fresh database and one isolated game.
// No production URL, existing database, wallet session or service is accepted.
import * as fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import {createHash} from 'node:crypto';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createNetworkLab} from './network-lab.mjs';
const repo=fileURLToPath(new URL('../',import.meta.url));
export async function startNetworkStorePreview({storeSource,applicationImage,devSource=null}={}){
 if(!storeSource||!path.isAbsolute(storeSource))throw Error('Explicit local Store source directory required');
 const source=await fs.realpath(storeSource),entry=path.join(source,'server/index.mjs');await fs.access(path.join(source,'dist/index.html'));
 const {createApp,games}=await import(pathToFileURL(entry).href),game=games.find(value=>value.id==='botstrike');if(!game)throw Error('Store source has no BotStrike catalog entry');
 const lab=await createNetworkLab({...(applicationImage?{applicationImage}:{}),devSource,runtimeConfig:{runtimeCommand:['node','tools/start-network-runtime.mjs']},runtimeEnv:{BOTSTRIKE_NATIVE_PROFILE:'c5a72be9466ddd4efa23aa6574541714c8112510ba7f2d7008dd0849f8a9925d'}});
 let service,closed=false;const server=http.createServer();
 async function close(){if(closed)return;closed=true;service?.close();await new Promise(resolve=>server.close(resolve));await lab.close();}
 try{
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});const origin='http://127.0.0.1:'+server.address().port;
  const dataDir=path.join(lab.root,'store-data');await fs.mkdir(dataDir,{mode:0o700});
  service=createApp({dataDir,origin,catalog:[game],privateGamesFile:'',gameServices:new Map([['botstrike',{url:lab.actors.C.tcpUrl,token:lab.runtimeToken,socket:true,recordReads:false,actionLimit:1200,repository:'BotStrike'}]])});
  server.on('request',service.app);service.attachSockets(server);await service.publishing.ready;
  const sourceFiles={};for(const file of ['server/index.mjs','server/game-sockets.mjs','server/game-gateway.mjs','public/mobile-game-fullscreen.js','dist/index.html'])sourceFiles[file]=createHash('sha256').update(await fs.readFile(path.join(source,file))).digest('hex');
  await fs.writeFile(path.join(lab.root,'store-preview.json'),JSON.stringify({schemaVersion:1,origin,synthetic:true,humanParticipants:0,existingDataRead:false,sourceFiles,imageBindings:lab.imageBindings,topology:'browser → actual Store gateway → BotStrike standalone host → private runtime',heartbeatBoundary:'host immediate peer can be the Store Node proxy; application ping traverses all hops'},null,2)+'\n',{mode:0o600});
  return{origin,root:lab.root,lab,close};
 }catch(error){await close();throw error;}
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
 const args=process.argv.slice(2);if(args.some(arg=>!['--prototype'].includes(arg)))throw Error('Only --prototype is supported');
 const preview=await startNetworkStorePreview({storeSource:process.env.BOTSTRIKE_STORE_SOURCE,applicationImage:process.env.NETWORK_APPLICATION_IMAGE,devSource:args.includes('--prototype')?repo:null});
 console.log(JSON.stringify({origin:preview.origin,root:preview.root,pid:process.pid}));await new Promise(resolve=>{for(const signal of ['SIGTERM','SIGINT'])process.once(signal,resolve);});await preview.close();
}
