"use client";

import { ArrowUp } from "lucide-react";
import { smoothScrollTo } from "@/lib/smooth-scroll";

interface SectionNavProps {
  label: string;
  targetId: string;
  variant?: "primary" | "secondary";
}

export function SectionNav({ label, targetId, variant = "primary" }: SectionNavProps) {
  const isPrimary = variant === "primary";

  const buttonBg = isPrimary ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/90";
  const buttonText = isPrimary ? "text-white" : "text-white";
  const iconColor = isPrimary ? "text-primary hover:text-primary/80" : "text-secondary hover:text-secondary/80";

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-2 lg:flex-row">
      <button
        onClick={() => smoothScrollTo(targetId)}
        className={`rounded px-6 py-2 font-medium uppercase tracking-wide ${buttonBg} ${buttonText} transition-colors`}
      >
        {label}
      </button>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll To Top"
        className={`rounded-full p-2 ${iconColor} transition-colors`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}
