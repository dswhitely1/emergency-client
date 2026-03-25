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
