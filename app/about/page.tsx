"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import {
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  PhoneCall,
  Building2,
  FileCheck2,
  Landmark,
  Globe2,
  Users,
  ShieldCheck,
  Plane,
  Briefcase,
  Scale,
  CreditCard,
  BadgePercent,
  Award,
  Headphones,
  Compass,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";

export default function AboutPage() {
  const { isArabic, t } = useLanguage();
  const { contact } = useGeoLocation();

  const coreServices = [
    {
      icon: Building2,
      titleEn: "Company Formation & Business Setup",
      titleAr: "تأسيس الشركات وإطلاق الأعمال",
      descEn: "Turnkey company formation in Bahrain with up to 100% foreign ownership rights.",
      descAr: "تأسيس متكامل للشركات في البحرين بحقوق ملكية أجنبية كاملة تصل إلى 100%.",
    },
    {
      icon: FileCheck2,
      titleEn: "Commercial Registration (CR) Services",
      titleAr: "خدمات السجل التجاري (CR)",
      descEn: "Fast CR issuance, activity additions, branch registrations, and legal renewals.",
      descAr: "إصدار السجل التجاري، إضافة الأنشطة، تسجيل الفروع، وتجديد التراخيص.",
    },
    {
      icon: Landmark,
      titleEn: "MOIC & Government Services",
      titleAr: "خدمات وزارة الصناعة والتجارة MOIC",
      descEn: "Direct liaison and swift approvals with the Ministry of Industry and Commerce.",
      descAr: "تنسيق مباشر وموافقات سريعة مع وزارة الصناعة والتجارة والجهات الحكومية.",
    },
    {
      icon: Users,
      titleEn: "LMRA Services & Labour Market Solutions",
      titleAr: "خدمات هيئة تنظيم سوق العمل LMRA",
      descEn: "Work permit ceilings, investor visas, employee visas, and labour compliance.",
      descAr: "تخصيص سقف تصاريح العمل، إقامات المستثمر، وتأشيرات الموظفين المعتمدة.",
    },
    {
      icon: Compass,
      titleEn: "Immigration & Visa Consultancy",
      titleAr: "استشارات الهجرة والتأشيرات",
      descEn: "Strategic residency planning, golden visas, and investor immigration guidance.",
      descAr: "تخطيط استراتيجي للإقامة، الإقامة الذهبية، واستشارات الهجرة للمستثمرين.",
    },
    {
      icon: Globe2,
      titleEn: "Worldwide Visit Visa Services",
      titleAr: "خدمات تأشيرات الزيارة حول العالم",
      descEn: "End-to-end documentation and application processing for global visit visas.",
      descAr: "معالجة شاملة للمستندات والطلبات لتأشيرات الزيارة والسياحة العالمية.",
    },
    {
      icon: Plane,
      titleEn: "Global Travel & Visa Assistance",
      titleAr: "خدمات السفر والتأشيرات العالمية",
      descEn: "Flight bookings, itinerary planning, hotel reservations, and embassy submissions.",
      descAr: "حجوزات طيران وفنادق وجداول سياحية متكاملة وحجز مواعيد السفارات.",
    },
    {
      icon: Scale,
      titleEn: "Legal & Corporate Support Services",
      titleAr: "الدعم القانوني والخدمات المؤسسية",
      descEn: "Corporate agreements, power of attorney, legal translations, and attestations.",
      descAr: "صياغة العقود التجارية، الوكالات القانونية، الترجمة المعتمدة، والتصديقات.",
    },
    {
      icon: CreditCard,
      titleEn: "Bank Account & Banking Assistance",
      titleAr: "فتح الحسابات البنكية والمصرفية",
      descEn: "Smooth opening of corporate and commercial accounts with leading banks in Bahrain.",
      descAr: "تسهيل فتح الحسابات البنكية التجارية للشركات لدى كبرى البنوك في البحرين.",
    },
    {
      icon: BadgePercent,
      titleEn: "Cooperative & Financial Solutions",
      titleAr: "الحلول المالية والتعاونية",
      descEn: "Bookkeeping advisory, financial feasibility reviews, and structured advisory.",
      descAr: "استشارات الدفاتر المحاسبية، دراسات الجدوى المالية، والحلول المنظمة.",
    },
    {
      icon: ShieldCheck,
      titleEn: "Business Licensing & Regulatory Support",
      titleAr: "التراخيص التجارية والدعم التنظيمي",
      descEn: "Special ministry approvals (Health, Tourism, Education, Transport & Municipal).",
      descAr: "استخراج الموافقات الخاصة من الوزارات (الصحة، السياحة، التعليم، والبلديات).",
    },
    {
      icon: Award,
      titleEn: "Investor & Entrepreneur Support",
      titleAr: "دعم المستثمرين ورواد الأعمال",
      descEn: "Dedicated concierge assistance for foreign investors entering Bahrain and GCC.",
      descAr: "خدمات كبار الشخصيات لدخول المستثمرين الأجانب إلى سوق البحرين والخليج.",
    },
    {
      icon: Briefcase,
      titleEn: "Corporate Consultancy & Business Advisory",
      titleAr: "الاستشارات المؤسسية وتطوير الأعمال",
      descEn: "Market entry strategies, operational restructuring, and ongoing growth advisory.",
      descAr: "استراتيجيات دخول السوق، إعادة الهيكلة المؤسسية، واستشارات النمو المستدام.",
    },
    {
      icon: Headphones,
      titleEn: "Ongoing Corporate & Government Services",
      titleAr: "المتابعة المؤسسية والخدمات الحكومية الدائمة",
      descEn: "Annual audit compliance, CR renewals, address updates, and statutory filings.",
      descAr: "الامتثال للتدقيق السنوي، تجديد السجلات، تعديل العناوين، والإقرارات الرسمية.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between">
      <Navbar />

      <main>
        {/* Page Banner */}
        <PageBanner
          title={isArabic ? "عن مجموعة أريزونا الدولية" : "About Arizona International"}
          subtitle={
            isArabic
              ? "شريكك الموثوق في مملكة البحرين لتأسيس الشركات، خدمات الهجرة، التأشيرات والحلول المؤسسية."
              : "Your Trusted Partner in Bahrain for Business, Immigration, Visas & Corporate Solutions."
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
            {/* Leadership Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl bg-neutral-950 border-4 border-white/80 group">
                <img
                  src="/image.png"
                  alt="Founder & Managing Director - Arizona International Group"
                  className="w-full h-auto object-cover object-top aspect-[4/5] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                
                {/* Floating Badge on Photo */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#dfb141] text-neutral-950 text-[11px] font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isArabic ? "القيادة التنفيذية" : "Executive Leadership"}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Arizona International Group
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-normal mt-0.5">
                    {isArabic ? "مملكة البحرين • حضور دولي" : "Kingdom of Bahrain • Global Reach"}
                  </p>
                </div>
              </div>
            </div>

            {/* Leadership Message & Vision */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dfb141]/15 text-neutral-950 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#dfb141]" />
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
                  ? "تعد أريزونا – مملكة البحرين شركة استشارات وخدمات أعمال راسخة ومهنية بخبرة تزيد عن 20 عاماً في هذا المجال، حيث تقدم حلولاً موثوقة وشاملة للأفراد ورواد الأعمال والمستثمرين والشركات."
                  : "Arizona – Kingdom of Bahrain is a professionally established consultancy and business services firm with over 20 years of industry experience, providing reliable and comprehensive solutions to individuals, entrepreneurs, investors, and businesses."}
              </p>

              <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
                {isArabic
                  ? "لأكثر من عقدين من الزمن، ساعدنا عملاءنا في تأسيس الأعمال، تسجيل الشركات، إجراءات الهجرة، خدمات تأشيرات الزيارة العالمية، المعاملات القانونية والحكومية، خدمات LMRA، خدمات MOIC، الحلول المصرفية، والاستشارات المؤسسية."
                  : "For more than two decades, we have assisted clients with business setup, company formation, immigration, worldwide visit visa services, legal and government-related procedures, LMRA services, MOIC services, banking solutions, and corporate consultancy."}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href={contact.whatsappLink("Hi Arizona, I would like to consult with your leadership team regarding business & visas.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#dfb141] text-white text-xs sm:text-sm font-bold hover:bg-[#c49725] transition-all shadow-md active:scale-95"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{isArabic ? "استشارة مباشرة مع المستشار" : "Direct WhatsApp Consultation"}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 14 CORE SERVICES GRID */}
        {/* ========================================================================= */}
        <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-[1580px] mx-auto border-t border-neutral-100 bg-[#fbfbfe]">
          <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-[#dfb141] uppercase block mb-3">
              {isArabic ? "خدماتنا الأساسية والمتكاملة" : "OUR CORE SERVICES"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-neutral-950">
              {isArabic ? "حلول شاملة للشركات و" : "Comprehensive Solutions for"}{" "}
              <span className="font-bold">{isArabic ? "التأشيرات العالمية" : "Business & Global Mobility"}</span>
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
              {isArabic
                ? "خبرة ممتدة لأكثر من 20 عاماً تغطي كافة الإجراءات الحكومية، السجلات التجارية، وتأشيرات السفر حول العالم."
                : "Backed by 20+ years of institutional mastery across Bahrain government procedures, corporate structuring, and worldwide visas."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coreServices.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <div
                  key={index}
                  className="p-6 sm:p-7 rounded-[26px] bg-white border border-neutral-200/80 hover:border-[#dfb141] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#f5f6fa] group-hover:bg-[#dfb141] group-hover:text-white text-neutral-800 flex items-center justify-center mb-5 transition-colors">
                      <ServiceIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-950 group-hover:text-[#dfb141] transition-colors leading-snug">
                      {isArabic ? service.titleAr : service.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 font-normal mt-2.5 leading-relaxed">
                      {isArabic ? service.descAr : service.descEn}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-semibold text-neutral-400 group-hover:text-neutral-900 transition-colors">
                    <span>{isArabic ? "خدمة معتمدة 100%" : "Certified Service"}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${isArabic ? "rotate-[-90deg]" : ""}`} />
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
                <span className="font-bold">{isArabic ? "لكافة الوجهات العالمية" : "Seamless Travel Guidance"}</span>
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
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition-colors"
                >
                  <span>{isArabic ? "استكشف وجهات التأشيرات" : "Explore Visa Destinations"}</span>
                  <ArrowUpRight className={`w-4 h-4 ${isArabic ? "rotate-[-90deg]" : ""}`} />
                </Link>
                <a
                  href={contact.whatsappLink("Hi Arizona, I need assistance with a Worldwide Visit Visa.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#dfb141] hover:bg-[#c49725] text-white text-xs sm:text-sm font-bold transition-colors"
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
                <span className="font-bold">{isArabic ? "الريادة والمصداقية" : "Excellence & Local Mastery"}</span>
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
                      {isArabic ? "وضوح تام في الخطوات والرسوم بدون مفاجآت." : "Clear timelines, transparent procedures, and zero hidden costs."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-neutral-200/80">
                  <CheckCircle2 className="w-5 h-5 text-[#dfb141] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-neutral-900">
                      {isArabic ? "السرية والكفاءة العالية" : "Confidentiality & Swift Execution"}
                    </h5>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {isArabic ? "حماية بيانات المستثمرين وسرعة إتمام المعاملات." : "Secure client handling and prompt government turnaround."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-neutral-200/80">
                  <CheckCircle2 className="w-5 h-5 text-[#dfb141] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-neutral-900">
                      {isArabic ? "علاقات استراتيجية طويلة الأمد" : "Long-Term Strategic Partnerships"}
                    </h5>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {isArabic ? "نرافقك من خطوة التأسيس وحتى نمو وتوسع أعمالك." : "We support your journey from startup to enterprise scaling."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Vision Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-950 text-white flex flex-col justify-between h-full space-y-8 shadow-xl">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#dfb141] uppercase block mb-3">
                  {isArabic ? "رؤيتنا المستقبلية" : "OUR VISION"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
                  {isArabic ? "الريادة العالمية في استشارات الأعمال والتأشيرات" : "Leading Excellence in Global Consulting & Mobility"}
                </h3>
                <p className="mt-4 text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">
                  {isArabic
                    ? "أن نكون الاسم الرائد والموثوق به في مجال استشارات الأعمال، الخدمات المؤسسية، الهجرة، المساعدة في التأشيرات العالمية، وحلول الأعمال المتكاملة، مع تقديم التميز والقيمة لعملائنا في مملكة البحرين وحول العالم."
                    : "To become a leading and trusted name in business consultancy, corporate services, immigration, global visa assistance, and business solutions, delivering excellence and value to clients in Bahrain and around the world."}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-800">
                <div className="text-xs text-[#dfb141] font-semibold uppercase tracking-wider mb-1">
                  Arizona – Kingdom of Bahrain
                </div>
                <div className="text-xs text-neutral-400">
                  20+ Years of Experience | Global Visa Services | Business Consultancy | Immigration | Company Formation | Corporate Solutions
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FINAL EXECUTIVE CTA STRIP */}
        {/* ========================================================================= */}
        <section className="w-full py-16 px-4 sm:px-8 lg:px-12 max-w-[1580px] mx-auto">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-8 border border-neutral-800 shadow-2xl">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-widest text-[#dfb141] uppercase block">
                {isArabic ? "مجموعة أريزونا – مملكة البحرين" : "ARIZONA – KINGDOM OF BAHRAIN"}
              </span>
              <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                {isArabic ? "أعمالك. رحلتك. خبرتنا." : "Your Business. Your Journey. Our Expertise."}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl font-normal leading-relaxed">
                {isArabic
                  ? "سواء كنت ترغب في تأسيس شركة في البحرين، إدارة إجراءات LMRA أو MOIC، الحصول على دعم مصرفي وقانوني، أو التقدم لتأشيرة زيارة عالمية، أريزونا هي شريكك المهني الموثوق."
                  : "Whether you are looking to establish a company in Bahrain, manage LMRA or MOIC procedures, obtain corporate and banking assistance, explore immigration solutions, or apply for a worldwide visit visa, Arizona is committed to being your trusted professional partner."}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 shrink-0">
              <a
                href={contact.whatsappLink("Hi Arizona, I would like to inquire about your corporate setup and visa services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#dfb141] text-white text-xs sm:text-sm font-bold hover:bg-[#c49725] transition-all shadow-md active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{isArabic ? "تواصل عبر الواتساب" : "Inquire on WhatsApp"}</span>
              </a>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                <span>{isArabic ? "عرض قطاعات الأعمال" : "View Business Divisions"}</span>
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
