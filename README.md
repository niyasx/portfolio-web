# niyas.dev — Personal portfolio

A single-page portfolio built with **Next.js 16** (App Router), **React 19**, and **Tailwind CSS 4**. It presents experience, selected work, services, and a contact flow backed by **PostgreSQL** (Prisma) and optional **SMTP** notifications.

Live content for profile, roles, and copy is driven from [`app/data/resume.ts`](app/data/resume.ts); the database schema in [`prisma/schema.prisma`](prisma/schema.prisma) supports contact messages and can extend to CMS-style `projects` / `experience` records.

---

## Features

- **Immersive layout** — Full-viewport background video, layered gradients, and typography via **Google Fonts** (Rajdhani, Poppins) in [`app/layout.tsx`](app/layout.tsx).
- **Motion and scroll** — **Lenis** smooth scrolling, **GSAP**-style reveals, **Framer Motion** for page entrance; see [`app/hooks/use-lenis.ts`](app/hooks/use-lenis.ts), [`app/animations/use-gsap-reveal.ts`](app/animations/use-gsap-reveal.ts), and [`app/components/portfolio-page.tsx`](app/components/portfolio-page.tsx).
- **Sections** — Hero, experience, works, services, about, tech stack, testimonials, partners, process, awards, pricing, FAQs, contact, and footer — composed in [`app/sections/portfolio-sections.tsx`](app/sections/portfolio-sections.tsx).
- **Contact API** — `POST /api/contact` accepts JSON or `multipart/form-data`, validates required fields, persists to `messages`, and sends mail when SMTP is configured ([`app/api/contact/route.ts`](app/api/contact/route.ts), [`app/lib/mailer.ts`](app/lib/mailer.ts)).
- **Data layer** — Prisma + PostgreSQL with models for `users`, `messages`, `projects`, and `experience` ([`prisma/schema.prisma`](prisma/schema.prisma)).

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
  api/contact/route.ts    # Contact form API
  components/             # Page shell and layout pieces
  data/resume.ts          # Profile, experience, projects, skills (editable)
  hooks/                  # Lenis integration
  animations/             # GSAP reveal helpers
  sections/               # Portfolio sections
  lib/                    # Prisma client, mailer
prisma/
  schema.prisma           # Database models and migrations source
```

---

## Previous experience & selected work

Summarized from the in-repo resume data (see [`app/data/resume.ts`](app/data/resume.ts) for the canonical list).

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
- **PostgreSQL** for Prisma  
- Optional: SMTP account for outbound contact emails  

### Install

```bash
npm install
```

### Environment

Copy the example file and fill in values:

```bash
cp .env.example .env
```

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string for Prisma |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Nodemailer transport (optional) |
| `CONTACT_TO_EMAIL` | Inbox for contact notifications (defaults to `SMTP_USER` if unset) |

If SMTP is missing, the API still stores messages; email sending returns a non-delivered result with reason `"SMTP not configured"` ([`app/lib/mailer.ts`](app/lib/mailer.ts)).

### Database

Generate the client and run migrations (from project root):

```bash
npm run prisma:generate
npm run prisma:migrate
```

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
| `npm run prisma:migrate` | Create/apply migrations in development |

---

## Deployment

This app is a standard Next.js deployment. Common options:

- **[Vercel](https://vercel.com)** — Connect the repo, set `DATABASE_URL` and SMTP variables in project settings, and ensure Postgres is reachable from the deployment region.  
- **Self-hosted / other Node hosts** — Run `npm run build` and `npm run start`, with the same environment variables and a managed PostgreSQL instance.

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
- **Background media** — The hero background video URL in [`portfolio-page.tsx`](app/components/portfolio-page.tsx) points to a third-party asset; replace it with your own hosted media for production if you need full control and rights.  

---

## Author

**Niyas Abdul Basheer** — Software / Flutter developer ([GitHub](https://github.com/niyasx), [LinkedIn](https://www.linkedin.com/in/niyas01)).  
Contact details in [`app/data/resume.ts`](app/data/resume.ts).
