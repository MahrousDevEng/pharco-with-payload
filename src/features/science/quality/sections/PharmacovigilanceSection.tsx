"use client";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";
import { Breaker } from "@/components/inner/Breaker";

export default function PharmacovigilanceSection() {
  return (
    <>
      <section className="py-20 bg-neutral-50">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <SectionHeader
                eyebrow="Patient Safety"
                title="Pharmacovigilance"
                accent="Programme"
                align="left"
              />
              <p className="text-[17px] text-neutral-600 leading-relaxed mb-5">
                Pharco operates a structured pharmacovigilance system to monitor the safety of our medicines in real-world use. All adverse event reports are reviewed, documented, and reported to regulatory authorities in accordance with local and international requirements.
              </p>
              <p className="text-[17px] text-neutral-600 leading-relaxed">
                Our dedicated medical safety team works alongside healthcare professionals to ensure that risk-benefit assessments remain current and that any necessary label updates or risk minimisation measures are implemented promptly.
              </p>
            </Reveal>
            <div className="space-y-4">
              {[
                "Adverse event collection and review",
                "Signal detection and assessment",
                "Periodic safety update reports (PSURs)",
                "Risk minimisation plans",
                "Healthcare professional communications",
                "Regulatory authority submissions",
              ].map((item, i) => (
                <Reveal key={item} delay={i * 0.07}>
                  <div className="flex items-center gap-4 p-4 bg-white border border-neutral-200 rounded-lg">
                    <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-secondary text-sm font-medium">{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Breaker
        title="Quality is not negotiable"
        subtitle="Every medicine we produce is a promise to a patient, and we take that promise seriously."
        ctaLabel="Our Manufacturing"
        ctaHref="/science-manufacturing"
      />
    </>
  );
}
