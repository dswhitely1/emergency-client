"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { sendContactEmail } from "@/lib/contact/email";
import { CONTACT_FAILURE_MESSAGE } from "@/lib/contact/messages";
import { contactSchema, type ContactInput } from "@/lib/contact/schema";
import { verifyTurnstile } from "@/lib/contact/turnstile";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactInput, string[]>>;
};

const SUCCESS: ContactState = { status: "success" };

function failure(): ContactState {
  return { status: "error", message: CONTACT_FAILURE_MESSAGE };
}

function field(formData: FormData, name: string): string | undefined {
  const value = formData.get(name);
  return typeof value === "string" ? value : undefined;
}

async function clientIp(): Promise<string | undefined> {
  const forwarded = (await headers()).get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || undefined;
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Bots that fill the hidden field get a fake success so they don't retry.
  if (field(formData, "hp_field")) {
    console.warn("Contact form honeypot filled; message dropped");
    return SUCCESS;
  }

  const parsed = contactSchema.safeParse({
    name: field(formData, "name"),
    email: field(formData, "email"),
    phone: field(formData, "phone"),
    topic: field(formData, "topic"),
    message: field(formData, "message"),
    hp_field: field(formData, "hp_field") ?? "",
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const token = field(formData, "cf-turnstile-response") ?? null;
  if (!(await verifyTurnstile(token, await clientIp()))) return failure();

  try {
    await sendContactEmail(parsed.data);
  } catch (error) {
    console.error("Contact form email failed", error);
    return failure();
  }
  return SUCCESS;
}
