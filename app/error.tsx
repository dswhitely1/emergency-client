"use client";

import { useEffect } from "react";
import { CallButton } from "@/components/site/call-button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center justify-center bg-dark px-4 py-24 text-dark-foreground">
      <div className="max-w-xl text-center">
        <h1 className="mb-4 font-heading text-4xl font-bold tracking-wide uppercase">
          Something went wrong
        </h1>
        <p className="mb-8 text-lg">
          Please try again. If you need an electrician now, give us a call.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center rounded-lg border-2 border-dark-foreground px-6 py-4 font-heading text-2xl font-semibold tracking-wide uppercase transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground focus-visible:border-accent focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none"
          >
            Try again
          </button>
          <CallButton variant="hero" />
        </div>
      </div>
    </main>
  );
}
