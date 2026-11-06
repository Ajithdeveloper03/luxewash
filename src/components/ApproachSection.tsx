"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus, ArrowUpRight } from "lucide-react";

interface ApproachSectionProps {
  onOpenPlanCare: () => void;
}

export default function ApproachSection({ onOpenPlanCare }: ApproachSectionProps) {
  const [activeStep, setActiveStep] = useState<number | null>(0);

  const steps = [
    {
      number: "01",
      title: "Care that starts with understanding",
      subtitle: "Fabric types and handling instructions come first.",
      details:
        "Every textile blend requires calibrated wash chemistry, thermal regulation, and mechanical action. We catalog your inventory specifications, fiber compositions (Egyptian cotton, sateen weaves, microfiber, blended synthetics), and specific stain-resistance requirements before processing a single piece.",
      metrics: ["Individual Fiber Analysis", "pH-Balanced Formulations", "Zero Harsh Bleach"],
    },
    {
      number: "02",
      title: "A plan around your operation",
      subtitle: "Discuss volume, frequency and service priorities.",
      details:
        "Your linen rhythm dictates our logistics. Whether your boutique hotel requires daily morning replenishment, or your restaurant requires evening turnover and split-shift cart deliveries, we establish an immutable rotation schedule with dedicated buffer stock buffer allocation.",
      metrics: ["7-Day Scheduled Routes", "Surge Volume Headroom", "Sealed Clean-Transport Carts"],
    },
    {
      number: "03",
      title: "Clear expectations from the outset",
      subtitle: "Agree on scope, finishing and commercial terms.",
      details:
        "Transparent per-pound or per-piece billing with zero hidden surcharges. Real-time digital manifest tracking, loss mitigation guarantees, and explicit moisture-retention and ironed-finish standards defined in an enforceable Service Level Agreement.",
      metrics: ["Guaranteed Turnaround SLA", "Digital Weight Manifests", "Single Point of Contact"],
    },
  ];

  return (
    <section id="approach" className="w-full bg-[#faf8f5] py-10 sm:py-14 border-b border-[#ece6dc]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        
        {/* Section Header Matching Reference Image 4 */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          {/* Label with dash */}
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-6 h-[1.5px] bg-[#6825a3]" />
            <span className="text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.24em] uppercase text-[#6825a3]">
              THE LUXEWASH APPROACH
            </span>
          </div>

          <h2 className="font-serif text-[38px] sm:text-[48px] xl:text-[54px] leading-[1.08] text-[#191024] font-medium tracking-[-0.02em] mb-4">
            <span>You take care of your business.</span>
            <br />
            <span className="italic font-normal text-[#6d228f]">
              Let&apos;s care for the linen.
            </span>
          </h2>

          <p className="text-[14.5px] sm:text-[16px] leading-[1.65] text-[#554a61] max-w-[620px]">
            Professional laundry should make an essential operation easier to manage. The starting point is simple: understand your textiles, your volume and your expectations.
          </p>
        </div>

        {/* Two Column Content: Left Image Card, Right Numbered Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
          
          {/* Left Visual Illustration Card - Matching Reference Image 4 */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="bg-[#ede8df]/60 border border-[#e2dcd2] p-5 sm:p-7 rounded-sm shadow-sm">
              <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-[#e8e2d8]">
                <Image
                  src="/images/folded-linens-study.jpg"
                  alt="A study in everyday care, stack of pristine crisp white folded luxury hotel linens"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center hover:scale-103 transition-transform duration-500"
                />
              </div>

              {/* Caption from Reference Image 4 */}
              <div className="pt-4 flex items-center justify-between">
                <span className="text-[9.5px] font-sans font-semibold tracking-[0.22em] uppercase text-[#665e70]">
                  A STUDY IN EVERYDAY CARE · ILLUSTRATION
                </span>
                <span className="w-2 h-2 rounded-full bg-[#6825a3]" />
              </div>
            </div>
          </div>

          {/* Right Numbered Steps - Matching Reference Image 4 */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col divide-y divide-[#e4ddd2]">
            {steps.map((step, index) => {
              const isOpen = activeStep === index;
              return (
                <div
                  key={step.number}
                  className="py-8 sm:py-9 first:pt-2 cursor-pointer group transition-colors"
                  onClick={() => setActiveStep(isOpen ? null : index)}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-6 sm:gap-8">
                      {/* Number: 01, 02, 03 */}
                      <span className="font-serif text-lg sm:text-xl font-medium text-[#6d228f] pt-0.5 select-none">
                        {step.number}
                      </span>

                      <div>
                        {/* Step Title */}
                        <h3 className="text-[17px] sm:text-[19px] font-medium text-[#191024] group-hover:text-[#6d228f] transition-colors mb-1.5">
                          {step.title}
                        </h3>

                        {/* Step Subtitle */}
                        <p className="text-[14px] sm:text-[15px] text-[#554a61] leading-relaxed">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="p-1 rounded text-[#6d228f] group-hover:bg-purple-100/70 transition-colors">
                      {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Expandable Deep Details */}
                  {isOpen && (
                    <div className="mt-5 sm:mt-6 pl-12 sm:pl-14 text-sm text-[#483d54] animate-fadeIn">
                      <p className="leading-relaxed mb-4 text-[14px]">
                        {step.details}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {step.metrics.map((metric) => (
                          <span
                            key={metric}
                            className="text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 bg-purple-100/70 text-[#2b0b49] rounded-sm border border-purple-200/60"
                          >
                            ✓ {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom Consultation Link */}
            <div className="pt-8">
              <button
                onClick={onOpenPlanCare}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#240a3e] hover:text-[#6d228f] group"
              >
                <span>Request custom operational consultation</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
