"use strict";
/* Assignment 4: minimum spanning tree with Kruskal and Prim.
   Draws the given graph and two step-by-step walkthroughs. */
(function(){
if(window.__algoAssignment4Loaded)return;window.__algoAssignment4Loaded=true;
var page=document.getElementById('page-a4');if(!page)return;

var style=document.createElement('style');
style.textContent=`
.a4-svg{display:block;width:100%;max-width:640px;margin:0 auto;overflow:visible}
.a4-e{stroke:var(--tline);stroke-width:1.6;stroke-linecap:round;transition:stroke .15s,stroke-width .15s,opacity .15s}
.a4-e.in{stroke:var(--am);stroke-width:4}
.a4-e.now{stroke:var(--cy);stroke-width:4}
.a4-e.cand{stroke:var(--cy);stroke-width:2.4;stroke-dasharray:5 5}
.a4-e.skip{stroke:var(--rd);stroke-width:2.2;stroke-dasharray:3 5;opacity:.75}
.a4-e.dim{opacity:.32}
.a4-wbg{fill:var(--panel2);stroke:none}
.a4-w{fill:var(--dim);font:700 11px var(--mono);text-anchor:middle;dominant-baseline:central}
.a4-w.in{fill:var(--am)}.a4-w.now{fill:var(--cy)}.a4-w.skip{fill:var(--rd)}.a4-w.dim{opacity:.4}
.a4-n{fill:var(--panel);stroke:var(--line2);stroke-width:1.8;transition:fill .15s,stroke .15s}
.a4-n.in{fill:color-mix(in srgb,var(--am) 22%,var(--panel));stroke:var(--am)}
.a4-nt{fill:var(--ink);font:700 13px var(--mono);text-anchor:middle;dominant-baseline:central}
.a4-stage{display:grid;grid-template-columns:minmax(300px,1.35fr) minmax(240px,.65fr);gap:12px;margin-top:12px}
.a4-canvas{background:var(--panel2);border:1px solid var(--line);border-radius:11px;padding:12px}
.a4-side{background:var(--panel2);border:1px solid var(--line);border-radius:11px;padding:13px 14px;min-width:0}
.a4-controls{display:flex;gap:7px;flex-wrap:wrap;margin:12px 0 0}
.a4-btn{border:1px solid var(--line2);background:var(--panel);color:var(--dim);border-radius:7px;padding:8px 12px;font:700 11px var(--mono);cursor:pointer;min-height:36px}
.a4-btn:hover:not(:disabled){border-color:var(--am);color:var(--am)}
.a4-btn:disabled{opacity:.35;cursor:default}
.a4-now{font-size:14.5px;line-height:1.55;margin-bottom:10px;min-height:4.6em}
.a4-now b.add{color:var(--am)}.a4-now b.no{color:var(--rd)}
.a4-k{font:800 9.5px var(--mono);letter-spacing:1px;text-transform:uppercase;color:var(--faint);margin:10px 0 5px}
.a4-list{list-style:none;margin:0;padding:0;font:600 12.5px/1.75 var(--mono)}
.a4-list li{margin:0;display:flex;justify-content:space-between;gap:8px}
.a4-list li.no{color:var(--rd);opacity:.8;text-decoration:line-through}
.a4-list li.add{color:var(--ink)}
.a4-total{margin-top:9px;padding-top:9px;border-top:1px solid var(--line);font:800 13px var(--mono);color:var(--am);display:flex;justify-content:space-between}
.a4-seq{font:700 13.5px/1.7 var(--mono);color:var(--am);background:var(--panel2);border:1px solid var(--line2);border-radius:8px;padding:10px 12px}
.a4-photos{margin-top:12px;border:1px solid var(--line);border-radius:9px;background:var(--panel2);padding:0 13px}
.a4-photos>summary{cursor:pointer;padding:11px 0;font-weight:650;color:var(--ink)}
.a4-photos img{display:block;width:100%;max-width:560px;height:auto;margin:0 auto 13px;border-radius:8px;border:1px solid var(--line)}
@media(max-width:820px){.a4-stage{grid-template-columns:1fr}}
`;
document.head.appendChild(style);

var POS={A:[57,110],B:[191,48],F:[329,45],H:[426,82],I:[536,141],C:[284,136],J:[174,186],G:[426,192],D:[98,262],E:[316,278]};
/* Listed in the order ties are taken, so the walkthrough matches the written answer. */
var EDGES=[
 ['C','E',1],['C','F',2],['E','J',2],['F','B',3],['F','H',4],['E','G',4],['A','D',4],['A','J',5],['B','C',5],
 ['B','J',6],['C','J',6],['A','B',7],['C','G',7],['C','H',8],['D','J',8],['H','I',8],['D','E',9],['G','I',9]
];
var VERTS=Object.keys(POS);
function key(a,b){return a<b?a+b:b+a}
function name(e){return e[0]+'–'+e[1]}

function draw(host,state){
  state=state||{};
  var cls=state.edges||{},inV=state.verts||{};
  var h='<svg class="a4-svg" viewBox="20 14 552 296" role="img" aria-label="Weighted graph with vertices A to J">';
  EDGES.forEach(function(e){
    var a=POS[e[0]],b=POS[e[1]],c=cls[key(e[0],e[1])]||'';
    h+='<line class="a4-e '+c+'" x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'"/>';
  });
  EDGES.forEach(function(e){
    var a=POS[e[0]],b=POS[e[1]],c=cls[key(e[0],e[1])]||'';
    var mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;
    h+='<circle class="a4-wbg" cx="'+mx+'" cy="'+my+'" r="9"/><text class="a4-w '+c+'" x="'+mx+'" y="'+my+'">'+e[2]+'</text>';
  });
  VERTS.forEach(function(v){
    var p=POS[v];
    h+='<circle class="a4-n '+(inV[v]?'in':'')+'" cx="'+p[0]+'" cy="'+p[1]+'" r="17"/><text class="a4-nt" x="'+p[0]+'" y="'+p[1]+'">'+v+'</text>';
  });
  host.innerHTML=h+'</svg>';
}

/* ---------- build the two step lists ---------- */
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
    if(p){steps.push({e:e,add:false,why:e[0]+' and '+e[1]+' are already connected ('+p.join('–')+'), so this edge would close a cycle.'});}
    else{tree.push(e);steps.push({e:e,add:true,why:tree.length===VERTS.length-1?'It joins two separate pieces. That is the 9th edge, so the tree is complete.':'It joins two separate pieces, so no cycle is formed.'});}
  }
  return steps;
}
function primSteps(start){
  var inT={},tree=[],steps=[];inT[start]=true;
  while(tree.length<VERTS.length-1){
    var cand=EDGES.filter(function(e){return !!inT[e[0]]!==!!inT[e[1]]});
    var min=Math.min.apply(null,cand.map(function(e){return e[2]}));
    var pick=cand.filter(function(e){return e[2]===min})[0];
    var from=inT[pick[0]]?pick[0]:pick[1],to=inT[pick[0]]?pick[1]:pick[0];
    var ties=cand.filter(function(e){return e[2]===min}).length;
    tree.push(pick);inT[to]=true;
    steps.push({e:[from,to,pick[2]],add:true,cand:cand.map(function(e){return key(e[0],e[1])}),
      why:'Edges leaving the tree: '+cand.slice().sort(function(a,b){return a[2]-b[2]}).map(function(e){return name(e)+' ('+e[2]+')'}).join(', ')+'. Cheapest is '+from+'–'+to+' ('+pick[2]+')'+(ties>1?', tied with another edge of the same weight, so either may go first.':'.')});
  }
  return steps;
}

/* ---------- one walkthrough widget ---------- */
function widget(host,steps,opts){
  host.innerHTML='<div class="a4-stage"><div class="a4-canvas"><div class="a4-g"></div>'+
    '<div class="a4-controls"><button class="a4-btn" data-a="back">◀ Back</button><button class="a4-btn" data-a="next">Next step ▶</button><button class="a4-btn" data-a="all">Show result</button><button class="a4-btn" data-a="reset">Reset</button></div></div>'+
    '<div class="a4-side"><div class="a4-now"></div><div class="a4-k">'+opts.listTitle+'</div><ol class="a4-list"></ol><div class="a4-total"><span>Total weight</span><span class="a4-sum">0</span></div></div></div>';
  var g=host.querySelector('.a4-g'),now=host.querySelector('.a4-now'),list=host.querySelector('.a4-list'),sum=host.querySelector('.a4-sum');
  var btn={};host.querySelectorAll('.a4-btn').forEach(function(b){btn[b.dataset.a]=b});
  var i=0; /* number of steps already applied */
  function render(){
    var edges={},verts={},total=0,n=0,rows='';
    if(opts.start)verts[opts.start]=true;
    steps.slice(0,i).forEach(function(s,k){
      var kk=key(s.e[0],s.e[1]),last=k===i-1;
      if(s.add){edges[kk]=last?'now':'in';verts[s.e[0]]=verts[s.e[1]]=true;total+=s.e[2];n++;
        rows+='<li class="add"><span>'+n+'. '+name(s.e)+'</span><span>'+s.e[2]+'</span></li>';}
      else{edges[kk]=last?'skip':'dim';if(opts.showSkips)rows+='<li class="no"><span>'+name(s.e)+'</span><span>'+s.e[2]+'</span></li>';}
    });
    if(i===steps.length){Object.keys(edges).forEach(function(k){if(edges[k]==='now')edges[k]='in'});
      EDGES.forEach(function(e){var k=key(e[0],e[1]);if(!edges[k]||edges[k]==='skip')edges[k]='dim'});}
    else if(opts.start&&i<steps.length){steps[i].cand.forEach(function(k){if(!edges[k])edges[k]='cand'});}
    draw(g,{edges:edges,verts:verts});
    list.innerHTML=rows||'<li><span style="color:var(--faint)">nothing added yet</span></li>';
    sum.textContent=total+(i===steps.length?' · '+n+' edges':'');
    if(i===0)now.innerHTML=opts.intro;
    else{var s=steps[i-1];
      now.innerHTML='<b class="'+(s.add?'add':'no')+'">'+(s.add?'Add ':'Skip ')+name(s.e)+' ('+s.e[2]+')</b><br>'+s.why+
        (i===steps.length?'<br><b class="add">Done: total weight '+total+'.</b>':'');}
    btn.back.disabled=i===0;btn.next.disabled=btn.all.disabled=i===steps.length;
  }
  host.addEventListener('click',function(ev){
    var b=ev.target.closest('.a4-btn');if(!b||b.disabled)return;
    if(b.dataset.a==='next')i=Math.min(steps.length,i+1);
    if(b.dataset.a==='back')i=Math.max(0,i-1);
    if(b.dataset.a==='all')i=steps.length;
    if(b.dataset.a==='reset')i=0;
    render();
  });
  render();
}

var given=document.getElementById('a4-given');if(given)draw(given);
var k=document.getElementById('a4-kruskal');
if(k)widget(k,kruskalSteps(),{listTitle:'Edges examined, in sorted order',showSkips:true,
  intro:'Edges are examined from the smallest weight up. Press <b>Next step</b> to examine the first one.'});
var p=document.getElementById('a4-prim');
if(p)widget(p,primSteps('A'),{listTitle:'Order edges are added',start:'A',
  intro:'The tree starts as just <b>A</b>. Dashed edges are the ones leaving the tree: A–D (4), A–J (5), A–B (7).'});
})();
