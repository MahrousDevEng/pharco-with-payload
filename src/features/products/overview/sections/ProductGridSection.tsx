"use client";
import { useState } from "react";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";
import { Breaker } from "@/components/inner/Breaker";
import { products, therapeuticAreas } from "@/data";

export default function ProductGridSection() {
  const [activeTA, setActiveTA] = useState("All");
  const tas = ["All", ...therapeuticAreas.map((t) => t.title)];
  const filtered = activeTA === "All" ? products : products.filter((p) => p.ta === activeTA);

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4">
          <Reveal>
            <SectionHeader
              eyebrow="Our Portfolio"
              title="Medicines for"
              accent="Every Patient"
              lede={`${products.length}+ products across ${therapeuticAreas.length} therapeutic areas.`}
            />
          </Reveal>

          {/* Sticky filter bar */}
          <div className="sticky top-0 z-20 bg-white/95 backdrop-blur py-3 mb-10 -mx-4 px-4 border-b border-neutral-100">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {tas.map((ta) => (
                <button
                  key={ta}
                  onClick={() => setActiveTA(ta)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition ${
                    activeTA === ta
                      ? "bg-primary text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {ta}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filtered.map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-center hover:border-primary/40 hover:bg-primary/5 transition cursor-default"
              >
                <div className="font-bold text-secondary text-xs leading-tight">{p.name}</div>
                <div className="text-[10px] text-primary mt-1 font-medium">{p.ta}</div>
              </div>
            ))}
          </div>

          <p className="text-center text-neutral-400 text-sm mt-8">
            Showing {filtered.length} of {products.length} products
          </p>
        </div>
      </section>
      <Breaker
        title="Explore our therapeutic areas"
        subtitle="Discover how Pharco's portfolio addresses the full spectrum of patient health needs."
        ctaLabel="Therapeutic Areas"
        ctaHref="/products-therapeutic-areas"
      />
    </>
  );
}
