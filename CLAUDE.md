# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multi-page website for **Quadrifólio - Conservação e Restauro, Lda.**, a Portuguese art restoration company certified by the Instituto dos Museus e da Conservação. Built with **Jekyll** for GitHub Pages deployment, using vanilla CSS and JavaScript (no frameworks).

**Language**: Portuguese (pt)

## Architecture

### Technology Stack
- **Jekyll 4.x**: Static site generator with Liquid templating
- **HTML5**: Semantic structure
- **CSS3**: Modular stylesheets with separate responsive layer
- **Vanilla JavaScript**: Modern APIs (Intersection Observer, ES6+)
- **Google Fonts**: Montserrat font family
- **GitHub Actions**: Automated build and deploy to GitHub Pages

### File Structure
```
site-novo/
├── _config.yml                 # Jekyll configuration
├── _data/
│   └── services.yml            # Service data (feeds nav + home page cards)
├── _includes/
│   ├── head.html               # <head> meta, fonts, CSS links
│   ├── header.html             # Top bar + fixed nav with dropdowns
│   ├── footer.html             # Footer + JS includes
│   └── contact-section.html    # Reusable contact form + map
├── _layouts/
│   ├── default.html            # Base layout (all pages)
│   ├── home.html               # Home layout (adds slider.js)
│   └── service.html            # Service page layout (hero + content + contact)
├── index.html                  # Home page content
├── mais.html                   # Extended apresentação page
├── servicos/
│   ├── escultura.html          # 9 individual service pages
│   ├── materiais-petreos.html  #   each uses service layout
│   ├── talha-dourada.html      #   with front matter for
│   ├── pintura-mural.html      #   title and description
│   ├── pintura-cavalete.html
│   ├── estuques-decorativos.html
│   ├── consultadoria.html
│   ├── execucao-pecas.html
│   └── controlo-insetos.html
├── css/
│   ├── styles.css              # Main styles
│   └── responsive.css          # Media queries for tablet/mobile
├── js/
│   ├── slider.js               # Hero image slider (home page only)
│   └── main.js                 # Navigation, scroll effects, mobile menu, dropdowns, form
├── assets/
│   └── images/                 # Needs content (see IMPLEMENTATION_PLAN.md)
│       ├── slider/             # Hero slider images (5 expected)
│       ├── presentation/       # Image strip (6 expected)
│       └── gallery/            # Gallery images (16 expected)
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deploy workflow
├── Gemfile                     # Ruby dependencies (Jekyll 4.x)
└── .gitignore                  # Excludes _site, caches, Gemfile.lock
```

### Page Structure
- **Home** (`index.html`): Hero slider, apresentação, gallery, services grid, contact, map
- **Mais** (`mais.html`): Extended company presentation
- **9 Service Pages** (`servicos/*.html`): Individual pages for each service area
- All pages share header/footer/nav via Jekyll includes

### Key Sections (Home Page)
1. **Top Bar**: Email contact link (`quadrifolio@sapo.pt`)
2. **Fixed Header**: Logo + navigation with dropdown menus (sticky after top bar)
3. **Hero Slider** (#inicio): 5-slide auto-advancing carousel with quote overlay
4. **APRESENTAÇÃO** (#apresentacao): Company intro with image strip
5. **GALERIA** (#galeria): Masonry grid of restoration projects
6. **SERVIÇOS** (#servicos): 9 service cards in 3x3 grid, linking to individual pages
7. **CONTACTE-NOS** (#contacte-nos): Contact info + form (2-column layout)
8. **Map**: Embedded Google Maps iframe
9. **Footer**: Copyright and certification info

## Design System

### Colors
- **Primary Accent**: Coral/salmon `#E57373` (links, hover states, logo)
- **Hover Accent**: Darker coral `#D66060`
- **Text Primary**: Dark gray `#333333`
- **Text Secondary**: Medium gray `#666666 - #888888`
- **Background**: White `#FFFFFF`
- **Header/Footer**: Dark charcoal `#333333 - #444444`

### Typography
- **Font**: Montserrat (weights: 300, 400, 500, 600)
- **Headings**: Uppercase, 2-3px letter-spacing, light weight
- **Section Titles**: `.section-title` class, consistently styled
- **Body**: 16px base, 1.6-1.8 line-height

### Responsive Breakpoints
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px (reduced spacing, 2-column services)
- **Mobile**: < 768px (stacked layouts, hamburger menu)

## Jekyll Architecture

### Data-Driven Content
- **`_data/services.yml`**: Single source of truth for all 9 services (title, slug, description)
- Used by `_includes/header.html` to auto-generate the SERVIÇOS dropdown menu
- Used by `index.html` to auto-generate service cards on the home page
- Adding a new service = add entry to `services.yml` + create a page in `servicos/`

### Layouts
- **`default.html`**: Base HTML skeleton — head, header, `{{ content }}`, footer
- **`home.html`**: Extends default, adds `slider.js` script (only needed on home page)
- **`service.html`**: Extends default, wraps content in hero banner + service page structure, includes contact section at bottom

### Includes
- **`head.html`**: All `<head>` content, uses `{{ site.baseurl }}` for asset paths
- **`header.html`**: Top bar + sticky nav, dropdown menus generated from `site.data.services`
- **`footer.html`**: Footer + main.js, dynamic copyright year via `{{ 'now' | date: "%Y" }}`
- **`contact-section.html`**: Full contact form + map, reused on home page and service pages

### Front Matter
Every page requires YAML front matter:
```yaml
---
layout: home|default|service
title: "Page Title"
service_title: "Service Name"        # service layout only
meta_description: "SEO description"  # optional, falls back to site.description
---
```

### URL Structure
- `permalink: pretty` in `_config.yml` gives clean URLs:
  - `/servicos/escultura/` instead of `/servicos/escultura.html`
  - `/mais/` instead of `/mais.html`

## JavaScript Architecture

### slider.js (home page only)
- **IIFE pattern** for encapsulation
- Auto-advance every 6 seconds (CONFIG.autoAdvanceInterval)
- Manual controls: dots, arrows, keyboard (left/right)
- Pauses on hover, resets timer on manual interaction
- Uses CSS transitions for fade effects
- Creates dots dynamically from slide count

### main.js (all pages)
- **IIFE pattern** for encapsulation
- **Smooth scroll**: Handles internal anchor links with header offset
- **Active nav highlighting**: Uses Intersection Observer with -20%/70% margins
- **Mobile menu**: Toggles hamburger with animated X, closes on outside click/ESC
- **Dropdown menus**: Desktop hover (CSS), mobile click-to-toggle (JS)
- **Scroll animations**: Fades in elements using Intersection Observer
- **Header scroll effect**: Adds `.scrolled` class after 50px scroll
- **Form validation**:
  - Required: nome, email, mensagem
  - Optional: telefone (validates Portuguese format if provided)
  - Real-time validation on blur
  - Simulated submission (replace with backend endpoint)

## Common Development Commands

### Local Development with Jekyll
```bash
# Install dependencies
gem install jekyll

# Build the site
jekyll build

# Serve locally with live reload
jekyll serve
# Site available at http://localhost:4000

# Build for production
JEKYLL_ENV=production jekyll build
```

### Without Jekyll (static preview of source files)
```bash
# Python 3
python -m http.server 8000

# Note: Liquid tags won't be processed — use jekyll serve for full preview
```

### Testing
- Manual browser testing (no test suite)
- Test in Chrome, Firefox, Safari, Edge
- Use browser DevTools for responsive testing
- Test breakpoints: 320px, 375px, 768px, 1024px, 1440px

### Image Optimization
Before adding images to `assets/images/`, compress them:
- Use TinyPNG, ImageOptim, or similar
- JPEG for photos, PNG for graphics
- Consider WebP with fallbacks
- Aim for 200-500 KB per image, 1600px max width (1920px for full-width banners)

## Deployment (GitHub Pages)

### Setup
1. Create a GitHub repository
2. Push code to `main` branch
3. Go to **Settings > Pages > Source** and select **GitHub Actions**
4. The `.github/workflows/deploy.yml` workflow handles build and deploy automatically

### How It Works
- On push to `main`, GitHub Actions runs the Jekyll build
- Uses Ruby 3.3 + Jekyll 4.x (not the older GitHub Pages built-in Jekyll 3.9)
- Deploys to GitHub Pages automatically
- `baseurl` is set dynamically from the repository name

## Important Implementation Notes

### Missing Content
The site structure is complete but **images are missing**. See `IMPLEMENTATION_PLAN.md` Step 6 for required assets:
- 5 hero slider images (restoration work showcase)
- 6 presentation section images
- 16 gallery images
- Service section hero background
- Contact section hero background

### Form Submission
The contact form currently uses a **simulated submission** (see `js/main.js`). To make it functional:
1. Replace the `setTimeout` simulation with a real AJAX call
2. Options: Formspree, Netlify Forms, or custom backend endpoint
3. Update success/error handling as needed

### Google Maps
The embedded iframe uses a placeholder URL. Update with actual coordinates:
- **Address**: Rua dos Lavradores, 13, 3090-476 Maiorca, Figueira da Foz
- Generate proper embed URL from Google Maps

### Logo
Currently uses inline SVG (two concentric squares). Replace with actual logo if provided.

## CSS Class Naming Conventions

### CSS
- Organized by sections matching IMPLEMENTATION_PLAN.md numbering
- Use BEM-like naming (e.g., `.service-card`, `.service-title`, `.section-hero-title`)
- `.container` = 1200px max-width centered content
- `.container-full` = full-width sections
- `.section-hero` / `.section-hero-overlay` / `.section-hero-content` / `.section-hero-title` = hero banner pattern
- `.btn-outline` = bordered button, `.btn-accent` = coral-colored variant

### JavaScript
- Use strict mode
- IIFE pattern for module encapsulation
- CONFIG objects for magic numbers
- Elements selected by ID (`#header`, `#hamburger`) or class (`.nav-menu`, `.nav-link`)
- Mobile menu toggled via `.active` class on `.nav-menu` and `.hamburger`
- Dropdowns toggled via `.dropdown-open` class on `.nav-item`

### HTML
- Semantic HTML5 elements (`<section>`, `<nav>`, `<header>`, `<footer>`)
- Proper ARIA attributes (especially for interactive elements)
- Portuguese language (`lang="pt"`)
- Descriptive alt text for images (accessibility)
- Jekyll Liquid tags for asset paths: `{{ site.baseurl }}/path/to/asset`

## Browser Support

Target: Modern browsers (ES6+ JavaScript, CSS Grid, Intersection Observer)
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

No IE11 support (uses modern JavaScript features without transpilation).

## Contact Information (Client)

- **Email**: quadrifolio@sapo.pt
- **Phone**: 233 939 816 / 919 691 019
- **Address**: Rua dos Lavradores, 13, 3090-476 Maiorca, Figueira da Foz

## Reference Documents

- **IMPLEMENTATION_PLAN.md**: Comprehensive implementation plan with detailed specifications
