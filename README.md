# niyas.dev — Personal portfolio

A single-page portfolio built with **Next.js 16** (App Router), **React 19**, and **Tailwind CSS 4**. Public copy, media URLs, and structured sections are loaded from **PostgreSQL** via Prisma ([`app/lib/site-content.ts`](app/lib/site-content.ts)). A password-protected **admin** area at `/admin` (with login at `/admin/login`) lets you edit that content and upload images to **Vercel Blob**. Contact submissions still go through `POST /api/contact` with optional **SMTP** notifications.

[`app/data/resume.ts`](app/data/resume.ts) is kept only as a reference; the running site does not read it after you migrate and seed the database.

---

## Features

- **Immersive layout** — Full-viewport background video, layered gradients, and typography via **Google Fonts** (Rajdhani, Poppins) in [`app/layout.tsx`](app/layout.tsx).
- **Motion and scroll** — **Lenis** smooth scrolling, **GSAP**-style reveals, **Framer Motion** for page entrance; see [`app/hooks/use-lenis.ts`](app/hooks/use-lenis.ts), [`app/animations/use-gsap-reveal.ts`](app/animations/use-gsap-reveal.ts), and [`app/components/portfolio-page.tsx`](app/components/portfolio-page.tsx).
- **Sections** — Hero, experience, works, services, about, tech stack, testimonials, partners, process, awards, pricing, FAQs, contact, and footer — composed in [`app/sections/portfolio-sections.tsx`](app/sections/portfolio-sections.tsx), fed by serialized DB content from the server.
- **Contact API** — `POST /api/contact` accepts JSON or `multipart/form-data`, validates required fields, persists to `messages`, and sends mail when SMTP is configured ([`app/api/contact/route.ts`](app/api/contact/route.ts), [`app/lib/mailer.ts`](app/lib/mailer.ts)).
- **Admin CMS** — Credentials auth ([Auth.js](https://authjs.dev) / `next-auth` v5), CRUD server actions under [`app/admin/actions/content.ts`](app/admin/actions/content.ts), uploads via [`app/admin/actions/upload.ts`](app/admin/actions/upload.ts).
- **Data layer** — Prisma + PostgreSQL: `site_profile`, hero tags/stats, `projects`, `experience`, services, tech stack, testimonials, partners, process steps, awards, pricing plans, FAQ items, `messages`, and `admin_users` ([`prisma/schema.prisma`](prisma/schema.prisma)).

---

## Tech stack

| Area | Choices |
|------|---------|
| Framework | Next.js 16.2, App Router |
| UI | React 19, Tailwind CSS 4, `@base-ui/react`, shadcn-related tooling |
| Animation | Framer Motion, GSAP, Lenis, Split Type, Swiper |
| Database | PostgreSQL, Prisma 6 |
| Email | Nodemailer (SMTP) |
| Language | TypeScript 5 |

---

## Project structure (high level)

```
app/
  admin/                  # Login + dashboard (protected)
  api/auth/               # Auth.js route handlers
  api/contact/route.ts    # Contact form API
  components/             # Page shell and layout pieces
  data/resume.ts          # Legacy reference only (not used at runtime)
  lib/                    # Prisma, site content loader, mailer
  sections/               # Portfolio sections (props from DB)
prisma/
  schema.prisma
  seed.ts                 # Initial content + optional admin user
```

---

## Previous experience & selected work

Summarized from the original resume data (canonical content now lives in the database after seeding).

### Experience

1. **PACE Group (UAE)** — Flutter Developer (Full Stack), Dec 2025 – Present  
   Multi-app ecosystem (Android, iOS, web, Linux), SmartPACE (student/parent/staff + admin), PostgreSQL and Next.js APIs, MQTT + Maps for transport, ZKTeco attendance, Firebase, payments, ERP sync, CI/CD.

2. **Rigved Infotech** — Frontend Developer, Apr 2024 – Aug 2025  
   Enterprise Flutter apps at scale, ShreeSahyog (SSO, RBAC, WebSockets), performance work, mentoring.

3. **New Xtended Technology** — Flutter Developer, Dec 2023 – Mar 2024  

4. **Edapt** — Flutter Intern, May 2023 – Dec 2023  

### Highlight projects (from resume)

- **ShreeSahyog** — Enterprise bidding; SSO, RBAC, WebSockets; 500+ concurrent users.  
- **HerNeeds** — Charity and education; payments; Firebase auth and notifications.  
- **TruConnect** — Large e-commerce catalog; real-time tracking, chat, filters; strong performance focus.  

Skills called out in data include Flutter/Dart, Firebase, REST, WebSockets, JWT/OAuth, BLoC/GetX/Provider, Clean Architecture, PostgreSQL, Next.js APIs, CI/CD, and performance optimization.

---

## Getting started

### Prerequisites

- **Node.js** (LTS recommended; align with your deployment target)  
- **PostgreSQL** — managed instance (e.g. **Supabase**) or **Docker Desktop** with [`docker-compose.yml`](docker-compose.yml)  
- Optional: SMTP account for outbound contact emails  

### Security note (passwords)

If your database password was ever pasted into chat, a ticket, or a screenshot, **rotate it** in the provider dashboard (Supabase: **Project Settings → Database**) and update `DATABASE_URL`. Never commit real secrets; `.env` is gitignored.

### Supabase (hosted Postgres)

This app uses **Prisma only** — no Supabase client SDK is required. Supabase is standard PostgreSQL.

1. Create a project in [Supabase](https://supabase.com) and open **Settings → Database**.
2. Copy the **URI** (or build `postgresql://postgres:<PASSWORD>@db.<ref>.supabase.co:5432/postgres`). **URL-encode** characters in the password (`@` → `%40`, `#`, etc.). Ensure **`sslmode=require`** is present (append `?sslmode=require` if missing).
3. Set `DATABASE_URL` in `.env` (see [`.env.example`](.env.example)).
4. From the project root:

```bash
npm install
npm run prisma:generate
npm run prisma:deploy
npm run db:seed
```

Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` before `db:seed` if you want an admin user created, or run `npm run create-admin` afterward (loads `.env` via `node --env-file=.env`).

5. `npm run dev` — the site and `/admin` read and write this database.

If you hit **too many connections** from a serverless host later, consider Supabase’s **connection pooler** and Prisma’s `directUrl` for migrations (see [Prisma + Supabase](https://www.prisma.io/docs/guides/database/supabase)); the direct `5432` URL is enough to start.

If **`prisma migrate deploy`** fails with **P1001** (cannot reach server), check that the Supabase project is **not paused**, **Database password** in the URI is correct (and URL-encoded), and your network allows outbound **5432** to Supabase.

### Fast path (local Docker only)

If you use **Docker Desktop** and local Postgres instead of Supabase:

```bash
npm install
npm run setup:local
npm run dev
```

[`docker-compose.yml`](docker-compose.yml) maps Postgres to host port **5433** (inside the container it is still 5432). User, password, and database name are all `portfolio`. Your `DATABASE_URL` must use `localhost:5433`.

### Install

```bash
npm install
```

### Environment

If you do not have a `.env` yet, copy the example and edit values:

```bash
cp .env.example .env
```

Set `DATABASE_URL` to your **Supabase** URI (see **Supabase** above) or, for Docker-only setups, align it with [`docker-compose.yml`](docker-compose.yml).

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string for Prisma |
| `AUTH_SECRET` | Secret for Auth.js sessions and admin `proxy` (JWT) checks |
| `AUTH_URL` | Optional; site origin (e.g. `https://yourdomain.com`) — often inferred on Vercel |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token for admin uploads ([Vercel Blob docs](https://vercel.com/docs/storage/vercel-blob)) |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | **Seed / `npm run create-admin` only** — creates or updates the `admin_users` row (never commit real passwords) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Nodemailer transport (optional) |
| `CONTACT_TO_EMAIL` | Inbox for contact notifications (defaults to `SMTP_USER` if unset) |

If SMTP is missing, the API still stores messages; email sending returns a non-delivered result with reason `"SMTP not configured"` ([`app/lib/mailer.ts`](app/lib/mailer.ts)).

### Database

Generate the client, apply migrations, and seed initial site content (from project root).

**New database (e.g. Supabase):** apply existing migrations without creating new ones:

```bash
npm run prisma:generate
npm run prisma:deploy
```

**Local iteration:** create or update migrations during development:

```bash
npm run prisma:migrate
```

Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` **before** seeding if you want the first admin account created automatically, then:

```bash
npm run db:seed
```

Alternatively, after migrations:

```bash
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='your-secure-password' npm run create-admin
```

Then sign in at `/admin/login`.

### Development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The main entry is [`app/page.tsx`](app/page.tsx), which renders [`PortfolioPage`](app/components/portfolio-page.tsx).

### Production build

```bash
npm run build
npm run start
```

---

## npm scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js in development mode |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Create/apply migrations in development (`migrate dev`) |
| `npm run prisma:deploy` | Apply existing migrations only (`migrate deploy` — CI / production / after `setup:local`) |
| `npm run db:seed` | Reset and populate CMS tables (see `prisma/seed.ts`) |
| `npm run create-admin` | Upsert admin user from `ADMIN_EMAIL` / `ADMIN_PASSWORD` |
| `npm run setup:local` | Docker Postgres up → `prisma migrate deploy` → `db seed` ([`scripts/setup-local.sh`](scripts/setup-local.sh)) |

---

## Deployment

This app is a standard Next.js deployment. Common options:

- **[Vercel](https://vercel.com)** — Connect the repo; configure environment variables below; run **`npx prisma migrate deploy`** against the **production** `DATABASE_URL` whenever migrations change (CI step or manual).  
- **Self-hosted / other Node hosts** — Run `npm run build` and `npm run start`, with the same environment variables and a managed PostgreSQL instance.

### Vercel environment variables

| Variable | Required | Notes |
|----------|----------|--------|
| `DATABASE_URL` | Yes | Same pattern as local (e.g. Supabase URI with `sslmode=require`). |
| `AUTH_SECRET` | Yes | Strong random string; not the dev default. |
| `AUTH_URL` | Recommended | Canonical site URL, e.g. `https://your-domain.vercel.app` or custom domain — helps Auth.js cookies and redirects. |
| `BLOB_READ_WRITE_TOKEN` | If using admin uploads | From Vercel → Storage → Blob. |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | One-time bootstrap | Use locally with `npm run create-admin` against prod DB, or set temporarily in Vercel for a one-off deploy hook — do not leave production passwords in Vercel longer than needed. |
| SMTP + `CONTACT_TO_EMAIL` | Optional | Contact form email delivery. |

Apply Prisma migrations against your production database before or as part of your release process.

---

## Learn more (Next.js)

This repository started from the Next.js App Router template. Official references:

- [Next.js Documentation](https://nextjs.org/docs)  
- [Learn Next.js](https://nextjs.org/learn)  
- [Next.js GitHub repository](https://github.com/vercel/next.js)  

---

## License & credits

- **Private** — `package.json` marks the package as private; adjust licensing if you open-source the repo.  
- **Background media** — Default background video URL is stored in `site_profile.backgroundVideoUrl` (seeded from a third-party asset); override it in **Admin → Profile & media** or in the database for production rights and performance.  

---

## Author

**Niyas Abdul Basheer** — Software / Flutter developer ([GitHub](https://github.com/niyasx), [LinkedIn](https://www.linkedin.com/in/niyas01)).  
Contact details are editable in the admin **Profile** screen (stored in `site_profile`).
