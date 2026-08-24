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
  const { isPakistan } = useGeoLocation();
  const { language, isArabic, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>("cr-setup");

  // Fetch localized FAQ questions according to active language
  const activeFaqs = localizedFaqs[language] || localizedFaqs.en;

  // Filter tabs for non-Pakistan visitors
  const availableTabs = isPakistan
    ? faqTabs
    : faqTabs.filter((tab) => tab.id !== "cars" && tab.id !== "tech");

  // Filter questions for non-Pakistan visitors
  const availableFaqs = isPakistan
    ? activeFaqs
    : activeFaqs.filter((item) => item.category !== "cars" && item.category !== "tech");

  const filteredFaqs =
    activeTab === "all"
      ? availableFaqs
      : availableFaqs.filter((item) => item.category === activeTab);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="w-full bg-white py-20 sm:py-28 border-b border-neutral-100">
      <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header Row (Left: Heading & Badge, Right: Subtext) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-10 mb-12 sm:mb-16">
          <div>
            {/* Top Badge / Category Tab */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/90 text-neutral-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#dfb141] ring-2 ring-[#dfb141]/30" />
              <span>{t("faq.badge")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.03em] text-neutral-950 leading-[1.18]">
              {t("faq.title1")} <br />
              <span className="font-bold text-neutral-950">{t("faq.title2")}</span>
            </h2>
          </div>

          <div className="max-w-md lg:max-w-lg">
            <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed md:text-right">
              {t("faq.desc")}
            </p>
          </div>
        </div>

        {/* Category Tabs Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {availableTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-neutral-950 text-white shadow-xs"
                  : "bg-[#f4f5f8] text-neutral-600 hover:bg-neutral-200 hover:text-neutral-950"
              }`}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>

        {/* Clean Accordion List with Horizontal Dividers */}
        <div className="border-t border-neutral-200 divide-y divide-neutral-200">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-6 sm:py-8 transition-colors">
                {/* Question Row */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between gap-6 text-left cursor-pointer group"
                  aria-expanded={isOpen}
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
            href="https://wa.me/923135921434"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-950 hover:text-[#dfb141] transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-[#dfb141]" />
            <span>{t("faq.chat_whatsapp")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
