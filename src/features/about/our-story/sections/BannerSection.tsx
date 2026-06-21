import { PageBanner } from "@/components/inner/PageBanner";

export default function BannerSection() {
  return (
    <PageBanner
      image="/images/banners/our-story.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "About", href: "#" },
        { label: "Our Story", current: true },
      ]}
      title="Our"
      accent="Story"
      lede="From a single pharmacy in Alexandria to a global pharmaceutical group, the Pharco story is one of conviction, science, and purpose."
    />
  );
}
