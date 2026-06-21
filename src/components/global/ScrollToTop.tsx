"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible((window.scrollY || 0) > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`scroll-top${visible ? " visible" : ""}`}
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      {Icon.arrowUp}
    </button>
  );
}
