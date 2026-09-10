(async () => {
  const index = Number(new URLSearchParams(location.search).get('project') || 0);
  try {
    const html = await fetch('index.html').then((response) => response.text());
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const slides = [...doc.querySelectorAll('[data-slide]')];
    const slide = slides[Math.max(0, Math.min(index, slides.length - 1))];
    const title = slide.querySelector('h3').textContent.trim();
    const category = slide.querySelector('.eyebrow').textContent.trim();
    const description = slide.querySelector('.project-info > p:not(.eyebrow)').textContent.trim();
    const image = slide.querySelector('.project-cover img');
    const link = slide.querySelector('.button-light');
    document.title = `${title} — Leonardo Marcos`;
    document.querySelector('[data-case-title]').textContent = title;
    document.querySelector('[data-case-category]').textContent = category;
    document.querySelector('[data-case-description]').textContent = description;
    document.querySelector('[data-case-image]').src = image.src;
    document.querySelector('[data-case-image]').alt = image.alt;
    document.querySelector('[data-case-behance]').href = link.href;
  } catch (error) { document.querySelector('[data-case-title]').textContent = 'Projeto indisponível'; }
})();
