import { pageMeta } from "@/lib/seo";
import QualityView from "@/features/science/quality/QualityView";

export const metadata = pageMeta({
  title: "Quality & Compliance",
  description: "Pharco's quality and compliance standards — ISO certifications, GMP alignment, and international regulatory approvals behind every product.",
})

export default function QualityPage() {
  return <QualityView />;
}
