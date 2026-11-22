import { site } from "@/content/site";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-16 py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h2
          id="about-heading"
          className="mb-6 font-heading text-4xl font-bold tracking-wide text-primary uppercase"
        >
          Why Choose Us
        </h2>
        {site.about.map((paragraph) => (
          <p key={paragraph} className="mb-4 text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
