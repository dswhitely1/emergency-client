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
