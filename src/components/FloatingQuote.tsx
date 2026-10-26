"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  ArrowRight,
  X,
  CheckCircle2,
  Building2,
  Mail,
  Phone,
  User,
  MapPin,
  Scale,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function FloatingQuote() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form fields per user specification:
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    industry: "Hospitality",
    location: "",
    volume: "100 - 300 kg / day",
    frequency: "Daily Service",
    notes: "",
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Hotel & Hospitality Laundry",
  ]);

  const serviceOptions = [
    "Hotel & Hospitality Laundry",
    "Hospital & Healthcare Laundry",
    "Restaurant & Catering Laundry",
    "Uniform & Industrial Laundry",
    "Bulk Linen Processing",
  ];

  const industryOptions = [
    "Hospitality (Hotels, Resorts, Apartments)",
    "Healthcare (Hospitals, Clinics, Centers)",
    "Food Service (Restaurants, Catering)",
    "Corporate & Industrial Workwear",
    "Education & Student Accommodation",
    "Wellness, Fitness & Luxury Spas",
    "Other Commercial Enterprise",
  ];

  const volumeOptions = [
    "Under 100 kg / day",
    "100 - 300 kg / day",
    "300 - 800 kg / day",
    "800+ kg / day (High-Capacity Bulk)",
    "Weekly Recurring Contract",
  ];

  const frequencyOptions = [
    "Daily Service (Morning / Evening)",
    "2-3 Times a Week",
    "Weekly Scheduled Collection",
    "Custom Commercial Schedule",
  ];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Listen for open-quote-modal custom event from buttons across the site
  useEffect(() => {
    const handleOpenModal = () => setIsOpen(true);
    window.addEventListener("open-quote-modal", handleOpenModal);
    return () => window.removeEventListener("open-quote-modal", handleOpenModal);
  }, []);

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== service));
      }
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button on Bottom-Left strictly in Logo Royal Purple & Gold */}
      <aside
        aria-label="Request a quote quick action"
        className="fixed bottom-6 left-4 sm:left-6 z-50"
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 sm:px-5 py-3 sm:py-3.5 bg-gradient-to-r from-[#1E0935] via-[#2E0854] to-[#4B1278] text-white rounded-full shadow-2xl shadow-purple-950/40 border-2 border-[#D4AF37]/80 hover:border-[#D4AF37] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none"
          aria-label="Open Quote Request Form"
        >
          {/* Pulsing halo in gold */}
          <span className="absolute -inset-1 rounded-full bg-amber-400 opacity-20 group-hover:opacity-40 blur-sm transition-opacity pointer-events-none" />

          {/* Quote Icon in Gold */}
          <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center shrink-0 relative z-10">
            <FileText className="w-3.5 h-3.5 text-[#f3cf65]" />
          </div>

          {/* Text */}
          <span className="font-bold text-sm tracking-wide text-white relative z-10 font-body">
            Request a Quote
          </span>

          {/* Arrow */}
          <ArrowRight className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-1 transition-transform relative z-10 hidden sm:inline-block" />
        </button>
      </aside>

      {/* POPUP MODAL FORM */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-purple-200/80 overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header strictly in Logo Royal Purple & Gold */}
            <div className="bg-gradient-to-r from-[#1B042F] via-[#2E0854] to-[#4B1278] text-white p-5 sm:p-7 relative shrink-0 border-b border-[#D4AF37]/30">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close quote modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#f3cf65] mb-2 font-body">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Request a Commercial Quote</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
                Get Your Customized Laundry Proposal
              </h3>
              <p className="text-sm text-purple-200/90 mt-1 max-w-lg font-body">
                Tailored service arrangements, volume pricing, and dependable delivery schedules for your organization.
              </p>
            </div>

            {/* Modal Content / Form */}
            <div className="p-5 sm:p-7 overflow-y-auto flex-1 text-slate-800">
              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-purple-50 border border-purple-200 text-[#2E0854] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-[#2E0854]" />
                  </div>
                  <h4 className="text-2xl font-bold font-display text-[#1E0935]">
                    Quote Request Received!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-body">
                    Thank you, <strong className="text-[#1E0935]">{formData.contactPerson || "valued partner"}</strong>. Our commercial operations team for <strong className="text-[#1E0935]">{formData.companyName || "your company"}</strong> will review your requirements and send a customized proposal to <strong className="text-[#1E0935]">{formData.email || formData.phone}</strong> promptly.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-8 py-2.5 rounded-full bg-[#2E0854] text-[#f3cf65] font-bold text-sm hover:bg-[#4B1278] border border-[#D4AF37]/50 transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Row 1: Company Name & Contact Person */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-1 font-body">
                        Company or Organization Name *
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-purple-900/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={formData.companyName}
                          onChange={(e) =>
                            setFormData({ ...formData, companyName: e.target.value })
                          }
                          placeholder="e.g. Grand Heritage Hotel"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E0854] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-1 font-body">
                        Contact Person&apos;s Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-purple-900/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={formData.contactPerson}
                          onChange={(e) =>
                            setFormData({ ...formData, contactPerson: e.target.value })
                          }
                          placeholder="e.g. Rajesh Kumar"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E0854] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Business Email & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-1 font-body">
                        Business Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-purple-900/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="operations@grandheritage.com"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E0854] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-1 font-body">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-purple-900/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+91 98765 43210"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E0854] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Industry & City/Service Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-1 font-body">
                        Industry or Business Type *
                      </label>
                      <select
                        value={formData.industry}
                        onChange={(e) =>
                          setFormData({ ...formData, industry: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E0854] focus:border-transparent transition-all bg-white font-body"
                      >
                        {industryOptions.map((ind) => (
                          <option key={ind} value={ind}>
                            {ind}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-1 font-body">
                        City &amp; Service Location *
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-purple-900/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                          }
                          placeholder="e.g. Trichy, Tamil Nadu"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E0854] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Estimated Volume & Preferred Collection Frequency */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-1 font-body">
                        Estimated Laundry Volume (Day/Week) *
                      </label>
                      <div className="relative">
                        <Scale className="w-4 h-4 text-purple-900/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          value={formData.volume}
                          onChange={(e) =>
                            setFormData({ ...formData, volume: e.target.value })
                          }
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E0854] focus:border-transparent transition-all bg-white font-body"
                        >
                          {volumeOptions.map((vol) => (
                            <option key={vol} value={vol}>
                              {vol}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-1 font-body">
                        Preferred Collection Frequency *
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-purple-900/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          value={formData.frequency}
                          onChange={(e) =>
                            setFormData({ ...formData, frequency: e.target.value })
                          }
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E0854] focus:border-transparent transition-all bg-white font-body"
                        >
                          {frequencyOptions.map((freq) => (
                            <option key={freq} value={freq}>
                              {freq}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Row 5: Type of Laundry Required (Pills/Checkboxes) */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-body">
                      Type of Laundry Required *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {serviceOptions.map((serv) => {
                        const isSelected = selectedServices.includes(serv);
                        return (
                          <button
                            type="button"
                            key={serv}
                            onClick={() => toggleService(serv)}
                            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all border cursor-pointer select-none font-body ${
                              isSelected
                                ? "bg-[#2E0854] text-white border-[#2E0854] shadow-xs"
                                : "bg-purple-50/50 text-slate-700 border-purple-200/60 hover:bg-purple-50"
                            }`}
                          >
                            <span className={isSelected ? "text-amber-300 mr-1" : "text-purple-600 mr-1"}>
                              {isSelected ? "✓" : "+"}
                            </span>
                            {serv}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 6: Additional Specific Notes (Optional) */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-1 font-body">
                      Additional Details / Special Handling (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      placeholder="e.g. Require 24-hour turnaround for bed linen, sanitized packaging, or specific pickup time slots."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E0854] focus:border-transparent transition-all resize-none font-body"
                    />
                  </div>

                  {/* Submit Button in Logo Royal Purple & Gold */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full text-center text-sm font-bold text-white bg-gradient-to-r from-[#1E0935] via-[#2E0854] to-[#4B1278] hover:from-[#2E0854] hover:to-[#5E1695] border border-[#D4AF37]/50 shadow-lg shadow-purple-950/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 font-body"
                    >
                      <span className="text-[#f3cf65]">Submit Commercial Quote Request</span>
                      <ArrowRight className="w-4 h-4 text-amber-300" />
                    </button>
                    <p className="text-center text-sm text-slate-500 mt-2 font-body">
                      Confidential business proposal • Guaranteed commercial volume pricing
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
