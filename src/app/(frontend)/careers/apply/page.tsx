import { Suspense } from "react";
import ApplyContent from "./ApplyContent";

export const metadata = { title: "Apply · Careers · Pharco Corporation" };

export default function ApplyPage() {
  return (
    <Suspense>
      <ApplyContent />
    </Suspense>
  );
}
