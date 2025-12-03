# Design Guidelines: French Parfumerie E-Commerce Website

## Design Approach
**Reference-Based Approach**: Draw inspiration from premium e-commerce experiences like Shopify, Etsy, and luxury brand websites (Sephora, The Ordinary). Emphasize elegance, trust, and tactile shopping experience translated to digital.

## Core Visual Identity

**Color Palette**:
- Primary Background: Whitesmoke (#F5F5F5)
- Accent: Soft Pink (rose gold tones for premium feel)
- Text: High-contrast dark gray/black for accessibility (WCAG AA minimum)
- Supporting: Pure white for card backgrounds, subtle grays for borders

**Typography Hierarchy**:
- Headings: Elegant serif or modern sans-serif (Playfair Display or Montserrat via Google Fonts)
- Body: Clean, readable sans-serif (Inter or Open Sans)
- Size Scale: Hero titles (3xl-6xl), Section headers (2xl-3xl), Cards (base-lg), Body (base)
- Weight Variation: Light (300) for elegance, Regular (400) for body, Semibold (600) for emphasis, Bold (700) for CTAs

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 8, 12, 16, 20 (p-2, m-4, gap-8, py-12, etc.)

**Grid Structure**:
- Mobile: Single column (base)
- Tablet: 2 columns (md:grid-cols-2)
- Desktop: 3-4 columns for product grids (lg:grid-cols-3, xl:grid-cols-4)
- Container: max-w-7xl for main content areas

**Section Rhythm**: Consistent vertical spacing py-12 (mobile) to py-20 (desktop) between major sections

## Page-Specific Layouts

### Hero Section
- Full viewport impact (min-h-screen or 80vh)
- Video background with elegant overlay (dark gradient 50% opacity)
- Centered animated brand monogram/initial
- French tagline beneath in elegant serif
- Primary CTA button with blurred background backdrop
- Smooth GSAP entrance animations (fade-up, scale)

### Navigation
- Sticky header with backdrop blur effect
- Desktop: Horizontal menu with logo left, links center, search/cart right
- Mobile: Burger menu (top-right), logo centered, overlay slide-in menu
- Search: Small overlay modal, not full-screen
- Height: 16-20 units, with smooth shadow on scroll

### Product Sections (Brand Categories)
- Each category: Full-width section with distinct spacing
- Category header: French title (text-2xl md:text-3xl), short description (text-gray-600)
- Horizontal touch-enabled carousel/scroller
- Overflow-x-auto with snap-scroll for smooth mobile swiping
- Gap between cards: 4-6 units
- "Voir plus" link at section end

### Product Cards
- White background with subtle shadow (hover: lift with increased shadow)
- Image: Aspect ratio 3:4 or 1:1, object-fit cover
- Content padding: p-4 to p-6
- Layout: Image top, title (font-semibold), price (accent color, text-lg), short excerpt, rating stars
- Two buttons stacked or side-by-side: "Commander maintenant" (primary pink), "Ajouter au panier" (outline)
- Generous touch targets (min 44px height)

### Product Detail Modal/Page
- Modal: Centered overlay (max-w-4xl), backdrop blur
- Two-column layout (md:): Image gallery left (60%), details right (40%)
- Mobile: Stacked, image first
- Related products carousel at bottom
- Focus trap for accessibility

### Gallery
- Masonry grid layout (2 cols mobile, 3-4 desktop)
- Lightbox on click with navigation arrows
- Mix of product highlights and magasin interior shots
- Lazy-load all images

### Localisation Page
- Split layout: Map embed left/top (60%), details right/bottom (40%)
- Map: Embedded Google Maps iframe or Leaflet, min-height 400px
- Store details card: Address, phone, opening hours in structured format
- Mobile: Stack vertically

### Contact Form
- Single column, max-w-2xl centered
- Large form fields with clear labels above
- Input height: 12-14 units for comfortable touch
- Submit button: Full-width on mobile, auto on desktop
- Success/error messages with icons and color coding

### Footer
- Multi-column grid (1 col mobile, 3-4 cols desktop)
- Sections: Navigation links, Social media, Newsletter signup, Legal/Cookie notice
- Newsletter: Inline form with input + button
- Back-to-top button: Fixed bottom-right, circular, appears on scroll
- Generous padding: py-16

## Component Library

### Buttons
- Primary: Soft pink background, white text, rounded-lg, px-6 py-3
- Secondary: Outline pink, transparent background
- Hover: Subtle scale transform (1.02), deeper shadow
- Focus: Ring in accent color
- Disabled: Reduced opacity, no interaction

### WhatsApp Widget
- Fixed bottom-right positioning (with offset for back-to-top)
- Floating bubble: Circular, WhatsApp green, 56x56px with icon
- Expanded state: Chat UI card (320px width), shadow-xl, rounded-lg
- Input field with send button
- Smooth expand/collapse animation

### Modals
- Backdrop: Dark overlay 60% opacity with blur
- Content: White card, rounded-xl, max-w as appropriate
- Close button: Top-right, large touch target
- Smooth fade-in animation

### Carousels/Scrollers
- Horizontal scroll containers with snap-scroll
- Show partial next item to indicate scrollability
- Touch-friendly, no visible scrollbars (webkit-scrollbar: none)
- Optional navigation dots below for current position

## Animations (GSAP)

**Entrance Animations**:
- Hero elements: Staggered fade-up, subtle scale
- Product cards: Fade-in on scroll (viewport intersection)
- Section headers: Slide-in from left
- Duration: 0.6-0.8s, easing: power2.out

**Micro-interactions**:
- Button hover: Scale 1.02, shadow lift
- Card hover: Translate Y -4px, shadow increase
- WhatsApp widget: Bounce on initial load
- Keep animations subtle and performant

## Responsive Behavior

**Breakpoints**:
- Mobile-first base styles
- sm: 640px (large phones)
- md: 768px (tablets)
- lg: 1024px (desktop)
- xl: 1280px (large desktop)

**Touch Considerations**:
- All interactive elements: min 44x44px
- Increased padding on mobile
- Swipe gestures for carousels
- No hover-dependent interactions

## Accessibility

- Semantic HTML5 elements (nav, main, article, section)
- ARIA labels for icons and interactive elements
- Alt text for all images (French descriptions)
- Keyboard navigation: Tab order, Enter/Space for actions
- Focus indicators: Visible rings on all focusable elements
- Color contrast: Minimum WCAG AA (4.5:1 for normal text)
- Screen reader announcements for cart updates, form errors

## Images

**Hero Section**: Full-width video background (parfum bottles, store interior elegance) with fallback image. Overlay gradient for text legibility.

**Product Images**: High-quality product photography on white/neutral backgrounds, consistent aspect ratios across categories.

**Gallery**: Mix of product showcases and magasin interior shots showing premium atmosphere, modern displays, and customer experience.

**Supplemental**: Category section headers can include subtle background textures or brand imagery.

All images: Implement srcset for responsive delivery, WebP format with JPG fallback, lazy-load below fold content.