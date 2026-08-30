"use client";

import React, { useState, useEffect } from "react";
import { VisaDetail } from "@/lib/data";
import { Sliders } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import DetailContentLayout from "@/components/DetailContentLayout";
import CtaSection from "@/components/CtaSection";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";
import { arabicVisaNames } from "@/lib/localizedData";
import ServiceCustomizerModal from "@/components/ServiceCustomizerModal";

export default function VisaDetailClient({ visa: initialVisa }: { visa: VisaDetail }) {
  const { isArabic, t } = useLanguage();
  const { contact } = useGeoLocation();
  const [visa, setVisa] = useState<VisaDetail>(initialVisa);
  const [customizerOpen, setCustomizerOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/visas")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.items)) {
          const match = d.items.find((item: any) => item.slug === initialVisa.slug);
          if (match) {
            setVisa({
              ...match,
              pricePkr: match.pricePkr || (initialVisa as any).pricePkr || "",
              priceBhd: match.priceBhd || (initialVisa as any).priceBhd || "",
              options: Array.isArray(match.options) && match.options.length > 0 ? match.options : (initialVisa as any).options || [],
              time: match.processingTime || match.time || initialVisa.time,
              heroImage: match.heroImage || match.image || initialVisa.heroImage,
              cardImage: match.cardImage || match.image || initialVisa.cardImage,
              tagline: match.tagline || initialVisa.tagline,
              overview: match.overview || match.description || initialVisa.overview,
              requirements: Array.isArray(match.requirements) && match.requirements.length > 0 ? match.requirements : initialVisa.requirements,
              processSteps: Array.isArray(match.processSteps) && match.processSteps.length > 0 ? match.processSteps : initialVisa.processSteps,
              included: Array.isArray(match.included) && match.included.length > 0 ? match.included : initialVisa.included,
            });
          }
        }
      })
      .catch(() => {});
  }, [initialVisa.slug]);

  const arInfo = arabicVisaNames[visa.slug];

  const visaName = isArabic && arInfo ? arInfo.name : visa.name;
  const visaOverview = isArabic && arInfo ? arInfo.overview : visa.overview;
  const visaTime = isArabic && arInfo ? arInfo.time : visa.time;
  const regionName = isArabic && arInfo ? arInfo.regionName : visa.regionName;

  const displayOptions =
    Array.isArray((visa as any).options) && (visa as any).options.length > 0
      ? (visa as any).options
      : visa.requirements.map((req, idx) => ({
          name: isArabic ? `المستند المطلوب ${idx + 1}` : `Requirement ${idx + 1}`,
          price: isArabic ? "مستند رسمي" : "Verified Document",
          badge: isArabic ? "إلزامي" : "Mandatory",
          desc: req,
          capacity: isArabic ? "تجهيز وتدقيق أريزونا" : "Arizona Submission Assist",
        }));

  return (
    <>
      {/* Page Banner with Heading Customize Button */}
      <PageBanner
        title={visaName}
        subtitle={visaOverview}
        breadcrumbCurrent={visaName}
        backgroundImage={visa.heroImage}
        actionButton={
          <button
            onClick={() => setCustomizerOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-lg hover:scale-105"
          >
            <Sliders className="w-4 h-4 text-blue-400" />
            <span>{isArabic ? "تخصيص ملف التأشيرة" : "Customize Visa Application"}</span>
          </button>
        }
      />

      {/* Detail Layout */}
      <DetailContentLayout
        title={visaName}
        categoryTag={`${visa.flag} ${regionName} ${isArabic ? "تأشيرة" : "Visa"}`}
        locationOrTagline={`${visaTime} • ${visa.entryType} • ${visa.validity}`}
        startingPrice={(visa as any).pricePkr || (visa as any).priceBhd || (isArabic ? "إجراءات وتوثيق معتمد" : "Verified Facilitation")}
        startingPricePkr={(visa as any).pricePkr}
        startingPriceBhd={(visa as any).priceBhd}
        rating={isArabic ? "5.0 ★ (مكتب التأشيرات المعتمد)" : "5.0 ★ (Certified Visa Desk)"}
        overviewText={visaOverview}
        heroImage={visa.heroImage}
        galleryImages={[visa.heroImage, visa.cardImage]}
        serviceOptions={displayOptions}
        backLinkHref="/visas"
        backLinkLabel={t("visas.view_all")}
        whatsAppText={`Hi Arizona, I want to apply for ${visa.name}. Please guide me with requirements and processing time.`}
        customizerServiceType="visas"
      />

      {/* Reusable Scenic CTA Banner */}
      <CtaSection
        title={isArabic ? `قدم على ${visaName} اليوم` : `Apply for Your ${visa.name} Today`}
        subtitle={
          isArabic
            ? "تجهيز معتمد لملفات السفارة، حجز مواعيد البصمات، وخدمة عملاء على مدار 24 ساعة."
            : "Verified document submission, embassy appointment scheduling, and 24/7 client care."
        }
        buttonText={isArabic ? "التقديم عبر الواتساب" : "Apply on WhatsApp"}
        buttonHref={contact.whatsappLink(`Hi Arizona, I want to apply for ${visa.name}. Please guide me.`)}
        backgroundImage={visa.heroImage}
        secondaryAction={
          <button
            onClick={() => setCustomizerOpen(true)}
            className="px-6 py-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm inline-flex items-center gap-2 transition-colors border border-slate-700 backdrop-blur-md cursor-pointer"
          >
            <Sliders className="w-4 h-4 text-blue-400" />
            <span>{isArabic ? "تخصيص ملف التأشيرة" : "Customize Visa Application"}</span>
          </button>
        }
      />

      {/* Service Customizer Modal */}
      <ServiceCustomizerModal
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        serviceType="visas"
        initialItemName={visa.country}
      />
    </>
  );
}
