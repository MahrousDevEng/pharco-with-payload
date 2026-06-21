"use client";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";
import { visionMissionPromise } from "@/data";

export default function MissionVisionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4">
        <Reveal>
          <SectionHeader eyebrow="Purpose" title="Vision, Mission &" accent="Promise" />
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {visionMissionPromise.map((item, i) => (
            <Reveal key={item.num} delay={i * 0.1}>
              <div className="relative p-8 border border-neutral-200 rounded-2xl hover:border-primary/40 hover:shadow-md transition h-full">
                <span className="text-6xl font-bold text-neutral-100 absolute top-6 right-6 select-none">
                  {item.num}
                </span>
                <h3 className="font-bold text-xl text-secondary mb-4">{item.title}</h3>
                <p className="text-neutral-600 leading-relaxed text-[15px]">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
