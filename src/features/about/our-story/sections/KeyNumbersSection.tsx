"use client";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";
import { StatCard } from "@/components/inner/StatCard";
import { keyNumbers } from "@/data";

export default function KeyNumbersSection() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-[1280px] mx-auto px-4">
        <Reveal>
          <SectionHeader
            eyebrow="By the Numbers"
            title="Pharco"
            accent="at a Glance"
            lede="Six decades of pharmaceutical leadership, measured in lives improved, markets served, and medicines delivered."
          />
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {keyNumbers.map((kn, i) => (
            <Reveal key={kn.label} delay={i * 0.07}>
              <StatCard value={kn.value} suffix={kn.suffix} label={kn.label} lead={kn.lead} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
