export function SectionHeader({ eyebrow, title, accent, lede = "", align = "center" }) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-[760px] mb-12 ${alignCls}`}>
      {eyebrow && (
        <span className="inline-block text-xs tracking-[0.18em] uppercase text-primary font-bold mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-bold text-[clamp(32px,4.5vw,56px)] text-secondary leading-tight">
        {title} {accent && <span className="text-primary">{accent}</span>}
      </h2>
      {lede && (
        <p className={`mt-4 text-[17px] text-neutral-600 leading-relaxed ${align === "center" ? "mx-auto" : ""}`}>
          {lede}
        </p>
      )}
    </div>
  );
}
