export const padButtons={confirm:0,back:1,reload:2,skill:3,previous:4,next:5,scope:6,fire:7,scoreboard:8,menu:9,walk:10,interact:11,armory:12,utility:13,left:14,right:15};

export function standardGamepad(pads){return Array.from(pads||[]).find(p=>p&&p.connected!==false&&p.mapping==='standard'&&p.axes?.length>=4&&p.buttons?.length>=16)||null;}

export function stick(x=0,y=0,deadzone=.18){
 const raw=Math.hypot(x,y);
 if(!Number.isFinite(raw)||raw<=deadzone)return{x:0,y:0};
 const magnitude=Math.min(1,raw);
 const strength=(magnitude-deadzone)/(1-deadzone)/raw;
 return{x:x*strength,y:y*strength};
}

export function decodeGamepad(pad){
 const left=stick(pad.axes[0],pad.axes[1]),right=stick(pad.axes[2],pad.axes[3]);
 const buttons=Array.from({length:17},(_,i)=>!!(pad.buttons[i]?.pressed||pad.buttons[i]?.value>.5));
 const held={jump:buttons[0],crouch:buttons[1],reload:buttons[2],skill:buttons[3],scope:buttons[6],fire:buttons[7],walk:buttons[10],interact:buttons[11],utility:buttons[13]};
 return{index:pad.index,move:{x:left.x,y:-left.y},look:right,held,buttons,engaged:buttons.some(Boolean)||Math.hypot(left.x,left.y)>.05||Math.hypot(right.x,right.y)>.05};
}

export class GamepadTracker{
 constructor(){this.index=null;this.previous=Array(17).fill(false);this.direction=null;this.repeatAt=0;}
 reset(){this.index=null;this.previous.fill(false);this.direction=null;this.repeatAt=0;}
 update(pads,now){
  const pad=standardGamepad(pads);
  if(!pad){const disconnected=this.index!==null;this.reset();return{connected:false,disconnected,held:{},move:{x:0,y:0},look:{x:0,y:0},pressed:[],released:[],navigation:null,engaged:false};}
  if(this.index!==pad.index)this.reset();
  this.index=pad.index;
  const state=decodeGamepad(pad),pressed=[],released=[];
  for(let i=0;i<state.buttons.length;i++){if(state.buttons[i]&&!this.previous[i])pressed.push(i);if(!state.buttons[i]&&this.previous[i])released.push(i);}
  this.previous=state.buttons;
  const {buttons,move}=state;
  const direction=buttons[12]?'up':buttons[13]?'down':buttons[14]?'left':buttons[15]?'right':Math.abs(move.y)>.7&&Math.abs(move.y)>Math.abs(move.x)?move.y>0?'up':'down':Math.abs(move.x)>.7?move.x<0?'left':'right':null;
  const navigation=direction&&(direction!==this.direction||now>=this.repeatAt)?direction:null;
  if(navigation)this.repeatAt=now+(direction===this.direction?140:280);
  this.direction=direction;
  return{...state,connected:true,disconnected:false,pressed,released,navigation};
 }
}
