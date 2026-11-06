import assert from 'node:assert/strict';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const report=JSON.parse(readFileSync(process.env.MAP_AUDIT_REPORT||'/tmp/botstrike-map-audit-v4c/report.json')),out=process.env.CONTROL_ARTIFACTS||'/tmp/botstrike-map-cover-v4';mkdirSync(out,{recursive:true});
const anchors=new Map(report.anchors.map(a=>[a.id,a.position]));
const queries=report.visibility.flatMap(row=>row.line.samples.map(ray=>{const p=anchors.get(row.from);return {origin:[p[0],p[1]+56-19*row.observerStance,p[2]],target:ray.target,expected:ray.shotDistance};}));
const mobile=process.env.COVER_TOUCH==='1';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--enable-unsafe-swiftshader']});
try{
 const context=await browser.newContext({viewport:{width:844,height:390},deviceScaleFactor:mobile?1:.5,hasTouch:mobile,isMobile:mobile}),page=await context.newPage(),errors=[];page.setDefaultTimeout(90000);page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.RECOGNITION_URL||'http://127.0.0.1:19893');await page.waitForFunction(()=>window.recognitionLab?.phase==='intro');
 const manifest=await page.evaluate(()=>fetch('/manifest.json').then(r=>r.json()));assert.equal(manifest.nativeEngineSha256,report.provenance.pair['botstrike-engine']);
 const detailed=await page.evaluate(q=>window.recognitionLab.auditCoverRays(0,q),queries),sampled=[];
 for(let map=0;map<3;map++)sampled.push(await page.evaluate(map=>window.recognitionLab.auditCover(map),map));
 const evidence={cohort:mobile?'touch mobile batching':'desktop',nativeDetailed:detailed,sampled,manifest,errors,humanParticipants:0,limitations:['Geometric mesh/ray comparison, not pixel recognition or human map balance.']};writeFileSync(out+'/measurements.json',JSON.stringify(evidence,null,2));console.log(JSON.stringify({detailed,sampled,errors},null,2));
 assert.equal(detailed.nativeOnly+detailed.visualOnly+detailed.edgeMismatch,0);for(const row of sampled)assert.equal(row.nativeOnly+row.visualOnly+row.edgeMismatch,0);assert.deepEqual(errors,[]);
}finally{await browser.close();}
