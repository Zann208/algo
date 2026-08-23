"use strict";
(function(){
if(window.__algoTreeMasteryUpgradeLoaded)return;window.__algoTreeMasteryUpgradeLoaded=true;
var page=document.getElementById('page-trees');if(!page)return;

var style=document.createElement('style');
style.textContent=`
.tmu-route{border:1px solid color-mix(in srgb,var(--am) 45%,var(--line));background:color-mix(in srgb,var(--am) 5%,var(--panel));border-radius:11px;padding:13px 14px;margin:12px 0 17px}.tmu-routehead{display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap}.tmu-routehead b{font-size:15px}.tmu-routehead span{font:800 9px var(--mono);letter-spacing:1px;color:var(--am)}.tmu-assigns{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px}.tmu-ass{border:1px solid var(--line);background:var(--panel2);border-radius:8px;padding:10px;cursor:pointer;color:var(--ink);text-align:left}.tmu-ass:hover{border-color:var(--am)}.tmu-ass b{display:block;font-size:13px}.tmu-ass span{display:block;font-size:11.5px;color:var(--dim);margin-top:2px}.tmu-table{width:100%;border-collapse:collapse;margin-top:9px;font-size:13px}.tmu-table td,.tmu-table th{padding:8px 9px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}.tmu-table th{font:800 9px var(--mono);letter-spacing:.8px;text-transform:uppercase;color:var(--faint)}.tmu-drills{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:9px}.tmu-drill{border:1px solid var(--line);background:var(--panel);border-radius:9px;padding:12px}.tmu-drill .src{font:800 9px var(--mono);color:var(--am);letter-spacing:.7px}.tmu-drill b{display:block;margin:5px 0}.tmu-reveal{border:1px solid var(--line2);background:var(--panel2);color:var(--dim);border-radius:6px;padding:6px 8px;font:700 9px var(--mono);cursor:pointer}.tmu-ans{display:none;border-top:1px solid var(--line);margin-top:8px;padding-top:8px;color:var(--gr)}.tmu-ans.on{display:block}.tmu-splaylab{margin-top:12px}.tmu-splaybtns{display:flex;gap:7px;flex-wrap:wrap;margin:8px 0}.tmu-mini-tree{min-height:300px;border:1px solid var(--line);background:var(--panel2);border-radius:9px;padding:8px;overflow:auto;display:flex;align-items:center;justify-content:center}.tmu-svg line{stroke:var(--tline);stroke-width:1.7}.tmu-svg circle{fill:var(--panel);stroke:var(--vi);stroke-width:1.8}.tmu-svg text{fill:var(--ink);font:700 12px var(--mono);text-anchor:middle;dominant-baseline:middle}.tmu-checks{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:8px}.tmu-check{display:flex;gap:9px;background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:10px}.tmu-check input{margin-top:4px;accent-color:var(--am)}.tmu-check span{font-size:12px;color:var(--dim);display:block;margin-top:2px}.tmu-prog{margin:10px 0 12px;font:800 11px var(--mono);color:var(--am)}
@media(max-width:780px){.tmu-assigns{grid-template-columns:1fr}}
`;
document.head.appendChild(style);

var hero=page.querySelector('.tm-hero');
var route=document.createElement('div');route.className='tmu-route';route.innerHTML='<div class="tmu-routehead"><b>Midterm tree route</b><span>ASSIGNMENTS → SKILLS → PRACTICE</span></div><div class="tmu-assigns"><button class="tmu-ass" data-goa="a1"><b>Assignment 1 · BST</b><span>Build, insert and delete correctly.</span></button><button class="tmu-ass" data-goa="a2"><b>Assignment 2 · AVL</b><span>Height, balance factor and rotations.</span></button><button class="tmu-ass" data-goa="a3"><b>Assignment 3 · Splay</b><span>Access, classify cases and rotate to root.</span></button></div>';
if(hero&&hero.nextSibling)page.insertBefore(route,hero.nextSibling);else page.prepend(route);
route.querySelectorAll('[data-goa]').forEach(function(b){b.onclick=function(){if(typeof go==='function')go(this.dataset.goa);};});

var tabs=page.querySelector('.tm-tabs'),qPane=document.getElementById('tm-pane-questions');
if(tabs&&!tabs.querySelector('[data-tmpane="assignments"]')){
 var tab=document.createElement('button');tab.className='tm-tab';tab.dataset.tmpane='assignments';tab.textContent='ASSIGNMENT MODE';
 var qtab=tabs.querySelector('[data-tmpane="questions"]');tabs.insertBefore(tab,qtab||null);
 tab.onclick=function(){activate('assignments');};
}
function activate(id){page.querySelectorAll('.tm-tab').forEach(function(b){b.classList.toggle('on',b.dataset.tmpane===id);});page.querySelectorAll('.tm-pane').forEach(function(p){p.classList.toggle('on',p.id==='tm-pane-'+id);});}

var pane=document.createElement('div');pane.className='tm-pane';pane.id='tm-pane-assignments';
pane.innerHTML=`
<div class="tm-card"><span class="tm-badge">MIDTERM PATTERN</span><h3>Assignments 1–3 are your operation practice</h3><table class="tmu-table"><tr><th>Assignment</th><th>Tree skill</th><th>What you should be able to do without notes</th></tr><tr><td><b>A1 · BST</b></td><td>Insertion + deletion</td><td>Build from an insertion order; delete leaf, one-child and two-child nodes; explain copying/merging.</td></tr><tr><td><b>A2 · AVL</b></td><td>Balance + rotation</td><td>Calculate height/BF, find the lowest unbalanced node, classify LL/RR/LR/RL, draw the rotation correctly.</td></tr><tr><td><b>A3 · Splay</b></td><td>Access + restructuring</td><td>Write the access path, identify parent-root / homogeneous / heterogeneous cases and rotate the accessed node to root.</td></tr></table></div>
<div class="tm-card"><span class="tm-badge">ASSIGNMENT-STYLE DRILLS</span><h3>Do these on paper before revealing</h3><div class="tmu-drills" id="tmuDrills"></div></div>
<div class="tm-card"><span class="tm-badge">MIDTERM COMPLETION CHECK</span><h3>Tree operations you should own</h3><div class="tmu-prog" id="tmuProg"></div><div class="tmu-checks" id="tmuChecks"></div></div>`;
if(qPane)qPane.parentNode.insertBefore(pane,qPane);else page.appendChild(pane);

var drills=[
 ['A1 · BST','Insert 10,5,29,4,8,28,3,6,15. Where is 15 inserted?','Path 10 → 29 → 28 → left. So 15 becomes the left child of 28.'],
 ['A1 · BST','After building that tree, what happens when deleting leaf 3?','3 is a leaf, so remove it and set its parent 4\'s left pointer to NULL.'],
 ['A1 · BST','After deleting 3, delete 28. What case is it?','One-child case. 28 has child 15, so parent 29 adopts 15.'],
 ['A1 · BST','After Part 1, delete root 10 by copying with the successor. What replaces 10?','15. The successor is the leftmost node of the right subtree. Copy 15 to the root, then delete the old 15 node.'],
 ['A2 · AVL','What balance-factor formula is used in this course?','BF = height(left) − height(right). Empty subtree height is −1.'],
 ['A2 · AVL','An insertion causes an LL case. What is the fix?','One right rotation at the lowest unbalanced node.'],
 ['A2 · AVL','An insertion causes LR. What are the two rotations?','First left rotation at the left child, then right rotation at the unbalanced node.'],
 ['A2 · AVL','Which unbalanced node should you fix first?','The lowest node on the insertion/deletion path whose balance factor reaches +2 or −2.'],
 ['A3 · Splay','Given the Assignment 3 tree, what is the first case when accessing 1?','Homogeneous LL (zig-zig): 1 is left of 2 and 2 is left of 5.'],
 ['A3 · Splay','After Access 1, then Access 11, what becomes the root?','11. The access path is 1 → 8 → 11, an RR homogeneous case.'],
 ['A3 · Splay','When starting Access 4 after Access 11, what is the first local pattern?','Heterogeneous RL: 4 is left of 5 while 5 is right of 2.'],
 ['Traversal','Why is LVR especially important for a BST?','In-order LVR visits BST keys in sorted ascending order.'],
 ['B-Tree','For order m=5, how many keys fit in one node before overflow?','At most m−1 = 4 keys. Trying to insert a 5th key causes overflow/splitting.'],
 ['B+ / Trie','What is the fastest way to distinguish a B+Tree from a plain B-tree?','B+ stores all actual data in linked leaves; internal nodes are indexes and separator values may repeat in leaves. A trie follows pieces of the key along the path.']
];
document.getElementById('tmuDrills').innerHTML=drills.map(function(d,i){return '<div class="tmu-drill"><span class="src">'+d[0]+'</span><b>'+d[1]+'</b><button class="tmu-reveal" data-tmud="'+i+'">REVEAL</button><div class="tmu-ans" id="tmuAns'+i+'">'+d[2]+'</div></div>';}).join('');
document.querySelectorAll('[data-tmud]').forEach(function(b){b.onclick=function(){var a=document.getElementById('tmuAns'+this.dataset.tmud);a.classList.toggle('on');this.textContent=a.classList.contains('on')?'HIDE':'REVEAL';};});

var skills=[
 ['BST build','I can build a BST from an insertion sequence without redrawing incorrectly.'],['BST delete','I can handle leaf, one-child and two-child deletion.'],['Traversal','I can produce VLR, LVR, LRV and breadth-first orders.'],['Rotation','I keep the middle subtree when performing a rotation.'],['AVL BF','I can calculate height and BF using left − right.'],['AVL cases','I can classify LL, RR, LR and RL from the lowest unbalanced node.'],['DSW','I can explain backbone/stretch and compression/balance phases.'],['Splay cases','I know parent-root, homogeneous and heterogeneous splay cases.'],['Splay drawing','I can splay an accessed value to the root on paper.'],['Heap','I can perform heap insert/delete and explain heapsort.'],['Expression tree','I can convert traversal to infix/prefix/postfix meaning.'],['B-tree','I can compute order, max keys, minimum occupancy and split behavior.'],['B variants','I can distinguish B, B*, B**, B+, Prefix B+ and Bit Tree.'],['Trie','I can explain how key pieces choose branches.']
];
var saved={};try{saved=JSON.parse(localStorage.getItem('algoMidtermTreeSkills')||'{}');}catch(e){}
function updateSkills(){var n=0;document.querySelectorAll('#tmuChecks input').forEach(function(c){saved[c.dataset.skill]=c.checked;if(c.checked)n++;});try{localStorage.setItem('algoMidtermTreeSkills',JSON.stringify(saved));}catch(e){}document.getElementById('tmuProg').textContent=n+' / '+skills.length+' assignment-driven tree skills ready';}
document.getElementById('tmuChecks').innerHTML=skills.map(function(s,i){return '<label class="tmu-check"><input type="checkbox" data-skill="'+i+'" '+(saved[i]?'checked':'')+'><div><b>'+s[0]+'</b><span>'+s[1]+'</span></div></label>';}).join('');document.querySelectorAll('#tmuChecks input').forEach(function(c){c.onchange=updateSkills;});updateSkills();

var lab=document.getElementById('tm-pane-lab');
if(lab&&window.ALGO_A3){
 var box=document.createElement('div');box.className='tm-card tmu-splaylab';box.innerHTML='<span class="tm-badge">SPLAY ACCESS LAB · ASSIGNMENT 3</span><h3>Step through the exact access sequence</h3><p class="tm-small">Use this after you try the drawing on paper. Every button shows the resulting tree, while the Assignment 3 page explains each rotation.</p><div class="tmu-splaybtns"><button class="tm-btn primary" data-tmus="given">GIVEN</button><button class="tm-btn" data-tmus="a1">ACCESS 1</button><button class="tm-btn" data-tmus="a11">ACCESS 11</button><button class="tm-btn" data-tmus="a4">ACCESS 4</button><button class="tm-btn" id="tmuOpenA3">OPEN FULL ASSIGNMENT →</button></div><div class="tmu-mini-tree" id="tmuSplayCanvas"></div><div class="tm-result" id="tmuSplayText"></div>';
 lab.appendChild(box);
 document.getElementById('tmuOpenA3').onclick=function(){if(typeof go==='function')go('a3');};
 function layout(root){var nodes=[],x=0,max=0;function w(n,d){if(!n)return;w(n.l,d+1);n.__x=46+x*58;n.__y=38+d*66;x++;max=Math.max(max,d);nodes.push(n);w(n.r,d+1);}w(root,0);return{nodes:nodes,w:Math.max(340,(nodes.length+1)*58),h:Math.max(280,88+max*66)};}
 function drawS(k){var root=window.ALGO_A3.states[k],L=layout(root),ln='',nn='';L.nodes.forEach(function(n){if(n.l)ln+='<line x1="'+n.__x+'" y1="'+n.__y+'" x2="'+n.l.__x+'" y2="'+n.l.__y+'"/>';if(n.r)ln+='<line x1="'+n.__x+'" y1="'+n.__y+'" x2="'+n.r.__x+'" y2="'+n.r.__y+'"/>';});L.nodes.forEach(function(n){nn+='<g><circle cx="'+n.__x+'" cy="'+n.__y+'" r="18"/><text x="'+n.__x+'" y="'+n.__y+'">'+n.v+'</text></g>';});document.getElementById('tmuSplayCanvas').innerHTML='<svg class="tmu-svg" width="'+L.w+'" height="'+L.h+'" viewBox="0 0 '+L.w+' '+L.h+'">'+ln+nn+'</svg>';var inf=window.ALGO_A3.info[k];document.getElementById('tmuSplayText').innerHTML='<b>'+inf.title+'</b> · '+inf.path;document.querySelectorAll('[data-tmus]').forEach(function(b){b.classList.toggle('primary',b.dataset.tmus===k);});}
 document.querySelectorAll('[data-tmus]').forEach(function(b){b.onclick=function(){drawS(this.dataset.tmus);};});drawS('given');
}

var outs=document.querySelector('.tm-outs');
if(outs&&outs.parentElement&&!document.getElementById('tmuHideTrav')){
 var controls=document.createElement('div');controls.className='tm-inputrow';controls.innerHTML='<button class="tm-btn" id="tmuHideTrav">HIDE TRAVERSALS</button><button class="tm-btn" id="tmuShowTrav">SHOW TRAVERSALS</button>';
 outs.parentElement.appendChild(controls);
 document.getElementById('tmuHideTrav').onclick=function(){outs.querySelectorAll('code').forEach(function(c){c.dataset.answer=c.textContent;c.textContent='?';});};document.getElementById('tmuShowTrav').onclick=function(){outs.querySelectorAll('code').forEach(function(c){if(c.dataset.answer)c.textContent=c.dataset.answer;});};
}
})();
