"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Plane,
  Building2,
  Car,
  Globe2,
  Smartphone,
  CheckCircle2,
  Clock,
  AlertCircle,
  PhoneCall,
  LogOut,
  Settings,
  LayoutDashboard,
  FileText,
  Lock,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";

export default function DashboardPage() {
  const { user, loading: authLoading, logout, refreshUser } = useAuth();
  const { isArabic } = useLanguage();
  const { contact } = useGeoLocation();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "inquiries" | "settings">("overview");

  // Data states
  const [bookings, setBookings] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Profile form states
  const [profileName, setProfileName] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [profileCountry, setProfileCountry] = useState("");
  const [profileCity, setProfileCity] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login?redirect=/dashboard");
      return;
    }

    setProfileName(user.name || "");
    setProfilePhone(user.phone || "");
    setProfileCountry(user.country || "Bahrain");
    setProfileCity(user.city || "");

    const fetchDashboardData = async () => {
      setDataLoading(true);
      try {
        const [bRes, iRes] = await Promise.all([
          fetch("/api/user/bookings").then((r) => r.json()),
          fetch("/api/user/inquiries").then((r) => r.json()),
        ]);

        if (bRes.success && Array.isArray(bRes.items)) {
          setBookings(bRes.items);
        }
        if (iRes.success && Array.isArray(iRes.items)) {
          setInquiries(iRes.items);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setDataLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, authLoading, router]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg(null);

    if (newPassword && newPassword !== confirmPassword) {
      setProfileMsg({
        type: "error",
        text: isArabic ? "كلمة المرور الجديدة غير متطابقة." : "New passwords do not match.",
      });
      return;
    }

    setProfileSaving(true);
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profileName,
          phone: profilePhone,
          country: profileCountry,
          city: profileCity,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setProfileMsg({
          type: "success",
          text: isArabic ? "تم حفظ التغييرات بنجاح." : "Profile updated successfully.",
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        await refreshUser();
      } else {
        setProfileMsg({
          type: "error",
          text: data.error || (isArabic ? "فشل تحديث البيانات." : "Failed to update profile."),
        });
      }
    } catch {
      setProfileMsg({
        type: "error",
        text: isArabic ? "حدث خطأ في الاتصال." : "Network error occurred.",
      });
    } finally {
      setProfileSaving(false);
    }
  };

  if (authLoading || (!user && typeof window !== "undefined")) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-slate-800">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-[#2563eb]" />
          <span className="text-xs font-medium">{isArabic ? "جاري التحميل..." : "Loading..."}</span>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const s = status ? status.toUpperCase() : "PENDING";
    if (s === "CONFIRMED" || s === "RESOLVED" || s === "COMPLETED") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-medium">
          <CheckCircle2 className="w-3 h-3" />
          <span>{s}</span>
        </span>
      );
    }
    if (s === "PROCESSING" || s === "IN_PROGRESS") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 border border-blue-200 text-[#2563eb] text-[11px] font-medium">
          <Clock className="w-3 h-3" />
          <span>{s}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-medium">
        <AlertCircle className="w-3 h-3" />
        <span>{s}</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Greeting & Header */}
        <div className="bg-white border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              {isArabic ? `مرحباً، ${user?.name}` : `Welcome, ${user?.name}`}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {user?.email} • {user?.country || "Bahrain"}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={contact.whatsappLink(`Hello Arizona Support, I am signed in as ${user?.name} (${user?.email}).`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{isArabic ? "مستشارك على الواتساب" : "WhatsApp Advisor"}</span>
            </a>

            <button
              onClick={logout}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isArabic ? "خروج" : "Sign Out"}</span>
            </button>
          </div>
        </div>

        {/* Simple Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("overview")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-[#2563eb] text-white"
                : "text-slate-600 hover:text-slate-900 bg-white border border-slate-200"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{isArabic ? "نظرة عامة" : "Overview"}</span>
          </button>

          <button
            onClick={() => setActiveTab("bookings")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "bookings"
                ? "bg-[#2563eb] text-white"
                : "text-slate-600 hover:text-slate-900 bg-white border border-slate-200"
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>{isArabic ? "حجوزاتي" : "My Bookings"}</span>
            {bookings.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-slate-200 text-slate-800 text-[10px] font-bold">
                {bookings.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "inquiries"
                ? "bg-[#2563eb] text-white"
                : "text-slate-600 hover:text-slate-900 bg-white border border-slate-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isArabic ? "طلبات التسعير" : "Custom Quotes"}</span>
            {inquiries.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-slate-200 text-slate-800 text-[10px] font-bold">
                {inquiries.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "settings"
                ? "bg-[#2563eb] text-white"
                : "text-slate-600 hover:text-slate-900 bg-white border border-slate-200"
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{isArabic ? "الإعدادات" : "Settings"}</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stat Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white border border-slate-200">
                <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider block">
                  {isArabic ? "إجمالي الحجوزات" : "Total Bookings"}
                </span>
                <span className="text-2xl font-bold text-slate-900 mt-1 block">{bookings.length}</span>
              </div>

              <div className="p-4 bg-white border border-slate-200">
                <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider block">
                  {isArabic ? "طلبات التسعير المخصصة" : "Custom Quotes"}
                </span>
                <span className="text-2xl font-bold text-slate-900 mt-1 block">{inquiries.length}</span>
              </div>

              <div className="p-4 bg-white border border-slate-200">
                <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider block">
                  {isArabic ? "حالة الحساب" : "Account Status"}
                </span>
                <span className="text-sm font-semibold text-emerald-600 flex items-center gap-1 mt-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isArabic ? "نشط" : "Active"}</span>
                </span>
              </div>
            </div>

            {/* Quick Service Links */}
            <div className="bg-white border border-slate-200 p-5 space-y-3">
              <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                {isArabic ? "خدمات سريعة" : "Quick Services"}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                <Link
                  href="/services/travel-tours"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 transition-colors block text-center"
                >
                  <Plane className="w-4 h-4 text-[#2563eb] mx-auto mb-1" />
                  <span className="text-xs font-medium block">{isArabic ? "السياحة والسفر" : "Travel & Tours"}</span>
                </Link>

                <Link
                  href="/visas"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 transition-colors block text-center"
                >
                  <Globe2 className="w-4 h-4 text-[#2563eb] mx-auto mb-1" />
                  <span className="text-xs font-medium block">{isArabic ? "التأشيرات" : "Worldwide Visas"}</span>
                </Link>

                <Link
                  href="/services/business-bahrain"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 transition-colors block text-center"
                >
                  <Building2 className="w-4 h-4 text-[#2563eb] mx-auto mb-1" />
                  <span className="text-xs font-medium block">{isArabic ? "تأسيس بالبحرين" : "Business in Bahrain"}</span>
                </Link>

                <Link
                  href="/services/rent-a-car"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 transition-colors block text-center"
                >
                  <Car className="w-4 h-4 text-[#2563eb] mx-auto mb-1" />
                  <span className="text-xs font-medium block">{isArabic ? "تأجير السيارات" : "Rent A Car"}</span>
                </Link>

                <Link
                  href="/services/mobiles-tech"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 transition-colors block text-center"
                >
                  <Smartphone className="w-4 h-4 text-[#2563eb] mx-auto mb-1" />
                  <span className="text-xs font-medium block">{isArabic ? "الهواتف والتقنية" : "Mobiles & Tech"}</span>
                </Link>
              </div>
            </div>

            {/* Recent Feeds */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Recent Bookings */}
              <div className="bg-white border border-slate-200 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                    {isArabic ? "أحدث الحجوزات" : "Recent Bookings"}
                  </h3>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className="text-xs text-[#2563eb] hover:underline font-medium cursor-pointer"
                  >
                    {isArabic ? "عرض الكل" : "View All"}
                  </button>
                </div>

                {bookings.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">
                    {isArabic ? "لا توجد حجوزات حتى الآن." : "No bookings yet."}
                  </p>
                ) : (
                  <div className="space-y-2">
                    {bookings.slice(0, 3).map((b) => (
                      <div
                        key={b.id}
                        className="p-2.5 bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 text-xs"
                      >
                        <div>
                          <span className="font-medium text-slate-900 block">{b.destination || b.category}</span>
                          <span className="text-slate-500 text-[11px] block">{b.date || "Flexible"} • {b.passengers}</span>
                        </div>
                        {getStatusBadge(b.status)}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Quotes */}
              <div className="bg-white border border-slate-200 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                    {isArabic ? "أحدث طلبات التسعير" : "Recent Custom Quotes"}
                  </h3>
                  <button
                    onClick={() => setActiveTab("inquiries")}
                    className="text-xs text-[#2563eb] hover:underline font-medium cursor-pointer"
                  >
                    {isArabic ? "عرض الكل" : "View All"}
                  </button>
                </div>

                {inquiries.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">
                    {isArabic ? "لا توجد طلبات تسعير حتى الآن." : "No custom quotes yet."}
                  </p>
                ) : (
                  <div className="space-y-2">
                    {inquiries.slice(0, 3).map((iq) => (
                      <div
                        key={iq.id}
                        className="p-2.5 bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="max-w-[70%]">
                          <span className="font-medium text-slate-900 block truncate">{iq.service}</span>
                          <span className="text-slate-500 text-[11px] block truncate">{iq.message}</span>
                        </div>
                        {getStatusBadge(iq.status)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Bookings */}
        {activeTab === "bookings" && (
          <div className="bg-white border border-slate-200 p-6 space-y-4">
            <h2 className="text-base font-semibold text-slate-900">
              {isArabic ? "حجوزاتي" : "My Bookings"}
            </h2>

            {bookings.length === 0 ? (
              <p className="text-xs text-slate-500 py-8 text-center">
                {isArabic ? "لا توجد حجوزات مسجلة." : "No bookings recorded under your account."}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookings.map((b) => (
                  <div key={b.id} className="p-4 border border-slate-200 bg-slate-50 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{b.category}</span>
                      {getStatusBadge(b.status)}
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">{b.destination || b.category}</h3>
                    <div className="text-xs text-slate-600 space-y-1">
                      {b.fromCity && <div>From: {b.fromCity}</div>}
                      <div>Date: {b.date || "Flexible"}</div>
                      <div>Details: {b.passengers || "Standard"}</div>
                    </div>
                    <a
                      href={contact.whatsappLink(`Hello Arizona, checking booking #${b.id.slice(-6)} for ${b.destination || b.category}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center py-1.5 bg-white border border-slate-300 hover:border-[#2563eb] text-xs font-medium text-slate-800 transition-colors mt-2"
                    >
                      {isArabic ? "استفسار عبر الواتساب" : "Inquire via WhatsApp"}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Custom Quotes */}
        {activeTab === "inquiries" && (
          <div className="bg-white border border-slate-200 p-6 space-y-4">
            <h2 className="text-base font-semibold text-slate-900">
              {isArabic ? "طلبات التسعير المخصصة" : "My Custom Quotes"}
            </h2>

            {inquiries.length === 0 ? (
              <p className="text-xs text-slate-500 py-8 text-center">
                {isArabic ? "لا توجد طلبات تسعير." : "No custom quotes requested yet."}
              </p>
            ) : (
              <div className="space-y-3">
                {inquiries.map((iq) => (
                  <div key={iq.id} className="p-4 border border-slate-200 bg-slate-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-900">{iq.service}</span>
                      {getStatusBadge(iq.status)}
                    </div>
                    <p className="text-xs text-slate-700 whitespace-pre-line bg-white p-2.5 border border-slate-200 font-mono">
                      {iq.message}
                    </p>
                    <span className="text-[11px] text-slate-500 block">
                      {new Date(iq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Settings */}
        {activeTab === "settings" && (
          <div className="bg-white border border-slate-200 p-6 max-w-xl mx-auto space-y-5">
            <h2 className="text-base font-semibold text-slate-900">
              {isArabic ? "إعدادات الحساب" : "Account Settings"}
            </h2>

            {profileMsg && (
              <div
                className={`p-2.5 text-xs font-medium ${
                  profileMsg.type === "success"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {profileMsg.text}
              </div>
            )}

            <form onSubmit={handleProfileUpdate} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {isArabic ? "الاسم" : "Full Name"}
                </label>
                <input
                  type="text"
                  required
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:border-[#2563eb] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {isArabic ? "البريد الإلكتروني" : "Email"}
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ""}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 text-slate-500 text-xs sm:text-sm cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {isArabic ? "الهاتف" : "Phone"}
                  </label>
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:border-[#2563eb] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {isArabic ? "الدولة" : "Country"}
                  </label>
                  <input
                    type="text"
                    value={profileCountry}
                    onChange={(e) => setProfileCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:border-[#2563eb] focus:outline-none"
                  />
                </div>
              </div>

              {/* Password Change */}
              <div className="pt-3 border-t border-slate-200 space-y-3">
                <span className="text-xs font-medium text-slate-800 block">
                  {isArabic ? "تغيير كلمة المرور (اختياري)" : "Change Password (Optional)"}
                </span>

                <div>
                  <input
                    type="password"
                    placeholder={isArabic ? "كلمة المرور الحالية" : "Current Password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 text-slate-900 text-xs focus:border-[#2563eb] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="password"
                    placeholder={isArabic ? "كلمة المرور الجديدة" : "New Password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 text-slate-900 text-xs focus:border-[#2563eb] focus:outline-none"
                  />
                  <input
                    type="password"
                    placeholder={isArabic ? "تأكيد كلمة المرور الجديدة" : "Confirm New Password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 text-slate-900 text-xs focus:border-[#2563eb] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={profileSaving}
                className="w-full py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer disabled:opacity-60 mt-2"
              >
                {profileSaving
                  ? isArabic
                    ? "جاري الحفظ..."
                    : "Saving..."
                  : isArabic
                  ? "حفظ التغييرات"
                  : "Save Changes"}
              </button>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
