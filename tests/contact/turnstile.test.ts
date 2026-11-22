import { verifyTurnstile } from "@/lib/contact/turnstile";

const fetchMock = vi.fn();

beforeEach(() => {
  vi.stubEnv("TURNSTILE_SECRET_KEY", "secret-abc");
  vi.stubGlobal("fetch", fetchMock);
  fetchMock.mockReset();
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

function respond(body: unknown) {
  fetchMock.mockResolvedValue(new Response(JSON.stringify(body)));
}

test("posts secret, response, and remoteip to siteverify", async () => {
  respond({ success: true });
  expect(await verifyTurnstile("tok", "203.0.113.7")).toBe(true);
  const [url, init] = fetchMock.mock.calls[0];
  expect(url).toBe("https://challenges.cloudflare.com/turnstile/v0/siteverify");
  expect(init.method).toBe("POST");
  const body = init.body as FormData;
  expect(body.get("secret")).toBe("secret-abc");
  expect(body.get("response")).toBe("tok");
  expect(body.get("remoteip")).toBe("203.0.113.7");
});

test.each([null, ""])("returns false without calling Cloudflare for token %j", async (token) => {
  expect(await verifyTurnstile(token)).toBe(false);
  expect(fetchMock).not.toHaveBeenCalled();
});

test("returns false when Cloudflare says success is not true", async () => {
  respond({ success: false, "error-codes": ["invalid-input-response"] });
  expect(await verifyTurnstile("tok")).toBe(false);
});

test("returns false on a network error", async () => {
  fetchMock.mockRejectedValue(new TypeError("fetch failed"));
  expect(await verifyTurnstile("tok")).toBe(false);
});

test("returns false when the secret key is missing", async () => {
  vi.stubEnv("TURNSTILE_SECRET_KEY", "");
  respond({ success: true });
  expect(await verifyTurnstile("tok")).toBe(false);
});
