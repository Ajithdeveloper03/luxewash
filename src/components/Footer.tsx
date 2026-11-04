"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "./SocialIcons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="contact" className="bg-[#0f0318] text-purple-200 pt-16 pb-8 border-t border-purple-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-purple-900/60">
          
          {/* Brand Column (Col span 4) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Logo on white pill card so Reference 2 logo renders flawlessly */}
            <div className="inline-block bg-white px-4 py-2 rounded-2xl shadow-lg border border-purple-200">
              <div className="relative h-12 w-48">
                <Image
                  src="/images/luxewash-logo.jpg"
                  alt="LUXE WASH Premium Laundry Care"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-purple-300/80 leading-relaxed max-w-sm">
              LUXE WASH is the gold standard in premium garment care. From everyday organic wash & fold to heirloom gown restoration, our certified specialists ensure your clothes look flawless, feel soft, and last longer.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-amber-300 hover:bg-amber-400 hover:text-purple-950 transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-amber-300 hover:bg-amber-400 hover:text-purple-950 transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-amber-300 hover:bg-amber-400 hover:text-purple-950 transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-amber-300 hover:bg-amber-400 hover:text-purple-950 transition-all"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column (Col span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-amber-400">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-purple-300">
              <li>
                <Link href="#hero" className="hover:text-amber-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#who-we-are" className="hover:text-amber-300 transition-colors">
                  Who We Are
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-amber-300 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-amber-300 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="hover:text-amber-300 transition-colors">
                  Client Reviews
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-amber-300 transition-colors">
                  FAQ & Policies
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column (Col span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-amber-400">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs text-purple-300">
              <li>
                <Link href="#services" className="hover:text-amber-300 transition-colors">
                  Artisanal Wash & Fold
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-amber-300 transition-colors">
                  Executive Dry Cleaning
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-amber-300 transition-colors">
                  Italian Steam Pressing
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-amber-300 transition-colors">
                  Curtains & Bedding Sanitization
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-amber-300 transition-colors">
                  Wedding Gown Preservation
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-amber-300 transition-colors">
                  Leather, Suede & Shoe Spa
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter Column (Col span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-amber-400">
              Contact Concierge
            </h4>

            <div className="space-y-3 text-xs text-purple-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>450 Prestige Boulevard, Luxury Suite 100, City Center</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="tel:+18005893927" className="hover:text-amber-300 font-bold">
                  +1 (800) 589-3927 (24/7 Hotline)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>concierge@luxewash.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Mon – Sat: 7:30 AM – 9:00 PM</span>
              </div>
            </div>

            {/* Newsletter input */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-white mb-2">
                Subscribe for Laundry Tips & Promo Codes:
              </div>
              {subscribed ? (
                <div className="text-xs text-amber-300 flex items-center gap-1.5 p-2 rounded-xl bg-purple-900/60 border border-purple-700">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Subscribed! Check your inbox for $10 voucher.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-1.5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address..."
                    className="w-full px-3 py-2 rounded-xl bg-[#1b062b] border border-purple-800 text-xs text-white placeholder-purple-400 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-purple-950 hover:from-amber-300 hover:to-amber-500 font-bold transition-colors flex-shrink-0"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-purple-400">
          <div>
            © 2026 <strong>LUXE WASH</strong>. All Rights Reserved. Master Fabric & Couture Care.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-amber-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-amber-300">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-amber-300">Re-Wash Guarantee</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
