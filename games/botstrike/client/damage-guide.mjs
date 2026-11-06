export function indexDamage(matrix,version){
 if(matrix.schema!==1||matrix.version!==version||matrix.ideal_hits!==true||!Array.isArray(matrix.rows))throw Error('Damage guide version mismatch');
 const index=new Map();
 for(const row of matrix.rows){
  const key=[row.weapon,row.hero,row.armor,Number(row.head),row.distance,Number(row.shield),row.boost].join(':');
  if(index.has(key)||!Number.isInteger(row.rounds)||row.rounds<1||!Number.isInteger(row.ttk_ticks)||row.ttk_ticks<0)throw Error('Invalid damage guide');
  index.set(key,row);
 }
 return index;
}
export function damageRow(index,{weapon,hero,armor,head,distance,shield,boost}){return index.get([weapon,hero,armor,Number(head),distance,Number(shield),boost].join(':'));}
export function installDamageGuide(spec,items,tabs){
 const details=document.createElement('details');details.className='damage-guide';
 const summary=document.createElement('summary');summary.textContent='Damage guide · compare ideal hits';details.append(summary);
 const form=document.createElement('div');form.className='damage-guide-controls';details.append(form);
 function select(label,options){const wrap=document.createElement('label'),name=document.createElement('span'),input=document.createElement('select');name.textContent=label;input.setAttribute('aria-label',label);for(const [value,text]of options)input.add(new Option(text,value));wrap.append(name,input);form.append(wrap);return input;}
 const hero=select('Target chassis',spec.heroes.map((h,i)=>[i,h.name]));
 const armor=select('Target armor',[['stock','Chassis armor'],['0','No armor'],['100','100 armor']]);
 const range=select('Range',[[100,'Close · 100 units'],[600,'Mid · 600 units'],[1500,'Long · 1500 units'],[3000,'Extreme · 3000 units']]);range.value='600';
 const boost=select('Shooter boost',[[0,'None'],[1,'FORGE · 5 seconds'],[2,'Power Core · 4 seconds']]);
 const shieldLabel=document.createElement('label'),shield=document.createElement('input');shield.type='checkbox';shield.disabled=true;shieldLabel.append(shield,document.createTextNode('BASTION shield · 5 seconds'));form.append(shieldLabel);
 const note=document.createElement('p');note.textContent='Ideal hits: every pellet lands. First-round values show health lost and armor spent for that whole round. Time starts at the first round and includes the earliest empty-magazine reload. Recoil, spread, cover and reaction time make real fights take longer. Armor is spent per hit; EMP breaks the shield after its first hit. Range is measured between player roots.';details.append(note);
 const status=document.createElement('p');status.setAttribute('role','status');details.append(status);tabs.after(details);
 const outputs=Array.from(items.children).slice(0,spec.weapons.length).map(card=>{const text=document.createElement('small');text.className='damage-guide-value';card.append(text);return text;});
 let index=null,pending=null;
 function render(){
  const target=Number(hero.value);shield.disabled=target!==2;if(shield.disabled)shield.checked=false;
  if(!index)return;
  const selected={hero:target,armor:armor.value==='stock'?spec.heroes[target].armor:Number(armor.value),distance:Number(range.value),shield:shield.checked,boost:Number(boost.value)};
  status.textContent=`Against ${spec.heroes[target].name} · ${spec.heroes[target].health} HP · ${selected.armor} armor. Head multiplier ×2.5; armor piercing bypasses armor, without penetrating walls.`;
  for(let weapon=0;weapon<outputs.length;weapon++){
   const body=damageRow(index,{...selected,weapon,head:false}),head=damageRow(index,{...selected,weapon,head:true});
   const format=(r,label)=>r?`${label}: ${r.first_health_damage} HP / ${r.first_armor_damage} armor first · ${r.rounds} round${r.rounds===1?'':'s'} · ${(r.ttk_ticks/64).toFixed(2)}s${r.reloads?' · reload included':''}`:`${label}: unavailable`;
   outputs[weapon].textContent=format(body,'BODY')+'\n'+format(head,'HEAD');
   outputs[weapon].title=body&&head?`First round removes ${body.first_health_damage} HP / ${body.first_armor_damage} armor on body; ${head.first_health_damage} HP / ${head.first_armor_damage} armor on head. All ${spec.weapons[weapon].pellets} pellet(s) hit.`:'';
  }
 }
 for(const input of [hero,armor,range,boost,shield])input.addEventListener('change',render);
 details.addEventListener('toggle',()=>{
  if(!details.open||index||pending)return;
  status.textContent='Loading damage guide…';
  pending=fetch('./damage-contract.json').then(r=>{if(!r.ok)throw Error();return r.json();}).then(matrix=>{index=indexDamage(matrix,spec.version);render();}).catch(()=>{status.textContent='Damage guide unavailable. Close and reopen it to retry.';}).finally(()=>{pending=null;});
 });
}

export function damageSourceName(source,spec,fallbackWeapon){
 if(source?.kind==='utility')return spec.items[source.id]?.name||'Equipment';
 if(source?.kind==='splash')return (spec.weapons[source.id]?.name||'Plasma')+' splash';
 if(source?.kind==='other')return 'Combat damage';
 return spec.weapons[source?.id??fallbackWeapon]?.name||'Combat damage';
}
