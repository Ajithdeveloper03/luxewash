"use client";

import React, { useState } from "react";
import { ChevronDown, Sparkles, HelpCircle, Phone } from "lucide-react";

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const whatsappUrl =
    "https://wa.me/18005893927?text=Hi%20LUXEWASH,%20I%20have%20a%20question%20regarding%20my%20laundry.";

  const faqs = [
    {
      q: "How does your free scheduled pickup and delivery work?",
      a: "Booking takes under 60 seconds online or on WhatsApp. Simply choose your preferred 1-hour collection window. A uniformed LUXEWASH driver arrives at your doorstep with breathable laundry hampers. Once collected, your items are audited and cleaned in our atelier. Your garments are returned freshly packaged, on luxury hangers or bundled, within 24–48 hours.",
    },
    {
      q: "What kind of detergents do you use? Are they safe for sensitive skin?",
      a: "We exclusively use 100% biodegradable, hypoallergenic, plant-based enzyme suds. Our formulation contains zero phosphates, artificial dyes, chlorine bleach, or petrochemical fragrances. It is certified pediatrician-approved and safe for newborns, allergy sufferers, and sensitive skin.",
    },
    {
      q: "Do you wash my clothes with other customers' garments?",
      a: "Never. Every single client order is processed in a private, sanitized machine drum. We never co-mingle garments from different households under any circumstance. Your personal laundry note and item tags remain isolated throughout the entire washing and drying cycle.",
    },
    {
      q: "How do you prevent shrinkage and color bleeding?",
      a: "We follow a strict multi-point segregation protocol: whites, light pastels, and dark colors are washed in separate temperature-calibrated cycles. For drying, our computerized tumble dryers utilize moisture sensors rather than extreme heat, shutting off precisely when optimal moisture levels are reached so fibers never warp or shrink.",
    },
    {
      q: "What if I have loose buttons, fallen hems, or stubborn stains?",
      a: "Our post-spotting and finishing team inspects every single item. Minor repairs—such as tightening loose buttons, re-stitching fallen hems, and replacing missing standard shirt buttons—are done with our compliments! For stubborn stains (wine, grease, ink), our organic cold-spotting tables target the blemishes before washing.",
    },
    {
      q: "What is your standard turnaround time? Is express service available?",
      a: "Our standard turnaround time is 48 hours for dry cleaning and 24–48 hours for wash & fold. If you require emergency turnaround, we offer a 24-Hour VIP Express service for a modest priority surcharge.",
    },
    {
      q: "How do I know how much my laundry weighs or what the final cost is?",
      a: "You don't need to weigh your clothes in advance! When your driver collects your bag, it is weighed on commercial digital scales at our facility and itemized. You receive a digital invoice breakdown with piece counts before we start processing.",
    },
    {
      q: "What is your garment care and protection guarantee?",
      a: "We stand behind our craftsmanship with the LUXEWASH Royal Guarantee. In the rare event that an item requires re-cleaning, we perform a complimentary re-treatment within 24 hours. Furthermore, all designer and couture garments are backed by our comprehensive garment insurance policy.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-8 sm:py-10 md:py-12 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-[#8a650c] text-sm font-semibold uppercase tracking-wider font-body">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>CLARITY &amp; TRANSPARENCY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#18042b] tracking-tight font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-body">
            Everything you need to know about our commercial linen care, pickup logistics, and custom service agreements.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white/80 backdrop-blur-xl border-amber-400/80 shadow-md ring-1 ring-amber-400/20"
                    : "bg-white/45 backdrop-blur-md border-purple-100/70 hover:border-purple-300 shadow-2xs hover:bg-white/65"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-5 px-6 sm:px-7 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-bold text-base sm:text-lg transition-colors ${
                      isOpen ? "text-[#59159c]" : "text-slate-800"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`p-2 rounded-xl transition-all duration-300 shrink-0 ${
                      isOpen
                        ? "bg-[#59159c] text-white rotate-180"
                        : "bg-purple-100/70 text-purple-800"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-purple-100/60">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

       
      </div>
    </section>
  );
}
