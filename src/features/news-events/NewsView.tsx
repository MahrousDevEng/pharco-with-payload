"use client";
import { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Calendar,
  MapPin,
  Tag,
  Building2,
  Filter,
  ArrowUpRight,
  Newspaper,
  CalendarDays,
  Globe,
  ChevronRight,
} from "lucide-react";
import InnerBanner from "@/components/InnerBanner";
import CTALink from "@/components/CTALink";
import EditorialImage from "@/components/editorial/EditorialImage";
import { IMG } from "@/lib/editorialImages";

const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// Build a sized Unsplash URL for CSS background usage.
const bg = (base: string) => `${base}?auto=format&fit=crop&w=1200&q=70`;

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function useReveal(margin: `${number}${"px" | "%"}` = "-80px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView] as const;
}

/* ------------------------------- DATA --------------------------------- */

type NewsItem = {
  date: string;
  year: string;
  topic: "Corporate" | "R&D" | "Manufacturing" | "Markets" | "CSR" | "Awards";
  unit: "Pharco Corporation" | "Pharco B International" | "BGP" | "PBIC";
  title: string;
  summary: string;
  image: string;
  featured?: boolean;
};

const NEWS: NewsItem[] = [
  {
    date: "14 March 2025",
    year: "2025",
    topic: "Manufacturing",
    unit: "Pharco Corporation",
    title: "Pharco International Manufacturing Plant Opens in Saudi Arabia",
    summary:
      "Pharco Corporation today announced the opening of its first international manufacturing facility, Pharco International, located in Saudi Arabia. The plant marks a strategic step in Pharco's expansion into GCC-based pharmaceutical production and will serve markets across the Gulf, MENA, and beyond.",
    image: bg(IMG.plant),
    featured: true,
  },
  {
    date: "22 January 2025",
    year: "2025",
    topic: "R&D",
    unit: "Pharco Corporation",
    title: "Pharco Renews Research Collaboration with University of Michigan",
    summary:
      "Pharco Corporation has extended its multi-year research collaboration with the University of Michigan, focusing on complex generics development and bioequivalence research. The partnership underpins Pharco's expanding pipeline across antimicrobial, oncology, and cardiometabolic therapeutic areas.",
    image: bg(IMG.research),
  },
  {
    date: "8 November 2024",
    year: "2024",
    topic: "CSR",
    unit: "Pharco Corporation",
    title: "Pharco Marks Public Health Milestone in Hepatitis C Programme",
    summary:
      "Pharco Corporation marked another milestone in Egypt's national Hepatitis C elimination programme this month, with the cumulative number of patients treated using Pharco-produced antivirals now exceeding four million, one of the largest public health achievements in the region's history.",
    image: bg(IMG.care),
  },
];

type EventItem = {
  date: string;
  status: "Upcoming" | "Past";
  type: "Conference" | "Trade show" | "Partner Event" | "Campaign" | "Activation";
  region: "Egypt" | "MENA" | "Africa" | "Europe" | "Asia" | "Latin America" | "GCC";
  name: string;
  description: string;
  image: string;
};

const EVENTS: EventItem[] = [
  {
    date: "17 to 20 June 2025",
    status: "Upcoming",
    type: "Conference",
    region: "Europe",
    name: "CPHI Worldwide, Frankfurt",
    image: IMG.meeting,
    description:
      "Pharco will exhibit at CPHI Worldwide 2025 in Frankfurt, showcasing its contract manufacturing platform, branded generics portfolio, and licensing opportunities to international pharmaceutical partners. Visit the Pharco stand to meet our Business Development team.",
  },
  {
    date: "12 May 2025",
    status: "Upcoming",
    type: "Partner Event",
    region: "GCC",
    name: "Pharco GCC Distributor Summit, Dubai",
    image: IMG.handshake,
    description:
      "Pharco's annual GCC Distributor Summit brings together regional distribution partners, regulatory teams, and Pharco's commercial leadership for a two-day strategy and product update programme, held this year in Dubai.",
  },
  {
    date: "9 March 2025",
    status: "Past",
    type: "Campaign",
    region: "Egypt",
    name: "World Hepatitis Day Public Health Activation",
    image: IMG.care,
    description:
      "Pharco partnered with Egyptian health authorities to deliver a series of free screening events and public-health communications across five governorates, reinforcing the country's continued progress in Hepatitis C elimination.",
  },
];

const YEARS = ["All", "2025", "2024"];
const TOPICS: Array<"All" | NewsItem["topic"]> = [
  "All",
  "Corporate",
  "R&D",
  "Manufacturing",
  "Markets",
  "CSR",
  "Awards",
];
const UNITS: Array<"All" | NewsItem["unit"]> = [
  "All",
  "Pharco Corporation",
  "Pharco B International",
  "BGP",
  "PBIC",
];

const EVENT_TIMES: Array<"All" | EventItem["status"]> = ["All", "Upcoming", "Past"];
const EVENT_REGIONS: Array<"All" | EventItem["region"]> = [
  "All",
  "Egypt",
  "MENA",
  "Africa",
  "Europe",
  "Asia",
  "Latin America",
  "GCC",
];
const EVENT_TYPES: Array<"All" | EventItem["type"]> = [
  "All",
  "Conference",
  "Trade show",
  "Partner Event",
  "Campaign",
  "Activation",
];

const TABS = [
  { key: "news", label: "All News", icon: Newspaper },
  { key: "press", label: "Press Releases", icon: Tag },
  { key: "events", label: "Events", icon: CalendarDays },
] as const;
type TabKey = (typeof TABS)[number]["key"];

/* --------------------------- COMPONENTS ------------------------------- */

function FilterDropdown({
  label,
  icon: Icon,
  options,
  value,
  onChange,
}: {
  label: string;
  icon: typeof Filter;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-neutral-200 hover:border-primary/60 transition-colors duration-200 text-sm text-secondary"
      >
        <Icon className="w-4 h-4 text-primary" strokeWidth={1.7} />
        <span className="text-neutral-500 text-xs uppercase tracking-wider font-bold">{label}:</span>
        <span className="font-medium">{value}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight className="w-3.5 h-3.5 rotate-90 text-neutral-400" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="absolute z-20 top-full mt-2 left-0 min-w-[200px] rounded-2xl bg-white border border-neutral-200 shadow-xl py-2 overflow-hidden"
            >
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                    value === opt
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-secondary hover:bg-neutral-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function NewsCard({ n, index }: { n: NewsItem; index: number }) {
  const [ref, inView] = useReveal("-30px");
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE_OUT }}
      whileHover={{ y: -6 }}
      className={`group rounded-3xl overflow-hidden bg-white border border-neutral-100 hover:border-primary/40 hover:shadow-2xl transition-all duration-500 ${
        n.featured ? "md:col-span-2" : ""
      }`}
    >
      <Link href={`/news-events/${toSlug(n.title)}`} className="block h-full">
        <div className={`relative overflow-hidden ${n.featured ? "aspect-[16/8]" : "aspect-[16/10]"}`}>
          <motion.div
            initial={{ scale: 1.1 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 1.2, ease: EASE_OUT }}
            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url('${n.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-[0.15em]">
            {n.topic}
          </span>
          {n.featured && (
            <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/95 text-secondary text-[10px] font-bold uppercase tracking-[0.15em]">
              Featured
            </span>
          )}
        </div>
        <div className="p-7">
          <div className="flex items-center gap-3 text-xs text-neutral-500 mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" strokeWidth={1.8} />
              {n.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-300" />
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-primary" strokeWidth={1.8} />
              {n.unit}
            </span>
          </div>
          <h3
            className={`font-bold text-secondary leading-tight mb-3 group-hover:text-primary transition-colors duration-300 ${
              n.featured ? "text-2xl md:text-3xl" : "text-xl"
            }`}
          >
            {n.title}
          </h3>
          <p className="text-neutral-600 leading-relaxed text-sm line-clamp-4">{n.summary}</p>
          <div className="mt-5 flex items-center gap-2 text-primary font-bold text-sm">
            <span>Read story</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function EventCard({ e, index }: { e: EventItem; index: number }) {
  const [ref, inView] = useReveal("-30px");
  const isPast = e.status === "Past";
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE_OUT }}
      whileHover={{ y: -4 }}
      className="group rounded-3xl bg-white border border-neutral-100 hover:border-primary/40 hover:shadow-xl transition-all duration-400 relative overflow-hidden flex flex-col"
    >
      <Link
        href={`/news-events/events/${toSlug(e.name)}`}
        className="block flex flex-col h-full"
      >
        <div className="relative h-40 overflow-hidden">
          <EditorialImage
            src={e.image}
            alt={e.name}
            w={560}
            h={320}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
          <span
            className={`absolute left-4 top-4 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] backdrop-blur ${
              isPast
                ? "bg-white/85 text-neutral-600"
                : "bg-primary text-white"
            }`}
          >
            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${isPast ? "bg-neutral-400" : "bg-white animate-pulse"}`} />
            {e.status}
          </span>
          <span className="absolute right-4 top-4 px-3 py-1.5 rounded-full bg-black/40 text-white text-[10px] font-bold uppercase tracking-[0.15em] backdrop-blur">
            {e.type}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-2 text-xs text-primary font-bold uppercase tracking-wider mb-3">
          <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
          {e.date}
        </div>

        <h3 className="text-xl font-bold text-secondary leading-tight mb-4 group-hover:text-primary transition-colors duration-300">
          {e.name}
        </h3>

        <p className="text-neutral-600 leading-relaxed text-sm mb-5 flex-1">{e.description}</p>

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-neutral-100">
          <span className="flex items-center gap-2 text-xs text-neutral-500">
            <MapPin className="w-3.5 h-3.5 text-primary" strokeWidth={1.8} />
            <span>{e.region}</span>
          </span>
          <span className="inline-flex items-center gap-2 text-primary font-bold text-sm">
            {isPast ? "Event recap" : "Event details"}
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
          style={{ originX: 0 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
        />
        </div>
      </Link>
    </motion.div>
  );
}

function PressRow({ n, index }: { n: NewsItem; index: number }) {
  const [ref, inView] = useReveal("-30px");
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="group flex items-center gap-6 py-6 border-b border-neutral-200 last:border-0 hover:bg-neutral-50/60 transition-colors duration-300 px-3 -mx-3 rounded-xl"
    >
      <span className="text-3xl font-black text-primary/40 group-hover:text-primary transition-colors duration-300 w-12 shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex-1">
        <div className="flex items-center gap-3 text-xs text-neutral-500 mb-2">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-primary" strokeWidth={1.8} />
            {n.date}
          </span>
          <span className="w-1 h-1 rounded-full bg-neutral-300" />
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-wider">
            {n.topic}
          </span>
        </div>
        <Link
          href={`/news-events/${toSlug(n.title)}`}
          className="font-bold text-secondary text-lg leading-snug group-hover:text-primary transition-colors duration-300"
        >
          {n.title}
        </Link>
      </div>
      <Link
        href={`/news-events/${toSlug(n.title)}`}
        className="shrink-0 w-11 h-11 rounded-full bg-neutral-100 group-hover:bg-primary text-secondary group-hover:text-white flex items-center justify-center transition-all duration-300"
      >
        <ArrowUpRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}

/* ----------------------------- INNER VIEW ----------------------------- */

function NewsEventsInner() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<TabKey>("news");

  const [year, setYear] = useState<string>("All");
  const [topic, setTopic] = useState<string>("All");
  const [unit, setUnit] = useState<string>("All");

  const [eventTime, setEventTime] = useState<string>("All");
  const [eventRegion, setEventRegion] = useState<string>("All");
  const [eventType, setEventType] = useState<string>("All");

  const [introRef, introInView] = useReveal("-60px");
  const [ctaRef, ctaInView] = useReveal();

  useEffect(() => {
    const t = searchParams.get("tab");
    if (t === "press" || t === "events" || t === "news") setTab(t);
  }, [searchParams]);

  const filteredNews = useMemo(
    () =>
      NEWS.filter(
        (n) =>
          (year === "All" || n.year === year) &&
          (topic === "All" || n.topic === topic) &&
          (unit === "All" || n.unit === unit)
      ),
    [year, topic, unit]
  );

  const filteredEvents = useMemo(
    () =>
      EVENTS.filter(
        (e) =>
          (eventTime === "All" || e.status === eventTime) &&
          (eventRegion === "All" || e.region === eventRegion) &&
          (eventType === "All" || e.type === eventType)
      ),
    [eventTime, eventRegion, eventType]
  );

  return (
    <>
      <InnerBanner
        bg="/images/inners/News-%26-Events.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "News & Events" }]}
        title={
          <>
            News &amp; <span className="accent">Events</span>
          </>
        }
        lede="Pharco in public. Announcements, conferences, campaigns and milestones."
      />

      {/* NEWSROOM INTRO */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <div ref={introRef} className="grid md:grid-cols-12 gap-10 items-start mb-16">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE_OUT }}
              className="md:col-span-5"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.05]">
                <span className="text-primary">Newsroom</span>
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={introInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.4 }}
                style={{ originX: 0 }}
                className="h-1 w-16 bg-primary rounded-full mt-7"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
              className="md:col-span-7"
            >
              <p className="text-neutral-600 leading-relaxed text-lg">
                The Pharco newsroom is the official channel for press releases, corporate
                announcements, regulatory and product news, and milestone communications across
                the group. Filter by year, topic, or business unit, or subscribe to receive new
                releases by email.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-7 flex flex-wrap gap-2 items-stretch max-w-md"
              >
                <input
                  type="email"
                  placeholder="your.email@company.com"
                  className="flex-1 min-w-[200px] px-5 py-3 rounded-full bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-primary text-sm"
                />
                <button
                  type="button"
                  className="px-6 py-3 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors duration-200"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>
          </div>

          {/* TABS */}
          <div className="border-y border-neutral-200">
            <div className="flex flex-wrap gap-1 py-3 relative">
              {TABS.map((t) => {
                const Icon = t.icon;
                const active = tab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className="relative px-5 py-3 group"
                  >
                    <span
                      className={`relative z-10 flex items-center gap-2 text-sm font-bold transition-colors duration-300 ${
                        active ? "text-primary" : "text-neutral-500 group-hover:text-secondary"
                      }`}
                    >
                      <Icon className="w-4 h-4" strokeWidth={1.8} />
                      {t.label}
                    </span>
                    {active && (
                      <motion.span
                        layoutId="tabIndicator"
                        className="absolute inset-0 rounded-full bg-primary/10"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAB CONTENT */}
          <AnimatePresence mode="wait">
            {tab === "news" && (
              <motion.div
                key="news"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="pt-6"
              >
                <div className="flex flex-wrap gap-3 mb-6">
                  <FilterDropdown
                    label="Year"
                    icon={Calendar}
                    options={YEARS}
                    value={year}
                    onChange={setYear}
                  />
                  <FilterDropdown
                    label="Topic"
                    icon={Tag}
                    options={TOPICS}
                    value={topic}
                    onChange={setTopic}
                  />
                  <FilterDropdown
                    label="Business Unit"
                    icon={Building2}
                    options={UNITS}
                    value={unit}
                    onChange={setUnit}
                  />
                </div>

                {filteredNews.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-7">
                    {filteredNews.map((n, i) => (
                      <NewsCard key={n.title} n={n} index={i} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-neutral-500 py-16 text-sm">
                    No stories match your filters. Try adjusting your selection.
                  </p>
                )}
              </motion.div>
            )}

            {tab === "press" && (
              <motion.div
                key="press"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="pt-6"
              >
                <div className="flex flex-wrap gap-3 mb-6">
                  <FilterDropdown
                    label="Year"
                    icon={Calendar}
                    options={YEARS}
                    value={year}
                    onChange={setYear}
                  />
                  <FilterDropdown
                    label="Topic"
                    icon={Tag}
                    options={TOPICS}
                    value={topic}
                    onChange={setTopic}
                  />
                </div>
                <div className="bg-white rounded-3xl border border-neutral-100 px-7">
                  {filteredNews.map((n, i) => (
                    <PressRow key={n.title} n={n} index={i} />
                  ))}
                </div>
              </motion.div>
            )}

            {tab === "events" && (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="pt-6"
              >
                <p className="text-neutral-600 leading-relaxed text-base max-w-3xl mb-8">
                  From international pharmaceutical conferences to regional partner roadshows,
                  public-health campaigns and CSR activations, Pharco&apos;s events calendar
                  reflects the breadth of the corporation&apos;s engagement across science,
                  industry and community.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <FilterDropdown
                    label="When"
                    icon={CalendarDays}
                    options={EVENT_TIMES}
                    value={eventTime}
                    onChange={setEventTime}
                  />
                  <FilterDropdown
                    label="Region"
                    icon={Globe}
                    options={EVENT_REGIONS}
                    value={eventRegion}
                    onChange={setEventRegion}
                  />
                  <FilterDropdown
                    label="Type"
                    icon={Tag}
                    options={EVENT_TYPES}
                    value={eventType}
                    onChange={setEventType}
                  />
                </div>

                {filteredEvents.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {filteredEvents.map((e, i) => (
                      <EventCard key={e.name} e={e} index={i} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-neutral-500 py-16 text-sm">
                    No events match your filters. Try adjusting your selection.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* PRESS CTA:DARK */}
      <section className="py-16 bg-[#111]">
        <div className="max-w-[1280px] mx-auto px-4">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 28 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h3 className="text-white text-3xl md:text-4xl font-bold mb-4">
              Press &amp; media <span className="text-primary">inquiries</span>
            </h3>
            <p className="text-white/55 text-sm leading-relaxed mb-8">
              For interview requests, image assets, or fact-checks, please contact our
              communications team directly.
            </p>
            <div className="flex justify-center">
              <CTALink href="/contact" variant="dark">
                Contact Press Office
              </CTALink>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function NewsView() {
  return (
    <Suspense>
      <NewsEventsInner />
    </Suspense>
  );
}
