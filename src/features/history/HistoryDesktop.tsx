"use client";
import NextImage from "@/components/NextImage";
import { cn } from "@/utils";
import { motion } from "framer-motion";

const YEAR_CLS =
  "sm:text-[140px] md:text-[180px] xl:text-[260px] 2xl:text-[300px] leading-none md:tracking-[-0.75rem] font-bold flex items-start";
const STICKY_TOP =
  "sticky top-[calc(var(--header-height)_+_80px)] self-start pt-10";

type Section = { title: string; description?: string; image?: string | { src: string } };
type TimelineItem = { year: number; sections?: Section[] };

interface Props {
  timeline: TimelineItem[];
  prefixDigits: string[];
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export default function HistoryDesktop({ timeline, prefixDigits, itemRefs }: Props) {
  return (
    <div className="hidden lg:grid grid-cols-4 border-black relative text-black">
      <div className="col-span-1">
        <div className={cn(STICKY_TOP, YEAR_CLS, "justify-end text-[#e07e27]")}>
          {prefixDigits.map((digit, i) => (
            <span key={i}>{digit}</span>
          ))}
        </div>
      </div>

      <div className="col-span-3 flex flex-col">
        {timeline.map((item, index) => {
          const yearString = item.year ? String(item.year) : "";
          const suffix =
            yearString.length > 2 ? yearString.slice(-2) : yearString;

          return (
            <div
              key={index}
              ref={(el) => { itemRefs.current[index] = el; }}
              className={cn(
                "grid grid-cols-9 w-full border-b border-black last:border-b-0 relative snap-start min-h-[calc(100vh-72px)]"
              )}
            >
              <div className={cn(STICKY_TOP, YEAR_CLS, "col-span-2 justify-start")}>
                {suffix.split("").map((digit, i) => (
                  <span key={i}>{digit}</span>
                ))}
              </div>

              <div className="col-start-4 col-end-10 flex flex-col">
                {item.sections?.map((section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    className={cn(
                      "max-w-[80%] pb-10",
                      sectionIndex === 0 && "mt-12"
                    )}
                  >
                    <motion.h3
                      className="max-w-full break-words text-3xl xl:text-4xl font-bold mb-5 !leading-none"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      viewport={{ once: false, amount: 0.4 }}
                    >
                      {section.title}
                    </motion.h3>
                    <div className="ck-editor">
                      {section.description && (
                        <p className="max-w-full break-words text-base leading-relaxed">
                          {section.description}
                        </p>
                      )}
                      {section.image && (
                        <figure className="w-full aspect-video mt-4 overflow-hidden rounded-lg border-2 border-gray-200">
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
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
