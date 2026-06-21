"use client";
import Image from "next/image";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";
import { executiveLeaders } from "@/data";

export default function ExecutiveSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4">
        <Reveal>
          <SectionHeader eyebrow="Executive Leadership" title="Founder &" accent="Chairman" align="left" />
        </Reveal>
        <div className="grid md:grid-cols-2 gap-10">
          {executiveLeaders.map((leader, i) => (
            <Reveal key={leader.name} delay={i * 0.12}>
              <div className="flex gap-6 p-8 border border-neutral-200 rounded-2xl hover:shadow-md transition">
                {leader.photo ? (
                  <div className="relative flex-shrink-0 w-24 h-24 rounded-full overflow-hidden">
                    <Image src={leader.photo} alt={leader.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-24 h-24 rounded-full bg-secondary text-white flex items-center justify-center text-2xl font-bold">
                    {leader.initials}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-xl text-secondary mb-1">{leader.name}</h3>
                  <p className="text-primary text-sm font-semibold mb-3">{leader.role}</p>
                  <p className="text-neutral-600 text-sm leading-relaxed">{leader.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
