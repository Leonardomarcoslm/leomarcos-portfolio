(() => {
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setMenu = (open) => {
    body.classList.toggle('menu-open', open);
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menu.inert = !open;
    document.querySelector('main').inert = open;
    document.querySelector('footer').inert = open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  setMenu(false);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
    if (event.key === 'Tab' && menu.classList.contains('is-open')) {
      const links = [...menu.querySelectorAll('a')];
      const first = links[0], last = links[links.length - 1];
      if (document.activeElement === toggle) { event.preventDefault(); (event.shiftKey ? last : first).focus(); }
      else if ((!event.shiftKey && document.activeElement === last) || (event.shiftKey && document.activeElement === first)) { event.preventDefault(); toggle.focus(); }
    }
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) setMenu(false); });

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    header.classList.toggle('is-hidden', current > lastScroll && current > 160 && !body.classList.contains('menu-open'));
    lastScroll = current;
  }, { passive: true });

  const reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -40px' });
    reveals.forEach((item) => observer.observe(item));
  }

  const heroSlides = [...document.querySelectorAll('.hero-project-slide')];
  const heroCurrent = document.querySelector('[data-hero-current]');
  let heroActive = 0;
  if (heroSlides.length) {
    heroSlides.forEach((slide, index) => slide.classList.toggle('is-active', index === 0));
    if (!reduceMotion && heroSlides.length > 1) window.setInterval(() => {
      if (document.hidden || window.scrollY > window.innerHeight || heroPaused) return;
      heroActive = (heroActive + 1) % heroSlides.length;
      heroSlides.forEach((slide, index) => slide.classList.toggle('is-active', index === heroActive));
      if (heroCurrent) heroCurrent.textContent = String(heroActive + 1).padStart(2, '0');
    }, 5200);
  }
  let heroPaused = false;
  if (heroSlides.length > 1 && !reduceMotion) {
    const pause = document.createElement('button');
    pause.className = 'hero-pause'; pause.textContent = 'Pausar apresentação';
    pause.setAttribute('aria-pressed', 'false');
    document.querySelector('[data-hero-slider]').after(pause);
    pause.addEventListener('click', () => {
      heroPaused = !heroPaused;
      pause.textContent = heroPaused ? 'Retomar apresentação' : 'Pausar apresentação';
      pause.setAttribute('aria-pressed', String(heroPaused));
    });
  }

  const slides = [...document.querySelectorAll('[data-slide]')];
  const counter = document.querySelector('[data-current]');
  const total = document.querySelector('[data-total]');
  let active = 0;
  let visibleSlides = slides;
  slides.forEach((slide, index) => {
    const link = slide.querySelector('.button-light');
    if (link) { link.dataset.behance = link.href; link.href = `project.html?project=${index}`; link.removeAttribute('target'); }
  });
  if (total) total.textContent = String(slides.length).padStart(2, '0');
  const showSlide = (index) => {
    if (!visibleSlides.length) return;
    active = (index + visibleSlides.length) % visibleSlides.length;
    slides.forEach((slide) => {
      const selected = slide === visibleSlides[active];
      slide.classList.toggle('is-active', selected);
      slide.setAttribute('aria-hidden', String(!selected));
      slide.inert = !selected;
    });
    if (counter) counter.textContent = String(active + 1).padStart(2, '0');
  };
  document.querySelector('[data-prev]').addEventListener('click', () => showSlide(active - 1));
  document.querySelector('[data-next]').addEventListener('click', () => showSlide(active + 1));
  showSlide(0);

  const categoryMatch = (slide, filter) => {
    const text = slide.querySelector('.eyebrow')?.textContent.toLowerCase() || '';
    const maps = { branding:['branding','identidade'], motion:['motion','film'], fotografia:['fotografia'], social:['social'], ux:['ux/ui','product'], campanha:['campanha','e-commerce','ads','retail'] };
    return filter === 'all' || (maps[filter] || []).some((term) => text.includes(term));
  };
  document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach((item) => {
      item.classList.toggle('is-active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    visibleSlides = slides.filter((slide) => categoryMatch(slide, button.dataset.filter));
    slides.forEach((slide) => slide.classList.toggle('is-filtered-out', !visibleSlides.includes(slide)));
    active = 0; if (total) total.textContent = String(visibleSlides.length).padStart(2, '0'); showSlide(0);
  }));

  document.querySelectorAll('.service-item .service-row').forEach((row, index) => {
    const item = row.closest('.service-item'), detail = item.querySelector('.service-detail');
    detail.id = 'service-detail-' + index;
    detail.inert = !item.classList.contains('is-open');
    row.setAttribute('aria-controls', detail.id);
    row.setAttribute('aria-expanded', String(!detail.inert));
    row.addEventListener('click', () => {
      const open = item.classList.toggle('is-open');
      row.setAttribute('aria-expanded', String(open)); detail.inert = !open;
    });
  });

  document.querySelector('[data-budget-form]')?.addEventListener('submit', (event) => {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    const text = `Olá Leonardo! Meu nome é ${data.get('name')}. Empresa: ${data.get('company') || 'não informado'}. Serviço: ${data.get('service')}. Projeto: ${data.get('message')}`;
    window.open(`https://wa.me/5531996310255?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });

  document.querySelector('[data-year]').textContent = new Date().getFullYear();

  if (!reduceMotion) {
    const orbit = document.querySelector('.hero-orbit');
    if (orbit) window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight * 1.2) orbit.style.translate = `0 ${window.scrollY * 0.05}px`;
    }, { passive: true });
  }
})();
