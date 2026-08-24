"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Globe, PhoneCall } from "lucide-react";

interface PageHeaderProps {
  currentPath?: string;
}

export default function PageHeader({ currentPath }: PageHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Divisions", href: "/services" },
    { name: "Global Visas", href: "/visas" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-neutral-200/80">
      <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="w-9 h-9 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-bold text-base shadow-xs group-hover:scale-105 transition-transform">
            A
          </span>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-neutral-950 leading-none">
              ARIZONA
            </span>
            <span className="text-[9.5px] font-semibold text-[#c49725] tracking-widest uppercase mt-0.5">
              International Group
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-neutral-100/90 p-1.5 rounded-full border border-neutral-200/70">
          {navLinks.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? "bg-neutral-950 text-white shadow-xs"
                    : "text-neutral-600 hover:text-neutral-950 hover:bg-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://wa.me/923135921434"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-medium transition-all shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>+92 313 5921434</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-neutral-800 hover:bg-neutral-100"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-6 py-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-neutral-800 hover:text-[#c49725]"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-neutral-100">
            <a
              href="https://wa.me/923135921434"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-neutral-950 text-white text-xs font-medium"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Contact via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
