"use client";

import React, { useState } from "react";
import { Plus, Minus, Search, HelpCircle, PhoneCall } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      q: "What is your standard vs. express turnaround time?",
      a: "Our standard concierge turnaround is 24 hours from pickup. If you select our Express Priority service during booking, we can clean, steam press, and deliver your garments in as little as 12 hours (same-day evening return for morning pickups).",
    },
    {
      q: "Do you ever wash clothes together with other customers?",
      a: "Never. Under our strict 100% Private Sanitation protocol, every client's garments are washed in dedicated, freshly sanitized European drums with independent temperature, detergent, and rinse cycles. We never combine loads.",
    },
    {
      q: "Are your detergents and dry cleaning solvents safe for sensitive skin?",
      a: "Yes! We use 100% biodegradable, hypoallergenic bio-enzymes and gentle organic hydrocarbon solvents. We are certified free of PERC, toxic phosphates, artificial dye brighteners, and harsh bleaches, making our washes completely infant- and pet-safe.",
    },
    {
      q: "Do I need to weigh or sort my clothes prior to pickup?",
      a: "Not at all. You can place all your laundry into any bag or hamper. When our valet arrives, they provide sealed LUXE WASH garment hampers. Our in-house fabric technicians sort all items into whites, darks, and delicate fibers.",
    },
    {
      q: "What is your policy for difficult stains or delicate couture trims?",
      a: "Our certified fabric specialists inspect every collar, cuff, and seam under high-intensity daylight lamps. We treat stubborn stains with custom botanical pre-spotting agents. In the rare event a spot requires a second treatment, we re-clean free of charge.",
    },
    {
      q: "How does payment and billing work?",
      a: "We offer completely touchless, digital billing. After your garments are weighed and itemized at our facility, you receive a detailed digital invoice via SMS/Email with itemized pricing. You can pay seamlessly using Credit/Debit Cards, Apple Pay, Google Pay, or Cash upon delivery.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#faf7fd] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-900 text-xs font-black uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>COMMON INQUIRIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-amber-600">
              Questions
            </span>
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Have questions about our pickup windows, fabric care, or pricing? We have answers.
          </p>

          {/* Quick Search Bar */}
          <div className="mt-8 relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. turnaround, detergents, stains)..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-purple-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm bg-white rounded-2xl p-6 border border-purple-100">
              No matching questions found. Call our 24/7 concierge at{" "}
              <a href="tel:+18005893927" className="text-purple-800 font-bold underline">
                +1 (800) 589-3927
              </a>
              !
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className={`rounded-2xl transition-all duration-200 border ${
                    isOpen
                      ? "bg-white border-purple-300 shadow-md ring-1 ring-purple-100"
                      : "bg-white/80 hover:bg-white border-purple-100"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base group"
                  >
                    <span className="group-hover:text-purple-900 transition-colors">
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${
                        isOpen
                          ? "bg-purple-900 text-amber-300 rotate-180"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-purple-50 pt-4 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Need Help Prompt */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-purple-50 border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-purple-950">Still have a unique question?</h4>
            <p className="text-xs text-purple-700">Our master fabric care team is on standby 7 days a week.</p>
          </div>
          <a
            href="tel:+18005893927"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-900 text-amber-300 hover:bg-purple-800 text-xs font-bold transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call Concierge Line</span>
          </a>
        </div>

      </div>
    </section>
  );
}
