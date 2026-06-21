"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Quote,
  Factory,
  Microscope,
  Network,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import InnerBanner from "@/components/InnerBanner";
import CTALink from "@/components/CTALink";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function useReveal(margin: `${number}${"px" | "%"}` = "-80px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView] as const;
}

type Principal = {
  name: string;
  title: string;
  photo: string;
  bio: string;
};

const PRINCIPALS: Principal[] = [
  {
    name: "Dr. Hassan Helmy",
    title: "Founder & President · Pharco Corporation",
    photo: "/images/inners/220x320%20hasan%20helmy.png",
    bio: "Dr. Hassan Helmy founded Pharco Corporation in 1957 with the conviction that quality healthcare should be accessible to all. From a single Alexandria pharmacy, he built one of the region's most respected pharmaceutical groups, a 13-company corporation employing more than 7,000 people, manufacturing 1.6 million packs a day, and reaching patients in over 70 countries. As Pharco's founder, his philosophy continues to shape every decision the group makes, from R&D priorities to pricing decisions to the choice of which markets to enter next.",
  },
  {
    name: "Dr. Sherine Helmy",
    title: "Chairman · Pharco Corporation",
    photo: "/images/inners/220x320%20sherine%20helmy.png",
    bio: "Dr. Sherine Helmy leads the strategic direction of Pharco Corporation across its 13 group companies and more than 70 markets. Under her leadership, Pharco has deepened its R&D capabilities, expanded its contract manufacturing platform, and entered new GCC markets, including the upcoming Pharco International plant in Saudi Arabia. He is widely associated with Pharco's role in Egypt's national Hepatitis C elimination programme, one of the most significant public health achievements in the region's history. His focus is on responsible growth, scientific credibility, and broader patient access.",
  },
];

type Exec = {
  name: string;
  title: string;
  department: string;
  bio: string;
  icon: typeof Factory;
  photo: string;
};

const EXECS: Exec[] = [
  {
    name: "Dr. Amir Hassan",
    title: "Chief Operating Officer",
    department: "Pharco Corporation",
    icon: Factory,
    photo: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=160&h=160&fit=crop&crop=faces&q=80",
    bio: "Dr. Amir Hassan oversees Pharco's group-wide manufacturing operations, supply chain, and quality systems across the corporation's six manufacturing companies in Egypt and the new Pharco International facility in Saudi Arabia. With more than two decades of experience in pharmaceutical operations across MENA, he leads the operational backbone behind Pharco's 1.6 million-pack daily output, eight multinational CMO partnerships, and certified manufacturing platform spanning solid, liquid, semi-solid, sterile, and hormonal dosage forms.",
  },
  {
    name: "Dr. Yasmine Farouk",
    title: "Chief Scientific Officer",
    department: "Pharco Corporation",
    icon: Microscope,
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&fit=crop&crop=faces&q=80",
    bio: "Dr. Yasmine Farouk leads Pharco's research and development platform, scientific collaborations, and pipeline strategy across all 12 therapeutic areas. She joined Pharco from a senior R&D role in international generics, and now directs partnerships with the University of Michigan, DNDi, Presidio Pharmaceuticals, and Chemelctiva. Her focus areas include complex generics, biogenerics through BGP, and the in-house API capability at PBIC, anchoring Pharco's scientific credentials across regulatory submissions in more than 60 markets worldwide.",
  },
  {
    name: "Mr. Hossam Abdel-Aziz",
    title: "Chief Commercial Officer, International Markets",
    department: "Pharco B International",
    icon: Network,
    photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=160&h=160&fit=crop&crop=faces&q=80",
    bio: "Hossam Abdel-Aziz leads Pharco's international commercial strategy, distribution partnerships, and export operations across Africa, the GCC, Levant, Europe, Latin America, and Asia Pacific. He oversees the regulatory affairs, scientific support, and partner-management infrastructure that supports Pharco's network of 100+ distribution partners and 10 global scientific offices. Under his leadership, Pharco has expanded into newer Asian and Latin American markets while deepening partner relationships in established African and GCC export channels.",
  },
];

function FloatingDot({ x, y, delay, size = 6 }: { x: string; y: string; delay: number; size?: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-primary/20 pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{ y: [0, -14, 0], opacity: [0.25, 0.65, 0.25] }}
      transition={{ duration: 3.5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function PrincipalCard({ p, index }: { p: Principal; index: number }) {
  const [ref, inView] = useReveal("-60px");
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.15, ease: EASE }}
      className="bg-white rounded-3xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] border border-neutral-100 overflow-hidden grid grid-cols-1 sm:grid-cols-[minmax(240px,320px)_1fr] group"
    >
      <div className="relative bg-neutral-100 min-h-[300px] sm:min-h-[380px] overflow-hidden">
        <img
          src={p.photo}
          alt={p.name}
          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 group-hover:to-transparent transition-all duration-700" />
      </div>
      <div className="p-8 lg:p-10 flex flex-col justify-center">
        <motion.h3
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.2, ease: EASE }}
          className="text-2xl lg:text-[28px] font-bold text-secondary leading-tight mb-2"
        >
          {p.name}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.32 }}
          className="text-primary text-[11px] font-bold uppercase tracking-[0.18em] mb-5 leading-relaxed"
        >
          {p.title}
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.42 }}
          style={{ originX: 0 }}
          className="h-0.5 w-10 bg-primary rounded-full mb-5"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: index * 0.15 + 0.5 }}
          className="text-neutral-600 leading-relaxed text-sm"
        >
          {p.bio}
        </motion.p>
      </div>
    </motion.article>
  );
}

function PrincipalsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  const scrollByCards = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth; // gap-6 = 24px
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  // Autoplay:advance one card every few seconds, looping back at the end
  useEffect(() => {
    const AUTOPLAY_INTERVAL = 5000;
    const timer = setInterval(() => {
      const el = trackRef.current;
      if (!el || isPaused.current) return;
      const card = el.querySelector<HTMLElement>("[data-card]");
      const amount = card ? card.offsetWidth + 24 : el.clientWidth; // gap-6 = 24px
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: amount, behavior: "smooth" });
      }
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative max-w-4xl mx-auto">
      <div
        ref={trackRef}
        onMouseEnter={() => {
          isPaused.current = true;
        }}
        onMouseLeave={() => {
          isPaused.current = false;
        }}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {PRINCIPALS.map((p, i) => (
          <div key={p.name} data-card className="snap-center w-full shrink-0">
            <PrincipalCard p={p} index={i} />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-3 mt-8">
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          aria-label="Previous leader"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-secondary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCards(1)}
          aria-label="Next leader"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-secondary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function ExecCard({ e, index }: { e: Exec; index: number }) {
  const [ref, inView] = useReveal("-40px");
  const Icon = e.icon;
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.72, delay: index * 0.13, ease: EASE }}
      className="bg-white rounded-3xl border border-neutral-100 p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-500 group relative overflow-hidden flex flex-col"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-700" />
      <div className="relative z-10">
        {/* Header: small circle photo + name */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full shrink-0 ring-2 ring-primary/25 group-hover:ring-primary/60 transition-all duration-500 overflow-hidden relative bg-neutral-100">
            <img
              src={e.photo}
              alt={e.name}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 text-primary mb-1">
              <Icon className="w-4 h-4" strokeWidth={1.8} />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em]">{e.department}</span>
            </div>
            <h3 className="text-xl font-bold text-secondary leading-tight">{e.name}</h3>
          </div>
        </div>
        <p className="text-primary text-sm font-medium mb-4">{e.title}</p>
        <div className="h-px w-10 bg-primary mb-4 rounded-full" />
        <p className="text-neutral-600 text-sm leading-relaxed">{e.bio}</p>
      </div>
    </motion.article>
  );
}

export default function LeadershipView() {
  const [introRef, introInView] = useReveal("-60px");
  const [quoteRef, quoteInView] = useReveal("-40px");
  const [execHeaderRef, execHeaderInView] = useReveal();
  const [ctaRef, ctaInView] = useReveal();

  const founderSectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: founderSectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <>
      <InnerBanner
        bg="/images/inners/Leadership-banner.jpg"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About Pharco", href: "/about-our-story" },
          { label: "Leadership" },
        ]}
        title={<>Pharco <span className="accent">Leadership</span></>}
        lede="The people leading the next chapter of Egypt's largest pharmaceutical group."
      />

      {/* INTRO */}
      <section className="py-20 bg-white overflow-hidden relative">
        <FloatingDot x="4%" y="25%" delay={0} size={8} />
        <FloatingDot x="88%" y="55%" delay={1.6} size={5} />
        <FloatingDot x="55%" y="8%" delay={0.9} size={4} />
        <div className="max-w-[1280px] mx-auto px-4">
          <div ref={introRef} className="grid md:grid-cols-12 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.82, ease: EASE }}
              className="md:col-span-5"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.05]">
                Leadership at <span className="text-primary">Pharco</span>
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={introInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
                style={{ originX: 0 }}
                className="h-1 w-16 bg-primary rounded-full mt-8"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.82, delay: 0.18, ease: EASE }}
              className="md:col-span-7"
            >
              <p className="text-neutral-600 leading-relaxed text-base">
                Pharco&apos;s leadership combines the founding vision of Dr. Hassan Helmy with the pharmaceutical and operational expertise of the next generation. The Pharco leadership team oversees a 13-company group spanning manufacturing, R&amp;D, distribution and international expansion, keeping the corporation rooted in its founding values while driving a clear agenda for global growth, scientific capability, and pharmaceutical leadership in MENA and beyond.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOUNDER'S MESSAGE:BG IMAGE WITH PARALLAX */}
      <section ref={founderSectionRef} className="py-28 relative overflow-hidden">
        <motion.div className="absolute inset-0 scale-110" style={{ y: bgY }}>
          <img
            src="/images/materials/Leadership-Founder_s-Message-banner2.jpg"
            alt=""
            className="w-full h-full object-cover object-right"
          />
        </motion.div>
        <div className="absolute inset-0 bg-secondary/88" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute top-8 left-8 text-primary/15 select-none pointer-events-none">
          <Quote className="w-40 h-40 md:w-64 md:h-64" strokeWidth={0.8} />
        </div>
        <div className="absolute bottom-8 right-8 text-primary/10 select-none pointer-events-none rotate-180">
          <Quote className="w-24 h-24 md:w-36 md:h-36" strokeWidth={0.8} />
        </div>

        <div className="max-w-[1080px] mx-auto px-4 relative">
          <motion.div
            ref={quoteRef}
            initial={{ opacity: 0, y: 44 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.88, ease: EASE }}
            className="text-center"
          >
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-8">
              Founder&apos;s <span className="text-primary">Message</span>
            </h2>
            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              animate={quoteInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.95, delay: 0.28 }}
              className="text-2xl md:text-4xl font-medium text-white leading-[1.45] italic"
            >
              &ldquo;Our strategies and execution are grounded in the belief that all people across the world deserve to live a{" "}
              <span className="text-primary not-italic font-bold">healthy and fulfilling life</span>. This conviction drives our desire to provide access to medicines that are safe, effective, and affordable.&rdquo;
            </motion.blockquote>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={quoteInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.72 }}
              className="h-px w-16 bg-primary mx-auto my-8"
            />
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={quoteInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.88 }}
            >
              <p className="text-white font-bold text-lg">Dr. Hassan Helmy</p>
              <span className="text-white/50 text-xs uppercase tracking-[0.15em] font-medium mt-1 block">
                Founder, Pharco Corporation
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PRINCIPALS:FOUNDER & CHAIRMAN */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.72, ease: EASE }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-secondary leading-tight">
              Founding <span className="text-primary">Leadership</span>
            </h2>
          </motion.div>
          <PrincipalsCarousel />
        </div>
      </section>

      {/* EXECUTIVE LEADERSHIP TEAM */}
      <section className="py-20 bg-[#f7f6f1] overflow-hidden relative">
        <FloatingDot x="6%" y="35%" delay={0.4} size={7} />
        <FloatingDot x="93%" y="65%" delay={2.1} size={5} />
        <FloatingDot x="50%" y="5%" delay={1.2} size={4} />
        <div className="max-w-[1280px] mx-auto px-4">
          <motion.div
            ref={execHeaderRef}
            initial={{ opacity: 0, y: 36 }}
            animate={execHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: EASE }}
            className="max-w-3xl mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.05]">
              Executive <span className="text-primary">Leadership Team</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {EXECS.map((e, i) => (
              <ExecCard key={e.name} e={e} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1a1a1a] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 28 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.72, ease: EASE }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h3 className="text-white text-3xl md:text-4xl font-bold mb-4">
              Discover Pharco&apos;s <span className="text-primary">Wider Impact</span>
            </h3>
            <p className="text-white/55 text-sm leading-relaxed">
              Pharco&apos;s leadership directs every part of the group. Discover the operations, science and reach behind the team.
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            <CTALink href="/about-our-story" variant="dark">About Pharco</CTALink>
            <CTALink href="/about-pharco-group" variant="dark">The Pharco Group</CTALink>
            <CTALink href="/science-manufacturing" variant="dark">Manufacturing</CTALink>
            <CTALink href="/science-rd" variant="dark">Research &amp; Development</CTALink>
            <CTALink href="/global-presence" variant="dark">Global Presence</CTALink>
          </div>
        </div>
      </section>
    </>
  );
}
