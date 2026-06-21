import React from "react";
import HeroBanner from "./sections/HeroBanner";
import AboutSection from "./sections/AboutSection";
import MapSection from "./sections/MapSection";
import ManufacturingSection from "./sections/ManufacturingSection";
import HepCSection from "./sections/HepCSection";
import RewardSection from "./sections/RewardSection";
import NewsSection from "./sections/NewsSection";

const HomeView = () => {
  return (
    <div>
      <HeroBanner />
      <AboutSection />
      <MapSection />
      <ManufacturingSection />
      <HepCSection />
      <RewardSection />
      <NewsSection />
    </div>
  );
};

export default HomeView;
