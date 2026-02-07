# Blake — Landing Page

Landing page for **Blake**, a fast desktop client that brings pull requests, reviews, and deployments into one clean workspace.

## Tech stack

- **React 18** + **TypeScript**
- **Vite** for build and dev server
- **Tailwind CSS** for styling
- **shadcn/ui** (Radix-based components)
- **Motion** for scroll and UI animations
- **Three.js** for hero and feature section backgrounds (shader animation, paper shaders)

## Getting started

**Requirements:** Node.js 18+ and npm (or yarn/pnpm).

```bash
# Clone the repo
git clone https://github.com/akhileshdasari2004/Blake_landingPage.git
cd Blake_landingPage

# Install dependencies
npm install

# Run dev server (with hot reload)
npm run dev
```

Open [http://127.0.0.1:8080](http://127.0.0.1:8080) (or the port shown in the terminal).

## Scripts

| Command        | Description                |
|----------------|----------------------------|
| `npm run dev`  | Start dev server           |
| `npm run build`| Production build           |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint                 |
| `npm run test` | Run Vitest                 |

## Project structure

- `src/components/` — Page sections (Hero, Features, Pricing, Testimonials, etc.) and shared UI
- `src/components/ui/` — Reusable UI (shadcn, custom shaders, scroll animation)
- `src/pages/` — Route-level pages
- `src/index.css` — Global styles and design tokens

## Deploy

Build the app and deploy the `dist` folder to any static host (Vercel, Netlify, GitHub Pages, etc.):

```bash
npm run build
# Upload the contents of dist/
```

## Repo description on GitHub

To make the repo clearly yours, on GitHub go to **Settings → General** and set:

- **Description:** e.g. `Blake — landing page (React, Vite, Tailwind, shadcn/ui)`
- Remove any template-related **Topics** (e.g. template names) and add ones like `react`, `vite`, `tailwindcss`, `landing-page`, `blake`

## License

Private. All rights reserved.
