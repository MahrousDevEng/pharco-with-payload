"use client";
import Image from "next/image";
import { Reveal } from "@/components/inner/Reveal";
import { SectionHeader } from "@/components/inner/SectionHeader";
import { Breaker } from "@/components/inner/Breaker";

const NEWS = [
  { tag: "Press Release", date: "Q4 2025", image: "/images/manifacure.jpg", title: "Pharco announces new biogeneric production line at BGP", body: "The new line expands the group's complex molecule capacity, with first product approvals expected in 2026." },
  { tag: "Partnership", date: "Q3 2025", image: "/images/hepc2.jpg", title: "Pharco and University of Michigan extend Hepatitis C collaboration", body: "Following the success of Egypt's elimination programme, the joint research programme moves into next-generation antivirals." },
  { tag: "Recognition", date: "Q3 2025", image: "/images/eur.jpg", title: "Pharco facilities receive renewed EU GMP certification", body: "Multiple manufacturing sites pass EU GMP inspection covering oral solids, sterile injectables, and cephalosporin suite." },
  { tag: "Event", date: "Q2 2025", image: "/images/comp.jpg", title: "Pharco at CPHI Worldwide", body: "The Pharco team will be at CPHI to meet partners, distributors, and prospective licensees. Stand details to follow." },
  { tag: "CSR", date: "Q2 2025", image: "/images/csr/csr1.jpg", title: "Schistosomiasis awareness campaign launches in upper Egypt", body: "Joint initiative with the Ministry of Health, with community education and free screening across rural communities." },
  { tag: "Product", date: "Q1 2025", image: "/images/new1.jpg", title: "New launches across cardiometabolic and women's health portfolios", body: "Six new branded generics added to the portfolio, including extended-release reformulations and combination therapies." },
];

export default function NewsGridSection() {
  return (
    <>
      <section className="py-12 bg-neutral-50">
        <div className="max-w-[1280px] mx-auto px-4">
          <SectionHeader eyebrow="In the news" title="Stories &" accent="updates" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {NEWS.map((n, i) => (
              <Reveal key={n.title} delay={i * 0.05}>
                <article className="bg-white border border-neutral-200 rounded-xl overflow-hidden h-full flex flex-col hover:-translate-y-1 hover:shadow-xl transition group">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image src={n.image} alt={n.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest mb-3">
                      <span className="text-primary font-bold">{n.tag}</span>
                      <span className="text-neutral-400">{n.date}</span>
                    </div>
                    <h3 className="font-bold text-secondary mb-3 group-hover:text-primary transition">{n.title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed flex-1">{n.body}</p>
                    <a href="#" className="text-sm text-primary font-semibold mt-4">Read more →</a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Breaker
        title="Press & media inquiries"
        subtitle="Journalists and analysts, please reach out via the contact form for interviews and media materials."
        ctaLabel="Press contact →"
        ctaHref="/contact"
      />
    </>
  );
}
