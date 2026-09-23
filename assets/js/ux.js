(() => {
  const main = document.querySelector('main');
  if (main) {
    main.id ||= 'conteudo'; main.tabIndex = -1;
    const skip = document.createElement('a'); skip.href = '#' + main.id;
    skip.className = 'skip-link'; skip.textContent = 'Pular para o conteúdo';
    document.body.prepend(skip);
  }
  const top = document.createElement('a'); top.href = '#'; top.className = 'back-top';
  top.textContent = '↑ Voltar ao topo'; top.hidden = true; document.body.append(top);
  let pending = false;
  window.addEventListener('scroll', () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { top.hidden = window.scrollY < 700; pending = false; });
  }, {passive:true});
})();
