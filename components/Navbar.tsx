"use client";

import React, { useState, useEffect } from "react";
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
  Building2,
  Plane,
  Compass,
  Car,
  Layers,
  Smartphone,
  Sliders,
  User,
  LogOut,
  LayoutDashboard,
  Sun,
  Moon,
} from "lucide-react";
import { useGeoLocation } from "@/context/GeoContext";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const pathname = usePathname();
  const { isPakistan, setCountryCode, contact } = useGeoLocation();
  const { language, setLanguage, isArabic, t } = useLanguage();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [regionOpen, setRegionOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Close menus on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const serviceSections = [
    {
      titleEn: "Business in Bahrain (CR)",
      titleAr: "تأسيس الشركات بالبحرين",
      href: "/services/business-bahrain",
      icon: Building2,
      items: [
        { nameEn: "100% Foreign Ownership (CR)", nameAr: "ملكية أجنبية 100% (السجل التجاري)", href: "/services/business-bahrain/foreign-ownership-cr" },
        { nameEn: "Workload & Inspection Clearance", nameAr: "إزالة مخالفات العمل والتفتيش", href: "/services/business-bahrain/workload-offense" },
        { nameEn: "Turnkey Office with EWA", nameAr: "مكتب مرخص مع الكهرباء والماء", href: "/services/business-bahrain/turnkey-office-ewa" },
        { nameEn: "LMRA & Investor Visas", nameAr: "تأشيرات وإقامة المستثمر LMRA", href: "/services/business-bahrain/lmra-work-permits" },
      ],
    },
    {
      titleEn: "Worldwide Visas",
      titleAr: "التأشيرات العالمية",
      href: "/visas",
      icon: Compass,
      items: [
        { nameEn: "Kingdom of Bahrain eVisa", nameAr: "تأشيرة مملكة البحرين الإلكترونية", href: "/visas/bahrain" },
        { nameEn: "Schengen European Visas", nameAr: "تأشيرات الشنغن الأوروبية", href: "/visas/spain" },
        { nameEn: "United Kingdom (UK) Visa", nameAr: "تأشيرة المملكة المتحدة", href: "/visas/uk" },
        { nameEn: "USA & Canada Visas", nameAr: "تأشيرات أمريكا وكندا", href: "/visas/usa" },
      ],
    },
    {
      titleEn: "Travel & Tours",
      titleAr: "السياحة والسفر",
      href: "/services/travel-tours",
      icon: Plane,
      items: [
        { nameEn: "Flight Ticket Booking", nameAr: "حجز تذاكر الطيران", href: "/services/travel-tours/flight-tickets" },
        { nameEn: "Hotels & Luxury Resorts", nameAr: "الفنادق والمنتجعات الفاخرة", href: "/services/travel-tours/hotels-resorts" },
        { nameEn: "Umrah & Religious Travel", nameAr: "رحلات العمرة والزيارات", href: "/services/travel-tours/umrah-spiritual" },
        { nameEn: "Holiday & Honeymoon Packages", nameAr: "باقات العطلات وشهر العسل", href: "/services/travel-tours/holiday-escapes" },
      ],
    },
    ...(isPakistan
      ? [
          {
            titleEn: "Rent A Car",
            titleAr: "تأجير السيارات",
            href: "/services/rent-a-car",
            icon: Car,
            items: [
              { nameEn: "Daily & Monthly Rentals", nameAr: "تأجير يومي وشهري", href: "/services/rent-a-car/daily-rentals" },
              { nameEn: "Airport Pickup & Transfers", nameAr: "توصيل واستقبال المطار", href: "/services/rent-a-car/airport-transfers" },
              { nameEn: "VIP Chauffeur Service", nameAr: "خدمة السائق الخاص VIP", href: "/services/rent-a-car/vip-chauffeur" },
              { nameEn: "Intercity & Executive Fleet", nameAr: "توصيل بين المدن وأسطول تنفيذي", href: "/services/rent-a-car/intercity-transfers" },
            ],
          },
          {
            titleEn: "Mobiles & Tech",
            titleAr: "الهواتف والتكنولوجيا",
            href: "/services/mobiles-tech",
            icon: Smartphone,
            items: [
              { nameEn: "Flagship Smartphones", nameAr: "أحدث الهواتف الذكية", href: "/services/mobiles-tech/flagship-smartphones" },
              { nameEn: "Fast Chargers & GaN Cables", nameAr: "شواحن سريعة وكابلات GaN", href: "/services/mobiles-tech/fast-chargers" },
              { nameEn: "Smartwatches & Wearables", nameAr: "ساعات ذكية وأجهزة ذكية", href: "/services/mobiles-tech/smartwatches" },
              { nameEn: "Wireless Audio & Earbuds", nameAr: "سماعات لاسلكية عازلة للضوضاء", href: "/services/mobiles-tech/wireless-audio" },
            ],
          },
        ]
      : []),
  ];

  return (
    <header className="w-full z-50 sticky top-0 bg-white/95 dark:bg-[#0b1120]/95 backdrop-blur-md transition-colors shadow-none border-none">
      {/* 1. Executive Slate Upper Top Announcement Bar */}
      <div className="w-full bg-[#0f172a] text-slate-300 text-[12px]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Left Contact */}
          <div className="flex items-center gap-4 font-normal tracking-tight">
            <a
              href={`tel:${contact.phoneTel}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              dir="ltr"
            >
              <Phone className="w-3.5 h-3.5 text-[#3b82f6]" />
              <span>{contact.phone}</span>
            </a>
            <a
              href={contact.emailLink}
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors"
              dir="ltr"
            >
              <Mail className="w-3.5 h-3.5 text-[#3b82f6]" />
              <span>{contact.email}</span>
            </a>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Regional Selector */}
            <div className="relative">
              <button
                onClick={() => setRegionOpen(!regionOpen)}
                className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-0.5 rounded-md border border-slate-700 cursor-pointer transition-colors"
              >
                <span>{isPakistan ? t("topbar.pakistan_view") : t("topbar.bahrain_view")}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {regionOpen && (
                <div className={`absolute ${isArabic ? "left-0" : "right-0"} mt-1.5 w-44 bg-white text-slate-900 rounded-lg shadow-lg p-1 z-50 border border-slate-200`}>
                  <button
                    onClick={() => {
                      setCountryCode("PK");
                      setRegionOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs rounded-md hover:bg-slate-50 flex items-center justify-between font-normal cursor-pointer"
                  >
                    <span>{t("topbar.pakistan_label")}</span>
                    {isPakistan && <Check className="w-3.5 h-3.5 text-[#2563eb]" />}
                  </button>
                  <button
                    onClick={() => {
                      setCountryCode("BH");
                      setRegionOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs rounded-md hover:bg-slate-50 flex items-center justify-between font-normal cursor-pointer"
                  >
                    <span>{t("topbar.bahrain_label")}</span>
                    {!isPakistan && <Check className="w-3.5 h-3.5 text-[#2563eb]" />}
                  </button>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-0.5 rounded-md border border-slate-700 cursor-pointer transition-colors"
              >
                <Globe className="w-3 h-3 text-[#3b82f6]" />
                <span>{language === "ar" ? "العربية" : "EN"}</span>
              </button>

              {langOpen && (
                <div className={`absolute ${isArabic ? "left-0" : "right-0"} mt-1.5 w-32 bg-white text-slate-900 rounded-lg shadow-lg p-1 z-50 border border-slate-200`}>
                  <button
                    onClick={() => {
                      setLanguage("en");
                      setLangOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs rounded-md hover:bg-slate-50 flex items-center justify-between font-normal cursor-pointer"
                  >
                    <span>English</span>
                    {language === "en" && <Check className="w-3.5 h-3.5 text-[#2563eb]" />}
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("ar");
                      setLangOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs rounded-md hover:bg-slate-50 flex items-center justify-between font-normal cursor-pointer"
                  >
                    <span>العربية</span>
                    {language === "ar" && <Check className="w-3.5 h-3.5 text-[#2563eb]" />}
                  </button>
                </div>
              )}
            </div>
            {/* Theme Toggle in Topbar */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="inline-flex items-center justify-center p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer transition-colors"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-slate-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Minimalist Navbar */}
      <div className="w-full bg-white/95 dark:bg-[#0b1120]/95 backdrop-blur-md transition-colors">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group py-1 shrink-0">
            <img
              src="/arizona-logo.png"
              alt="Arizona International Group"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            <Link
              href="/"
              className={`text-xs xl:text-sm font-medium transition-colors ${
                pathname === "/" ? "text-[#2563eb]" : "text-slate-700 dark:text-slate-200 hover:text-[#2563eb] dark:hover:text-[#3b82f6]"
              }`}
            >
              {isArabic ? "الرئيسية" : "Home"}
            </Link>

            <Link
              href="/about"
              className={`text-xs xl:text-sm font-medium transition-colors ${
                pathname === "/about" ? "text-[#2563eb]" : "text-slate-700 dark:text-slate-200 hover:text-[#2563eb] dark:hover:text-[#3b82f6]"
              }`}
            >
              {isArabic ? "من نحن" : "About Us"}
            </Link>

            {/* Services Dropdown (Grouped) */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`inline-flex items-center gap-1 text-xs xl:text-sm font-medium py-4 transition-colors cursor-pointer ${
                  pathname.startsWith("/services") ? "text-[#2563eb]" : "text-slate-700 dark:text-slate-200 hover:text-[#2563eb] dark:hover:text-[#3b82f6]"
                }`}
              >
                <span>{isArabic ? "خدماتنا" : "Our Services"}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeDropdown === "services" && (
                <div
                  className={`absolute ${
                    isArabic ? "right-0" : "left-0"
                  } top-[calc(100%-8px)] w-[680px] xl:w-[780px] bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150`}
                >
                  <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
                    {serviceSections.map((sec, sIdx) => {
                      const SecIcon = sec.icon;
                      const secTitle = isArabic ? sec.titleAr : sec.titleEn;

                      return (
                        <div key={sIdx} className="space-y-2.5">
                          <Link
                            href={sec.href}
                            className="flex items-center gap-2 text-xs font-semibold text-slate-950 dark:text-white hover:text-[#2563eb] pb-1.5 border-b border-slate-100 dark:border-slate-800 transition-colors"
                          >
                            <SecIcon className="w-3.5 h-3.5 text-[#2563eb]" />
                            <span>{secTitle}</span>
                          </Link>

                          <ul className="space-y-1.5">
                            {sec.items.map((it, itIdx) => (
                              <li key={itIdx}>
                                <Link
                                  href={it.href}
                                  className="text-[11.5px] text-slate-600 dark:text-slate-400 hover:text-[#2563eb] hover:translate-x-0.5 transition-all block truncate"
                                >
                                  {isArabic ? it.nameAr : it.nameEn}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-950 -mx-5 -mb-5 px-5 py-2.5 rounded-b-xl">
                    <span className="text-slate-500 font-normal">
                      {isArabic ? "تحتاج استشارة مخصصة؟" : "Need custom corporate structuring or booking?"}
                    </span>
                    <Link
                      href="/contact"
                      className="text-[#2563eb] font-medium hover:underline inline-flex items-center gap-1"
                    >
                      <span>{isArabic ? "تواصل معنا" : "Contact Our Team"}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/services/business-bahrain"
              className={`text-xs xl:text-sm font-medium transition-colors ${
                pathname === "/services/business-bahrain" ? "text-[#2563eb]" : "text-slate-700 dark:text-slate-200 hover:text-[#2563eb] dark:hover:text-[#3b82f6]"
              }`}
            >
              {isArabic ? "تأسيس بالبحرين" : "Bahrain Business"}
            </Link>

            <Link
              href="/visas"
              className={`text-xs xl:text-sm font-medium transition-colors ${
                pathname.startsWith("/visas") ? "text-[#2563eb]" : "text-slate-700 dark:text-slate-200 hover:text-[#2563eb] dark:hover:text-[#3b82f6]"
              }`}
            >
              {isArabic ? "التأشيرات" : "Worldwide Visas"}
            </Link>

            <Link
              href="/blogs"
              className={`text-xs xl:text-sm font-medium transition-colors ${
                pathname.startsWith("/blogs") ? "text-[#2563eb]" : "text-slate-700 dark:text-slate-200 hover:text-[#2563eb] dark:hover:text-[#3b82f6]"
              }`}
            >
              {isArabic ? "المقالات والأدلة" : "Articles & Guides"}
            </Link>

            <Link
              href="/contact"
              className={`text-xs xl:text-sm font-medium transition-colors ${
                pathname === "/contact" ? "text-[#2563eb]" : "text-slate-700 dark:text-slate-200 hover:text-[#2563eb] dark:hover:text-[#3b82f6]"
              }`}
            >
              {isArabic ? "اتصل بنا" : "Contact"}
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              title={theme === "dark" ? "Light Mode" : "Dark Mode"}
            >
              {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-slate-600" />
              )}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-md bg-[#2563eb] text-white text-[11px] font-bold flex items-center justify-center">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name.split(" ")[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">{user.name}</span>
                      <span className="text-[11px] text-slate-500 block truncate">{user.email}</span>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#2563eb] transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-400" />
                      <span>{isArabic ? "لوحة التحكم" : "Client Dashboard"}</span>
                    </Link>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer border-t border-slate-100 dark:border-slate-800"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{isArabic ? "تسجيل الخروج" : "Sign Out"}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                <span>{isArabic ? "تسجيل الدخول" : "Sign In"}</span>
              </Link>
            )}

            <a
              href={contact.whatsappLink("Hello Arizona International Group, I would like to inquire about your services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              {t("nav.book_now")}
            </a>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-5 py-4 space-y-3 max-h-[80vh] overflow-y-auto">
          {/* Theme Switcher in Mobile Drawer */}
          <button
            onClick={toggleTheme}
            className="w-full py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              <span>{theme === "dark" ? (isArabic ? "الوضع الفاتح" : "Light Mode") : (isArabic ? "الوضع الداكن" : "Dark Mode")}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase">{theme}</span>
          </button>

          {/* User Mobile Status */}
          {user ? (
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">{user.name}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{user.email}</span>
              </div>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-[#2563eb] text-white text-xs font-semibold"
              >
                {isArabic ? "لوحة التحكم" : "Dashboard"}
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-semibold text-center flex items-center justify-center gap-1.5"
            >
              <User className="w-4 h-4 text-[#2563eb]" />
              <span>{isArabic ? "تسجيل دخول العميل" : "Client Portal Sign In"}</span>
            </Link>
          )}

          <Link
            href="/"
            className="block py-1.5 text-xs font-medium text-slate-800 dark:text-slate-200"
          >
            {isArabic ? "الرئيسية" : "Home"}
          </Link>
          <Link
            href="/about"
            className="block py-1.5 text-xs font-medium text-slate-800 dark:text-slate-200"
          >
            {isArabic ? "من نحن" : "About Us"}
          </Link>
          <Link
            href="/services/business-bahrain"
            className="block py-1.5 text-xs font-medium text-slate-800 dark:text-slate-200"
          >
            {isArabic ? "تأسيس بالبحرين (ملكية 100%)" : "Business in Bahrain (CR)"}
          </Link>
          <Link
            href="/visas"
            className="block py-1.5 text-xs font-medium text-slate-800 dark:text-slate-200"
          >
            {isArabic ? "التأشيرات العالمية" : "Worldwide Visas"}
          </Link>
          <Link
            href="/services/travel-tours"
            className="block py-1.5 text-xs font-medium text-slate-800 dark:text-slate-200"
          >
            {isArabic ? "السياحة والسفر وتذاكر الطيران" : "Travel & Tours"}
          </Link>
          {isPakistan && (
            <>
              <Link
                href="/services/rent-a-car"
                className="block py-1.5 text-xs font-medium text-slate-800 dark:text-slate-200"
              >
                {isArabic ? "تأجير السيارات" : "Rent A Car"}
              </Link>
              <Link
                href="/services/mobiles-tech"
                className="block py-1.5 text-xs font-medium text-slate-800 dark:text-slate-200"
              >
                {isArabic ? "الهواتف والتكنولوجيا" : "Mobiles & Tech"}
              </Link>
            </>
          )}
          <Link
            href="/blogs"
            className="block py-1.5 text-xs font-medium text-slate-800 dark:text-slate-200"
          >
            {isArabic ? "المقالات والأدلة" : "Articles & Guides"}
          </Link>
          <Link
            href="/contact"
            className="block py-1.5 text-xs font-medium text-slate-800 dark:text-slate-200"
          >
            {isArabic ? "اتصل بنا" : "Contact"}
          </Link>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <a
              href={contact.whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-md bg-[#2563eb] text-white text-xs font-semibold text-center block"
            >
              {t("nav.book_now")}
            </a>

            {user && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full py-2 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 text-xs font-semibold text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{isArabic ? "تسجيل الخروج" : "Sign Out"}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
