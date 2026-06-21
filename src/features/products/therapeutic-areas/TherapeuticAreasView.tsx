"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Stethoscope,
  Bug,
  HeartPulse,
  Wind,
  Target,
  Pill,
  Brain,
  Hand,
  Eye,
  Flower2,
  Leaf,
  Syringe,
  ArrowRight,
} from "lucide-react";
import InnerBanner from "@/components/InnerBanner";
import CTALink from "@/components/CTALink";
import EditorialImage from "@/components/editorial/EditorialImage";
import { cn } from "@/utils";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const PRIMARY = "#e07e27";

function useReveal(margin: `${number}${"px" | "%"}` = "-80px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView] as const;
}

type TA = {
  name: string;
  filterSlug: string;
  count: number;
  desc: string;
  Icon: React.ElementType;
  color: string;
  img: string;
};

const TAS: TA[] = [
  {
    name: "Primary Care",
    filterSlug: "Primary Care",
    count: 53,
    Icon: Stethoscope,
    color: PRIMARY,
    img: "/images/materials/Therapeutic%20Areas/Primary%20Care.jpg",
    desc: "Analgesics, antipyretics, antihistamines, and essential medicines for everyday health needs.",
  },
  {
    name: "Antimicrobial",
    filterSlug: "Antimicrobial",
    count: 31,
    Icon: Bug,
    color: PRIMARY,
    img: "/images/materials/Therapeutic%20Areas/Antimicrobials.jpg",
    desc: "Broad-spectrum antibiotics, antifungals, and antivirals, including beta-lactams, cephalosporins, carbapenems, and fluoroquinolones.",
  },
  {
    name: "Cardiometabolic",
    filterSlug: "Cardiometabolic",
    count: 13,
    Icon: HeartPulse,
    color: PRIMARY,
    img: "/images/materials/Therapeutic%20Areas/Cardiometabolic.jpg",
    desc: "Medicines for cardiovascular disease, hypertension, heart failure, diabetes, and lipid management.",
  },
  {
    name: "Gastrointestinal (GIT)",
    filterSlug: "GIT",
    count: 28,
    Icon: Pill,
    color: PRIMARY,
    img: "/images/materials/Therapeutic%20Areas/Gastrointestinal.jpg",
    desc: "Antispasmodics, antacids, proton pump inhibitors, liver support, and digestive motility agents.",
  },
  {
    name: "Respiratory",
    filterSlug: "Respiratory",
    count: 13,
    Icon: Wind,
    color: PRIMARY,
    img: "/images/materials/Therapeutic%20Areas/Respiratory.jpg",
    desc: "Bronchodilators, inhalers, corticosteroids, antihistamines, and nasal preparations for respiratory conditions.",
  },
  {
    name: "Oncology",
    filterSlug: "Oncology",
    count: 6,
    Icon: Target,
    color: PRIMARY,
    img: "/images/materials/Therapeutic%20Areas/Oncology.jpg",
    desc: "Targeted therapies and chemotherapy agents across haematology and solid tumour indications.",
  },
  {
    name: "CNS",
    filterSlug: "CNS",
    count: 7,
    Icon: Brain,
    color: PRIMARY,
    img: "/images/materials/Therapeutic%20Areas/CNS.jpg",
    desc: "Antidepressants, antipsychotics, cognitive support agents, and treatments for neurological conditions.",
  },
  {
    name: "Dermatology",
    filterSlug: "Dermatology",
    count: 10,
    Icon: Hand,
    color: PRIMARY,
    img: "/images/materials/Therapeutic%20Areas/Dermatology.jpg",
    desc: "Topical corticosteroids, antifungals, wound care, and skin condition treatments.",
  },
  {
    name: "Ophthalmology",
    filterSlug: "Ophthalmology",
    count: 11,
    Icon: Eye,
    color: PRIMARY,
    img: "/images/materials/Therapeutic%20Areas/Ophthalmology.jpg",
    desc: "Eye drops and ophthalmic solutions for infections, glaucoma, dry eye, and post-surgical care.",
  },
  {
    name: "Women's Health (WHC)",
    filterSlug: "Women's Health",
    count: 14,
    Icon: Flower2,
    color: PRIMARY,
    img: "/images/materials/Therapeutic%20Areas/Women%20Health.jpg",
    desc: "Hormonal therapies, contraceptives, and gynaecological products for all life stages.",
  },
  {
    name: "Vitamins & Supplements",
    filterSlug: "Vitamins & Supplements",
    count: 29,
    Icon: Leaf,
    color: PRIMARY,
    img: "/images/materials/Therapeutic%20Areas/Vitamins%20%26%20Supplements.jpg",
    desc: "Iron, B-vitamins, omega-3, calcium, zinc, maternal health, and premium supplement ranges including Doppelherz Active.",
  },
  {
    name: "Anaesthesia & Narcotics",
    filterSlug: "Anaesthesia",
    count: 2,
    Icon: Syringe,
    color: PRIMARY,
    img: "/images/materials/Therapeutic%20Areas/Anaesthesia%20%26%20Narcotics.jpg",
    desc: "Anaesthetic and pain management agents for clinical and surgical use.",
  },
];

/* Desktop: split-screen explorer — a sticky list on the left drives a large
   cinematic preview on the right. Hover/focus a row to update the preview;
   click anywhere to jump to the filtered product list. */
function AreasExplorer() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const t = TAS[active];

  // Auto-advance through the areas, pausing while the user hovers.
  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % TAS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      className="hidden lg:grid lg:grid-cols-[1.18fr_minmax(300px,0.82fr)] gap-8 lg:items-start"
    >
      {/* RIGHT COLUMN — interactive list */}
      <div className="rounded-3xl border border-neutral-200/80 bg-white/50 p-2 backdrop-blur-sm lg:order-2">
        {TAS.map((ta, i) => {
          const on = i === active;
          const Icon = ta.Icon;
          return (
            <Link
              key={ta.filterSlug}
              href={`/products-overview?ta=${encodeURIComponent(ta.filterSlug)}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={cn(
                "group relative flex items-center gap-4 rounded-2xl px-4 py-3 outline-none transition-all duration-300",
                on
                  ? "bg-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)]"
                  : "hover:bg-white/70"
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                  on ? "bg-primary text-white" : "bg-primary/10 text-primary"
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    "block truncate text-[15px] font-bold transition-colors duration-300",
                    on ? "text-secondary" : "text-neutral-600"
                  )}
                >
                  {ta.name}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                  {ta.count} products
                </span>
              </span>
              <ArrowRight
                className={cn(
                  "h-4 w-4 shrink-0 transition-all duration-300",
                  on
                    ? "translate-x-0 text-primary opacity-100"
                    : "-translate-x-1 text-neutral-300 opacity-0 group-hover:opacity-100"
                )}
              />
            </Link>
          );
        })}
      </div>

      {/* LEFT COLUMN — large cinematic preview (sticky, aligned with the list) */}
      <div className="relative h-[560px] overflow-hidden rounded-3xl bg-neutral-900 lg:order-1 lg:sticky lg:top-[calc(var(--header-height)_+_1.5rem)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={t.filterSlug}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="absolute inset-0"
          >
            <EditorialImage
              src={t.img}
              alt={t.name}
              w={900}
              h={820}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15" />
          </motion.div>
        </AnimatePresence>

        {/* Top row — icon + count (instant) */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <t.Icon className="h-6 w-6 text-white" strokeWidth={1.7} />
          </span>
          <span className="rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-primary backdrop-blur">
            {t.count} products
          </span>
        </div>

        {/* Bottom content — animates on change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={t.filterSlug + "-copy"}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="absolute inset-x-0 bottom-0 p-7 lg:p-9"
          >
            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              Therapeutic Area
            </span>
            <h3 className="text-3xl lg:text-4xl font-bold leading-tight text-white">
              {t.name}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/80">
              {t.desc}
            </p>
            <Link
              href={`/products-overview?ta=${encodeURIComponent(t.filterSlug)}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:gap-3 hover:bg-primary/90"
            >
              View products <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* Mobile / tablet fallback — a full-bleed card with content always shown. */
function MobileAreaCard({ t }: { t: TA }) {
  return (
    <Link
      href={`/products-overview?ta=${encodeURIComponent(t.filterSlug)}`}
      className="group relative flex h-56 flex-col justify-end overflow-hidden rounded-2xl bg-neutral-900"
    >
      <EditorialImage
        src={t.img}
        alt={t.name}
        w={560}
        h={420}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
      <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary shadow-lg">
          <t.Icon className="h-5 w-5 text-white" strokeWidth={1.7} />
        </div>
        <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-primary backdrop-blur">
          {t.count} products
        </span>
      </div>
      <div className="relative z-10 p-5 text-white">
        <h3 className="text-lg font-bold leading-snug">{t.name}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-white/75 line-clamp-2">
          {t.desc}
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
          View products <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  );
}

export default function TherapeuticAreasView() {
  const [introRef, introInView] = useReveal();
  const [gridHeaderRef, gridHeaderInView] = useReveal();
  const [ctaRef, ctaInView] = useReveal();

  return (
    <>
      <InnerBanner
        bg="/images/inners/therapeutic-areas-banner2.jpg"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Therapies & Products" },
          { label: "Therapeutic Areas" },
        ]}
        title={
          <>
            Therapeutic <span className="accent">Areas</span>
          </>
        }
        lede="Pharco focuses on the therapeutic areas that matter most to patients, backed by specialized R&D and manufacturing expertise."
      />

      {/* INTRODUCTION */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <div
            ref={introRef}
            className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-secondary leading-[1.1] mb-4">
                Addressing Key{" "}
                <span className="text-primary">Therapeutic Areas</span>
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={introInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                style={{ originX: 0 }}
                className="h-1 w-14 bg-primary rounded-full mb-6"
              />
              <p className="text-neutral-600 leading-relaxed mb-4">
                Pharco&apos;s pharmaceutical products cover 12 therapeutic
                areas, chosen because they reflect the disease burden of the
                markets we serve, not the categories that are easiest to
                manufacture.
              </p>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Each area has dedicated R&amp;D and manufacturing capability
                behind it, ensuring consistent quality across our entire
                portfolio.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              className="relative rounded-2xl overflow-hidden aspect-[4/3]"
            >
              <Image
                src="/images/inners/from molecule to patient 600x450.jpg"
                alt="From molecule to patient"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                className="absolute bottom-0 left-0 w-24 h-24 rounded-tr-[80px] opacity-20"
                style={{ backgroundColor: PRIMARY }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* TA CAROUSEL */}
      <section
        className="py-20 relative"
        style={{
          background:
            "radial-gradient(ellipse at 15% 50%, rgba(224,126,39,0.06) 0%, transparent 55%), radial-gradient(ellipse at 85% 10%, rgba(224,126,39,0.05) 0%, transparent 50%), #f4f3ee",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 relative">
          {/* Header + nav buttons */}
          <motion.div
            ref={gridHeaderRef}
            initial={{ opacity: 0, y: 24 }}
            animate={gridHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-secondary leading-[1.05]">
              Therapeutic <span className="text-primary">Areas</span>
            </h2>
          </motion.div>

          {/* Desktop: split-screen explorer */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={gridHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            <AreasExplorer />
          </motion.div>

          {/* Mobile / tablet: stacked cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:hidden">
            {TAS.map((t) => (
              <MobileAreaCard key={t.filterSlug} t={t} />
            ))}
          </div>
        </div>
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
              Need a specific product?
            </h3>
            <p className="text-white/55 text-sm leading-relaxed mb-8">
              Search the complete portfolio by brand, active ingredient or
              therapeutic indication.
            </p>
            <div className="flex justify-center">
              <CTALink href="/products-overview" variant="dark">
                Search all products
              </CTALink>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
