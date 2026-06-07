"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroCanvas from "@/components/HeroCanvas";
import FarmIntro from "@/components/FarmIntro";
import WhyChooseUs from "@/components/WhyChooseUs";
import GrowingProcess from "@/components/GrowingProcess";
import CurrentCrops from "@/components/CurrentCrops";
import CustomCropProgram from "@/components/CustomCropProgram";
import Sustainability from "@/components/Sustainability";
import BulkSupply from "@/components/BulkSupply";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    // Client-side Lenis initialization to avoid SSR window errors
    let lenisInstance: any;

    const initLenis = async () => {
      const { default: Lenis } = await import("lenis");
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#050505" }}>
      <Navbar />
      <HeroCanvas />
      <FarmIntro />
      <WhyChooseUs />
      <GrowingProcess />
      <CurrentCrops />
      <CustomCropProgram />
      <Sustainability />
      <BulkSupply />
      <ContactSection />
      <Footer />
    </main>
  );
}