"use client";

import React, { useState } from "react";
import { X, Search, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceName: string) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSelectService,
}: SearchModalProps) {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const quickItems = [
    { name: "Artisanal Wash & Fold", category: "Service", link: "#services" },
    { name: "Executive Couture Dry Cleaning", category: "Service", link: "#services" },
    { name: "Italian Hand Steam Pressing", category: "Service", link: "#services" },
    { name: "Luxury Duvet & Bedding Sanitization", category: "Service", link: "#services" },
    { name: "Wedding Gown Preservation", category: "Service", link: "#services" },
    { name: "Leather, Suede & Shoe Spa", category: "Service", link: "#services" },
    { name: "24-Hour Express Turnaround", category: "FAQ", link: "#faq" },
    { name: "100% Eco-Friendly Non-Toxic Solvents", category: "Pillars", link: "#who-we-are" },
    { name: "Doorstep Valet Pickup Windows", category: "How It Works", link: "#how-it-works" },
  ];

  const results = quickItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-purple-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-purple-700 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a service, fabric, or question..."
            className="w-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-80 overflow-y-auto space-y-2">
          {results.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-500">
              No results found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            results.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                onClick={() => {
                  onClose();
                  if (item.category === "Service") {
                    onSelectService(item.name);
                  }
                }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-purple-50 text-xs font-semibold text-slate-800 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <span className="group-hover:text-purple-900">{item.name}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:text-purple-900 group-hover:translate-x-0.5 transition-transform" />
              </a>
            ))
          )}
        </div>

        <div className="p-3 bg-purple-50 text-center text-[11px] text-purple-700">
          Press ESC or click outside to dismiss
        </div>

      </div>
    </div>
  );
}
