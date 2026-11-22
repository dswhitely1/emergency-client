import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorPage from "@/app/error";
import { site } from "@/content/site";

test("error page offers a retry and the primary phone", async () => {
  const reset = vi.fn();
  const user = userEvent.setup();
  render(<ErrorPage error={new Error("boom")} reset={reset} />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/went wrong/i);
  expect(screen.getByRole("link", { name: /call/i })).toHaveAttribute(
    "href",
    `tel:${site.phones[0].tel}`,
  );
  await user.click(screen.getByRole("button", { name: /try again/i }));
  expect(reset).toHaveBeenCalledTimes(1);
});
