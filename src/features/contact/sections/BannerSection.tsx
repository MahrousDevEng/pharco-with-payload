import { PageBanner } from "@/components/inner/PageBanner";

export default function BannerSection() {
  return (
    <PageBanner
      image="/images/banners/contact.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Contact", current: true },
      ]}
      title="Get in"
      accent="Touch"
      lede="Whether you're a healthcare professional, a patient, a business partner, or a job seeker, we want to hear from you."
    />
  );
}
