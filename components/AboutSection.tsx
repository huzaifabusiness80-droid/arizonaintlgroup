"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  PhoneCall,
  Building2,
  Globe2,
  FileCheck2,
  Landmark,
  Compass,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";

interface StatItem {
  value: string;
  labelKey: string;
  isHighlighted?: boolean;
}

const statsData: StatItem[] = [
  {
    value: "20+ Years",
    labelKey: "about.stat1_lbl",
    isHighlighted: false,
  },
  {
    value: "100%",
    labelKey: "about.stat2_lbl",
    isHighlighted: true,
  },
  {
    value: "15,000+",
    labelKey: "about.stat3_lbl",
    isHighlighted: false,
  },
  {
    value: "24/7",
    labelKey: "about.stat4_lbl",
    isHighlighted: false,
  },
];

export default function AboutSection() {
  const { isArabic, t } = useLanguage();
  const { contact } = useGeoLocation();

  return (
    <section id="about" className="w-full bg-white py-16 sm:py-24 border-b border-neutral-100">
      <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header Row (Left: Heading, Right: Subtext) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-10 mb-12 sm:mb-16">
          <div>
            {/* Top Badge / Category Tab */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/90 text-neutral-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#dfb141] ring-2 ring-[#dfb141]/30" />
              <span>{t("about.badge")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.03em] text-neutral-950 leading-[1.18]">
              {t("about.title1")} <br />
              <span className="font-bold text-[#dfb141]">{t("about.title2")}</span>
            </h2>
          </div>

          <div className="max-w-md lg:max-w-xl">
            <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
              {t("about.desc")}
            </p>
          </div>
        </div>

        {/* 4 Large Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-16">
          {statsData.map((stat, idx) => {
            if (stat.isHighlighted) {
              return (
                <div
                  key={idx}
                  className="rounded-[28px] sm:rounded-[32px] bg-gradient-to-br from-[#f8de8a] via-[#e5bc4b] to-[#d6a935] text-neutral-950 p-8 sm:p-10 flex flex-col justify-center items-center text-center shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 min-h-[210px] border border-[#ecd27d]"
                >
                  <span className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950 font-sans" dir="ltr">
                    {stat.value}
                  </span>
                  <p className="mt-3 text-xs sm:text-sm font-semibold text-neutral-900/95 max-w-[210px] leading-snug">
                    {t(stat.labelKey)}
                  </p>
                </div>
              );
            }

            return (
              <div
                key={idx}
                className="rounded-[28px] sm:rounded-[32px] bg-[#f4f5f8] p-8 sm:p-10 flex flex-col justify-center items-center text-center hover:bg-[#ebedf1] transition-all duration-200 min-h-[210px] border border-neutral-200/60"
              >
                <span className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950 font-sans" dir="ltr">
                  {stat.value}
                </span>
                <p className="mt-3 text-xs sm:text-sm font-normal text-neutral-600 max-w-[210px] leading-snug">
                  {t(stat.labelKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
