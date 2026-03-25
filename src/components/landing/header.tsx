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

        <p className="text-sm text-primary lg:hidden">
          Emergency Electric INC is an Equal Opportunity Employer
        </p>
      </div>
    </section>
  );
}
