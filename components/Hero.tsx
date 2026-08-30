"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  Car,
  Building2,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Users,
  Search,
  Hotel,
  Globe2,
  Smartphone,
} from "lucide-react";
import { useGeoLocation } from "@/context/GeoContext";
import { useLanguage } from "@/context/LanguageContext";
import CountrySearchInput from "@/components/CountrySearchInput";

export interface ServiceSlide {
  id: string;
  categoryEn: string;
  categoryAr: string;
  icon: any;
  badgeHighlightEn: string;
  badgeHighlightAr: string;
  titleEn: string;
  titleAr: string;
  titleHighlightEn: string;
  titleHighlightAr: string;
  descriptionEn: string;
  descriptionAr: string;
  primaryBtn: { textEn: string; textAr: string; href: string };
  secondaryBtn: { textEn: string; textAr: string; href: string };
  image: string;
}

const servicesData: ServiceSlide[] = [
  {
    id: "travel",
    categoryEn: "Travel & Tours",
    categoryAr: "السياحة والسفر",
    icon: Plane,
    badgeHighlightEn: "Global Travel & Visa Facilitation",
    badgeHighlightAr: "السياحة والسفر والتأشيرات",
    titleEn: "Discover The World",
    titleAr: "استكشف أروع وجهات العالم",
    titleHighlightEn: "With Global Excellence",
    titleHighlightAr: "بأعلى معايير التميز",
    descriptionEn:
      "Flight tickets, worldwide visas, luxury holiday packages, 5-star hotel accommodations, and dedicated Umrah services tailored to perfection.",
    descriptionAr:
      "حجوزات طيران فورية، تأشيرات لجميع دول العالم، باقات عطلات سياحية فاخرة، إقامات فندقية 5 نجوم، ورحلات عمرة متكاملة بأعلى معايير الراحة.",
    primaryBtn: { textEn: "Explore Destinations", textAr: "استكشف الوجهات", href: "/services/travel-tours" },
    secondaryBtn: { textEn: "Plan Your Trip", textAr: "خطط لرحلتك", href: "/visas" },
    image: "/images/hero-airplane.jpg",
  },
  {
    id: "bahrain",
    categoryEn: "Business in Bahrain",
    categoryAr: "الشركات بالبحرين",
    icon: Building2,
    badgeHighlightEn: "Corporate Establishment in Bahrain",
    badgeHighlightAr: "تأسيس الأعمال في البحرين",
    titleEn: "Build Your Business",
    titleAr: "أسس شركتك في البحرين",
    titleHighlightEn: "With 100% Ownership",
    titleHighlightAr: "بملكية أجنبية 100%",
    descriptionEn:
      "Complete business setup in Bahrain for local and global investors. Commercial Registration (CR), office with EWA, banking, and LMRA visa solutions.",
    descriptionAr:
      "تأسيس متكامل للشركات في مملكة البحرين للمستثمرين الدوليين. إصدار السجل التجاري (CR)، مكاتب موثقة مع EWA، فتح الحسابات البنكية وإقامات المستثمر.",
    primaryBtn: { textEn: "Start Company in Bahrain", textAr: "ابدأ شركتك الآن", href: "/services/business-bahrain" },
    secondaryBtn: { textEn: "View Corporate Services", textAr: "خدمات الشركات", href: "/services/business-bahrain" },
    image: "/images/hero-bahrain.jpg",
  },
  {
    id: "cars",
    categoryEn: "Rent A Car",
    categoryAr: "تأجير السيارات",
    icon: Car,
    badgeHighlightEn: "Luxury Mobility & Transfers",
    badgeHighlightAr: "تأجير السيارات الفاخرة",
    titleEn: "Premium Car Rentals",
    titleAr: "تأجير سيارات فاخرة",
    titleHighlightEn: "& Chauffeur Fleet",
    titleHighlightAr: "وخدمة السائق الخاص",
    descriptionEn:
      "Modern fleet ranging from economical sedans to luxury SUVs and executive chauffeur services for corporate travel and airport transfers.",
    descriptionAr:
      "أسطول سيارات حديث ومتنوع من سيارات السيدان الاقتصادية إلى سيارات الدفع الرباعي الفاخرة وخدمات السائق الخاص والتوصيل للمطار.",
    primaryBtn: { textEn: "Explore Fleet", textAr: "استعرض الأسطول", href: "/services/rent-a-car" },
    secondaryBtn: { textEn: "Book Airport Transfer", textAr: "حجز توصيل المطار", href: "/services/rent-a-car" },
    image: "/images/hero-car.jpg",
  },
  {
    id: "mobiles",
    categoryEn: "Mobiles & Tech",
    categoryAr: "الهواتف والتكنولوجيا",
    icon: Smartphone,
    badgeHighlightEn: "Authorized Flagship Tech",
    badgeHighlightAr: "أجهزة أصلية معتمدة 100%",
    titleEn: "Flagship Smartphones",
    titleAr: "أحدث الهواتف الذكية",
    titleHighlightEn: "& Fast GaN Tech",
    titleHighlightAr: "والشواحن السريعة المعتمدة",
    descriptionEn:
      "Original Apple iPhones, Samsung Galaxy, and Google Pixel devices with express delivery, official warranties, and high-speed GaN charging solutions.",
    descriptionAr:
      "أحدث هواتف آبل آيفون وسامسونج جالاكسي الأصلية مع ضمان الوكيل المعتمد، شواحن GaN السريعة وتوصيل فوري لكافة المناطق.",
    primaryBtn: { textEn: "Explore Tech & Phones", textAr: "استعرض الهواتف والأجهزة", href: "/services/mobiles-tech" },
    secondaryBtn: { textEn: "View Accessories", textAr: "ملحقات وشواحن", href: "/services/mobiles-tech" },
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1920&q=85&auto=format&fit=crop",
  },
];

export default function Hero() {
  const { isPakistan, contact } = useGeoLocation();
  const { isArabic, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [bookingTab, setBookingTab] = useState<string>("travel");
  const [fromCity, setFromCity] = useState("Islamabad, Pakistan");
  const [destination, setDestination] = useState("Bahrain");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1 Adult");

  // Mobiles & Tech dedicated selector states
  const [mobileBrand, setMobileBrand] = useState("Apple iPhone 16 / 15 Pro");
  const [mobileStorage, setMobileStorage] = useState("256GB (Recommended)");
  const [mobileCity, setMobileCity] = useState("Islamabad / Rawalpindi (Same Day)");
  const [mobilePta, setMobilePta] = useState("Official PTA Approved (Box Packed)");

  const availableSlides = isPakistan
    ? servicesData
    : servicesData.filter((s) => s.id !== "cars" && s.id !== "mobiles");

  const bookingTabs = [
    { id: "travel", labelEn: "FLIGHTS & UMRAH", labelAr: "الطيران والعمرة", icon: Plane },
    { id: "visas", labelEn: "WORLDWIDE VISAS", labelAr: "تأشيرات السفر", icon: Globe2 },
    { id: "business", labelEn: "BUSINESS IN BAHRAIN", labelAr: "تأسيس الأعمال بالبحرين", icon: Building2 },
    { id: "hotels", labelEn: "HOTELS & RESORTS", labelAr: "الفنادق والمنتجعات", icon: Hotel },
    ...(isPakistan ? [{ id: "cars", labelEn: "RENT A CAR", labelAr: "تأجير السيارات", icon: Car }] : []),
    ...(isPakistan ? [{ id: "mobiles", labelEn: "MOBILES & TECH", labelAr: "الهواتف والتكنولوجيا", icon: Smartphone }] : []),
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % availableSlides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, availableSlides.length]);

  const slide = availableSlides[currentSlide] || availableSlides[0];

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev === 0 ? availableSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % availableSlides.length);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let query = "";
    let inquiryService = `Booking Widget: ${bookingTab.toUpperCase()}`;
    let inquiryMsg = "";

    if (bookingTab === "mobiles") {
      query = `Hello Arizona International Group,\n\nI want to check price & order for Mobiles & Tech:\n- Device / Model: ${mobileBrand}\n- Storage / Variant: ${mobileStorage}\n- Delivery City: ${mobileCity}\n- Status & Warranty: ${mobilePta}`;
      inquiryService = `Mobiles & Tech: ${mobileBrand}`;
      inquiryMsg = `Model: ${mobileBrand} | Storage: ${mobileStorage} | City: ${mobileCity} | Status: ${mobilePta}`;
    } else {
      query = `Hello Arizona International Group, I would like to inquire about ${bookingTab.toUpperCase()} services.\nFrom: ${fromCity}\nDestination: ${destination}\nTravel Date: ${date || "Flexible"}\nGuests/Details: ${passengers}`;
      inquiryMsg = `From: ${fromCity} -> Destination: ${destination} | Travel Date: ${date} | Category/Passengers: ${passengers}`;
    }

    fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `Lead via Widget (${bookingTab === "mobiles" ? mobileBrand : passengers})`,
        phone: "WhatsApp Inquirer",
        email: "booking-widget@arizonaintl.com",
        service: inquiryService,
        message: inquiryMsg,
        country: destination,
      }),
    }).catch(() => {});
    window.open(contact.whatsappLink(query), "_blank");
  };

  const slideTitle = isArabic ? slide.titleAr : slide.titleEn;
  const slideTitleHighlight = isArabic ? slide.titleHighlightAr : slide.titleHighlightEn;
  const slideDesc = isArabic ? slide.descriptionAr : slide.descriptionEn;
  const slideBadge = isArabic ? slide.badgeHighlightAr : slide.badgeHighlightEn;
  const primaryText = isArabic ? slide.primaryBtn.textAr : slide.primaryBtn.textEn;
  const secondaryText = isArabic ? slide.secondaryBtn.textAr : slide.secondaryBtn.textEn;

  return (
    <div className="relative w-full">
      {/* 1. Main Hero Carousel Stage */}
      <section className="relative w-full min-h-[560px] sm:min-h-[620px] lg:min-h-[660px] flex flex-col justify-center bg-slate-950 text-white overflow-hidden pb-28 sm:pb-36 pt-14 sm:pt-20">
        {/* Background Images */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slideTitle}
                fill
                priority
                className="object-cover object-center filter brightness-75"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />
        </div>

        {/* Content Box */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-5">
            {/* Top Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${slide.id}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-slate-100 text-xs font-semibold tracking-wide"
              >
                <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                <span>{slideBadge}</span>
              </motion.div>
            </AnimatePresence>

            {/* Slide Title */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${slide.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="text-3xl sm:text-5xl lg:text-[58px] font-semibold tracking-tight leading-[1.15] text-white"
              >
                {slideTitle} <br />
                <span className="text-[#3b82f6]">{slideTitleHighlight}</span>
              </motion.h1>
            </AnimatePresence>

            {/* Slide Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${slide.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-sm sm:text-base lg:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl"
              >
                {slideDesc}
              </motion.p>
            </AnimatePresence>

            {/* Action Buttons */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`btn-${slide.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
                <Link
                  href={slide.primaryBtn.href}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md group cursor-pointer"
                >
                  <span>{primaryText}</span>
                  <ArrowUpRight className={`w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${isArabic ? "rotate-[-90deg]" : ""}`} />
                </Link>

                <Link
                  href={slide.secondaryBtn.href}
                  className="inline-flex items-center px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-100 font-semibold text-xs sm:text-sm border border-slate-700 backdrop-blur-md transition-all duration-200 cursor-pointer"
                >
                  {secondaryText}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between mt-8 relative z-20">
          {/* Indicator Dots */}
          <div className="flex items-center gap-1.5">
            {availableSlides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentSlide(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx
                    ? "w-6 bg-[#3b82f6]"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className={`w-3.5 h-3.5 ${isArabic ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Interactive Booking Widget */}
      <div className="relative -mt-10 sm:-mt-16 z-30 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#0d1527] rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-lg dark:shadow-2xl transition-colors">
          {/* Service Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 border-b border-slate-100 dark:border-slate-800/80 no-scrollbar">
            {bookingTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = bookingTab === tab.id;
              const tabLabel = isArabic ? tab.labelAr : tab.labelEn;

              return (
                <button
                  key={tab.id}
                  onClick={() => setBookingTab(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#2563eb] text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Search Fields Row */}
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 items-center mt-3"
          >
            {/* Field 1: Device / Departure */}
            <div className="lg:col-span-3">
              {bookingTab === "mobiles" ? (
                <div className="p-2.5 rounded-md bg-slate-50 dark:bg-[#080d1a] border border-slate-200 dark:border-slate-800/90 focus-within:border-[#2563eb] dark:focus-within:border-[#3b82f6] transition-colors">
                  <label className="block text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
                    {isArabic ? "الموديل أو الجهاز" : "Select Device / Model"}
                  </label>
                  <div className="flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-[#2563eb] dark:text-[#60a5fa] shrink-0" />
                    <select
                      value={mobileBrand}
                      onChange={(e) => setMobileBrand(e.target.value)}
                      className="w-full bg-transparent text-xs font-medium text-slate-900 dark:text-white focus:outline-none cursor-pointer [&>option]:bg-white [&>option]:dark:bg-[#0d1527] [&>option]:text-slate-900 [&>option]:dark:text-white"
                    >
                      <option value="Apple iPhone 16 / 16 Pro Max">Apple iPhone 16 / 16 Pro Max</option>
                      <option value="Apple iPhone 15 / 15 Pro Max">Apple iPhone 15 / 15 Pro Max</option>
                      <option value="Samsung Galaxy S24 Ultra">Samsung Galaxy S24 Ultra</option>
                      <option value="Samsung Galaxy Z Fold / Flip">Samsung Galaxy Z Fold / Flip</option>
                      <option value="Google Pixel 9 / 9 Pro">Google Pixel 9 / 9 Pro</option>
                      <option value="GaN Fast Chargers & 100W PD Cables">GaN Fast Chargers & 100W PD Cables</option>
                      <option value="Apple Watch & Smartwatches">Apple Watch & Smartwatches</option>
                      <option value="AirPods Pro & Galaxy Buds">AirPods Pro & Galaxy Buds</option>
                    </select>
                  </div>
                </div>
              ) : (
                <CountrySearchInput
                  label={t("widget.from")}
                  value={fromCity}
                  onChange={(val) => setFromCity(val)}
                  placeholder={isArabic ? "بلد أو مدينة المغادرة..." : "Departure country / city..."}
                  icon={MapPin}
                  id="hero-from-country"
                />
              )}
            </div>

            {/* Field 2: Storage / Destination */}
            <div className="lg:col-span-3">
              {bookingTab === "mobiles" ? (
                <div className="p-2.5 rounded-md bg-slate-50 dark:bg-[#080d1a] border border-slate-200 dark:border-slate-800/90 focus-within:border-[#2563eb] dark:focus-within:border-[#3b82f6] transition-colors">
                  <label className="block text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
                    {isArabic ? "السعة والنوع" : "Storage / Variant"}
                  </label>
                  <div className="flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-[#2563eb] dark:text-[#60a5fa] shrink-0" />
                    <select
                      value={mobileStorage}
                      onChange={(e) => setMobileStorage(e.target.value)}
                      className="w-full bg-transparent text-xs font-medium text-slate-900 dark:text-white focus:outline-none cursor-pointer [&>option]:bg-white [&>option]:dark:bg-[#0d1527] [&>option]:text-slate-900 [&>option]:dark:text-white"
                    >
                      <option value="128 GB">128 GB</option>
                      <option value="256 GB (Recommended)">256 GB (Recommended)</option>
                      <option value="512 GB">512 GB</option>
                      <option value="1 TB (Max Storage)">1 TB (Max Storage)</option>
                      <option value="65W/100W GaN Fast Charger">65W / 100W GaN Fast Charger</option>
                      <option value="Charger + Armor Case Bundle">Charger + Armor Case Bundle</option>
                    </select>
                  </div>
                </div>
              ) : (
                <CountrySearchInput
                  label={t("widget.to")}
                  value={destination}
                  onChange={(val) => setDestination(val)}
                  placeholder={isArabic ? "بلد أو وجهة السفر..." : "Destination country..."}
                  icon={Globe2}
                  id="hero-to-country"
                />
              )}
            </div>

            {/* Field 3: Delivery City / Departure Date */}
            <div className="lg:col-span-2 p-2.5 rounded-md bg-slate-50 dark:bg-[#080d1a] border border-slate-200 dark:border-slate-800/90 focus-within:border-[#2563eb] dark:focus-within:border-[#3b82f6] transition-colors">
              <label className="block text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
                {bookingTab === "mobiles" ? (isArabic ? "مدينة التوصيل" : "Delivery City") : t("widget.departure")}
              </label>
              <div className="flex items-center gap-1.5">
                {bookingTab === "mobiles" ? (
                  <>
                    <MapPin className="w-3.5 h-3.5 text-[#2563eb] dark:text-[#60a5fa] shrink-0" />
                    <select
                      value={mobileCity}
                      onChange={(e) => setMobileCity(e.target.value)}
                      className="w-full bg-transparent text-xs font-medium text-slate-900 dark:text-white focus:outline-none cursor-pointer [&>option]:bg-white [&>option]:dark:bg-[#0d1527] [&>option]:text-slate-900 [&>option]:dark:text-white"
                    >
                      <option value="Islamabad / Rawalpindi (Same Day)">Islamabad / Rawalpindi</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="All Pakistan Express Delivery">All Pakistan Delivery</option>
                    </select>
                  </>
                ) : (
                  <>
                    <Calendar className="w-3.5 h-3.5 text-[#2563eb] dark:text-[#60a5fa] shrink-0" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-transparent text-xs font-normal text-slate-900 dark:text-white dark:[color-scheme:dark] focus:outline-none"
                    />
                  </>
                )}
              </div>
            </div>

            {/* Field 4: Status / Passengers */}
            <div className="lg:col-span-2 p-2.5 rounded-md bg-slate-50 dark:bg-[#080d1a] border border-slate-200 dark:border-slate-800/90 focus-within:border-[#2563eb] dark:focus-within:border-[#3b82f6] transition-colors">
              <label className="block text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
                {bookingTab === "mobiles" ? (isArabic ? "الحالة والضمان" : "Condition & Status") : t("widget.passengers")}
              </label>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#2563eb] dark:text-[#60a5fa] shrink-0" />
                <select
                  value={bookingTab === "mobiles" ? mobilePta : passengers}
                  onChange={(e) => {
                    if (bookingTab === "mobiles") {
                      setMobilePta(e.target.value);
                    } else {
                      setPassengers(e.target.value);
                    }
                  }}
                  className="w-full bg-transparent text-xs font-medium text-slate-900 dark:text-white focus:outline-none cursor-pointer [&>option]:bg-white [&>option]:dark:bg-[#0d1527] [&>option]:text-slate-900 [&>option]:dark:text-white"
                >
                  {bookingTab === "mobiles" ? (
                    <>
                      <option value="Official PTA Approved (Box Packed)">Official PTA Approved</option>
                      <option value="Non-PTA (Physical Dual SIM)">Non-PTA Physical Dual</option>
                      <option value="1 Year Official Brand Warranty">1 Year Official Warranty</option>
                      <option value="Wholesale / Corporate Bulk">Wholesale Bulk Order</option>
                    </>
                  ) : (
                    <>
                      <option value="1 Adult">1 Adult</option>
                      <option value="2 Adults">2 Adults</option>
                      <option value="Family (3+)">Family (3+)</option>
                      <option value="Corporate Group">Corporate Group</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-3.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{bookingTab === "mobiles" ? (isArabic ? "طلب وتأكيد" : "Check Price & Order") : (isArabic ? "بحث فوري" : "Search")}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
