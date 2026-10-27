"""Publish GLB textures as same-origin files: the store CSP forbids blob URLs."""
import hashlib,json,pathlib,struct
root=pathlib.Path(__file__).resolve().parents[2]/'games/botstrike/web/models'
for path in root.glob('*.glb'):
 raw=path.read_bytes();size=struct.unpack_from('<I',raw,12)[0];doc=json.loads(raw[20:20+size]);images=[i for i in doc.get('images',[]) if 'bufferView' in i]
 if not images:continue
 binary=raw[28+size:];removed=set();ranges=[];folder=root/'textures';folder.mkdir(exist_ok=True)
 for i,image in enumerate(images):
  index=image.pop('bufferView');view=doc['bufferViews'][index];assert view['buffer']==0;start=view.get('byteOffset',0);length=view['byteLength'];pixels=binary[start:start+length];ext={'image/webp':'webp','image/png':'png','image/jpeg':'jpg'}[image['mimeType']];name=f'{path.stem}-{i}-{hashlib.sha256(pixels).hexdigest()[:12]}.{ext}';(folder/name).write_bytes(pixels);image['uri']='textures/'+name;removed.add(index);ranges.append((start,(start+length+3)//4*4))
 ranges.sort();compact=bytearray();cursor=0
 for start,end in ranges:compact.extend(binary[cursor:start]);cursor=end
 compact.extend(binary[cursor:]);mapping={old:new for new,old in enumerate(i for i in range(len(doc['bufferViews'])) if i not in removed)};doc['bufferViews']=[v for i,v in enumerate(doc['bufferViews']) if i not in removed]
 def rewrite(value):
  if isinstance(value,list):
   for v in value:rewrite(v)
  elif isinstance(value,dict):
   if 'bufferView' in value:value['bufferView']=mapping[value['bufferView']]
   if value.get('buffer')==0 and 'byteOffset' in value:
    offset=value['byteOffset'];assert not any(a<=offset<b for a,b in ranges);value['byteOffset']=offset-sum(b-a for a,b in ranges if b<=offset)
   for v in value.values():rewrite(v)
 rewrite(doc);doc['buffers'][0]['byteLength']=len(compact);encoded=json.dumps(doc,separators=(',',':')).encode();encoded+=b' '*((-len(encoded))%4);compact+=b'\0'*((-len(compact))%4)
 result=struct.pack('<4sII',b'glTF',2,28+len(encoded)+len(compact))+struct.pack('<I4s',len(encoded),b'JSON')+encoded+struct.pack('<I4s',len(compact),b'BIN\0')+compact;path.write_bytes(result);print(path.name,len(raw),'->',len(result),'plus',len(images),'textures')
