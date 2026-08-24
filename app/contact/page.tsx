"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { PhoneCall, Mail, MapPin, Clock, ArrowUpRight, Check, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { isArabic, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Travel & Tours",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between">
      <Navbar />

      <main>
        {/* Page Banner */}
        <PageBanner
          title={isArabic ? "اتصل بنا" : "Contact Us"}
          subtitle={
            isArabic
              ? "تواصل مع مستشارينا المتخصصين للحصول على دعم فوري، حجوزات، واستشارات على مدار 24 ساعة."
              : "Get in touch with our specialized advisors for 24/7 client support, bookings, and inquiries"
          }
          breadcrumbCurrent={t("nav.contact")}
          backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85&auto=format&fit=crop"
        />

        {/* Contact Form & Info Grid */}
        <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-[1580px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
            {/* Left Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#c49725] uppercase block mb-2">
                  {isArabic ? "تفاصيل الاتصال المباشر" : "CONTACT DETAILS"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold text-neutral-950">
                  {isArabic ? "نحن هنا لمساعدتك دائماً" : "We're Here to Help"}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {isArabic
                    ? "يتولى فريقنا المتخصص معالجة حجوزات الطيران الفورية، استفسارات التأشيرات، تأجير السيارات، وتأسيس الشركات بالبحرين."
                    : "Our specialized desks handle immediate flight ticketing, worldwide visa inquiries, car rentals, company formation, and tech orders."}
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="https://wa.me/923135921434"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl bg-[#f8f9fc] border border-neutral-200 hover:border-neutral-400 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-neutral-950 text-white flex items-center justify-center shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-neutral-500 uppercase">
                      {t("contact.whatsapp_label")}
                    </span>
                    <span className="text-base font-bold text-neutral-950 group-hover:text-[#c49725] transition-colors" dir="ltr">
                      +92 313 5921434
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#f8f9fc] border border-neutral-200">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-neutral-500 uppercase">
                      {t("contact.hours_label")}
                    </span>
                    <span className="text-sm font-semibold text-neutral-900">
                      {t("contact.hours_val")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#f8f9fc] border border-neutral-200">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-neutral-500 uppercase">
                      {t("contact.location_label")}
                    </span>
                    <span className="text-sm font-semibold text-neutral-900">
                      {t("contact.location_val")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 bg-[#f8f9fc] p-8 sm:p-12 rounded-[36px] border border-neutral-200/90">
              <h3 className="text-2xl font-bold text-neutral-950 mb-2">
                {t("contact.form_title")}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mb-8">
                {t("contact.form_desc")}
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold">{t("contact.success_msg")}</h4>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                        {t("contact.name_label")} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t("contact.name_placeholder")}
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                        {t("contact.phone_label")} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t("contact.phone_placeholder")}
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                        {t("contact.email_label")}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t("contact.email_placeholder")}
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                        {t("contact.service_label")} *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-neutral-300 text-sm text-neutral-900 focus:outline-none focus:border-neutral-950"
                      >
                        <option value="Travel & Tours">{isArabic ? "السياحة والسفر / الطيران والعمرة" : "Travel & Tours (Flights, Hotels, Umrah)"}</option>
                        <option value="Global Visas">{isArabic ? "تأشيرات السفر حول العالم" : "Global Visas (Schengen, UK, USA, Bahrain)"}</option>
                        <option value="Rent A Car">{isArabic ? "تأجير السيارات والسائق الخاص" : "Rent A Car (Self-Drive & Chauffeur)"}</option>
                        <option value="Business in Bahrain">{isArabic ? "تأسيس الشركات بالبحرين" : "Business in Bahrain (CR & Formation)"}</option>
                        <option value="Mobiles & Tech">{isArabic ? "الهواتف والتقنية" : "Mobiles & Tech (Smartphones & Accessories)"}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                      {t("contact.msg_label")} *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t("contact.msg_placeholder")}
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t("contact.submit_btn")}</span>
                    <Send className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
