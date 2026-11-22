// Placeholder from Task A3 so the contact action typechecks on its own branch.
// Task A2 owns this file: when merging, keep A2's version in full.
export type SiteContent = {
  name: string;
  tagline: string;
  phones: { label: string; display: string; tel: string }[];
  address: { street: string; city: string; state: string; zip: string };
  hours: string;
  about: string[];
  services: { title: string; description: string; image: string; imageAlt: string }[];
  testimonials: { quote: string; author: string }[];
  goals: string[];
  careers: { heading: string; body: string; eeo: string };
  nav: { label: string; href: `#${string}` }[];
};

export const site: SiteContent = {
  name: "Emergency Electric INC",
  tagline: "",
  phones: [{ label: "Office", display: "(502) 727-4823", tel: "+15027274823" }],
  address: { street: "", city: "", state: "", zip: "" },
  hours: "",
  about: [],
  services: [],
  testimonials: [],
  goals: [],
  careers: { heading: "", body: "", eeo: "" },
  nav: [],
};
