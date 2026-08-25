"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  PhoneCall,
  CheckCircle2,
  Building2,
  FileCheck2,
  Landmark,
  Users2,
  Compass,
  Scale,
  ShieldCheck,
  Rocket,
  Briefcase,
  Sparkles,
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";
import { CoreServiceItem } from "@/lib/core-services";
import { useGeoLocation } from "@/context/GeoContext";
import { useLanguage } from "@/context/LanguageContext";

interface CoreServiceModalProps {
  service: CoreServiceItem | null;
  onClose: () => void;
}

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

export default function CoreServiceModal({ service, onClose }: CoreServiceModalProps) {
  const { contact } = useGeoLocation();
  const { isArabic } = useLanguage();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (service) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  const IconComponent = iconMap[service.iconName] || Building2;
  const title = isArabic ? service.titleAr : service.titleEn;
  const tagline = isArabic ? service.taglineAr : service.taglineEn;
  const overview = isArabic ? service.overviewAr : service.overviewEn;

  const whatsappMessage = `Hi Arizona International Group, I would like to inquire about: "${service.titleEn}". Please provide more details.`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-auto max-h-[90vh] flex flex-col text-left"
          dir={isArabic ? "rtl" : "ltr"}
        >
          {/* Header */}
          <div className="relative p-6 sm:p-8 bg-neutral-950 text-white flex-shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#dfb141] text-neutral-950 flex items-center justify-center shrink-0 shadow-lg">
                  <IconComponent className="w-7 h-7" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#dfb141] text-[11px] font-bold uppercase tracking-wider mb-2">
                    <span>
                      {isArabic ? `الخدمة 0${service.number}` : `Service 0${service.number}`}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    {title}
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-normal mt-4 leading-relaxed border-t border-white/10 pt-3">
              {tagline}
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
            {/* Overview Box */}
            <div className="p-5 rounded-2xl bg-[#f8f9fc] border border-neutral-200/80">
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                {isArabic ? "نظرة عامة على الخدمة" : "Service Overview"}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-700 font-normal leading-relaxed">
                {overview}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-bold text-neutral-950 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#dfb141]" />
                  <span>
                    {isArabic ? "كافة الخدمات والمجالات المشمولة" : "Included Scope & Capabilities"}
                  </span>
                </h3>
                <span className="text-[11px] text-[#c49725] font-semibold flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>
                    {isArabic
                      ? "اضغط على أي خدمة للاستفسار عنها مباشرة عبر الواتساب"
                      : "Click any item to inquire instantly on WhatsApp"}
                  </span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.sections.map((section, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs"
                  >
                    <h4 className="text-xs font-bold text-neutral-950 uppercase tracking-wider mb-3.5 pb-2 border-b border-neutral-100 flex items-center justify-between">
                      <span>{section.title}</span>
                      <span className="text-[10px] text-neutral-400 font-medium">
                        {section.items.length} items
                      </span>
                    </h4>

                    {/* Interactive Clickable WhatsApp Items */}
                    <div className="space-y-1.5">
                      {section.items.map((item, iIdx) => {
                        const itemMsg = `Hi Arizona International Group, I would like to inquire about: "${item}" under "${service.titleEn}". Please guide me with requirements and process.`;

                        return (
                          <a
                            key={iIdx}
                            href={contact.whatsappLink(itemMsg)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/item flex items-center justify-between p-2.5 rounded-xl hover:bg-[#fff9ea] border border-transparent hover:border-[#dfb141]/40 transition-all duration-200 cursor-pointer"
                            title={isArabic ? `استفسر عن ${item} عبر الواتساب` : `Inquire about ${item} on WhatsApp`}
                          >
                            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 group-hover/item:text-neutral-950 font-normal leading-snug">
                              <CheckCircle2 className="w-4 h-4 text-[#dfb141] shrink-0 mt-0.5" />
                              <span className="group-hover/item:font-medium">{item}</span>
                            </div>

                            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#dfb141] opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0 ml-2">
                              <span>WhatsApp</span>
                              <ArrowUpRight className={`w-3.5 h-3.5 ${isArabic ? "rotate-[-90deg]" : ""}`} />
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer with Main WhatsApp Action */}
          <div className="p-4 sm:p-6 bg-[#f8f9fc] border-t border-neutral-200 flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-500 font-normal text-center sm:text-left">
              {isArabic
                ? "تواصل مباشرة مع مستشارينا في البحرين للحصول على عرض سعر فوري."
                : "Speak directly with our senior corporate advisors in Bahrain for instant assistance."}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 sm:w-auto px-5 py-3 rounded-full bg-white border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                {isArabic ? "إغلاق" : "Close"}
              </button>

              <a
                href={contact.whatsappLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#dfb141] hover:bg-[#c49725] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{isArabic ? "استفسر عن كافة الخدمات" : "Inquire on WhatsApp"}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
