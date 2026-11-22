import { cacheLife } from "next/cache";
import { site } from "@/content/site";

// Cached so the page stays prerendered; revalidates daily so the year rolls over.
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  const { street, city, state, zip } = site.address;

  return (
    <footer className="bg-dark text-dark-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="mb-2 font-heading text-xl font-semibold uppercase">
            {site.name}
          </p>
          <address className="not-italic">
            {street}
            <br />
            {city}, {state} {zip}
          </address>
        </div>
        <ul className="space-y-2">
          {site.phones.map((phone) => (
            <li key={phone.tel}>
              {phone.label}:{" "}
              <a
                href={`tel:${phone.tel}`}
                aria-label={`Call ${phone.label} ${phone.display}`}
                className="underline underline-offset-4 hover:text-accent focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                {phone.display}
              </a>
            </li>
          ))}
          <li>{site.hours}</li>
        </ul>
        <p>{site.tagline.split(" | ").join(" · ")}</p>
      </div>
      <p className="border-t border-dark-foreground/20 py-4 text-center text-sm">
        © <CopyrightYear /> {site.name} All rights reserved.
      </p>
    </footer>
  );
}
