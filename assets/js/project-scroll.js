(() => {
  const stage = document.querySelector('[data-slider]');
  if (!stage || !window.PORTFOLIO?.length) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 901px)');
  const panel = document.createElement('aside');
  panel.className = 'scroll-project-info';
  const list = document.createElement('div');
  list.className = 'scroll-project-list';
  const counter = document.querySelector('[data-current]');
  const total = document.querySelector('[data-total]');
  const maps = { branding:['branding','identidade'], campanha:['campanha','e-commerce','ads','social'], motion:['motion','film'], captacao:['captação'], foto:['fotografia'], diagramacao:['diagramação'], ux:['ux/ui'] };
  const records = window.PORTFOLIO.map((project, index) => {
    const card = document.createElement('article');
    card.className = 'scroll-project-card';
    card.id = 'home-project-' + project.slug;
    const href = 'project.html?slug=' + encodeURIComponent(project.slug);
    const art = document.createElement('a');
    art.className = 'scroll-project-cover'; art.href = href;
    art.setAttribute('aria-label', 'Ver projeto ' + project.title);
    const image = document.createElement('img');
    image.src = project.cover; image.alt = project.title;
    image.loading = 'lazy'; image.decoding = 'async';
    if (project.coverFit) image.style.objectFit = project.coverFit;
    art.append(image);
    const info = document.createElement('div'); info.className = 'scroll-project-copy';
    const category = document.createElement('p'); category.className = 'eyebrow'; category.textContent = project.category;
    const title = document.createElement('h3'); title.textContent = project.title;
    const description = document.createElement('p'); description.className = 'scroll-project-description'; description.textContent = project.description;
    const link = document.createElement('a'); link.className = 'button-light'; link.href = href; link.textContent = 'Ver projeto ↗';
    info.append(category, title, description, link);
    card.append(art, info); list.append(card);
    return {card, info, project, index};
  });
  const all = document.createElement('a'); all.href = 'projetos.html';
  all.className = 'scroll-project-all'; all.textContent = 'Ver todos os projetos ↗'; list.append(all);
  stage.classList.remove('reveal');
  stage.classList.add('scroll-projects'); stage.replaceChildren(panel, list);
  let visible = records, active = null, queued = false;
  const select = record => {
    if (!record || active === record) return;
    active = record;
    records.forEach(item => item.card.classList.toggle('is-current', item === record));
    const copy = record.info.cloneNode(true); copy.hidden = false;
    panel.replaceChildren(copy);
    if (counter) counter.textContent = String(visible.indexOf(record) + 1).padStart(2, '0');
  };
  const update = () => {
    queued = false;
    const bounds = stage.getBoundingClientRect();
    if (bounds.bottom < 0 || bounds.top > innerHeight) return;
    const line = innerHeight * .45;
    let nearest = visible[0], distance = Infinity;
    visible.forEach(record => {
      const rect = record.card.getBoundingClientRect();
      const gap = line < rect.top ? rect.top - line : line > rect.bottom ? line - rect.bottom : 0;
      if (gap < distance) { nearest = record; distance = gap; }
    });
    select(nearest);
  };
  const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule);
  // The sidebar is a visual duplicate; mobile uses each card's own description.
  const accessibility = () => {
    panel.hidden = !desktop.matches;
    records.forEach(record => { record.info.hidden = desktop.matches; });
    schedule();
  };
  desktop.addEventListener('change', accessibility);
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(other => {
      other.classList.toggle('is-active', other === button);
      other.setAttribute('aria-pressed', String(other === button));
    });
    const filter = button.dataset.filter;
    visible = records.filter(record => filter === 'all' || (maps[filter] || []).some(term => record.project.category.toLowerCase().includes(term)));
    records.forEach(record => { record.card.hidden = !visible.includes(record); });
    if (total) total.textContent = String(visible.length).padStart(2, '0');
    active = null; select(visible[0]); schedule();
  }));
  const navigate = delta => {
    const index = Math.max(0, Math.min(visible.length - 1, visible.indexOf(active) + delta));
    visible[index]?.card.scrollIntoView({behavior:reduced.matches ? 'instant' : 'smooth', block:'start'});
  };
  document.querySelector('[data-prev]')?.addEventListener('click', () => navigate(-1));
  document.querySelector('[data-next]')?.addEventListener('click', () => navigate(1));
  if (total) total.textContent = String(records.length).padStart(2, '0');
  select(records[0]); accessibility();
})();
