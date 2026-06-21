"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import EditorialImage from "./EditorialImage";

export const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

/* ----------------------------------------------------------------- helpers */

export function Eyebrow({
  children,
  light = false,
  className = "",
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] ${
        light ? "text-primary" : "text-primary"
      } ${className}`}
    >
      <span className="h-px w-6 bg-primary inline-block" />
      {children}
    </span>
  );
}

/** Eyebrow + big headline + optional lede, animated in. */
export function SectionIntro({
  eyebrow,
  title,
  lede,
  align = "left",
  light = false,
  className = "",
  max = "max-w-2xl",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
  max?: string;
}) {
  const alignCls = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`flex flex-col ${alignCls} ${max} ${className}`}
    >
      {eyebrow && <span className="mb-4 block"><Eyebrow light={light}>{eyebrow}</Eyebrow></span>}
      <h2
        className={`font-bold leading-[1.06] tracking-[-0.01em] text-[clamp(30px,4.4vw,54px)] ${
          light ? "text-white" : "text-secondary"
        }`}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-5 text-[17px] leading-relaxed ${
            light ? "text-white/70" : "text-neutral-600"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {lede}
        </p>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------- story cards */
/* L'Oréal / Unilever signature: full image tile, gradient, overlaid text,
   hover zoom + lift. Optional link with animated arrow. */

export function StoryCard({
  image,
  imageAlt,
  kicker,
  title,
  text,
  href,
  className = "",
  heightClass = "h-[420px]",
  index = 0,
}: {
  image: string;
  imageAlt?: string;
  kicker?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  href?: string;
  className?: string;
  heightClass?: string;
  index?: number;
}) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 4) * 0.08 }}
      className={`group relative ${heightClass} overflow-hidden rounded-[20px] bg-neutral-900 ${className}`}
    >
      <EditorialImage
        src={image}
        alt={imageAlt || (typeof title === "string" ? title : "")}
        w={760}
        h={760}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.07]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5" />
      <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7 text-white">
        {kicker && (
          <span className="mb-3 inline-block rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]">
            {kicker}
          </span>
        )}
        <h3 className="text-[22px] font-bold leading-snug">{title}</h3>
        {text && (
          <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
            {text}
          </p>
        )}
        {href && (
          <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Discover
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-black transition-transform duration-300 group-hover:translate-x-1">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </span>
        )}
      </div>
    </motion.div>
  );
  return href ? (
    <Link href={href} className="block">
      {inner}
    </Link>
  ) : (
    inner
  );
}

export function StoryGrid({
  children,
  cols = 3,
  className = "",
}: {
  children: React.ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}) {
  const colCls =
    cols === 2
      ? "sm:grid-cols-2"
      : cols === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : "sm:grid-cols-2 lg:grid-cols-3";
  return <div className={`grid grid-cols-1 gap-5 ${colCls} ${className}`}>{children}</div>;
}

/* ----------------------------------------------------------- feature split */
/* Full-width alternating image / copy band with a gentle image parallax. */

export function FeatureSplit({
  image,
  imageAlt,
  eyebrow,
  title,
  children,
  reverse = false,
  dark = false,
  badge,
}: {
  image: string;
  imageAlt?: string;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
  reverse?: boolean;
  dark?: boolean;
  badge?: { value: string; label: string };
}) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={sectionRef} className={dark ? "bg-[#16181c] text-white" : "bg-white"}>
      <div className="grid items-stretch lg:grid-cols-2">
        <div className={`relative min-h-[340px] overflow-hidden lg:min-h-[560px] ${reverse ? "lg:order-2" : ""}`}>
          <motion.div style={{ y }} className="absolute inset-0 scale-110">
            <EditorialImage
              src={image}
              alt={imageAlt || ""}
              w={1100}
              h={1100}
              className="h-full w-full object-cover"
            />
          </motion.div>
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              className="absolute bottom-7 left-7 rounded-2xl bg-primary px-6 py-4 text-white shadow-xl"
            >
              <div className="text-4xl font-bold leading-none">{badge.value}</div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
                {badge.label}
              </div>
            </motion.div>
          )}
        </div>
        <div className="flex items-center px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: EASE }}
            className="max-w-xl"
          >
            {eyebrow && <span className="mb-4 block"><Eyebrow light={dark}>{eyebrow}</Eyebrow></span>}
            <h2
              className={`font-bold leading-[1.08] tracking-[-0.01em] text-[clamp(28px,3.6vw,46px)] ${
                dark ? "text-white" : "text-secondary"
              }`}
            >
              {title}
            </h2>
            <div className={`mt-6 space-y-4 text-[15.5px] leading-relaxed ${dark ? "text-white/70" : "text-neutral-600"}`}>
              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- stat band */
/* Counters / figures over a photographic background. */

export function StatBand({
  image,
  eyebrow,
  title,
  stats,
  className = "",
}: {
  image: string;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  stats: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      <EditorialImage src={image} alt="" w={1800} h={900} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-secondary/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(224,126,39,0.25),transparent_55%)]" />
      <div className="relative mx-auto max-w-[1280px] px-4 py-16 lg:py-20">
        {(eyebrow || title) && (
          <div className="mb-12 max-w-2xl">
            {eyebrow && <span className="mb-4 block"><Eyebrow light>{eyebrow}</Eyebrow></span>}
            {title && (
              <h2 className="text-[clamp(26px,3.4vw,44px)] font-bold leading-tight text-white">{title}</h2>
            )}
          </div>
        )}
        <div className={`grid gap-8 ${stats.length >= 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-3"}`}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
              className="border-l-2 border-primary/70 pl-5"
            >
              <div className="text-[clamp(38px,5vw,64px)] font-bold leading-none text-white">{s.value}</div>
              <div className="mt-3 text-[12.5px] font-medium uppercase tracking-[0.1em] text-white/65">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- hover-reveal card */
/* Image card with an always-on title; body copy reveals on hover. Replaces
   flat icon-box + text cards. */

export function HoverRevealCard({
  image,
  icon: Icon,
  title,
  text,
  tag,
  href,
  index = 0,
  heightClass = "h-[360px]",
}: {
  image: string;
  icon?: React.ElementType;
  title: React.ReactNode;
  text?: React.ReactNode;
  tag?: string;
  href?: string;
  index?: number;
  heightClass?: string;
}) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: EASE, delay: (index % 4) * 0.07 }}
      className={`group relative ${heightClass} overflow-hidden rounded-[18px] bg-neutral-900`}
    >
      <EditorialImage
        src={image}
        alt={typeof title === "string" ? title : ""}
        w={680}
        h={760}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 transition-opacity duration-500 group-hover:from-black/92" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        {Icon && (
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/90 backdrop-blur">
            <Icon className="h-5 w-5 text-white" strokeWidth={1.8} />
          </div>
        )}
        {tag && (
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{tag}</span>
        )}
        <h3 className="text-[19px] font-bold leading-snug">{title}</h3>
        {text && (
          <div className="grid grid-rows-[1fr] transition-all duration-500 md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/80">{text}</p>
            </div>
          </div>
        )}
      </div>
      <div className="absolute right-5 top-5 h-1 w-10 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-500 group-hover:scale-x-100" />
    </motion.div>
  );
  return href ? <Link href={href} className="block">{inner}</Link> : inner;
}

/* ------------------------------------------------------------- media mosaic */
/* Asymmetric magazine / bento grid of image tiles. */

export function MediaMosaic({
  items,
}: {
  items: { image: string; title?: React.ReactNode; kicker?: string; span?: "wide" | "tall" | "normal" }[];
}) {
  return (
    <div className="grid auto-rows-[200px] grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((it, i) => {
        const span =
          it.span === "wide"
            ? "col-span-2 row-span-1"
            : it.span === "tall"
            ? "col-span-1 row-span-2"
            : "col-span-1 row-span-1";
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE, delay: (i % 4) * 0.06 }}
            className={`group relative overflow-hidden rounded-2xl bg-neutral-900 ${span}`}
          >
            <EditorialImage
              src={it.image}
              alt={typeof it.title === "string" ? it.title : ""}
              w={800}
              h={800}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.1s] group-hover:scale-110"
            />
            {(it.title || it.kicker) && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  {it.kicker && (
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">{it.kicker}</span>
                  )}
                  {it.title && <h4 className="mt-1 text-base font-bold leading-snug">{it.title}</h4>}
                </div>
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------ quote feature */

export function QuoteFeature({
  image,
  eyebrow,
  quote,
  name,
  role,
}: {
  image: string;
  eyebrow?: string;
  quote: React.ReactNode;
  name?: string;
  role?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <EditorialImage src={image} alt="" w={1800} h={1000} className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-secondary/92" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative mx-auto max-w-[1000px] px-4 py-24 text-center">
        {eyebrow && <span className="mb-6 block"><Eyebrow light>{eyebrow}</Eyebrow></span>}
        <motion.blockquote
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: EASE }}
          className="text-[clamp(22px,3.2vw,40px)] font-medium italic leading-[1.4] text-white"
        >
          {quote}
        </motion.blockquote>
        {(name || role) && (
          <div className="mt-9">
            <div className="mx-auto mb-5 h-px w-16 bg-primary" />
            {name && <p className="text-lg font-bold text-white">{name}</p>}
            {role && (
              <span className="mt-1 block text-xs font-medium uppercase tracking-[0.16em] text-white/55">{role}</span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- cta band */

export function CTABand({
  image,
  eyebrow,
  title,
  text,
  children,
}: {
  image?: string;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  text?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#16181c]">
      {image && (
        <EditorialImage src={image} alt="" w={1800} h={700} className="absolute inset-0 h-full w-full object-cover opacity-25" />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(224,126,39,0.22),transparent_55%)]" />
      <div className="relative mx-auto max-w-[1000px] px-4 py-20 text-center">
        {eyebrow && <span className="mb-5 block"><Eyebrow light>{eyebrow}</Eyebrow></span>}
        <motion.h3
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-[clamp(28px,3.8vw,46px)] font-bold leading-tight text-white"
        >
          {title}
        </motion.h3>
        {text && <p className="mx-auto mt-5 max-w-2xl text-[15.5px] leading-relaxed text-white/60">{text}</p>}
        {children && <div className="mt-9 flex flex-wrap justify-center gap-4">{children}</div>}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- small pieces */

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
      {children}
    </span>
  );
}

export function TextLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 text-sm font-semibold ${dark ? "text-white" : "text-secondary"}`}
    >
      <span className="border-b border-transparent transition-colors group-hover:border-primary">{children}</span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-black transition-transform duration-300 group-hover:translate-x-1">
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
