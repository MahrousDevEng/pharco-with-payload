"use client";
import { Reveal } from "@/components/inner/Reveal";
import { founderQuote } from "@/data";

export default function FounderQuoteSection() {
  const parts = founderQuote.text.split(founderQuote.highlight);
  return (
    <section className="py-16 bg-secondary text-white">
      <div className="max-w-[900px] mx-auto px-4 text-center">
        <Reveal>
          <svg className="w-10 h-10 text-primary mx-auto mb-6 opacity-60" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-[clamp(20px,3vw,30px)] font-light leading-relaxed mb-6">
            {parts[0]}
            <em className="text-primary not-italic font-semibold">{founderQuote.highlight}</em>
            {parts[1]}
          </blockquote>
          <cite className="text-white/60 text-sm tracking-wider not-italic">
            {founderQuote.signature}
          </cite>
        </Reveal>
      </div>
    </section>
  );
}
