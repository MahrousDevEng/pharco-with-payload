"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowUpRight,
  TrendingUp,
  Globe,
  Users,
  Building,
  Heart,
  Package,
} from "lucide-react";

// Counter animation component with Intersection Observer and decimal support
const AnimatedCounter = ({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) => {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const animationFrame = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!counterRef.current || hasAnimated.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            const start = 0;
            const end = value;
            const isDecimal = value % 1 !== 0;
            const decimalPlaces = isDecimal
              ? value.toString().split(".")[1]?.length || 0
              : 0;

            // Adjust duration based on the value size for consistent speed
            const adjustedDuration = Math.min(duration * 1000, 3000); // Max 3 seconds
            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / adjustedDuration, 1);

              // Easing function for smoother animation
              const easeOutQuad = (t: number) => t * (2 - t);
              const easedProgress = easeOutQuad(progress);

              let currentValue = start + (end - start) * easedProgress;

              // Handle decimal values
              if (isDecimal) {
                currentValue = parseFloat(currentValue.toFixed(decimalPlaces));
              } else {
                currentValue = Math.floor(currentValue);
              }

              // Format the number with proper thousand separators
              setDisplayValue(
                currentValue.toLocaleString(undefined, {
                  minimumFractionDigits: isDecimal ? decimalPlaces : 0,
                  maximumFractionDigits: isDecimal ? decimalPlaces : 0,
                })
              );

              if (progress < 1) {
                animationFrame.current = requestAnimationFrame(animate);
              }
            };

            animationFrame.current = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observerRef.current.observe(counterRef.current);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      if (observerRef.current && counterRef.current) {
        observerRef.current.unobserve(counterRef.current);
      }
    };
  }, [value, duration]);

  return (
    <span ref={counterRef} className="counter">
      {displayValue}
    </span>
  );
};

const AboutSection = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const totalCards = 6;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalCards);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const cardClass = (index: number) =>
    `stat-item group relative top-0 overflow-hidden p-6 rounded-xl border-l-4 border-primary shadow-xs transition-all duration-300 block ${
      activeIndex === index
        ? "bg-primary text-white shadow-xl -top-2"
        : "bg-primary/10 hover:bg-primary hover:text-white hover:shadow-xl hover:-top-2"
    }`;

  const iconClass = (index: number) =>
    `w-32 h-32 transition-all duration-700 ${
      activeIndex === index
        ? "scale-150 rotate-12 opacity-20 text-white/10"
        : "text-primary/10 group-hover:scale-150 group-hover:rotate-12 group-hover:opacity-20"
    }`;

  const glowClass = (index: number) =>
    `pointer-events-none absolute -top-10 -right-10 w-36 h-36 rounded-full bg-primary/20 blur-3xl transition-opacity duration-300 ${
      activeIndex === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"
    }`;

  const numClass = (index: number) =>
    `text-4xl md:text-5xl xl:text-6xl font-bold mb-3 relative ${
      activeIndex === index ? "text-white" : "text-primary group-hover:text-white"
    }`;

  const suffixClass = (index: number) =>
    `text-4xl ml-1 ${
      activeIndex === index ? "text-white" : "text-primary group-hover:text-white"
    }`;

  const labelBoldClass = (index: number) =>
    `font-bold ${
      activeIndex === index ? "text-white" : "text-secondary group-hover:text-white"
    }`;

  const labelClass = (index: number) =>
    `text-lg font-medium ${
      activeIndex === index ? "text-white" : "text-gray-700 group-hover:text-white"
    }`;

  return (
    <section className="py-10 md:pt-16 relative w-full md:min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex flex-col lg:flex-row items-center w-full gap-12">
          {/* Left Column - Content */}
          <div className="w-full">
            <div className="mb-2">
              <h2 className="md:text-6xl text-2xl text-secondary mb-8 lg:w-full capitalize">
                Pharco’s
                <span className="text-primary font-bold"> Growth</span>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed lg:w-3/4 w-full">
                Over the years, Pharco has grown into a global pharmaceutical
                company with a presence across multiple regions. We continue to
                expand access to essential medicines while supporting healthcare
                systems and improving patient outcomes worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Years of Experience */}
            <Link href="/history" className={cardClass(0)}>
              <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
                <TrendingUp className={iconClass(0)} />
              </div>
              <span className={glowClass(0)}></span>
              <div className={numClass(0)}>
                <div className="flex items-end">
                  <AnimatedCounter value={39} duration={2} />
                  <span className={suffixClass(0)}>+</span>
                </div>
              </div>
              <p className={labelClass(0)}>
                <span className={labelBoldClass(0)}>Years</span>{" "}
                of pharmaceutical leadership
              </p>
            </Link>

            {/* Countries Reached */}
            <Link href="/global-presence" className={cardClass(1)}>
              <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
                <Globe className={iconClass(1)} />
              </div>
              <span className={glowClass(1)}></span>
              <div className={numClass(1)}>
                <div className="flex items-end">
                  <AnimatedCounter value={70} duration={2.5} />
                  <span className={suffixClass(1)}>+</span>
                </div>
              </div>
              <p className={labelClass(1)}>
                <span className={labelBoldClass(1)}>Countries</span>{" "}
                with our medicines
              </p>
            </Link>

            {/* Employees */}
            <Link href="/life-at-pharco" className={cardClass(2)}>
              <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
                <Users className={iconClass(2)} />
              </div>
              <span className={glowClass(2)}></span>
              <div className={numClass(2)}>
                <div className="flex items-end">
                  <AnimatedCounter value={7000} duration={1.5} />
                  <span className={suffixClass(2)}>+</span>
                </div>
              </div>
              <p className={labelClass(2)}>
                <span className={labelBoldClass(2)}>Employees</span>{" "}
                driving our mission
              </p>
            </Link>

            {/* Companies */}
            <Link href="/about-pharco-group" className={cardClass(3)}>
              <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
                <Building className={iconClass(3)} />
              </div>
              <span className={glowClass(3)}></span>
              <div className={numClass(3)}>
                <div className="flex items-end">
                  <AnimatedCounter value={13} duration={2} />
                </div>
              </div>
              <p className={labelClass(3)}>
                <span className={labelBoldClass(3)}>Companies</span>{" "}
                in Pharco Group
              </p>
            </Link>

            {/* Patients Cured */}
            <Link href="/about-impact-csr" className={cardClass(4)}>
              <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
                <Heart className={iconClass(4)} />
              </div>
              <span className={glowClass(4)}></span>
              <div className={numClass(4)}>
                <div className="flex items-end">
                  <AnimatedCounter value={4} duration={2.5} />
                  <span className={`text-3xl ml-1 ${activeIndex === 4 ? "text-white" : "group-hover:text-white"}`}>M</span>
                  <span className={suffixClass(4)}>+</span>
                </div>
              </div>
              <p className={labelClass(4)}>
                <span className={labelBoldClass(4)}>Patients</span>{" "}
                cured of Hepatitis C
              </p>
            </Link>

            {/* Daily Production */}
            <Link href="/science-manufacturing" className={cardClass(5)}>
              <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
                <Package className={iconClass(5)} />
              </div>
              <span className={glowClass(5)}></span>
              <div className={numClass(5)}>
                <div className="flex items-end">
                  <AnimatedCounter value={1.6} duration={3} />
                  <span className={`text-3xl ml-1 ${activeIndex === 5 ? "text-white" : "group-hover:text-white"}`}>M</span>
                </div>
              </div>
              <p className={labelClass(5)}>
                <span className={labelBoldClass(5)}>Packs</span>{" "}
                manufactured daily
              </p>
            </Link>
          </div>

          <div className="mt-4 flex justify-center">
            <Button
              asChild
              className="rounded-full bg-transparent text-black border-transparent px-5 group w-fit"
            >
              <Link href="/global-presence" className="flex items-center gap-3">
                <span className="underline group-hover:no-underline transition-colors duration-300">
                  View Our Global Footprint
                </span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-black">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
