import Link from "next/link";
import { Breaker } from "@/components/inner/Breaker";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";

const pillars = [
  "Independent board oversight",
  "Audit & Risk Committee",
  "Remuneration & Nominations Committee",
  "Annual stakeholder reporting",
];

export default function BoardSection() {
  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4">
          <Reveal>
            <SectionHeader eyebrow="Governance" title="Board of" accent="Directors" />
          </Reveal>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {pillars.map((p, i) => (
              <Reveal key={p} delay={i * 0.08}>
                <span className="px-5 py-2.5 rounded-full bg-neutral-100 text-secondary text-sm font-medium border border-neutral-200">
                  {p}
                </span>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="text-center text-neutral-500 text-sm max-w-xl mx-auto">
              Pharco Corporation operates under a board governance model designed to ensure accountability, transparency, and long-term strategic alignment across all group companies.
            </p>
          </Reveal>
        </div>
      </section>
      <Breaker
        title="Shape the future of healthcare"
        subtitle="Join a team that is transforming access to medicines across 60+ countries."
        ctaLabel="Explore Careers"
        ctaHref="/careers"
      />
    </>
  );
}
