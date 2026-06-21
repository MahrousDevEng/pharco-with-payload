"use client";

import { timeline } from "@/data";
import { useState, useEffect, useRef } from "react";
import HistoryDesktop from "./HistoryDesktop";
import HistoryMobile from "./HistoryMobile";
import InnerBanner from "@/components/InnerBanner";

export default function HistoryView() {
  const [currentPrefix, setCurrentPrefix] = useState("");
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const yearNavRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const firstYear = timeline[0]?.year ? String(timeline[0].year) : "";
  const initialPrefix =
    firstYear.length > 2 ? firstYear.slice(0, firstYear.length - 2) : "";

  useEffect(() => {
    setCurrentPrefix(initialPrefix);
    if (timeline[0]?.year) {
      setActiveYear(timeline[0].year);
      setCurrentIndex(0);
    }
  }, [initialPrefix]);

  useEffect(() => {
    const applySnapStyles = () => {
      document.documentElement.style.scrollBehavior = "smooth";
      document.documentElement.style.scrollSnapType = "y mandatory";
      if (window.innerWidth >= 1024) {
        document.documentElement.style.scrollPaddingTop = "144px";
      } else {
        document.documentElement.style.scrollPaddingTop = "132px";
      }
    };

    applySnapStyles();
    window.addEventListener("resize", applySnapStyles);

    const handleScroll = () => {
      let closestItem: { itemPrefix: string; year: number } | null = null;
      let closestDistance = Infinity;

      for (let i = 0; i < itemRefs.current.length; i++) {
        const item = itemRefs.current[i];
        if (item) {
          const rect = item.getBoundingClientRect();
          const distance = Math.abs(rect.top - 144);
          const itemYear = timeline[i]?.year ? String(timeline[i].year) : "";
          const itemPrefix =
            itemYear.length > 2 ? itemYear.slice(0, itemYear.length - 2) : "";

          if (distance < closestDistance) {
            closestDistance = distance;
            closestItem = { itemPrefix, year: timeline[i]?.year };
          }
        }
      }

      if (closestItem) {
        setCurrentPrefix(closestItem.itemPrefix);
        setActiveYear(closestItem.year);
        const index = timeline.findIndex((t) => t.year === closestItem!.year);
        if (index !== -1) {
          setCurrentIndex(index);
        }
      }
    };

    const throttledHandleScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      window.removeEventListener("resize", applySnapStyles);
      document.documentElement.style.scrollSnapType = "";
      document.documentElement.style.scrollPaddingTop = "";
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  const scrollToYear = (year: number) => {
    const yearIndex = timeline.findIndex((item) => item.year === year);
    if (yearIndex !== -1 && itemRefs.current[yearIndex]) {
      itemRefs.current[yearIndex]!.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveYear(year);
      setCurrentIndex(yearIndex);
      centerCarouselItem(yearIndex);
    }
  };

  const centerCarouselItem = (index: number) => {
    if (yearNavRef.current) {
      const container = yearNavRef.current;
      const buttons = container.querySelectorAll("button");
      const targetButton = buttons[index] as HTMLElement;
      if (targetButton) {
        const containerWidth = container.offsetWidth;
        const buttonWidth = targetButton.offsetWidth;
        const buttonLeft = targetButton.offsetLeft;
        const scrollPosition = buttonLeft - containerWidth / 2 + buttonWidth / 2;
        container.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    }
  };

  const navigateCarousel = (direction: "prev" | "next") => {
    if (direction === "prev" && currentIndex > 0) {
      scrollToYear(timeline[currentIndex - 1].year);
    } else if (direction === "next" && currentIndex < timeline.length - 1) {
      scrollToYear(timeline[currentIndex + 1].year);
    }
  };

  const prefixDigits = currentPrefix ? currentPrefix.split("") : [];

  return (
    <div ref={containerRef} className="">
      <div className="snap-start">
        <InnerBanner
          bg="/images/history-1/Our-history.jpg"
          crumbs={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Our History" },
          ]}
          title="Our History"
          lede="From a single factory in 1953 to one of Africa's leading pharmaceutical companies. Explore the milestones that shaped Pharco's journey of innovation and growth."
        />
      </div>

      <div className="sticky top-[var(--header-height)] z-[40] bg-white border-b border-gray-200 shadow-xs max-md:hidden">
        <div className="mx-auto px-4">
          <div className="relative flex items-center justify-center">
            <button
              onClick={() => navigateCarousel("prev")}
              className="absolute left-4 sm:left-6 md:left-8 lg:left-10 p-1.5 sm:p-2 bg-primary text-white rounded-full shadow-md hover:bg-secondary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-20"
              disabled={currentIndex === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="relative mx-4 sm:mx-6 md:mx-8 lg:mx-20">
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-secondary/20 transform -translate-y-1/2 z-0"></div>
              <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

              <div
                ref={yearNavRef}
                className="flex overflow-x-auto scrollbar-hide py-1 gap-1 sm:gap-2 md:gap-3 lg:gap-4 relative z-10 items-center px-4 sm:px-6"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
              >
                {timeline.map((item) => (
                  <button
                    key={item.year}
                    onClick={() => scrollToYear(item.year)}
                    className={`flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeYear === item.year
                        ? "bg-primary text-white w-14 h-14 sm:w-16 sm:h-16 md:w-[4.5rem] md:h-[4.5rem] text-sm sm:text-base md:text-lg lg:text-lg font-bold border-2 border-primary shadow-lg scale-105"
                        : "bg-white text-gray-700 hover:bg-primary hover:text-white w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-14 lg:h-14 text-xs sm:text-sm md:text-sm lg:text-sm border-2 border-secondary/20 hover:scale-105"
                    }`}
                  >
                    {item.year}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigateCarousel("next")}
              className="absolute right-4 sm:right-6 md:right-8 lg:right-10 p-1.5 sm:p-2 bg-primary text-white rounded-full shadow-md hover:bg-secondary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-20"
              disabled={currentIndex === timeline.length - 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <HistoryDesktop
        timeline={timeline}
        prefixDigits={prefixDigits}
        itemRefs={itemRefs}
      />

      <HistoryMobile timeline={timeline} />

      <div className="snap-start h-px w-full pointer-events-none"></div>
    </div>
  );
}
