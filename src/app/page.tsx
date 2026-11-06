"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroWashingMachine from "@/components/HeroWashingMachine";
import AboutSection from "@/components/AboutSection";
import WashTrajectory from "@/components/WashTrajectory";
import ServicesSection from "@/components/ServicesSection";
import IndustriesSection from "@/components/IndustriesSection";
import InteractiveEstimator from "@/components/InteractiveEstimator";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>("Wardrobe Elite");

  const handleOpenBooking = (service?: string) => {
    if (service) {
      setSelectedServiceForBooking(service);
    }
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectEstimate = (summary: string) => {
    setSelectedServiceForBooking(summary);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#07090e] text-[#f1f5f9] relative selection:bg-cyan-500 selection:text-slate-950 font-sans">
      {/* 1. Header / Navigation: Menus Home, About, Services, Industries, Contact */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* 2. Hero Section: Interactive Laundry Machine Animation & Cycle Telemetry */}
      <HeroWashingMachine onOpenBooking={handleOpenBooking} />

      {/* 3. About Section: Molecular Garment Engineering, Facility Specs & Benchmark Matrix */}
      <AboutSection />

      {/* 4. The 5-Stage Precision Wash Trajectory: Optical Scan to Centrifugal Dry */}
      <WashTrajectory />

      {/* 5. Services Section: Wardrobe Elite, Couture Atelier, Hospitality Linens, Express 4-Hour */}
      <ServicesSection onOpenBooking={handleOpenBooking} />

      {/* 6. Industries Section: Hotels, Michelin Dining, Healthcare, Private Aviation & Corporate */}
      <IndustriesSection onOpenBooking={handleOpenBooking} />

      {/* 7. Interactive Linen & Garment Volume Estimator */}
      <InteractiveEstimator onSelectEstimate={handleSelectEstimate} />

      {/* 8. Contact Section: Live Dispatch Countdown & Collection Manifest Form */}
      <ContactSection initialService={selectedServiceForBooking} />

      {/* 9. Site Footer */}
      <Footer />
    </main>
  );
}
