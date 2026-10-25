"use strict";
/* Final Prep: visual labs for every graph and algorithm topic on the final (Weeks 7, 10, 12, 13).
   Watch mode plays an algorithm one step at a time. Practice mode makes YOU click each step
   (next vertex, next edge, which leaves are pruned, which two nodes Huffman joins...) and
   checks it. Logic lives in final-prep-logic.js. */
(function(){
if(window.__algoFinalPrepLoaded)return;window.__algoFinalPrepLoaded=true;
var L=window.FinalPrepLogic,page=document.getElementById('page-finalprep');
if(!L||!page)return;
var root=document.getElementById('fl-root');if(!root)return;

var style=document.createElement('style');
style.textContent=`
/* Lab-only palette. The shared Study Console stylesheet recolours the site variables, which
   washed the diagrams out, so the lab pins its own vivid colours (dark default, light variant). */
#fl-root{--am:#ffd23f;--gr:#39ff9c;--cy:#22d3ff;--vi:#c58bff;--rd:#ff4d6d;
  --ink:#ffffff;--dim:#c3cee6;--faint:#94a3c4;--panel:#0a1020;--panel2:#131c33;--line:#2a3756;--line2:#44557b;--tline:#6a7da3}
html:not(.dark) #fl-root{--am:#b45309;--gr:#047857;--cy:#0369a1;--vi:#6d28d9;--rd:#b91c1c;
  --ink:#0f172a;--dim:#475569;--faint:#64748b;--panel:#ffffff;--panel2:#f1f5f9;--line:#e2e8f0;--line2:#cbd5e1;--tline:#94a3b8}
.fl-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:20px 0 18px}
.fl-tab{border:1px solid var(--line2);background:var(--panel2);color:var(--dim);font:700 12px var(--mono);letter-spacing:.4px;padding:9px 13px;border-radius:10px;cursor:pointer}
.fl-tab:hover{color:var(--ink);border-color:var(--am)}
.fl-tab.on{color:var(--am);border-color:var(--am);background:color-mix(in srgb,var(--am) 10%,var(--panel))}
.fl-pane{display:none}.fl-pane.on{display:block}
.fl-intro{color:var(--dim);margin:0 0 14px;max-width:760px}
.fl-bar{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end;margin-bottom:14px}
.fl-bar label{display:flex;flex-direction:column;gap:4px;font:700 10px var(--mono);letter-spacing:1.2px;text-transform:uppercase;color:var(--faint)}
.fl-bar select,.fl-bar input[type=number],.fl-in{background:var(--panel2);color:var(--ink);border:1px solid var(--line2);border-radius:8px;padding:8px 10px;font:600 13px var(--mono)}
.fl-seg{display:inline-flex;border:1px solid var(--line2);border-radius:9px;overflow:hidden}
.fl-seg button{background:var(--panel2);color:var(--dim);border:0;border-right:1px solid var(--line2);padding:9px 14px;font:700 12px var(--mono);cursor:pointer}
.fl-seg button:last-child{border-right:0}
.fl-seg button.on{background:color-mix(in srgb,var(--am) 16%,var(--panel));color:var(--am)}
.fl-seg button:disabled{opacity:.35;cursor:not-allowed}
.fl-grid.fl-wide{grid-template-columns:minmax(0,1fr)}
.fl-grid.fl-wide .fl-svg{max-height:560px}
.fl-grid{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(260px,1fr);gap:16px;align-items:start}
@media(max-width:900px){.fl-grid{grid-template-columns:1fr}}
.fl-card{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:12px}
.fl-svg{display:block;width:100%;height:auto;max-height:440px}
.fl-ctl{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.fl-b{border:1px solid var(--line2);background:var(--panel2);color:var(--ink);font:700 12px var(--mono);padding:9px 14px;border-radius:9px;cursor:pointer}
.fl-b:hover:not(:disabled){border-color:var(--am);color:var(--am)}
.fl-b:disabled{opacity:.35;cursor:not-allowed}
.fl-b.pri{background:color-mix(in srgb,var(--am) 16%,var(--panel));border-color:color-mix(in srgb,var(--am) 45%,transparent);color:var(--am)}
.fl-msg{border-left:3px solid var(--cy);background:var(--panel2);border-radius:0 9px 9px 0;padding:10px 12px;font-size:14px;line-height:1.55;margin-bottom:10px;min-height:48px}
.fl-msg.ok{border-color:var(--gr)}.fl-msg.bad{border-color:var(--rd)}.fl-msg.done{border-color:var(--am)}
.fl-note{font-size:13px;color:var(--dim);margin-top:10px;line-height:1.55}
.fl-kv{font-size:14px;margin:6px 0;line-height:1.55}
.fl-djw{overflow-x:auto}.fl-dj{border-collapse:collapse;width:100%;min-width:480px;font:600 12.5px var(--mono)}
.fl-dj th,.fl-dj td{border:1px solid var(--line2);padding:6px 7px;text-align:center}
.fl-dj th{color:var(--dim);font-size:10.5px;letter-spacing:.6px}
.fl-dj td.fix{color:var(--am);font-weight:800;background:color-mix(in srgb,var(--am) 12%,transparent)}
.fl-dj td.new{color:var(--cy);font-weight:800}
.fl-dj td.pick{color:var(--ink);font-weight:800;text-align:left;white-space:nowrap}
.fl-dj td.inf{color:var(--faint)}
.fl-t{width:100%;border-collapse:collapse;font-size:13px;margin:4px 0 6px}
.fl-t th,.fl-t td{text-align:left;padding:5px 8px;border-bottom:1px solid var(--line)}
.fl-t th{font:700 10px var(--mono);letter-spacing:1px;text-transform:uppercase;color:var(--faint)}
.fl-ok{color:var(--gr);font-weight:700}.fl-no{color:var(--rd);font-weight:700}
.fl-e{stroke:var(--tline);stroke-width:2;stroke-linecap:round;transition:stroke .15s}
.fl-e.in{stroke:var(--am);stroke-width:4.5}
.fl-e.now{stroke:var(--cy);stroke-width:4.5}
.fl-e.cand{stroke:var(--cy);stroke-width:2.6;stroke-dasharray:6 5}
.fl-e.skip{stroke:var(--rd);stroke-width:2.4;stroke-dasharray:3 6;opacity:.85}
.fl-e.dim{opacity:.22}
.fl-e.hint{stroke:var(--gr);stroke-width:5}
.fl-e.rep{stroke:var(--rd);stroke-width:4.5}
.fl-e.wrong{stroke:var(--rd);stroke-width:5}
.fl-ar{fill:var(--tline)}.fl-ar.in{fill:var(--am)}.fl-ar.now{fill:var(--cy)}.fl-ar.dim{opacity:.22}
.fl-hit{stroke:transparent;stroke-width:18;stroke-linecap:round}
.fl-wb{fill:var(--panel2)}
.fl-lbg{fill:var(--panel2);stroke:var(--line2);stroke-width:1}
.fl-wt{fill:var(--dim);font:700 11px var(--mono);text-anchor:middle;dominant-baseline:central;pointer-events:none}
.in .fl-wt{fill:var(--am)}.now .fl-wt{fill:var(--cy)}.skip .fl-wt,.rep .fl-wt{fill:var(--rd)}.dim .fl-wt{opacity:.4}.hint .fl-wt{fill:var(--gr)}
.fl-n{fill:var(--panel);stroke:var(--line2);stroke-width:2;transition:fill .15s,stroke .15s}
.fl-n.in{fill:color-mix(in srgb,var(--am) 22%,var(--panel));stroke:var(--am)}
.fl-n.now{fill:color-mix(in srgb,var(--cy) 26%,var(--panel));stroke:var(--cy)}
.fl-n.cand{stroke:var(--cy);stroke-dasharray:4 3}
.fl-n.hint{stroke:var(--gr);stroke-width:4}
.fl-n.odd{fill:color-mix(in srgb,var(--rd) 22%,var(--panel));stroke:var(--rd)}
.fl-n.wrong{stroke:var(--rd);stroke-width:4}
.fl-n.sel{stroke:var(--vi);stroke-width:4}
.fl-nt{fill:var(--ink);font:700 15px var(--mono);text-anchor:middle;dominant-baseline:central;pointer-events:none}
.fl-lab{fill:var(--cy);font:700 12px var(--mono);text-anchor:middle;pointer-events:none}
.fl-bad{fill:var(--rd);font:800 11px var(--mono);text-anchor:middle;pointer-events:none}
.fl-click{cursor:pointer}
.fl-ng.fl-click:hover .fl-n{stroke:var(--am)}
.fl-eg.fl-click:hover .fl-e{stroke:var(--am)}
.fl-lg{display:flex;flex-wrap:wrap;gap:12px;font-size:12px;color:var(--dim);margin-top:8px}
.fl-lg i{display:inline-block;width:12px;height:12px;border-radius:50%;vertical-align:-2px;margin-right:5px;border:2px solid}
.fl-curve{fill:none;stroke:var(--vi);stroke-width:3}
.fl-fill{fill:color-mix(in srgb,var(--vi) 12%,transparent)}
.fl-dot{fill:var(--am)}.fl-dot.t{fill:var(--cy);opacity:.55}.fl-dot.best{fill:var(--gr)}
.fl-gl{fill:var(--panel);stroke:var(--line2);stroke-width:2}
.fl-gl.seen{fill:color-mix(in srgb,var(--am) 20%,var(--panel));stroke:var(--am)}
.fl-gl.now{fill:color-mix(in srgb,var(--cy) 24%,var(--panel));stroke:var(--cy)}
.fl-gl.cut{fill:color-mix(in srgb,var(--rd) 12%,var(--panel));stroke:var(--rd);stroke-dasharray:4 3}
.fl-gl.mark{stroke:var(--vi);stroke-width:4}
.fl-gl.right{fill:color-mix(in srgb,var(--gr) 22%,var(--panel));stroke:var(--gr)}
.fl-gl.wrongm{fill:color-mix(in srgb,var(--rd) 22%,var(--panel));stroke:var(--rd)}
.fl-sh{fill:var(--panel);stroke:var(--line2);stroke-width:2}
.fl-sh.done{fill:color-mix(in srgb,var(--am) 20%,var(--panel));stroke:var(--am)}
.fl-sh.cut{stroke:var(--rd);stroke-dasharray:4 3}
.fl-leaves{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:10px 0}
.fl-leaves input{width:100%;text-align:center}
.fl-fq{display:flex;flex-direction:column;gap:3px;font:700 10px var(--mono);color:var(--faint);align-items:center}
.fl-fq input{width:62px;text-align:center}
.fl-fqs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}
.fl-chk{display:flex;gap:10px;align-items:flex-start;padding:9px 0;border-bottom:1px solid var(--line);font-size:14px;line-height:1.5}
.fl-chk input{margin-top:4px;accent-color:var(--am)}
.fl-chk button{margin-left:auto;flex:0 0 auto}
.fl-prog{font:800 13px var(--mono);color:var(--am);margin:6px 0 4px}
.fl-h3{font:800 11px var(--mono);letter-spacing:1.5px;text-transform:uppercase;color:var(--am);margin:20px 0 4px}
.fl-code{font:600 13px var(--mono);word-break:break-all;background:var(--panel2);border:1px solid var(--line);border-radius:8px;padding:8px 10px;margin:6px 0}
#fl-root .fl-svg,#fl-root .fl-card{opacity:1!important;filter:none!important;mix-blend-mode:normal!important}
/* ---- state palette: one clear colour per meaning ----
   green = chosen / in the result, cyan = current step, violet = waiting candidate,
   red = skipped / rejected, amber = hint */
.fl-card{background:color-mix(in srgb,var(--ink) 3%,var(--panel))}
.fl-e{stroke:color-mix(in srgb,var(--dim) 78%,var(--panel));stroke-width:2.8}
.fl-e.in{stroke:var(--gr);stroke-width:6}
.fl-e.now{stroke:var(--cy);stroke-width:6.5}
.fl-e.cand{stroke:var(--vi);stroke-width:4.4;stroke-dasharray:9 5}
.fl-e.skip{stroke:var(--rd);stroke-width:4;stroke-dasharray:3 6;opacity:1}
.fl-e.dim{opacity:.16}
.fl-e.hint{stroke:var(--am);stroke-width:6.5}
.fl-e.rep{stroke:var(--rd);stroke-width:5.5}
.fl-e.wrong{stroke:var(--rd);stroke-width:6.5}
.fl-ar{fill:color-mix(in srgb,var(--dim) 78%,var(--panel))}.fl-ar.in{fill:var(--gr)}.fl-ar.now{fill:var(--cy)}.fl-ar.cand{fill:var(--vi)}.fl-ar.dim{opacity:.16}
.fl-wb{fill:var(--panel);stroke:color-mix(in srgb,var(--dim) 45%,transparent);stroke-width:1}
.fl-wt{fill:var(--ink);font-size:12px}
.in .fl-wt{fill:var(--gr)}.now .fl-wt{fill:var(--cy)}.cand .fl-wt{fill:var(--vi)}.skip .fl-wt,.rep .fl-wt{fill:var(--rd)}.hint .fl-wt{fill:var(--am)}
.fl-n{fill:color-mix(in srgb,var(--ink) 7%,var(--panel));stroke:color-mix(in srgb,var(--dim) 80%,var(--panel));stroke-width:2.6}
.fl-n.in{fill:color-mix(in srgb,var(--gr) 68%,var(--panel));stroke:var(--gr);stroke-width:3.8;filter:drop-shadow(0 0 9px var(--gr))}
.fl-n.now{fill:color-mix(in srgb,var(--cy) 78%,var(--panel));stroke:var(--cy);stroke-width:4.2;filter:drop-shadow(0 0 12px var(--cy))}
.fl-n.cand{fill:color-mix(in srgb,var(--vi) 58%,var(--panel));stroke:var(--vi);stroke-width:3.2;stroke-dasharray:5 3}
.fl-n.hint{fill:color-mix(in srgb,var(--am) 62%,var(--panel));stroke:var(--am);stroke-width:5;filter:drop-shadow(0 0 12px var(--am))}
.fl-n.odd{fill:color-mix(in srgb,var(--rd) 68%,var(--panel));stroke:var(--rd);stroke-width:3.8}
.fl-n.wrong{fill:color-mix(in srgb,var(--rd) 62%,var(--panel));stroke:var(--rd);stroke-width:5}
.fl-n.sel{fill:color-mix(in srgb,var(--vi) 66%,var(--panel));stroke:var(--vi);stroke-width:5}
.fl-nt{font-size:16px;font-weight:800}
.fl-lbg{fill:var(--panel);stroke:color-mix(in srgb,var(--cy) 55%,transparent);stroke-width:1.2}
.fl-lab{font-size:13px}
.fl-bad{font-size:12px}
.fl-gl{fill:color-mix(in srgb,var(--ink) 7%,var(--panel));stroke:color-mix(in srgb,var(--dim) 80%,var(--panel));stroke-width:2.4}
.fl-gl.seen{fill:color-mix(in srgb,var(--gr) 68%,var(--panel));stroke:var(--gr);stroke-width:3.4}
.fl-gl.now{fill:color-mix(in srgb,var(--cy) 78%,var(--panel));stroke:var(--cy);stroke-width:4;filter:drop-shadow(0 0 11px var(--cy))}
.fl-gl.cut{fill:color-mix(in srgb,var(--rd) 50%,var(--panel));stroke:var(--rd);stroke-width:3}
.fl-gl.mark{fill:color-mix(in srgb,var(--vi) 62%,var(--panel));stroke:var(--vi);stroke-width:4.5}
.fl-gl.right{fill:color-mix(in srgb,var(--gr) 68%,var(--panel));stroke:var(--gr);stroke-width:4}
.fl-gl.wrongm{fill:color-mix(in srgb,var(--rd) 68%,var(--panel));stroke:var(--rd);stroke-width:4}
.fl-sh{fill:color-mix(in srgb,var(--ink) 7%,var(--panel));stroke:color-mix(in srgb,var(--dim) 80%,var(--panel));stroke-width:2.4}
.fl-sh.done{fill:color-mix(in srgb,var(--gr) 68%,var(--panel));stroke:var(--gr);stroke-width:3.6}
.fl-sh.cut{fill:color-mix(in srgb,var(--rd) 46%,var(--panel));stroke:var(--rd);stroke-dasharray:5 3;stroke-width:3}
.fl-curve{stroke-width:3.5}
.fl-fill{fill:color-mix(in srgb,var(--vi) 22%,transparent)}
.fl-dot{fill:var(--am);stroke:var(--panel);stroke-width:2}.fl-dot.t{fill:var(--cy);opacity:.8}.fl-dot.best{fill:var(--gr)}
.fl-lg{gap:14px;font-size:12.5px;color:var(--ink)}
.fl-lg i{width:14px;height:14px;border-width:3px}
.fl-msg{border-left-width:5px}
.fl-msg.ok{background:color-mix(in srgb,var(--gr) 12%,var(--panel2))}
.fl-msg.bad{background:color-mix(in srgb,var(--rd) 12%,var(--panel2))}
.fl-msg.done{background:color-mix(in srgb,var(--am) 10%,var(--panel2))}
.fl-ng.fl-click:hover .fl-n{stroke:var(--am);stroke-width:5}
.fl-eg.fl-click:hover .fl-e{stroke:var(--am);stroke-width:5}
`;
document.head.appendChild(style);

/* ---------------- helpers ---------------- */
function q(sel,r){return (r||root).querySelector(sel)}
function qa(sel,r){return Array.prototype.slice.call((r||root).querySelectorAll(sel))}
function opt(v,t,sel){return '<option value="'+v+'"'+(sel?' selected':'')+'>'+t+'</option>'}
function ids(g){return Object.keys(g.nodes).sort()}

/* ---------------- graph drawing ---------------- */
function labelPos(g){
  if(g._lp)return g._lp;
  var pos={},placed=[],pts=Object.keys(g.nodes).map(function(v){return g.nodes[v]}),ts=[.5,.42,.58,.34,.66,.27,.73,.2,.8];
  g.edges.forEach(function(e){
    var a=g.nodes[e[0]],b=g.nodes[e[1]],best=null;
    for(var i=0;i<ts.length&&!best;i++){
      var x=a[0]+(b[0]-a[0])*ts[i],y=a[1]+(b[1]-a[1])*ts[i];
      if(placed.every(function(p){return Math.hypot(p[0]-x,p[1]-y)>=30})&&pts.every(function(n){return Math.hypot(n[0]-x,n[1]-y)>=34}))best=[x,y];
    }
    if(!best)best=[(a[0]+b[0])/2,(a[1]+b[1])/2];
    placed.push(best);pos[L.key(e[0],e[1])]=best;
  });
  g._lp=pos;return pos;
}
/* inline palette: SVG colors are written as inline styles so no cascade/cache issue can dim them */
function isDark(){return document.documentElement.classList.contains('dark')||document.documentElement.dataset.theme==='dark'}
function mixc(a,b,t){function h(c){return [1,3,5].map(function(i){return parseInt(c.substr(i,2),16)})}var x=h(a),y=h(b);return '#'+x.map(function(v,i){var n=Math.round(v*t+y[i]*(1-t));return (n<16?'0':'')+n.toString(16)}).join('')}
function PAL(){
  var d=isDark(),c=d?{am:'#ffd23f',gr:'#39ff9c',cy:'#22d3ff',vi:'#c58bff',rd:'#ff4d6d',ink:'#ffffff',dim:'#c3cee6',panel:'#0a1020',panel2:'#131c33',line2:'#44557b'}
    :{am:'#b45309',gr:'#047857',cy:'#0369a1',vi:'#6d28d9',rd:'#b91c1c',ink:'#0f172a',dim:'#475569',panel:'#ffffff',panel2:'#f1f5f9',line2:'#cbd5e1'};
  /* Study Console v3: use the shared diagram tokens when they are present (6-digit hex). */
  var cs=getComputedStyle(document.documentElement),tk=function(n){var v=(cs.getPropertyValue(n)||'').trim();return /^#[0-9a-f]{6}$/i.test(v)?v:''};
  if(tk('--sc-surface')&&tk('--sc-dg-1')){
    c={am:tk('--sc-dg-3'),gr:tk('--sc-dg-6'),cy:tk('--sc-dg-1'),vi:tk('--sc-dg-2'),rd:tk('--sc-danger'),ink:tk('--sc-text'),dim:tk('--sc-muted'),panel:tk('--sc-surface'),panel2:tk('--sc-surface-2'),line2:tk('--sc-line-strong')};
  }
  c.dark=d;return c;
}
var STC={in:'gr',now:'cy',cand:'vi',skip:'rd',hint:'am',rep:'rd',wrong:'rd',odd:'rd',sel:'vi'};
function stOf(cls){var m=(cls||'').split(/\s+/);for(var i=0;i<m.length;i++)if(STC[m[i]])return m[i];return ''}
function drawGraph(g,view,o){
  o=o||{};view=view||{};
  var R=20,ks=Object.keys(g.nodes),xs=ks.map(function(v){return g.nodes[v][0]}),ys=ks.map(function(v){return g.nodes[v][1]});
  var vx=Math.min.apply(0,xs)-45,vy=Math.min.apply(0,ys)-45,vw=Math.max.apply(0,xs)+45-vx,vh=Math.max.apply(0,ys)+60-vy;
  var s='<svg class="fl-svg" viewBox="'+vx+' '+vy+' '+vw+' '+vh+'" role="img" aria-label="graph">';
  function labDir(v){
    var p=g.nodes[v],angs=[];
    g.edges.forEach(function(e){var o=e[0]===v?e[1]:e[1]===v?e[0]:null;if(o!==null)angs.push(Math.atan2(g.nodes[o][1]-p[1],g.nodes[o][0]-p[0]))});
    var best=null,bs=-1;
    [[0,1],[0,-1],[1,0],[-1,0],[.7,.7],[-.7,.7],[.7,-.7],[-.7,-.7]].forEach(function(d,i){
      var a=Math.atan2(d[1],d[0]),m=9;
      angs.forEach(function(x){var df=Math.abs(a-x);df=Math.min(df,6.2832-df);if(df<m)m=df});
      var sc=m-(i>=4?.15:0)-(d[1]<0?.05:0);
      if(sc>bs){bs=sc;best=d}
    });
    return best;
  }
  g.edges.forEach(function(e){
    var a=g.nodes[e[0]],b=g.nodes[e[1]],k=g.directed?e[0]+'>'+e[1]:L.key(e[0],e[1]);
    var cls=(view.e&&view.e[k])||'';
    var dx=b[0]-a[0],dy=b[1]-a[1],len=Math.sqrt(dx*dx+dy*dy),ux=dx/len,uy=dy/len;
    var x1=a[0],y1=a[1],x2=b[0],y2=b[1];
    if(g.directed){x1+=ux*R;y1+=uy*R;x2-=ux*(R+1);y2-=uy*(R+1)}
    var C=PAL(),st=stOf(cls),col=st?C[STC[st]]:mixc(C.dim,C.panel,.8),dimE=/\bdim\b/.test(cls);
    var ew=st==='in'?5:st==='now'?5.5:st==='cand'?3.6:st==='skip'?3:st?5:2.2;
    var ed=st==='cand'?' stroke-dasharray:9 5;':st==='skip'?' stroke-dasharray:3 6;':'';
    s+='<g class="fl-eg'+(o.clickEdges?' fl-click':'')+' '+cls+'" data-e="'+k+'">';
    s+='<line class="fl-hit" x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'"/>';
    s+='<line class="fl-e '+cls+'" style="stroke:'+col+' !important;stroke-width:'+ew+'px !important;opacity:'+(dimE?.2:1)+' !important;'+ed+'" x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'"/>';
    if(g.directed){
      var px=-uy,py=ux,bx=x2-ux*12,by=y2-uy*12;
      s+='<polygon class="fl-ar '+cls+'" style="fill:'+col+' !important;opacity:'+(dimE?.2:1)+' !important" points="'+x2+','+y2+' '+(bx+px*5)+','+(by+py*5)+' '+(bx-px*5)+','+(by-py*5)+'"/>';
    }else{
      var lp=labelPos(g)[k],mx=lp[0],my=lp[1];
      s+='<rect class="fl-wb" style="fill:'+C.panel+' !important;stroke:'+(st?col:mixc(C.dim,C.panel,.5))+' !important" x="'+(mx-12)+'" y="'+(my-9)+'" width="24" height="18" rx="5"/><text class="fl-wt" style="fill:'+C.ink+' !important" x="'+mx+'" y="'+my+'">'+e[2]+'</text>';
    }
    s+='</g>';
  });
  Object.keys(g.nodes).forEach(function(v){
    var p=g.nodes[v],cls=(view.v&&view.v[v])||'',C=PAL(),st=stOf(cls),col=st?C[STC[st]]:'',
      nf=st?mixc(col,C.panel,C.dark?.9:.35):mixc(C.ink,C.panel,.1),ns=st?col:mixc(C.dim,C.panel,.8),
      nsty='fill:'+nf+' !important;stroke:'+ns+' !important;stroke-width:'+(st?4.2:2.6)+'px !important;opacity:1 !important;'+(st==='cand'?'stroke-dasharray:5 3;':'')+(st&&C.dark&&(st==='in'||st==='now'||st==='hint')?'filter:drop-shadow(0 0 9px '+col+');':'');
    s+='<g class="fl-ng'+(o.clickNodes?' fl-click':'')+'" data-v="'+v+'"><circle class="fl-n '+cls+'" style="'+nsty+'" cx="'+p[0]+'" cy="'+p[1]+'" r="'+R+'"/><text class="fl-nt" style="fill:'+(st&&C.dark?'#06101f':C.ink)+' !important;opacity:1 !important" x="'+p[0]+'" y="'+p[1]+'">'+v+'</text>';
    if(view.lab&&view.lab[v]!==undefined){var lt=String(view.lab[v]),lw=Math.max(26,lt.length*7.6+12),ld=labDir(v),lx=p[0]+ld[0]*(R+10+(Math.abs(ld[0])>0?lw/2-8:0)),ly=p[1]+ld[1]*(R+13);
      s+='<rect class="fl-lbg" style="fill:'+C.panel+' !important;stroke:'+mixc(C.cy,C.panel,.55)+' !important" x="'+(lx-lw/2)+'" y="'+(ly-9.5)+'" width="'+lw+'" height="19" rx="6"/><text class="fl-lab" x="'+lx+'" y="'+ly+'" style="dominant-baseline:central;fill:'+C.ink+' !important">'+lt+'</text>'}
    if(view.badge&&view.badge[v]!==undefined)s+='<text class="fl-bad" x="'+(p[0]+R-2)+'" y="'+(p[1]-R+2)+'">'+view.badge[v]+'</text>';
    s+='</g>';
  });
  return s+'</svg>';
}
var LEGEND='<div class="fl-lg"><span><i style="border-color:var(--gr);background:color-mix(in srgb,var(--gr) 40%,transparent)"></i>chosen / in the result</span><span><i style="border-color:var(--cy);background:color-mix(in srgb,var(--cy) 50%,transparent)"></i>current step</span><span><i style="border-color:var(--vi);border-style:dashed;background:color-mix(in srgb,var(--vi) 30%,transparent)"></i>waiting / candidate</span><span><i style="border-color:var(--rd);border-style:dashed;background:color-mix(in srgb,var(--rd) 30%,transparent)"></i>skipped / rejected</span><span><i style="border-color:var(--am);background:color-mix(in srgb,var(--am) 35%,transparent)"></i>hint</span></div>';

/* ---------------- generic stepping lab (graph algorithms + search) ---------------- */
function makeLab(box,cfg){
  var M=cfg.machines;
  box.innerHTML=
   '<div class="fl-bar">'+
   (cfg.graphOrder.length>1?'<label>Graph<select class="fl-gsel"></select></label>':'')+
   '<label>Algorithm<select class="fl-asel"></select></label>'+
   '<label class="fl-sw">Start vertex<select class="fl-ssel"></select></label>'+
   '<div class="fl-seg" role="group" aria-label="Mode"><button type="button" data-mode="watch" class="on">Watch</button><button type="button" data-mode="practice">Practice</button></div>'+
   '</div>'+
   '<div class="fl-grid"><div><div class="fl-card"><div class="fl-gw"></div>'+LEGEND+'</div>'+
   '<div class="fl-ctl"><button type="button" class="fl-b" data-a="prev">‹ Back</button><button type="button" class="fl-b pri" data-a="next">Next step ›</button><button type="button" class="fl-b" data-a="hint">Hint</button><button type="button" class="fl-b" data-a="auto">Auto-play</button><button type="button" class="fl-b" data-a="reset">Reset</button></div></div>'+
   '<div><div class="fl-msg"></div><div class="fl-card fl-pn"></div><div class="fl-note"></div></div></div>';
  var gs=q('.fl-gsel',box),as=q('.fl-asel',box),ss=q('.fl-ssel',box),sw=q('.fl-sw',box),gw=q('.fl-gw',box),msg=q('.fl-msg',box),pn=q('.fl-pn',box),nt=q('.fl-note',box);
  var bt={};qa('[data-a]',box).forEach(function(b){bt[b.dataset.a]=b});
  var modeBtns=qa('[data-mode]',box);
  var st={gid:cfg.graphOrder[0],alg:null,start:null,mode:'watch',hist:[],ok:0,miss:0,hint:false,timer:null};
  var g,mach;

  function stopAuto(){if(st.timer){clearInterval(st.timer);st.timer=null;bt.auto.textContent='Auto-play'}}
  function cur(){return st.hist[st.hist.length-1]}
  function fillGraphs(){if(gs)gs.innerHTML=cfg.graphOrder.map(function(id){return opt(id,cfg.graphs[id].name,id===st.gid)}).join('')}
  function fillAlgs(){
    var list=cfg.algsFor(g,st.gid);
    if(list.indexOf(st.alg)<0)st.alg=list[0];
    as.innerHTML=list.map(function(id){return opt(id,M[id].name,id===st.alg)}).join('');
  }
  function fillStart(){
    var show=cfg.hasStart&&['bfs','dfs','dijkstra','prim'].indexOf(st.alg)>=0;
    sw.style.display=show?'':'none';
    var list=ids(g);if(list.indexOf(st.start)<0)st.start=list[0];
    ss.innerHTML=list.map(function(v){return opt(v,v,v===st.start)}).join('');
  }
  function reset(){
    stopAuto();g=cfg.graphs[st.gid];mach=M[st.alg];
    if(mach.noPractice&&st.mode==='practice')st.mode='watch';
    st.hist=[mach.init(g,st.start)];st.ok=0;st.miss=0;st.hint=false;
    nt.innerHTML='<b>Exam note.</b> '+mach.note+(mach.kind==='script'?'':' <br><span style="color:var(--faint)">Ties: Watch takes alphabetical order; Practice accepts any tied choice, as the exam does.</span>');
    draw(st.mode==='practice'?'<b>Your turn.</b> '+mach.rule:'Press <b>Next step</b> to run the algorithm one step at a time, or <b>Auto-play</b>.','');
  }
  function draw(m,cls,wrong){
    var s=cur(),vw=mach.view(s,g),done=mach.done(s,g);
    vw={v:Object.assign({},vw.v),e:Object.assign({},vw.e),lab:vw.lab,badge:vw.badge};
    if(st.hint&&!done){mach.cands(s,g).forEach(function(c){if(mach.kind==='edge')vw.e[c]='hint';else vw.v[c]='hint'})}
    if(wrong){if(wrong.v)vw.v[wrong.v]='wrong';if(wrong.e)vw.e[wrong.e]='wrong'}
    var practice=st.mode==='practice'&&!done&&!mach.noPractice;
    gw.innerHTML=drawGraph(g,vw,{clickNodes:practice&&mach.kind==='vertex',clickEdges:practice&&mach.kind==='edge'});
    pn.innerHTML=mach.panel(s,g);
    q('.fl-grid',box).classList.toggle('fl-wide',!!mach.wide);
    if(done){m='<b>Done.</b> '+mach.summary(s,g)+(st.mode==='practice'?' <br>Score: <b>'+st.ok+'</b> correct, <b>'+st.miss+'</b> mistake'+(st.miss===1?'':'s')+'.':'');cls='done'}
    msg.className='fl-msg '+(cls||'');msg.innerHTML=m;
    modeBtns.forEach(function(b){b.classList.toggle('on',b.dataset.mode===st.mode);if(b.dataset.mode==='practice')b.disabled=!!mach.noPractice});
    bt.next.style.display=st.mode==='watch'?'':'none';
    bt.auto.style.display=st.mode==='watch'?'':'none';
    bt.hint.style.display=st.mode==='practice'?'':'none';
    bt.next.disabled=done;bt.auto.disabled=done&&!st.timer;bt.hint.disabled=done;
    bt.prev.disabled=st.hist.length<2;
  }
  function step(choice){
    var s=cur();st.hist.push(mach.apply(s,g,choice));st.hint=false;
  }
  function autoChoice(){var c=mach.cands(cur(),g);return c[0]}
  bt.next.onclick=function(){if(mach.done(cur(),g))return;step(autoChoice());draw(cur().log,'')};
  bt.prev.onclick=function(){stopAuto();if(st.hist.length>1){st.hist.pop();st.hint=false;draw(st.hist.length>1?cur().log:'Back at the start.','')}};
  bt.reset.onclick=reset;
  bt.hint.onclick=function(){st.hint=true;draw('Hint: the amber choice'+(mach.cands(cur(),g).length>1?'s are all valid (a tie)':' is correct')+'. '+mach.rule,'')};
  bt.auto.onclick=function(){
    if(st.timer){stopAuto();return}
    if(mach.done(cur(),g))return;
    bt.auto.textContent='Pause';
    st.timer=setInterval(function(){if(mach.done(cur(),g)){stopAuto();draw('','');return}step(autoChoice());draw(cur().log,'');if(mach.done(cur(),g))stopAuto()},900);
  };
  modeBtns.forEach(function(b){b.onclick=function(){if(b.disabled)return;st.mode=b.dataset.mode;reset()}});
  if(gs)gs.onchange=function(){st.gid=gs.value;g=cfg.graphs[st.gid];fillAlgs();fillStart();reset()};
  as.onchange=function(){st.alg=as.value;fillStart();reset()};
  ss.onchange=function(){st.start=ss.value;reset()};
  gw.addEventListener('click',function(ev){
    if(st.mode!=='practice'||mach.noPractice||mach.done(cur(),g))return;
    var nodeEl=ev.target.closest('[data-v]'),edgeEl=ev.target.closest('[data-e]');
    var choice=null,wrong=null;
    if(nodeEl){if(mach.kind==='vertex'){choice=nodeEl.dataset.v;wrong={v:choice}}else{draw('This step is about an <b>edge</b>. Click the edge itself.','bad');return}}
    else if(edgeEl){if(mach.kind==='edge'){choice=edgeEl.dataset.e;wrong={e:choice}}else{draw('This step is about a <b>vertex</b>. Click a vertex.','bad');return}}
    else return;
    if(mach.cands(cur(),g).indexOf(choice)>=0){st.ok++;step(choice);draw('<b>Correct.</b> '+cur().log,'ok')}
    else{st.miss++;draw('<b>Not that one.</b> '+mach.rule,'bad',wrong)}
  });
  if(gs)fillGraphs();
  g=cfg.graphs[st.gid];st.alg=cfg.defaultAlg;fillAlgs();fillStart();reset();
}

/* ---------------- Graph lab ---------------- */
function initGraphs(box){
  makeLab(box,{graphs:L.GRAPHS,graphOrder:['practice','a4','mock','tasks'],machines:L.machines,hasStart:true,defaultAlg:'dijkstra',
    algsFor:function(g){return g.directed?['toposort','dijkstra','bfs','dfs']:['dijkstra','kruskal','prim','bfs','dfs']}});
}

/* ---------------- Euler / Hamilton / Postman lab ---------------- */
function initEuler(box){
  var order=['practice','a4','mock'],gid='practice',mode='deg',path=[],showRep=false,bestCache={};
  box.innerHTML=
   '<div class="fl-bar"><label>Graph<select class="fl-gsel">'+order.map(function(id){return opt(id,L.GRAPHS[id].name,id===gid)}).join('')+'</select></label>'+
   '<div class="fl-seg"><button type="button" data-m="deg" class="on">Degrees &amp; Euler</button><button type="button" data-m="tour">Build a tour (Hamilton / TSP)</button></div></div>'+
   '<div class="fl-grid"><div><div class="fl-card"><div class="fl-gw"></div></div><div class="fl-ctl fl-tc"></div></div><div><div class="fl-msg"></div><div class="fl-card fl-pn"></div><div class="fl-note"></div></div></div>';
  var gw=q('.fl-gw',box),msg=q('.fl-msg',box),pn=q('.fl-pn',box),nt=q('.fl-note',box),tc=q('.fl-tc',box),sel=q('.fl-gsel',box);
  function g(){return L.GRAPHS[gid]}
  function best(){if(!bestCache[gid])bestCache[gid]=L.bestHamilton(g());return bestCache[gid]}
  function mst(){var m=L.machines.kruskal,gr=g(),s=m.init(gr);while(!m.done(s,gr))s=m.apply(s,gr,m.cands(s,gr)[0]);return s.total}
  function draw(m,cls){
    var gr=g(),vw={v:{},e:{},lab:{},badge:{}};
    if(mode==='deg'){
      var d=L.degrees(gr),ev=L.eulerVerdict(gr),pm=L.postman(gr);
      Object.keys(d).forEach(function(v){vw.badge[v]=d[v];if(d[v]%2)vw.v[v]='odd'});
      if(showRep)pm.pairs.forEach(function(p){for(var i=0;i<p.path.length-1;i++)vw.e[L.key(p.path[i],p.path[i+1])]='rep'});
      gw.innerHTML=drawGraph(gr,vw);
      msg.className='fl-msg '+(ev.kind==='none'?'bad':'ok');msg.innerHTML='<b>'+ev.text+'</b>';
      var h='<div class="fl-kv"><b>Degree of each vertex</b> (small number on each circle; red circle = odd): '+Object.keys(d).sort().map(function(v){return v+'='+d[v]}).join(', ')+'</div>';
      h+='<div class="fl-kv"><b>Rule</b>: all degrees even → Eulerian cycle. Exactly two odd → Eulerian trail only. Otherwise neither.</div>';
      h+='<div class="fl-h3">Chinese Postman</div>';
      if(!ev.odd.length)h+='<div class="fl-kv">Already Eulerian: the shortest closed walk is just the total weight, <b>'+pm.total+'</b>. No road is repeated.</div>';
      else h+='<div class="fl-kv">Total weight of all roads: <b>'+pm.total+'</b>. Pair up the odd vertices by the cheapest repeated paths: '+pm.pairs.map(function(p){return '<b>'+p.path.join('–')+'</b> (+'+p.d+')'}).join(', ')+'. Shortest closed walk = '+pm.total+' + '+pm.extra+' = <b>'+pm.best+'</b>.</div><button type="button" class="fl-b" data-a="rep">'+(showRep?'Hide':'Show')+' repeated roads</button>';
      pn.innerHTML=h;
      var rb=q('[data-a="rep"]',pn);if(rb)rb.onclick=function(){showRep=!showRep;draw()};
      tc.innerHTML='';
      nt.innerHTML='<b>Exam note.</b> Euler = every <i>edge</i> once. Hamilton = every <i>vertex</i> once. Chinese Postman repeats the shortest paths between odd vertices until none are left.';
    }else{
      var b=best();
      path.forEach(function(v,i){vw.v[v]=i===path.length-1?'now':'in';if(i>0)vw.e[L.key(path[i-1],v)]=i===path.length-1?'now':'in'});
      var closed=path.length>1&&path[path.length-1]===path[0];
      if(closed)path.forEach(function(v){vw.v[v]='in'});
      if(showRep&&b.path)for(var i=0;i<b.path.length-1;i++)vw.e[L.key(b.path[i],b.path[i+1])]='hint';
      gw.innerHTML=drawGraph(gr,vw,{clickNodes:true});
      var len=0;for(var j=1;j<path.length;j++)len+=L.wOf(gr,path[j-1],path[j]);
      var all=path.length===ids(gr).length+1&&closed;
      if(m){msg.className='fl-msg '+(cls||'');msg.innerHTML=m}
      else if(!path.length){msg.className='fl-msg';msg.innerHTML='Click a vertex to start your tour, then click the next vertices along the roads. Finish by returning to the start.'}
      else if(all){
        var ok=b.exists&&len===b.len;
        msg.className='fl-msg '+(ok?'ok':'done');
        msg.innerHTML='<b>Hamiltonian cycle found.</b> Length '+len+'. '+(ok?'That equals the shortest possible ('+b.len+'): you solved the TSP for this graph.':'The shortest possible is '+b.len+' — try again to beat '+len+'.')}
      else{msg.className='fl-msg';msg.innerHTML='Path so far: <b>'+path.join(' → ')+'</b> (length '+len+'). '+(path.length===ids(gr).length?'Every vertex is used: click '+path[0]+' to close the cycle.':'Visited '+path.length+' of '+ids(gr).length+' vertices.')}
      var h2='<div class="fl-kv"><b>Hamiltonian?</b> '+(b.exists?'Yes, this graph has a Hamiltonian cycle.':b.capped?'Not computed (graph too large).':'No Hamiltonian cycle exists in this graph.')+'</div>';
      if(b.exists)h2+='<div class="fl-kv"><b>Shortest Hamiltonian cycle (TSP on these roads)</b>: '+b.len+(showRep?' &nbsp;('+b.path.join(' → ')+')':'')+'</div>';
      var l=mst();h2+='<div class="fl-kv"><b>MST shortcut method</b>: the minimum spanning tree has length l = '+l+'. Following the tree and shortcutting repeats gives a tour of at most 2l = '+(2*l)+'.</div>';
      pn.innerHTML=h2;
      tc.innerHTML='<button type="button" class="fl-b" data-a="undo">Undo</button><button type="button" class="fl-b" data-a="clear">Clear</button><button type="button" class="fl-b" data-a="show">'+(showRep?'Hide':'Reveal')+' shortest tour</button>';
      q('[data-a="undo"]',tc).onclick=function(){path.pop();draw()};
      q('[data-a="clear"]',tc).onclick=function(){path=[];draw()};
      q('[data-a="show"]',tc).onclick=function(){showRep=!showRep;draw()};
      nt.innerHTML='<b>Exam note.</b> A Hamiltonian cycle visits every vertex exactly once. TSP asks for the <i>shortest</i> one. Both are NP-complete: checking an answer is fast, finding one is hard.';
    }
  }
  gw.addEventListener('click',function(ev){
    if(mode!=='tour')return;var n=ev.target.closest('[data-v]');if(!n)return;
    var v=n.dataset.v,gr=g(),total=ids(gr).length;
    if(path.length&&path[path.length-1]===path[0]&&path.length>1)return;
    if(!path.length){path=[v];draw();return}
    var last=path[path.length-1];
    if(L.wOf(gr,last,v)===null){draw('There is no road between '+last+' and '+v+'. Pick a neighbour.','bad');return}
    if(path.indexOf(v)>=0){
      if(v===path[0]&&path.length===total){path.push(v);draw();return}
      draw(v+' is already on your path. A Hamiltonian cycle may not repeat a vertex.','bad');return;
    }
    path.push(v);draw();
  });
  qa('[data-m]',box).forEach(function(b){b.onclick=function(){mode=b.dataset.m;path=[];showRep=false;qa('[data-m]',box).forEach(function(x){x.classList.toggle('on',x===b)});draw()}});
  sel.onchange=function(){gid=sel.value;path=[];showRep=false;draw()};
  draw();
}

/* ---------------- Local search lab ---------------- */
function initLocal(box){
  var algo='hc',x0=10,hc,sa,seed=1,timer=null;
  box.innerHTML=
   '<div class="fl-bar"><div class="fl-seg"><button type="button" data-m="hc" class="on">Hill climbing</button><button type="button" data-m="sa">Simulated annealing</button></div>'+
   '<label>Annealing seed<input class="fl-in fl-seed" type="number" value="1" min="1" style="width:90px"></label></div>'+
   '<div class="fl-grid"><div><div class="fl-card"><div class="fl-lw"></div></div>'+
   '<div class="fl-ctl"><button type="button" class="fl-b pri" data-a="step">Step</button><button type="button" class="fl-b" data-a="run">Run</button><button type="button" class="fl-b" data-a="seed">New seed</button><button type="button" class="fl-b" data-a="reset">Reset</button></div></div>'+
   '<div><div class="fl-msg"></div><div class="fl-card fl-pn"></div><div class="fl-note"></div></div></div>';
  var lw=q('.fl-lw',box),msg=q('.fl-msg',box),pn=q('.fl-pn',box),nt=q('.fl-note',box),sd=q('.fl-seed',box);
  var H=L.LAND,N=H.length,PX=function(i){return 24+i*(632/(N-1))},PY=function(v){return 250-v*2.2};
  function stop(){if(timer){clearInterval(timer);timer=null;q('[data-a="run"]',box).textContent='Run'}}
  function reset(){stop();hc={x:x0,trail:[x0],stuck:false,text:''};sa=null;seed=+sd.value||1;draw(algo==='hc'?'Click the landscape to choose a start point, then press <b>Step</b>. Hill climbing only looks at its two neighbours.':'Click the landscape to choose a start, then press <b>Step</b> or <b>Run</b>. Early on it accepts downhill moves; as it cools it settles.','')}
  function bestSA(){var b=sa.path[0].x;for(var i=0;i<=sa.i;i++){if(H[sa.path[i].x]>H[b])b=sa.path[i].x}return b}
  function draw(m,cls){
    var pts=[];for(var i=0;i<N;i++)pts.push(PX(i)+','+PY(H[i]));
    var s='<svg class="fl-svg" viewBox="0 0 680 270" style="max-height:300px"><polygon class="fl-fill" points="'+PX(0)+',250 '+pts.join(' ')+' '+PX(N-1)+',250"/><polyline class="fl-curve" points="'+pts.join(' ')+'"/>';
    s+='<rect x="0" y="0" width="680" height="270" fill="transparent" class="fl-click fl-land"/>';
    var gmax=H.indexOf(Math.max.apply(null,H));
    for(var pi=1;pi<N-1;pi++)if(H[pi]>H[pi-1]&&H[pi]>=H[pi+1])s+='<text class="fl-lab" x="'+PX(pi)+'" y="236" style="fill:var(--dim);pointer-events:none">'+(pi===gmax?'global maximum':'local maximum')+'</text>';
    s+='<text class="fl-lab" x="656" y="264" style="fill:var(--faint);text-anchor:end">state x →</text><text class="fl-lab" x="24" y="264" style="fill:var(--faint);text-anchor:start">click the curve to move the start</text>';
    var cx;
    if(algo==='hc'){hc.trail.forEach(function(t){s+='<circle class="fl-dot t" cx="'+PX(t)+'" cy="'+PY(H[t])+'" r="4"/>'});cx=hc.x}
    else if(sa){for(var j=0;j<=sa.i;j+=3)s+='<circle class="fl-dot t" cx="'+PX(sa.path[j].x)+'" cy="'+PY(H[sa.path[j].x])+'" r="3"/>';var b=bestSA();s+='<circle class="fl-dot best" cx="'+PX(b)+'" cy="'+PY(H[b])+'" r="6"/>';cx=sa.path[sa.i].x}
    else cx=x0;
    s+='<circle class="fl-dot" cx="'+PX(cx)+'" cy="'+PY(H[cx])+'" r="8"/><text class="fl-lab" x="'+PX(cx)+'" y="'+(PY(H[cx])-16)+'">height '+H[cx]+'</text></svg>';
    lw.innerHTML=s;
    if(m!==undefined){msg.className='fl-msg '+(cls||'');msg.innerHTML=m}
    var h='';
    if(algo==='hc')h='<div class="fl-kv"><b>Position</b> x = '+hc.x+', height '+H[hc.x]+'</div><div class="fl-kv"><b>Moves made</b>: '+(hc.trail.length-1)+'</div>'+(hc.stuck?'<div class="fl-kv fl-no">Stuck: no neighbour is higher.'+(H[hc.x]<80?' This is a local maximum — a higher peak exists elsewhere.':' This is the global maximum.')+'</div>':'');
    else if(sa){var p=sa.path[sa.i];h='<div class="fl-kv"><b>Step</b> '+sa.i+' / '+(sa.path.length-1)+'</div><div class="fl-kv"><b>Temperature</b> T = '+p.T.toFixed(2)+'</div><div class="fl-kv"><b>Current</b> x = '+p.x+', height '+H[p.x]+'</div><div class="fl-kv"><b>Best seen</b>: height '+H[bestSA()]+(H[bestSA()]>80?' (global peak)':' (local peak only)')+'</div>'}
    else h='<div class="fl-kv">Press Step to begin.</div>';
    pn.innerHTML=h;
    nt.innerHTML='<b>Exam note.</b> Hill climbing keeps moving to a better neighbour and stops at the first peak, which may be a <i>local maximum</i> (Doi Suthep, not Everest). Simulated annealing shakes the state, hard at first then gently, so it can escape. It is random, so it usually, not always, finds the higher peak: change the seed to see both outcomes.';
  }
  function stepHC(){
    if(hc.stuck)return false;
    var n=L.hillStep(hc.x);
    if(n===hc.x){hc.stuck=true;draw('<b>Stuck.</b> Neither neighbour is higher, so hill climbing stops here.','done');return false}
    hc.x=n;hc.trail.push(n);draw('Move to x = '+n+' (height '+H[n]+'), the better neighbour.','');return true;
  }
  function stepSA(){
    if(!sa){sa={path:L.annealRun(x0,seed),i:0}}
    if(sa.i>=sa.path.length-1){draw('<b>Cooled down.</b> Best height seen: '+H[bestSA()]+(H[bestSA()]>80?' — it found the global peak.':' — it settled on the lower peak. Try another seed.'),'done');return false}
    sa.i++;var p=sa.path[sa.i];
    draw(p.acc?'Try x = '+p.tried+': accepted'+(H[p.tried]<H[sa.path[sa.i-1].x]?' <i>(a downhill move, allowed because T is still high)</i>':'')+'.':'Try x = '+p.tried+': rejected.',p.acc?'ok':'');
    return sa.i<sa.path.length-1;
  }
  q('[data-a="step"]',box).onclick=function(){algo==='hc'?stepHC():stepSA()};
  q('[data-a="run"]',box).onclick=function(){
    if(timer){stop();return}
    q('[data-a="run"]',box).textContent='Pause';
    timer=setInterval(function(){var more=algo==='hc'?stepHC():stepSA();if(!more)stop()},algo==='hc'?350:35);
  };
  q('[data-a="seed"]',box).onclick=function(){sd.value=1+Math.floor(Math.random()*999);reset()};
  q('[data-a="reset"]',box).onclick=reset;
  sd.onchange=reset;
  qa('[data-m]',box).forEach(function(b){b.onclick=function(){algo=b.dataset.m;qa('[data-m]',box).forEach(function(z){z.classList.toggle('on',z===b)});reset()}});
  lw.addEventListener('click',function(ev){
    var svg=lw.querySelector('svg');if(!svg)return;var r=svg.getBoundingClientRect();
    var px=(ev.clientX-r.left)/r.width*680;var i=Math.round((px-24)/(632/(N-1)));
    x0=Math.max(0,Math.min(N-1,i));reset();
  });
  reset();
}

/* ---------------- Games lab: minimax / alpha-beta ---------------- */
function initGames(box){
  var PRESETS={notes:[[4,7,3],[2,12,6],[10,11,2]],mock:[[5,9,4],[6,3,8],[7,5,6]]};
  var leaves=PRESETS.mock.map(function(r){return r.slice()}),mode='ab',k=0,events=[],quiz={marks:{},checked:false,ans:''};
  var PX=[130,340,550],DX=[-64,0,64];
  box.innerHTML=
   '<div class="fl-bar"><div class="fl-seg"><button type="button" data-m="mm">Minimax</button><button type="button" data-m="ab" class="on">Alpha-beta</button><button type="button" data-m="quiz">Quiz me</button></div>'+
   '<label>Example<select class="fl-pre"><option value="mock">Mock question 11</option><option value="notes">Notes example</option><option value="custom">My own / random</option></select></label>'+
   '<button type="button" class="fl-b" data-a="rand">Randomise leaves</button></div>'+
   '<div class="fl-grid"><div><div class="fl-card"><div class="fl-tw"></div></div>'+
   '<div class="fl-leaves"></div><div class="fl-ctl fl-gc"></div></div>'+
   '<div><div class="fl-msg"></div><div class="fl-card fl-pn"></div><div class="fl-note"></div></div></div>';
  var tw=q('.fl-tw',box),lv=q('.fl-leaves',box),gc=q('.fl-gc',box),msg=q('.fl-msg',box),pn=q('.fl-pn',box),nt=q('.fl-note',box),pre=q('.fl-pre',box);
  function build(){
    if(mode==='mm'){
      events=[];var mm=L.minimax(leaves);
      leaves.forEach(function(row,i){row.forEach(function(v,j){events.push({t:'leaf',i:i,j:j,val:v})});events.push({t:'min',i:i,v:mm.mins[i]})});
      events.push({t:'root',alpha:mm.root});
    }else events=L.alphaBeta(leaves).events;
  }
  function fmtAB(v){return v<=-L.INF?'−∞':v>=L.INF?'+∞':v}
  function replay(){
    var st={leaf:{},cut:{},min:{},root:null,log:[],now:null};
    for(var e=0;e<k&&e<events.length;e++){
      var ev=events[e];
      if(ev.t==='leaf'){st.leaf[ev.i+','+ev.j]=1;st.now=ev.i+','+ev.j;
        st.log.push(mode==='mm'?'a'+(ev.i+1)+': leaf '+ev.val:'a'+(ev.i+1)+': leaf '+ev.val+' → min so far '+ev.v+'  (α='+fmtAB(ev.alpha)+', β='+fmtAB(ev.beta)+')')}
      else if(ev.t==='prune'){var n=leaves[ev.i].length-ev.from;for(var q2=ev.from;q2<leaves[ev.i].length;q2++)st.cut[ev.i+','+q2]=1;
        st.log.push('a'+(ev.i+1)+': '+ev.v+' ≤ α = '+fmtAB(ev.alpha)+', so MAX will never choose this branch. <b>Prune the remaining '+n+' leaf'+(n>1?'s':'')+'.</b>')}
      else if(ev.t==='min'){st.min[ev.i]={v:ev.v,cut:ev.cut};st.now=null;st.log.push('a'+(ev.i+1)+' returns '+ev.v+(ev.cut?' (only an upper bound: it was cut)':''))}
      else if(ev.t==='root'){st.root=ev.alpha;st.log.push('MAX keeps the best so far: '+ev.alpha)}
    }
    return st;
  }
  function tri(x,y,up,cls){return '<polygon class="fl-sh '+(cls||'')+'" points="'+(up?x+','+(y-24)+' '+(x+26)+','+(y+20)+' '+(x-26)+','+(y+20):(x-26)+','+(y-20)+' '+(x+26)+','+(y-20)+' '+x+','+(y+24))+'"/>'}
  function draw(m,cls){
    var quizOn=mode==='quiz',st=quizOn?{leaf:{},cut:{},min:{},root:null,log:[],now:null}:replay();
    var s='<svg class="fl-svg" viewBox="0 0 680 330" style="max-height:360px">';
    var mm=L.minimax(leaves),finished=!quizOn&&k>=events.length;
    PX.forEach(function(x,i){
      var edgeCls=quizOn?'':(st.min[i]?(st.min[i].cut?'skip':'in'):'');
      s+='<line class="fl-e '+edgeCls+'" x1="340" y1="66" x2="'+x+'" y2="126"/>';
      leaves[i].forEach(function(v,j){
        var id=i+','+j,lx=x+DX[j],c=st.cut[id]?'dim':'';
        s+='<line class="fl-e '+(st.cut[id]?'skip':'')+'" x1="'+x+'" y1="174" x2="'+lx+'" y2="250"/>';
      });
    });
    if(finished)s+='<line class="fl-e hint" x1="340" y1="66" x2="'+PX[mm.move]+'" y2="126"/>';
    s+=tri(340,46,true,finished?'done':'')+'<text class="fl-nt" x="340" y="56">'+(quizOn?'?':(st.root===null?'?':st.root))+'</text><text class="fl-lab" x="376" y="50" style="fill:var(--faint);text-anchor:start">MAX</text>';
    PX.forEach(function(x,i){
      var mn=st.min[i];
      s+=tri(x,150,false,mn?(mn.cut?'cut':'done'):'')+'<text class="fl-nt" x="'+x+'" y="142">'+(mn?mn.v:'?')+'</text><text class="fl-lab" x="'+(x+32)+'" y="150" style="fill:var(--faint);text-anchor:start">a'+(i+1)+' · MIN</text>';
      leaves[i].forEach(function(v,j){
        var id=i+','+j,lx=x+DX[j],cls='';
        if(quizOn){if(quiz.marks[id])cls='mark';if(quiz.checked){var truth=L.alphaBeta(leaves).pruned.some(function(p){return p[0]===i&&p[1]===j});cls=truth&&quiz.marks[id]?'right':truth?'cut':quiz.marks[id]?'wrongm':''}}
        else if(st.cut[id])cls='cut';else if(st.now===id)cls='now';else if(st.leaf[id])cls='seen';
        var shown=quizOn||st.leaf[id]||st.cut[id];
        s+='<g class="'+(quizOn&&!quiz.checked?'fl-click':'')+'" data-leaf="'+id+'"><rect class="fl-gl '+cls+'" x="'+(lx-21)+'" y="250" width="42" height="36" rx="7"/><text class="fl-nt" x="'+lx+'" y="269" style="'+(st.cut[id]?'opacity:.45':'')+'">'+(shown?v:'·')+'</text>'+(st.cut[id]?'<text class="fl-bad" x="'+lx+'" y="302">pruned</text>':'')+'</g>';
      });
    });
    tw.innerHTML=s+'</svg>';
    lv.innerHTML=leaves.map(function(row,i){return row.map(function(v,j){return '<input class="fl-in" type="number" data-i="'+i+'" data-j="'+j+'" value="'+v+'" aria-label="leaf a'+(i+1)+' '+(j+1)+'">'}).join('')}).join('');
    qa('input[data-i]',lv).forEach(function(inp){inp.onchange=function(){leaves[+inp.dataset.i][+inp.dataset.j]=Math.round(+inp.value)||0;pre.value='custom';k=0;quiz={marks:{},checked:false,ans:quiz.ans};build();draw('Leaf changed. Start again.','')}});
    // controls + messages
    if(quizOn){
      var ab=L.alphaBeta(leaves);
      gc.innerHTML='<label class="fl-fq" style="flex-direction:row;gap:8px;align-items:center;font-size:12px">Root value <input class="fl-in fl-ans" type="number" value="'+quiz.ans+'" style="width:80px"></label><button type="button" class="fl-b pri" data-a="check">Check</button><button type="button" class="fl-b" data-a="qreset">Clear</button>';
      q('.fl-ans',gc).oninput=function(){quiz.ans=this.value};
      q('[data-a="check"]',gc).onclick=function(){quiz.checked=true;
        var real=ab.root,okRoot=quiz.ans!==''&&+quiz.ans===real;
        var trueSet={};ab.pruned.forEach(function(p){trueSet[p[0]+','+p[1]]=1});
        var right=0,wrongN=0,missed=0;Object.keys(quiz.marks).forEach(function(id){if(trueSet[id])right++;else wrongN++});Object.keys(trueSet).forEach(function(id){if(!quiz.marks[id])missed++});
        draw('<b>Root value: '+(okRoot?'correct ('+real+')':'it is '+real+(quiz.ans===''?'':', you said '+quiz.ans))+'.</b> Pruned leaves: '+right+' right, '+wrongN+' wrongly marked (red), '+missed+' missed (dashed red). Searching left to right, '+ab.pruned.length+' leaf'+(ab.pruned.length===1?' is':'s are')+' never examined.',okRoot&&!wrongN&&!missed?'ok':'bad')};
      q('[data-a="qreset"]',gc).onclick=function(){quiz={marks:{},checked:false,ans:''};draw('Mark the leaves that alpha-beta never examines (searching left to right), type the root value, then press Check.','')};
      if(m===undefined)m='<b>Quiz.</b> Searching left to right, click every leaf that alpha-beta prunes, enter the root (minimax) value, then press <b>Check</b>.';
      pn.innerHTML='<div class="fl-kv">Leaves are visible. Work out each MIN node, then the MAX value. A branch is pruned as soon as a MIN node is already ≤ the best value MAX has found so far.</div>';
    }else{
      gc.innerHTML='<button type="button" class="fl-b" data-a="prev">‹ Back</button><button type="button" class="fl-b pri" data-a="next">Next step ›</button><button type="button" class="fl-b" data-a="all">Show all</button><button type="button" class="fl-b" data-a="reset">Reset</button>';
      q('[data-a="prev"]',gc).disabled=k<1;q('[data-a="next"]',gc).disabled=finished;
      q('[data-a="prev"]',gc).onclick=function(){if(k>0){k--;draw('','')}};
      q('[data-a="next"]',gc).onclick=function(){if(k<events.length){k++;draw('','')}};
      q('[data-a="all"]',gc).onclick=function(){k=events.length;draw('','')};
      q('[data-a="reset"]',gc).onclick=function(){k=0;draw('','')};
      pn.innerHTML='<ol style="margin:0 0 0 18px;padding:0;font-size:13px;line-height:1.7">'+(st.log.length?st.log.map(function(l,i){return '<li'+(i===st.log.length-1?' style="color:var(--am)"':'')+'>'+l+'</li>'}).join(''):'<li style="color:var(--faint)">nothing evaluated yet</li>')+'</ol>';
      if(m===undefined||m==='')m=finished?'<b>Done.</b> MAX picks <b>a'+(mm.move+1)+'</b> with value <b>'+mm.root+'</b>.'+(mode==='ab'?' Alpha-beta examined '+(9-L.alphaBeta(leaves).pruned.length)+' of 9 leaves and gave the same answer as minimax.':' Minimax examined all 9 leaves.'):(k===0?'Press <b>Next step</b>. Leaves are read left to right.':st.log[st.log.length-1]);
      cls=cls||(finished?'done':'');
    }
    msg.className='fl-msg '+(cls||'');msg.innerHTML=m;
    nt.innerHTML=mode==='quiz'?'<b>Exam note.</b> Alpha-beta never changes the answer, it only skips leaves that cannot matter. With good move ordering it examines about O(b^(d/2)) nodes.':'<b>Exam note.</b> MAX takes the largest value, MIN the smallest. Minimax assumes an optimal opponent and maximises the worst case: O(b^m) time. <b>α</b> = best MAX can already guarantee, <b>β</b> = best MIN can already guarantee; prune when β ≤ α.';
  }
  tw.addEventListener('click',function(ev){
    if(mode!=='quiz'||quiz.checked)return;var g=ev.target.closest('[data-leaf]');if(!g)return;
    var id=g.dataset.leaf;if(quiz.marks[id])delete quiz.marks[id];else quiz.marks[id]=1;draw(undefined);
  });
  qa('[data-m]',box).forEach(function(b){b.onclick=function(){mode=b.dataset.m;k=0;quiz={marks:{},checked:false,ans:''};qa('[data-m]',box).forEach(function(z){z.classList.toggle('on',z===b)});build();draw(mode==='quiz'?undefined:'')}});
  pre.onchange=function(){if(pre.value!=='custom')leaves=PRESETS[pre.value].map(function(r){return r.slice()});k=0;quiz={marks:{},checked:false,ans:''};build();draw(mode==='quiz'?undefined:'')};
  q('[data-a="rand"]',box).onclick=function(){leaves=[0,1,2].map(function(){return [0,1,2].map(function(){return 1+Math.floor(Math.random()*15)})});pre.value='custom';k=0;quiz={marks:{},checked:false,ans:''};build();draw(mode==='quiz'?undefined:'')};
  build();draw('');
}

/* ---------------- Huffman lab ---------------- */
function initHuffman(box){
  var PRE={lecture:[['A',10],['B',15],['C',5],['D',15],['E',20],['F',5],['G',15],['H',30],['I',5]],q18:[['A',45],['B',13],['C',12],['D',16],['E',9],['F',5]]};
  var cur='lecture',freqs=PRE.lecture.map(function(x){return {s:x[0],f:x[1]}}),hs,mode='watch',sel=null,ok=0,miss=0,hint=false,timer=null;
  box.innerHTML=
   '<div class="fl-bar"><label>Example<select class="fl-pre"><option value="lecture">Lecture (A–I, total 120)</option><option value="q18">Practice Q18 (A–F, total 100)</option></select></label>'+
   '<div class="fl-seg"><button type="button" data-m="watch" class="on">Watch</button><button type="button" data-m="practice">Practice</button></div></div>'+
   '<div class="fl-fqs"></div>'+
   '<div class="fl-grid"><div><div class="fl-card"><div class="fl-hw" style="overflow-x:auto"></div></div>'+
   '<div class="fl-ctl"><button type="button" class="fl-b" data-a="prev">‹ Back</button><button type="button" class="fl-b pri" data-a="next">Join next two ›</button><button type="button" class="fl-b" data-a="hint">Hint</button><button type="button" class="fl-b" data-a="auto">Auto-play</button><button type="button" class="fl-b" data-a="reset">Reset</button></div></div>'+
   '<div><div class="fl-msg"></div><div class="fl-card fl-pn"></div><div class="fl-note"></div></div></div>'+
   '<div class="fl-h3">Encode and decode with the codes above</div><div class="fl-card fl-ed"></div>';
  var hw=q('.fl-hw',box),fqs=q('.fl-fqs',box),msg=q('.fl-msg',box),pn=q('.fl-pn',box),nt=q('.fl-note',box),ed=q('.fl-ed',box),pre=q('.fl-pre',box);
  var bt={};qa('[data-a]',box).forEach(function(b){bt[b.dataset.a]=b});
  var hist=[];
  function stop(){if(timer){clearInterval(timer);timer=null;bt.auto.textContent='Auto-play'}}
  function fillFq(){fqs.innerHTML=freqs.map(function(x,i){return '<label class="fl-fq">'+x.s+'<input class="fl-in" type="number" min="1" data-i="'+i+'" value="'+x.f+'"></label>'}).join('');
    qa('input',fqs).forEach(function(inp){inp.onchange=function(){freqs[+inp.dataset.i].f=Math.max(1,Math.round(+inp.value)||1);reset()}})}
  function reset(){stop();hist=[L.huffInit(freqs)];sel=null;ok=0;miss=0;hint=false;
    draw(mode==='practice'?'<b>Your turn.</b> Click the two roots with the <b>lowest frequencies</b> to join them. Ties are fine in either order.':'Press <b>Join next two</b>: the two lowest frequencies are merged each time.','')}
  function curS(){return hist[hist.length-1]}
  function layout(st){
    var GAP=58,pos={},cursor=30,maxD=0;
    function place(id,d){var n=st.nodes[id];if(d>maxD)maxD=d;
      if(n.s!==null){var x=cursor;cursor+=GAP;pos[id]={x:x,d:d};return x}
      var lx=place(n.l,d+1),rx=place(n.r,d+1),mx=(lx+rx)/2;pos[id]={x:mx,d:d};return mx}
    st.active.slice().sort(function(a,b){return st.nodes[a].f-st.nodes[b].f||a-b}).forEach(function(id){place(id,0);cursor+=14});
    return {pos:pos,w:Math.max(cursor,300),h:maxD*58+90};
  }
  function draw(m,cls){
    var st=curS(),lo=layout(st),done=st.active.length===1,S='';
    var nodeCls={};
    if(hint&&!done){var t=L.huffTwoSmallest(st);st.active.forEach(function(id){if(st.nodes[id].f<=t[1])nodeCls[id]='hint'})}
    if(sel!==null)nodeCls[sel]='sel';
    if(done)nodeCls[st.active[0]]='in';
    S+='<svg class="fl-svg" viewBox="0 0 '+lo.w+' '+lo.h+'" style="min-width:'+Math.min(lo.w,520)+'px;max-height:420px">';
    function Y(d){return 30+d*58}
    Object.keys(lo.pos).forEach(function(id){var n=st.nodes[id];if(n.s!==null)return;
      [[n.l,'0'],[n.r,'1']].forEach(function(c){var a=lo.pos[id],b=lo.pos[c[0]];
        S+='<line class="fl-e" x1="'+a.x+'" y1="'+Y(a.d)+'" x2="'+b.x+'" y2="'+Y(b.d)+'"/><text class="fl-lab" x="'+((a.x+b.x)/2+(c[1]==='0'?-9:9))+'" y="'+((Y(a.d)+Y(b.d))/2)+'" style="fill:var(--dim);font-size:13px">'+c[1]+'</text>'})});
    Object.keys(lo.pos).forEach(function(id){var n=st.nodes[id],p=lo.pos[id],isRoot=st.active.indexOf(+id)>=0,cl=nodeCls[id]||(isRoot?'':'in');
      S+='<g class="'+(mode==='practice'&&isRoot&&!done?'fl-click':'')+'" data-n="'+id+'"><circle class="fl-n '+cl+'" cx="'+p.x+'" cy="'+Y(p.d)+'" r="20"/><text class="fl-nt" x="'+p.x+'" y="'+Y(p.d)+'" style="font-size:'+(n.s!==null?15:13)+'px">'+(n.s!==null?n.s:n.f)+'</text>'+(n.s!==null?'<text class="fl-lab" x="'+p.x+'" y="'+(Y(p.d)+34)+'">'+n.f+'</text>':'')+'</g>'});
    hw.innerHTML=S+'</svg>';
    var codes=L.huffCodes(st);
    if(done){var cs=L.huffCost(st,codes),n2=freqs.length,fixed=Math.ceil(Math.log(n2)/Math.LN2);
      pn.innerHTML='<table class="fl-t"><tr><th>Symbol</th><th>Freq</th><th>Code</th><th>Bits</th></tr>'+freqs.map(function(x){return '<tr><td><b>'+x.s+'</b></td><td>'+x.f+'</td><td><code>'+codes[x.s]+'</code></td><td>'+codes[x.s].length+'</td></tr>'}).join('')+'</table><div class="fl-kv"><b>Total bits</b> = Σ freq × length = <b>'+cs.bits+'</b> for '+cs.total+' symbols → average <b>'+cs.avg.toFixed(2)+'</b> bits per symbol.</div><div class="fl-kv">A fixed-length code needs '+fixed+' bits each = '+(fixed*cs.total)+' bits. Saved: '+(fixed*cs.total-cs.bits)+' bits.</div>';
      m=(m?m+'<br>':'')+'<b>Done.</b> Left branch = 0, right branch = 1. The most frequent symbol has the shortest code and no code is the start of another (prefix property).';cls=cls==='ok'?'ok':'done';
    }else{
      pn.innerHTML='<div class="fl-kv"><b>Current roots</b> (frequency): '+st.active.slice().sort(function(a,b){return st.nodes[a].f-st.nodes[b].f||a-b}).map(function(id){var n=st.nodes[id];return (n.s!==null?n.s:'<i>node</i>')+' <b>'+n.f+'</b>'}).join(' · ')+'</div><div class="fl-kv">'+(st.active.length-1)+' join'+(st.active.length===2?'':'s')+' left.</div>';
    }
    if(m!==undefined&&m!==''){msg.className='fl-msg '+(cls||'');msg.innerHTML=m}
    bt.next.style.display=mode==='watch'?'':'none';bt.auto.style.display=mode==='watch'?'':'none';bt.hint.style.display=mode==='practice'?'':'none';
    bt.next.disabled=done;bt.hint.disabled=done;bt.prev.disabled=hist.length<2;bt.auto.disabled=done&&!timer;
    qa('[data-m]',box).forEach(function(b){b.classList.toggle('on',b.dataset.m===mode)});
    // encode / decode
    if(done){
      ed.innerHTML='<div class="fl-bar"><label style="flex:1;min-width:200px">Text to encode<input class="fl-in fl-enc" type="text" value="'+(cur==='lecture'?'CABBAGE':'ABCD')+'"></label><label style="flex:1;min-width:200px">Bits to decode<input class="fl-in fl-dec" type="text" placeholder="e.g. 0010000010010000110111"></label></div><div class="fl-code fl-eo"></div><div class="fl-code fl-do"></div>';
      var ei=q('.fl-enc',ed),di=q('.fl-dec',ed),eo=q('.fl-eo',ed),dout=q('.fl-do',ed);
      function upE(){var r=L.huffEncode(codes,ei.value);eo.textContent=r.bad.length?'Not in the alphabet: '+r.bad.join(' '):(r.bits||'(type letters above)')+(r.bits?'   ('+r.bits.length+' bits)':'')}
      function upD(){var b=di.value.replace(/[^01]/g,''),r=L.huffDecode(codes,b);dout.textContent=b?r.text+(r.rest?'   (leftover bits "'+r.rest+'" do not finish a code)':''):'(paste bits above)'}
      ei.oninput=upE;di.oninput=upD;upE();upD();
    }else ed.innerHTML='<div class="fl-kv" style="color:var(--faint)">Finish the tree first: the codes appear here.</div>';
  }
  function merge(a,b){hist.push(L.huffApply(curS(),a,b));sel=null;hint=false}
  bt.next.onclick=function(){var s=curS();if(s.active.length<2)return;var p=L.huffAuto(s);merge(p[0],p[1]);draw(curS().log,'')};
  bt.prev.onclick=function(){stop();if(hist.length>1){hist.pop();sel=null;hint=false;draw(hist.length>1?curS().log:'Back at the start.','')}};
  bt.reset.onclick=reset;
  bt.hint.onclick=function(){hint=true;draw('Hint: the highlighted roots include the two lowest frequencies.','')};
  bt.auto.onclick=function(){if(timer){stop();return}if(curS().active.length<2)return;bt.auto.textContent='Pause';
    timer=setInterval(function(){var s=curS();if(s.active.length<2){stop();return}var p=L.huffAuto(s);merge(p[0],p[1]);draw(curS().log,'');if(curS().active.length<2)stop()},900)};
  hw.addEventListener('click',function(ev){
    if(mode!=='practice')return;var s=curS();if(s.active.length<2)return;
    var g=ev.target.closest('[data-n]');if(!g)return;var id=+g.dataset.n;if(s.active.indexOf(id)<0){draw('Only the current <b>roots</b> can be joined (the circles at the top of each tree).','bad');return}
    if(sel===null){sel=id;draw('Selected. Now click the second node to join with it.','');return}
    if(sel===id){sel=null;draw('Selection cleared.','');return}
    if(L.huffValid(s,sel,id)){ok++;merge(sel,id);draw('<b>Correct.</b> '+curS().log+(curS().active.length>1?'':' <br>Score: <b>'+ok+'</b> correct, <b>'+miss+'</b> mistake'+(miss===1?'':'s')+'.'),'ok')}
    else{miss++;var t=L.huffTwoSmallest(s);sel=null;draw('<b>Not those two.</b> Join the two roots with the smallest frequencies: they are '+t[0]+' and '+t[1]+'.','bad')}
  });
  qa('[data-m]',box).forEach(function(b){b.onclick=function(){mode=b.dataset.m;reset()}});
  pre.onchange=function(){cur=pre.value;freqs=PRE[cur].map(function(x){return {s:x[0],f:x[1]}});fillFq();reset()};
  fillFq();reset();
}

/* ---------------- Checklist ---------------- */
var CHECK=[
 ['Graphs (Week 7)',[
  ['Run Dijkstra on the Practice Q1 graph from A without looking, then check the table','graphs'],
  ['Kruskal and Prim on the Assignment 4 graph: write the order, name the first skipped edge','graphs'],
  ['BFS and DFS orders from a start vertex (queue vs stack)','graphs'],
  ['Topological sort: spot the minimal vertex each round','graphs'],
  ['Eulerian cycle or trail from degrees alone, and the Chinese Postman repeats','euler'],
  ['Hamiltonian cycle vs TSP, and the MST shortcut bound of 2l','euler']]],
 ['Agents and search (Week 10)',[
  ['Expansion order for breadth-first, depth-first and uniform cost on the state space','search'],
  ['Greedy vs A*: show why greedy picks the wrong route','search'],
  ['Iterative deepening: why repeating the top levels is cheap','search'],
  ['Hill climbing gets stuck, annealing escapes (and when it does not)','local']]],
 ['Games and probability (Week 12)',[
  ['Minimax value and best move on a depth-2 tree','games'],
  ['Alpha-beta: name every pruned leaf, left to right','games']]],
 ['Compression (Week 13)',[
  ['Build a Huffman tree and compute bits per symbol','huffman'],
  ['Decode a bit string with a prefix code, no look-ahead','huffman']]]
];
function initChecklist(box){
  var KEY='algoFinalPrepDone',done={};
  try{done=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){done={}}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(done))}catch(e){}}
  function render(){
    var total=0,n=0,h='<p class="fl-intro">Tick each one when you can do it from memory, on paper, without the lab. Your ticks are saved in this browser.</p>';
    CHECK.forEach(function(sec,si){
      h+='<div class="fl-h3">'+sec[0]+'</div>';
      sec[1].forEach(function(it,ii){var id=si+'.'+ii;total++;if(done[id])n++;
        h+='<div class="fl-chk"><input type="checkbox" id="fl-c'+id+'" data-id="'+id+'"'+(done[id]?' checked':'')+'><label for="fl-c'+id+'">'+it[0]+'</label><button type="button" class="fl-b" data-go="'+it[1]+'">Practise</button></div>'});
    });
    box.innerHTML='<div class="fl-prog">'+n+' / '+total+' ready</div>'+h;
    qa('input[type=checkbox]',box).forEach(function(c){c.onchange=function(){if(c.checked)done[c.dataset.id]=1;else delete done[c.dataset.id];save();render()}});
    qa('[data-go]',box).forEach(function(b){b.onclick=function(){showTab(b.dataset.go);window.scrollTo(0,0)}});
  }
  render();
}

/* ---------------- tabs ---------------- */
var TABS=[
 ['graphs','Graph algorithms',initGraphs,'Dijkstra, Kruskal, Prim, BFS, DFS and topological sort on the graphs from your assignments and the mock paper. <b>Watch</b> it run, then switch to <b>Practice</b> and click each step yourself.'],
 ['euler','Euler · Hamilton · Postman',initEuler,'Read Eulerian cycles and trails off the degrees, see the Chinese Postman repeats, and build a Hamiltonian tour by hand to chase the shortest one.'],
 ['search','Search',function(b){makeLab(b,{graphs:{search:L.SEARCH},graphOrder:['search'],machines:L.machines,hasStart:false,defaultAlg:'sastar',algsFor:function(){return ['sbfs','sdfs','iddfs','sucs','sgreedy','sastar']}})},'Breadth-first, depth-first, iterative deepening, uniform cost, greedy and A* on one small map. Compare the expansion orders: greedy takes a cheap-looking road that costs 12, A* finds the 9.'],
 ['local','Hill climbing',initLocal,'Hill climbing vs simulated annealing on a landscape with a local maximum. Click the curve to choose where to start.'],
 ['games','Minimax · alpha-beta',initGames,'Minimax and alpha-beta pruning on a depth-2 game tree. Edit the leaves, or use <b>Quiz me</b> to mark the pruned leaves yourself.'],
 ['huffman','Huffman',initHuffman,'Build the Huffman tree one join at a time, read the codes, count the bits and decode messages. In Practice you click the two roots to join.'],
 ['check','Checklist',initChecklist,'']
];
var inited={};
root.innerHTML='<div class="fl-tabs" role="tablist">'+TABS.map(function(t){return '<button type="button" class="fl-tab" role="tab" data-t="'+t[0]+'">'+t[1]+'</button>'}).join('')+'</div>'+
  TABS.map(function(t){return '<div class="fl-pane" data-p="'+t[0]+'">'+(t[3]?'<p class="fl-intro">'+t[3]+'</p>':'')+'<div class="fl-body"></div></div>'}).join('');
function showTab(id){
  qa('.fl-tab').forEach(function(b){b.classList.toggle('on',b.dataset.t===id);b.setAttribute('aria-selected',b.dataset.t===id)});
  qa('.fl-pane').forEach(function(p){p.classList.toggle('on',p.dataset.p===id)});
  if(!inited[id]){inited[id]=true;var t=TABS.filter(function(x){return x[0]===id})[0];t[2](q('.fl-pane[data-p="'+id+'"] .fl-body'))}
  try{localStorage.setItem('algoFinalPrepTab',id)}catch(e){}
}
qa('.fl-tab').forEach(function(b){b.onclick=function(){showTab(b.dataset.t)}});
window.finalPrepOpen=showTab;
window.FinalPrepDraw={graph:drawGraph,pal:PAL,mixc:mixc};
var first='graphs';try{var sv=localStorage.getItem('algoFinalPrepTab');if(sv&&TABS.some(function(t){return t[0]===sv}))first=sv}catch(e){}
showTab(first);
/* Study Console v3: colors are inline, so redraw the open lab when the theme changes. */
document.addEventListener('sc-theme-change',function(){
  var on=q('.fl-tab.on');if(!on)return;inited={};
  qa('.fl-body').forEach(function(b){b.innerHTML=''});
  showTab(on.dataset.t);
});
})();
