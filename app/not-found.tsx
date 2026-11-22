import Link from "next/link";
import { CallButton } from "@/components/site/call-button";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-dark px-4 py-24 text-dark-foreground">
      <div className="max-w-xl text-center">
        <p className="mb-2 font-heading text-8xl font-bold text-accent">404</p>
        <h1 className="mb-4 font-heading text-4xl font-bold tracking-wide uppercase">
          Page not found
        </h1>
        <p className="mb-8 text-lg">
          The page you&apos;re looking for doesn&apos;t exist. Head back home, or
          call us if you need an electrician now.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg border-2 border-dark-foreground px-6 py-4 font-heading text-2xl font-semibold tracking-wide uppercase transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground focus-visible:border-accent focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none"
          >
            Back to Home
          </Link>
          <CallButton variant="hero" />
        </div>
      </div>
    </main>
  );
}
