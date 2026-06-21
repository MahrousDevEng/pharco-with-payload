"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  FlaskConical,
  Factory,
  Pill,
  Truck,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import InnerBanner from "@/components/InnerBanner";
import CTALink from "@/components/CTALink";
import EditorialImage from "@/components/editorial/EditorialImage";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function useReveal(margin: `${number}${"px" | "%"}` = "-80px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView] as const;
}

type VCStep = {
  num: string;
  title: string;
  body: string;
  icon: typeof FlaskConical;
  img: string;
};

const VALUE_CHAIN: VCStep[] = [
  {
    num: "01",
    title: "R&D",
    icon: FlaskConical,
    img: "/images/materials/Value%20chain/R%26D.jpg",
    body: "Pharco's own pipeline plus international research collaborations with the University of Michigan, DNDi, Chemelctiva, Presidio Pharmaceuticals and SeegPharm.",
  },
  {
    num: "02",
    title: "Manufacturing",
    icon: Factory,
    img: "/images/materials/Value%20chain/Manufacturing.jpg",
    body: "Own facilities across the group plus licensed and CMO production for multinationals including Boehringer Ingelheim, Doppelherz, GSK, Sandoz and Synthon.",
  },
  {
    num: "03",
    title: "Products",
    icon: Pill,
    img: "/images/materials/Value%20chain/Products.jpg",
    body: "350 branded generics across 12 therapeutic areas including Rx generics, OTC products, licensed Rx, licensed OTC, APIs and medical/surgical products.",
  },
  {
    num: "04",
    title: "Distribution",
    icon: Truck,
    img: "/images/materials/Value%20chain/Distribution.jpg",
    body: "Group distribution arms, Abou Kir Trading and ZIMMO, provide regional supply chain and last-mile delivery infrastructure across Egypt and the wider MENA region.",
  },
  {
    num: "05",
    title: "Customers",
    icon: Users,
    img: "/images/materials/Value%20chain/Customers.jpg",
    body: "Public-sector buyers (health ministries, government institutions) and private-sector buyers (pharmacies, clinics, hospitals, distributors) across more than 70 markets.",
  },
];

type Company = {
  num: string;
  name: string;
  tag: string;
  img: string;
  meta?: string;
  produces: string;
  capacity: string;
  markets: string;
};

const COMPANIES: Company[] = [
  {
    num: "01",
    name: "Pharco Pharmaceuticals",
    tag: "Manufacturing",
    img: "/images/materials/Companies/Pharco.jpg",
    produces:
      "Egypt's flagship branded generics producer, solid, liquid, semi-solid and sterile dosage form manufacturing across multiple therapeutic areas.",
    capacity:
      "Egypt's highest-volume branded generic manufacturer with fully integrated GMP-certified lines",
    markets: "Egypt · MENA, Africa & international export markets",
  },
  {
    num: "02",
    name: "Amriya Pharmaceuticals",
    tag: "Manufacturing",
    img: "/images/materials/Companies/Amriya.jpg",
    produces:
      "Multi-dosage-form pharmaceutical manufacturing, solid, liquid and semi-solid forms, with deep cephalosporin and penicillin capability.",
    capacity:
      "Large-scale antibiotic production with specialist containment & segregated manufacturing",
    markets: "Egypt · MENA region",
  },
  {
    num: "03",
    name: "Pharco B International",
    tag: "Export",
    img: "/images/materials/Companies/Pharco%20B.jpg",
    produces:
      "Export-focused pharmaceutical manufacturing and international market development, producing for Pharco's 70+ export markets.",
    capacity:
      "Export-scale production lines certified for MENA, African & Latin American regulatory frameworks",
    markets: "70+ markets across MENA, Sub-Saharan Africa & Latin America",
  },
  {
    num: "04",
    name: "European Pharmaceuticals (EEPT)",
    tag: "Manufacturing",
    img: "/images/materials/Companies/European.jpg",
    produces:
      "European-standard pharmaceutical manufacturing serving regional and international markets, with EU-GMP-aligned production lines.",
    capacity:
      "European-standard manufacturing qualified for demanding international regulatory markets",
    markets: "MENA · selected European & international markets",
  },
  {
    num: "05",
    name: "Techno Pharmaceuticals",
    tag: "Manufacturing",
    img: "/images/materials/Companies/Techno.jpg",
    produces:
      "Specialised pharmaceutical manufacturing across multiple therapeutic areas, including hormonal and complex generic dosage forms.",
    capacity:
      "Dedicated specialist lines for complex and controlled pharmaceutical manufacturing",
    markets: "Egypt · selected export markets",
  },
  {
    num: "06",
    name: "Safe Pharma",
    tag: "Manufacturing",
    img: "/images/materials/Companies/Safe.jpg",
    produces:
      "Quality-focused pharmaceutical manufacturing built around a safety-first operational culture, multiple dosage forms under integrated GMP standards.",
    capacity:
      "GMP-certified manufacturing across solid, liquid & semi-solid forms",
    markets: "Egypt domestic market",
  },
  {
    num: "07",
    name: "BGP: Bio Generic Pharma",
    tag: "Biogeneric",
    img: "/images/materials/Companies/biogeneric%20pharma.jpg",
    meta: "Est. 2022",
    produces:
      "Biogeneric and specialty pharmaceutical development and production, established 2022 to broaden Pharco's biologics and complex generics pipeline.",
    capacity:
      "Emerging large-molecule production facility established 2022 to broaden the group's biologics pipeline",
    markets: "MENA · emerging international markets as pipeline matures",
  },
  {
    num: "08",
    name: "PBIC: Pharco B International for Chemicals",
    tag: "API · Chemicals",
    img: "/images/materials/Companies/FBIC.jpg",
    produces:
      "Active pharmaceutical ingredient (API) manufacturing, vertical integration from raw chemistry to finished product within the Pharco Group.",
    capacity:
      "Vertically integrated upstream API supply, the chemistry foundation of the Pharco Group",
    markets: "Internal group supply · external B2B API market",
  },
  {
    num: "09",
    name: "Pharco Impex Romania",
    tag: "Distribution · EU",
    img: "/images/materials/Companies/Pharco%20Romania.jpg",
    meta: "Est. 1993",
    produces:
      "European distribution and licensing operations, established 1993, supporting Pharco's longest-standing European market entry.",
    capacity:
      "30+ years of Central & Eastern European distribution and regulatory expertise",
    markets: "Central & Eastern Europe · EU licensing markets",
  },
  {
    num: "10",
    name: "Abou Kir Trading",
    tag: "Distribution",
    img: "/images/materials/Companies/Abouqeer.jpg",
    produces:
      "Regional pharmaceutical distribution and supply chain management, Egypt's wholesale infrastructure backbone for the Pharco Group.",
    capacity:
      "National-scale distribution network covering Egypt's private & public sector pharmacy channels",
    markets: "Egypt · MENA region supply chain",
  },
  {
    num: "11",
    name: "Batterjee Pharma (KSA)",
    tag: "GCC Partnership",
    img: "/images/materials/Companies/batterjee%20pharma.jpg",
    produces:
      "Strategic partnership in Saudi Arabia, supporting market access and pharmaceutical distribution across the GCC.",
    capacity:
      "Strategic GCC partnership providing full market access and regulatory support in Saudi Arabia",
    markets: "Saudi Arabia · GCC countries",
  },
  {
    num: "12",
    name: "Greenliving Pharma",
    tag: "Wellness",
    img: "/images/materials/Companies/Greenliving.jpg",
    produces:
      "Health and wellness product development, extending the group's reach into preventive care and consumer health.",
    capacity:
      "Consumer health product development for preventive care and emerging wellness segments",
    markets: "Egypt · MENA consumer health channels",
  },
  {
    num: "13",
    name: "Presidio Pharmaceuticals, Inc.",
    tag: "USA",
    img: "/images/materials/Companies/presidio.jpg",
    produces:
      "US-based pharmaceutical company within the Pharco Group's international footprint, specialty pharmaceutical R&D and commercialisation.",
    capacity:
      "US-based R&D capability with regulatory pathway development for FDA-targeted molecules",
    markets:
      "United States · international licensing & development partnerships",
  },
];

function ValueChainStep({ step, index }: { step: VCStep; index: number }) {
  const [ref, inView] = useReveal("-40px");
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
      className="group flex flex-1 basis-0 min-w-[220px] lg:min-w-0"
    >
      <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_2px_18px_-10px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.28)]">
        {/* Image header */}
        <div className="relative h-52 overflow-hidden">
          <EditorialImage
            src={step.img}
            alt={step.title}
            w={520}
            h={360}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          <div className="absolute left-3 top-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-5 w-5 text-white" strokeWidth={1.6} />
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
        </div>

        <div className="p-5">
          <h4 className="mb-3 flex items-center gap-2 text-xl font-bold text-secondary">
            {step.title}
            <span className="h-px flex-1 bg-neutral-200" />
          </h4>
          <p className="text-sm leading-relaxed text-neutral-600">{step.body}</p>
        </div>
      </div>
    </motion.div>
  );
}

function CompanyCarouselCard({ c, index }: { c: Company; index: number }) {
  const [ref, inView] = useReveal("-20px");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: Math.min(index, 5) * 0.07,
        ease: EASE,
      }}
      className="relative flex-none w-[340px] h-[420px] rounded-2xl overflow-hidden snap-start cursor-pointer group"
    >
      {/* Image with zoom on hover */}
      <EditorialImage
        src={c.img}
        alt={c.name}
        w={680}
        h={840}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Default: tag + name:fades out on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-3">
        <h4 className="text-white font-bold text-xl leading-snug">{c.name}</h4>
        {c.meta && <p className="text-white/55 text-xs mt-1.5">{c.meta}</p>}
      </div>

      {/* Hover panel:pure CSS slide up */}
      <div className="absolute inset-0 bg-black/80 p-6 flex flex-col translate-y-full group-hover:translate-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
        <div className="mb-5">
          <h4 className="text-white font-bold text-xl leading-snug">
            {c.name}
          </h4>
        </div>
        <p className="text-white/80 text-sm leading-relaxed">{c.produces}</p>
      </div>
    </motion.div>
  );
}

function CompanyCarousel({
  companies,
  scrollRef,
  onSyncUpdate,
}: {
  companies: Company[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onSyncUpdate: (left: boolean, right: boolean) => void;
}) {
  const isDragging = useRef(false);
  const isPaused = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const autoplayTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const STEP = 360;
  const AUTOPLAY_INTERVAL = 3500;

  const sync = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    onSyncUpdate(scrollLeft > 4, scrollLeft < scrollWidth - clientWidth - 4);
  };

  const tick = () => {
    if (isPaused.current || !scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    if (scrollLeft >= scrollWidth - clientWidth - 4) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: STEP, behavior: "smooth" });
    }
    sync();
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    isPaused.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
    sync();
  };

  const stopDrag = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    sync();
    autoplayTimer.current = setInterval(tick, AUTOPLAY_INTERVAL);
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      onScroll={sync}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseEnter={() => {
        isPaused.current = true;
      }}
      onMouseLeave={() => {
        isPaused.current = false;
        stopDrag();
      }}
      className="flex gap-5 overflow-x-auto pb-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing select-none"
    >
      {companies.map((c, i) => (
        <CompanyCarouselCard key={c.num} c={c} index={i} />
      ))}
    </div>
  );
}

export default function PharcoGroupView() {
  const [introRef, introInView] = useReveal("-60px");
  const [vcHeaderRef, vcHeaderInView] = useReveal();
  const [grpHeaderRef, grpHeaderInView] = useReveal();
  const [accessRef, accessInView] = useReveal();
  const [ctaRef, ctaInView] = useReveal();

  const carouselScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const CAROUSEL_STEP = 360;
  const scrollCarousel = (dir: "left" | "right") => {
    carouselScrollRef.current?.scrollBy({
      left: dir === "left" ? -CAROUSEL_STEP : CAROUSEL_STEP,
      behavior: "smooth",
    });
  };

  // Parallax:value chain section
  const vcSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: vcScroll } = useScroll({
    target: vcSectionRef,
    offset: ["start end", "end start"],
  });
  const vcBgY = useTransform(vcScroll, [0, 1], ["-12%", "12%"]);

  return (
    <>
      <InnerBanner
        bg="/images/inners/banner%20pharco%20group.jpg"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About Pharco", href: "/about-our-story" },
          { label: "The Pharco Group" },
        ]}
        title={
          <>
            13 Companies. <span className="accent">One Mission.</span>
          </>
        }
        lede="From API synthesis to finished product to last-mile distribution, the Pharco Group operates the full pharmaceutical value chain, under one corporation."
      />

      {/* INTRO + STATS */}
      <section className="pt-10 pb-10 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <div
            ref={introRef}
            className="grid md:grid-cols-12 gap-10 lg:gap-16 items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE }}
              className="md:col-span-7"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.05]">
                Pharco Group <span className="text-primary">Companies</span>
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={introInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.45 }}
                style={{ originX: 0 }}
                className="h-1 w-16 bg-primary rounded-full mt-8 mb-8"
              />
              <p className="text-neutral-600 leading-relaxed text-base">
                The Pharco Group is an integrated pharmaceutical group in Egypt,
                built over more than 6 decades. Its 13 companies cover the full
                pharmaceutical value chain, R&amp;D, API manufacturing,
                formulation, distribution and international operations, under
                one corporate ownership.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              className="md:col-span-5"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]">
                <img
                  src="/images/materials/Pharco-group-inner2.jpg"
                  alt="Pharco Group integrated pharmaceutical operations"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-block bg-primary text-white text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full">
                    13 Companies · One Group
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUE CHAIN */}
      <section ref={vcSectionRef} className="relative py-20 overflow-hidden bg-[#f4f2eb]">
        {/* Background image:parallax — kept visible under a light wash */}
        <motion.img
          src="/images/inners/Manufacturing-banner.jpg"
          alt=""
          aria-hidden="true"
          style={{ y: vcBgY }}
          className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover object-center"
        />
        {/* Light wash keeps the photo visible while staying bright */}
        <div className="absolute inset-0 bg-[#f4f2eb]/80" />

        <div className="relative max-w-[1280px] mx-auto px-4">
          <motion.div
            ref={vcHeaderRef}
            initial={{ opacity: 0, y: 32 }}
            animate={vcHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.05]">
              An Integrated Pharmaceutical{" "}
              <span className="text-primary">Value Chain</span>
            </h2>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-3 items-stretch">
            {VALUE_CHAIN.map((s, i) => (
              <ValueChainStep key={s.num} step={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 13 COMPANIES CAROUSEL */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4">
          <motion.div
            ref={grpHeaderRef}
            initial={{ opacity: 0, y: 32 }}
            animate={grpHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-end justify-between gap-6 mb-12"
          >
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.05]">
                The 13 Pharco Group{" "}
                <span className="text-primary">Companies</span>
              </h2>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => scrollCarousel("left")}
                disabled={!canScrollLeft}
                aria-label="Previous companies"
                className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center shadow-sm disabled:opacity-25 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                disabled={!canScrollRight}
                aria-label="Next companies"
                className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center shadow-sm disabled:opacity-25 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <CompanyCarousel
            companies={COMPANIES}
            scrollRef={carouselScrollRef}
            onSyncUpdate={(left, right) => {
              setCanScrollLeft(left);
              setCanScrollRight(right);
            }}
          />
        </div>
      </section>

      {/* MANUFACTURING & MARKET ACCESS */}
      <section className="py-20 bg-[#111] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-4 relative">
          <div
            ref={accessRef}
            className="grid md:grid-cols-12 gap-10 lg:gap-16 items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={accessInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
              className="md:col-span-5"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1]">
                Pharmaceutical Manufacturing &amp;{" "}
                <span className="text-primary">Market Access</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={accessInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="md:col-span-7"
            >
              <p className="text-white/65 leading-relaxed text-base">
                Vertical integration is what separates the Pharco Group
                commercially. With API supply, multiple manufacturing sites,
                branded generic portfolios, an established CMO platform, and
                group-owned pharmaceutical distribution across Egypt and MENA,
                Pharco can move faster on market access, absorb supply-chain
                volatility better than independent peers, and offer partners a
                single point of contact for the full molecule-to-patient
                journey.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1a1a1a] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h3 className="text-white text-3xl md:text-4xl font-bold mb-4">
              Discover Pharco&apos;s{" "}
              <span className="text-primary">Wider Capabilities</span>
            </h3>
            <p className="text-white/55 text-sm leading-relaxed">
              Explore the operations, partners and reach of the Pharco Group.
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            <CTALink href="/products-overview" variant="dark">
              Products &amp; Therapeutic Areas
            </CTALink>
            <CTALink href="/science-manufacturing" variant="dark">
              Manufacturing
            </CTALink>
            <CTALink href="/global-presence" variant="dark">
              Global Presence
            </CTALink>
            <CTALink href="/science-rd" variant="dark">
              Research &amp; Development
            </CTALink>
          </div>
        </div>
      </section>
    </>
  );
}
