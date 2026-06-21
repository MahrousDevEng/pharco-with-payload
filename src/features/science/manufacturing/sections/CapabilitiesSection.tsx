"use client";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";
import { Breaker } from "@/components/inner/Breaker";

const lines = [
  { title: "Solid Dosage Forms", body: "Tablets, capsules, and sachet powders, including modified release, film-coated, and enteric-coated formulations produced at scale." },
  { title: "Soft Gelatin Capsules", body: "Advanced softgel manufacturing capabilities, the foundation of Pharco's original production competency since 1987." },
  { title: "Sterile & Parenteral", body: "Ampoules, vials, and large-volume parenterals produced in ISO-classified clean rooms to stringent cGMP standards." },
  { title: "Beta-Lactam Antibiotics", body: "Dedicated, physically isolated beta-lactam facility ensuring zero cross-contamination risk, approved for cephalosporins and penicillins." },
  { title: "Hormonal Products", body: "Specialised hormone production at Techno Pharma Egypt covering contraceptives, HRT, and fertility treatments for women's health." },
  { title: "API Manufacturing", body: "PBIC produces Active Pharmaceutical Ingredients in-house including Sofosbuvir, Egypt's first locally manufactured HCV API." },
];

export default function CapabilitiesSection() {
  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4">
          <Reveal>
            <SectionHeader
              eyebrow="Production Capabilities"
              title="What We"
              accent="Manufacture"
              lede="Six production categories across 13 group companies, covering virtually every dosage form in modern pharmaceutical manufacturing."
            />
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lines.map((l, i) => (
              <Reveal key={l.title} delay={(i % 3) * 0.08}>
                <div className="p-7 border border-neutral-200 rounded-xl hover:shadow-md hover:border-primary/30 transition h-full">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 font-bold text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-bold text-secondary mb-2">{l.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{l.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Breaker
        title="Built for quality at every scale"
        subtitle="Our manufacturing infrastructure is the backbone of patient access across 60+ countries."
        ctaLabel="Quality & Compliance"
        ctaHref="/science-quality"
      />
    </>
  );
}
