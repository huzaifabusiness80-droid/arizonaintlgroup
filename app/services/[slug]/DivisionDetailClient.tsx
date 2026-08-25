"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BusinessDivision, ServiceItemDetail } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import CtaSection from "@/components/CtaSection";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";
import { getLocalizedPrice } from "@/lib/pricing-helper";

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

export default function DivisionDetailClient({ division }: { division: BusinessDivision }) {
  const { isArabic, t } = useLanguage();
  const { contact, isPakistan } = useGeoLocation();
  const arInfo = arabicDivisionInfo[division.slug];

  const divTitle = isArabic && arInfo ? arInfo.title : division.title;
  const divOverview = isArabic && arInfo ? arInfo.overview : division.overview;

  const [servicesList, setServicesList] = useState<ServiceItemDetail[]>(division.servicesList || []);

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

  return (
    <>
      {/* Page Banner */}
      <PageBanner
        title={divTitle}
        subtitle={divOverview}
        breadcrumbCurrent={division.title}
        backgroundImage={division.heroImage}
      />

      {/* Services Grid Section */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-[1580px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider mb-4">
              <span>{isArabic ? "قائمة الخدمات المتاحة" : "Available Offerings"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950">
              {isArabic ? "استكشف باقات" : "Explore Packages in"}{" "}
              <span className="font-bold text-[#dfb141]">{divTitle}</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
            {isArabic
              ? "اختر الخدمة المناسبة لمعرفة تفاصيل الباقات والأسعار والحجز الفوري."
              : "Select any category below to view detailed pricing, options, and direct booking."}
          </p>
        </div>

        {/* 3-Column Modern Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                className="rounded-3xl bg-[#f8f9fc] border border-neutral-200/80 hover:border-[#dfb141] p-4 sm:p-5 flex flex-col justify-between group transition-all duration-300 hover:shadow-xl hover:bg-white"
              >
                <div>
                  {/* Card Thumbnail Image */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-neutral-900">
                    <img
                      src={item.image || division.heroImage}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    <div
                      className={`absolute top-3 ${
                        isArabic ? "right-3" : "left-3"
                      } px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20`}
                    >
                      {item.tag}
                    </div>

                    {/* Starting Price Pill (Pakistan in PKR, Bahrain in BHD) */}
                    {localizedPrice && (
                      <div
                        className={`absolute bottom-3 ${
                          isArabic ? "left-3" : "right-3"
                        } px-3 py-1 rounded-full bg-[#dfb141] text-white text-[11px] font-bold shadow-md`}
                      >
                        {localizedPrice}
                      </div>
                    )}
                  </div>

                  {/* Card Title & Desc */}
                  <div className="px-2 pb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight group-hover:text-[#dfb141] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 font-normal mt-2 leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-4 pt-3 border-t border-neutral-100 px-2 pb-1 flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-500">
                    {isArabic ? "عرض الباقات والتفاصيل" : "View Packages & Details"}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-[#dfb141] group-hover:text-white text-neutral-800 flex items-center justify-center transition-all">
                    <ArrowUpRight
                      className={`w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${
                        isArabic ? "rotate-[-90deg]" : ""
                      }`}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Reusable Scenic CTA Banner */}
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
      />
    </>
  );
}
