/* Tree Mastery Learn expansion — presentation-only.
   Reuses the rendered Week 4 / Week 6 course cards verbatim. */
(function(){
  'use strict';
  function stripIds(node){
    if(node.removeAttribute) node.removeAttribute('id');
    if(node.querySelectorAll) node.querySelectorAll('[id]').forEach(function(el){el.removeAttribute('id');});
  }
  function cardTitle(card){
    var h=card.querySelector('h2,h3');
    return h ? h.textContent.trim() : 'Course note';
  }
  function mount(){
    var pane=document.getElementById('tm-pane-learn');
    if(!pane || document.getElementById('tm-course-expanded')) return false;
    var week4=document.getElementById('page-week4');
    var week6=document.getElementById('page-week6');
    if(!week4 || !week6) return false;

    var selected4=[0,1,2,3,4,5,6,7,8,9,10,11];
    var selected6=[0,1,2,3,4,5,6,7,8,9,10];
    var root=document.createElement('section');
    root.id='tm-course-expanded';
    root.className='tm-course-expanded';
    root.innerHTML=
      '<div class="tm-course-head">'+
        '<div><span class="tm-badge">EXPANDED LEARN · COURSE MATERIAL</span>'+
        '<h2>Full tree revision path</h2>'+
        '<p class="tm-small">Open only the topic you need. The material below is reused directly from Week 4 and Week 6; the original lesson wording is unchanged.</p></div>'+
      '</div>'+
      '<div class="tm-course-groups"></div>';

    function addGroup(label,source,indices){
      var cards=Array.from(source.querySelectorAll(':scope > .card'));
      var section=document.createElement('section');
      section.className='tm-course-group';
      var heading=document.createElement('h3');
      heading.textContent=label;
      section.appendChild(heading);
      indices.forEach(function(i){
        var original=cards[i];
        if(!original) return;
        var d=document.createElement('details');
        d.className='tm-course-topic';
        var s=document.createElement('summary');
        s.textContent=cardTitle(original);
        d.appendChild(s);
        var body=document.createElement('div');
        body.className='tm-course-body';
        var clone=original.cloneNode(true);
        stripIds(clone);
        body.appendChild(clone);
        d.appendChild(body);
        section.appendChild(d);
      });
      root.querySelector('.tm-course-groups').appendChild(section);
    }
    addGroup('Week 4 · Binary Trees, BST, AVL, Splay & Heaps',week4,selected4);
    addGroup('Week 6 · Multiway Trees, B-Trees & Tries',week6,selected6);
    pane.appendChild(root);
    return true;
  }
  if(!mount()){
    var tries=0, timer=setInterval(function(){if(mount() || ++tries>30)clearInterval(timer);},100);
  }
})();