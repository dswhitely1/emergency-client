// src/app/dashboard/education/add/page.tsx
import { EducationForm } from "@/components/dashboard/education-form";

export const metadata = {
  title: "Add Education | Emergency Electric INC",
};

export default function AddEducationPage() {
  return <EducationForm mode="add" />;
}
