import { PageBanner } from "@/components/inner/PageBanner";

export default function BannerSection() {
  return (
    <PageBanner
      image="/images/banners/history.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "About", href: "#" },
        { label: "Our History", current: true },
      ]}
      title="Our"
      accent="History"
      lede="Six decades of pharmaceutical innovation, from a single pharmacy in Alexandria to a global group that has changed the course of disease."
    />
  );
}
