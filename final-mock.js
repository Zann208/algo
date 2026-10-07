"use strict";
/* Final Mock: past-paper questions with model answers.
   Draws the Question 1 graph, the step-by-step walkthroughs (traversal, Dijkstra,
   Kruskal, Prim), the AVL trees for Question 2, and keeps a "mastered" checklist. */
(function(){
if(window.__algoFinalMockLoaded)return;window.__algoFinalMockLoaded=true;
var page=document.getElementById('page-finalmock');if(!page)return;

var style=document.createElement('style');
style.textContent=`
.fm-svg{display:block;width:100%;min-width:480px;max-width:660px;margin:0 auto;overflow:visible}
.fm-e{stroke:var(--tline);stroke-width:1.6;stroke-linecap:round;transition:stroke .15s,stroke-width .15s,opacity .15s}
.fm-e.in{stroke:var(--am);stroke-width:4}
.fm-e.now{stroke:var(--cy);stroke-width:4}
.fm-e.cand{stroke:var(--cy);stroke-width:2.4;stroke-dasharray:5 5}
.fm-e.skip{stroke:var(--rd);stroke-width:2.2;stroke-dasharray:3 5;opacity:.8}
.fm-e.dim{opacity:.3}
.fm-e.rep{stroke:var(--rd);stroke-width:3}
.fm-wbg{fill:var(--panel2);stroke:none}
.fm-w{fill:var(--dim);font:700 11px var(--mono);text-anchor:middle;dominant-baseline:central}
.fm-w.in{fill:var(--am)}.fm-w.now{fill:var(--cy)}.fm-w.skip,.fm-w.rep{fill:var(--rd)}.fm-w.dim{opacity:.4}
.fm-n{fill:var(--panel);stroke:var(--line2);stroke-width:1.8;transition:fill .15s,stroke .15s}
.fm-n.in{fill:color-mix(in srgb,var(--am) 22%,var(--panel));stroke:var(--am)}
.fm-n.now{fill:color-mix(in srgb,var(--cy) 24%,var(--panel));stroke:var(--cy)}
.fm-n.odd{fill:color-mix(in srgb,var(--rd) 20%,var(--panel));stroke:var(--rd)}
.fm-nt{fill:var(--ink);font:700 13px var(--mono);text-anchor:middle;dominant-baseline:central}
.fm-tagbg{fill:var(--bg);stroke:var(--line2);stroke-width:1}
.fm-tag{fill:var(--gr);font:700 10.5px var(--mono);text-anchor:middle;dominant-baseline:central}
.fm-stage{display:grid;grid-template-columns:minmax(300px,1.35fr) minmax(240px,.65fr);gap:12px;margin-top:12px}
.fm-canvas{background:var(--panel2);border:1px solid var(--line);border-radius:11px;padding:12px;min-width:0;overflow-x:auto}
.fm-side{background:var(--panel2);border:1px solid var(--line);border-radius:11px;padding:13px 14px;min-width:0}
.fm-controls{display:flex;gap:7px;flex-wrap:wrap;margin:12px 0 0}
.fm-btn{border:1px solid var(--line2);background:var(--panel);color:var(--dim);border-radius:7px;padding:8px 12px;font:700 11px var(--mono);cursor:pointer;min-height:36px}
.fm-btn:hover:not(:disabled){border-color:var(--am);color:var(--am)}
.fm-btn.on{border-color:var(--am);color:var(--am);background:color-mix(in srgb,var(--am) 10%,var(--panel))}
.fm-btn:disabled{opacity:.35;cursor:default}
.fm-now{font-size:14.5px;line-height:1.55;margin-bottom:10px;min-height:4.6em}
.fm-now b.add{color:var(--am)}.fm-now b.no{color:var(--rd)}.fm-now b.cur{color:var(--cy)}
.fm-k{font:800 9.5px var(--mono);letter-spacing:1px;text-transform:uppercase;color:var(--faint);margin:10px 0 5px}
.fm-list{list-style:none;margin:0;padding:0;font:600 12.5px/1.75 var(--mono)}
.fm-list li{margin:0;display:flex;justify-content:space-between;gap:8px}
.fm-list li.no{color:var(--rd);opacity:.8;text-decoration:line-through}
.fm-total{margin-top:9px;padding-top:9px;border-top:1px solid var(--line);font:800 13px var(--mono);color:var(--am);display:flex;justify-content:space-between}
.fm-struct{font:700 12.5px/1.6 var(--mono);color:var(--cy);background:var(--panel);border:1px solid var(--line);border-radius:7px;padding:7px 10px;min-height:2.4em;overflow-wrap:anywhere}
.fm-order{font:700 13px/1.7 var(--mono);color:var(--am);overflow-wrap:anywhere}
.fm-tablewrap{overflow-x:auto;margin-top:12px}
.fm-dj{border-collapse:collapse;width:100%;min-width:560px;font:600 12.5px var(--mono)}
.fm-dj th,.fm-dj td{border:1px solid var(--line2);padding:6px 7px;text-align:center}
.fm-dj th{color:var(--faint);font-size:10.5px;letter-spacing:.6px}
.fm-dj td.fix{color:var(--am);font-weight:800;background:color-mix(in srgb,var(--am) 10%,transparent)}
.fm-dj td.new{color:var(--cy);font-weight:800}
.fm-dj td.pick{color:var(--ink);font-weight:800;text-align:left;white-space:nowrap}
.fm-dj td.inf{color:var(--faint)}
.fm-marks{font:800 10px var(--mono);letter-spacing:.9px;text-transform:uppercase;color:var(--am);border:1px solid color-mix(in srgb,var(--am) 40%,transparent);border-radius:5px;padding:3px 8px;margin-left:auto;white-space:nowrap;flex:0 0 auto}
.fm-q{font-size:16px;font-weight:600;line-height:1.55;border-left:3px solid var(--line2);padding:2px 0 2px 13px;margin:6px 0 4px}
.fm details.fm-ans{margin-top:12px;border-top:1px solid var(--line);padding-top:11px}
.fm details.fm-ans>summary{cursor:pointer;width:max-content;font:700 11.5px var(--mono);letter-spacing:.6px;text-transform:uppercase;color:var(--gr)}
.fm details.fm-ans[open]>summary{margin-bottom:10px}
.fm-write{border:1px solid color-mix(in srgb,var(--gr) 34%,transparent);background:color-mix(in srgb,var(--gr) 6%,var(--panel));border-radius:10px;padding:13px 16px;margin:8px 0 12px}
.fm-write>.fm-lab{display:block;font:800 9.5px var(--mono);letter-spacing:1.2px;text-transform:uppercase;color:var(--gr);margin-bottom:6px}
.fm-write ol,.fm-write ul{margin-bottom:0}
.fm-foot{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:14px}
.fm-done{border:1px solid var(--line2);background:var(--panel2);color:var(--dim);border-radius:8px;padding:8px 13px;font:700 11px var(--mono);cursor:pointer;min-height:36px}
.fm-done:hover{border-color:var(--gr);color:var(--gr)}
.fm.is-done .fm-done{border-color:var(--gr);color:var(--gr);background:color-mix(in srgb,var(--gr) 12%,var(--panel))}
.fm.is-done::before{background:var(--gr)}
.fm-bar{height:8px;border-radius:99px;background:var(--panel2);border:1px solid var(--line);overflow:hidden;margin-top:10px}
.fm-bar i{display:block;height:100%;width:0;background:var(--gr);transition:width .25s}
.fm-prog{font:700 12px var(--mono);color:var(--dim)}
.fm-trees{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,470px),1fr));gap:10px;margin:10px 0}
.fm-trees .mini{min-width:0}
.fm-trees .mini .treebox{margin:8px 0 6px}
.fm-trees .treebox svg{margin:0 auto;max-width:none}
.code.pseudo::before{content:"PSEUDO-CODE"}
.fm-paper{font:700 13.5px/1.7 var(--mono);color:var(--am);background:var(--panel2);border:1px solid var(--line2);border-radius:8px;padding:10px 12px;overflow-wrap:anywhere}
@media(max-width:820px){.fm-stage{grid-template-columns:1fr}}
`;
document.head.appendChild(style);

/* ---------- Question 1 graph ---------- */
var POS={A:[38,165],B:[134,90],C:[134,245],D:[192,165],E:[250,90],F:[250,245],G:[344,28],H:[344,165],I:[440,90],J:[440,245],K:[544,165]};
/* Sorted by weight; ties are listed in the order the walkthroughs take them. */
var EDGES=[
 ['E','G',2],['D','E',3],['H','J',3],['B','E',4],['C','F',4],['I','K',4],['B','D',5],['E','H',5],['D','F',6],['G','I',6],
 ['A','B',7],['F','H',7],['G','H',7],['J','K',7],['A','C',8],['F','J',8],['C','D',9],['H','I',9],['A','D',10],['H','K',12],['B','G',15]
];
var VERTS=Object.keys(POS);
var ADJ={};VERTS.forEach(function(v){ADJ[v]=[]});
EDGES.forEach(function(e){ADJ[e[0]].push([e[1],e[2]]);ADJ[e[1]].push([e[0],e[2]])});
VERTS.forEach(function(v){ADJ[v].sort(function(a,b){return a[0]<b[0]?-1:1})});
function key(a,b){return a<b?a+b:b+a}
function name(e){return e[0]+'–'+e[1]}
function weight(a,b){for(var i=0;i<ADJ[a].length;i++)if(ADJ[a][i][0]===b)return ADJ[a][i][1];return null}

function draw(host,st){
  st=st||{};var ec=st.edges||{},vc=st.verts||{},tags=st.tags||{},rep=st.repeat||{};
  var h='<svg class="fm-svg" viewBox="8 0 566 276" role="img" aria-label="Weighted graph with vertices A to K">';
  EDGES.forEach(function(e){
    var a=POS[e[0]],b=POS[e[1]],k=key(e[0],e[1]),c=ec[k]||'';
    if(rep[k]){ /* repeated edge: draw it as a double line */
      var dx=b[0]-a[0],dy=b[1]-a[1],len=Math.sqrt(dx*dx+dy*dy),nx=-dy/len*3,ny=dx/len*3;
      h+='<line class="fm-e rep" x1="'+(a[0]+nx)+'" y1="'+(a[1]+ny)+'" x2="'+(b[0]+nx)+'" y2="'+(b[1]+ny)+'"/>';
      h+='<line class="fm-e rep" x1="'+(a[0]-nx)+'" y1="'+(a[1]-ny)+'" x2="'+(b[0]-nx)+'" y2="'+(b[1]-ny)+'"/>';
    }else h+='<line class="fm-e '+c+'" x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'"/>';
  });
  EDGES.forEach(function(e){
    var a=POS[e[0]],b=POS[e[1]],k=key(e[0],e[1]),c=rep[k]?'rep':(ec[k]||'');
    var mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;
    h+='<circle class="fm-wbg" cx="'+mx+'" cy="'+my+'" r="9"/><text class="fm-w '+c+'" x="'+mx+'" y="'+my+'">'+e[2]+'</text>';
  });
  VERTS.forEach(function(v){
    var p=POS[v],c=vc[v]===true?'in':(vc[v]||'');
    h+='<circle class="fm-n '+c+'" cx="'+p[0]+'" cy="'+p[1]+'" r="17"/><text class="fm-nt" x="'+p[0]+'" y="'+p[1]+'">'+v+'</text>';
    if(tags[v]!==undefined&&tags[v]!==''){
      var t=String(tags[v]),w=Math.max(18,t.length*7+8),tx=p[0]+19,ty=p[1]-19;
      h+='<rect class="fm-tagbg" x="'+(tx-w/2)+'" y="'+(ty-8)+'" width="'+w+'" height="16" rx="8"/><text class="fm-tag" x="'+tx+'" y="'+ty+'">'+t+'</text>';
    }
  });
  host.innerHTML=h+'</svg>';
}

/* ---------- static pictures: data-fm-graph="given|degrees|hamilton|postman|tsp|mst" ---------- */
var MST=['EG','DE','HJ','BE','CF','IK','EH','DF','GI','AB'];
var TOUR=['A','B','D','E','G','I','K','J','H','F','C','A'];
function staticState(kind){
  var st={edges:{},verts:{},tags:{},repeat:{}},i;
  if(kind==='degrees'||kind==='postman'){
    VERTS.forEach(function(v){var d=ADJ[v].length;if(kind==='degrees')st.tags[v]=d;if(d%2)st.verts[v]='odd'});
  }
  if(kind==='postman')['AC','DE','EH','HJ','IK'].forEach(function(k){st.repeat[k]=true});
  if(kind==='hamilton'||kind==='tsp'){
    EDGES.forEach(function(e){st.edges[key(e[0],e[1])]='dim'});
    for(i=0;i<TOUR.length-1;i++)st.edges[key(TOUR[i],TOUR[i+1])]='in';
    VERTS.forEach(function(v){st.verts[v]=true});
    for(i=0;i<TOUR.length-1;i++)st.tags[TOUR[i]]=i+1;
  }
  if(kind==='mst'){
    EDGES.forEach(function(e){var k=key(e[0],e[1]);st.edges[k]=MST.indexOf(k)>-1?'in':'dim'});
    VERTS.forEach(function(v){st.verts[v]=true});
  }
  return st;
}
page.querySelectorAll('[data-fm-graph]').forEach(function(el){draw(el,staticState(el.dataset.fmGraph))});

/* ---------- generic stepper ---------- */
function stepper(host,count,render,opts){
  opts=opts||{};
  host.innerHTML=(opts.modes?'<div class="fm-controls" style="margin:0 0 10px">'+opts.modes.map(function(m,i){return '<button class="fm-btn'+(i?'':' on')+'" data-m="'+i+'">'+m+'</button>'}).join('')+'</div>':'')+
    '<div class="fm-stage"><div class="fm-canvas"><div class="fm-g"></div>'+
    '<div class="fm-controls"><button class="fm-btn" data-a="back">◀ Back</button><button class="fm-btn" data-a="next">Next step ▶</button><button class="fm-btn" data-a="all">Show result</button><button class="fm-btn" data-a="reset">Reset</button></div></div>'+
    '<div class="fm-side"></div></div><div class="fm-below"></div>';
  var g=host.querySelector('.fm-g'),side=host.querySelector('.fm-side'),below=host.querySelector('.fm-below');
  var btn={};host.querySelectorAll('[data-a]').forEach(function(b){btn[b.dataset.a]=b});
  var i=0,mode=0;
  function paint(){
    var n=typeof count==='function'?count(mode):count;
    var out=render(i,mode);
    draw(g,out.graph);side.innerHTML=out.side;below.innerHTML=out.below||'';
    btn.back.disabled=i===0;btn.next.disabled=btn.all.disabled=i===n;
  }
  host.addEventListener('click',function(ev){
    var b=ev.target.closest('.fm-btn');if(!b||b.disabled)return;
    var n=typeof count==='function'?count(mode):count;
    if(b.dataset.m!==undefined){mode=+b.dataset.m;i=0;host.querySelectorAll('[data-m]').forEach(function(x){x.classList.toggle('on',x===b)});}
    if(b.dataset.a==='next')i=Math.min(n,i+1);
    if(b.dataset.a==='back')i=Math.max(0,i-1);
    if(b.dataset.a==='all')i=n;
    if(b.dataset.a==='reset')i=0;
    paint();
  });
  paint();
}

/* ---------- 1a: depth-first vs breadth-first from A ---------- */
function dfsSteps(){
  var seen={},steps=[];
  (function go(v,from,path){
    seen[v]=true;var p=path.concat(v);steps.push({v:v,from:from,struct:p.slice()});
    ADJ[v].forEach(function(n){if(!seen[n[0]])go(n[0],v,p)});
  })('A',null,[]);
  return steps;
}
function bfsSteps(){
  var seen={A:true},q=['A'],steps=[{v:'A',from:null,struct:['A']}];
  while(q.length){
    var v=q.shift();
    ADJ[v].forEach(function(n){if(!seen[n[0]]){seen[n[0]]=true;q.push(n[0]);steps.push({v:n[0],from:v,struct:q.slice()})}});
  }
  return steps;
}
var TRAV=[dfsSteps(),bfsSteps()];
var tHost=document.getElementById('fm-traverse');
if(tHost)stepper(tHost,function(m){return TRAV[m].length},function(i,m){
  var steps=TRAV[m],st={edges:{},verts:{},tags:{}},order=[];
  EDGES.forEach(function(e){st.edges[key(e[0],e[1])]='dim'});
  steps.slice(0,i).forEach(function(s,k){
    st.verts[s.v]=k===i-1?'now':true;st.tags[s.v]=k+1;order.push(s.v);
    if(s.from)st.edges[key(s.from,s.v)]=k===i-1?'now':'in';
  });
  if(i===0)EDGES.forEach(function(e){st.edges[key(e[0],e[1])]=''});
  var s=i?steps[i-1]:null,now;
  if(!s)now=m===0?'<b>Depth-first.</b> Start at A, keep following the first unvisited neighbour, and backtrack only at a dead end. Neighbours are taken in alphabetical order.':'<b>Breadth-first.</b> Start at A, visit every neighbour of A, then every neighbour of those, level by level. Neighbours are taken in alphabetical order.';
  else if(!s.from)now='<b class="cur">Visit A</b><br>The start vertex. Mark it as visited.';
  else now='<b class="cur">Visit '+s.v+'</b> (number '+i+')<br>'+(m===0?'Reached from '+s.from+', the deepest vertex that still has an unvisited neighbour.':'It is an unvisited neighbour of '+s.from+', the vertex at the front of the queue.')+(i===steps.length?'<br><b class="add">All 11 vertices visited.</b>':'');
  return {graph:st,side:'<div class="fm-now">'+now+'</div><div class="fm-k">'+(m===0?'Recursion stack (bottom → top)':'Queue (front → back)')+'</div><div class="fm-struct">'+(s?s.struct.join(' '+(m===0?'→':'·')+' ')||'empty':'empty')+'</div><div class="fm-k">Visit order</div><div class="fm-order">'+(order.join(', ')||'—')+'</div>'};
},{modes:['Depth-first','Breadth-first']});

/* ---------- 1b: Dijkstra from A ---------- */
function dijkstra(){
  var INF=Infinity,d={},pred={},todo=VERTS.slice(),rows=[];
  VERTS.forEach(function(v){d[v]=INF});d.A=0;
  rows.push({pick:null,d:Object.assign({},d),fixed:{},changed:{},pred:{}});
  var fixed={};
  while(todo.length){
    var v=todo.reduce(function(a,b){return d[b]<d[a]?b:a});
    todo.splice(todo.indexOf(v),1);fixed[v]=true;
    var changed={};
    ADJ[v].forEach(function(n){
      if(todo.indexOf(n[0])>-1&&d[n[0]]>d[v]+n[1]){changed[n[0]]=[d[n[0]],d[v]+n[1]];d[n[0]]=d[v]+n[1];pred[n[0]]=v;}
    });
    rows.push({pick:v,d:Object.assign({},d),fixed:Object.assign({},fixed),changed:changed,pred:Object.assign({},pred)});
  }
  return rows;
}
var DJ=dijkstra();
function inf(x){return x===Infinity?'∞':x}
function djTable(upto){
  var h='<div class="fm-tablewrap"><table class="fm-dj"><tr><th>Vertex chosen</th>'+VERTS.map(function(v){return '<th>'+v+'</th>'}).join('')+'</tr>';
  DJ.slice(0,upto+1).forEach(function(r){
    h+='<tr><td class="pick">'+(r.pick?r.pick+' ('+r.d[r.pick]+')':'start')+'</td>'+VERTS.map(function(v){
      var c=r.fixed[v]?'fix':r.changed[v]?'new':r.d[v]===Infinity?'inf':'';
      return '<td class="'+c+'">'+inf(r.d[v])+'</td>';
    }).join('')+'</tr>';
  });
  return h+'</table></div>';
}
var dHost=document.getElementById('fm-dijkstra');
if(dHost)stepper(dHost,DJ.length-1,function(i){
  var r=DJ[i],st={edges:{},verts:{},tags:{}};
  VERTS.forEach(function(v){if(r.d[v]!==Infinity)st.tags[v]=r.d[v];if(r.fixed[v])st.verts[v]=v===r.pick?'now':true});
  EDGES.forEach(function(e){st.edges[key(e[0],e[1])]=i?'dim':''});
  VERTS.forEach(function(v){if(r.fixed[v]&&r.pred[v])st.edges[key(v,r.pred[v])]='in'});
  Object.keys(r.changed).forEach(function(u){st.edges[key(u,r.pick)]='cand'});
  var now;
  if(!i)now='Every distance starts at <b>∞</b> except the start vertex: <b>A = 0</b>. All vertices are unchecked.';
  else{
    var ch=Object.keys(r.changed).map(function(u){return u+': '+inf(r.changed[u][0])+' → <b class="cur">'+r.changed[u][1]+'</b>'});
    now='<b class="cur">Choose '+r.pick+'</b> (smallest unchecked distance, '+r.d[r.pick]+'). Its distance is now final.<br>'+
      (ch.length?'Shorter routes through '+r.pick+': '+ch.join(', ')+'.':'No unchecked neighbour gets a shorter route through '+r.pick+'.')+
      (i===DJ.length-1?'<br><b class="add">All vertices checked.</b>':'');
  }
  var fin=VERTS.filter(function(v){return r.fixed[v]}).map(function(v){return '<li><span>'+v+'</span><span>'+r.d[v]+'</span></li>'}).join('');
  return {graph:st,side:'<div class="fm-now">'+now+'</div><div class="fm-k">Final distances so far</div><ol class="fm-list">'+(fin||'<li><span style="color:var(--faint)">none yet</span></li>')+'</ol>',below:djTable(i)};
});

/* ---------- 1c / 1d: Kruskal and Prim ---------- */
function pathInTree(tree,from,to){
  var adj={};VERTS.forEach(function(v){adj[v]=[]});
  tree.forEach(function(e){adj[e[0]].push(e[1]);adj[e[1]].push(e[0])});
  var prev={},q=[from];prev[from]=null;
  while(q.length){var v=q.shift();if(v===to)break;adj[v].forEach(function(u){if(!(u in prev)){prev[u]=v;q.push(u)}})}
  if(!(to in prev))return null;
  var out=[],x=to;while(x!==null){out.unshift(x);x=prev[x]}
  return out;
}
function kruskalSteps(){
  var tree=[],steps=[];
  for(var i=0;i<EDGES.length&&tree.length<VERTS.length-1;i++){
    var e=EDGES[i],p=pathInTree(tree,e[0],e[1]);
    if(p)steps.push({e:e,add:false,why:e[0]+' and '+e[1]+' are already connected ('+p.join('–')+'), so this edge would close a cycle.'});
    else{tree.push(e);steps.push({e:e,add:true,why:tree.length===VERTS.length-1?'It joins two separate pieces. That is the 10th edge, so the tree is complete.':'It joins two separate pieces, so no cycle is formed.'});}
  }
  return steps;
}
function primSteps(start){
  var inT={},tree=[],steps=[];inT[start]=true;
  while(tree.length<VERTS.length-1){
    var cand=EDGES.filter(function(e){return !!inT[e[0]]!==!!inT[e[1]]});
    var min=Math.min.apply(null,cand.map(function(e){return e[2]}));
    var tied=cand.filter(function(e){return e[2]===min}),pick=tied[0];
    var from=inT[pick[0]]?pick[0]:pick[1],to=inT[pick[0]]?pick[1]:pick[0];
    tree.push(pick);inT[to]=true;
    steps.push({e:[from,to,pick[2]],add:true,cand:cand.map(function(e){return key(e[0],e[1])}),
      why:'Cheapest edges leaving the tree: '+cand.slice(0,4).map(function(e){return name(e)+' ('+e[2]+')'}).join(', ')+(cand.length>4?', …':'')+'. Take '+from+'–'+to+' ('+pick[2]+')'+(tied.length>1?'; it ties with another edge of the same weight, so either may go first.':'.')});
  }
  return steps;
}
function mstWidget(host,steps,o){
  if(!host)return;
  stepper(host,steps.length,function(i){
    var st={edges:{},verts:{}},total=0,n=0,rows='';
    if(o.start)st.verts[o.start]=true;
    steps.slice(0,i).forEach(function(s,k){
      var kk=key(s.e[0],s.e[1]),last=k===i-1;
      if(s.add){st.edges[kk]=last?'now':'in';st.verts[s.e[0]]=st.verts[s.e[1]]=true;total+=s.e[2];n++;
        rows+='<li><span>'+n+'. '+name(s.e)+'</span><span>'+s.e[2]+'</span></li>';}
      else{st.edges[kk]=last?'skip':'dim';rows+='<li class="no"><span>'+name(s.e)+'</span><span>'+s.e[2]+'</span></li>';}
    });
    if(i===steps.length){Object.keys(st.edges).forEach(function(k){if(st.edges[k]==='now')st.edges[k]='in'});
      EDGES.forEach(function(e){var k=key(e[0],e[1]);if(!st.edges[k]||st.edges[k]==='skip')st.edges[k]='dim'});}
    else if(o.start)steps[i].cand.forEach(function(k){if(!st.edges[k])st.edges[k]='cand'});
    var now;
    if(!i)now=o.intro;
    else{var s=steps[i-1];now='<b class="'+(s.add?'add':'no')+'">'+(s.add?'Add ':'Skip ')+name(s.e)+' ('+s.e[2]+')</b><br>'+s.why+(i===steps.length?'<br><b class="add">Done: total weight '+total+'.</b>':'');}
    return {graph:st,side:'<div class="fm-now">'+now+'</div><div class="fm-k">'+o.title+'</div><ol class="fm-list">'+(rows||'<li><span style="color:var(--faint)">nothing added yet</span></li>')+'</ol><div class="fm-total"><span>Total weight</span><span>'+total+(i===steps.length?' · '+n+' edges':'')+'</span></div>'};
  });
}
mstWidget(document.getElementById('fm-kruskal'),kruskalSteps(),{title:'Edges examined, in sorted order',
  intro:'Edges are examined from the smallest weight up. Press <b>Next step</b> to examine the first one.'});
mstWidget(document.getElementById('fm-prim'),primSteps('A'),{title:'Order edges are added',start:'A',
  intro:'The tree starts as just <b>A</b>. Dashed edges are the ones leaving the tree: A–B (7), A–C (8), A–D (10).'});

/* ---------- Question 2: AVL trees (uses the console's tree drawer) ---------- */
if(typeof TREES==='object'&&typeof drawTree==='function'){
  TREES.fm_avl0 =[10,[5,[4,[3],0],[6]],[13,0,[17]]];
  TREES.fm_ins2 =[10,[5,[4,[3,[2,0,0,'h'],0],0],[6]],[13,0,[17]]];
  TREES.fm_fix2 =[10,[5,[3,[2],[4],'h'],[6]],[13,0,[17]]];
  TREES.fm_ins15=[10,[5,[3,[2],[4]],[6]],[13,0,[17,[15,0,0,'h'],0]]];
  TREES.fm_rl1  =[10,[5,[3,[2],[4]],[6]],[13,0,[15,0,[17],'h']]];
  TREES.fm_fix15=[10,[5,[3,[2],[4]],[6]],[15,[13],[17],'h']];
  page.querySelectorAll('.treebox[data-tree^="fm_"]').forEach(drawTree);
}

/* ---------- Question 4: highlighted C++ ---------- */
var code=document.getElementById('fm-code');
if(code&&typeof hlCpp==='function')code.innerHTML=hlCpp(code.textContent);

/* ---------- mastered checklist, filters, open / close all ---------- */
var KEY='algo-final-mock-v1',cards=[].slice.call(page.querySelectorAll('.fm[data-id]'));
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}').done||[]}catch(e){return []}}
function save(a){try{localStorage.setItem(KEY,JSON.stringify({done:a}))}catch(e){}}
var done=load();
function sync(){
  var n=0,marks=0,total=0;
  cards.forEach(function(c){
    var on=done.indexOf(c.dataset.id)>-1,m=+c.dataset.marks||0;total+=m;
    c.classList.toggle('is-done',on);if(on){n++;marks+=m}
    var b=c.querySelector('.fm-done');if(b){b.textContent=on?'✓ Mastered':'Mark as mastered';b.setAttribute('aria-pressed',String(on))}
  });
  var p=document.getElementById('fm-progress'),bar=document.getElementById('fm-bar');
  if(p)p.textContent=n+' / '+cards.length+' parts mastered · '+marks+' / '+total+' marks';
  if(bar)bar.style.width=(total?marks/total*100:0)+'%';
}
cards.forEach(function(c){
  var f=document.createElement('div');f.className='fm-foot';
  f.innerHTML='<button class="fm-done" type="button"></button><span class="small">Tick it when you can write the answer without looking.</span>';
  c.appendChild(f);
});
page.addEventListener('click',function(ev){
  var d=ev.target.closest('.fm-done');
  if(d){var id=d.closest('.fm').dataset.id,i=done.indexOf(id);if(i>-1)done.splice(i,1);else done.push(id);save(done);sync();return}
  var q=ev.target.closest('[data-fmq]');
  if(q){
    page.querySelectorAll('[data-fmq]').forEach(function(x){x.classList.toggle('on',x===q)});
    page.querySelectorAll('[data-q]').forEach(function(x){x.style.display=(q.dataset.fmq==='0'||x.dataset.q===q.dataset.fmq)?'':'none'});
    return;
  }
  var o=ev.target.closest('[data-fmopen]');
  if(o)page.querySelectorAll('details.fm-ans').forEach(function(x){x.open=o.dataset.fmopen==='1'});
});
sync();
})();
