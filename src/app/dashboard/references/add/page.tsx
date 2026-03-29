// src/app/dashboard/references/add/page.tsx
import { ReferenceForm } from "@/components/dashboard/reference-form";

export const metadata = {
  title: "Add Reference | Emergency Electric INC",
};

export default function AddReferencePage() {
  return <ReferenceForm mode="add" />;
}
