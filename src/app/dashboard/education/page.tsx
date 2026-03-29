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
