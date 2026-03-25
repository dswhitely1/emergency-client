// src/app/admin/layout.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import WeatherDisplay from "@/components/admin/weather-display";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default async function AdminLayout({
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
