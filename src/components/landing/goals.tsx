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
