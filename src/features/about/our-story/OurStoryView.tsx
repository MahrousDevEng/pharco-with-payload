"use client";
import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Eye,
  Target,
  HandHeart,
  ShieldCheck,
  HeartPulse,
  Lightbulb,
  Scale,
  Users,
  Globe,
  Package,
  Layers,
  MapPin,
  Boxes,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import InnerBanner from "@/components/InnerBanner";
import CTALink from "@/components/CTALink";
import { Counter } from "@/components/inner/Counter";
import EditorialImage from "@/components/editorial/EditorialImage";
import { IMG } from "@/lib/editorialImages";
import { coreValues, visionMissionPromise } from "@/data";

const VMV_IMAGES = [
  "/images/materials/Our%20Vision.jpg",
  "/images/materials/Our%20mission.jpg",
  "/images/materials/Our%20Promise.jpg",
];
// One image per core value, ordered to match `coreValues`:
// Quality · Patient-Centric · Innovation · Integrity · Collaboration · Accessibility
const VALUE_IMAGES = [
  "/images/materials/Core%20values/Quality.jpg",
  "/images/materials/Core%20values/Patient-Centric.jpg",
  "/images/materials/Core%20values/innovation.jpg",
  "/images/materials/Core%20values/Integrity.jpg",
  "/images/materials/Core%20values/Collaboration.jpg",
  "/images/materials/Core%20values/Accessibility.jpg",
];

function useReveal(margin: `${number}${"px" | "%"}` = "-80px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView] as const;
}

const VMV_ICONS = [Eye, Target, HandHeart];
const VALUE_ICONS = [ShieldCheck, HeartPulse, Lightbulb, Scale, Users, Globe];

const HERO_STATS = [
  { value: 350, suffix: "+", label: "Products", icon: Package },
  { value: 12, suffix: "", label: "Therapeutic areas", icon: Layers },
  { value: 70, suffix: "+", label: "Countries served", icon: MapPin },
  { value: 1.6, suffix: "M", label: "Packs daily", icon: Boxes },
];

const CERTIFICATIONS = [
  { label: "WHO-GMP", logo: "/images/Certifcate/WHO_logo.png" },
  { label: "EU-GMP", logo: "/images/Certifcate/EU-GMP.png" },
  { label: "PIC/S", logo: "/images/Certifcate/PICS.png" },
  { label: "ISO 9001:2015", logo: "/images/Certifcate/Iso-9001-2015.png" },
  { label: "ISO 14001:2015", logo: "/images/Certifcate/iso-14001-2015.png" },
  { label: "ISO 45001:2018", logo: "/images/Certifcate/iso-45001-2018.png" },
  { label: "ISO 17025", logo: "/images/Certifcate/ISO-17025.png" },
  { label: "SFDA", logo: "/images/Certifcate/SFDA.png" },
  { label: "ANVISA", logo: "/images/Certifcate/ANVISA.png" },
  { label: "GCC", logo: "/images/Certifcate/GCC.png" },
  { label: "NHRA", logo: "/images/Certifcate/Nhra-01.png" },
  {
    label: "TFDA",
    logo: "/images/Certifcate/tanzania-food-drugs-authority-tfda-seeklogo-01.png",
  },
];

/* ─────────────── CARDS ─────────────── */

/* ─────────────── CARDS ─────────────── */

function VMVCard({
  v,
  index,
  inView,
}: {
  v: (typeof visionMissionPromise)[0];
  index: number;
  inView: boolean;
}) {
  const Icon = VMV_ICONS[index];
  const img = VMV_IMAGES[index];
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-xl">
        {/* image header */}
        <div className="relative h-44 overflow-hidden">
          <EditorialImage
            src={img}
            alt={v.title}
            w={620}
            h={360}
            className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
          <div className="absolute bottom-4 left-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/90 backdrop-blur">
            <Icon className="h-6 w-6 text-white" strokeWidth={1.6} />
          </div>
        </div>
        <div className="relative z-10 flex flex-1 flex-col p-6">
          <h3 className="text-xl font-bold leading-tight text-secondary md:text-[22px]">
            {v.title}
          </h3>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.5 }}
            style={{ originX: 0 }}
            className="my-3.5 h-px w-10 bg-primary"
          />
          <p className="text-[14.5px] leading-relaxed text-neutral-600">
            {v.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ValueCard({ v, index }: { v: (typeof coreValues)[0]; index: number }) {
  const [ref, inView] = useReveal("-30px");
  const Icon = VALUE_ICONS[index];
  const img = VALUE_IMAGES[index % VALUE_IMAGES.length];
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative h-full"
    >
      <div className="relative flex h-full min-h-[380px] flex-col justify-end overflow-hidden rounded-2xl bg-neutral-900">
        <EditorialImage
          src={img}
          alt={v.title}
          w={620}
          h={760}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/15 transition-colors duration-500" />
        <div className="relative z-10 p-7 text-white">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/90 backdrop-blur transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-6 w-6 text-white" strokeWidth={1.7} />
          </div>
          <h3 className="text-lg font-bold leading-tight">{v.title}</h3>
          <div className="grid grid-rows-[1fr] transition-all duration-500 md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/80">
                {v.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ValuesCarousel() {
  const [ref, inView] = useReveal();
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const scrollByCards = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 20 : 340; // gap-5 = 20px
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  // Autoplay: advance one card every few seconds, loop back at the end.
  // Pauses on hover / touch so users can browse without fighting the timer.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByCards(1);
      }
    }, 3500);

    const pause = () => (pausedRef.current = true);
    const resume = () => (pausedRef.current = false);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });

    return () => {
      window.clearInterval(id);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, []);

  return (
    <div className="max-w-[1280px] mx-auto px-4 relative">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-10"
      >
        {/* Title row with arrows beside, description under title */}
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-[42px] md:text-[56px] font-bold text-secondary leading-tight tracking-tight">
              Core <span className="text-primary">Values</span>
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-3 shrink-0 pt-3">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              aria-label="Previous values"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-secondary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              aria-label="Next values"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-secondary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>

      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {coreValues.map((v, i) => (
          <div
            key={v.title}
            data-card
            className="snap-start w-[300px] sm:w-[330px] shrink-0"
          >
            <ValueCard v={v} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── MAIN VIEW ─────────────── */

export default function OurStoryView() {
  const [introRef, introInView] = useReveal("-60px");
  const [founderRef, founderInView] = useReveal("-50px");
  const [vmvRef, vmvInView] = useReveal();
  const [qcRef, qcInView] = useReveal();
  const [ctaRef, ctaInView] = useReveal();

  // page-wide scroll progress bar
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pageScroll } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });
  const pageProgress = useSpring(pageScroll, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });

  // Intro image parallax
  const introImgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: introImgScroll } = useScroll({
    target: introImgRef,
    offset: ["start end", "end start"],
  });
  const introImgY = useTransform(introImgScroll, [0, 1], ["8%", "-8%"]);

  // Founder photo parallax
  const founderImgWrapRef = useRef(null);
  const { scrollYProgress: founderScroll } = useScroll({
    target: founderImgWrapRef,
    offset: ["start end", "end start"],
  });
  const founderImgY = useTransform(founderScroll, [0, 1], ["10%", "-10%"]);

  // Mission section bg parallax
  const missionSecRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: missionScroll } = useScroll({
    target: missionSecRef,
    offset: ["start end", "end start"],
  });
  const missionBgY = useTransform(missionScroll, [0, 1], ["-6%", "6%"]);

  // Quality faint bg parallax
  const qcSecRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: qcScroll } = useScroll({
    target: qcSecRef,
    offset: ["start end", "end start"],
  });
  const qcBgY = useTransform(qcScroll, [0, 1], ["-10%", "10%"]);

  const certStrip = [...CERTIFICATIONS, ...CERTIFICATIONS];

  return (
    <div ref={pageRef}>
      {/* Page-wide scroll progress bar */}
      <motion.div
        aria-hidden
        style={{ scaleX: pageProgress }}
        className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-primary"
      />

      <InnerBanner
        bg="/images/inners/Our%20Story%20banner.png"
        crumbs={[{ label: "Home", href: "/" }, { label: "About Pharco" }]}
        title={
          <>
            Building a Healthier <span className="accent">Tomorrow</span>
          </>
        }
        lede="From a single Alexandria pharmacy in 1957 to one of the region's largest pharmaceutical manufacturers, building access, quality and trust across 70+ countries."
      />

      {/* ============== INTRODUCTION ============== */}
      <section className="pt-10 pb-16 lg:pt-14 lg:pb-20 bg-white overflow-hidden relative">
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-primary/[0.04] blur-3xl pointer-events-none"
        />

        <div className="max-w-[1280px] mx-auto px-4 relative">
          <div
            ref={introRef}
            className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-10 items-center"
          >
            {/* LEFT:editorial copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h2 className="text-[42px] md:text-[56px] lg:text-[60px] font-bold text-secondary leading-[1.05] mb-7 tracking-tight">
                Our <span className="text-primary">Story</span>
              </h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={introInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-neutral-700 leading-relaxed text-[17px] mb-5 font-light"
              >
                Pharco&apos;s story begins with a pharmacist. In 1957, Dr.
                Hassan Helmy founded Glym Pharmacy, laying the foundation for
                what would become one of the region&apos;s leading
                pharmaceutical groups.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={introInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="text-neutral-600 leading-relaxed text-[15.5px]"
              >
                Over the decades that followed, that single pharmacy grew into a
                pharmaceutical group spanning 13 companies and the full
                healthcare value chain, from raw API manufacturing to branded
                drug development, from local dispensing to international export.
                We manufacture 1.6 million packs a day. We have helped cure more
                than 4 million people of Hepatitis C. And we are still growing,
                with a new international manufacturing plant opening in Saudi
                Arabia in 2025. Every product that leaves a Pharco facility
                represents a commitment, to the patient who will take it, to the
                healthcare professional who will prescribe it, and to the
                communities we serve across more than 70 countries.
              </motion.p>
            </motion.div>

            {/* RIGHT:refined image with overlay panel */}
            <motion.div
              ref={introImgRef}
              initial={{ opacity: 0, x: 30 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/4.3] max-w-[480px] ml-auto shadow-2xl">
                <motion.img
                  src="/images/materials/Our-story-inner-image.jpg"
                  alt="From molecule to patient, Pharco's integrated pharmaceutical value chain"
                  style={{ y: introImgY }}
                  className="w-full h-[115%] object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* BOTTOM:clean editorial stat row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 lg:mt-14 border-y border-neutral-200/80 grid grid-cols-2 md:grid-cols-4 md:divide-x divide-neutral-200/80"
          >
            {HERO_STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={introInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
                  className="group px-6 py-7 md:py-8 text-center md:text-left relative"
                >
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                    <Icon
                      className="w-4 h-4 text-primary shrink-0"
                      strokeWidth={1.7}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
                      {s.label}
                    </span>
                  </div>
                  <div className="text-4xl md:text-[44px] font-bold text-secondary leading-none tracking-tight">
                    {introInView && <Counter to={s.value} suffix={s.suffix} />}
                  </div>
                  {/* hover underline */}
                  <motion.div
                    aria-hidden
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0 h-[2px] w-0 bg-primary group-hover:w-12 transition-all duration-500"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============== VISION / MISSION / PROMISE ============== */}
      <section
        ref={missionSecRef}
        className="py-16 bg-[#f7f6f1] overflow-hidden relative"
      >
        <motion.div
          aria-hidden
          style={{ y: missionBgY }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <img
            src="/images/materials/Vision-%C2%B7-Mission-%C2%B7-Promise-Banner1.jpg"
            alt=""
            className="w-full h-full object-cover opacity-[0.1]"
          />
        </motion.div>
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.04] blur-3xl pointer-events-none"
        />

        <div className="max-w-[1280px] mx-auto px-4 relative">
          <motion.div
            ref={vmvRef}
            initial={{ opacity: 0, y: 30 }}
            animate={vmvInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-14 max-w-2xl mx-auto"
          >
            <h2 className="text-[42px] md:text-[56px] font-bold text-secondary leading-tight tracking-tight">
              Vision · Mission · <span className="text-primary">Promise</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {visionMissionPromise.map((v, i) => (
              <VMVCard key={v.num} v={v} index={i} inView={vmvInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ============== FOUNDER STORY ============== */}
      <section className="py-20 lg:py-24 bg-white overflow-hidden relative">
        <div
          aria-hidden
          className="absolute top-1/3 -left-40 w-[420px] h-[420px] rounded-full bg-primary/[0.05] blur-3xl pointer-events-none"
        />

        <div className="max-w-[1280px] mx-auto px-4 relative">
          <div
            ref={founderRef}
            className="grid md:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center"
          >
            {/* TEXT - LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={founderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85 }}
            >
              <h2 className="text-[40px] md:text-[48px] font-bold text-secondary mb-1 leading-tight tracking-tight">
                Dr. Hassan Helmy
              </h2>
              <p className="text-primary font-medium mb-6 text-sm">
                Founder &amp; President · Pharco Corporation
              </p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={founderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-neutral-700 leading-relaxed mb-6 text-[15.5px] font-light"
              >
                Dr. Hassan Helmy began his journey as a pharmacist with a simple
                yet powerful belief: quality healthcare should be accessible to
                everyone. In 1957, he founded Glym Pharmacy in Alexandria,
                driven by a commitment to providing trusted and affordable
                medicines to the community. Through his vision, determination,
                and dedication to patient care, he laid the foundation for what
                would become one of the region&apos;s leading pharmaceutical
                groups. Today, his legacy continues to guide Pharco&apos;s
                mission of expanding access to safe, effective, and affordable
                healthcare for millions of people around the world.
              </motion.p>
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={founderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="relative bg-[#f7f6f1] rounded-xl p-6 border-l-2 border-primary"
              >
                <svg
                  className="absolute top-3 right-4 w-9 h-9 text-primary/15"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                </svg>
                <p className="text-secondary font-medium leading-relaxed italic text-[15px] relative">
                  &ldquo;Our strategies and execution are grounded in the belief
                  that all people across the world deserve to live a healthy and
                  fulfilling life. This conviction drives our desire to provide
                  access to medicines that are safe, effective, and
                  affordable.&rdquo;
                </p>
              </motion.blockquote>
            </motion.div>

            {/* PHOTO - RIGHT */}
            <motion.div
              ref={founderImgWrapRef}
              initial={{ opacity: 0, x: 30 }}
              animate={founderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-[420px] mx-auto shadow-2xl">
                <motion.img
                  src="/images/inners/Our%20story-Dr.png"
                  alt="Dr. Hassan Helmy, Founder"
                  style={{ y: founderImgY }}
                  className="w-full h-[115%] object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent pointer-events-none" />
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={founderInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.7 }}
                  className="absolute left-5 right-5 bottom-5"
                >
                  <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.22em] mb-1">
                    Since 1957
                  </p>
                  <p className="text-white text-base font-semibold leading-snug">
                    A legacy of accessible healthcare
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============== CORE VALUES ============== */}
      <section className="py-16 bg-[#f7f6f1] overflow-hidden relative">
        <div
          aria-hidden
          className="absolute top-20 -right-40 w-[480px] h-[480px] rounded-full bg-primary/[0.04] blur-3xl pointer-events-none"
        />

        <ValuesCarousel />
      </section>

      {/* ============== QUALITY & CERTIFICATIONS ============== */}
      <section
        ref={qcSecRef}
        className="py-20 lg:py-24 bg-white overflow-hidden relative"
      >
        <motion.div
          aria-hidden
          style={{ y: qcBgY }}
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
        >
          <img
            src="/images/inners/Manufacturing-banner.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="max-w-[1280px] mx-auto px-4 relative">
          <div
            ref={qcRef}
            className="grid md:grid-cols-2 gap-8 lg:gap-10 items-start mb-14"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={qcInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-[42px] md:text-[56px] font-bold text-secondary leading-[1.05] tracking-tight">
                Quality &amp;{" "}
                <br />
                <span className="text-primary">Certifications</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={qcInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <p className="text-neutral-700 leading-relaxed text-[15.5px] font-light">
                Pharco&apos;s manufacturing platform meets pharmaceutical
                quality standards verified by internationally recognised
                regulatory bodies. Our facilities operate under WHO-GMP and
                EU-GMP certifications, with PIC/S alignment, and are routinely
                inspected by the Egyptian Drug Authority, SFDA, ANVISA and other
                national authorities. Quality systems are certified to ISO 9001,
                ISO 14001, ISO 45001, with our analytical laboratory accredited
                to ISO 17025, a layered framework supporting regulatory
                compliance across more than 70 markets.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Animated marquee strip:full bleed */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={qcInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="overflow-hidden py-7 border-y border-neutral-200/80">
            <motion.div
              className="flex gap-14 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
            >
              {certStrip.map((c, i) => (
                <div
                  key={`${c.label}-${i}`}
                  className="shrink-0 flex flex-col items-center justify-center group"
                >
                  <div className="h-16 w-32 md:w-36 flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500">
                    <img
                      src={c.logo}
                      alt={c.label}
                      className="max-h-16 max-w-full object-contain"
                    />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500 group-hover:text-primary transition-colors duration-300 mt-2 whitespace-nowrap">
                    {c.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ============== EXPLORE MORE / CTA ============== */}
      <section className="py-16 lg:py-20 bg-[#1a1a1a] relative overflow-hidden">
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-primary/10 blur-3xl pointer-events-none"
        />

        <div className="max-w-[1280px] mx-auto px-4 relative">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <h3 className="text-white text-[32px] md:text-[40px] font-bold mb-3 leading-tight tracking-tight">
              Explore More About <span className="text-primary">Pharco</span>
            </h3>
            <p className="text-white/55 text-[14.5px] leading-relaxed">
              Pharco is a 13-company group covering R&amp;D, manufacturing,
              distribution and global export. Explore the rest of the
              corporation through the pages below.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.3 },
              },
            }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { href: "/history", label: "Our History" },
              { href: "/about-leadership", label: "Leadership" },
              { href: "/about-pharco-group", label: "The Pharco Group" },
              { href: "/products-overview", label: "Products" },
              { href: "/global-presence", label: "Global Presence" },
            ].map((b) => (
              <motion.div
                key={b.href}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <CTALink href={b.href} variant="dark">
                  {b.label}
                </CTALink>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
