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
