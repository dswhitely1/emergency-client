// src/app/admin/dashboard/page.tsx
import { createClient } from "@/lib/supabase/server";
import { getCompleteness } from "@/lib/completeness";
import dayjs from "@/lib/dayjs";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ApplicantProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  created_at: string;
  employment: { count: number }[];
  education: { count: number }[];
  references: { count: number }[];
}

async function getApplicants() {
  const supabase = await createClient();

  // Fetch all non-admin profiles with related record counts
  // Supabase supports selecting count of related tables via embedded resources
  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
      id,
      first_name,
      last_name,
      phone,
      created_at,
      employment(count),
      education(count),
      references(count)
    `
    )
    .eq("role", "user")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch applicants: ${error.message}`);
  }

  return data as ApplicantProfile[];
}

export default async function AdminDashboardPage() {
  const applicants = await getApplicants();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Applicants</h1>
        <p className="text-muted-foreground">
          {applicants.length} registered applicant{applicants.length !== 1 ? "s" : ""}
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Registered</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                No applicants yet.
              </TableCell>
            </TableRow>
          ) : (
            applicants.map((applicant) => {
              const completeness = getCompleteness({
                first_name: applicant.first_name,
                last_name: applicant.last_name,
                phone: applicant.phone,
                employment_count: applicant.employment?.[0]?.count ?? 0,
                education_count: applicant.education?.[0]?.count ?? 0,
                reference_count: applicant.references?.[0]?.count ?? 0,
              });

              const displayName =
                applicant.first_name || applicant.last_name
                  ? `${applicant.first_name ?? ""} ${applicant.last_name ?? ""}`.trim()
                  : "Unnamed";

              return (
                <TableRow key={applicant.id}>
                  <TableCell>
                    <Link
                      href={`/admin/dashboard/${applicant.id}`}
                      className="font-medium hover:underline"
                    >
                      {displayName}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {dayjs(applicant.created_at).fromNow()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={completeness.isComplete ? "default" : "secondary"}>
                      {completeness.isComplete
                        ? "Complete"
                        : `Incomplete (${completeness.summary})`}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/admin/dashboard/${applicant.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
