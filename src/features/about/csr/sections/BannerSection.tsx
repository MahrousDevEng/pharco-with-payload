import { PageBanner } from "@/components/inner/PageBanner";

export default function BannerSection() {
  return (
    <PageBanner
      image="/images/banners/csr.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "About", href: "#" },
        { label: "Impact & Responsibility", current: true },
      ]}
      title="Our Impact &"
      accent="Responsibility"
      lede="We believe that pharmaceutical leadership comes with an obligation to communities, to patients, and to the planet."
    />
  );
}
