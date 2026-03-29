# Phase 3: Applicant Dashboard — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the authenticated applicant dashboard with profile editing, employment/education/references CRUD, and a read-only application summary view.

**Architecture:** Dashboard layout with sidebar navigation. Server components for data fetching, client components for forms. All data operations go directly to Supabase — RLS enforces that users can only access their own data. Forms use shadcn/ui components with client-side validation.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui (forms, tables, cards), Supabase browser client, dayjs

---

## Schema Field Mapping — Known Simplifications

The current app collects significantly more data than the approved spec schema. This plan follows the spec as the source of truth. The discrepancies are documented here for future reference.

### Profile

| Current App Field | Spec `profiles` Column | Status |
|---|---|---|
| firstName | first_name | Mapped |
| lastName | last_name | Mapped |
| phoneNumber | phone | Mapped |
| address | address | Mapped |
| city | city | Mapped |
| state | state | Mapped |
| zipCode | zip | Mapped |
| middleName, preferredName, address1, altPhoneNumber, email, fullTime, partTime, temporary, weekdays, weekends, evenings, nights, referredBy, desiredPay, position, startDate, authYes/authNo, under18Yes/under18No, permitYes/permitNo/permitNA | — | **Dropped** |

### Employment

| Current App Field | Spec `employment` Column | Status |
|---|---|---|
| companyName | company | Mapped |
| — | position | **New field** (not in current app) |
| startDate | start_date | Mapped |
| endDate | end_date | Mapped |
| — | description | **New field** (replaces reasonForLeaving) |
| cityState, phoneNumber, supervisor, contactYes/contactNo | — | **Dropped** |

### Education

| Current App Field | Spec `education` Column | Status |
|---|---|---|
| schoolName | institution | Mapped |
| — | degree | **New field** (replaces received dropdown) |
| subject | field_of_study | Mapped |
| — | start_date | **New field** (not in current app) |
| — | end_date | **New field** (not in current app) |
| graduate (yes/no), received (diploma/degree/other) | — | **Dropped** |

### References

| Current App Field | Spec `references` Column | Status |
|---|---|---|
| name | name | Mapped |
| relationship | relationship | Mapped |
| phoneNumber | phone | Mapped |
| — | email | **New field** (not in current app) |
| years | — | **Dropped** |

> **Decision:** Follow the spec schema exactly. If additional fields are needed later, they require a schema migration and a new plan.

---

## Prerequisites (from Phase 1)

These must be complete before starting Phase 3:

- Supabase project configured with all tables, RLS policies, and triggers
- `src/lib/supabase/client.ts` (browser client) and `src/lib/supabase/server.ts` (server client) exist
- Auth flow working (login, register, logout, session cookies)
- Middleware redirecting unauthenticated users to `/login`
- Root layout with top-level navigation bar
- shadcn/ui initialized (`components.json`, `src/components/ui/` directory)
- Sonner toast provider installed in root layout

---

## Task 1: Install Required shadcn/ui Components

### Why
Dashboard forms and lists need Input, Label, Button, Card, Table, Dialog, Select, Textarea, Separator, and navigation components from shadcn/ui. Install them all upfront.

### Steps

- [ ] **1.1** Run shadcn/ui CLI to add required components:
  ```bash
  npx shadcn@latest add input label button card table dialog select textarea separator badge skeleton alert-dialog
  ```
  This generates files in `src/components/ui/`.

- [ ] **1.2** Verify all component files exist under `src/components/ui/`.

### Commit
```
feat: add shadcn/ui components for dashboard forms and lists
```

---

## Task 2: TypeScript Types for Dashboard Data

### Why
Shared types ensure consistency across all dashboard components — forms, lists, and the summary view.

### Steps

- [ ] **2.1** Create `src/types/database.ts` with types matching the spec schema:

  ```typescript
  // src/types/database.ts

  export interface Profile {
    id: string;
    first_name: string | null;
    last_name: string | null;
    phone: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    role: "user" | "admin";
    created_at: string;
    updated_at: string;
  }

  export interface Employment {
    id: string;
    user_id: string;
    company: string;
    position: string;
    start_date: string;
    end_date: string | null;
    description: string;
    created_at: string;
    updated_at: string;
  }

  export interface Education {
    id: string;
    user_id: string;
    institution: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date: string | null;
    created_at: string;
    updated_at: string;
  }

  export interface Reference {
    id: string;
    user_id: string;
    name: string;
    relationship: string;
    phone: string;
    email: string;
    created_at: string;
    updated_at: string;
  }
  ```

- [ ] **2.2** Create form-specific input types (omitting server-managed fields) in the same file:

  ```typescript
  export type ProfileFormData = Pick<
    Profile,
    "first_name" | "last_name" | "phone" | "address" | "city" | "state" | "zip"
  >;

  export type EmploymentFormData = Pick<
    Employment,
    "company" | "position" | "start_date" | "end_date" | "description"
  >;

  export type EducationFormData = Pick<
    Education,
    "institution" | "degree" | "field_of_study" | "start_date" | "end_date"
  >;

  export type ReferenceFormData = Pick<
    Reference,
    "name" | "relationship" | "phone" | "email"
  >;
  ```

### Commit
```
feat: add TypeScript types for dashboard database models
```

---

## Task 3: Dashboard Layout with Sidebar Navigation

### Why
The dashboard layout wraps all `/dashboard/*` routes with a persistent sidebar and content area. It also acts as the auth guard (redirect if no session).

### Files
- `src/app/dashboard/layout.tsx`
- `src/components/dashboard/sidebar-nav.tsx`

### Steps

- [ ] **3.1** Create `src/components/dashboard/sidebar-nav.tsx` — a client component with sidebar navigation:

  ```typescript
  // src/components/dashboard/sidebar-nav.tsx
  "use client";

  import Link from "next/link";
  import { usePathname } from "next/navigation";
  import {
    FileText,
    User,
    Briefcase,
    GraduationCap,
    Users,
  } from "lucide-react";
  import { cn } from "@/lib/utils";
  import { Button } from "@/components/ui/button";
  import { Separator } from "@/components/ui/separator";

  const navItems = [
    { href: "/dashboard", label: "Application", icon: FileText, exact: true },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/employment", label: "Employment", icon: Briefcase },
    { href: "/dashboard/education", label: "Education", icon: GraduationCap },
    { href: "/dashboard/references", label: "References", icon: Users },
  ];

  export function SidebarNav() {
    const pathname = usePathname();

    function isActive(href: string, exact?: boolean) {
      if (exact) return pathname === href;
      return pathname.startsWith(href);
    }

    return (
      <nav className="flex flex-col gap-1 p-4 w-64 shrink-0 border-r min-h-[calc(100vh-4rem)]">
        <h2 className="px-3 mb-2 text-lg font-semibold tracking-tight">
          My Application
        </h2>
        <Separator className="mb-2" />
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={isActive(item.href, item.exact) ? "secondary" : "ghost"}
            className={cn("justify-start gap-2")}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
    );
  }
  ```

- [ ] **3.2** Create `src/app/dashboard/layout.tsx`:

  ```typescript
  // src/app/dashboard/layout.tsx
  import { redirect } from "next/navigation";
  import { createClient } from "@/lib/supabase/server";
  import { SidebarNav } from "@/components/dashboard/sidebar-nav";

  export const metadata = {
    title: "Dashboard | Emergency Electric INC",
  };

  export default async function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    return (
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-6 max-w-5xl">{children}</main>
      </div>
    );
  }
  ```

  > Note: The middleware already handles auth redirects, but the layout double-checks for safety. The middleware also handles admin-to-admin-dashboard redirects.

- [ ] **3.3** Verify the sidebar renders on `/dashboard` and highlights the active route. Verify clicking each nav item navigates to the correct route.

### Commit
```
feat: add dashboard layout with sidebar navigation
```

---

## Task 4: Loading and Error States for Dashboard Routes

### Why
Next.js `loading.tsx` provides automatic Suspense boundaries for server components. `error.tsx` catches runtime errors and shows a recovery UI.

### Files
- `src/app/dashboard/loading.tsx`
- `src/app/dashboard/error.tsx`

### Steps

- [ ] **4.1** Create `src/app/dashboard/loading.tsx`:

  ```typescript
  // src/app/dashboard/loading.tsx
  import { Skeleton } from "@/components/ui/skeleton";

  export default function DashboardLoading() {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }
  ```

- [ ] **4.2** Create `src/app/dashboard/error.tsx`:

  ```typescript
  // src/app/dashboard/error.tsx
  "use client";

  import { useEffect } from "react";
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
  } from "@/components/ui/card";

  export default function DashboardError({
    error,
    reset,
  }: {
    error: Error & { digest?: string };
    reset: () => void;
  }) {
    useEffect(() => {
      console.error("Dashboard error:", error);
    }, [error]);

    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Something went wrong</CardTitle>
          <CardDescription>
            An error occurred while loading this page. Please try again.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={reset}>Try Again</Button>
        </CardFooter>
      </Card>
    );
  }
  ```

- [ ] **4.3** Verify loading state appears during server component data fetching. Verify error boundary catches and displays errors with a retry button.

### Commit
```
feat: add loading and error states for dashboard routes
```

---

## Task 5: Profile Edit Form

### Why
The profile page lets users update their personal information. It fetches existing data from Supabase, pre-fills the form, and upserts on save. This is the only section that is a single record per user (not a list).

### Files
- `src/app/dashboard/profile/page.tsx`
- `src/components/dashboard/profile-form.tsx`

### Steps

- [ ] **5.1** Create `src/components/dashboard/profile-form.tsx` — a client component:

  ```typescript
  // src/components/dashboard/profile-form.tsx
  "use client";

  import { useState } from "react";
  import { useRouter } from "next/navigation";
  import { toast } from "sonner";
  import { createClient } from "@/lib/supabase/client";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import type { Profile, ProfileFormData } from "@/types/database";

  interface ProfileFormProps {
    profile: Profile;
  }

  export function ProfileForm({ profile }: ProfileFormProps) {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ProfileFormData>({
      first_name: profile.first_name ?? "",
      last_name: profile.last_name ?? "",
      phone: profile.phone ?? "",
      address: profile.address ?? "",
      city: profile.city ?? "",
      state: profile.state ?? "",
      zip: profile.zip ?? "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

      // Client-side validation
      if (!formData.first_name?.trim() || !formData.last_name?.trim()) {
        toast.error("First name and last name are required.");
        return;
      }

      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: formData.first_name?.trim() || null,
          last_name: formData.last_name?.trim() || null,
          phone: formData.phone?.trim() || null,
          address: formData.address?.trim() || null,
          city: formData.city?.trim() || null,
          state: formData.state?.trim() || null,
          zip: formData.zip?.trim() || null,
        })
        .eq("id", profile.id);
      setLoading(false);

      if (error) {
        toast.error("Failed to update profile. Please try again.");
        console.error("Profile update error:", error);
        return;
      }

      toast.success("Profile updated successfully.");
      router.refresh();
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Update your personal information below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first_name">
                  First Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={formData.first_name ?? ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">
                  Last Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={formData.last_name ?? ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city ?? ""}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state ?? ""}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">Zip Code</Label>
                <Input
                  id="zip"
                  name="zip"
                  value={formData.zip ?? ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
  ```

- [ ] **5.2** Create `src/app/dashboard/profile/page.tsx` — a server component that fetches the profile and passes it to the form:

  ```typescript
  // src/app/dashboard/profile/page.tsx
  import { redirect } from "next/navigation";
  import { createClient } from "@/lib/supabase/server";
  import { ProfileForm } from "@/components/dashboard/profile-form";

  export const metadata = {
    title: "Edit Profile | Emergency Electric INC",
  };

  export default async function ProfilePage() {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error || !profile) {
      throw new Error("Failed to load profile data.");
    }

    return <ProfileForm profile={profile} />;
  }
  ```

- [ ] **5.3** Verify the form loads with existing profile data pre-filled. Verify saving updates the record and shows a success toast. Verify validation prevents submission without first/last name.

### Commit
```
feat: add profile edit page with form and Supabase integration
```

---

## Task 6: Employment — Shared Form Component

### Why
The add and edit employment pages share the same form. A `mode` prop controls whether it performs an insert or update.

### Files
- `src/components/dashboard/employment-form.tsx`

### Steps

- [ ] **6.1** Create `src/components/dashboard/employment-form.tsx`:

  ```typescript
  // src/components/dashboard/employment-form.tsx
  "use client";

  import { useState } from "react";
  import { useRouter } from "next/navigation";
  import { toast } from "sonner";
  import dayjs from "dayjs";
  import { createClient } from "@/lib/supabase/client";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Textarea } from "@/components/ui/textarea";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import type { Employment, EmploymentFormData } from "@/types/database";

  interface EmploymentFormProps {
    mode: "add" | "edit";
    employment?: Employment;
  }

  export function EmploymentForm({ mode, employment }: EmploymentFormProps) {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<EmploymentFormData>({
      company: employment?.company ?? "",
      position: employment?.position ?? "",
      start_date: employment?.start_date ?? dayjs().format("YYYY-MM-DD"),
      end_date: employment?.end_date ?? "",
      description: employment?.description ?? "",
    });

    function handleChange(
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

      if (!formData.company.trim() || !formData.position.trim()) {
        toast.error("Company and position are required.");
        return;
      }

      setLoading(true);

      if (mode === "add") {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          toast.error("You must be logged in.");
          setLoading(false);
          return;
        }
        const { error } = await supabase.from("employment").insert({
          user_id: user.id,
          company: formData.company.trim(),
          position: formData.position.trim(),
          start_date: formData.start_date,
          end_date: formData.end_date || null,
          description: formData.description.trim(),
        });
        setLoading(false);
        if (error) {
          toast.error("Failed to add employment record.");
          console.error("Employment insert error:", error);
          return;
        }
        toast.success("Employment record added.");
      } else {
        const { error } = await supabase
          .from("employment")
          .update({
            company: formData.company.trim(),
            position: formData.position.trim(),
            start_date: formData.start_date,
            end_date: formData.end_date || null,
            description: formData.description.trim(),
          })
          .eq("id", employment!.id);
        setLoading(false);
        if (error) {
          toast.error("Failed to update employment record.");
          console.error("Employment update error:", error);
          return;
        }
        toast.success("Employment record updated.");
      }

      router.push("/dashboard/employment");
      router.refresh();
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === "add" ? "Add Employment" : "Edit Employment"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">
                  Company <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">
                  Position <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  name="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  name="end_date"
                  type="date"
                  value={formData.end_date ?? ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/employment")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading
                  ? "Saving..."
                  : mode === "add"
                    ? "Add Record"
                    : "Update Record"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
  ```

### Commit
```
feat: add shared employment form component with add/edit modes
```

---

## Task 7: Employment — List, Add, Edit Pages

### Why
Employment has three routes: list (with delete), add (new record), and edit (existing record by ID). The list page fetches data server-side and renders each entry in a Card with edit/delete actions.

### Files
- `src/app/dashboard/employment/page.tsx`
- `src/app/dashboard/employment/add/page.tsx`
- `src/app/dashboard/employment/[id]/page.tsx`
- `src/components/dashboard/employment-list.tsx`
- `src/components/dashboard/delete-dialog.tsx`

### Steps

- [ ] **7.1** Create `src/components/dashboard/delete-dialog.tsx` — a reusable confirmation dialog for deleting records (used by employment, education, and references):

  ```typescript
  // src/components/dashboard/delete-dialog.tsx
  "use client";

  import { useState } from "react";
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { Button } from "@/components/ui/button";
  import { Trash2 } from "lucide-react";

  interface DeleteDialogProps {
    title: string;
    description: string;
    onConfirm: () => Promise<void>;
  }

  export function DeleteDialog({
    title,
    description,
    onConfirm,
  }: DeleteDialogProps) {
    const [loading, setLoading] = useState(false);

    async function handleConfirm() {
      setLoading(true);
      await onConfirm();
      setLoading(false);
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  ```

- [ ] **7.2** Create `src/components/dashboard/employment-list.tsx` — a client component that renders the list with delete functionality:

  ```typescript
  // src/components/dashboard/employment-list.tsx
  "use client";

  import Link from "next/link";
  import { useRouter } from "next/navigation";
  import { toast } from "sonner";
  import dayjs from "dayjs";
  import { Plus, Pencil } from "lucide-react";
  import { createClient } from "@/lib/supabase/client";
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { DeleteDialog } from "@/components/dashboard/delete-dialog";
  import type { Employment } from "@/types/database";

  interface EmploymentListProps {
    employment: Employment[];
  }

  export function EmploymentList({ employment }: EmploymentListProps) {
    const router = useRouter();
    const supabase = createClient();

    async function handleDelete(id: string) {
      const { error } = await supabase
        .from("employment")
        .delete()
        .eq("id", id);
      if (error) {
        toast.error("Failed to delete employment record.");
        console.error("Employment delete error:", error);
        return;
      }
      toast.success("Employment record deleted.");
      router.refresh();
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Employment History</h1>
          <Button asChild>
            <Link href="/dashboard/employment/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Employment
            </Link>
          </Button>
        </div>
        {employment.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No employment records yet. Click &quot;Add Employment&quot; to get
              started.
            </CardContent>
          </Card>
        ) : (
          employment.map((item) => (
            <Card key={item.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg">{item.company}</CardTitle>
                  <CardDescription>{item.position}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/employment/${item.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteDialog
                    title="Delete Employment Record"
                    description={`Are you sure you want to delete the employment record for "${item.company}"? This action cannot be undone.`}
                    onConfirm={() => handleDelete(item.id)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {dayjs(item.start_date).format("MMM YYYY")} —{" "}
                  {item.end_date
                    ? dayjs(item.end_date).format("MMM YYYY")
                    : "Present"}
                </p>
                {item.description && (
                  <p className="mt-2 text-sm">{item.description}</p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    );
  }
  ```

- [ ] **7.3** Create `src/app/dashboard/employment/page.tsx`:

  ```typescript
  // src/app/dashboard/employment/page.tsx
  import { redirect } from "next/navigation";
  import { createClient } from "@/lib/supabase/server";
  import { EmploymentList } from "@/components/dashboard/employment-list";

  export const metadata = {
    title: "Employment History | Emergency Electric INC",
  };

  export default async function EmploymentPage() {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { data: employment, error } = await supabase
      .from("employment")
      .select("*")
      .eq("user_id", user.id)
      .order("start_date", { ascending: false });

    if (error) {
      throw new Error("Failed to load employment data.");
    }

    return <EmploymentList employment={employment ?? []} />;
  }
  ```

- [ ] **7.4** Create `src/app/dashboard/employment/add/page.tsx`:

  ```typescript
  // src/app/dashboard/employment/add/page.tsx
  import { EmploymentForm } from "@/components/dashboard/employment-form";

  export const metadata = {
    title: "Add Employment | Emergency Electric INC",
  };

  export default function AddEmploymentPage() {
    return <EmploymentForm mode="add" />;
  }
  ```

- [ ] **7.5** Create `src/app/dashboard/employment/[id]/page.tsx`:

  ```typescript
  // src/app/dashboard/employment/[id]/page.tsx
  import { notFound, redirect } from "next/navigation";
  import { createClient } from "@/lib/supabase/server";
  import { EmploymentForm } from "@/components/dashboard/employment-form";

  export const metadata = {
    title: "Edit Employment | Emergency Electric INC",
  };

  export default async function EditEmploymentPage({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    const { id } = await params;
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { data: employment, error } = await supabase
      .from("employment")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error || !employment) {
      notFound();
    }

    return <EmploymentForm mode="edit" employment={employment} />;
  }
  ```

- [ ] **7.6** Verify employment list renders all records with edit/delete buttons. Verify add form creates a new record and redirects to list. Verify edit form loads existing data and updates the record. Verify delete shows confirmation dialog and removes the record.

### Commit
```
feat: add employment CRUD pages with list, add, edit, and delete
```

---

## Task 8: Education — Shared Form Component

### Why
Same pattern as employment. The form handles both add and edit modes.

### Files
- `src/components/dashboard/education-form.tsx`

### Steps

- [ ] **8.1** Create `src/components/dashboard/education-form.tsx`:

  ```typescript
  // src/components/dashboard/education-form.tsx
  "use client";

  import { useState } from "react";
  import { useRouter } from "next/navigation";
  import { toast } from "sonner";
  import dayjs from "dayjs";
  import { createClient } from "@/lib/supabase/client";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import type { Education, EducationFormData } from "@/types/database";

  interface EducationFormProps {
    mode: "add" | "edit";
    education?: Education;
  }

  export function EducationForm({ mode, education }: EducationFormProps) {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<EducationFormData>({
      institution: education?.institution ?? "",
      degree: education?.degree ?? "",
      field_of_study: education?.field_of_study ?? "",
      start_date: education?.start_date ?? dayjs().format("YYYY-MM-DD"),
      end_date: education?.end_date ?? "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

      if (!formData.institution.trim()) {
        toast.error("Institution is required.");
        return;
      }

      setLoading(true);

      if (mode === "add") {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          toast.error("You must be logged in.");
          setLoading(false);
          return;
        }
        const { error } = await supabase.from("education").insert({
          user_id: user.id,
          institution: formData.institution.trim(),
          degree: formData.degree.trim(),
          field_of_study: formData.field_of_study.trim(),
          start_date: formData.start_date,
          end_date: formData.end_date || null,
        });
        setLoading(false);
        if (error) {
          toast.error("Failed to add education record.");
          console.error("Education insert error:", error);
          return;
        }
        toast.success("Education record added.");
      } else {
        const { error } = await supabase
          .from("education")
          .update({
            institution: formData.institution.trim(),
            degree: formData.degree.trim(),
            field_of_study: formData.field_of_study.trim(),
            start_date: formData.start_date,
            end_date: formData.end_date || null,
          })
          .eq("id", education!.id);
        setLoading(false);
        if (error) {
          toast.error("Failed to update education record.");
          console.error("Education update error:", error);
          return;
        }
        toast.success("Education record updated.");
      }

      router.push("/dashboard/education");
      router.refresh();
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === "add" ? "Add Education" : "Edit Education"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="institution">
                Institution <span className="text-destructive">*</span>
              </Label>
              <Input
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="degree">Degree</Label>
                <Input
                  id="degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  placeholder="e.g., Bachelor's, Associate's, Diploma"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="field_of_study">Field of Study</Label>
                <Input
                  id="field_of_study"
                  name="field_of_study"
                  value={formData.field_of_study}
                  onChange={handleChange}
                  placeholder="e.g., Electrical Engineering"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  name="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  name="end_date"
                  type="date"
                  value={formData.end_date ?? ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/education")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading
                  ? "Saving..."
                  : mode === "add"
                    ? "Add Record"
                    : "Update Record"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
  ```

### Commit
```
feat: add shared education form component with add/edit modes
```

---

## Task 9: Education — List, Add, Edit Pages

### Why
Same CRUD pattern as employment. List page shows all education records, with links to add/edit and delete actions.

### Files
- `src/app/dashboard/education/page.tsx`
- `src/app/dashboard/education/add/page.tsx`
- `src/app/dashboard/education/[id]/page.tsx`
- `src/components/dashboard/education-list.tsx`

### Steps

- [ ] **9.1** Create `src/components/dashboard/education-list.tsx`:

  ```typescript
  // src/components/dashboard/education-list.tsx
  "use client";

  import Link from "next/link";
  import { useRouter } from "next/navigation";
  import { toast } from "sonner";
  import dayjs from "dayjs";
  import { Plus, Pencil } from "lucide-react";
  import { createClient } from "@/lib/supabase/client";
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { DeleteDialog } from "@/components/dashboard/delete-dialog";
  import type { Education } from "@/types/database";

  interface EducationListProps {
    education: Education[];
  }

  export function EducationList({ education }: EducationListProps) {
    const router = useRouter();
    const supabase = createClient();

    async function handleDelete(id: string) {
      const { error } = await supabase
        .from("education")
        .delete()
        .eq("id", id);
      if (error) {
        toast.error("Failed to delete education record.");
        console.error("Education delete error:", error);
        return;
      }
      toast.success("Education record deleted.");
      router.refresh();
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Education</h1>
          <Button asChild>
            <Link href="/dashboard/education/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Link>
          </Button>
        </div>
        {education.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No education records yet. Click &quot;Add Education&quot; to get
              started.
            </CardContent>
          </Card>
        ) : (
          education.map((item) => (
            <Card key={item.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg">{item.institution}</CardTitle>
                  <CardDescription>
                    {[item.degree, item.field_of_study]
                      .filter(Boolean)
                      .join(" — ")}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/education/${item.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteDialog
                    title="Delete Education Record"
                    description={`Are you sure you want to delete the education record for "${item.institution}"? This action cannot be undone.`}
                    onConfirm={() => handleDelete(item.id)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {dayjs(item.start_date).format("MMM YYYY")} —{" "}
                  {item.end_date
                    ? dayjs(item.end_date).format("MMM YYYY")
                    : "Present"}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    );
  }
  ```

- [ ] **9.2** Create `src/app/dashboard/education/page.tsx`:

  ```typescript
  // src/app/dashboard/education/page.tsx
  import { redirect } from "next/navigation";
  import { createClient } from "@/lib/supabase/server";
  import { EducationList } from "@/components/dashboard/education-list";

  export const metadata = {
    title: "Education | Emergency Electric INC",
  };

  export default async function EducationPage() {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { data: education, error } = await supabase
      .from("education")
      .select("*")
      .eq("user_id", user.id)
      .order("start_date", { ascending: false });

    if (error) {
      throw new Error("Failed to load education data.");
    }

    return <EducationList education={education ?? []} />;
  }
  ```

- [ ] **9.3** Create `src/app/dashboard/education/add/page.tsx`:

  ```typescript
  // src/app/dashboard/education/add/page.tsx
  import { EducationForm } from "@/components/dashboard/education-form";

  export const metadata = {
    title: "Add Education | Emergency Electric INC",
  };

  export default function AddEducationPage() {
    return <EducationForm mode="add" />;
  }
  ```

- [ ] **9.4** Create `src/app/dashboard/education/[id]/page.tsx`:

  ```typescript
  // src/app/dashboard/education/[id]/page.tsx
  import { notFound, redirect } from "next/navigation";
  import { createClient } from "@/lib/supabase/server";
  import { EducationForm } from "@/components/dashboard/education-form";

  export const metadata = {
    title: "Edit Education | Emergency Electric INC",
  };

  export default async function EditEducationPage({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    const { id } = await params;
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { data: education, error } = await supabase
      .from("education")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error || !education) {
      notFound();
    }

    return <EducationForm mode="edit" education={education} />;
  }
  ```

- [ ] **9.5** Verify education list, add, edit, and delete all work correctly.

### Commit
```
feat: add education CRUD pages with list, add, edit, and delete
```

---

## Task 10: References — Shared Form Component

### Why
Same pattern. References form handles add and edit modes.

### Files
- `src/components/dashboard/reference-form.tsx`

### Steps

- [ ] **10.1** Create `src/components/dashboard/reference-form.tsx`:

  ```typescript
  // src/components/dashboard/reference-form.tsx
  "use client";

  import { useState } from "react";
  import { useRouter } from "next/navigation";
  import { toast } from "sonner";
  import { createClient } from "@/lib/supabase/client";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import type { Reference, ReferenceFormData } from "@/types/database";

  interface ReferenceFormProps {
    mode: "add" | "edit";
    reference?: Reference;
  }

  export function ReferenceForm({ mode, reference }: ReferenceFormProps) {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ReferenceFormData>({
      name: reference?.name ?? "",
      relationship: reference?.relationship ?? "",
      phone: reference?.phone ?? "",
      email: reference?.email ?? "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

      if (!formData.name.trim() || !formData.relationship.trim()) {
        toast.error("Name and relationship are required.");
        return;
      }

      setLoading(true);

      if (mode === "add") {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          toast.error("You must be logged in.");
          setLoading(false);
          return;
        }
        const { error } = await supabase.from("references").insert({
          user_id: user.id,
          name: formData.name.trim(),
          relationship: formData.relationship.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
        });
        setLoading(false);
        if (error) {
          toast.error("Failed to add reference.");
          console.error("Reference insert error:", error);
          return;
        }
        toast.success("Reference added.");
      } else {
        const { error } = await supabase
          .from("references")
          .update({
            name: formData.name.trim(),
            relationship: formData.relationship.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
          })
          .eq("id", reference!.id);
        setLoading(false);
        if (error) {
          toast.error("Failed to update reference.");
          console.error("Reference update error:", error);
          return;
        }
        toast.success("Reference updated.");
      }

      router.push("/dashboard/references");
      router.refresh();
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === "add" ? "Add Reference" : "Edit Reference"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationship">
                  Relationship <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="relationship"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/references")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading
                  ? "Saving..."
                  : mode === "add"
                    ? "Add Reference"
                    : "Update Reference"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
  ```

### Commit
```
feat: add shared reference form component with add/edit modes
```

---

## Task 11: References — List, Add, Edit Pages

### Why
Complete the references CRUD with list, add, edit, and delete.

### Files
- `src/app/dashboard/references/page.tsx`
- `src/app/dashboard/references/add/page.tsx`
- `src/app/dashboard/references/[id]/page.tsx`
- `src/components/dashboard/reference-list.tsx`

### Steps

- [ ] **11.1** Create `src/components/dashboard/reference-list.tsx`:

  ```typescript
  // src/components/dashboard/reference-list.tsx
  "use client";

  import Link from "next/link";
  import { useRouter } from "next/navigation";
  import { toast } from "sonner";
  import { Plus, Pencil } from "lucide-react";
  import { createClient } from "@/lib/supabase/client";
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { DeleteDialog } from "@/components/dashboard/delete-dialog";
  import type { Reference } from "@/types/database";

  interface ReferenceListProps {
    references: Reference[];
  }

  export function ReferenceList({ references }: ReferenceListProps) {
    const router = useRouter();
    const supabase = createClient();

    async function handleDelete(id: string) {
      const { error } = await supabase
        .from("references")
        .delete()
        .eq("id", id);
      if (error) {
        toast.error("Failed to delete reference.");
        console.error("Reference delete error:", error);
        return;
      }
      toast.success("Reference deleted.");
      router.refresh();
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">References</h1>
          <Button asChild>
            <Link href="/dashboard/references/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Reference
            </Link>
          </Button>
        </div>
        {references.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No references yet. Click &quot;Add Reference&quot; to get started.
            </CardContent>
          </Card>
        ) : (
          references.map((item) => (
            <Card key={item.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription>{item.relationship}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/references/${item.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteDialog
                    title="Delete Reference"
                    description={`Are you sure you want to delete the reference for "${item.name}"? This action cannot be undone.`}
                    onConfirm={() => handleDelete(item.id)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  {item.phone && <span>Phone: {item.phone}</span>}
                  {item.email && <span>Email: {item.email}</span>}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    );
  }
  ```

- [ ] **11.2** Create `src/app/dashboard/references/page.tsx`:

  ```typescript
  // src/app/dashboard/references/page.tsx
  import { redirect } from "next/navigation";
  import { createClient } from "@/lib/supabase/server";
  import { ReferenceList } from "@/components/dashboard/reference-list";

  export const metadata = {
    title: "References | Emergency Electric INC",
  };

  export default async function ReferencesPage() {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { data: references, error } = await supabase
      .from("references")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error("Failed to load references data.");
    }

    return <ReferenceList references={references ?? []} />;
  }
  ```

- [ ] **11.3** Create `src/app/dashboard/references/add/page.tsx`:

  ```typescript
  // src/app/dashboard/references/add/page.tsx
  import { ReferenceForm } from "@/components/dashboard/reference-form";

  export const metadata = {
    title: "Add Reference | Emergency Electric INC",
  };

  export default function AddReferencePage() {
    return <ReferenceForm mode="add" />;
  }
  ```

- [ ] **11.4** Create `src/app/dashboard/references/[id]/page.tsx`:

  ```typescript
  // src/app/dashboard/references/[id]/page.tsx
  import { notFound, redirect } from "next/navigation";
  import { createClient } from "@/lib/supabase/server";
  import { ReferenceForm } from "@/components/dashboard/reference-form";

  export const metadata = {
    title: "Edit Reference | Emergency Electric INC",
  };

  export default async function EditReferencePage({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    const { id } = await params;
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { data: reference, error } = await supabase
      .from("references")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error || !reference) {
      notFound();
    }

    return <ReferenceForm mode="edit" reference={reference} />;
  }
  ```

- [ ] **11.5** Verify references list, add, edit, and delete all work correctly.

### Commit
```
feat: add references CRUD pages with list, add, edit, and delete
```

---

## Task 12: Application Summary Page (Read-Only)

### Why
The dashboard index (`/dashboard`) shows a read-only summary of the user's full application. It fetches all four sections (profile, employment, education, references) server-side and renders them in a single scrollable view. It also shows application completeness status.

### Files
- `src/app/dashboard/page.tsx`
- `src/components/dashboard/application-summary.tsx`

### Steps

- [ ] **12.1** Create `src/components/dashboard/application-summary.tsx`:

  ```typescript
  // src/components/dashboard/application-summary.tsx
  import Link from "next/link";
  import dayjs from "dayjs";
  import { Pencil, CheckCircle2, AlertCircle } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  import { Separator } from "@/components/ui/separator";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import type {
    Profile,
    Employment,
    Education,
    Reference,
  } from "@/types/database";

  interface ApplicationSummaryProps {
    profile: Profile;
    employment: Employment[];
    education: Education[];
    references: Reference[];
  }

  function isComplete(
    profile: Profile,
    employment: Employment[],
    education: Education[],
    references: Reference[]
  ): boolean {
    return (
      !!profile.first_name?.trim() &&
      !!profile.last_name?.trim() &&
      !!profile.phone?.trim() &&
      employment.length >= 1 &&
      education.length >= 1 &&
      references.length >= 1
    );
  }

  export function ApplicationSummary({
    profile,
    employment,
    education,
    references,
  }: ApplicationSummaryProps) {
    const complete = isComplete(profile, employment, education, references);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Application Summary</h1>
          <Badge variant={complete ? "default" : "secondary"}>
            {complete ? (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Complete
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> Incomplete
              </span>
            )}
          </Badge>
        </div>

        {/* Profile Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Profile</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/profile">
                <Pencil className="h-4 w-4 mr-1" /> Edit
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {!profile.first_name && !profile.last_name ? (
              <p className="text-muted-foreground">
                No profile information yet.{" "}
                <Link
                  href="/dashboard/profile"
                  className="underline text-primary"
                >
                  Get started
                </Link>
              </p>
            ) : (
              <dl className="grid gap-2 md:grid-cols-2 text-sm">
                <div>
                  <dt className="font-medium text-muted-foreground">Name</dt>
                  <dd>
                    {profile.first_name} {profile.last_name}
                  </dd>
                </div>
                {profile.phone && (
                  <div>
                    <dt className="font-medium text-muted-foreground">Phone</dt>
                    <dd>{profile.phone}</dd>
                  </div>
                )}
                {profile.address && (
                  <div className="md:col-span-2">
                    <dt className="font-medium text-muted-foreground">
                      Address
                    </dt>
                    <dd>
                      {profile.address}
                      {profile.city && `, ${profile.city}`}
                      {profile.state && `, ${profile.state}`}
                      {profile.zip && ` ${profile.zip}`}
                    </dd>
                  </div>
                )}
              </dl>
            )}
          </CardContent>
        </Card>

        <Separator />

        {/* Employment Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Employment History</CardTitle>
              <CardDescription>
                {employment.length} record{employment.length !== 1 ? "s" : ""}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/employment">
                <Pencil className="h-4 w-4 mr-1" /> Manage
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {employment.length === 0 ? (
              <p className="text-muted-foreground">
                No employment records yet.
              </p>
            ) : (
              <div className="space-y-3">
                {employment.map((item) => (
                  <div key={item.id} className="border-l-2 pl-4 py-1">
                    <p className="font-medium">
                      {item.position} at {item.company}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {dayjs(item.start_date).format("MMM YYYY")} —{" "}
                      {item.end_date
                        ? dayjs(item.end_date).format("MMM YYYY")
                        : "Present"}
                    </p>
                    {item.description && (
                      <p className="text-sm mt-1">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Separator />

        {/* Education Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Education</CardTitle>
              <CardDescription>
                {education.length} record{education.length !== 1 ? "s" : ""}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/education">
                <Pencil className="h-4 w-4 mr-1" /> Manage
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {education.length === 0 ? (
              <p className="text-muted-foreground">
                No education records yet.
              </p>
            ) : (
              <div className="space-y-3">
                {education.map((item) => (
                  <div key={item.id} className="border-l-2 pl-4 py-1">
                    <p className="font-medium">{item.institution}</p>
                    <p className="text-sm text-muted-foreground">
                      {[item.degree, item.field_of_study]
                        .filter(Boolean)
                        .join(" — ")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {dayjs(item.start_date).format("MMM YYYY")} —{" "}
                      {item.end_date
                        ? dayjs(item.end_date).format("MMM YYYY")
                        : "Present"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Separator />

        {/* References Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>References</CardTitle>
              <CardDescription>
                {references.length} record{references.length !== 1 ? "s" : ""}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/references">
                <Pencil className="h-4 w-4 mr-1" /> Manage
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {references.length === 0 ? (
              <p className="text-muted-foreground">No references yet.</p>
            ) : (
              <div className="space-y-3">
                {references.map((item) => (
                  <div key={item.id} className="border-l-2 pl-4 py-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.relationship}
                    </p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      {item.phone && <span>{item.phone}</span>}
                      {item.email && <span>{item.email}</span>}
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

- [ ] **12.2** Create `src/app/dashboard/page.tsx`:

  ```typescript
  // src/app/dashboard/page.tsx
  import { redirect } from "next/navigation";
  import { createClient } from "@/lib/supabase/server";
  import { ApplicationSummary } from "@/components/dashboard/application-summary";

  export const metadata = {
    title: "Dashboard | Emergency Electric INC",
  };

  export default async function DashboardPage() {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const [profileResult, employmentResult, educationResult, referencesResult] =
      await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase
          .from("employment")
          .select("*")
          .eq("user_id", user.id)
          .order("start_date", { ascending: false }),
        supabase
          .from("education")
          .select("*")
          .eq("user_id", user.id)
          .order("start_date", { ascending: false }),
        supabase
          .from("references")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
      ]);

    if (profileResult.error || !profileResult.data) {
      throw new Error("Failed to load application data.");
    }

    return (
      <ApplicationSummary
        profile={profileResult.data}
        employment={employmentResult.data ?? []}
        education={educationResult.data ?? []}
        references={referencesResult.data ?? []}
      />
    );
  }
  ```

- [ ] **12.3** Verify the summary page loads all four sections. Verify completeness badge shows "Incomplete" when missing required data and "Complete" when all requirements are met. Verify "Edit" and "Manage" links navigate to the correct sections. Verify empty states display helpful messages with links.

### Commit
```
feat: add read-only application summary page as dashboard index
```

---

## File Inventory

All files created in this phase:

| File | Type | Task |
|---|---|---|
| `src/types/database.ts` | Types | 2 |
| `src/components/dashboard/sidebar-nav.tsx` | Client component | 3 |
| `src/app/dashboard/layout.tsx` | Server component (layout) | 3 |
| `src/app/dashboard/loading.tsx` | Loading UI | 4 |
| `src/app/dashboard/error.tsx` | Error UI | 4 |
| `src/app/dashboard/profile/page.tsx` | Server component (page) | 5 |
| `src/components/dashboard/profile-form.tsx` | Client component | 5 |
| `src/components/dashboard/employment-form.tsx` | Client component | 6 |
| `src/components/dashboard/delete-dialog.tsx` | Client component | 7 |
| `src/components/dashboard/employment-list.tsx` | Client component | 7 |
| `src/app/dashboard/employment/page.tsx` | Server component (page) | 7 |
| `src/app/dashboard/employment/add/page.tsx` | Server component (page) | 7 |
| `src/app/dashboard/employment/[id]/page.tsx` | Server component (page) | 7 |
| `src/components/dashboard/education-form.tsx` | Client component | 8 |
| `src/components/dashboard/education-list.tsx` | Client component | 9 |
| `src/app/dashboard/education/page.tsx` | Server component (page) | 9 |
| `src/app/dashboard/education/add/page.tsx` | Server component (page) | 9 |
| `src/app/dashboard/education/[id]/page.tsx` | Server component (page) | 9 |
| `src/components/dashboard/reference-form.tsx` | Client component | 10 |
| `src/components/dashboard/reference-list.tsx` | Client component | 11 |
| `src/app/dashboard/references/page.tsx` | Server component (page) | 11 |
| `src/app/dashboard/references/add/page.tsx` | Server component (page) | 11 |
| `src/app/dashboard/references/[id]/page.tsx` | Server component (page) | 11 |
| `src/app/dashboard/page.tsx` | Server component (page) | 12 |
| `src/components/dashboard/application-summary.tsx` | Server component | 12 |

**Total: 25 files across 12 tasks**
