"use client";
import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/inner/Reveal";
import { timeline } from "@/data";

export default function TimelineSection() {
  const [activeYear, setActiveYear] = useState<number>(timeline[0].year);
  const activeEntry = timeline.find((t) => t.year === activeYear)!;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Year navigation */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-16 scrollbar-hide">
          {timeline.map((t) => (
            <button
              key={t.year}
              onClick={() => setActiveYear(t.year)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                activeYear === t.year
                  ? "bg-primary text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {t.year}
            </button>
          ))}
        </div>

        {/* Active year content */}
        <div className="space-y-16">
          {activeEntry.sections.map((section, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <span className="inline-block text-[80px] font-bold text-neutral-100 leading-none mb-2 select-none">
                    {activeYear}
                  </span>
                  <h3 className="font-bold text-[clamp(22px,3vw,34px)] text-secondary mb-4 -mt-4">
                    {section.title}
                  </h3>
                  <p className="text-[17px] text-neutral-600 leading-relaxed">{section.description}</p>
                </div>
                {section.image && (
                  <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
