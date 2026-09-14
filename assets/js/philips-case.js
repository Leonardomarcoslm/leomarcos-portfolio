window.renderPhilipsCase = function (project) {
  const root = document.querySelector('[data-gallery]');
  root.classList.add('philips-case');
  const base = 'assets/images/cases/philips-2eletro/';
  const art = (file, alt, eager = false) => `<figure><a href="${base + file}" target="_blank" rel="noopener" aria-label="Ampliar: ${alt}"><img src="${base + file}" width="1920" height="480" loading="${eager ? 'eager' : 'lazy'}" alt="${alt}"></a></figure>`;
  const heading = (number, title, text = '') => `<div class="kv-heading"><p class="folio-eyebrow">${number}</p><h2>${title}</h2>${text ? `<p>${text}</p>` : ''}</div>`;
  document.querySelector('meta[name="description"]').content = project.description;
  root.innerHTML = `
    ${art('campanha-09-09.png', '09.09 — Um dia de preços incríveis. Airfryer AI551 e PerfectCare GC6842.', true)}
    <section class="kv-section kv-overview">${heading('01 / PROJECT OVERVIEW', 'Três momentos.<br>Um sistema visual.')}
      <div><p>Direção de arte e conceito visual para as campanhas da 2Eletro em parceria com a Philips Walita. Cada ativação tem seu próprio Key Visual, mantendo consistência entre marcas, produtos e comunicação promocional.</p><p>Na loja oficial no Mercado Livre, os banners conectam a comunicação da campanha à descoberta dos produtos.</p><dl><div><dt>Cliente</dt><dd>2Eletro × Philips Walita</dd></div><div><dt>Ano</dt><dd>2026</dd></div><div><dt>Atuação</dt><dd>Art Direction · Key Visual · E-commerce</dd></div><div><dt>Plataforma</dt><dd>Mercado Livre</dd></div></dl></div></section>
    <section class="kv-section">${heading('02 / CAMPAIGN ARCHITECTURE', 'Setembro em três ativações.')}
      <ol class="kv-timeline"><li><strong>09.09</strong><h3>Preços incríveis</h3><p>AI551 · GC6842</p></li><li><strong>15.09</strong><h3>Mês do Cliente</h3><p>HD9350 · HU1510 · PSG6064</p></li><li><strong>21.09</strong><h3>Espresso Week</h3><p>EP4441</p></li></ol></section>
    <section class="kv-campaign">${heading('03 / 09.09 CAMPAIGN', 'Um dia de preços incríveis.', 'Produtos protagonistas, ambientação doméstica e comunicação promocional de alto impacto.')}${art('campanha-09-09.png', 'Key Visual completo da campanha 09.09 — 2Eletro e Philips Walita')}</section>
    <section class="kv-campaign">${heading('04 / CUSTOMER MONTH', 'Mês do Cliente.', 'Uma nova seleção de produtos dentro do mesmo universo visual: iluminação acolhedora, identificação de modelos e linhas gráficas.')}${art('mes-cliente.png', 'Mês do Cliente — chaleira HD9350, umidificador HU1510 e PerfectCare PSG6064')}</section>
    <section class="kv-campaign">${heading('05 / ESPRESSO WEEK', 'O café perfeito a um toque.', 'O universo do café traz uma atmosfera de lifestyle, com foco na experiência e na cafeteira Philips EP4441.')}${art('espresso-week.png', 'Espresso Week — cafeteira Philips EP4441 em uma composição de lifestyle')}</section>
    <section class="kv-section">${heading('06 / MARKETPLACE JOURNEY', 'Do Key Visual ao produto.', 'Cada banner funciona como uma porta de entrada para uma campanha específica. A identidade visual acompanha a navegação até a seleção de produtos.')}<ol class="kv-timeline kv-journey"><li><strong>01</strong><h3>Loja oficial</h3></li><li><strong>02</strong><h3>Banner da campanha</h3></li><li><strong>03</strong><h3>Página da campanha</h3></li><li><strong>04</strong><h3>Produtos</h3></li></ol></section>
    <section class="kv-section kv-application">${heading('07 / FROM KV TO MARKETPLACE', 'A campanha em aplicação.', 'Registro da página da loja oficial: banner, composição com pontos de produto, ofertas e vídeos. A comunicação mantém continuidade ao longo da página.')}<figure><a href="${base}marketplace.png" target="_blank" rel="noopener" aria-label="Ampliar aplicação da campanha no Mercado Livre"><img src="${base}marketplace.png" width="1061" height="1735" loading="lazy" alt="Aplicação real da campanha 09.09 na loja oficial 2Eletro no Mercado Livre, com produtos e vídeos"></a><figcaption>Aplicação no marketplace · registro fornecido do projeto</figcaption></figure></section>
    <section class="kv-section">${heading('08 / VISUAL LANGUAGE', 'Varejo + percepção premium.')}<div class="kv-language"><div><h3>Ambientação</h3><p>Ambientes domésticos e iluminação aproximam os produtos do contexto de uso.</p></div><div><h3>Produto em foco</h3><p>Composição, escala e tratamento de imagem destacam cada modelo.</p></div><div><h3>Linhas gráficas</h3><p>Elementos que conectam produtos e dão continuidade ao sistema.</p></div><div><h3>Identificação</h3><p>Labels integrados ao KV facilitam o reconhecimento dos produtos.</p></div><div><h3>Tipografia</h3><p>Hierarquia clara e mensagens de leitura rápida no marketplace.</p></div><div><h3>Consistência</h3><p>Uma linguagem promocional compartilhada entre diferentes ativações.</p></div></div></section>
    <section class="kv-campaign">${heading('09 / CONTINUIDADE VISUAL', 'Sua rotina mais prática.', 'Peça de agosto: outra aplicação da parceria 2Eletro + Philips Walita.')}${art('agosto.png', 'Campanha de agosto — Airfryer AI551, cafeteira EP4441 e PerfectCare GC6842')}</section>
    <section class="kv-section">${heading('10 / MY ROLE', 'Direção de arte.<br>Da ideia à aplicação.')}<p class="kv-roles">Visual Concept · Key Visual Development · Campaign Design · E-commerce Design · Marketplace Experience · Product Composition · Image Treatment · Digital Advertising · AI-assisted Image Production</p></section>
    <section class="kv-section kv-closing"><p class="folio-eyebrow">2Eletro × Philips Walita / 2026</p><h2>Um sistema visual.<br>Múltiplos momentos.</h2><p>Art Direction & Key Visual Development<br>Leonardo Marcos</p></section>`;
  const application = root.querySelector('.kv-application');
  application.querySelector('figure').innerHTML = `
    <div class="kv-laptop" aria-label="Mockup de notebook com a página da loja 2Eletro">
      <div class="kv-laptop-lid"><span class="kv-camera" aria-hidden="true"></span>
        <div class="kv-browser-bar" aria-hidden="true"><span>● ● ●</span><span>2Eletro · Loja oficial / Mercado Livre</span></div>
        <div class="kv-laptop-screen"><img src="${base}marketplace.png" width="1061" height="1735" loading="lazy" alt="Página da campanha 09.09 da 2Eletro no Mercado Livre, com banners, produtos e vídeos"></div>
      </div><div class="kv-laptop-base" aria-hidden="true"><span></span></div>
    </div>
    <figcaption class="kv-mockup-controls"><span>Aplicação no marketplace · demonstração animada</span><button type="button" data-scroll-toggle>Pausar rolagem</button><a href="${base}marketplace.png" target="_blank" rel="noopener">Ver página completa ↗</a></figcaption>`;
  const screen = application.querySelector('.kv-laptop-screen');
  const screenshot = screen.querySelector('img');
  const button = application.querySelector('[data-scroll-toggle]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let visible = false;
  let animation;
  function sync() {
    if (animation) visible && !paused ? animation.play() : animation.pause();
    button.textContent = paused ? 'Iniciar rolagem' : 'Pausar rolagem';
    button.setAttribute('aria-label', paused ? 'Iniciar rolagem automática da página' : 'Pausar rolagem automática da página');
  }
  function sizeAnimation() {
    const progress = animation ? Number(animation.currentTime || 0) : 0;
    animation?.cancel();
    const distance = Math.max(0, screenshot.getBoundingClientRect().height - screen.clientHeight);
    animation = screenshot.animate([
      {transform:'translateY(0)', offset:0},
      {transform:'translateY(0)', offset:0.08},
      {transform:`translateY(-${distance}px)`, offset:0.92},
      {transform:`translateY(-${distance}px)`, offset:1}
    ], {duration:50000, iterations:Infinity, direction:'alternate', easing:'linear'});
    animation.currentTime = progress;
    sync();
  }
  button.addEventListener('click', () => { paused = !paused; sync(); });
  reducedMotion.addEventListener('change', event => { paused = event.matches; sync(); });
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, {threshold:0.15}).observe(screen);
  new ResizeObserver(sizeAnimation).observe(screen);
  screenshot.addEventListener('load', sizeAnimation);
  sync();
};
