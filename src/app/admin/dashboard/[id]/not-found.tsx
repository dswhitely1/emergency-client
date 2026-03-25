// src/app/admin/dashboard/[id]/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ApplicantNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <h2 className="text-xl font-semibold">Applicant not found</h2>
      <p className="text-muted-foreground">
        The applicant you are looking for does not exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/admin/dashboard">Back to Applicants</Link>
      </Button>
    </div>
  );
}
