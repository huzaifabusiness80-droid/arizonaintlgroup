"use client";

import React, { useState, useEffect } from "react";
import PageBanner from "@/components/PageBanner";
import DetailContentLayout from "@/components/DetailContentLayout";
import CtaSection from "@/components/CtaSection";
import { BusinessDivision, ServiceItemDetail } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";

export default function ServiceItemDetailClient({
  division,
  item: initialItem,
}: {
  division: BusinessDivision;
  item: ServiceItemDetail;
}) {
  const { isArabic, t } = useLanguage();
  const { contact } = useGeoLocation();

  const [item, setItem] = useState<ServiceItemDetail>(initialItem);

  useEffect(() => {
    let apiEndpoint = "";
    if (division.slug === "travel-tours") apiEndpoint = "/api/admin/tours";
    else if (division.slug === "rent-a-car") apiEndpoint = "/api/admin/cars";
    else if (division.slug === "business-bahrain") apiEndpoint = "/api/admin/bahrain";
    else if (division.slug === "mobiles-tech") apiEndpoint = "/api/admin/mobiles";

    if (!apiEndpoint) return;

    fetch(apiEndpoint)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.items)) {
          const match = d.items.find((it: any) => it.slug === initialItem.slug);
          if (match) {
            setItem({
              slug: match.slug,
              name: match.name,
              desc: match.description || match.desc || initialItem.desc,
              tag: match.tag || initialItem.tag,
              image: match.image || initialItem.image,
              price: match.basePrice || match.price || initialItem.price,
              pricePkr: match.pricePkr || (initialItem as any).pricePkr || "",
              priceBhd: match.priceBhd || (initialItem as any).priceBhd || "",
              gallery: Array.isArray(match.gallery) && match.gallery.length > 0 ? match.gallery : initialItem.gallery,
              options: Array.isArray(match.options) && match.options.length > 0 ? match.options : initialItem.options,
              about: match.about || initialItem.about,
            });
          }
        }
      })
      .catch(() => {});
  }, [division.slug, initialItem.slug]);


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
        startingPricePkr={(item as any).pricePkr}
        startingPriceBhd={(item as any).priceBhd}
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
        buttonHref={
          division.slug === "business-bahrain"
            ? `https://wa.me/97332306963?text=${encodeURIComponent(`Hi Arizona Bahrain, I want to book ${item.name}. Please guide me.`)}`
            : contact.whatsappLink(`Hi Arizona, I want to book ${item.name}. Please guide me.`)
        }
        backgroundImage={item.image || division.heroImage}
      />
    </>
  );
}
