"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, PhoneCall } from "lucide-react";
import { useGeoLocation } from "@/context/GeoContext";

interface PageHeaderProps {
  currentPath?: string;
}

export default function PageHeader({ currentPath }: PageHeaderProps) {
  const { contact } = useGeoLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Global Visas", href: "/visas" },
    { name: "Articles", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group py-1">
          <img
            src="/logo.svg"
            alt="Arizona International Group"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-100 p-1 rounded-md border border-slate-200">
          {navLinks.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#2563eb] text-white"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-200/60"
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
            href={contact.whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-medium transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{contact.phone}</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-md text-slate-800 hover:bg-slate-100"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-5 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-xs font-medium text-slate-800 hover:text-[#2563eb]"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100">
            <a
              href={contact.whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-md bg-[#2563eb] text-white text-xs font-medium"
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
