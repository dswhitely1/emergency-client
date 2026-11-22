import { site } from "@/content/site";

export function Goals() {
  return (
    <section
      id="goals"
      aria-labelledby="goals-heading"
      className="scroll-mt-16 bg-secondary py-20 text-secondary-foreground"
    >
      <div className="mx-auto max-w-3xl px-4">
        <h2
          id="goals-heading"
          className="mb-6 font-heading text-4xl font-bold tracking-wide uppercase"
        >
          Our Goals
        </h2>
        {site.goals.map((paragraph) => (
          <p key={paragraph} className="mb-4 text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
