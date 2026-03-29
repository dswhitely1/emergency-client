// src/components/dashboard/application-summary.tsx
import Link from "next/link";
import dayjs from "dayjs";
import { Pencil, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  Profile,
  Employment,
  Education,
  Reference,
} from "@/types/database";

interface ApplicationSummaryProps {
  profile: Profile;
  employment: Employment[];
  education: Education[];
  references: Reference[];
}

function isComplete(
  profile: Profile,
  employment: Employment[],
  education: Education[],
  references: Reference[]
): boolean {
  return (
    !!profile.first_name?.trim() &&
    !!profile.last_name?.trim() &&
    !!profile.phone?.trim() &&
    employment.length >= 1 &&
    education.length >= 1 &&
    references.length >= 1
  );
}

export function ApplicationSummary({
  profile,
  employment,
  education,
  references,
}: ApplicationSummaryProps) {
  const complete = isComplete(profile, employment, education, references);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Application Summary</h1>
        <Badge variant={complete ? "default" : "secondary"}>
          {complete ? (
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Complete
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> Incomplete
            </span>
          )}
        </Badge>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Profile</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/profile">
              <Pencil className="h-4 w-4 mr-1" /> Edit
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {!profile.first_name && !profile.last_name ? (
            <p className="text-muted-foreground">
              No profile information yet.{" "}
              <Link
                href="/dashboard/profile"
                className="underline text-primary"
              >
                Get started
              </Link>
            </p>
          ) : (
            <dl className="grid gap-2 md:grid-cols-2 text-sm">
              <div>
                <dt className="font-medium text-muted-foreground">Name</dt>
                <dd>
                  {profile.first_name} {profile.last_name}
                </dd>
              </div>
              {profile.phone && (
                <div>
                  <dt className="font-medium text-muted-foreground">Phone</dt>
                  <dd>{profile.phone}</dd>
                </div>
              )}
              {profile.address && (
                <div className="md:col-span-2">
                  <dt className="font-medium text-muted-foreground">
                    Address
                  </dt>
                  <dd>
                    {profile.address}
                    {profile.city && `, ${profile.city}`}
                    {profile.state && `, ${profile.state}`}
                    {profile.zip && ` ${profile.zip}`}
                  </dd>
                </div>
              )}
            </dl>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Employment Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Employment History</CardTitle>
            <CardDescription>
              {employment.length} record{employment.length !== 1 ? "s" : ""}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/employment">
              <Pencil className="h-4 w-4 mr-1" /> Manage
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {employment.length === 0 ? (
            <p className="text-muted-foreground">
              No employment records yet.
            </p>
          ) : (
            <div className="space-y-3">
              {employment.map((item) => (
                <div key={item.id} className="border-l-2 pl-4 py-1">
                  <p className="font-medium">
                    {item.position} at {item.company}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {dayjs(item.start_date).format("MMM YYYY")} —{" "}
                    {item.end_date
                      ? dayjs(item.end_date).format("MMM YYYY")
                      : "Present"}
                  </p>
                  {item.description && (
                    <p className="text-sm mt-1">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Education Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Education</CardTitle>
            <CardDescription>
              {education.length} record{education.length !== 1 ? "s" : ""}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/education">
              <Pencil className="h-4 w-4 mr-1" /> Manage
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {education.length === 0 ? (
            <p className="text-muted-foreground">
              No education records yet.
            </p>
          ) : (
            <div className="space-y-3">
              {education.map((item) => (
                <div key={item.id} className="border-l-2 pl-4 py-1">
                  <p className="font-medium">{item.institution}</p>
                  <p className="text-sm text-muted-foreground">
                    {[item.degree, item.field_of_study]
                      .filter(Boolean)
                      .join(" — ")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {dayjs(item.start_date).format("MMM YYYY")} —{" "}
                    {item.end_date
                      ? dayjs(item.end_date).format("MMM YYYY")
                      : "Present"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* References Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>References</CardTitle>
            <CardDescription>
              {references.length} record{references.length !== 1 ? "s" : ""}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/references">
              <Pencil className="h-4 w-4 mr-1" /> Manage
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {references.length === 0 ? (
            <p className="text-muted-foreground">No references yet.</p>
          ) : (
            <div className="space-y-3">
              {references.map((item) => (
                <div key={item.id} className="border-l-2 pl-4 py-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.relationship}
                  </p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    {item.phone && <span>{item.phone}</span>}
                    {item.email && <span>{item.email}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
