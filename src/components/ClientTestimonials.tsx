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
    <section id="testimonials" className="w-full overflow-hidden border-b border-[#3b1760] bg-[#240a3e] py-10 sm:py-14">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[1.5px] w-5 bg-[#d7a7ff]" />
            <span className="text-[11px] font-sans font-semibold tracking-[0.24em] uppercase text-[#d7a7ff]">
              TESTED IN HOSPITALITY
            </span>
          </div>

          <h2 className="font-serif text-[34px] sm:text-[42px] leading-[1.1] text-white font-medium tracking-tight">
            Trusted by the city&apos;s leading establishments
          </h2>
          <p className="mt-3 text-sm text-purple-200/70">Real results from teams that cannot compromise on presentation.</p>
        </div>

        <div className="testimonial-marquee">
          <div className="testimonial-track">
            {[...testimonials, ...testimonials].map((t, idx) => (
            <div
              key={`${t.author}-${idx}`}
              className="flex h-[255px] w-[min(82vw,390px)] shrink-0 flex-col justify-between rounded-sm border border-white/15 bg-white/[0.08] p-6 shadow-lg backdrop-blur-sm sm:h-[270px] sm:p-7"
            >
              <div>
                <span className="font-serif text-4xl leading-none text-[#d7a7ff] select-none block mb-2">
                  “
                </span>
                <p className="font-serif text-[16px] leading-[1.45] text-purple-50 italic font-normal">
                  {t.quote}
                </p>
              </div>

              <div className="border-t border-white/15 pt-3">
                <div className="font-sans text-[13px] font-semibold text-white">
                  {t.author}
                </div>
                <div className="mt-0.5 text-[11px] font-medium text-[#d7a7ff]">
                  {t.role}
                </div>
                <div className="text-[11px] text-purple-200/60">
                  {t.property}
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
