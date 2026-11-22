import Image from "next/image";
import { PhoneIcon } from "lucide-react";
import { site } from "@/content/site";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  const [primary] = site.phones;

  return (
    <header className="sticky top-0 z-30 bg-dark text-dark-foreground shadow-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <a
          href="#top"
          className="flex shrink-0 items-center rounded-md focus-visible:ring-4 focus-visible:ring-accent focus-visible:outline-none"
        >
          <Image
            src="/images/emergency-electric-logo.svg"
            alt={site.name}
            width={1052}
            height={392}
            className="h-10 w-auto"
          />
        </a>
        <nav aria-label="Main" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md px-3 py-2 font-heading text-lg tracking-wide uppercase hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={`tel:${primary.tel}`}
          aria-label={`Call ${primary.display}`}
          className="ml-auto inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 font-heading text-lg text-primary-foreground hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none md:ml-2"
        >
          <PhoneIcon className="size-5" aria-hidden="true" />
          <span className="hidden sm:inline">{primary.display}</span>
        </a>
        <MobileNav />
      </div>
    </header>
  );
}
