# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Admin dashboard for the WhatsApp AI Assistant SaaS platform. Built with Create React App (React 18). The backend lives in `../master-api`, and per-customer AI agent instances live in `../openclaw-instance`.

## Commands

```bash
npm start            # Dev server on port 3000
npm run build        # Production build → build/
```

Production serving: `npx serve -s build -l $PORT` (Railway deployment)

## Environment Variables

Set `REACT_APP_API_URL` to the master-api URL. Falls back to `http://localhost:8080`.
All CRA env vars must be prefixed with `REACT_APP_`.

## Architecture

- **Framework:** React 18, Create React App, JavaScript (no TypeScript)
- **Routing:** React Router v6 with auth guard in `App.js`
- **HTTP:** Shared axios instance in `src/lib/api.js` with JWT auth interceptor and 401 redirect
- **Styling:** Inline JS style objects only (no CSS files, no Tailwind). Each page declares a top-level const (`C`, `G`, or `S`) with all styles. Some styles are functions accepting status strings for conditional formatting.
- **State:** Local `useState`/`useEffect` per page. No global state library.
- **Auth:** JWT in `localStorage` key `token`, admin object in `localStorage` key `admin`. Guard component redirects to `/login` if no token.

## Key Files

- `src/App.js` — Router + Guard auth component
- `src/lib/api.js` — Axios instance with baseURL, auth interceptor, 401 handler
- `src/pages/Login.js` — Admin login
- `src/pages/Dashboard.js` — Customer list, stats, add customer modal
- `src/pages/CustomerDetail.js` — Customer profile/preferences editor

## API Endpoints

All calls through `src/lib/api.js`. Backend at `REACT_APP_API_URL`.

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/customers` | List customers |
| POST | `/api/customers` | Create customer |
| GET | `/api/customers/:id` | Customer detail |
| PATCH | `/api/customers/:id/profile` | Save customer preferences |
| POST | `/api/billing/checkout` | Stripe checkout session |
| POST | `/api/billing/portal` | Stripe billing portal |

## Deployment

Railway.app via Nixpacks. Config in `railway.json`. The `-s` flag on `serve` enables SPA fallback required for React Router.

## Business Domain

- Single plan: `assistant` at $49.99/month
- Each customer gets an isolated OpenClaw + Claude AI agent instance on Railway
- Subscription statuses: `active`, `past_due`, `pending`
- Agent statuses: `active`, `error`, `pending`
- Billing via Stripe (checkout sessions + customer portal)
- Stripe price env var: `STRIPE_PRICE_ID` (single plan, no tiers)
