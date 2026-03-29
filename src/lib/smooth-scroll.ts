"use client";

export function smoothScrollTo(targetId: string) {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}
