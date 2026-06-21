"use client";
import { useEffect, useRef, useState } from "react";

export function Counter({ to = 0, duration = 1800, suffix = "" }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        obs.unobserve(el);
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setV(to * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);
  const fmt = to >= 1000 ? Math.round(v).toLocaleString() : (Number.isInteger(to) ? Math.round(v) : v.toFixed(1));
  return <span ref={ref}>{fmt}{suffix && <small className="text-[0.6em] ml-0.5">{suffix}</small>}</span>;
}
