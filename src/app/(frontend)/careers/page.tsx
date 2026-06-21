import { pageMeta } from "@/lib/seo";
import CareersView from "@/features/careers/CareersView";

export const metadata = pageMeta({
  title: "Careers",
  description: "Build your career at Pharco — explore roles across manufacturing, R&D, quality, commercial, and corporate functions.",
})

export default function CareersPage() {
  return <CareersView />;
}
