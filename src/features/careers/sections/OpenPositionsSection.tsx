"use client";
import Link from "next/link";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";
import { Breaker } from "@/components/inner/Breaker";

const positions = [
  { title: "Senior Quality Assurance Manager", dept: "Quality & Compliance", location: "Alexandria, Egypt", type: "Full-time" },
  { title: "Medical Science Liaison", dept: "Medical Affairs", location: "Cairo, Egypt", type: "Full-time" },
  { title: "Research Scientist, API Development", dept: "R&D · PBIC", location: "Alexandria, Egypt", type: "Full-time" },
  { title: "International Business Development Manager", dept: "Global Markets", location: "Remote / Egypt", type: "Full-time" },
  { title: "Regulatory Affairs Specialist", dept: "Regulatory", location: "Cairo, Egypt", type: "Full-time" },
  { title: "Manufacturing Operations Supervisor", dept: "Operations", location: "Alexandria, Egypt", type: "Full-time" },
];

export default function OpenPositionsSection() {
  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4">
          <Reveal>
            <SectionHeader
              eyebrow="Current Openings"
              title="Open"
              accent="Positions"
              lede="We are always looking for talented people who share our commitment to patients, quality, and innovation."
              align="left"
            />
          </Reveal>
          <div className="space-y-4">
            {positions.map((pos, i) => (
              <Reveal key={pos.title} delay={i * 0.07}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 border border-neutral-200 rounded-xl hover:border-primary/30 hover:shadow-md transition">
                  <div>
                    <h3 className="font-bold text-secondary mb-1">{pos.title}</h3>
                    <div className="flex flex-wrap gap-3 text-xs text-neutral-500">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                        {pos.dept}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 inline-block" />
                        {pos.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 inline-block" />
                        {pos.type}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/careers/apply"
                    className="flex-shrink-0 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition"
                  >
                    Apply Now
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Breaker
        title="Don&apos;t see the right role?"
        subtitle="We accept speculative applications. Tell us what you bring and where you think you can contribute."
        ctaLabel="Send a Speculative CV"
        ctaHref="/careers/apply"
      />
    </>
  );
}
