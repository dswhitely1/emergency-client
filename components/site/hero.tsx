import Image from "next/image";
import { site } from "@/content/site";
import { CallButton } from "./call-button";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-dark text-dark-foreground"
    >
      <Image
        src="/images/electrician-panel.jpg"
        alt=""
        fill
        fetchPriority="high"
        sizes="100vw"
        className="-z-10 object-cover opacity-30"
      />
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-24 md:py-36">
        <h1
          id="hero-heading"
          className="font-heading text-5xl font-bold tracking-wide uppercase md:text-7xl"
        >
          {site.name}
        </h1>
        <p className="max-w-2xl text-lg md:text-xl">{site.tagline}</p>
        <CallButton variant="hero" />
        <p className="text-sm">{site.hours}</p>
      </div>
    </section>
  );
}
