"use client";

import { MenuIcon, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { site } from "@/content/site";

export function MobileNav() {
  const [primary] = site.phones;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          className="text-dark-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
          aria-label="Open menu"
        >
          <MenuIcon className="size-6" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-dark text-dark-foreground">
        <SheetTitle className="px-4 pt-4 text-xl text-dark-foreground">
          {site.name}
        </SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>
        <nav aria-label="Mobile" className="flex flex-col px-2">
          {site.nav.map((item) => (
            <SheetClose asChild key={item.href}>
              <a
                href={item.href}
                className="rounded-md px-3 py-3 font-heading text-xl tracking-wide uppercase hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none"
              >
                {item.label}
              </a>
            </SheetClose>
          ))}
        </nav>
        <a
          href={`tel:${primary.tel}`}
          aria-label={`Call ${primary.display}`}
          className="mx-4 mt-auto mb-6 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-heading text-xl text-primary-foreground hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none"
        >
          <PhoneIcon className="size-5" aria-hidden="true" />
          {primary.display}
        </a>
      </SheetContent>
    </Sheet>
  );
}
