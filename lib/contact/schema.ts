import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(254),
  phone: z.string().trim().max(30).optional(),
  topic: z.enum(["general", "service", "employment"], "Please choose a topic."),
  message: z
    .string()
    .trim()
    .min(10, "Please enter at least 10 characters.")
    .max(5000),
  // Honeypot: hidden from people, so any value means a bot filled it in.
  hp_field: z.string(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const TOPIC_LABELS: Record<ContactInput["topic"], string> = {
  general: "General question",
  service: "Service request",
  employment: "Employment interest",
};
