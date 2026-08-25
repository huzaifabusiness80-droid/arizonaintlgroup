"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Star,
  MessageCircle,
  PhoneCall,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
  Building2,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";
import { getLocalizedPrice } from "@/lib/pricing-helper";

export interface ServiceOptionItem {
  name: string;
  price?: string;
  pricePkr?: string;
  priceBhd?: string;
  period?: string;
  capacity?: string;
  badge?: string;
  desc?: string;
}

interface DetailContentLayoutProps {
  title: string;
  categoryTag: string;
  locationOrTagline: string;
  startingPrice: string;
  startingPricePkr?: string;
  startingPriceBhd?: string;
  rating?: string;
  overviewText: string;
  heroImage: string;
  galleryImages?: string[];
  serviceOptions: ServiceOptionItem[];
  backLinkHref: string;
  backLinkLabel: string;
  whatsAppText: string;
}

export default function DetailContentLayout({
  title,
  categoryTag,
  locationOrTagline,
  startingPrice,
  startingPricePkr,
  startingPriceBhd,
  rating = "5.0 Verified",
  overviewText,
  heroImage,
  galleryImages = [],
  serviceOptions = [],
  backLinkHref,
  backLinkLabel,
  whatsAppText,
}: DetailContentLayoutProps) {
  const { isArabic, t } = useLanguage();
  const { contact, isPakistan } = useGeoLocation();
  const imagesList = galleryImages && galleryImages.length > 0 ? galleryImages : [heroImage];
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  const prevPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev + 1) % imagesList.length);
  };

  // Localize starting price based on visitor location (Pakistan vs Bahrain/Global)
  const displayStartingPrice = isPakistan
    ? startingPricePkr || getLocalizedPrice({ price: startingPrice }, true)
    : startingPriceBhd || getLocalizedPrice({ price: startingPrice }, false);

  return (
    <section className="w-full py-12 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-[1580px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        {/* ================= LEFT MAIN CONTENT (70% WIDTH) ================= */}
        <div className="lg:col-span-8 space-y-10">
          {/* 1. Main Featured Photo Gallery Carousel */}
          <div className="space-y-4">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border border-neutral-200/80 bg-neutral-900 group">
              <img
                src={imagesList[currentPhotoIdx] || heroImage}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Slider Arrow Controls */}
              {imagesList.length > 1 && (
                <div dir="ltr">
                  <button
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                    aria-label="Previous Photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                    aria-label="Next Photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Category Tag Badge */}
              <div
                className={`absolute top-4 ${
                  isArabic ? "right-4" : "left-4"
                } px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/20`}
              >
                {categoryTag}
              </div>
            </div>

            {/* Gallery Indicator Dots */}
            {imagesList.length > 1 && (
              <div className="flex items-center justify-center gap-1.5 pt-1">
                {imagesList.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPhotoIdx(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentPhotoIdx === idx ? "w-6 bg-[#dfb141]" : "w-2 bg-neutral-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 2. Service Options & Pricing Grid */}
          {serviceOptions.length > 0 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#dfb141]" />
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-950">
                  {isArabic ? "الباقات والخيارات المتاحة" : "Service Packages & Pricing"}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {serviceOptions.map((opt, i) => {
                  const optionPrice = getLocalizedPrice(
                    {
                      pricePkr: opt.pricePkr,
                      priceBhd: opt.priceBhd,
                      price: opt.price,
                    },
                    isPakistan
                  );

                  return (
                    <div
                      key={i}
                      className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-sm hover:border-[#dfb141] transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
                          {opt.badge || (isArabic ? "خيار معتمد" : "Verified Option")}
                        </span>
                        <h3 className="text-lg font-bold text-neutral-950">{opt.name}</h3>

                        {/* Country-Specific Price Highlight (PKR in Pakistan, BHD in Bahrain) */}
                        {optionPrice && (
                          <div className="pt-1">
                            <span className="text-xl sm:text-2xl font-extrabold text-[#c49725]">
                              {optionPrice}
                            </span>
                            {opt.period && (
                              <span className="text-xs text-neutral-500 font-normal ml-1">
                                / {opt.period}
                              </span>
                            )}
                          </div>
                        )}

                        {opt.capacity && (
                          <p className="text-xs text-neutral-600 font-medium">
                            {isArabic ? `السعة: ${opt.capacity}` : `Capacity: ${opt.capacity}`}
                          </p>
                        )}

                        {opt.desc && (
                          <p className="text-xs text-neutral-500 font-normal leading-relaxed pt-1">
                            {opt.desc}
                          </p>
                        )}
                      </div>

                      {/* Included Pill Badge */}
                      <div className="pt-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>
                            {isArabic
                              ? "مشمول بالدعم الفوري المعتمد"
                              : "Instant Assistance Included"}
                          </span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. About This Service Section */}
          <div className="space-y-4 pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#dfb141]" />
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-950">
                {isArabic ? "تفاصيل ونظرة عامة على الخدمة" : "About This Service"}
              </h2>
            </div>

            <div className="prose max-w-none text-neutral-600 font-normal text-sm sm:text-base leading-relaxed space-y-4">
              <p>{overviewText}</p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDEBAR / BOOKING BOX (30% WIDTH) ================= */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          {/* Quick Booking Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#f8f9fc] border border-neutral-200/90 shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
                {locationOrTagline}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-950">{title}</h3>
              {displayStartingPrice && (
                <div className="pt-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#c49725]">
                    {displayStartingPrice}
                  </span>
                </div>
              )}
            </div>

            {/* Direct WhatsApp Call to Action */}
            <div className="space-y-3 pt-2">
              <a
                href={contact.whatsappLink(whatsAppText)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-[#dfb141] hover:bg-[#c49725] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{isArabic ? "احجز عبر الواتساب فوراً" : "Book on WhatsApp Now"}</span>
              </a>

              <Link
                href="/contact"
                className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-900 font-semibold text-xs transition-all border border-neutral-300 flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span>{isArabic ? "طلب استشارة مخصصة" : "Request Custom Inquiry"}</span>
              </Link>
            </div>

            {/* Guarantee Badge */}
            <div className="pt-4 border-t border-neutral-200/70 space-y-2 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isArabic ? "ضمان الخدمة المعتمدة 100%" : "100% Verified Quality & Support"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#dfb141] shrink-0" />
                <span>{isArabic ? "متابعة مباشرة مع المستشار" : "Direct Advisor Communication"}</span>
              </div>
            </div>
          </div>

          {/* Back Navigation Button */}
          <Link
            href={backLinkHref}
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-neutral-950 transition-colors px-2"
          >
            <ArrowLeft className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
            <span>{backLinkLabel}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
