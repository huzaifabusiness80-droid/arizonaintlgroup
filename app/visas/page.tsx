"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import CtaSection from "@/components/CtaSection";
import Link from "next/link";
import { allVisasData, VisaDetail } from "@/lib/data";
import { ArrowUpRight, Sliders } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";
import { arabicVisaNames } from "@/lib/localizedData";
import ServiceCustomizerModal from "@/components/ServiceCustomizerModal";

const regionFilters = [
  { id: "all", labelEn: "All Destinations", labelAr: "جميع الوجهات" },
  { id: "gcc", labelEn: "GCC & Middle East", labelAr: "الخليج والشرق الأوسط" },
  { id: "europe", labelEn: "Europe & Schengen", labelAr: "أوروبا والشنغن" },
  { id: "asia", labelEn: "Asia & Far East", labelAr: "آسيا والشرق الأقصى" },
  { id: "americas", labelEn: "Americas & UK", labelAr: "الأمريكتين وبريطانيا" },
  { id: "africa", labelEn: "Africa", labelAr: "إفريقيا" },
];

const DEFAULT_VISA_IMAGE = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80&auto=format&fit=crop";

export default function VisasPage() {
  const { isArabic, t } = useLanguage();
  const { contact } = useGeoLocation();
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [visas, setVisas] = useState<VisaDetail[]>(allVisasData);
  const [customizerOpen, setCustomizerOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/visas")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.items) && d.items.length > 0) {
          const active = d.items
            .filter((item: any) => item.isActive !== false)
            .map((item: any) => {
              const fallbackImg = item.cardImage?.trim() || item.image?.trim() || item.heroImage?.trim() || DEFAULT_VISA_IMAGE;
              return {
                ...item,
                time: item.processingTime || item.time || "3 - 5 Days",
                heroImage: item.heroImage?.trim() || fallbackImg,
                cardImage: fallbackImg,
                tagline: item.tagline || "",
                overview: item.overview || item.description || "",
                requirements: Array.isArray(item.requirements) ? item.requirements : [],
                processSteps: Array.isArray(item.processSteps) ? item.processSteps : [],
                included: Array.isArray(item.included) ? item.included : [],
              };
            });
          if (active.length > 0) {
            setVisas(active);
          }
        }
      })
      .catch(() => {});
  }, []);

  const filteredVisas =
    selectedRegion === "all"
      ? visas
      : visas.filter((v) => v.region === selectedRegion);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main>
        {/* Page Banner */}
        <PageBanner
          title={isArabic ? "خدمات التأشيرات العالمية المعتمدة" : "Worldwide Visa Services"}
          subtitle={
            isArabic
              ? "تجهيز ملفات السفارات، حجز مواعيد البصمات، وإصدار التأشيرات الإلكترونية بموافقة سريعة."
              : "Direct embassy file preparation, verified biometrics appointment slots, and fast-track approvals worldwide."
          }
          breadcrumbCurrent={t("nav.worldwide_visas")}
          backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=85&auto=format&fit=crop"
          actionButton={
            <button
              onClick={() => setCustomizerOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-lg hover:scale-105"
            >
              <Sliders className="w-4 h-4 text-blue-400" />
              <span>{isArabic ? "تخصيص ملف التأشيرة" : "Customize Visa Application"}</span>
            </button>
          }
        />

        {/* Filter Pills Bar */}
        <section className="w-full bg-slate-50 border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[1440px] mx-auto flex flex-wrap items-center justify-center gap-2">
            {regionFilters.map((tab) => {
              const label = isArabic ? tab.labelAr : tab.labelEn;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRegion(tab.id)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    selectedRegion === tab.id
                      ? "bg-[#2563eb] text-white"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Visas Grid */}
        <section className="w-full py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-medium tracking-wider text-[#2563eb] uppercase block mb-1.5">
                {isArabic ? "تأشيرات السفارات والتأشيرة الإلكترونية" : "EMBASSY & EVISA CLEARANCE"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-slate-900">
                {isArabic ? "استكشف الوجهات المتاحة" : "Explore Destinations"}{" "}
                <span className="font-semibold text-[#2563eb]">({filteredVisas.length})</span>
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                onClick={() => setCustomizerOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Sliders className="w-4 h-4" />
                <span>{isArabic ? "تخصيص ملف التأشيرة" : "Customize Visa Application"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredVisas.map((item) => {
              const arInfo = arabicVisaNames[item.slug];
              const countryName = isArabic && arInfo ? arInfo.country : item.country;
              const visaType = isArabic && arInfo ? arInfo.type : item.type;
              const processingTime = isArabic && arInfo ? arInfo.time : item.time;
              const overviewText = isArabic && arInfo ? arInfo.overview : item.overview;
              const regionName = isArabic && arInfo ? arInfo.regionName : item.regionName;

              return (
                <Link
                  key={item.slug}
                  href={`/visas/${item.slug}`}
                  className="group rounded-lg overflow-hidden bg-white border border-slate-200 hover:border-[#93c5fd] hover:shadow-xs transition-all flex flex-col justify-between p-3 block"
                >
                  <div>
                    {/* Card Thumbnail Image */}
                    <div className="relative aspect-[16/10] rounded-md overflow-hidden bg-slate-100 mb-3">
                      <img
                        src={item.cardImage?.trim() || DEFAULT_VISA_IMAGE}
                        alt={countryName || "Visa destination"}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                      <div className={`absolute top-2.5 ${isArabic ? "right-2.5" : "left-2.5"} px-2.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-medium border border-slate-700 flex items-center gap-1`}>
                        <span>{item.flag}</span>
                        <span>{regionName}</span>
                      </div>

                      <div className={`absolute bottom-2.5 ${isArabic ? "left-2.5" : "right-2.5"} px-2 py-0.5 rounded-md bg-[#2563eb] text-white text-[10px] font-medium`}>
                        {processingTime}
                      </div>
                    </div>

                    {/* Title & Desc */}
                    <div className="px-1">
                      <h3 className="text-base font-medium text-slate-900 tracking-tight group-hover:text-[#2563eb] transition-colors">
                        {countryName}
                      </h3>
                      <p className="text-xs text-slate-500 font-normal mt-0.5">
                        {visaType}
                      </p>
                      <p className="text-xs text-slate-600 font-normal mt-1.5 leading-relaxed line-clamp-2">
                        {overviewText}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 px-1 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#2563eb]">
                      {isArabic ? "التقديم والتحقق من الشروط" : "Apply & Check Requirements"}
                    </span>
                    <div className="w-7 h-7 rounded-md bg-slate-100 group-hover:bg-[#2563eb] group-hover:text-white text-slate-600 flex items-center justify-center transition-colors">
                      <ArrowUpRight className={`w-3.5 h-3.5 ${isArabic ? "rotate-[-90deg]" : ""}`} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA Banner */}
        <CtaSection
          title={isArabic ? "هل تحتاج تأشيرة لدولة أخرى؟" : "Need Visa Assistance for Another Country?"}
          subtitle={
            isArabic
              ? "نستخرج تأشيرات السياحة، العبور (الترانزيت)، والأعمال لكافة دول العالم. تحدث مباشرة مع مكتب التأشيرات."
              : "We facilitate transit, tourist, business, and investor visas worldwide. Chat directly with our dedicated visa desk."
          }
          buttonText={isArabic ? "تواصل مع مكتب التأشيرات" : "Contact Visa Desk"}
          buttonHref={contact.whatsappLink("Hi Arizona International Group, I need visa assistance. Please guide me.")}
          backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=85&auto=format&fit=crop"
          secondaryAction={
            <button
              onClick={() => setCustomizerOpen(true)}
              className="px-6 py-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm inline-flex items-center gap-2 transition-colors border border-slate-700 backdrop-blur-md cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-[#3b82f6]" />
              <span>{isArabic ? "تخصيص ملف التأشيرة" : "Customize Visa Application"}</span>
            </button>
          }
        />
      </main>

      <ServiceCustomizerModal
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        serviceType="visas"
      />

      <Footer />
    </div>
  );
}
