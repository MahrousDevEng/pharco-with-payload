import Link from "next/link";

export function PageBanner({ image, breadcrumbs, title, accent, lede }) {
  return (
    <section
      className="relative min-h-[440px] flex items-end pb-14 pt-32 overflow-hidden"
      data-screen-label={`${title} · Hero`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 w-full text-white">
        <nav className="text-xs tracking-wider uppercase text-white/70 mb-5 flex flex-wrap gap-2 items-center">
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-2">
              {b.href ? (
                <Link href={b.href} className="hover:text-white transition">
                  {b.label}
                </Link>
              ) : (
                <span className={b.current ? "text-white" : ""}>{b.label}</span>
              )}
              {i < breadcrumbs.length - 1 && (
                <span className="opacity-50">/</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="text-[clamp(40px,6vw,84px)] leading-[1.05] font-normal">
          {title} {accent && <span className="text-primary">{accent}</span>}
        </h1>
        {lede && (
          <p className="mt-4 max-w-[640px] text-white/85 text-sm">{lede}</p>
        )}
      </div>
    </section>
  );
}
