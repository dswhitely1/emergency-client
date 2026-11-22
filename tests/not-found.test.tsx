import { render, screen } from "@testing-library/react";
import NotFound from "@/app/not-found";
import { site } from "@/content/site";

test("404 page links home and to the primary phone", () => {
  render(<NotFound />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/not found/i);
  expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
  expect(
    screen.getByRole("link", { name: new RegExp(site.phones[0].display.replace(/[()]/g, "\\$&")) }),
  ).toHaveAttribute("href", `tel:${site.phones[0].tel}`);
});
