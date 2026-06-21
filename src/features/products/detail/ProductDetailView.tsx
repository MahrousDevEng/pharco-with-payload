"use client";
import { useRef } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import {
  FileText,
  Pill,
  Tag,
  FlaskConical,
  Beaker,
  Layers,
  Globe2,
  ShieldAlert,
} from "lucide-react";
import InnerBanner from "@/components/InnerBanner";
import CTALink from "@/components/CTALink";
import EditorialImage from "@/components/editorial/EditorialImage";
import { productImage } from "@/lib/productImages";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const TBD_MARKETING = "To be supplied by Marketing team";
const TBD_REGULATORY = "To be supplied by Regulatory team";

function useReveal(margin: `${number}${"px" | "%"}` = "-80px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView] as const;
}

export default function ProductDetailView() {
  const params = useParams();
  const search = useSearchParams();
  const name = decodeURIComponent((params?.slug as string) || "");
  const ta = search?.get("ta") || "";

  const [heroRef, heroInView] = useReveal();
  const [clinicalRef, clinicalInView] = useReveal();
  const [ctaRef, ctaInView] = useReveal();

  const specs = [
    { Icon: Tag, k: "Brand name", v: name || TBD_MARKETING },
    { Icon: FlaskConical, k: "Active ingredient (INN)", v: TBD_MARKETING },
    { Icon: Layers, k: "Therapeutic area", v: ta || TBD_MARKETING },
    { Icon: Pill, k: "Dosage form", v: TBD_MARKETING },
    { Icon: Beaker, k: "Strength", v: TBD_MARKETING },
    { Icon: FileText, k: "Pack shot", v: "High-resolution image (CMS)" },
    { Icon: ShieldAlert, k: "Regulatory text", v: TBD_REGULATORY },
    { Icon: Globe2, k: "Marketed in", v: "Egypt and select export markets" },
  ];

  return (
    <>
      <InnerBanner
        bg="/images/manifacure.jpg"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Therapies & Products", href: "/products-therapeutic-areas" },
          {
            label: ta || "All products",
            href: `/products-overview${ta ? `?ta=${encodeURIComponent(ta)}` : ""}`,
          },
          { label: name || "Product" },
        ]}
        title={
          <>
            {name || "Product"}
            {ta && (
              <>
                {" "}
                <span className="accent">· {ta}</span>
              </>
            )}
          </>
        }
        lede="Brand information, active ingredient, dosage form, strength and (where approved) indication summary, maintained by the Pharco Marketing team."
      />

      {/* PRODUCT HERO */}
      <section className="relative pt-14 pb-10 bg-gradient-to-b from-[#faf7ec] via-white to-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, var(--primary) 0, transparent 40%), radial-gradient(circle at 85% 80%, var(--primary) 0, transparent 40%)",
          }}
        />
        <div className="max-w-[1280px] mx-auto px-4 relative">
          <div
            ref={heroRef}
            className="grid md:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14 items-stretch"
          >
            {/* Pack-shot card */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex flex-col"
            >
              <div className="flex-1 min-h-[420px] rounded-3xl bg-white border border-neutral-200 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.18)] relative overflow-hidden">
                <EditorialImage
                  src={productImage(name)}
                  alt={name || "Pharco product"}
                  w={760}
                  h={900}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] font-bold text-primary bg-white/85 backdrop-blur px-3 py-1.5 rounded-full border border-primary/15">
                  <Tag className="w-3 h-3" strokeWidth={2.2} />
                  {ta || "Pharco"}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                {[
                  { l: "Pharco", s: "Manufacturer" },
                  { l: "GMP", s: "Certified" },
                  { l: "Rx / OTC", s: "Per market" },
                ].map((b) => (
                  <div
                    key={b.l}
                    className="rounded-xl border border-neutral-200 bg-white py-3 px-2"
                  >
                    <div className="text-sm font-bold text-secondary">{b.l}</div>
                    <div className="text-[10px] uppercase tracking-wider text-neutral-500 mt-0.5">
                      {b.s}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Info column */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-secondary leading-[1.05] mb-5 tracking-tight">
                {name || "Product"}
                {ta && (
                  <>
                    <br />
                    <span className="text-primary">{ta}</span>
                  </>
                )}
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={heroInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                style={{ originX: 0 }}
                className="h-1 w-16 bg-primary rounded-full mb-7"
              />
              <p className="text-neutral-600 leading-relaxed mb-8 max-w-xl">
                Brand information, active ingredient, dosage form, strength and
                (where approved) indication summary. Maintained by the Pharco
                Marketing team and rendered through the CMS.
              </p>

              {/* Spec grid */}
              <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
                {specs.map((s, i) => {
                  const Icon = s.Icon;
                  return (
                    <div
                      key={s.k}
                      className={`grid grid-cols-[200px_1fr] gap-4 px-5 py-3.5 items-center ${
                        i !== specs.length - 1
                          ? "border-b border-neutral-100"
                          : ""
                      } hover:bg-neutral-50/60 transition-colors`}
                    >
                      <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-neutral-500 font-bold">
                        <Icon
                          className="w-3.5 h-3.5 text-primary"
                          strokeWidth={1.8}
                        />
                        {s.k}
                      </span>
                      <span className="text-sm text-secondary font-medium">
                        {s.v}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4 flex-wrap mt-8 items-center">
                <CTALink href="/contact">Request Information</CTALink>
                <CTALink href="/products-overview">All Products</CTALink>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CLINICAL CONTENT */}
      <section className="py-14 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <motion.div
            ref={clinicalRef}
            initial={{ opacity: 0, y: 24 }}
            animate={clinicalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="rounded-2xl border border-neutral-200 bg-[#faf7ec] p-8 md:p-10 mb-10"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4 max-w-3xl leading-tight">
              Detailed prescribing information is managed by Medical Affairs.
            </h3>
            <p className="text-neutral-600 leading-relaxed max-w-3xl">
              Indication, dosing recommendations, contraindications, and
              prescribing information for this product are supplied by the
              Pharco Medical Affairs team and rendered as CMS-editable fields.
              Always read the patient information leaflet and prescribing
              information approved in your market.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                t: "Mechanism of action",
                b: "Pharmacological profile and mechanism of action will be added per product, including class-specific receptor binding, metabolic pathway, and clinical onset/duration.",
              },
              {
                t: "Posology & administration",
                b: "Standard adult and paediatric dosing, route of administration, dose adjustments for renal/hepatic impairment, and special populations.",
              },
              {
                t: "Contraindications",
                b: "Hypersensitivity to active or excipients. Other contraindications to be supplied per molecule by Medical Affairs.",
              },
              {
                t: "Storage",
                b: "Store in a dry place at temperatures not exceeding 25 °C. Keep out of reach of children. Refer to label for product-specific conditions.",
              },
            ].map((b, i) => (
              <motion.div
                key={b.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                className="rounded-2xl border border-neutral-200 bg-white p-6 hover:border-primary/40 hover:shadow-xs transition-all duration-300"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary block mb-3">
                  {b.t}
                </span>
                <p className="text-neutral-600 leading-relaxed text-sm">
                  {b.b}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-4 bg-amber-50 border border-amber-200/70 px-6 py-5 rounded-2xl">
            <ShieldAlert
              className="w-5 h-5 text-amber-700 shrink-0 mt-0.5"
              strokeWidth={2}
            />
            <p className="text-sm text-amber-900 leading-relaxed">
              <strong className="font-semibold">
                For healthcare professionals.
              </strong>{" "}
              This information is intended for healthcare professionals. Always
              read the patient information leaflet and prescribing information.
              Pharco products are prescription, over-the-counter, or supplement
              medicines whose use must be guided by the prescribing information
              approved by the relevant regulatory authority in each market.
            </p>
          </div>
        </div>
      </section>

      {/* CTA DARK BAND */}
      <section className="py-14 bg-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h3 className="text-white text-3xl md:text-4xl font-bold mb-4">
              Need Detailed Prescribing Information?
            </h3>
            <p className="text-white/55 text-sm leading-relaxed mb-8">
              Healthcare professionals can request full medical information
              directly from our team.
            </p>
            <div className="flex justify-center">
              <CTALink href="/contact" variant="dark">
                Request Medical Information
              </CTALink>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
