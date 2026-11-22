import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { ContactForm } from "@/components/contact/contact-form";
import { site } from "@/content/site";

vi.mock("@/app/actions/contact", () => ({ submitContact: vi.fn() }));
vi.mock("next/script", () => ({ default: () => null }));

const submit = vi.mocked(submitContact);

beforeEach(() => {
  submit.mockReset();
});

// Stands in for the Turnstile widget, which injects this hidden field into its container.
function addTurnstileToken(container: HTMLElement, value = "token-123") {
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = "cf-turnstile-response";
  input.value = value;
  container.querySelector(".cf-turnstile")!.append(input);
}

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/name/i), "Ann Smith");
  await user.type(screen.getByLabelText(/email/i), "visitor@example.com");
  await user.type(screen.getByLabelText(/message/i), "Please call me about a quote.");
}

function deferred() {
  let resolve!: (state: ContactState) => void;
  const promise = new Promise<ContactState>((r) => (resolve = r));
  return { promise, resolve };
}

test("every field has an associated label", () => {
  render(<ContactForm />);
  for (const label of [/name/i, /email/i, /phone/i, /topic/i, /message/i]) {
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  }
});

test("a 5-character message shows an inline error without calling the action", async () => {
  const user = userEvent.setup();
  render(<ContactForm />);
  await user.type(screen.getByLabelText(/name/i), "Ann Smith");
  await user.type(screen.getByLabelText(/email/i), "visitor@example.com");
  await user.type(screen.getByLabelText(/message/i), "Hello");

  await user.click(screen.getByRole("button", { name: /send/i }));

  expect(await screen.findByText(/at least 10 characters/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/message/i)).toHaveAttribute("aria-invalid", "true");
  expect(submit).not.toHaveBeenCalled();
});

test("sends the form's own fields, including the Turnstile token, honeypot, and topic", async () => {
  submit.mockResolvedValue({ status: "success" });
  const user = userEvent.setup();
  const { container } = render(<ContactForm />);
  addTurnstileToken(container);
  await fillValid(user);

  await user.click(screen.getByRole("button", { name: /send/i }));

  await waitFor(() => expect(submit).toHaveBeenCalledTimes(1));
  const formData = submit.mock.calls[0][1];
  expect(formData.get("cf-turnstile-response")).toBe("token-123");
  expect(formData.get("hp_field")).toBe("");
  expect(formData.get("topic")).toBe("general");
  expect(formData.get("message")).toBe("Please call me about a quote.");
});

test("while pending the button is disabled and a second click does not resubmit", async () => {
  const pending = deferred();
  submit.mockReturnValue(pending.promise);
  const user = userEvent.setup();
  render(<ContactForm />);
  await fillValid(user);

  const button = screen.getByRole("button", { name: /send/i });
  await user.click(button);
  await waitFor(() => expect(button).toBeDisabled());
  expect(button).toHaveTextContent("Sending…");
  await user.click(button);

  expect(submit).toHaveBeenCalledTimes(1);
  pending.resolve({ status: "success" });
  await screen.findByRole("status");
});

test("on success the form is replaced by a thank-you status message", async () => {
  submit.mockResolvedValue({ status: "success" });
  const user = userEvent.setup();
  render(<ContactForm />);
  await fillValid(user);

  await user.click(screen.getByRole("button", { name: /send/i }));

  expect(await screen.findByRole("status")).toHaveTextContent(/thank/i);
  expect(screen.queryByRole("button", { name: /send/i })).not.toBeInTheDocument();
});

test("on error the message renders as an alert and the form stays", async () => {
  submit.mockResolvedValue({
    status: "error",
    message: "Sorry, we couldn't send your message. Please call us at (502) 727-4823.",
  });
  const user = userEvent.setup();
  render(<ContactForm />);
  await fillValid(user);

  await user.click(screen.getByRole("button", { name: /send/i }));

  expect(await screen.findByRole("alert")).toHaveTextContent("(502) 727-4823");
  expect(screen.getByRole("button", { name: /send/i })).toBeEnabled();
});

// React adds method="POST" itself when it server-renders a Server Action form, and warns if
// `method` is set by hand, so this checks the action is wired; the built HTML is checked separately.
test("the form is wired to the action so a no-JS submit never puts fields in the URL", () => {
  const { container } = render(<ContactForm />);
  const formEl = container.querySelector("form")!;
  expect(formEl.getAttribute("action")).toBeTruthy();
  expect(formEl).not.toHaveAttribute("method", "get");
});

test("the honeypot has a non-semantic name and opts out of autofill and tabbing", () => {
  const { container } = render(<ContactForm />);
  const honeypot = container.querySelector<HTMLInputElement>('input[name="hp_field"]')!;
  expect(honeypot).toHaveAttribute("autocomplete", "off");
  expect(honeypot).toHaveAttribute("tabindex", "-1");
  expect(container.querySelector('[name="company"]')).toBeNull();
});

test("a rejected action shows the phone-number error and allows a retry", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  submit.mockRejectedValueOnce(new Error("Failed to find Server Action"));
  const user = userEvent.setup();
  render(<ContactForm />);
  await fillValid(user);

  await user.click(screen.getByRole("button", { name: /send/i }));

  expect(await screen.findByRole("alert")).toHaveTextContent(site.phones[0].display);
  submit.mockResolvedValueOnce({ status: "success" });
  await user.click(screen.getByRole("button", { name: /send/i }));
  await waitFor(() => expect(submit).toHaveBeenCalledTimes(2));
  expect(await screen.findByRole("status")).toBeInTheDocument();
});

test("a server field error clears once that field changes", async () => {
  submit.mockResolvedValue({
    status: "error",
    message: "Please fix the highlighted fields.",
    fieldErrors: { email: ["That address bounced."] },
  });
  const user = userEvent.setup();
  render(<ContactForm />);
  await fillValid(user);

  await user.click(screen.getByRole("button", { name: /send/i }));
  expect(await screen.findByText("That address bounced.")).toBeInTheDocument();

  await user.type(screen.getByLabelText(/email/i), "m");
  expect(screen.queryByText("That address bounced.")).not.toBeInTheDocument();
});
