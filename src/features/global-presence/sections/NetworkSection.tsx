"use client";
import { Reveal } from "@/components/inner/Reveal";

const PILLARS = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
    num: "8",
    title: "Manufacturing Partners",
    body: "CMO contracts with multinational pharmaceutical companies, producing branded products under license at Pharco facilities for MENA and Africa.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
      </svg>
    ),
    num: "40+",
    title: "Distribution Partners",
    body: "Exclusive in-market distributors across MENA, Africa, Asia, Europe, and Latin America, maintaining cold-chain integrity from factory to pharmacy.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    num: "15+",
    title: "R&D Partners",
    body: "Universities, research institutes, and biotech companies across Egypt, Europe, and the United States, collaborating on antivirals, neuroscience, and public health.",
  },
];

export default function NetworkSection() {
  return (
    <section className="py-16 bg-neutral-100">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="text-primary uppercase tracking-[0.18em] text-xs font-semibold mb-3">Our Global Network</p>
            <h2 className="text-secondary font-normal leading-tight mb-5 text-[clamp(26px,3.5vw,42px)]">
              Three pillars of <span className="text-primary">international reach</span>
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-[460px]">
              Pharco&apos;s presence across 60+ countries is supported by a network of partners across the full value chain, from API supply and co-manufacturing to in-market distribution and joint research.
            </p>
          </Reveal>
          <div className="flex flex-col gap-5">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="flex gap-5 items-start p-5 rounded-xl border border-neutral-100 bg-neutral-50 hover:border-primary hover:bg-white hover:shadow-md transition-all duration-300">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-none">{p.icon}</div>
                  <div>
                    <div className="text-2xl font-normal text-primary leading-none mb-1">{p.num}</div>
                    <div className="font-semibold text-secondary text-sm mb-1">{p.title}</div>
                    <p className="text-xs text-neutral-500 leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
