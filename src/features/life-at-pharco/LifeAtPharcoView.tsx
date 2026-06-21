"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Heart,
  GraduationCap,
  Clock,
  Award,
  Wallet,
  Users,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import InnerBanner from "@/components/InnerBanner";
import CTALink from "@/components/CTALink";
import { Counter } from "@/components/inner/Counter";
import EditorialImage from "@/components/editorial/EditorialImage";

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

function useReveal(margin: `${number}${"px" | "%"}` = "-80px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView] as const;
}

/* ── Data ─────────────────────────────────────────────────────── */

const STATS = [
  {
    value: 7000,
    suffix: "+",
    label: "Team Members",
    lead: "Working across the Pharco group every day",
  },
  {
    value: 10,
    suffix: " yrs",
    label: "Median Employee Tenure",
    lead: "Years our people stay and grow with us",
  },
  {
    value: 39,
    suffix: "+",
    label: "Years of Legacy",
    lead: "Of building Egypt's pharmaceutical industry",
  },
  {
    value: 30,
    suffix: "+",
    label: "Nationalities",
    lead: "Cultures, languages and perspectives",
  },
];

const BENEFITS = [
  {
    icon: Heart,
    title: "Health & Wellness",
    body: "Comprehensive health insurance and wellness programmes for employees and their families, built around prevention, mental health and routine care.",
  },
  {
    icon: GraduationCap,
    title: "Growth & Development",
    body: "Structured learning paths, training programmes, workshops and educational sponsorship opportunities, supporting both technical and leadership development.",
  },
  {
    icon: Clock,
    title: "Work-Life Balance",
    body: "Flexible working arrangements and a management culture that respects life outside the office, measured, not just promised.",
  },
  {
    icon: Award,
    title: "Recognition",
    body: "Performance bonuses, long-service awards, and peer-recognition programmes that reward both individual contribution and team outcomes.",
  },
  {
    icon: Wallet,
    title: "Competitive Compensation",
    body: "Market-benchmarked salaries reviewed against the pharmaceutical sector annually, transparent banding across all functions.",
  },
  {
    icon: Users,
    title: "Social Activities",
    body: "Team events, sports leagues, annual celebration days, and a Pharco football club, because great teams are built beyond the workplace too.",
  },
];

const STORIES = [
  {
    name: "Ahmed Hassan",
    title: "Quality Assurance Specialist",
    tenure: "",
    quote:
      "When I joined Pharco, I was looking for a place where I could grow professionally while contributing to something meaningful. What I found was a team that encourages learning, values collaboration, and gives every employee the opportunity to make a real impact. Knowing that our work helps improve people's lives makes every achievement even more rewarding.",
    initials: "01",
  },
  {
    name: "Mariam El-Sayed",
    title: "Research & Development Associate",
    tenure: "",
    quote:
      "One of the things I appreciate most about Pharco is the culture of support. From my first day, I felt welcomed and encouraged to share ideas, ask questions, and take on new challenges. The company invests in its people, and that creates an environment where you can continuously develop both personally and professionally.",
    initials: "02",
  },
  {
    name: "Omar Mahmoud",
    title: "Production Team Leader",
    tenure: "",
    quote:
      "Working at Pharco gives me a sense of purpose. Every project reminds me that we are part of something bigger than ourselves. Whether it's developing new solutions, maintaining quality standards, or supporting healthcare initiatives, everyone here plays a role in creating a healthier future. That's what makes this journey so fulfilling.",
    initials: "03",
  },
];

/* ── Sub-components ───────────────────────────────────────────── */

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
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE_OUT }}
      className="text-center"
    >
      <div className="text-5xl md:text-6xl font-black text-primary leading-none mb-3">
        {inView && <Counter to={value} suffix={suffix} />}
      </div>
      <p className="text-sm font-bold text-secondary uppercase tracking-[0.12em] mb-2">
        {label}
      </p>
      <p className="text-xs text-neutral-500 leading-relaxed max-w-[180px] mx-auto">
        {lead}
      </p>
    </motion.div>
  );
}

function BenefitCard({
  icon: Icon,
  title,
  body,
  index,
}: {
  icon: typeof Heart;
  title: string;
  body: string;
  index: number;
}) {
  return (
    <motion.div
      data-bcard
      initial={{ opacity: 0, x: 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(index, 3) * 0.07,
        ease: EASE_OUT,
      }}
      className="flex-shrink-0 w-[360px] sm:w-[420px] rounded-2xl bg-white/70 hover:bg-white backdrop-blur-sm border border-white/60 hover:border-primary/40 p-7 hover:shadow-xl transition-all duration-300 group relative overflow-hidden select-none"
    >
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center mb-4 transition-colors duration-300">
          <Icon
            className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300"
            strokeWidth={1.5}
          />
        </div>
        <h4 className="font-bold text-secondary text-base mb-2">{title}</h4>
        <p className="text-neutral-600 group-hover:text-neutral-700 text-sm leading-relaxed transition-colors duration-300">
          {body}
        </p>
      </div>
    </motion.div>
  );
}

function StoryRow({
  story,
  index,
  active,
  onSelect,
}: {
  story: (typeof STORIES)[0];
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  const [ref, inView] = useReveal("-30px");
  const num = String(index + 1).padStart(2, "0");
  return (
    <motion.button
      ref={ref}
      onClick={onSelect}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE_OUT }}
      className={`group relative w-full text-left rounded-2xl px-5 py-4 transition-all duration-300 border ${
        active
          ? "bg-white border-primary shadow-[0_10px_30px_rgba(224,126,39,0.18)]"
          : "bg-white/60 border-transparent hover:bg-white hover:border-neutral-200"
      }`}
    >
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full transition-all duration-300 ${
          active
            ? "h-10 bg-primary"
            : "h-0 bg-primary/0 group-hover:h-6 group-hover:bg-primary/40"
        }`}
      />
      <div className="flex items-center gap-4">
        <span
          className={`text-[11px] font-bold tabular-nums tracking-[0.18em] transition-colors ${
            active
              ? "text-primary"
              : "text-neutral-400 group-hover:text-primary"
          }`}
        >
          {num}
        </span>
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
            active
              ? "bg-primary text-black"
              : "bg-primary/10 text-primary group-hover:bg-primary/20"
          }`}
        >
          {story.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p
            className={`font-bold text-sm leading-tight truncate transition-colors ${
              active ? "text-secondary" : "text-secondary/85"
            }`}
          >
            {story.name}
          </p>
          <p className="text-[11px] text-neutral-500 truncate mt-0.5">
            {story.title}
            {story.tenure ? ` · ${story.tenure}` : ""}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */

export default function LifeAtPharcoView() {
  const [activeStory, setActiveStory] = useState(0);

  const [gridRef, gridInView] = useReveal("-40px");
  const [introRef, introInView] = useReveal("-60px");
  const [storyHeaderRef, storyHeaderInView] = useReveal();
  const [benefitHeaderRef, benefitHeaderInView] = useReveal();
  const [ctaRef, ctaInView] = useReveal();
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftStart.current = carouselRef.current.scrollLeft;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    carouselRef.current.scrollLeft = scrollLeftStart.current - walk;
  };
  const stopDrag = () => { isDragging.current = false; };

  const paused = useRef(false);
  const scrollCarousel = (dir: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-bcard]");
    const step = card ? card.offsetWidth + 16 : 380; // gap-4 = 16px
    const max = el.scrollWidth - el.clientWidth;
    if (dir > 0 && el.scrollLeft >= max - 4) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else if (dir < 0 && el.scrollLeft <= 4) {
      el.scrollTo({ left: max, behavior: "smooth" });
    } else {
      el.scrollBy({ left: dir * step, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) scrollCarousel(1);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <InnerBanner
        bg="/images/materials/Life%20at%20pharco/Life%20at%20pharco-Main%20banner.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Life at Pharco" }]}
        title={
          <>
            Life at <span className="accent">Pharco</span>
          </>
        }
        lede="8,000+ people. 30+ nationalities. One reason for getting up in the morning."
      />

      {/* ① CULTURE HEADLINE */}
      <section className="py-14 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <div
            ref={introRef}
            className="grid md:grid-cols-2 gap-14 lg:gap-20 items-start"
          >
            <motion.div
              initial={{ opacity: 0, x: -48 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE_OUT }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.1] mb-6">
                Where Talent Meets <span className="text-primary">Purpose</span>
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={introInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                style={{ originX: 0 }}
                className="h-1 w-16 bg-primary rounded-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 48 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15, ease: EASE_OUT }}
            >
              <p className="text-neutral-600 leading-relaxed mb-5">
                More than 8,000 people across 30+ nationalities come to work at
                Pharco every day. Scientists, engineers, pharmacists,
                salespeople, logisticians, analysts and leaders, united by a
                shared conviction that their work matters, and a culture that
                supports them to do it well.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                We&apos;ve spent decades building a workplace where people feel
                valued, challenged and genuinely supported. It&apos;s a culture
                built on collaboration and mutual respect, where a production
                operator and a research director share the same canteen, the
                same goal, and the same sense of pride in what Pharco makes.
                When our people are engaged and fulfilled, they do their best
                work. And their best work saves lives.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ② FEATURE IMAGE */}
      <section className="bg-white overflow-hidden">
        <motion.div
          ref={gridRef}
          initial={{ opacity: 0 }}
          animate={gridInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="relative h-[55vw] md:h-[60vh] min-h-[260px] md:min-h-[440px] max-h-[680px] overflow-hidden"
        >
          <EditorialImage
            src="/images/materials/Life%20at%20pharco/Life%20at%20pharco-inner%20banner.jpg"
            alt="Life at Pharco, our people and culture"
            w={1800}
            h={900}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </motion.div>
      </section>

      {/* ③ STAT STRIP */}
      <section className="py-16 bg-neutral-100 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <StatBlock key={s.label} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ④ BENEFITS:draggable horizontal carousel */}
      <section className="py-20 relative overflow-hidden">
        {/* Background image */}
        <EditorialImage
          src="/images/materials/Life%20at%20pharco/Taking%20care%20of%20our%20people-inner-OP1.jpg"
          alt=""
          w={1800}
          h={900}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/45" />

        {/* Header */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 mb-10">
          <motion.div
            ref={benefitHeaderRef}
            initial={{ opacity: 0, y: 30 }}
            animate={benefitHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-white leading-[1.05]">
<span className="text-primary">Benefits</span>
              </h2>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => scrollCarousel(-1)}
                aria-label="Previous benefit"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 hover:border-primary hover:bg-primary"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel(1)}
                aria-label="Next benefit"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 hover:border-primary hover:bg-primary"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Carousel track */}
        <div
          ref={carouselRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => {
            stopDrag();
            paused.current = false;
          }}
          className="relative z-10 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing select-none pl-4 sm:pl-[max(16px,calc((100vw-1280px)/2+16px))]"
        >
          <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
            {BENEFITS.map((b, i) => (
              <BenefitCard key={b.title} {...b} index={i} />
            ))}
            <div className="flex-shrink-0 w-4 sm:w-[max(16px,calc((100vw-1280px)/2+16px))]" />
          </div>
        </div>
      </section>

      {/* ⑤ EMPLOYEE STORIES */}
      <section className="py-20 bg-gradient-to-b from-white to-[#faf8f1] overflow-hidden relative">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-secondary/[0.04] blur-3xl pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 relative">
          <motion.div
            ref={storyHeaderRef}
            initial={{ opacity: 0, y: 30 }}
            animate={storyHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="grid md:grid-cols-2 gap-8 items-end mb-14"
          >
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-[1.05]">
Employee <span className="text-primary">Stories</span>
              </h2>
            </div>
            <p className="text-neutral-600 leading-relaxed text-sm max-w-md md:justify-self-end">
              Real voices from across the Pharco group. Pick a name to read
              their story.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[340px_1fr] gap-8 lg:gap-12 items-start">
            {/* Story list:sticky on desktop */}
            <div className="flex flex-col gap-2.5 lg:sticky lg:top-28">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400 mb-2 pl-2">
                {STORIES.length} stories
              </span>
              {STORIES.map((s, i) => (
                <StoryRow
                  key={i}
                  story={s}
                  index={i}
                  active={activeStory === i}
                  onSelect={() => setActiveStory(i)}
                />
              ))}
            </div>

            {/* Featured quote card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="relative rounded-3xl bg-white border border-neutral-200 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)] overflow-hidden"
              >
                <div className="h-1 w-full bg-gradient-to-r from-primary/0 via-primary to-primary/0" />

                <div className="p-6 md:p-8 relative">
                  <Quote
                    className="absolute -top-2 right-6 md:right-10 w-20 h-20 md:w-28 md:h-28 text-primary/10 -scale-x-100"
                    strokeWidth={1}
                  />

                  <div className="flex items-center gap-3 mb-5 relative">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-[0.12em]">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Life at Pharco
                    </span>
                    <span className="h-px flex-1 bg-neutral-200" />
                    <span className="text-[10px] font-bold tabular-nums tracking-[0.18em] text-neutral-400">
                      {String(activeStory + 1).padStart(2, "0")} /{" "}
                      {String(STORIES.length).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="text-secondary text-base md:text-lg font-medium leading-[1.5] tracking-tight relative">
                    <span className="text-primary mr-1">&ldquo;</span>
                    {STORIES[activeStory].quote}
                    <span className="text-primary ml-1">&rdquo;</span>
                  </p>

                  <div className="flex items-center gap-4 mt-7 pt-6 border-t border-dashed border-neutral-200 relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-black font-bold flex items-center justify-center text-base shadow-md shrink-0">
                      {STORIES[activeStory].initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-secondary text-base leading-tight">
                        {STORIES[activeStory].name}
                      </p>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary mt-1.5">
                        {STORIES[activeStory].title}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ⑥ JOIN US:CTA */}
      <section className="py-20 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
        </div>
        <div className="max-w-[1280px] mx-auto px-4 relative">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-4">
              Build Your Career{" "}
              <span className="text-primary">With Pharco</span>
            </h2>
            <p className="text-white/65 leading-relaxed mb-8">
              Explore opportunities across R&amp;D, manufacturing, sales,
              public health and more.
            </p>
            <div className="flex justify-center">
              <CTALink href="/careers" variant="dark">
                View Open Roles
              </CTALink>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
