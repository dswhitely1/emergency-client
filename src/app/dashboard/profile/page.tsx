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
