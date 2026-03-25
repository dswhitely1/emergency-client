// src/app/admin/dashboard/[id]/page.tsx
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCompleteness } from "@/lib/completeness";
import ApplicationView from "@/components/admin/application-view";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplicantDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

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
