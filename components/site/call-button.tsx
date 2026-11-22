import { PhoneIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

type CallButtonProps = {
  variant?: "hero" | "floating";
  className?: string;
};

export function CallButton({ variant = "hero", className }: CallButtonProps) {
  const [primary] = site.phones;
  const label = `Call ${primary.display}`;

  if (variant === "floating") {
    return (
      <a
        href={`tel:${primary.tel}`}
        aria-label={label}
        title={label}
        className={cn(
          "fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:outline-none",
          className,
        )}
      >
        <PhoneIcon className="size-6" aria-hidden="true" />
      </a>
    );
  }

  return (
    <a
      href={`tel:${primary.tel}`}
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-3 rounded-lg bg-primary px-6 py-4 font-heading text-2xl font-semibold tracking-wide text-primary-foreground uppercase shadow-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:outline-none",
        className,
      )}
    >
      <PhoneIcon className="size-6" aria-hidden="true" />
      {label}
    </a>
  );
}
