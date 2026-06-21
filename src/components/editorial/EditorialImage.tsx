"use client";
import { useState } from "react";

/**
 * Image-led building block. Takes a base CDN URL (or local path), appends
 * Unsplash sizing/quality params for optimized delivery, and transparently
 * falls back to a deterministic placeholder if the source ever fails — so the
 * page is never shown with a broken image.
 */
export default function EditorialImage({
  src,
  alt = "",
  w = 1200,
  h,
  q = 72,
  className = "",
  eager = false,
}: {
  src: string;
  alt?: string;
  w?: number;
  h?: number;
  q?: number;
  className?: string;
  eager?: boolean;
}) {
  const isUnsplash = src.startsWith("https://images.unsplash.com");
  const build = (base: string) =>
    isUnsplash
      ? `${base}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ""}&q=${q}`
      : base;

  const seed = encodeURIComponent(src.slice(-14).replace(/[^a-zA-Z0-9]/g, ""));
  const fallback = `https://picsum.photos/seed/${seed}/${w}/${h || Math.round(w * 0.66)}`;

  const [current, setCurrent] = useState(build(src));

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
      className={className}
    />
  );
}
