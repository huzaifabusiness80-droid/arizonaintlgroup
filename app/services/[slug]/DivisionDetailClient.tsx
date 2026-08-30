"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BusinessDivision, ServiceItemDetail } from "@/lib/data";
import { ArrowUpRight, Sliders, Sparkles } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import CtaSection from "@/components/CtaSection";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";
import { getLocalizedPrice } from "@/lib/pricing-helper";
import ServiceCustomizerModal from "@/components/ServiceCustomizerModal";
import MobileTechCarousel from "@/components/MobileTechCarousel";

const arabicDivisionInfo: { [slug: string]: { title: string; overview: string } } = {
  "travel-tours": {
    title: "السياحة والسفر وتذاكر الطيران",
    overview: "حجوزات طيران فورية، فنادق فاخرة، باقات عطلات سياحية، ورحلات عمرة متكاملة.",
  },
  "rent-a-car": {
    title: "تأجير السيارات والسائق الخاص",
    overview: "تأجير سيارات يومي وشهري وسيارات دفع رباعي فاخرة مع خدمة التوصيل للمطار.",
  },
  "business-bahrain": {
    title: "تأسيس الشركات في البحرين (ملكية 100%)",
    overview: "إصدار السجل التجاري CR، مكاتب مرخصة مع EWA، فتح الحسابات البنكية وإقامة المستثمر.",
  },
  "mobiles-tech": {
    title: "الهواتف الذكية والتكنولوجيا المعتمدة",
    overview: "أحدث هواتف آبل وسامسونج الأصلية، شواحن سريعة، وملحقات معتمدة بضمان الوكيل.",
  },
};

const getCustomizeLabel = (slug: string, isArabic: boolean) => {
  if (slug === "travel-tours") return isArabic ? "تخصيص رحلتك" : "Customize Your Trip";
  if (slug === "mobiles-tech") return isArabic ? "تخصيص طلب الأجهزة" : "Customize Your Tech Order";
  if (slug === "business-bahrain") return isArabic ? "تخصيص تأسيس شركتك" : "Customize Corporate Setup";
  if (slug === "rent-a-car") return isArabic ? "تخصيص استئجار السيارة" : "Customize Fleet & Rental";
  return isArabic ? "تخصيص الباقة" : "Customize Package";
};

export default function DivisionDetailClient({ division }: { division: BusinessDivision }) {
  const { isArabic } = useLanguage();
  const { contact, isPakistan } = useGeoLocation();
  const arInfo = arabicDivisionInfo[division.slug];

  const divTitle = isArabic && arInfo ? arInfo.title : division.title;
  const divOverview = isArabic && arInfo ? arInfo.overview : division.overview;

  const [servicesList, setServicesList] = useState<ServiceItemDetail[]>(division.servicesList || []);
  const [customizerOpen, setCustomizerOpen] = useState(false);

  useEffect(() => {
    let apiEndpoint = "";
    if (division.slug === "travel-tours") apiEndpoint = "/api/admin/tours";
    else if (division.slug === "rent-a-car") apiEndpoint = "/api/admin/cars";
    else if (division.slug === "business-bahrain") apiEndpoint = "/api/admin/bahrain";
    else if (division.slug === "mobiles-tech") apiEndpoint = "/api/admin/mobiles";

    if (!apiEndpoint) return;

    fetch(apiEndpoint)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.items) && d.items.length > 0) {
          const active = d.items
            .filter((item: any) => item.isActive !== false)
            .map((item: any) => ({
              slug: item.slug,
              name: item.name,
              desc: item.description || item.desc || "",
              tag: item.tag || "",
              image: item.image || "",
              price: item.basePrice || item.price || "",
              pricePkr: item.pricePkr || "",
              priceBhd: item.priceBhd || "",
              gallery: Array.isArray(item.gallery) ? item.gallery : [item.image || ""],
              options: Array.isArray(item.options) ? item.options : [],
              about: item.about || "",
            }));
          if (active.length > 0) {
            setServicesList(active);
          }
        }
      })
      .catch(() => {});
  }, [division.slug]);

  const customizeLabel = getCustomizeLabel(division.slug, isArabic);

  return (
    <>
      {/* Page Banner with Header Customize Button */}
      <PageBanner
        title={divTitle}
        subtitle={divOverview}
        breadcrumbCurrent={division.title}
        backgroundImage={division.heroImage}
        actionButton={
          <button
            onClick={() => setCustomizerOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-lg hover:scale-105"
          >
            <Sliders className="w-4 h-4 text-blue-400" />
            <span>{customizeLabel}</span>
          </button>
        }
      />

      {/* Services Grid Section */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-[#2563eb] text-xs font-medium uppercase tracking-wider mb-3">
              <span>{isArabic ? "قائمة الخدمات المتاحة" : "Available Offerings"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-slate-900 leading-tight">
              {isArabic ? "استكشف باقات" : "Explore Packages in"}{" "}
              <span className="text-[#2563eb] font-semibold">{divTitle}</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={() => setCustomizerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              <span>{customizeLabel}</span>
            </button>
          </div>
        </div>

        {/* Cards Grid with Mid-Section Visual Carousel for Mobiles & Tech */}
        {division.slug === "mobiles-tech" && servicesList.length > 2 ? (
          <div className="space-y-8">
            {/* Top Cards (First 2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {servicesList.slice(0, 2).map((item) => {
                const localizedPrice = getLocalizedPrice(
                  {
                    pricePkr: (item as any).pricePkr,
                    priceBhd: (item as any).priceBhd,
                    price: item.price,
                  },
                  isPakistan
                );

                return (
                  <Link
                    key={item.slug}
                    href={`/services/${division.slug}/${item.slug}`}
                    className="rounded-xl bg-white dark:bg-[#0d1527] border border-slate-200 dark:border-slate-800 hover:border-[#93c5fd] dark:hover:border-blue-500 hover:shadow-md p-4 flex flex-col justify-between group transition-all"
                  >
                    <div>
                      {/* Card Thumbnail Image */}
                      <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-3.5 bg-slate-900">
                        <img
                          src={item.image || division.heroImage}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />

                        {/* Badge */}
                        <div
                          className={`absolute top-2.5 ${
                            isArabic ? "right-2.5" : "left-2.5"
                          } px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-medium border border-slate-700`}
                        >
                          {item.tag}
                        </div>

                        {/* Starting Price Pill */}
                        {localizedPrice && (
                          <div
                            className={`absolute bottom-2.5 ${
                              isArabic ? "left-2.5" : "right-2.5"
                            } px-2.5 py-0.5 rounded-md bg-[#2563eb] text-white text-[10px] font-medium`}
                          >
                            {localizedPrice}
                          </div>
                        )}
                      </div>

                      {/* Card Title & Desc */}
                      <div className="px-1">
                        <h3 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-[#2563eb] transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-normal mt-1 leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Card Action Link */}
                    <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 px-1 flex items-center justify-between">
                      <span className="text-xs font-medium text-[#2563eb] dark:text-[#60a5fa]">
                        {isArabic ? "عرض الباقات والتفاصيل" : "View Packages & Details"}
                      </span>
                      <div className="w-7 h-7 rounded-md bg-slate-100 dark:bg-slate-800 group-hover:bg-[#2563eb] group-hover:text-white text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors">
                        <ArrowUpRight
                          className={`w-3.5 h-3.5 ${isArabic ? "rotate-[-90deg]" : ""}`}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* In the Middle: Luxury Continuous Scrolling Hardware Showcase */}
            <div className="-mx-4 sm:-mx-6 lg:-mx-8">
              <MobileTechCarousel />
            </div>

            {/* Bottom Cards (Remaining) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {servicesList.slice(2).map((item) => {
                const localizedPrice = getLocalizedPrice(
                  {
                    pricePkr: (item as any).pricePkr,
                    priceBhd: (item as any).priceBhd,
                    price: item.price,
                  },
                  isPakistan
                );

                return (
                  <Link
                    key={item.slug}
                    href={`/services/${division.slug}/${item.slug}`}
                    className="rounded-xl bg-white dark:bg-[#0d1527] border border-slate-200 dark:border-slate-800 hover:border-[#93c5fd] dark:hover:border-blue-500 hover:shadow-md p-4 flex flex-col justify-between group transition-all"
                  >
                    <div>
                      {/* Card Thumbnail Image */}
                      <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-3.5 bg-slate-900">
                        <img
                          src={item.image || division.heroImage}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />

                        {/* Badge */}
                        <div
                          className={`absolute top-2.5 ${
                            isArabic ? "right-2.5" : "left-2.5"
                          } px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-medium border border-slate-700`}
                        >
                          {item.tag}
                        </div>

                        {/* Starting Price Pill */}
                        {localizedPrice && (
                          <div
                            className={`absolute bottom-2.5 ${
                              isArabic ? "left-2.5" : "right-2.5"
                            } px-2.5 py-0.5 rounded-md bg-[#2563eb] text-white text-[10px] font-medium`}
                          >
                            {localizedPrice}
                          </div>
                        )}
                      </div>

                      {/* Card Title & Desc */}
                      <div className="px-1">
                        <h3 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-[#2563eb] transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-normal mt-1 leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Card Action Link */}
                    <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 px-1 flex items-center justify-between">
                      <span className="text-xs font-medium text-[#2563eb] dark:text-[#60a5fa]">
                        {isArabic ? "عرض الباقات والتفاصيل" : "View Packages & Details"}
                      </span>
                      <div className="w-7 h-7 rounded-md bg-slate-100 dark:bg-slate-800 group-hover:bg-[#2563eb] group-hover:text-white text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors">
                        <ArrowUpRight
                          className={`w-3.5 h-3.5 ${isArabic ? "rotate-[-90deg]" : ""}`}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {servicesList.map((item) => {
              const localizedPrice = getLocalizedPrice(
                {
                  pricePkr: (item as any).pricePkr,
                  priceBhd: (item as any).priceBhd,
                  price: item.price,
                },
                isPakistan
              );

              return (
                <Link
                  key={item.slug}
                  href={`/services/${division.slug}/${item.slug}`}
                  className="rounded-xl bg-white dark:bg-[#0d1527] border border-slate-200 dark:border-slate-800 hover:border-[#93c5fd] dark:hover:border-blue-500 hover:shadow-xs p-3.5 flex flex-col justify-between group transition-all"
                >
                  <div>
                    {/* Card Thumbnail Image */}
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-3 bg-slate-900">
                      <img
                        src={item.image || division.heroImage}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />

                      {/* Badge */}
                      <div
                        className={`absolute top-2.5 ${
                          isArabic ? "right-2.5" : "left-2.5"
                        } px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-medium border border-slate-700`}
                      >
                        {item.tag}
                      </div>

                      {/* Starting Price Pill */}
                      {localizedPrice && (
                        <div
                          className={`absolute bottom-2.5 ${
                            isArabic ? "left-2.5" : "right-2.5"
                          } px-2.5 py-0.5 rounded-md bg-[#2563eb] text-white text-[10px] font-medium`}
                        >
                          {localizedPrice}
                        </div>
                      )}
                    </div>

                    {/* Card Title & Desc */}
                    <div className="px-1">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-[#2563eb] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-normal mt-1 leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 px-1 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#2563eb] dark:text-[#60a5fa]">
                      {isArabic ? "عرض الباقات والتفاصيل" : "View Packages & Details"}
                    </span>
                    <div className="w-7 h-7 rounded-md bg-slate-100 dark:bg-slate-800 group-hover:bg-[#2563eb] group-hover:text-white text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors">
                      <ArrowUpRight
                        className={`w-3.5 h-3.5 ${isArabic ? "rotate-[-90deg]" : ""}`}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA Banner with End-of-Page Customize Button */}
      <CtaSection
        title={isArabic ? `جاهز لحجز ${divTitle}؟` : `Ready to Book Your ${division.title}?`}
        subtitle={
          isArabic
            ? "تواصل مع مستشاري أريزونا الدولية للحصول على عروض أسعار مخصصة، إتمام سريع، ودعم 24/7."
            : "Contact Arizona International advisors today for customized quotes, fast processing, and 24/7 dedicated support."
        }
        buttonText={isArabic ? "استفسر عبر الواتساب" : "Inquire on WhatsApp"}
        buttonHref={
          division.slug === "business-bahrain"
            ? `https://wa.me/97332306963?text=${encodeURIComponent(`Hi Arizona Bahrain, I want to book ${division.title}. Please guide me.`)}`
            : contact.whatsappLink(`Hi Arizona, I want to book ${division.title}. Please guide me.`)
        }
        backgroundImage={division.heroImage}
        secondaryAction={
          <button
            onClick={() => setCustomizerOpen(true)}
            className="px-6 py-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm inline-flex items-center gap-2 transition-colors border border-slate-700 backdrop-blur-md cursor-pointer"
          >
            <Sliders className="w-4 h-4 text-[#3b82f6]" />
            <span>{customizeLabel}</span>
          </button>
        }
      />

      {/* Service Customizer Modal */}
      <ServiceCustomizerModal
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        serviceType={division.slug as any}
        initialItemName={division.title}
      />
    </>
  );
}
