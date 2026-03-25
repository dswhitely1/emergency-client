# Phase 2: Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the public landing page with all sections matching the current app's content, styled with Tailwind CSS.

**Architecture:** Server-rendered landing page composed of section components. Contact form is a client component that writes to Supabase contact_messages table via the anon client. Smooth scroll navigation for anchor links.

**Tech Stack:** Next.js 15 (server components), Tailwind CSS, shadcn/ui (for contact form inputs), Supabase browser client (contact form only)

---

### Task 1: Move Image Assets to public/

**Files:**
- Create: `public/images/electrical-electrician-electricity-1435183.jpg` (copy from `src/assests/`)
- Create: `public/images/erik-mclean-1117932-unsplash.jpg` (copy from `src/assests/`)
- Create: `public/images/osama-saeed-1433239-unsplash.jpg` (copy from `src/assests/`)
- Create: `public/images/EmergencyElectricLogo.svg` (copy from `src/assests/`)

- [ ] **Step 1: Create the public/images directory and copy assets**
```bash
mkdir -p public/images
cp src/assests/electrical-electrician-electricity-1435183.jpg public/images/
cp src/assests/erik-mclean-1117932-unsplash.jpg public/images/
cp src/assests/osama-saeed-1433239-unsplash.jpg public/images/
cp src/assests/EmergencyElectricLogo.svg public/images/
```
Expected: Four image files now exist under `public/images/`.

- [ ] **Step 2: Commit**
```
git add public/images && git commit -m "Phase 2: copy landing page image assets to public/images"
```

---

### Task 2: Install shadcn/ui Dependencies (sonner toast)

**Files:**
- Modified: `package.json`

- [ ] **Step 1: Add the sonner toast component via shadcn**
```bash
npx shadcn@latest add sonner
```
This adds the `sonner` toast provider component to `src/components/ui/sonner.tsx`.

- [ ] **Step 2: Add the Toaster to the root layout**
Open `src/app/layout.tsx` and add the `<Toaster />` component inside the body, after the `{children}`:
```tsx
import { Toaster } from "@/components/ui/sonner";

// Inside the <body> tag, after {children}:
<Toaster />
```

- [ ] **Step 3: Add shadcn dialog component (for contact form success)**
```bash
npx shadcn@latest add dialog
```

- [ ] **Step 4: Add shadcn input and textarea components (for contact form)**
```bash
npx shadcn@latest add input textarea label button
```

- [ ] **Step 5: Commit**
```
git add -A && git commit -m "Phase 2: add shadcn sonner, dialog, input, textarea, label, button components"
```

---

### Task 3: Smooth Scroll Utility

**Files:**
- Create: `src/lib/smooth-scroll.ts`

- [ ] **Step 1: Create the smooth scroll utility**
Create `src/lib/smooth-scroll.ts` with the following content:
```ts
"use client";

export function smoothScrollTo(targetId: string) {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}
```

- [ ] **Step 2: Commit**
```
git add src/lib/smooth-scroll.ts && git commit -m "Phase 2: add smooth scroll utility"
```

---

### Task 4: SectionNav Client Component (Anchor Link + Scroll-to-Top Buttons)

**Files:**
- Create: `src/components/landing/section-nav.tsx`

- [ ] **Step 1: Create the section navigation component**
This is a client component that replaces the old `Buttons` component. It renders a "next section" button and a "scroll to top" button at the bottom of each section.

Create `src/components/landing/section-nav.tsx`:
```tsx
"use client";

import { ArrowUp } from "lucide-react";
import { smoothScrollTo } from "@/lib/smooth-scroll";

interface SectionNavProps {
  label: string;
  targetId: string;
  variant?: "primary" | "secondary";
}

export function SectionNav({ label, targetId, variant = "primary" }: SectionNavProps) {
  const isPrimary = variant === "primary";

  const buttonBg = isPrimary ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/90";
  const buttonText = isPrimary ? "text-white" : "text-white";
  const iconColor = isPrimary ? "text-primary hover:text-primary/80" : "text-secondary hover:text-secondary/80";

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-2 lg:flex-row">
      <button
        onClick={() => smoothScrollTo(targetId)}
        className={`rounded px-6 py-2 font-medium uppercase tracking-wide ${buttonBg} ${buttonText} transition-colors`}
      >
        {label}
      </button>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll To Top"
        className={`rounded-full p-2 ${iconColor} transition-colors`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```
git add src/components/landing/section-nav.tsx && git commit -m "Phase 2: add SectionNav client component for anchor links and scroll-to-top"
```

---

### Task 5: Header Section Component

**Files:**
- Create: `src/components/landing/header.tsx`

- [ ] **Step 1: Create the Header component**
This is a server component that renders the hero section with the background image, company name, tagline, and "Apply Now" link.

Create `src/components/landing/header.tsx`:
```tsx
import Link from "next/link";

export function Header() {
  return (
    <section
      id="header"
      className="relative flex min-h-[30rem] w-full items-center justify-center bg-cover bg-center lg:h-screen"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%), url(/images/electrical-electrician-electricity-1435183.jpg)",
      }}
    >
      <div className="mx-auto flex h-[85vh] max-w-5xl flex-col items-center justify-between px-4 text-center lg:h-auto lg:justify-center lg:gap-8">
        {/* Mobile-only navigation links */}
        <nav className="flex w-full justify-between px-2 py-2 lg:hidden">
          <a href="#about" className="text-sm text-primary">About</a>
          <a href="#services" className="text-sm text-primary">Services</a>
          <a href="#testimonials" className="text-sm text-primary">Testimonials</a>
          <a href="#goals" className="text-sm text-primary">Goals</a>
          <a href="#contact" className="text-sm text-primary">Contact</a>
        </nav>

        <div>
          <h1 className="mb-6 text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
            Emergency Electric INC
          </h1>
          <h4 className="mb-6 text-lg font-medium uppercase text-primary md:text-xl">
            24 Hour Service | Licensed and Insured | Residential and Commercial
          </h4>
          <Link
            href="/login"
            className="inline-block rounded bg-primary px-6 py-2 font-medium uppercase text-white transition-colors hover:bg-primary/90"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile-only equal opportunity text */}
        <p className="text-sm text-primary lg:hidden">
          Emergency Electric INC is an Equal Opportunity Employer
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**
```
git add src/components/landing/header.tsx && git commit -m "Phase 2: add Header landing page section component"
```

---

### Task 6: About Section Component

**Files:**
- Create: `src/components/landing/about.tsx`

- [ ] **Step 1: Create the About component**
Create `src/components/landing/about.tsx`:
```tsx
import { SectionNav } from "./section-nav";

export function About() {
  return (
    <section id="about" className="bg-background py-32">
      <div className="mx-auto max-w-5xl px-4 text-center" style={{ width: "83%" }}>
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">Why Choose Us</h2>
        <p className="mb-6 font-bold">
          With many years of experience in the electrical industry, we take
          pride in our professionalism, punctuality, and customer service.
        </p>
        <p className="mb-6">
          Our primary measure of success is customer satisfaction. We define
          customers as employees, partners and clients. Our intent is to earn
          and maintain the respect and trust of everyone we come in contact with
          when representing Emergency Electric, Inc.
        </p>
        <p className="mb-6">
          We believe in a personal touch to making ourselves known in the
          market. Referral and repeat business is important to us. We want every
          customer to be 100% satisfied with our service and work. We are
          confident that we meet this goal and that is why we offer a 100%
          customer satisfaction guarantee.
        </p>
        <SectionNav label="What We Offer" targetId="services" variant="primary" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**
```
git add src/components/landing/about.tsx && git commit -m "Phase 2: add About landing page section component"
```

---

### Task 7: Services Section Component

**Files:**
- Create: `src/components/landing/services.tsx`

- [ ] **Step 1: Create the Services component**
This is an inverted section (dark background, gold text) with two service cards showing images.

Create `src/components/landing/services.tsx`:
```tsx
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
```

- [ ] **Step 2: Commit**
```
git add src/components/landing/services.tsx && git commit -m "Phase 2: add Services landing page section component"
```

---

### Task 8: Testimonials Section Component

**Files:**
- Create: `src/components/landing/testimonials.tsx`

- [ ] **Step 1: Create the Testimonials component**
Create `src/components/landing/testimonials.tsx`:
```tsx
import { SectionNav } from "./section-nav";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-background py-32">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h3 className="mb-6 text-xl font-medium uppercase">Testimonials</h3>
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">
          Hear from our customers!
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded bg-white p-6 shadow">
            <p className="mb-6">
              &ldquo;They were very efficient, prompt and courteous. They even did a
              little bit extra that they really did not have to do. They were
              quick. I have used them twice now&rdquo;
            </p>
            <cite className="not-italic font-medium">Arlene W.</cite>
          </div>
          <div className="flex flex-col items-center justify-center rounded bg-white p-6 shadow">
            <p className="mb-6">
              &ldquo;They do very good electrical work. They are friendly,
              conscientious about their work, arrive on time, charge fair
              prices and make good recommendations about our electrical
              service. I liked their personal touch, and helpful, attentive
              interest. I have used them twice and would use them again&rdquo;
            </p>
            <cite className="not-italic font-medium">John Robertson</cite>
          </div>
        </div>
        <SectionNav label="Our Goals" targetId="goals" variant="primary" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**
```
git add src/components/landing/testimonials.tsx && git commit -m "Phase 2: add Testimonials landing page section component"
```

---

### Task 9: Goals Section Component

**Files:**
- Create: `src/components/landing/goals.tsx`

- [ ] **Step 1: Create the Goals component**
Create `src/components/landing/goals.tsx`:
```tsx
import { SectionNav } from "./section-nav";

export function Goals() {
  return (
    <section id="goals" className="bg-[#351a1a] py-32 text-secondary">
      <div className="mx-auto max-w-5xl px-4 text-center" style={{ width: "83%" }}>
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">Our Goals</h2>
        <p className="mb-6">
          We are committed to excellence. Our goal is to exceed your
          expectations. Using our years of experience and expertise and by
          providing a dynamic and skilled team, we will ensure your projects are
          a complete success. Our primary measure of success is customer
          satisfaction. We define customers as employees, partners and clients.
          Our intent is to earn and maintain the respect and trust of everyone
          we come in contact with when representing Emergency Electric Inc.
        </p>
        <SectionNav label="Contact Us" targetId="contact" variant="secondary" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**
```
git add src/components/landing/goals.tsx && git commit -m "Phase 2: add Goals landing page section component"
```

---

### Task 10: Contact Form Client Component

**Files:**
- Create: `src/components/landing/contact-form.tsx`

- [ ] **Step 1: Create the ContactForm client component**
This is the only client component among the landing page sections. It handles form state, Supabase insertion, success dialog, and scroll-to-top.

Create `src/components/landing/contact-form.tsx`:
```tsx
"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FormValues {
  firstName: string;
  lastName: string;
  contact: string;
  subject: string;
  message: string;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  contact: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: insertError } = await supabase
        .from("contact_messages")
        .insert({
          first_name: values.firstName,
          last_name: values.lastName,
          contact: values.contact,
          subject: values.subject,
          message: values.message,
        });

      if (insertError) throw insertError;
      setIsSuccess(true);
    } catch {
      setError("An error has occurred, please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleClose() {
    setIsSuccess(false);
    setValues(initialValues);
    setError(null);
  }

  function handleReset() {
    setValues(initialValues);
    setError(null);
  }

  return (
    <>
      <section id="contact" className="bg-background py-32">
        <div className="mx-auto max-w-5xl px-4 text-center" style={{ width: "83%" }}>
          <h3 className="mb-6 text-xl font-medium uppercase">Contact Us</h3>
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Send Us a Message!
          </h2>
          <form onSubmit={handleSubmit} className="my-4 flex flex-col gap-4">
            {/* Row 1: First Name, Last Name, Contact */}
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex-1 text-left">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  value={values.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </div>
              <div className="flex-1 text-left">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  value={values.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </div>
              <div className="flex-1 text-left">
                <Label htmlFor="contact">Email or Phone Number</Label>
                <Input
                  id="contact"
                  name="contact"
                  required
                  value={values.contact}
                  onChange={handleChange}
                  placeholder="Email or Phone Number"
                />
              </div>
            </div>

            {/* Row 2: Subject */}
            <div className="text-left">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                required
                value={values.subject}
                onChange={handleChange}
                placeholder="Subject"
              />
            </div>

            {/* Row 3: Message */}
            <div className="text-left">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                required
                value={values.message}
                onChange={handleChange}
                placeholder="Message"
                rows={5}
              />
              {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={handleReset}
                disabled={isLoading}
              >
                Reset
              </Button>
              <Button
                type="submit"
                className="bg-primary text-white hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Submit"}
              </Button>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Scroll To Top"
                className="rounded-full p-2 text-primary transition-colors hover:text-primary/80"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Success Dialog */}
      <Dialog open={isSuccess} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>
              Your Message has successfully been submitted!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleClose} className="bg-primary text-white hover:bg-primary/90">
              Ok
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

- [ ] **Step 2: Commit**
```
git add src/components/landing/contact-form.tsx && git commit -m "Phase 2: add ContactForm client component with Supabase integration and success dialog"
```

---

### Task 11: Footer Component

**Files:**
- Create: `src/components/landing/footer.tsx`

- [ ] **Step 1: Create the Footer component**
Create `src/components/landing/footer.tsx`:
```tsx
export function Footer() {
  return (
    <footer className="bg-[#222222] pt-8 text-secondary">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="mb-4">
            <p>Emergency Electric INC</p>
            <p>7520 E. Pennington St. NE</p>
            <p>Lanesville, IN 47136</p>
          </div>
          <div className="mb-4">
            <p>Office: (812) 952-6003</p>
            <p>Emergency: (502) 727-4823</p>
            <div className="my-4" />
            <p>Office Hours</p>
            <p>Monday - Friday: 8am - 4pm</p>
          </div>
          <div className="mb-4">
            <p>24 Hour Service</p>
            <p>Licensed &amp; Insured</p>
            <p>Residential and Commercial</p>
          </div>
        </div>
        <p className="pt-8 pb-4 text-center">
          Copyright 2019 - All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**
```
git add src/components/landing/footer.tsx && git commit -m "Phase 2: add Footer landing page component"
```

---

### Task 12: Phone Number Floating Button

**Files:**
- Create: `src/components/landing/phone-button.tsx`

- [ ] **Step 1: Create the PhoneButton component**
This is a floating action button fixed to the bottom-right of the screen that links to the emergency phone number.

Create `src/components/landing/phone-button.tsx`:
```tsx
import { Phone } from "lucide-react";

export function PhoneButton() {
  return (
    <a
      href="tel:5027274823"
      title="Have an emergency, click to call"
      className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-background text-primary shadow-lg transition-colors hover:bg-background/80"
    >
      <Phone className="h-5 w-5" />
    </a>
  );
}
```

- [ ] **Step 2: Commit**
```
git add src/components/landing/phone-button.tsx && git commit -m "Phase 2: add PhoneButton floating emergency call component"
```

---

### Task 13: Landing Page (src/app/page.tsx)

**Files:**
- Create: `src/app/page.tsx`

- [ ] **Step 1: Create the landing page**
This is the server component that composes all landing page sections. It imports all section components and renders them in order.

Create `src/app/page.tsx`:
```tsx
import { Header } from "@/components/landing/header";
import { About } from "@/components/landing/about";
import { Services } from "@/components/landing/services";
import { Testimonials } from "@/components/landing/testimonials";
import { Goals } from "@/components/landing/goals";
import { ContactForm } from "@/components/landing/contact-form";
import { Footer } from "@/components/landing/footer";
import { PhoneButton } from "@/components/landing/phone-button";

export default function HomePage() {
  return (
    <>
      <PhoneButton />
      <Header />
      <About />
      <Services />
      <Testimonials />
      <Goals />
      <ContactForm />
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Commit**
```
git add src/app/page.tsx && git commit -m "Phase 2: add landing page composing all section components"
```

---

### Task 14: Configure next.config.ts for Local Images

**Files:**
- Modified: `next.config.ts`

- [ ] **Step 1: Ensure Next.js Image optimization allows local images**
Open `next.config.ts` and verify the config does not block local image paths. If using `next/image` with `src` as a string path from `/public`, no extra config is needed. However, add the following if not already present to be explicit:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All images are local (served from public/images/)
    unoptimized: false,
  },
};

export default nextConfig;
```

Note: If `next.config.ts` already exists from Phase 1, only modify if needed. The default Next.js config handles `/public` images without extra configuration.

- [ ] **Step 2: Commit (if changes were made)**
```
git add next.config.ts && git commit -m "Phase 2: verify next.config.ts image configuration"
```

---

### Task 15: Add Tailwind Custom Colors

**Files:**
- Modified: `tailwind.config.ts`

- [ ] **Step 1: Verify the Tailwind config includes the design spec color palette**
Open `tailwind.config.ts` and ensure the following custom colors are defined under `theme.extend.colors`. If Phase 1 already set these up, verify they match:

```ts
// Inside theme.extend.colors:
{
  primary: "#670300",
  secondary: "#b48a66",
  background: "#fbf7f5",
}
```

These are referenced throughout all landing page components via classes like `text-primary`, `bg-primary`, `text-secondary`, `bg-background`, etc.

- [ ] **Step 2: Commit (if changes were made)**
```
git add tailwind.config.ts && git commit -m "Phase 2: verify Tailwind custom color palette matches design spec"
```

---

### Task 16: Enable CSS Smooth Scroll Globally

**Files:**
- Modified: `src/app/globals.css`

- [ ] **Step 1: Add smooth scroll behavior to globals.css**
Add the following to the top of `src/app/globals.css` (the Tailwind globals file):

```css
html {
  scroll-behavior: smooth;
}
```

This enables native smooth scrolling for all anchor (`#`) links, which works in all modern browsers. The `smoothScrollTo` utility in `src/lib/smooth-scroll.ts` also uses `behavior: "smooth"` for programmatic scrolling.

- [ ] **Step 2: Commit**
```
git add src/app/globals.css && git commit -m "Phase 2: enable CSS smooth scroll behavior globally"
```

---

### Task 17: Verify and Test

- [ ] **Step 1: Run the dev server and visually verify all sections render**
```bash
npm run dev
```
Open `http://localhost:3000` and verify:
- Header hero section with background image, title, tagline, Apply Now button
- Mobile navigation links visible on small screens, hidden on desktop
- About section with "Why Choose Us" content
- Services section (dark background) with residential and commercial cards
- Testimonials section with two testimonial cards
- Goals section (dark background) with goals text
- Contact form with all five fields, Reset/Submit buttons, scroll-to-top
- Footer with address, phone numbers, office hours, services summary, copyright
- Floating phone button in bottom-right corner
- Smooth scrolling when clicking anchor links
- Contact form submits to Supabase `contact_messages` table (requires Supabase to be configured)
- Success dialog appears after successful submission

- [ ] **Step 2: Run the linter**
```bash
npm run lint
```
Fix any lint errors.

- [ ] **Step 3: Run a production build**
```bash
npm run build
```
Verify the build succeeds with no errors.

- [ ] **Step 4: Final commit for any lint/build fixes**
```
git add -A && git commit -m "Phase 2: fix lint and build issues for landing page"
```
