# Parfumerie Élégance - French E-Commerce Website

## Overview
A production-ready, mobile-first French-language e-commerce website for a parfumerie and associated product lines. Built with React, Redux Toolkit, GSAP animations, and WhatsApp ordering integration.

## Current State
- **Phase**: MVP Development Complete
- **Status**: Frontend fully implemented with all pages and components
- **Next Steps**: Backend API implementation and integration

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: GSAP + ScrollTrigger
- **Routing**: wouter
- **Data Fetching**: TanStack Query (React Query)

## Project Structure

```
client/
├── public/
│   └── assets/              # Static assets (images, videos)
│       ├── products/        # Product images
│       ├── categories/      # Category images
│       ├── gallery/         # Gallery images
│       ├── hero/            # Hero section assets
│       └── logos/           # Logo files
├── src/
│   ├── components/
│   │   ├── home/           # Home page components (Hero)
│   │   ├── layout/         # Layout components (Navbar, Footer, etc.)
│   │   ├── products/       # Product-related components
│   │   ├── ui/             # shadcn/ui components
│   │   └── widgets/        # Floating widgets (WhatsApp, Cart)
│   ├── data/               # Seed data (products, categories)
│   ├── hooks/              # Custom hooks (useGSAP, etc.)
│   ├── lib/                # Utilities (queryClient, whatsapp, utils)
│   ├── pages/              # Route pages
│   └── store/              # Redux store and slices
├── App.tsx                 # Main app with routing
└── index.css               # Global styles + Tailwind config
```

## Key Features

### Pages
- **Accueil (Home)**: Hero section, featured products, category carousels
- **Produits**: Filterable product grid with search and sort
- **Galerie**: Masonry gallery with lightbox
- **À Propos**: About page with company info
- **Localisation**: Map with store location and hours
- **Contact**: Contact form with validation

### Components
- **Navbar**: Responsive sticky navbar with burger menu on mobile
- **ProductCard**: Product display with WhatsApp order and cart buttons
- **ProductModal**: Full product details with image gallery
- **CategorySection**: Horizontal product carousel per category
- **WhatsAppWidget**: Floating chat widget for quick ordering
- **CartDrawer**: Shopping cart sidebar
- **DevSettings**: Development-only WhatsApp number configuration

### Product Categories (In Order)
1. ParaSpace
2. Parfums de Luxe
3. Forever Living
4. The Ordinary
5. Lunettes & Accessoires
6. Avon
7. Maybelline
8. Lattafa Parfums

## WhatsApp Configuration

### Setting the WhatsApp Number

**Development (Dev Settings Toggle)**:
- A settings button appears in the bottom-left corner in development mode
- Click to open the dev settings panel and enter a WhatsApp number

**Production (Environment Variable)**:
```env
VITE_WHATSAPP_NUMBER=33612345678
```

The number should be in international format without the + sign.
Example: `33612345678` for a French number.

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Adding/Replacing Assets

1. Place product images in `client/public/assets/products/`
2. Place category images in `client/public/assets/categories/`
3. Place gallery images in `client/public/assets/gallery/`
4. Update image paths in `client/src/data/products.ts` and `client/src/data/categories.ts`

### Recommended Image Formats
- **Products**: WebP with JPG fallback, 600x800px (3:4 aspect ratio)
- **Categories**: WebP/JPG, 400x400px
- **Gallery**: Various sizes, WebP preferred
- **Hero**: Video (WebM/MP4) or high-res image (1920x1080+)

## State Management

### Redux Slices

**cartSlice**: Shopping cart management
- Items array with product and quantity
- Add/remove/update quantity actions
- Persists to localStorage

**productsSlice**: Product catalog
- Products and categories arrays
- Filtering (category, search query)
- Sorting (name, price, rating)

**uiSlice**: UI state management
- Loading states
- Modal/drawer visibility
- Theme (light/dark)
- WhatsApp widget state
- Cookie consent

## Theme & Styling

The site uses a whitesmoke background with soft pink accents (hue 340).

**Fonts**:
- Sans: Inter, Open Sans
- Serif: Playfair Display (headings)

**Colors** (defined in index.css):
- Primary: Soft pink (340 65% 48%)
- Background: Whitesmoke (#F5F5F5 equivalent)
- High contrast text for accessibility

## Accessibility Features
- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus trap in modals
- High contrast text (WCAG AA compliant)
- Alt text on images (French descriptions)
- Touch-friendly targets (44px minimum)

## Development Notes

### Key Files to Modify

- **Products/Categories**: `client/src/data/products.ts`, `client/src/data/categories.ts`
- **Styling**: `client/src/index.css`, `tailwind.config.ts`
- **Theme Colors**: CSS variables in `:root` and `.dark` selectors
- **API Endpoints**: `server/routes.ts`

### Common Tasks

**Add a new product**:
1. Add product object to `client/src/data/products.ts`
2. Place image in `client/public/assets/products/`

**Add a new category**:
1. Add category object to `client/src/data/categories.ts`
2. Place image in `client/public/assets/categories/`

**Change WhatsApp number**:
1. Set `VITE_WHATSAPP_NUMBER` in environment
2. Or use dev settings panel in development mode

## Backend API (To Be Implemented)

Expected endpoints:
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/categories` - List all categories
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter` - Subscribe to newsletter
- `GET/POST /api/cart` - Cart operations
<!-- http://localhost:5000 -->
