"use client";
import { Reveal } from "@/components/inner/Reveal";
import { StatCard } from "@/components/inner/StatCard";

const stats = [
  { value: 1.6, suffix: "M", label: "Packs / Day", lead: "manufactured across all facilities" },
  { value: 13, suffix: "", label: "Facilities", lead: "across the Pharco Group" },
  { value: 60, suffix: "+", label: "Countries", lead: "receiving our products" },
  { value: 7000, suffix: "+", label: "Employees", lead: "in manufacturing & operations" },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <StatCard value={s.value} suffix={s.suffix} label={s.label} lead={s.lead} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
