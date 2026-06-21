"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            reveal.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => reveal.observe(el));

    const counters = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          counters.unobserve(el);
          const raw = el.dataset.count || "0";
          const target = parseFloat(raw);
          const decimals = (raw.split(".")[1] || "").length;
          const dur = parseInt(el.dataset.duration || "2000", 10);
          const suffix = el.dataset.suffix || "";
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const v = target * (1 - Math.pow(1 - p, 3));
            el.textContent = (decimals ? v.toFixed(decimals) : Math.floor(v).toLocaleString()) + suffix;
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = (decimals ? target.toFixed(decimals) : target.toLocaleString()) + suffix;
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll("[data-count]").forEach((el) => counters.observe(el));

    return () => {
      reveal.disconnect();
      counters.disconnect();
    };
  }, [pathname]);

  return null;
}
