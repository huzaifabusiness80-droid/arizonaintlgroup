"use client";

import React from "react";
import PageBanner from "@/components/PageBanner";
import DetailContentLayout from "@/components/DetailContentLayout";
import CtaSection from "@/components/CtaSection";
import { BusinessDivision, ServiceItemDetail } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";

export default function ServiceItemDetailClient({
  division,
  item,
}: {
  division: BusinessDivision;
  item: ServiceItemDetail;
}) {
  const { isArabic, t } = useLanguage();

  return (
    <>
      {/* Page Banner */}
      <PageBanner
        title={item.name}
        subtitle={item.desc}
        breadcrumbCurrent={item.name}
        backgroundImage={item.image || division.heroImage}
      />

      {/* Reusable Exact 2-Column Detail Layout */}
      <DetailContentLayout
        title={item.name}
        categoryTag={`${division.title} • ${item.tag}`}
        locationOrTagline={`${division.title} — ${isArabic ? "معتمد من أريزونا" : "Arizona Certified"}`}
        startingPrice={item.price || (isArabic ? "تواصل لمعرفة السعر" : "Contact for Price")}
        rating={isArabic ? "5.0 ★ خدمة معتمدة وموثقة" : "5.0 ★ Verified Facility"}
        overviewText={item.about || item.desc}
        heroImage={item.image}
        galleryImages={item.gallery && item.gallery.length > 0 ? item.gallery : [item.image]}
        serviceOptions={item.options || []}
        backLinkHref={`/services/${division.slug}`}
        backLinkLabel={isArabic ? `عرض جميع خدمات ${division.title}` : `View All ${division.title}`}
        whatsAppText={`Hi Arizona, I am interested in booking "${item.name}" under ${division.title}. Please share available packages and pricing.`}
      />

      {/* Reusable Scenic CTA Banner */}
      <CtaSection
        title={isArabic ? `جاهز لحجز ${item.name}؟` : `Ready to Book ${item.name}?`}
        subtitle={
          isArabic
            ? "تحدث مع فريقنا المتخصص اليوم للحصول على عروض أسعار مخصصة ومعالجة فورية ودعم 24/7."
            : "Speak with our dedicated team today for customized quotations, immediate processing, and 24/7 client care."
        }
        buttonText={isArabic ? "تحدث عبر الواتساب" : "Chat on WhatsApp"}
        buttonHref={`https://wa.me/923135921434?text=${encodeURIComponent(`Hi Arizona, I want to book ${item.name}. Please guide me.`)}`}
        backgroundImage={item.image || division.heroImage}
      />
    </>
  );
}
