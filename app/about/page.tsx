"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { Sparkles, CheckCircle2, ArrowUpRight, PhoneCall } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { isArabic, t } = useLanguage();

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between">
      <Navbar />

      <main>
        {/* Page Banner */}
        <PageBanner
          title={isArabic ? "عن مجموعة أريزونا الدولية" : "About Arizona International"}
          subtitle={
            isArabic
              ? "شريكك الموثوق في خدمات السفر والتأشيرات العالمية وتأسيس الأعمال بالبحرين، نخدم آلاف العملاء سنوياً."
              : "Your trusted travel and multi-sector enterprise partner, serving thousands of happy clients worldwide."
          }
          breadcrumbCurrent={t("nav.about_us")}
          backgroundImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=85&auto=format&fit=crop"
        />

        {/* Core Stats Section */}
        <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-[1580px] mx-auto border-b border-neutral-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#f4f5f8] flex flex-col justify-between h-[240px]">
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950" dir="ltr">15,000+</span>
              <p className="text-sm text-neutral-600 font-normal leading-relaxed">
                {t("about.stat1_lbl")}
              </p>
            </div>
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#f8de8a] via-[#e5bc4b] to-[#d6a935] text-neutral-950 flex flex-col justify-between h-[240px] shadow-sm">
              <span className="text-4xl sm:text-5xl font-bold tracking-tight" dir="ltr">100%</span>
              <p className="text-sm font-semibold text-neutral-900 leading-relaxed">
                {t("about.stat2_lbl")}
              </p>
            </div>
            <div className="p-8 sm:p-10 rounded-3xl bg-[#f4f5f8] flex flex-col justify-between h-[240px]">
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950" dir="ltr">5.0 ★</span>
              <p className="text-sm text-neutral-600 font-normal leading-relaxed">
                {t("about.stat3_lbl")}
              </p>
            </div>
            <div className="p-8 sm:p-10 rounded-3xl bg-[#f4f5f8] flex flex-col justify-between h-[240px]">
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950" dir="ltr">24/7</span>
              <p className="text-sm text-neutral-600 font-normal leading-relaxed">
                {t("about.stat4_lbl")}
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-[1580px] mx-auto border-b border-neutral-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#dfb141]" />
                <span>{isArabic ? "رؤيتنا ورسالتنا المؤسسية" : "Our Heritage & Purpose"}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-neutral-950 leading-[1.18]">
                {isArabic ? "تمكين النمو السلس و" : "Empowering Seamless Growth &"} <br />
                <span className="font-bold text-neutral-950">{isArabic ? "تجارب سفر لا تُنسى" : "Unforgettable Journeys"}</span>
              </h2>
              <p className="mt-6 text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
                {isArabic
                  ? "تأسست مجموعة أريزونا الدولية لتكون الجسر الموثوق بين سهولة التنقل العالمي والمصداقية المؤسسية، حيث نجمع بين الخبرة الإقليمية العميقة في دول الخليج وشراكاتنا الدولية الممتدة عبر أوروبا، الأمريكتين، وآسيا."
                  : "Founded with a mission to bridge global mobility with institutional reliability, Arizona International Group combines deep regional expertise in the GCC with international partnerships spanning Europe, the Americas, and Asia."}
              </p>
              <p className="mt-4 text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
                {isArabic
                  ? "سواء كنت مستثمراً ترغب في تأسيس شركة بملكية أجنبية 100% في البحرين، أو مسافراً يبحث عن جدول سياحي فاخر، نعمل على إزالة كل العقبات الإدارية لتقديم نتائج استثنائية."
                  : "Whether supporting an entrepreneur with 100% foreign business setup in Bahrain or arranging a bespoke luxury travel itinerary, we eliminate bureaucracy and deliver seamless results."}
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#f4f5f8]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-neutral-800">
                    {isArabic ? "مرخص ومعتمد رسمياً" : "Licensed & Certified"}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#f4f5f8]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-neutral-800">
                    {isArabic ? "بدون أي رسوم خفية" : "Zero Hidden Charges"}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg bg-neutral-950">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop"
                alt="Arizona Headquarters"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#dfb141] block mb-1">
                  {isArabic ? "حضور دولي وخبرة محلية" : "Global Reach & Local Mastery"}
                </span>
                <h4 className="text-xl font-bold">
                  {isArabic ? "البحرين • دول الخليج • شبكة عالمية" : "Bahrain • GCC • International Network"}
                </h4>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Strip */}
        <section className="w-full py-16 px-4 sm:px-8 lg:px-12 max-w-[1580px] mx-auto">
          <div className="p-8 sm:p-14 rounded-3xl bg-neutral-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl sm:text-4xl font-normal tracking-tight leading-[1.18]">
                {isArabic ? "جاهز لتجربة تميز" : "Ready to Experience"}{" "}
                <span className="text-[#dfb141] font-bold">{isArabic ? "مجموعة أريزونا؟" : "Arizona Excellence?"}</span>
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 mt-2 max-w-xl">
                {isArabic
                  ? "تواصل مع مستشارينا اليوم لتخطيط رحلاتك، استخراج التأشيرات، تأجير السيارات، أو تأسيس شركتك في البحرين."
                  : "Contact our specialized advisors today for travel itineraries, visa facilitation, fleet rentals, or Bahrain business setup."}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <a
                href="https://wa.me/923135921434"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#dfb141] text-white text-xs sm:text-sm font-bold hover:bg-[#c49725] transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{isArabic ? "تواصل عبر الواتساب" : "Chat on WhatsApp"}</span>
              </a>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                <span>{isArabic ? "عرض قطاعات الأعمال" : "View Our Divisions"}</span>
                <ArrowUpRight className={`w-4 h-4 ${isArabic ? "rotate-[-90deg]" : ""}`} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
