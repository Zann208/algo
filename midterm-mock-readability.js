/* ALGO Midterm Mock — presentation-only readability helpers.
   Loaded AFTER the existing midterm-mock.js.
   It does not read or modify question text, answers, tree values, scoring, storage, or algorithms. */
(function(){
  'use strict';

  const $$=(sel,root=document)=>Array.from(root.querySelectorAll(sel));

  function formatTreeTitles(){
    $$('.tree-step>b').forEach(title=>{
      if(title.dataset.readabilityTitle==='true') return;
      const raw=title.textContent||'';
      const at=raw.indexOf('·');
      if(at<0) return;
      const main=raw.slice(0,at).trim();
      const detail=raw.slice(at+1).trim();
      title.replaceChildren();
      const mainSpan=document.createElement('span');
      mainSpan.className='tree-op';
      mainSpan.textContent=main;
      const sep=document.createElement('span');
      sep.className='tree-title-sep';
      sep.textContent=' · ';
      const detailSpan=document.createElement('span');
      detailSpan.className='tree-case';
      detailSpan.textContent=detail;
      title.append(mainSpan,sep,detailSpan);
      title.dataset.readabilityTitle='true';
    });
  }

  function classifyTreeSequences(){
    $$('.tree-sequence').forEach(seq=>{
      const keys=$$('[data-tree]',seq).map(el=>el.dataset.tree||'');
      if(keys.length>=3 && keys.every(k=>k.indexOf('bst')===0)){
        seq.classList.add('tree-sequence--bst');
      }else{
        seq.classList.add('tree-sequence--single');
      }
    });
  }

  function setReadableSvgScale(svg){
    if(!svg || !svg.viewBox || !svg.viewBox.baseVal) return;
    const vb=svg.viewBox.baseVal;
    if(!vb.width) return;
    /* Existing renderer uses 34px-diameter nodes at its intrinsic viewBox scale.
       Keep rendered node diameter roughly 29–34px; below that, scroll locally. */
    const min=Math.max(360,Math.round(vb.width*0.86));
    const max=Math.max(min,Math.round(vb.width*1.08));
    svg.style.setProperty('--tree-min',min+'px');
    svg.style.setProperty('--tree-max',max+'px');
    svg.dataset.readabilitySized='true';
  }

  function sizeExistingTrees(){
    $$('.tree-diagram svg').forEach(setReadableSvgScale);
  }

  function setReadableSourceScale(img){
    const apply=()=>{
      const w=img.naturalWidth||0;
      if(!w) return;
      let min,max;
      if(w>=1200){
        min=Math.round(w*.74); max=w;
      }else if(w>=760){
        min=Math.round(w*.82); max=w;
      }else{
        min=Math.min(640,Math.round(w*1.55));
        max=Math.min(760,Math.round(w*1.9));
      }
      img.style.setProperty('--source-min',Math.max(520,min)+'px');
      img.style.setProperty('--source-max',Math.max(620,max)+'px');
    };
    if(img.complete) apply();
    else img.addEventListener('load',apply,{once:true});
  }

  function sizeSourceVisuals(){
    $$('.source-visual img').forEach(setReadableSourceScale);
  }

  let dialog=null,dialogBody=null,dialogTitle=null,lastOpener=null;

  function ensureDialog(){
    if(dialog) return dialog;
    dialog=document.createElement('dialog');
    dialog.className='diagram-dialog';
    dialog.setAttribute('aria-labelledby','diagramDialogTitle');
    dialog.innerHTML=
      '<div class="diagram-dialog-head">'+
        '<div class="diagram-dialog-title" id="diagramDialogTitle">Diagram</div>'+
        '<button class="diagram-dialog-close" type="button" aria-label="Close enlarged diagram">×</button>'+
      '</div>'+
      '<div class="diagram-dialog-body"></div>';
    document.body.appendChild(dialog);
    dialogBody=dialog.querySelector('.diagram-dialog-body');
    dialogTitle=dialog.querySelector('.diagram-dialog-title');

    const closeBtn=dialog.querySelector('.diagram-dialog-close');
    const close=()=>{
      if(dialog.open) dialog.close();
    };
    closeBtn.addEventListener('click',close);
    dialog.addEventListener('click',e=>{
      if(e.target===dialog) close();
    });
    dialog.addEventListener('close',()=>{
      dialogBody.replaceChildren();
      if(lastOpener && document.contains(lastOpener)) lastOpener.focus();
      lastOpener=null;
    });
    return dialog;
  }

  function openDiagram(opener,source,title){
    const dlg=ensureDialog();
    lastOpener=opener;
    dialogTitle.textContent=title||'Diagram';
    dialogBody.replaceChildren();

    const clone=source.cloneNode(true);
    clone.removeAttribute('tabindex');
    clone.removeAttribute('id');

    if(clone.tagName && clone.tagName.toLowerCase()==='svg'){
      clone.removeAttribute('width');
      clone.removeAttribute('height');
      const vb=source.viewBox&&source.viewBox.baseVal;
      const target=vb&&vb.width?Math.max(900,Math.round(vb.width*1.18)):900;
      dialogBody.style.setProperty('--viewer-tree-min',target+'px');
      dialogBody.appendChild(clone);
    }else{
      const natural=source.naturalWidth||900;
      dialogBody.style.setProperty('--viewer-image-min',Math.min(Math.max(900,natural),1500)+'px');
      dialogBody.appendChild(clone);
    }

    if(typeof dlg.showModal==='function'){
      dlg.showModal();
    }else{
      dlg.setAttribute('open','');
    }
    dlg.querySelector('.diagram-dialog-close').focus();
  }

  function addTreeExpandButtons(){
    $$('.tree-step').forEach(step=>{
      const svg=step.querySelector('.tree-diagram svg');
      if(!svg || step.querySelector('.diagram-expand')) return;
      const title=(step.querySelector('b')?.textContent||'Tree diagram').trim();
      const btn=document.createElement('button');
      btn.className='diagram-expand';
      btn.type='button';
      btn.textContent='View larger';
      btn.setAttribute('aria-label','View larger: '+title);
      btn.addEventListener('click',()=>openDiagram(btn,svg,title));
      step.insertBefore(btn,step.querySelector('.tree-diagram'));
    });
  }

  function wrapSourceVisuals(){
    $$('.source-visual').forEach(source=>{
      const img=source.querySelector('img');
      if(!img || source.closest('.source-visual-wrap')) return;

      const wrap=document.createElement('div');
      wrap.className='source-visual-wrap';
      source.parentNode.insertBefore(wrap,source);

      const toolbar=document.createElement('div');
      toolbar.className='source-visual-toolbar';
      const btn=document.createElement('button');
      btn.className='diagram-expand';
      btn.type='button';
      btn.textContent='View larger';
      const title=(img.alt||'Source diagram').trim();
      btn.setAttribute('aria-label','View larger: '+title);
      btn.addEventListener('click',()=>openDiagram(btn,img,title));
      toolbar.appendChild(btn);

      wrap.appendChild(toolbar);
      wrap.appendChild(source);
    });
  }

  function init(){
    formatTreeTitles();
    classifyTreeSequences();
    sizeExistingTrees();
    sizeSourceVisuals();
    addTreeExpandButtons();
    wrapSourceVisuals();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init,{once:true});
  }else{
    init();
  }
})();
