import { site } from "@/content/site";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-16 py-20"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2
          id="testimonials-heading"
          className="mb-10 font-heading text-4xl font-bold tracking-wide text-primary uppercase"
        >
          Hear From Our Customers
        </h2>
        <ul className="grid gap-8 md:grid-cols-2">
          {site.testimonials.map((testimonial) => (
            <li key={testimonial.author}>
              <figure className="h-full rounded-lg border-l-4 border-secondary bg-card p-6 shadow-sm">
                <blockquote className="mb-4 text-lg leading-relaxed">
                  <p>“{testimonial.quote}”</p>
                </blockquote>
                <figcaption className="font-heading text-lg font-semibold text-primary">
                  — {testimonial.author}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
