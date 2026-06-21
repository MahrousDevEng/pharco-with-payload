import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import InnerBanner from "@/components/InnerBanner";
import CTALink from "@/components/CTALink";

const ARTICLES: Record<string, {
  cat: string;
  title: string;
  date: string;
  read: string;
  author: string;
  img: string;
  body: string[];
}> = {
  "pharco-signs-strategic-distribution-partnership": {
    cat: "Partnership",
    title: "Pharco signs strategic distribution partnership with leading Saudi healthcare group",
    date: "October 14, 2024",
    read: "4 min read",
    author: "Pharco Communications",
    img: "/images/about.jpg",
    body: [
      "The Pharco Group has signed a multi-year strategic distribution agreement with a leading Saudi Arabian healthcare group, opening access to over 1,200 pharmacies across the Kingdom of Saudi Arabia.",
      "The partnership covers Pharco's core antiviral portfolio (including hepatitis C medicines and HIV co-infection treatments) as well as primary care products in cardiometabolic, respiratory, and women's health therapeutic areas.",
      "Speaking at the signing ceremony in Riyadh, Dr. Sherine Helmy, Chairman, Pharco Corporation, said: \"This partnership represents a significant step in our regional access strategy. The Saudi market is one of the most important in the MENA region, and we are committed to making our high-quality, affordable medicines available to patients who need them.\"",
      "The agreement also includes provisions for joint medical education initiatives, with Pharco's medical affairs team supporting training programmes for pharmacists and healthcare professionals across the partner's network.",
      "Saudi Arabia's pharmaceutical market is the largest in the Arab world, valued at approximately USD 7.5 billion annually and growing at around 4% per year. The Ministry of Health's Vision 2030 healthcare transformation programme is expected to drive further demand for high-quality branded generics.",
      "This partnership follows Pharco's recent agreements in the UAE, Kuwait, and Morocco, part of the Group's broader strategy to expand its presence across MENA and Sub-Saharan Africa through trusted local partners.",
    ],
  },
  "european-pharmaceuticals-receives-eu-gmp-recertification": {
    cat: "Manufacturing",
    title: "European Pharmaceuticals receives EU GMP recertification",
    date: "Sep 28, 2024",
    read: "3 min read",
    author: "Pharco Communications",
    img: "/images/manifacure.jpg",
    body: [
      "European Pharmaceuticals, the Romanian manufacturing arm of the Pharco Group, has successfully completed its latest EU GMP inspection, with inspectors from the Romanian Ministry of Health confirming continued compliance across all production lines.",
      "The recertification covers oral solid dosage forms, sterile injectables, and the cephalosporin manufacturing suite, representing the full breadth of the facility's production capability.",
      "The inspection follows a comprehensive internal audit programme that Pharco Group runs across all its manufacturing sites on an 18-month cycle. The programme is overseen by the Group's centralised quality assurance function in Alexandria, Egypt.",
      "EU GMP certification is a prerequisite for supplying medicines to European Union member states and a growing number of regulated markets globally, including several in the MENA region that recognise EU standards.",
      "The Pharco Group now holds active EU GMP certificates across four manufacturing sites in Egypt, Romania, and Algeria, covering over 200 finished dosage form products.",
    ],
  },
};

const RELATED = [
  { img: "/images/csr-1.jpg", cat: "Public Health", h: "Pharco joins Egypt's national schistosomiasis elimination programme", p: "Praziquantel donations and technical support to the Ministry of Health's 2030 elimination target.", date: "Sep 12, 2024", slug: "pharco-joins-egypt-schistosomiasis" },
  { img: "/images/manifacure.jpg", cat: "Manufacturing", h: "European Pharmaceuticals receives EU GMP recertification", p: "Romanian Ministry of Health inspectors confirm continued EU GMP compliance.", date: "Sep 28, 2024", slug: "european-pharmaceuticals-receives-eu-gmp-recertification" },
  { img: "/images/about.jpg", cat: "Awards", h: "Pharco named Egypt's Top Pharmaceutical Exporter for the third year running", p: "Annual award recognises sustained export growth across MENA, Africa, and Asia Pacific.", date: "Aug 30, 2024", slug: "pharco-named-top-pharmaceutical-exporter" },
];

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: "Article not found", robots: { index: false } };
  return {
    title: article.title,
    description: article.body[0]?.slice(0, 160),
    openGraph: { title: article.title, images: [article.img] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();
  const related = RELATED.filter((r) => r.slug !== slug).slice(0, 3);

  return (
    <>
      <InnerBanner
        bg={article.img}
        crumbs={[{ label: "Home", href: "/" }, { label: "News & Events", href: "/news-events" }, { label: article.cat }]}
        title={<><span className="accent">{article.cat}</span></>}
        lede={`${article.date} · ${article.read} · ${article.author}`}
      />

      {/* ─── Article Body ─── */}
      <section className="section">
        <div className="art-wrap container">

          {/* Share sidebar */}
          <aside className="art-share-rail">
            <span className="art-share-label">Share</span>
            <a href="#" className="art-share-btn" aria-label="Share on LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="art-share-btn" aria-label="Share on X">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="art-share-btn" aria-label="Copy link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            </a>
          </aside>

          {/* Article content */}
          <article className="art-body">
            <h1 className="art-title">{article.title}</h1>
            <div className="art-hero-meta" style={{ marginBottom: 28 }}>
              <span className="art-author">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                {article.author}
              </span>
              <span className="art-meta-sep" />
              <span>{article.date}</span>
              <span className="art-meta-sep" />
              <span>{article.read}</span>
            </div>
            {article.body.map((para, i) => (
              <p key={i} className={i === 0 ? "art-lead" : ""}>{para}</p>
            ))}

            {/* Article footer */}
            <div className="art-footer">
              <Link href="/news-events" className="art-back">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Back to News &amp; Events
              </Link>
              <div className="art-tags">
                <span className="ne-badge sm">{article.cat}</span>
                <span className="ne-badge sm" style={{ background: "rgba(85,86,90,0.1)", color: "var(--secondary)" }}>Pharco Group</span>
              </div>
            </div>
          </article>

        </div>
      </section>

      {/* ─── Related Articles ─── */}
      <section className="py-16 bg-[#f7f6f1]">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 block">
                Newsroom
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-secondary leading-tight">
                More <span className="text-primary">stories</span>
              </h3>
            </div>
            <Link
              href="/news-events"
              className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all duration-300"
            >
              View all news
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l10-10M9 7h8v8" /></svg>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {related.map((n, i) => (
              <Link
                key={i}
                href={`/news-events/${n.slug}`}
                className="group block rounded-3xl overflow-hidden bg-white border border-neutral-100 hover:border-primary/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500"
              >
                <div className="relative overflow-hidden aspect-[16/10]">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url('${n.img}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-[0.15em]">
                    {n.cat}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                    {n.date}
                  </div>
                  <h4 className="font-bold text-secondary text-lg leading-tight mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {n.h}
                  </h4>
                  <p className="text-neutral-600 leading-relaxed text-sm line-clamp-3 mb-5">{n.p}</p>
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <span>Read story</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"><path d="M7 17l10-10M9 7h8v8" /></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="breaker">
        <div className="container">
          <h3>Press &amp; media inquiries</h3>
          <p>For interview requests, image assets, or fact-checks, please contact our communications team directly.</p>
          <CTALink href="/contact" variant="dark">Contact Press Office</CTALink>
        </div>
      </section>
    </>
  );
}
