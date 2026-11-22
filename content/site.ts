export type SiteContent = {
  name: string;
  tagline: string;
  phones: { label: string; display: string; tel: string }[];
  address: { street: string; city: string; state: string; zip: string };
  hours: string;
  about: string[];
  services: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  }[];
  testimonials: { quote: string; author: string }[];
  goals: string[];
  careers: { heading: string; body: string; eeo: string };
  nav: { label: string; href: `#${string}` }[];
};

export const site: SiteContent = {
  name: "Emergency Electric, Inc.",
  tagline: "24 Hour Service | Licensed and Insured | Residential and Commercial",
  // phones[0] is the primary number: the direct line, used by every call button.
  phones: [
    { label: "Emergency", display: "(502) 727-4823", tel: "+15027274823" },
    { label: "Office", display: "(812) 952-6003", tel: "+18129526003" },
  ],
  address: {
    street: "7520 E. Pennington St. NE",
    city: "Lanesville",
    state: "IN",
    zip: "47136",
  },
  hours: "Office hours Monday – Friday, 8am – 4pm. Emergency service 24 hours a day.",
  about: [
    "With many years of experience in the electrical industry, we take pride in our professionalism, punctuality, and customer service.",
    "Our primary measure of success is customer satisfaction. We define customers as employees, partners and clients. Our intent is to earn and maintain the respect and trust of everyone we come in contact with when representing Emergency Electric, Inc.",
    "We believe in a personal touch to making ourselves known in the market. Referral and repeat business is important to us. We want every customer to be 100% satisfied with our service and work. We are confident that we meet this goal and that is why we offer a 100% customer satisfaction guarantee.",
  ],
  services: [
    {
      title: "Residential",
      description:
        "Emergency Electric, Inc can assist with any type of residential renovation, whether you are building an extension to your home or installing recessed lights in your condo.",
      image: "/images/erik-mclean-unsplash.jpg",
      imageAlt:
        "Row of wood-sided homes along a boardwalk, with an outdoor light mounted on the nearest house",
    },
    {
      title: "Commercial",
      description:
        "Emergency Electric, Inc offers a variety of commercial services, by our commercial electrical contractors.",
      image: "/images/osama-saeed-unsplash.jpg",
      imageAlt: "Glass office towers seen from street level",
    },
  ],
  testimonials: [
    {
      quote:
        "They were very efficient, prompt and courteous. They even did a little bit extra that they really did not have to do. They were quick. I have used them twice now.",
      author: "Arlene W.",
    },
    {
      quote:
        "They do very good electrical work. They are friendly, conscientious about their work, arrive on time, charge fair prices and make good recommendations about our electrical service. I liked their personal touch, and helpful, attentive interest. I have used them twice and would use them again.",
      author: "John Robertson",
    },
  ],
  goals: [
    "We are committed to excellence. Our goal is to exceed your expectations. Using our years of experience and expertise and by providing a dynamic and skilled team, we will ensure your projects are a complete success.",
  ],
  careers: {
    heading: "We're Hiring",
    body: "We're hiring licensed electricians and apprentices. Call us or send a message using the form below and choose “Employment interest.”",
    eeo: "Emergency Electric, Inc is an equal opportunity employer and does not discriminate against any applicant or employee based on race, color, religion, sex, national origin, disability, age, or military or veteran status in accordance with federal law. In addition, Emergency Electric, Inc complies with applicable state and local laws governing nondiscrimination in employment in every jurisdiction in which it maintains facilities. Emergency Electric, Inc also provides reasonable accommodation to qualified individuals with disabilities in accordance with applicable laws.",
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#contact" },
  ],
};
