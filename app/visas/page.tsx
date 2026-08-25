"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import CtaSection from "@/components/CtaSection";
import Link from "next/link";
import { allVisasData, VisaDetail } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";
import { arabicVisaNames } from "@/lib/localizedData";

const regionFilters = [
  { id: "all", labelEn: "All Destinations", labelAr: "جميع الوجهات" },
  { id: "gcc", labelEn: "GCC & Middle East", labelAr: "الخليج والشرق الأوسط" },
  { id: "europe", labelEn: "Europe & Schengen", labelAr: "أوروبا والشنغن" },
  { id: "asia", labelEn: "Asia & Far East", labelAr: "آسيا والشرق الأقصى" },
  { id: "americas", labelEn: "Americas & UK", labelAr: "الأمريكتين وبريطانيا" },
  { id: "africa", labelEn: "Africa", labelAr: "إفريقيا" },
];

export default function VisasPage() {
  const { isArabic, t } = useLanguage();
  const { contact } = useGeoLocation();
  const [selectedRegion, setSelectedRegion] = useState("all");
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

  const filteredVisas =
    selectedRegion === "all"
      ? visas
      : visas.filter((v) => v.region === selectedRegion);

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between">
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
        />

        {/* Filter Pills Bar */}
        <section className="w-full bg-[#f8f9fc] border-b border-neutral-200/80 py-6 px-4 sm:px-8 lg:px-12">
          <div className="w-full max-w-[1580px] mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {regionFilters.map((tab) => {
              const label = isArabic ? tab.labelAr : tab.labelEn;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRegion(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedRegion === tab.id
                      ? "bg-[#dfb141] text-white shadow-md"
                      : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Visas Grid */}
        <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-[1580px] mx-auto border-b border-neutral-100">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#dfb141] uppercase block mb-3">
                {isArabic ? "تأشيرات السفارات والتأشيرة الإلكترونية" : "EMBASSY & EVISA CLEARANCE"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-neutral-950">
                {isArabic ? "استكشف الوجهات المتاحة" : "Explore Destinations"}{" "}
                <span className="font-bold">({filteredVisas.length})</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 font-medium max-w-sm">
              {isArabic
                ? "اختر وجهتك للاطلاع على المستندات المطلوبة، مدة المعالجة، الرسوم، والتواصل المباشر مع مكتب التأشيرات."
                : "Select your destination country to view required documents, processing timeline, fees, and WhatsApp desk."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                  className="group rounded-[28px] overflow-hidden bg-white border border-neutral-200/90 hover:border-[#dfb141] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between p-3.5 block"
                >
                  <div>
                    {/* Card Thumbnail Image */}
                    <div className="relative aspect-[16/10] rounded-[22px] overflow-hidden bg-neutral-200 mb-4">
                      <img
                        src={item.cardImage}
                        alt={countryName}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className={`absolute top-3 ${isArabic ? "right-3" : "left-3"} px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20 flex items-center gap-1.5`}>
                        <span>{item.flag}</span>
                        <span>{regionName}</span>
                      </div>

                      <div className={`absolute bottom-3 ${isArabic ? "left-3" : "right-3"} px-3 py-1 rounded-full bg-[#dfb141] text-white text-[11px] font-bold shadow-md`}>
                        {processingTime}
                      </div>
                    </div>

                    {/* Title & Desc */}
                    <div className="px-2 pb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight group-hover:text-[#dfb141] transition-colors">
                        {countryName}
                      </h3>
                      <p className="text-xs text-neutral-500 font-semibold mt-0.5">
                        {visaType}
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-600 font-normal mt-2 leading-relaxed line-clamp-2">
                        {overviewText}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 px-2 pb-1 flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-500">
                      {isArabic ? "التقديم والتحقق من الشروط" : "Apply & Check Requirements"}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-[#dfb141] group-hover:text-white text-neutral-800 flex items-center justify-center transition-all">
                      <ArrowUpRight className={`w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${isArabic ? "rotate-[-90deg]" : ""}`} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Reusable Scenic CTA Banner */}
        <CtaSection
          title={isArabic ? "هل تحتاج تأشيرة لدولة أخرى؟" : "Need Visa Assistance for Another Country?"}
          subtitle={
            isArabic
              ? "نستخرج تأشيرات السياحة، العبور (الترانزيت)، والأعمال لكافة دول العالم. تحدث مباشرة مع مكتب التأشيرات."
              : "We facilitate transit, tourist, business, and investor visas worldwide. Chat directly with our dedicated visa desk."
          }
          buttonText={isArabic ? "تواصل مع مكتب التأشيرات" : "Contact Visa Desk"}
          buttonHref={contact.whatsappLink("Hi Arizona, I need visa assistance. Please guide me.")}
          backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=85&auto=format&fit=crop"
        />
      </main>

      <Footer />
    </div>
  );
}
