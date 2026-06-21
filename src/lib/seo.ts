import type { Metadata } from "next";

// Per-page SEO helper. Title is bare; the (frontend) layout template appends
// "· Pharco Corporation". OG/Twitter use the full title.
export function pageMeta({ title, description }: { title: string; description: string }): Metadata {
  const fullTitle = `${title} · Pharco Corporation`;
  return {
    title,
    description,
    openGraph: {
      type: "website",
      siteName: "Pharco Corporation",
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
