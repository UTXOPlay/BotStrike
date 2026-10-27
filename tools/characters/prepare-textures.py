"""Resize vendor PBR maps without color-space conversion; tint painted panels."""
from pathlib import Path
import argparse
import numpy as np
from PIL import Image
p=argparse.ArgumentParser();p.add_argument('source');args=p.parse_args()
colors={'cap':(.91,1.,.94),'aero':(.08,.78,1.),'syfon':(.18,1.,.45),'vision':(.57,.2,1.),'crimson':(1.,.07,.48),'maul':(1.,.33,.04)}
for folder in (Path(args.source)/'characters').iterdir():
 if not folder.is_dir():continue
 target=folder/'textures-1024';target.mkdir(exist_ok=True)
 for path in (folder/'textures').glob('*.png'):
  im=Image.open(path).convert('RGB').resize((1024,1024),Image.Resampling.LANCZOS)
  if 'basecolor' in path.name and folder.name in colors:
   rgb=np.array(im).astype(float)/255;v=rgb.max(2);sat=(v-rgb.min(2))/np.maximum(v,.001);weight=np.clip((sat-.20)*4,0,.85)[...,None];new=v[...,None]*(1-sat[...,None]+sat[...,None]*np.array(colors[folder.name]));
   if folder.name=='cap':new=np.power(v,.65)[...,None]*np.array([.91,1.,.94]);weight=np.clip((sat-.12)*5,0,1)[...,None]
   rgb=rgb*(1-weight)+new*weight;im=Image.fromarray(np.uint8(np.clip(rgb*255,0,255)))
  im.save(target/path.name)
