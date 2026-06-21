"use client";
import { useState } from "react";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";
import { coreValues } from "@/data";

export default function CoreValuesSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-[1280px] mx-auto px-4">
        <Reveal>
          <SectionHeader eyebrow="What We Stand For" title="Our Core" accent="Values" />
        </Reveal>
        <div className="max-w-3xl mx-auto space-y-3">
          {coreValues.map((v, i) => (
            <Reveal key={v.letter} delay={i * 0.06}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center gap-5 p-5 bg-white border border-neutral-200 rounded-xl text-left hover:border-primary/30 transition"
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center">
                  {v.letter}
                </span>
                <span className="font-bold text-secondary flex-1">{v.title}</span>
                <svg
                  className={`w-5 h-5 text-neutral-400 transition-transform ${open === i ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-5 pb-5 pt-3 bg-white border border-t-0 border-neutral-200 rounded-b-xl -mt-1">
                  <p className="text-neutral-600 text-[15px] leading-relaxed pl-[60px]">{v.body}</p>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
