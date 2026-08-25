"use client";

import React, { useState } from "react";
import { ArrowDown, ArrowUp, PhoneCall } from "lucide-react";
import { useGeoLocation } from "@/context/GeoContext";
import { useLanguage } from "@/context/LanguageContext";
import { localizedFaqs } from "@/lib/localizedData";

const faqTabs = [
  { id: "all", labelKey: "faq.tab_all" },
  { id: "business", labelKey: "faq.tab_business" },
  { id: "visas", labelKey: "faq.tab_visas" },
  { id: "travel", labelKey: "faq.tab_travel" },
  { id: "cars", labelKey: "faq.tab_cars" },
  { id: "tech", labelKey: "faq.tab_tech" },
];

export default function FaqSection() {
  const { isPakistan, contact } = useGeoLocation();
  const { language, isArabic, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>("cr-setup");

  // Fetch localized FAQ questions according to active language
  const activeFaqs = localizedFaqs[language] || localizedFaqs.en;

  // Filter tabs for non-Pakistan visitors
  const availableTabs = isPakistan
    ? faqTabs
    : faqTabs.filter((tab) => tab.id !== "cars" && tab.id !== "tech");

  const filteredFaqs =
    activeTab === "all"
      ? activeFaqs.filter((f) => {
          if (!isPakistan && (f.category === "cars" || f.category === "tech")) {
            return false;
          }
          return true;
        })
      : activeFaqs.filter((f) => f.category === activeTab);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full  py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-[1580px] mx-auto border-b border-neutral-200/80">
      <div className="w-full">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/90 text-neutral-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#dfb141] ring-2 ring-[#dfb141]/30" />
            <span>{t("faq.badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em] text-neutral-950 mt-1 leading-[1.18]">
            {t("faq.title1")} <br />
            <span className="font-bold text-neutral-950">{t("faq.title2")}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 font-normal max-w-2xl leading-relaxed">
            {t("faq.desc")}
          </p>
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {availableTabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-[#dfb141] text-white shadow-sm"
                    : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
                }`}
              >
                {t(tab.labelKey)}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl sm:rounded-3xl border transition-all duration-200 p-6 sm:p-7 ${
                  isOpen
                    ? "bg-white border-neutral-300 shadow-sm"
                    : "bg-white/80 border-neutral-200/90 hover:border-neutral-300"
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                >
                  {/* Question Heading */}
                  <span className="text-base sm:text-xl lg:text-[21px] font-normal tracking-tight text-neutral-900 group-hover:text-neutral-950">
                    {faq.question}
                  </span>

                  {/* Circular Button */}
                  <div
                    className={`w-9 sm:w-10 h-9 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-[#e29312] text-white shadow-sm"
                        : "bg-[#f0f1f4] text-neutral-700 group-hover:bg-neutral-200 group-hover:text-neutral-900"
                    }`}
                  >
                    {isOpen ? (
                      <ArrowUp className="w-4 h-4" />
                    ) : (
                      <ArrowDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className={`pt-4 ${isArabic ? "pl-12" : "pr-12"} text-xs sm:text-sm lg:text-[14.5px] text-neutral-600 font-normal leading-relaxed max-w-4xl animate-in fade-in slide-in-from-top-2 duration-300`}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Direct Inquire Strip */}
        <div className="mt-14 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-neutral-500">
            {t("faq.bottom_text")}
          </p>
          <a
            href={contact.whatsappLink("Hi Arizona, I have a question.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-950 hover:text-[#dfb141] transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-[#dfb141]" />
            <span>{isArabic ? `تحدث معنا عبر الواتساب (${contact.phone})` : `Chat Directly on WhatsApp (${contact.phone})`}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
