// src/components/dashboard/reference-list.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import type { Reference } from "@/types/database";

interface ReferenceListProps {
  references: Reference[];
}

export function ReferenceList({ references }: ReferenceListProps) {
  const router = useRouter();
  const supabase = createClient();

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from("references")
      .delete()
      .eq("id", id);
    if (error) {
      toast.error("Failed to delete reference.");
      console.error("Reference delete error:", error);
      return;
    }
    toast.success("Reference deleted.");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">References</h1>
        <Button asChild>
          <Link href="/dashboard/references/add">
            <Plus className="h-4 w-4 mr-2" />
            Add Reference
          </Link>
        </Button>
      </div>
      {references.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No references yet. Click &quot;Add Reference&quot; to get started.
          </CardContent>
        </Card>
      ) : (
        references.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <CardDescription>{item.relationship}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/references/${item.id}`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
                <DeleteDialog
                  title="Delete Reference"
                  description={`Are you sure you want to delete the reference for "${item.name}"? This action cannot be undone.`}
                  onConfirm={() => handleDelete(item.id)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 text-sm text-muted-foreground">
                {item.phone && <span>Phone: {item.phone}</span>}
                {item.email && <span>Email: {item.email}</span>}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
