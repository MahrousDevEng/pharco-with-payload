"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Target,
  Globe2,
  TrendingUp,
  ShieldCheck,
  Search,
  MapPin,
  Briefcase,
  ArrowRight,
  Send,
  FileSearch,
  MessageSquare,
  ClipboardCheck,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  X,
  Building2,
  SlidersHorizontal,
} from "lucide-react";
import InnerBanner from "@/components/InnerBanner";
import CTALink from "@/components/CTALink";
import EditorialImage from "@/components/editorial/EditorialImage";
import { IMG } from "@/lib/editorialImages";
import { JOBS } from "@/app/careers/jobs-data";

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

function useReveal(margin: `${number}${"px" | "%"}` = "-80px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView] as const;
}

const REASONS = [
  {
    icon: Target,
    title: "Purpose-Driven Work",
    img: "/images/materials/Careers/Purpose-Driven%20Work.jpg",
    body: "Every role at Pharco, from quality control to finance to logistics, contributes to medicines that reach millions of patients globally. Few industries connect daily work to outcome this directly.",
  },
  {
    icon: Globe2,
    title: "Scale & Diversity",
    img: IMG.globe,
    body: "13 group companies, 70+ countries, 30+ nationalities. The scope of opportunity at Pharco is genuinely wide, and the internal mobility map reflects that.",
  },
  {
    icon: TrendingUp,
    title: "Investment in People",
    img: "/images/materials/Careers/Investment%20in%20People.jpg",
    body: "Structured development plans, mentorship, and a genuine belief that people grow best when both supported and challenged. Career progression is a system, not a slogan.",
  },
  {
    icon: ShieldCheck,
    title: "Stability & Growth",
    img: "/images/materials/Careers/Stability%20%26%20Growth.jpg",
    body: "More than 35 years of continuous growth. Pharco offers the stability of an institution with the ambition of a company still expanding, into new markets, new science, and new manufacturing capability.",
  },
];

const DEPARTMENTS = Array.from(new Set(JOBS.map((j) => j.dept))).sort();
const LOCATIONS = Array.from(new Set(JOBS.map((j) => j.loc))).sort();
const TYPES = Array.from(new Set(JOBS.map((j) => j.type))).sort();

const PROCESS = [
  { icon: Send, title: "Apply", body: "Browse open positions and submit your application through Pharco's SAP recruitment portal. CV and any relevant supporting documents accepted." },
  { icon: FileSearch, title: "Screening", body: "HR reviews all applications within 5–7 working days. Shortlisted candidates contacted by phone or email to confirm interview availability." },
  { icon: MessageSquare, title: "Interview", body: "Shortlisted candidates invited for a structured interview, virtual or in-person, depending on role and location. Typically with hiring manager + HR partner." },
  { icon: ClipboardCheck, title: "Assessment", body: "For select roles, a technical or competency-based assessment may be required, case study, technical exercise, or psychometric testing." },
  { icon: CheckCircle2, title: "Offer", body: "Successful candidates receive a formal offer, subject to reference checks and supporting documentation. Offer letter usually issued within 7 working days." },
  { icon: Sparkles, title: "Onboarding", body: "Enrolled in a structured induction programme, first week is planned before you arrive. Functional onboarding extends through your first 90 days." },
];

/* ── Fancy select (matches products page filter style) ─────────────── */

type SelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

function FancySelect({ label, value, options, onChange, Icon }: SelectProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl border bg-white text-left transition-all duration-300 ${
          open
            ? "border-primary shadow-[0_0_0_3px_rgba(224,126,39,0.12)]"
            : value
            ? "border-primary/60 bg-primary/[0.03]"
            : "border-neutral-200 hover:border-neutral-300"
        }`}
      >
        <Icon className="w-4 h-4 text-primary shrink-0" strokeWidth={1.8} />
        <span className="flex-1 min-w-0">
          <span className="block text-[10px] uppercase tracking-[0.14em] text-neutral-400 font-bold leading-none mb-0.5">
            {label}
          </span>
          <span className="block text-sm text-secondary truncate font-medium">
            {value || `All ${label.toLowerCase()}s`}
          </span>
        </span>
        {value ? (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
            className="shrink-0 w-6 h-6 rounded-full bg-neutral-100 hover:bg-primary/10 flex items-center justify-center transition-colors"
            aria-label={`Clear ${label}`}
          >
            <X className="w-3 h-3 text-neutral-500" strokeWidth={2.5} />
          </span>
        ) : (
          <ChevronDown
            className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
            strokeWidth={2}
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.ul
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: EASE_OUT }}
              className="absolute z-50 mt-2 w-full max-h-72 overflow-y-auto rounded-xl border border-neutral-200 bg-white shadow-xl py-1.5"
            >
              {options.map((opt) => {
                const active = opt === value;
                return (
                  <li key={opt}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(opt);
                        setOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between gap-2 transition-colors ${
                        active
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-secondary hover:bg-neutral-50"
                      }`}
                    >
                      <span>{opt}</span>
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Why Pharco — interactive editorial showcase ──────────────────── */

function WhyPharco() {
  const [active, setActive] = useState(0);
  const [headerRef, headerInView] = useReveal();
  const current = REASONS[active];
  const CurrentIcon = current.icon;

  return (
    <section className="relative overflow-hidden bg-[#f7f6f1] py-20">
      {/* Faint background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/images/manifacure.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-[0.05]"
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-12 max-w-2xl"
        >
          <span className="mb-4 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-8 bg-primary" /> Why Pharco
          </span>
          <h2 className="text-5xl font-bold leading-[1.05] text-secondary md:text-6xl">
            Why Work at <span className="text-primary">Pharco</span>
          </h2>
          <p className="mt-5 leading-relaxed text-neutral-600">
            Four reasons people build long, meaningful careers here. Hover or tap each
            one to see what working at Pharco really means.
          </p>
        </motion.div>

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          {/* ── Feature image (crossfades with active reason) ── */}
          <div className="relative h-[400px] overflow-hidden rounded-3xl bg-neutral-900 md:h-[540px] lg:sticky lg:top-24">
            <AnimatePresence>
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.07 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
                className="absolute inset-0"
              >
                <EditorialImage
                  src={current.img}
                  alt={current.title}
                  w={760}
                  h={1000}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5" />

            {/* Active title overlay */}
            <div className="absolute inset-x-7 bottom-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30">
                <CurrentIcon className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className="text-2xl font-bold text-white md:text-3xl"
                >
                  {current.title}
                </motion.h3>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Interactive list ── */}
          <div className="flex flex-col">
            {REASONS.map((r, i) => {
              const isActive = i === active;
              const Icon = r.icon;
              return (
                <button
                  key={r.title}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group border-t py-6 text-left transition-colors duration-300 last:border-b ${
                    isActive ? "border-primary/30" : "border-neutral-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-primary text-white shadow-md shadow-primary/25"
                          : "bg-neutral-200/70 text-neutral-500 group-hover:bg-primary/10 group-hover:text-primary"
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <h4
                      className={`flex-1 text-xl font-bold transition-colors duration-300 md:text-2xl ${
                        isActive ? "text-secondary" : "text-neutral-400 group-hover:text-secondary"
                      }`}
                    >
                      {r.title}
                    </h4>
                    <ArrowRight
                      className={`h-5 w-5 shrink-0 transition-all duration-300 ${
                        isActive
                          ? "translate-x-0 text-primary opacity-100"
                          : "-translate-x-2 text-neutral-300 opacity-0 group-hover:opacity-60"
                      }`}
                    />
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE_OUT }}
                        className="overflow-hidden"
                      >
                        <p className="pl-[3.75rem] pr-2 pt-4 text-[15px] leading-relaxed text-neutral-600">
                          {r.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function JobRow({ job, index }: { job: (typeof JOBS)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
    >
      <Link
        href={`/careers/apply?id=${job.id}`}
        className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto_auto] gap-4 md:gap-6 items-center bg-white border border-neutral-200 hover:border-primary/50 rounded-2xl p-5 md:p-6 hover:shadow-md hover:translate-x-1 transition-all duration-300 group"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">{job.dept}</p>
          <h4 className="font-bold text-secondary text-base md:text-lg leading-snug group-hover:text-primary transition-colors duration-300">{job.title}</h4>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <MapPin className="w-4 h-4 text-primary" strokeWidth={1.8} />
          <span>{job.loc}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <Briefcase className="w-4 h-4 text-primary" strokeWidth={1.8} />
          <span>{job.type}</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-neutral-500">
          <span className="px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 font-semibold">
            {job.lvl}
          </span>
        </div>
        <div className="flex items-center justify-end">
          <span className="w-10 h-10 rounded-full bg-primary/10 group-hover:bg-primary flex items-center justify-center text-primary group-hover:text-white transition-colors duration-300">
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function ProcessStep({ step, index, isLast }: { step: (typeof PROCESS)[0]; index: number; isLast: boolean }) {
  const [ref, inView] = useReveal();
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE_OUT }}
      className="flex gap-5 md:gap-7"
    >
      {/* Spine column: node + connecting line */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-11 h-11 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center z-10 shrink-0 shadow-md shadow-primary/20 ring-4 ring-[#f7f6f1]">
          {index + 1}
        </div>
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-primary/40 to-primary/10 mt-1" style={{ minHeight: 32 }} />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 ${isLast ? "pb-0" : "pb-8"}`}>
        <div className="flex items-center gap-3 mb-2 pt-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
          </div>
          <h4 className="font-bold text-secondary text-lg leading-snug">{step.title}</h4>
        </div>
        <p className="text-neutral-600 text-sm leading-relaxed">{step.body}</p>
      </div>
    </motion.div>
  );
}

/* ── View ─────────────────────────────────────────────────────────── */

const JOBS_PER_PAGE = 5;

export default function CareersView() {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("");
  const [loc, setLoc] = useState("");
  const [type, setType] = useState("");
  const [visible, setVisible] = useState(JOBS_PER_PAGE);

  const [jobsHeaderRef, jobsHeaderInView] = useReveal();
  const [internRef, internInView] = useReveal("-40px");
  const [processHeaderRef, processHeaderInView] = useReveal();
  const [ctaRef, ctaInView] = useReveal();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return JOBS.filter((j) => {
      if (q && !j.title.toLowerCase().includes(q) && !j.dept.toLowerCase().includes(q)) return false;
      if (dept && j.dept !== dept) return false;
      if (loc && j.loc !== loc) return false;
      if (type && j.type !== type) return false;
      return true;
    });
  }, [query, dept, loc, type]);

  // Reset to the first page whenever the filters change
  useEffect(() => {
    setVisible(JOBS_PER_PAGE);
  }, [query, dept, loc, type]);

  const visibleJobs = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const activeFilters = [
    query && { key: "q", label: `"${query}"`, clear: () => setQuery("") },
    dept && { key: "d", label: dept, clear: () => setDept("") },
    loc && { key: "l", label: loc, clear: () => setLoc("") },
    type && { key: "t", label: type, clear: () => setType("") },
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  const clearAll = () => {
    setQuery("");
    setDept("");
    setLoc("");
    setType("");
  };

  return (
    <>
      <InnerBanner
        bg="/images/materials/Careers/Careers-Main%20banner.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        title={
          <>
            Grow Your Career. <span className="accent">Change Lives.</span>
          </>
        }
        lede="At Pharco, careers are built around purpose, responsibility and professional growth. Our people are part of a group of more than 7,000 professionals working across the pharmaceutical value chain to support better healthcare outcomes. We welcome qualified, committed and forward-thinking individuals who are ready to contribute to Pharco's continued growth and impact."
      />

      {/* WHY WORK AT PHARCO */}
      <WhyPharco />

      {/* JOB LISTINGS */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <motion.div
            ref={jobsHeaderRef}
            initial={{ opacity: 0, y: 30 }}
            animate={jobsHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-10 max-w-2xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.05]">
              Job <span className="text-primary">Listings</span>
            </h2>
          </motion.div>

          {/* Search + Filters:matches products page */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="grid lg:grid-cols-[1.6fr_1fr_1fr_1fr] md:grid-cols-2 gap-3 items-stretch">
              {/* Search */}
              <label
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border bg-white text-left transition-all duration-300 focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(224,126,39,0.12)] ${
                  query
                    ? "border-primary/60 bg-primary/[0.03]"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <Search className="w-4 h-4 text-primary shrink-0" strokeWidth={1.8} />
                <span className="flex-1 min-w-0">
                  <span className="block text-[10px] uppercase tracking-[0.14em] text-neutral-400 font-bold leading-none mb-0.5">
                    Search
                  </span>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Job title or keyword…"
                    className="block w-full bg-transparent outline-none text-sm text-secondary placeholder:text-neutral-400 font-medium leading-tight"
                  />
                </span>
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="shrink-0 w-6 h-6 rounded-full bg-neutral-100 hover:bg-primary/10 flex items-center justify-center transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3 text-neutral-500" strokeWidth={2.5} />
                  </button>
                )}
              </label>

              <FancySelect
                label="Department"
                value={dept}
                options={DEPARTMENTS}
                onChange={setDept}
                Icon={Building2}
              />
              <FancySelect
                label="Location"
                value={loc}
                options={LOCATIONS}
                onChange={setLoc}
                Icon={MapPin}
              />
              <FancySelect
                label="Type"
                value={type}
                options={TYPES}
                onChange={setType}
                Icon={SlidersHorizontal}
              />
            </div>

            {/* Active filter chips */}
            <AnimatePresence initial={false}>
              {activeFilters.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center flex-wrap gap-2 pt-3">
                    <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-neutral-500 mr-1">
                      Active
                    </span>
                    <AnimatePresence initial={false}>
                      {activeFilters.map((f) => (
                        <motion.span
                          key={f.key + f.label}
                          layout
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          transition={{ duration: 0.2 }}
                          className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold"
                        >
                          {f.label}
                          <button
                            onClick={f.clear}
                            className="w-4 h-4 rounded-full bg-primary/20 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                            aria-label={`Remove ${f.label}`}
                          >
                            <X className="w-2.5 h-2.5" strokeWidth={3} />
                          </button>
                        </motion.span>
                      ))}
                    </AnimatePresence>
                    <button
                      onClick={clearAll}
                      className="text-xs text-neutral-500 hover:text-primary underline underline-offset-2 ml-1"
                    >
                      Clear all
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-4 text-xs text-neutral-500">
              Showing <span className="font-bold text-secondary">{filtered.length}</span> of {JOBS.length} open roles
            </p>
          </motion.div>

          {/* Job List */}
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <div className="space-y-3">
                {visibleJobs.map((j, i) => (
                  <JobRow key={j.id} job={j} index={i} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 bg-[#f7f6f1] rounded-3xl"
              >
                <Search className="w-12 h-12 text-neutral-300 mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-secondary font-bold mb-2">No roles match your search</p>
                <p className="text-sm text-neutral-500 mb-5">Try adjusting your filters or search terms.</p>
                <button
                  onClick={clearAll}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Reset filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show more */}
          {hasMore && (
            <div className="mt-10 flex flex-col items-center gap-3">
              <button
                onClick={() => setVisible((v) => v + JOBS_PER_PAGE)}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-secondary text-white text-sm font-semibold hover:bg-primary transition-colors duration-300"
              >
                Show more roles
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={2.2} />
              </button>
              <span className="text-xs text-neutral-500">
                Showing <span className="font-bold text-secondary">{visibleJobs.length}</span> of {filtered.length}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* INTERNSHIP PROGRAMME */}
      <section className="py-16 bg-[#1a1a1a] overflow-hidden relative">
        <div className="max-w-[1280px] mx-auto px-4 relative">
          <div ref={internRef} className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={internInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="rounded-2xl overflow-hidden mb-8 h-56">
                <EditorialImage
                  src="/images/materials/Careers/Internship%20Programme.jpg"
                  alt="Life at Pharco"
                  w={760}
                  h={420}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-6">
                Start your career at <span className="text-primary">Pharco?</span>
              </h2>
              <p className="text-white/65 leading-relaxed">
                Pharco&apos;s internship programme is designed to give students and graduates a genuine pharmaceutical industry experience, not just observation. Interns are placed in real teams, working on real deliverables, with mentors who invest time in their growth. Many of today&apos;s mid-level Pharco managers started here.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={internInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-col gap-4"
            >
              <div className="rounded-3xl bg-white/5 border border-white/10 hover:border-primary/40 p-7 transition-colors duration-300">
                <h4 className="text-white font-bold text-lg mb-2">Apply Now</h4>
                <p className="text-white/55 text-sm mb-5 leading-relaxed">
                  Open internship positions across R&amp;D, manufacturing, quality and commercial teams.
                </p>
                <CTALink href="/careers/apply?type=internship" variant="dark">
                  Apply Now
                </CTALink>
              </div>
              <div className="rounded-3xl bg-white/5 border border-white/10 hover:border-primary/40 p-7 transition-colors duration-300">
                <h4 className="text-white font-bold text-lg mb-2">Submit your CV for future openings</h4>
                <p className="text-white/55 text-sm mb-5 leading-relaxed">
                  Don&apos;t see a current opening? Send us your CV and we&apos;ll keep it on file.
                </p>
                <CTALink href="/contact" variant="dark">
                  Submit Your CV
                </CTALink>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* APPLICATION PROCESS */}
      <section className="py-16 bg-[#f7f6f1] overflow-x-clip">
        <div className="max-w-[1280px] mx-auto px-4">
          <motion.div
            ref={processHeaderRef}
            initial={{ opacity: 0, y: 30 }}
            animate={processHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 max-w-2xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.05]">
              Application <span className="text-primary">Process</span>
            </h2>
          </motion.div>
          <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            <div>
              {PROCESS.map((p, i) => (
                <ProcessStep key={p.title} step={p} index={i} isLast={i === PROCESS.length - 1} />
              ))}
            </div>
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <EditorialImage
                  src="/images/materials/Careers/Purpose-Driven%20Work.jpg"
                  alt="Pharco team"
                  w={640}
                  h={1040}
                  className="rounded-3xl w-full h-[520px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1a1a1a] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 relative">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-4">
              Let&apos;s Stay <span className="text-primary">Connected</span>
            </h2>
            <p className="text-white/65 leading-relaxed mb-8">
              We&apos;re always open to talented people. Send us your CV even if you can&apos;t find your role, and we&apos;ll keep you in mind when something matches.
            </p>
            <div className="flex justify-center">
              <CTALink href="/contact" variant="dark">
                Send Us Your CV
              </CTALink>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
