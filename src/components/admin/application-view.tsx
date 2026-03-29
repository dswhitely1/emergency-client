// src/components/admin/application-view.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dayjs from "@/lib/dayjs";
import type { CompletenessResult } from "@/lib/completeness";

// --- Types matching Supabase schema ---

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  created_at: string;
}

interface Employment {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string | null;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
}

interface Reference {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

interface ApplicationViewProps {
  profile: Profile;
  employment: Employment[];
  education: Education[];
  references: Reference[];
  completeness: CompletenessResult;
}

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="text-sm">{value || "—"}</p>
    </div>
  );
}

function formatDate(date: string | null): string {
  if (!date) return "Present";
  return dayjs(date).format("MMM YYYY");
}

export default function ApplicationView({
  profile,
  employment,
  education,
  references,
  completeness,
}: ApplicationViewProps) {
  return (
    <div className="space-y-6">
      {/* Status */}
      <div className="flex items-center gap-3">
        <Badge variant={completeness.isComplete ? "default" : "secondary"}>
          {completeness.isComplete ? "Complete" : `Incomplete (${completeness.summary})`}
        </Badge>
        <span className="text-sm text-muted-foreground">
          Registered {dayjs(profile.created_at).fromNow()}
        </span>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Personal Information
            {!completeness.hasProfile && (
              <Badge variant="outline" className="text-xs">Missing</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field label="First Name" value={profile.first_name} />
            <Field label="Last Name" value={profile.last_name} />
            <Field label="Phone" value={profile.phone} />
            <Field label="Address" value={profile.address} />
            <Field label="City" value={profile.city} />
            <Field label="State" value={profile.state} />
            <Field label="ZIP Code" value={profile.zip} />
          </div>
        </CardContent>
      </Card>

      {/* Employment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Employment History
            <Badge variant="outline" className="text-xs">
              {employment.length} record{employment.length !== 1 ? "s" : ""}
            </Badge>
            {!completeness.hasEmployment && (
              <Badge variant="outline" className="text-xs text-destructive">Missing</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {employment.length === 0 ? (
            <p className="text-sm text-muted-foreground">No employment records.</p>
          ) : (
            <div className="space-y-4">
              {employment.map((emp) => (
                <div key={emp.id} className="border rounded-md p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{emp.position}</p>
                      <p className="text-sm text-muted-foreground">{emp.company}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(emp.start_date)} — {formatDate(emp.end_date)}
                    </p>
                  </div>
                  {emp.description && (
                    <p className="text-sm">{emp.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Education
            <Badge variant="outline" className="text-xs">
              {education.length} record{education.length !== 1 ? "s" : ""}
            </Badge>
            {!completeness.hasEducation && (
              <Badge variant="outline" className="text-xs text-destructive">Missing</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {education.length === 0 ? (
            <p className="text-sm text-muted-foreground">No education records.</p>
          ) : (
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="border rounded-md p-4 space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">
                        {edu.degree} — {edu.field_of_study}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(edu.start_date)} — {formatDate(edu.end_date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* References */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            References
            <Badge variant="outline" className="text-xs">
              {references.length} record{references.length !== 1 ? "s" : ""}
            </Badge>
            {!completeness.hasReferences && (
              <Badge variant="outline" className="text-xs text-destructive">Missing</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {references.length === 0 ? (
            <p className="text-sm text-muted-foreground">No references provided.</p>
          ) : (
            <div className="space-y-4">
              {references.map((ref) => (
                <div key={ref.id} className="border rounded-md p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <Field label="Name" value={ref.name} />
                    <Field label="Relationship" value={ref.relationship} />
                    <Field label="Phone" value={ref.phone} />
                    <Field label="Email" value={ref.email} />
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
