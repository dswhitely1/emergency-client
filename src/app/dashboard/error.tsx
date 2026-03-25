// src/app/dashboard/error.tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Something went wrong</CardTitle>
        <CardDescription>
          An error occurred while loading this page. Please try again.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={reset}>Try Again</Button>
      </CardFooter>
    </Card>
  );
}
