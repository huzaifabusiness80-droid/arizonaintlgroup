"use client";

import React, { useState } from "react";
import { ChevronDown, PhoneCall } from "lucide-react";
import { useGeoLocation } from "@/context/GeoContext";
import { useLanguage } from "@/context/LanguageContext";
import { localizedFaqs } from "@/lib/localizedData";

export default function FaqSection() {
  const { isPakistan, contact } = useGeoLocation();
  const { language, isArabic, t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>("cr-setup");

  const allFaqs = localizedFaqs[language] || localizedFaqs.en;

  const displayFaqs = allFaqs.filter((f) => {
    if (!isPakistan && (f.category === "cars" || f.category === "tech")) {
      return false;
    }
    return true;
  }).slice(0, 7);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto border-b border-slate-200">
      <div className="w-full">
        {/* Centered Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-[#2563eb] text-xs font-medium uppercase tracking-wider mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
            <span>{t("faq.badge")}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 leading-tight">
            {t("faq.title1")} <br />
            <span className="text-[#2563eb]">{t("faq.title2")}</span>
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal max-w-xl text-center">
            {t("faq.desc")}
          </p>
        </div>

        {/* Centered FAQ Accordion List */}
        <div className="space-y-3 max-w-4xl mx-auto">
          {displayFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all p-4 sm:p-5 ${
                  isOpen
                    ? "bg-white border-blue-200 shadow-xs"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                >
                  <span className={`text-sm sm:text-base font-semibold tracking-tight transition-colors ${isOpen ? "text-[#2563eb]" : "text-slate-900 group-hover:text-[#2563eb]"}`}>
                    {faq.question}
                  </span>

                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                      isOpen
                        ? "bg-[#2563eb] text-white rotate-180"
                        : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className={`pt-3 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed ${isArabic ? "pl-6" : "pr-6"}`}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Centered Bottom WhatsApp Strip */}
        <div className="max-w-4xl mx-auto mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs text-slate-500 font-normal">
            {t("faq.bottom_text")}
          </p>
          <a
            href={contact.whatsappLink("Hi Arizona International Group, I have a question regarding your services.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2563eb] hover:underline"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>{isArabic ? `استشارة فورية عبر الواتساب (${contact.phone})` : `Instant WhatsApp Advisory (${contact.phone})`}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
