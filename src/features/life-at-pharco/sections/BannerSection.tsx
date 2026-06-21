import { PageBanner } from "@/components/inner/PageBanner";

export default function BannerSection() {
  return (
    <PageBanner
      image="/images/about-banner.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Life at Pharco", current: true },
      ]}
      title="A career with"
      accent="meaning"
      lede="8,000+ people across Egypt and 60+ markets, united by the simple idea that what we make matters. Here's what working at Pharco actually looks like."
    />
  );
}
