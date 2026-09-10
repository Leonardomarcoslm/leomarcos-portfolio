# Orbital — site institucional

Experiência editorial criada do zero em HTML, CSS e JavaScript, inspirada no ritmo, contraste e proporções da referência indicada. Nenhum código, logo, imagem ou asset proprietário foi copiado; os visuais de projetos são composições abstratas feitas em CSS e podem ser substituídos facilmente.

## Executar localmente

Abra `index.html` diretamente no navegador. Para uma experiência mais fiel (e evitar restrições do navegador), sirva a pasta com um servidor local:

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080`. Não há etapa de build nem dependências locais. As fontes vêm do Google Fonts; sem internet, o site usa as fontes sans-serif de fallback.

## Estrutura

- `index.html`: conteúdo semântico e seções independentes.
- `assets/css/style.css`: tokens, layout, componentes, animações e breakpoints.
- `assets/js/main.js`: menu móvel, reveal, header inteligente, slider e parallax leve.
- `assets/images/placeholders/`: reservado para imagens substituíveis de projetos.

Os breakpoints principais são 1024 px, 768 px e 430 px; a composição também foi preparada para 1920, 1440 e 390 px. `prefers-reduced-motion` remove movimentos não essenciais.

## Migração para WordPress + Elementor Pro

Estrutura recomendada:

```text
wp-content/themes/leomarcosmov/
├── style.css
├── functions.php
├── front-page.php
├── header.php
├── footer.php
├── single-projeto.php
└── assets/
    ├── css/
    ├── js/
    └── images/
```

1. Mova o `<header>` e o menu móvel para `header.php`, e o `<footer>` para `footer.php`.
2. Transforme cada seção de `<main>` em uma seção/container próprio do Elementor ou mantenha a marcação em `front-page.php` com campos dinâmicos.
3. Enfileire `assets/css/style.css` e `assets/js/main.js` em `functions.php` usando `wp_enqueue_style()` e `wp_enqueue_script()`; não cole CSS/JS inline no Elementor.
4. Use Theme Builder para Header, Footer e o template de projeto. Preserve os nomes de classe para reaproveitar o CSS.
5. Troque textos e links por campos do Elementor/ACF. As artes `.project-art` podem virar widgets de imagem ou background de containers.

### Projetos como Custom Post Type

Registre um CPT `projeto` em `functions.php` (ou via CPT UI), com suporte a `title`, `editor`, `thumbnail`, `excerpt` e `revisions`, além de uma taxonomia `categoria_projeto`. Crie campos ACF para subtítulo, categoria curta, imagem/capa, cor de fundo, ordem e URL externa. Em `front-page.php`, consulte os projetos com `WP_Query`; cada post alimenta um slide. Em `single-projeto.php`, monte o case completo usando os mesmos tokens tipográficos e espaçamentos. No Elementor Pro, a alternativa sem PHP de template é criar um Loop Item ligado ao CPT e inserir o Loop Grid dentro da seção de projetos.

Para conteúdo multilíngue ou equipes editoriais, mantenha títulos, descrições e CTAs como campos — nunca gravados no JavaScript.
