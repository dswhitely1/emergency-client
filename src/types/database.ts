// src/types/database.ts

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  role: "user" | "admin";
  created_at: string;
  updated_at: string;
}

export interface Employment {
  id: string;
  user_id: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string | null;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  user_id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Reference {
  id: string;
  user_id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export type ProfileFormData = Pick<
  Profile,
  "first_name" | "last_name" | "phone" | "address" | "city" | "state" | "zip"
>;

export type EmploymentFormData = Pick<
  Employment,
  "company" | "position" | "start_date" | "end_date" | "description"
>;

export type EducationFormData = Pick<
  Education,
  "institution" | "degree" | "field_of_study" | "start_date" | "end_date"
>;

export type ReferenceFormData = Pick<
  Reference,
  "name" | "relationship" | "phone" | "email"
>;
