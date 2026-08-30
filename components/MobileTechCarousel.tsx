"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Smartphone, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";

export const singleTechSlides = [
  {
    id: "iphone16pro",
    alt: "Apple iPhone 16 Pro Max Flagship",
    url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "s24ultra",
    alt: "Samsung Galaxy S24 Ultra",
    url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "foldable",
    alt: "Foldable Smartphone Display",
    url: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "smartwatch",
    alt: "Smartwatch & Wearable Tech",
    url: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "pixel9",
    alt: "Google Pixel Flagship Camera",
    url: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "earbuds",
    alt: "Wireless Spatial Audio & Earbuds",
    url: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "accessories",
    alt: "100W GaN Fast Chargers & Tech Hardware",
    url: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1600&q=80",
  },
];

interface MobileTechCarouselProps {
  showContent?: boolean;
}

export default function MobileTechCarousel({ showContent = false }: MobileTechCarouselProps) {
  const { isArabic } = useLanguage();
  const { contact } = useGeoLocation();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto transition to next image every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % singleTechSlides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = singleTechSlides[currentIndex];

  return (
    <div className="w-full py-6 sm:py-10 bg-transparent">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Container */}
        <div className="relative w-full min-h-[300px] sm:min-h-[380px] md:min-h-[420px] overflow-hidden bg-slate-950 flex items-center">
          
          {/* Animated Background Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={currentSlide.url}
                alt={currentSlide.alt}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* If showContent is enabled (e.g. on Home Page) */}
          {showContent && (
            <>
              {/* Gradient Scrim for crisp text legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10" />

              {/* Text & Action Overlay */}
              <div className="relative z-20 max-w-xl p-6 sm:p-10 lg:p-14 space-y-3.5 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/30 border border-blue-400/40 text-blue-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{isArabic ? "الهواتف والتكنولوجيا المعتمدة" : "Official Flagship Mobiles & Tech"}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                  {isArabic ? (
                    <>
                      أحدث الهواتف الذكية <br />
                      <span className="text-blue-400">والإكسسوارات الأصلية المعتمدة</span>
                    </>
                  ) : (
                    <>
                      Original Smartphones <br />
                      <span className="text-blue-400">& Certified Fast Tech Accessories</span>
                    </>
                  )}
                </h2>

                <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed max-w-lg">
                  {isArabic
                    ? "أجهزة آبل وسامسونج الأصلية، شواحن GaN فائقة السرعة، وسماعات عازلة للضوضاء بضمان رسمي وشحن سريع داخل باكستان."
                    : "Official PTA-approved Apple iPhones, Samsung Galaxy flagships, 100W GaN fast chargers, and wireless wearables with official brand warranty."}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/services/mobiles-tech"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-md"
                  >
                    <span>{isArabic ? "استكشف جميع الأجهزة" : "Explore All Products"}</span>
                    <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                  </Link>

                  <a
                    href={contact.whatsappLink("Hello Arizona, I want to inquire about Flagship Mobiles & Tech accessories in Pakistan.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs sm:text-sm font-semibold backdrop-blur-md transition-colors cursor-pointer"
                  >
                    <span>{isArabic ? "طلب سريع عبر واتساب" : "Order on WhatsApp"}</span>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
