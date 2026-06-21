"use client";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";
import { Breaker } from "@/components/inner/Breaker";

const partners = [
  { name: "University of Michigan", area: "Academic Research" },
  { name: "DNDi", area: "Neglected Diseases" },
  { name: "Chemelctiva", area: "API Development" },
  { name: "Presidio Pharmaceuticals", area: "HCV Treatment" },
  { name: "SeegPharm", area: "Process Chemistry" },
];

export default function PartnersSection() {
  return (
    <>
      <section className="py-20 bg-neutral-50">
        <div className="max-w-[1280px] mx-auto px-4">
          <Reveal>
            <SectionHeader eyebrow="Collaborations" title="Global R&D" accent="Partners" />
          </Reveal>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
            {partners.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <div className="bg-white border border-neutral-200 rounded-xl p-6 text-center hover:shadow-md hover:border-primary/30 transition">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {p.name[0]}
                  </div>
                  <h4 className="font-bold text-secondary text-sm mb-1">{p.name}</h4>
                  <p className="text-xs text-primary font-medium">{p.area}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Breaker
        title="Innovation with purpose"
        subtitle="Every research investment is guided by one question: will this help more patients access better treatment?"
        ctaLabel="Our Products"
        ctaHref="/products-overview"
      />
    </>
  );
}
