"use client";
import { useRef } from "react";
import {
  motion,
  useInView,
} from "framer-motion";
import {
  ShieldCheck,
  Award,
  Leaf,
  HeartPulse,
  FlaskConical,
  Globe,
  Scale,
} from "lucide-react";
import InnerBanner from "@/components/InnerBanner";
import CTALink from "@/components/CTALink";
import EditorialImage from "@/components/editorial/EditorialImage";
import { FeatureSplit } from "@/components/editorial/Editorial";
import { IMG } from "@/lib/editorialImages";

function useReveal(margin: `${number}${"px" | "%"}` = "-80px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView] as const;
}

const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const CERTIFICATIONS = [
  {
    label: "ISO 9001:2015",
    sub: "Quality Management",
    p: "Quality Management System certification covering documentation, change control and continuous improvement across all manufacturing operations.",
    icon: Award,
    img: IMG.lab,
  },
  {
    label: "ISO 14001:2015",
    sub: "Environmental Management",
    p: "Environmental Management System certification covering energy, waste, water and emissions managed against measurable targets.",
    icon: Leaf,
    img: IMG.plant,
  },
  {
    label: "ISO 45001:2018",
    sub: "Occupational Health & Safety",
    p: "Occupational Health & Safety Management, protecting employees and contractors across our manufacturing platform.",
    icon: HeartPulse,
    img: IMG.care,
  },
  {
    label: "ISO 17025",
    sub: "Accredited Laboratory",
    p: "Accredited analytical laboratory with competence in testing and calibration recognised internationally for regulatory submissions.",
    icon: FlaskConical,
    img: IMG.microscope,
  },
  {
    label: "WHO-GMP",
    sub: "World Health Organization",
    p: "World Health Organization Good Manufacturing Practice, covering Pharco's manufacturing facilities for finished pharmaceutical products.",
    icon: Globe,
    img: IMG.globe,
  },
  {
    label: "EU-GMP",
    sub: "European Union",
    p: "European Union Good Manufacturing Practice supporting Pharco's exports into European and EU-aligned regulatory markets.",
    icon: ShieldCheck,
    img: IMG.research,
  },
  {
    label: "PIC/S",
    sub: "Inspection Co-operation Scheme",
    p: "Pharmaceutical Inspection Co-operation Scheme alignment, providing broad mutual recognition with international GMP authorities.",
    icon: Scale,
    img: IMG.labGlass,
  },
];

const REGULATORS = [
  { name: "WHO", desc: "World Health Organization", logo: "/images/Certifcate/WHO_logo.png" },
  { name: "EDA", desc: "Egyptian Drug Authority", logo: "" },
  { name: "SFDA", desc: "Saudi Food & Drug Authority", logo: "/images/Certifcate/SFDA.png" },
  { name: "ANVISA", desc: "ANVISA (Brazil)", logo: "/images/Certifcate/ANVISA.png" },
  { name: "UAE MOHAP", desc: "UAE Ministry of Health & Prevention", logo: "" },
  { name: "TFDA", desc: "Tanzania FDA", logo: "/images/Certifcate/tfda.png" },
  { name: "EFDA", desc: "Ethiopian FDA", logo: "" },
  { name: "ANMDMR", desc: "Romania ANMDMR", logo: "" },
  { name: "DPML", desc: "Côte d'Ivoire DPML", logo: "" },
  { name: "GHC", desc: "Gulf Health Council", logo: "/images/Certifcate/GHC.png" },
];

function CertCard({ c, index }: { c: typeof CERTIFICATIONS[0]; index: number }) {
  const [ref, inView] = useReveal("-30px");
  const Icon = c.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: EASE_OUT }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-all duration-400 hover:border-primary/60 hover:shadow-xl"
    >
      <div className="relative h-36 overflow-hidden">
        <EditorialImage
          src={c.img}
          alt={c.label}
          w={520}
          h={300}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary">
          <Icon className="h-5 w-5 text-white" strokeWidth={1.6} />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-base font-bold leading-snug text-white">{c.label}</div>
          <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">{c.sub}</div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-relaxed text-neutral-600">{c.p}</p>
      </div>
    </motion.div>
  );
}

function RegulatorTile({ r, index }: { r: typeof REGULATORS[0]; index: number }) {
  const [ref, inView] = useReveal("-30px");
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      whileHover={{ y: -4 }}
      className="bg-white border border-neutral-200 hover:border-primary/60 rounded-2xl px-4 py-5 text-center hover:shadow-md transition-all duration-300 flex flex-col items-center gap-2"
    >
      <div className="h-12 flex items-center justify-center">
        {r.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={r.logo} alt={r.name} className="max-h-12 max-w-full object-contain" />
        ) : (
          <div className="px-3 py-1.5 rounded-md bg-primary/10 text-primary font-bold text-xs tracking-wider">{r.name}</div>
        )}
      </div>
      <p className="text-[11px] font-medium text-neutral-700 leading-tight">{r.desc}</p>
    </motion.div>
  );
}

export default function QualityView() {
  const [certHeaderRef, certHeaderInView] = useReveal();
  const [regRef, regInView] = useReveal("-60px");
  const [ctaRef, ctaInView] = useReveal();

  return (
    <>
      <InnerBanner
        bg="/images/inners/Quality-&-Compliance-banner.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Science & Operations" }, { label: "Quality & Compliance" }]}
        title={<>Quality &amp; <span className="accent">Compliance</span></>}
        lede="Where the medicines a 13-company group makes are tested before they leave any of them."
      />

      {/* QUALITY AT PHARCO */}
      <div>
        <FeatureSplit
          image={IMG.lab}
          imageAlt="Pharco analytical quality control laboratory"
          title={<>The operating <span className="text-primary">constraint</span></>}
          badge={{ value: "ISO", label: "17025 Accredited Lab" }}
        >
          <p>
            Quality is not a department at Pharco. It is the operating constraint. Every batch produced across the group is tested, documented and released under integrated GMP-certified systems aligned with WHO-GMP, EU-GMP and PIC/S. The same standard applies whether the product is destined for an Egyptian pharmacy, a hospital in the Gulf, a tender in West Africa, or a CMO partner&apos;s market in Latin America.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {["WHO-GMP", "EU-GMP", "PIC/S"].map((b) => (
              <span key={b} className="rounded-full bg-neutral-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-secondary">{b}</span>
            ))}
          </div>
        </FeatureSplit>
      </div>

      {/* CERTIFICATIONS & ACCREDITATIONS */}
      <section className="py-20 bg-[#f4f2eb] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <motion.div ref={certHeaderRef} initial={{ opacity: 0, y: 32 }} animate={certHeaderInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-14 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.1]">A layered <span className="text-primary">quality framework</span></h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {CERTIFICATIONS.map((c, i) => <CertCard key={c.label} c={c} index={i} />)}
          </div>
        </div>
      </section>

      {/* REGULATORY AUTHORITY COVERAGE */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <div ref={regRef} className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start mb-14">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={regInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.75 }}>
              <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.1]">Inspection is the <span className="text-primary">norm</span></h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={regInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.75, delay: 0.12 }}>
              <p className="text-neutral-600 leading-relaxed">
                Pharco&apos;s facilities and products are inspected, approved and registered by regulatory authorities across the regions we operate in, including WHO, the Egyptian Drug Authority, SFDA (Saudi Arabia), ANVISA (Brazil), the UAE Ministry of Health &amp; Prevention, Tanzania FDA, Ethiopian FDA, Romania&apos;s ANMDMR, Côte d&apos;Ivoire DPML, and the Gulf Health Council. International regulatory inspection is part of normal operations, not an exception.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {REGULATORS.map((r, i) => <RegulatorTile key={r.name} r={r} index={i} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-[#111] overflow-hidden">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-primary/40 to-transparent blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-3xl" />
        </div>
        <div ref={ctaRef} className="max-w-[1280px] mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center max-w-2xl mx-auto">
            <h3 className="text-white text-3xl md:text-4xl font-bold mb-4 leading-tight">Quality is the foundation of everything we do.</h3>
            <p className="text-white/55 text-sm leading-relaxed mb-8">
              Explore our manufacturing capabilities or speak to our regulatory affairs team about partnership opportunities.
            </p>
            <div className="flex justify-center">
              <CTALink href="/science-manufacturing" variant="dark">View Manufacturing Capabilities</CTALink>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
