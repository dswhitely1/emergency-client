// src/lib/completeness.ts

export interface CompletenessInput {
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  employment_count: number;
  education_count: number;
  reference_count: number;
}

export interface CompletenessResult {
  isComplete: boolean;
  hasProfile: boolean;
  hasEmployment: boolean;
  hasEducation: boolean;
  hasReferences: boolean;
  /** e.g. "3/4" or "4/4" */
  summary: string;
}

export function getCompleteness(input: CompletenessInput): CompletenessResult {
  const hasProfile = Boolean(input.first_name && input.last_name && input.phone);
  const hasEmployment = input.employment_count > 0;
  const hasEducation = input.education_count > 0;
  const hasReferences = input.reference_count > 0;

  const sections = [hasProfile, hasEmployment, hasEducation, hasReferences];
  const completed = sections.filter(Boolean).length;

  return {
    isComplete: completed === 4,
    hasProfile,
    hasEmployment,
    hasEducation,
    hasReferences,
    summary: `${completed}/4`,
  };
}
