"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import CoreServiceModal from "@/components/CoreServiceModal";
import { CORE_SERVICES_DATA, CoreServiceItem } from "@/lib/core-services";
import {
  CheckCircle2,
  ArrowUpRight,
  PhoneCall,
  Building2,
  Globe2,
  FileCheck2,
  Landmark,
  Compass,
  Users2,
  ShieldCheck,
  Scale,
  Rocket,
  Briefcase,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";

const iconMap: Record<string, any> = {
  Building2,
  FileCheck2,
  Landmark,
  Users2,
  Compass,
  Scale,
  ShieldCheck,
  Rocket,
  Briefcase,
};

export default function AboutPage() {
  const { isArabic, t } = useLanguage();
  const { contact } = useGeoLocation();
  const [selectedService, setSelectedService] = useState<CoreServiceItem | null>(null);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main>
        {/* Page Banner */}
        <PageBanner
          title={isArabic ? "عن مجموعة أريزونا الدولية" : "About Arizona International"}
          subtitle={
            isArabic
              ? "شريكك الموثوق في مملكة البحرين لتأسيس الشركات، خدمات الهيئة، التأشيرات والحلول المؤسسية."
              : "Your Trusted Partner in Bahrain for Business Setup, LMRA, MOIC, Visas & Corporate Solutions."
          }
          breadcrumbCurrent={t("nav.about_us")}
          backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85&auto=format&fit=crop"
        />

        {/* 20+ Years Authority Stats Banner */}
        <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <div className="p-6 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between h-[160px]">
              <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900" dir="ltr">
                20+ Years
              </span>
              <p className="text-xs text-slate-600 font-normal leading-relaxed">
                {isArabic
                  ? "أكثر من عقدين من الخبرة المهنية الراسخة في البحرين والسوق الدولي."
                  : "Over two decades of proven industry experience and corporate excellence."}
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#2563eb] text-white flex flex-col justify-between h-[160px]">
              <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-white" dir="ltr">
                100%
              </span>
              <p className="text-xs font-medium text-blue-100 leading-relaxed">
                {isArabic
                  ? "نسبة نجاح استخراج السجلات التجارية والتراخيص المؤسسية والتأشيرات."
                  : "Success rate in CR issuance, corporate setups, and visa facilitations."}
              </p>
            </div>

            <div className="p-6 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between h-[160px]">
              <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900" dir="ltr">
                15,000+
              </span>
              <p className="text-xs text-slate-600 font-normal leading-relaxed">
                {isArabic
                  ? "عميل ومستثمر ومسافر تمت خدمتهم بنجاح واحترافية تامة."
                  : "Satisfied international clients, entrepreneurs, and global travelers."}
              </p>
            </div>

            <div className="p-6 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between h-[160px]">
              <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900" dir="ltr">
                24/7
              </span>
              <p className="text-xs text-slate-600 font-normal leading-relaxed">
                {isArabic
                  ? "استشارات مباشرة ودعم مستمر على مدار الساعة لكافة الإجراءات."
                  : "Direct professional consultancy and ongoing dedicated client care."}
              </p>
            </div>
          </div>
        </section>

        {/* FOUNDER & LEADERSHIP PROFILE SECTION */}
        <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto border-t border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Leadership Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 group">
                <img
                  src="/images/image.png"
                  alt="Ali Jabbar - CEO & Founder | Arizona International Group"
                  className="w-full h-auto object-cover block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Name Badge */}
                <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#2563eb] text-white text-[10px] font-medium uppercase tracking-wider mb-1.5">
                    <span>{isArabic ? "المؤسس والرئيس التنفيذي" : "CEO & Founder"}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    Ali Jabbar
                  </h3>
                  <p className="text-xs text-slate-300 font-normal mt-0.5">
                    {isArabic ? "مجموعة أريزونا الدولية" : "Arizona International Group"}
                  </p>
                </div>
              </div>
            </div>

            {/* Leadership Message & Vision */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-[#2563eb] text-xs font-medium uppercase tracking-wider">
                <span>{isArabic ? "رسالة الإدارة والخبرة الراسخة" : "20+ Years Leadership & Expertise"}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-slate-900 leading-tight">
                {isArabic ? "شريكك الموثوق لنمو أعمالك و" : "Your Trusted Partner for"} <br />
                <span className="text-[#2563eb] font-semibold">
                  {isArabic ? "تسهيل رحلاتك وتأشيراتك" : "Business, Immigration & Global Visas"}
                </span>
              </h2>

              <blockquote className="p-4 rounded-md bg-slate-50 border-l-4 border-[#2563eb] text-slate-800 text-xs sm:text-sm italic leading-relaxed">
                "{isArabic
                  ? "نحن ملتزمون بتقديم أعلى معايير الاحترافية والشفافية والسرعة في إنجاز كافة معاملات تأسيس الشركات، خدمات الهيئة والوزارات، والتأشيرات العالمية."
                  : "Our commitment is built on professionalism, transparency, confidentiality, efficiency, and client satisfaction. We focus on providing practical solutions and building long-term relationships with our clients."}"
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                {isArabic
                  ? "على مدى أكثر من عقدين من الزمان، قمنا بتمكين آلاف المستثمرين ورجال الأعمال والعائلات من تأسيس وإدارة شركاتهم في مملكة البحرين، إلى جانب تسهيل إجراءات السفر والتأشيرات إلى أكثر من 50 دولة حول العالم."
                  : "For over two decades, we have empowered thousands of international investors, entrepreneurs, and families to successfully incorporate, manage, and scale businesses in Bahrain, while enabling smooth travel to 50+ countries worldwide."}
              </p>

              <div className="pt-1 flex flex-wrap gap-3">
                <a
                  href={contact.whatsappLink(
                    "Hi Arizona International Group, I would like to consult regarding your Bahrain business and visa services."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{isArabic ? "تواصل مع الإدارة عبر الواتساب" : "Direct WhatsApp Consultation"}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 10 CORE SERVICES */}
        <section className="w-full py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto border-t border-slate-200">
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-[#2563eb] text-xs font-medium uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>{isArabic ? "قطاعات خدماتنا الرئيسية" : "Our 10 Core Service Divisions"}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-slate-900 leading-tight">
              {isArabic ? "حلول شاملة لتأسيس الشركات و" : "Comprehensive Solutions for"} <br />
              <span className="text-[#2563eb] font-semibold">
                {isArabic ? "الخدمات الحكومية والتأشيرات" : "Business, LMRA, MOIC & Visas"}
              </span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              {isArabic
                ? "خبرة ممتدة لأكثر من 20 عاماً تغطي كافة الإجراءات الحكومية، السجلات التجارية، وتأشيرات السفر حول العالم."
                : "Backed by 20+ years of institutional mastery across Bahrain government procedures, corporate structuring, and worldwide visas."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {CORE_SERVICES_DATA.map((service) => {
              const ServiceIcon = iconMap[service.iconName] || Building2;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className="p-5 rounded-lg bg-white border border-slate-200 hover:border-[#93c5fd] hover:shadow-xs transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-md bg-blue-50 group-hover:bg-[#2563eb] group-hover:text-white text-[#2563eb] flex items-center justify-center transition-colors">
                        <ServiceIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono font-medium text-slate-400 group-hover:text-[#2563eb]">
                        0{service.number}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-medium text-slate-900 group-hover:text-[#2563eb] transition-colors leading-snug">
                      {isArabic ? service.titleAr : service.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500 font-normal mt-1.5 leading-relaxed line-clamp-3">
                      {isArabic ? service.taglineAr : service.taglineEn}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-[#2563eb]">
                    <span>
                      {isArabic ? "عرض كافة التفاصيل" : "View Full Scope"}
                    </span>
                    <ArrowUpRight
                      className={`w-3.5 h-3.5 text-[#2563eb] ${isArabic ? "rotate-[-90deg]" : ""}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* GLOBAL VISA & TRAVEL SERVICES SPOTLIGHT */}
        <section className="w-full py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto border-t border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[11px] font-medium tracking-wider text-[#2563eb] uppercase block mb-2">
                {isArabic ? "التأشيرات والسياحة العالمية" : "GLOBAL VISA & TRAVEL SERVICES"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-slate-900 leading-tight">
                {isArabic ? "تأشيرات الزيارة والسفر" : "Worldwide Visit Visas &"} <br />
                <span className="text-[#2563eb] font-semibold">
                  {isArabic ? "لكافة الوجهات العالمية" : "Seamless Travel Guidance"}
                </span>
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                {isArabic
                  ? "يمتد نطاق خبرتنا إلى ما هو أبعد من البحرين. من خلال خدمات استشارات التأشيرات العالمية، نقدم مساعدة احترافية لتأشيرات الزيارة والسياحة لمختلف الوجهات حول العالم."
                  : "Our expertise extends beyond Bahrain. Through our Global Visa Consultancy Services, we assist clients with visit visa applications and travel documentation for destinations worldwide."}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/visas"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  <span>{isArabic ? "استكشف وجهات التأشيرات" : "Explore Visa Destinations"}</span>
                  <ArrowUpRight className={`w-3.5 h-3.5 ${isArabic ? "rotate-[-90deg]" : ""}`} />
                </Link>
                <a
                  href={contact.whatsappLink("Hi Arizona, I need assistance with a Worldwide Visit Visa.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#2563eb]" />
                  <span>{isArabic ? "استفسر عن تأشيرتك" : "Inquire on WhatsApp"}</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between h-[140px]">
                <Globe2 className="w-6 h-6 text-[#2563eb]" />
                <div>
                  <h4 className="text-sm font-medium text-slate-900">
                    {isArabic ? "تغطية قارية شاملة" : "Global Reach"}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {isArabic ? "أوروبا، بريطانيا، أمريكا، كندا، وآسيا." : "Europe, UK, USA, Canada & Asia."}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between h-[140px]">
                <FileCheck2 className="w-6 h-6 text-emerald-600" />
                <div>
                  <h4 className="text-sm font-medium text-slate-900">
                    {isArabic ? "تدقيق المستندات" : "File Verification"}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {isArabic ? "مراجعة دقيقة لضمان القبول الرسمي." : "Thorough checks to ensure high approvals."}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between h-[140px]">
                <Compass className="w-6 h-6 text-[#2563eb]" />
                <div>
                  <h4 className="text-sm font-medium text-slate-900">
                    {isArabic ? "حجز مواعيد السفارات" : "Embassy Slots"}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {isArabic ? "مواعيد سريعة في مراكز التأشيرات." : "Expedited embassy biometric appointments."}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between h-[140px]">
                <ShieldCheck className="w-6 h-6 text-[#2563eb]" />
                <div>
                  <h4 className="text-sm font-medium text-slate-900">
                    {isArabic ? "سرية وأمان كامل" : "100% Confidential"}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {isArabic ? "حماية كاملة لبيانات العملاء." : "Strict privacy and data confidentiality."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CoreServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

      <Footer />
    </div>
  );
}
