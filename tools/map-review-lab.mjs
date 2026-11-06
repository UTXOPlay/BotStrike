import {mapTransform,mapToScreen,screenToMap} from './map-review-transform.mjs';
const $=id=>document.getElementById(id),[report,spec]=await Promise.all(['/report.json','/spec.json'].map(u=>fetch(u).then(r=>{if(!r.ok)throw Error('Review data unavailable');return r.json()})));
const map=spec.maps.find(m=>m.id===report.map),canvas=$('map'),ctx=canvas.getContext('2d'),cache=document.createElement('canvas');
let transform,dpr,frame=0,pending=false,lastPointer=null;
for(const anchor of report.anchors)for(const id of ['observer','target'])$(id).add(new Option(anchor.name,anchor.id));
for(const [i,o]of map.obstacles.entries())$('cover').add(new Option('#'+(i+1)+' · '+o.kind+' · height '+o.max[1],String(i)));
$('cover').value='';
$('observer').value='a_entry';$('target').value='a_pad';
const label=row=>{
 const c=row.case,role=c.slot<5?'ATTACK':'DEFENSE';
 return `${spec.heroes[c.hero].name} · ${spec.weapons[c.weapon].name} · ${role} ${c.slot%5+1} · ${c.id.replace(/-h\d.*$/,'')} · ${c.pace}`;
};
function filter(){
 const before=$('route').value,query=$('search').value.toLowerCase();$('route').replaceChildren();
 for(const row of report.cases)if(label(row).toLowerCase().includes(query))$('route').add(new Option(label(row),row.case.id));
 if([...$('route').options].some(o=>o.value===before))$('route').value=before;selectRoute();
}
function selectRoute(){
 const row=report.cases.find(r=>r.case.id===$('route').value);frame=0;$('tick').max=Math.max(0,(row?.trace.length||1)-1);$('tick').value=0;$('tick').disabled=!row?.trace.length;
 $('timing').textContent=row?`${row.reached?'REACHED':'FAILED'} · zone ${row.site_entry_ticks===null?'—':(row.site_entry_ticks/64).toFixed(3)+'s'} · pad ${(row.arrival_ticks/64).toFixed(3)}s · stopped ${(row.settled_ticks/64).toFixed(3)}s · ${Math.round(row.distance)} units · prelude ${(row.prelude_ticks/64).toFixed(2)}s`:'No matching route';
 $('trace-label').textContent=row?.trace.length?'Native tick trace; no interpolated poses.':'Planned waypoints; timing was measured in native simulation.';invalidate();
}
function invalidate(){if(!pending){pending=true;requestAnimationFrame(()=>{pending=false;draw()})}}
function path(context,points,color,width=1,dash=[]){if(!points.length)return;context.strokeStyle=color;context.lineWidth=width;context.setLineDash(dash);context.beginPath();points.forEach((p,i)=>{const [x,y]=mapToScreen(p,transform);i?context.lineTo(x,y):context.moveTo(x,y)});context.stroke();context.setLineDash([]);}
function dot(context,p,color,radius=4){const [x,y]=mapToScreen(p,transform);context.fillStyle=color;context.beginPath();context.arc(x,y,radius,0,Math.PI*2);context.fill()}
function staticMap(){
 cache.width=canvas.width;cache.height=canvas.height;const c=cache.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.fillStyle='#0b1720';c.fillRect(0,0,innerWidth,innerHeight);
 const size=map.extent;for(let x=-size;x<=size;x+=100)path(c,[[x,0,-size],[x,0,size]],'#18303d');for(let z=-size;z<=size;z+=100)path(c,[[-size,0,z],[size,0,z]],'#18303d');
 path(c,[[-size,0,-size],[size,0,-size],[size,0,size],[-size,0,size],[-size,0,-size]],'#78919d',2);
 c.font=`${Math.max(11,Math.min(20,innerWidth/95))}px monospace`;c.textAlign='center';c.textBaseline='middle';
 for(const [i,o]of map.obstacles.entries()){
  const a=mapToScreen(o.min,transform),b=mapToScreen(o.max,transform);c.fillStyle=o.max[1]<=56?'#6b7758':'#49616e';c.fillRect(a[0],a[1],b[0]-a[0],b[1]-a[1]);c.strokeStyle='#b4c2c9';c.strokeRect(a[0],a[1],b[0]-a[0],b[1]-a[1]);
  c.fillStyle='#fff';c.fillText(map.extent*2*transform.scale<620?String(i+1):`${i+1} / ${o.max[1]}`, (a[0]+b[0])/2,(a[1]+b[1])/2);
 }
 for(const [i,p]of map.sites.entries()){
  const [x,y]=mapToScreen(p,transform);c.strokeStyle='#eac776';c.setLineDash([5,4]);c.beginPath();c.arc(x,y,125*transform.scale,0,Math.PI*2);c.stroke();c.setLineDash([]);c.fillStyle='#ffe5a0';c.fillText(i?'B':'A',x,y);
 }
 for(const [side,points]of map.spawns.entries())for(const [i,p]of points.entries()){dot(c,p,side?'#f5a077':'#77e0ef',map.extent*2*transform.scale<620?2:4);const [x,y]=mapToScreen(p,transform);c.fillStyle='#d3e5ec';if(map.extent*2*transform.scale>=620)c.fillText(String(i+1),x,y+(side?-14:14));}
}
function resize(){
 dpr=Math.min(devicePixelRatio||1,2,Math.sqrt(2560*1440/(innerWidth*innerHeight)));canvas.width=Math.floor(innerWidth*dpr);canvas.height=Math.floor(innerHeight*dpr);transform=mapTransform(innerWidth,innerHeight,map.extent);staticMap();invalidate();
}
function draw(){
 ctx.setTransform(1,0,0,1,0,0);ctx.drawImage(cache,0,0);ctx.setTransform(dpr,0,0,dpr,0,0);
 const selected=map.obstacles[Number($('cover').value)];if($('cover').value!==''&&selected){const a=mapToScreen(selected.min,transform),b=mapToScreen(selected.max,transform);ctx.strokeStyle='#ffe49c';ctx.lineWidth=3;ctx.strokeRect(a[0],a[1],b[0]-a[0],b[1]-a[1]);}
 const row=report.cases.find(r=>r.case.id===$('route').value);
 if(row){path(ctx,[row.start_position,...row.waypoints],'#b79bea',2,[7,4]);if(row.trace.length){path(ctx,row.trace.map(f=>f.position),'#80dce5',2);const p=row.trace[Math.min(frame,row.trace.length-1)];dot(ctx,p.position,'#fff',7);path(ctx,[p.position,[p.position[0]-Math.sin(p.yaw)*70,0,p.position[2]-Math.cos(p.yaw)*70]],'#fff',2);$('clock').textContent=`TICK ${p.tick} · ${(p.tick/64).toFixed(3)}s`;}else{$('clock').textContent='NO STORED TICK TRACE';}}
 const a=report.anchors.find(a=>a.id===$('observer').value),b=report.anchors.find(a=>a.id===$('target').value);
 const query=report.visibility.find(v=>v.from===a?.id&&v.to===b?.id&&v.observerStance===Number($('observer-stance').value)&&v.targetStance===Number($('target-stance').value));
 if(query){
  const eye=[a.position[0],56-19*query.observerStance,a.position[2]];
  for(const ray of query.line.samples){const end=ray.target;
   if(ray.visible)path(ctx,[eye,end],'#79edbc',1);
   else{const delta=end.map((v,i)=>v-eye[i]),length=Math.hypot(...delta);const impact=ray.shotDistance===null?end:eye.map((v,i)=>v+delta[i]*ray.shotDistance/length);path(ctx,[eye,impact],'#ffac87',1);dot(ctx,impact,'#ffba94',2);}
  }
  $('sight').textContent=`${query.line.clearSamples}/14 authored samples optically clear. Ground obstacles are numbered with native height. Rays retain their 3D height; this plan is an XZ projection.`;
 }else $('sight').textContent='Choose different observer and target anchors.';
 ctx.font=`600 ${Math.max(12,Math.min(22,innerWidth/95))}px system-ui`;ctx.textAlign='center';ctx.textBaseline='bottom';
 for(const p of report.anchors){const selected=p.id===a?.id||p.id===b?.id;dot(ctx,p.position,selected?'#ffdf91':'#7fc7d6',selected?6:3);const [x,y]=mapToScreen(p.position,transform);if(map.extent*2*transform.scale<620&&!selected&&!['a_pad','b_pad','attack_spawn','defense_spawn'].includes(p.id))continue;ctx.lineWidth=4;ctx.strokeStyle='#07121e';ctx.strokeText(p.name,x,y-8);ctx.fillStyle=selected?'#ffdf91':'#c7d9e3';ctx.fillText(p.name,x,y-8);}
}
$('search').addEventListener('input',filter);$('route').addEventListener('change',selectRoute);for(const id of ['observer','target','observer-stance','target-stance','cover'])$(id).addEventListener('change',invalidate);
$('tick').addEventListener('input',()=>{frame=Number($('tick').value);invalidate()});
canvas.addEventListener('pointerdown',event=>{const rect=canvas.getBoundingClientRect();lastPointer=screenToMap([event.clientX-rect.left,event.clientY-rect.top],transform);const near=[...report.anchors].sort((a,b)=>Math.hypot(a.position[0]-lastPointer[0],a.position[2]-lastPointer[2])-Math.hypot(b.position[0]-lastPointer[0],b.position[2]-lastPointer[2]))[0];if(near&&Math.hypot(near.position[0]-lastPointer[0],near.position[2]-lastPointer[2])*transform.scale<=44){$('observer').value=near.id;invalidate();}});
$('snapshot').onclick=()=>{const a=document.createElement('a');a.download='botstrike-map-review.png';a.href=canvas.toDataURL('image/png');a.click()};
$('provenance').textContent=`${report.version} · ${report.provenance.modelSha256.slice(0,12)} · ${report.cases.length} native route cases · ${report.contacts.length} route pairs · HUMAN N=0`;
window.mapReview={state:()=>({transform:{...transform},lastPointer,observer:$('observer').value,target:$('target').value,route:$('route').value,frame,backing:[canvas.width,canvas.height],viewport:[innerWidth,innerHeight],mapId:map.id}),screen:id=>mapToScreen(report.anchors.find(a=>a.id===id).position,transform)};
filter();$('route').value='spawn-0-a_pad-h3-w2-run';selectRoute();addEventListener('resize',resize);resize();document.documentElement.dataset.ready='true';
