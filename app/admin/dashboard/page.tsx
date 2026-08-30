"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Compass,
  Car,
  Plane,
  Smartphone,
  Building2,
  BookOpen,
  MessageSquareText,
  CalendarCheck,
  Plus,
  ArrowRight,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setStats(d.stats);
          setInquiries(d.recentInquiries || []);
          setBookings(d.recentBookings || []);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const STAT_CARDS = [
    {
      title: "Visa Destinations",
      value: stats?.visas ?? 0,
      icon: Compass,
      href: "/admin/visas",
      color: "#2563eb",
      bg: "rgba(37, 99, 235, 0.08)",
      desc: "Worldwide tourist & business e-visas",
    },
    {
      title: "Rent A Car Fleet",
      value: stats?.cars ?? 0,
      icon: Car,
      href: "/admin/rent-a-car",
      color: "#0891b2",
      bg: "rgba(8, 145, 178, 0.08)",
      desc: "Daily, weekly & chauffeur services",
    },
    {
      title: "Travel & Tours",
      value: stats?.tours ?? 0,
      icon: Plane,
      href: "/admin/travel-tours",
      color: "#059669",
      bg: "rgba(5, 150, 105, 0.08)",
      desc: "Umrah packages & holiday tours",
    },
    {
      title: "Mobiles & Tech",
      value: stats?.mobiles ?? 0,
      icon: Smartphone,
      href: "/admin/mobiles-tech",
      color: "#7c3aed",
      bg: "rgba(124, 58, 237, 0.08)",
      desc: "Smartphones & hardware devices",
    },
    {
      title: "Bahrain Business",
      value: stats?.bahrain ?? 0,
      icon: Building2,
      href: "/admin/bahrain-services",
      color: "#2563eb",
      bg: "rgba(37, 99, 235, 0.08)",
      desc: "100% foreign CR & LMRA permits",
    },
    {
      title: "Published Articles",
      value: stats?.blogs ?? 0,
      icon: BookOpen,
      href: "/admin/blogs",
      color: "#0284c7",
      bg: "rgba(2, 132, 199, 0.08)",
      desc: "Knowledge guides & news updates",
    },
  ];

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          border: "1px solid #334155",
          borderRadius: "8px",
          padding: "24px 28px",
          color: "#ffffff",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "28px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#93c5fd",
                background: "rgba(37, 99, 235, 0.25)",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                padding: "3px 8px",
                borderRadius: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Enterprise Admin Hub
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.6)" }}>• Live Database Connected</span>
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, margin: 0, color: "#ffffff" }}>
            Welcome to Arizona International Portal
          </h1>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: "4px 0 0 0" }}>
            Manage listings, bulk import spreadsheets, dual currencies (PKR & BHD), and live client requests.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Link
            href="/admin/blogs/new"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 16px",
              background: "#2563eb",
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: 600,
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            <Plus size={14} /> New Article
          </Link>
          <Link
            href="/admin/visas/new"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 16px",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              fontSize: "12px",
              fontWeight: 500,
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            <Plus size={14} /> New Visa
          </Link>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              style={{
                textDecoration: "none",
                display: "block",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                padding: "20px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {card.title}
                </span>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "6px",
                    background: card.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: card.color,
                  }}
                >
                  <Icon size={18} />
                </div>
              </div>

              <div style={{ fontSize: "28px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>
                {loading ? "..." : card.value}
              </div>

              <div style={{ fontSize: "11px", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span>{card.desc}</span>
                <ArrowRight size={12} color="#cbd5e1" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Unread Inquiries & Bookings Quick Counter Bar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        <Link
          href="/admin/inquiries"
          style={{
            textDecoration: "none",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderLeft: "4px solid #2563eb",
            padding: "16px 20px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb" }}>
              <MessageSquareText size={18} />
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>
                {stats?.unreadInquiries ?? 0} Unread Inquiries
              </div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>
                Customer messages from contact & consultation forms
              </div>
            </div>
          </div>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#2563eb" }}>Manage &rarr;</span>
        </Link>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderLeft: "4px solid #059669",
            padding: "16px 20px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", color: "#059669" }}>
              <CalendarCheck size={18} />
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>
                {stats?.bookings ?? 0} Active Client Bookings
              </div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>
                Registered portal user bookings & trips
              </div>
            </div>
          </div>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#059669", background: "#d1fae5", padding: "3px 8px", borderRadius: "4px" }}>
            Active
          </span>
        </div>
      </div>

      {/* Two Column Layout: Quick Spreadsheets Bulk Import + Recent Inquiries */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Quick Bulk Import Launchpad */}
        <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", paddingBottom: "12px", borderBottom: "1px solid #f1f5f9" }}>
            <FileSpreadsheet size={18} color="#2563eb" />
            <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
              Bulk Excel & CSV Import Center
            </h2>
          </div>

          <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "16px" }}>
            Quickly upload multiple items to any service catalog with automatic spreadsheet parsing and template downloads:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[
              { label: "Rent A Car", href: "/admin/rent-a-car", icon: Car },
              { label: "Visas & Immigration", href: "/admin/visas", icon: Compass },
              { label: "Travel & Tours", href: "/admin/travel-tours", icon: Plane },
              { label: "Mobiles & Tech", href: "/admin/mobiles-tech", icon: Smartphone },
              { label: "Bahrain Business", href: "/admin/bahrain-services", icon: Building2 },
              { label: "Articles & Blogs", href: "/admin/blogs", icon: BookOpen },
            ].map((btn) => {
              const Icon = btn.icon;
              return (
                <Link
                  key={btn.label}
                  href={btn.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 12px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#334155",
                    textDecoration: "none",
                  }}
                >
                  <Icon size={14} color="#2563eb" />
                  <span>{btn.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Client Inquiries Feed */}
        <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", paddingBottom: "12px", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <MessageSquareText size={18} color="#2563eb" />
              <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                Recent Inquiries & Leads
              </h2>
            </div>
            <Link href="/admin/inquiries" style={{ fontSize: "12px", fontWeight: 600, color: "#2563eb", textDecoration: "none" }}>
              View All &rarr;
            </Link>
          </div>

          {inquiries.length === 0 ? (
            <div style={{ padding: "30px", textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>
              No inquiries received yet.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {inquiries.slice(0, 4).map((inq: any) => (
                <div
                  key={inq.id}
                  style={{
                    padding: "10px 12px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "12px",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: "#0f172a" }}>{inq.name}</div>
                    <div style={{ fontSize: "11px", color: "#64748b" }}>
                      {inq.service} • {inq.phone}
                    </div>
                  </div>
                  <span
                    style={{
                      padding: "2px 6px",
                      fontSize: "10px",
                      fontWeight: 700,
                      borderRadius: "2px",
                      background: inq.status === "NEW" ? "#eff6ff" : "#f0fdf4",
                      color: inq.status === "NEW" ? "#1d4ed8" : "#15803d",
                      border: `1px solid ${inq.status === "NEW" ? "#bfdbfe" : "#bbf7d0"}`,
                    }}
                  >
                    {inq.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
