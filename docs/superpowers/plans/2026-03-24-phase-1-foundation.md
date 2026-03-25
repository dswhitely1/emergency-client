# Phase 1: Foundation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up the Next.js 15 + Supabase foundation with auth, middleware, navigation, and project scaffolding.

**Architecture:** Next.js 15 App Router with TypeScript, Tailwind CSS + shadcn/ui for styling, Supabase (hosted) for auth and database. Cookie-based auth via @supabase/ssr with middleware-based route protection. Custom JWT hook injects user role into token claims.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Supabase (@supabase/supabase-js, @supabase/ssr), dayjs

---

### Task 1: Remove Old Vite Project and Initialize Next.js 15

**Files:**
- Remove: `vite.config.js`, `eslint.config.js`, `index.html`, `src/main.jsx`, `src/index.scss`
- Remove: `src/components/`, `src/store/`, `src/contexts/`, `src/hooks/`
- Create: `package.json` (replaced by Next.js)
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `.env.local`

- [ ] **Step 1: Create a new branch for the rebuild**
```bash
cd /home/don/dev/2026/emergency-client
git checkout -b rebuild/nextjs-foundation
```
Expected output:
```
Switched to a new branch 'rebuild/nextjs-foundation'
```

- [ ] **Step 2: Remove old source files (keep docs/ and assets)**
```bash
cd /home/don/dev/2026/emergency-client
rm -rf src/components src/store src/contexts src/hooks src/index.scss src/main.jsx
rm -f vite.config.js eslint.config.js index.html
```
Expected output: (no output, files removed silently)

- [ ] **Step 3: Remove old dependencies and install Next.js stack**
```bash
cd /home/don/dev/2026/emergency-client
rm -rf node_modules package-lock.json
```
Expected output: (no output)

- [ ] **Step 4: Write the new package.json**

Write `package.json`:
```json
{
  "name": "emergency-client",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "supabase:types": "npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/supabase.ts"
  },
  "dependencies": {
    "@supabase/ssr": "^0.6.1",
    "@supabase/supabase-js": "^2.49.4",
    "dayjs": "^1.11.13",
    "next": "^15.3.1",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "sonner": "^2.0.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.4",
    "@types/node": "^22.15.3",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "eslint": "^9.25.1",
    "eslint-config-next": "^15.3.1",
    "tailwindcss": "^4.1.4",
    "typescript": "^5.8.3"
  }
}
```

- [ ] **Step 5: Write next.config.ts**

Write `next.config.ts`:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Future config options here
};

export default nextConfig;
```

- [ ] **Step 6: Write tsconfig.json**

Write `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 7: Write .env.local with placeholder values**

Write `.env.local`:
```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

- [ ] **Step 8: Add .env.local to .gitignore**

Ensure `.gitignore` contains:
```
# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files
.env
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

- [ ] **Step 9: Create the src directory structure**
```bash
cd /home/don/dev/2026/emergency-client
mkdir -p src/app
mkdir -p src/components/ui
mkdir -p src/lib/supabase
mkdir -p src/hooks
mkdir -p src/contexts
mkdir -p src/types
mkdir -p supabase/migrations
```
Expected output: (no output)

- [ ] **Step 10: Install dependencies**
```bash
cd /home/don/dev/2026/emergency-client
npm install
```
Expected output: (npm install output with added packages count)

- [ ] **Step 11: Commit**
```bash
cd /home/don/dev/2026/emergency-client
git add package.json package-lock.json next.config.ts tsconfig.json .gitignore .env.local
git commit -m "feat: scaffold Next.js 15 project, remove Vite setup"
```

---

### Task 2: Configure Tailwind CSS and shadcn/ui

**Files:**
- Create: `src/app/globals.css`
- Create: `postcss.config.mjs`
- Create: `components.json`
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Write postcss.config.mjs**

Write `postcss.config.mjs`:
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 2: Write src/app/globals.css with Tailwind and custom theme**

Write `src/app/globals.css`:
```css
@import "tailwindcss";

@theme {
  /* Emergency Electric brand colors */
  --color-primary: #670300;
  --color-primary-foreground: #ffffff;
  --color-secondary: #b48a66;
  --color-secondary-foreground: #ffffff;
  --color-background: #fbf7f5;
  --color-foreground: #1a1a1a;
  --color-card: #ffffff;
  --color-card-foreground: #1a1a1a;
  --color-popover: #ffffff;
  --color-popover-foreground: #1a1a1a;
  --color-muted: #f3ede9;
  --color-muted-foreground: #6b6560;
  --color-accent: #f3ede9;
  --color-accent-foreground: #670300;
  --color-destructive: #a80400;
  --color-destructive-foreground: #ffffff;
  --color-border: #e5ddd7;
  --color-input: #e5ddd7;
  --color-ring: #670300;

  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
}

@layer base {
  body {
    @apply bg-background text-foreground;
    font-family: system-ui, -apple-system, sans-serif;
  }
}
```

- [ ] **Step 3: Write src/lib/utils.ts**

Write `src/lib/utils.ts`:
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Install shadcn/ui utility dependencies**
```bash
cd /home/don/dev/2026/emergency-client
npm install clsx tailwind-merge class-variance-authority lucide-react
```
Expected output: (npm install output with added packages)

- [ ] **Step 5: Write components.json for shadcn/ui**

Write `components.json`:
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

- [ ] **Step 6: Add shadcn/ui components needed for Phase 1**
```bash
cd /home/don/dev/2026/emergency-client
npx shadcn@latest add button input label card navigation-menu sheet separator --yes
```
Expected output:
```
✔ Done.
```

- [ ] **Step 7: Commit**
```bash
cd /home/don/dev/2026/emergency-client
git add postcss.config.mjs src/app/globals.css src/lib/utils.ts components.json src/components/ui/
git commit -m "feat: configure Tailwind CSS v4 and shadcn/ui with brand theme"
```

---

### Task 3: Supabase SQL Migration — Tables, RLS, Triggers, JWT Hook

**Files:**
- Create: `supabase/migrations/00001_initial_schema.sql`

- [ ] **Step 1: Write the complete SQL migration**

Write `supabase/migrations/00001_initial_schema.sql`:
```sql
-- =============================================================================
-- Emergency Electric — Initial Schema Migration
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. Extensions
-- ---------------------------------------------------------------------------
create extension if not exists moddatetime schema extensions;

-- ---------------------------------------------------------------------------
-- 2. Tables
-- ---------------------------------------------------------------------------

-- profiles (linked 1:1 with auth.users)
create table public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  first_name text not null default '',
  last_name  text not null default '',
  phone      text not null default '',
  address    text not null default '',
  city       text not null default '',
  state      text not null default '',
  zip        text not null default '',
  role       text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- employment
create table public.employment (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  company     text not null default '',
  position    text not null default '',
  start_date  date,
  end_date    date,
  description text not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- education
create table public.education (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references public.profiles(id) on delete cascade,
  institution    text not null default '',
  degree         text not null default '',
  field_of_study text not null default '',
  start_date     date,
  end_date       date,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- references
create table public.references (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  name         text not null default '',
  relationship text not null default '',
  phone        text not null default '',
  email        text not null default '',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- contact_messages (public contact form submissions)
create table public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name  text not null,
  contact    text not null,
  subject    text not null,
  message    text not null,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 3. Indexes
-- ---------------------------------------------------------------------------
create index idx_employment_user_id on public.employment(user_id);
create index idx_education_user_id on public.education(user_id);
create index idx_references_user_id on public.references(user_id);
create index idx_contact_messages_read on public.contact_messages(read);

-- ---------------------------------------------------------------------------
-- 4. moddatetime triggers (auto-update updated_at)
-- ---------------------------------------------------------------------------
create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row execute procedure moddatetime(updated_at);

create trigger handle_employment_updated_at
  before update on public.employment
  for each row execute procedure moddatetime(updated_at);

create trigger handle_education_updated_at
  before update on public.education
  for each row execute procedure moddatetime(updated_at);

create trigger handle_references_updated_at
  before update on public.references
  for each row execute procedure moddatetime(updated_at);

-- ---------------------------------------------------------------------------
-- 5. Auto-create profile on user signup
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'user');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- 6. Custom JWT hook — inject user role into access token claims
-- ---------------------------------------------------------------------------
-- NOTE: After running this migration, you must enable this hook in the
-- Supabase Dashboard: Auth → Hooks → Customize Access Token (JWT Claims)
-- Select: public.custom_access_token_hook
-- ---------------------------------------------------------------------------
create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
as $$
declare
  user_role text;
begin
  select role into user_role
  from public.profiles
  where id = (event->>'user_id')::uuid;

  event := jsonb_set(
    event,
    '{claims,user_role}',
    to_jsonb(coalesce(user_role, 'user'))
  );

  return event;
end;
$$;

-- Grant necessary permissions for the auth hook
grant usage on schema public to supabase_auth_admin;
grant execute on function public.custom_access_token_hook to supabase_auth_admin;
grant select on table public.profiles to supabase_auth_admin;
revoke execute on function public.custom_access_token_hook from authenticated, anon, public;

-- ---------------------------------------------------------------------------
-- 7. Enable Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.employment enable row level security;
alter table public.education enable row level security;
alter table public.references enable row level security;
alter table public.contact_messages enable row level security;

-- ---------------------------------------------------------------------------
-- 8. RLS Policies — profiles
-- ---------------------------------------------------------------------------

-- Users can read their own profile
create policy "Users can read own profile"
  on public.profiles for select
  to authenticated
  using (
    auth.uid() = id
  );

-- Users can update their own profile (but not role)
create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (
    auth.uid() = id
    and (auth.jwt()->>'user_role') = 'user'
  )
  with check (
    auth.uid() = id
    and role = 'user'
  );

-- Admins can read all profiles
create policy "Admins can read all profiles"
  on public.profiles for select
  to authenticated
  using (
    (auth.jwt()->>'user_role') = 'admin'
  );

-- ---------------------------------------------------------------------------
-- 9. RLS Policies — employment
-- ---------------------------------------------------------------------------

-- Users can read their own employment records
create policy "Users can read own employment"
  on public.employment for select
  to authenticated
  using (auth.uid() = user_id);

-- Users can insert their own employment records
create policy "Users can insert own employment"
  on public.employment for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and (auth.jwt()->>'user_role') = 'user'
  );

-- Users can update their own employment records
create policy "Users can update own employment"
  on public.employment for update
  to authenticated
  using (
    auth.uid() = user_id
    and (auth.jwt()->>'user_role') = 'user'
  );

-- Users can delete their own employment records
create policy "Users can delete own employment"
  on public.employment for delete
  to authenticated
  using (
    auth.uid() = user_id
    and (auth.jwt()->>'user_role') = 'user'
  );

-- Admins can read all employment records
create policy "Admins can read all employment"
  on public.employment for select
  to authenticated
  using ((auth.jwt()->>'user_role') = 'admin');

-- ---------------------------------------------------------------------------
-- 10. RLS Policies — education
-- ---------------------------------------------------------------------------

-- Users can read their own education records
create policy "Users can read own education"
  on public.education for select
  to authenticated
  using (auth.uid() = user_id);

-- Users can insert their own education records
create policy "Users can insert own education"
  on public.education for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and (auth.jwt()->>'user_role') = 'user'
  );

-- Users can update their own education records
create policy "Users can update own education"
  on public.education for update
  to authenticated
  using (
    auth.uid() = user_id
    and (auth.jwt()->>'user_role') = 'user'
  );

-- Users can delete their own education records
create policy "Users can delete own education"
  on public.education for delete
  to authenticated
  using (
    auth.uid() = user_id
    and (auth.jwt()->>'user_role') = 'user'
  );

-- Admins can read all education records
create policy "Admins can read all education"
  on public.education for select
  to authenticated
  using ((auth.jwt()->>'user_role') = 'admin');

-- ---------------------------------------------------------------------------
-- 11. RLS Policies — references
-- ---------------------------------------------------------------------------

-- Users can read their own references
create policy "Users can read own references"
  on public.references for select
  to authenticated
  using (auth.uid() = user_id);

-- Users can insert their own references
create policy "Users can insert own references"
  on public.references for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and (auth.jwt()->>'user_role') = 'user'
  );

-- Users can update their own references
create policy "Users can update own references"
  on public.references for update
  to authenticated
  using (
    auth.uid() = user_id
    and (auth.jwt()->>'user_role') = 'user'
  );

-- Users can delete their own references
create policy "Users can delete own references"
  on public.references for delete
  to authenticated
  using (
    auth.uid() = user_id
    and (auth.jwt()->>'user_role') = 'user'
  );

-- Admins can read all references
create policy "Admins can read all references"
  on public.references for select
  to authenticated
  using ((auth.jwt()->>'user_role') = 'admin');

-- ---------------------------------------------------------------------------
-- 12. RLS Policies — contact_messages
-- ---------------------------------------------------------------------------

-- Anyone (anon) can insert a contact message
create policy "Anyone can insert contact messages"
  on public.contact_messages for insert
  to anon
  with check (true);

-- Admins can read all contact messages
create policy "Admins can read contact messages"
  on public.contact_messages for select
  to authenticated
  using ((auth.jwt()->>'user_role') = 'admin');

-- Admins can update contact messages (mark as read)
create policy "Admins can update contact messages"
  on public.contact_messages for update
  to authenticated
  using ((auth.jwt()->>'user_role') = 'admin');

-- Admins can delete contact messages
create policy "Admins can delete contact messages"
  on public.contact_messages for delete
  to authenticated
  using ((auth.jwt()->>'user_role') = 'admin');
```

- [ ] **Step 2: Commit**
```bash
cd /home/don/dev/2026/emergency-client
git add supabase/migrations/00001_initial_schema.sql
git commit -m "feat: add Supabase SQL migration with tables, RLS, triggers, JWT hook"
```

---

### Task 4: Supabase Client Libraries

**Files:**
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/middleware.ts`

- [ ] **Step 1: Write the browser client**

Write `src/lib/supabase/client.ts`:
```ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

- [ ] **Step 2: Write the server client**

Write `src/lib/supabase/server.ts`:
```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method is called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },
      },
    }
  );
}
```

- [ ] **Step 3: Write the middleware client**

Write `src/lib/supabase/middleware.ts`:
```ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh the session — this is critical for keeping auth alive
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabase, user, supabaseResponse };
}
```

- [ ] **Step 4: Commit**
```bash
cd /home/don/dev/2026/emergency-client
git add src/lib/supabase/client.ts src/lib/supabase/server.ts src/lib/supabase/middleware.ts
git commit -m "feat: add Supabase client libraries (browser, server, middleware)"
```

---

### Task 5: Supabase TypeScript Types Setup

**Files:**
- Create: `src/types/supabase.ts`

- [ ] **Step 1: Write a placeholder types file**

This file will be regenerated by `npm run supabase:types` once the database is provisioned. For now, create a placeholder with the expected shape so other code can import from it.

Write `src/types/supabase.ts`:
```ts
// Auto-generated by: npm run supabase:types
// Regenerate after any database schema change.
// Placeholder until connected to a live Supabase project.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          phone: string;
          address: string;
          city: string;
          state: string;
          zip: string;
          role: "user" | "admin";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          first_name?: string;
          last_name?: string;
          phone?: string;
          address?: string;
          city?: string;
          state?: string;
          zip?: string;
          role?: "user" | "admin";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          phone?: string;
          address?: string;
          city?: string;
          state?: string;
          zip?: string;
          role?: "user" | "admin";
          created_at?: string;
          updated_at?: string;
        };
      };
      employment: {
        Row: {
          id: string;
          user_id: string;
          company: string;
          position: string;
          start_date: string | null;
          end_date: string | null;
          description: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          company?: string;
          position?: string;
          start_date?: string | null;
          end_date?: string | null;
          description?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          company?: string;
          position?: string;
          start_date?: string | null;
          end_date?: string | null;
          description?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      education: {
        Row: {
          id: string;
          user_id: string;
          institution: string;
          degree: string;
          field_of_study: string;
          start_date: string | null;
          end_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          institution?: string;
          degree?: string;
          field_of_study?: string;
          start_date?: string | null;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          institution?: string;
          degree?: string;
          field_of_study?: string;
          start_date?: string | null;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      references: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          relationship: string;
          phone: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name?: string;
          relationship?: string;
          phone?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          relationship?: string;
          phone?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          contact: string;
          subject: string;
          message: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          contact: string;
          subject: string;
          message: string;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          contact?: string;
          subject?: string;
          message?: string;
          read?: boolean;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      custom_access_token_hook: {
        Args: { event: Json };
        Returns: Json;
      };
    };
    Enums: Record<string, never>;
  };
}
```

- [ ] **Step 2: Commit**
```bash
cd /home/don/dev/2026/emergency-client
git add src/types/supabase.ts
git commit -m "feat: add Supabase TypeScript type definitions (placeholder)"
```

---

### Task 6: Auth Middleware with Route Protection

**Files:**
- Create: `middleware.ts`

- [ ] **Step 1: Write the middleware**

Write `middleware.ts` (project root):
```ts
import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, user, supabaseResponse } = await updateSession(request);
  const { pathname } = request.nextUrl;

  // Read user role from JWT claims
  let userRole: string | null = null;
  if (user) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    userRole = (session?.access_token
      ? JSON.parse(atob(session.access_token.split(".")[1]))?.user_role
      : null) ?? "user";
  }

  const isAuthenticated = !!user;
  const isAdmin = userRole === "admin";

  // --- Auth pages: redirect authenticated users away ---
  if (pathname === "/login" || pathname === "/register") {
    if (isAuthenticated) {
      const redirectTo = isAdmin ? "/admin/dashboard" : "/dashboard";
      const url = request.nextUrl.clone();
      url.pathname = redirectTo;
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  // --- Dashboard routes: require authentication with 'user' role ---
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    if (isAdmin) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  // --- Admin routes: require admin role ---
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    if (!isAdmin) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  // --- Public routes: pass through ---
  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon)
     * - public assets (svg, png, jpg, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

- [ ] **Step 2: Commit**
```bash
cd /home/don/dev/2026/emergency-client
git add middleware.ts
git commit -m "feat: add auth middleware with role-based route protection"
```

---

### Task 7: Root Layout with Metadata and Providers

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/loading.tsx`
- Create: `src/app/error.tsx`
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Write the root layout**

Write `src/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Navigation } from "@/components/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emergency Electric INC",
  description:
    "Emergency Electric INC — Licensed electrical services. Apply online or contact us for residential and commercial electrical work.",
  keywords: [
    "electrician",
    "electrical services",
    "emergency electric",
    "residential electrical",
    "commercial electrical",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased">
        <Navigation />
        <main>{children}</main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Write the root loading state**

Write `src/app/loading.tsx`:
```tsx
export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Write the root error boundary**

Write `src/app/error.tsx`:
```tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold text-foreground">
        Something went wrong
      </h2>
      <p className="text-sm text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>
      <Button onClick={reset} variant="outline">
        Try again
      </Button>
    </div>
  );
}
```

- [ ] **Step 4: Write the not-found page**

Write `src/app/not-found.tsx`:
```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
      <p className="text-sm text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Button asChild variant="outline">
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}
```

- [ ] **Step 5: Commit**
```bash
cd /home/don/dev/2026/emergency-client
git add src/app/layout.tsx src/app/loading.tsx src/app/error.tsx src/app/not-found.tsx src/app/globals.css
git commit -m "feat: add root layout with metadata, error boundary, and loading state"
```

---

### Task 8: Navigation Bar Component (3 States)

**Files:**
- Create: `src/components/navigation.tsx`
- Create: `src/app/page.tsx` (minimal placeholder so the app can render)

- [ ] **Step 1: Write the navigation component**

Write `src/components/navigation.tsx`:
```tsx
"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Zap, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

type UserState = {
  isAuthenticated: boolean;
  role: "user" | "admin" | null;
};

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [userState, setUserState] = useState<UserState>({
    isAuthenticated: false,
    role: null,
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function getUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.access_token) {
        const payload = JSON.parse(atob(session.access_token.split(".")[1]));
        setUserState({
          isAuthenticated: true,
          role: payload.user_role ?? "user",
        });
      } else {
        setUserState({ isAuthenticated: false, role: null });
      }
    }

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.access_token) {
        const payload = JSON.parse(atob(session.access_token.split(".")[1]));
        setUserState({
          isAuthenticated: true,
          role: payload.user_role ?? "user",
        });
      } else {
        setUserState({ isAuthenticated: false, role: null });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserState({ isAuthenticated: false, role: null });
    startTransition(() => {
      router.push("/");
      router.refresh();
    });
  }

  const closeMobile = () => setMobileOpen(false);

  const { isAuthenticated, role } = userState;
  const isAdmin = role === "admin";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href={isAuthenticated ? (isAdmin ? "/admin/dashboard" : "/dashboard") : "/"}
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <Zap className="h-5 w-5 text-secondary" />
          <span>Emergency Electric INC</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {!isAuthenticated && (
            <>
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/#services">Services</Link>
              </Button>
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/#about">About</Link>
              </Button>
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/#contact">Contact</Link>
              </Button>
              <Separator orientation="vertical" className="mx-2 h-6 bg-primary-foreground/20" />
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                variant="secondary"
                className="text-secondary-foreground"
                asChild
              >
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}

          {isAuthenticated && !isAdmin && (
            <>
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Separator orientation="vertical" className="mx-2 h-6 bg-primary-foreground/20" />
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={handleLogout}
                disabled={isPending}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          )}

          {isAuthenticated && isAdmin && (
            <>
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/admin/dashboard">Applicants</Link>
              </Button>
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/admin/dashboard/messages">Messages</Link>
              </Button>
              <Separator orientation="vertical" className="mx-2 h-6 bg-primary-foreground/20" />
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={handleLogout}
                disabled={isPending}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-background">
            <nav className="flex flex-col gap-2 pt-8">
              {!isAuthenticated && (
                <>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/#services" onClick={closeMobile}>
                      Services
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/#about" onClick={closeMobile}>
                      About
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/#contact" onClick={closeMobile}>
                      Contact
                    </Link>
                  </Button>
                  <Separator className="my-2" />
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/login" onClick={closeMobile}>
                      Login
                    </Link>
                  </Button>
                  <Button variant="default" className="justify-start" asChild>
                    <Link href="/register" onClick={closeMobile}>
                      Register
                    </Link>
                  </Button>
                </>
              )}

              {isAuthenticated && !isAdmin && (
                <>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/dashboard" onClick={closeMobile}>
                      Dashboard
                    </Link>
                  </Button>
                  <Separator className="my-2" />
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      closeMobile();
                      handleLogout();
                    }}
                    disabled={isPending}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              )}

              {isAuthenticated && isAdmin && (
                <>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/admin/dashboard" onClick={closeMobile}>
                      Applicants
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/admin/dashboard/messages" onClick={closeMobile}>
                      Messages
                    </Link>
                  </Button>
                  <Separator className="my-2" />
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      closeMobile();
                      handleLogout();
                    }}
                    disabled={isPending}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Write a minimal landing page placeholder**

Write `src/app/page.tsx`:
```tsx
export default function HomePage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-4xl font-bold text-primary">Emergency Electric INC</h1>
      <p className="text-lg text-muted-foreground">
        Licensed electrical services for residential and commercial properties.
      </p>
      <p className="text-sm text-muted-foreground">
        Full landing page coming in Phase 2.
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Commit**
```bash
cd /home/don/dev/2026/emergency-client
git add src/components/navigation.tsx src/app/page.tsx
git commit -m "feat: add navigation bar with public, user, and admin states"
```

---

### Task 9: Login Page

**Files:**
- Create: `src/app/login/page.tsx`

- [ ] **Step 1: Write the login page**

Write `src/app/login/page.tsx`:
```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    // Read role from JWT to determine redirect
    const {
      data: { session },
    } = await supabase.auth.getSession();

    let redirectTo = "/dashboard";
    if (session?.access_token) {
      const payload = JSON.parse(atob(session.access_token.split(".")[1]));
      if (payload.user_role === "admin") {
        redirectTo = "/admin/dashboard";
      }
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Register here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
cd /home/don/dev/2026/emergency-client
git add src/app/login/page.tsx
git commit -m "feat: add login page with Supabase email/password auth"
```

---

### Task 10: Register Page

**Files:**
- Create: `src/app/register/page.tsx`

- [ ] **Step 1: Write the register page**

Write `src/app/register/page.tsx`:
```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    toast.success("Account created successfully!");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Register to submit your employment application.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Creating account...
                </span>
              ) : (
                "Register"
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
cd /home/don/dev/2026/emergency-client
git add src/app/register/page.tsx
git commit -m "feat: add register page with Supabase email/password signup"
```

---

### Task 11: Dashboard and Admin Placeholder Routes

**Files:**
- Create: `src/app/dashboard/page.tsx`
- Create: `src/app/admin/dashboard/page.tsx`

- [ ] **Step 1: Write the user dashboard placeholder**

Write `src/app/dashboard/page.tsx`:
```tsx
export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Your application summary will appear here. Coming in Phase 2.
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Write the admin dashboard placeholder**

Write `src/app/admin/dashboard/page.tsx`:
```tsx
export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Applicant list and admin tools will appear here. Coming in a later phase.
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Commit**
```bash
cd /home/don/dev/2026/emergency-client
git add src/app/dashboard/page.tsx src/app/admin/dashboard/page.tsx
git commit -m "feat: add placeholder dashboard and admin pages for route testing"
```

---

### Task 12: Verify Build and Dev Server

**Files:** (no new files)

- [ ] **Step 1: Run the build to verify everything compiles**
```bash
cd /home/don/dev/2026/emergency-client
npm run build
```
Expected output:
```
✓ Compiled successfully
   Creating an optimized production build ...
 ✓ Compiled successfully
   ...
   Route (app)                              Size     First Load JS
   ┌ ○ /                                    ... kB         ... kB
   ├ ○ /admin/dashboard                     ... kB         ... kB
   ├ ○ /dashboard                           ... kB         ... kB
   ├ ○ /login                               ... kB         ... kB
   └ ○ /register                            ... kB         ... kB
   ...
```

- [ ] **Step 2: Run lint**
```bash
cd /home/don/dev/2026/emergency-client
npm run lint
```
Expected output:
```
✔ No ESLint warnings or errors
```

- [ ] **Step 3: Fix any build or lint errors, then commit if changes were needed**
```bash
cd /home/don/dev/2026/emergency-client
git add -A
git status
# Only commit if there are changes:
# git commit -m "fix: resolve build/lint issues"
```

- [ ] **Step 4: Start dev server and verify manually**
```bash
cd /home/don/dev/2026/emergency-client
npm run dev
```
Expected output:
```
   ▲ Next.js 15.x.x (Turbopack)
   - Local:        http://localhost:3000
   ...
 ✓ Ready in ...
```
Verify in browser:
- `http://localhost:3000` — shows landing placeholder with public nav (Services, About, Contact, Login, Register)
- `http://localhost:3000/login` — shows login form
- `http://localhost:3000/register` — shows registration form
- `http://localhost:3000/dashboard` — redirects to `/login` (unauthenticated)
- `http://localhost:3000/admin/dashboard` — redirects to `/login` (unauthenticated)

---

## Summary

| Task | Description | Key Files |
|------|-------------|-----------|
| 1 | Next.js scaffolding | `package.json`, `next.config.ts`, `tsconfig.json`, `.env.local`, `.gitignore` |
| 2 | Tailwind CSS + shadcn/ui | `globals.css`, `postcss.config.mjs`, `components.json`, `src/lib/utils.ts`, `src/components/ui/*` |
| 3 | SQL migration | `supabase/migrations/00001_initial_schema.sql` |
| 4 | Supabase clients | `src/lib/supabase/client.ts`, `server.ts`, `middleware.ts` |
| 5 | TypeScript types | `src/types/supabase.ts` |
| 6 | Auth middleware | `middleware.ts` |
| 7 | Root layout + error handling | `src/app/layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` |
| 8 | Navigation bar | `src/components/navigation.tsx`, `src/app/page.tsx` |
| 9 | Login page | `src/app/login/page.tsx` |
| 10 | Register page | `src/app/register/page.tsx` |
| 11 | Dashboard placeholders | `src/app/dashboard/page.tsx`, `src/app/admin/dashboard/page.tsx` |
| 12 | Build verification | (no new files) |

**Post-implementation manual steps:**
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL migration (`supabase/migrations/00001_initial_schema.sql`) in the Supabase SQL Editor
3. Enable the custom JWT hook: Dashboard > Auth > Hooks > Customize Access Token > select `public.custom_access_token_hook`
4. Copy the project URL and anon key into `.env.local`
5. Update the `supabase:types` script in `package.json` with the real project ID
6. Run `npm run supabase:types` to regenerate `src/types/supabase.ts`
