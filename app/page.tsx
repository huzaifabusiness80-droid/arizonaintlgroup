"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import HomeCtaBanner from "@/components/HomeCtaBanner";
import VisaDestinations from "@/components/VisaDestinations";
import AboutSection from "@/components/AboutSection";
import BusinessInBahrain from "@/components/BusinessInBahrain";
import BlogSection from "@/components/BlogSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MobileTechCarousel from "@/components/MobileTechCarousel";
import { useGeoLocation } from "@/context/GeoContext";

export default function Home() {
  const { isPakistan } = useGeoLocation();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-[#2563eb] selection:text-white">
      {/* Sticky Header */}
      <Navbar />

      {/* Main Hero & Quick Booking Widget */}
      <Hero />

      {/* Main Experience */}
      <main className="flex-1 flex flex-col">
        {/* 1. Our Business Divisions (Services Overview) */}
        <ServicesOverview />

        {/* 2. Visual Landscape CTA Banner ("Let us design your trip of a lifetime") */}
        <HomeCtaBanner />

        {/* 3. Global Visa Assistance (Visa Destinations) */}
        <VisaDestinations />

        {/* 3.5. Mobile & Tech Showcase with Content (Pakistan View) */}
       

        {/* 4. Corporate About Us & 20+ Years Metrics */}
        <AboutSection />
        
 {isPakistan && <MobileTechCarousel showContent={true} />}
        {/* 5. Bahrain Business Setup & Company Formation */}
        <BusinessInBahrain />

        {/* 6. Latest Insights & Blogs Section */}
        <BlogSection />

        {/* 7. Frequently Asked Questions (Centered) */}
        <FaqSection />

        {/* 8. Contact & Direct Inquiries with Map */}
        <ContactSection />
      </main>

      {/* Corporate Footer */}
      <Footer />
    </div>
  );
}
