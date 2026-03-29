// src/components/dashboard/education-list.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import dayjs from "dayjs";
import { Plus, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeleteDialog } from "@/components/dashboard/delete-dialog";
import type { Education } from "@/types/database";

interface EducationListProps {
  education: Education[];
}

export function EducationList({ education }: EducationListProps) {
  const router = useRouter();
  const supabase = createClient();

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from("education")
      .delete()
      .eq("id", id);
    if (error) {
      toast.error("Failed to delete education record.");
      console.error("Education delete error:", error);
      return;
    }
    toast.success("Education record deleted.");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Education</h1>
        <Button asChild>
          <Link href="/dashboard/education/add">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Link>
        </Button>
      </div>
      {education.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No education records yet. Click &quot;Add Education&quot; to get
            started.
          </CardContent>
        </Card>
      ) : (
        education.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-lg">{item.institution}</CardTitle>
                <CardDescription>
                  {[item.degree, item.field_of_study]
                    .filter(Boolean)
                    .join(" — ")}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/education/${item.id}`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
                <DeleteDialog
                  title="Delete Education Record"
                  description={`Are you sure you want to delete the education record for "${item.institution}"? This action cannot be undone.`}
                  onConfirm={() => handleDelete(item.id)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {dayjs(item.start_date).format("MMM YYYY")} —{" "}
                {item.end_date
                  ? dayjs(item.end_date).format("MMM YYYY")
                  : "Present"}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
