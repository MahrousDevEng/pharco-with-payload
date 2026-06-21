"use client";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";
import { Breaker } from "@/components/inner/Breaker";
import { csrPillars } from "@/data";

const icons = ["♥", "⚕", "🌿", "🤝"];

export default function CSRPillarsSection() {
  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4">
          <Reveal>
            <SectionHeader
              eyebrow="Our Commitments"
              title="CSR"
              accent="Pillars"
              lede="Our corporate social responsibility programme is built around four commitments that reflect who we are as a company."
            />
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            {csrPillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="p-8 border border-neutral-200 rounded-2xl hover:shadow-md hover:border-primary/30 transition h-full">
                  <div className="text-3xl mb-4">{icons[i]}</div>
                  <h3 className="font-bold text-xl text-secondary mb-3">{p.title}</h3>
                  <p className="text-neutral-600 leading-relaxed text-[15px]">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Breaker
        title="Science in service of society"
        subtitle="Pharco's commitment extends beyond the laboratory and into communities, environments, and futures."
        ctaLabel="Our Full Story"
        ctaHref="/about-our-story"
      />
    </>
  );
}
