import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import InnerBanner from "@/components/InnerBanner";
import CTALink from "@/components/CTALink";

const EVENTS: Record<string, {
  type: string;
  title: string;
  date: string;
  location: string;
  img: string;
  isPast: boolean;
  body: string[];
}> = {
  "cphi-worldwide-2024": {
    type: "Conference",
    title: "CPHI Worldwide 2024, Pharco Booth #45D6",
    date: "November 12 to 14, 2024",
    location: "Milan Convention Centre, Italy",
    img: "/images/manifacure.jpg",
    isPast: false,
    body: [
      "Pharco Group will be present at CPHI Worldwide 2024, the world's leading pharmaceutical ingredients and finished dosage form trade exhibition, at Booth #45D6 in the Finished Dosage Form hall.",
      "The Pharco team will be meeting with existing partners, prospective distributors, and licensing partners across MENA, Sub-Saharan Africa, CIS, and Asia Pacific. Our portfolio of over 400 branded generics spans antivirals, cardiometabolic, CNS, respiratory, and women's health therapeutic areas.",
      "CPHI Worldwide brings together more than 45,000 attendees from 150+ countries. Pharco has attended CPHI for over a decade and uses the event as a key platform for partnership development and market entry discussions.",
      "To schedule a meeting at the booth, please use the contact form below or reach out directly to our Business Development team ahead of the event.",
    ],
  },
  "africa-health-2024": {
    type: "Industry Summit",
    title: "Africa Health 2024, Speaking on regional pharma access",
    date: "November 28, 2024",
    location: "Cairo International Convention Center, Egypt",
    img: "/images/about.jpg",
    isPast: false,
    body: [
      "Pharco will participate in the Africa Health 2024 summit, with a speaking engagement focused on regional pharmaceutical access and the role of local manufacturers in closing the healthcare gap across the African continent.",
      "The session will draw on Pharco's experience delivering affordable hepatitis C medicines to millions of patients in Egypt and across Africa, and the lessons that model offers for other disease areas and markets.",
      "Africa Health 2024 convenes health ministers, regulators, healthcare executives, and global health organisations from across the continent. The event provides a platform for cross-sector dialogue on procurement, manufacturing, and access.",
    ],
  },
  "pharco-open-day-2025": {
    type: "Career Fair",
    title: "Pharco Open Day, Alexandria Headquarters",
    date: "January 15, 2025",
    location: "Pharco HQ, Alexandria · Hosted with Cairo & Alexandria Universities",
    img: "/images/csr-1.jpg",
    isPast: false,
    body: [
      "Pharco's annual Open Day brings together students, recent graduates, and early-career professionals for a day of campus tours, career sessions, and face-to-face meetings with department heads across manufacturing, R&D, quality, medical affairs, commercial, and corporate functions.",
      "The 2025 event is being held in partnership with Cairo University and Alexandria University, with dedicated shuttle transport from both campuses.",
      "Pharco employs more than 5,000 people across Egypt, Romania, and Algeria. The Open Day is the primary entry point for graduate recruitment into our two-year rotational development programme.",
      "Registration is required. Please complete the form via the link below. Places are limited and allocated on a first-come, first-served basis.",
    ],
  },
  "who-africa-pharma-access-summit-2024": {
    type: "Public Health",
    title: "WHO Africa Pharma Access Summit, Keynote address",
    date: "September 22, 2024",
    location: "Addis Ababa, Ethiopia",
    img: "/images/about.jpg",
    isPast: true,
    body: [
      "Dr. Sherine Helmy, Chairman, Pharco Corporation, delivered the opening keynote address at the WHO Africa Pharma Access Summit in Addis Ababa, presenting Pharco's hepatitis C access model as a transferable blueprint for improving pharmaceutical access across the African continent.",
      "The address covered the economic and regulatory conditions that enabled Egypt to achieve WHO hepatitis C elimination targets, the role of technology transfer in building local manufacturing capacity, and the Group's ongoing collaboration with international partners including the Clinton Health Access Initiative and the World Bank.",
      "The summit brought together health ministers, WHO regional officials, pharmaceutical industry representatives, and civil society organisations from 32 African countries.",
      "A recording of the keynote address is available via the WHO Africa Regional Office website.",
    ],
  },
  "world-hepatitis-day-2024": {
    type: "Activation",
    title: "World Hepatitis Day, Free screening campaign across 12 cities",
    date: "September 10 to 14, 2024",
    location: "Egypt",
    img: "/images/csr-2.jpg",
    isPast: true,
    body: [
      "In support of World Hepatitis Day 2024, Pharco partnered with the Egyptian Ministry of Health and local NGOs to deliver free hepatitis C screening and awareness sessions across 12 cities in Egypt, reaching over 18,000 people across five days.",
      "Mobile screening units deployed to high-traffic community locations including markets, university campuses, and transportation hubs. Patients testing positive were referred directly into the national treatment programme, which offers subsidised sofosbuvir/daclatasvir regimens.",
      "Since 2014, Pharco's access-priced HCV medicines have contributed to treating more than 1.2 million Egyptians, the largest national hepatitis C treatment programme in the world.",
      "This campaign is part of Pharco's ongoing CSR commitment to the communities in which it operates. Full impact data will be published in the annual sustainability report.",
    ],
  },
  "arab-health-2024": {
    type: "Industry Summit",
    title: "Arab Health 2024, Exhibitor & panel speaker",
    date: "August 15 to 17, 2024",
    location: "Dubai World Trade Centre",
    img: "/images/manifacure.jpg",
    isPast: true,
    body: [
      "Pharco Group exhibited at Arab Health 2024 in Dubai, the MENA region's largest healthcare trade event, welcoming more than 200 meetings with distributors, licensing partners, and investors over three days.",
      "In addition to the exhibition stand, Pharco's Chief Business Officer participated in a panel session on localisation and technology transfer in the Gulf pharmaceutical market, discussing Pharco's joint ventures in Saudi Arabia and the UAE and the Group's strategy for supporting local manufacturing capacity across the region.",
      "Arab Health 2024 attracted more than 55,000 attendees from 180 countries. Pharco has participated in the event for more than a decade.",
    ],
  },
};

const RELATED_EVENTS = [
  { slug: "cphi-worldwide-2024", type: "Conference", title: "CPHI Worldwide 2024, Pharco Booth #45D6", date: "Nov 12 to 14, 2024", img: "/images/manifacure.jpg" },
  { slug: "africa-health-2024", type: "Industry Summit", title: "Africa Health 2024, Speaking on regional pharma access", date: "Nov 28, 2024", img: "/images/about.jpg" },
  { slug: "world-hepatitis-day-2024", type: "Activation", title: "World Hepatitis Day, Free screening campaign across 12 cities", date: "Sep 10 to 14, 2024", img: "/images/csr-2.jpg" },
  { slug: "arab-health-2024", type: "Industry Summit", title: "Arab Health 2024, Exhibitor & panel speaker", date: "Aug 15 to 17, 2024", img: "/images/manifacure.jpg" },
];

export function generateStaticParams() {
  return Object.keys(EVENTS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = EVENTS[slug];
  if (!event) return { title: "Event not found", robots: { index: false } };
  return {
    title: event.title,
    description: event.body[0]?.slice(0, 160),
    openGraph: { title: event.title, images: [event.img] },
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = EVENTS[slug];
  if (!event) notFound();
  const related = RELATED_EVENTS.filter((e) => e.slug !== slug).slice(0, 3);

  return (
    <>
      <InnerBanner
        bg={event.img}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "News & Events", href: "/news-events" },
          { label: "Events", href: "/news-events?tab=events" },
          { label: event.type },
        ]}
        title={<><span className="accent">{event.type}</span></>}
        lede={`${event.date} · ${event.location}`}
      />

      {/* ─── Event Body ─── */}
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

          {/* Event content */}
          <article className="art-body">
            <h1 className="art-title">{event.title}</h1>
            <div className="art-hero-meta" style={{ marginBottom: 28 }}>
              <span className="art-author">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {event.location}
              </span>
              <span className="art-meta-sep" />
              <span>{event.date}</span>
              <span className="art-meta-sep" />
              <span className="ne-badge sm" style={{ verticalAlign: "middle" }}>{event.isPast ? "Past Event" : "Upcoming"}</span>
            </div>

            {event.body.map((para, i) => (
              <p key={i} className={i === 0 ? "art-lead" : ""}>{para}</p>
            ))}

            <div className="art-footer">
              <Link href="/news-events?tab=events" className="art-back">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Back to News &amp; Events
              </Link>
              <div className="art-tags">
                <span className="ne-badge sm">{event.type}</span>
                <span className="ne-badge sm" style={{ background: "rgba(85,86,90,0.1)", color: "var(--secondary)" }}>Pharco Group</span>
              </div>
            </div>
          </article>

        </div>
      </section>

      {/* ─── Related Events ─── */}
      <section className="py-16 bg-[#f7f6f1]">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 block">
                Events
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-secondary leading-tight">
                More <span className="text-primary">events</span>
              </h3>
            </div>
            <Link
              href="/news-events?tab=events"
              className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all duration-300"
            >
              View all events
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l10-10M9 7h8v8" /></svg>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {related.map((rel, i) => {
              const isPast = EVENTS[rel.slug]?.isPast ?? false;
              return (
                <Link
                  key={i}
                  href={`/news-events/events/${rel.slug}`}
                  className="group block rounded-3xl bg-white border border-neutral-100 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-400 p-7 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-5">
                    <span
                      className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] inline-flex items-center ${
                        isPast
                          ? "bg-neutral-100 text-neutral-500"
                          : "bg-primary/15 text-primary"
                      }`}
                    >
                      <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${isPast ? "bg-neutral-400" : "bg-primary animate-pulse"}`} />
                      {isPast ? "Past" : "Upcoming"}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                      {rel.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-primary font-bold uppercase tracking-wider mb-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                    {rel.date}
                  </div>

                  <h4 className="text-lg font-bold text-secondary leading-tight mb-4 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {rel.title}
                  </h4>

                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-neutral-100">
                    <span className="text-xs text-neutral-500">{EVENTS[rel.slug]?.location?.split(",")[0] ?? "Pharco"}</span>
                    <span className="inline-flex items-center gap-2 text-primary font-bold text-sm">
                      {isPast ? "Event recap" : "Event details"}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"><path d="M7 17l10-10M9 7h8v8" /></svg>
                    </span>
                  </div>

                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="breaker">
        <div className="container">
          <h3>Get in touch</h3>
          <p>To schedule a meeting, register for an event, or enquire about partnership opportunities, contact the Pharco team.</p>
          <CTALink href="/contact" variant="dark">Contact Us</CTALink>
        </div>
      </section>
    </>
  );
}
