"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Sliders,
  Check,
  Send,
  ShieldCheck,
  Calendar,
  Users,
  Building2,
  Plane,
  Car,
  Globe2,
  Smartphone,
  Info,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";
import { useAuth } from "@/context/AuthContext";
import {
  businessDivisionsData,
  allVisasData,
  ServiceItemDetail,
} from "@/lib/data";
import { getLocalizedPrice } from "@/lib/pricing-helper";

export type CustomizerServiceType =
  | "business-bahrain"
  | "travel-tours"
  | "rent-a-car"
  | "visas"
  | "mobiles-tech";

interface ServiceCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: CustomizerServiceType;
  initialItemSlug?: string;
  initialItemName?: string;
}

interface DbServiceItem {
  slug: string;
  name: string;
  tag?: string;
  desc?: string;
  price?: string;
  pricePkr?: string;
  priceBhd?: string;
  options?: Array<{
    name: string;
    price?: string;
    pricePkr?: string;
    priceBhd?: string;
    desc?: string;
    badge?: string;
    period?: string;
    capacity?: string;
  }>;
}

export default function ServiceCustomizerModal({
  isOpen,
  onClose,
  serviceType,
  initialItemSlug,
  initialItemName,
}: ServiceCustomizerModalProps) {
  const { isArabic } = useLanguage();
  const { contact, isPakistan } = useGeoLocation();
  const { user } = useAuth();

  // Loaded database items
  const [dbItems, setDbItems] = useState<DbServiceItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [selectedOptionName, setSelectedOptionName] = useState<string>("");
  const [clientName, setClientName] = useState(user?.name || "");
  const [clientPhone, setClientPhone] = useState(user?.phone || "");
  const [travelDate, setTravelDate] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [duration, setDuration] = useState("Daily");
  const [driverOption, setDriverOption] = useState("Self-Drive");
  const [deviceStorage, setDeviceStorage] = useState("256GB");
  const [extraAddons, setExtraAddons] = useState<string[]>([]);
  const [customNotes, setCustomNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Fetch Database items on mount/serviceType change
  useEffect(() => {
    if (!isOpen) return;

    let apiEndpoint = "";
    if (serviceType === "business-bahrain") apiEndpoint = "/api/admin/bahrain";
    else if (serviceType === "travel-tours") apiEndpoint = "/api/admin/tours";
    else if (serviceType === "rent-a-car") apiEndpoint = "/api/admin/cars";
    else if (serviceType === "visas") apiEndpoint = "/api/admin/visas";
    else if (serviceType === "mobiles-tech") apiEndpoint = "/api/admin/mobiles";

    // Static fallback
    const divisionStatic = businessDivisionsData.find((d) => d.slug === serviceType);
    let fallbackItems: DbServiceItem[] = [];

    if (serviceType === "visas") {
      fallbackItems = allVisasData.map((v) => ({
        slug: v.slug,
        name: `${v.country} (${v.type})`,
        tag: v.regionName,
        desc: v.overview,
        pricePkr: (v as any).pricePkr,
        priceBhd: (v as any).priceBhd,
        options: v.requirements?.map((r, i) => ({
          name: isArabic ? `المستند ${i + 1}` : `Requirement ${i + 1}`,
          desc: r,
        })),
      }));
    } else if (divisionStatic?.servicesList) {
      fallbackItems = divisionStatic.servicesList.map((s) => ({
        slug: s.slug,
        name: s.name,
        tag: s.tag,
        desc: s.desc,
        price: s.price,
        pricePkr: (s as any).pricePkr,
        priceBhd: (s as any).priceBhd,
        options: s.options,
      }));
    }

    setLoading(true);
    if (apiEndpoint) {
      fetch(apiEndpoint)
        .then((r) => r.json())
        .then((d) => {
          if (d.success && Array.isArray(d.items) && d.items.length > 0) {
            const active = d.items
              .filter((it: any) => it.isActive !== false)
              .map((it: any) => ({
                slug: it.slug,
                name: serviceType === "visas" ? `${it.country || it.name} (${it.type || "Visa"})` : it.name,
                tag: it.tag || it.regionName || "",
                desc: it.description || it.desc || it.overview || "",
                price: it.basePrice || it.price || "",
                pricePkr: it.pricePkr || "",
                priceBhd: it.priceBhd || "",
                options: Array.isArray(it.options) ? it.options : [],
              }));
            setDbItems(active.length > 0 ? active : fallbackItems);
          } else {
            setDbItems(fallbackItems);
          }
        })
        .catch(() => {
          setDbItems(fallbackItems);
        })
        .finally(() => setLoading(false));
    } else {
      setDbItems(fallbackItems);
      setLoading(false);
    }
  }, [isOpen, serviceType]);

  // Set initial selected item when items load
  useEffect(() => {
    if (dbItems.length === 0) return;
    if (initialItemSlug) {
      const match = dbItems.find((i) => i.slug === initialItemSlug);
      if (match) {
        setSelectedSlug(match.slug);
        if (match.options && match.options.length > 0) {
          setSelectedOptionName(match.options[0].name);
        }
        return;
      }
    }
    if (initialItemName) {
      const match = dbItems.find(
        (i) => i.name.toLowerCase().includes(initialItemName.toLowerCase())
      );
      if (match) {
        setSelectedSlug(match.slug);
        if (match.options && match.options.length > 0) {
          setSelectedOptionName(match.options[0].name);
        }
        return;
      }
    }
    // Default to first item
    setSelectedSlug(dbItems[0].slug);
    if (dbItems[0].options && dbItems[0].options.length > 0) {
      setSelectedOptionName(dbItems[0].options[0].name);
    }
  }, [dbItems, initialItemSlug, initialItemName]);

  const activeItem = dbItems.find((i) => i.slug === selectedSlug) || dbItems[0];

  const toggleAddon = (addon: string) => {
    setExtraAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  const titlesMap: Record<CustomizerServiceType, { en: string; ar: string; descEn: string; descAr: string }> = {
    "business-bahrain": {
      en: "Customize Business Formation in Bahrain",
      ar: "تخصيص تأسيس الشركات في البحرين",
      descEn: "Select your commercial activity, licensing scope, and corporate support options.",
      descAr: "حدد نوع النشاط التجاري، التراخيص والمكاتب، وخدمات التأسيس المطلوبة.",
    },
    "travel-tours": {
      en: "Customize Travel & Tour Package",
      ar: "تخصيص باقة السفر والجولات السياحية",
      descEn: "Tailor your flight bookings, 5-star hotels, dates, and itinerary preferences.",
      descAr: "حدد تفاصيل حجوزات الطيران، الفنادق، التواريخ، والخدمات الخاصة.",
    },
    "rent-a-car": {
      en: "Customize Fleet & Car Rental",
      ar: "تخصيص استئجار السيارات والأسطول",
      descEn: "Select vehicle model, rental duration, chauffeur option, and pickup logistics.",
      descAr: "اختر نوع السيارة، مدة التأجير، خيار السائق الخاص، وموقع الاستلام.",
    },
    "visas": {
      en: "Customize Visa Application & Clearance",
      ar: "تخصيص ملف وطلب التأشيرة العالمية",
      descEn: "Select destination embassy, file preparation support, and express clearance.",
      descAr: "اختر وجهة السفر، خدمات تجهيز ملف السفارة، وتدقيق المستندات المعتمدة.",
    },
    "mobiles-tech": {
      en: "Customize Mobile & Tech Order",
      ar: "تخصيص طلب الهواتف والأجهزة التقنية",
      descEn: "Select device edition, storage configuration, accessories, and delivery speed.",
      descAr: "حدد موديل الجهاز، السعة التخزينية، الإكسسوارات المعتمدة، وسرعة التوصيل.",
    },
  };

  const modalMeta = titlesMap[serviceType] || {
    en: "Customize Service Package",
    ar: "تخصيص باقة الخدمة",
    descEn: "Configure your service parameters for immediate advisory.",
    descAr: "حدد تفاصيل الخدمة للتواصل المباشر مع المستشار.",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const itemName = activeItem ? activeItem.name : "Custom Package";
    const selectedOption = selectedOptionName || "Standard";

    let detailsText = `Service: ${modalMeta.en}\nItem: ${itemName}\nSelected Tier: ${selectedOption}`;
    if (clientName) detailsText += `\nClient Name: ${clientName}`;
    if (clientPhone) detailsText += `\nPhone: ${clientPhone}`;

    if (serviceType === "travel-tours") {
      detailsText += `\nTravel Date: ${travelDate || "Flexible"}\nGuests: ${guestCount}`;
    } else if (serviceType === "rent-a-car") {
      detailsText += `\nDuration: ${duration}\nDrive Mode: ${driverOption}`;
    } else if (serviceType === "mobiles-tech") {
      detailsText += `\nStorage: ${deviceStorage}`;
    }

    if (extraAddons.length > 0) {
      detailsText += `\nAdd-ons: ${extraAddons.join(", ")}`;
    }
    if (customNotes) {
      detailsText += `\nNotes: ${customNotes}`;
    }

    const waMessage = `Hello Arizona International Group,\n\nI would like to request a customized package:\n\n${detailsText}`;

    // Log to inquiries
    fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: clientName || user?.name || "Customizer Lead",
        phone: clientPhone || user?.phone || "WhatsApp User",
        email: user?.email || "customizer@arizonaintl.com",
        userId: user?.id || null,
        service: `${serviceType.toUpperCase()} - ${itemName}`,
        message: detailsText,
        country: serviceType === "business-bahrain" ? "Bahrain" : isPakistan ? "Pakistan" : "Global",
      }),
    }).catch(() => {});

    setIsSubmitting(false);
    setSubmittedSuccess(true);

    setTimeout(() => {
      const whatsappUrl =
        serviceType === "business-bahrain"
          ? `https://wa.me/97332306963?text=${encodeURIComponent(waMessage)}`
          : contact.whatsappLink(waMessage);
      window.open(whatsappUrl, "_blank");
      onClose();
      setSubmittedSuccess(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Clean Minimalist Header (No Blue Bar) */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between gap-4 bg-white sticky top-0 z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563eb] tracking-wide uppercase mb-1">
              <Sliders className="w-3.5 h-3.5" />
              <span>{isArabic ? "طلب باقة مخصصة" : "Tailored Specification"}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
              {isArabic ? modalMeta.ar : modalMeta.en}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isArabic ? modalMeta.descAr : modalMeta.descEn}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1 text-slate-800">
          
          {/* Service Offering Selection (Fetched directly from DB) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-800">
              {isArabic ? "اختر الخدمة أو الباقة الأساسية" : "Select Service Offering"}
            </label>
            {loading ? (
              <div className="h-10 rounded-lg bg-slate-100 animate-pulse" />
            ) : (
              <select
                value={selectedSlug}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedSlug(val);
                  const matched = dbItems.find((i) => i.slug === val);
                  if (matched?.options && matched.options.length > 0) {
                    setSelectedOptionName(matched.options[0].name);
                  } else {
                    setSelectedOptionName("");
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-medium focus:bg-white focus:border-[#2563eb] focus:outline-hidden transition-colors cursor-pointer"
              >
                {dbItems.map((item) => {
                  const localizedPrice = getLocalizedPrice(
                    {
                      pricePkr: item.pricePkr,
                      priceBhd: item.priceBhd,
                      price: item.price,
                    },
                    isPakistan
                  );
                  return (
                    <option key={item.slug} value={item.slug}>
                      {item.name} {localizedPrice ? `(${localizedPrice})` : ""}
                    </option>
                  );
                })}
              </select>
            )}
          </div>

          {/* Database Options / Packages for selected item */}
          {activeItem?.options && activeItem.options.length > 0 && (
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-800">
                {isArabic ? "خطة أو باقة الخدمة" : "Available Plan / Package Tier"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeItem.options.map((opt, idx) => {
                  const isSelected = selectedOptionName === opt.name || (!selectedOptionName && idx === 0);
                  const optPrice = getLocalizedPrice(
                    {
                      pricePkr: opt.pricePkr,
                      priceBhd: opt.priceBhd,
                      price: opt.price,
                    },
                    isPakistan
                  );

                  return (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setSelectedOptionName(opt.name)}
                      className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isSelected
                          ? "bg-blue-50/70 border-[#2563eb] ring-1 ring-[#2563eb]"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-slate-900 line-clamp-1">
                          {opt.name}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />}
                      </div>
                      {opt.desc && (
                        <span className="text-[11px] text-slate-500 line-clamp-2 mt-1 font-normal">
                          {opt.desc}
                        </span>
                      )}
                      {optPrice && (
                        <span className="text-xs font-semibold text-[#2563eb] mt-1.5 block">
                          {optPrice}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Context-Specific Fields based on serviceType */}
          {serviceType === "travel-tours" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  {isArabic ? "تاريخ السفر التقريبي" : "Approx. Travel Date"}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-[#2563eb] focus:outline-hidden"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  {isArabic ? "عدد المسافرين" : "Travelers / Guests"}
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-[#2563eb] focus:outline-hidden"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Adults (Couple)</option>
                  <option value="3-5">Family (3 - 5 Persons)</option>
                  <option value="6+">Group (6+ Persons)</option>
                </select>
              </div>
            </div>
          )}

          {serviceType === "rent-a-car" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  {isArabic ? "مدة التأجير" : "Rental Duration"}
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-[#2563eb] focus:outline-hidden"
                >
                  <option value="Daily">Daily Rental</option>
                  <option value="Weekly">Weekly (7 Days)</option>
                  <option value="Monthly">Monthly Corporate Lease</option>
                  <option value="Airport Transfer">Airport VIP Pickup</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  {isArabic ? "نوع القيادة" : "Driver Option"}
                </label>
                <select
                  value={driverOption}
                  onChange={(e) => setDriverOption(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-[#2563eb] focus:outline-hidden"
                >
                  <option value="Self-Drive">Self-Drive</option>
                  <option value="With Professional Chauffeur">With Chauffeur Driver</option>
                </select>
              </div>
            </div>
          )}

          {serviceType === "mobiles-tech" && (
            <div className="space-y-1 pt-1">
              <label className="block text-xs font-semibold text-slate-700">
                {isArabic ? "السعة التخزينية المطلوبة" : "Storage Capacity"}
              </label>
              <div className="flex flex-wrap gap-2">
                {["128GB", "256GB", "512GB", "1TB"].map((cap) => (
                  <button
                    type="button"
                    key={cap}
                    onClick={() => setDeviceStorage(cap)}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                      deviceStorage === cap
                        ? "bg-[#2563eb] text-white border-[#2563eb]"
                        : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add-on preferences */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-semibold text-slate-800">
              {isArabic ? "متطلبات أو خدمات إضافية" : "Optional Add-ons & Compliance"}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {serviceType === "business-bahrain" && [
                "EWA Commercial Address",
                "Investor Visa Filing",
                "Corporate Bank Account",
                "VAT Registration Support",
              ].map((addon) => (
                <label
                  key={addon}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white cursor-pointer text-xs text-slate-700 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={extraAddons.includes(addon)}
                    onChange={() => toggleAddon(addon)}
                    className="rounded border-slate-300 text-[#2563eb] focus:ring-[#2563eb]"
                  />
                  <span>{addon}</span>
                </label>
              ))}

              {serviceType === "travel-tours" && [
                "Airport VIP Fast-Track",
                "Travel Medical Insurance",
                "Guided City Excursion",
                "Complimentary Breakfast",
              ].map((addon) => (
                <label
                  key={addon}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white cursor-pointer text-xs text-slate-700 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={extraAddons.includes(addon)}
                    onChange={() => toggleAddon(addon)}
                    className="rounded border-slate-300 text-[#2563eb] focus:ring-[#2563eb]"
                  />
                  <span>{addon}</span>
                </label>
              ))}

              {serviceType === "visas" && [
                "Urgent Biometrics Appointment",
                "Embassy Cover Letter & Itinerary",
                "Official Hotel / Ticket Vouchers",
                "€30,000 Schengen Compliant Insurance",
              ].map((addon) => (
                <label
                  key={addon}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white cursor-pointer text-xs text-slate-700 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={extraAddons.includes(addon)}
                    onChange={() => toggleAddon(addon)}
                    className="rounded border-slate-300 text-[#2563eb] focus:ring-[#2563eb]"
                  />
                  <span>{addon}</span>
                </label>
              ))}

              {serviceType === "rent-a-car" && [
                "Full Comprehensive Insurance",
                "Airport Delivery & Return",
                "Child / Baby Safety Seat",
                "Additional Authorized Driver",
              ].map((addon) => (
                <label
                  key={addon}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white cursor-pointer text-xs text-slate-700 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={extraAddons.includes(addon)}
                    onChange={() => toggleAddon(addon)}
                    className="rounded border-slate-300 text-[#2563eb] focus:ring-[#2563eb]"
                  />
                  <span>{addon}</span>
                </label>
              ))}

              {serviceType === "mobiles-tech" && [
                "GaN 65W Rapid Power Adapter",
                "MagSafe Clear Protective Case",
                "9H Tempered Screen Armor",
                "Express Same-Day Dispatch",
              ].map((addon) => (
                <label
                  key={addon}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white cursor-pointer text-xs text-slate-700 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={extraAddons.includes(addon)}
                    onChange={() => toggleAddon(addon)}
                    className="rounded border-slate-300 text-[#2563eb] focus:ring-[#2563eb]"
                  />
                  <span>{addon}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Client Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                {isArabic ? "اسمك الكريم" : "Your Name"}
              </label>
              <input
                type="text"
                required
                placeholder={isArabic ? "الاسم الكامل" : "e.g. John Doe"}
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-[#2563eb] focus:outline-hidden"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                {isArabic ? "رقم الهاتف / الواتساب" : "Phone / WhatsApp"}
              </label>
              <input
                type="tel"
                required
                placeholder={isArabic ? "+973 / +92" : "+973 ... / +92 ..."}
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-[#2563eb] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Custom Notes */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">
              {isArabic ? "ملاحظات أو مواصفات خاصة" : "Special Instructions / Notes"}
            </label>
            <textarea
              rows={2}
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder={
                isArabic
                  ? "أضف أي تفاصيل أو تفضيلات إضافية ترغب بها..."
                  : "Specify any custom dates, hotel rating, vehicle model, or business activities..."
              }
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-[#2563eb] focus:outline-hidden resize-none"
            />
          </div>

          {/* Submit Action Bar */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isArabic ? "ضمان استجابة سريعة من المستشار" : "Direct Advisor Consultation & Quote"}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {submittedSuccess
                  ? isArabic
                    ? "تم التجهيز، جاري التحويل..."
                    : "Connecting to WhatsApp..."
                  : isArabic
                  ? "إرسال الباقة المخصصة"
                  : "Send Custom Package"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
