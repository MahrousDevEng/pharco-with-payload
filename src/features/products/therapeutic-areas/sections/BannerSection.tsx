import { PageBanner } from "@/components/inner/PageBanner";

export default function BannerSection() {
  return (
    <PageBanner
      image="/images/banners/therapeutic-areas.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "#" },
        { label: "Therapeutic Areas", current: true },
      ]}
      title="Therapeutic"
      accent="Areas"
      lede="Pharco's portfolio spans 12 therapeutic areas, delivering medicines from primary care to specialist oncology treatments."
    />
  );
}
