"use client";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";
import { leadershipPlaceholders } from "@/data";

export default function SeniorLeadershipSection() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-[1280px] mx-auto px-4">
        <Reveal>
          <SectionHeader eyebrow="Senior Team" title="Group" accent="Leadership" />
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {leadershipPlaceholders.map((l, i) => (
            <Reveal key={l.initials} delay={i * 0.06}>
              <div className="bg-white border border-neutral-200 rounded-xl p-6 text-center hover:shadow-md transition hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {l.initials}
                </div>
                <h4 className="font-bold text-secondary text-sm leading-tight mb-1">{l.name}</h4>
                <p className="text-xs text-primary font-semibold">{l.area}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
