import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { TOPIC_LABELS, type ContactInput } from "./schema";

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable ${name}`);
  return value;
}

export function buildContactEmail(input: ContactInput): {
  subject: string;
  text: string;
  html: string;
} {
  const topic = TOPIC_LABELS[input.topic];
  const name = input.name.replace(/[\r\n]+/g, " ");
  const fields: [string, string][] = [
    ["Name", input.name],
    ["Email", input.email],
    ["Phone", input.phone || "Not provided"],
    ["Topic", topic],
  ];

  const text = [
    ...fields.map(([label, value]) => `${label}: ${value}`),
    "",
    input.message,
  ].join("\n");

  const rows = fields
    .map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`)
    .join("\n");
  const html = `${rows}\n<p style="white-space: pre-wrap">${escapeHtml(input.message)}</p>`;

  return { subject: `[Website] ${topic} — ${name}`, text, html };
}

export async function sendContactEmail(
  input: ContactInput,
  client?: SESv2Client,
): Promise<void> {
  const region = requireEnv("SES_REGION");
  const to = requireEnv("CONTACT_TO_EMAIL");
  const from = requireEnv("CONTACT_FROM_EMAIL");
  const { subject, text, html } = buildContactEmail(input);

  await (client ?? new SESv2Client({ region })).send(
    new SendEmailCommand({
      FromEmailAddress: from,
      Destination: { ToAddresses: [to] },
      ReplyToAddresses: [input.email],
      Content: {
        Simple: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: {
            Text: { Data: text, Charset: "UTF-8" },
            Html: { Data: html, Charset: "UTF-8" },
          },
        },
      },
    }),
  );
}
