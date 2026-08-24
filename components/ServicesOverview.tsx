"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { useGeoLocation } from "@/context/GeoContext";
import { useLanguage } from "@/context/LanguageContext";

interface CuratedServiceCard {
  nameEn: string;
  nameAr: string;
  itemSlug: string;
  divisionNameEn: string;
  divisionNameAr: string;
  divisionSlug: string;
  descEn: string;
  descAr: string;
  tagEn: string;
  tagAr: string;
  image: string;
}

const curatedServices: CuratedServiceCard[] = [
  {
    nameEn: "Flight Ticket Booking",
    nameAr: "حجز تذاكر الطيران الفوري",
    itemSlug: "flight-tickets",
    divisionNameEn: "Travel & Tours",
    divisionNameAr: "السياحة والسفر",
    divisionSlug: "travel-tours",
    descEn: "Instant reservations across major global airlines with flexible rebooking assistance.",
    descAr: "حجوزات فورية على كبرى خطوط الطيران العالمية مع مرونة كاملة في التعديل والاسترجاع.",
    tagEn: "Instant Confirmation",
    tagAr: "تأكيد فوري",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&auto=format&fit=crop",
  },
  {
    nameEn: "100% Foreign Ownership",
    nameAr: "ملكية أجنبية كاملة 100%",
    itemSlug: "foreign-ownership-cr",
    divisionNameEn: "Business in Bahrain",
    divisionNameAr: "تأسيس الشركات بالبحرين",
    divisionSlug: "business-bahrain",
    descEn: "Commercial Registration (CR), Single Person Company (SPC), and WLL setup in Bahrain.",
    descAr: "إصدار السجل التجاري (CR)، شركة ذات مسؤولية محدودة WLL، وتأسيس الشركات بالبحرين.",
    tagEn: "Gov Approved",
    tagAr: "اعتماد رسمي",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&auto=format&fit=crop",
  },
  {
    nameEn: "Daily & Monthly Car Rentals",
    nameAr: "تأجير سيارات يومي وشهري",
    itemSlug: "daily-rentals",
    divisionNameEn: "Rent A Car",
    divisionNameAr: "تأجير السيارات",
    divisionSlug: "rent-a-car",
    descEn: "Flexible self-drive fleet ranging from economy sedans to luxury SUVs and sports convertibles.",
    descAr: "أسطول سيارات حديث ومتنوع من سيارات السيدان الاقتصادية إلى سيارات الدفع الرباعي الفاخرة.",
    tagEn: "Flexible Plans",
    tagAr: "خطط مرنة",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&auto=format&fit=crop",
  },
  {
    nameEn: "Worldwide Visa Services",
    nameAr: "خدمات التأشيرات العالمية",
    itemSlug: "worldwide-visas",
    divisionNameEn: "Global Visas",
    divisionNameAr: "التأشيرات",
    divisionSlug: "travel-tours",
    descEn: "Fast tourist, business, transit, and family visa processing with high approval success.",
    descAr: "تأشيرات سياحية وتجارية وسياحة عائلية لكافة دول العالم بأعلى نسب قبول وموافقة.",
    tagEn: "Worldwide Visas",
    tagAr: "تأشيرات دولية",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80&auto=format&fit=crop",
  },
  {
    nameEn: "Turnkey Office with EWA",
    nameAr: "مكتب تجاري مرخص مع EWA",
    itemSlug: "turnkey-office-ewa",
    divisionNameEn: "Business in Bahrain",
    divisionNameAr: "الشركات بالبحرين",
    divisionSlug: "business-bahrain",
    descEn: "Fully compliant commercial workspaces with electricity and water connections.",
    descAr: "مكاتب تجارية مؤثثة ومطابقة لاشتراطات البلدية ومزودة بعداد الكهرباء والماء وعقد موثق.",
    tagEn: "Turnkey Office",
    tagAr: "مكتب جاهز",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
  },
  {
    nameEn: "VIP Chauffeur Services",
    nameAr: "خدمة السائق الخاص VIP",
    itemSlug: "vip-chauffeur",
    divisionNameEn: "Rent A Car",
    divisionNameAr: "تأجير السيارات",
    divisionSlug: "rent-a-car",
    descEn: "Professional uniformed private drivers for corporate executives and VIP delegations.",
    descAr: "سائقون محترفون بلباس رسمي لرجال الأعمال والوفود الدبلوماسية وتوصيل المطار.",
    tagEn: "VIP Protocol",
    tagAr: "بروتوكول VIP",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80&auto=format&fit=crop",
  },
  {
    nameEn: "Flagship Smartphones & Tech",
    nameAr: "أحدث الهواتف الذكية المعتمدة",
    itemSlug: "flagship-smartphones",
    divisionNameEn: "Mobiles & Tech",
    divisionNameAr: "الهواتف والتكنولوجيا",
    divisionSlug: "mobiles-tech",
    descEn: "Brand-new, sealed iPhones, Samsung Galaxy, and Google Pixel devices with same-day home delivery.",
    descAr: "أجهزة آيفون وسامسونج جالاكسي وجوجل بكسل أصلية ومختومة مع توصيل سريع في نفس اليوم.",
    tagEn: "100% Genuine",
    tagAr: "أصلي 100%",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80&auto=format&fit=crop",
  },
  {
    nameEn: "Umrah & Spiritual Packages",
    nameAr: "باقات العمرة والزيارات",
    itemSlug: "umrah-spiritual",
    divisionNameEn: "Travel & Tours",
    divisionNameAr: "السياحة والسفر",
    divisionSlug: "travel-tours",
    descEn: "Comprehensive Umrah and Ziyarat packages with VIP ground transfers and hotel guidance.",
    descAr: "برامج عمرة متميزة تشمل الطيران والإقامة الفندقية القريبة والمواصلات المريحة.",
    tagEn: "Spiritual Care",
    tagAr: "عمرة ميسرة",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80&auto=format&fit=crop",
  },
];

export default function ServicesOverview() {
  const { isPakistan } = useGeoLocation();
  const { isArabic, t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter curated services for non-Pakistan visitors
  const displayServices = isPakistan
    ? curatedServices
    : curatedServices.filter(
        (s) => s.divisionSlug !== "rent-a-car" && s.divisionSlug !== "mobiles-tech"
      );

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      const move = isArabic ? (direction === "left" ? scrollAmount : -scrollAmount) : (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollBy({
        left: move,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="services" className="w-full bg-white py-16 sm:py-24 overflow-hidden border-b border-neutral-100">
      {/* Main Container: Strictly Lock-Aligned with max-w-[1580px] */}
      <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header Row (Left: Heading & Badge, Right: Subtext & Navigation) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-10 mb-12 sm:mb-16">
          <div>
            {/* Top Badge / Category Tab */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/90 text-neutral-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#dfb141] ring-2 ring-[#dfb141]/30" />
              <span>{t("services.badge")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.03em] text-neutral-950 leading-[1.18]">
              {t("services.title1")} <br />
              <span className="font-bold text-neutral-950">{t("services.title2")}</span>
            </h2>
          </div>

          {/* Right Side: Subtext + View All Link + Navigation Arrows */}
          <div className="flex flex-col items-start md:items-end gap-5 max-w-xl">
            <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed md:text-right">
              {t("services.desc")}
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-950 hover:text-[#c49725] transition-colors"
              >
                <span>{t("services.view_all")}</span>
                <ArrowUpRight className={`w-3.5 h-3.5 ${isArabic ? "rotate-[-90deg]" : ""}`} />
              </Link>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2 shrink-0" dir="ltr">
                <button
                  onClick={() => scroll("left")}
                  className="w-10 h-10 rounded-full border border-neutral-200 bg-white hover:bg-neutral-950 hover:text-white hover:border-neutral-950 text-neutral-800 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-10 h-10 rounded-full border border-neutral-200 bg-white hover:bg-neutral-950 hover:text-white hover:border-neutral-950 text-neutral-800 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth no-scrollbar snap-x snap-mandatory pr-8"
          style={{
            width: "calc(100% + (100vw - 100%) / 2)",
            maxWidth: "none",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {displayServices.map((item) => {
            const cardName = isArabic ? item.nameAr : item.nameEn;
            const cardDesc = isArabic ? item.descAr : item.descEn;
            const cardTag = isArabic ? item.tagAr : item.tagEn;

            return (
              <Link
                key={item.nameEn}
                href={`/services/${item.divisionSlug}/${item.itemSlug}`}
                className="group relative w-[285px] sm:w-[335px] lg:w-[370px] h-[375px] sm:h-[415px] rounded-[28px] sm:rounded-[32px] overflow-hidden shrink-0 snap-start shadow-sm hover:shadow-2xl transition-all duration-500 block bg-neutral-950"
              >
                {/* Full-Bleed Background Image */}
                <img
                  src={item.image}
                  alt={cardName}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Cinematic Dark Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20 z-10" />

                {/* Bottom Content Block */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  {/* Black Tag Badge with Golden Text */}
                  <span className="inline-block px-3 py-1 rounded-full bg-black/90 border border-[#dfb141]/50 text-[#dfb141] text-[10px] font-bold tracking-widest uppercase mb-2.5 shadow-xs">
                    {cardTag}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    {cardName}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-300 font-normal mt-1.5 line-clamp-2 leading-relaxed">
                    {cardDesc}
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
