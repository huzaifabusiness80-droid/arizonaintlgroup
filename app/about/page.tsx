"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  Award,
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
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between">
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
        <section className="w-full py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-[1580px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-3xl bg-[#f4f5f8] border border-neutral-200/80 flex flex-col justify-between h-[210px]">
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950" dir="ltr">
                20+ Years
              </span>
              <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                {isArabic
                  ? "أكثر من عقدين من الخبرة المهنية الراسخة في البحرين والسوق الدولي."
                  : "Over two decades of proven industry experience and corporate excellence."}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#f8de8a] via-[#e5bc4b] to-[#d6a935] text-neutral-950 flex flex-col justify-between h-[210px] shadow-sm">
              <span className="text-4xl sm:text-5xl font-bold tracking-tight" dir="ltr">
                100%
              </span>
              <p className="text-xs sm:text-sm font-semibold text-neutral-900 leading-relaxed">
                {isArabic
                  ? "نسبة نجاح استخراج السجلات التجارية والتراخيص المؤسسية والتأشيرات."
                  : "Success rate in CR issuance, corporate setups, and visa facilitations."}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#f4f5f8] border border-neutral-200/80 flex flex-col justify-between h-[210px]">
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950" dir="ltr">
                15,000+
              </span>
              <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                {isArabic
                  ? "عميل ومستثمر ومسافر تمت خدمتهم بنجاح واحترافية تامة."
                  : "Satisfied international clients, entrepreneurs, and global travelers."}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#f4f5f8] border border-neutral-200/80 flex flex-col justify-between h-[210px]">
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950" dir="ltr">
                24/7
              </span>
              <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                {isArabic
                  ? "استشارات مباشرة ودعم مستمر على مدار الساعة لكافة الإجراءات."
                  : "Direct professional consultancy and ongoing dedicated client care."}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FOUNDER & LEADERSHIP PROFILE SECTION */}
        {/* ========================================================================= */}
        <section className="w-full py-12 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-[1580px] mx-auto border-t border-neutral-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center">
            {/* Leadership Image - Full Wide Presentation */}
            <div className="lg:col-span-6">
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl bg-neutral-900 border-2 border-neutral-200/90 group">
                <img
                  src="/images/image.png"
                  alt="Ali Jabbar - CEO & Founder | Arizona International Group"
                  className="w-full h-auto object-cover block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Floating Name & Title on Photo */}
                <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#dfb141] text-neutral-950 text-xs font-bold uppercase tracking-wider mb-2 shadow-md">
                    <span>{isArabic ? "المؤسس والرئيس التنفيذي" : "CEO & Founder"}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Ali Jabbar
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-normal mt-0.5">
                    {isArabic ? "مجموعة أريزونا الدولية" : "Arizona International Group"}
                  </p>
                </div>
              </div>
            </div>

            {/* Leadership Message & Vision */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dfb141]/15 text-neutral-950 text-xs font-semibold uppercase tracking-wider">
                <span>{isArabic ? "رسالة الإدارة والخبرة الراسخة" : "20+ Years Leadership & Expertise"}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-neutral-950 leading-[1.15]">
                {isArabic ? "شريكك الموثوق لنمو أعمالك و" : "Your Trusted Partner for"} <br />
                <span className="font-bold text-[#dfb141]">
                  {isArabic ? "تسهيل رحلاتك وتأشيراتك" : "Business, Immigration & Global Visas"}
                </span>
              </h2>

              <blockquote className="p-6 rounded-2xl bg-[#f8f9fc] border-l-4 border-[#dfb141] text-neutral-800 text-sm sm:text-base italic leading-relaxed">
                "{isArabic
                  ? "نحن ملتزمون بتقديم أعلى معايير الاحترافية والشفافية والسرعة في إنجاز كافة معاملات تأسيس الشركات، خدمات الهيئة والوزارات، والتأشيرات العالمية."
                  : "Our commitment is built on professionalism, transparency, confidentiality, efficiency, and client satisfaction. We focus on providing practical solutions and building long-term relationships with our clients."}"
              </blockquote>

              <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
                {isArabic
                  ? "على مدى أكثر من عقدين من الزمان، قمنا بتمكين آلاف المستثمرين ورجال الأعمال والعائلات من تأسيس وإدارة شركاتهم في مملكة البحرين، إلى جانب تسهيل إجراءات السفر والتأشيرات إلى أكثر من 50 دولة حول العالم."
                  : "For over two decades, we have empowered thousands of international investors, entrepreneurs, and families to successfully incorporate, manage, and scale businesses in Bahrain, while enabling smooth travel to 50+ countries worldwide."}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href={contact.whatsappLink(
                    "Hi Arizona International Group, I would like to consult regarding your Bahrain business and visa services."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-[#dfb141]" />
                  <span>{isArabic ? "تواصل مع الإدارة عبر الواتساب" : "Direct WhatsApp Consultation"}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10 CORE SERVICES IN BAHRAIN & WORLDWIDE WITH FULL DETAIL MODAL */}
        {/* ========================================================================= */}
        <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-[1580px] mx-auto border-t border-neutral-100">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider mb-4">
              <Layers className="w-3.5 h-3.5 text-[#dfb141]" />
              <span>{isArabic ? "قطاعات خدماتنا الرئيسية" : "Our 10 Core Service Divisions"}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.03em] text-neutral-950 leading-[1.18]">
              {isArabic ? "حلول شاملة لتأسيس الشركات و" : "Comprehensive Solutions for"} <br />
              <span className="font-bold text-[#dfb141]">
                {isArabic ? "الخدمات الحكومية والتأشيرات" : "Business, LMRA, MOIC & Visas"}
              </span>
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
              {isArabic
                ? "خبرة ممتدة لأكثر من 20 عاماً تغطي كافة الإجراءات الحكومية، السجلات التجارية، وتأشيرات السفر حول العالم. اضغط على أي بطاقة لعرض كافة التفاصيل وقائمة المتطلبات."
                : "Backed by 20+ years of institutional mastery across Bahrain government procedures, corporate structuring, and worldwide visas. Click on any card to view the full scope of services and capabilities."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {CORE_SERVICES_DATA.map((service) => {
              const ServiceIcon = iconMap[service.iconName] || Building2;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className="p-6 sm:p-7 rounded-[28px] bg-white border border-neutral-200/90 hover:border-[#dfb141] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Top Row: Icon + Number Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#f5f6fa] group-hover:bg-[#dfb141] group-hover:text-white text-neutral-800 flex items-center justify-center transition-colors shadow-2xs">
                        <ServiceIcon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-neutral-400 group-hover:text-[#dfb141] transition-colors uppercase tracking-widest">
                        0{service.number}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-neutral-950 group-hover:text-[#dfb141] transition-colors leading-snug">
                      {isArabic ? service.titleAr : service.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 font-normal mt-2.5 leading-relaxed line-clamp-3">
                      {isArabic ? service.taglineAr : service.taglineEn}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-500 group-hover:text-neutral-950 transition-colors">
                    <span className="text-[#dfb141] group-hover:underline">
                      {isArabic ? "عرض كافة التفاصيل والمجالات" : "View Full Scope & Checklist"}
                    </span>
                    <ArrowUpRight
                      className={`w-4 h-4 text-[#dfb141] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isArabic ? "rotate-[-90deg]" : ""
                        }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* GLOBAL VISA & TRAVEL SERVICES SPOTLIGHT */}
        {/* ========================================================================= */}
        <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-[1580px] mx-auto border-t border-neutral-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#dfb141] uppercase block mb-3">
                {isArabic ? "التأشيرات والسياحة العالمية" : "GLOBAL VISA & TRAVEL SERVICES"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-neutral-950 leading-[1.18]">
                {isArabic ? "تأشيرات الزيارة والسفر" : "Worldwide Visit Visas &"} <br />
                <span className="font-bold text-[#dfb141]">
                  {isArabic ? "لكافة الوجهات العالمية" : "Seamless Travel Guidance"}
                </span>
              </h2>
              <p className="mt-6 text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
                {isArabic
                  ? "يمتد نطاق خبرتنا إلى ما هو أبعد من البحرين. من خلال خدمات استشارات التأشيرات العالمية، نقدم مساعدة احترافية لتأشيرات الزيارة والسياحة لمختلف الوجهات حول العالم، مع توجيه شامل لمتطلبات كل دولة."
                  : "Our expertise extends beyond Bahrain. Through our Global Visa Consultancy Services, we assist clients with visit visa applications and travel documentation for destinations worldwide, providing professional guidance based on the requirements of each destination."}
              </p>
              <p className="mt-4 text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
                {isArabic
                  ? "يهدف فريقنا المتمرس إلى جعل عملية استخراج التأشيرة واضحة ومنظمة ومريحة، مع تقديم مساعدة مخصصة وفقاً لاحتياجات كل عميل ووجهته المقصودة."
                  : "Our experienced team aims to make the visa process clear, organized, and convenient, while providing personalized assistance according to each client’s requirements and destination."}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/visas"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <span>{isArabic ? "استكشف وجهات التأشيرات" : "Explore Visa Destinations"}</span>
                  <ArrowUpRight className={`w-4 h-4 ${isArabic ? "rotate-[-90deg]" : ""}`} />
                </Link>
                <a
                  href={contact.whatsappLink("Hi Arizona, I need assistance with a Worldwide Visit Visa.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#dfb141] hover:bg-[#c49725] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer shadow-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{isArabic ? "استفسر عن تأشيرتك" : "Inquire Visa on WhatsApp"}</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-[#f4f5f8] flex flex-col justify-between h-[180px]">
                <Globe2 className="w-8 h-8 text-[#dfb141]" />
                <div>
                  <h4 className="text-base font-bold text-neutral-950">
                    {isArabic ? "تغطية قارية شاملة" : "Global Reach"}
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1">
                    {isArabic ? "أوروبا، بريطانيا، أمريكا، كندا، وآسيا." : "Europe, UK, USA, Canada & Asia."}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#f4f5f8] flex flex-col justify-between h-[180px]">
                <FileCheck2 className="w-8 h-8 text-emerald-600" />
                <div>
                  <h4 className="text-base font-bold text-neutral-950">
                    {isArabic ? "تدقيق المستندات" : "File Verification"}
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1">
                    {isArabic ? "مراجعة دقيقة لضمان القبول الرسمي." : "Thorough checks to ensure high approvals."}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#f4f5f8] flex flex-col justify-between h-[180px]">
                <Compass className="w-8 h-8 text-blue-600" />
                <div>
                  <h4 className="text-base font-bold text-neutral-950">
                    {isArabic ? "حجز مواعيد السفارات" : "Embassy Slots"}
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1">
                    {isArabic ? "مواعيد سريعة في مراكز التأشيرات." : "Expedited embassy biometric appointments."}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#f4f5f8] flex flex-col justify-between h-[180px]">
                <ShieldCheck className="w-8 h-8 text-[#dfb141]" />
                <div>
                  <h4 className="text-base font-bold text-neutral-950">
                    {isArabic ? "سرية وأمان كامل" : "100% Confidential"}
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1">
                    {isArabic ? "حماية كاملة لبيانات العملاء." : "Strict privacy and data confidentiality."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* WHY CHOOSE ARIZONA & OUR VISION */}
        {/* ========================================================================= */}
        <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-[1580px] mx-auto border-t border-neutral-100 bg-[#f8f9fc] rounded-3xl my-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Why Choose Us */}
            <div>
              <span className="text-xs font-bold tracking-widest text-[#dfb141] uppercase block mb-3">
                {isArabic ? "لماذا تختار أريزونا؟" : "WHY CHOOSE ARIZONA?"}
              </span>
              <h3 className="text-2xl sm:text-4xl font-normal tracking-tight text-neutral-950 leading-tight">
                {isArabic ? "خبرة تفوق 20 عاماً في" : "Over 20 Years of"}{" "}
                <span className="font-bold text-[#dfb141]">
                  {isArabic ? "الريادة والمصداقية" : "Excellence & Local Mastery"}
                </span>
              </h3>
              <p className="mt-4 text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                {isArabic
                  ? "مع أكثر من 20 عاماً من الخبرة المهنية، تجمع أريزونا بين المعرفة العميقة بالصناعة، الخبرة المحلية الواسعة في البحرين، والنهج الخدمي الدولي المتطور."
                  : "With 20+ years of professional experience, Arizona combines extensive industry knowledge, local expertise, and an international service approach."}
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-neutral-200/80">
                  <CheckCircle2 className="w-5 h-5 text-[#dfb141] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-neutral-900">
                      {isArabic ? "الاحترافية والشفافية التامة" : "Professionalism & Transparency"}
                    </h5>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {isArabic
                        ? "معاملات واضحة، خطوات محددة، وبدون أي تكاليف خفية."
                        : "Clear milestones, predictable timelines, and no hidden surprises."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-neutral-200/80">
                  <CheckCircle2 className="w-5 h-5 text-[#dfb141] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-neutral-900">
                      {isArabic ? "سرعة الإنجاز والمتابعة المباشرة" : "Efficiency & Continuous Follow-Up"}
                    </h5>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {isArabic
                        ? "فريق متابعة مخصص لتسريع الموافقات الحكومية ومعالجة الطلبات."
                        : "Dedicated consultants proactively expediting government approvals."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-neutral-200/80">
                  <CheckCircle2 className="w-5 h-5 text-[#dfb141] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-neutral-900">
                      {isArabic ? "حلول مصممة خصيصاً لاحتياجاتك" : "Personalized Practical Solutions"}
                    </h5>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {isArabic
                        ? "استشارات مخصصة تناسب أهداف عملك وميزانيتك بدقة."
                        : "Tailored strategies aligned with your specific business goals and scale."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision & Values */}
            <div>
              <span className="text-xs font-bold tracking-widest text-[#dfb141] uppercase block mb-3">
                {isArabic ? "رؤيتنا وقيمنا الراسخة" : "OUR VISION & CORE VALUES"}
              </span>
              <h3 className="text-2xl sm:text-4xl font-normal tracking-tight text-neutral-950 leading-tight">
                {isArabic ? "بناء شراكات طويلة الأمد" : "Building Long-Term"}{" "}
                <span className="font-bold text-[#dfb141]">
                  {isArabic ? "قائمة على الثقة والنتائج" : "Trust & Client Success"}
                </span>
              </h3>
              <p className="mt-4 text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                {isArabic
                  ? "رؤيتنا هي أن نكون الشريك المفضل والأول لكافة رواد الأعمال والمستثمرين في البحرين، من خلال تقديم خدمات مؤسسية واستشارية متكاملة تتجاوز التوقعات."
                  : "Our vision is to remain the premier gateway and trusted corporate partner for businesses, investors, and travelers in Bahrain and beyond."}
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-neutral-200/80">
                  <h4 className="text-sm font-bold text-neutral-950 mb-1">
                    {isArabic ? "السرية والأمان" : "Confidentiality"}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    {isArabic
                      ? "أعلى معايير الحماية لبيانات الشركات والمستثمرين."
                      : "Total privacy and strict data protection at every stage."}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-neutral-200/80">
                  <h4 className="text-sm font-bold text-neutral-950 mb-1">
                    {isArabic ? "الالتزام بالنتائج" : "Result-Driven"}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    {isArabic
                      ? "تركيز كامل على إنجاز المعاملات بنجاح من المرة الأولى."
                      : "Focused on getting your approvals right from the very first filing."}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-neutral-200/80">
                  <h4 className="text-sm font-bold text-neutral-950 mb-1">
                    {isArabic ? "الخبرة الموثوقة" : "Deep Expertise"}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    {isArabic
                      ? "فهم عميق لقوانين السجلات وهيئة سوق العمل بالبحرين."
                      : "Mastery of Bahrain commercial law, LMRA, MOIC & NPRA."}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-neutral-200/80">
                  <h4 className="text-sm font-bold text-neutral-950 mb-1">
                    {isArabic ? "دعم مستمر 24/7" : "Always Available"}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    {isArabic
                      ? "قنوات تواصل مباشرة للإجابة على استفساراتك في أي وقت."
                      : "Continuous WhatsApp and hotline support for urgent filings."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Interactive Core Service Detail Modal */}
      <CoreServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

      <Footer />
    </div>
  );
}
