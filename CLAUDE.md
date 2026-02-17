# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Frontend for the WhatsApp AI Assistant SaaS platform — serves both the admin dashboard and the customer-facing portal. Built with Create React App (React 18). The backend lives in `../master-api`.

## Commands

```bash
npm start            # Dev server on port 3000
npm run build        # Production build → build/
```

Production serving: `npx serve -s build -l $PORT` (Railway deployment, `-s` enables SPA fallback for React Router).

## Environment Variables

Set `REACT_APP_API_URL` to the master-api URL. Falls back to `http://localhost:8080`.
All CRA env vars must be prefixed with `REACT_APP_`.

## Architecture

- **Framework:** React 18, Create React App, JavaScript (no TypeScript)
- **Routing:** React Router v6 with auth guards in `App.js`
- **HTTP:** Two axios instances — `src/lib/api.js` (admin, `localStorage.token`) and `src/lib/customerApi.js` (customer portal, `localStorage.customerToken`). Both have 401 interceptors that redirect and clear storage.
- **Styling:** Inline JS style objects only (no CSS files, no Tailwind). Each page declares a top-level const (`C`, `G`, `S`, or `L`) with all styles. Some styles are functions accepting status strings for conditional formatting. Use `auto-fit`/`minmax` for responsive grids, `clamp()` for responsive font sizes.
- **State:** Local `useState`/`useEffect` per page. No global state library.
- **Error Boundary:** Class component `ErrorBoundary` in `App.js` wraps the entire app.

## Auth Model

Two separate auth flows with isolated storage:

| Flow | Token key | User key | Guard | Redirect |
|------|-----------|----------|-------|----------|
| Admin | `localStorage.token` | `localStorage.admin` | `Guard` | `/login` |
| Customer | `localStorage.customerToken` | `localStorage.customer` | `CustomerGuard` | `/portal/login` |

## Routes

```
/                     → Landing (public)
/signup               → Signup (public, redirects to Stripe Checkout)
/signup/success       → SignupSuccess (public, polls for number assignment)
/login                → Login (admin)
/dashboard            → Dashboard (admin, guarded)
/customers/:id        → CustomerDetail (admin, guarded)
/portal/login         → PortalLogin (customer)
/portal               → Portal (customer, guarded)
/portal/preferences   → PortalPreferences (customer, guarded)
/portal/activity      → PortalActivity (customer, guarded)
```

## Key Files

- `src/App.js` — Router, Guards, ErrorBoundary
- `src/lib/api.js` — Admin axios instance
- `src/lib/customerApi.js` — Customer portal axios instance
- `src/pages/Dashboard.js` — Customer list, stats, MRR. Uses `PLAN_PRICE` constant.
- `src/pages/CustomerDetail.js` — Full customer profile/preferences editor
- `src/pages/Landing.js` — Public marketing page
- `src/pages/Signup.js` — Self-signup form → Stripe Checkout
- `src/pages/SignupSuccess.js` — Polls `/api/signup/status` until number assigned (2 min timeout)
- `src/pages/portal/Portal.js` — Customer home: WhatsApp number, status cards, navigation
- `src/pages/portal/PortalPreferences.js` — Customer preference editor (dining, travel, loyalty)

## Deployment

Railway.app via Nixpacks. Config in `railway.json`. Auto-deploys from `main` branch on GitHub (`AutoBookAI/autobookai-dashboard`).
