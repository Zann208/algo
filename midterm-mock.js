(function(){
'use strict';
const STORAGE='algo-midterm-mock-v1';
const cards=Array.from(document.querySelectorAll('.mock-card'));
const takeBtn=document.getElementById('modeTake');
const reviewBtn=document.getElementById('modeReview');
const pos=document.getElementById('mockPosition');
let state={current:0,objectiveResponses:{},completionState:false};
try{
  const saved=JSON.parse(localStorage.getItem(STORAGE)||'null');
  if(saved&&Number.isInteger(saved.current)) state.current=Math.max(0,Math.min(cards.length-1,saved.current));
  if(saved&&saved.objectiveResponses&&typeof saved.objectiveResponses==='object') state.objectiveResponses=saved.objectiveResponses;
  if(saved&&typeof saved.completionState==='boolean') state.completionState=saved.completionState;
}catch(e){}
function save(){
  try{localStorage.setItem(STORAGE,JSON.stringify({
    current:state.current,
    objectiveResponses:state.objectiveResponses,
    completionState:state.completionState
  }));}catch(e){}
}
function setTake(index){
  document.body.classList.remove('review-mode');
  state.current=Math.max(0,Math.min(cards.length-1,index));
  cards.forEach((c,i)=>{c.hidden=i!==state.current; c.querySelector('.answer')?.classList.remove('open');});
  takeBtn.classList.add('primary');reviewBtn.classList.remove('primary');
  pos.textContent='Question group '+(state.current+1)+' / '+cards.length+' · 42 supplied sub-prompts · written/tree answers are self-review';
  save();window.scrollTo({top:0,behavior:'smooth'});
}
function setReview(){
  document.body.classList.add('review-mode');
  cards.forEach(c=>c.hidden=false);
  takeBtn.classList.remove('primary');reviewBtn.classList.add('primary');
  pos.textContent='Review answers · 9 question groups · 42 supplied sub-prompts';
}
takeBtn.addEventListener('click',()=>setTake(state.current));
reviewBtn.addEventListener('click',setReview);
document.querySelectorAll('[data-show-answer]').forEach(b=>b.addEventListener('click',()=>{
  const card=b.closest('.mock-card'); const ans=card.querySelector('.answer');
  const open=ans.classList.toggle('open');
  b.textContent=open?'HIDE ANSWER':'SHOW ANSWER';
}));
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>{
  if(state.current<cards.length-1) setTake(state.current+1);
  else {state.completionState=true;save();setReview();}
}));
document.querySelectorAll('[data-prev]').forEach(b=>b.addEventListener('click',()=>setTake(state.current-1)));

const trees={
bst0:{v:23,l:{v:12,l:{v:5,l:{v:1},r:{v:7}},r:{v:17,l:{v:14},r:{v:21}}},r:{v:35,l:{v:28,l:{v:25},r:{v:33}},r:{v:45,l:{v:38},r:{v:58}}}},
bst1:{v:23,l:{v:12,l:{v:5,l:{v:1},r:{v:7}},r:{v:17,l:{v:14,r:{v:15}},r:{v:21}}},r:{v:35,l:{v:28,l:{v:25},r:{v:33}},r:{v:45,l:{v:38},r:{v:58}}}},
bst2:{v:23,l:{v:12,l:{v:5,l:{v:1}},r:{v:17,l:{v:14,r:{v:15}},r:{v:21}}},r:{v:35,l:{v:28,l:{v:25},r:{v:33}},r:{v:45,l:{v:38},r:{v:58}}}},
bst3:{v:23,l:{v:12,l:{v:5,l:{v:1}},r:{v:17,l:{v:15},r:{v:21}}},r:{v:35,l:{v:28,l:{v:25},r:{v:33}},r:{v:45,l:{v:38},r:{v:58}}}},
bst4:{v:23,l:{v:12,l:{v:5,l:{v:1}},r:{v:17,l:{v:15},r:{v:21}}},r:{v:38,l:{v:28,l:{v:25},r:{v:33}},r:{v:45,r:{v:58}}}},
dsw:{v:25,l:{v:15,l:{v:5,l:{v:1},r:{v:12}},r:{v:21,l:{v:17},r:{v:23}}},r:{v:45,l:{v:33,l:{v:28},r:{v:38}},r:{v:58}}},
avl0:{v:10,l:{v:5,l:{v:4,l:{v:3}},r:{v:6}},r:{v:13,r:{v:17}}},
avl18:{v:10,l:{v:5,l:{v:4,l:{v:3}},r:{v:6}},r:{v:17,l:{v:13},r:{v:18}}},
avl15:{v:10,l:{v:5,l:{v:4,l:{v:3}},r:{v:6}},r:{v:17,l:{v:13,r:{v:15}},r:{v:18}}},
avl14:{v:10,l:{v:5,l:{v:4,l:{v:3}},r:{v:6}},r:{v:17,l:{v:14,l:{v:13},r:{v:15}},r:{v:18}}},
splay0:{v:11,l:{v:8,l:{v:1,r:{v:4,l:{v:2},r:{v:5,r:{v:7}}}},r:{v:9}},r:{v:12,r:{v:15}}},
splay4a:{v:11,l:{v:4,l:{v:1,r:{v:2}},r:{v:8,l:{v:5,r:{v:7}},r:{v:9}}},r:{v:12,r:{v:15}}},
splay4:{v:4,l:{v:1,r:{v:2}},r:{v:11,l:{v:8,l:{v:5,r:{v:7}},r:{v:9}},r:{v:12,r:{v:15}}}},
splay16a:{v:4,l:{v:1,r:{v:2}},r:{v:11,l:{v:8,l:{v:5,r:{v:7}},r:{v:9}},r:{v:16,l:{v:15,l:{v:12}}}}},
splay16:{v:16,l:{v:11,l:{v:4,l:{v:1,r:{v:2}},r:{v:8,l:{v:5,r:{v:7}},r:{v:9}}},r:{v:15,l:{v:12}}}}
};
function renderTree(root){
  const pts=[];let x=0,maxD=0;
  function walk(n,d){if(!n)return;walk(n.l,d+1);n._x=42+x*52;n._y=28+d*58;x++;maxD=Math.max(maxD,d);pts.push(n);walk(n.r,d+1);}
  const copy=JSON.parse(JSON.stringify(root));walk(copy,0);
  const w=Math.max(230,(pts.length+1)*52),h=Math.max(170,62+maxD*58);
  let lines='',nodes='';
  pts.forEach(n=>{
    if(n.l)lines+=`<line x1="${n._x}" y1="${n._y}" x2="${n.l._x}" y2="${n.l._y}"/>`;
    if(n.r)lines+=`<line x1="${n._x}" y1="${n._y}" x2="${n.r._x}" y2="${n.r._y}"/>`;
  });
  pts.forEach(n=>nodes+=`<g><circle cx="${n._x}" cy="${n._y}" r="17"/><text x="${n._x}" y="${n._y}">${n.v}</text></g>`);
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Tree diagram">${lines}${nodes}</svg>`;
}
document.querySelectorAll('[data-tree]').forEach(el=>{const t=trees[el.dataset.tree];if(t)el.innerHTML=renderTree(t);});
setTake(state.current);
})();