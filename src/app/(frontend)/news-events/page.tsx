import { pageMeta } from "@/lib/seo";
import NewsView from "@/features/news-events/NewsView";

export const metadata = pageMeta({
  title: "News & Events",
  description: "Latest news, press releases, and events from Pharco Corporation and the Pharco Group.",
})

export default function NewsEventsPage() {
  return <NewsView />;
}
