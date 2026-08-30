"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface BlogCardItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: string;
  readTime: string;
  createdAt: string;
}

export default function BlogSection() {
  const { isArabic, t } = useLanguage();
  const [blogs, setBlogs] = useState<BlogCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs?limit=3")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.items)) {
          setBlogs(data.items);
        }
      })
      .catch((err) => {
        console.error("Error fetching blogs for homepage:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (!loading && blogs.length === 0) {
    return null;
  }

  return (
    <section id="blogs" className="w-full bg-slate-50 py-14 sm:py-18 border-b border-slate-200">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-[#2563eb] text-xs font-medium uppercase tracking-wider mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
              <span>{t("blogs.badge")}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 leading-tight">
              {t("blogs.title1")} <br />
              <span className="text-[#2563eb]">{t("blogs.title2")}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal mt-3 leading-relaxed max-w-xl">
              {t("blogs.desc")}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium text-xs transition-colors"
            >
              <span>{t("blogs.view_all")}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${isArabic ? "rotate-270" : ""}`} />
            </Link>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {blogs.map((post) => (
            <article
              key={post.id}
              className="group rounded-lg overflow-hidden bg-white border border-slate-200 hover:border-[#93c5fd] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Cover Image */}
                <Link href={`/blogs/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={
                      post.coverImage ||
                      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-white/95 backdrop-blur-md border border-slate-200 text-[10px] font-medium text-[#2563eb] uppercase tracking-wider">
                    {post.category}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2.5 text-[10px] text-slate-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link href={`/blogs/${post.slug}`} className="block group-hover:text-[#2563eb] transition-colors">
                    <h3 className="text-sm sm:text-base font-medium text-slate-900 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] text-slate-500 font-normal">
                  By {post.author}
                </div>

                <Link
                  href={`/blogs/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#2563eb] group-hover:translate-x-0.5 transition-transform"
                >
                  <span>{t("blogs.read_guide")}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
