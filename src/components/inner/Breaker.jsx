import Link from "next/link";

export function Breaker({ title, subtitle, ctaLabel, ctaHref }) {
  return (
    <section className="bg-secondary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,#e07e27,transparent_60%)]" />
      <div className="relative max-w-[1280px] mx-auto px-4 py-12 text-center">
        <h3 className="font-bold text-[clamp(28px,4vw,44px)] mb-3">{title}</h3>
        {subtitle && <p className="text-white/75 max-w-2xl mx-auto mb-7">{subtitle}</p>}
        {ctaLabel && (
          <Link
            href={ctaHref}
            className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-7 py-3 rounded-md transition"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
