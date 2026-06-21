"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const news = [
  {
    id: 1,
    title:
      "Dr. Sherine Hassan Helmy Named One of Forbes Middle East's Top Healthcare Leaders 2024",
    excerpt:
      "Pharco is leading the “A Billion Lives Matter” initiative, aiming to test and treat 90% of Hepatitis B and C patients in Africa by 2030. Dr. Sherine Hassan Helmy, Chairman, Pharco Corporation, highlights the company’s mission to create high-quality, affordable medicines for all. Once the country with the highest Hepatitis C rates, Egypt, through a national program launched in 2014 and supported by Pharco’s effective, affordable antivirals, screened over 60 million people and treated more than four million by 2020.",
    category: "Research",
    date: "04 May 2023",
    image: "/images/new1.jpg",
    url: "#",
  },
  {
    id: 2,
    title: "The Selection and Use of Essential Medicines 2025",
    excerpt:
      "The WHO Expert Committee recommended adding ravidasvir to the core Essential Medicines List (EML) as a therapeutic alternative under the square box listing for pangenotypic direct-acting antivirals used to treat chronic Hepatitis C in adults. When combined with sofosbuvir, ravidasvir provides a pangenotypic, broad-spectrum antiviral option, with evidence showing effectiveness and safety comparable to other approved pangenotypic regimens.",
    category: "Innovation",
    date: "30 Jul 2025",
    image: "/images/WHO.jpg",
    url: "#",
  },
  {
    id: 3,
    title: "Dr. Sherine Helmy, Chairman, Pharco Corporation Live at BOMA of Africa 2024",
    excerpt:
      "At BOMA of Africa 2024, Dr. Sherine Helmy, Chairman, Pharco Corporation, spoke about eliminating Hepatitis C in Egypt and how Pharco made effective treatments accessible and affordable for millions. He highlighted the company's commitment to developing new treatments for major diseases through advanced research and technology, aiming to make healthcare accessible worldwide, and acknowledged the Egyptian Ministry of Health for its key support in expanding impactful healthcare solutions across Africa.",
    category: "Global Health",
    date: "10 Jul 2024",
    image: "/images/Boma.jpg",
    url: "#",
  },
];

const NewsSection = () => {
  const formatDate = (d: string) => {
    try {
      return new Date(d).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return d;
    }
  };

  return (
    <section className="relative py-10 md:py-12 bg-secondary/5">
      <div className="container px-8 mx-auto relative">
        <div className="flex-row items-start justify-between mb-10">
          <h3 className="text-4xl md:text-6xl text-secondary capitalize mb-8 reveal">
            Latest News &
            <span className="text-primary font-bold"> Insights</span>
          </h3>
          <p className="text-base md:text-base mb-8 md:w-3/4 leading-relaxed reveal delay-1">
            Stay updated with Pharco's latest developments, research progress,
            and partnerships shaping the future of healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {news.map((item, index) => (
            <Link
              href={item.url}
              className="reveal group bg-white p-4 rounded-md"
              key={item.id}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-4 mb-3">
                  <span className="px-3 py-1 rounded-full bg-primary text-black text-xs font-medium">
                    {item.category}
                  </span>
                  <span className="flex-1 h-px bg-black/10" />
                  <span className="text-sm text-black/60">
                    {formatDate(item.date)}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {item.excerpt}
                </p>
                <button
                  className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 group/button mb-4"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = item.url;
                  }}
                >
                  Read More
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/button:translate-x-0.5" />
                </button>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            asChild
            className="rounded-full bg-transparent text-black border-transparent md:px-5 px-0 hover:px-5 group w-fit text-left"
          >
            <Link href="/news-events" className="flex items-center gap-3">
              <span className="underline group-hover:no-underline transition-colors duration-300">
                Visit Newsroom
              </span>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-black">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
