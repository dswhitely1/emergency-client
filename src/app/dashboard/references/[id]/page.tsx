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
