"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const accreditations = [
  {
    key: "who",
    src: "/images/Certifcate/WHO_logo.png",
    alt: "WHO",
    label: "WHO Prequalification",
  },
  {
    key: "eu-gmp",
    src: "/images/Certifcate/EU-GMP.png",
    alt: "EU GMP",
    label: "EU GMP (PIC/S)",
  },
  {
    key: "anvisa",
    src: "/images/Certifcate/ANVISA.png",
    alt: "ANVISA",
    label: "ANVISA GMP",
  },
  {
    key: "pics",
    src: "/images/Certifcate/PICS.png",
    alt: "PIC/S",
    label: "PIC/S Member",
  },
  {
    key: "sfda",
    src: "/images/Certifcate/SFDA.png",
    alt: "SFDA",
    label: "Saudi FDA",
  },
  {
    key: "ghc",
    src: "/images/Certifcate/GHC.png",
    alt: "GCC GMP",
    label: "GCC GMP",
  },
  {
    key: "nhra",
    src: "/images/Certifcate/Nhra-01.png",
    alt: "NHRA",
    label: "NHRA Bahrain",
  },
  {
    key: "oman",
    src: "/images/Certifcate/Oman.png",
    alt: "Oman",
    label: "Oman MOCI",
  },
  {
    key: "tfda",
    src: "/images/Certifcate/tanzania-food-drugs-authority-tfda-seeklogo-01.png",
    alt: "TFDA",
    label: "Tanzania TFDA",
  },
  {
    key: "ohsas",
    src: "/images/Certifcate/ohsas-18001-2007-certification-service-500x500.png",
    alt: "OHSAS 18001",
    label: "OHSAS 18001",
  },
];

const RewardSection = () => {
  return (
    <section className="relative pb-16 bg-white overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl lg:text-6xl mb-6 text-secondary reveal">
            Global
            <span className="text-primary"> Recognitions</span>
          </h2>
          <p className="text-base md:text-base mb-8 leading-relaxed font-bold text-secondary max-w-2xl mx-auto reveal delay-1">
            Pharco's commitment to quality and compliance has earned recognition
            from the world's most respected regulatory and health authorities.
          </p>
        </div>

        {/* Accreditation marquee (infinite rotation) */}
        <div className="marquee reveal group relative w-full overflow-hidden">
          {/* Edge fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32 bg-gradient-to-l from-white to-transparent" />

          <div className="marquee-track flex w-max gap-4 py-2">
            {[...accreditations, ...accreditations].map((item, index) => (
              <div
                key={`${item.key}-${index}`}
                className="logo-card group/card relative flex shrink-0 w-44 flex-col items-center justify-center gap-3 p-5 rounded-2xl border border-gray-100 bg-white hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                {/* Top accent bar */}
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-primary/0 group-hover/card:bg-primary transition-all duration-300" />

                <div className="w-full h-14 flex items-center justify-center">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={100}
                    height={56}
                    className="object-contain w-full h-full transition-transform duration-300 group-hover/card:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .marquee-track {
            animation: marquee-scroll 40s linear infinite;
          }
          .marquee:hover .marquee-track {
            animation-play-state: paused;
          }
          @keyframes marquee-scroll {
            from {
              /* Start shifted one set left, animate back to 0 → left-to-right motion */
              transform: translateX(calc(-50% - 0.5rem));
            }
            to {
              transform: translateX(0);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .marquee-track {
              animation: none;
            }
          }
        `}</style>

        {/* CTA */}
        <div className="flex justify-center mt-12 reveal delay-2">
          <Button
            asChild
            className="rounded-full bg-transparent text-black border-transparent px-5 group"
          >
            <Link href="/science-quality" className="flex items-center gap-3">
              <span className="underline group-hover:no-underline transition-colors duration-300">
                View Quality &amp; Certifications
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

export default RewardSection;
