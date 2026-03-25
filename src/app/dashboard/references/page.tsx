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
