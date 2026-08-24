"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { allVisasData } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { arabicVisaNames } from "@/lib/localizedData";

export default function VisaDestinations() {
  const { isArabic, t } = useLanguage();
  // Show exactly 6 curated popular destinations on homepage
  const homeVisas = allVisasData.slice(0, 6);

  return (
    <section id="visas" className="w-full bg-white py-16 sm:py-24 border-b border-neutral-100">
      <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-10 mb-12 sm:mb-16">
          <div>
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/90 text-neutral-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#dfb141] ring-2 ring-[#dfb141]/30" />
              <span>{t("visas.badge")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.03em] text-neutral-950 leading-[1.18]">
              {t("visas.title1")} <br />
              <span className="font-bold text-neutral-950">{t("visas.title2")}</span>
            </h2>
          </div>

          {/* Right Subtext & View All Hub Link */}
          <div className="flex flex-col items-start md:items-end gap-3 max-w-md lg:max-w-lg">
            <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed md:text-right">
              {t("visas.desc")}
            </p>
            <Link
              href="/visas"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-950 hover:text-[#c49725] transition-colors"
            >
              <span>{t("visas.view_all")} ({allVisasData.length})</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${isArabic ? "rotate-[-90deg]" : ""}`} />
            </Link>
          </div>
        </div>

        {/* 6 Minimalist Visual Country Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {homeVisas.map((item) => {
            const arInfo = arabicVisaNames[item.slug];
            const countryName = isArabic && arInfo ? arInfo.country : item.country;
            const visaType = isArabic && arInfo ? arInfo.type : item.type;
            const processingTime = isArabic && arInfo ? arInfo.time : item.time;

            return (
              <Link
                key={item.slug}
                href={`/visas/${item.slug}`}
                className="group block transition-all duration-300 hover:-translate-y-1"
              >
                {/* Landmark Image Container */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-100 shadow-xs">
                  <img
                    src={item.cardImage}
                    alt={countryName}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Subtle dark bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                  {/* Flag Icon at Top-Left */}
                  <div className={`absolute top-3.5 ${isArabic ? "right-3.5" : "left-3.5"} w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-lg shadow-sm`}>
                    <span>{item.flag}</span>
                  </div>

                  {/* Top Right Arrow Icon */}
                  <div className={`absolute top-3.5 ${isArabic ? "left-3.5" : "right-3.5"} w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-neutral-900 flex items-center justify-center group-hover:bg-neutral-950 group-hover:text-white transition-all shadow-sm`}>
                    <ArrowUpRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isArabic ? "rotate-[-90deg]" : ""}`} />
                  </div>

                  {/* Processing Time Badge at Bottom */}
                  <div className={`absolute bottom-3 ${isArabic ? "left-3" : "right-3"} px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10.5px] font-medium flex items-center gap-1.5`}>
                    <Clock className="w-3 h-3 text-[#dfb141]" />
                    <span>{processingTime}</span>
                  </div>
                </div>

                {/* Card Heading & Arrow Underneath */}
                <div className="pt-3.5 px-1 flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-950 tracking-tight group-hover:text-[#c49725] transition-colors">
                      {countryName}
                    </h3>
                    <p className="text-xs text-neutral-500 font-normal mt-0.5">
                      {visaType}
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-neutral-950 group-hover:text-white text-neutral-700 flex items-center justify-center transition-all shrink-0">
                    <ArrowUpRight className={`w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${isArabic ? "rotate-[-90deg]" : ""}`} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
