"use client";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";
import { therapeuticAreas, products } from "@/data";

export default function StatsSection() {
  const totalProducts = products.length;
  return (
    <section className="py-12 bg-white border-b border-neutral-100">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-3 gap-8 text-center">
          {[
            { value: therapeuticAreas.length, label: "Therapeutic Areas" },
            { value: `${totalProducts}+`, label: "Products" },
            { value: "60+", label: "Export Markets" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-[clamp(40px,5vw,64px)] font-bold text-primary leading-none mb-2">
                {s.value}
              </div>
              <p className="text-sm text-neutral-500 uppercase tracking-wider">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
