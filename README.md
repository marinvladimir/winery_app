# Vinarija Kuzmanić

Website for the Kuzmanić family winery in Kaštel Novi – home page, wine tour and photo gallery, in Croatian and English.

Built with React, TypeScript, Vite, styled-components and react-intl.

## Getting started

```bash
npm install
npm run dev
```

Other scripts: `npm run build` (type-check + production build), `npm run lint`, `npm run preview`.

## Configuration

Copy `.env.example` to `.env` and fill in:

| Variable | Used for |
| --- | --- |
| `VITE_JS_SERVICE_ID`, `VITE_JS_TEMPLATE_ID`, `VITE_JS_PUBLIC_KEY` | EmailJS – the contact form |
| `VITE_UPSTASH_REDIS_REST_URL`, `VITE_UPSTASH_REDIS_REST_TOKEN` | Visitor counter (hidden when not set) |

## Project structure

- `src/pages` – one component per route (`/`, `/tour`, `/gallery`)
- `src/components` – page sections, header/footer and shared UI (`ui.ts`, `PageHero`, `Icons`)
- `src/data` – contact details, navigation and photo lists (single source of truth)
- `src/locales` – `hr.json` / `en.json`; both files must have the same keys
- `src/index.css` – design tokens (colours, fonts, shadows) as CSS custom properties
- `public/assets` – images and 3D models (`.glb`, loaded lazily and only on larger screens)
