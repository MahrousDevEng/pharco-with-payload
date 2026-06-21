"use client";
import { Reveal } from "@/components/inner/Reveal";

const REGIONS = [
  { num: "01", t: "Egypt", badge: "Home Market", bullets: ["Manufacturing & R&D headquarters", "Largest single product portfolio", "Alexandria, founded 1981"] },
  { num: "02", t: "GCC", badge: "6 Countries", bullets: ["KSA, UAE, Kuwait, Oman, Qatar, Bahrain", "Batterjee Pharma partnership", "Direct subsidiaries & registrations"] },
  { num: "03", t: "Africa", badge: "22 Countries", bullets: ["North, East & West Africa", "Primary care & antimicrobials", "Hepatitis C & schistosomiasis programmes"] },
  { num: "04", t: "MENA", badge: "8 Countries", bullets: ["Iraq, Jordan, Lebanon, Yemen", "Levant & broader MENA region", "Strong primary care presence"] },
  { num: "05", t: "Europe", badge: "Est. 1993", bullets: ["Pharco Impex Romania anchor entity", "Central & Eastern Europe distribution", "EU GMP-recognised manufacturing"] },
  { num: "06", t: "Asia Pacific", badge: "12 Countries", bullets: ["South Asia & Southeast Asia", "Antivirals, oncology, primary care", "Strategic licensing partnerships"] },
  { num: "07", t: "Latin America", badge: "Growing", bullets: ["Pharco B International expansion", "Brazil, Argentina, Colombia, Mexico", "ANVISA-approved manufacturing"] },
  { num: "08", t: "United States", badge: "R&D Hub", bullets: ["Presidio Pharmaceuticals", "Strategic R&D partnerships", "US market presence & pipeline"] },
];

export default function RegionsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-4">
        <Reveal>
          <p className="text-primary uppercase tracking-[0.18em] text-xs font-semibold mb-2">Our Regions</p>
          <h2 className="text-secondary font-normal mb-10 text-[clamp(26px,3.5vw,42px)]">
            Eight regions, <span className="text-primary">one network</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REGIONS.map((r, i) => (
            <Reveal key={r.t} delay={i * 0.05}>
              <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 hover:border-primary hover:shadow-lg transition-all duration-300 group h-full">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[36px] leading-none font-normal text-primary/20 group-hover:text-primary/40 transition-colors select-none">{r.num}</span>
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-primary bg-primary/10 px-2.5 py-1 rounded-full whitespace-nowrap">{r.badge}</span>
                </div>
                <h3 className="text-base font-semibold text-secondary mb-3">{r.t}</h3>
                <ul className="space-y-1.5">
                  {r.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[12px] text-neutral-500 leading-snug">
                      <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-primary flex-none" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
