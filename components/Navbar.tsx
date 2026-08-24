"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Check,
  Menu,
  X,
  Phone,
  Mail,
  ArrowUpRight,
  Globe,
} from "lucide-react";
import { useGeoLocation } from "@/context/GeoContext";
import { useLanguage } from "@/context/LanguageContext";

interface NavCategory {
  titleKey: string;
  titleEn: string;
  titleAr: string;
  href: string;
  items?: { nameEn: string; nameAr: string; href: string }[];
}

const navCategories: NavCategory[] = [
  {
    titleKey: "nav.home",
    titleEn: "Home",
    titleAr: "الرئيسية",
    href: "/",
  },
  {
    titleKey: "nav.travel_tours",
    titleEn: "Travel & Tours",
    titleAr: "السياحة والسفر",
    href: "/services/travel-tours",
    items: [
      { nameEn: "Flight Ticket Booking", nameAr: "حجز تذاكر الطيران", href: "/services/travel-tours/flight-tickets" },
      { nameEn: "Hotels & Luxury Resorts", nameAr: "الفنادق والمنتجعات الفاخرة", href: "/services/travel-tours/hotels-resorts" },
      { nameEn: "Holiday & Honeymoon Packages", nameAr: "باقات العطلات وشهر العسل", href: "/services/travel-tours/holiday-escapes" },
      { nameEn: "Umrah & Religious Travel", nameAr: "رحلات العمرة والزيارات", href: "/services/travel-tours/umrah-spiritual" },
      { nameEn: "Desert Safaris & Adventures", nameAr: "رحلات السفاري والمغامرات", href: "/services/travel-tours/desert-safari" },
      { nameEn: "Worldwide Visa Services", nameAr: "خدمات التأشيرات العالمية", href: "/services/travel-tours/worldwide-visas" },
    ],
  },
  {
    titleKey: "nav.worldwide_visas",
    titleEn: "Worldwide Visas",
    titleAr: "تأشيرات حول العالم",
    href: "/visas",
    items: [
      { nameEn: "Kingdom of Bahrain eVisa", nameAr: "تأشيرة مملكة البحرين الإلكترونية", href: "/visas/bahrain" },
      { nameEn: "Schengen European Visas", nameAr: "تأشيرات الشنغن الأوروبية", href: "/visas/spain" },
      { nameEn: "United Kingdom (UK) Visa", nameAr: "تأشيرة المملكة المتحدة", href: "/visas/uk" },
      { nameEn: "United States (USA) Visa", nameAr: "تأشيرة الولايات المتحدة الأمريكية", href: "/visas/usa" },
      { nameEn: "Malaysia & Thailand", nameAr: "تأشيرات ماليزيا وتايلاند", href: "/visas/malaysia" },
      { nameEn: "Azerbaijan ASAN eVisa", nameAr: "تأشيرة أذربيجان الفورية", href: "/visas/azerbaijan" },
    ],
  },
  {
    titleKey: "nav.rent_a_car",
    titleEn: "Rent A Car",
    titleAr: "تأجير السيارات",
    href: "/services/rent-a-car",
    items: [
      { nameEn: "Daily & Weekly Rentals", nameAr: "تأجير يومي وأسبوعي", href: "/services/rent-a-car/daily-rentals" },
      { nameEn: "Airport Pickup & Transfers", nameAr: "توصيل واستقبال المطار", href: "/services/rent-a-car/airport-transfers" },
      { nameEn: "VIP Chauffeur Services", nameAr: "خدمة السائق الخاص VIP", href: "/services/rent-a-car/vip-chauffeur" },
      { nameEn: "Luxury SUVs & 4x4", nameAr: "سيارات الدفع الرباعي الفاخرة", href: "/services/rent-a-car/luxury-suvs" },
      { nameEn: "Wedding & Special Events", nameAr: "سيارات الأعراس والمناسبات", href: "/services/rent-a-car/wedding-events" },
    ],
  },
  {
    titleKey: "nav.business_bahrain",
    titleEn: "Business in Bahrain",
    titleAr: "تأسيس الشركات بالبحرين",
    href: "/services/business-bahrain",
    items: [
      { nameEn: "100% Foreign Ownership (CR)", nameAr: "ملكية أجنبية 100% (السجل التجاري)", href: "/services/business-bahrain/foreign-ownership-cr" },
      { nameEn: "Turnkey Office with EWA", nameAr: "مكتب مرخص مع الكهرباء والماء", href: "/services/business-bahrain/turnkey-office-ewa" },
      { nameEn: "Corporate Bank Account", nameAr: "فتح حساب بنكي تجاري", href: "/services/business-bahrain/corporate-bank-account" },
      { nameEn: "LMRA & Investor Visas", nameAr: "تأشيرات وإقامة المستثمر LMRA", href: "/services/business-bahrain/lmra-work-permits" },
      { nameEn: "CR Amendments & Renewals", nameAr: "تعديل وتجديد السجلات التجارية", href: "/services/business-bahrain/cr-amendments" },
      { nameEn: "VAT Registration & Tax", nameAr: "تسجيل ضريبة القيمة المضافة والمحاسبة", href: "/services/business-bahrain/vat-tax-accounting" },
    ],
  },
  {
    titleKey: "nav.mobiles_tech",
    titleEn: "Mobiles & Tech",
    titleAr: "الهواتف والتكنولوجيا",
    href: "/services/mobiles-tech",
    items: [
      { nameEn: "Flagship Smartphones", nameAr: "أحدث الهواتف الذكية المعتمدة", href: "/services/mobiles-tech/flagship-smartphones" },
      { nameEn: "Fast Chargers & GaN Cables", nameAr: "الشواحن السريعة وكابلات GaN", href: "/services/mobiles-tech/fast-chargers" },
      { nameEn: "Smartwatches & Wearables", nameAr: "الساعات الذكية والأجهزة القابلة للارتداء", href: "/services/mobiles-tech/smartwatches" },
      { nameEn: "Wireless Audio & Earbuds", nameAr: "السماعات اللاسلكية الأصلية", href: "/services/mobiles-tech/wireless-audio" },
    ],
  },
  {
    titleKey: "nav.about_us",
    titleEn: "About Us",
    titleAr: "من نحن",
    href: "/about",
  },
  {
    titleKey: "nav.contact",
    titleEn: "Contact",
    titleAr: "اتصل بنا",
    href: "/contact",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isPakistan, setCountryCode } = useGeoLocation();
  const { language, isArabic, setLanguage, toggleLanguage, t } = useLanguage();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Filter based on GeoLocation (Hide Rent A Car and Mobiles & Tech if outside Pakistan)
  const filteredNavCategories = isPakistan
    ? navCategories
    : navCategories.filter(
        (cat) => cat.titleEn !== "Rent A Car" && cat.titleEn !== "Mobiles & Tech"
      );

  return (
    <header className="w-full z-50 sticky top-0 bg-white shadow-xs">
      {/* 1. Golden Upper Top Announcement Bar (White Text, exact max-w matching navbar) */}
      <div className="w-full bg-[#dfb141] text-white border-b border-[#cca030]/60">
        <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-8 lg:px-12 py-2.5 flex items-center justify-between gap-4">
          {/* Left Contact: Phone & Email */}
          <div className="flex items-center gap-6 text-xs sm:text-[13px] font-medium tracking-wide">
            <a
              href="tel:+923135921434"
              className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              dir="ltr"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="font-semibold">+92 313 5921434</span>
            </a>
            <a
              href="mailto:info@arizonaintlgroup.com"
              className="hidden sm:inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              dir="ltr"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>info@arizonaintlgroup.com</span>
            </a>
          </div>

          {/* Right: Regional Selector & 4 Circular Social Icons Exact as Screenshot */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Regional Selector */}
            <div className="relative">
              <button
                onClick={() => setRegionOpen(!regionOpen)}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-black/15 hover:bg-black/25 text-white px-3 py-1 rounded-full cursor-pointer transition-colors"
              >
                <span>{isPakistan ? t("topbar.pakistan_view") : t("topbar.bahrain_view")}</span>
                <ChevronDown className="w-3 h-3 text-white" />
              </button>

              {regionOpen && (
                <div className={`absolute ${isArabic ? "left-0" : "right-0"} mt-1 w-52 bg-white text-neutral-900 rounded-xl shadow-xl p-1 z-50 border border-neutral-200 animate-fade-scale`}>
                  <button
                    onClick={() => {
                      setCountryCode("PK");
                      setRegionOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-neutral-100 flex items-center justify-between font-medium cursor-pointer"
                  >
                    <span>{t("topbar.pakistan_label")}</span>
                    {isPakistan && <Check className="w-3.5 h-3.5 text-[#dfb141]" />}
                  </button>
                  <button
                    onClick={() => {
                      setCountryCode("BH");
                      setRegionOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-neutral-100 flex items-center justify-between font-medium cursor-pointer"
                  >
                    <span>{t("topbar.bahrain_label")}</span>
                    {!isPakistan && <Check className="w-3.5 h-3.5 text-[#dfb141]" />}
                  </button>
                </div>
              )}
            </div>

            {/* 4 Social Circular Buttons Matching Screenshot */}
            <div className="flex items-center gap-2" dir="ltr">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#dfb141] flex items-center justify-center transition-all shadow-xs"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#dfb141] flex items-center justify-center transition-all shadow-xs"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/923135921434"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#dfb141] flex items-center justify-center transition-all shadow-xs"
                aria-label="WhatsApp"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#dfb141] flex items-center justify-center transition-all shadow-xs"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main White Navbar */}
      <div className="w-full bg-white border-b border-neutral-100">
        <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex flex-col group">
            <span className="text-2xl font-bold tracking-tight text-neutral-950 leading-none">
              ARIZONA
            </span>
            <span className="text-[9px] font-bold text-[#dfb141] tracking-[0.25em] uppercase mt-1">
              INTERNATIONAL GROUP
            </span>
          </Link>

          {/* Desktop Navigation Links with Dynamic Active Indicator */}
          <nav className="hidden xl:flex items-center gap-7">
            {filteredNavCategories.map((cat) => {
              const catTitle = isArabic ? cat.titleAr : cat.titleEn;
              const hasDropdown = Boolean(cat.items && cat.items.length > 0);
              const isOpen = activeDropdown === cat.titleEn;
              const isActive =
                cat.href === "/"
                  ? pathname === "/"
                  : pathname === cat.href || pathname.startsWith(`${cat.href}/`);

              return (
                <div
                  key={cat.titleEn}
                  className="relative py-4"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(cat.titleEn)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={cat.href}
                    className={`inline-flex items-center gap-1 text-[13.5px] transition-colors relative py-1 ${
                      isActive
                        ? "text-[#dfb141] font-bold"
                        : "text-neutral-700 hover:text-[#dfb141] font-medium"
                    }`}
                  >
                    <span>{catTitle}</span>
                    {hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          isOpen ? "rotate-180 text-[#dfb141]" : "text-neutral-400"
                        }`}
                      />
                    )}

                    {/* Active Underline Indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#dfb141] rounded-full" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {hasDropdown && isOpen && (
                    <div className={`absolute ${isArabic ? "right-0" : "left-0"} top-full -mt-1 w-64 bg-white rounded-2xl shadow-2xl border border-neutral-100 p-2.5 z-50 animate-fade-scale`}>
                      <Link
                        href={cat.href}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between px-3 py-2 mb-1 border-b border-neutral-100 group"
                      >
                        <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider group-hover:text-[#dfb141] transition-colors">
                          {catTitle}
                        </span>
                        <ArrowUpRight className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-950 ${isArabic ? "rotate-[-90deg]" : ""}`} />
                      </Link>

                      <div className="space-y-0.5">
                        {cat.items?.map((sub) => {
                          const subName = isArabic ? sub.nameAr : sub.nameEn;
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.nameEn}
                              href={sub.href}
                              onClick={() => setActiveDropdown(null)}
                              className={`block px-3 py-2 text-xs rounded-xl transition-colors ${
                                isSubActive
                                  ? "bg-[#dfb141]/10 text-[#dfb141] font-bold"
                                  : "text-neutral-700 hover:text-[#dfb141] hover:bg-neutral-50 font-medium"
                              }`}
                            >
                              {subName}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action: Language Switcher (Replaced Sign In) & Golden "Book Now" Button */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 hover:border-neutral-400 bg-neutral-50 hover:bg-white text-xs font-semibold text-neutral-800 transition-all cursor-pointer shadow-2xs"
              >
                <Globe className="w-3.5 h-3.5 text-[#dfb141]" />
                <span>{isArabic ? "🇸🇦 العربية" : "🇺🇸 English"}</span>
                <ChevronDown className="w-3 h-3 text-neutral-500" />
              </button>

              {langDropdownOpen && (
                <div className={`absolute ${isArabic ? "left-0" : "right-0"} mt-2 w-36 bg-white text-neutral-900 rounded-xl shadow-xl p-1 z-50 border border-neutral-200 animate-fade-scale`}>
                  <button
                    onClick={() => {
                      setLanguage("en");
                      setLangDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-neutral-100 flex items-center justify-between font-medium cursor-pointer"
                  >
                    <span>🇺🇸 English</span>
                    {!isArabic && <Check className="w-3.5 h-3.5 text-[#dfb141]" />}
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("ar");
                      setLangDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-neutral-100 flex items-center justify-between font-medium cursor-pointer"
                  >
                    <span>🇸🇦 العربية</span>
                    {isArabic && <Check className="w-3.5 h-3.5 text-[#dfb141]" />}
                  </button>
                </div>
              )}
            </div>

            {/* Book Now Golden Button */}
            <a
              href="https://wa.me/923135921434"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-[#dfb141] hover:bg-[#c49725] text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              {t("nav.book_now")}
            </a>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-neutral-800 hover:bg-neutral-100 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-neutral-200 px-6 py-6 space-y-4 animate-fade-scale max-h-[80vh] overflow-y-auto">
          {/* Mobile Language Switcher Row */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <span className="text-xs font-bold text-neutral-700">{t("nav.language")}:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  !isArabic ? "bg-[#dfb141] text-white" : "bg-neutral-100 text-neutral-700"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("ar")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  isArabic ? "bg-[#dfb141] text-white" : "bg-neutral-100 text-neutral-700"
                }`}
              >
                العربية
              </button>
            </div>
          </div>

          {filteredNavCategories.map((cat) => {
            const catTitle = isArabic ? cat.titleAr : cat.titleEn;
            const isActive =
              cat.href === "/"
                ? pathname === "/"
                : pathname === cat.href || pathname.startsWith(`${cat.href}/`);

            return (
              <div key={cat.titleEn} className="border-b border-neutral-100 pb-2">
                <Link
                  href={cat.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-1.5 text-sm font-semibold transition-colors ${
                    isActive ? "text-[#dfb141]" : "text-neutral-900 hover:text-[#dfb141]"
                  }`}
                >
                  {catTitle}
                </Link>
                {cat.items && (
                  <div className={`${isArabic ? "pr-4" : "pl-4"} space-y-1 mt-1`}>
                    {cat.items.map((sub) => {
                      const subName = isArabic ? sub.nameAr : sub.nameEn;
                      return (
                        <Link
                          key={sub.nameEn}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-xs text-neutral-600 hover:text-[#dfb141]"
                        >
                          {subName}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-3">
            <a
              href="https://wa.me/923135921434"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center py-3 rounded-full bg-[#dfb141] hover:bg-[#c49725] text-white text-xs font-bold"
            >
              {t("nav.book_now")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
