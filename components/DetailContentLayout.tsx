"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
  Building2,
  ShieldCheck,
  Sliders,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";
import { getLocalizedPrice } from "@/lib/pricing-helper";
import ServiceCustomizerModal, { CustomizerServiceType } from "@/components/ServiceCustomizerModal";

import ProductOrderModal from "@/components/ProductOrderModal";

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
  customizerServiceType?: CustomizerServiceType;
}

export default function DetailContentLayout({
  title,
  categoryTag,
  locationOrTagline,
  startingPrice,
  startingPricePkr,
  startingPriceBhd,
  overviewText,
  heroImage,
  galleryImages = [],
  serviceOptions = [],
  backLinkHref,
  backLinkLabel,
  whatsAppText,
  customizerServiceType,
}: DetailContentLayoutProps) {
  const { isArabic } = useLanguage();
  const { contact, isPakistan } = useGeoLocation();
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const imagesList = galleryImages && galleryImages.length > 0 ? galleryImages : [heroImage];
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  const prevPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev + 1) % imagesList.length);
  };

  const displayStartingPrice = isPakistan
    ? startingPricePkr || getLocalizedPrice({ price: startingPrice }, true)
    : startingPriceBhd || getLocalizedPrice({ price: startingPrice }, false);

  return (
    <section className="w-full py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
        {/* LEFT MAIN CONTENT */}
        <div className="lg:col-span-8 space-y-8">
          {/* Gallery Carousel */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-lg overflow-hidden border border-slate-200 bg-slate-900 group">
              <img
                src={imagesList[currentPhotoIdx] || heroImage}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              />

              {imagesList.length > 1 && (
                <div dir="ltr">
                  <button
                    onClick={prevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                    aria-label="Previous Photo"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                    aria-label="Next Photo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Category Tag */}
              <div
                className={`absolute top-3 ${
                  isArabic ? "right-3" : "left-3"
                } px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-white text-xs font-medium border border-slate-700`}
              >
                {categoryTag}
              </div>
            </div>

            {/* Dots */}
            {imagesList.length > 1 && (
              <div className="flex items-center justify-center gap-1.5 pt-1">
                {imagesList.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPhotoIdx(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentPhotoIdx === idx ? "w-5 bg-[#2563eb]" : "w-1.5 bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Service Options & Pricing Grid */}
          {serviceOptions.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#2563eb]" />
                <h2 className="text-lg sm:text-xl font-medium text-slate-900">
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
                      className="p-5 rounded-lg bg-white border border-slate-200 hover:border-[#93c5fd] transition-colors flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">
                          {opt.badge || (isArabic ? "خيار معتمد" : "Verified Option")}
                        </span>
                        <h3 className="text-base font-medium text-slate-900">{opt.name}</h3>

                        {optionPrice && (
                          <div className="pt-1">
                            <span className="text-xl font-semibold text-[#2563eb]">
                              {optionPrice}
                            </span>
                            {opt.period && (
                              <span className="text-xs text-slate-500 font-normal ml-1">
                                / {opt.period}
                              </span>
                            )}
                          </div>
                        )}

                        {opt.capacity && (
                          <p className="text-xs text-slate-600 font-normal">
                            {isArabic ? `السعة: ${opt.capacity}` : `Capacity: ${opt.capacity}`}
                          </p>
                        )}

                        {opt.desc && (
                          <p className="text-xs text-slate-500 font-normal leading-relaxed pt-1">
                            {opt.desc}
                          </p>
                        )}
                      </div>

                      <div className="pt-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 text-[#2563eb] text-[10px] font-medium">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>
                            {isArabic
                              ? "مشمول بالدعم المعتمد"
                              : "Verified Assistance"}
                          </span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* About Section */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#2563eb]" />
              <h2 className="text-lg sm:text-xl font-medium text-slate-900">
                {isArabic ? "تفاصيل ونظرة عامة على الخدمة" : "About This Service"}
              </h2>
            </div>

            <div className="text-slate-600 font-normal text-xs sm:text-sm leading-relaxed space-y-3">
              <p>{overviewText}</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
          <div className="p-5 sm:p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">
                {locationOrTagline}
              </span>
              <h3 className="text-lg sm:text-xl font-medium text-slate-900">{title}</h3>
              {displayStartingPrice && (
                <div className="pt-1">
                  <span className="text-2xl font-semibold text-[#2563eb]">
                    {displayStartingPrice}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              {/* Primary Book / Order on WhatsApp Button -> Opens Form Modal */}
              <button
                onClick={() => setOrderModalOpen(true)}
                className="w-full py-3 px-4 rounded-md bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{isArabic ? "احجز عبر الواتساب فوراً (نموذج الطلب)" : "Book on WhatsApp Now (Order Form)"}</span>
              </button>

              <button
                onClick={() => setCustomizerOpen(true)}
                className="w-full py-2.5 px-4 rounded-md bg-blue-50 hover:bg-blue-100 text-[#2563eb] font-medium text-xs sm:text-sm transition-colors border border-blue-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Sliders className="w-4 h-4 text-[#2563eb]" />
                <span>{isArabic ? "تخصيص الباقة حسب رغبتك" : "Customize Your Package"}</span>
              </button>

              <Link
                href="/contact"
                className="w-full py-2.5 px-4 rounded-md bg-white hover:bg-slate-100 text-slate-800 font-medium text-xs transition-colors border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer text-center"
              >
                <span>{isArabic ? "طلب استشارة مخصصة" : "Request Custom Inquiry"}</span>
              </Link>
            </div>

            {/* Guarantee Badge */}
            <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{isArabic ? "ضمان الخدمة المعتمدة 100%" : "100% Verified Quality & Support"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
                <span>{isArabic ? "متابعة مباشرة مع المستشار" : "Direct Advisor Communication"}</span>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <Link
            href={backLinkHref}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors px-1"
          >
            <ArrowLeft className={`w-3.5 h-3.5 ${isArabic ? "rotate-180" : ""}`} />
            <span>{backLinkLabel}</span>
          </Link>
        </div>
      </div>

      {/* Service Customizer Modal */}
      <ServiceCustomizerModal
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        serviceType={customizerServiceType || "business-bahrain"}
        initialItemName={title}
      />

      {/* Direct WhatsApp Order Form Modal */}
      <ProductOrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        title={title}
        categoryTag={categoryTag}
        heroImage={heroImage}
        startingPrice={startingPrice}
        startingPricePkr={startingPricePkr}
        startingPriceBhd={startingPriceBhd}
        serviceOptions={serviceOptions}
      />
    </section>
  );
}
