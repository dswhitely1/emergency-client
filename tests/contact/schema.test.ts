import { z } from "zod";
import { contactSchema } from "@/lib/contact/schema";

const valid = {
  name: "  Ann Smith  ",
  email: "visitor@example.com",
  phone: "",
  topic: "service",
  message: "My breaker keeps tripping.",
  company: "",
};

function fieldErrors(input: unknown) {
  const result = contactSchema.safeParse(input);
  expect(result.success).toBe(false);
  return result.success ? {} : z.flattenError(result.error).fieldErrors;
}

test("valid input parses and trims the name", () => {
  const result = contactSchema.parse(valid);
  expect(result.name).toBe("Ann Smith");
  expect(result.topic).toBe("service");
});

test("a 9-character message fails on message", () => {
  expect(fieldErrors({ ...valid, message: "123456789" })).toHaveProperty("message");
});

test("a whitespace-padded short message fails on message", () => {
  expect(fieldErrors({ ...valid, message: "   short   " })).toHaveProperty("message");
});

test("a bad email fails on email", () => {
  expect(fieldErrors({ ...valid, email: "not-an-email" })).toHaveProperty("email");
});

test("an unknown topic fails on topic", () => {
  expect(fieldErrors({ ...valid, topic: "sales" })).toHaveProperty("topic");
});

test("a name over 100 characters fails on name", () => {
  expect(fieldErrors({ ...valid, name: "a".repeat(101) })).toHaveProperty("name");
});
