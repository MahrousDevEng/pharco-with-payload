import { PageBanner } from "@/components/inner/PageBanner";

export default function BannerSection() {
  return (
    <PageBanner
      image="/images/banners/quality.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Science & Operations", href: "#" },
        { label: "Quality & Compliance", current: true },
      ]}
      title="Quality &"
      accent="Compliance"
      lede="Our quality systems are not a regulatory requirement. They are how we honour our commitment to every patient who takes a Pharco medicine."
    />
  );
}
