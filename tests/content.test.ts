import { site } from "@/content/site";

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings);
  }
  return [];
}

test("every phone tel is E.164 (+1 and 10 digits)", () => {
  expect(site.phones.length).toBeGreaterThan(0);
  for (const phone of site.phones) {
    expect(phone.tel).toMatch(/^\+1\d{10}$/);
  }
});

test("primary phone is the direct emergency line", () => {
  expect(site.phones[0].tel).toBe("+15027274823");
});

test("every service has a non-empty, distinct imageAlt", () => {
  const alts = site.services.map((service) => service.imageAlt.trim());
  for (const alt of alts) {
    expect(alt).not.toBe("");
  }
  expect(new Set(alts).size).toBe(alts.length);
});

test('no string in site contains the typo " fro "', () => {
  for (const text of collectStrings(site)) {
    expect(text).not.toContain(" fro ");
  }
});

test("nav hrefs match the section ids", () => {
  expect(site.nav.map((item) => item.href)).toEqual([
    "#about",
    "#services",
    "#testimonials",
    "#careers",
    "#contact",
  ]);
});
