# Globcompanion: Recipe Finder

A global recipe discovery platform. Search, filter, and cook authentic recipes from over 60 countries, in 31 languages, with full RTL support, favorites, a shopping list, and a distraction-free cooking mode.

## Stack

- React 19 + TypeScript + Vite
- React Router for client-side routing
- Zustand for state (auth, favorites, theme, shopping list, recently viewed)
- react-i18next for translations, locale files lazy-loaded per language
- Tailwind CSS v4 for styling

## Getting started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` – start the local dev server
- `npm run build` – type-check and build for production
- `npm run preview` – preview the production build locally
- `npm run lint` – run oxlint

## Deployment

The app is a static single-page app. `netlify.toml`, `public/_redirects`, and `vercel.json` are all configured to fall back to `index.html` so deep links and refreshes work correctly on Netlify and Vercel.

## Data

Recipe and country data lives in `src/data/`. Every recipe image is sourced from Wikipedia/Wikimedia Commons and tied to that specific dish.
