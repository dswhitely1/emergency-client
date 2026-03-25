// src/components/dashboard/employment-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import dayjs from "dayjs";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Employment, EmploymentFormData } from "@/types/database";

interface EmploymentFormProps {
  mode: "add" | "edit";
  employment?: Employment;
}

export function EmploymentForm({ mode, employment }: EmploymentFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<EmploymentFormData>({
    company: employment?.company ?? "",
    position: employment?.position ?? "",
    start_date: employment?.start_date ?? dayjs().format("YYYY-MM-DD"),
    end_date: employment?.end_date ?? "",
    description: employment?.description ?? "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.company.trim() || !formData.position.trim()) {
      toast.error("Company and position are required.");
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
      const { error } = await supabase.from("employment").insert({
        user_id: user.id,
        company: formData.company.trim(),
        position: formData.position.trim(),
        start_date: formData.start_date,
        end_date: formData.end_date || null,
        description: formData.description.trim(),
      });
      setLoading(false);
      if (error) {
        toast.error("Failed to add employment record.");
        console.error("Employment insert error:", error);
        return;
      }
      toast.success("Employment record added.");
    } else {
      const { error } = await supabase
        .from("employment")
        .update({
          company: formData.company.trim(),
          position: formData.position.trim(),
          start_date: formData.start_date,
          end_date: formData.end_date || null,
          description: formData.description.trim(),
        })
        .eq("id", employment!.id);
      setLoading(false);
      if (error) {
        toast.error("Failed to update employment record.");
        console.error("Employment update error:", error);
        return;
      }
      toast.success("Employment record updated.");
    }

    router.push("/dashboard/employment");
    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {mode === "add" ? "Add Employment" : "Edit Employment"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company">
                Company <span className="text-destructive">*</span>
              </Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">
                Position <span className="text-destructive">*</span>
              </Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
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
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/employment")}
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
