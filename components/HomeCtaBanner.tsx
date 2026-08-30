"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";

export default function HomeCtaBanner() {
  const { isArabic } = useLanguage();
  const { contact } = useGeoLocation();

  return (
    <section className="w-full bg-white py-6 sm:py-10">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[360px] lg:min-h-[400px] flex items-center p-8 sm:p-12 lg:p-16 text-white shadow-md bg-slate-900 group">
          {/* Background Scenic Landscape Image */}
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=85&auto=format&fit=crop"
            alt="Trip of a lifetime with Arizona International Group"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
          />

          {/* Left Gradient Overlay for crisp text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-10" />

          {/* Left-Aligned Content Box matching reference photo */}
          <div className="relative z-20 max-w-xl space-y-4">
            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-semibold text-white tracking-tight leading-[1.15] drop-shadow-sm">
              {isArabic
                ? "دعنا نصمم لك رحلة العمر المثالية"
                : "Let us design your trip of a lifetime"}
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-slate-100 font-normal leading-relaxed drop-shadow-xs max-w-lg">
              {isArabic
                ? "سياحة مخصصة لمجموعتك، عطلات شهر العسل، أو رحلات خاصة مصممة خصيصاً لك بواسطة خبرائنا المتخصصين."
                : "Boutique travel for your group, honeymoon or private trip designed just for you by our global specialists & visa advisors."}
            </p>

            <div className="pt-2">
              <a
                href={contact.whatsappLink("Hello Arizona International Group, I would like you to design a custom trip & visa package for me.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg border-2 border-white text-white hover:bg-white hover:text-slate-950 font-semibold text-xs sm:text-sm transition-all duration-300 backdrop-blur-xs cursor-pointer"
              >
                <span>{isArabic ? "خطط لرحلتي الآن" : "Plan My Trip"}</span>
                <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
