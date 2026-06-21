"use client";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";
import { hepCStats } from "@/data";

export default function HepCSection() {
  return (
    <section className="py-20 bg-secondary text-white">
      <div className="max-w-[1280px] mx-auto px-4">
        <Reveal>
          <SectionHeader
            eyebrow="Hepatitis C"
            title="Eliminating"
            accent="Hepatitis C"
            lede="Pharco has been at the forefront of Egypt's national Hepatitis C elimination programme, the most ambitious viral hepatitis programme in history."
          />
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {hepCStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="bg-white/10 rounded-xl p-7 text-center border border-white/10">
                <div className="text-[clamp(32px,4vw,52px)] font-bold text-primary leading-none mb-3">
                  {s.value}
                </div>
                <p className="text-white/80 text-sm">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
