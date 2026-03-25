// src/app/dashboard/employment/add/page.tsx
import { EmploymentForm } from "@/components/dashboard/employment-form";

export const metadata = {
  title: "Add Employment | Emergency Electric INC",
};

export default function AddEmploymentPage() {
  return <EmploymentForm mode="add" />;
}
