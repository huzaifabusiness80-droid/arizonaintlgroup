"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import VisaDestinations from "@/components/VisaDestinations";
import BusinessInBahrain from "@/components/BusinessInBahrain";
import AboutSection from "@/components/AboutSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-[#dfb141] selection:text-white">
      {/* Top Orange Bar & Sticky White Header */}
      <Navbar />

      {/* Main Hero & Quick Booking Widget */}
      <Hero />

      {/* Main Experience */}
      <main className="flex-1 flex flex-col">
        {/* Corporate About & Metrics */}
        <AboutSection />

        {/* Complete Services Overview (Curated Cross-Division Cards with Smooth Scroll) */}
        <ServicesOverview />

        {/* Worldwide Visa Destinations (6 Curated Country Cards) */}
        <VisaDestinations />

        {/* Bahrain Business Setup & Company Formation */}
        <BusinessInBahrain />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Pre-Footer Grand CTA Banner */}
        <CtaSection />

        {/* Contact & Direct Inquiries */}
        <ContactSection />
      </main>

      {/* Corporate Footer */}
      <Footer />
    </div>
  );
}
