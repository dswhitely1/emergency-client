# Emergency Electric Client — Full Rebuild Design

## Overview

Full rebuild of the Emergency Electric client application. Same features (landing page, auth, applicant dashboard, admin dashboard), modern stack, Supabase backend.

## Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS + shadcn/ui
- **Backend:** Supabase (hosted) — Auth, Postgres, RLS
- **State:** React context + hooks (minimal client state)
- **Auth:** `@supabase/ssr` with cookie-based sessions
- **Dates:** `dayjs` (replaces `moment`)

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=        # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Supabase anon/public key
```

No weather API key needed — weather.gov is a free public API.

## Project Structure

```
emergency-client/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (fonts, metadata, providers)
│   │   ├── page.tsx                # Landing page (server component)
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── dashboard/
│   │   │   ├── layout.tsx          # Dashboard shell (sidebar + auth guard)
│   │   │   ├── page.tsx            # Read-only application summary
│   │   │   ├── profile/page.tsx    # Edit profile form
│   │   │   ├── employment/
│   │   │   │   ├── page.tsx        # Employment list
│   │   │   │   ├── add/page.tsx    # Add employment
│   │   │   │   └── [id]/page.tsx   # Edit employment
│   │   │   ├── education/
│   │   │   │   ├── page.tsx        # Education list
│   │   │   │   ├── add/page.tsx    # Add education
│   │   │   │   └── [id]/page.tsx   # Edit education
│   │   │   └── references/
│   │   │       ├── page.tsx        # References list
│   │   │       ├── add/page.tsx    # Add reference
│   │   │       └── [id]/page.tsx   # Edit reference
│   │   ├── admin/
│   │   │   ├── layout.tsx          # Admin guard
│   │   │   └── dashboard/
│   │   │       ├── page.tsx        # Applicant list (default view)
│   │   │       ├── [id]/page.tsx   # Read-only applicant detail
│   │   │       └── messages/page.tsx
│   │   └── api/
│   │       └── weather/route.ts
│   ├── components/
│   │   ├── ui/                     # shadcn/ui components (auto-generated)
│   │   ├── landing/                # Landing page sections
│   │   ├── dashboard/              # Dashboard-specific components
│   │   └── admin/                  # Admin-specific components
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts           # Browser client
│   │   │   ├── server.ts           # Server component client
│   │   │   └── middleware.ts       # Middleware client
│   │   └── utils.ts
│   ├── hooks/
│   ├── contexts/
│   └── types/
├── supabase/
│   └── migrations/
├── middleware.ts
├── tailwind.config.ts
├── next.config.ts
└── components.json
```

## Database Schema

### profiles

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, FK → auth.users.id |
| first_name | text | |
| last_name | text | |
| phone | text | |
| address | text | |
| city | text | |
| state | text | |
| zip | text | |
| role | text | CHECK constraint: 'user' or 'admin', default 'user' |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now(), auto-updated via moddatetime trigger |

### employment

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, default gen_random_uuid() |
| user_id | uuid | FK → profiles.id |
| company | text | |
| position | text | |
| start_date | date | |
| end_date | date | nullable |
| description | text | |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now(), auto-updated via moddatetime trigger |

### education

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, default gen_random_uuid() |
| user_id | uuid | FK → profiles.id |
| institution | text | |
| degree | text | |
| field_of_study | text | |
| start_date | date | |
| end_date | date | nullable |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now(), auto-updated via moddatetime trigger |

### references

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, default gen_random_uuid() |
| user_id | uuid | FK → profiles.id |
| name | text | |
| relationship | text | |
| phone | text | |
| email | text | |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now(), auto-updated via moddatetime trigger |

### contact_messages

The landing page has a contact form that unauthenticated visitors can use. This is a separate table since RLS for unauthenticated inserts must be isolated from authenticated data.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, default gen_random_uuid() |
| first_name | text | |
| last_name | text | |
| contact | text | Email or phone number |
| subject | text | |
| message | text | |
| read | boolean | default false |
| created_at | timestamptz | default now() |

RLS: anon users can INSERT only. Admins can SELECT, UPDATE (mark as read), and DELETE.

### Database triggers

- **Auto-create profile:** On `auth.users` insert, create a `profiles` row with `role: 'user'`
- **moddatetime:** Applied to all tables with `updated_at` to auto-update on row changes

### Custom JWT hook

A Postgres function is registered as a Supabase Auth hook (Dashboard → Auth → Hooks → Customize Access Token) to inject the user's role into the JWT:

```sql
create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb language plpgsql as $$
declare
  user_role text;
begin
  select role into user_role from public.profiles where id = (event->>'user_id')::uuid;
  event := jsonb_set(event, '{claims,user_role}', to_jsonb(coalesce(user_role, 'user')));
  return event;
end;
$$;
```

The middleware reads `user_role` from the JWT claims without a database query.

## Row Level Security (RLS)

| Table | Anon | User | Admin |
|---|---|---|---|
| profiles | — | Read/update own | Read all (no edit) |
| employment | — | CRUD own | Read all (no edit) |
| education | — | CRUD own | Read all (no edit) |
| references | — | CRUD own | Read all (no edit) |
| contact_messages | Insert only | — | Read + update (mark read) + delete |

Admins have **no write access** to applicant data (profiles, employment, education, references). RLS enforces this at the database level.

**Note:** The current app has no authenticated user-to-admin messaging. The only messaging feature is the unauthenticated landing page contact form → admin reads messages. This rebuild preserves that scope. If bidirectional messaging is needed later, a `messages` table can be added.

## Authentication

### Flow

1. **Signup:** Email/password → Supabase creates auth.users row → trigger creates profiles row. No email verification required (matching current behavior). Note: the current app uses username-based auth; the rebuild switches to email-based auth since Supabase Auth is email-native.
2. **Login:** Email/password → Supabase returns session → stored in cookies via `@supabase/ssr`
3. **Logout:** Call `supabase.auth.signOut()`, clear cookies, redirect to `/`
4. **Session refresh:** Middleware refreshes session cookie on every request
5. **Password reset:** Not in current app. Out of scope for initial rebuild; can be added later via Supabase Auth's built-in reset flow.

### Admin promotion

Admins are created by direct database update (`UPDATE profiles SET role = 'admin' WHERE id = '...'`). There is no admin-creation UI. This matches the current app's behavior where admin accounts are seeded or promoted manually.

### Route Protection (middleware.ts)

| Route | Access |
|---|---|
| `/`, `/login`, `/register` | Public |
| `/dashboard/*` | Authenticated users (role = 'user') |
| `/admin/*` | Admin role only |

Redirects:
- Unauthenticated hitting protected route → `/login`
- Non-admin hitting `/admin/*` → `/dashboard`
- Authenticated user hitting `/login` or `/register` → `/dashboard`
- Admin hitting `/login` or `/register` → `/admin/dashboard`
- Admin hitting `/dashboard` → `/admin/dashboard`

## Applicant Flow

1. Register → lands on `/dashboard`
2. `/dashboard` shows a read-only summary of the full application (all sections)
3. Sidebar navigation to edit individual sections: profile, employment, education, references
4. Each section supports add/edit/delete via sub-routes (e.g., `/dashboard/employment/add`)
5. Can return and update application anytime

### Application completeness

Completeness is derived in the UI (not stored). An application is "complete" when:
- Profile has first name, last name, phone
- At least 1 employment entry
- At least 1 education entry
- At least 1 reference entry

## Admin Flow

1. Login → redirected to `/admin/dashboard`
2. **Applicant list** (`/admin/dashboard`): table of all applicants with name, email, date registered, completeness indicator
3. **Applicant detail** (`/admin/dashboard/[id]`): read-only view of full application
4. **Messages** (`/admin/dashboard/messages`): view contact form submissions, mark as read, delete
5. **Weather**: displayed on the admin dashboard layout (visible on all admin pages)

## Landing Page

Server-rendered, static content. Same sections as the current app:
- Header with company branding and phone number
- Hero / home page links
- Services overview
- Goals
- About the company
- Testimonials
- Contact form (unauthenticated, writes to `contact_messages`)
- Footer

No functional changes from current.

## Weather Feature

The admin dashboard displays local weather data from the weather.gov public API. Weather is rendered in the admin layout so it's visible on all admin pages (matching current behavior where it loads once on the admin dashboard).

**Route Handler:** `/api/weather/route.ts` proxies both endpoints and returns a combined response `{ alerts, conditions }`:
- `https://api.weather.gov/alerts/active/zone/INZ090` (weather alerts)
- `https://api.weather.gov/stations/KSDF/observations` (current conditions)

**Consumption:** The admin layout fetches from `/api/weather` as a server component. Data refreshes via Next.js `revalidate` (ISR) with a 10-minute interval, replacing the current client-side `setInterval` polling.

## Data Flow

- **Server components** (landing page, initial data loads) call Supabase with server client
- **Client components** (forms, interactive UI) call Supabase with browser client
- **Middleware** refreshes auth session cookies, reads role from JWT, handles route redirects
- **Weather:** Next.js Route Handler (`/api/weather`) proxies weather.gov, cached with 10-min ISR
- **Contact form:** Writes directly to `contact_messages` via Supabase anon client
- **No custom API layer.** The app talks directly to Supabase. RLS is the authorization layer.

## Navigation

A top-level navigation bar renders on all pages (replaces current `MainNavigation`):

- **Public (unauthenticated):** Logo, nav links (Services, About, Contact anchors), Login / Register buttons
- **Authenticated (user):** Logo, Dashboard link, Logout button
- **Authenticated (admin):** Logo, Applicants / Messages links, Logout button

The dashboard sidebar (within `/dashboard` layout) handles sub-navigation for application sections: Profile, Employment, Education, References.

## Error Handling

- **Route-level:** Next.js `error.tsx` files in each route segment for catching render errors
- **Form mutations:** Toast notifications (via shadcn/ui `sonner`) for success/error feedback
- **Loading states:** Next.js `loading.tsx` files with skeleton components for server component suspense
