"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const MapSection = () => {
  return (
    <>
      <section className="relative md:h-screen flex items-center flex-col md:flex-row">
        {/* <img
          className="absolute inset-0 w-full h-full object-contain object-right-top"
          src="/images/map.jpg"
          alt="location"
        /> */}

        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Main content container */}
          <div className="container relative z-10 h-full flex items-center col-span-1">
            <div className="w-full relative  md:pl-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Main headline */}
                <div className="space-y-2">
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                    className="md:text-6xl text-2xl text-secondary mb-8 lg:w-full capitalize"
                  >
                    Pharco Across
                    <span className="text-primary font-bold">
                      {" "}
                      Global Markets
                    </span>
                  </motion.h2>
                </div>
                {/* Description text */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-gray-600 mb-8 leading-relaxed w-full md:pr-2"
                >
                  Pharco delivers medicines across global pharmaceutical markets
                  through strong partnerships with healthcare providers and
                  distribution networks. With a focus on access to essential
                  medicines, we support patient care and ensure consistent supply
                  across regions through our international pharmaceutical
                  distribution and export operations.
                </motion.p>
              </motion.div>
              <div className="mb-8 flex">
                <Button
                  asChild
                  className="rounded-full bg-transparent text-black border-transparent px-5 group"
                >
                  <Link href="/global-presence" className="flex items-center gap-3">
                    <span className="underline group-hover:no-underline transition-colors duration-300">
                      Explore Our Global Markets
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-black">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full h-full object-cover object-right-top col-span-1">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/images/map-v.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </>
  );
};

export default MapSection;
