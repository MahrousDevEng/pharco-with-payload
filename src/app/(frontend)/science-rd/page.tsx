import { pageMeta } from "@/lib/seo";
import RDView from "@/features/science/rd/RDView";

export const metadata = pageMeta({
  title: "Research & Development",
  description: "Pharco's R&D — advancing new therapies and affordable innovation through advanced research, technology, and scientific collaboration.",
})

export default function ScienceRDPage() {
  return <RDView />;
}
