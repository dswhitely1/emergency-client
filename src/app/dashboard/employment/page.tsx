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
