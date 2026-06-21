"use client";

import { useMemo, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Search,
  ChevronDown,
  X,
  ArrowUpRight,
  Pill,
  FlaskConical,
  Stethoscope,
  SlidersHorizontal,
} from "lucide-react";
import EditorialImage from "@/components/editorial/EditorialImage";
import { productImage } from "@/lib/productImages";
import { PRODUCTS, TA_TABS } from "@/lib/products";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const DOSAGE_FORMS = [
  "Tablets",
  "Capsules",
  "Syrups",
  "Injectables",
  "Topical",
  "Drops",
  "Inhalers",
  "Sachets",
];

const ACTIVE_INGREDIENTS = [
  "Paracetamol",
  "Amoxicillin",
  "Ciprofloxacin",
  "Sofosbuvir",
  "Amlodipine",
  "Omeprazole",
  "Cefixime",
  "Montelukast",
];

const INDICATIONS = [
  "Pain & fever",
  "Bacterial infection",
  "Hypertension",
  "Diabetes",
  "Asthma & COPD",
  "Hepatitis C",
  "Acid reflux",
  "Allergic rhinitis",
];

const TA_DISPLAY = (ta: string) =>
  ta === "Anaesthesia" ? "Anaesthesia & Narcotics" : ta;

const PER_PAGE = 24;

/* ------------------------------------------------------------------ */
/* FancySelect                                                          */
/* ------------------------------------------------------------------ */
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
              transition={{ duration: 0.18, ease: EASE }}
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
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
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

/* ------------------------------------------------------------------ */
/* Main client component                                               */
/* ------------------------------------------------------------------ */
export default function ProductsClient() {
  const searchParams = useSearchParams();
  const initialTA = searchParams?.get("ta") ?? "all";

  const [q, setQ] = useState("");
  const [activeTA, setActiveTA] = useState<string>(
    TA_TABS.includes(initialTA) ? initialTA : "all"
  );
  const [dosageForm, setDosageForm] = useState("");
  const [activeIng, setActiveIng] = useState("");
  const [indication, setIndication] = useState("");
  const [limit, setLimit] = useState(PER_PAGE);

  const filtered = useMemo(() => {
    const lc = q.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const taOk = activeTA === "all" || p.ta === activeTA;
      const qOk =
        !lc ||
        p.n.toLowerCase().includes(lc) ||
        p.ta.toLowerCase().includes(lc);
      return taOk && qOk;
    });
  }, [q, activeTA]);

  const visible = filtered.slice(0, limit);

  const activeFilters = [
    activeTA !== "all" && { key: "ta", label: TA_DISPLAY(activeTA), clear: () => setActiveTA("all") },
    q && { key: "q", label: `"${q}"`, clear: () => setQ("") },
    dosageForm && { key: "df", label: dosageForm, clear: () => setDosageForm("") },
    activeIng && { key: "ai", label: activeIng, clear: () => setActiveIng("") },
    indication && { key: "ind", label: indication, clear: () => setIndication("") },
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  const clearAll = () => {
    setQ("");
    setActiveTA("all");
    setDosageForm("");
    setActiveIng("");
    setIndication("");
    setLimit(PER_PAGE);
  };

  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* STICKY FILTER BAR */}
      <div className="sticky top-[var(--header-h,80px)] z-30 bg-white/95 backdrop-blur-md border-b border-[#ece7da] shadow-[0_1px_0_rgba(0,0,0,0.02)]">
        <div className="max-w-[1280px] mx-auto px-4 py-3">
          <div className="grid lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] md:grid-cols-2 gap-3 items-stretch">
            {/* Search */}
            <label
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border bg-white text-left transition-all duration-300 focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(224,126,39,0.12)] ${
                q
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
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setLimit(PER_PAGE);
                  }}
                  placeholder="Product name or therapeutic area…"
                  className="block w-full bg-transparent outline-none text-sm text-secondary placeholder:text-neutral-400 font-medium leading-tight"
                />
              </span>
              {q && (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="shrink-0 w-6 h-6 rounded-full bg-neutral-100 hover:bg-primary/10 flex items-center justify-center transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3 text-neutral-500" strokeWidth={2.5} />
                </button>
              )}
            </label>

            <FancySelect
              label="Therapeutic area"
              value={activeTA === "all" ? "" : TA_DISPLAY(activeTA)}
              options={TA_TABS.map(TA_DISPLAY)}
              onChange={(v) => {
                setLimit(PER_PAGE);
                if (!v) return setActiveTA("all");
                const raw = TA_TABS.find((t) => TA_DISPLAY(t) === v) ?? "all";
                setActiveTA(raw);
              }}
              Icon={SlidersHorizontal}
            />
            <FancySelect
              label="Dosage form"
              value={dosageForm}
              options={DOSAGE_FORMS}
              onChange={setDosageForm}
              Icon={Pill}
            />
            <FancySelect
              label="Active ingredient"
              value={activeIng}
              options={ACTIVE_INGREDIENTS}
              onChange={setActiveIng}
              Icon={FlaskConical}
            />
            <FancySelect
              label="Indication"
              value={indication}
              options={INDICATIONS}
              onChange={setIndication}
              Icon={Stethoscope}
            />
          </div>

          {/* Active filter chips */}
          <AnimatePresence initial={false}>
            {activeFilters.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
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
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-[1280px] mx-auto px-4 pt-6 pb-10">
        {filtered.length === 0 ? (
          <div className="text-center py-16 px-6 rounded-2xl border border-dashed border-neutral-300 bg-white max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 mx-auto mb-5 flex items-center justify-center">
              <Search className="w-6 h-6 text-primary" strokeWidth={1.7} />
            </div>
            <h4 className="text-lg font-bold text-secondary mb-2">
              No products match these filters
            </h4>
            <p className="text-sm text-neutral-500 mb-5">
              Try a different search term or clear a filter.
            </p>
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            <div
              ref={gridRef}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
            >
              {visible.map((p, i) => (
                <motion.a
                  key={p.n + p.ta}
                  initial={{ opacity: 0, y: 20 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: Math.min((i % PER_PAGE) * 0.02, 0.3),
                    ease: EASE,
                  }}
                  href={`/products/${encodeURIComponent(p.n)}?ta=${encodeURIComponent(p.ta)}`}
                  className="group block rounded-2xl bg-white border border-neutral-200 overflow-hidden hover:border-primary hover:shadow-[0_14px_28px_rgba(0,0,0,0.08)] transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-neutral-100">
                    <EditorialImage
                      src={productImage(p.n)}
                      alt={p.n}
                      w={420}
                      h={300}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.16em] font-bold text-primary bg-white/90 backdrop-blur px-2 py-1 rounded-full">
                      {TA_DISPLAY(p.ta)}
                    </span>
                  </div>
                  {/* Body */}
                  <div className="p-4 flex items-center justify-between gap-2">
                    <h4 className="font-bold text-secondary text-[15px] leading-tight truncate">
                      {p.n}
                    </h4>
                    <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 text-neutral-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Load more */}
            {limit < filtered.length && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setLimit((l) => l + PER_PAGE)}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-neutral-300 text-secondary text-sm font-semibold hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Load more products
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
