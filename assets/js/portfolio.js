(() => {
  const projects = window.PORTFOLIO || [];
  const grid = document.querySelector('[data-project-grid]');
  const search = document.createElement('input');
  search.type = 'search'; search.placeholder = 'Buscar por projeto ou especialidade';
  search.setAttribute('aria-label', 'Buscar projetos'); search.className = 'project-search';
  document.querySelector('.folio-filters').before(search);
  const empty = document.createElement('p'); empty.hidden = true;
  empty.textContent = 'Nenhum projeto encontrado. Tente outro termo ou selecione Todos.';
  grid.after(empty);
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const params = new URLSearchParams(location.search);
  let selectedKind = params.get('categoria') || 'all';
  search.value = params.get('busca') || '';
  const categories = { branding: /branding|identidade/i, campanha: /campanha|e-commerce|ads|social/i, motion: /motion|film/i, captacao: /captação/i, foto: /fotografia/i, diagramacao: /diagramação/i, ux: /ux\/ui/i };
  projects.forEach((project, index) => {
    const card = document.createElement('a');
    card.className = 'folio-card';
    if (project.caseLayout === 'philips') card.classList.add('kv-card');
    card.href = 'project.html?slug=' + encodeURIComponent(project.slug);
    card.dataset.category = project.category;
    card.dataset.search = normalize(project.title + ' ' + project.category);
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = project.cover;
    if (project.coverFit === 'contain') img.style.objectFit = 'contain';
    img.alt = 'Projeto ' + project.title;
    img.width = 808; img.height = 632;
    img.loading = index < 2 ? 'eager' : 'lazy';
    img.decoding = 'async';
    const arrow = document.createElement('span');
    arrow.className = 'card-arrow'; arrow.textContent = '↗'; arrow.setAttribute('aria-hidden','true');
    figure.append(img, arrow);
    const info = document.createElement('div'); info.className = 'card-info';
    const text = document.createElement('div');
    const title = document.createElement('h2'); title.textContent = project.title;
    const category = document.createElement('p'); category.textContent = project.category;
    text.append(title, category);
    const number = document.createElement('span'); number.className = 'card-number'; number.textContent = String(index + 1).padStart(2,'0');
    info.append(text, number); card.append(figure, info); grid.append(card);
  });
  const buttons = [...document.querySelectorAll('[data-kind]')];
  function filter(kind) {
    selectedKind = categories[kind] ? kind : 'all';
    let count = 0;
    grid.querySelectorAll('.folio-card').forEach(card => {
      card.hidden = (selectedKind !== 'all' && !categories[selectedKind].test(card.dataset.category)) || !card.dataset.search.includes(normalize(search.value.trim()));
      if (!card.hidden) count++;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.kind === selectedKind)));
    empty.hidden = count > 0;
    const url = new URL(location.href);
    selectedKind === 'all' ? url.searchParams.delete('categoria') : url.searchParams.set('categoria', selectedKind);
    search.value ? url.searchParams.set('busca', search.value) : url.searchParams.delete('busca');
    history.replaceState(null, '', url);
    try { sessionStorage.setItem('portfolio-return', url.pathname + url.search); } catch {}
    document.querySelector('.folio-count').textContent = count + (count === 1 ? ' projeto selecionado' : ' projetos selecionados');
  }
  buttons.forEach(button => button.addEventListener('click', () => filter(button.dataset.kind)));
  search.addEventListener('input', () => filter(selectedKind));
  filter(selectedKind);
})();
