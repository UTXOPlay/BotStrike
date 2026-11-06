// Measure only on layout changes, never on the render/input timeline. The rack
// stays above the real loadout height, including large-display CSS scaling.
export function installLoadoutStack(loadout,rack){
 let frame=0;
 function update(){frame=0;const rect=loadout.getBoundingClientRect();if(document.documentElement.dataset.mobile==='true'||!rect.height){rack.style.removeProperty('bottom');return;}rack.style.bottom=(innerHeight-rect.top+12)+'px';}
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
 const observer=typeof ResizeObserver==='function'?new ResizeObserver(schedule):null;observer?.observe(loadout);addEventListener('resize',schedule);schedule();
 return ()=>{observer?.disconnect();removeEventListener('resize',schedule);cancelAnimationFrame(frame);};
}
