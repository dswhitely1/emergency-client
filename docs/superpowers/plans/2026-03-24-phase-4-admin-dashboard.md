# Phase 4: Admin Dashboard — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the admin dashboard with applicant list, applicant detail view, contact message management, and weather display.

**Architecture:** Admin layout enforces admin role via server-side check. Applicant list and detail pages are server components fetching from Supabase with admin RLS. Messages page is a client component for interactive mark-read/delete. Weather data fetched via ISR route handler (10-min revalidation).

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui (tables, cards, badges), Supabase server client, dayjs

---

## Prerequisites

Phases 1-3 must be complete before starting Phase 4. The following are assumed to exist and be working:

- Supabase server/browser clients (`src/lib/supabase/server.ts`, `src/lib/supabase/client.ts`)
- Middleware with auth session refresh and role-based redirects (`middleware.ts`)
- All database tables: `profiles`, `employment`, `education`, `references`, `contact_messages`
- RLS policies for all tables (admin read-all on applicant tables, admin CRUD on contact_messages)
- Auth context/hooks for client-side session access
- shadcn/ui installed with components: `Button`, `Card`, `Input`, `Table`, `Badge`, `Dialog`, `Skeleton`, `Sonner` (toast)
- `dayjs` installed as a dependency
- Applicant dashboard with display components for profile, employment, education, and references sections
- TypeScript types defined in `src/types/` for all database entities

## Task 1: Install dayjs relative-time plugin and create utility

### 1.1 Create dayjs utility module

- [ ] Create `src/lib/dayjs.ts`

```typescript
// src/lib/dayjs.ts
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default dayjs;
```

This centralizes the dayjs setup so all imports use the extended version with `fromNow()` support.

### Commit
```
git add src/lib/dayjs.ts
git commit -m "Add dayjs utility with relativeTime plugin"
```

---

## Task 2: Add admin TypeScript types

- [ ] Add admin-specific types to `src/types/`

Create or extend `src/types/index.ts` (or a dedicated `src/types/admin.ts`) with:

```typescript
// src/types/admin.ts

export interface ApplicantRow {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  created_at: string;
  employment_count: number;
  education_count: number;
  reference_count: number;
}

export interface ContactMessage {
  id: string;
  first_name: string;
  last_name: string;
  contact: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface WeatherAlert {
  id: string;
  event: string;
  headline: string;
  description: string;
  severity: string;
  urgency: string;
  expires: string;
}

export interface WeatherConditions {
  temperature: number | null;
  temperatureUnit: string;
  humidity: number | null;
  windSpeed: string | null;
  windDirection: string | null;
  shortForecast: string;
  icon: string | null;
  timestamp: string;
}

export interface WeatherData {
  alerts: WeatherAlert[];
  conditions: WeatherConditions | null;
}
```

### Commit
```
git add src/types/admin.ts
git commit -m "Add TypeScript types for admin dashboard entities"
```

---

## Task 3: Weather API route handler

- [ ] Create `src/app/api/weather/route.ts`

This route handler proxies the weather.gov public API (no key needed) and returns a combined `{ alerts, conditions }` payload. It uses Next.js ISR with 10-minute revalidation.

```typescript
// src/app/api/weather/route.ts
import { NextResponse } from "next/server";
import type { WeatherAlert, WeatherConditions, WeatherData } from "@/types/admin";

const ALERTS_URL = "https://api.weather.gov/alerts/active/zone/INZ090";
const CONDITIONS_URL = "https://api.weather.gov/stations/KSDF/observations";

export const revalidate = 600; // 10 minutes

export async function GET() {
  const headers = {
    "User-Agent": "(Emergency Electric Inc, contact@emergencyelectric.com)",
    Accept: "application/geo+json",
  };

  const [alertsResult, conditionsResult] = await Promise.allSettled([
    fetch(ALERTS_URL, { headers, next: { revalidate: 600 } }),
    fetch(CONDITIONS_URL, { headers, next: { revalidate: 600 } }),
  ]);

  // Parse alerts
  let alerts: WeatherAlert[] = [];
  if (alertsResult.status === "fulfilled" && alertsResult.value.ok) {
    try {
      const alertsData = await alertsResult.value.json();
      alerts = (alertsData.features ?? []).map(
        (feature: { properties: Record<string, unknown> }) => ({
          id: feature.properties.id as string,
          event: feature.properties.event as string,
          headline: feature.properties.headline as string,
          description: feature.properties.description as string,
          severity: feature.properties.severity as string,
          urgency: feature.properties.urgency as string,
          expires: feature.properties.expires as string,
        })
      );
    } catch {
      // If parsing fails, leave alerts empty
    }
  }

  // Parse conditions — use the most recent observation
  let conditions: WeatherConditions | null = null;
  if (conditionsResult.status === "fulfilled" && conditionsResult.value.ok) {
    try {
      const conditionsData = await conditionsResult.value.json();
      const latest = conditionsData.features?.[0]?.properties;
      if (latest) {
        const tempC = latest.temperature?.value;
        const tempF = tempC != null ? Math.round((tempC * 9) / 5 + 32) : null;
        conditions = {
          temperature: tempF,
          temperatureUnit: "F",
          humidity: latest.relativeHumidity?.value != null
            ? Math.round(latest.relativeHumidity.value)
            : null,
          windSpeed: latest.windSpeed?.value != null
            ? `${Math.round(latest.windSpeed.value * 0.621371)} mph`
            : null,
          windDirection: latest.windDirection?.value != null
            ? degreesToCardinal(latest.windDirection.value)
            : null,
          shortForecast: latest.textDescription ?? "",
          icon: latest.icon ?? null,
          timestamp: latest.timestamp ?? new Date().toISOString(),
        };
      }
    } catch {
      // If parsing fails, leave conditions null
    }
  }

  const data: WeatherData = { alerts, conditions };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=60",
    },
  });
}

function degreesToCardinal(degrees: number): string {
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}
```

**Key differences from current implementation:**
- Current app makes two separate client-side fetches with Redux actions and 10-min `setInterval` polling (see `useWeatherActions.jsx`)
- New approach: single server-side route handler that fetches both endpoints, combines them, and uses Next.js ISR for 10-min caching — no client polling needed
- Temperature converted from Celsius (weather.gov native) to Fahrenheit
- Wind speed converted from km/h to mph

### Commit
```
git add src/app/api/weather/route.ts
git commit -m "Add weather API route handler proxying weather.gov with 10-min ISR"
```

---

## Task 4: Weather display component

- [ ] Create `src/components/admin/weather-display.tsx`

This is a server component that fetches from the weather route handler and renders current conditions and any active alerts. It will be embedded in the admin layout.

```typescript
// src/components/admin/weather-display.tsx
import type { WeatherData } from "@/types/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

async function getWeather(): Promise<WeatherData> {
  // Use absolute URL for server component fetch — in production this resolves correctly
  // During build, fall back to empty data
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/weather`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) throw new Error("Weather fetch failed");
    return res.json();
  } catch {
    return { alerts: [], conditions: null };
  }
}

export default async function WeatherDisplay() {
  const { alerts, conditions } = await getWeather();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Weather</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Current Conditions */}
        {conditions ? (
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-2xl font-bold">
                {conditions.temperature != null
                  ? `${conditions.temperature}°${conditions.temperatureUnit}`
                  : "N/A"}
              </p>
              <p className="text-muted-foreground">{conditions.shortForecast}</p>
            </div>
            <div className="text-right text-muted-foreground text-xs space-y-1">
              {conditions.humidity != null && <p>Humidity: {conditions.humidity}%</p>}
              {conditions.windSpeed && (
                <p>
                  Wind: {conditions.windSpeed}
                  {conditions.windDirection ? ` ${conditions.windDirection}` : ""}
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Weather data unavailable
          </p>
        )}

        {/* Active Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Active Alerts
            </p>
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="rounded-md border p-2 text-sm space-y-1"
              >
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      alert.severity === "Extreme" || alert.severity === "Severe"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {alert.severity}
                  </Badge>
                  <span className="font-medium">{alert.event}</span>
                </div>
                <p className="text-muted-foreground text-xs">{alert.headline}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

### Commit
```
git add src/components/admin/weather-display.tsx
git commit -m "Add weather display component for admin layout"
```

---

## Task 5: Admin layout with server-side role guard

- [ ] Create `src/app/admin/layout.tsx`

This layout wraps all `/admin/*` routes. It performs a **server-side** admin role check by querying the `profiles` table directly (not just JWT claims), and redirects non-admins. It also renders the admin navigation and weather display.

Note: The middleware already checks the JWT `user_role` claim and redirects non-admins. This layout adds a defense-in-depth check against the database. This is important because JWT claims can be stale if a user's role was recently revoked.

```typescript
// src/app/admin/layout.tsx
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import WeatherDisplay from "@/components/admin/weather-display";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Server-side role verification against the database (defense in depth)
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/40 p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          <p className="text-sm text-muted-foreground">Emergency Electric Inc</p>
        </div>

        <nav className="space-y-1">
          <Link
            href="/admin/dashboard"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Applicants
          </Link>
          <Link
            href="/admin/dashboard/messages"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Messages
          </Link>
        </nav>

        {/* Weather widget in sidebar */}
        <Suspense fallback={<Skeleton className="h-40 w-full" />}>
          <WeatherDisplay />
        </Suspense>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
```

**Key differences from current implementation:**
- Current app uses `AdminRoute.jsx` which checks `isAdmin` from Redux store (client-side JWT)
- New approach: middleware handles first-pass JWT check, layout performs server-side DB query for defense in depth
- Weather is embedded in the sidebar layout, visible on all admin pages (matches current behavior where it loads once in `AdminDashboard.jsx`)

### Commit
```
git add src/app/admin/layout.tsx
git commit -m "Add admin layout with server-side role guard and weather sidebar"
```

---

## Task 6: Admin loading and error boundaries

- [ ] Create `src/app/admin/dashboard/loading.tsx`
- [ ] Create `src/app/admin/dashboard/error.tsx`

### 6.1 Loading state

```typescript
// src/app/admin/dashboard/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </div>
  );
}
```

### 6.2 Error boundary

```typescript
// src/app/admin/dashboard/error.tsx
"use client";

import { Button } from "@/components/ui/button";

export default function AdminDashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-muted-foreground">
        {error.message || "An unexpected error occurred."}
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
```

### Commit
```
git add src/app/admin/dashboard/loading.tsx src/app/admin/dashboard/error.tsx
git commit -m "Add loading and error boundaries for admin dashboard routes"
```

---

## Task 7: Applicant completeness utility

- [ ] Create `src/lib/completeness.ts`

This utility computes application completeness from database counts, used by both the applicant list and detail pages.

```typescript
// src/lib/completeness.ts

export interface CompletenessInput {
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  employment_count: number;
  education_count: number;
  reference_count: number;
}

export interface CompletenessResult {
  isComplete: boolean;
  hasProfile: boolean;
  hasEmployment: boolean;
  hasEducation: boolean;
  hasReferences: boolean;
  /** e.g. "3/4" or "4/4" */
  summary: string;
}

export function getCompleteness(input: CompletenessInput): CompletenessResult {
  const hasProfile = Boolean(input.first_name && input.last_name && input.phone);
  const hasEmployment = input.employment_count > 0;
  const hasEducation = input.education_count > 0;
  const hasReferences = input.reference_count > 0;

  const sections = [hasProfile, hasEmployment, hasEducation, hasReferences];
  const completed = sections.filter(Boolean).length;

  return {
    isComplete: completed === 4,
    hasProfile,
    hasEmployment,
    hasEducation,
    hasReferences,
    summary: `${completed}/4`,
  };
}
```

### Commit
```
git add src/lib/completeness.ts
git commit -m "Add application completeness utility function"
```

---

## Task 8: Applicant list page

- [ ] Create `src/app/admin/dashboard/page.tsx`

Server component that fetches all applicants with their completeness data from Supabase and renders them in a shadcn/ui Table.

**Data query:** To avoid N+1 queries, we fetch profiles and use Supabase's ability to count related records. If Supabase does not support count aggregation in a single query easily, we run parallel queries.

```typescript
// src/app/admin/dashboard/page.tsx
import { createServerClient } from "@/lib/supabase/server";
import { getCompleteness } from "@/lib/completeness";
import dayjs from "@/lib/dayjs";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ApplicantProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  created_at: string;
  employment: { count: number }[];
  education: { count: number }[];
  references: { count: number }[];
}

async function getApplicants() {
  const supabase = await createServerClient();

  // Fetch all non-admin profiles with related record counts
  // Supabase supports selecting count of related tables via embedded resources
  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
      id,
      first_name,
      last_name,
      phone,
      created_at,
      employment(count),
      education(count),
      references(count)
    `
    )
    .eq("role", "user")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch applicants: ${error.message}`);
  }

  return data as ApplicantProfile[];
}

async function getEmails(userIds: string[]) {
  if (userIds.length === 0) return new Map<string, string>();

  const supabase = await createServerClient();

  // Admin RLS allows reading auth metadata via profiles
  // Email is stored on auth.users — we access it via Supabase admin or
  // store it on profiles. Since we may not have service_role access,
  // we query from auth.users via the Supabase admin API or a DB function.
  // Simpler approach: assume email is fetched alongside profile.
  // If email isn't on profiles table, create a DB function or use
  // supabase.auth.admin.listUsers() (requires service role).
  //
  // For this implementation, we fetch user emails by calling the
  // getUser for each — but to keep it efficient with the data we have,
  // we'll note that user email can be gotten from auth context.
  //
  // Practical approach: the admin layout already has the supabase client.
  // We'll add a note that if email display is needed, either:
  // 1. Add an `email` column to profiles (populated on signup), or
  // 2. Use a Postgres function that joins auth.users
  //
  // For now, we return an empty map and handle gracefully in the UI.
  return new Map<string, string>();
}

export default async function AdminDashboardPage() {
  const applicants = await getApplicants();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Applicants</h1>
        <p className="text-muted-foreground">
          {applicants.length} registered applicant{applicants.length !== 1 ? "s" : ""}
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Registered</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                No applicants yet.
              </TableCell>
            </TableRow>
          ) : (
            applicants.map((applicant) => {
              const completeness = getCompleteness({
                first_name: applicant.first_name,
                last_name: applicant.last_name,
                phone: applicant.phone,
                employment_count: applicant.employment?.[0]?.count ?? 0,
                education_count: applicant.education?.[0]?.count ?? 0,
                reference_count: applicant.references?.[0]?.count ?? 0,
              });

              const displayName =
                applicant.first_name || applicant.last_name
                  ? `${applicant.first_name ?? ""} ${applicant.last_name ?? ""}`.trim()
                  : "Unnamed";

              return (
                <TableRow key={applicant.id}>
                  <TableCell>
                    <Link
                      href={`/admin/dashboard/${applicant.id}`}
                      className="font-medium hover:underline"
                    >
                      {displayName}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {dayjs(applicant.created_at).fromNow()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={completeness.isComplete ? "default" : "secondary"}>
                      {completeness.isComplete
                        ? "Complete"
                        : `Incomplete (${completeness.summary})`}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/admin/dashboard/${applicant.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
```

**Key differences from current implementation:**
- Current app uses a `<Select>` dropdown to pick one profile at a time (`AdminSelectProfile.jsx`), then fetches that profile's details
- New approach: shows all applicants in a table at once with completeness badges, links to detail pages
- Data is fetched server-side — no Redux, no client-side loading states (Next.js `loading.tsx` handles Suspense)
- Completeness is derived from counts (profile fields + related record counts), not stored

### Commit
```
git add src/app/admin/dashboard/page.tsx
git commit -m "Add applicant list page with completeness indicators"
```

---

## Task 9: Shared application display components

- [ ] Create `src/components/admin/application-view.tsx`

This component renders a full read-only view of an applicant's data. It mirrors the structure of the current `ViewApplication.jsx` but uses Tailwind/shadcn and the new database schema. It can also be imported by the applicant's own dashboard summary page (Phase 3) if not already built there.

If Phase 3 already created read-only display components in `src/components/dashboard/`, import and reuse those. Otherwise, create shared display components here.

```typescript
// src/components/admin/application-view.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dayjs from "@/lib/dayjs";
import type { CompletenessResult } from "@/lib/completeness";

// --- Types matching Supabase schema ---

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  created_at: string;
}

interface Employment {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string | null;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
}

interface Reference {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

interface ApplicationViewProps {
  profile: Profile;
  employment: Employment[];
  education: Education[];
  references: Reference[];
  completeness: CompletenessResult;
}

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="text-sm">{value || "—"}</p>
    </div>
  );
}

function formatDate(date: string | null): string {
  if (!date) return "Present";
  return dayjs(date).format("MMM YYYY");
}

export default function ApplicationView({
  profile,
  employment,
  education,
  references,
  completeness,
}: ApplicationViewProps) {
  return (
    <div className="space-y-6">
      {/* Status */}
      <div className="flex items-center gap-3">
        <Badge variant={completeness.isComplete ? "default" : "secondary"}>
          {completeness.isComplete ? "Complete" : `Incomplete (${completeness.summary})`}
        </Badge>
        <span className="text-sm text-muted-foreground">
          Registered {dayjs(profile.created_at).fromNow()}
        </span>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Personal Information
            {!completeness.hasProfile && (
              <Badge variant="outline" className="text-xs">Missing</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field label="First Name" value={profile.first_name} />
            <Field label="Last Name" value={profile.last_name} />
            <Field label="Phone" value={profile.phone} />
            <Field label="Address" value={profile.address} />
            <Field label="City" value={profile.city} />
            <Field label="State" value={profile.state} />
            <Field label="ZIP Code" value={profile.zip} />
          </div>
        </CardContent>
      </Card>

      {/* Employment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Employment History
            <Badge variant="outline" className="text-xs">
              {employment.length} record{employment.length !== 1 ? "s" : ""}
            </Badge>
            {!completeness.hasEmployment && (
              <Badge variant="outline" className="text-xs text-destructive">Missing</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {employment.length === 0 ? (
            <p className="text-sm text-muted-foreground">No employment records.</p>
          ) : (
            <div className="space-y-4">
              {employment.map((emp) => (
                <div key={emp.id} className="border rounded-md p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{emp.position}</p>
                      <p className="text-sm text-muted-foreground">{emp.company}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(emp.start_date)} — {formatDate(emp.end_date)}
                    </p>
                  </div>
                  {emp.description && (
                    <p className="text-sm">{emp.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Education
            <Badge variant="outline" className="text-xs">
              {education.length} record{education.length !== 1 ? "s" : ""}
            </Badge>
            {!completeness.hasEducation && (
              <Badge variant="outline" className="text-xs text-destructive">Missing</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {education.length === 0 ? (
            <p className="text-sm text-muted-foreground">No education records.</p>
          ) : (
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="border rounded-md p-4 space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">
                        {edu.degree} — {edu.field_of_study}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(edu.start_date)} — {formatDate(edu.end_date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* References */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            References
            <Badge variant="outline" className="text-xs">
              {references.length} record{references.length !== 1 ? "s" : ""}
            </Badge>
            {!completeness.hasReferences && (
              <Badge variant="outline" className="text-xs text-destructive">Missing</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {references.length === 0 ? (
            <p className="text-sm text-muted-foreground">No references provided.</p>
          ) : (
            <div className="space-y-4">
              {references.map((ref) => (
                <div key={ref.id} className="border rounded-md p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <Field label="Name" value={ref.name} />
                    <Field label="Relationship" value={ref.relationship} />
                    <Field label="Phone" value={ref.phone} />
                    <Field label="Email" value={ref.email} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

### Commit
```
git add src/components/admin/application-view.tsx
git commit -m "Add read-only application view component for admin detail page"
```

---

## Task 10: Applicant detail page

- [ ] Create `src/app/admin/dashboard/[id]/page.tsx`

Server component that fetches a single applicant's full data and renders it using the `ApplicationView` component.

```typescript
// src/app/admin/dashboard/[id]/page.tsx
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { getCompleteness } from "@/lib/completeness";
import ApplicationView from "@/components/admin/application-view";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplicantDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createServerClient();

  // Fetch profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .eq("role", "user")
    .single();

  if (profileError || !profile) {
    notFound();
  }

  // Fetch related data in parallel
  const [employmentResult, educationResult, referencesResult] = await Promise.all([
    supabase
      .from("employment")
      .select("*")
      .eq("user_id", id)
      .order("start_date", { ascending: false }),
    supabase
      .from("education")
      .select("*")
      .eq("user_id", id)
      .order("start_date", { ascending: false }),
    supabase
      .from("references")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending: false }),
  ]);

  const employment = employmentResult.data ?? [];
  const education = educationResult.data ?? [];
  const references = referencesResult.data ?? [];

  const completeness = getCompleteness({
    first_name: profile.first_name,
    last_name: profile.last_name,
    phone: profile.phone,
    employment_count: employment.length,
    education_count: education.length,
    reference_count: references.length,
  });

  const displayName =
    profile.first_name || profile.last_name
      ? `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim()
      : "Unnamed Applicant";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/dashboard">&larr; Back to Applicants</Link>
        </Button>
      </div>

      <h1 className="text-2xl font-bold">{displayName}</h1>

      <ApplicationView
        profile={profile}
        employment={employment}
        education={education}
        references={references}
        completeness={completeness}
      />
    </div>
  );
}
```

**Key differences from current implementation:**
- Current app uses a Redux-based flow: select user from dropdown -> dispatch `fetchUserProfile` -> render `ViewApplication` with profile/employment/education/references from Redux store
- New approach: dedicated route `/admin/dashboard/[id]` with server-side data fetching — no client state, no dropdown selection, direct URL navigation
- Uses `notFound()` for invalid IDs (renders Next.js 404)

### Commit
```
git add src/app/admin/dashboard/\[id\]/page.tsx
git commit -m "Add applicant detail page with full application read-only view"
```

---

## Task 11: Messages page — client component with mark-read and delete

- [ ] Create `src/app/admin/dashboard/messages/page.tsx`

This is a **client component** because it needs interactive state for toggling read status and deleting messages with confirmation dialogs. It fetches messages from Supabase using the browser client.

```typescript
// src/app/admin/dashboard/messages/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { createBrowserClient } from "@/lib/supabase/client";
import dayjs from "@/lib/dayjs";
import type { ContactMessage } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);

  const supabase = createBrowserClient();

  const fetchMessages = useCallback(async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load messages");
      return;
    }

    setMessages(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  async function toggleRead(message: ContactMessage) {
    const newRead = !message.read;

    const { error } = await supabase
      .from("contact_messages")
      .update({ read: newRead })
      .eq("id", message.id);

    if (error) {
      toast.error("Failed to update message");
      return;
    }

    setMessages((prev) =>
      prev.map((m) => (m.id === message.id ? { ...m, read: newRead } : m))
    );

    toast.success(`Marked as ${newRead ? "read" : "unread"}`);
  }

  async function handleDelete() {
    if (!deleteTarget) return;

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", deleteTarget.id);

    if (error) {
      toast.error("Failed to delete message");
      setDeleteTarget(null);
      return;
    }

    setMessages((prev) => prev.filter((m) => m.id !== deleteTarget.id));
    toast.success("Message deleted");
    setDeleteTarget(null);
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Loading messages...</p>
      </div>
    );
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          {messages.length} message{messages.length !== 1 ? "s" : ""}
          {unreadCount > 0 && ` (${unreadCount} unread)`}
        </p>
      </div>

      {messages.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center">
          No messages yet.
        </p>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={message.read ? "opacity-75" : ""}
            >
              <CardContent className="p-4 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{message.subject}</h3>
                      <Badge variant={message.read ? "secondary" : "default"}>
                        {message.read ? "Read" : "New"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      From {message.first_name} {message.last_name} &middot;{" "}
                      {dayjs(message.created_at).fromNow()}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <p className="text-sm">{message.message}</p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <p className="text-sm text-muted-foreground">
                    Contact: {message.contact}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleRead(message)}
                    >
                      Mark {message.read ? "Unread" : "Read"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteTarget(message)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete &ldquo;{deleteTarget?.subject}&rdquo;?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
```

**Key differences from current implementation:**
- Current app uses Redux for messages state (`state.admin.messages`), dispatches `fetchMessages`, `markMessageRead`, `deleteMessage` via `ActionsContext`, and uses MUI `Paper` / custom `ConfirmDialog`
- New approach: local state with Supabase browser client, shadcn/ui `AlertDialog` for delete confirmation, `sonner` toasts for feedback, `dayjs` instead of `moment` for relative timestamps
- Current `Message.jsx` uses `moment(created_at).fromNow()` — replaced with `dayjs(created_at).fromNow()`

### Commit
```
git add src/app/admin/dashboard/messages/page.tsx
git commit -m "Add messages page with read toggle and delete confirmation"
```

---

## Task 12: Messages loading state

- [ ] Create `src/app/admin/dashboard/messages/loading.tsx`

```typescript
// src/app/admin/dashboard/messages/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function MessagesLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-36" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    </div>
  );
}
```

### Commit
```
git add src/app/admin/dashboard/messages/loading.tsx
git commit -m "Add loading skeleton for messages page"
```

---

## Task 13: Applicant detail loading and not-found states

- [ ] Create `src/app/admin/dashboard/[id]/loading.tsx`
- [ ] Create `src/app/admin/dashboard/[id]/not-found.tsx`

### 13.1 Loading state

```typescript
// src/app/admin/dashboard/[id]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function ApplicantDetailLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}
```

### 13.2 Not-found state

```typescript
// src/app/admin/dashboard/[id]/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ApplicantNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <h2 className="text-xl font-semibold">Applicant not found</h2>
      <p className="text-muted-foreground">
        The applicant you are looking for does not exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/admin/dashboard">Back to Applicants</Link>
      </Button>
    </div>
  );
}
```

### Commit
```
git add src/app/admin/dashboard/\[id\]/loading.tsx src/app/admin/dashboard/\[id\]/not-found.tsx
git commit -m "Add loading and not-found states for applicant detail page"
```

---

## Summary of files created

| File | Type | Purpose |
|---|---|---|
| `src/lib/dayjs.ts` | Utility | dayjs with relativeTime plugin |
| `src/types/admin.ts` | Types | Admin entity TypeScript interfaces |
| `src/lib/completeness.ts` | Utility | Application completeness calculation |
| `src/app/api/weather/route.ts` | Route Handler | Proxies weather.gov, 10-min ISR |
| `src/components/admin/weather-display.tsx` | Server Component | Weather conditions + alerts card |
| `src/app/admin/layout.tsx` | Layout | Admin guard + sidebar + weather |
| `src/app/admin/dashboard/page.tsx` | Page | Applicant list with completeness badges |
| `src/app/admin/dashboard/loading.tsx` | Loading | Skeleton for applicant list |
| `src/app/admin/dashboard/error.tsx` | Error | Error boundary for admin routes |
| `src/app/admin/dashboard/[id]/page.tsx` | Page | Applicant detail (read-only) |
| `src/app/admin/dashboard/[id]/loading.tsx` | Loading | Skeleton for applicant detail |
| `src/app/admin/dashboard/[id]/not-found.tsx` | Not Found | 404 for invalid applicant ID |
| `src/app/admin/dashboard/messages/page.tsx` | Page (Client) | Messages list with read/delete |
| `src/app/admin/dashboard/messages/loading.tsx` | Loading | Skeleton for messages page |
| `src/components/admin/application-view.tsx` | Component | Shared read-only application display |

## shadcn/ui components required

Ensure these are installed before starting (via `npx shadcn@latest add`):
- `table`
- `card`
- `badge`
- `button`
- `skeleton`
- `alert-dialog`
- `sonner` (toast)

If any are missing, install with: `npx shadcn@latest add <component-name>`

## Testing checklist

After implementation, manually verify:
- [ ] Non-admin user accessing `/admin/dashboard` is redirected to `/dashboard`
- [ ] Unauthenticated user accessing `/admin/dashboard` is redirected to `/login`
- [ ] Applicant list displays all non-admin users with correct names and completeness badges
- [ ] Completeness shows "Complete" only when profile has first/last/phone AND >= 1 each of employment, education, references
- [ ] Clicking an applicant navigates to detail page with full read-only application
- [ ] Invalid applicant ID shows "not found" page
- [ ] Messages page lists all contact form submissions ordered by newest first
- [ ] Mark read/unread toggles work and show toast feedback
- [ ] Delete shows confirmation dialog and removes message on confirm
- [ ] Weather widget in sidebar shows current temperature and conditions
- [ ] Weather alerts display with severity badges when active
- [ ] Loading skeletons appear during server component loads
- [ ] Error boundary renders on server errors with retry button
