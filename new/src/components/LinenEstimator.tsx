"use client";

import React, { useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface LinenEstimatorProps {
  onOpenPlanCareWithEstimate: (estimateSummary: string) => void;
}

type IndustryType = "hotel" | "restaurant" | "spa" | "clinic";

export default function LinenEstimator({ onOpenPlanCareWithEstimate }: LinenEstimatorProps) {
  const [industry, setIndustry] = useState<IndustryType>("hotel");
  const [unitCount, setUnitCount] = useState<number>(50); // rooms or tables or treatment beds
  const [turnoverDays, setTurnoverDays] = useState<number>(7);
  const [includesPressing, setIncludesPressing] = useState<boolean>(true);

  // Estimation math
  const getCalculation = () => {
    let lbsPerUnitPerDay = 4.5; // hotel average
    if (industry === "restaurant") lbsPerUnitPerDay = 2.8; // napkins + table linens
    if (industry === "spa") lbsPerUnitPerDay = 3.6; // towels + robes
    if (industry === "clinic") lbsPerUnitPerDay = 5.2; // scrubs, sheets, lab coats

    const weeklyLbs = Math.round(unitCount * lbsPerUnitPerDay * turnoverDays);
    const ratePerLb = includesPressing ? 0.78 : 0.62;
    const weeklyCost = Math.round(weeklyLbs * ratePerLb);
    const monthlyCost = Math.round(weeklyCost * 4.33);

    return {
      weeklyLbs,
      weeklyCost,
      monthlyCost,
      recommendedPickup: weeklyLbs > 2500 ? "Daily Scheduled Route" : weeklyLbs > 1000 ? "3x Weekly Cadence" : "2x Weekly Cadence",
    };
  };

  const result = getCalculation();

  const handleApplyEstimate = () => {
    const summary = `${industry.toUpperCase()} Profile: ${unitCount} Units, ${result.weeklyLbs} lbs/week, Est. $${result.weeklyCost}/week (${result.recommendedPickup})`;
    onOpenPlanCareWithEstimate(summary);
  };

  return (
    <section id="estimator" className="w-full bg-[#f6f2ec] py-10 sm:py-14 border-b border-[#ece6dc]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-[1.5px] bg-[#6825a3]" />
            <span className="text-[11px] font-sans font-semibold tracking-[0.24em] uppercase text-[#6825a3]">
              COMMERCIAL VOLUME ESTIMATOR
            </span>
          </div>

          <h2 className="font-serif text-[34px] sm:text-[42px] leading-[1.1] text-[#191024] font-medium tracking-tight mb-3">
            Calculate your weekly textile volume
          </h2>

          <p className="text-[14.5px] leading-relaxed text-[#554a61]">
            Select your industry parameters below to project laundry throughput, pickup frequency, and estimated service investments.
          </p>
        </div>

        {/* Calculator Interactive Box */}
        <div className="bg-white border border-[#e4ded5] shadow-sm grid grid-cols-1 lg:grid-cols-12 rounded-sm overflow-hidden">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#e8e2d8]">
            <div>
              {/* Industry Selector */}
              <label className="block text-xs font-semibold tracking-[0.16em] uppercase text-[#381156] mb-3">
                1. Select Industry Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
                {[
                  { id: "hotel", name: "Hotels & Resorts" },
                  { id: "restaurant", name: "Dining & Catering" },
                  { id: "spa", name: "Spas & Salons" },
                  { id: "clinic", name: "Healthcare" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIndustry(item.id as IndustryType)}
                    className={`p-3 rounded text-center text-xs font-medium border transition-all ${
                      industry === item.id
                        ? "bg-[#240a3e] text-white border-[#240a3e] shadow-sm"
                        : "bg-[#faf8f5] text-[#332247] border-[#e5dfd4] hover:border-purple-300"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Unit Count Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold tracking-[0.16em] uppercase text-[#381156]">
                    2. Capacity Size (
                    {industry === "hotel"
                      ? "Guest Rooms"
                      : industry === "restaurant"
                      ? "Tables"
                      : industry === "spa"
                      ? "Treatment Suites"
                      : "Clinic Beds"}
                    )
                  </label>
                  <span className="font-serif text-2xl font-semibold text-[#6d228f]">
                    {unitCount} units
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="5"
                  value={unitCount}
                  onChange={(e) => setUnitCount(Number(e.target.value))}
                  className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-[#6d228f]"
                />
                <div className="flex justify-between text-[11px] text-[#786e82] mt-1">
                  <span>10 units (Boutique)</span>
                  <span>150 units</span>
                  <span>300+ units (Enterprise)</span>
                </div>
              </div>

              {/* Operating Frequency */}
              <div className="mb-6">
                <label className="block text-xs font-semibold tracking-[0.16em] uppercase text-[#381156] mb-2.5">
                  3. Weekly Operating Days
                </label>
                <div className="flex gap-2">
                  {[5, 6, 7].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setTurnoverDays(days)}
                      className={`flex-1 py-2 text-xs font-medium rounded border transition-colors ${
                        turnoverDays === days
                          ? "bg-[#3c1263] text-white border-[#3c1263]"
                          : "bg-white text-[#554a61] border-[#ded7cc] hover:border-purple-200"
                      }`}
                    >
                      {days} Days / Week
                    </button>
                  ))}
                </div>
              </div>

              {/* Steam Pressing Checkbox */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#f0ebd2]">
                <input
                  type="checkbox"
                  id="pressing"
                  checked={includesPressing}
                  onChange={(e) => setIncludesPressing(e.target.checked)}
                  className="w-4 h-4 rounded text-[#6d228f] focus:ring-purple-600 border-gray-300 accent-[#6d228f]"
                />
                <label htmlFor="pressing" className="text-xs sm:text-[13px] text-[#3d324c] cursor-pointer">
                  Include High-Temp Steam Calender Ironing &amp; Precision Folding
                </label>
              </div>

            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-[#1f0734] text-white p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-purple-900/60 mb-6">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-300">
                  ESTIMATED TEXTILE METRICS
                </span>
                <Sparkles className="w-4 h-4 text-purple-300" />
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-xs text-purple-300 uppercase tracking-wider mb-1">
                    Projected Weekly Volume
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl font-semibold text-white">
                    {result.weeklyLbs.toLocaleString()} <span className="text-lg font-sans font-normal text-purple-300">lbs / wk</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-purple-300 uppercase tracking-wider mb-1">
                    Recommended Pickup Cadence
                  </div>
                  <div className="text-base font-medium text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c084fc]" />
                    <span>{result.recommendedPickup}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-900/60">
                  <div className="text-xs text-purple-300 uppercase tracking-wider mb-1">
                    Estimated Commercial Investment
                  </div>
                  <div className="font-serif text-4xl sm:text-5xl font-semibold text-[#f5effb]">
                    ${result.weeklyCost.toLocaleString()}{" "}
                    <span className="text-sm font-sans font-normal text-purple-300">/ week</span>
                  </div>
                  <div className="text-xs text-purple-300/80 mt-1">
                    Approx. ${result.monthlyCost.toLocaleString()} monthly (Zero setup fee)
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-purple-900/60">
              <button
                onClick={handleApplyEstimate}
                className="w-full flex items-center justify-center gap-2 bg-[#7e22ce] hover:bg-[#9333ea] text-white py-3.5 px-6 rounded text-xs font-semibold uppercase tracking-wider shadow-lg transition-all"
              >
                <span>Plan care with this estimate</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
