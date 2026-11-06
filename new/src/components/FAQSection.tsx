"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does LuxeWash prevent textile loss and mix-ups?",
      a: "Every client inventory is handled in segregated, dedicated clean-transport laundry cages. For larger commercial partners, we provide discreet heat-seal matrix barcode or passive RFID tracking chips on all high-rotation bed sheets and uniforms, offering 100% accountability on piece counts.",
    },
    {
      q: "What is your standard turnaround time for commercial partners?",
      a: "Our standard SLA turnaround is 24 hours. For high-occupancy boutique hotels and daily dinner operations, we offer synchronized twice-daily scheduled pickup and delivery loops (e.g., 7:00 AM delivery with morning soil collection).",
    },
    {
      q: "Do you handle specialized stains and delicate luxury fabrics?",
      a: "Yes. Our facility features an artisanal pre-spotting and stain-reclamation lab staffed by textile technicians. We safely eliminate red wine, culinary oils, cosmetic makeup, and biological stains from Egyptian cotton, Belgian linen, and silk blends without fiber degradation.",
    },
    {
      q: "How are commercial rates structured?",
      a: "We offer both transparent per-pound pricing (weighed on certified scales upon intake) and flat per-item menu rates (e.g. per duvet cover, per tablecloth). All rates include pickup, delivery, sanitization, pressing, and sterile protective wrapping.",
    },
    {
      q: "Can we trial your services before entering a seasonal contract?",
      a: "Absolutely. We encourage prospective hotels, restaurants, and medical centers to conduct a complimentary 1-week pilot wash with up to 300 lbs of linens to evaluate our cleanliness, finishing, and logistics first-hand.",
    },
  ];

  return (
    <section id="faq" className="w-full bg-[#faf8f5] py-10 sm:py-14 border-b border-[#ece6dc]">
      <div className="max-w-[980px] mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-4 h-[1.5px] bg-[#6825a3]" />
            <span className="text-[11px] font-sans font-semibold tracking-[0.24em] uppercase text-[#6825a3]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <span className="w-4 h-[1.5px] bg-[#6825a3]" />
          </div>

          <h2 className="font-serif text-[34px] sm:text-[42px] leading-[1.1] text-[#191024] font-medium tracking-tight">
            Commercial Care Inquiries
          </h2>
        </div>

        {/* Accordion list */}
        <div className="divide-y divide-[#e2dcd2] border-t border-b border-[#e2dcd2]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="py-6 sm:py-7 cursor-pointer group"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-[16px] sm:text-[18px] font-medium text-[#1e0a33] group-hover:text-[#6d228f] transition-colors pr-4">
                    {faq.q}
                  </h3>
                  <div className="p-1 rounded text-[#6d228f] group-hover:bg-purple-100/70 transition-colors flex-shrink-0">
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </div>

                {isOpen && (
                  <div className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-[#554a61] pr-8 animate-fadeIn">
                    {faq.a}
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
