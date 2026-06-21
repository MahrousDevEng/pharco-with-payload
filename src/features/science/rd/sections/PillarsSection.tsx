"use client";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";

const pillars = [
  {
    num: "01",
    title: "Drug Discovery & Pipeline",
    body: "Pharco's internal R&D team, in collaboration with global academic partners including the University of Michigan and DNDi, drives a pipeline of novel and improved formulations targeting high-burden diseases.",
  },
  {
    num: "02",
    title: "Active Pharmaceutical Ingredients",
    body: "Through PBIC (Pharco B International for Chemicals), we produce APIs in-house using cGMP-compliant methods, ensuring upstream quality control and supply security. PBIC produced Egypt's first locally-made Sofosbuvir for Hepatitis C.",
  },
  {
    num: "03",
    title: "Biogenerics & Complex Molecules",
    body: "BGP (Bio Generic Pharma), established in 2022, leads the group's expansion into biogeneric and specialty pharmaceutical development, targeting complex molecules that require advanced production capabilities.",
  },
];

export default function PillarsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4">
        <Reveal>
          <SectionHeader
            eyebrow="R&D Focus Areas"
            title="Science Driving"
            accent="Access"
            lede="Our research programme is built around three pillars, each designed to bring better medicines to more patients."
          />
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.1}>
              <div className="relative p-8 border border-neutral-200 rounded-2xl hover:shadow-md hover:border-primary/30 transition h-full">
                <span className="text-7xl font-bold text-neutral-100 absolute top-5 right-5 select-none leading-none">
                  {p.num}
                </span>
                <h3 className="font-bold text-xl text-secondary mb-4 relative z-10">{p.title}</h3>
                <p className="text-neutral-600 leading-relaxed text-[15px] relative z-10">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
