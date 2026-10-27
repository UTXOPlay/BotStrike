import {createWorld} from '../games/botstrike/client/scene.mjs';
import spec from '../botstrike/spec.json';
const world=createWorld(document.querySelector('canvas'),spec);await world.preload();
const state={tick:1,config:{map:0,mode:'deathmatch'},phase:'live',utilities:[],objective:{hidden:true},players:Array.from({length:10},(_,slot)=>({slot,hero:0,team:slot<5?0:1,life:1,weapon:2,alive:true,hidden:![0,1,5].includes(slot),position:slot===0?[0,0,1050]:[slot===1?-65:65,0,700],velocity:[0,0,0],yaw:Math.PI,pitch:0}))};
window.renderIFF=(options={})=>{
 state.players[0].team=options.reverse?1:0;state.players[0].scoped=!!options.scoped;state.players[0].weapon=options.scoped?3:2;
 state.players[5].hidden=!!options.hidden;state.players[5].alive=!options.dead;
 state.utilities=options.smoke?[{kind:2,fuse:0,position:[0,0,850],life:300}]:[];
 world.resize();world.frame(state,0,1000,.016,{active:true,yaw:0,pitch:0,local:state.players[0].position,reduced:true});
 const sprites=world.scene.children.filter(n=>n.name.startsWith('iff-'));
 return{markers:sprites.filter(s=>s.visible).map(s=>({name:s.name,color:s.material.map.image.getContext('2d').getImageData(64,24,1,1).data.toString(),depthTest:s.material.depthTest,size:s.scale.x,position:s.position.toArray()})),calls:world.renderer.info.render.calls,backing:world.renderer.domElement.width*world.renderer.domElement.height};
};
window.artReady=true;
