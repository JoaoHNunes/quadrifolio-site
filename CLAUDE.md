# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-page website for **Quadrifólio - Conservação e Restauro, Lda.**, a Portuguese art restoration company certified by the Instituto dos Museus e da Conservação. The site is a classic, elegant single-page design built with vanilla HTML, CSS, and JavaScript (no frameworks).

**Language**: Portuguese (pt)

## Architecture

### Technology Stack
- **HTML5**: Semantic structure with single-page design
- **CSS3**: Modular stylesheets with separate responsive layer
- **Vanilla JavaScript**: No frameworks, uses modern APIs (Intersection Observer, ES6+)
- **Google Fonts**: Montserrat font family

### File Structure
```
site-novo/
├── index.html              # Single-page HTML with all sections
├── css/
│   ├── styles.css          # Main styles (sections 2.1-2.11 from plan)
│   └── responsive.css      # Media queries for tablet/mobile
├── js/
│   ├── slider.js           # Hero image slider (auto-advance + manual)
│   └── main.js             # Navigation, scroll effects, mobile menu, form
└── assets/
    └── images/             # Empty - needs content (see IMPLEMENTATION_PLAN.md)
        ├── slider/         # Hero slider images (5 expected)
        ├── presentation/   # Image strip (6 expected)
        └── gallery/        # Gallery images (16 expected)
```

### Key Sections
The single-page site contains these sections (in order):
1. **Top Bar**: Email contact link (`quadrifolio@sapo.pt`)
2. **Fixed Header**: Logo + navigation (sticky after top bar)
3. **Hero Slider** (#inicio): 5-slide auto-advancing carousel with quote overlay
4. **APRESENTAÇÃO** (#apresentacao): Company intro with image strip
5. **GALERIA** (#galeria): Masonry grid of restoration projects
6. **SERVIÇOS** (#servicos): 6 service cards in 3×2 grid
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

## JavaScript Architecture

### slider.js
- **IIFE pattern** for encapsulation
- Auto-advance every 6 seconds (CONFIG.autoAdvanceInterval)
- Manual controls: dots, arrows, keyboard (←/→)
- Pauses on hover, resets timer on manual interaction
- Uses CSS transitions for fade effects
- Creates dots dynamically from slide count

### main.js
- **IIFE pattern** for encapsulation
- **Smooth scroll**: Handles internal anchor links with header offset
- **Active nav highlighting**: Uses Intersection Observer with -20%/70% margins
- **Mobile menu**: Toggles with hamburger, closes on outside click/ESC
- **Scroll animations**: Fades in elements using Intersection Observer
- **Header scroll effect**: Adds `.scrolled` class after 50px scroll
- **Form validation**:
  - Required: nome, email, mensagem
  - Optional: telefone (validates Portuguese format if provided)
  - Real-time validation on blur
  - Simulated submission (replace with backend endpoint)

## Common Development Commands

Since this is a static HTML site, there are no build commands. Development workflow:

1. **Local Development**: Open `index.html` in a browser or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000

   # PHP
   php -S localhost:8000
   ```

2. **Testing**: Manual browser testing (no test suite)
   - Test in Chrome, Firefox, Safari, Edge
   - Use browser DevTools for responsive testing
   - Test breakpoints: 320px, 375px, 768px, 1024px, 1440px

3. **Image Optimization**: Before adding images to `assets/images/`, compress them:
   - Use TinyPNG, ImageOptim, or similar
   - JPEG for photos, PNG for graphics
   - Consider WebP with fallbacks

## Important Implementation Notes

### Missing Content
The site structure is complete but **images are missing**. See `IMPLEMENTATION_PLAN.md` Step 6 for required assets:
- 5 hero slider images (restoration work showcase)
- 6 presentation section images
- 16 gallery images
- Service section hero background
- Contact section hero background

### Form Submission
The contact form currently uses a **simulated submission** (see `main.js:448-493`). To make it functional:
1. Replace the `setTimeout` simulation with a real AJAX call
2. Set up backend endpoint (commented example in code uses `/api/contact`)
3. Update success/error handling as needed

### Google Maps
The embedded iframe uses a placeholder URL. Update with actual coordinates:
- **Address**: Rua dos Lavradores, 13, 3090-476 Maiorca, Figueira da Foz
- Generate proper embed URL from Google Maps

### Logo
Currently uses inline SVG (two concentric squares). Replace with actual logo in `index.html:35-40` if provided.

## Code Style Guidelines

### CSS
- Organized by sections matching IMPLEMENTATION_PLAN.md numbering
- Use BEM-like naming for clarity (e.g., `.service-card`, `.service-title`)
- Maintain 1200px max-width for centered content (`.container`)
- Full-width sections use `.container-full`

### JavaScript
- Use strict mode
- IIFE pattern for module encapsulation
- CONFIG objects for magic numbers
- Comprehensive comments with JSDoc-style function headers
- Early returns for guard clauses
- Intersection Observer API for performance (scroll animations, active nav)

### HTML
- Semantic HTML5 elements (`<section>`, `<nav>`, `<header>`, `<footer>`)
- Proper ARIA attributes (especially for interactive elements)
- Portuguese language (`lang="pt"`)
- Descriptive alt text for images (accessibility)

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

- **IMPLEMENTATION_PLAN.md**: Comprehensive 7-step implementation plan with detailed specifications for each section, timeline estimates, and required resources
