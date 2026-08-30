"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import CtaSection from "@/components/CtaSection";
import Link from "next/link";
import { businessDivisionsData } from "@/lib/data";
import { ArrowUpRight, CheckCircle2, PhoneCall, Sliders } from "lucide-react";
import { useGeoLocation } from "@/context/GeoContext";
import { useLanguage } from "@/context/LanguageContext";
import ServiceCustomizerModal, { CustomizerServiceType } from "@/components/ServiceCustomizerModal";

const arabicDivisionMeta: { [slug: string]: { title: string; category: string; tagline: string; subtitle: string; overview: string } } = {
  "travel-tours": {
    title: "السياحة والسفر وتذاكر الطيران",
    category: "السياحة والسفر",
    tagline: "حجوزات الطيران والفنادق والعمرة",
    subtitle: "تذاكر طيران وفنادق 5 نجوم وباقات عطلات",
    overview: "نقدم حلول سفر متكاملة تشمل حجوزات الطيران الفورية عبر كبرى الشركات العالمية، الفنادق الفاخرة، باقات شهر العسل، ورحلات العمرة الميسرة.",
  },
  "rent-a-car": {
    title: "تأجير السيارات والسائق الخاص",
    category: "تأجير السيارات",
    tagline: "أسطول سيارات حديث ومتنوع",
    subtitle: "تأجير يومي وشهري وسيارات دفع رباعي",
    overview: "أسطول متكامل من سيارات السيدان الاقتصادية والسيارات الفاخرة وسيارات الدفع الرباعي 4x4، بالإضافة لخدمات السائق الخاص وتوصيل المطار.",
  },
  "business-bahrain": {
    title: "تأسيس الشركات في البحرين (100% ملكية أجنبية)",
    category: "الشركات والأعمال",
    tagline: "السجل التجاري والمكاتب وإقامة المستثمر",
    subtitle: "تأسيس قانوني متكامل بدون كفيل محلي",
    overview: "إصدار السجل التجاري (CR)، توفير مكاتب مرخصة مع عداد كهرباء وماء EWA، فتح الحسابات البنكية، وإصدار إقامات المستثمر وتأشيرات العمل LMRA.",
  },
  "mobiles-tech": {
    title: "الهواتف الذكية والتكنولوجيا المعتمدة",
    category: "الهواتف والتكنولوجيا",
    tagline: "أجهزة أصلية 100% مع الضمان",
    subtitle: "آيفون وسامسونج وشواحن GaN السريعة",
    overview: "توزيع رسمي ومعتمد لأحدث الهواتف الذكية (آبل آيفون، سامسونج جالاكسي، جوجل بكسل)، الشواحن السريعة، والسماعات مع توصيل فوري.",
  },
};

export default function ServicesPage() {
  const { isPakistan, contact } = useGeoLocation();
  const { isArabic, t } = useLanguage();
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<CustomizerServiceType>("business-bahrain");

  const visibleDivisions = isPakistan
    ? businessDivisionsData
    : businessDivisionsData.filter(
        (d) => d.slug !== "rent-a-car" && d.slug !== "mobiles-tech"
      );

  const openCustomizer = (slug: string) => {
    setSelectedDivision(slug as CustomizerServiceType);
    setCustomizerOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main>
        {/* Page Banner */}
        <PageBanner
          title={isArabic ? "قطاعات الأعمال المتكاملة" : "Our Business Divisions"}
          subtitle={
            isArabic
              ? "حلول شاملة في السياحة والسفر، التأشيرات العالمية، تأجير السيارات، تأسيس الشركات بالبحرين، والتقنية."
              : "Comprehensive solutions across Travel, Worldwide Visas, Car Rentals, Bahrain Business, and Tech"
          }
          breadcrumbCurrent={t("nav.travel_tours")}
          backgroundImage="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=85&auto=format&fit=crop"
        />

        {/* Division Showcases */}
        <section className="w-full py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto space-y-10">
          {visibleDivisions.map((division, idx) => {
            const arMeta = arabicDivisionMeta[division.slug];
            const divTitle = isArabic && arMeta ? arMeta.title : division.title;
            const divCategory = isArabic && arMeta ? arMeta.category : division.category;
            const divOverview = isArabic && arMeta ? arMeta.overview : division.overview;

            return (
              <div
                key={division.slug}
                className="p-6 sm:p-10 lg:p-12 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center hover:border-slate-300 transition-colors"
              >
                {/* Left Details */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-[#2563eb] text-xs font-medium uppercase tracking-wider">
                    <span>0{idx + 1} • {divCategory}</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-slate-900 leading-tight">
                    {divTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    {divOverview}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 pt-1">
                    {division.features.slice(0, 4).map((f, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#2563eb] shrink-0" />
                        <span>{typeof f === "string" ? f : f.title}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/services/${division.slug}`}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium text-xs transition-colors cursor-pointer"
                    >
                      <span>{isArabic ? "استكشف الخدمات والأسعار" : "Explore Services & Pricing"}</span>
                      <ArrowUpRight className={`w-3.5 h-3.5 ${isArabic ? "rotate-[-90deg]" : ""}`} />
                    </Link>

                    <button
                      onClick={() => openCustomizer(division.slug)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-blue-50 hover:bg-blue-100 text-[#2563eb] text-xs font-semibold border border-blue-200 transition-colors cursor-pointer"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>{isArabic ? "تخصيص الباقة" : "Customize Package"}</span>
                    </button>

                    <a
                      href={contact.whatsappLink(`Hi Arizona, I want to inquire about ${division.title}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-white hover:bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200 transition-colors cursor-pointer"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-[#2563eb]" />
                      <span>{isArabic ? "واتساب مباشر" : "WhatsApp Inquiry"}</span>
                    </a>
                  </div>
                </div>

                {/* Right Image */}
                <div className="lg:col-span-6">
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-slate-200 border border-slate-200">
                    <img
                      src={division.heroImage}
                      alt={divTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* CTA Banner */}
        <CtaSection
          title={isArabic ? "هل تحتاج مساعدة في اختيار الخدمة؟" : "Need Help Choosing the Right Service?"}
          subtitle={
            isArabic
              ? "مستشارونا متاحون على مدار الساعة لتقديم الدعم والإجابة على استفساراتكم."
              : "Our consultants are available 24/7 to provide expert guidance and custom quotes."
          }
          buttonText={isArabic ? "تحدث مع مستشار عبر الواتساب" : "Chat on WhatsApp"}
          buttonHref={contact.whatsappLink("Hi Arizona International Group, I need guidance.")}
        />
      </main>

      <ServiceCustomizerModal
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        serviceType={selectedDivision}
      />

      <Footer />
    </div>
  );
}

