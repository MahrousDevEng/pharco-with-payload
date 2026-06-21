import { pageMeta } from "@/lib/seo";
import OurStoryView from "@/features/about/our-story/OurStoryView";

export const metadata = pageMeta({
  title: "Our Story",
  description: "Pharco Corporation's journey since 1957 — from an Alexandria pharmacy to an Egyptian pharmaceutical pioneer advancing accessible, innovative medicines.",
})

export default function OurStoryPage() {
  return <OurStoryView />;
}
