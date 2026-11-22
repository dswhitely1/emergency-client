import { submitContact, type ContactState } from "@/app/actions/contact";
import { site } from "@/content/site";
import { sendContactEmail } from "@/lib/contact/email";
import { verifyTurnstile } from "@/lib/contact/turnstile";

vi.mock("@/lib/contact/email", () => ({ sendContactEmail: vi.fn() }));
vi.mock("@/lib/contact/turnstile", () => ({ verifyTurnstile: vi.fn() }));
vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" }),
}));

const send = vi.mocked(sendContactEmail);
const verify = vi.mocked(verifyTurnstile);
const idle: ContactState = { status: "idle" };
const phone = site.phones[0].display;

function form(overrides: Record<string, string> = {}) {
  const data = new FormData();
  const fields = {
    name: "Ann Smith",
    email: "visitor@example.com",
    phone: "",
    topic: "general",
    message: "Please call me about a quote.",
    hp_field: "",
    "cf-turnstile-response": "token-123",
    ...overrides,
  };
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

beforeEach(() => {
  send.mockReset().mockResolvedValue(undefined);
  verify.mockReset().mockResolvedValue(true);
  vi.spyOn(console, "error").mockImplementation(() => {});
});

test("valid input with a good token sends once and reports success", async () => {
  expect(await submitContact(idle, form())).toEqual({ status: "success" });
  expect(send).toHaveBeenCalledTimes(1);
  expect(send.mock.calls[0][0]).toMatchObject({ name: "Ann Smith", topic: "general" });
  expect(verify).toHaveBeenCalledWith("token-123", "203.0.113.7");
});

test("a filled honeypot pretends success without sending and logs a warning", async () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  const state = await submitContact(idle, form({ hp_field: "Spam LLC" }));
  expect(state.status).toBe("success");
  expect(send).not.toHaveBeenCalled();
  expect(verify).not.toHaveBeenCalled();
  expect(warn).toHaveBeenCalledTimes(1);
});

test("a failed Turnstile check errors with the office phone and does not send", async () => {
  verify.mockResolvedValue(false);
  const state = await submitContact(idle, form());
  expect(state.status).toBe("error");
  expect(state.message).toContain(phone);
  expect(state.fieldErrors).toBeUndefined();
  expect(send).not.toHaveBeenCalled();
});

test("a missing Turnstile token errors with the office phone and does not send", async () => {
  verify.mockResolvedValue(false);
  const data = form();
  data.delete("cf-turnstile-response");
  const state = await submitContact(idle, data);
  expect(verify).toHaveBeenCalledWith(null, "203.0.113.7");
  expect(state.status).toBe("error");
  expect(state.message).toContain(phone);
  expect(send).not.toHaveBeenCalled();
});

test("a send failure errors with the office phone and hides the cause", async () => {
  send.mockRejectedValue(new Error("SES exploded: secret detail"));
  const state = await submitContact(idle, form());
  expect(state.status).toBe("error");
  expect(state.message).toContain(phone);
  expect(state.message).not.toContain("secret detail");
  expect(console.error).toHaveBeenCalled();
});

test("invalid fields return field errors without verifying or sending", async () => {
  const state = await submitContact(idle, form({ message: "too short" }));
  expect(state.status).toBe("error");
  expect(state.fieldErrors?.message?.length).toBeGreaterThan(0);
  expect(verify).not.toHaveBeenCalled();
  expect(send).not.toHaveBeenCalled();
});
