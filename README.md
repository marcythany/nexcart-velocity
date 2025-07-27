# Nexcart Velocity

**Nexcart Velocity** is a modern, performant, and scalable e-commerce UI starter built with the following tech stack:

- **Next.js 15 (Turbopack)**
- **Bun** as runtime
- **React 19**
- **TailwindCSS 4**
- **Zustand** for state management
- **Apollo Client + GraphQL** (planned integration)
- **Storybook 9** for UI development and documentation
- **Vitest / Playwright / Cypress / Jest** for testing

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

- [Bun](https://bun.sh) installed

### Install dependencies

```bash
bun install
```

### Run dev server

```bash
bun run dev
```

### Run Storybook

```bash
bun run storybook
```

### Run type-check

```bash
bun run type-check
```

### Run tests

```bash
bun run vitest
```

---

## Scripts

```json
"scripts": {
  "dev": "bun run next dev --turbopack",
  "build": "bun run next build --turbopack",
  "start": "bun run next start",
  "lint": "bun run next lint",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build",
  "type-check": "bun run tsc --noEmit"
}
```

---

## Tech Stack

- **Next.js 15 + App Router**
- **Bun** for runtime and scripts
- **TailwindCSS 4** for styling
- **Zustand** with persistent store
- **Storybook 9** with a11y, docs and vitest addon
- **GraphQL** support (via Apollo Client)
- **Testing:**
  - Vitest (unit/integration)
  - Playwright & Cypress (e2e)
  - Jest (legacy or utility tests)

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
