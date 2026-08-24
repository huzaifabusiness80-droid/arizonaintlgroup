"use client";

import React, { useEffect } from "react";
import {
  X,
  Compass,
  Plane,
  Building2,
  MapPin,
  Sparkles,
  PhoneCall,
  ArrowUpRight,
  ShieldCheck,
  Globe2,
} from "lucide-react";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: "Destinations", href: "#destinations", icon: MapPin, badge: "Trending" },
  { label: "Exclusive Flights", href: "#flights", icon: Plane, badge: "New" },
  { label: "Luxury Hotels & Resorts", href: "#hotels", icon: Building2 },
  { label: "Curated Experiences", href: "#experiences", icon: Compass },
  { label: "VIP Travel Packages", href: "#packages", icon: Sparkles, badge: "Popular" },
  { label: "Arizona Concierge", href: "#concierge", icon: ShieldCheck },
  { label: "About Arizona", href: "#about", icon: Globe2 },
];

export default function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  // Prevent body scrolling when open
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-neutral-900 text-white h-full shadow-2xl z-10 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto transform transition-transform animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
            <span className="text-xl font-bold tracking-tight text-white">
              Arizona
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 space-y-1.5">
            <p className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase mb-3 px-3">
              Explore & Book
            </p>
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-center justify-between px-3.5 py-3 rounded-2xl hover:bg-neutral-800/60 transition-all duration-200"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2 rounded-xl bg-neutral-800 text-neutral-300 group-hover:bg-white group-hover:text-neutral-900 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-neutral-200 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                        {item.badge}
                      </span>
                    )}
                    <ArrowUpRight className="w-4 h-4 text-neutral-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Highlight Promo Card inside Drawer */}
          <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-800/50 border border-neutral-700/60 relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Summer 2026 Special
              </span>
              <h4 className="text-base font-semibold text-white mt-1">
                Save 25% on Polynesian Island Escapes
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Curated 7-day all-inclusive luxury villas in Bora Bora and Tahiti.
              </p>
              <button
                onClick={onClose}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white hover:text-neutral-900 px-3 py-1.5 rounded-full transition-all"
              >
                Claim Offer <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-6 mt-8 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>24/7 Global Travel Concierge</span>
          </div>
          <span className="text-neutral-500">© Arizona 2026</span>
        </div>
      </div>
    </div>
  );
}
