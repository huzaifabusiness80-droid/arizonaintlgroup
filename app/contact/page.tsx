"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { PhoneCall, Mail, MapPin, ArrowUpRight, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";

export default function ContactPage() {
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

  const bahrainMapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.544778107936!2d50.58301777598851!3d26.211467477073356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49af6771e3b5e1%3A0xb23b12368ec77b81!2sManama%2C%20Bahrain!5e0!3m2!1sen!2sbh!4v1715000000000!5m2!1sen!2sbh";

  const pakistanMapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106173.84271871239!2d72.97341517457317!3d33.68442017045053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6059515c3bdb02b6!2sIslamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2spk!4v1715000000000!5m2!1sen!2spk";

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
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
        <section className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Contact Info & Map */}
            <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-medium tracking-wider text-[#2563eb] uppercase block mb-1">
                  {isArabic ? "تفاصيل الاتصال المباشر" : "CONTACT DETAILS"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {isArabic ? "نحن هنا لمساعدتك دائماً" : "We're Here to Help"}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {isArabic
                    ? "يتولى فريقنا المتخصص معالجة حجوزات الطيران الفورية، استفسارات التأشيرات، تأجير السيارات، وتأسيس الشركات بالبحرين."
                    : "Our specialized desks handle immediate flight ticketing, worldwide visa inquiries, car rentals, company formation, and tech orders."}
                </p>
              </div>

              {/* Map Widget */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs">
                <div className="flex items-center justify-between p-3 bg-slate-100/80 border-b border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setActiveMap("bahrain")}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                        activeMap === "bahrain"
                          ? "bg-[#2563eb] text-white"
                          : "bg-white text-slate-700 border border-slate-200"
                      }`}
                    >
                      🇧🇭 Bahrain HQ
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMap("pakistan")}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                        activeMap === "pakistan"
                          ? "bg-[#2563eb] text-white"
                          : "bg-white text-slate-700 border border-slate-200"
                      }`}
                    >
                      🇵🇰 Pakistan Desk
                    </button>
                  </div>
                </div>

                <div className="relative w-full h-[220px] bg-slate-200">
                  <iframe
                    src={activeMap === "bahrain" ? bahrainMapUrl : pakistanMapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Arizona Office Location"
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Contact Channels List */}
              <div className="space-y-3">
                <a
                  href={contact.whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#93c5fd] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#2563eb] text-white flex items-center justify-center shrink-0">
                    <PhoneCall className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
                      {isArabic ? "واتساب وهاتف مباشر" : "Direct WhatsApp & Phone"}
                    </span>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-[#2563eb] transition-colors" dir="ltr">
                      {contact.phone}
                    </span>
                  </div>
                </a>

                <a
                  href={contact.emailLink}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#93c5fd] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
                      {isArabic ? "البريد الإلكتروني الرسمي" : "Official Email"}
                    </span>
                    <span className="text-sm font-semibold text-slate-900 group-hover:text-[#2563eb] transition-colors" dir="ltr">
                      {contact.email}
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-9 h-9 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
                      {isArabic ? "الموقع الجغرافي" : "Office Location"}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-800">
                      {isArabic ? contact.locationAr : contact.locationEn}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form (Tall & Spacious) */}
            <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200 flex flex-col justify-between shadow-xs min-h-[520px]">
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
                    <span>{isArabic ? "تم استلام رسالتك بنجاح! سيتواصل معك فريقنا في أقرب وقت." : "Your inquiry has been received! Our team will contact you shortly."}</span>
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
                          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563eb]"
                          placeholder={isArabic ? "مثال: محمد علي" : "e.g. Ali Khan / John Doe"}
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
                          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563eb]"
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
                          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563eb]"
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
                          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#2563eb] cursor-pointer"
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
                        {isArabic ? "تفاصيل الاستفسار *" : "Your Message / Inquiry Details *"}
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563eb] resize-none"
                        placeholder={
                          isArabic
                            ? "اكتب تفاصيل استفسارك أو طلبك هنا..."
                            : "Tell us about your travel dates, visa destination, or company setup requirements..."
                        }
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
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
      </main>

      <Footer />
    </div>
  );
}
