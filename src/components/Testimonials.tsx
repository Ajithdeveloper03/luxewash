"use client";

import React, { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, Sparkles } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Sophia Montgomery",
      role: "Fashion Boutique Director",
      service: "Couture Dry Cleaning & Silk Care",
      rating: 5,
      avatar: "SM",
      quote:
        "As a boutique owner, I am extremely particular about fabric preservation. LUXE WASH restored vintage silk and hand-beaded blouses that other dry cleaners refused to touch. The garment arrived with zero chemical smell and looked brand new.",
    },
    {
      name: "Marcus Vance, Esq.",
      role: "Corporate Trial Attorney",
      service: "Weekly Executive Shirt & Suit Care",
      rating: 5,
      avatar: "MV",
      quote:
        "I need 6 to 8 crisp shirts and two tailored wool suits pressed every single week. LUXE WASH's doorstep valet picks up like clockwork at 7:30 AM and drops them off immaculately hung within 24 hours. They have completely eliminated my weekend laundry stress.",
    },
    {
      name: "Dr. Eleanor Chen",
      role: "Pediatric Specialist & Mother",
      service: "Bio-Enzyme Wash & Fold Subscription",
      rating: 5,
      avatar: "EC",
      quote:
        "With two toddlers with sensitive eczema skin, commercial laundry detergents were a nightmare. LUXE WASH's organic hypoallergenic wash has been a godsend. Fluffy, clean, and delivered in military-crisp folded stacks.",
    },
    {
      name: "Alexander Rossi",
      role: "Architect & Interior Designer",
      service: "Luxury Bedding & Cashmere Throws",
      rating: 5,
      avatar: "AR",
      quote:
        "Their down duvet and Belgian linen treatment is unparalleled. Sleeping in our freshly sanitized bedding feels like checking into a 5-star Swiss hotel every single time. Absolutely worth every single penny.",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#140520] text-white relative overflow-hidden border-t border-purple-900/60">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/80 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>CUSTOMER EXPERIENCES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Over 25,000+ Wardrobes{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
              Trust LUXE WASH
            </span>
          </h2>
          <p className="mt-4 text-purple-200/80 text-base">
            Read authentic reviews from city residents, attorneys, doctors, and fashion connoisseurs.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#240c38] via-[#1a0729] to-[#13041f] border-2 border-purple-700/50 rounded-3xl p-8 sm:p-12 shadow-2xl relative">
          
          <Quote className="w-16 h-16 text-amber-400/15 absolute top-6 right-8 pointer-events-none" />

          {/* Rating Stars */}
          <div className="flex items-center gap-1.5 text-amber-400 mb-6">
            {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
            <span className="text-xs font-bold text-amber-300 ml-2">Verified 5.0 Rating</span>
          </div>

          {/* Quote text */}
          <blockquote className="text-lg sm:text-2xl font-serif italic text-purple-100 leading-relaxed mb-8">
            &ldquo;{testimonials[activeIndex].quote}&rdquo;
          </blockquote>

          {/* Client Details */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-purple-800/50">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-purple-950 flex items-center justify-center font-bold text-lg font-mono shadow-lg">
                {testimonials[activeIndex].avatar}
              </div>
              <div>
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>{testimonials[activeIndex].name}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </h4>
                <div className="text-xs text-purple-300">
                  {testimonials[activeIndex].role}
                </div>
                <div className="inline-block mt-1 text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  {testimonials[activeIndex].service}
                </div>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="w-11 h-11 rounded-full bg-purple-900/80 hover:bg-amber-400 hover:text-purple-950 text-white flex items-center justify-center transition-all border border-purple-700/60"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-11 h-11 rounded-full bg-purple-900/80 hover:bg-amber-400 hover:text-purple-950 text-white flex items-center justify-center transition-all border border-purple-700/60"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

        {/* Small thumbnail pills to jump between reviews */}
        <div className="flex justify-center items-center gap-3 mt-8">
          {testimonials.map((t, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === idx ? "w-10 bg-amber-400" : "w-2.5 bg-purple-800 hover:bg-purple-600"
              }`}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
