// Physical-device measurements use real RAF pacing, with debug skin sampling off.
// These timings do not measure display scanout or end-to-end input latency.
const percentile=(values,p)=>{
 const sorted=[...values].sort((a,b)=>a-b);
 return sorted[Math.min(sorted.length-1,Math.floor(sorted.length*p))]||0;
};
const summary=values=>({samples:values.length,p50:percentile(values,.5),p95:percentile(values,.95),p99:percentile(values,.99),max:Math.max(0,...values)});
const nextFrame=()=>new Promise(resolve=>requestAnimationFrame(resolve));

export function installHardwareBenchmark(lab,options){
 const button=document.querySelector('#measure'),download=document.querySelector('#download'),status=document.querySelector('#measure-status');
 let running=false,lastReport=null;
 const inputSamples=[];
 addEventListener('pointerdown',event=>{
  const received=performance.now();
  requestAnimationFrame(()=>inputSamples.push({trusted:event.isTrusted,dispatchToNextRafMs:performance.now()-received}));
 },{passive:true});
 lab.benchmark=async({seconds=15,warmup=3,rounds=2,config=options()}={})=>{
  if(running)throw Error('A measurement is already running');
  if(document.visibilityState!=='visible')throw Error('Keep the measurement page visible');
  if(innerHeight>innerWidth&&matchMedia('(pointer:coarse)').matches)throw Error('Rotate to landscape before measuring');
  running=true;button.disabled=true;download.disabled=true;lab.stop();inputSamples.length=0;
  const started=new Date().toISOString(),device=lab.device(),runs=[];
  try{
   const assetManifest=await fetch('./manifest.json').then(r=>r.json());
   for(let round=0;round<rounds;round++)for(const mode of round%2?['candidate','baseline']:['baseline','candidate']){
    lab.reset({...config,mode,scenario:config.scenario||'circle',count:10,view:'lineup',diagnostics:false});
    const intervals=[],actorCpu=[],frameCpu=[];let previous=await nextFrame(),elapsed=0,frames=0;
    while(elapsed<warmup+seconds){
     const now=await nextFrame(),interval=now-previous;previous=now;
     if(document.visibilityState!=='visible'||innerHeight>innerWidth&&matchMedia('(pointer:coarse)').matches)throw Error('Measurement interrupted: page hidden or rotated');
     const result=lab.frame(Math.min(interval/1000,.1));elapsed+=interval/1000;frames++;
     if(elapsed>=warmup){intervals.push(interval);actorCpu.push(result.cpu);frameCpu.push(result.frameCpu);}
     if(frames%30===0)status.textContent=`Measuring ${mode}, pass ${round+1}/${rounds}: ${Math.min(seconds,Math.max(0,elapsed-warmup)).toFixed(0)}/${seconds} s. Keep this page visible.`;
    }
    runs.push({mode,round,elapsed,rafMs:summary(intervals),animationCpuMs:summary(actorCpu),frameCpuMs:summary(frameCpu),intervals,actorCpu,frameCpu});
   }
   const aggregate=Object.fromEntries(['baseline','candidate'].map(mode=>{
    const selected=runs.filter(r=>r.mode===mode);
    return [mode,{rafMs:summary(selected.flatMap(r=>r.intervals)),animationCpuMs:summary(selected.flatMap(r=>r.actorCpu)),frameCpuMs:summary(selected.flatMap(r=>r.frameCpu))}];
   }));
   const software=/swiftshader|llvmpipe|software/i.test(device.renderer),mobile=/Android|iPhone|iPad/i.test(device.userAgent);
   const animationP95LimitMs=mobile?2:1,frameP95LimitMs=Math.max(aggregate.baseline.rafMs.p95*1.1,aggregate.baseline.rafMs.p95+2);
   lastReport={schema:1,started,finished:new Date().toISOString(),device,software,assetManifest,config:{...config,count:10,view:'lineup',diagnostics:false},seconds,warmup,rounds,runs,aggregate,inputDispatchToNextRaf:inputSamples,budget:{animationP95LimitMs,frameP95LimitMs,animationPass:aggregate.candidate.animationCpuMs.p95<=animationP95LimitMs,framePass:aggregate.candidate.rafMs.p95<=frameP95LimitMs},limitations:['RAF and CPU timings are browser observations; GPU completion, display scanout and end-to-end input latency are not measured.','Physical phone identity, thermal state and human control response require reviewer confirmation.']};
   download.disabled=false;
   status.textContent=`Finished. Animation p95: ${aggregate.candidate.animationCpuMs.p95.toFixed(2)} ms; frame interval p95: ${aggregate.candidate.rafMs.p95.toFixed(2)} ms. ${software?'Software renderer; hardware gate remains open.':'Download the device measurements.'}`;
   try{const response=await fetch('./measurements',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(lastReport)});if(response.ok)lastReport.saved=await response.json();}catch{}
   return lastReport;
  }catch(error){status.textContent=error.message;throw error;}
  finally{running=false;button.disabled=false;}
 };
 button.onclick=()=>lab.benchmark().catch(error=>console.error(error));
 download.onclick=()=>{
  if(!lastReport)return;
  const url=URL.createObjectURL(new Blob([JSON.stringify(lastReport,null,2)],{type:'application/json'})),link=document.createElement('a');
  link.href=url;link.download='botstrike-device-measurements.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 };
}
