import Link from "next/link";

/** Reusable banner used at the top of every inner page. Mirrors the
 *  `.inner-banner` block from styles/site.css (background image + dark overlay
 *  + breadcrumb + h1 + optional lede). */
export type Crumb = { label: string; href?: string };

export default function InnerBanner({
  bg,
  crumbs = [],
  title,
  lede,
}: {
  bg: string;
  crumbs?: Crumb[];
  title: React.ReactNode;
  lede?: React.ReactNode;
}) {
  return (
    <section className="inner-banner">
      <div className="bg" style={{ backgroundImage: `url('${bg}')` }} />
      <div className="content">
        <div className="breadcrumbs">
          {crumbs.map((c, i) => (
            <span key={i}>
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
              {i < crumbs.length - 1 && <span className="sep" style={{ marginLeft: 8 }}>›</span>}
            </span>
          ))}
        </div>
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
      </div>
    </section>
  );
}
