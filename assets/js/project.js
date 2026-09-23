(() => {
  const projects = window.PORTFOLIO || [];
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  const numeric = params.get('project');
  const project = slug ? projects.find(p => p.slug === slug) : projects[Number(numeric || 0)];
  if (!project) {
    document.querySelector('[data-case-title]').textContent = 'Projeto não encontrado';
    document.querySelector('[data-case-description]').textContent = 'Volte à seleção para conhecer os trabalhos disponíveis.';
    document.querySelector('.case-end').hidden = true;
    document.querySelector('[data-case-behance]').hidden = true;
    return;
  }
  document.title = project.title + ' — LeoMarcos';
  document.querySelector('[data-case-title]').textContent = project.title;
  document.querySelector('[data-case-category]').textContent = 'PROJETO / ' + project.category;
  document.querySelector('[data-case-specialty]').textContent = project.category;
  document.querySelector('[data-case-description]').textContent = project.description;
  document.querySelector('[data-case-behance]').href = project.behance || '#';
  document.querySelector('[data-case-behance]').hidden = !project.behance;
  const documents = project.documents || (project.document ? [{src: project.document, label: 'Abrir PDF completo ↗'}] : []);
  documents.forEach(item => {
    const documentLink = document.createElement('a');
    documentLink.href = item.src;
    documentLink.target = '_blank';
    documentLink.rel = 'noopener';
    documentLink.textContent = item.label;
    documentLink.style.display = 'block';
    documentLink.style.marginBottom = '12px';
    document.querySelector('[data-case-description]').after(documentLink);
  });
  if (project.slug === 'key-visual-marketplace-philips-2eletro') {
    window.renderPhilipsCase(project);
  }
  const gallery = document.querySelector('[data-gallery]');
  gallery.id = 'galeria';
  const jump = document.createElement('a'); jump.href = '#galeria';
  jump.className = 'gallery-jump'; jump.textContent = 'Ver imagens do projeto ↓';
  document.querySelector('.case-overview').after(jump);
  try {
    const back = sessionStorage.getItem('portfolio-return');
    if (back && new URL(back, location.href).origin === location.origin && new URL(back, location.href).pathname.endsWith('/projetos.html')) {
      document.querySelectorAll('.back-link').forEach(link => { link.href = back; });
    }
  } catch {}
  if (project.slug === 'clinica-abbas') {
    const video = document.createElement('figure');
    video.className = 'case-video';
    const player = document.createElement('iframe');
    player.src = 'https://player.vimeo.com/video/1051296242?background=1&autoplay=1&loop=1&muted=1&controls=0&playsinline=1&dnt=1';
    player.title = 'Clínica Abbas — vídeo de apresentação';
    player.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
    player.allowFullscreen = true;
    player.loading = 'lazy';
    const caption = document.createElement('figcaption');
    const link = document.createElement('a');
    link.href = 'https://vimeo.com/1051296242';
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Assistir no Vimeo ↗';
    caption.append(link);
    video.append(player, caption);
    gallery.append(video);
  }
  const videos = project.videos || [];
  videos.forEach(item => {
    const figure = document.createElement('figure');
    figure.className = item.featured ? 'motion-video featured-video' : 'motion-video';
    if (item.vertical) figure.classList.add('vertical-video');
    const player = document.createElement('video');
    player.controls = true;
    player.playsInline = true;
    player.preload = 'none';
    if (item.poster) player.poster = item.poster;
    player.setAttribute('aria-label', item.title);
    const source = document.createElement('source');
    source.src = item.src;
    source.type = 'video/mp4';
    const fallback = document.createElement('a');
    fallback.href = item.src;
    fallback.textContent = 'Abrir vídeo: ' + item.title;
    player.append(source, fallback);
    player.addEventListener('play', () => {
      gallery.querySelectorAll('video').forEach(other => { if (other !== player) other.pause(); });
    });
    const caption = document.createElement('figcaption');
    caption.textContent = item.title;
    figure.append(player, caption);
    gallery.append(figure);
  });
  const images = project.caseLayout ? [] : project.gallery.length ? project.gallery : videos.length ? [] : [{src:project.cover,width:808,height:632}];
  images.forEach((item, index) => {
    if (item.section) {
      const heading = document.createElement('h2');
      heading.className = 'gallery-section-title';
      heading.textContent = item.section;
      gallery.append(heading);
    }
    const figure = document.createElement('figure');
    if (item.height > item.width * 1.15 && index > 0) figure.className = 'portrait';
    if (item.featured) figure.className = 'featured-image';
    const image = document.createElement('img');
    image.src = item.src; image.alt = project.title + ' — apresentação ' + (index + 1);
    image.width = item.width; image.height = item.height; image.loading = index === 0 ? 'eager' : 'lazy';
    image.decoding = 'async';
    figure.append(image);
    if (item.title) {
      image.alt = item.title;
      const caption = document.createElement('figcaption');
      caption.textContent = item.title;
      figure.append(caption);
    }
    if (item.featured) gallery.insertBefore(figure, gallery.querySelector('.motion-video'));
    else gallery.append(figure);
  });
  if (project.slug === 'key-visual-maes') {
    const print = gallery.querySelector('img[src="assets/images/cases/key-visual-maes/impresso.png"]')?.closest('figure');
    const reel = gallery.querySelector('source[src="assets/videos/dia-das-maes/reels.mp4"]')?.closest('figure');
    if (print && reel) {
      const pair = document.createElement('div');
      pair.className = 'print-reel-pair';
      gallery.insertBefore(pair, print);
      pair.append(print, reel);
    }
  }
  if (!project.caseLayout && !project.gallery.length && !videos.length) {
    const note = document.createElement('p'); note.className = 'gallery-note';
    note.append('Veja a seleção completa' + (/motion/i.test(project.category) ? ' de vídeos e animações' : ' de peças') + ' deste projeto no ');
    const source = document.createElement('a'); source.href = project.behance; source.target = '_blank'; source.rel = 'noopener'; source.textContent = 'Behance ↗';
    note.append(source); gallery.append(note);
  }
  if (project.story) {
    const story = document.createElement('section');
    story.className = 'case-story';
    const heading = document.createElement('h2');
    heading.textContent = project.story.title;
    story.append(heading);
    project.story.paragraphs.forEach(text => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      story.append(paragraph);
    });
    gallery.append(story);
  }
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const link = document.querySelector('[data-next-project]');
  link.href = 'project.html?slug=' + encodeURIComponent(next.slug);
  link.querySelector('strong').textContent = next.title;
})();
