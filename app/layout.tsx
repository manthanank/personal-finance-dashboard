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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/manthanank/personal-finance-dashboard",
    siteName: "FinTrack Personal Finance",
    title: "FinTrack — Personal Finance & Budget Dashboard",
    description: "Expense tracking, budget limits, subscriptions & CSV bank statement ingestion.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

