"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CtaSectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  backgroundImage?: string;
  secondaryAction?: React.ReactNode;
}

export default function CtaSection({
  title,
  subtitle,
  buttonText,
  buttonHref = "/services",
  backgroundImage = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=85&auto=format&fit=crop",
  secondaryAction,
}: CtaSectionProps) {
  const { isArabic, t } = useLanguage();

  const displayTitle = title || t("cta.title");
  const displaySubtitle = subtitle || t("cta.subtitle");
  const displayBtnText = buttonText || t("cta.btn");

  const isExternal = buttonHref.startsWith("http") || buttonHref.startsWith("https://wa.me");

  return (
    <section className="w-full bg-slate-950 text-white relative overflow-hidden py-20 sm:py-28 flex flex-col items-center justify-center text-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={displayTitle}
          className="w-full h-full object-cover object-center filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/60" />
      </div>

      {/* Content Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center space-y-4">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white max-w-3xl leading-tight whitespace-pre-line">
          {displayTitle}
        </h2>

        <p className="text-xs sm:text-sm lg:text-base text-slate-300 font-normal max-w-xl leading-relaxed">
          {displaySubtitle}
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          {isExternal ? (
            <a
              href={buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <span>{displayBtnText}</span>
              <ArrowRight className={`w-3.5 h-3.5 text-white ${isArabic ? "rotate-180" : ""}`} />
            </a>
          ) : (
            <Link
              href={buttonHref}
              className="px-6 py-3 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <span>{displayBtnText}</span>
              <ArrowRight className={`w-3.5 h-3.5 text-white ${isArabic ? "rotate-180" : ""}`} />
            </Link>
          )}

          {secondaryAction}
        </div>
      </div>
    </section>
  );
}
