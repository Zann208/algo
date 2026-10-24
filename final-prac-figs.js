/* Diagrams for the Final practice problems page. Reuses the Final Prep Lab drawing code. */
(function(){
'use strict';
var D=window.FinalPrepDraw,L=window.FinalPrepLogic,page=document.getElementById('page-finalprac');
if(!D||!L||!page)return;
var st=document.createElement('style');
st.textContent=`
.fp-fig{--am:#ffd23f;--gr:#39ff9c;--cy:#22d3ff;--vi:#c58bff;--rd:#ff4d6d;--ink:#ffffff;--dim:#c3cee6;--faint:#94a3c4;--panel:#0a1020;--panel2:#131c33;--line2:#44557b;--tline:#6a7da3;
  margin:12px 0 14px;padding:10px;border:1px solid var(--line2);border-radius:12px;background:#0a1020;max-width:640px}
html:not(.dark) .fp-fig{--am:#b45309;--gr:#047857;--cy:#0369a1;--vi:#6d28d9;--rd:#b91c1c;--ink:#0f172a;--dim:#475569;--faint:#64748b;--panel:#ffffff;--panel2:#f1f5f9;--line2:#cbd5e1;--tline:#94a3b8;background:#ffffff}
.fp-fig svg{display:block;width:100%;height:auto;max-height:380px}
.fp-fig .fp-cap{font:600 12px var(--mono,monospace);color:var(--dim);margin:6px 2px 0}
.fp-fig .fp-two{display:grid;grid-template-columns:1fr 1fr;gap:10px}
@media(max-width:620px){.fp-fig .fp-two{grid-template-columns:1fr}}
.fp-fig .fl-nt{font:800 16px var(--mono,monospace);text-anchor:middle;dominant-baseline:central}
.fp-fig .fl-wt{font:700 12px var(--mono,monospace);text-anchor:middle;dominant-baseline:central}
.fp-fig .fl-lab{font:700 13px var(--mono,monospace);text-anchor:middle}
.fp-fig .fl-hit{stroke:transparent}
.fp-fig text{pointer-events:none}
`;
document.head.appendChild(st);

var M=L.machines;
function run(name,gk,start){var m=M[name],g=L.GRAPHS[gk],s=m.init(g,start),n=0;
  while(!m.done(s,g)&&n++<60)s=m.apply(s,g,m.cands(s,g)[0]);return m.view(s,g)}
function gfig(gk,view,cap){return '<div class="fp-fig">'+D.graph(L.GRAPHS[gk],view||{},{})+(cap?'<div class="fp-cap">'+cap+'</div>':'')+'</div>'}

/* generic tree drawer: node = {t,s,k:[children],el:[edge labels],c:class,ec:[edge classes]} */
function tree(root,o){
  o=o||{};var C=D.pal(),X=o.dx||64,Y=o.dy||70,leaf=0,all=[];
  (function lay(n,d){n.d=d;if(n.k&&n.k.length){n.k.forEach(function(c){lay(c,d+1)});n.x=(n.k[0].x+n.k[n.k.length-1].x)/2}else{n.x=leaf++*X}all.push(n)})(root,0);
  var maxd=Math.max.apply(0,all.map(function(n){return n.d})),pad=34,W=Math.max(1,leaf-1)*X+pad*2,H=maxd*Y+pad*2+16;
  var s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="tree">';
  function P(n){return [n.x+pad,n.d*Y+pad]}
  all.forEach(function(n){(n.k||[]).forEach(function(c,i){
    var a=P(n),b=P(c),ec=(n.ec&&n.ec[i])||'',col=ec==='pr'?C.rd:ec==='in'?C.gr:C.dim;
    s+='<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" style="stroke:'+col+';stroke-width:'+(ec==='in'?4:2.4)+'px;'+(ec==='pr'?'stroke-dasharray:5 4;':'')+'"/>';
    if(n.el&&n.el[i]!==undefined){var mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;
      s+='<rect x="'+(mx-10)+'" y="'+(my-9)+'" width="20" height="18" rx="5" style="fill:'+C.panel+';stroke:'+col+'"/><text class="fl-wt" x="'+mx+'" y="'+my+'" style="fill:'+C.ink+'">'+n.el[i]+'</text>'}
  })});
  all.forEach(function(n){
    var p=P(n),c=n.c||'',col=c==='pr'?C.rd:c==='win'?C.gr:c==='max'?C.am:c==='min'?C.cy:C.dim,
      fill=c==='win'||c==='max'||c==='min'?D.mixc(col,C.panel,C.dark?.85:.3):D.mixc(C.ink,C.panel,.1),
      tc=(c==='win'||c==='max'||c==='min')&&C.dark?'#06101f':C.ink,dash=c==='pr'?'stroke-dasharray:4 3;':'';
    if(c==='max')s+='<rect x="'+(p[0]-19)+'" y="'+(p[1]-19)+'" width="38" height="38" rx="8" style="fill:'+fill+';stroke:'+col+';stroke-width:3px"/>';
    else if(n.leafbox)s+='<rect x="'+(p[0]-21)+'" y="'+(p[1]-15)+'" width="42" height="30" rx="7" style="fill:'+fill+';stroke:'+col+';stroke-width:2.6px;'+dash+'"/>';
    else s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="19" style="fill:'+fill+';stroke:'+col+';stroke-width:3px;'+dash+'"/>';
    s+='<text class="fl-nt" x="'+p[0]+'" y="'+p[1]+'" style="fill:'+(c==='pr'?C.faint:tc)+'">'+n.t+'</text>';
    if(n.s!==undefined)s+='<text class="fl-lab" x="'+p[0]+'" y="'+(p[1]+(n.leafbox?30:34))+'" style="fill:'+C.cy+'">'+n.s+'</text>';
    if(n.b!==undefined)s+='<text class="fl-lab" x="'+(p[0]+22)+'" y="'+(p[1]-18)+'" style="fill:'+C.am+'">'+n.b+'</text>';
  });
  return s+'</svg>';
}
function tfig(root,o,cap){return '<div class="fp-fig">'+tree(root,o)+(cap?'<div class="fp-cap">'+cap+'</div>':'')+'</div>'}
function N(t,k,x){var n={t:t,k:k};for(var q in x)n[q]=x[q];return n}

/* Q7 search tree with expansion numbers */
function searchTree(order){
  var ord={};order.forEach(function(v,i){ord[v]=i+1});
  function n(t,k){return N(t,k,{b:ord[t]})}
  return n('R',[n('X',[n('X1'),n('X2')]),n('Y',[n('Y1')]),n('Z',[n('Z1'),n('Z2')])]);
}
/* Q11 minimax tree */
function mm(vals,withAnswer){
  var mins=vals.map(function(a){return Math.min.apply(0,a)}),root=Math.max.apply(0,mins),names=['L','M','R'];
  var kids=vals.map(function(a,i){
    var ks=a.map(function(v,j){var pr=withAnswer&&i===1&&j===2;return {t:v,c:pr?'pr':'',leafbox:true}});
    return {t:withAnswer?'':'',s:undefined,k:ks,c:'min',ec:ks.map(function(k){return k.c==='pr'?'pr':''}),b:names[i],_v:mins[i]}});
  kids.forEach(function(k,i){k.t=withAnswer?String(mins[i]):'?'});
  return {t:withAnswer?String(root):'?',c:'max',k:kids,ec:kids.map(function(k,i){return withAnswer&&mins[i]===root?'in':''})};
}
/* Q18 Huffman tree */
function huff(){
  function lf(t,f){return {t:t,s:f,leafbox:true}}
  var f14={t:'14',k:[lf('F',5),lf('E',9)],el:[0,1]},
      n30={t:'30',k:[f14,lf('D',16)],el:[0,1]},
      n25={t:'25',k:[lf('C',12),lf('B',13)],el:[0,1]},
      n55={t:'55',k:[n25,n30],el:[0,1]};
  return {t:'100',k:[lf('A',45),n55],el:[0,1],c:'win'};
}
/* Q10 hill-climbing landscape */
function landscape(){
  var C=D.pal(),pts=[],i;
  function f(x){return 120-70*Math.exp(-Math.pow((x-130)/55,2))-105*Math.exp(-Math.pow((x-400)/70,2))}
  for(i=40;i<=560;i+=4)pts.push(i+','+(f(i)+20).toFixed(1));
  var s='<svg viewBox="0 0 600 190" role="img" aria-label="landscape">'+
   '<line x1="30" y1="170" x2="580" y2="170" style="stroke:'+C.dim+';stroke-width:2px"/>'+
   '<polyline points="'+pts.join(' ')+'" style="fill:none;stroke:'+C.cy+';stroke-width:4px;stroke-linejoin:round"/>'+
   '<circle cx="130" cy="'+(f(130)+20)+'" r="9" style="fill:'+C.am+';stroke:'+C.am+'"/>'+
   '<circle cx="400" cy="'+(f(400)+20)+'" r="9" style="fill:'+C.gr+';stroke:'+C.gr+'"/>'+
   '<circle cx="45" cy="'+(f(45)+20)+'" r="7" style="fill:'+C.vi+';stroke:'+C.vi+'"/>'+
   '<text class="fl-lab" x="130" y="'+(f(130)+20-18)+'" style="fill:'+C.am+'">local max</text>'+
   '<text class="fl-lab" x="400" y="'+(f(400)+20-18)+'" style="fill:'+C.gr+'">global max</text>'+
   '<text class="fl-lab" x="60" y="'+(f(45)+20+26)+'" style="fill:'+C.vi+'">start</text>'+
   '<text class="fl-lab" x="305" y="188" style="fill:'+C.dim+'">state space</text></svg>';
  return '<div class="fp-fig">'+s+'<div class="fp-cap">Hill climbing starting on the left climbs to the local maximum and stops; the better peak is on the right.</div></div>';
}
/* Q9 two frontier nodes */
function twoNodes(){
  var C=D.pal();function nd(x,l,t1,t2){return '<circle cx="'+x+'" cy="86" r="22" style="fill:'+D.mixc(C.ink,C.panel,.1)+';stroke:'+C.cy+';stroke-width:3px"/><text class="fl-nt" x="'+x+'" y="86" style="fill:'+C.ink+'">'+l+'</text>'+
    '<text class="fl-lab" x="'+x+'" y="132" style="fill:'+C.am+'">'+t1+'</text><text class="fl-lab" x="'+x+'" y="152" style="fill:'+C.vi+'">'+t2+'</text>'}
  var s='<svg viewBox="0 0 400 170"><rect x="170" y="8" width="60" height="28" rx="9" style="fill:'+D.mixc(C.ink,C.panel,.1)+';stroke:'+C.dim+';stroke-width:2.6px"/><text class="fl-nt" x="200" y="22" style="fill:'+C.ink+';font-size:13px">start</text>'+
   '<line x1="190" y1="36" x2="110" y2="64" style="stroke:'+C.dim+';stroke-width:2.4px"/><line x1="210" y1="36" x2="290" y2="64" style="stroke:'+C.dim+';stroke-width:2.4px"/>'+
   nd(100,'X','g = 2','h = 5')+nd(300,'Y','g = 8','h = 3')+'</svg>';
  return '<div class="fp-fig">'+s+'<div class="fp-cap">Frontier: X and Y are waiting to be expanded.</div></div>';
}

var FIG={
  q1:function(){return gfig('practice',{},'The graph for questions 1 to 3.')},
  q1a:function(){return gfig('practice',run('kruskal','practice'),'Kruskal result: chosen edges in green, total weight 13.')},
  q2:function(){return gfig('practice',{},'Same graph as question 1.')},
  q2a:function(){return gfig('practice',run('prim','practice','A'),'Prim from A: the same tree, total weight 13.')},
  q3:function(){return gfig('practice',{},'Same graph as question 1.')},
  q3a:function(){return gfig('practice',run('dijkstra','practice','A'),'Distances from A shown under each vertex; green edges form the shortest-path tree (A, C, B, D, E, F).')},
  q7:function(){return tfig(searchTree([]),{dx:62,dy:70},'Search tree for question 7.')},
  q7a:function(){return '<div class="fp-fig"><div class="fp-two"><div>'+tree(searchTree(['R','X','Y','Z','X1','X2','Y1','Z1','Z2']),{dx:56,dy:64})+'<div class="fp-cap">Breadth-first (queue)</div></div><div>'+
    tree(searchTree(['R','X','X1','X2','Y','Y1','Z','Z1','Z2']),{dx:56,dy:64})+'<div class="fp-cap">Depth-first (stack)</div></div></div><div class="fp-cap">Numbers show the order of expansion.</div></div>'},
  q9:twoNodes,
  q10:landscape,
  q11:function(){return tfig(mm([[5,9,4],[6,3,8],[7,5,6]],false),{dx:52,dy:84},'MAX at the root (square), MIN below it (circles), leaves at the bottom.')},
  q11a:function(){return tfig(mm([[5,9,4],[6,3,8],[7,5,6]],true),{dx:52,dy:84},'MIN values 4, 3, 5; root = 5 via R. The dashed leaf 8 is pruned.')},
  q18a:function(){return tfig(huff(),{dx:58,dy:74},'Huffman tree: 0 = left, 1 = right. Frequencies under the leaves.')}
};
function render(){
  Array.prototype.forEach.call(page.querySelectorAll('[data-fig]'),function(h){var f=FIG[h.dataset.fig];if(f)h.innerHTML=f()});
}
render();
document.addEventListener('sc-theme-change',render);
})();
