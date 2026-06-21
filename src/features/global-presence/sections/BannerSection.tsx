import { PageBanner } from "@/components/inner/PageBanner";

export default function BannerSection() {
  return (
    <PageBanner
      image="/images/impact.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Global Presence", current: true },
      ]}
      title="60+ countries."
      accent="One standard."
      lede="Pharco medicines reach patients across MENA, Africa, Europe, Asia Pacific, and the Americas. Manufactured in Egypt, trusted everywhere."
    />
  );
}
