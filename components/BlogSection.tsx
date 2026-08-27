"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";
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
    <section id="blogs" className="w-full bg-[#f8f9fc] py-16 sm:py-24 border-b border-neutral-200/80">
      <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-10 mb-12 sm:mb-16">
          <div className="max-w-4xl">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-neutral-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#dfb141] ring-2 ring-[#dfb141]/30" />
              <span>{t("blogs.badge")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.03em] text-neutral-950 leading-[1.18]">
              {t("blogs.title1")} <br className="hidden sm:block" />
              <span className="text-[#c49725] font-bold">{t("blogs.title2")}</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-normal mt-4 leading-relaxed max-w-2xl">
              {t("blogs.desc")}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm transition-all shadow-xs"
            >
              <span>{t("blogs.view_all")}</span>
              <ArrowUpRight className={`w-4 h-4 ${isArabic ? "rotate-270" : ""}`} />
            </Link>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <article
              key={post.id}
              className="group rounded-3xl overflow-hidden bg-white border border-neutral-200/90 hover:border-neutral-400/80 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-xs hover:shadow-xl"
            >
              <div>
                {/* Cover Image */}
                <Link href={`/blogs/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img
                    src={
                      post.coverImage ||
                      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200 text-[11px] font-semibold text-[#c49725] uppercase tracking-wider shadow-xs">
                    {post.category}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Bar */}
                  <div className="flex items-center gap-3 text-[11px] text-neutral-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <Link href={`/blogs/${post.slug}`} className="block group-hover:text-[#c49725] transition-colors">
                    <h3 className="text-base sm:text-lg font-bold text-neutral-950 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <p className="mt-3 text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div className="text-xs text-neutral-500 font-medium">
                  By {post.author}
                </div>

                <Link
                  href={`/blogs/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c49725] group-hover:translate-x-0.5 transition-transform"
                >
                  <span>{t("blogs.read_guide")}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
