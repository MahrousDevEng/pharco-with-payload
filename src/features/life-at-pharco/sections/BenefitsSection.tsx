"use client";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";
import { Breaker } from "@/components/inner/Breaker";

const BENEFITS = [
  {
    title: "Health Insurance",
    desc: "Comprehensive medical coverage for you and your immediate family from day one.",
    icon: <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10"><rect width="40" height="40" rx="12" fill="#e8f4f8" /><path d="M20 10c-1.8-2.4-5.5-3-7.5-1a6 6 0 0 0 0 8.5L20 25l7.5-7.5a6 6 0 0 0 0-8.5C25.5 7 21.8 7.6 20 10Z" stroke="#006699" strokeWidth="2" strokeLinejoin="round" /><line x1="20" y1="15" x2="20" y2="21" stroke="#006699" strokeWidth="2" strokeLinecap="round" /><line x1="17" y1="18" x2="23" y2="18" stroke="#006699" strokeWidth="2" strokeLinecap="round" /></svg>,
  },
  {
    title: "Annual Performance Bonus",
    desc: "Rewarding results with a competitive bonus tied to personal and company performance.",
    icon: <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10"><rect width="40" height="40" rx="12" fill="#e8f4f8" /><circle cx="20" cy="20" r="9" stroke="#006699" strokeWidth="2" /><path d="M20 13v1.5M20 25.5V27M16.5 16.5c0-1 .8-2 3.5-2s3.5 1 3.5 2.5-2 2-3.5 2.5-3.5 1.5-3.5 3 1 2.5 3.5 2.5 3.5-1 3.5-2" stroke="#006699" strokeWidth="1.8" strokeLinecap="round" /></svg>,
  },
  {
    title: "Continuous Learning",
    desc: "Technical, regulatory and leadership programmes, with 200+ hours of development per year.",
    icon: <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10"><rect width="40" height="40" rx="12" fill="#e8f4f8" /><path d="M11 27V16l9-5 9 5v11" stroke="#006699" strokeWidth="2" strokeLinejoin="round" /><path d="M20 11l9 5-9 5-9-5 9-5Z" stroke="#006699" strokeWidth="2" strokeLinejoin="round" /><path d="M15 19v8M25 19v8" stroke="#006699" strokeWidth="1.5" strokeLinecap="round" /><path d="M13 27h14" stroke="#006699" strokeWidth="2" strokeLinecap="round" /></svg>,
  },
  {
    title: "Cafeterias & Transport",
    desc: "On-site subsidised meals and company transport across all manufacturing and office sites.",
    icon: <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10"><rect width="40" height="40" rx="12" fill="#e8f4f8" /><rect x="10" y="17" width="20" height="10" rx="2" stroke="#006699" strokeWidth="2" /><path d="M13 17l2-5h10l2 5" stroke="#006699" strokeWidth="2" strokeLinejoin="round" /><circle cx="15" cy="28" r="2" fill="#006699" /><circle cx="25" cy="28" r="2" fill="#006699" /><line x1="10" y1="22" x2="30" y2="22" stroke="#006699" strokeWidth="1.5" /></svg>,
  },
  {
    title: "Family Medical Coverage",
    desc: "Extended healthcare benefits covering spouses and children, because family comes first.",
    icon: <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10"><rect width="40" height="40" rx="12" fill="#e8f4f8" /><circle cx="15" cy="14" r="3" stroke="#006699" strokeWidth="2" /><circle cx="25" cy="14" r="3" stroke="#006699" strokeWidth="2" /><path d="M9 28c0-4 2.7-6 6-6h10c3.3 0 6 2 6 6" stroke="#006699" strokeWidth="2" strokeLinecap="round" /></svg>,
  },
  {
    title: "Pension & Social Security",
    desc: "Full social insurance compliance and a structured pension scheme for long-term security.",
    icon: <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10"><rect width="40" height="40" rx="12" fill="#e8f4f8" /><path d="M20 10l8 3.5v6c0 4.5-3.5 8-8 9.5C12 27.5 12 24 12 19.5v-6L20 10Z" stroke="#006699" strokeWidth="2" strokeLinejoin="round" /><path d="M16.5 20l2.5 2.5 4-4.5" stroke="#006699" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
];

export default function BenefitsSection() {
  return (
    <>
      <section className="py-16 bg-neutral-50">
        <div className="max-w-[1280px] mx-auto px-4">
          <SectionHeader eyebrow="Benefits & Wellbeing" title="Taking care of" accent="our people" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <div className="bg-white border border-neutral-200 rounded-2xl p-7 h-full flex flex-col gap-4 hover:shadow-lg hover:border-primary/30 transition">
                  {b.icon}
                  <div>
                    <h4 className="font-bold text-secondary mb-1">{b.title}</h4>
                    <p className="text-sm text-neutral-500 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Breaker
        title="Open roles right now"
        subtitle="R&D, manufacturing, regulatory, sales, finance: we're hiring across all functions."
        ctaLabel="See open roles →"
        ctaHref="/careers"
      />
    </>
  );
}
