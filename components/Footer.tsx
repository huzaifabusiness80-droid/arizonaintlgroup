"use client";

import React from "react";
import Link from "next/link";
import { PhoneCall, ShieldCheck } from "lucide-react";
import { useGeoLocation } from "@/context/GeoContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { isPakistan, contact } = useGeoLocation();
  const { isArabic, t } = useLanguage();

  return (
    <footer className="w-full bg-neutral-950 text-white pt-16 pb-12 border-t border-neutral-900">
      <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className={`grid grid-cols-1 md:grid-cols-2 ${isPakistan ? "lg:grid-cols-5" : "lg:grid-cols-4"} gap-10 lg:gap-8 pb-14 border-b border-neutral-800`}>
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-white flex items-center gap-2"
            >
              <span>Arizona</span>
            </Link>
            <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-normal max-w-sm leading-relaxed">
              {t("footer.desc")}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={contact.whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white hover:text-neutral-950 text-xs font-medium transition-all"
                dir="ltr"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{contact.phone}</span>
              </a>
            </div>
          </div>

          {/* Travel & Visas Col */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              {t("footer.col_travel")}
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-normal">
              <li><Link href="/services/travel-tours" className="hover:text-white transition-colors">{isArabic ? "حجز تذاكر الطيران" : "Flight Ticket Booking"}</Link></li>
              <li><Link href="/visas" className="hover:text-white transition-colors">{isArabic ? "مركز التأشيرات العالمي" : "Worldwide Visa Hub"}</Link></li>
              <li><Link href="/visas/bahrain" className="hover:text-white transition-colors">{isArabic ? "تأشيرة البحرين الإلكترونية" : "Bahrain eVisa"}</Link></li>
              <li><Link href="/visas/spain" className="hover:text-white transition-colors">{isArabic ? "تأشيرات الشنغن الأوروبية" : "Schengen Europe Visas"}</Link></li>
              <li><Link href="/visas/uk" className="hover:text-white transition-colors">{isArabic ? "تأشيرة بريطانيا" : "UK Visitor Visa"}</Link></li>
              <li><Link href="/visas/usa" className="hover:text-white transition-colors">{isArabic ? "تأشيرة أمريكا B1/B2" : "USA B1/B2 Visas"}</Link></li>
            </ul>
          </div>

          {/* Bahrain Business Col */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              {isPakistan ? t("footer.col_business_pk") : t("footer.col_business")}
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-normal">
              {isPakistan && (
                <>
                  <li><Link href="/services/rent-a-car" className="hover:text-white transition-colors">{isArabic ? "تأجير سيارات يومي وشهري" : "Daily & Monthly Car Rental"}</Link></li>
                  <li><Link href="/services/rent-a-car" className="hover:text-white transition-colors">{isArabic ? "توصيل واستقبال المطار" : "Airport Pickup & Transfers"}</Link></li>
                </>
              )}
              <li><Link href="/services/business-bahrain" className="hover:text-white transition-colors">{isArabic ? "تأسيس بالبحرين بملكية 100%" : "100% Foreign Setup Bahrain"}</Link></li>
              <li><Link href="/services/business-bahrain" className="hover:text-white transition-colors">{isArabic ? "إصدار السجل التجاري (CR)" : "Commercial Registration (CR)"}</Link></li>
              <li><Link href="/services/business-bahrain" className="hover:text-white transition-colors">{isArabic ? "مكاتب مرخصة مع عداد EWA" : "Office Space with EWA"}</Link></li>
              <li><Link href="/services/business-bahrain" className="hover:text-white transition-colors">{isArabic ? "تأشيرات وإقامة المستثمر LMRA" : "LMRA & Investor Visas"}</Link></li>
              {!isPakistan && (
                <>
                  <li><Link href="/blogs" className="hover:text-white transition-colors">{isArabic ? "المقالات والأدلة" : "Articles & Guides"}</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">{isArabic ? "عن مجموعة أريزونا" : "About Arizona Group"}</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">{isArabic ? "اتصل بفريق الدعم" : "Contact Support"}</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Mobiles & Tech Col (Only shown if in Pakistan) */}
          {isPakistan && (
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
                {t("footer.col_tech")}
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-400 font-normal">
                <li><Link href="/services/mobiles-tech" className="hover:text-white transition-colors">{isArabic ? "أحدث الهواتف الذكية" : "Flagship Smartphones"}</Link></li>
                <li><Link href="/services/mobiles-tech" className="hover:text-white transition-colors">{isArabic ? "شواحن سريعة وكابلات" : "Fast Chargers & Adapters"}</Link></li>
                <li><Link href="/services/mobiles-tech" className="hover:text-white transition-colors">{isArabic ? "ساعات ذكية وسماعات" : "Smartwatches & Audio"}</Link></li>
                <li><Link href="/services/mobiles-tech" className="hover:text-white transition-colors">{isArabic ? "توصيل منزلي سريع" : "Same-Day Home Delivery"}</Link></li>
                <li><Link href="/blogs" className="hover:text-[#c9a227] transition-colors">{isArabic ? "المقالات والأدلة" : "Articles & Guides"}</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">{isArabic ? "عن مجموعة أريزونا" : "About Arizona Group"}</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">{isArabic ? "اتصل بفريق الدعم" : "Contact Support"}</Link></li>
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-500 font-normal">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-neutral-400" />
            <span>{t("footer.disclaimer")}</span>
          </div>
          <span>&copy; {new Date().getFullYear()} {t("footer.copyright")}</span>
        </div>
      </div>
    </footer>
  );
}
