"use strict";
/* Checks the Final Prep Lab logic against answers already worked on this site:
   Practice Q1 (Kruskal/Prim = 13, Dijkstra table), Assignment 4 (MST = 33), the lecture Huffman
   tree (355 bits), Practice Q18 (2.24 bits), mock Q11 (alpha-beta prunes exactly one leaf).
   Run:  node tests/final-prep-logic.test.js   (no dependencies) */
const L=require('../final-prep-logic.js');
const assert=require('assert');
function run(m,g,start,pick){
  let s=m.init(g,start),n=0;
  while(!m.done(s,g)){const c=m.cands(s,g);s=m.apply(s,g,pick?pick(c):c[0]);if(++n>500)throw new Error('loop')}
  return s;
}
const G=L.GRAPHS,M=L.machines;
// Kruskal practice Q1 = 13, order B-C,A-C,D-E,E-F,B-D
let k=run(M.kruskal,G.practice);
assert.strictEqual(k.total,13);assert.deepStrictEqual(k.tree,['B-C','A-C','D-E','E-F','B-D']);
// Prim from A = 13, order A-C, B-C, B-D, D-E, E-F
let p=run(M.prim,G.practice,'A');assert.strictEqual(p.total,13);assert.deepStrictEqual(p.tree,['A-C','B-C','B-D','D-E','E-F']);
// Dijkstra practice from A: B3 C2 D8 E10 F13
let d=run(M.dijkstra,G.practice,'A');
assert.deepStrictEqual(d.dist,{A:0,B:3,C:2,D:8,E:10,F:13});
// A4: kruskal 33, prim from A 33, both 9 edges
let k4=run(M.kruskal,G.a4);assert.strictEqual(k4.total,33);assert.strictEqual(k4.tree.length,9);
let p4=run(M.prim,G.a4,'A');assert.strictEqual(p4.total,33);
assert.deepStrictEqual(p4.tree.slice(0,6),['A-D','A-J','E-J','C-E','C-F','B-F']);assert.deepStrictEqual(p4.tree.slice(6,8).sort(),['E-G','F-H']);assert.strictEqual(p4.tree[8],'H-I');
// tie freedom in Kruskal: choose last candidate each time, still 33
let k4b=run(M.kruskal,G.a4,null,c=>c[c.length-1]);assert.strictEqual(k4b.total,33);
let p4b=run(M.prim,G.a4,'A',c=>c[c.length-1]);assert.strictEqual(p4b.total,33);
// mock graph MST: 10 edges, connected
let km=run(M.kruskal,G.mock);console.log('mock MST',km.total,km.tree.length);assert.strictEqual(km.tree.length,10);
let pm=run(M.prim,G.mock,'A');assert.strictEqual(pm.total,km.total);
// BFS/DFS visit all
for(const gid of ['practice','a4','mock']){
  for(const id of ['bfs','dfs']){const s=run(M[id],G[gid],'A');assert.strictEqual(Object.keys(s.num).length,Object.keys(G[gid].nodes).length)}
}
let b=run(M.bfs,G.practice,'A');console.log('bfs',Object.keys(b.num).sort((x,y)=>b.num[x]-b.num[y]).join(''));
let df=run(M.dfs,G.practice,'A');console.log('dfs',Object.keys(df.num).sort((x,y)=>df.num[x]-df.num[y]).join(''));
assert.strictEqual(Object.keys(b.num).sort((x,y)=>b.num[x]-b.num[y]).join(''),'ABCDEF');
// toposort
let t=run(M.toposort,G.tasks);console.log('topo',t.removed.join(''));
assert.strictEqual(t.removed.length,7);
const pos={};t.removed.forEach((v,i)=>pos[v]=i);G.tasks.edges.forEach(e=>assert(pos[e[0]]<pos[e[1]]));
// dijkstra on directed graph
run(M.dijkstra,G.tasks,'A');
// Euler
assert.strictEqual(L.eulerVerdict(G.practice).kind,'trail');
console.log('euler practice',L.eulerVerdict(G.practice).odd,'a4',L.eulerVerdict(G.a4).kind,'mock',L.eulerVerdict(G.mock).odd);
let pm1=L.postman(G.practice);console.log('postman practice',pm1.total,pm1.extra,JSON.stringify(pm1.pairs));
let pm2=L.postman(G.mock);console.log('postman mock',pm2.total,pm2.extra);
// Hamilton
let h=L.bestHamilton(G.practice);console.log('ham practice',h);
let t0=Date.now();let h2=L.bestHamilton(G.a4);console.log('ham a4',h2.exists,h2.len,h2.capped,Date.now()-t0,'ms');
t0=Date.now();let h3=L.bestHamilton(G.mock);console.log('ham mock',h3.exists,h3.len,h3.capped,Date.now()-t0,'ms');
// Search
const S=L.SEARCH;
const orders={};
for(const id of ['sbfs','sdfs','sucs','sgreedy','sastar']){const s=run(M[id],S);orders[id]=s.order.join('')+' cost '+s.cost;console.log(id,orders[id])}
assert(orders.sastar.endsWith('cost 9'));assert(orders.sucs.endsWith('cost 9'));assert(orders.sgreedy.endsWith('cost 12'));
let id=run(M.iddfs,S);console.log('iddfs',M.iddfs.summary(id,S),id.ev.length);
// Hill/anneal
let x=10;for(let i=0;i<100;i++)x=L.hillStep(x);console.log('hill from 10 ->',x,L.LAND[x]);
let x2=40;for(let i=0;i<100;i++)x2=L.hillStep(x2);console.log('hill from 40 ->',x2,L.LAND[x2]);
let wins=[];for(let sd=1;sd<=40;sd++){const r=L.annealRun(10,sd),fin=r[r.length-1].x;if(Math.abs(fin-30)<=2)wins.push(sd)}
console.log('anneal wins from 10 (seeds)',wins.join(','));
// Minimax / alpha-beta mock Q11
let mm=L.minimax([[5,9,4],[6,3,8],[7,5,6]]);assert.strictEqual(mm.root,5);assert.strictEqual(mm.move,2);
let ab=L.alphaBeta([[5,9,4],[6,3,8],[7,5,6]]);assert.strictEqual(ab.root,5);assert.deepStrictEqual(ab.pruned,[[1,2]]);
let ab2=L.alphaBeta([[4,7,3],[2,12,6],[10,11,2]]);assert.strictEqual(ab2.root,3);console.log('notes example pruned',JSON.stringify(ab2.pruned));
for(let r=0;r<2000;r++){const lv=[0,1,2].map(()=>[0,1,2].map(()=>Math.floor(Math.random()*20)-5));assert.strictEqual(L.alphaBeta(lv).root,L.minimax(lv).root)}
// Huffman lecture example
const fr=[['A',10],['B',15],['C',5],['D',15],['E',20],['F',5],['G',15],['H',30],['I',5]].map(([s,f])=>({s,f}));
let st=L.huffInit(fr);while(st.active.length>1){const [a,b2]=L.huffAuto(st);assert(L.huffValid(st,a,b2));st=L.huffApply(st,a,b2)}
const codes=L.huffCodes(st),cost=L.huffCost(st,codes);console.log(codes,cost);
assert.strictEqual(cost.bits,355);
// prefix free
const cs=Object.values(codes);cs.forEach(a=>cs.forEach(b=>{if(a!==b)assert(!b.startsWith(a))}));
// practice Q18: A45 B13 C12 D16 E9 F5 -> avg 2.24
const f18=[['A',45],['B',13],['C',12],['D',16],['E',9],['F',5]].map(([s,f])=>({s,f}));
st=L.huffInit(f18);while(st.active.length>1){const [a,b2]=L.huffAuto(st);st=L.huffApply(st,a,b2)}
const c18=L.huffCodes(st);assert.strictEqual(L.huffCost(st,c18).avg,2.24);
const dec=L.huffDecode(codes,L.huffEncode(codes,'CABBAGE').bits);assert.strictEqual(dec.text,'CABBAGE');
console.log('ALL OK');
