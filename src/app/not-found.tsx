import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
      <p className="text-sm text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Button asChild variant="outline">
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}
