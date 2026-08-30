"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const { isArabic } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError(isArabic ? "كلمة المرور يجب أن لا تقل عن 6 أحرف." : "Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const res = await register({
      name,
      email,
      password,
      phone,
    });
    setLoading(false);

    if (res.success) {
      router.push(redirect);
    } else {
      setError(res.error || (isArabic ? "فشل إنشاء الحساب." : "Failed to register."));
    }
  };

  return (
    <div className="bg-white border border-slate-200 p-6 sm:p-8">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            {isArabic ? "الاسم الكامل" : "Full Name"}
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isArabic ? "الاسم الكامل" : "Full Name"}
            className="w-full px-3 py-2 bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:border-[#2563eb] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            {isArabic ? "البريد الإلكتروني" : "Email Address"}
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full px-3 py-2 bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:border-[#2563eb] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            {isArabic ? "رقم الهاتف / الواتساب" : "Phone / WhatsApp"}
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+973 ... / +92 ..."
            className="w-full px-3 py-2 bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:border-[#2563eb] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            {isArabic ? "كلمة المرور" : "Password"}
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:border-[#2563eb] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer disabled:opacity-60"
        >
          {loading
            ? isArabic
              ? "جاري الإنشاء..."
              : "Creating account..."
            : isArabic
            ? "إنشاء حساب"
            : "Create Account"}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-600 space-y-2">
        <p>
          {isArabic ? "لديك حساب بالفعل؟" : "Already have an account?"}{" "}
          <Link
            href={`/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
            className="text-[#2563eb] hover:underline font-medium"
          >
            {isArabic ? "تسجيل الدخول" : "Sign In"}
          </Link>
        </p>
        <div>
          <Link href="/" className="text-slate-500 hover:text-slate-800 text-[11px]">
            {isArabic ? "العودة للرئيسية" : "← Back to Home"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  const { isArabic } = useLanguage();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block">
            <img
              src="/arizona-logo.png"
              alt="Arizona International Group"
              className="h-12 w-auto mx-auto object-contain"
            />
          </Link>
          <h1 className="text-xl font-semibold text-slate-900 mt-4">
            {isArabic ? "إنشاء حساب جديد" : "Create Account"}
          </h1>
        </div>

        {/* Signup Form Card wrapped in Suspense */}
        <Suspense fallback={<div className="bg-white border border-slate-200 p-8 text-center text-xs text-slate-500">Loading sign up...</div>}>
          <SignupForm />
        </Suspense>
      </div>
    </div>
  );
}
