"use client";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";

const PILLARS = [
  { t: "Purpose-driven work", b: "Every Pharco employee, from manufacturing to marketing, works on products that touch real patients in real moments. That's the job, and it's the reward." },
  { t: "Growth from within", b: "Most of our senior leaders started in entry-level roles. Career progression is genuine, not theoretical." },
  { t: "Best-in-class training", b: "Continuous technical, regulatory, and leadership development. We invest in people because the work demands it." },
  { t: "Health & wellbeing", b: "On-site medical support, employee wellness programmes, and family healthcare benefits across all sites." },
];

export default function WhySection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-4">
        <SectionHeader eyebrow="What it's like" title="Four reasons people" accent="stay at Pharco" />
        <div className="grid md:grid-cols-2 gap-5">
          {PILLARS.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.06}>
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-7 h-full hover:bg-white hover:shadow-lg transition">
                <div className="font-bold text-4xl text-primary mb-2">{String(i + 1).padStart(2, "0")}</div>
                <h4 className="font-bold text-secondary mb-2">{p.t}</h4>
                <p className="text-sm text-neutral-600 leading-relaxed">{p.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
