"use client";
import { Reveal } from "@/components/inner/Reveal";
import { valueChain } from "@/data";

export default function WhoWeAreSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <span className="inline-block text-xs tracking-[0.18em] uppercase text-primary font-bold mb-3">
              Who We Are
            </span>
            <h2 className="font-bold text-[clamp(32px,4.5vw,56px)] text-secondary leading-tight mb-6">
              Egypt&apos;s largest{" "}
              <span className="text-primary">pharmaceutical group</span>
            </h2>
            <p className="text-[17px] text-neutral-600 leading-relaxed mb-4">
              Pharco Corporation is Egypt&apos;s largest integrated pharmaceutical group, a family of 13 companies spanning research, manufacturing, distribution, and international markets.
            </p>
            <p className="text-[17px] text-neutral-600 leading-relaxed">
              Founded in 1957 and built over six decades of purposeful growth, Pharco today employs more than 7,000 people and serves patients in over 60 countries.
            </p>
          </Reveal>
          <div className="space-y-4">
            {valueChain.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.08}>
                <div className="flex gap-5 p-5 border border-neutral-200 rounded-xl hover:border-primary/30 transition">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                    {step.num}
                  </span>
                  <div>
                    <h4 className="font-bold text-secondary mb-1">{step.title}</h4>
                    <p className="text-sm text-neutral-600 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
