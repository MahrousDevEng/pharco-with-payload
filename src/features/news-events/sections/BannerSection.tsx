import { PageBanner } from "@/components/inner/PageBanner";

export default function BannerSection() {
  return (
    <PageBanner
      image="/images/about-banner.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "News & Events", current: true },
      ]}
      title="Latest news"
      accent="from Pharco"
      lede="Press releases, partnership announcements, conference appearances, and community programmes. The latest from across the Pharco Group."
    />
  );
}
