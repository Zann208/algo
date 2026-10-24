"use strict";
/* Final Prep: pure logic for the visual labs (no DOM).
   Every algorithm is a small state machine: init -> candidates -> apply, so the UI can
   either play it for you (Watch) or let you choose each step (Practice).
   Ties are accepted in Practice mode wherever the exam accepts them. */
(function(root){
var L={};
var INF=1e9;
L.INF=INF;

function key(u,v){return u<v?u+'-'+v:v+'-'+u}
function clone(o){return JSON.parse(JSON.stringify(o))}
function sortedKeys(o){return Object.keys(o).sort()}
L.key=key;

/* ---------------- graphs ---------------- */
L.GRAPHS={
  practice:{name:'Practice Q1 (A–F)',nodes:{A:[70,190],B:[200,80],C:[200,300],D:[380,80],E:[380,300],F:[560,190]},
    edges:[['A','B',4],['A','C',2],['B','C',1],['B','D',5],['C','D',8],['C','E',10],['D','E',2],['D','F',6],['E','F',3]]},
  a4:{name:'Assignment 4 (A–J)',nodes:{A:[150,110],B:[250,260],C:[400,170],D:[50,230],E:[510,60],F:[390,320],G:[610,190],H:[520,330],I:[640,330],J:[300,50]},
    edges:[['C','E',1],['C','F',2],['E','J',2],['B','F',3],['A','D',4],['F','H',4],['E','G',4],['A','J',5],['B','C',5],['B','J',6],['C','J',6],['A','B',7],['C','G',7],['C','H',8],['D','J',8],['H','I',8],['D','E',9],['G','I',9]]},
  mock:{name:'Mock Q1 (A–K)',nodes:{A:[50,190],B:[170,80],C:[170,310],D:[290,190],E:[360,60],F:[370,320],G:[480,150],H:[500,260],I:[620,70],J:[470,345],K:[630,230]},
    edges:[['E','G',2],['D','E',3],['H','J',3],['B','E',4],['C','F',4],['I','K',4],['B','D',5],['E','H',5],['D','F',6],['G','I',6],['A','B',7],['F','H',7],['G','H',7],['J','K',7],['A','C',8],['F','J',8],['C','D',9],['H','I',9],['A','D',10],['H','K',12],['B','G',15]]},
  tasks:{name:'Task order (directed)',directed:true,nodes:{A:[60,190],B:[210,80],C:[210,300],D:[380,190],E:[380,330],F:[560,190],G:[210,200]},
    edges:[['A','B',1],['A','C',1],['B','D',1],['C','D',1],['C','E',1],['D','F',1],['E','F',1],['G','D',1]]}
};

L.adj=function(g){
  var a={};Object.keys(g.nodes).forEach(function(v){a[v]=[]});
  g.edges.forEach(function(e){a[e[0]].push([e[1],e[2]]);if(!g.directed)a[e[1]].push([e[0],e[2]])});
  Object.keys(a).forEach(function(v){a[v].sort(function(x,y){return x[0]<y[0]?-1:x[0]>y[0]?1:0})});
  return a;
};
function wOf(g,u,v){
  for(var i=0;i<g.edges.length;i++){var e=g.edges[i];
    if((e[0]===u&&e[1]===v)||(!g.directed&&e[0]===v&&e[1]===u))return e[2]}
  return null;
}
function nodeIds(g){return sortedKeys(g.nodes)}
function fmt(d){return d>=INF?'∞':String(d)}
L.fmt=fmt;

var M=L.machines={};

/* ---------------- BFS ---------------- */
M.bfs={id:'bfs',name:'Breadth-first search (BFS)',kind:'vertex',
  rule:'BFS dequeues the vertex at the FRONT of the queue. Click the vertex that is dequeued next.',
  note:'Queue (FIFO). Mark a vertex when it is enqueued. Neighbours are taken in alphabetical order. O(|V| + |E|) with an adjacency list.',
  init:function(g,start){var s={num:{},i:1,queue:[start],tree:[],cur:null,log:'Start at '+start+': num('+start+') = 1 and enqueue it.'};s.num[start]=s.i++;return s},
  cands:function(s,g){
    if(s.queue.length)return [s.queue[0]];
    var un=nodeIds(g).filter(function(v){return !s.num[v]});return un.length?[un[0]]:[];
  },
  apply:function(s,g,v){
    s=clone(s);var a=L.adj(g);
    if(s.queue.length&&s.queue[0]===v){
      s.queue.shift();s.cur=v;var added=[];
      a[v].forEach(function(p){var u=p[0];if(!s.num[u]){s.num[u]=s.i++;s.queue.push(u);s.tree.push(key(v,u));added.push(u+'='+s.num[u])}});
      s.log='Dequeue '+v+'. '+(added.length?'Enqueue unvisited neighbours: '+added.join(', ')+'.':'No unvisited neighbours.');
    }else{
      s.num[v]=s.i++;s.queue.push(v);s.cur=null;s.log='Queue empty but '+v+' is unvisited (another component): num('+v+') = '+s.num[v]+', enqueue it.';
    }
    return s;
  },
  done:function(s,g){return this.cands(s,g).length===0},
  view:function(s,g){
    var v={},e={},lab={};
    Object.keys(s.num).forEach(function(x){v[x]='in';lab[x]=String(s.num[x])});
    s.queue.forEach(function(x){v[x]='cand'});
    if(s.cur)v[s.cur]='now';
    s.tree.forEach(function(k){e[k]='in'});
    return {v:v,e:e,lab:lab};
  },
  panel:function(s){return '<div class="fl-kv"><b>Queue</b> (front → back): '+(s.queue.length?s.queue.join(' , '):'<i>empty</i>')+'</div><div class="fl-kv"><b>Visit order</b>: '+Object.keys(s.num).sort(function(a,b){return s.num[a]-s.num[b]}).join(' → ')+'</div>'},
  summary:function(s){return 'BFS order: '+Object.keys(s.num).sort(function(a,b){return s.num[a]-s.num[b]}).join(' → ')+'. Tree edges: '+s.tree.join(', ')+'.'}
};

/* ---------------- DFS ---------------- */
function dfsNorm(s,g){
  var a=L.adj(g);
  while(s.stack.length){
    var top=s.stack[s.stack.length-1];
    var has=a[top].some(function(p){return !s.num[p[0]]});
    if(has)break;
    s.stack.pop();s.back.push(top);
  }
}
M.dfs={id:'dfs',name:'Depth-first search (DFS)',kind:'vertex',
  rule:'DFS goes deeper: from the vertex on top of the stack, click an unvisited neighbour (alphabetical order is the usual choice).',
  note:'Recursion = stack. num(v) marks visited vertices so cycles do not loop forever. When a vertex has no unvisited neighbour you backtrack. O(|V| + |E|).',
  init:function(g,start){var s={num:{},i:1,stack:[start],tree:[],back:[],log:'Start at '+start+': num('+start+') = 1.'};s.num[start]=s.i++;dfsNorm(s,g);return s},
  cands:function(s,g){
    var a=L.adj(g);
    if(s.stack.length){var top=s.stack[s.stack.length-1];return a[top].map(function(p){return p[0]}).filter(function(u){return !s.num[u]})}
    var un=nodeIds(g).filter(function(v){return !s.num[v]});return un.length?[un[0]]:[];
  },
  apply:function(s,g,u){
    s=clone(s);s.back=[];
    var top=s.stack.length?s.stack[s.stack.length-1]:null;
    s.num[u]=s.i++;
    if(top!==null){s.tree.push(key(top,u));s.log='From '+top+' go to '+u+': num('+u+') = '+s.num[u]+', attach edge '+top+u+'.'}
    else s.log='New start (another component): '+u+' gets num '+s.num[u]+'.';
    s.stack.push(u);dfsNorm(s,g);
    if(s.back.length)s.log+=' Dead end, backtrack from '+s.back.join(', ')+'.';
    return s;
  },
  done:function(s,g){return this.cands(s,g).length===0},
  view:function(s,g){
    var v={},e={},lab={};
    Object.keys(s.num).forEach(function(x){v[x]='in';lab[x]=String(s.num[x])});
    s.stack.forEach(function(x){v[x]='cand'});
    if(s.stack.length)v[s.stack[s.stack.length-1]]='now';
    s.tree.forEach(function(k){e[k]='in'});
    return {v:v,e:e,lab:lab};
  },
  panel:function(s){return '<div class="fl-kv"><b>Stack</b> (bottom → top): '+(s.stack.length?s.stack.join(' , '):'<i>empty</i>')+'</div><div class="fl-kv"><b>Visit order</b>: '+Object.keys(s.num).sort(function(a,b){return s.num[a]-s.num[b]}).join(' → ')+'</div>'},
  summary:function(s){return 'DFS order: '+Object.keys(s.num).sort(function(a,b){return s.num[a]-s.num[b]}).join(' → ')+'. Tree edges: '+s.tree.join(', ')+'.'}
};

/* ---------------- Dijkstra ---------------- */
M.dijkstra={id:'dijkstra',name:"Dijkstra's shortest paths",kind:'vertex',wide:true,
  rule:'Click the unchecked vertex with the SMALLEST current distance (ties: either is fine).',
  note:'Start: every distance ∞, start = 0. Repeatedly remove the unchecked vertex with minimal currDist and relax its neighbours. Fails with negative edges. O(|V|²) with a plain array.',
  init:function(g,start){var s={dist:{},pred:{},done:[],cur:null,start:start,log:'currDist('+start+') = 0, every other vertex = ∞.'};
    nodeIds(g).forEach(function(v){s.dist[v]=INF;s.pred[v]=null});s.dist[start]=0;
    s.rows=[{pick:null,d:clone(s.dist),fixed:[],changed:[]}];return s},
  cands:function(s,g){
    var best=INF,out=[];
    nodeIds(g).forEach(function(v){if(s.done.indexOf(v)<0&&s.dist[v]<INF){if(s.dist[v]<best){best=s.dist[v];out=[v]}else if(s.dist[v]===best)out.push(v)}});
    return out;
  },
  apply:function(s,g,v){
    s=clone(s);var a=L.adj(g);s.done.push(v);s.cur=v;var ch=[];
    a[v].forEach(function(p){var u=p[0],w=p[1];
      if(s.done.indexOf(u)<0&&s.dist[v]+w<s.dist[u]){s.dist[u]=s.dist[v]+w;s.pred[u]=v;ch.push(u+' → '+s.dist[u])}});
    s.rows.push({pick:v,d:clone(s.dist),fixed:s.done.slice(),changed:ch.map(function(c){return c.split(' ')[0]})});
    s.log='Remove '+v+' (distance '+s.dist[v]+'). '+(ch.length?'Improved: '+ch.join(', ')+'.':'No distance improved.');
    return s;
  },
  done:function(s,g){return this.cands(s,g).length===0},
  view:function(s,g){
    var v={},e={},lab={};
    nodeIds(g).forEach(function(x){lab[x]=fmt(s.dist[x]);if(s.done.indexOf(x)>=0)v[x]='in'});
    if(s.cur)v[s.cur]='now';
    nodeIds(g).forEach(function(x){if(s.pred[x]){var k=g.directed?s.pred[x]+'>'+x:key(s.pred[x],x);e[k]=s.done.indexOf(x)>=0?'in':'cand'}});
    return {v:v,e:e,lab:lab};
  },
  panel:function(s,g){
    var ids=nodeIds(g);
    var h='<div class="fl-djw"><table class="fl-dj"><tr><th>Vertex chosen</th>'+ids.map(function(v){return '<th>'+v+'</th>'}).join('')+'</tr>';
    s.rows.forEach(function(r){
      h+='<tr><td class="pick">'+(r.pick?r.pick+' ('+fmt(r.d[r.pick])+')':'start')+'</td>'+ids.map(function(v){
        var c=r.fixed.indexOf(v)>=0?'fix':r.changed.indexOf(v)>=0?'new':r.d[v]>=INF?'inf':'';
        return '<td class="'+c+'">'+fmt(r.d[v])+'</td>'}).join('')+'</tr>';
    });
    h+='</table></div><div class="fl-kv"><b>pred</b>: '+ids.map(function(v){return v+'\u2190'+(s.pred[v]||'\u2013')}).join(' , ')+'</div>';
    return h;
  },
  summary:function(s,g){return 'Final distances from '+s.start+': '+nodeIds(g).map(function(x){return x+' = '+fmt(s.dist[x])}).join(', ')+'.'}
};

/* ---------------- Kruskal ---------------- */
function sortedEdges(g){
  return g.edges.map(function(e){return {k:key(e[0],e[1]),u:e[0],v:e[1],w:e[2]}}).sort(function(a,b){return a.w-b.w||(a.k<b.k?-1:a.k>b.k?1:0)});
}
function find(p,x){while(p[x]!==x)x=p[x];return x}
M.kruskal={id:'kruskal',name:"Kruskal's minimum spanning tree",kind:'edge',
  rule:'Click the cheapest edge not yet considered (equal weights: any of them).',
  note:'Sort edges by weight. Take the next edge: add it unless it closes a cycle (same component), then skip it. Stop at |V| − 1 edges. Union-find answers "same component?". Kruskal can grow several pieces first.',
  init:function(g){var s={considered:[],tree:[],skipped:[],parent:{},total:0,cur:null,log:'Sorted edge list ready. Nothing added yet.'};nodeIds(g).forEach(function(v){s.parent[v]=v});return s},
  cands:function(s,g){
    if(s.tree.length>=nodeIds(g).length-1)return [];
    var rest=sortedEdges(g).filter(function(e){return s.considered.indexOf(e.k)<0});
    if(!rest.length)return [];
    var w=rest[0].w;return rest.filter(function(e){return e.w===w}).map(function(e){return e.k});
  },
  apply:function(s,g,k){
    s=clone(s);var e=sortedEdges(g).filter(function(x){return x.k===k})[0];
    var ru=find(s.parent,e.u),rv=find(s.parent,e.v);s.considered.push(k);s.cur=k;
    if(ru===rv){s.skipped.push(k);s.log='Skip '+e.u+'–'+e.v+' ('+e.w+'): '+e.u+' and '+e.v+' are already connected, it would close a cycle.'}
    else{s.parent[ru]=rv;s.tree.push(k);s.total+=e.w;s.log='Add '+e.u+'–'+e.v+' ('+e.w+'): joins two different components. Total = '+s.total+'.'}
    return s;
  },
  done:function(s,g){return this.cands(s,g).length===0},
  view:function(s,g){
    var v={},e={};
    s.tree.forEach(function(k){e[k]='in';k.split('-').forEach(function(x){v[x]='in'})});
    s.skipped.forEach(function(k){e[k]='skip'});
    if(s.cur&&!e[s.cur])e[s.cur]='now';
    return {v:v,e:e,lab:{}};
  },
  panel:function(s,g){
    var h='<table class="fl-t"><tr><th>Edge</th><th>w</th><th>status</th></tr>';
    sortedEdges(g).forEach(function(e){
      var st=s.tree.indexOf(e.k)>=0?'<span class="fl-ok">added</span>':s.skipped.indexOf(e.k)>=0?'<span class="fl-no">skipped (cycle)</span>':'waiting';
      h+='<tr><td>'+e.u+'–'+e.v+'</td><td>'+e.w+'</td><td>'+st+'</td></tr>';
    });
    h+='</table>';
    var comp={};nodeIds(g).forEach(function(v){var r=find(clone(s.parent),v);(comp[r]=comp[r]||[]).push(v)});
    h+='<div class="fl-kv"><b>Components</b>: '+Object.keys(comp).map(function(r){return '{'+comp[r].join(',')+'}'}).join(' ')+'</div>';
    return h;
  },
  summary:function(s,g){return 'MST: '+s.tree.length+' edges, total weight '+s.total+'. Order added: '+s.tree.join(', ')+'.'}
};

/* ---------------- Prim ---------------- */
function crossing(s,g){
  var out=[];g.edges.forEach(function(e){
    var a=s.inT.indexOf(e[0])>=0,b=s.inT.indexOf(e[1])>=0;
    if(a!==b)out.push({k:key(e[0],e[1]),u:e[0],v:e[1],w:e[2]});
  });
  return out.sort(function(x,y){return x.w-y.w||(x.k<y.k?-1:1)});
}
M.prim={id:'prim',name:"Prim's minimum spanning tree",kind:'edge',
  rule:'Click the cheapest edge with one end inside the tree and one end outside (ties: any).',
  note:'Start from one vertex. Repeatedly add the cheapest edge joining the tree to a vertex outside it. Always one connected tree, unlike Kruskal.',
  init:function(g,start){return {inT:[start],tree:[],total:0,cur:null,log:'Tree = {'+start+'}.'}},
  cands:function(s,g){var c=crossing(s,g);if(!c.length)return [];return c.filter(function(e){return e.w===c[0].w}).map(function(e){return e.k})},
  apply:function(s,g,k){
    s=clone(s);var c=crossing(s,g).filter(function(e){return e.k===k})[0];
    var nv=s.inT.indexOf(c.u)>=0?c.v:c.u;s.inT.push(nv);s.tree.push(k);s.total+=c.w;s.cur=k;
    s.log='Add '+c.u+'–'+c.v+' ('+c.w+'): '+nv+' joins the tree. Total = '+s.total+'.';return s;
  },
  done:function(s,g){return this.cands(s,g).length===0},
  view:function(s,g){
    var v={},e={};s.inT.forEach(function(x){v[x]='in'});
    crossing(s,g).forEach(function(c){e[c.k]='cand'});
    s.tree.forEach(function(k){e[k]='in'});
    return {v:v,e:e,lab:{}};
  },
  panel:function(s,g){
    var c=crossing(s,g);
    var h='<div class="fl-kv"><b>In tree</b>: '+s.inT.join(', ')+'</div>';
    h+='<table class="fl-t"><tr><th>Crossing edge</th><th>w</th></tr>';
    if(!c.length)h+='<tr><td colspan="2"><i>none left</i></td></tr>';
    c.forEach(function(e){h+='<tr><td>'+e.u+'–'+e.v+'</td><td>'+e.w+'</td></tr>'});
    return h+'</table>';
  },
  summary:function(s){return 'MST: '+s.tree.length+' edges, total weight '+s.total+'. Order added: '+s.tree.join(', ')+'.'}
};

/* ---------------- topological sort (directed) ---------------- */
M.toposort={id:'toposort',name:'Topological sort',kind:'vertex',
  rule:'Click a minimal vertex: one with no incoming edge among the vertices that are still left.',
  note:'Repeat: find a minimal vertex (in-degree 0 in what remains), give it the next number, remove it and its edges. If none exists but vertices remain, the digraph has a cycle.',
  init:function(){return {removed:[],cur:null,log:'No vertex numbered yet.'}},
  cands:function(s,g){
    return nodeIds(g).filter(function(v){
      if(s.removed.indexOf(v)>=0)return false;
      return !g.edges.some(function(e){return e[1]===v&&s.removed.indexOf(e[0])<0});
    });
  },
  apply:function(s,g,v){s=clone(s);s.removed.push(v);s.cur=v;s.log='Vertex '+v+' has no incoming edge left: num('+v+') = '+s.removed.length+'. Remove it and its edges.';return s},
  done:function(s,g){return this.cands(s,g).length===0},
  view:function(s,g){
    var v={},e={},lab={};
    s.removed.forEach(function(x,i){v[x]='in';lab[x]=String(i+1)});
    if(s.cur)v[s.cur]='now';
    this.cands(s,g).forEach(function(x){if(x!==s.cur)v[x]='cand'});
    g.edges.forEach(function(ed){if(s.removed.indexOf(ed[0])>=0)e[ed[0]+'>'+ed[1]]='dim'});
    return {v:v,e:e,lab:lab};
  },
  panel:function(s,g){
    var rem=nodeIds(g).length-s.removed.length;
    return '<div class="fl-kv"><b>Order so far</b>: '+(s.removed.length?s.removed.join(' → '):'<i>none</i>')+'</div><div class="fl-kv"><b>Vertices left</b>: '+rem+(rem&&!this.cands(s,g).length?' &nbsp;<span class="fl-no">no minimal vertex: cycle!</span>':'')+'</div>';
  },
  summary:function(s,g){return s.removed.length===nodeIds(g).length?'A valid order: '+s.removed.join(' → ')+'. (Several orders can be valid.)':'Stopped early: the graph has a cycle.'}
};

/* ---------------- Euler / Hamilton / Chinese Postman ---------------- */
L.degrees=function(g){var d={};nodeIds(g).forEach(function(v){d[v]=0});g.edges.forEach(function(e){d[e[0]]++;d[e[1]]++});return d};
L.eulerVerdict=function(g){
  var d=L.degrees(g),odd=nodeIds(g).filter(function(v){return d[v]%2===1});
  if(odd.length===0)return {odd:odd,kind:'cycle',text:'Every degree is even: an Eulerian cycle exists (the graph is Eulerian). Start anywhere.'};
  if(odd.length===2)return {odd:odd,kind:'trail',text:'Exactly two odd vertices ('+odd.join(' and ')+'): an Eulerian trail exists, but no Eulerian cycle. It must start at one odd vertex and end at the other.'};
  return {odd:odd,kind:'none',text:odd.length+' odd vertices ('+odd.join(', ')+'): no Eulerian trail and no Eulerian cycle.'};
};
function floyd(g){
  var ids=nodeIds(g),d={},nx={};
  ids.forEach(function(i){d[i]={};nx[i]={};ids.forEach(function(j){d[i][j]=i===j?0:INF;nx[i][j]=null})});
  g.edges.forEach(function(e){d[e[0]][e[1]]=e[2];d[e[1]][e[0]]=e[2];nx[e[0]][e[1]]=e[1];nx[e[1]][e[0]]=e[0]});
  ids.forEach(function(k){ids.forEach(function(i){ids.forEach(function(j){
    if(d[i][k]+d[k][j]<d[i][j]){d[i][j]=d[i][k]+d[k][j];nx[i][j]=nx[i][k]}})})});
  return {d:d,nx:nx};
}
function pathOf(f,u,v){var p=[u];while(u!==v){u=f.nx[u][v];p.push(u)}return p}
L.postman=function(g){
  var total=g.edges.reduce(function(a,e){return a+e[2]},0);
  var ev=L.eulerVerdict(g),odd=ev.odd;
  if(!odd.length)return {total:total,extra:0,pairs:[],best:total};
  var f=floyd(g),bestC=INF,bestP=null;
  (function rec(rest,cost,pairs){
    if(cost>=bestC)return;
    if(!rest.length){bestC=cost;bestP=pairs.slice();return}
    var a=rest[0];
    for(var i=1;i<rest.length;i++){
      var b=rest[i],r2=rest.filter(function(x,j){return j!==0&&j!==i});
      pairs.push([a,b]);rec(r2,cost+f.d[a][b],pairs);pairs.pop();
    }
  })(odd,0,[]);
  return {total:total,extra:bestC,best:total+bestC,pairs:bestP.map(function(p){return {a:p[0],b:p[1],d:f.d[p[0]][p[1]],path:pathOf(f,p[0],p[1])}})};
};
L.bestHamilton=function(g,cap){
  var ids=nodeIds(g),a=L.adj(g),n=ids.length,start=ids[0],best=INF,bestPath=null,steps=0,hit=false;
  var vis={};vis[start]=true;
  function rec(v,len,path){
    if(hit)return;if(++steps>(cap||3e6)){hit=true;return}
    if(len>=best)return;
    if(path.length===n){
      var back=wOf(g,v,start);
      if(back!==null&&len+back<best){best=len+back;bestPath=path.concat([start])}
      return;
    }
    a[v].forEach(function(p){if(!vis[p[0]]){vis[p[0]]=true;path.push(p[0]);rec(p[0],len+p[1],path);path.pop();vis[p[0]]=false}});
  }
  rec(start,0,[start]);
  return {exists:best<INF,len:best,path:bestPath,capped:hit};
};
L.wOf=wOf;

/* ---------------- Week 10 search ---------------- */
L.SEARCH={name:'State space (S → G)',start:'S',goal:'G',
  nodes:{S:[60,190],A:[200,80],B:[200,300],C:[390,70],D:[390,280],G:[580,190]},
  h:{S:4,A:2,B:4,C:1,D:3,G:0},
  edges:[['S','A',2],['S','B',3],['A','C',9],['A','D',6],['B','D',2],['C','G',1],['D','G',4]]};

function sInit(g){
  var s={frontier:[{n:g.start,g:0,p:null}],explored:[],parent:{},order:[],found:null,cost:null,cur:null,log:'Frontier = {'+g.start+'}.'};
  return s;
}
function hOf(g,n){return g.h[n]}
function sKey(mode,g){
  return function(e){
    if(mode==='ucs')return e.g;
    if(mode==='greedy')return hOf(g,e.n);
    return e.g+hOf(g,e.n);
  };
}
function mkSearch(id,name,rule,note,order){
  return {id:id,name:name,kind:'vertex',rule:rule,note:note,
    init:function(g){return sInit(g)},
    cands:function(s,g){
      if(s.found||!s.frontier.length)return [];
      if(order==='fifo')return [s.frontier[0].n];
      if(order==='lifo')return [s.frontier[s.frontier.length-1].n];
      var f=sKey(order,g),best=INF,out=[];
      s.frontier.forEach(function(e){var k=f(e);if(k<best){best=k;out=[e.n]}else if(k===best)out.push(e.n)});
      return out;
    },
    apply:function(s,g,n){
      s=clone(s);var a=L.adj(g),idx=-1;
      s.frontier.forEach(function(e,i){if(e.n===n)idx=i});
      var cur=s.frontier.splice(idx,1)[0];s.cur=n;s.order.push(n);
      if(cur.p)s.parent[n]=cur.p;
      if(n===g.goal){s.found=true;s.cost=cur.g;s.log='Expand '+n+': it is the goal. Path cost = '+cur.g+'.';return s}
      s.explored.push(n);
      var nb=a[n].map(function(p){return p}).filter(function(p){return s.explored.indexOf(p[0])<0});
      if(order==='lifo')nb=nb.slice().reverse();
      var added=[];
      nb.forEach(function(p){
        var u=p[0],gc=cur.g+p[1],ex=null;
        s.frontier.forEach(function(e){if(e.n===u)ex=e});
        if(ex){
          if((order==='ucs'||order==='astar')&&gc<ex.g){ex.g=gc;ex.p=n;added.push(u+' (cheaper, g='+gc+')')}
        }else{s.frontier.push({n:u,g:gc,p:n});added.push(u)}
      });
      s.log='Expand '+n+'. '+(added.length?'Add/update frontier: '+added.join(', ')+'.':'Nothing new to add.');
      return s;
    },
    done:function(s,g){return this.cands(s,g).length===0},
    view:function(s,g){
      var v={},e={},lab={};
      Object.keys(g.nodes).forEach(function(x){lab[x]='h='+g.h[x]});
      s.explored.forEach(function(x){v[x]='in'});
      s.frontier.forEach(function(x){v[x.n]='cand'});
      if(s.cur)v[s.cur]='now';
      if(s.found){
        var p=g.goal,path=[p];while(s.parent[p]){p=s.parent[p];path.unshift(p)}
        for(var i=0;i<path.length-1;i++)e[key(path[i],path[i+1])]='now';
        g.edges.forEach(function(ed){var k=key(ed[0],ed[1]);if(!e[k])e[k]='dim'});
      }else{
        Object.keys(s.parent).forEach(function(x){e[key(s.parent[x],x)]='in'});
      }
      return {v:v,e:e,lab:lab};
    },
    panel:function(s,g){
      var h='<table class="fl-t"><tr><th>Frontier</th><th>g</th><th>h</th><th>f = g + h</th><th>from</th></tr>';
      if(!s.frontier.length)h+='<tr><td colspan="5"><i>empty</i></td></tr>';
      s.frontier.forEach(function(e){h+='<tr><td><b>'+e.n+'</b></td><td>'+e.g+'</td><td>'+g.h[e.n]+'</td><td>'+(e.g+g.h[e.n])+'</td><td>'+(e.p||'–')+'</td></tr>'});
      h+='</table><div class="fl-kv"><b>Expanded so far</b>: '+(s.order.length?s.order.join(' → '):'<i>none</i>')+'</div>';
      return h;
    },
    summary:function(s,g){
      if(!s.found)return 'Frontier empty: no solution.';
      var p=g.goal,path=[p];while(s.parent[p]){p=s.parent[p];path.unshift(p)}
      return 'Goal reached. Expansion order: '+s.order.join(' → ')+'. Path: '+path.join(' → ')+' with cost '+s.cost+'.';
    }
  };
}
M.sbfs=mkSearch('sbfs','Breadth-first','Breadth-first expands the OLDEST frontier node (FIFO queue). Click it.','FIFO queue. Complete; finds the shallowest goal, not the cheapest. Memory is the problem: O(b^(d+1)).','fifo');
M.sdfs=mkSearch('sdfs','Depth-first','Depth-first expands the NEWEST frontier node (LIFO stack). Click it.','LIFO stack. Little memory, but may find a deep goal first or never finish on an unbounded branch. Alphabetical neighbours are tried first.','lifo');
M.sucs=mkSearch('sucs','Uniform cost','Uniform cost expands the frontier node with the smallest path cost g. Click it.','Like breadth-first but with step costs: always expand the cheapest g. Optimal. Can wander through many cheap steps.','ucs');
M.sgreedy=mkSearch('sgreedy','Greedy best-first','Greedy expands the frontier node with the smallest heuristic h (it ignores g). Click it.','Picks what looks closest to the goal. Fast but not optimal and can make false starts (the Chonburi → Pattaya trap).','greedy');
M.sastar=mkSearch('sastar','A* search','A* expands the frontier node with the smallest f = g + h. Click it.','f(n) = g(n) + h(n): cost so far plus estimate to go. Optimal when h never overestimates (admissible).','astar');

/* IDDFS: precomputed script (watch only) */
M.iddfs={id:'iddfs',name:'Iterative deepening (IDDFS)',kind:'script',noPractice:true,
  rule:'',
  note:'Depth-limited DFS with limit l = 0, 1, 2, … It uses DFS memory and finds the shallowest goal like BFS. Repeating the top levels is cheap because most nodes sit at the bottom. O(b^d).',
  init:function(g){
    var a=L.adj(g),ev=[],found=false;
    for(var lim=0;lim<=g.nodeCount&&!found;lim++){
      (function dls(n,depth,path){
        if(found)return;
        ev.push({lim:lim,n:n,depth:depth,path:path.slice()});
        if(n===g.goal){found=true;return}
        if(depth<lim)a[n].forEach(function(p){if(path.indexOf(p[0])<0&&!found){path.push(p[0]);dls(p[0],depth+1,path);path.pop()}});
      })(g.start,0,[g.start]);
    }
    return {ev:ev,k:0,log:'Ready. Limit l = 0 first.'};
  },
  cands:function(s){return s.k<s.ev.length?['next']:[]},
  apply:function(s,g){s=clone(s);var e=s.ev[s.k];s.k++;
    s.log='Limit '+e.lim+': expand '+e.n+' at depth '+e.depth+(e.n===g.goal?' — this is the goal.':'.');return s},
  done:function(s){return s.k>=s.ev.length},
  view:function(s,g){
    var v={},e={},lab={};
    if(s.k>0){
      var last=s.ev[s.k-1];
      s.ev.slice(0,s.k).forEach(function(x){if(x.lim===last.lim)v[x.n]='in'});
      v[last.n]='now';
      for(var i=0;i<last.path.length-1;i++)e[key(last.path[i],last.path[i+1])]='now';
      lab[last.n]='d='+last.depth;
    }
    return {v:v,e:e,lab:lab};
  },
  panel:function(s,g){
    var by={};s.ev.slice(0,s.k).forEach(function(x){(by[x.lim]=by[x.lim]||[]).push(x.n)});
    var h='<table class="fl-t"><tr><th>Limit</th><th>Nodes expanded (in order)</th></tr>';
    Object.keys(by).forEach(function(l){h+='<tr><td>l = '+l+'</td><td>'+by[l].join(' , ')+'</td></tr>'});
    return h+'</table><div class="fl-kv"><b>Total expansions</b>: '+s.k+'</div>';
  },
  summary:function(s,g){var last=s.ev[s.ev.length-1];return 'Goal found at limit '+last.lim+' via '+last.path.join(' → ')+'. IDDFS returns the shallowest goal, which is not always the cheapest.'}
};
L.SEARCH.nodeCount=Object.keys(L.SEARCH.nodes).length;

/* ---------------- Week 10 local search ---------------- */
L.LAND=(function(){
  var a=[];for(var x=0;x<48;x++)a.push(Math.round((45*Math.exp(-Math.pow((x-10)/5,2))+90*Math.exp(-Math.pow((x-30)/7,2)))*10)/10);
  return a;
})();
L.hillStep=function(x){
  var h=L.LAND,best=x;
  [x-1,x+1].forEach(function(n){if(n>=0&&n<h.length&&h[n]>h[best])best=n});
  return best;
};
L.rng=function(seed){var s=seed>>>0||1;return function(){s=(s*1664525+1013904223)>>>0;return s/4294967296}};
/* Simulated annealing: start hot (accepts many downhill moves), cool slowly. Random, so it
   usually but not always escapes the lower peak. */
L.annealRun=function(x0,seed){
  var h=L.LAND,r=L.rng(seed),T=60,x=x0,path=[{x:x,T:T,acc:true,tried:x}];
  for(var i=0;i<300;i++){
    var n=x+Math.round((r()*2-1)*6);if(n<0)n=0;if(n>h.length-1)n=h.length-1;
    var d=h[n]-h[x],acc=d>=0||r()<Math.exp(d/T);
    if(acc)x=n;path.push({x:x,T:T,acc:acc,tried:n});T*=0.985;
  }
  return path;
};

/* ---------------- Week 12 minimax / alpha-beta ---------------- */
L.minimax=function(leaves){
  var mins=leaves.map(function(r){return Math.min.apply(null,r)});
  return {mins:mins,root:Math.max.apply(null,mins),move:mins.indexOf(Math.max.apply(null,mins))};
};
L.alphaBeta=function(leaves){
  var ev=[],alpha=-INF,beta=INF,pruned=[],mins=[];
  leaves.forEach(function(row,i){
    var a=alpha,b=beta,v=INF,cut=false;
    for(var j=0;j<row.length;j++){
      v=Math.min(v,row[j]);
      ev.push({t:'leaf',i:i,j:j,val:row[j],alpha:a,beta:b,v:v});
      b=Math.min(b,v);
      if(b<=a){
        cut=true;
        for(var q=j+1;q<row.length;q++)pruned.push([i,q]);
        if(j+1<row.length)ev.push({t:'prune',i:i,from:j+1,alpha:a,v:v});
        break;
      }
    }
    mins.push({v:v,cut:cut});ev.push({t:'min',i:i,v:v,cut:cut});
    alpha=Math.max(alpha,v);ev.push({t:'root',alpha:alpha});
  });
  return {events:ev,pruned:pruned,mins:mins,root:alpha};
};

/* ---------------- Week 13 Huffman ---------------- */
L.huffInit=function(freqs){
  var nodes=freqs.map(function(x,i){return {id:i,s:x.s,f:x.f,l:null,r:null}});
  return {nodes:nodes,active:nodes.map(function(n){return n.id}),log:'Every symbol is a leaf. Join the two lowest frequencies.'};
};
L.huffTwoSmallest=function(st){
  var f=st.active.map(function(id){return st.nodes[id].f}).sort(function(a,b){return a-b});
  return [f[0],f[1]];
};
L.huffValid=function(st,a,b){
  if(a===b||st.active.indexOf(a)<0||st.active.indexOf(b)<0)return false;
  var t=L.huffTwoSmallest(st),x=[st.nodes[a].f,st.nodes[b].f].sort(function(p,q){return p-q});
  return x[0]===t[0]&&x[1]===t[1];
};
L.huffAuto=function(st){
  var sorted=st.active.slice().sort(function(p,q){return st.nodes[p].f-st.nodes[q].f||p-q});
  return [sorted[0],sorted[1]];
};
L.huffApply=function(st,a,b){
  st=clone(st);
  var na=st.nodes[a],nb=st.nodes[b];
  var l=na.f<nb.f||(na.f===nb.f&&a<b)?a:b,r=l===a?b:a;
  var id=st.nodes.length;
  st.nodes.push({id:id,s:null,f:na.f+nb.f,l:l,r:r});
  st.active=st.active.filter(function(x){return x!==a&&x!==b});st.active.push(id);
  st.log='Join '+label(st.nodes[l])+' ('+st.nodes[l].f+') and '+label(st.nodes[r])+' ('+st.nodes[r].f+') into a node of '+(na.f+nb.f)+'.';
  return st;
};
function label(n){return n.s!==null?n.s:'node '+n.id}
L.huffCodes=function(st){
  if(st.active.length!==1)return null;
  var codes={};
  (function walk(id,c){
    var n=st.nodes[id];
    if(n.s!==null){codes[n.s]=c||'0';return}
    walk(n.l,c+'0');walk(n.r,c+'1');
  })(st.active[0],'');
  return codes;
};
L.huffCost=function(st,codes){
  var bits=0,tot=0;st.nodes.forEach(function(n){if(n.s!==null){bits+=n.f*codes[n.s].length;tot+=n.f}});
  return {bits:bits,total:tot,avg:bits/tot};
};
L.huffDecode=function(codes,bits){
  var inv={};Object.keys(codes).forEach(function(k){inv[codes[k]]=k});
  var out='',cur='';
  for(var i=0;i<bits.length;i++){cur+=bits[i];if(inv[cur]!==undefined){out+=inv[cur];cur=''}}
  return {text:out,rest:cur};
};
L.huffEncode=function(codes,text){
  var out='',bad=[];
  text.toUpperCase().split('').forEach(function(c){if(c===' ')return;if(codes[c]===undefined)bad.push(c);else out+=codes[c]});
  return {bits:out,bad:bad};
};

if(typeof module!=='undefined'&&module.exports)module.exports=L;
else root.FinalPrepLogic=L;
})(typeof window!=='undefined'?window:this);
