"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const HebCsection = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "HEP C",
      subtitle: "Success Story",
      description:
        "Pharco contributed to hepatitis C elimination efforts by expanding treatment access through national programs, working closely with healthcare authorities to reach millions of patients and supporting global health initiatives.",
      image: "/images/hepc.jpg",
      link: "/about-impact-csr",
      btnText: "Learn More About Hepatitis C Elimination",
    },
    {
      id: 2,
      title: "Schistosomiasis",
      subtitle: "Success Story",
      description:
        "Through collaboration with public health partners, Pharco improved access to schistosomiasis treatment and supported national control programs addressing neglected tropical diseases.",
      image: "/images/hepc2.jpg",
      link: "/about-impact-csr",
      btnText: "Learn More About Schistosomiasis Control",
    },
  ];

  // Autoplay functionality
  useEffect(() => {
    if (!api) return;

    const autoplayInterval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    setCurrentSlide(api.selectedScrollSnap());

    return () => {
      clearInterval(autoplayInterval);
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="relative py-6 md:pt-16 overflow-hidden reveal">
      <div className="container mx-auto relative">
        <Carousel className="relative" setApi={setApi}>
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="basis-full">
                <div className="relative">
                  {/* Content Overlay */}
                  <div className="w-full lg:w-1/2 lg:absolute lg:left-26 lg:top-1/2 lg:-translate-y-1/2 z-10 md:p-4 lg:pl-0">
                    <div className="p-2 lg:p-10 shadow-xl rounded-lg bg-white">
                      <h2 className="text-3xl md:text-6xl text-secondary mb-6">
                        {slide.title}
                        <span className="text-primary"> {slide.subtitle}</span>
                      </h2>
                      <p className="text-base text-secondary mb-6">
                        {slide.description}
                      </p>
                      <div className="mt-2 flex justify-start">
                        <Button
                          asChild
                          className="rounded-full bg-transparent text-black border-transparent px-5 group w-fit text-left"
                        >
                          <Link href={slide.link} className="flex items-center gap-3">
                            <span className="underline group-hover:no-underline transition-colors duration-300">
                              {slide.btnText}
                            </span>
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-black">
                              <ArrowUpRight className="w-4 h-4" />
                            </span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="w-full lg:w-3/4 ml-auto">
                    <div className="relative h-auto md:h-[450px] w-full overflow-hidden shadow-xl">
                      <Image
                        src={slide.image}
                        alt={`Hepatitis C ${slide.subtitle}`}
                        width={1000}
                        height={400}
                        className="object-cover object-center w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Controls - Outside Content */}
          <div className="flex justify-end items-center mt-6 gap-5">
            <CarouselPrevious
              className="static size-10 lg:size-14"
              iconClassName="size-5 lg:size-8"
            />
            <CarouselNext
              className="static size-10 lg:size-14"
              iconClassName="size-5 lg:size-8"
            />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default HebCsection;
