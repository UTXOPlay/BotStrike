import {mkdir,writeFile,readdir,readFile} from 'node:fs/promises';
import {cpus,platform,loadavg} from 'node:os';
import {startMotionLab} from './serve-botstrike-motion-lab.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const out=process.env.ART_OUTPUT||'/tmp/botstrike-hardware';await mkdir(out,{recursive:true});
async function thermal(){try{return await Promise.all((await readdir('/sys/class/thermal')).filter(name=>/^thermal_zone\d+$/.test(name)).map(async name=>({type:(await readFile(`/sys/class/thermal/${name}/type`,'utf8')).trim(),celsius:Number(await readFile(`/sys/class/thermal/${name}/temp`,'utf8'))/1000})));}catch{return [];}}
const server=await startMotionLab();
const browser=await chromium.launch({headless:false,executablePath:process.env.CHROMIUM_PATH||'/usr/bin/google-chrome-stable',args:['--no-sandbox','--disable-dev-shm-usage']});
let monitor;
try{
 const page=await browser.newPage({viewport:{width:1920,height:1080}}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(600000);
 await page.goto(`http://127.0.0.1:${server.address().port}`);await page.evaluate(()=>motionLabReady);
 const device=await page.evaluate(()=>motionLab.device());console.log(JSON.stringify({device,phase:'measuring'}));
 if(/swiftshader|llvmpipe|software/i.test(device.renderer))throw Error('This run needs a hardware GPU; software output is not device acceptance.');
 const thermalBefore=await thermal(),hostLoad=[];
 const counters=()=>cpus().reduce((sum,cpu)=>{for(const [key,value]of Object.entries(cpu.times)){sum.total+=value;if(key==='idle')sum.idle+=value;}return sum;},{total:0,idle:0});
 let previous=counters();
 // The laptop is shared with other work. Record contention instead of treating
 // a concurrent all-core build/proof run as an animation-only regression.
 monitor=setInterval(()=>{const next=counters(),total=next.total-previous.total;hostLoad.push({time:new Date().toISOString(),cpuBusyPercent:total?100*(1-(next.idle-previous.idle)/total):0,loadAverage:loadavg()});previous=next;},1000);
 const report=await page.evaluate(config=>motionLab.benchmark(config),{seconds:Number(process.env.BENCH_SECONDS||15),warmup:3,rounds:Number(process.env.BENCH_ROUNDS||2),config:{scenario:'circle',fps:60,reduced:false,hero:null,weapon:2}});
 clearInterval(monitor);
 const busyFraction=hostLoad.filter(s=>s.cpuBusyPercent>70).length/Math.max(1,hostLoad.length);
 report.host={cpu:cpus()[0].model,logicalCores:cpus().length,platform:platform(),browser:browser.version(),thermalBefore,thermalAfter:await thermal(),load:hostLoad,contention:{cpuBusyThresholdPercent:70,fractionAboveThreshold:busyFraction,flagged:busyFraction>.1,note:'Aggregate host load includes this benchmark and may include Cargo builds. Contended timing is diagnostic. Legacy target comparisons are advisory for this PR; dedicated performance optimization is deferred.'}};report.errors=errors;
 await writeFile(`${out}/measurements.json`,JSON.stringify(report,null,2));await page.screenshot({path:`${out}/desktop.png`});console.log(JSON.stringify({aggregate:report.aggregate,budget:report.budget,errors,out}));
}finally{clearInterval(monitor);await browser.close();server.close();server.closeAllConnections();}
