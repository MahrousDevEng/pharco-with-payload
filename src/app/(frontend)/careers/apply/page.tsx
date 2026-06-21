import { pageMeta } from "@/lib/seo";
import { Suspense } from "react";
import ApplyContent from "./ApplyContent";

export const metadata = pageMeta({
  title: "Apply",
  description: "Apply to join Pharco Corporation — submit your application for open roles across our pharmaceutical operations.",
})

export default function ApplyPage() {
  return (
    <Suspense>
      <ApplyContent />
    </Suspense>
  );
}
