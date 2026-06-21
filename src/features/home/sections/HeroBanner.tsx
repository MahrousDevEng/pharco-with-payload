"use client";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NextImage from "@/components/global/NextImage";
import { BannerType as OriginalBannerType } from "@/types";
import { ArrowUpRight } from "lucide-react";

type BannerType = OriginalBannerType & {
  type: "image" | "video";
  videoUrl?: string;
  poster?: string;
  Image?: string;
};

const banners = [
  {
    type: "video",
    videoUrl: "/images/intro.mp4",
    poster: "",
    Alt: "Hero Video",
    SubTitle: "",
    Title: "",
    Button1Name: "",
    Button1URL: "",
    Body: "",
  },
  {
    type: "image",
    Image: "/images/banner1.jpg",
    Alt: "slider",
    Title: "Your Health. Our Mission.",
    SubTitle:
      "Better health through accessible medicines and responsible innovation.",
    Body: "",
    Button1Name: "Read More",
    Button1URL: "/about-our-story",
  },
  {
    type: "image",
    Image: "/images/banner-2.jpg",
    Alt: "slider",
    Title: "Your Wellbeing. Our Purpose.",
    SubTitle: "Supporting people on their health journey",
    Body: "",
    Button1Name: "Read More",
    Button1URL: "/about-our-story",
  },
];
const HomeBanner = () => {
  return (
    <section className="relative w-full z-30 ">
      <div className="absolute inset-0 h-1/4 bg-gradient-to-b from-black/80 to-transparent z-10" />
      <Carousel className="relative" carouselType="parallax">
        <CarouselContent>
          {banners?.map((item, i) => (
            <CarouselItem
              className="basis-full relative h-[25vh] md:h-screen overflow-hidden"
              key={i}
            >
              {item.type === "image" && item.Image && (
                <>
                  <img
                    src={item.Image}
                    alt={item.Alt}
                    className="object-cover object-center w-full h-full"
                    width={1920}
                    height={1080}
                    data-parallax
                    data-parallax-speed="0.25"
                  />

                  <div
                    className="container mx-auto  absolute z-10 top-0 h-full"
                    data-parallax
                    data-parallax-speed="-0.2"
                  >
                    <div className="grid grid-cols-12 lg:text-left h-full items-center content-center">
                      <div className="col-span-full mt-20 md:mt-6 p-8 px-2 md:px-20 md:h-full">
                        <h1 className="md:mt-4 md:mb-2 text-primary md:text-5xl text-base md:w-3/4 capitalize">
                          {item.Title}
                        </h1>
                        <h2 className="lg:text-5xl capitalize text-third md:text-secondary text-base block font-textFont md:w-3/4">
                          {item.SubTitle}
                        </h2>
                        <p className="md:w-1/2 pt-4 max-md:hidden">
                          {item.Body}
                        </p>

                        <div className="flex gap-4 lg:justify-start  mt-0 md:mt-6">
                          <Button
                            asChild
                            className="rounded-full bg-transparent text-black border-transparent hover:px-5 px-0 group mt-0"
                          >
                            <Link
                              href={item.Button1URL}
                              className="flex items-center gap-3"
                            >
                              <span className="underline group-hover:no-underline transition-colors duration-300">
                                {item.Button1Name}
                              </span>
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-black">
                                <ArrowUpRight className="w-4 h-4" />
                              </span>
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {item.type === "video" && item.videoUrl && (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  poster={item.poster}
                  data-parallax
                  data-parallax-speed="0.1"
                >
                  <source src={item.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex lg:justify-end items-center mt-0 lg:mt-12 gap-5 lg:pr-20 absolute bottom-0 right-4 z-[51]">
          <CarouselPrevious
            className="static size-10 lg:size-14  border-white"
            iconClassName="size-5 lg:size-8 text-white"
            iconColor="#fff"
          />
          <CarouselNext
            className="static size-10 lg:size-14 border-white"
            iconClassName="size-5 lg:size-8 text-white"
            iconColor="#fff"
          />
        </div>
        <div className="container mx-auto mt-24 absolute bottom-4 lg:bottom-6 z-10">
          <div className="grid grid-cols-12">
            <div className="col-span-full -mt-6  px-2 md:px-20">
              <CarouselDots className=" border-gray-500" />
            </div>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default HomeBanner;
