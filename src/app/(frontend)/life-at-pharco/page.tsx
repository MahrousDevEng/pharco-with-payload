import { pageMeta } from "@/lib/seo";
import LifeAtPharcoView from "@/features/life-at-pharco/LifeAtPharcoView";

export const metadata = pageMeta({
  title: "Life at Pharco",
  description: "Life at Pharco — culture, people, and careers at an Egyptian pharmaceutical pioneer employing thousands across Egypt, Romania, and Algeria.",
})

export default function LifeAtPharcoPage() {
  return <LifeAtPharcoView />;
}
