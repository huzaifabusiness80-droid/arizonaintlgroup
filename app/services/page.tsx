"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import CtaSection from "@/components/CtaSection";
import Link from "next/link";
import { businessDivisionsData } from "@/lib/data";
import { ArrowUpRight, CheckCircle2, PhoneCall } from "lucide-react";
import { useGeoLocation } from "@/context/GeoContext";
import { useLanguage } from "@/context/LanguageContext";

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

  // If outside Pakistan, filter out Rent A Car and Mobiles & Tech
  const visibleDivisions = isPakistan
    ? businessDivisionsData
    : businessDivisionsData.filter(
        (d) => d.slug !== "rent-a-car" && d.slug !== "mobiles-tech"
      );

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between">
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
        <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-[1580px] mx-auto space-y-16">
          {visibleDivisions.map((division, idx) => {
            const arMeta = arabicDivisionMeta[division.slug];
            const divTitle = isArabic && arMeta ? arMeta.title : division.title;
            const divCategory = isArabic && arMeta ? arMeta.category : division.category;
            const divOverview = isArabic && arMeta ? arMeta.overview : division.overview;
            const divTagline = isArabic && arMeta ? arMeta.tagline : division.tagline;
            const divSubtitle = isArabic && arMeta ? arMeta.subtitle : division.subtitle;

            return (
              <div
                key={division.slug}
                className="p-8 sm:p-12 lg:p-16 rounded-[36px] bg-[#f8f9fc] border border-neutral-200/90 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center hover:border-neutral-300 transition-all"
              >
                {/* Left Details */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider">
                    <span>0{idx + 1} • {divCategory}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 leading-tight">
                    {divTitle}
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
                    {divOverview}
                  </p>

                  {/* Features List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {division.features.slice(0, 4).map((f) => (
                      <div key={f.title} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-medium text-neutral-800">{f.title}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/services/${division.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#dfb141] hover:bg-[#c49725] text-white text-xs sm:text-sm font-bold transition-all shadow-sm"
                    >
                      <span>{isArabic ? `استكشف ${divCategory}` : `Explore ${division.title}`}</span>
                      <ArrowUpRight className={`w-4 h-4 ${isArabic ? "rotate-[-90deg]" : ""}`} />
                    </Link>
                    <a
                      href={contact.whatsappLink(`Hi Arizona, I want to inquire about ${division.title}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 text-xs sm:text-sm font-medium transition-all"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{isArabic ? "استفسار مباشر" : "Inquire Details"}</span>
                    </a>
                  </div>
                </div>

                {/* Right Media Banner */}
                <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-md">
                  <img
                    src={division.heroImage}
                    alt={divTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-xs font-semibold text-[#dfb141] uppercase tracking-wider block mb-1">
                      {divTagline}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold">{divSubtitle}</h4>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Reusable Scenic CTA Banner */}
        <CtaSection
          title={isArabic ? "انطلق بأعمالك وحقق أهداف سفرك" : "Empower Your Enterprise & Travel Goals"}
          subtitle={
            isArabic
              ? "تواصل مع مستشارينا للحصول على باقات مخصصة، إتمام إجراءات التأشيرات والسجلات، ودعم على مدار 24 ساعة."
              : "Connect with our multi-sector advisors for customized packages, verified document submission, and 24/7 dedicated support."
          }
          buttonText={isArabic ? "استكشف الخدمات" : "Explore Services"}
          buttonHref="/contact"
          backgroundImage="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=85&auto=format&fit=crop"
        />
      </main>

      <Footer />
    </div>
  );
}
