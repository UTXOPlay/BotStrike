import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {gzipSync} from 'node:zlib';
const [reportFile,out]=process.argv.slice(2);if(!reportFile||!out)throw Error('Usage: node tools/summarize-map-audit.mjs report.json output-directory');
const report=JSON.parse(readFileSync(reportFile)),spec=JSON.parse(readFileSync('botstrike/spec.json'));mkdirSync(out,{recursive:true});
const stats=values=>{const v=[...values].sort((a,b)=>a-b);return {configurations:v.length,min:v[0],median:v.length%2?v[v.length>>1]:(v[v.length/2-1]+v[v.length/2])/2,max:v.at(-1)};};
const timings=[];
for(let hero=0;hero<6;hero++)for(const weapon of [2,7,11])for(const pace of ['run','walk','crouch'])for(const site of ['a_pad','b_pad'])for(let side=0;side<2;side++){
 const rows=report.cases.filter(r=>r.case.id.startsWith('spawn-')&&r.case.hero===hero&&r.case.weapon===weapon&&r.case.pace===pace&&r.case.via[0]===site&&Math.floor(r.case.slot/5)===side);
 if(rows.length)timings.push({hero,weapon,pace,site,role:side?'defense':'attack',zone:stats(rows.map(r=>r.site_entry_ticks/64)),stopped:stats(rows.map(r=>r.settled_ticks/64))});
}
const contacts=report.contacts.filter(r=>r.firstCamera),geometry=report.contacts.filter(r=>r.firstGeometry),earliest=[...contacts].sort((a,b)=>a.firstCamera.tick-b.firstCamera.tick)[0];
const exposure=report.anchors.map(a=>({anchor:a.id,visibleStandingTargets:report.visibility.filter(q=>q.from===a.id&&q.observerStance===0&&q.targetStance===0&&q.line.clearSamples>0).map(q=>({anchor:q.to,clearSamples:q.line.clearSamples}))}));
const summary={version:report.version,modelSha256:report.provenance.modelSha256,humanParticipants:0,routeConfigurations:report.cases.length,reached:report.cases.filter(r=>r.reached).length,timings,contacts:{pairs:report.contacts.length,withGeometricContact:geometry.length,withReferenceCameraContact:contacts.length,earliest,referenceCamera:report.cameraAgreement},exposure,limitations:report.limitations};
writeFileSync(out+'/timings.json',JSON.stringify(summary,null,2)+'\n');writeFileSync(out+'/native-report.json.gz',gzipSync(readFileSync(reportFile),{level:9,mtime:0}));
let md='| Chassis | A attack | A defense | B attack | B defense |\n| --- | ---: | ---: | ---: | ---: |\n';
for(let hero=0;hero<6;hero++){const values=[];for(const site of ['a_pad','b_pad'])for(const role of ['attack','defense'])values.push(timings.find(t=>t.hero===hero&&t.weapon===2&&t.pace==='run'&&t.site===site&&t.role===role).zone.min.toFixed(3));md+=`| ${spec.heroes[hero].name} | ${values.join(' | ')} |\n`;}
writeFileSync(out+'/fastest-zone-table.md',md);console.log(JSON.stringify({out,cases:summary.routeConfigurations,reached:summary.reached,cameraPairs:report.contacts.length,humanParticipants:0}));
