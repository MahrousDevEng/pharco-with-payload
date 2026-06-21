import { PageBanner } from "@/components/inner/PageBanner";

export default function BannerSection() {
  return (
    <PageBanner
      image="/images/banners/rd.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Science & Operations", href: "#" },
        { label: "Research & Development", current: true },
      ]}
      title="Research &"
      accent="Development"
      lede="Pharco's R&D programme bridges Egypt's scientific heritage with global pharmaceutical innovation, from molecule to market."
    />
  );
}
