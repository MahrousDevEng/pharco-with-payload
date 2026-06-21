import { pageMeta } from "@/lib/seo";
import GlobalPresenceView from "@/features/global-presence/GlobalPresenceView";

export const metadata = pageMeta({
  title: "Global Presence",
  description: "Pharco's reach across MENA, Africa, Europe, and Asia — partnerships and distribution bringing accessible medicines to global markets.",
})

export default function GlobalPresencePage() {
  return <GlobalPresenceView />;
}
