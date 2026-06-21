"use client";
import Image from "next/image";
import { Reveal } from "@/components/inner/Reveal";

export default function FounderStorySection() {
  return (
    <section className="py-20 bg-secondary text-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/Abbas-helmy.jpg"
                alt="Dr. Hassan Helmy, Founder, Pharco Corporation"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="inline-block text-xs tracking-[0.18em] uppercase text-primary font-bold mb-4">
              Our Founder
            </span>
            <h2 className="font-bold text-[clamp(32px,4vw,52px)] leading-tight mb-6">
              Dr. Hassan Helmy
            </h2>
            <p className="text-white/80 text-[17px] leading-relaxed mb-5">
              In 1957, Dr. Hassan Abbas Helmy opened Glym Pharmacy in Alexandria, a single dispensary driven by a conviction that every patient deserves access to quality medicine.
            </p>
            <p className="text-white/80 text-[17px] leading-relaxed mb-5">
              That conviction grew into a pharmaceutical group spanning 13 companies, more than 7,000 employees, and a presence in over 60 countries.
            </p>
            <blockquote className="border-l-4 border-primary pl-5 text-white/90 italic text-lg leading-relaxed">
              &ldquo;All people across the world deserve to live a healthy and fulfilling life.&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
