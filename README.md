# Portfolio App (Next.js + FastAPI)

Modern, ready-to-run portfolio that showcases internal “Solution Center Apps” and “Local Apps.”
The frontend (Next.js + TailwindCSS) provides a fast catalog UI with search, filter, sort, favorites,
and accessible modals. The backend (FastAPI) computes per‑app health in real time.

---

## Table of contents
- [Summary](#summary)
- [How it works](#how-it-works)
- [Prerequisites](#prerequisites)
- [One-time setup](#one-time-setup)
- [Run](#run)
- [Configure](#configure)
- [UI overview](#ui-overview)
- [Features](#features)
- [Project structure](#project-structure)
- [Backend endpoints](#backend-endpoints)
- [Adding a new app](#adding-a-new-app)
- [Tech](#tech)
- [Development tips](#development-tips)

---

## Summary
This app catalogs your internal solutions in two views:
- Solution Center Apps: lists all apps with their current health and metadata.
- Local Apps: prioritizes apps runnable on a Mac; non-runnable apps are greyed but remain clickable so details are still discoverable.

Cards open into a details modal with an image carousel (1–4 images), tech stack, architecture summary,
platforms, and quick actions such as Repo and Docs (docs open inline in a secondary modal). Health can be
refreshed per card or in bulk, and the last-checked timestamp is displayed. Users can star apps to pin
favorites to the top (stored in `localStorage`).

---

## How it works
1. The backend loads `backend/data/apps_seed.json` (Pydantic v2 models) and computes health for each app using `httpx.AsyncClient` with a 1.5s timeout.
2. The frontend fetches from `NEXT_PUBLIC_API_BASE` (default `http://localhost:8000`) and renders grid cards.
3. “Refresh all” performs parallel health checks; each card also has a “Refresh health” action.
4. The Local Apps view applies a simple `can_run_locally` flag; non-runnable items are visually de-emphasized but remain interactive.

Health rules:
- No endpoint → `UNKNOWN`
- HTTP 200 → `UP`
- Non‑200/timeout/error → `DOWN`

## Prerequisites
- Python 3.11+
- Node.js 18+

## One-time setup
```bash
bash scripts/setup_all.sh
```

## Run
- Terminal A (backend):
```bash
bash scripts/run_backend.sh
```
Serves API on `http://localhost:8000`.

- Terminal B (frontend):
```bash
bash scripts/run_frontend.sh
```
Serves web on `http://localhost:3000`.

## Configure
- Backend: copy `backend/.env.example` to `backend/.env` (optional) and adjust CORS origins.
- Frontend: copy `frontend/.env.local.example` to `frontend/.env.local` and adjust `NEXT_PUBLIC_API_BASE` if needed.

Environment variables:
- `backend/.env`
  - `API_CORS_ORIGINS` (default `http://localhost:3000`)
- `frontend/.env.local`
  - `NEXT_PUBLIC_API_BASE` (default `http://localhost:8000`)

---

## UI overview
- Header with Computacenter logo and tabs (Solution Center / Local)
- Top controls on Solution Center: Search, Status filter, Sort (Name/Status), Refresh all
- Cards: title, description, chips (tech/tags), status pill, star to favorite, per‑card refresh
- Details modal: carousel, tech stack, architecture, platforms, last-checked, Repo/Docs/Close buttons
- Docs modal: inline documentation page for Predictive Maintenance

## Features
- Solution Center view (`/`): all apps with health status.
- Local Apps view (`/local`): apps runnable on Mac are normal; others are greyed but clickable.
- App details modal: carousel (1–2 images), tech stack, architecture notes, optional diagram link.
- Health checks: backend pings per-app health endpoint (1.5s timeout). Frontend shows `UP/DOWN/UNKNOWN` and can refresh per-card.
- Favorites: star to pin; order persists in `localStorage`.
- Accessible: modal Esc to close, focus outlines; carousel works with arrow keys.

---

## Project structure
```
backend/
  main.py
  routers/apps.py
  services/health.py
  models/schemas.py
  data/apps_seed.json
  requirements.txt
frontend/
  app/
    page.tsx          # Solution Center
    local/page.tsx    # Local Apps
  components/         # Cards, Modals, StatusPill, Carousel, NavTabs, Docs
  features/apps/      # API client + useApps hook
  types/app.ts
  public/images/
  styles/globals.css
  tailwind.config.ts
  postcss.config.js
  next.config.mjs
scripts/
  setup_all.sh
  run_backend.sh
  run_frontend.sh
```

## Adding a new app
1. Append a new entry to `backend/data/apps_seed.json`.
2. Place 1–4 images in `frontend/public/images` and reference them by path (e.g., `/images/my_app_1.png`).
3. Restart backend and refresh the frontend.

## Backend endpoints
- `GET /api/apps` → `list[AppInfo]` (with computed `health.status`).
- `GET /api/health/{id}` → `{ id, status }`.
- `GET /health` → `{ status: "UP" }` (root health).

## Tech
- Frontend: Next.js (App Router), TypeScript, TailwindCSS.
- Backend: FastAPI, httpx, uvicorn, Pydantic v2.
- Tooling: ESLint + Prettier.

---

## Development tips
- Scripts
  - `bash scripts/setup_all.sh` – create venv, install backend + frontend deps
  - `bash scripts/run_backend.sh` – start uvicorn dev server
  - `bash scripts/run_frontend.sh` – start Next.js dev server
- Lint/format
  - `npm run lint` (from `frontend/`)
- Troubleshooting
  - Port 8000 busy → change `uvicorn` port (`--port 8001`) and set `NEXT_PUBLIC_API_BASE=http://localhost:8001` in `frontend/.env.local`.
  - Images not showing → ensure paths in `apps_seed.json` match files under `frontend/public/images`.


