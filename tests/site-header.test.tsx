import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SiteHeader } from "@/components/site/site-header";
import { site } from "@/content/site";

beforeEach(() => {
  window.innerWidth = 375;
  window.dispatchEvent(new Event("resize"));
});

test("mobile menu opens a sheet listing every nav link", async () => {
  const user = userEvent.setup();
  render(<SiteHeader />);

  await user.click(screen.getByRole("button", { name: /open menu/i }));

  const sheet = await screen.findByRole("dialog");
  for (const item of site.nav) {
    expect(
      within(sheet).getByRole("link", { name: item.label }),
    ).toHaveAttribute("href", item.href);
  }
});

test("clicking a sheet link closes the sheet", async () => {
  const user = userEvent.setup();
  render(<SiteHeader />);

  await user.click(screen.getByRole("button", { name: /open menu/i }));
  const sheet = await screen.findByRole("dialog");
  await user.click(within(sheet).getByRole("link", { name: site.nav[0].label }));

  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
});

test("primary phone link dials the primary number and names it", () => {
  render(<SiteHeader />);
  const [primary] = site.phones;

  const links = screen.getAllByRole("link", {
    name: new RegExp(primary.display.replace(/[()]/g, "\\$&")),
  });
  expect(links.length).toBeGreaterThan(0);
  for (const link of links) {
    expect(link).toHaveAttribute("href", `tel:${primary.tel}`);
  }
});
