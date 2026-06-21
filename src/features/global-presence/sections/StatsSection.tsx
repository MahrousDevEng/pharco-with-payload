"use client";
import { Reveal } from "@/components/inner/Reveal";
import { Counter } from "@/components/inner/Counter";

const STATS = [
  { value: 60, suffix: "+", label: "Countries", sub: "served worldwide" },
  { value: 5, suffix: "", label: "Continents", sub: "active operations" },
  { value: 13, suffix: "", label: "Companies", sub: "in the Pharco Group" },
  { value: 40, suffix: "+", label: "Partners", sub: "global distribution" },
];

export default function StatsSection() {
  return (
    <section className="py-10 bg-neutral-50 border-b border-neutral-100">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-100">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <div className="px-6 py-4 text-center">
                <div className="text-[48px] leading-none font-normal text-primary mb-1">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="font-semibold text-secondary text-sm tracking-wide">{s.label}</div>
                <div className="text-neutral-400 text-xs mt-0.5">{s.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
