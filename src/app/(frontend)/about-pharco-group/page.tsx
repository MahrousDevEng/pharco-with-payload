import { pageMeta } from "@/lib/seo";
import PharcoGroupView from "@/features/about/pharco-group/PharcoGroupView";

export const metadata = pageMeta({
  title: "The Pharco Group",
  description: "The companies of the Pharco Group — an integrated pharmaceutical network spanning R&D, manufacturing, and distribution across MENA and beyond.",
})

export default function PharcoGroupPage() {
  return <PharcoGroupView />;
}
