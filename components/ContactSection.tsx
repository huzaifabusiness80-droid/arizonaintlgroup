"use client";

import React, { useState } from "react";
import { PhoneCall, Mail, MapPin, Clock, ArrowUpRight, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";

export default function ContactSection() {
  const { isArabic, t } = useLanguage();
  const { contact, isPakistan } = useGeoLocation();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Travel & Tours",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          country: isPakistan ? "Pakistan" : "Bahrain / International",
        }),
      });
    } catch {
      // ignore
    }
    setSubmitted(true);
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "Travel & Tours",
      message: "",
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="w-full bg-white py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-[1580px] mx-auto border-b border-neutral-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-start">
        {/* Left Contact Info */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/90 text-neutral-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#dfb141] ring-2 ring-[#dfb141]/30" />
            <span>{t("contact.badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em] text-neutral-950 mt-1 leading-[1.18]">
            {t("contact.title1")} <br />
            <span className="font-bold text-neutral-950">{t("contact.title2")}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
            {t("contact.desc")}
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={contact.whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-neutral-200/80 hover:border-neutral-400 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-semibold text-neutral-500 uppercase">
                  {t("contact.whatsapp_label")}
                </span>
                <span className="text-sm font-bold text-neutral-900 group-hover:text-[#c49725] transition-colors" dir="ltr">
                  {contact.phone} {contact.phoneSecondary ? ` / ${contact.phoneSecondary}` : ""}
                </span>
              </div>
            </a>

            <a
              href={contact.emailLink}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-neutral-200/80 hover:border-neutral-400 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-semibold text-neutral-500 uppercase">
                  {t("contact.email_label")}
                </span>
                <span className="text-sm font-semibold text-neutral-900 group-hover:text-[#c49725] transition-colors" dir="ltr">
                  {contact.email}
                </span>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-neutral-200/80">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-semibold text-neutral-500 uppercase">
                  {t("contact.hours_label")}
                </span>
                <span className="text-sm font-normal text-neutral-800">
                  {t("contact.hours_val")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-neutral-200/80">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-semibold text-neutral-500 uppercase">
                  {t("contact.location_label")}
                </span>
                <span className="text-sm font-normal text-neutral-800">
                  {isArabic ? contact.locationAr : contact.locationEn}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Multi-Service Inquiry Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-neutral-200/80">
          <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-neutral-900 mb-2">
            {t("contact.form_title")}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal mb-6">
            {t("contact.form_desc")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  {t("contact.name_label")}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t("contact.name_placeholder")}
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all font-normal"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  {t("contact.phone_label")}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t("contact.phone_placeholder")}
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all font-normal"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  {t("contact.email_label")}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t("contact.email_placeholder")}
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all font-normal"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  {t("contact.service_label")}
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all font-normal text-neutral-900"
                >
                  <option>{isArabic ? "السياحة والسفر / حجز تذاكر الطيران" : "Travel & Tours / Flight Tickets"}</option>
                  <option>{isArabic ? "تأشيرات السفر حول العالم" : "Worldwide Visa Assistance"}</option>
                  <option>{isArabic ? "تأجير السيارات / السائق الخاص" : "Rent A Car / Chauffeur Service"}</option>
                  <option>{isArabic ? "تأسيس الشركات بالبحرين (السجل التجاري CR)" : "Bahrain Company Formation (CR)"}</option>
                  <option>{isArabic ? "مكاتب تجارية مرخصة مع EWA" : "Commercial Office & EWA"}</option>
                  <option>{isArabic ? "الهواتف والتقنيات الذكية" : "Mobiles & Tech Products"}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                {t("contact.msg_label")}
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t("contact.msg_placeholder")}
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all font-normal"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-neutral-900 hover:bg-black text-white text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {submitted ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{t("contact.success_msg")}</span>
                </>
              ) : (
                <>
                  <span>{t("contact.submit_btn")}</span>
                  <ArrowUpRight className={`w-4 h-4 ${isArabic ? "rotate-[-90deg]" : ""}`} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
