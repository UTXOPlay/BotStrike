// Menu/focus/rotation changes consume existing holds. Only a fresh key press,
// button release, or centered stick can admit that control after resuming.
const heldButtons={jump:0,crouch:1,reload:2,skill:3,scope:6,fire:7,walk:10,interact:11,utility:13};
const directions={up:12,down:13,left:14,right:15};
export class InputBoundary{
 constructor(){this.keys=new Set();this.buttons=new Set();this.move=false;this.look=false;}
 clear(keys,pad={}){for(const key of keys)this.keys.add(key);for(const [i,held]of (pad.buttons||[]).entries())if(held)this.buttons.add(i);this.move||=Math.hypot(pad.move?.x||0,pad.move?.y||0)>.05;this.look||=Math.hypot(pad.look?.x||0,pad.look?.y||0)>.05;}
 key(code,repeat=false){if(!repeat)this.keys.delete(code);return !this.keys.has(code);}
 release(code){this.keys.delete(code);}
 gamepad(state){
  for(const i of this.buttons)if(!state.buttons?.[i])this.buttons.delete(i);
  const held={...state.held};for(const [name,i]of Object.entries(heldButtons))if(this.buttons.has(i))held[name]=false;
  if(Math.hypot(state.move?.x||0,state.move?.y||0)<=.05)this.move=false;
  if(Math.hypot(state.look?.x||0,state.look?.y||0)<=.05)this.look=false;
  return {...state,held,pressed:(state.pressed||[]).filter(i=>!this.buttons.has(i)),navigation:this.buttons.has(directions[state.navigation])?null:state.navigation,move:this.move?{x:0,y:0}:state.move,look:this.look?{x:0,y:0}:state.look};
 }
}
