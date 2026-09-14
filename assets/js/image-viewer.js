(() => {
  const photos = [...document.querySelectorAll('[data-gallery] img')];
  if (!photos.length) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'image-viewer';
  dialog.setAttribute('aria-label', 'Visualização ampliada de imagens');
  dialog.innerHTML = `<div class="viewer-toolbar"><span class="viewer-count" aria-live="polite"></span><button type="button" data-zoom aria-label="Ampliar imagem">Zoom +</button><button type="button" data-close aria-label="Fechar visualização">Fechar ×</button></div><div class="viewer-stage"><img alt=""></div><div class="viewer-navigation"><button type="button" data-prev aria-label="Imagem anterior">← Anterior</button><span>Use as setas ou deslize</span><button type="button" data-next aria-label="Próxima imagem">Próxima →</button></div>`;
  document.body.append(dialog);
  const stage = dialog.querySelector('.viewer-stage');
  const image = stage.querySelector('img');
  const zoomButton = dialog.querySelector('[data-zoom]');
  let index = 0, zoomed = false, opener, savedOverflow;
  function resize() {
    if (!image.naturalWidth) return;
    const fit = Math.min(stage.clientWidth / image.naturalWidth, stage.clientHeight / image.naturalHeight);
    const scale = fit * (zoomed ? 2.5 : 1);
    image.style.width = image.naturalWidth * scale + 'px';
    image.style.height = image.naturalHeight * scale + 'px';
  }
  function show(next) {
    index = (next + photos.length) % photos.length;
    zoomed = false;
    zoomButton.textContent = 'Zoom +';
    zoomButton.setAttribute('aria-label', 'Ampliar imagem');
    image.src = photos[index].currentSrc || photos[index].src;
    image.alt = photos[index].alt;
    dialog.querySelector('.viewer-count').textContent = `${index + 1} / ${photos.length}`;
    stage.scrollTo(0, 0);
    resize();
  }
  image.addEventListener('load', resize);
  new ResizeObserver(resize).observe(stage);
  photos.forEach((photo, i) => {
    const trigger = photo.closest('a') || photo;
    trigger.classList.add('image-zoom-trigger');
    trigger.setAttribute('aria-label', 'Ampliar: ' + photo.alt);
    if (trigger === photo) { trigger.tabIndex = 0; trigger.setAttribute('role', 'button'); }
    function open(event) {
      event.preventDefault();
      opener = trigger;
      savedOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
      show(i);
      dialog.querySelector('[data-close]').focus();
    }
    trigger.addEventListener('click', open);
    trigger.addEventListener('keydown', event => {
      if (event.key === ' ' || (event.key === 'Enter' && trigger === photo)) open(event);
    });
  });
  dialog.querySelector('[data-close]').onclick = () => dialog.close();
  dialog.querySelector('[data-prev]').onclick = () => show(index - 1);
  dialog.querySelector('[data-next]').onclick = () => show(index + 1);
  zoomButton.onclick = () => {
    zoomed = !zoomed;
    zoomButton.textContent = zoomed ? 'Zoom −' : 'Zoom +';
    zoomButton.setAttribute('aria-label', zoomed ? 'Ajustar imagem à tela' : 'Ampliar imagem');
    resize();
    stage.scrollTo(Math.max(0, (stage.scrollWidth - stage.clientWidth) / 2), Math.max(0, (stage.scrollHeight - stage.clientHeight) / 2));
  };
  dialog.addEventListener('close', () => {
    document.body.style.overflow = savedOverflow;
    opener?.focus({preventScroll: true});
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); show(index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  stage.addEventListener('click', event => { if (event.target === stage) dialog.close(); });
  let touchStart;
  stage.addEventListener('touchstart', event => {
    touchStart = !zoomed && event.touches.length === 1 ? {x:event.touches[0].clientX, y:event.touches[0].clientY} : null;
  }, {passive:true});
  stage.addEventListener('touchmove', event => { if (event.touches.length > 1) touchStart = null; }, {passive:true});
  stage.addEventListener('touchend', event => {
    if (!touchStart || zoomed) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) show(index + (dx < 0 ? 1 : -1));
    touchStart = null;
  }, {passive:true});
})();
