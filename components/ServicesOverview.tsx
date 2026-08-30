"use client";

import React, { useRef, useState, useEffect } from "react";
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
    descEn: "Worldwide Flights",
    descAr: "حجوزات طيران دولية",
    tagEn: "Travel",
    tagAr: "سياحة",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=85&auto=format&fit=crop",
  },
  {
    nameEn: "100% Foreign Ownership CR",
    nameAr: "ملكية أجنبية كاملة 100%",
    itemSlug: "foreign-ownership-cr",
    divisionNameEn: "Business in Bahrain",
    divisionNameAr: "تأسيس الشركات بالبحرين",
    divisionSlug: "business-bahrain",
    descEn: "Bahrain Corporate Setup",
    descAr: "السجل التجاري بالبحرين",
    tagEn: "Bahrain CR",
    tagAr: "تأسيس شركات",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=85&auto=format&fit=crop",
  },
  {
    nameEn: "Daily & Monthly Car Rentals",
    nameAr: "تأجير سيارات يومي وشهري",
    itemSlug: "daily-rentals",
    divisionNameEn: "Rent A Car",
    divisionNameAr: "تأجير السيارات",
    divisionSlug: "rent-a-car",
    descEn: "Sedans & Luxury SUVs",
    descAr: "أسطول سيارات حديث",
    tagEn: "Fleet",
    tagAr: "تأجير سيارات",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=85&auto=format&fit=crop",
  },
  {
    nameEn: "Worldwide Visa Facilitation",
    nameAr: "خدمات التأشيرات العالمية",
    itemSlug: "worldwide-visas",
    divisionNameEn: "Global Visas",
    divisionNameAr: "التأشيرات",
    divisionSlug: "travel-tours",
    descEn: "Schengen, UK, USA & Gulf",
    descAr: "تأشيرات الشنغن والخليج",
    tagEn: "Visas",
    tagAr: "تأشيرات",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=85&auto=format&fit=crop",
  },
  {
    nameEn: "Turnkey Office with EWA",
    nameAr: "مكتب تجاري مرخص مع EWA",
    itemSlug: "turnkey-office-ewa",
    divisionNameEn: "Business in Bahrain",
    divisionNameAr: "الشركات بالبحرين",
    divisionSlug: "business-bahrain",
    descEn: "Approved Commercial Spaces",
    descAr: "مكاتب تجارية مرخصة",
    tagEn: "Offices",
    tagAr: "مكاتب تجارية",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85&auto=format&fit=crop",
  },
  {
    nameEn: "VIP Chauffeur & Transfers",
    nameAr: "خدمة السائق الخاص VIP",
    itemSlug: "vip-chauffeur",
    divisionNameEn: "Rent A Car",
    divisionNameAr: "تأجير السيارات",
    divisionSlug: "rent-a-car",
    descEn: "Airport & Corporate Service",
    descAr: "سائقون محترفون",
    tagEn: "VIP Service",
    tagAr: "خدمة VIP",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=85&auto=format&fit=crop",
  },
  {
    nameEn: "Umrah & Spiritual Journeys",
    nameAr: "رحلات العمرة والزيارات",
    itemSlug: "umrah-spiritual",
    divisionNameEn: "Travel & Tours",
    divisionNameAr: "السياحة والسفر",
    divisionSlug: "travel-tours",
    descEn: "5-Star Hotels & Transport",
    descAr: "باقات متكاملة ومريحة",
    tagEn: "Spiritual",
    tagAr: "عمرة وزيارات",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=85&auto=format&fit=crop",
  },
  {
    nameEn: "Luxury Hotels & 5-Star Stays",
    nameAr: "الفنادق والمنتجعات الفاخرة",
    itemSlug: "hotels-resorts",
    divisionNameEn: "Travel & Tours",
    divisionNameAr: "السياحة والسفر",
    divisionSlug: "travel-tours",
    descEn: "Exclusive Rates Worldwide",
    descAr: "إقامات فندقية فاخرة",
    tagEn: "5-Star Stays",
    tagAr: "فنادق فاخرة",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=85&auto=format&fit=crop",
  },
  {
    nameEn: "Flagship Smartphones & Tech",
    nameAr: "الهواتف الذكية الأصلية 100%",
    itemSlug: "flagship-smartphones",
    divisionNameEn: "Mobiles & Tech",
    divisionNameAr: "الهواتف والتكنولوجيا",
    divisionSlug: "mobiles-tech",
    descEn: "Apple, Samsung & Pixel",
    descAr: "أحدث الأجهزة بالضمان",
    tagEn: "Flagship Tech",
    tagAr: "تقنية معتمدة",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=85&auto=format&fit=crop",
  },
  {
    nameEn: "Fast Chargers & GaN Cables",
    nameAr: "شواحن سريعة وكابلات GaN",
    itemSlug: "fast-chargers",
    divisionNameEn: "Mobiles & Tech",
    divisionNameAr: "الهواتف والتكنولوجيا",
    divisionSlug: "mobiles-tech",
    descEn: "High-Speed Rapid Power",
    descAr: "شحن سريع وآمن",
    tagEn: "GaN Fast Charge",
    tagAr: "شحن سريع",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=85&auto=format&fit=crop",
  },
];

export default function ServicesOverview() {
  const { isPakistan } = useGeoLocation();
  const { isArabic, t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [services, setServices] = useState<CuratedServiceCard[]>(curatedServices);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/tours").then((r) => r.json()).catch(() => null),
      fetch("/api/admin/bahrain").then((r) => r.json()).catch(() => null),
      fetch("/api/admin/cars").then((r) => r.json()).catch(() => null),
      fetch("/api/admin/mobiles").then((r) => r.json()).catch(() => null),
    ]).then(([toursRes, bahrainRes, carsRes, mobilesRes]) => {
      const combined: CuratedServiceCard[] = [];

      if (toursRes?.success && Array.isArray(toursRes.items)) {
        toursRes.items.filter((it: any) => it.isActive !== false).forEach((it: any) => {
          combined.push({
            nameEn: it.name,
            nameAr: it.name,
            itemSlug: it.slug,
            divisionNameEn: "Travel & Tours",
            divisionNameAr: "السياحة والسفر",
            divisionSlug: "travel-tours",
            descEn: it.tag || "Travel & Tourism",
            descAr: it.tag || "السياحة والسفر",
            tagEn: it.tag || "Travel",
            tagAr: it.tag || "سياحة",
            image: it.image || "",
          });
        });
      }

      if (bahrainRes?.success && Array.isArray(bahrainRes.items)) {
        bahrainRes.items.filter((it: any) => it.isActive !== false).forEach((it: any) => {
          combined.push({
            nameEn: it.name,
            nameAr: it.name,
            itemSlug: it.slug,
            divisionNameEn: "Business in Bahrain",
            divisionNameAr: "الشركات بالبحرين",
            divisionSlug: "business-bahrain",
            descEn: it.tag || "Bahrain Setup",
            descAr: it.tag || "تأسيس الشركات",
            tagEn: it.tag || "Corporate",
            tagAr: it.tag || "شركات",
            image: it.image || "",
          });
        });
      }

      if (carsRes?.success && Array.isArray(carsRes.items)) {
        carsRes.items.filter((it: any) => it.isActive !== false).forEach((it: any) => {
          combined.push({
            nameEn: it.name,
            nameAr: it.name,
            itemSlug: it.slug,
            divisionNameEn: "Rent A Car",
            divisionNameAr: "تأجير السيارات",
            divisionSlug: "rent-a-car",
            descEn: it.tag || "Fleet & Rentals",
            descAr: it.tag || "أسطول السيارات",
            tagEn: it.tag || "Fleet",
            tagAr: it.tag || "سيارات",
            image: it.image || "",
          });
        });
      }

      if (mobilesRes?.success && Array.isArray(mobilesRes.items)) {
        mobilesRes.items.filter((it: any) => it.isActive !== false).forEach((it: any) => {
          combined.push({
            nameEn: it.name,
            nameAr: it.name,
            itemSlug: it.slug,
            divisionNameEn: "Mobiles & Tech",
            divisionNameAr: "الهواتف والتكنولوجيا",
            divisionSlug: "mobiles-tech",
            descEn: it.tag || "Certified Devices",
            descAr: it.tag || "أجهزة معتمدة",
            tagEn: it.tag || "Tech",
            tagAr: it.tag || "تكنولوجيا",
            image: it.image || "",
          });
        });
      }

      if (combined.length > 0) {
        setServices(combined);
      }
    });
  }, []);

  const displayServices = isPakistan
    ? services
    : services.filter(
        (s) => s.divisionSlug !== "rent-a-car" && s.divisionSlug !== "mobiles-tech"
      );

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollDistance = 380;
      const move = isArabic
        ? direction === "left"
          ? scrollDistance
          : -scrollDistance
        : direction === "left"
        ? -scrollDistance
        : scrollDistance;

      scrollRef.current.scrollBy({
        left: move,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="services" className="w-full bg-white py-14 sm:py-20 border-b border-slate-200 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-[#2563eb] text-xs font-medium uppercase tracking-wider mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
              <span>{t("services.badge")}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 leading-tight">
              {t("services.title1")} <br />
              <span className="text-[#2563eb]">{t("services.title2")}</span>
            </h2>
          </div>

          {/* Right Navigation Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
            >
              <span>{t("services.view_all")}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${isArabic ? "rotate-[-90deg]" : ""}`} />
            </Link>

            {/* Left / Right Large Navigation Arrow Buttons */}
            <div className="flex items-center gap-2" dir="ltr">
              <button
                onClick={() => scroll("left")}
                className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-colors shadow-xs hover:border-slate-300 cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-colors shadow-xs hover:border-slate-300 cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Large Prominent Cards Carousel (Matching Reference Photo) */}
        <div
          ref={scrollRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {displayServices.map((item) => {
            const cardName = isArabic ? item.nameAr : item.nameEn;
            const cardDesc = isArabic ? item.descAr : item.descEn;

            return (
              <Link
                key={item.nameEn}
                href={`/services/${item.divisionSlug}/${item.itemSlug}`}
                className="group relative w-[270px] sm:w-[310px] lg:w-[335px] h-[360px] sm:h-[420px] rounded-3xl overflow-hidden shrink-0 snap-start bg-slate-900 transition-all duration-300 block shadow-sm hover:shadow-xl cursor-pointer"
              >
                {/* Full-Bleed High Quality Background Image */}
                <img
                  src={item.image}
                  alt={cardName}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Dark Vignette Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10" />

                {/* Content Inside Card (Centered at Bottom) */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-center z-20 flex flex-col items-center justify-end">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug drop-shadow-sm group-hover:text-blue-200 transition-colors">
                    {cardName}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-200 font-medium mt-1 drop-shadow-xs line-clamp-1">
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
