"use client";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";
import { Breaker } from "@/components/inner/Breaker";
import { therapeuticAreas } from "@/data";

export default function AreasGridSection() {
  return (
    <>
      <section className="py-20 bg-neutral-50">
        <div className="max-w-[1280px] mx-auto px-4">
          <Reveal>
            <SectionHeader
              eyebrow="Expertise"
              title="Areas of"
              accent="Therapy"
              lede="From everyday primary care to specialist treatments, our portfolio addresses the conditions that matter most to patients."
            />
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {therapeuticAreas.map((ta, i) => (
              <Reveal key={ta.slug} delay={(i % 3) * 0.08}>
                <div className="bg-white border border-neutral-200 rounded-xl p-7 hover:shadow-md hover:border-primary/30 transition h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-secondary">{ta.title}</h3>
                    <span className="flex-shrink-0 bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full ml-3">
                      {ta.count} products
                    </span>
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed">{ta.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Breaker
        title="Browse the full product portfolio"
        subtitle="Search and filter all 217 Pharco products by therapeutic area."
        ctaLabel="Products Overview"
        ctaHref="/products-overview"
      />
    </>
  );
}
