"use client";

import React from "react";
import { VisaDetail } from "@/lib/data";
import PageBanner from "@/components/PageBanner";
import DetailContentLayout from "@/components/DetailContentLayout";
import CtaSection from "@/components/CtaSection";
import { useLanguage } from "@/context/LanguageContext";
import { arabicVisaNames } from "@/lib/localizedData";

export default function VisaDetailClient({ visa }: { visa: VisaDetail }) {
  const { isArabic, t } = useLanguage();
  const arInfo = arabicVisaNames[visa.slug];

  const visaName = isArabic && arInfo ? arInfo.name : visa.name;
  const visaOverview = isArabic && arInfo ? arInfo.overview : visa.overview;
  const visaTime = isArabic && arInfo ? arInfo.time : visa.time;
  const regionName = isArabic && arInfo ? arInfo.regionName : visa.regionName;

  return (
    <>
      {/* Page Banner */}
      <PageBanner
        title={visaName}
        subtitle={visaOverview}
        breadcrumbCurrent={visaName}
        backgroundImage={visa.heroImage}
      />

      {/* Detail Layout */}
      <DetailContentLayout
        title={visaName}
        categoryTag={`${visa.flag} ${regionName} ${isArabic ? "تأشيرة" : "Visa"}`}
        locationOrTagline={`${visaTime} • ${visa.entryType} • ${visa.validity}`}
        startingPrice={isArabic ? "إجراءات وتوثيق معتمد" : "Verified Facilitation"}
        rating={isArabic ? "5.0 ★ (مكتب التأشيرات المعتمد)" : "5.0 ★ (Certified Visa Desk)"}
        overviewText={visaOverview}
        heroImage={visa.heroImage}
        galleryImages={[visa.heroImage, visa.cardImage]}
        serviceOptions={visa.requirements.map((req, idx) => ({
          name: isArabic ? `المستند المطلوب ${idx + 1}` : `Requirement ${idx + 1}`,
          price: isArabic ? "مستند رسمي" : "Verified Document",
          badge: isArabic ? "إلزامي" : "Mandatory",
          desc: req,
          capacity: isArabic ? "تجهيز وتدقيق أريزونا" : "Arizona Submission Assist",
        }))}
        backLinkHref="/visas"
        backLinkLabel={t("visas.view_all")}
        whatsAppText={`Hi Arizona, I want to apply for ${visa.name}. Please guide me with requirements and processing time.`}
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
        buttonHref={`https://wa.me/923135921434?text=${encodeURIComponent(`Hi Arizona, I want to apply for ${visa.name}. Please guide me.`)}`}
        backgroundImage={visa.heroImage}
      />
    </>
  );
}
