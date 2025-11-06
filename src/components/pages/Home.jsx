import React from "react";
import HeroSection from "@/components/organisms/HeroSection";
import ServicesSection from "@/components/organisms/ServicesSection";
import FeaturedDishes from "@/components/organisms/FeaturedDishes";
import AboutSection from "@/components/organisms/AboutSection";
import TestimonialsSection from "@/components/organisms/TestimonialsSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <FeaturedDishes />
      <AboutSection />
      <TestimonialsSection />
    </div>
  );
};

export default Home;