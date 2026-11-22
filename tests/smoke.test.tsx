import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

test("renders a shadcn Button", () => {
  render(<Button>Call</Button>);
  expect(screen.getByRole("button", { name: "Call" })).toBeInTheDocument();
});
