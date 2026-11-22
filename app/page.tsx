import { ContactSection } from "@/components/contact/contact-section";
import { About } from "@/components/site/about";
import { CallButton } from "@/components/site/call-button";
import { Careers } from "@/components/site/careers";
import { Goals } from "@/components/site/goals";
import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Testimonials } from "@/components/site/testimonials";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <Goals />
        <Careers />
        <ContactSection />
      </main>
      <SiteFooter />
      <CallButton variant="floating" />
    </>
  );
}
