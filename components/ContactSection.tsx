"use client";

import React, { useState } from "react";
import { PhoneCall, Mail, MapPin, ArrowUpRight, Check, ExternalLink, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";

export default function ContactSection() {
  const { isArabic, t } = useLanguage();
  const { contact, isPakistan } = useGeoLocation();
  const [submitted, setSubmitted] = useState(false);
  const [activeMap, setActiveMap] = useState<"bahrain" | "pakistan">(isPakistan ? "pakistan" : "bahrain");
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

  // Google Maps Embed URLs
  const bahrainMapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.544778107936!2d50.58301777598851!3d26.211467477073356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49af6771e3b5e1%3A0xb23b12368ec77b81!2sManama%2C%20Bahrain!5e0!3m2!1sen!2sbh!4v1715000000000!5m2!1sen!2sbh";

  const pakistanMapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106173.84271871239!2d72.97341517457317!3d33.68442017045053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6059515c3bdb02b6!2sIslamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2spk!4v1715000000000!5m2!1sen!2spk";

  return (
    <section id="contact" className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto border-b border-slate-200">
      {/* Uniform Section Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-[#2563eb] text-xs font-medium uppercase tracking-wider mb-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
          <span>{t("contact.badge")}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 leading-tight">
          {t("contact.title1")} <br />
          <span className="text-[#2563eb]">{t("contact.title2")}</span>
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal max-w-xl">
          {t("contact.desc")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left Column: Interactive Map & Location (Tall) */}
        <div className="lg:col-span-6 flex flex-col justify-between rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 min-h-[460px] sm:min-h-[520px] shadow-xs">
          {/* Map Location Selector Tabs */}
          <div className="flex items-center justify-between p-3.5 sm:p-4 bg-slate-100/90 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveMap("bahrain")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeMap === "bahrain"
                    ? "bg-[#2563eb] text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200"
                }`}
              >
                🇧🇭 Bahrain Office
              </button>
              <button
                type="button"
                onClick={() => setActiveMap("pakistan")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeMap === "pakistan"
                    ? "bg-[#2563eb] text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200"
                }`}
              >
                🇵🇰 Pakistan Office
              </button>
            </div>

            <a
              href={contact.whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#2563eb] hover:underline"
            >
              <span>{isArabic ? "الاتجاهات المباشرة" : "Direct Directions"}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Embedded Google Map (Tall Height) */}
          <div className="relative w-full flex-1 min-h-[340px] sm:min-h-[380px] bg-slate-200">
            <iframe
              src={activeMap === "bahrain" ? bahrainMapUrl : pakistanMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Arizona International Group Location Map"
              className="w-full h-full absolute inset-0"
            />
          </div>

          {/* Location Detail Strip */}
          <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#2563eb] shrink-0" />
              <span className="text-slate-800 font-medium truncate max-w-[280px]">
                {activeMap === "bahrain"
                  ? "Manama, Kingdom of Bahrain"
                  : "Islamabad & Rawalpindi, Pakistan"}
              </span>
            </div>

            <div className="flex items-center gap-2" dir="ltr">
              <a
                href={`tel:${contact.phoneTel}`}
                className="inline-flex items-center gap-1.5 font-medium text-slate-900 hover:text-[#2563eb] transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#2563eb]" />
                <span>{contact.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Executive Contact Form (Tall) */}
        <div className="lg:col-span-6 bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[460px] sm:min-h-[520px] shadow-xs">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
              {isArabic ? "أرسل استفسارك وسنتواصل معك فورا" : "Send an Inquiry"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mb-6">
              {isArabic
                ? "املأ البيانات أدناه وسيقوم أحد مستشاري أريزونا بالتواصل معك فوراً."
                : "Fill out the details below and an Arizona advisor will contact you promptly."}
            </p>

            {submitted ? (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm sm:text-base flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{t("contact.success_msg")}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {isArabic ? "الاسم الكامل *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563eb] shadow-2xs"
                      placeholder={isArabic ? "مثال: محمد علي" : "e.g. John Doe / Ali Khan"}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {isArabic ? "رقم الهاتف / الواتساب *" : "Phone / WhatsApp *"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563eb] shadow-2xs"
                      placeholder="+973 32306963 / +92 313..."
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {isArabic ? "البريد الإلكتروني *" : "Email Address *"}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563eb] shadow-2xs"
                      placeholder="name@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {isArabic ? "الخدمة المطلوبة *" : "Service of Interest *"}
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#2563eb] cursor-pointer shadow-2xs"
                    >
                      <option value="Travel & Tours">Travel & Tours (Flights & Hotels)</option>
                      <option value="Worldwide Visas">Worldwide Visas & Clearances</option>
                      <option value="Business in Bahrain">Business in Bahrain (100% Foreign CR)</option>
                      <option value="Rent A Car">Rent A Car & VIP Chauffeur</option>
                      <option value="Mobiles & Tech">Mobiles & Tech Accessories</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {isArabic ? "تفاصيل الاستفسار *" : "Your Message / Details *"}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563eb] resize-none shadow-2xs"
                    placeholder={
                      isArabic
                        ? "اكتب تفاصيل استفسارك أو طلبك هنا..."
                        : "Tell us about your travel dates, visa destination, or company requirements..."
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>{isArabic ? "إرسال الاستفسار الآن" : "Submit Inquiry"}</span>
                  <ArrowUpRight className={`w-4 h-4 ${isArabic ? "rotate-[-90deg]" : ""}`} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
