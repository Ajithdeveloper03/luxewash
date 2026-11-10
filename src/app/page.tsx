"use client";

import React from "react";
import HeroFrameSection from "@/components/HeroFrameSection";
import AboutPhilosophySection from "@/components/AboutPhilosophySection";
import FabricFrameSection from "@/components/FabricFrameSection";
import ServicesSection from "@/components/ServicesSection";
import PunchingFrameSection from "@/components/PunchingFrameSection";
import CurvedClothSection from "@/components/CurvedClothSection";
import FloatingUmbrellaSection from "@/components/FloatingUmbrellaSection";
import TestimonialSection from "@/components/TestimonialSection";
import LuxuryFooter from "@/components/LuxuryFooter";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white selection:bg-amber-400 selection:text-purple-950 font-sans bg-black w-full max-w-[100vw] overflow-x-hidden not-italic">
      {/* 1. Hero Frame Section: Complete Dark Background, Huge Stylish Glowing LUXEWASH Title at Top (Fades Top), Bottom Left/Right Content (Fades Left/Right), Slightly Scaled-Out Frames */}
      <HeroFrameSection />

      {/* 2. Who We Are Section: Minimal Content + Free Online Laundry Images */}
      <AboutPhilosophySection />

      {/* 3. Fabric Protection Frame Section: Full-Screen Background Frames + Transparent Right-Side Content */}
      <FabricFrameSection />

      {/* 4. Services Section: 3 Minimal Service Cards + Free Online Laundry Images */}
      <ServicesSection />

      {/* 5. Punching Frame Section: 238 Frames on Slow Steady ScrollTrigger (Left Content Only) */}
      <PunchingFrameSection />

      {/* 6. Full-Width White Curved Line Section: Center White-Bg Logo + Dirty Clothes from Left -> Behind Logo -> Fresh Clean Clothes to Right */}
      <CurvedClothSection />

      {/* 7. Floating Umbrella Showcase Section: Continuous Spline Wind Flight, Flying White Birds & Delayed Content Reveal */}
      <FloatingUmbrellaSection />

      {/* 8. Minimal Client Review & Direct Helpline CTA (No Popup Form) */}
      <TestimonialSection />

      {/* 9. Clean Minimal Footer */}
      <LuxuryFooter />
    </main>
  );
}
