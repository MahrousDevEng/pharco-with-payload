import Link from "next/link";
import ProductDetailClient from "./ProductDetailClient";
import CTALink from "@/components/CTALink";

export const metadata = { title: "Product Detail · Pharco" };

export default function ProductDetailPage() {
  return (
    <>
      <ProductDetailClient />

      <section className="section">
        <div className="container">
          <div className="indication-block reveal">
            <h4>Indication</h4>
            <p>Detailed indication, dosing recommendations, contraindications and prescribing information for this product will be supplied by the Pharco Medical Affairs team and rendered as CMS-editable fields. The page template is ready to receive structured data on a per-product basis.</p>
          </div>

          <div className="pi-grid reveal">
            <div className="pi-block">
              <h4>Mechanism of Action</h4>
              <p>The pharmacological profile and mechanism of action will be added per product, including class-specific receptor binding, metabolic pathways, and clinical onset/duration.</p>
            </div>
            <div className="pi-block">
              <h4>Posology &amp; Administration</h4>
              <p>Standard adult and paediatric dosing, route of administration, dose adjustments for renal/hepatic impairment, and special populations.</p>
            </div>
            <div className="pi-block">
              <h4>Contraindications</h4>
              <ul>
                <li>Hypersensitivity to active or excipients</li>
                <li>Other contraindications to be supplied per molecule</li>
              </ul>
            </div>
            <div className="pi-block">
              <h4>Storage</h4>
              <p>Store in a dry place at temperatures not exceeding 25 °C. Keep out of reach of children. Specific storage requirements per dosage form will be supplied.</p>
            </div>
          </div>

          <div className="pd-warning reveal">
            <strong>For healthcare professionals.</strong> This information is intended for healthcare professionals. Always read the patient information leaflet and prescribing information. Do not use without consulting a qualified physician or pharmacist.
          </div>
        </div>
      </section>

      <section className="breaker">
        <div className="container">
          <h3>Need detailed prescribing information?</h3>
          <p>Healthcare professionals can request full medical information directly from our team.</p>
          <CTALink href="/contact" variant="dark">Request medical information</CTALink>
        </div>
      </section>
    </>
  );
}
