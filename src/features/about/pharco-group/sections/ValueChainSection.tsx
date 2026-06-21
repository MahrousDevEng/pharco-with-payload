"use client";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";
import { valueChain } from "@/data";

export default function ValueChainSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4">
        <Reveal>
          <SectionHeader
            eyebrow="Integrated Model"
            title="Our Value"
            accent="Chain"
            lede="From discovery to the patient, Pharco controls the full pharmaceutical value chain."
          />
        </Reveal>
        <div className="relative">
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-neutral-200" />
          <div className="grid md:grid-cols-5 gap-6 relative">
            {valueChain.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 w-16 h-16 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center mb-4 shadow-md">
                    {step.num}
                  </div>
                  <h4 className="font-bold text-secondary mb-2">{step.title}</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
