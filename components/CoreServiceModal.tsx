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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col text-left"
          dir={isArabic ? "rtl" : "ltr"}
        >
          {/* Header */}
          <div className="relative p-6 bg-[#0f172a] text-white flex-shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-lg bg-[#2563eb] text-white flex items-center justify-center shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-[#3b82f6] text-[10px] font-medium uppercase tracking-wider mb-1">
                    <span>
                      {isArabic ? `الخدمة 0${service.number}` : `Service 0${service.number}`}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-medium text-white tracking-tight leading-snug">
                    {title}
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-md bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 font-normal mt-3 leading-relaxed border-t border-slate-800 pt-2.5">
              {tagline}
            </p>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {/* Overview Box */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-1">
                {isArabic ? "نظرة عامة على الخدمة" : "Service Overview"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
                {overview}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <h3 className="text-xs sm:text-sm font-medium text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
                  <span>
                    {isArabic ? "كافة الخدمات والمجالات المشمولة" : "Included Scope & Capabilities"}
                  </span>
                </h3>
                <span className="text-[11px] text-[#2563eb] font-normal flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>
                    {isArabic
                      ? "اضغط على أي خدمة للاستفسار عبر الواتساب"
                      : "Click any item to inquire on WhatsApp"}
                  </span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.sections.map((section, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-white border border-slate-200"
                  >
                    <h4 className="text-xs font-medium text-slate-900 uppercase tracking-wider mb-2.5 pb-1.5 border-b border-slate-100 flex items-center justify-between">
                      <span>{section.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {section.items.length} items
                      </span>
                    </h4>

                    {/* Items */}
                    <div className="space-y-1">
                      {section.items.map((item, iIdx) => {
                        const itemMsg = `Hi Arizona International Group, I would like to inquire about: "${item}" under "${service.titleEn}". Please guide me with requirements and process.`;

                        return (
                          <a
                            key={iIdx}
                            href={contact.whatsappLink(itemMsg)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/item flex items-center justify-between p-2 rounded-md hover:bg-blue-50/60 border border-transparent hover:border-blue-200 transition-colors cursor-pointer"
                          >
                            <div className="flex items-start gap-2 text-xs text-slate-700 group-hover/item:text-slate-950 font-normal leading-snug">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#2563eb] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>

                            <div className="flex items-center gap-0.5 text-[10px] font-medium text-[#2563eb] opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0 ml-2">
                              <span>WhatsApp</span>
                              <ArrowUpRight className={`w-3 h-3 ${isArabic ? "rotate-[-90deg]" : ""}`} />
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

          {/* Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500 font-normal text-center sm:text-left">
              {isArabic
                ? "تواصل مباشرة مع مستشارينا في البحرين للحصول على عرض سعر فوري."
                : "Speak directly with our senior corporate advisors in Bahrain."}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 sm:w-auto px-4 py-2 rounded-md bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {isArabic ? "إغلاق" : "Close"}
              </button>

              <a
                href={contact.whatsappLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-medium transition-colors cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{isArabic ? "استفسر عبر الواتساب" : "Inquire on WhatsApp"}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
