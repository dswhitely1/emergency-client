import Image from "next/image";
import { SectionNav } from "./section-nav";

export function Services() {
  return (
    <section id="services" className="bg-[#351a1a] py-32 text-secondary">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h3 className="mb-6 text-xl font-medium uppercase">Services</h3>
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">We Specialize In</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <Image
              src="/images/erik-mclean-1117932-unsplash.jpg"
              alt="Residential"
              width={500}
              height={350}
              className="mx-auto my-4 max-w-full rounded-2xl border border-[#dee236] bg-white p-1"
            />
            <h4 className="mb-6 text-lg font-medium uppercase">Residential</h4>
            <p className="mb-6">
              Emergency Electric, Inc can assist with any type of residential
              renovation, whether you are building an extension to your home or
              installing recessed lights in your condo.
            </p>
          </div>
          <div>
            <Image
              src="/images/osama-saeed-1433239-unsplash.jpg"
              alt="Commercial"
              width={500}
              height={350}
              className="mx-auto my-4 max-w-full rounded-2xl border border-[#dee236] bg-white p-1"
            />
            <h4 className="mb-6 text-lg font-medium uppercase">Commercial</h4>
            <p className="mb-6">
              Emergency Electric, Inc offers a variety of commercial services,
              by our commercial electrical contractors.
            </p>
          </div>
        </div>
        <SectionNav label="What Others Say" targetId="testimonials" variant="secondary" />
      </div>
    </section>
  );
}
