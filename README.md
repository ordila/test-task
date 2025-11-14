# Frontend Test

Interactive React storefront that pulls a product catalog from a remote API and lets users manage a cart with local persistence.

## Features

- Product carousel with responsive layout powered by Embla.
- Remote data loading via `axios` + `swr`, including loading/error/empty states.
- Shopping cart stored in browser `localStorage` (10% discount automatically applied for large quantities).
- Tailwind-based UI with reusable UI components and containers.

## Tech Stack

- React 19 + TypeScript
- Vite 7
- SWR 2 + Axios
- Tailwind CSS 4
- ESLint 9

## Prerequisites

- Node.js ≥ 20 (recommended)
- npm ≥ 10
- Access to an HTTP endpoint that returns the products schema (MockAPI link used during development).

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` (or `.env.local`) and define the catalog endpoint:
   ```bash
   VITE_API_BASE_URL=https://6915bfea465a9144626d5b8c.mockapi.io/api
   ```
   Any HTTPS endpoint that serves the expected products array will work.
3. Start the development server:
   ```bash
   npm run dev
   ```
   Vite prints the local URL (defaults to `http://localhost:5173`).

## Available Scripts

```bash
npm run dev        # start Vite in development mode
npm run build      # create a production build
npm run preview    # serve the production build locally
npm run lint       # run ESLint
npm run lint:fix   # run ESLint with --fix
```

## Project Structure

- `src/api` – axios client + domain API helpers (`fetchProducts`).
- `src/hooks` – composable hooks (`useCart`, `useProducts`, carousel helpers).
- `src/ui/components` – presentational components (cards, catalog states, modal internals).
- `src/ui/containers` – smart/section components that compose UI pieces.
- `src/ui/elements` – smaller UI elements (buttons, icons, controls) used within components and containers.
- `src/utils` – formatters, calculations, and `localStorage` facade.
- `src/constants` – shared constants and storage keys.
- `public/` – static assets (favicon).

Aliases defined in `tsconfig.json`/`vite.config.js` (`@`, `@components`, `@containers`, `@hooks`, `@api`, `@utils`, `@constants`, `@config`) are used throughout the codebase.

## Notes

- The app requires `VITE_API_BASE_URL`; without it the startup will fail fast with a descriptive error.
- Cart state persists between sessions through `localStorage`.
- SWR handles revalidation and caching; manual refetch is available via the exposed `reload` handler in `useProducts`.
