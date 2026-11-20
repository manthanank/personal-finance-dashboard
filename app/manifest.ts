import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FinTrack — Personal Finance & Budget Dashboard",
    short_name: "FinTrack",
    description: "Production-grade personal wealth and budgeting dashboard with Supabase RLS and Recharts analytics.",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#10b981",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
