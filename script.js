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

// Search and topic filters enhance complete static catalogs.
for (const catalog of document.querySelectorAll('[data-catalog]')) {
  const controls = catalog.querySelector('[data-catalog-controls]');
  const search = catalog.querySelector('[data-catalog-search]');
  const items = [...catalog.querySelectorAll('[data-catalog-item]')];
  const status = catalog.querySelector('[data-catalog-status]');
  const empty = catalog.querySelector('.catalog-empty');
  const noun = catalog.querySelector('.video-grid') ? 'video lessons' : 'articles';
  let topic = 'all';
  const render = () => {
    const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let count = 0;
    for (const item of items) {
      const matches = (topic === 'all' || item.dataset.category === topic) && terms.every(term => item.dataset.search.toLowerCase().includes(term));
      item.hidden = !matches;
      if (matches) count++;
    }
    status.textContent = `${count} of ${items.length} ${noun}`;
    empty.hidden = count !== 0;
  };
  controls.hidden = false;
  controls.addEventListener('click', event => {
    const button = event.target.closest('[data-catalog-filter]');
    if (!button) return;
    topic = button.dataset.catalogFilter;
    for (const control of controls.querySelectorAll('button')) control.setAttribute('aria-pressed', String(control === button));
    render();
  });
  search.addEventListener('input', render);
}

// Gallery links work as ordinary image links without JavaScript or dialog support.
const photoLinks = [...document.querySelectorAll('[data-photo]')];
if (photoLinks.length) {
  const tools = document.querySelector('.gallery-tools');
  const more = document.querySelector('.gallery-more');
  const status = document.querySelector('[data-photo-status]');
  const dialog = document.querySelector('#photo-dialog');
  let topic = ['cattle', 'wildlife'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'all';
  let limit = 24;
  let selected = null;
  const matching = () => photoLinks.filter(link => topic === 'all' || link.dataset.photo === topic);
  const renderPhotos = () => {
    const matches = matching();
    const visible = new Set(matches.slice(0, limit));
    for (const link of photoLinks) link.hidden = !visible.has(link);
    for (const button of tools.querySelectorAll('button')) button.setAttribute('aria-pressed', String(button.dataset.photoFilter === topic));
    more.hidden = matches.length <= limit;
    status.textContent = `Showing ${Math.min(limit, matches.length)} of ${matches.length} photographs`;
  };
  tools.hidden = false;
  renderPhotos();
  window.addEventListener('hashchange', () => {
    topic = ['cattle', 'wildlife'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'all';
    limit = 24;
    renderPhotos();
  });
  tools.addEventListener('click', event => {
    const button = event.target.closest('[data-photo-filter]');
    if (!button) return;
    topic = button.dataset.photoFilter;
    limit = 24;
    history.replaceState(null, '', topic === 'all' ? location.pathname : `#${topic}`);
    renderPhotos();
  });
  more.addEventListener('click', () => {
    const before = Math.min(limit, matching().length);
    limit += 24;
    renderPhotos();
    // Keep focus in the newly revealed collection when its load-more button disappears.
    if (more.hidden) matching()[before]?.focus();
  });
  if (dialog && typeof dialog.showModal === 'function') {
    const large = dialog.querySelector('.photo-enlarged');
    const caption = dialog.querySelector('#photo-caption');
    const position = dialog.querySelector('[data-photo-position]');
    const show = link => {
      selected = link;
      large.src = link.href;
      large.alt = link.querySelector('img').alt;
      caption.textContent = `${link.dataset.photo === 'cattle' ? 'Cattle' : 'Wildlife'} photograph ${link.dataset.photoNumber}`;
      position.textContent = `${matching().indexOf(link) + 1} / ${matching().length}`;
    };
    const step = delta => {
      const matches = matching();
      show(matches[(matches.indexOf(selected) + delta + matches.length) % matches.length]);
    };
    for (const link of photoLinks) link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      show(link);
      dialog.showModal();
    });
    dialog.querySelector('[data-photo-close]').addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-photo-prev]').addEventListener('click', () => step(-1));
    dialog.querySelector('[data-photo-next]').addEventListener('click', () => step(1));
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        step(event.key === 'ArrowRight' ? 1 : -1);
      }
    });
    dialog.addEventListener('close', () => {
      large.removeAttribute('src');
      // Navigation may have reached a photograph beyond the current visible page.
      if (selected?.hidden) {
        limit = Math.max(limit, matching().indexOf(selected) + 1);
        renderPhotos();
      }
      selected?.focus();
    });
  }
}

// Load the real published video only after the visitor chooses a lesson.
const lessonDialog = document.querySelector('#lesson-dialog');
if (lessonDialog && typeof lessonDialog.showModal === 'function') {
  const player = lessonDialog.querySelector('.lesson-player');
  let trigger = null;
  for (const link of document.querySelectorAll('[data-video-id]')) link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const id = link.dataset.videoId;
    if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return;
    event.preventDefault();
    trigger = link;
    const title = link.closest('.video-card').querySelector('h2').textContent;
    lessonDialog.querySelector('#lesson-title').textContent = title;
    lessonDialog.querySelector('.lesson-fallback').href = link.href;
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    frame.title = title;
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    player.replaceChildren(frame);
    lessonDialog.showModal();
  });
  lessonDialog.querySelector('[data-lesson-close]').addEventListener('click', () => lessonDialog.close());
  lessonDialog.addEventListener('close', () => {
    player.replaceChildren();
    trigger?.focus();
  });
}
