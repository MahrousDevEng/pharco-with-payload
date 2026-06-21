"use client";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";
import { Breaker } from "@/components/inner/Breaker";
import { groupCompanies } from "@/data";

export default function CompaniesSection() {
  return (
    <>
      <section className="py-20 bg-neutral-50">
        <div className="max-w-[1280px] mx-auto px-4">
          <Reveal>
            <SectionHeader
              eyebrow="Group Companies"
              title="13 Companies,"
              accent="One Mission"
              lede="Each company in the Pharco Group contributes a distinct capability, and together they form an integrated pharmaceutical ecosystem."
            />
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupCompanies.map((co, i) => (
              <Reveal key={co.num} delay={(i % 3) * 0.08}>
                <div className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-md hover:border-primary/30 transition h-full">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl font-bold text-neutral-100">{co.num}</span>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      {co.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-secondary mb-2">{co.name}</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">{co.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Breaker
        title="A group built for global reach"
        subtitle="Discover how Pharco's 13 companies collaborate to serve patients across 60+ countries."
        ctaLabel="Our Global Presence"
        ctaHref="/global-presence"
      />
    </>
  );
}
