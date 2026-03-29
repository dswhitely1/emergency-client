// src/components/dashboard/employment-list.tsx
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
import type { Employment } from "@/types/database";

interface EmploymentListProps {
  employment: Employment[];
}

export function EmploymentList({ employment }: EmploymentListProps) {
  const router = useRouter();
  const supabase = createClient();

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from("employment")
      .delete()
      .eq("id", id);
    if (error) {
      toast.error("Failed to delete employment record.");
      console.error("Employment delete error:", error);
      return;
    }
    toast.success("Employment record deleted.");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Employment History</h1>
        <Button asChild>
          <Link href="/dashboard/employment/add">
            <Plus className="h-4 w-4 mr-2" />
            Add Employment
          </Link>
        </Button>
      </div>
      {employment.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No employment records yet. Click &quot;Add Employment&quot; to get
            started.
          </CardContent>
        </Card>
      ) : (
        employment.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-lg">{item.company}</CardTitle>
                <CardDescription>{item.position}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/employment/${item.id}`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
                <DeleteDialog
                  title="Delete Employment Record"
                  description={`Are you sure you want to delete the employment record for "${item.company}"? This action cannot be undone.`}
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
              {item.description && (
                <p className="mt-2 text-sm">{item.description}</p>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
