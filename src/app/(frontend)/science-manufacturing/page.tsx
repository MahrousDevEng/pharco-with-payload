import { pageMeta } from "@/lib/seo";
import ManufacturingView from "@/features/science/manufacturing/ManufacturingView";

export const metadata = pageMeta({
  title: "Manufacturing Excellence",
  description: "Pharco's EU-GMP-certified manufacturing — world-class facilities producing high-quality medicines at scale across multiple sites.",
})

export default function ManufacturingPage() {
  return <ManufacturingView />;
}
