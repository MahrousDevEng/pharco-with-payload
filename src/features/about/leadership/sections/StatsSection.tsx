"use client";
import { Reveal } from "@/components/inner/Reveal";

const stats = [
  { value: "60+", label: "Countries served" },
  { value: "13", label: "Group companies" },
  { value: "7,000+", label: "Employees worldwide" },
  { value: "1957", label: "Year founded" },
];

export default function StatsSection() {
  return (
    <section className="py-12 bg-white border-b border-neutral-100">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center">
                <div className="text-[clamp(36px,5vw,64px)] font-bold text-primary leading-none mb-2">
                  {s.value}
                </div>
                <p className="text-sm text-neutral-500 uppercase tracking-wider">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
