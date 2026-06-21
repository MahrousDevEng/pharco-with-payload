"use client";
import { useRef, useState, useEffect, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import InnerBanner from "@/components/InnerBanner";
import CTALink from "@/components/CTALink";
import EditorialImage from "@/components/editorial/EditorialImage";
import { IMG } from "@/lib/editorialImages";
import ProductsClient from "./ProductsClient";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function useReveal(margin: `${number}${"px" | "%"}` = "-80px") {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView] as const;
}

function CountUp({ to, suffix = "", active }: { to: number; suffix?: string; active: boolean }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf: number;
    const startTime = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to]);

  return (
    <>
      {val}
      {suffix}
    </>
  );
}

const STATS = [
  { to: 350, suffix: "+", label: "Products", sub: "Branded generics" },
  { to: 12, suffix: "", label: "Therapeutic Areas", sub: "Specialties covered" },
  { to: 70, suffix: "+", label: "Countries", sub: "Global reach" },
];

export default function ProductsOverviewView() {
  const [introRef, introInView] = useReveal();
  const [ctaRef, ctaInView] = useReveal();

  return (
    <>
      <InnerBanner
        bg="/images/inners/Product-overview-banner.jpg"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Therapies & Products" },
          { label: "Products Overview" },
        ]}
        title={
          <>
            Quality Medicines for <span className="accent">Better Health</span>
          </>
        }
        lede="350+ branded generics across 12 therapeutic areas, trusted by healthcare professionals and patients in 70+ countries."
      />

      {/* INTRODUCTION:portfolio heading + animated stats */}
      <section className="pt-16 pb-14 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <div ref={introRef} className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: heading + description + stats */}
            <motion.div
              initial={{ opacity: 0, x: -48 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.1] mb-6">
                Pharmaceutical
                <br />
                <span className="text-primary">Product Portfolio</span>
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={introInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                style={{ originX: 0 }}
                className="h-1 w-16 bg-primary rounded-full mb-8"
              />
              <p className="text-neutral-600 leading-relaxed mb-10">
                Browse Pharco&apos;s full pharmaceutical product portfolio organised by
                therapeutic area. From essential primary care medicines to specialist
                oncology and antimicrobial treatments.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={introInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.4 + i * 0.1, ease: EASE }}
                    className="rounded-2xl border border-neutral-200 bg-white px-5 py-5 hover:border-primary/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 text-center"
                  >
                    <div className="text-4xl font-bold text-primary tabular-nums mb-1">
                      <CountUp to={s.to} suffix={s.suffix} active={introInView} />
                    </div>
                    <div className="text-sm font-bold text-secondary">{s.label}</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">{s.sub}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: image */}
            <motion.div
              initial={{ opacity: 0, x: 48 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_70px_-20px_rgba(0,0,0,0.22)] aspect-[4/3]">
                <EditorialImage
                  src={IMG.pharmacy}
                  alt="Pharco pharmaceutical"
                  w={900}
                  h={675}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 via-transparent to-transparent" />
              </div>
              {/* Floating accent badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={introInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
                className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-4 border border-neutral-100"
              >
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-0.5">Since 1954</div>
                <div className="text-sm font-bold text-secondary">Trusted by healthcare professionals</div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* PRODUCTS:searchable catalog grid */}
      <section className="bg-[#f7f6f1]">
        <Suspense>
          <ProductsClient />
        </Suspense>
      </section>

      {/* CTA DARK BAND */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h3 className="text-white text-3xl md:text-4xl font-bold mb-4">
              Looking for a specific therapeutic area?
            </h3>
            <p className="text-white/55 text-sm leading-relaxed mb-8">
              Browse our full portfolio organised by therapeutic area, dosage form and
              active ingredient.
            </p>
            <div className="flex justify-center">
              <CTALink href="/products-therapeutic-areas" variant="dark">
                Browse therapeutic areas
              </CTALink>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
