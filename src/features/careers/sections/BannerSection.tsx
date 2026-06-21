import { PageBanner } from "@/components/inner/PageBanner";

export default function BannerSection() {
  return (
    <PageBanner
      image="/images/banners/careers.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Careers", current: true },
      ]}
      title="Work at"
      accent="Pharco"
      lede="Join a team of 7,000+ professionals across 13 companies, united by a mission to make medicines accessible to patients everywhere."
    />
  );
}
