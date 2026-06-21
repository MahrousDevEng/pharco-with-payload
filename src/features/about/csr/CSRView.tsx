"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  HeartPulse,
  Leaf,
  Users,
  ShieldCheck,
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

type Pillar = {
  num: string;
  title: string;
  body: string;
  icon: typeof HeartPulse;
  img: string;
};

const PILLARS: Pillar[] = [
  {
    num: "01",
    title: "Health Awareness",
    icon: HeartPulse,
    img: "/images/materials/Our%20Impact/Health%20Awareness.jpg",
    body: "Community education programmes on disease prevention, early diagnosis and responsible medicine use, delivered through local clinics, schools and public-health campaigns across Egypt and our export markets.",
  },
  {
    num: "02",
    title: "Hepatitis C Initiative",
    icon: ShieldCheck,
    img: "/images/materials/Our%20Impact/Hepatitis%20C%20Initiative.jpg",
    body: "Pharco has played a central role in Egypt's national Hepatitis C elimination programme. More than 4 million patients cured using Pharco-produced antiviral medicines.",
  },
  {
    num: "03",
    title: "Environmental Responsibility",
    icon: Leaf,
    img: "/images/materials/Our%20Impact/Environmental%20Responsibility.jpg",
    body: "Energy-efficient manufacturing upgrades, waste reduction programmes and sustainable procurement practices across the 13-company group, measured against ISO 14001 systems.",
  },
  {
    num: "04",
    title: "Community Development",
    icon: Users,
    img: "/images/materials/Our%20Impact/Community%20Development.jpg",
    body: "Ongoing partnerships with NGOs and charitable organisations, educational sponsorships, health fairs and youth employment initiatives across Egypt and Pharco's export markets.",
  },
];

function PillarCard({ p, index }: { p: Pillar; index: number }) {
  const [ref, inView] = useReveal("-40px");
  const Icon = p.icon;
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      className="group relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-3xl bg-neutral-900"
    >
      <EditorialImage
        src={p.img}
        alt={p.title}
        w={620}
        h={760}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/5" />
      <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 p-7 text-white">
        <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-primary/90 backdrop-blur transition-transform duration-300 group-hover:scale-110" style={{ width: 52, height: 52 }}>
          <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold">{p.title}</h3>
        <div className="my-4 h-0.5 w-8 rounded-full bg-primary" />
        <div className="grid grid-rows-[1fr] transition-all duration-500 md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="text-[13.5px] leading-relaxed text-white/80">{p.body}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function CSRView() {
  const [introRef, introInView] = useReveal("-60px");
  const [hepRef, hepInView] = useReveal("-50px");
  const [schistoRef, schistoInView] = useReveal("-50px");
  const [publicRef, publicInView] = useReveal();
  const [pillarHeaderRef, pillarHeaderInView] = useReveal();
  const [ctaRef, ctaInView] = useReveal();

  // Parallax:intro section bg
  const introSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: introScroll } = useScroll({
    target: introSectionRef,
    offset: ["start end", "end start"],
  });
  const introBgY = useTransform(introScroll, [0, 1], ["-10%", "10%"]);

  // Parallax:hep C image
  const hepImgRef = useRef(null);
  const { scrollYProgress: hepScroll } = useScroll({
    target: hepImgRef,
    offset: ["start end", "end start"],
  });
  const hepImgY = useTransform(hepScroll, [0, 1], ["8%", "-8%"]);

  // Parallax:schisto image
  const schistoImgRef = useRef(null);
  const { scrollYProgress: schistoScroll } = useScroll({
    target: schistoImgRef,
    offset: ["start end", "end start"],
  });
  const schistoImgY = useTransform(schistoScroll, [0, 1], ["8%", "-8%"]);

  // Parallax:CSR pillars section bg
  const pillarSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: pillarScroll } = useScroll({
    target: pillarSectionRef,
    offset: ["start end", "end start"],
  });
  const pillarBgY = useTransform(pillarScroll, [0, 1], ["-12%", "12%"]);

  return (
    <>
      <InnerBanner
        bg="/images/impact.jpg"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About Pharco", href: "/about-our-story" },
          { label: "Our Impact & Responsibility" },
        ]}
        title={
          <>
            Our Impact &amp; <span className="accent">Responsibility</span>
          </>
        }
        lede="Pharco strengthens communities through responsible healthcare, environmental care and lasting social impact."
      />

      {/* HOW PHARCO MEASURES IMPACT */}
      <section
        ref={introSectionRef}
        className="py-12 bg-white overflow-hidden relative"
      >
        <motion.img
          src="/images/manifacure.jpg"
          alt=""
          aria-hidden="true"
          style={{ y: introBgY }}
          className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover opacity-[0.04] pointer-events-none"
        />
        <div className="relative max-w-[1280px] mx-auto px-4">
          <div
            ref={introRef}
            className="grid md:grid-cols-12 gap-10 lg:gap-16 items-start"
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE }}
              className="md:col-span-5"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.05]">
                How Pharco Measures{" "}
                <span className="text-primary">Impact</span>
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={introInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.45 }}
                style={{ originX: 0 }}
                className="h-1 w-16 bg-primary rounded-full mt-8"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              className="md:col-span-7"
            >
              <p className="text-neutral-600 leading-relaxed text-base">
                Pharco measures success beyond revenue and market share. For a
                pharmaceutical group built on the founding belief that quality
                healthcare should be accessible, impact is the point, not a
                side activity. CSR at Pharco is not a separate department. It is
                woven into how we manufacture, how we hire, and how we operate
                in every market we serve.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HEPATITIS C */}
      <section className="py-14 bg-[#f8f7f3] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <div
            ref={hepRef}
            className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center"
          >
            {/* Image:left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={hepInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.85, ease: EASE }}
              className="lg:col-span-5"
            >
              <div
                ref={hepImgRef}
                className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.22)]"
              >
                <motion.img
                  src="/images/3.jpg"
                  alt="Hepatitis C, A Public Health Milestone"
                  style={{ y: hepImgY }}
                  className="w-full h-[115%] object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="inline-flex items-center gap-2 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                    Hepatitis C
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Content:right */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={hepInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
              className="lg:col-span-7"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary leading-[1.05] mb-6">
                Hepatitis C:{" "}
                <span className="text-primary">A Public Health Milestone</span>
              </h2>
              <div className="h-1 w-16 bg-primary rounded-full mb-8" />
              <p className="text-neutral-600 leading-relaxed text-base">
                Pharco played a central role in Egypt&apos;s national Hepatitis
                C elimination programme. Through scientific partnership,
                manufacturing investment and regulatory navigation, the group
                brought direct-acting antiviral treatments to Egyptian patients
                at a fraction of the global market price. More than 4 million
                people have been cured using Pharco-produced antiviral medicines,
                one of the largest public health achievements in the
                region&apos;s history, and a model the group continues to apply
                to other neglected disease areas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SCHISTOSOMIASIS ELIMINATION */}
      <section className="py-14 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <div
            ref={schistoRef}
            className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center"
          >
            {/* Content:left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={schistoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.85, ease: EASE }}
              className="lg:col-span-7 lg:order-1"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary leading-[1.05] mb-6">
                Schistosomiasis{" "}
                <span className="text-primary">Elimination</span>
              </h2>
              <div className="h-1 w-16 bg-primary rounded-full mb-8" />
              <p className="text-neutral-600 leading-relaxed text-base">
                Schistosomiasis remains one of the most persistent neglected
                tropical diseases in Africa and the Middle East, affecting
                millions of people in rural and peri-urban communities across
                the regions Pharco serves. Building on the model that informed
                our role in Egypt&apos;s Hepatitis C programme, Pharco
                contributes to schistosomiasis elimination through affordable
                production of treatment courses, partnership with national health
                ministries, and collaboration with international NGOs working on
                mass drug administration campaigns. The aim is straightforward:
                extend access to safe, effective treatment in the geographies
                where the disease burden is highest. The work is ongoing,
                structured, and measured, country by country, programme by
                programme.
              </p>
            </motion.div>

            {/* Image:right */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={schistoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
              className="lg:col-span-5 lg:order-2"
            >
              <div
                ref={schistoImgRef}
                className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.22)]"
              >
                <motion.img
                  src="/images/inners/Schistosomiasis%20Image%20(%20impact%20and%20csr%20).png"
                  alt="Schistosomiasis Elimination Programme"
                  style={{ y: schistoImgY }}
                  className="w-full h-[115%] object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="inline-flex items-center gap-2 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                    Schistosomiasis
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PUBLIC HEALTH ROLE */}
      <section className="py-10 bg-[#f8f7f3] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <div
            ref={publicRef}
            className="grid md:grid-cols-12 gap-10 lg:gap-16 items-start"
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={publicInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE }}
              className="md:col-span-5"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-secondary leading-[1.1]">
                Public Health <span className="text-primary">Role</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={publicInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              className="md:col-span-7"
            >
              <p className="text-neutral-600 leading-relaxed text-base">
                Beyond specific disease programmes, Pharco contributes to public
                health through medicine availability and affordable access in
                markets where supply is fragile. From essential-medicine pricing
                in low-income markets to expedited regulatory submissions during
                outbreaks, the corporation aligns its commercial decisions with
                public health outcomes, a position consistent with the
                founder&apos;s original brief: that healthcare should not depend
                on geography.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOUR CSR PILLARS */}
      <section ref={pillarSectionRef} className="overflow-hidden relative py-20 bg-[#f4f2eb]">
        {/* Full-height parallax bg image — kept visible under a light wash */}
        <motion.img
          src="/images/inners/Global-Presence-banner.jpg"
          alt=""
          aria-hidden="true"
          style={{ y: pillarBgY }}
          className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover object-center"
        />
        {/* Light wash keeps the photo visible while staying bright */}
        <div className="absolute inset-0 bg-[#f4f2eb]/80" />

        <div className="relative max-w-[1280px] mx-auto px-4">
          <motion.div
            ref={pillarHeaderRef}
            initial={{ opacity: 0, y: 32 }}
            animate={pillarHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.05]">
              Corporate Social Responsibility{" "}
              <span className="text-primary">at Pharco</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((p, i) => (
              <PillarCard key={p.num} p={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* DARK CTA */}
      <section className="py-16 bg-[#1a1a1a] overflow-hidden">
        <div className="max-w-[1080px] mx-auto px-4">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center"
          >
            <h3 className="text-white text-3xl md:text-4xl font-bold mb-4">
              Partner with us on <span className="text-primary">impact</span>
            </h3>
            <p className="text-white/55 text-sm leading-relaxed max-w-xl mx-auto mb-10">
              Public health authorities, NGOs and academic partners: Pharco is
              open to collaboration that makes medicines more accessible.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CTALink href="/contact" variant="dark">
                Get in touch
              </CTALink>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
