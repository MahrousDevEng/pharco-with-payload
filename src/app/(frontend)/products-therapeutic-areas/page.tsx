import { pageMeta } from "@/lib/seo";
import TherapeuticAreasView from "@/features/products/therapeutic-areas/TherapeuticAreasView";

export const metadata = pageMeta({
  title: "Therapeutic Areas",
  description: "Pharco's medicines organised by therapeutic area — primary care, antimicrobials, oncology, women's health, and beyond.",
})

export default function TherapeuticAreasPage() {
  return <TherapeuticAreasView />;
}
