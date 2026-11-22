"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { site } from "@/content/site";
import { sendContactEmail } from "@/lib/contact/email";
import { contactSchema, type ContactInput } from "@/lib/contact/schema";
import { verifyTurnstile } from "@/lib/contact/turnstile";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactInput, string[]>>;
};

const SUCCESS: ContactState = { status: "success" };

function failure(): ContactState {
  return {
    status: "error",
    message: `Sorry, we couldn't send your message. Please call us at ${site.phones[0].display}.`,
  };
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
  if (field(formData, "company")) return SUCCESS;

  const parsed = contactSchema.safeParse({
    name: field(formData, "name"),
    email: field(formData, "email"),
    phone: field(formData, "phone"),
    topic: field(formData, "topic"),
    message: field(formData, "message"),
    company: field(formData, "company") ?? "",
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
