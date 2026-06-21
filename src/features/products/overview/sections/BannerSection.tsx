import { PageBanner } from "@/components/inner/PageBanner";

export default function BannerSection() {
  return (
    <PageBanner
      image="/images/banners/products.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "#" },
        { label: "Products Overview", current: true },
      ]}
      title="Products"
      accent="Overview"
      lede="Over 250 products across 12 therapeutic areas, from essential primary care medicines to specialist treatments for complex conditions."
    />
  );
}
