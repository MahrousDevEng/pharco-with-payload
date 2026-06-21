import { PageBanner } from "@/components/inner/PageBanner";

export default function BannerSection() {
  return (
    <PageBanner
      image="/images/banners/manufacturing.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Science & Operations", href: "#" },
        { label: "Manufacturing", current: true },
      ]}
      title="Manufacturing"
      accent="Excellence"
      lede="State-of-the-art facilities producing 1.6 million packs daily across every major dosage form, to the highest quality standards."
    />
  );
}
