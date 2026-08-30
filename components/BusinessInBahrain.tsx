"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Briefcase,
  FileCheck2,
  ArrowUpRight,
  Landmark,
  Check,
  PhoneCall,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";

const corporateSolutions = [
  {
    titleEn: "100% Foreign Ownership CR",
    titleAr: "سجل تجاري بملكية أجنبية 100%",
    descEn: "Establish WLL, SPC, or branch with full foreign ownership and zero local sponsor requirement.",
    descAr: "تأسيس شركة ذات مسؤولية محدودة أو فرع أجنبي بملكية 100% دون الحاجة لكفيل محلي.",
    icon: Building2,
    badgeEn: "MOIC Certified",
    badgeAr: "معتمد من التجارة",
    href: "/services/business-bahrain/foreign-ownership-cr",
  },
  {
    titleEn: "Turnkey Office with EWA",
    titleAr: "مكتب تجاري مرخص مع عداد EWA",
    descEn: "Inspection-compliant physical & virtual commercial office spaces with approved EWA utility connections.",
    descAr: "مكاتب تجارية مطابقة لاشتراطات التفتيش الحكومي مع عدادات الكهرباء والماء المعتمدة.",
    icon: Landmark,
    badgeEn: "Instant EWA",
    badgeAr: "مكتب جاهز",
    href: "/services/business-bahrain/turnkey-office-ewa",
  },
  {
    titleEn: "LMRA & Investor Visas",
    titleAr: "تأشيرات وإقامة المستثمر LMRA",
    descEn: "Investor residence permits, workforce ceiling allocations, and employee visa approvals on Sijilat.",
    descAr: "إقامات المستثمر وسقف تأشيرات العمل وتصاريح العمالة لدى هيئة تنظيم سوق العمل.",
    icon: ShieldCheck,
    badgeEn: "Fast-Track LMRA",
    badgeAr: "إقامة مستثمر",
    href: "/services/business-bahrain/lmra-work-permits",
  },
  {
    titleEn: "Workload & Inspection Offenses",
    titleAr: "إزالة مخالفات العمل والتفتيش",
    descEn: "Official resolution of Workload offenses, inspection citations, and CR activation with authorities.",
    descAr: "حل وإزالة مخالفات التفتيش وعبء العمل وتنشيط السجلات التجارية الرسمية.",
    icon: FileCheck2,
    badgeEn: "Gov Clearance",
    badgeAr: "إزالة المخالفات",
    href: "/services/business-bahrain/workload-offense",
  },
];

export default function BusinessInBahrain() {
  const { isArabic, t } = useLanguage();
  const { contact } = useGeoLocation();

  return (
    <section id="bahrain-cr" className="w-full bg-slate-50/60 dark:bg-[#080d1a] py-14 sm:py-18 border-b border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Uniform Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 text-[#2563eb] dark:text-[#60a5fa] text-xs font-medium uppercase tracking-wider mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
              <span>{t("business.badge")}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
              {t("business.title1")} <br />
              <span className="text-[#2563eb] dark:text-[#60a5fa]">{t("business.title2")}</span>
            </h2>
          </div>

          <Link
            href="/services/business-bahrain"
            className="inline-flex items-center gap-1 text-xs font-medium text-[#2563eb] dark:text-[#60a5fa] hover:text-[#1d4ed8] dark:hover:text-blue-400 transition-colors self-start md:self-end"
          >
            <span>{isArabic ? "جميع خدمات الشركات" : "Explore Corporate Solutions"}</span>
            <ArrowUpRight className={`w-3.5 h-3.5 ${isArabic ? "rotate-[-90deg]" : ""}`} />
          </Link>
        </div>

        {/* Executive 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Authority & Direct Consultation Card */}
          <div className="lg:col-span-5 bg-[#0d1527] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-slate-800 dark:border-slate-700/80 shadow-sm relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[#60a5fa] text-[11px] font-medium tracking-wide">
                <span>{isArabic ? "خبرة تفوق 20 عاماً في البحرين" : "20+ Years Kingdom of Bahrain Authority"}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                {isArabic
                  ? "تأسيس قانوني معتمد وسريع للمستثمرين الدوليين"
                  : "Certified Fast-Track Setup for Global Investors"}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                {t("business.desc")}
              </p>

              {/* Key Bullet Highlights */}
              <div className="space-y-2.5 pt-2">
                {[
                  isArabic ? "ملكية أجنبية 100% بدون كفيل محلي" : "100% Foreign Ownership without local partner",
                  isArabic ? "إصدار السجل التجاري خلال 48 إلى 72 ساعة" : "CR Issuance within 48 to 72 hours",
                  isArabic ? "عناوين ومكاتب موثقة مع عداد EWA" : "Verified office lease with EWA connection",
                  isArabic ? "فتح الحسابات البنكية وإقامات المستثمر" : "Corporate bank account & investor residence",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-blue-500/20 text-[#60a5fa] flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Consultation Link */}
            <div className="relative z-10 pt-6 mt-6 border-t border-slate-800 flex items-center justify-between gap-3">
              <a
                href={contact.whatsappLink("Hello Arizona, I want to consult regarding Company Setup & CR in Bahrain.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{t("business.btn_consult")}</span>
              </a>
            </div>
          </div>

          {/* Right Column: 4 Clean Corporate Solution Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {corporateSolutions.map((sol, idx) => {
              const SolIcon = sol.icon;
              const title = isArabic ? sol.titleAr : sol.titleEn;
              const desc = isArabic ? sol.descAr : sol.descEn;
              const badge = isArabic ? sol.badgeAr : sol.badgeEn;

              return (
                <Link
                  key={idx}
                  href={sol.href}
                  className="p-5 rounded-2xl bg-white dark:bg-[#0d1527] border border-slate-200 dark:border-slate-800/80 hover:border-blue-300 dark:hover:border-blue-500/60 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#2563eb] dark:text-[#60a5fa] group-hover:bg-[#2563eb] group-hover:text-white flex items-center justify-center transition-colors">
                        <SolIcon className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        {badge}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] transition-colors leading-snug">
                      {title}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-1.5 leading-relaxed line-clamp-3">
                      {desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-[#2563eb] dark:text-[#60a5fa]">
                    <span>{isArabic ? "تفاصيل الخدمة" : "Learn More"}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${isArabic ? "rotate-[-90deg]" : ""}`} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
