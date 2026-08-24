"use client";

import React from "react";
import {
  Building2,
  ShieldCheck,
  Briefcase,
  FileCheck2,
  ArrowUpRight,
  Landmark,
  Users,
  CheckCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const businessStepsData = [
  {
    step: "01",
    titleKey: "business.step1_title",
    descKey: "business.step1_desc",
    icon: FileCheck2,
  },
  {
    step: "02",
    titleKey: "business.step2_title",
    descKey: "business.step2_desc",
    icon: Building2,
  },
  {
    step: "03",
    titleKey: "business.step3_title",
    descKey: "business.step3_desc",
    icon: Briefcase,
  },
  {
    step: "04",
    titleKey: "business.step4_title",
    descKey: "business.step4_desc",
    icon: Landmark,
  },
  {
    step: "05",
    titleKey: "business.step5_title",
    descKey: "business.step5_desc",
    icon: Users,
  },
  {
    step: "06",
    titleKey: "business.step6_title",
    descKey: "business.step6_desc",
    icon: ShieldCheck,
  },
];

export default function BusinessInBahrain() {
  const { isArabic, t } = useLanguage();

  return (
    <section id="business-bahrain" className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-[1580px] mx-auto">
      {/* Container Card */}
      <div className="rounded-3xl sm:rounded-[36px] bg-neutral-950 text-white p-8 sm:p-14 lg:p-16 relative overflow-hidden">
        {/* Header Block */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#dfb141] ring-2 ring-[#dfb141]/30" />
            <span>{t("business.badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em] text-white leading-[1.18]">
            {t("business.title1")} <br />
            <span className="text-[#dfb141] font-bold">{t("business.title2")}</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-normal mt-4 leading-relaxed">
            {t("business.desc")}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {businessStepsData.map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-neutral-400 px-2.5 py-1 rounded-full bg-neutral-800" dir="ltr">
                    {isArabic ? `${item.step} الخطوة` : `Step ${item.step}`}
                  </span>
                  <item.icon className="w-5 h-5 text-neutral-300" />
                </div>
                <h3 className="text-lg font-medium text-white tracking-tight">
                  {t(item.titleKey)}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-normal mt-2 leading-relaxed">
                  {t(item.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Banner */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs sm:text-sm text-neutral-300">
              {t("business.disclaimer")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/923135921434"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white text-neutral-950 font-medium text-xs sm:text-sm hover:bg-neutral-100 transition-all flex items-center gap-2"
            >
              <span>{t("business.btn_consult")}</span>
              <ArrowUpRight className={`w-4 h-4 ${isArabic ? "rotate-[-90deg]" : ""}`} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
