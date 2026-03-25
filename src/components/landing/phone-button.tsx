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
