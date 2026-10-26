"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Faqs from "@/components/Faqs";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import FloatingQuote from "@/components/FloatingQuote";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#FAF8FD] text-[#1E0935] selection:bg-purple-900 selection:text-amber-300">
      {/* Header */}
      <Navbar />

      {/* Hero Section with Scroll-Controlled Locked Video */}
      <Hero />

      {/* Stats Section */}
      <Stats />

      {/* About Us Section */}
      <AboutUs />

      {/* Signature Services Section with Clothesline & Stacking Cards */}
      <Services />

      {/* Industries We Serve Section */}
      <WhyChooseUs />

      {/* How It Works Section with ScrollTrigger Card Unfolding & Spreading Animation */}
      <HowItWorks />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQs Section */}
      <Faqs />

      {/* Contact Us / Business Enquiries Section */}
      <CtaSection />

      {/* Footer */}
      <Footer />

      {/* Floating Quote Action Button on Bottom-Left */}
      <FloatingQuote />

      {/* Floating WhatsApp Action Button on Bottom-Right */}
      <FloatingWhatsApp />

      {/* Scroll to Top Button above WhatsApp on Bottom-Right */}
      <ScrollToTop />
    </div>
  );
}
