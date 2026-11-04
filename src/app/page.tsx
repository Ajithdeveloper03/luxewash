"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import IndustrialHeroBanner from "@/components/IndustrialHeroBanner";
import RibbonBanner from "@/components/RibbonBanner";
import HeroSection from "@/components/HeroSection";
import IndustriesSection from "@/components/IndustriesSection";
import ApproachSection from "@/components/ApproachSection";
import CommercialServicesSection from "@/components/CommercialServicesSection";
import ClientTestimonials from "@/components/ClientTestimonials";
import FAQSection from "@/components/FAQSection";
import PlanCareCTA from "@/components/PlanCareCTA";
import SiteFooter from "@/components/SiteFooter";
import PlanCareModal from "@/components/PlanCareModal";

export default function Home() {
  const [isPlanCareOpen, setIsPlanCareOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("Commercial Enterprise");

  const openPlanCare = (industry?: string) => {
    if (industry) setSelectedIndustry(industry);
    setIsPlanCareOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#faf8f5] text-[#191024]">
      <Navbar onOpenPlanCare={openPlanCare} />
      <div id="facility">
        <IndustrialHeroBanner onOpenQuote={openPlanCare} />
      </div>
      <RibbonBanner />
      <HeroSection onOpenPlanCare={() => openPlanCare("Hotels & Resorts")} />
      <IndustriesSection onSelectIndustry={openPlanCare} />
      <ApproachSection onOpenPlanCare={() => openPlanCare()} />
      <CommercialServicesSection onOpenQuote={openPlanCare} />
      <ClientTestimonials />
      <FAQSection />
      <PlanCareCTA onOpenPlanCare={() => openPlanCare()} />
      <SiteFooter />
      <PlanCareModal
        isOpen={isPlanCareOpen}
        onClose={() => setIsPlanCareOpen(false)}
        preSelectedIndustry={selectedIndustry}
      />
    </main>
  );
}
