import { pageMeta } from "@/lib/seo";
import CSRView from "@/features/about/csr/CSRView";

export const metadata = pageMeta({
  title: "Our Impact & Responsibility",
  description: "Pharco's social impact and CSR — from hepatitis C elimination to community health programmes improving lives across Egypt and Africa.",
})

export default function ImpactCSRPage() {
  return <CSRView />;
}
