// src/components/dashboard/reference-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import type { Reference, ReferenceFormData } from "@/types/database";

interface ReferenceFormProps {
  mode: "add" | "edit";
  reference?: Reference;
}

export function ReferenceForm({ mode, reference }: ReferenceFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ReferenceFormData>({
    name: reference?.name ?? "",
    relationship: reference?.relationship ?? "",
    phone: reference?.phone ?? "",
    email: reference?.email ?? "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.name.trim() || !formData.relationship.trim()) {
      toast.error("Name and relationship are required.");
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
      const { error } = await supabase.from("references").insert({
        user_id: user.id,
        name: formData.name.trim(),
        relationship: formData.relationship.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
      });
      setLoading(false);
      if (error) {
        toast.error("Failed to add reference.");
        console.error("Reference insert error:", error);
        return;
      }
      toast.success("Reference added.");
    } else {
      const { error } = await supabase
        .from("references")
        .update({
          name: formData.name.trim(),
          relationship: formData.relationship.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
        })
        .eq("id", reference!.id);
      setLoading(false);
      if (error) {
        toast.error("Failed to update reference.");
        console.error("Reference update error:", error);
        return;
      }
      toast.success("Reference updated.");
    }

    router.push("/dashboard/references");
    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {mode === "add" ? "Add Reference" : "Edit Reference"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="relationship">
                Relationship <span className="text-destructive">*</span>
              </Label>
              <Input
                id="relationship"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/references")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading
                ? "Saving..."
                : mode === "add"
                  ? "Add Reference"
                  : "Update Reference"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
