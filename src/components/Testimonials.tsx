"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonials() {
  const sliderRef = useRef<Slider | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const reviews = [
    {
      id: 1,
      name: "Heritage Grand Hotel",
      role: "Operations & Linen Director",
      category: "Hospitality",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      quote:
        "LuxeWash transformed our housekeeping operations. Punctual scheduled pickups, immaculate bed linen pressing, and spotless bath towels delivered on time every single day.",
      hasImageBg: false,
    },
    {
      id: 2,
      name: "City Care Specialty Hospital",
      role: "Facility & Hygiene Head",
      category: "Healthcare",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
      quote:
        "Medical-grade sanitized handling, isolated washing drums, and pristine scrubs. LuxeWash gives our clinical staff and patients total peace of mind.",
      hasImageBg: true,
    },
    {
      id: 3,
      name: "Saffron Royal Banquets",
      role: "Executive Chef & Catering Mgr",
      category: "Food Service",
      photo: "https://images.unsplash.com/photo-1614289371518-722f2615943d?auto=format&fit=crop&w=800&q=80",
      quote:
        "Managing heavy banquet linen and chef coats used to be a nightmare. LuxeWash removes deep stains and delivers crisp tablecloths with zero turnaround delays.",
      hasImageBg: false,
    },
    {
      id: 4,
      name: "Apex Corporate Campus",
      role: "Administration & Workwear Lead",
      category: "Corporate",
      photo: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800&q=80",
      quote:
        "Over 400 employee uniforms collected, cleaned, and returned weekly. Consistent commercial quality and very dependable account coordination.",
      hasImageBg: true,
    },
  ];

  // React Slick Slider Configuration: 1 slide strictly on mobile, 2 on tablet, 3 on desktop
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3800,
    pauseOnHover: true,
    arrows: false,
    swipe: true,
    touchMove: true,
    swipeToSlide: true,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <section id="testimonials" className="py-10 sm:py-14 md:py-16 bg-[#FAF9FD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          {/* Header */}
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#2E0854] font-body bg-purple-50 px-3.5 py-1 rounded-full border border-purple-200/50">
              <span className="w-2 h-2 rounded-full bg-[#2E0854] inline-block" />
              <span>TESTIMONIALS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#18042b] tracking-tight font-display leading-tight max-w-xl">
              Stories from businesses that trust LuxeWash
            </h2>
          </div>

          {/* Quick Prev / Next Arrows */}
          <div className="flex items-center gap-2 self-start sm:self-end">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              aria-label="Previous Testimonial"
              className="w-10 h-10 rounded-full border border-purple-200 bg-white shadow-sm flex items-center justify-center text-[#2E0854] hover:bg-purple-50 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              aria-label="Next Testimonial"
              className="w-10 h-10 rounded-full border border-purple-200 bg-white shadow-sm flex items-center justify-center text-[#2E0854] hover:bg-purple-50 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* React Slick Slider Carousel */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <Slider ref={sliderRef} {...sliderSettings} className="testimonials-slider">
          {reviews.map((rev) => (
            <div key={rev.id} className="px-2 sm:px-3 pb-8">
              <div
                className={`w-full h-full min-h-[320px] sm:min-h-[350px] rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl ${
                  rev.hasImageBg
                    ? "text-white border border-white/25 shadow-purple-950/20"
                    : "bg-white text-slate-800 border border-purple-100/80 ring-1 ring-purple-100/50 shadow-purple-950/5 hover:border-purple-200"
                }`}
              >
                {rev.hasImageBg && (
                  <>
                    <Image
                      src={rev.photo}
                      alt={rev.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 backdrop-blur-[2px]" />
                  </>
                )}

                {/* Card Top: Stars & Category */}
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-body ${
                      rev.hasImageBg
                        ? "bg-white/20 text-white backdrop-blur-md"
                        : "bg-purple-50 text-[#2E0854] border border-purple-100"
                    }`}
                  >
                    {rev.category}
                  </span>
                </div>

                {/* Card Middle: Quote */}
                <div className="relative z-10 flex-1 flex flex-col justify-start">
                  <Quote
                    className={`w-7 h-7 mb-2 opacity-30 ${
                      rev.hasImageBg ? "text-amber-300" : "text-[#2E0854]"
                    }`}
                  />
                  <p
                    className={`text-sm sm:text-base font-medium leading-relaxed font-body ${
                      rev.hasImageBg ? "text-slate-100" : "text-slate-700"
                    }`}
                  >
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                {/* Card Bottom: Client Info */}
                <div
                  className={`relative z-10 pt-4 mt-4 flex items-center justify-between border-t ${
                    rev.hasImageBg ? "border-white/20" : "border-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                      <Image
                        src={rev.photo}
                        alt={rev.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4
                        className={`font-bold text-sm sm:text-base font-body ${
                          rev.hasImageBg ? "text-white" : "text-[#18042b]"
                        }`}
                      >
                        {rev.name}
                      </h4>
                      <p
                        className={`text-sm font-body ${
                          rev.hasImageBg ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {rev.role}
                      </p>
                    </div>
                  </div>

                  <CheckCircle2
                    className={`w-5 h-5 shrink-0 ${
                      rev.hasImageBg ? "text-emerald-400" : "text-emerald-600"
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Slick Slider Custom Styles */}
      <style jsx global>{`
        .testimonials-slider .slick-list {
          overflow: hidden;
          margin: 0 -4px;
        }
        .testimonials-slider .slick-track {
          display: flex !important;
        }
        .testimonials-slider .slick-slide {
          height: inherit !important;
          display: flex !important;
        }
        .testimonials-slider .slick-slide > div {
          width: 100%;
          display: flex;
          height: 100%;
        }
        .testimonials-slider .slick-dots {
          bottom: -20px;
          display: flex !important;
          justify-content: center;
          align-items: center;
          gap: 6px;
        }
        .testimonials-slider .slick-dots li {
          margin: 0;
          width: auto;
          height: auto;
        }
        .testimonials-slider .slick-dots li button {
          width: 8px;
          height: 8px;
          padding: 0;
          border-radius: 9999px;
          background-color: #cbd5e1;
          transition: all 0.3s ease;
        }
        .testimonials-slider .slick-dots li button:before {
          display: none;
        }
        .testimonials-slider .slick-dots li.slick-active button {
          width: 24px;
          background-color: #2e0854;
        }
      `}</style>
    </section>
  );
}
