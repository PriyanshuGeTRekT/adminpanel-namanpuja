# adminpanel-namanpuja

> 🚀 **New to the project?** Read the full setup guide:
> **[ONBOARDING.md](https://github.com/PriyanshuGeTRekT/backend-namanpuja/blob/main/ONBOARDING.md)**
> (install everything → run the whole stack with `docker compose up`). The four repos
> must be cloned as siblings in one folder.

Admin panel for [namanpuja.com](https://namanpuja.com) — manage pujas, cities, temples, SEO location pages and bookings.

## Tech stack

- **react-admin 5** (MUI) + **Vite** + **TypeScript**
- Talks to **backend-namanpuja** (`/api/admin`) via `ra-data-simple-rest`
- JWT auth (login → bearer token stored locally)
- Saffron / white brand theme to match the website

## Managed resources

| Resource | Purpose |
| --- | --- |
| **Pujas** | Master pujas — name, deity, price, rituals, samagri, FAQs (tabbed form) |
| **Location Pages** | SEO landing page for each puja × city (content + meta tags) |
| **Bookings** | Incoming bookings, status, and Atomic CRM sync status |
| **Temples** | Temple profiles with history & significance |
| **Cities / Countries** | The Country → City → Puja navigation tree |
| **Categories** | Puja categories |

Structured fields (benefits, rituals, samagri, FAQs, SEO meta) are edited as
JSON via a built-in JSON editor with validation.

## Getting started

```bash
cp .env.example .env          # point VITE_API_URL at the backend admin API
npm install
npm run dev                   # http://localhost:5173
```

Log in with the seeded admin credentials (see backend `.env` —
`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`).

## Build

```bash
npm run build && npm run preview
```
