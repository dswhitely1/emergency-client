import { site } from "@/content/site";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-16 bg-muted py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="mb-2 font-heading text-xl font-semibold tracking-wide text-secondary-foreground uppercase">
            Contact Us
          </p>
          <h2
            id="contact-heading"
            className="mb-6 font-heading text-4xl font-bold tracking-wide text-primary uppercase"
          >
            Send Us a Message!
          </h2>
          <p className="mb-4 text-lg leading-relaxed">
            For an electrical emergency, call us any time at{" "}
            <a
              href={`tel:${site.phones[0].tel}`}
              aria-label={`Call ${site.phones[0].label} ${site.phones[0].display}`}
              className="font-semibold text-primary underline underline-offset-4 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              {site.phones[0].display}
            </a>
            .
          </p>
          <p className="text-muted-foreground">{site.hours}</p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
