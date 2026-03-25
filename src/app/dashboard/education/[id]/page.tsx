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
