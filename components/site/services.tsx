import Image from "next/image";
import { site } from "@/content/site";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-16 bg-muted py-20"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2
          id="services-heading"
          className="mb-10 font-heading text-4xl font-bold tracking-wide text-primary uppercase"
        >
          We Specialize In
        </h2>
        <ul className="grid gap-8 md:grid-cols-2">
          {site.services.map((service) => (
            <li
              key={service.title}
              className="overflow-hidden rounded-lg bg-card text-card-foreground shadow-sm"
            >
              <Image
                src={service.image}
                alt={service.imageAlt}
                width={1920}
                height={1280}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-[3/2] w-full object-cover"
              />
              <div className="p-6">
                <h3 className="mb-2 font-heading text-2xl font-semibold uppercase">
                  {service.title}
                </h3>
                <p className="leading-relaxed">{service.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
