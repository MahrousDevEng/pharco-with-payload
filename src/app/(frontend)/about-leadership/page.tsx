import { pageMeta } from "@/lib/seo";
import LeadershipView from "@/features/about/leadership/LeadershipView";

export const metadata = pageMeta({
  title: "Leadership",
  description: "Meet the Pharco Corporation leadership team guiding our mission to deliver high-quality, affordable medicines worldwide.",
})

export default function LeadershipPage() {
  return <LeadershipView />;
}
