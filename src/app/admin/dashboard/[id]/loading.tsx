// src/app/admin/dashboard/[id]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function ApplicantDetailLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}
