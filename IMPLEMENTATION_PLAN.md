# Quadrifolio Website - Implementation Plan

## Overview
Build a classic, elegant website for Quadrifolio, an art restoration company. The site features a single-page design with smooth scrolling navigation, image slider, gallery, services showcase, and contact form.

---

## Design Specifications

### Color Palette
- **Header/Footer Background**: Dark gray/charcoal (#333333 - #444444)
- **Main Background**: White (#FFFFFF)
- **Text Primary**: Dark gray (#333333)
- **Text Secondary**: Medium gray (#666666 - #888888)
- **Accent/Links**: Coral/Salmon (#E57373 or similar)
- **Hover States**: Slightly darker coral (#D66060)

### Typography
- **Font Family**: Clean sans-serif (Montserrat, Lato, or Open Sans)
- **Headings**: Uppercase, letter-spacing, light weight (300-400)
- **Body Text**: Regular weight (400), good line-height (1.6-1.8)

### Layout
- **Max Content Width**: ~1200px centered
- **Responsive Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

---

## File Structure

```
site-novo/
├── index.html
├── css/
│   ├── styles.css          # Main styles
│   └── responsive.css      # Media queries
├── js/
│   ├── slider.js           # Hero image slider
│   └── main.js             # Navigation, scroll, animations
└── assets/
    ├── images/             # Gallery images, backgrounds
    └── logo.svg            # Quadrifolio logo
```

---

## Implementation Steps

### STEP 1: HTML Structure (index.html)

**Description**: Create the semantic HTML structure for the entire single-page website.

**Details**:

#### 1.1 Document Setup
- HTML5 doctype
- Set language to Portuguese (`lang="pt"`)
- Meta tags: charset UTF-8, viewport for responsive
- Link CSS files
- Link Google Fonts (Montserrat or similar)

#### 1.2 Top Bar
- Dark background strip at very top
- Contains email: `quadrifolio@sapo.pt`
- Positioned above main header
- Right-aligned text

#### 1.3 Header Navigation
- Fixed/sticky header that stays on scroll
- Logo on left: "quadrifolio" text with square icon above
- Navigation menu on right with 5 items:
  - INÍCIO (Home)
  - APRESENTAÇÃO (Presentation) - with dropdown indicator
  - GALERIA (Gallery)
  - SERVIÇOS (Services) - with dropdown indicator
  - CONTACTE-NOS (Contact Us)
- Mobile hamburger menu button (hidden on desktop)

#### 1.4 Hero Slider Section
- Full-width, full-height viewport slider
- Contains multiple background images
- Centered overlay with quote text:
  - "Portadoras de uma mensagem espiritual, as obras artísticas de cada povo são testemunho das suas tradições seculares"
- Semi-transparent dark overlay for text readability
- Navigation dots at bottom
- Left/right arrow controls (optional)

#### 1.5 APRESENTAÇÃO Section
- Section title: "APRESENTAÇÃO" (uppercase, centered)
- Introductory paragraph about company credentials
- Horizontal image strip (multiple images in a row)
- Multiple paragraphs of detailed company description
- "Saber Mais" (Learn More) button - bordered, not filled

#### 1.6 GALERIA Section
- Full-width section with title "GALERIA"
- Grid/masonry layout of restoration project images
- Images in various sizes (larger images for featured work)
- Hover effect on images
- Optional: Lightbox functionality for clicking images

#### 1.7 SERVIÇOS Section
- Hero banner with title "SERVIÇOS" over background image
- Service cards in 3-column grid layout (2 rows):

  **Row 1:**
  - **Escultura**: Conservation and restoration of sculptures in wood, stone, terracotta, plaster, and metal
  - **Materiais Pétreos**: Conservation and restoration of facades, tiles, roofs, domes, fonts, and sculptures
  - **Talha Dourada e Policromada**: Conservation and restoration of altarpieces, ceilings, and other gilded decorative elements

  **Row 2:**
  - **Pintura Mural**: Conservation and restoration of mural paintings (tempera or fresco) on stone, plaster, or stucco, on ceilings and walls
  - **Pintura de Cavalete**: Conservation and restoration of paintings on wood or canvas
  - **Estuques Decorativos**: Conservation and restoration of decorative and ornamental plasterwork

- Each card has:
  - Title (centered)
  - Short description
  - "Leia Mais" (Read More) link in coral color

#### 1.8 CONTACTE-NOS Section
- Hero banner with title "CONTACTE-NOS" over background image
- Two-column layout:

  **Left Column - Contact Information:**
  - Section title: "CONTACTE-NOS"
  - Address:
    - Rua dos Lavradores, 13
    - 3090-476 Maiorca, Figueira da Faz
  - Phone numbers:
    - 233939816
    - 919691019
  - Email: quadrifolio@sapo.pt

  **Right Column - Contact Form:**
  - Fields:
    - Nome (Name) - text input
    - E-mail - email input
    - Telefone (Phone) - tel input
    - Mensagem (Message) - textarea
  - Submit button: "Submeter" (coral background, white text)

#### 1.9 Map Section
- Full-width embedded Google Maps
- Shows company location in Maiorca, Figueira da Faz

#### 1.10 Footer
- Dark background matching header
- Copyright or additional company info
- Optional: Social media links

---

### STEP 2: CSS Styling (css/styles.css)

**Description**: Create comprehensive stylesheet for layout, typography, colors, and visual effects.

**Details**:

#### 2.1 CSS Reset & Base Styles
- Universal box-sizing: border-box
- Remove default margins/padding
- Set base font-family, font-size (16px), line-height (1.6)
- Smooth scroll behavior

#### 2.2 Top Bar Styling
- Background: dark gray (#333)
- Text color: white with slight transparency
- Small font size (13-14px)
- Padding: 8-10px
- Email right-aligned

#### 2.3 Header/Navigation Styling
- Fixed position at top (with top bar offset)
- White background with subtle shadow
- Logo styling: icon + text, left-aligned
- Navigation menu: horizontal list, right-aligned
- Menu items: uppercase, letter-spacing, hover effects
- Dropdown indicators: small chevron icons
- Z-index to stay above content
- Smooth color transitions on hover

#### 2.4 Hero Slider Styling
- Height: 100vh or 600-800px
- Position relative for overlay
- Background images: cover, center
- Dark overlay: rgba(0,0,0,0.3-0.4)
- Quote text:
  - Color: white
  - Font-size: 24-32px
  - Max-width: 800px
  - Centered absolutely
  - Text shadow for readability
- Slider navigation dots:
  - Positioned absolute at bottom
  - Small circles, white borders
  - Active dot filled
  - Clickable with hover effects

#### 2.5 Section Styling (General)
- Section padding: 80-100px vertical
- Max-width: 1200px, centered
- Section titles:
  - Uppercase
  - Letter-spacing: 2-3px
  - Font-weight: 300-400
  - Margin-bottom: 40-60px
  - Text-align: center
  - Color: medium gray (#666-#888)

#### 2.6 APRESENTAÇÃO Section Styling
- Intro text: larger font (18-20px), centered
- Image strip:
  - Display flex or grid
  - Gap between images
  - May need horizontal scroll on mobile
  - Each image: object-fit cover, equal height
- Paragraph text: 16px, line-height 1.8, justified or left-aligned
- "Saber Mais" button:
  - Border: 1-2px solid gray
  - Padding: 12px 30px
  - Uppercase
  - Centered
  - Hover: background fills, text white

#### 2.7 GALERIA Section Styling
- Background: may have subtle gray
- Grid layout: CSS Grid with varying column spans
- Images:
  - Width: 100%
  - Height: auto or fixed with object-fit
  - Border-radius: slight (optional)
  - Transition for hover
- Hover effect:
  - Scale slightly (transform: scale(1.05))
  - Opacity overlay
  - Cursor: pointer

#### 2.8 SERVIÇOS Section Styling
- Hero banner:
  - Background image with overlay
  - Height: 200-300px
  - Title centered, white text
- Service cards:
  - Grid: 3 columns, 2 rows
  - Gap: 30-40px
  - Background: white or very light gray
  - Padding: 40px 30px
  - Text-align: center
  - Border or subtle shadow (optional)
- Service titles:
  - Font-size: 20-24px
  - Color: dark gray
  - Margin-bottom: 15px
- Service descriptions:
  - Font-size: 14-16px
  - Color: medium gray
  - Line-height: 1.6
- "Leia Mais" links:
  - Color: coral
  - Text-transform: capitalize
  - Hover: underline or color change

#### 2.9 CONTACTE-NOS Section Styling
- Hero banner: same as services
- Two-column layout: 40/60 or 50/50 split
- Contact info:
  - Left side
  - Line-height: 1.8
  - Font-size: 16px
  - Color: dark gray
- Contact form:
  - Right side
  - Input/textarea styling:
    - Width: 100%
    - Padding: 12-15px
    - Border: 1px solid light gray
    - Border-radius: 2-4px
    - Margin-bottom: 15-20px
    - Font-family: inherit
  - Textarea: min-height 150px
  - Submit button:
    - Background: coral
    - Color: white
    - Padding: 12-15px 40px
    - Border: none
    - Cursor: pointer
    - Text-transform: uppercase
    - Transition for hover
    - Hover: darker coral

#### 2.10 Map Styling
- Full width
- Height: 400-500px
- iframe: width/height 100%
- No border

#### 2.11 Footer Styling
- Background: dark gray (matching top bar)
- Color: light gray/white
- Text-align: center
- Padding: 30-40px
- Font-size: 14px

---

### STEP 3: Responsive CSS (css/responsive.css)

**Description**: Media queries to ensure the site looks great on all devices.

**Details**:

#### 3.1 Tablet Styles (max-width: 1024px)
- Reduce section padding to 60px vertical
- Service grid: may stay 3 columns or reduce to 2
- Contact form: may stack to single column
- Font sizes slightly smaller

#### 3.2 Mobile Styles (max-width: 768px)
- **Header**:
  - Hamburger menu icon displayed
  - Navigation menu hidden by default
  - Mobile menu: full-width dropdown or slide-in
  - Menu items stacked vertically

- **Hero Slider**:
  - Quote font-size reduced (18-22px)
  - Height may reduce to 60vh

- **Sections**:
  - Padding: 40-50px vertical
  - Section titles: smaller (24-28px)

- **APRESENTAÇÃO**:
  - Image strip: horizontal scroll or stack vertically

- **GALERIA**:
  - Grid: 1 or 2 columns

- **SERVIÇOS**:
  - Service cards: 1 column, stacked

- **CONTACTE-NOS**:
  - Contact info and form: stacked vertically
  - Form inputs: full width maintained

- **Map**:
  - Height: 300px

---

### STEP 4: Hero Slider JavaScript (js/slider.js)

**Description**: Implement image slider functionality with auto-advance and manual controls.

**Details**:

#### 4.1 Slider Setup
- Select all slide elements
- Set initial active slide (index 0)
- Show first slide, hide others

#### 4.2 Navigation Dots
- Create dot for each slide dynamically
- Add click event to each dot
- Active dot gets special class/style
- Clicking dot shows corresponding slide

#### 4.3 Slide Transition Function
- Hide current slide (fade out or slide)
- Show target slide (fade in or slide)
- Update active dot
- Reset auto-advance timer

#### 4.4 Auto-Advance
- setInterval to advance every 5-7 seconds
- Increment slide index
- Loop back to first slide after last
- Clear interval on manual interaction
- Restart interval after manual interaction

#### 4.5 Optional Arrow Controls
- Previous/Next arrow click handlers
- Decrement/increment slide index
- Handle wrapping (last to first, first to last)

#### 4.6 Transitions
- CSS transitions for smooth fade or slide
- Duration: 500-800ms
- Easing: ease-in-out

---

### STEP 5: Main JavaScript (js/main.js)

**Description**: Navigation, smooth scrolling, animations, and mobile menu functionality.

**Details**:

#### 5.1 Smooth Scroll Navigation
- Select all navigation links
- Add click event listeners
- Prevent default anchor behavior
- Get target section ID from href
- Scroll to section using scrollIntoView with smooth behavior
- Account for fixed header offset

#### 5.2 Active Navigation Highlight
- On scroll, detect which section is in viewport
- Add active class to corresponding nav link
- Remove active from others
- Use Intersection Observer or scroll position calculation

#### 5.3 Mobile Menu Toggle
- Select hamburger button and mobile menu
- Toggle menu visibility on button click
- Add animation (slide down, fade in)
- Close menu when clicking outside or on link
- Prevent body scroll when menu open (optional)

#### 5.4 Scroll Animations (Fade-In)
- Use Intersection Observer API
- Observe section elements
- Add "visible" class when entering viewport
- CSS handles actual animation (opacity, transform)
- Threshold: 0.1-0.2 (trigger early)

#### 5.5 Header Scroll Effect (Optional)
- On scroll, add class to header when scrolled > 50px
- CSS changes: add shadow, change background opacity
- Smooth transition

#### 5.6 Form Validation
- Select form element
- On submit, prevent default
- Validate each field:
  - Nome: not empty
  - E-mail: valid email format
  - Telefone: valid phone format (optional)
  - Mensagem: not empty
- Show error messages if invalid
- If valid, allow submit or use AJAX
- Clear form after successful submit
- Show success message

---

### STEP 6: Content Integration

**Description**: Add all text content, images, and finalize styling details.

**Details**:

#### 6.1 Add Logo
- Place logo file in assets/
- Reference in header HTML
- Ensure proper size and alignment

#### 6.2 Add Slider Images
- Place 3-5 high-quality images in assets/images/slider/
- Add background-image CSS or img tags
- Ensure images are optimized (compressed)
- Images should showcase restoration work

#### 6.3 Add Presentation Images
- Image strip: 4-6 images of restoration work
- Place in assets/images/presentation/
- Reference in HTML
- Maintain consistent aspect ratio

#### 6.4 Add Gallery Images
- 12-20 portfolio images
- Place in assets/images/gallery/
- Various restoration projects
- Mix of sizes for masonry layout
- Optimized for web

#### 6.5 Add Service Section Images
- Background image for SERVIÇOS hero banner
- Place in assets/images/
- Should be elegant, related to art restoration

#### 6.6 Add Contact Section Images
- Background image for CONTACTE-NOS hero banner
- Detail of restoration work with gold/ornate elements
- Place in assets/images/

#### 6.7 Add All Portuguese Text
- Copy all text content from screenshots
- Ensure proper accent characters (á, ã, ç, etc.)
- Proofread for accuracy
- Maintain proper line breaks and spacing

#### 6.8 Configure Google Maps
- Get embed code for: Rua dos Lavradores, 13, 3090-476 Maiorca, Figueira da Faz
- Paste iframe into contact section
- Adjust styling as needed

---

### STEP 7: Testing & Optimization

**Description**: Thoroughly test all functionality and optimize performance.

**Details**:

#### 7.1 Browser Testing
- Test in Chrome, Firefox, Safari, Edge
- Check for CSS inconsistencies
- Verify JavaScript works in all browsers
- Test on both Mac and Windows if possible

#### 7.2 Responsive Testing
- Test on actual mobile devices (iPhone, Android)
- Test on tablets (iPad, Android tablets)
- Use browser dev tools for various screen sizes
- Check breakpoints: 320px, 375px, 768px, 1024px, 1440px
- Verify hamburger menu works properly
- Check touch interactions

#### 7.3 Functionality Testing
- **Slider**: Auto-advance, dots, arrows all work
- **Navigation**: All links scroll to correct sections
- **Mobile menu**: Opens, closes, links work
- **Form**: Validation works, submission successful
- **Hover effects**: All interactive elements respond
- **Animations**: Scroll animations trigger correctly

#### 7.4 Performance Optimization
- **Images**:
  - Compress all images (TinyPNG, ImageOptim)
  - Use appropriate formats (JPEG for photos, PNG for graphics)
  - Consider WebP with fallbacks
  - Lazy load gallery images
- **CSS**:
  - Minify for production
  - Remove unused styles
  - Combine into single file if small
- **JavaScript**:
  - Minify for production
  - Combine files if beneficial
  - Defer non-critical scripts
- **Fonts**:
  - Use font-display: swap
  - Load only needed weights/styles

#### 7.5 Accessibility
- Add alt text to all images
- Ensure sufficient color contrast
- Keyboard navigation works (tab through links/forms)
- ARIA labels where needed
- Semantic HTML (proper heading hierarchy)
- Form labels properly associated

#### 7.6 SEO Basics
- Title tag: "Quadrifolio - Conservação e Restauro"
- Meta description: Company description
- Heading hierarchy (H1, H2, H3)
- Descriptive alt text for images
- Semantic HTML5 elements

---

## Final Deliverables

1. **index.html** - Complete single-page website
2. **css/styles.css** - Main stylesheet
3. **css/responsive.css** - Responsive styles
4. **js/slider.js** - Slider functionality
5. **js/main.js** - Navigation and interactions
6. **assets/** - All images and logo
7. **README.md** - Basic documentation (optional)

---

## Timeline Estimate

- **Step 1 (HTML)**: 2-3 hours
- **Step 2 (CSS)**: 3-4 hours
- **Step 3 (Responsive)**: 2 hours
- **Step 4 (Slider)**: 1-2 hours
- **Step 5 (JavaScript)**: 2-3 hours
- **Step 6 (Content)**: 1-2 hours
- **Step 7 (Testing)**: 2-3 hours

**Total**: ~15-20 hours

---

## Notes

- All text content is in Portuguese
- Classic, professional aesthetic appropriate for art restoration
- Focus on image quality to showcase restoration work
- Smooth, refined interactions (no jarring effects)
- Performance important for image-heavy site
- Mobile experience should be seamless

---

## Resources Needed from You

- [ ] Logo file (SVG or high-res PNG)
- [ ] Hero slider images (3-5 images)
- [ ] Presentation section images (4-6 images)
- [ ] Gallery images (12-20 images)
- [ ] Service section background image
- [ ] Contact section background image
- [ ] Any specific color preferences
- [ ] Contact form submission endpoint (email service or backend)
