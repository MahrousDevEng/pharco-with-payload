"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Pill,
  Droplets,
  PackageOpen,
  Wind,
  Syringe,
  CircleDot,
  ShieldAlert,
  TestTubes,
  FlaskRound,
  FlaskConical,
  PillBottle,
  PawPrint,
  ShieldCheck,
  Globe,
  Award,
  Network,
  MapPin,
  Phone,
  Mail,
  Download,
  Upload,
  Users,
  Truck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import InnerBanner from "@/components/InnerBanner";
import CTALink from "@/components/CTALink";
import { Counter } from "@/components/inner/Counter";
import EditorialImage from "@/components/editorial/EditorialImage";
import { IMG } from "@/lib/editorialImages";

function useReveal(margin: `${number}${"px" | "%"}` = "-80px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView] as const;
}

const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// Production-line imagery for the dosage-form cards (1:1 with the list below).
const PL = "/images/materials/Manufacturing/Production%20Lines";
const DOSAGE_IMAGES = [
  IMG.pills, // Solid Dosage Forms (no dedicated photo)
  `${PL}/Liquid%20Dosage%20Forms.jpg`,
  `${PL}/SemiSolid%20Dosage%20Forms.jpg`,
  `${PL}/Nasal%20Spray.jpg`,
  `${PL}/B-Lactam_%20Solid.jpg`,
  `${PL}/B-Lactam_%20Vials.jpg`,
  `${PL}/Carbapenems%20%26%20Cephalosporins_%20Solid.jpg`,
  `${PL}/Cephalosporin%20%26%20Carbapenem%20Vials.jpg`,
  `${PL}/Water%20for%20Injection.jpg`,
  IMG.research, // Sterile Small Volume Ampoules (no dedicated photo)
  `${PL}/Hormonal%20Solid%20Dosage%20Forms.jpg`,
  IMG.lab, // Veterinary Solid & Liquid Forms (no dedicated photo)
  `${PL}/Large%20Volume%20Vials.jpg`,
  IMG.productionLine, // Injection Dosage Forms (no dedicated photo)
  `${PL}/Soft%20Gel%20Capsules.jpg`,
];

// Tints derived only from primary (#e07e27) + secondary (#55565a)
const DOSAGE_TINTS = ["#fbeede", "#edeeef"];

const DOSAGE_FORMS = [
  { h: "Solid Dosage Forms", sub: "Oral Solid", p: "Tablets, hard gelatin capsules, and soft gelatin capsules", icon: Pill },
  { h: "Liquid Dosage Forms", sub: "Oral Liquid", p: "Syrups, suspensions, oral drops, nasal drops, and topical drops", icon: Droplets },
  { h: "Semi-Solid Dosage Forms", sub: "Topical", p: "Creams, ointments, gels, and suppositories", icon: PackageOpen },
  { h: "Nasal Spray", sub: "Respiratory", p: "Metered-dose and unit-dose nasal spray preparations", icon: Wind },
  { h: "Beta-Lactam: Solid", sub: "Beta-Lactam", p: "Penicillin tablets, hard gelatin capsules, and powder-filled bottles, dedicated segregated suite", icon: ShieldAlert },
  { h: "Beta-Lactam: Vials", sub: "Beta-Lactam", p: "Penicillin sterile injectable vials", icon: FlaskConical },
  { h: "Carbapenems & Cephalosporins: Solid", sub: "Containment", p: "Tablets, hard gelatin capsules, and powder-filled bottles", icon: TestTubes },
  { h: "Cephalosporin & Carbapenem Vials", sub: "Containment", p: "Sterile injectable vials", icon: FlaskConical },
  { h: "Water for Injection", sub: "Sterile", p: "Highly purified sterile water, dedicated production facility (est. 2010)", icon: FlaskRound },
  { h: "Sterile Small Volume Ampoules", sub: "Sterile", p: "Aseptically filled glass ampoules", icon: Syringe },
  { h: "Hormonal Solid Dosage Forms", sub: "Hormonal", p: "Tablets and soft gelatin capsules, dedicated hormonal manufacturing suite (est. 2012)", icon: CircleDot },
  { h: "Veterinary Solid & Liquid Forms", sub: "Veterinary", p: "Tablets, capsules, syrups, and suspensions for veterinary applications", icon: PawPrint },
  { h: "Large Volume Vials", sub: "Sterile", p: "IV solutions and large-volume injectable preparations (est. 2013)", icon: Droplets },
  { h: "Injection Dosage Forms", sub: "Sterile", p: "Sterile injectable products across multiple pack formats", icon: Syringe },
  { h: "Soft Gel Capsules", sub: "Soft Gel", p: "Soft gelatin capsule manufacturing for nutraceutical and pharmaceutical applications", icon: PillBottle },
];

const GROUP_COMPANIES = [
  { h: "Pharco Pharmaceuticals", p: "Core branded generics manufacturing, solid, liquid, semi-solid and sterile dosage forms for Egypt and export markets.", img: "/images/materials/Companies/Pharco.jpg" },
  { h: "Amriya Pharmaceuticals", p: "Multi-dosage-form pharmaceutical manufacturing, cephalosporins, solid and liquid forms, with strong CMO track record.", img: "/images/materials/Companies/Amriya.jpg" },
  { h: "Pharco B International", p: "Export-focused pharmaceutical manufacturing for international CMO partners and Pharco's own export portfolio.", img: "/images/materials/Companies/Pharco%20B.jpg" },
  { h: "European Pharmaceuticals (EEPT)", p: "EU-standard pharmaceutical manufacturing, regional and export markets supported by EU-GMP-aligned production.", img: "/images/materials/Companies/European.jpg" },
  { h: "Techno Pharmaceuticals", p: "Specialised therapeutic manufacturing, including hormonal, complex generic and high-containment dosage forms.", img: "/images/materials/Companies/Techno.jpg" },
  { h: "Safe Pharma", p: "Quality-focused pharmaceutical manufacturing across multiple dosage forms, with safety-first operational systems.", img: "/images/materials/Companies/Safe.jpg" },
];

const REGULATORS = [
  { name: "WHO", logo: "/images/Certifcate/WHO_logo.png" },
  { name: "EDA", logo: "https://www.google.com/s2/favicons?domain=edaegypt.gov.eg&sz=128" },
  { name: "SFDA", logo: "/images/Certifcate/SFDA.png" },
  { name: "UAE MOHAP", logo: "https://www.google.com/s2/favicons?domain=mohap.gov.ae&sz=128" },
  { name: "Oman MOH", logo: "/images/Certifcate/Oman.png" },
  { name: "NHRA", logo: "/images/Certifcate/Nhra-01.png" },
  { name: "GHC", logo: "/images/Certifcate/GHC.png" },
  { name: "JFDA", logo: "https://www.google.com/s2/favicons?domain=jfda.jo&sz=128" },
  { name: "ANVISA", logo: "/images/Certifcate/ANVISA.png" },
  { name: "TFDA", logo: "/images/Certifcate/tanzania-food-drugs-authority-tfda-seeklogo-01.png" },
  { name: "EFDA", logo: "https://www.google.com/s2/favicons?domain=efda.gov.et&sz=128" },
  { name: "ANMDMR", logo: "https://www.google.com/s2/favicons?domain=anm.ro&sz=128" },
  { name: "DPML", logo: "https://www.google.com/s2/favicons?domain=sante.gouv.ci&sz=128" },
];

const PILLARS = [
  { code: "IN", icon: Download, h: "Licensing In", p: "We actively license in compounds, formulations and registered dossiers from international partners for development and commercialisation across our markets." },
  { code: "OUT", icon: Upload, h: "Licensing Out", p: "We offer licensing opportunities for selected Pharco products to qualified partners in markets where we do not have direct operations." },
  { code: "CO", icon: Users, h: "Co-Development", p: "We are open to co-development agreements where both parties bring complementary expertise, scientific capability, and market access." },
  { code: "DIST", icon: Truck, h: "Distribution", p: "Pharco products reach patients across Africa, the Middle East, Europe, Asia, and Latin America. Our global presence is built on decades of regulatory expertise, 10 global scientific offices, and partnerships with more than 100 distributors worldwide. We are Egypt's 2nd largest pharmaceutical exporter, and we are still growing." },
];

const ALLIANCE_PARTNERS = [
  {
    category: "Research & Development",
    partners: [
      { name: "Chemelctiva", url: "https://www.chemelctiva.com", logo: "/images/Chemelctiva.png" },
      { name: "SeegPharm", url: "https://www.seegpharm.com", logo: "/images/seegpharma.png" },
      { name: "DNDi", url: "https://dndi.org", logo: "/images/DNDi_Logo_No-Tagline_Full-Colour.svg" },
      { name: "Presidio Pharmaceuticals", url: "https://www.presidiopharmaceuticals.com", logo: "/images/Presidio%20Pharmaceuticals.png" },
      { name: "University of Michigan", url: "https://www.umich.edu", logo: "/images/University-of-Michigan-Logo.jpg" },
    ],
  },
  {
    category: "Manufacturing & Licensing",
    partners: [
      { name: "Boehringer Ingelheim", url: "https://www.boehringer-ingelheim.com" },
      { name: "Doppelherz", url: "https://www.doppelherz.de" },
      { name: "GSK", url: "https://www.gsk.com" },
      { name: "Chemo", url: "https://www.chemogroup.com" },
      { name: "Sandoz", url: "https://www.sandoz.com" },
      { name: "Synthon", url: "https://www.synthon.com" },
      { name: "Sun Pharma", url: "https://www.sunpharma.com" },
      { name: "Macleods", url: "https://www.macleodspharma.com" },
    ],
  },
  {
    category: "Regional & Distribution",
    partners: [
      { name: "Batterjee Pharma", url: "https://www.batterjeepharma.com", logo: "/images/batterjeepharma.png" },
      { name: "ZIMMO", url: "https://www.zimmo.sa", logo: "/images/zimmo.png" },
      { name: "Al-Madina", url: "https://almadinapharma.com" },
      { name: "SPIMACO", url: "https://www.spimaco.com.sa" },
      { name: "Tamer", url: "https://www.tamergroup.com" },
      { name: "SAJA", url: "https://www.sajapharma.com" },
    ],
  },
];

const WHY_REASONS = [
  { icon: Award, h: "Proven Track Record", p: "Trusted CMO partner for eight multinational pharmaceutical companies, with a quality, regulatory and delivery record built across two decades." },
  { icon: Globe, h: "Regulatory Breadth", p: "Products registered in 70+ countries. Active regulatory affairs across MENA, Africa, Europe, Latin America and Asia Pacific." },
  { icon: ShieldCheck, h: "Certified Quality Systems", p: "EU-GMP, WHO-GMP, PIC/S and ISO certified. All facilities subject to routine international regulatory inspection and audit." },
  { icon: PackageOpen, h: "Full Dosage Form Coverage", p: "Solid oral, sterile injectables, hormonal products, large-volume parenterals, soft gels and more, under one corporation." },
  { icon: Network, h: "Fully Integrated Group", p: "From API supply (PBIC) to finished product to distribution, Pharco offers end-to-end CMO support most independent CMOs cannot match." },
  { icon: MapPin, h: "Regional Expertise", p: "Decades of operating experience across MENA, Africa and GCC markets, including local regulatory timelines, dossier requirements and market dynamics." },
];

/* ─── Sub-components ──────────────────────────────────────────── */

function StatTile({ index, inView, numeric, value, suffix, text, label }: {
  index: number; inView: boolean; numeric: boolean; value?: number; suffix?: string; text?: string; label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl border border-neutral-200 p-7 text-center hover:border-primary/50 hover:shadow-md transition-all duration-300"
    >
      <div className="text-4xl md:text-5xl font-black text-primary leading-none mb-3">
        {numeric && value !== undefined
          ? inView ? <Counter to={value} suffix={suffix || ""} /> : "0"
          : <span className="text-2xl md:text-3xl">{text}</span>}
      </div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-secondary leading-snug">{label}</p>
    </motion.div>
  );
}

function DosageCard({ d, index }: { d: (typeof DOSAGE_FORMS)[0]; index: number }) {
  const Icon = d.icon;
  const img = DOSAGE_IMAGES[index % DOSAGE_IMAGES.length];
  const tint = DOSAGE_TINTS[index % DOSAGE_TINTS.length];
  return (
    <div
      style={{ backgroundColor: tint }}
      className="group flex w-[280px] shrink-0 snap-start flex-col rounded-[28px] p-5 sm:w-[310px]"
    >
      {/* tag pill + icon button */}
      <div className="mb-7 flex items-start justify-between">
        <span className="inline-flex items-center rounded-full bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary">
          {d.sub}
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-white transition-transform duration-300 group-hover:rotate-12">
          <Icon className="h-4 w-4" strokeWidth={1.8} />
        </span>
      </div>

      {/* title + copy */}
      <h3 className="text-xl font-bold leading-tight text-secondary">{d.h}</h3>
      <p className="mb-6 mt-3 text-[13.5px] leading-relaxed text-neutral-600">
        {d.p}
      </p>

      {/* photo */}
      <div className="relative mt-auto aspect-[4/3] overflow-hidden rounded-[20px]">
        <EditorialImage
          src={img}
          alt={d.h}
          w={520}
          h={400}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-105"
        />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-secondary backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          GMP qualified
        </span>
      </div>
    </div>
  );
}

/* ─── Production lines stories carousel ──────────────────────────── */
function DosageStories() {
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

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) scrollByCards(1);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-14 bg-gradient-to-br from-[#fdf9f5] via-white to-[#f4f2eb] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.1]">
              Production <span className="text-primary">Lines</span>
            </h2>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                aria-label="Previous production line"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-secondary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                aria-label="Next production line"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-secondary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <p className="text-neutral-500 leading-relaxed text-sm max-w-3xl mt-6">
            Our manufacturing facilities span every major pharmaceutical dosage
            form. Each production line is qualified, validated, and continuously
            monitored to meet the requirements of domestic and international
            regulatory authorities, from the Egyptian Drug Authority to the WHO,
            EU GMP inspectors, and the Saudi SFDA.
          </p>
        </motion.div>
      </div>

      <div
        ref={scrollRef}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ml-4 lg:ml-[max(1rem,calc((100vw-1280px)/2+1rem))]"
      >
        {DOSAGE_FORMS.map((d, i) => (
          <DosageCard key={d.h} d={d} index={i} />
        ))}
      </div>
    </section>
  );
}

function GroupCard({ g }: { g: (typeof GROUP_COMPANIES)[0] }) {
  return (
    <div className="group relative flex-none w-[300px] sm:w-[340px] h-[420px] rounded-2xl overflow-hidden snap-start cursor-pointer">
      {/* Image with zoom on hover */}
      <EditorialImage
        src={g.img}
        alt={g.h}
        w={680}
        h={840}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Default: name — fades out on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-3">
        <h4 className="text-white font-bold text-xl leading-snug">{g.h}</h4>
      </div>

      {/* Hover panel: slides up */}
      <div className="absolute inset-0 bg-black/80 p-6 flex flex-col justify-end translate-y-full group-hover:translate-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
        <h4 className="text-white font-bold text-xl leading-snug mb-3">{g.h}</h4>
        <div className="w-8 h-0.5 bg-primary mb-3 rounded-full" />
        <p className="text-white/80 text-sm leading-relaxed">{g.p}</p>
      </div>
    </div>
  );
}

/* ─── Group companies stories carousel ───────────────────────────── */
function GroupStories() {
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
      el.scrollBy({ left: dir * 360, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) scrollByCards(1);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-20 bg-[#0f0f0f] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-[1.05]">
              Group Manufacturing <span className="text-primary">Companies</span>
            </h2>
            <div className="flex gap-3 shrink-0">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                aria-label="Previous company"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 hover:border-primary hover:bg-primary"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                aria-label="Next company"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 hover:border-primary hover:bg-primary"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <p className="text-white/55 leading-relaxed text-base max-w-3xl mt-6">
            Pharco&apos;s CMO offering is delivered across six dedicated
            pharmaceutical manufacturing companies, each with distinct
            capabilities and regulatory approvals.
          </p>
        </motion.div>
      </div>

      <div
        ref={scrollRef}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ml-4 lg:ml-[max(1rem,calc((100vw-1280px)/2+1rem))]"
      >
        {GROUP_COMPANIES.map((g) => (
          <GroupCard key={g.h} g={g} />
        ))}
      </div>
    </section>
  );
}

function RegulatorBadge({ name, logo }: { name: string; logo: string }) {
  const [broken, setBroken] = useState(false);
  if (logo && !broken) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo}
        alt={name}
        onError={() => setBroken(true)}
        className="h-10 max-w-[110px] object-contain opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300"
      />
    );
  }
  return (
    <div className="px-4 py-2 rounded-full border border-neutral-200 bg-neutral-50 opacity-70 hover:opacity-100 hover:border-primary/40 transition-all duration-300 whitespace-nowrap">
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">{name}</span>
    </div>
  );
}

function CertStrip() {
  const items = [...REGULATORS, ...REGULATORS];
  return (
    <section className="py-8 bg-white border-y border-neutral-100 overflow-hidden">
      <style>{`
        @keyframes certmarquee { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .cert-track { animation: certmarquee 42s linear infinite; }
      `}</style>
      <div className="flex">
        <div className="cert-track flex gap-12 items-center">
          {items.map((r, i) => (
            <div key={i} className="flex items-center shrink-0 px-2">
              <RegulatorBadge name={r.name} logo={r.logo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function hostOf(url: string) {
  try {
    if (!url || url === "#") return "";
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function AllianceBadge({
  name,
  url,
  logo,
}: {
  name: string;
  url: string;
  logo?: string;
}) {
  const host = hostOf(url);
  const [broken, setBroken] = useState(false);
  // Prefer a local logo from the images folder; otherwise fall back to the site favicon.
  const src =
    logo ||
    (host ? `https://www.google.com/s2/favicons?domain=${host}&sz=128` : "");

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex shrink-0 items-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-4 transition-all duration-300 hover:border-primary hover:shadow-md"
    >
      {src && !broken && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          onError={() => setBroken(true)}
          className="h-9 w-9 shrink-0 rounded object-contain"
        />
      )}
      <span className="whitespace-nowrap text-sm font-semibold text-neutral-600 transition-colors duration-300 group-hover:text-primary">
        {name}
      </span>
    </a>
  );
}

function AllianceRow({
  partners,
  reverse,
}: {
  partners: { name: string; url: string; logo?: string }[];
  reverse?: boolean;
}) {
  const items = [...partners, ...partners];
  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex w-max items-center gap-3 ${reverse ? "alliance-track-rev" : "alliance-track"}`}
      >
        {items.map((p, i) => (
          <AllianceBadge key={`${p.name}-${i}`} name={p.name} url={p.url} logo={p.logo} />
        ))}
      </div>
    </div>
  );
}

function PillarCard({ p, index }: { p: (typeof PILLARS)[0]; index: number }) {
  const [ref, inView] = useReveal("-40px");
  const Icon = p.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE_OUT }}
      className="group relative overflow-hidden rounded-2xl border border-white/35 bg-white/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-white/30"
    >
      {/* Left accent bar — grows on hover */}
      <span className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100" />

      <div className="relative z-10 p-7">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/30 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary">
          <Icon className="h-7 w-7 text-white transition-colors duration-300 group-hover:text-white" strokeWidth={1.5} />
        </div>
        <h4 className="mb-3 text-lg font-bold text-white">{p.h}</h4>
        <div className="mb-4 h-0.5 w-8 rounded-full bg-primary transition-all duration-300 group-hover:w-12" />
        <p className="text-sm leading-relaxed text-white/80 transition-colors duration-300 group-hover:text-white">{p.p}</p>
      </div>
    </motion.div>
  );
}

function ReasonCard({ r, index }: { r: typeof WHY_REASONS[0]; index: number }) {
  const [ref, inView] = useReveal("-30px");
  const Icon = r.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      className="group rounded-2xl bg-neutral-50 p-6 border border-neutral-100 transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:-translate-y-1"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
        <Icon className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-white" strokeWidth={1.6} />
      </div>
      <h4 className="mb-2.5 text-lg font-bold text-secondary">{r.h}</h4>
      <p className="text-sm leading-relaxed text-neutral-600">{r.p}</p>
    </motion.div>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */

export default function ManufacturingView() {
  const [statsRef, statsInView] = useReveal("-30px");
  const [introRef, introInView] = useReveal("-60px");
  const [partnersRef, partnersInView] = useReveal();
  const [alliancesRef, alliancesInView] = useReveal();
  const [whyHeaderRef, whyHeaderInView] = useReveal();
  const [ctaRef, ctaInView] = useReveal();

  // Parallax:licensing section
  const licensingSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: licensingScroll } = useScroll({ target: licensingSectionRef, offset: ["start end", "end start"] });
  const licensingBgY = useTransform(licensingScroll, [0, 1], ["-12%", "12%"]);

  return (
    <>
      <InnerBanner
        bg="/images/inners/Manufacturing-banner.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Science & Operations" }, { label: "Manufacturing" }]}
        title={<>Pharmaceutical <span className="accent">Manufacturing</span></>}
        lede="Built to international standards. Designed for partnership."
      />

      {/* STAT STRIP */}
      <section ref={statsRef} className="py-12 bg-[#f4f2eb]">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <StatTile index={0} inView={statsInView} numeric value={1.6} suffix="M" label="Packs per day" />
            <StatTile index={1} inView={statsInView} numeric value={8} label="Multinational CMO partners" />
            <StatTile index={2} inView={statsInView} numeric={false} text="WHO-GMP" label="& EU-GMP Certified" />
            <StatTile index={3} inView={statsInView} numeric={false} text="2nd" label="Largest pharma exporter" />
            <StatTile index={4} inView={statsInView} numeric value={70} suffix="+" label="Countries" />
          </div>
        </div>
      </section>

      {/* CERT STRIP */}
      <CertStrip />

      {/* ① BUILT TO THE HIGHEST STANDARDS:intro with image */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <div ref={introRef} className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -48 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE_OUT }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-secondary leading-[1.1] mb-6">
                Built to the Highest Standards.<br /><span className="text-primary">Made to Last.</span>
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={introInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
                style={{ originX: 0 }}
                className="h-1 w-16 bg-primary rounded-full mb-8"
              />
              <p className="text-neutral-600 leading-relaxed mb-5">
                Pharco operates one of the most comprehensive pharmaceutical manufacturing platforms in MENA, with a production capacity of 1.6 million packs per day, WHO-GMP and EU-GMP certified facilities, and active CMO partnerships with 8 multinational pharmaceutical companies.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Pharmaceutical manufacturing is the operational core of Pharco Corporation. The group operates multiple manufacturing facilities across Egypt, with the capacity, regulatory readiness, and dosage-form breadth to support both its 350+ branded generics portfolio and its contract manufacturing commitments. Our operations are aligned with PIC/S standards and certified under ISO 9001, ISO 14001, ISO 45001, and ISO 17025, enabling compliance and submissions across more than 60 international markets.
              </p>
            </motion.div>

            {/* Image panel */}
            <motion.div
              initial={{ opacity: 0, x: 48, scale: 0.97 }}
              animate={introInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.3)]">
                <EditorialImage
                  src="/images/materials/Manufacturing/Manufacturing-inner%20image.jpg"
                  alt="Pharco manufacturing facility"
                  w={900}
                  h={675}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Floating badge:bottom left */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={introInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -bottom-5 -left-5 bg-primary text-white rounded-2xl px-6 py-4 shadow-xl"
              >
                <div className="text-3xl font-black leading-none">1.6M</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] mt-1 text-white/80">Packs per day</div>
              </motion.div>

              {/* Floating badge:top right */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={introInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.85 }}
                className="absolute -top-5 -right-5 bg-white rounded-2xl px-5 py-3.5 shadow-xl border border-neutral-100"
              >
                <div className="text-xs font-black uppercase tracking-[0.15em] text-secondary">WHO-GMP</div>
                <div className="text-[10px] text-neutral-500 mt-0.5">&amp; EU-GMP Certified</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ② PRODUCTION LINES — editorial story carousel */}
      <DosageStories />

      {/* ③ LICENSING & PARTNERSHIP OPPORTUNITIES:parallax */}
      <section ref={licensingSectionRef} className="relative py-24 overflow-hidden">
        <motion.img
          src="/images/inners/Product-overview-banner.jpg"
          alt=""
          aria-hidden="true"
          style={{ y: licensingBgY }}
          className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4">
          <motion.div
            ref={partnersRef}
            initial={{ opacity: 0, y: 32 }}
            animate={partnersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mb-14"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-6">
              Licensing &amp; <span className="text-primary">Partnership Opportunities</span>
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={partnersInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{ originX: 0 }}
              className="h-1 w-16 bg-primary rounded-full"
            />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((p, i) => <PillarCard key={p.code} p={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ④ STRATEGIC ALLIANCES & PARTNERSHIPS */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <motion.div
            ref={alliancesRef}
            initial={{ opacity: 0, y: 32 }}
            animate={alliancesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mb-14"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.05] mb-6">
              Strategic Alliances &amp; <span className="text-primary">Partnerships</span>
            </h2>
            <p className="text-neutral-600 leading-relaxed text-base">
              Pharco&apos;s network of strategic alliances is one of the group&apos;s most valuable assets. Over decades, we have built partnerships with academic institutions, global pharmaceutical companies, NGOs, and regional distributors, all aligned around the shared goal of getting better medicines to more patients.
            </p>
          </motion.div>

          <style>{`
            @keyframes alliancemarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            @keyframes alliancemarquee-rev { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
            .alliance-track { animation: alliancemarquee 38s linear infinite; }
            .alliance-track-rev { animation: alliancemarquee-rev 38s linear infinite; }
            .alliance-row:hover .alliance-track,
            .alliance-row:hover .alliance-track-rev { animation-play-state: paused; }
          `}</style>
          <div className="space-y-8">
            {ALLIANCE_PARTNERS.map((cat, ci) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: ci * 0.1 }}
                className="alliance-row"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary mb-4">{cat.category}</p>
                <AllianceRow partners={cat.partners} reverse />
              </motion.div>
            ))}
          </div>

          <div className="mt-14 pt-10 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-1">Partnership Enquiries</p>
              <p className="text-neutral-600 text-sm">Interested in exploring a partnership with Pharco? Contact our Business Development team.</p>
            </div>
            <a
              href="mailto:Portfolio@pharco-corp.com"
              className="shrink-0 inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors duration-300"
            >
              Portfolio@pharco-corp.com
            </a>
          </div>
        </div>
      </section>

      {/* ⑤ GROUP MANUFACTURING COMPANIES — carousel (dark) */}
      <GroupStories />

      {/* ⑥ WHY PARTNER WITH PHARCO — image + feature grid */}
      <section className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <motion.div
            ref={whyHeaderRef}
            initial={{ opacity: 0, y: 32 }}
            animate={whyHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.1]">
              Why Partner with <span className="text-primary">Pharco?</span>
            </h2>
          </motion.div>

          <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
            {/* Left: large image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={whyHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="relative min-h-[320px] overflow-hidden rounded-3xl"
            >
              <EditorialImage
                src="/images/materials/Manufacturing/Why%20Partner%20with%20Pharco.jpg"
                alt="Pharco scientific and manufacturing partnership"
                w={900}
                h={1000}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>

            {/* Right: 2-column feature grid */}
            <div className="grid gap-5 sm:grid-cols-2">
              {WHY_REASONS.map((r, i) => <ReasonCard key={r.h} r={r} index={i} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ⑦ MANUFACTURING ENQUIRIES:CTA */}
      <section className="relative py-20 bg-[#111] overflow-hidden">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-primary/40 to-transparent blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-3xl" />
        </div>
        <div ref={ctaRef} className="max-w-[1280px] mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h3 className="text-white text-3xl md:text-4xl font-bold mb-4 leading-tight">Manufacturing <span className="text-primary">Enquiries</span></h3>
            <p className="text-white/55 text-sm leading-relaxed">
              Whether you are exploring a contract manufacturing partnership, evaluating licensing opportunities, or scoping a specific production requirement, Pharco&apos;s Business Development team is ready to talk.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto"
          >
            <a
              href="https://www.google.com/maps/search/?api=1&query=Plot+208%2C+North+90+St.%2C+5th+Settlement%2C+New+Cairo%2C+Egypt"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-primary/50 rounded-2xl p-5 flex items-start gap-3 transition-all duration-300"
            >
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.6} />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary mb-1.5">Address</div>
                <div className="text-white/80 group-hover:text-white text-xs leading-relaxed transition-colors">Plot 208, North 90 St., 5th Settlement, New Cairo, Egypt</div>
              </div>
            </a>
            <a
              href="tel:+20281384223344"
              className="group bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-primary/50 rounded-2xl p-5 flex items-start gap-3 transition-all duration-300"
            >
              <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.6} />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary mb-1.5">Phone</div>
                <div className="text-white/80 group-hover:text-white text-xs leading-relaxed transition-colors">+20 28138422 (33) (44)</div>
              </div>
            </a>
            <a
              href="mailto:Portfolio@pharco-corp.com?subject=Manufacturing%20Enquiry"
              className="group bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-primary/50 rounded-2xl p-5 flex items-start gap-3 transition-all duration-300"
            >
              <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.6} />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary mb-1.5">Email</div>
                <div className="text-white/80 group-hover:text-white text-xs leading-relaxed break-all transition-colors">Portfolio@pharco-corp.com</div>
              </div>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <CTALink href="/contact" variant="dark">Contact Business Development</CTALink>
          </motion.div>
        </div>
      </section>
    </>
  );
}
