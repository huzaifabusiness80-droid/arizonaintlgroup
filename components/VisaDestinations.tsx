"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { allVisasData, VisaDetail } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { arabicVisaNames } from "@/lib/localizedData";

export default function VisaDestinations() {
  const { isArabic, t } = useLanguage();
  const [visas, setVisas] = useState<VisaDetail[]>(allVisasData);

  useEffect(() => {
    fetch("/api/admin/visas")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.items) && d.items.length > 0) {
          const active = d.items
            .filter((item: any) => item.isActive !== false)
            .map((item: any) => ({
              ...item,
              time: item.processingTime || item.time || "3 - 5 Days",
              heroImage: item.heroImage || item.image || "",
              cardImage: item.cardImage || item.image || "",
              tagline: item.tagline || "",
              overview: item.overview || item.description || "",
              requirements: Array.isArray(item.requirements) ? item.requirements : [],
              processSteps: Array.isArray(item.processSteps) ? item.processSteps : [],
              included: Array.isArray(item.included) ? item.included : [],
            }));
          if (active.length > 0) {
            setVisas(active);
          }
        }
      })
      .catch(() => {});
  }, []);

  const homeVisas = visas.slice(0, 8);

  return (
    <section id="visas" className="w-full bg-slate-50/50 dark:bg-[#080d1a] py-14 sm:py-18 border-b border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 text-[#2563eb] dark:text-[#60a5fa] text-xs font-medium uppercase tracking-wider mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
              <span>{t("visas.badge")}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
              {t("visas.title1")} <br />
              <span className="text-[#2563eb] dark:text-[#60a5fa]">{t("visas.title2")}</span>
            </h2>
          </div>

          <Link
            href="/visas"
            className="inline-flex items-center gap-1 text-xs font-medium text-[#2563eb] dark:text-[#60a5fa] hover:text-[#1d4ed8] dark:hover:text-blue-400 transition-colors"
          >
            <span>{t("visas.view_all")} ({allVisasData.length})</span>
            <ArrowUpRight className={`w-3.5 h-3.5 ${isArabic ? "rotate-[-90deg]" : ""}`} />
          </Link>
        </div>

        {/* Content-Inside-Image 4-Column Grid matching reference */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {homeVisas.map((item) => {
            const arInfo = arabicVisaNames[item.slug];
            const countryName = isArabic && arInfo ? arInfo.country : item.country;
            const visaType = isArabic && arInfo ? arInfo.type : item.type;

            return (
              <Link
                key={item.slug}
                href={`/visas/${item.slug}`}
                className="group relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden bg-slate-900 transition-all duration-300 block shadow-sm hover:shadow-xl cursor-pointer"
              >
                {/* Background Photo */}
                <img
                  src={item.cardImage?.trim() || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80&auto=format&fit=crop"}
                  alt={countryName || "Visa"}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />

                {/* Flag Badge Top */}
                <div className={`absolute top-3.5 ${isArabic ? "right-3.5" : "left-3.5"} z-20 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-md text-white text-xs font-medium border border-white/10`}>
                  <span>{item.flag}</span>
                </div>

                {/* Centered Content at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-center z-20 flex flex-col items-center justify-end">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug drop-shadow-sm group-hover:text-blue-200 transition-colors">
                    {countryName}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-200 font-medium mt-1 drop-shadow-xs line-clamp-1">
                    {visaType}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
