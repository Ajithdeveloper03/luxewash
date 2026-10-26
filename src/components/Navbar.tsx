"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ArrowUpRight, ChevronDown, MessageCircle, Sparkles } from "lucide-react";
import { getAssetPath } from "@/lib/constants";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // All buttons and links disabled per user request: "no buttons,links to be worked throughout the page"
  const handleDisabledClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const serviceSubItems = [
    "Hotel & Hospitality Laundry",
    "Hospital & Healthcare Laundry",
    "Restaurant & Catering Laundry",
    "Uniform & Industrial Laundry",
    "Bulk Linen Processing",
  ];

  return (
    <>
      <header className="absolute top-0 inset-x-0 z-40 transition-all duration-300 bg-gradient-to-b from-white/90 via-white/70 to-transparent w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-24">
            {/* LEFT NAVIGATION LINKS (Desktop only >= 1024px) */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9 flex-1 justify-start">
              <a
                href="#home"
                onClick={handleDisabledClick}
                className="text-[15px] xl:text-[17px] font-bold text-[#2E0854] hover:text-[#6B1D9E] transition-colors relative group py-1.5 select-none tracking-wide"
              >
                Home
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#6B1D9E] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
              </a>

              <a
                href="#about"
                onClick={handleDisabledClick}
                className="text-[15px] xl:text-[17px] font-bold text-[#2E0854] hover:text-[#6B1D9E] transition-colors relative group py-1.5 select-none tracking-wide"
              >
                About Us
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#6B1D9E] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
              </a>

              {/* SERVICES WITH HOVER DROPDOWN */}
              <div
                className="relative group py-1.5"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <a
                  href="#services"
                  onClick={handleDisabledClick}
                  className="text-[15px] xl:text-[17px] font-bold text-[#2E0854] hover:text-[#6B1D9E] transition-colors flex items-center gap-1 select-none tracking-wide"
                >
                  <span>Services</span>
                  <ChevronDown className="w-4 h-4 text-[#2E0854] transition-transform group-hover:rotate-180" />
                </a>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-100/80 p-2.5 space-y-1 transition-all duration-200 z-50 ${servicesDropdownOpen
                    ? "opacity-100 visible translate-y-1"
                    : "opacity-0 invisible -translate-y-2"
                    }`}
                >
                  {serviceSubItems.map((subItem) => (
                    <a
                      key={subItem}
                      href="#services"
                      onClick={handleDisabledClick}
                      className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#18042b] hover:bg-purple-50 hover:text-[#2E0854] transition-colors select-none"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              </div>
            </nav>

            {/* LOGO: Centered on Desktop, Left-aligned on Mobile */}
            <div className="flex items-center justify-start lg:justify-center shrink-0">
              <a
                href="#home"
                onClick={handleDisabledClick}
                className="block cursor-pointer transition-transform duration-300 hover:scale-105 select-none"
              >
                <div className="relative h-9 w-28 sm:h-12 sm:w-36 md:h-14 md:w-44 lg:h-16 lg:w-56">
                  <Image
                    src={getAssetPath("/images/logo-2.png")}
                    alt="LUXEWASH"
                    fill
                    sizes="(max-width: 640px) 120px, (max-width: 1024px) 160px, 220px"
                    className="object-contain object-left lg:object-center mix-blend-multiply"
                    priority
                  />
                </div>
              </a>
            </div>

            {/* RIGHT NAVIGATION LINKS + PILL BUTTON (Desktop only >= 1024px) */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9 flex-1 justify-end">
              <a
                href="#industries"
                onClick={handleDisabledClick}
                className="text-[15px] xl:text-[17px] font-bold text-[#2E0854] hover:text-[#6B1D9E] transition-colors relative group py-1.5 select-none tracking-wide whitespace-nowrap"
              >
                Industries We Serve
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#6B1D9E] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
              </a>

              <a
                href="#process"
                onClick={handleDisabledClick}
                className="text-[15px] xl:text-[17px] font-bold text-[#2E0854] hover:text-[#6B1D9E] transition-colors relative group py-1.5 select-none tracking-wide whitespace-nowrap"
              >
                Our Process
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#6B1D9E] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
              </a>

              <a
                href="#contact"
                onClick={handleDisabledClick}
                className="text-[15px] xl:text-[17px] font-bold text-[#2E0854] hover:text-[#6B1D9E] transition-colors relative group py-1.5 select-none tracking-wide whitespace-nowrap"
              >
                Contact Us
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#6B1D9E] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
              </a>
            </nav>

            {/* MOBILE CONTROLS (Right-aligned, never wraps or collides) */}
            <div className="flex items-center gap-2 sm:gap-3 lg:hidden shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-quote-modal"));
                  }
                }}
                className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full text-sm font-bold text-[#f3cf65] bg-gradient-to-r from-[#1E0935] to-[#2E0854] border border-[#D4AF37]/50 hover:bg-[#4B1278] transition-all shadow-sm items-center gap-1.5 cursor-pointer select-none font-body"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Request Quote</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="w-10 h-10 rounded-xl bg-purple-100/90 hover:bg-purple-200 text-[#2E0854] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN LUXURY MOBILE DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop blur overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Body with independent smooth scroll */}
          <div className="relative w-full max-w-sm sm:max-w-md h-full bg-[#140324] text-white shadow-2xl flex flex-col justify-between overflow-y-auto p-5 sm:p-7 z-10 animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
              <div className="relative h-9 w-28 bg-white rounded-lg p-1">
                <Image
                  src={getAssetPath("/images/logo-2.png")}
                  alt="LUXEWASH"
                  fill
                  sizes="120px"
                  className="object-contain p-0.5"
                  priority
                />
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <nav className="flex flex-col py-3 my-auto space-y-0.5">
              <a
                href="#home"
                onClick={(e) => {
                  handleDisabledClick(e);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-2.5 border-b border-white/5 group select-none transition-colors"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-display text-[#d4af37] font-semibold">01</span>
                  <span className="text-lg font-bold font-display text-white group-hover:text-[#d4af37] transition-colors">
                    Home
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#d4af37] transition-colors" />
              </a>

              <a
                href="#about"
                onClick={(e) => {
                  handleDisabledClick(e);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-2.5 border-b border-white/5 group select-none transition-colors"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-display text-[#d4af37] font-semibold">02</span>
                  <span className="text-lg font-bold font-display text-white group-hover:text-[#d4af37] transition-colors">
                    About Us
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#d4af37] transition-colors" />
              </a>

              {/* Mobile Services Accordion */}
              <div className="border-b border-white/5 py-2.5">
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between group select-none cursor-pointer"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-display text-[#d4af37] font-semibold">03</span>
                    <span className="text-lg font-bold font-display text-white group-hover:text-[#d4af37] transition-colors">
                      Services
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-white/50 transition-transform ${mobileServicesOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {mobileServicesOpen && (
                  <div className="pl-7 pt-2 space-y-1.5">
                    {serviceSubItems.map((subItem) => (
                      <a
                        key={subItem}
                        href="#services"
                        onClick={(e) => {
                          handleDisabledClick(e);
                          setMobileMenuOpen(false);
                        }}
                        className="block text-sm text-purple-200/80 py-1 hover:text-[#d4af37] transition-colors"
                      >
                        • {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="#industries"
                onClick={(e) => {
                  handleDisabledClick(e);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-2.5 border-b border-white/5 group select-none transition-colors"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-display text-[#d4af37] font-semibold">04</span>
                  <span className="text-lg font-bold font-display text-white group-hover:text-[#d4af37] transition-colors">
                    Industries We Serve
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#d4af37] transition-colors" />
              </a>

              <a
                href="#process"
                onClick={(e) => {
                  handleDisabledClick(e);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-2.5 border-b border-white/5 group select-none transition-colors"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-display text-[#d4af37] font-semibold">05</span>
                  <span className="text-lg font-bold font-display text-white group-hover:text-[#d4af37] transition-colors">
                    Our Process
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#d4af37] transition-colors" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  handleDisabledClick(e);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-2.5 border-b border-white/5 group select-none transition-colors"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-display text-[#d4af37] font-semibold">06</span>
                  <span className="text-lg font-bold font-display text-white group-hover:text-[#d4af37] transition-colors">
                    Contact Us
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#d4af37] transition-colors" />
              </a>
            </nav>

            {/* Drawer Bottom Concierge Card */}
            <div className="pt-3 border-t border-white/10 space-y-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-quote-modal"));
                  }
                }}
                className="w-full py-3 rounded-full text-center text-sm font-bold text-[#f3cf65] bg-gradient-to-r from-[#1E0935] via-[#2E0854] to-[#4B1278] border border-[#D4AF37]/60 flex items-center justify-center gap-2 shadow-lg select-none hover:brightness-110 active:scale-95 transition-all cursor-pointer font-body"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Request a Commercial Quote</span>
              </button>

              <div className="text-center text-sm text-purple-200/60 font-body">
                Reliable Commercial Laundry • Scheduled Pickup &amp; Delivery
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}