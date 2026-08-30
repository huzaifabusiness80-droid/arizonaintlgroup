"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  Globe2,
  CheckCircle2,
  Award,
  ArrowUpRight,
  MapPin,
  Users2,
  FileCheck2,
  PhoneCall,
  Clock,
  Briefcase,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";

export default function AboutSection() {
  const { isArabic } = useLanguage();
  const { contact } = useGeoLocation();

  const trustPillars = [
    {
      icon: Building2,
      number: "01",
      titleEn: "Direct Government & MOIC Liaison",
      titleAr: "اعتماد رسمي مباشر مع الوزارات",
      descEn: "Zero intermediaries. Direct filing and licensed liaison with Bahrain MOIC, LMRA, EWA, and Chamber of Commerce.",
      descAr: "بدون وسطاء، إجراءات وتخليص مباشر مع وزارة الصناعة والتجارة، هيئة تنظيم سوق العمل، وهيئة الكهرباء والماء.",
    },
    {
      icon: Globe2,
      number: "02",
      titleEn: "Global Visa & Mobility Mastery",
      titleAr: "خبرة متقدمة في التأشيرات الدولية",
      descEn: "End-to-end documentation, biometric appointment slots, and compliant file preparation for Schengen, UK, USA, and 50+ countries.",
      descAr: "إعداد وتدقيق متكامل للملفات وحجز مواعيد السفارات ومراكز التأشيرات لأوروبا، بريطانيا، أمريكا وكافة الوجهات.",
    },
    {
      icon: FileCheck2,
      number: "03",
      titleEn: "100% Foreign Ownership & Banking",
      titleAr: "ملكية أجنبية 100% وحسابات بنكية",
      descEn: "Turnkey Commercial Registration (CR), verified office leasing with EWA, corporate bank account setup, and investor visas.",
      descAr: "إصدار السجل التجاري بملكية كاملة للمستثمر، توفير مكاتب موثقة مع EWA، فتح الحساب البنكي وإقامات المستثمر.",
    },
    {
      icon: Users2,
      number: "04",
      titleEn: "Dedicated Cross-Border Team",
      titleAr: "فريق استشاري مخصص عابر للحدود",
      descEn: "Dual-hub operational presence in Manama (Kingdom of Bahrain) and Pakistan, providing transparent 24/7 personal client advisory.",
      descAr: "حضور تشغيلي بمكاتب في المنامة (مملكة البحرين) وباكستان مع مستشار تنفيذي مخصص لكل عميل على مدار الساعة.",
    },
  ];

  return (
    <section id="about" className="w-full bg-white py-16 sm:py-24 border-b border-slate-200 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-20">
          
          {/* Left Column: Authentic Brand Narrative */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#2563eb] text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse" />
              <span>{isArabic ? "أكثر من 20 عاماً من الخبرة المؤسسية" : "Over 20 Years Corporate Legacy"}</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-semibold tracking-tight text-slate-950 leading-[1.2]">
              {isArabic ? (
                <>
                  بناء شراكات الأعمال وتسهيل <br />
                  <span className="text-[#2563eb]">السفر والتأشيرات العالمية</span>
                </>
              ) : (
                <>
                  Facilitating Global Business, <br />
                  <span className="text-[#2563eb]">Visas & Corporate Growth</span>
                </>
              )}
            </h2>

            {/* Authentic Narrative Text */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              {isArabic
                ? "منذ أكثر من عقدين، تعمل مجموعة أريزونا الدولية كشريك استشاري موثوق للمستثمرين الدوليين، رواد الأعمال، والمسافرين. نحن نجمع بين الخبرة القانونية العميقة في أنظمة مملكة البحرين والشبكة الدولية لتسهيل التأشيرات والسياحة وإدارة الأعمال عبر الحدود."
                : "For over two decades, Arizona International Group has served as the trusted gateway connecting enterprise investors, entrepreneurs, and global travelers. We bridge local regulatory mastery in the Kingdom of Bahrain with international travel facilitation, corporate structuring, and premier mobility solutions."}
            </p>

            {/* 3 Value Points */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-[#2563eb] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                    {isArabic ? "معتمدون ومرخصون رسمياً في البحرين" : "Officially Licensed & Accredited in Bahrain"}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isArabic ? "سجلات تجارية موثقة ومعاملات مباشرة مع وزارة التجارة وهيئة سوق العمل." : "Compliant corporate registration, direct MOIC filing, and LMRA government portal access."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-[#2563eb] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                    {isArabic ? "إنجاز شفاف وسريع بدون تعقيدات" : "Transparent Execution & Zero Middlemen"}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isArabic ? "وضوح تام في الرسوم والمدد الزمنية وإجراءات موثقة خطوة بخطوة." : "Clear SLAs, transparent government fee structures, and dedicated corporate account handling."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-[#2563eb] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                    {isArabic ? "مكاتب حضور مزدوج (البحرين وباكستان)" : "Dual-Country Regional Hubs"}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isArabic ? "المقر الرئيسي في المنامة ومكتب إقليمي في إسلام آباد لخدمة المستثمرين والمسافرين." : "Executive offices in Manama, Bahrain & regional operations in Islamabad, Pakistan."}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-sm"
              >
                <span>{isArabic ? "الملف التعريفي للشركة" : "Explore Corporate Profile"}</span>
                <ArrowUpRight className={`w-4 h-4 ${isArabic ? "rotate-[-90deg]" : ""}`} />
              </Link>

              <a
                href={contact.whatsappLink("Hello Arizona International Group, I would like to consult with your corporate team.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-[#2563eb]" />
                <span>{isArabic ? "استشارة مباشرة عبر الواتساب" : "Direct WhatsApp Advisory"}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Visual Enterprise Authority Showcase */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Image Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900">
                <div className="aspect-[4/3] sm:aspect-[16/11] relative">
                  <Image
                    src="/images/hero-bahrain.jpg"
                    alt="Arizona International Group - Corporate Headquarters & Bahrain Skyline"
                    fill
                    className="object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white z-10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-[11px] font-medium tracking-wide uppercase text-slate-200">
                      {isArabic ? "المقر الرئيسي • المنامة، البحرين" : "Global HQ • Manama, Kingdom of Bahrain"}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                    {isArabic ? "مجموعة أريزونا الدولية للاستشارات والخدمات" : "Arizona International Group"}
                  </h3>
                  <p className="text-xs text-slate-300 font-normal mt-0.5">
                    {isArabic ? "تأسيس الشركات • التأشيرات الدولية • السياحة والسفر" : "Corporate Setup • Global Visas • Premium Travel Solutions"}
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: 20+ Years Trust Stamp (Top Right / Top Left) */}
              <div className={`absolute -top-4 ${isArabic ? "-left-3 sm:-left-6" : "-right-3 sm:-right-6"} bg-white rounded-xl p-3.5 sm:p-4 shadow-xl border border-slate-200/80 z-20 flex items-center gap-3 max-w-[210px]`}>
                <div className="w-10 h-10 rounded-lg bg-[#2563eb] text-white flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-base sm:text-lg font-semibold text-slate-900 leading-none" dir="ltr">
                    20+ Years
                  </span>
                  <span className="text-[11px] text-slate-500 font-normal mt-0.5 block leading-tight">
                    {isArabic ? "سجل معتمد وموثوق" : "Established Legacy of Trust"}
                  </span>
                </div>
              </div>

              {/* Floating Badge 2: Dual-Hub Presence (Bottom Left / Bottom Right) */}
              <div className={`absolute -bottom-5 ${isArabic ? "-right-3 sm:-right-6" : "-left-3 sm:-left-6"} bg-white rounded-xl p-3.5 sm:p-4 shadow-xl border border-slate-200/80 z-20 flex items-center gap-3`}>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                    <span>🇧🇭 Bahrain</span>
                    <span className="text-slate-300">•</span>
                    <span>🇵🇰 Pakistan</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-normal mt-0.5 block">
                    {isArabic ? "مكاتب معتمدة وخدمة فورية" : "Direct On-Ground Presence"}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Clean Corporate Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-16 sm:mb-20">
          <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-center">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-950 font-sans" dir="ltr">
              20+
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">
              {isArabic ? "سنوات من التميز" : "Years Experience"}
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
              {isArabic ? "خبرة متواصلة منذ 2004" : "Continuous operation since 2004"}
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-center">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#2563eb] font-sans" dir="ltr">
              100%
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">
              {isArabic ? "مطابقة قانونية كاملة" : "Legal Compliance"}
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
              {isArabic ? "سجلات وتراخيص موثقة رسمياً" : "Official MOIC & LMRA alignment"}
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-center">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-950 font-sans" dir="ltr">
              15,000+
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">
              {isArabic ? "عميل ومستثمر ومسافر" : "Clients & Travelers"}
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
              {isArabic ? "خدمات متكاملة وحلول موثوقة" : "Served across GCC & South Asia"}
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-center">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-950 font-sans" dir="ltr">
              24/7
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">
              {isArabic ? "دعم واستشارات مستمرة" : "Dedicated Support"}
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
              {isArabic ? "متابعة دائمة عبر الواتساب" : "Direct WhatsApp consultant desk"}
            </p>
          </div>
        </div>

        {/* 4 Pillars of Enterprise Trust Grid */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold text-[#2563eb] uppercase tracking-wider block mb-1">
                {isArabic ? "ركائز التميز المؤسسي" : "OUR ENTERPRISE PILLARS"}
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-950 tracking-tight">
                {isArabic ? "لماذا يختار المستثمرون والمسافرون مجموعة أريزونا؟" : "Why Global Clients & Investors Choose Arizona"}
              </h3>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
            >
              <span>{isArabic ? "استعرض جميع الخدمات" : "View All Services & Divisions"}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${isArabic ? "rotate-[-90deg]" : ""}`} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {trustPillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white border border-slate-200 hover:border-[#93c5fd] hover:shadow-sm transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 group-hover:bg-[#2563eb] group-hover:text-white text-[#2563eb] flex items-center justify-center transition-colors">
                        <PillarIcon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-semibold text-slate-400 group-hover:text-[#2563eb] transition-colors">
                        {pillar.number}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-slate-950 group-hover:text-[#2563eb] transition-colors leading-snug">
                      {isArabic ? pillar.titleAr : pillar.titleEn}
                    </h4>
                    <p className="text-xs text-slate-600 font-normal mt-2 leading-relaxed">
                      {isArabic ? pillar.descAr : pillar.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

