export function installUtilityGuide(spec,anchor){
 if(!spec.utility_effects)return;
 const p=spec.utility_effects,seconds=t=>(t/64).toFixed(1)+'s';
 const rows=[
  ['PHOTON FLASH',`Up to ${seconds(p.flash_front_ticks)}. Distance and looking away reduce the effect. Solid cover blocks it; smoke does not. Both squads can be blinded.`,'Turn away or break the direct line with solid cover.'],
  ['CARBON VEIL','Blocks optical sight for both squads for 14s. Bullets, blasts, flashes and radio scans are not stopped by smoke.','Wait, change your angle, or use a scan. A radar mark does not grant a visible body or aim assistance through smoke.'],
  ['SHARD CLUSTER','Damage falls with distance. Solid cover blocks the blast; armor and active shields reduce it. Friendly damage is off.','Leave the blast area or put solid cover between you and the charge.'],
  ['BLACKOUT CAPSULE',`Disables enemy skills for ${seconds(p.emp_ticks)} and removes temporary shields/overdrive. Cover and spawn protection block the capsule. Existing deployed fields remain active.`,'Use cover, space out, and wait for EMP to end before activating another skill.'],
  ['ECHO BEACON',`An 8s spherical field marks enemy radar positions through cover and smoke. Marks linger for ${seconds(p.scan_reveal_ticks)} after leaving. Flash does not disable squad radio.`,'Leave its field or wait for expiry. Marked enemies still need a clear optical line for IFF and aim assistance.'],
  ['REPAIR SWARM',`An 8s spherical field restores ${p.repair_per_second} HP each second to allies, through cover. Overlapping fields do not multiply healing. EMP does not remove an existing field.`,'Deny the position with damage or another angle; repair is periodic and cannot prevent a lethal hit.'],
 ];
 const details=document.createElement('details');details.className='utility-guide';const summary=document.createElement('summary');summary.textContent='UTILITY & COUNTERPLAY';details.append(summary);
 for(const [title,rule,response]of rows){const h=document.createElement('b'),text=document.createElement('p'),counter=document.createElement('p');h.textContent=title;text.textContent=rule;counter.textContent='RESPONSE · '+response;counter.className='utility-response';details.append(h,text,counter);}
 anchor.after(details);
}
