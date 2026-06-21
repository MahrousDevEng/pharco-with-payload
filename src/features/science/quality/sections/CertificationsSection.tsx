"use client";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";

const certs = [
  { code: "cGMP", name: "Current Good Manufacturing Practice", body: "All Pharco facilities operate under cGMP standards, the global benchmark for pharmaceutical manufacturing quality and safety." },
  { code: "WHO PQ", name: "WHO Prequalification", body: "EEPI received WHO prequalification for Sofosbuvir 400mg in December 2018, enabling supply to low and middle-income countries." },
  { code: "EU GMP", name: "EU GMP Certification", body: "European Egyptian Pharmaceutical Industries operates under EU GMP qualification, enabling market access across European and regulated markets." },
  { code: "ISO", name: "ISO Quality Standards", body: "Pharco facilities maintain ISO certification across quality management systems, aligning with international best practice." },
  { code: "SFDA", name: "Saudi FDA Approval", body: "Products manufactured for the Saudi market meet SFDA (Saudi Food & Drug Authority) requirements, managed through Batterjee Pharma." },
  { code: "EDA", name: "Egyptian Drug Authority", body: "All domestic products are registered and approved by the Egyptian Drug Authority, Egypt's primary medicines regulator." },
  { code: "FDA", name: "US FDA Compliance", body: "Select Pharco manufacturing sites and products are aligned with US FDA expectations, supporting export market development." },
  { code: "GCP", name: "Good Clinical Practice", body: "Clinical research conducted by or in partnership with Pharco follows GCP guidelines to ensure trial integrity and patient safety." },
];

export default function CertificationsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4">
        <Reveal>
          <SectionHeader
            eyebrow="Quality Standards"
            title="Certifications &"
            accent="Approvals"
            lede="Our quality credentials span local, regional, and international regulatory frameworks, reflecting our commitment to export-grade standards."
          />
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {certs.map((c, i) => (
            <Reveal key={c.code} delay={(i % 4) * 0.07}>
              <div className="p-6 border border-neutral-200 rounded-xl hover:shadow-md hover:border-primary/30 transition h-full">
                <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-primary text-white text-sm font-bold mb-4">
                  {c.code}
                </div>
                <h4 className="font-bold text-secondary text-sm mb-2">{c.name}</h4>
                <p className="text-neutral-500 text-xs leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
