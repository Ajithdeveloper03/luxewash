"use client";

import React, { useState } from "react";
import { X, CheckCircle2, ArrowRight } from "lucide-react";

interface PlanCareModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedIndustry?: string;
  estimateSummary?: string;
}

export default function PlanCareModal({
  isOpen,
  onClose,
  preSelectedIndustry,
  estimateSummary,
}: PlanCareModalProps) {
  const [industry, setIndustry] = useState<string>(preSelectedIndustry || "Hotels & Resorts");
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [weeklyVolume, setWeeklyVolume] = useState("500 - 2,000 lbs");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Bed Linen & Duvets",
    "Bath Towels & Robes",
  ]);
  const [notes, setNotes] = useState(estimateSummary ? `Projected: ${estimateSummary}` : "");
  const [referenceId, setReferenceId] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReferenceId(`LXW-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#140522]/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#faf8f5] text-[#191024] border border-[#e4ded5] shadow-2xl rounded-sm max-h-[92vh] overflow-y-auto">
        
        {/* Modal Top Bar */}
        <div className="sticky top-0 bg-[#faf8f5] border-b border-[#ece6dc] px-6 sm:px-8 py-5 flex items-center justify-between z-10">
          <div>
            <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#6825a3] block">
              COMMERCIAL INQUIRY
            </span>
            <h3 className="font-serif text-2xl font-semibold text-[#1e0a33] mt-0.5">
              Plan Your Laundry Care
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-[#554a61] hover:text-[#1e0a33] hover:bg-purple-100/60 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 sm:p-12 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-purple-100 text-[#6825a3] flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-serif text-3xl font-semibold text-[#1e0a33]">
              Consultation Request Received
            </h4>
            <p className="text-sm text-[#554a61] max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{contactName || "partner"}</strong>. A dedicated Commercial Accounts Director for <strong>{businessName || "your property"}</strong> will review your specifications and contact you within 2 business hours with route availability and sample test wash scheduling.
            </p>
            <div className="p-4 bg-purple-50 border border-purple-200/60 rounded text-xs text-[#381156] max-w-md mx-auto text-left space-y-1">
              <div><strong>Reference ID:</strong> {referenceId}</div>
              <div><strong>Selected Industry:</strong> {industry}</div>
              {estimateSummary && <div><strong>Calculated Volume:</strong> {estimateSummary}</div>}
            </div>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="bg-[#240a3e] hover:bg-[#3b1261] text-white px-8 py-3 rounded text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Close &amp; Return to Overview
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Industry Selection */}
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-[#381156] mb-2.5">
                Target Industry / Property Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  "Hotels & Resorts",
                  "Restaurants & Catering",
                  "Salons & Spas",
                  "Healthcare & Institutions",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setIndustry(item)}
                    className={`py-2 px-2 text-xs font-medium rounded border text-center transition-all ${
                      industry === item
                        ? "bg-[#240a3e] text-white border-[#240a3e]"
                        : "bg-white text-[#554a61] border-[#ded7cc] hover:border-purple-300"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Business & Contact Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#381156] mb-1.5">
                  Establishment / Company Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Grand Carlton Hotel"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full text-sm bg-white border border-[#ded7cc] focus:border-[#6825a3] focus:ring-1 focus:ring-[#6825a3] px-3.5 py-2.5 rounded outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#381156] mb-1.5">
                  Contact Person &amp; Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Julian Cole, Operations Mgr"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full text-sm bg-white border border-[#ded7cc] focus:border-[#6825a3] focus:ring-1 focus:ring-[#6825a3] px-3.5 py-2.5 rounded outline-none"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#381156] mb-1.5">
                  Business Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="operations@grandcarlton.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm bg-white border border-[#ded7cc] focus:border-[#6825a3] focus:ring-1 focus:ring-[#6825a3] px-3.5 py-2.5 rounded outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#381156] mb-1.5">
                  Direct Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-sm bg-white border border-[#ded7cc] focus:border-[#6825a3] focus:ring-1 focus:ring-[#6825a3] px-3.5 py-2.5 rounded outline-none"
                />
              </div>
            </div>

            {/* Weekly Volume */}
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-[#381156] mb-2">
                Estimated Weekly Textile Weight
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {["Under 500 lbs", "500 - 2,000 lbs", "2,000 - 8,000 lbs", "8,000+ lbs (Industrial)"].map(
                  (vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => setWeeklyVolume(vol)}
                      className={`py-2 px-2 rounded border text-center font-medium transition-all ${
                        weeklyVolume === vol
                          ? "bg-[#3c1263] text-white border-[#3c1263]"
                          : "bg-white text-[#554a61] border-[#ded7cc]"
                      }`}
                    >
                      {vol}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Textiles Included */}
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-[#381156] mb-2">
                Textile Types Required
              </label>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  "Bed Linen & Duvets",
                  "Bath Towels & Robes",
                  "Tablecloths & Napkins",
                  "Chef Aprons & Kitchen Rags",
                  "Medical Scrubs & Patient Gowns",
                  "Spa Sheets & Treatment Blankets",
                ].map((srv) => {
                  const isChecked = selectedServices.includes(srv);
                  return (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => toggleService(srv)}
                      className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                        isChecked
                          ? "bg-purple-900 text-white border-purple-900"
                          : "bg-white text-[#554a61] border-[#d8d0c4] hover:border-purple-300"
                      }`}
                    >
                      {isChecked ? "✓ " : "+ "}
                      {srv}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-[#381156] mb-1.5">
                Special Logistics, Turnaround, or Delivery Preferences
              </label>
              <textarea
                rows={3}
                placeholder="Mention specific pickup times, RFID tracking requirements, or current pain points..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-sm bg-white border border-[#ded7cc] focus:border-[#6825a3] focus:ring-1 focus:ring-[#6825a3] px-3.5 py-2.5 rounded outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#240a3e] hover:bg-[#3b1261] text-white py-3.5 rounded text-xs font-semibold uppercase tracking-wider shadow-lg transition-all"
              >
                <span>Submit Care Plan Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-[#766b80] text-center mt-2.5">
                Includes complimentary 1-week pilot wash (up to 300 lbs) for qualified businesses.
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
