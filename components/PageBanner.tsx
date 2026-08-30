"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbCurrent: string;
  backgroundImage?: string;
  actionButton?: React.ReactNode;
}

export default function PageBanner({
  title,
  subtitle,
  breadcrumbCurrent,
  backgroundImage = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=85&auto=format&fit=crop",
  actionButton,
}: PageBannerProps) {
  const { isArabic, t } = useLanguage();

  return (
    <section className="relative w-full py-16 sm:py-24 bg-slate-950 text-white overflow-hidden text-center flex flex-col items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover object-center filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/60" />
      </div>

      {/* Content Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* Breadcrumb */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-xs font-normal text-slate-200 mb-4">
          <Link href="/" className="hover:text-white transition-colors">
            {t("nav.home")}
          </Link>
          <ChevronRight className={`w-3 h-3 text-[#3b82f6] ${isArabic ? "rotate-180" : ""}`} />
          <span className="text-white font-medium">{breadcrumbCurrent}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white max-w-3xl leading-tight">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-3 text-xs sm:text-sm lg:text-base text-slate-300 font-normal max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Action Button */}
        {actionButton && <div className="mt-5">{actionButton}</div>}
      </div>
    </section>
  );
}
