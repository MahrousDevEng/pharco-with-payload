"use client";
import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  FlaskConical,
  Microscope,
  TestTubes,
  Workflow,
  FileText,
  ShieldCheck,
  Atom,
  Stethoscope,
  HeartPulse,
  Wind,
  Baby,
  Brain,
  Activity,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import CTALink from "@/components/CTALink";
import EditorialImage from "@/components/editorial/EditorialImage";
import { IMG } from "@/lib/editorialImages";

function useReveal(margin: `${number}${"px" | "%"}` = "-80px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView] as const;
}

const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const CAPABILITIES = [
  {
    n: "01",
    icon: FlaskConical,
    h: "Formulation Development",
    img: IMG.lab,
    p: "Solid, liquid, semi-solid and sterile dosage forms, including complex generics, novel delivery systems, and fixed-dose combinations.",
  },
  {
    n: "02",
    icon: Microscope,
    h: "Analytical Development",
    img: "/images/materials/Research%20%26%20Development/R%26D%20Capabilities/Analytical%20Development.jpg",
    p: "Method development and validation using HPLC, GC and dissolution testing to ICH standards in our ISO 17025-accredited laboratory.",
  },
  {
    n: "03",
    icon: TestTubes,
    h: "Bioequivalence Studies",
    img: "/images/materials/Research%20%26%20Development/R%26D%20Capabilities/Bioequivalence%20Studies.jpg",
    p: "In-house and partnered bioequivalence studies supporting submissions across multiple regulatory markets, Egypt, GCC, Africa, Europe and Latin America.",
  },
  {
    n: "04",
    icon: Workflow,
    h: "Process Development",
    img: "/images/materials/Research%20%26%20Development/R%26D%20Capabilities/Process%20Development.jpg",
    p: "Scale-up and technology transfer from R&D bench to commercial manufacturing, designed once, transferred reliably across our group manufacturing companies.",
  },
  {
    n: "05",
    icon: FileText,
    h: "CTD Dossier Preparation",
    img: "/images/materials/Research%20%26%20Development/R%26D%20Capabilities/CTD%20Dossier%20Preparation.jpg",
    p: "Full CTD dossier preparation for regulatory submissions across more than 60 markets, managed by Pharco's regulatory affairs and scientific teams.",
  },
  {
    n: "06",
    icon: ShieldCheck,
    h: "Quality by Design (QbD)",
    img: "/images/materials/Research%20%26%20Development/R%26D%20Capabilities/Quality%20by%20Design%20%28QbD%29.jpg",
    p: "Risk-based development from the earliest stages, quality built into the product, not tested into it. Aligned with ICH Q8/Q9/Q10 frameworks.",
  },
  {
    n: "07",
    icon: Atom,
    h: "API Manufacturing: PBIC",
    img: IMG.chemistry,
    p: "In-house active pharmaceutical ingredient production through Pharco B International for Chemicals, vertical integration from raw chemistry to finished API.",
  },
];

const PARTNERS = [
  {
    n: "University of Michigan",
    l: "USA · Academic Research",
    href: "https://umich.edu",
    logo: "/images/University-of-Michigan-Logo.jpg",
  },
  {
    n: "DNDi",
    l: "Drugs for Neglected Diseases initiative",
    href: "https://dndi.org",
    logo: "/images/DNDi_Logo_No-Tagline_Full-Colour.svg",
  },
  {
    n: "Chemelctiva",
    l: "Specialty Chemistry",
    href: "https://www.chemelctiva.com",
    logo: "/images/Chemelctiva.png",
  },
  {
    n: "Presidio Pharmaceuticals",
    l: "Antiviral R&D",
    href: "https://www.presidiopharmaceuticals.com",
    logo: "/images/Presidio%20Pharmaceuticals.png",
  },
  {
    n: "SeegPharm",
    l: "Pharma Partner",
    href: "https://www.seegpharm.com",
    logo: "http://www.seegpharm.com/img/logo-free.png",
  },
];

const PIPELINE = [
  {
    h: "Antimicrobials",
    tag: "Anti-infective",
    p: "Novel generics and first-to-file opportunities.",
    icon: Stethoscope,
    img: "/images/materials/Research%20%26%20Development/Antimicrobials.jpg",
  },
  {
    h: "Oncology",
    tag: "Specialty",
    p: "Complex cytotoxic formulations and targeted therapies.",
    icon: Activity,
    img: "/images/materials/Research%20%26%20Development/Oncology.jpg",
  },
  {
    h: "Cardiometabolic",
    tag: "Chronic care",
    p: "Fixed-dose combinations and newer molecular entities.",
    icon: HeartPulse,
    img: "/images/materials/Research%20%26%20Development/Cardiometabolic.jpg",
  },
  {
    h: "Respiratory",
    tag: "Inhalation",
    p: "Inhalation products and nasal delivery systems.",
    icon: Wind,
    img: "/images/materials/Research%20%26%20Development/Respiratory.jpg",
  },
  {
    h: "Women's Health",
    tag: "Specialty care",
    p: "Hormonal formulations and reproductive health.",
    icon: Baby,
    img: "/images/materials/Research%20%26%20Development/Women%20Health.jpg",
  },
  {
    h: "CNS",
    tag: "Neuroscience",
    p: "Neurological and psychiatric generics.",
    icon: Brain,
    img: "/images/materials/Research%20%26%20Development/CNS.jpg",
  },
];

// Tints derived only from primary (#e07e27) + secondary (#55565a)
const PIPELINE_TINTS = [
  "#fbeede", // soft primary
  "#edeeef", // soft secondary
  "#fbeede", // soft primary
  "#edeeef", // soft secondary
  "#fbeede", // soft primary
  "#edeeef", // soft secondary
];

/* ─── Video hero ─────────────────────────────────────────────────── */
function RDHero() {
  return (
    <section className="relative h-[88vh] min-h-[580px] flex items-end overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/images/v.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 pb-16 lg:pb-24">
        <div className="flex items-center gap-2 text-white/45 text-[11px] uppercase tracking-[0.2em] mb-8 font-medium">
          <Link href="/" className="hover:text-white transition-colors duration-200">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span>Science &amp; Operations</span>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-white/75">Research &amp; Development</span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.04] mb-6 max-w-3xl"
        >
          Driving Innovation Through{" "}
          <span className="text-primary">Research and Development</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: EASE_OUT }}
          className="text-white/65 text-base lg:text-lg leading-relaxed max-w-2xl"
        >
          Pharco&apos;s R&amp;D function is the engine behind our pipeline, our
          quality credentials, and our ability to bring new and better medicines
          to patients faster. Innovation at Pharco is not aspirational. It is
          operational.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── Capability image card ──────────────────────────────────────── */
function CapabilityCard({ c }: { c: (typeof CAPABILITIES)[0] }) {
  const Icon = c.icon;
  return (
    <div className="group relative shrink-0 snap-start w-[230px] sm:w-[250px] h-[380px] rounded-2xl overflow-hidden bg-neutral-900">
      <EditorialImage
        src={c.img}
        alt={c.h}
        w={520}
        h={760}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
      <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary shadow-lg">
        <Icon className="h-5 w-5 text-white" strokeWidth={1.6} />
      </div>
      <h4 className="absolute inset-x-4 bottom-6 text-center text-lg font-bold leading-snug text-white">
        {c.h}
      </h4>
    </div>
  );
}

const CARD_STEP = 270; // card width (250) + gap (20)

function CapabilitiesStories() {
  const [ref, inView] = useReveal();
  const scrollRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  const scrollByCards = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    // loop around at the ends
    if (dir > 0 && el.scrollLeft >= max - 4) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else if (dir < 0 && el.scrollLeft <= 4) {
      el.scrollTo({ left: max, behavior: "smooth" });
    } else {
      el.scrollBy({ left: dir * CARD_STEP, behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) scrollByCards(1);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-[#f7f6f1] py-16 lg:py-20 overflow-hidden">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-24">
        {/* Left: title (top) + arrows (bottom), aligned to the page container */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex shrink-0 flex-col justify-between px-4 lg:w-[calc(360px+max(1rem,calc((100vw-1280px)/2+1rem)))] lg:pr-0 lg:pl-[max(1rem,calc((100vw-1280px)/2+1rem))]"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary leading-[1.1]">
              R&amp;D <span className="text-primary">Capabilities</span>
            </h2>
            <div className="mt-6 h-1 w-14 rounded-full bg-primary" />
            <p className="mt-6 text-neutral-600 leading-relaxed">
              From formulation and analytical development to bioequivalence,
              process scale-up and in-house API manufacturing, Pharco&apos;s R&amp;D
              runs as one connected platform, designed once and transferred
              reliably across the group.
            </p>
          </div>
          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              aria-label="Previous capability"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-secondary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              aria-label="Next capability"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-secondary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Right: full-bleed horizontal story cards */}
        <div
          ref={scrollRef}
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
          className="flex min-w-0 flex-1 gap-5 overflow-x-auto px-4 pb-2 lg:pl-0 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {CAPABILITIES.map((c) => (
            <CapabilityCard key={c.h} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Partner logo card ──────────────────────────────────────────── */
function PartnerLogo({ p, index }: { p: (typeof PARTNERS)[0]; index: number }) {
  const [ref, inView] = useReveal("-30px");
  const [imgError, setImgError] = React.useState(false);
  return (
    <motion.a
      ref={ref}
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group flex items-center justify-center px-6 py-8 cursor-pointer"
    >
      {p.logo && !imgError ? (
        <img
          src={p.logo}
          alt={p.n}
          onError={() => setImgError(true)}
          className="h-12 max-w-[160px] object-contain transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="font-black text-secondary text-base leading-snug tracking-tight group-hover:text-primary transition-colors duration-300">
          {p.n}
        </div>
      )}
    </motion.a>
  );
}

/* ─── Pipeline card (editorial story card) ───────────────────────── */
function PipelineCard({
  p,
  index,
}: {
  p: (typeof PIPELINE)[0];
  index: number;
}) {
  const Icon = p.icon;
  const tint = PIPELINE_TINTS[index % PIPELINE_TINTS.length];
  return (
    <div
      style={{ backgroundColor: tint }}
      className="group flex w-[280px] shrink-0 snap-start flex-col rounded-[28px] p-5 sm:w-[310px]"
    >
      {/* tag pill + icon button */}
      <div className="mb-7 flex items-start justify-between">
        <span className="inline-flex items-center rounded-full bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary">
          {p.tag}
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-white transition-transform duration-300 group-hover:rotate-12">
          <Icon className="h-4 w-4" strokeWidth={1.8} />
        </span>
      </div>

      {/* title + copy */}
      <h3 className="text-2xl font-bold leading-tight text-secondary">{p.h}</h3>
      <p className="mb-6 mt-3 text-[13.5px] leading-relaxed text-neutral-600">
        {p.p}
      </p>

      {/* photo */}
      <div className="relative mt-auto aspect-[4/3] overflow-hidden rounded-[20px]">
        <EditorialImage
          src={p.img}
          alt={p.h}
          w={520}
          h={400}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-105"
        />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-secondary backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          In pipeline
        </span>
      </div>
    </div>
  );
}

/* ─── Pipeline stories carousel ──────────────────────────────────── */
function PipelineStories() {
  const [ref, inView] = useReveal();
  const scrollRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  const scrollByCards = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (dir > 0 && el.scrollLeft >= max - 4) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else if (dir < 0 && el.scrollLeft <= 4) {
      el.scrollTo({ left: max, behavior: "smooth" });
    } else {
      el.scrollBy({ left: dir * 330, behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) scrollByCards(1);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-white py-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h2 className="text-5xl font-bold leading-[1.1] text-secondary md:text-6xl">
              Pipeline Focus <span className="text-primary">Areas</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              aria-label="Previous focus area"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-secondary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              aria-label="Next focus area"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-secondary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>

      <div
        ref={scrollRef}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        className="flex gap-5 overflow-x-auto pl-4 pb-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:pl-[max(1rem,calc((100vw-1280px)/2+1rem))]"
      >
        {PIPELINE.map((p, i) => (
          <PipelineCard key={p.h} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function RDView() {
  const [introRef, introInView] = useReveal("-60px");
  const [partnersHeaderRef, partnersHeaderInView] = useReveal();
  const [hcvRef, hcvInView] = useReveal("-60px");
  const [ctaRef, ctaInView] = useReveal();

  const hcvWrapRef = useRef(null);
  const { scrollYProgress: hcvScroll } = useScroll({
    target: hcvWrapRef,
    offset: ["start end", "end start"],
  });
  const hcvBgY = useTransform(hcvScroll, [0, 1], ["-10%", "10%"]);

  return (
    <>
      {/* HERO — video background */}
      <RDHero />

      {/* R&D AT PHARCO */}
      <section className="py-20 bg-white overflow-hidden relative">
        <div className="max-w-[1280px] mx-auto px-4 relative">
          <div
            ref={introRef}
            className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center"
          >
            {/* LEFT: image */}
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.97 }}
              animate={introInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 0.85, ease: EASE_OUT }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-[28px] overflow-hidden aspect-[4/3] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]">
                <EditorialImage
                  src={IMG.scientist}
                  alt="From molecule to patient"
                  w={900}
                  h={675}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur text-secondary text-[10px] font-bold uppercase tracking-[0.16em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  From molecule to patient
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={introInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5, ease: EASE_OUT }}
                className="hidden md:flex absolute -bottom-6 -right-6 lg:right-auto lg:-left-6 bg-secondary text-white rounded-2xl px-6 py-5 shadow-xl items-center gap-4"
              >
                <FlaskConical
                  className="w-7 h-7 text-primary shrink-0"
                  strokeWidth={1.6}
                />
                <div>
                  <div className="text-2xl font-black leading-none mb-1">7</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/70 leading-snug">
                    Integrated
                    <br />
                    R&amp;D disciplines
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT: copy */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15, ease: EASE_OUT }}
              className="lg:col-span-6"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.05] mb-6">
                R&amp;D at <span className="text-primary">Pharco</span>
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={introInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                style={{ originX: 0 }}
                className="h-1 w-16 bg-primary rounded-full mb-8"
              />
              <p className="text-neutral-600 leading-relaxed">
                Pharco&apos;s R&amp;D platform spans formulation development,
                analytical method development, bioequivalence studies, process
                scale-up, CTD dossier preparation and Quality-by-Design, all
                supported by in-house API manufacturing through PBIC. The
                platform serves three audiences simultaneously: Pharco&apos;s
                own pipeline, our CMO partners, and the regulatory authorities
                who approve every product before it reaches a patient.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES — horizontal stories carousel */}
      <CapabilitiesStories />

      {/* INTERNATIONAL COLLABORATIONS */}
      <section className="py-20 bg-neutral-50 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <div
            ref={partnersHeaderRef}
            className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start mb-14"
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={partnersHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.1]">
                International R&amp;D{" "}
                <span className="text-primary">collaborations</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={partnersHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1 }}
            >
              <p className="text-neutral-600 leading-relaxed">
                Pharco actively collaborates with research institutions and
                pharmaceutical companies that share our patient-access agenda.
                Current research partnerships include the University of Michigan
                (USA), DNDi, the Drugs for Neglected Diseases initiative,
                Chemelctiva, Presidio Pharmaceuticals, and SeegPharm. Each
                partnership is anchored to a specific scientific objective, not
                a logo on a slide.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PARTNERS.map((p, i) => (
              <PartnerLogo key={p.n} p={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* HEPATITIS C MODEL */}
      <section
        ref={hcvWrapRef}
        className="relative py-20 bg-[#111] overflow-hidden"
      >
        <motion.div
          style={{ y: hcvBgY }}
          className="absolute inset-0 opacity-20 pointer-events-none"
        >
          <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-primary/40 to-transparent blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-3xl" />
        </motion.div>
        <div ref={hcvRef} className="max-w-[1280px] mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-[1fr,1.4fr] gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={hcvInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, ease: EASE_OUT }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-video shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] border border-white/10">
                <iframe
                  src="https://www.youtube.com/embed/HJi5UmCg4mU?start=343&rel=0&modestbranding=1"
                  title="Pharco Hepatitis C Programme"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full absolute inset-0"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={hcvInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-6">
                Hepatitis C:{" "}
                <span className="text-primary">A Model of R&amp;D Impact</span>
              </h2>
              <p className="text-white/65 leading-relaxed text-base mb-6">
                Pharco&apos;s commitment to R&amp;D is best illustrated by the
                group&apos;s role in Egypt&apos;s Hepatitis C elimination
                programme. Through scientific partnership, manufacturing
                investment and regulatory navigation, Pharco brought
                direct-acting antiviral treatments to Egyptian patients at a
                fraction of the global market price, resulting in more than 4
                million people cured.
              </p>
              <p className="text-white/55 leading-relaxed text-sm">
                It remains one of the most significant public health
                achievements in the region&apos;s history, and a working
                template for how Pharco approaches every R&amp;D priority.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PIPELINE — editorial story carousel */}
      <PipelineStories />

      {/* CTA */}
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
              R&amp;D &amp; <span className="text-primary">Licensing Enquiries</span>
            </h3>
            <p className="text-white/55 text-sm leading-relaxed mb-8">
              To discuss a research collaboration or licensing opportunity,
              contact our Business Development team at{" "}
              <span className="text-primary">Portfolio@pharco-corp.com</span>.
            </p>
            <div className="flex justify-center">
              <CTALink href="/contact" variant="dark">
                Contact Business Development
              </CTALink>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
