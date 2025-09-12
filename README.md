# Nexcart Velocity

**Nexcart Velocity** is a modern, performant, and scalable e-commerce UI starter built with cutting-edge technologies. This production-ready foundation provides everything you need to build high-quality online stores with exceptional user experiences.

## 🚀 Tech Stack

- **Next.js 15.5.3 (Turbopack)** - Ultra-fast builds and hot reloading
- **npm** as package manager
- **React 19.1.1** - Latest features with concurrent rendering
- **TailwindCSS 4.1.13** - CSS-first styling with custom design tokens
- **Zustand 5.0.8** - Lightweight state management with persistence
- **Apollo Client + GraphQL** - Full integration with caching and error handling
- **Storybook 9.1.5** - UI development, documentation, and design system
- **Testing Suite**: Vitest, Playwright, Cypress, Jest with high coverage
- **Performance**: Service Worker, PWA features, Core Web Vitals monitoring
- **Accessibility**: WCAG 2.1 AA compliance with screen reader support
- **SEO**: Comprehensive metadata, structured data, and social sharing

## ✨ Key Features

### 🛒 E-commerce Components

- **ProductCard** - Lazy-loaded images, ratings, pricing, wishlist integration
- **ShoppingCart** - Full cart management with quantity controls and totals
- **Header** - Mega menu, search, cart badge, mobile navigation
- **ProductGrid** - Infinite scroll, filtering, sorting, search integration
- **Checkout Process** - Multi-step wizard with form validation

### 🎨 Design System

- **Button** - Multiple variants, sizes, loading states, icons
- **Input** - Validation, error states, accessibility features
- **Card** - Flexible layouts with header, content, footer
- **Modal** - Focus trapping, keyboard navigation, backdrop blur
- **Typography** - Fluid scaling, semantic HTML, readability optimized

### 🔧 Developer Experience

- **TypeScript** - 100% coverage with strict mode
- **ESLint + Prettier** - Code quality and formatting
- **Husky + Commitlint** - Pre-commit hooks and conventional commits
- **Storybook** - Interactive component documentation
- **Comprehensive Testing** - Unit, integration, and E2E tests

### ⚡ Performance & PWA

- **Service Worker** - Offline support, caching strategies
- **Performance Monitoring** - Core Web Vitals tracking
- **Image Optimization** - Next.js Image with WebP/AVIF support
- **Bundle Analysis** - Webpack Bundle Analyzer integration
- **PWA Features** - Installable, app shortcuts, push notifications

### ♿ Accessibility & SEO

- **WCAG 2.1 AA** compliance with axe-core integration
- **Screen Reader** support with ARIA attributes and live regions
- **Keyboard Navigation** - Full keyboard accessibility
- **Focus Management** - Skip links, focus trapping, visible focus indicators
- **SEO Optimization** - Meta tags, structured data, Open Graph, Twitter Cards

---

## Project Structure

```text
nexcart-velocity/
├─ .storybook/ # Storybook config and Vitest setup
├─ public/ # Static assets (SVGs, icons)
├─ src/
│ ├─ app/ # Next.js App Router pages, layouts, global CSS
│ ├─ components/ # Atomic design: atoms, molecules, templates
│ ├─ hooks/ # Custom React hooks
│ ├─ lib/store/ # Zustand stores with type safety
│ ├─ stories/ # Storybook stories and assets
│ └─ utils/ # Shared utilities (planned)
├─ .gitignore
├─ bun.lock
├─ eslint.config.mjs
├─ next.config.ts
├─ package.json
├─ postcss.config.mjs
├─ README.md
├─ tsconfig.json
├─ vitest.config.ts
└─ vitest.shims.d.ts

```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v18+ recommended)
- npm (comes with Node.js)

### Install dependencies

```bash
npm install
```

### Run dev server

```bash
npm run dev
```

### Run Storybook

```bash
npm run storybook
```

### Run type-check

```bash
npm run type-check
```

### Run tests

```bash
npm run test
```

---

## Scripts

```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build --turbopack",
  "start": "next start",
  "lint": "next lint",
  "format": "prettier --write .",
  "type-check": "tsc --noEmit",
  "test": "vitest",
  "test:e2e": "playwright test",
  "test:cy": "cypress run",
  "test:jest": "jest",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build",
  "prepare": "husky install"
}
```

---

## Tech Stack

- **Next.js 15.5.3 + App Router**
- **npm** for package management
- **React 19.1.1**
- **TailwindCSS 4.1.13** for styling
- **Zustand 5.0.8** with persistent store
- **Storybook 9.1.5** with a11y, docs and vitest addon
- **GraphQL** support (via Apollo Client)
- **Testing:**
  - Vitest 3.2.4 (unit/integration)
  - Playwright 1.55.0 & Cypress 15.2.0 (e2e)
  - Jest 30.1.3 (legacy or utility tests)

---

## Recent Updates

- ✅ Updated all libraries to latest versions (Next.js 15.5.3, React 19.1.1, etc.)
- ✅ Fixed compatibility issues with Next.js config and Storybook imports
- ✅ Resolved ESLint and TypeScript errors
- ✅ Verified build, lint, and type-check pass
- ✅ No security vulnerabilities found

---

## Todo

- [ ] Implement real GraphQL queries/mutations
- [ ] Add OAuth providers for login/register
- [ ] Expand component library (organisms/templates)
- [ ] Configure CI/CD (GitHub Actions / Vercel preview deploys)

---

## License

MIT

---

## Author

**Marcy** — [GitHub](https://github.com/marcythany) • [Website](https://marcy-miniportfolio.vercel.app/)
