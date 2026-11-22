// Fixed, deterministic coordinates keep chapter order legible in both layouts.
export function routeGeometry(stages, compact=false){
 const width=compact?340:860, nodes=[];
 let index=0;
 stages.forEach((stage,row)=>stage.items.forEach((chapter,column)=>{
  const x=compact?46:(row%2?790-column*670/(stage.items.length-1):120+column*670/(stage.items.length-1));
  const y=compact?70+index*113:94+row*170;
  nodes.push({chapter,stage,row,index,x,y});index++;
 }));
 const edges=nodes.slice(1).map((node,i)=>{
  const from=nodes[i];
  const d=compact?`M${from.x} ${from.y} L${node.x} ${node.y}`:from.row===node.row?`M${from.x} ${from.y} L${node.x} ${node.y}`:`M${from.x} ${from.y} C${from.x+(from.row%2?-60:60)} ${from.y+65},${node.x+(from.row%2?-60:60)} ${node.y-65},${node.x} ${node.y}`;
  return {from:from.chapter.id,to:node.chapter.id,d,complete:from.chapter.complete&&node.chapter.complete};
 });
 return {width,height:compact?nodes.length*113+30:5*170+20,nodes,edges};
}

export function wrapMapLabel(value,max=15){
 const words=/[\u3040-\u30ff\u3400-\u9fff]/u.test(value)?[...value]:value.split(/\s+/);
 const joiner=words.length&&words[0].length===1?'':' ',lines=[''];
 for(const word of words){const i=lines.length-1,next=lines[i]?lines[i]+joiner+word:word;if(next.length>max&&lines[i])lines.push(word);else lines[i]=next;}
 return lines;
}
