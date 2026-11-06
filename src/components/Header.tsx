"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Clock,
  Phone,
  Search,
  Menu,
  X,
  Sparkles,
  Calendar,
} from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "./SocialIcons";

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenSearch?: () => void;
  onOpenCalculator?: () => void;
}

export default function Header({
  onOpenBooking,
  onOpenSearch,
  onOpenCalculator,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "HOME", href: "#hero" },
    { name: "ABOUT US", href: "#who-we-are" },
    { name: "SERVICES", href: "#services" },
    { name: "HOW IT WORKS", href: "#how-it-works" },
    { name: "PRICING", href: "#pricing" },
    { name: "TESTIMONIALS", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <header className="relative z-50 w-full bg-[#0d0216] text-white">
      {/* 1. TOP BAR (Exact Reference 1 Layout) */}
      <div className="border-b border-purple-900/30 text-xs py-2 px-4 sm:px-8 bg-[#09010f]">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          
          {/* Left: email || hours */}
          <div className="flex flex-wrap items-center gap-3 text-purple-200/90 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5 hover:text-amber-300 transition-colors">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>info@luxewash.com</span>
            </div>
            <span className="text-purple-600 font-bold hidden sm:inline">||</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Tuesday - Saturday 8:00 Am - 5:00 Pm</span>
            </div>
          </div>

          {/* Right: Follow Us On : f in insta + Pricing Calculator */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenCalculator}
              className="text-[11px] font-semibold text-amber-300 hover:text-white bg-purple-900/80 px-2.5 py-0.5 rounded-full border border-amber-400/40 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Price Calculator</span>
            </button>

            <span className="text-purple-700 hidden sm:inline">|</span>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-purple-200 font-medium">Follow Us On :</span>
              <a
                href="#"
                className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-800 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-purple-950 flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-2.5 h-2.5 text-white" />
              </a>
              <a
                href="#"
                className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-800 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-purple-950 flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-2.5 h-2.5 text-white" />
              </a>
              <a
                href="#"
                className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-800 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-purple-950 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-2.5 h-2.5 text-white" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 2. MAIN NAVBAR (Matching Reference 1 Geometry: Logo box on left + White nav bar + Helpline right) */}
      <div className="relative border-b border-purple-950">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          
          {/* LEFT: Logo Angled Box */}
          <div
            className="relative bg-white py-2 pl-4 sm:pl-6 pr-10 flex items-center z-20 flex-shrink-0"
            style={{
              clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)",
            }}
          >
            <Link href="/" className="flex items-center">
              <div className="relative h-11 w-36 sm:h-12 sm:w-44">
                <Image
                  src="/images/luxewash-logo.jpg"
                  alt="LUXE WASH"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* CENTER: White Curved Navigation Bar (Visible on all desktop screens >=1024px) */}
          <div className="hidden lg:flex items-center bg-white px-5 py-2 -ml-6 z-10 rounded-r-full shadow-md flex-shrink-0">
            <div className="flex items-center space-x-3.5 xl:space-x-5 text-[11px] xl:text-xs font-black tracking-wider text-slate-800 whitespace-nowrap">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-colors py-1 ${
                    idx === 0
                      ? "text-purple-900 font-extrabold border-b-2 border-amber-500"
                      : "hover:text-purple-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="ml-3 xl:ml-5 p-1 text-slate-700 hover:text-purple-900 transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Circular Phone Icon Button (Exact Ref 1) */}
            <a
              href="tel:+18005893927"
              className="ml-2 w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-gradient-to-tr from-purple-900 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-md flex-shrink-0"
              aria-label="Call helpline"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* RIGHT: Call Helpline & Book Button */}
          <div className="flex items-center gap-3 pr-4 sm:pr-8 flex-shrink-0">
            <div className="hidden sm:block text-left whitespace-nowrap">
              <div className="text-[9px] xl:text-[10px] text-purple-300 font-bold uppercase tracking-wider">
                Call Helpline
              </div>
              <a
                href="tel:+18005893927"
                className="text-white hover:text-amber-300 font-black text-xs xl:text-sm tracking-tight transition-colors"
              >
                +1 (800) 589-3927
              </a>
            </div>

            <button
              onClick={onOpenBooking}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-amber-500 text-purple-950 font-black text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Pickup</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-full bg-purple-900/60 text-white flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#180526] border-t border-purple-800 p-4 text-white space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 rounded-lg hover:bg-purple-900 text-sm font-bold"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-purple-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-purple-300">Call Helpline:</div>
                <div className="font-bold text-amber-300 text-sm">+1 (800) 589-3927</div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="px-4 py-2 rounded-full bg-amber-400 text-purple-950 text-xs font-black uppercase"
              >
                Book Pickup
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
