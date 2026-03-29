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
