# Nexcart Velocity

**Nexcart Velocity** is a modern, performant, and scalable e-commerce UI starter built with the following tech stack:

- **Next.js 15.5.3 (Turbopack)**
- **npm** as package manager
- **React 19.1.1**
- **TailwindCSS 4.1.13**
- **Zustand 5.0.8** for state management
- **Apollo Client + GraphQL** (planned integration)
- **Storybook 9.1.5** for UI development and documentation
- **Vitest 3.2.4 / Playwright 1.55.0 / Cypress 15.2.0 / Jest 30.1.3** for testing

## Features

- 🔐 Auth pages: Login and Register
- 📦 Modular folder structure with atomic design (atoms, molecules, organisms)
- 💾 Zustand store with persistent state hook
- 🌐 SEO support with `next-seo`
- 🎨 Fully styled with TailwindCSS and custom globals
- 🧪 Full testing setup (Vitest, Cypress, Jest, Playwright)
- 📚 Storybook with accessibility and documentation addons
- 🖼️ Optimized image and SVG usage

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
