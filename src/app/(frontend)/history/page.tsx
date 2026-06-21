import { pageMeta } from "@/lib/seo";
import HistoryView from "@/features/history/HistoryView";

export const metadata = pageMeta({
  title: "Our History",
  description: "Six decades of Pharco milestones — key moments from 1957 to today in research, manufacturing, and global pharmaceutical access.",
})

export default function HistoryPage() {
  return <HistoryView />;
}
