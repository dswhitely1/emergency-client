import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Navigation } from "@/components/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emergency Electric INC",
  description:
    "Emergency Electric INC — Licensed electrical services. Apply online or contact us for residential and commercial electrical work.",
  keywords: [
    "electrician",
    "electrical services",
    "emergency electric",
    "residential electrical",
    "commercial electrical",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased">
        <Navigation />
        <main>{children}</main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
