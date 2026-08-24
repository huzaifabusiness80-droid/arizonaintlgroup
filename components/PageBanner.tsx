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
}

export default function PageBanner({
  title,
  subtitle,
  breadcrumbCurrent,
  backgroundImage = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=85&auto=format&fit=crop",
}: PageBannerProps) {
  const { isArabic, t } = useLanguage();

  return (
    <section className="relative w-full py-20 sm:py-28 bg-neutral-950 text-white overflow-hidden text-center flex flex-col items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover object-center filter brightness-[0.45]"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/60" />
      </div>

      {/* Content Container */}
      <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 flex flex-col items-center">
        {/* Centered Glassmorphism Breadcrumb Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-medium text-white mb-5 shadow-sm">
          <Link href="/" className="hover:text-[#dfb141] transition-colors">
            {t("nav.home")}
          </Link>
          <ChevronRight className={`w-3 h-3 text-[#dfb141] ${isArabic ? "rotate-180" : ""}`} />
          <span className="text-white font-semibold">{breadcrumbCurrent}</span>
        </div>

        {/* Centered Main Page Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-tight">
          {title}
        </h1>

        {/* Centered Subtitle */}
        {subtitle && (
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-neutral-300 font-normal max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
