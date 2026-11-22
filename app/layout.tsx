import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const heading = Barlow_Condensed({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const title = "Emergency Electric, Inc. | Lanesville, IN Electrician";

export const metadata: Metadata = {
  metadataBase: new URL("https://emergencyelectricinc.com"),
  title,
  description: site.tagline,
  openGraph: {
    title,
    description: site.tagline,
    url: "/",
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-body">{children}</body>
    </html>
  );
}
