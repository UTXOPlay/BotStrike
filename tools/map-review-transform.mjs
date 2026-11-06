export function mapTransform(width,height,extent){
 const narrow=width<900&&height>width,top=90,bottom=narrow?height*.46+20:28,left=28,right=narrow?28:Math.min(420,width*.3)+40;
 const availableWidth=Math.max(80,width-left-right),availableHeight=Math.max(80,height-top-bottom),scale=Math.min(availableWidth,availableHeight)/(extent*2+100);
 return {scale,x:left+availableWidth/2,y:top+availableHeight/2};
}
export const mapToScreen=(p,t)=>[t.x+p[0]*t.scale,t.y+p[2]*t.scale];
export const screenToMap=(p,t)=>[(p[0]-t.x)/t.scale,0,(p[1]-t.y)/t.scale];
