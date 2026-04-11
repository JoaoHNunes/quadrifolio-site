# Quadrifolio Website - Implementation Plan

## Overview
Multi-page website for Quadrifolio, an art restoration company, built with Jekyll and deployed on GitHub Pages. Features a home page with slider, gallery, and services grid, plus individual service pages and an extended apresentação page. All pages share a common layout via Jekyll templating.

---

## Design Specifications

### Color Palette
- **Header/Footer Background**: Dark gray/charcoal (#333333 - #444444)
- **Main Background**: White (#FFFFFF)
- **Text Primary**: Dark gray (#333333)
- **Text Secondary**: Medium gray (#666666 - #888888)
- **Accent/Links**: Coral/Salmon (#E57373)
- **Hover States**: Darker coral (#D66060)

### Typography
- **Font Family**: Montserrat (Google Fonts)
- **Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold)
- **Headings**: Uppercase, letter-spacing 2-3px, light weight (300)
- **Body Text**: Regular weight (400), line-height 1.6-1.8

### Layout
- **Max Content Width**: 1200px centered (`.container`)
- **Responsive Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

---

## File Structure

```
site-novo/
├── _config.yml                 # Jekyll configuration
├── _data/
│   └── services.yml            # Service data (title, slug, description)
├── _includes/
│   ├── head.html               # <head> content (meta, fonts, CSS)
│   ├── header.html             # Top bar + fixed nav with dropdowns
│   ├── footer.html             # Footer + JS includes
│   └── contact-section.html    # Reusable contact form + Google Maps
├── _layouts/
│   ├── default.html            # Base layout (head + header + content + footer)
│   ├── home.html               # Home layout (adds slider.js)
│   └── service.html            # Service page layout (hero + content + contact)
├── index.html                  # Home page
├── mais.html                   # Extended apresentação page
├── servicos/
│   ├── escultura.html
│   ├── materiais-petreos.html
│   ├── talha-dourada.html
│   ├── pintura-mural.html
│   ├── pintura-cavalete.html
│   ├── estuques-decorativos.html
│   ├── consultadoria.html
│   ├── execucao-pecas.html
│   └── controlo-insetos.html
├── css/
│   ├── styles.css              # Main styles
│   └── responsive.css          # Media queries
├── js/
│   ├── slider.js               # Hero image slider
│   └── main.js                 # Nav, scroll, animations, dropdowns, form
├── assets/
│   └── images/
│       ├── slider/             # 5 hero slider images
│       ├── presentation/       # 6 image strip images
│       └── gallery/            # 16 gallery images
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deploy workflow
├── Gemfile                     # Ruby dependencies
└── .gitignore
```

---

## Implementation Steps

### STEP 1: Jekyll Setup & Templating [DONE]

- [x] `_config.yml` with site title, description, baseurl, permalink: pretty
- [x] `_layouts/default.html` — base HTML skeleton with Liquid includes
- [x] `_layouts/home.html` — extends default, adds slider.js
- [x] `_layouts/service.html` — extends default, service hero + content + contact
- [x] `_includes/head.html` — meta tags, Google Fonts, CSS with `{{ site.baseurl }}`
- [x] `_includes/header.html` — top bar, logo, nav with dropdown menus from `site.data.services`
- [x] `_includes/footer.html` — footer with dynamic year, main.js
- [x] `_includes/contact-section.html` — reusable contact form + map
- [x] `_data/services.yml` — 9 services with title, slug, description
- [x] `.github/workflows/deploy.yml` — GitHub Actions for Jekyll 4 build + deploy
- [x] `Gemfile`, `.gitignore`

### STEP 2: Home Page (index.html) [DONE]

- [x] Hero slider section with 5 slides and quote overlay
- [x] Apresentação section with intro text, image strip, description
- [x] "Saber Mais" button linking to `/mais`
- [x] Gallery section with masonry grid (16 images, mix of regular + large)
- [x] Services section with hero banner + 9 cards generated from `services.yml`
- [x] Service cards link to individual pages (`/servicos/slug`)
- [x] Contact section + map (via include)

### STEP 3: Service Pages [DONE]

- [x] 9 individual service pages in `servicos/` directory
- [x] Each uses `service` layout with front matter (title, service_title, meta_description)
- [x] Content: 3 paragraphs of detailed service description
- [x] "Todos os Serviços" and "Contacte-nos" action buttons
- [x] Contact section included at bottom of each service page
- [x] Services:
  1. Escultura
  2. Materiais Pétreos
  3. Talha Dourada e Policromada
  4. Pintura Mural
  5. Pintura de Cavalete
  6. Estuques Decorativos
  7. Consultadoria
  8. Execução de Peças
  9. Controlo Integrado de Insetos

### STEP 4: Extended Apresentação Page (mais.html) [DONE]

- [x] Full company presentation with all 4 paragraphs
- [x] Image strip
- [x] Uses `default` layout
- [x] Link back to contact section

### STEP 5: CSS Styling [DONE]

- [x] **styles.css**: Complete styles for all sections
  - [x] CSS reset & base styles
  - [x] Top bar, header/nav, hamburger menu
  - [x] Dropdown menus (desktop hover, mobile click-toggle)
  - [x] Hero slider (slides, overlay, dots, arrows)
  - [x] Section styling (titles, containers)
  - [x] Apresentação (intro, image strip, description, button)
  - [x] Gallery (grid, hover effects, large items)
  - [x] Services (hero banner, card grid, hover lift)
  - [x] Contact (two-column layout, form, validation feedback)
  - [x] Map section
  - [x] Footer
  - [x] Service page styles (hero, content body, action buttons)
  - [x] Utility classes (fade-in, form messages, containers)

- [x] **responsive.css**: Media queries for all breakpoints
  - [x] Tablet (1024px): reduced spacing, 2-column services
  - [x] Mobile (768px): hamburger menu, stacked layouts, mobile dropdowns
  - [x] Small mobile (480px): further reductions
  - [x] Landscape orientation
  - [x] Touch device hover handling
  - [x] Print styles
  - [x] Retina display optimizations

### STEP 6: JavaScript [DONE]

- [x] **slider.js**: Auto-advancing carousel with manual controls
  - [x] IIFE encapsulation, CONFIG object
  - [x] Auto-advance every 6 seconds
  - [x] Dot navigation (dynamically created)
  - [x] Arrow controls + keyboard (left/right)
  - [x] Pause on hover, reset on interaction
  - [x] CSS fade transitions

- [x] **main.js**: Navigation and interactions
  - [x] Smooth scroll with header offset
  - [x] Active nav highlighting (Intersection Observer)
  - [x] Mobile menu toggle with animated hamburger
  - [x] Dropdown menus — mobile click-toggle with `dropdown-open` class
  - [x] Dropdown links smooth-scroll to service anchors
  - [x] Scroll animations (fade-in elements)
  - [x] Header scroll effect (`.scrolled` class)
  - [x] Form validation (real-time on blur, submit handler)
  - [x] Form success/error message display

### STEP 7: Content Integration [TODO]

**Required assets — all images are currently missing:**

#### 7.1 Logo
- [ ] Actual logo file (SVG or high-res PNG)
- [ ] Replace inline SVG placeholder in `_includes/header.html`

#### 7.2 Hero Slider Images (5 images)
- [ ] `assets/images/slider/slide-1.jpg` through `slide-5.jpg`
- [ ] High-quality photos showcasing restoration work
- [ ] Recommended: 1920x1080px, JPEG, 300-500 KB each

#### 7.3 Presentation Strip Images (6 images)
- [ ] `assets/images/presentation/img-1.jpg` through `img-6.jpg`
- [ ] Consistent aspect ratio, ~250px tall
- [ ] Recommended: 400x250px, JPEG, 50-100 KB each

#### 7.4 Gallery Images (16 images)
- [ ] `assets/images/gallery/img-1.jpg` through `img-16.jpg`
- [ ] Mix of restoration projects and detail shots
- [ ] Recommended: 800-1200px wide, JPEG, 100-300 KB each

#### 7.5 Section Hero Backgrounds (2 images)
- [ ] Services section hero background
- [ ] Contact section hero background
- [ ] Both: 1920x600px, JPEG, 200-400 KB each
- [ ] Set via CSS background-image on `.section-hero` elements

#### 7.6 Google Maps Embed
- [ ] Generate working embed URL for: Rua dos Lavradores, 13, 3090-476 Maiorca
- [ ] Update iframe src in `_includes/contact-section.html`

#### 7.7 Contact Form Backend
- [ ] Replace simulated submission in `main.js` with real endpoint
- [ ] Options: Formspree, Netlify Forms, or custom backend
- [ ] Add spam protection (reCAPTCHA or honeypot)

### STEP 8: Deployment [TODO]

- [ ] Create GitHub repository
- [ ] Push code to `main` branch
- [ ] Enable GitHub Pages via Settings > Pages > Source: GitHub Actions
- [ ] Verify deploy workflow runs successfully
- [ ] Test live site URL
- [ ] Configure custom domain (if applicable)

### STEP 9: Testing & Optimization [TODO]

#### 9.1 Browser Testing
- [ ] Chrome, Firefox, Safari, Edge
- [ ] Verify all pages render correctly
- [ ] Test navigation between home and service pages

#### 9.2 Responsive Testing
- [ ] Mobile: 320px, 375px
- [ ] Tablet: 768px, 1024px
- [ ] Desktop: 1440px
- [ ] Hamburger menu + mobile dropdowns
- [ ] Touch interactions

#### 9.3 Functionality Testing
- [ ] Hero slider: auto-advance, dots, arrows, keyboard
- [ ] Navigation: all links work from home page and service pages
- [ ] Dropdown menus: desktop hover + mobile toggle
- [ ] Mobile menu: opens, closes, links navigate correctly
- [ ] Contact form: validation, submission
- [ ] Scroll animations trigger correctly
- [ ] Back/forward browser navigation works

#### 9.4 Performance
- [ ] Compress all images (TinyPNG, ImageOptim)
- [ ] Verify page load time < 3 seconds
- [ ] Lazy load gallery images
- [ ] Consider WebP with JPEG fallbacks

#### 9.5 Accessibility
- [ ] Alt text on all images
- [ ] Sufficient color contrast (WCAG AA)
- [ ] Keyboard navigation works throughout
- [ ] ARIA labels on interactive elements
- [ ] Proper heading hierarchy per page

#### 9.6 SEO
- [ ] Unique `<title>` and `meta description` per page (via front matter)
- [ ] Proper heading hierarchy (H1 per page, H2/H3 subsections)
- [ ] Descriptive alt text
- [ ] Semantic HTML5 elements
- [ ] Consider adding JSON-LD structured data (LocalBusiness)
- [ ] Add favicon

---

## Resources Needed

- [ ] Logo file (SVG or high-res PNG)
- [ ] Hero slider images (5 images)
- [ ] Presentation section images (6 images)
- [ ] Gallery images (16 images)
- [ ] Service/Contact section background images (2 images)
- [ ] Contact form submission endpoint
- [ ] Google Maps embed URL for actual address
- [ ] Custom domain (optional)
