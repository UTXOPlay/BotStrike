const sessions=new WeakMap();

// Rotate the emulated device without resizing the fullscreen browser window.
export async function resizeMobile(page,width,height){
 let session=sessions.get(page);
 if(!session){session=await page.context().newCDPSession(page);sessions.set(page,session);}
 await session.send('Emulation.setDeviceMetricsOverride',{
  width,height,screenWidth:width,screenHeight:height,mobile:true,
  deviceScaleFactor:await page.evaluate(()=>devicePixelRatio),
  screenOrientation:{type:width>height?'landscapePrimary':'portraitPrimary',angle:width>height?90:0}
 });
}
