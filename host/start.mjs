import {readFileSync} from 'node:fs';
import {spawn} from 'node:child_process';
import {createGameHost} from './server.mjs';
const config=JSON.parse(readFileSync(process.env.GAME_HOST_CONFIG||new URL('../game-host.json',import.meta.url)));
const port=Number(process.env.WEB_PORT||config.port),runtimePort=Number(process.env.RUNTIME_PORT||config.runtimePort);
const origin=process.env.GAME_ORIGIN||`http://127.0.0.1:${port}`;
const runtimeUrl=process.env.RUNTIME_URL||`http://127.0.0.1:${runtimePort}`;
const runtimeToken=process.env.RUNTIME_TOKEN;
if(!runtimeToken||runtimeToken.length<32)throw Error('Set a stable RUNTIME_TOKEN of at least 32 characters.');
let child,service,server,stopping=false,childExited=true,serverClosed=false,stopCode=0,shutdownTimer;
const install=config.plugin?(await import(new URL(config.plugin,import.meta.url))).install:undefined;
service=createGameHost({config,origin,runtimeUrl,runtimeToken,sessionSecret:process.env.SESSION_SECRET||runtimeToken,install});
server=service.app.listen(port,process.env.BIND||'127.0.0.1',()=>console.log(`${config.name}: ${origin}`));
service.attachSockets(server);
if(!process.env.RUNTIME_URL){
 const [command,...args]=config.runtimeCommand;
 const runtimeEnv={...process.env};delete runtimeEnv.BOTSTRIKE_GATEWAY_PID;
 if(config.transportQuality===true)runtimeEnv.BOTSTRIKE_GATEWAY_PID=String(process.pid);
 child=spawn(process.env.RUNTIME_BINARY||command,args,{stdio:'inherit',env:{...runtimeEnv,PORT:String(runtimePort),BIND:'127.0.0.1'}});
 childExited=false;
 child.on('error',error=>{console.error(error);if(child.pid===undefined)childExited=true;stop(1);finishStop();});
 child.on('exit',code=>{childExited=true;if(!stopping)stop(code||1);else finishStop();});
}
server.on('error',error=>{console.error(error);stop(1);});
function finishStop(){if(!stopping||!serverClosed||!childExited)return;clearTimeout(shutdownTimer);process.exit(stopCode);}
function stop(code=0){
 if(stopping)return;stopping=true;stopCode=code;
 shutdownTimer=setTimeout(()=>{if(!childExited)child?.kill('SIGKILL');process.exit(stopCode);},3000);shutdownTimer.unref();
 if(!childExited)child?.kill('SIGTERM');service?.close();
 if(server)server.close(()=>{serverClosed=true;finishStop();});else serverClosed=true;
 finishStop();
}
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>stop());
