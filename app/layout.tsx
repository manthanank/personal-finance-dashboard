import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://personal-finance-dashboard-eight-sigma.vercel.app"),
  title: "FinTrack — Personal Finance & Budget Dashboard",
  description:
    "Production-grade personal wealth and budgeting dashboard with Supabase Row Level Security, Recharts analytics, CSV stream import, and automated financial AI guidance.",
  keywords: [
    "Personal Finance",
    "Expense Tracker",
    "Budget Planner",
    "Supabase RLS",
    "Next.js 15",
    "Recharts",
    "Fintech Dashboard",
  ],
  authors: [{ name: "Manthan Ank", url: "https://github.com/manthanank" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://personal-finance-dashboard-eight-sigma.vercel.app",
    siteName: "FinTrack Personal Finance",
    title: "FinTrack — Personal Finance & Budget Dashboard",
    description: "Expense tracking, budget limits, subscriptions & CSV bank statement ingestion.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinTrack — Personal Finance & Budget Dashboard",
    description: "Interactive wealth health analyzer, cash flow curves & Supabase RLS security.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "FinTrack Personal Finance Dashboard",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Manthan Ank",
      url: "https://github.com/manthanank",
    },
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
