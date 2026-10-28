'use strict';
// The complete resource list is the default. JavaScript only adds filtering.
const filterGroup = document.querySelector('.filters');
const resources = [...document.querySelectorAll('.resource')];
const resultCount = document.querySelector('.result-count');
if (filterGroup && resources.length && resultCount) {
  filterGroup.hidden = false;
  filterGroup.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button || !filterGroup.contains(button)) return;
    const topic = button.dataset.filter;
    let visible = 0;
    for (const resource of resources) {
      resource.hidden = topic !== 'all' && resource.dataset.topic !== topic;
      if (!resource.hidden) visible++;
    }
    for (const control of filterGroup.querySelectorAll('button')) {
      control.setAttribute('aria-pressed', String(control === button));
    }
    resultCount.textContent = `${visible} ${visible === 1 ? 'article' : 'articles'} · PDF resources`;
  });
}

// Progressive-enhancement camera viewer: all observations remain present without JS.
const frames=[...document.querySelectorAll('[data-camera]')];
const cameraControls=document.querySelector('.camera-controls');
if(cameraControls&&frames.length){
 cameraControls.hidden=false;
 const showCamera=(key)=>{for(const frame of frames)frame.hidden=frame.dataset.camera!==key;for(const b of cameraControls.querySelectorAll('button'))b.setAttribute('aria-pressed',String(b.dataset.view===key));document.querySelector('.camera-mode').textContent={cattle:'STOCKMANSHIP',canid:'AFTER DARK',bear:'WILDLIFE'}[key];};
 showCamera('cattle');
 cameraControls.addEventListener('click',event=>{const b=event.target.closest('[data-view]');if(b)showCamera(b.dataset.view);});
}
