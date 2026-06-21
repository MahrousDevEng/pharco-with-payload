"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  MapPin,
  Mail,
} from "lucide-react";
import InnerBanner from "@/components/InnerBanner";
import CTALink from "@/components/CTALink";
import { Counter } from "@/components/inner/Counter";
import EditorialImage from "@/components/editorial/EditorialImage";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function useReveal(margin: `${number}${"px" | "%"}` = "-80px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView] as const;
}

const ACCREDITATIONS = [
  { name: "WHO-GMP", subtitle: "World Health Organization", logo: "/images/Certifcate/WHO_logo.png" },
  { name: "EU-GMP", subtitle: "European Union", logo: "/images/Certifcate/EU-GMP.png" },
  { name: "PIC/S", subtitle: "Inspection Co-operation Scheme", logo: "/images/Certifcate/PICS.png" },
  { name: "SFDA", subtitle: "Saudi Food & Drug Authority", logo: "/images/Certifcate/SFDA.png" },
  { name: "ANVISA", subtitle: "Brazil Health Authority", logo: "/images/Certifcate/ANVISA.png" },
  { name: "GCC", subtitle: "Gulf Cooperation Council", logo: "/images/Certifcate/GCC.png" },
  { name: "NHRA", subtitle: "Bahrain Health Regulator", logo: "/images/Certifcate/Nhra-01.png" },
  { name: "TFDA", subtitle: "Tanzania Food & Drugs", logo: "/images/Certifcate/tanzania-food-drugs-authority-tfda-seeklogo-01.png" },
];

const FOOTPRINT_STATS = [
  { value: 70, suffix: "+", label: "Countries Served", lead: "Active markets across five continents" },
  { value: 100, suffix: "+", label: "Distribution Partners", lead: "Trusted pharmaceutical distributors worldwide" },
  { value: 4, suffix: "", label: "Global Scientific Offices", lead: "Regional medical and regulatory support" },
  { value: 2, suffix: "nd", label: "Largest Pharma Exporter", lead: "Egypt's pharmaceutical export ranking" },
];

const REGIONS = [
  {
    name: "Africa",
    countries: 28,
    registered: 282,
    pipeline: 249,
    body: "Pharco's longest-standing export region, backed by a dedicated regulatory affairs team managing 28 active markets across sub-Saharan and North Africa.",
    coord: { x: 588, y: 358 },
  },
  {
    name: "Gulf & Levant",
    countries: 12,
    registered: 285,
    pipeline: 121,
    body: "Strategic GCC market presence, strengthened by the upcoming Pharco International plant in Saudi Arabia opening 2025.",
    coord: { x: 660, y: 288 },
  },
  {
    name: "Europe & CIS",
    countries: 16,
    registered: 101,
    pipeline: 75,
    body: "Anchored by Pharco Impex Romania (est. 1993), the group's longest-running European subsidiary covering Central & Eastern Europe.",
    coord: { x: 540, y: 195 },
  },
  {
    name: "Latin America",
    countries: 11,
    registered: 11,
    pipeline: 60,
    body: "ANVISA-aligned regulatory submissions and a growing pipeline of regional partner registrations across South America.",
    coord: { x: 382, y: 360 },
  },
  {
    name: "Asia Pacific",
    countries: 4,
    registered: 12,
    pipeline: 26,
    body: "The newest region in Pharco's global footprint, currently in active regulatory and distributor build-out phase.",
    coord: { x: 818, y: 322 },
  },
];

const HQ_COORD = { x: 595, y: 280 };

function StatBlock({
  value,
  suffix,
  label,
  lead,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  lead: string;
  index: number;
}) {
  const [ref, inView] = useReveal("-30px");
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      className="relative group text-center p-6 md:p-8"
    >
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-primary/20 rounded-full overflow-hidden">
        <motion.div
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
          style={{ originX: 0 }}
          className="h-full w-full bg-primary rounded-full"
        />
      </div>
      <div className="text-5xl md:text-6xl font-black text-primary leading-none mb-3">
        {inView && <Counter to={value} suffix={suffix} />}
      </div>
      <p className="text-sm font-bold text-secondary uppercase tracking-[0.12em] mb-1.5">
        {label}
      </p>
      <p className="text-xs text-neutral-500 leading-relaxed max-w-[180px] mx-auto">
        {lead}
      </p>
    </motion.div>
  );
}

export default function GlobalPresenceView() {
  const [introRef, introInView] = useReveal("-60px");
  const [accredRef, accredInView] = useReveal("-40px");
  const [ksaRef, ksaInView] = useReveal("-40px");
  const [distRef, distInView] = useReveal();
  const [statsHeaderRef, statsHeaderInView] = useReveal();

  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const mapWrapRef = useRef<HTMLDivElement | null>(null);
  const mapInView = useInView(mapWrapRef, { once: true, margin: "-60px" });
  const selectedRegion = REGIONS.find((r) => r.name === activeRegion) ?? null;

  // KSA parallax
  const ksaSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: ksaScroll } = useScroll({
    target: ksaSectionRef,
    offset: ["start end", "end start"],
  });
  const ksaBgY = useTransform(ksaScroll, [0, 1], ["-8%", "8%"]);

  return (
    <>
      {/* ── HERO BANNER ── */}
      <InnerBanner
        bg="/images/materials/Global%20presence/Global%20presence-Main%20banner.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Global Presence" }]}
        title={<>Pharco <span className="accent">Global Presence</span></>}
        lede="From Egypt to 70+ countries, and counting."
      />

      {/* ── FROM EGYPT TO THE WORLD ── */}
      <section className="pt-14 pb-6 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <div
            ref={introRef}
            className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -48 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.1] mb-4">
                From Egypt to <span className="text-primary">the World</span>
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={introInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                style={{ originX: 0 }}
                className="h-1 w-16 bg-primary rounded-full mb-8"
              />
              <p className="text-neutral-600 leading-relaxed mb-8">
                Pharco&apos;s global presence began with a single export shipment
                from Alexandria and has grown into an international platform
                serving more than 70 countries. Today, Pharco products reach
                patients across Africa, the Middle East, Europe, Asia Pacific and
                Latin America, supported by decades of regulatory expertise, 4
                global scientific offices and partnerships with more than 100
                distributors worldwide. As Egypt&apos;s second-largest
                pharmaceutical exporter, Pharco continues to strengthen market
                access through regulatory affairs teams, distribution partners
                and regional support networks, with the upcoming Pharco
                International plant in Saudi Arabia marking the next step in its
                regional expansion.
              </p>
              <div className="flex flex-wrap gap-4">
                <CTALink href="#markets" variant="light">
                  Explore Our Markets
                </CTALink>
                <CTALink href="#partner" variant="light">
                  Become a Distribution Partner
                </CTALink>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 48 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.22)]">
                <EditorialImage
                  src="/images/materials/Global%20presence/From%20Egypt%20to%20the%20World-inner.png"
                  alt="Pharco global pharmaceutical operations"
                  w={900}
                  h={675}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/50" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.18em] px-4 py-2 rounded-full">
                    <MapPin className="w-3.5 h-3.5" />
                    70+ Markets Worldwide
                  </div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={introInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
                className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl px-5 py-4 border border-neutral-100"
              >
                <p className="text-3xl font-black text-primary leading-none">2nd</p>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-wider mt-1">
                  Largest Pharma Exporter
                </p>
                <p className="text-[9px] text-neutral-400">Egypt</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── REGULATORY ACCREDITATIONS ── */}
      <section className="pt-8 pb-16 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <motion.div
            ref={accredRef}
            initial={{ opacity: 0, y: 24 }}
            animate={accredInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-secondary">
              Regulatory <span className="text-primary">Accreditations</span>
            </h2>
            <p className="text-neutral-500 mt-4 text-base max-w-xl mx-auto leading-relaxed">
              Pharco manufacturing plants hold international GMP certifications
              recognised by the world&apos;s leading regulatory bodies.
            </p>
          </motion.div>
        </div>

        {/* Rotating logo marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={accredInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="relative overflow-hidden"
        >
          <style>{`
            @keyframes accredmarquee { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
            .accred-track { animation: accredmarquee 36s linear infinite; }
            .accred-marquee:hover .accred-track { animation-play-state: paused; }
          `}</style>
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

          <div className="accred-marquee flex">
            <div className="accred-track flex shrink-0 gap-5 pr-5">
              {[...ACCREDITATIONS, ...ACCREDITATIONS].map((a, i) => (
                <div
                  key={`${a.name}-${i}`}
                  className="group flex w-44 shrink-0 flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-8 py-6 transition-all duration-300 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex h-14 items-center justify-center">
                    <img
                      src={a.logo}
                      alt={a.name}
                      className="max-h-14 max-w-[100px] object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-center text-xs font-bold uppercase tracking-wider text-secondary">
                    {a.name}
                  </p>
                  <p className="text-center text-[10px] leading-snug text-neutral-400">
                    {a.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FULL-WIDTH INTERACTIVE MAP ── */}
      <section
        id="markets"
        className="relative w-full overflow-hidden"
        style={{ background: "linear-gradient(160deg,#f4f7fb 0%,#e7eef6 50%,#f4f7fb 100%)" }}
      >
        {/* Section header */}
        <div className="max-w-[1280px] mx-auto px-4 pt-16 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-tight">
              Regional Market{" "}
              <span className="text-primary">Coverage</span>
            </h2>
          </motion.div>
        </div>

        {/* Region selector tabs — above map */}
        <div className="flex justify-center gap-2 flex-wrap px-4 pb-6 z-20 relative">
          {REGIONS.map((r) => (
            <button
              key={`tab-${r.name}`}
              onClick={() =>
                setActiveRegion((prev) => (prev === r.name ? null : r.name))
              }
              className={`px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-200 border ${
                activeRegion === r.name
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                  : "bg-secondary/[0.04] border-secondary/10 text-secondary/60 hover:bg-secondary/[0.08] hover:border-secondary/20 hover:text-secondary"
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* Full-width map canvas */}
        <div
          ref={mapWrapRef}
          className="relative w-full"
          style={{ height: "clamp(420px, 60vh, 700px)" }}
        >
          {/* Colour wash */}
          <div className="absolute inset-0 bg-[#bcd0e8]/20" />

          {/* Top + bottom fade to section bg */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #f4f7fb 100%)",
            }}
          />

          {/* SVG map, pins and arcs — zoomed-in viewBox crops empty ocean so landmasses & labels read larger */}
          <svg
            viewBox="0 70 1000 360"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 w-full h-full z-10"
            aria-label="Pharco global markets interactive map"
          >
            {/* Base world map — embedded so it shares the exact coordinate space of the pins */}
            <image
              href="/images/map22.jpg"
              x="0"
              y="0"
              width="1000"
              height="500"
              preserveAspectRatio="xMidYMid slice"
              style={{ mixBlendMode: "multiply" }}
              opacity="0.55"
            />
            <defs>
              <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#e07e27" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#e07e27" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="hqGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0d1528" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#0d1528" stopOpacity="0" />
              </radialGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Arcs from HQ to each region */}
            {REGIONS.map((r, i) => {
              const mx = (HQ_COORD.x + r.coord.x) / 2;
              const dx = Math.abs(r.coord.x - HQ_COORD.x);
              const my = (HQ_COORD.y + r.coord.y) / 2 - dx * 0.22 - 15;
              const path = `M ${HQ_COORD.x} ${HQ_COORD.y} Q ${mx} ${my} ${r.coord.x} ${r.coord.y}`;
              const isActive = activeRegion === r.name;
              return (
                <motion.path
                  key={`arc-${r.name}`}
                  d={path}
                  fill="none"
                  stroke="#e07e27"
                  strokeWidth={isActive ? 1.8 : 0.9}
                  strokeOpacity={isActive ? 0.9 : 0.3}
                  strokeDasharray="4 6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={mapInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.6, delay: 0.35 + i * 0.18, ease: EASE }}
                />
              );
            })}

            {/* HQ marker — Egypt */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={mapInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
              style={{ transformOrigin: `${HQ_COORD.x}px ${HQ_COORD.y}px` }}
            >
              {/* Outer glow */}
              <circle cx={HQ_COORD.x} cy={HQ_COORD.y} r="30" fill="url(#hqGlow)" />
              {/* Ring */}
              <circle
                cx={HQ_COORD.x}
                cy={HQ_COORD.y}
                r="10"
                fill="none"
                stroke="#0d1528"
                strokeWidth="1.5"
                strokeOpacity="0.45"
              />
              {/* Core */}
              <circle
                cx={HQ_COORD.x}
                cy={HQ_COORD.y}
                r="5"
                fill="#0d1528"
              />
              {/* Label above */}
              <rect
                x={HQ_COORD.x - 34}
                y={HQ_COORD.y - 30}
                width="68"
                height="18"
                rx="9"
                fill="#0d1528"
              />
              <text
                x={HQ_COORD.x}
                y={HQ_COORD.y - 17}
                fontSize="8.5"
                fontWeight="700"
                fill="white"
                textAnchor="middle"
                letterSpacing="0.06em"
              >
                EGYPT · HQ
              </text>
            </motion.g>

            {/* Region pins */}
            {REGIONS.map((r, i) => {
              const isActive = activeRegion === r.name;
              return (
                <motion.g
                  key={r.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={mapInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.45, delay: 0.6 + i * 0.14, ease: EASE }}
                  style={{
                    transformOrigin: `${r.coord.x}px ${r.coord.y}px`,
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setActiveRegion(r.name)}
                  onClick={() =>
                    setActiveRegion((prev) => (prev === r.name ? null : r.name))
                  }
                >
                  {/* Pulse ring — always on */}
                  <motion.circle
                    cx={r.coord.x}
                    cy={r.coord.y}
                    r={isActive ? 20 : 14}
                    fill="url(#pinGlow)"
                    animate={
                      isActive
                        ? { scale: [1, 1.7, 1], opacity: [0.7, 0, 0.7] }
                        : { scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }
                    }
                    transition={{ duration: isActive ? 1.8 : 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* Outer ring */}
                  <circle
                    cx={r.coord.x}
                    cy={r.coord.y}
                    r={isActive ? 11 : 8}
                    fill="none"
                    stroke="#e07e27"
                    strokeWidth={isActive ? 1.5 : 1}
                    strokeOpacity={isActive ? 1 : 0.6}
                  />
                  {/* Inner dot */}
                  <circle
                    cx={r.coord.x}
                    cy={r.coord.y}
                    r={isActive ? 6 : 4}
                    fill="#e07e27"
                    filter={isActive ? "url(#glow)" : undefined}
                  />
                  {/* Label chip — shown when active */}
                  {isActive && (
                    <g>
                      <rect
                        x={r.coord.x - r.name.length * 3.6 - 8}
                        y={r.coord.y - 30}
                        width={r.name.length * 7.2 + 16}
                        height="18"
                        rx="9"
                        fill="#e07e27"
                      />
                      <text
                        x={r.coord.x}
                        y={r.coord.y - 17}
                        fontSize="8"
                        fontWeight="800"
                        fill="white"
                        textAnchor="middle"
                        letterSpacing="0.08em"
                      >
                        {r.name.toUpperCase()}
                      </text>
                    </g>
                  )}
                </motion.g>
              );
            })}
          </svg>

          {/* Floating dark-glass info card */}
          <AnimatePresence mode="wait">
            {selectedRegion && (
              <motion.div
                key={selectedRegion.name}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="absolute right-6 bottom-6 w-72 rounded-2xl z-30 overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(13,21,40,0.08)",
                  boxShadow: "0 24px 60px rgba(13,21,40,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
              >
                {/* Orange top bar */}
                <div className="h-[3px] w-full bg-gradient-to-r from-primary via-primary/70 to-transparent" />

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-secondary/45">
                      Selected Region
                    </p>
                  </div>
                  <h3 className="text-xl font-black text-secondary leading-tight mb-4">
                    {selectedRegion.name}
                  </h3>

                  <div className="space-y-3 mb-4 pb-4 border-b border-secondary/10">
                    {[
                      { val: selectedRegion.countries, lbl: "Countries" },
                      { val: selectedRegion.registered, lbl: "Products Registered" },
                      { val: selectedRegion.pipeline, lbl: "Products Under Registration" },
                    ].map(({ val, lbl }) => (
                      <div key={lbl} className="flex items-center justify-between gap-3">
                        <p className="text-[10px] uppercase tracking-wider text-secondary/45 font-bold leading-snug">
                          {lbl}
                        </p>
                        <p className="text-2xl font-black text-primary leading-none shrink-0">{val}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {selectedRegion.body}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom legend */}
          <div className="absolute bottom-6 left-6 flex items-center gap-5 z-20">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-secondary/50 font-bold">
              <span className="w-2 h-2 rounded-full bg-primary opacity-80 inline-block" />
              Active region
            </span>
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-secondary/50 font-bold">
              <span className="w-2 h-2 rounded-full bg-secondary opacity-70 inline-block" />
              Egypt HQ
            </span>
          </div>

          {/* Hover prompt */}
          {!activeRegion && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={mapInView ? { opacity: 1 } : {}}
              transition={{ delay: 2.5 }}
              className="absolute bottom-6 right-6 text-[10px] uppercase tracking-widest text-secondary/40 font-bold z-20"
            >
              Hover or click a pin
            </motion.p>
          )}
        </div>

        <div className="h-12" />
      </section>

      {/* ── GLOBAL FOOTPRINT:SCALE OF OUR REACH ── */}
      <section className="py-16 bg-neutral-100 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <motion.div
            ref={statsHeaderRef}
            initial={{ opacity: 0, y: 24 }}
            animate={statsHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-secondary">
              Global <span className="text-primary">Footprint</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-200 bg-white rounded-2xl shadow-xs overflow-hidden">
            {FOOTPRINT_STATS.map((s, i) => (
              <StatBlock key={s.label} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PHARCO INTERNATIONAL:KSA ── */}
      <section
        ref={ksaSectionRef}
        className="py-14 bg-[#1a1a1a] overflow-hidden relative"
      >
        <div className="absolute inset-0 opacity-10">
          <motion.img
            src="/images/materials/Global%20presence/Global%20presence-Pharco%20Int-BG%20%281%29.jpg"
            alt=""
            aria-hidden
            style={{ y: ksaBgY }}
            className="w-full h-[120%] -top-[10%] object-cover object-center absolute"
          />
        </div>
        <div className="max-w-[1280px] mx-auto px-4 relative">
          <div
            ref={ksaRef}
            className="grid md:grid-cols-5 gap-12 items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={ksaInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
              className="md:col-span-2"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
                <EditorialImage
                  src="/images/materials/Global%20presence/Global%20present-Pharco%20Int.jpg"
                  alt="Pharco International Saudi Arabia manufacturing plant"
                  w={760}
                  h={760}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/25 to-black/80" />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-primary text-black text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                  Opening 2025
                </div>
                <div className="absolute bottom-6 left-6 right-6 inline-flex items-center gap-2 text-white text-sm font-medium">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Saudi Arabia · GCC</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={ksaInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="md:col-span-3"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-6">
                Pharco International Plant{" "}
                <span className="text-primary">in KSA</span>
              </h2>
              <p className="text-white/65 leading-relaxed">
                Pharco&apos;s newest international manufacturing facility is
                located in Saudi Arabia, a landmark investment marking the
                group&apos;s strategic expansion into GCC-based production. The
                Pharco International plant, opening in 2025, will serve GCC, MENA,
                and beyond.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BECOME A DISTRIBUTION PARTNER ── */}
      <section id="partner" className="py-16 bg-[#0f0f0f] relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 relative">
          <div ref={distRef} className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={distInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-6">
                Become a{" "}
                <span className="text-primary">Distribution Partner</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                If you represent a pharmaceutical distributor, licensee or
                co-marketing partner exploring opportunities in Africa, MENA,
                GCC, Europe, Latin America or Asia Pacific, Pharco&apos;s
                Business Development team is ready to talk. Distribution
                partnerships, licensing arrangements, market expansion enquiries,
                and tender-channel discussions all welcome.
              </p>
              <a
                href="mailto:Portfolio@pharco-corp.com"
                className="inline-flex items-center gap-3 bg-primary text-white font-bold px-6 py-3.5 rounded-full hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 group"
              >
                <Mail className="w-4 h-4" />
                Portfolio@pharco-corp.com
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
