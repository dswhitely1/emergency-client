# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Emergency Electric INC — a Next.js client application for an electrical services company. Includes a public landing page, user authentication (email/password via Supabase), applicant dashboard (profile, employment, education, references), and an admin dashboard with applicant management, contact messages, and weather display.

## Commands

- **Dev server:** `npm run dev` (Next.js with Turbopack)
- **Build:** `npm run build` (Next.js)
- **Start production:** `npm run start`
- **Lint:** `npm run lint` (ESLint via `next lint`)
- **Generate Supabase types:** `npm run supabase:types` (requires project ID in package.json)

No test framework is configured.

## Architecture

### Stack
- Next.js 15 with App Router (TypeScript)
- React 19
- Tailwind CSS v4 for styling (CSS-first config via `@theme` in `globals.css`)
- shadcn/ui component library (`src/components/ui/`)
- Supabase (hosted) for auth, database, and RLS-based authorization
- `@supabase/ssr` for cookie-based auth with middleware session refresh
- dayjs for date formatting (with relativeTime plugin via `src/lib/dayjs.ts`)
- sonner for toast notifications

### Entry Points
- `src/app/layout.tsx` — root layout (metadata, Navigation, Toaster)
- `src/app/page.tsx` — public landing page (server component)
- `middleware.ts` — auth session refresh and role-based route protection

### State Management
No global state library. Server components fetch data directly from Supabase. Client components use local `useState` for form state and call Supabase browser client for mutations. Minimal React context usage.

### Supabase Integration
Three client factories in `src/lib/supabase/`:
- `client.ts` — browser client for client components (`createClient()`)
- `server.ts` — server client for server components (`createClient()`)
- `middleware.ts` — middleware client for session refresh (`updateSession()`)

TypeScript types in `src/types/supabase.ts` (placeholder, regenerate with `npm run supabase:types`).

### Database
SQL migration at `supabase/migrations/00001_initial_schema.sql`. Tables: `profiles`, `employment`, `education`, `references`, `contact_messages`. RLS policies enforce that users access only their own data; admins have read-only access to applicant data. A custom JWT hook injects `user_role` into token claims.

### Routing
File-system routing via Next.js App Router (`src/app/`):
- `/` — public landing page
- `/login`, `/register` — auth pages (email/password)
- `/dashboard` — authenticated applicant dashboard (layout with sidebar)
- `/dashboard/profile`, `/dashboard/employment`, `/dashboard/education`, `/dashboard/references` — CRUD sections
- `/admin/dashboard` — admin applicant list (server-side role guard)
- `/admin/dashboard/[id]` — admin applicant detail (read-only)
- `/admin/dashboard/messages` — admin contact messages
- `/api/weather` — weather.gov proxy route handler

Route protection is in `middleware.ts` (reads `user_role` from JWT claims).

### ESLint
Flat config (`eslint.config.mjs`) using `next/core-web-vitals` and `next/typescript`.

### Component Conventions
- shadcn/ui primitives in `src/components/ui/` (auto-generated, do not manually edit)
- Landing page sections in `src/components/landing/`
- Dashboard components in `src/components/dashboard/`
- Admin components in `src/components/admin/`
- Page-level components are in `src/app/` following Next.js App Router conventions
- Shared form components accept a `mode: "add" | "edit"` prop (employment, education, references)

### Brand Colors
Defined in `src/app/globals.css` under `@theme`:
- Primary: `#670300` (dark red)
- Secondary: `#b48a66` (tan/brown)
- Background: `#fbf7f5` (off-white)
- Destructive: `#a80400`
