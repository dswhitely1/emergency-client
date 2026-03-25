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
