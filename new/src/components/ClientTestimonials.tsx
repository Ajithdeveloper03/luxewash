"use client";

import React from "react";

export default function ClientTestimonials() {
  const testimonials = [
    {
      quote:
        "Switching our hotel linen care to LuxeWash transformed our guest satisfaction scores. Our high-thread count sateen sheets return crisp, fragrant, and meticulously folded every single morning.",
      author: "Elena Rostova",
      role: "Director of Housekeeping",
      property: "The Grand Regent Boutique Hotel",
    },
    {
      quote:
        "In fine dining, tablecloth stains and uneven pressing can ruin a service. LuxeWash's stain rejection rate is less than 0.2%, and their emergency split-shift delivery saved our gala weekend.",
      author: "Chef Marcus Vance",
      role: "Proprietor & Culinary Director",
      property: "L'Avenir Brasserie & Wine Bar",
    },
    {
      quote:
        "Our spa linens require strict organic eco-detergents and plush softness that resists fiber stiffening. LuxeWash handles over 8,000 towels monthly with flawless consistency.",
      author: "Serena Thorne",
      role: "Managing Director",
      property: "Aura Thermal Wellness Spa",
    },
  ];

  return (
    <section className="w-full bg-[#faf8f5] py-10 sm:py-14 border-b border-[#ece6dc]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-[1.5px] bg-[#6825a3]" />
            <span className="text-[11px] font-sans font-semibold tracking-[0.24em] uppercase text-[#6825a3]">
              TESTED IN HOSPITALITY
            </span>
          </div>

          <h2 className="font-serif text-[34px] sm:text-[42px] leading-[1.1] text-[#191024] font-medium tracking-tight">
            Trusted by the city&apos;s leading establishments
          </h2>
        </div>

        {/* 3 Editorial Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-10">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#f6f2ec]/60 border border-[#e8e2d8] p-8 sm:p-9 flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-4xl text-[#6d228f] leading-none select-none block mb-4">
                  “
                </span>
                <p className="font-serif text-[17px] sm:text-[18px] leading-[1.65] text-[#2c1d3c] italic font-normal mb-8">
                  {t.quote}
                </p>
              </div>

              <div className="pt-6 border-t border-[#e2dcd2]">
                <div className="font-sans text-[14px] font-semibold text-[#1e0a33]">
                  {t.author}
                </div>
                <div className="text-[12px] text-[#6d228f] font-medium mt-0.5">
                  {t.role}
                </div>
                <div className="text-[12px] text-[#71657c]">
                  {t.property}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
