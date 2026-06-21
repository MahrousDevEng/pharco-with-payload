import { PageBanner } from "@/components/inner/PageBanner";

export default function BannerSection() {
  return (
    <PageBanner
      image="/images/banners/leadership.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "About", href: "#" },
        { label: "Leadership", current: true },
      ]}
      title="Our"
      accent="Leadership"
      lede="The people who guide Pharco's mission, building a healthier future with integrity, science, and purpose."
    />
  );
}
