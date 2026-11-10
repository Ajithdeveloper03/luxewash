"use client";

import React from "react";
import ReplicaHero from "@/components/ReplicaHero";
import ReplicaAbout from "@/components/ReplicaAbout";
import ReplicaFeatures from "@/components/ReplicaFeatures";
import ReplicaIndustries from "@/components/ReplicaIndustries";
import ReplicaExperience from "@/components/ReplicaExperience";
import ReplicaTestimonial from "@/components/ReplicaTestimonial";
import ReplicaContact from "@/components/ReplicaContact";
import ReplicaFooter from "@/components/ReplicaFooter";
import ScrollBackgroundCanvas from "@/components/ScrollBackgroundCanvas";

export default function Home() {
  const handleOpenBooking = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen text-slate-900 selection:bg-purple-200 selection:text-purple-950 font-sans bg-transparent w-full max-w-full overflow-x-hidden">
      {/* 100% Pure Scroll-Driven Background Canvas (Zero Overlay) */}
      <ScrollBackgroundCanvas />

      {/* 1. Hero Section: Centered Glassmorphic Frame & Black Bezel Border */}
      <ReplicaHero onOpenBooking={handleOpenBooking} />

      {/* 2. About Section: Asymmetrical 2-Column Split */}
      <ReplicaAbout />

      {/* 3. Services Section: 4 Flanking Cards on Left & Right Sides */}
      <ReplicaFeatures />

      {/* 4. Industries Section (Proudly Section): Visible as usual in standard scroll */}
      <ReplicaIndustries />

      {/* 5. Experience Section (Image 2 Replica): 4 Flanking Cards & Open Center View */}
      <ReplicaExperience />

      {/* 6. Testimonial Section (Image 1 Replica): Portrait + Indigo Metrics Card */}
      <ReplicaTestimonial />

      {/* 7. White-Glove Dispatch & Booking Section */}
      <ReplicaContact />

      {/* 8. Minimal Footer */}
      <ReplicaFooter />
    </main>
  );
}
