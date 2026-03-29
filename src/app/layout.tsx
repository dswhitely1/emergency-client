import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Navigation } from "@/components/shared/navigation";
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
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
