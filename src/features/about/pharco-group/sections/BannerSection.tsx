import { PageBanner } from "@/components/inner/PageBanner";

export default function BannerSection() {
  return (
    <PageBanner
      image="/images/banners/pharco-group.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "About", href: "#" },
        { label: "The Pharco Group", current: true },
      ]}
      title="The Pharco"
      accent="Group"
      lede="13 companies. One shared purpose: making quality medicines accessible to patients everywhere."
    />
  );
}
