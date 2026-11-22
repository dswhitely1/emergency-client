import type { SESv2Client } from "@aws-sdk/client-sesv2";
import { buildContactEmail, sendContactEmail } from "@/lib/contact/email";
import type { ContactInput } from "@/lib/contact/schema";

const input: ContactInput = {
  name: "Ann Smith",
  email: "visitor@example.com",
  phone: "812-555-0100",
  topic: "service",
  message: "My breaker keeps tripping.",
  company: "",
};

const ENV = {
  SES_REGION: "us-east-1",
  CONTACT_TO_EMAIL: "office@example.com",
  CONTACT_FROM_EMAIL: "website@example.com",
};

beforeEach(() => {
  for (const [key, value] of Object.entries(ENV)) vi.stubEnv(key, value);
});
afterEach(() => vi.unstubAllEnvs());

function fakeClient() {
  const send = vi.fn().mockResolvedValue({});
  return { client: { send } as unknown as SESv2Client, send };
}

describe("buildContactEmail", () => {
  test("subject names the topic and visitor", () => {
    expect(buildContactEmail(input).subject).toBe("[Website] Service request — Ann Smith");
  });

  test("strips CR/LF from the name in the subject", () => {
    const { subject } = buildContactEmail({ ...input, name: "Ann\r\nBcc: x@y.z" });
    expect(subject).not.toMatch(/[\r\n]/);
  });

  test("escapes HTML in the html body", () => {
    const { html } = buildContactEmail({
      ...input,
      name: `"O'Neil" & <b>`,
      message: "<script>alert(1)</script>",
    });
    expect(html).toContain("&lt;script&gt;");
    expect(html).not.toContain("<script>");
    expect(html).toContain("&quot;O&#39;Neil&quot; &amp; &lt;b&gt;");
  });

  test("text body contains the raw message, phone, and email", () => {
    const { text } = buildContactEmail({ ...input, message: "<script>alert(1)</script>" });
    expect(text).toContain("<script>alert(1)</script>");
    expect(text).toContain("812-555-0100");
    expect(text).toContain("visitor@example.com");
  });
});

describe("sendContactEmail", () => {
  test("sends from/to the env addresses with Reply-To set to the visitor", async () => {
    const { client, send } = fakeClient();
    await sendContactEmail(input, client);
    expect(send).toHaveBeenCalledTimes(1);
    const command = send.mock.calls[0][0];
    expect(command.input).toMatchObject({
      FromEmailAddress: "website@example.com",
      Destination: { ToAddresses: ["office@example.com"] },
      ReplyToAddresses: ["visitor@example.com"],
    });
    expect(command.input.Content.Simple.Subject.Data).toBe(
      "[Website] Service request — Ann Smith",
    );
  });

  test.each(Object.keys(ENV))("rejects when %s is unset", async (key) => {
    vi.stubEnv(key, "");
    const { client, send } = fakeClient();
    await expect(sendContactEmail(input, client)).rejects.toThrow(key);
    expect(send).not.toHaveBeenCalled();
  });
});
