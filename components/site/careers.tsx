import { site } from "@/content/site";
import { CallButton } from "./call-button";

export function Careers() {
  return (
    <section
      id="careers"
      aria-labelledby="careers-heading"
      className="scroll-mt-16 py-20"
    >
      <div className="mx-auto max-w-3xl px-4">
        <h2
          id="careers-heading"
          className="mb-6 font-heading text-4xl font-bold tracking-wide text-primary uppercase"
        >
          {site.careers.heading}
        </h2>
        <p className="mb-6 text-lg leading-relaxed">{site.careers.body}</p>
        <div className="mb-8 flex flex-wrap gap-4">
          <CallButton variant="hero" />
          <a
            href="#contact"
            className="inline-flex items-center rounded-lg border-2 border-primary px-6 py-4 font-heading text-2xl font-semibold tracking-wide text-primary uppercase transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground focus-visible:border-accent focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none"
          >
            Send a Message
          </a>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {site.careers.eeo}
        </p>
      </div>
    </section>
  );
}
