// src/components/dashboard/education-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import dayjs from "dayjs";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Education, EducationFormData } from "@/types/database";

interface EducationFormProps {
  mode: "add" | "edit";
  education?: Education;
}

export function EducationForm({ mode, education }: EducationFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<EducationFormData>({
    institution: education?.institution ?? "",
    degree: education?.degree ?? "",
    field_of_study: education?.field_of_study ?? "",
    start_date: education?.start_date ?? dayjs().format("YYYY-MM-DD"),
    end_date: education?.end_date ?? "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.institution.trim()) {
      toast.error("Institution is required.");
      return;
    }

    setLoading(true);

    if (mode === "add") {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in.");
        setLoading(false);
        return;
      }
      const { error } = await supabase.from("education").insert({
        user_id: user.id,
        institution: formData.institution.trim(),
        degree: formData.degree.trim(),
        field_of_study: formData.field_of_study.trim(),
        start_date: formData.start_date,
        end_date: formData.end_date || null,
      });
      setLoading(false);
      if (error) {
        toast.error("Failed to add education record.");
        console.error("Education insert error:", error);
        return;
      }
      toast.success("Education record added.");
    } else {
      const { error } = await supabase
        .from("education")
        .update({
          institution: formData.institution.trim(),
          degree: formData.degree.trim(),
          field_of_study: formData.field_of_study.trim(),
          start_date: formData.start_date,
          end_date: formData.end_date || null,
        })
        .eq("id", education!.id);
      setLoading(false);
      if (error) {
        toast.error("Failed to update education record.");
        console.error("Education update error:", error);
        return;
      }
      toast.success("Education record updated.");
    }

    router.push("/dashboard/education");
    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {mode === "add" ? "Add Education" : "Edit Education"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="institution">
              Institution <span className="text-destructive">*</span>
            </Label>
            <Input
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="e.g., Bachelor's, Associate's, Diploma"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="field_of_study">Field of Study</Label>
              <Input
                id="field_of_study"
                name="field_of_study"
                value={formData.field_of_study}
                onChange={handleChange}
                placeholder="e.g., Electrical Engineering"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                name="start_date"
                type="date"
                value={formData.start_date}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                name="end_date"
                type="date"
                value={formData.end_date ?? ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/education")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading
                ? "Saving..."
                : mode === "add"
                  ? "Add Record"
                  : "Update Record"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
