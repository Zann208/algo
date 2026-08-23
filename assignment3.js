"use strict";
(function(){
if(window.__algoAssignment3Loaded)return;window.__algoAssignment3Loaded=true;
var side=document.getElementById('side'),wrap=document.querySelector('main .wrap');
if(!side||!wrap)return;

var style=document.createElement('style');
style.textContent=`
.a3-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:11px}.a3-card{background:var(--panel);border:1px solid var(--line);border-radius:11px;padding:15px 16px;margin-top:11px}.a3-card h3{margin:0 0 7px}.a3-k{font:800 9px var(--mono);letter-spacing:1px;text-transform:uppercase;color:var(--vi);margin-bottom:5px}.a3-rule{background:var(--panel2);border:1px solid var(--line);border-radius:8px;padding:10px 12px;margin:9px 0;font-size:13.5px}.a3-rule b{color:var(--vi)}.a3-seq{font:800 14px/1.55 var(--mono);color:var(--am);background:var(--panel2);border:1px solid var(--line2);border-radius:8px;padding:10px 12px;margin:10px 0}.a3-note{margin-top:9px;border-left:3px solid var(--gr);background:color-mix(in srgb,var(--gr) 7%,var(--panel2));border-radius:0 7px 7px 0;padding:9px 11px;color:var(--dim)}.a3-warn{border-left-color:var(--am);background:color-mix(in srgb,var(--am) 7%,var(--panel2))}.a3-stage{display:grid;grid-template-columns:minmax(300px,1.25fr) minmax(250px,.75fr);gap:12px;margin-top:11px}.a3-canvas{min-height:420px;background:var(--panel2);border:1px solid var(--line);border-radius:11px;padding:10px;overflow:auto;display:flex;align-items:center;justify-content:center}.a3-svg line{stroke:var(--tline);stroke-width:1.7}.a3-svg circle{fill:var(--panel);stroke:var(--vi);stroke-width:1.8}.a3-svg text{fill:var(--ink);font:700 12px var(--mono);text-anchor:middle;dominant-baseline:middle}.a3-controls{display:flex;gap:7px;flex-wrap:wrap;margin:10px 0}.a3-btn{border:1px solid var(--line2);background:var(--panel);color:var(--dim);border-radius:7px;padding:8px 10px;font:700 10px var(--mono);cursor:pointer}.a3-btn.on,.a3-btn:hover{border-color:var(--vi);color:var(--vi);background:color-mix(in srgb,var(--vi) 7%,var(--panel))}.a3-step{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:13px 14px}.a3-step ol{margin:8px 0 0 19px}.a3-step li{margin:7px 0}.a3-path{font:700 12px var(--mono);color:var(--cy);margin:7px 0}.a3-practice{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:9px}.a3-q{background:var(--panel);border:1px solid var(--line);border-radius:9px;padding:12px}.a3-q b{display:block;margin-bottom:7px}.a3-answer{display:none;margin-top:8px;color:var(--gr);border-top:1px solid var(--line);padding-top:8px}.a3-answer.on{display:block}.a3-show{border:1px solid var(--line2);background:var(--panel2);color:var(--dim);border-radius:6px;padding:6px 8px;font:700 9px var(--mono);cursor:pointer}.a3-show:hover{color:var(--gr);border-color:var(--gr)}
@media(max-width:760px){.a3-stage{grid-template-columns:1fr}.a3-canvas{min-height:330px}}
`;
document.head.appendChild(style);

var a2=side.querySelector('[data-page="a2"]');
if(!side.querySelector('[data-page="a3"]')){
  var nav=document.createElement('button');nav.className='navbtn';nav.dataset.page='a3';nav.setAttribute('onclick',"go('a3')");nav.innerHTML='<span class="dot" style="background:var(--vi)"></span>Assignment 3<span class="num">SPLAY</span>';
  if(a2&&a2.nextSibling)side.insertBefore(nav,a2.nextSibling);else side.appendChild(nav);
}

function N(v,l,r){return {v:v,l:l||null,r:r||null};}
var states={
  given:N(8,N(5,N(2,N(1),N(4)),N(7)),N(11,N(9),N(12,null,N(15)))),
  a1:N(1,null,N(8,N(2,null,N(5,N(4),N(7))),N(11,N(9),N(12,null,N(15))))),
  a11:N(11,N(8,N(1,null,N(2,null,N(5,N(4),N(7)))),N(9)),N(12,null,N(15))),
  a4:N(4,N(1,null,N(2)),N(11,N(8,N(5,null,N(7)),N(9)),N(12,null,N(15))))
};
var info={
  given:{title:'Given Splay Tree',path:'Start here',steps:['The tree is a BST: every left value is smaller and every right value is larger.','The access operations are applied in order, so each result becomes the starting tree for the next access.']},
  a1:{title:'After Access 1',path:'8 → 5 → 2 → 1',steps:['1 is left of 2 and 2 is left of 5: homogeneous LL (zig-zig).','Rotate parent 2 around grandparent 5 to the right, then rotate 1 around 2 to the right.','Now 1 is a child of root 8: parent-is-root case (zig). Rotate 1 around 8 to the right.','Result: 1 becomes the root.']},
  a11:{title:'After Access 11',path:'1 → 8 → 11',steps:['11 is right of 8 and 8 is right of 1: homogeneous RR (zig-zig).','Rotate 8 around 1 to the left, then rotate 11 around 8 to the left.','Result: 11 becomes the root.']},
  a4:{title:'After Access 4',path:'11 → 8 → 1 → 2 → 5 → 4',steps:['4 is left of 5 while 5 is right of 2: heterogeneous RL (zig-zag). Rotate 4 around 5 right, then around 2 left.','Now 4 is right of 1 while 1 is left of 8: heterogeneous LR. Rotate 4 around 1 left, then around 8 right.','Now parent 11 is the root: single right rotation of 4 around 11.','Result: 4 becomes the root.']}
};
window.ALGO_A3={states:states,info:info};

var page=document.createElement('section');page.className='page';page.id='page-a3';
page.innerHTML=`
<div class="lvlchip c-green">Assignment 3 · Week 4</div>
<h1>Assignment 3 — Splay Tree Access</h1>
<p class="sub">Redraw the given Splay Tree after the sequential operations <b>Access 1</b>, <b>Access 11</b>, and <b>Access 4</b>.</p>
<div class="a3-grid">
  <div class="a3-card"><div class="a3-k">Assignment task</div><h3>Operation sequence</h3><div class="a3-seq">GIVEN → ACCESS 1 → ACCESS 11 → ACCESS 4</div><p>Each access splays the accessed node to the root. The next access starts from the tree produced by the previous one.</p><div class="a3-note"><b>Checked result:</b> the final structures in your handwritten solution match the course splay rules.</div></div>
  <div class="a3-card"><div class="a3-k">Splay rule</div><h3>Choose the case from x, parent, grandparent</h3><div class="a3-rule"><b>Parent is root · Zig</b><br>One rotation: x around its parent.</div><div class="a3-rule"><b>Homogeneous · Zig-zig</b><br>LL or RR: rotate parent around grandparent first, then x around parent.</div><div class="a3-rule"><b>Heterogeneous · Zig-zag</b><br>LR or RL: rotate x around parent first, then x around grandparent.</div></div>
</div>
<div class="a3-card"><div class="a3-k">Step-through solution</div><h3>Follow the tree after every access</h3><div class="a3-controls"><button class="a3-btn on" data-a3="given">GIVEN</button><button class="a3-btn" data-a3="a1">AFTER ACCESS 1</button><button class="a3-btn" data-a3="a11">AFTER ACCESS 11</button><button class="a3-btn" data-a3="a4">AFTER ACCESS 4</button></div><div class="a3-stage"><div class="a3-canvas" id="a3Canvas"></div><div class="a3-step"><div class="a3-k" id="a3Title"></div><div class="a3-path" id="a3Path"></div><ol id="a3Steps"></ol></div></div></div>
<div class="a3-grid">
  <div class="a3-card"><div class="a3-k">How to solve any splay access</div><h3>Use this exact routine</h3><ol><li>Search for the accessed value and write the path.</li><li>If x is already root, stop.</li><li>If parent is root, do one rotation.</li><li>Otherwise inspect x-parent-grandparent: same direction = homogeneous; opposite direction = heterogeneous.</li><li>Apply the rotations in the correct order.</li><li>Repeat until x becomes root.</li></ol><div class="a3-note a3-warn"><b>Never rebuild the BST.</b> Splaying uses rotations and preserves the BST in-order sequence.</div></div>
  <div class="a3-card"><div class="a3-k">Midterm facts</div><h3>What the drawing proves</h3><ul><li>After every successful access, the accessed node ends at the root.</li><li>Rotations change shape, not sorted order.</li><li>Homogeneous = same direction (LL/RR). Heterogeneous = opposite direction (LR/RL).</li><li>Splay operations are <b>O(log n) amortized</b>, not guaranteed O(log n) for every single access.</li><li>Recently accessed nodes move near the top, which is the point of a self-adjusting tree.</li></ul></div>
</div>
<div class="a3-card"><div class="a3-k">Quick practice</div><h3>Answer before revealing</h3><div class="a3-practice" id="a3Practice"></div></div>`;
var a2page=document.getElementById('page-a2');if(a2page&&a2page.nextSibling)wrap.insertBefore(page,a2page.nextSibling);else wrap.appendChild(page);

function layout(root){var list=[],x=0,maxD=0;function walk(n,d){if(!n)return;walk(n.l,d+1);n._x=52+x*64;n._y=42+d*72;x++;maxD=Math.max(maxD,d);list.push(n);walk(n.r,d+1);}walk(root,0);return {nodes:list,w:Math.max(360,(list.length+1)*64),h:Math.max(300,92+maxD*72)};}
function draw(root){var L=layout(root),lines='',nodes='';L.nodes.forEach(function(n){if(n.l)lines+='<line x1="'+n._x+'" y1="'+n._y+'" x2="'+n.l._x+'" y2="'+n.l._y+'"/>';if(n.r)lines+='<line x1="'+n._x+'" y1="'+n._y+'" x2="'+n.r._x+'" y2="'+n.r._y+'"/>';});L.nodes.forEach(function(n){nodes+='<g><circle cx="'+n._x+'" cy="'+n._y+'" r="19"/><text x="'+n._x+'" y="'+n._y+'">'+n.v+'</text></g>';});document.getElementById('a3Canvas').innerHTML='<svg class="a3-svg" width="'+L.w+'" height="'+L.h+'" viewBox="0 0 '+L.w+' '+L.h+'">'+lines+nodes+'</svg>';}
function showState(k){document.querySelectorAll('[data-a3]').forEach(function(b){b.classList.toggle('on',b.dataset.a3===k);});draw(states[k]);document.getElementById('a3Title').textContent=info[k].title;document.getElementById('a3Path').textContent=info[k].path;document.getElementById('a3Steps').innerHTML=info[k].steps.map(function(s){return '<li>'+s+'</li>';}).join('');}
document.querySelectorAll('[data-a3]').forEach(function(b){b.addEventListener('click',function(){showState(this.dataset.a3);});});showState('given');

var practice=[
 ['After Access 1, which node must be the root?','1 — every splay access ends with the accessed node at the root.'],
 ['What is the first case when splaying 1 from the given tree?','Homogeneous LL (zig-zig): 1 is left of 2 and 2 is left of 5.'],
 ['After Access 11, what is the root?','11. The path is 1 → 8 → 11, an RR homogeneous case.'],
 ['What is the first case while splaying 4 after Access 11?','Heterogeneous RL: 4 is left of 5, while 5 is right of 2.'],
 ['What is the final root after the full sequence?','4.'],
 ['What is the in-order traversal after every access?','1, 2, 4, 5, 7, 8, 9, 11, 12, 15 — rotations preserve BST ordering.']
];
document.getElementById('a3Practice').innerHTML=practice.map(function(q,i){return '<div class="a3-q"><b>'+q[0]+'</b><button class="a3-show" data-a3q="'+i+'">SHOW ANSWER</button><div class="a3-answer" id="a3ans'+i+'">'+q[1]+'</div></div>';}).join('');
document.querySelectorAll('[data-a3q]').forEach(function(b){b.onclick=function(){var a=document.getElementById('a3ans'+this.dataset.a3q);a.classList.toggle('on');this.textContent=a.classList.contains('on')?'HIDE ANSWER':'SHOW ANSWER';};});
})();
