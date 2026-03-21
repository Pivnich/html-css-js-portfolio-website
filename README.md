# Portfolio Website (HTML/CSS/JS + Astro)

Project: a single-page portfolio website built with Astro, featuring responsive layout, interactive sections, and client-side behavior.

## 📁 Project structure

- `astro.config.mjs` — Astro configuration
- `package.json` — dependencies and scripts
- `src/`
  - `components/` — reusable components (menu, modal, theme toggle, etc.)
  - `components/sections/` — main page sections: profile, experience, projects, contacts
  - `data/projects.json` — project data source
  - `layouts/BaseLayout.astro` — base layout
  - `pages/index.astro` — homepage
  - `scripts/main.js` — JS for interactivity (animations, smooth scroll, menu behavior)
  - `styles/` — SCSS styles
- `public/assets/` — images and icons

## ✅ Features implemented

- Responsive mobile and desktop navigation menu
- Smooth scrolling to anchor sections
- Theme toggle (light/dark)
- Data-driven projects list with `projects.json`
- Back-to-top button
- Sections: profile, experience, projects, selected projects, contacts
- Active menu item update on scroll

## 🛠️ Tech stack

- [Astro](https://astro.build/)
- SCSS
- Vanilla JS
- HTML/CSS

## ▶️ Run locally

1. Clone repository

```bash
git clone <URL>
cd html-css-js-portfolio-website
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

4. Open in browser

```
http://localhost:3000
```

## 📦 Production build

```bash
npm run build
npm run preview
```

## 💡 Modify content

- `src/data/projects.json` — add/update project cards
- `src/components/sections/projects.astro` and `selected-projects.astro` — project rendering logic
- `src/styles/bundle.scss` — global styles and Sass rules
- `src/scripts/main.js` — front-end behavior (scroll, menu toggle, theme switch)

## 📌 Notes

- Structure is easy to extend with i18n, form integration, external API data.
- Check Astro version and plugin compatibility in `package.json` when updating.
