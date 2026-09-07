import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/metadata";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = constructMetadata({
  title: "Wafid GAMCA Medical Token Booking in Pakistan | Gamca Centre",
  description:
    "Book your Wafid/GAMCA medical appointment token online from anywhere in Pakistan. Fast concierge assistance for Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Oman & Yemen visas.",
  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization JSON-LD Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gamca Centre",
    url: "https://www.gamcacentre.com",
    logo: "https://www.gamcacentre.com/logo.png",
    areaServed: "PK",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+92-322-7840807",
      contactType: "customer service",
      areaServed: "PK",
      availableLanguage: ["English", "Urdu"],
    },
  };

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth font-sans`}>
      <head>
        <meta name="google-site-verification" content="PASTE_YOUR_CODE_HERE" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased selection:bg-amber-500/30 selection:text-amber-900 overflow-x-hidden w-full max-w-full">
        <Header />
        <main className="min-h-screen overflow-x-hidden w-full max-w-full">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
