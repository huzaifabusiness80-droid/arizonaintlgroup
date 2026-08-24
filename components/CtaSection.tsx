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
}

export default function CtaSection({
  title,
  subtitle,
  buttonText,
  buttonHref = "/services",
  backgroundImage = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=85&auto=format&fit=crop",
}: CtaSectionProps) {
  const { isArabic, t } = useLanguage();

  const displayTitle = title || t("cta.title");
  const displaySubtitle = subtitle || t("cta.subtitle");
  const displayBtnText = buttonText || t("cta.btn");

  const isExternal = buttonHref.startsWith("http") || buttonHref.startsWith("https://wa.me");

  return (
    <section className="w-full bg-neutral-950 text-white relative overflow-hidden py-24 sm:py-36 flex flex-col items-center justify-center text-center">
      {/* Full-Bleed Scenic Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={displayTitle}
          className="w-full h-full object-cover object-center filter brightness-[0.65]"
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />
      </div>

      {/* Centered Content Container */}
      <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 flex flex-col items-center space-y-6">
        {/* Main Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.14] whitespace-pre-line">
          {displayTitle}
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base lg:text-lg text-neutral-200 font-normal max-w-2xl leading-relaxed tracking-wide opacity-90">
          {displaySubtitle}
        </p>

        {/* Action Button */}
        <div className="pt-4">
          {isExternal ? (
            <a
              href={buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-sm sm:text-base inline-flex items-center gap-2 shadow-2xl transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{displayBtnText}</span>
              <ArrowRight className={`w-4 h-4 text-neutral-950 ${isArabic ? "rotate-180" : ""}`} />
            </a>
          ) : (
            <Link
              href={buttonHref}
              className="px-8 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-sm sm:text-base inline-flex items-center gap-2 shadow-2xl transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{displayBtnText}</span>
              <ArrowRight className={`w-4 h-4 text-neutral-950 ${isArabic ? "rotate-180" : ""}`} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
