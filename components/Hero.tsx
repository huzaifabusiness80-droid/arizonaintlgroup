"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  Car,
  Building2,
  Smartphone,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Users,
  Search,
  Hotel,
  Globe2,
  ArrowUp,
  MessageCircle,
} from "lucide-react";
import { useGeoLocation } from "@/context/GeoContext";
import { useLanguage } from "@/context/LanguageContext";

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
    badgeHighlightEn: "Travel & Tours",
    badgeHighlightAr: "السياحة والسفر",
    titleEn: "Discover The World",
    titleAr: "استكشف أروع وجهات العالم",
    titleHighlightEn: "With Confidence",
    titleHighlightAr: "بكل ثقة واطمئنان",
    descriptionEn:
      "Flight tickets, worldwide visas, luxury holiday packages, 5-star hotel accommodations, and dedicated Umrah services tailored to perfection.",
    descriptionAr:
      "حجوزات طيران فورية، تأشيرات لجميع دول العالم، باقات عطلات سياحية فاخرة، إقامات فندقية 5 نجوم، ورحلات عمرة متكاملة بأعلى معايير الراحة.",
    primaryBtn: { textEn: "Explore Destinations", textAr: "استكشف الوجهات", href: "/services/travel-tours" },
    secondaryBtn: { textEn: "Plan Your Trip", textAr: "خطط لرحلتك", href: "/visas" },
    image: "/images/hero-airplane.jpg",
  },
  {
    id: "cars",
    categoryEn: "Car Rentals",
    categoryAr: "تأجير السيارات",
    icon: Car,
    badgeHighlightEn: "Car Rentals",
    badgeHighlightAr: "تأجير السيارات",
    titleEn: "Reliable Car Rental",
    titleAr: "تأجير سيارات موثوق",
    titleHighlightEn: "Wherever You Go",
    titleHighlightAr: "أينما كانت وجهتك",
    descriptionEn:
      "Daily, weekly, and monthly rentals. Premium luxury sedans, SUVs, self-drive fleet, and 24/7 airport pickup and transfer services.",
    descriptionAr:
      "تأجير يومي وأسبوعي وشهري. أسطول متنوع من سيارات السيدان الفاخرة وسيارات الدفع الرباعي وخدمات التوصيل من وإلى المطار على مدار 24 ساعة.",
    primaryBtn: { textEn: "Book Your Car", textAr: "احجز سيارتك الآن", href: "/services/rent-a-car" },
    secondaryBtn: { textEn: "Airport Transfers", textAr: "توصيل المطار", href: "/services/rent-a-car" },
    image: "/images/hero-cars.jpg",
  },
  {
    id: "bahrain",
    categoryEn: "Business in Bahrain",
    categoryAr: "الشركات بالبحرين",
    icon: Building2,
    badgeHighlightEn: "Business Setup",
    badgeHighlightAr: "تأسيس الأعمال",
    titleEn: "Build Your Business",
    titleAr: "أسس شركتك في البحرين",
    titleHighlightEn: "Own Your Future",
    titleHighlightAr: "بملكية أجنبية 100%",
    descriptionEn:
      "Complete business setup in Bahrain for local and global investors. Commercial Registration (CR), office with EWA, banking, and LMRA visa solutions.",
    descriptionAr:
      "تأسيس متكامل للشركات في مملكة البحرين للمستثمرين الدوليين. إصدار السجل التجاري (CR)، مكاتب موثقة مع EWA، فتح الحسابات البنكية وإقامات المستثمر.",
    primaryBtn: { textEn: "Start Business Setup", textAr: "ابدأ تأسيس شركتك", href: "/services/business-bahrain" },
    secondaryBtn: { textEn: "Free Consultation", textAr: "استشارة مجانية", href: "https://wa.me" },
    image: "/images/hero-bahrain.jpg",
  },
  {
    id: "mobiles",
    categoryEn: "Mobiles & Tech",
    categoryAr: "الهواتف والتكنولوجيا",
    icon: Smartphone,
    badgeHighlightEn: "Mobiles & Tech",
    badgeHighlightAr: "الهواتف والتقنية",
    titleEn: "Smartphones & Gadgets",
    titleAr: "أحدث الهواتف والإلكترونيات",
    titleHighlightEn: "Direct To Your Door",
    titleHighlightAr: "توصيل فوري لباب منزلك",
    descriptionEn:
      "Latest iPhone, Samsung Galaxy, and Google Pixel flagships. Fast GaN chargers, audio accessories, and same-day home delivery.",
    descriptionAr:
      "أحدث أجهزة الآيفون، سامسونج جالاكسي، وجوجل بكسل الأصلية 100%. شواحن GaN السريعة وملحقات الصوت مع توصيل سريع في نفس اليوم.",
    primaryBtn: { textEn: "Order on WhatsApp", textAr: "اطلب عبر الواتساب", href: "https://wa.me" },
    secondaryBtn: { textEn: "View Products", textAr: "عرض المنتجات", href: "/services/mobiles-tech" },
    image: "/images/hero-mobiles.jpg",
  },
];

import { WORLDWIDE_COUNTRIES, CountryItem } from "@/lib/countries";

export default function Hero() {
  const { isPakistan, contact } = useGeoLocation();
  const { language, isArabic, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [countryList, setCountryList] = useState<CountryItem[]>(WORLDWIDE_COUNTRIES);

  // Filter slides based on location
  const availableSlides = isPakistan
    ? servicesData
    : servicesData.filter((s) => s.id !== "cars" && s.id !== "mobiles");

  // Booking widget state
  const [bookingTab, setBookingTab] = useState<string>("travel");
  const [fromCity, setFromCity] = useState(isArabic ? "المنامة / كراتشي" : "Manama / Karachi");
  const [destination, setDestination] = useState("🇪🇸 Spain (Schengen)");
  const [date, setDate] = useState("2026-09-15");
  const [passengers, setPassengers] = useState("1 Adult");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,flag", { cache: "force-cache" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const mapped: CountryItem[] = data
              .map((c: any) => ({
                code: c.cca2,
                name: c.name?.common || c.name?.official || "",
                nameAr: c.name?.common || "",
                flag: c.flag || "🌐",
              }))
              .filter((c: CountryItem) => c.name.length > 0)
              .sort((a: CountryItem, b: CountryItem) => a.name.localeCompare(b.name));
            
            const priorityCodes = ["BH", "SA", "AE", "PK", "ES", "GB", "US", "CA", "MY", "TH", "TR"];
            const priority = WORLDWIDE_COUNTRIES.filter(c => priorityCodes.includes(c.code));
            const rest = mapped.filter((c: CountryItem) => !priorityCodes.includes(c.code));
            setCountryList([...priority, ...rest]);
          }
        }
      } catch {
        // Fallback default is already set to WORLDWIDE_COUNTRIES
      }
    };
    fetchCountries();
  }, []);

  const bookingTabs = [
    { id: "travel", labelEn: "FLIGHTS & UMRAH", labelAr: "الطيران والعمرة", icon: Plane },
    { id: "hotels", labelEn: "HOTELS & RESORTS", labelAr: "الفنادق والمنتجعات", icon: Hotel },
    { id: "visas", labelEn: "WORLDWIDE VISAS", labelAr: "تأشيرات السفر", icon: Globe2 },
    { id: "business", labelEn: "BUSINESS IN BAHRAIN", labelAr: "تأسيس الأعمال بالبحرين", icon: Building2 },
    ...(isPakistan ? [{ id: "cars", labelEn: "RENT A CAR", labelAr: "تأجير السيارات", icon: Car }] : []),
  ];

  // Auto-play slideshow
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % availableSlides.length);
    }, 6500);
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
    const query = `Hi Arizona, I want to inquire about ${bookingTab.toUpperCase()}. From: ${fromCity}, Destination: ${destination}, Date: ${date}, Details: ${passengers}`;
    // Save inquiry to Neon database
    fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `Lead via Booking Widget (${passengers})`,
        phone: "WhatsApp Inquirer",
        email: "booking-widget@arizonaintl.com",
        service: `Booking Widget: ${bookingTab.toUpperCase()}`,
        message: `From: ${fromCity} -> Destination: ${destination} | Travel Date: ${date} | Category/Passengers: ${passengers}`,
        country: destination,
      }),
    }).catch(() => {});
    window.open(contact.whatsappLink(query), "_blank");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const slideTitle = isArabic ? slide.titleAr : slide.titleEn;
  const slideTitleHighlight = isArabic ? slide.titleHighlightAr : slide.titleHighlightEn;
  const slideDesc = isArabic ? slide.descriptionAr : slide.descriptionEn;
  const slideBadge = isArabic ? slide.badgeHighlightAr : slide.badgeHighlightEn;
  const primaryText = isArabic ? slide.primaryBtn.textAr : slide.primaryBtn.textEn;
  const secondaryText = isArabic ? slide.secondaryBtn.textAr : slide.secondaryBtn.textEn;

  const resolveBtnHref = (href: string) => {
    if (href.startsWith("https://wa.me")) {
      return contact.whatsappLink(`Hi Arizona, I am interested in ${slide.titleEn}`);
    }
    return href;
  };

  const primaryHref = resolveBtnHref(slide.primaryBtn.href);
  const secondaryHref = resolveBtnHref(slide.secondaryBtn.href);

  return (
    <div className="relative w-full">
      {/* 1. Main Hero Carousel Stage */}
      <section className="relative w-full min-h-[580px] lg:min-h-[660px] flex flex-col justify-center bg-neutral-950 text-white overflow-hidden pb-24 sm:pb-32 pt-12 sm:pt-16">
        {/* Full-Bleed Background Images with AnimatePresence */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slideTitle}
                fill
                priority
                className="object-cover object-center filter brightness-90"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Cinematic Dark Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/50" />
        </div>

        {/* Content Box */}
        <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-4xl space-y-6">
            {/* Top Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${slide.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-normal uppercase tracking-wider shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-[#dfb141] ring-2 ring-[#dfb141]/30" />
                <span>{slideBadge}</span>
              </motion.div>
            </AnimatePresence>

            {/* Slide Title (Grand & Prominent) */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${slide.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-4xl sm:text-6xl lg:text-[64px] font-bold tracking-tight leading-[1.12] text-white"
              >
                {slideTitle} <br />
                <span className="text-[#dfb141] font-bold">{slideTitleHighlight}</span>
              </motion.h1>
            </AnimatePresence>

            {/* Slide Description (Large & Readable) */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${slide.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-base sm:text-lg lg:text-xl text-neutral-200 font-normal leading-relaxed max-w-2xl"
              >
                {slideDesc}
              </motion.p>
            </AnimatePresence>

            {/* Slide Action Buttons */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`btn-${slide.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex flex-wrap items-center gap-3.5 pt-2"
              >
                <Link
                  href={primaryHref}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#dfb141] hover:bg-[#c49725] text-white font-normal text-sm shadow-md transition-all active:scale-95 group"
                >
                  <span>{primaryText}</span>
                  <ArrowUpRight className={`w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${isArabic ? "rotate-[-90deg]" : ""}`} />
                </Link>

                <Link
                  href={secondaryHref}
                  className="inline-flex items-center px-7 py-3 rounded-full bg-black/40 hover:bg-white/20 text-white font-normal text-sm border border-white/30 backdrop-blur-md transition-all active:scale-95"
                >
                  {secondaryText}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Controls (Dots & Arrows) */}
        <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between mt-8 relative z-20">
          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {availableSlides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentSlide(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx
                    ? "w-8 bg-[#dfb141]"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/20 hover:border-white/50 bg-black/30 hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`} />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/20 hover:border-white/50 bg-black/30 hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Interactive Booking Widget Overlay Bar */}
      <div className="relative -mt-16 sm:-mt-28 z-30 w-full max-w-[1580px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-white rounded-3xl sm:rounded-[32px] shadow-2xl border border-neutral-200/90 p-5 sm:p-8">
          {/* Service Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-neutral-100 no-scrollbar">
            {bookingTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = bookingTab === tab.id;
              const tabLabel = isArabic ? tab.labelAr : tab.labelEn;

              return (
                <button
                  key={tab.id}
                  onClick={() => setBookingTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-normal whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#dfb141] text-white shadow-sm"
                      : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Search Fields Row */}
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center "
          >
            {/* Field 1: Departure City */}
            <div className="lg:col-span-3 p-3.5 rounded-2xl bg-[#f8f9fc] border border-neutral-200/80 hover:border-neutral-400 transition-colors">
              <label className="block text-[11px] font-normal uppercase tracking-wider text-neutral-500 mb-1">
                {t("widget.from")}
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#dfb141] shrink-0" />
                <input
                  type="text"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-normal text-neutral-900 focus:outline-none placeholder:text-neutral-400"
                  placeholder="Departure city"
                />
              </div>
            </div>

            {/* Field 2: Destination */}
            <div className="lg:col-span-3 p-3.5 rounded-2xl bg-[#f8f9fc] border border-neutral-200/80 hover:border-neutral-400 transition-colors">
              <label className="block text-[11px] font-normal uppercase tracking-wider text-neutral-500 mb-1">
                {t("widget.to")}
              </label>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#dfb141] shrink-0" />
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-normal text-neutral-900 focus:outline-none cursor-pointer max-h-48"
                >
                  {countryList.map((c) => (
                    <option key={`${c.code}-${c.name}`} value={`${c.flag} ${isArabic ? c.nameAr : c.name}`}>
                      {c.flag} {isArabic ? c.nameAr : c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field 3: Date */}
            <div className="lg:col-span-2 p-3.5 rounded-2xl bg-[#f8f9fc] border border-neutral-200/80 hover:border-neutral-400 transition-colors">
              <label className="block text-[11px] font-normal uppercase tracking-wider text-neutral-500 mb-1">
                {t("widget.departure")}
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#dfb141] shrink-0" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-normal text-neutral-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Field 4: Guests / Category */}
            <div className="lg:col-span-2 p-3.5 rounded-2xl bg-[#f8f9fc] border border-neutral-200/80 hover:border-neutral-400 transition-colors">
              <label className="block text-[11px] font-normal uppercase tracking-wider text-neutral-500 mb-1">
                {t("widget.passengers")}
              </label>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#dfb141] shrink-0" />
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-normal text-neutral-900 focus:outline-none cursor-pointer"
                >
                  <option value="1 Adult">1 Adult</option>
                  <option value="2 Adults">2 Adults</option>
                  <option value="Family (3+)">Family (3+)</option>
                  <option value="Corporate Group">Corporate Group</option>
                </select>
              </div>
            </div>

            {/* Field 5: Golden Search / Inquire Button */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-[#dfb141] hover:bg-[#c49725] text-white font-normal text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>{isArabic ? "بحث فوري" : "Search"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 3. Floating Bottom Action Buttons (WhatsApp + Scroll To Top) */}
      <div className={`fixed bottom-6 ${isArabic ? "left-6" : "right-6"} z-50 flex flex-col gap-3`}>
        {/* Scroll To Top Button */}
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-[#dfb141] hover:bg-[#c49725] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>

        {/* WhatsApp Floating Chat Button */}
        <a
          href={contact.whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-[#25d366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
        </a>
      </div>
    </div>
  );
}
