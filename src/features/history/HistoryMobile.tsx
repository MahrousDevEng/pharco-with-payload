"use client";
import NextImage from "@/components/NextImage";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

type Section = { title: string; description?: string; image?: string | { src: string } };
type TimelineItem = { year: number; sections?: Section[] };

function splitYear(year: number | null) {
  const s = year ? String(year) : "";
  if (s.length <= 2) return { prefix: "", suffix: s };
  return { prefix: s.slice(0, s.length - 2), suffix: s.slice(-2) };
}

export default function HistoryMobile({ timeline }: { timeline: TimelineItem[] }) {
  const [activeYear, setActiveYear] = useState<number | null>(timeline[0]?.year ?? null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveYear(timeline[index]?.year);
            }
          });
        },
        { rootMargin: "0px 0px -70% 0px", threshold: 0 }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [timeline]);

  const { prefix, suffix } = splitYear(activeYear);

  return (
    <div className="lg:hidden text-black">
      <div className="sticky top-[var(--header-height,72px)] z-50 flex justify-center items-center py-2 bg-white/95 backdrop-blur-sm border-b border-gray-100 pointer-events-none">
        <div className="flex items-center" style={{ lineHeight: 1 }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={prefix}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-5xl sm:text-6xl font-bold text-[#e07e27] tracking-tight"
              style={{ lineHeight: 1 }}
            >
              {prefix}
            </motion.span>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.span
              key={suffix}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="text-5xl sm:text-6xl font-bold text-[#e07e27] tracking-tight"
              style={{ lineHeight: 1 }}
            >
              {suffix}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {timeline.map((item, index) => (
          <div
            key={index}
            ref={(el) => { sectionRefs.current[index] = el; }}
            style={{ scrollSnapAlign: "start" }}
            className={index !== timeline.length - 1 ? "border-b border-gray-200" : ""}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative border-l-4 border-[#e07e27] pl-5 py-5 my-5"
            >
              <div className="absolute top-0 left-0 w-3 h-3 bg-[#e07e27] -translate-x-1/2 -translate-y-1/2 z-10" />

              <div className="space-y-5">
                {item.sections?.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <h3 className="text-xl font-bold mb-2 text-black leading-tight">
                      {section.title}
                    </h3>

                    {section.description && (
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {section.description}
                      </p>
                    )}

                    {section.image && (
                      <figure className="w-full aspect-video mt-3 overflow-hidden rounded-lg border-2 border-gray-200">
                        <NextImage
                          src={section.image}
                          alt={section.title}
                          width={6000}
                          height={6000}
                          className="object-cover h-full w-full"
                        />
                      </figure>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
