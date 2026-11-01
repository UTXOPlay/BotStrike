import {writeFileSync} from 'node:fs';
const sessions=new WeakMap();

async function sessionFor(page){
 let session=sessions.get(page);
 if(!session){session=await page.context().newCDPSession(page);sessions.set(page,session);}
 return session;
}

// Rotate the emulated device without resizing the fullscreen browser window.
export async function resizeMobile(page,width,height){
 const session=await sessionFor(page);
 await session.send('Emulation.setDeviceMetricsOverride',{
  width,height,screenWidth:width,screenHeight:height,mobile:true,
  deviceScaleFactor:await page.evaluate(()=>devicePixelRatio),
  screenOrientation:{type:width>height?'landscapePrimary':'portraitPrimary',angle:width>height?90:0}
 });
}

// Playwright's viewport screenshot restores its original size after a CDP rotation.
export async function screenshotMobile(page,path){
 const session=await sessionFor(page);
 const {data}=await session.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false,fromSurface:true});
 writeFileSync(path,Buffer.from(data,'base64'));
 return Buffer.from(data,'base64');
}
