"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { ExternalLink, Globe, ShieldCheck, Clock } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // If on login page, render full screen without sidebar and header
  if (isLoginPage) {
    return <>{children}</>;
  }

  const getSectionTitle = () => {
    if (pathname.includes("/visas")) return "Visas & Immigration Hub";
    if (pathname.includes("/rent-a-car")) return "Rent A Car & Fleet Management";
    if (pathname.includes("/travel-tours")) return "Travel & Holiday Tours";
    if (pathname.includes("/mobiles-tech")) return "Mobiles & Tech Hardware";
    if (pathname.includes("/bahrain-services")) return "Bahrain Business & CR Services";
    if (pathname.includes("/blogs")) return "Articles & News Management";
    if (pathname.includes("/inquiries")) return "Client Inquiries & CRM";
    return "Executive Dashboard Overview";
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
        background: "#f4f6f9",
        color: "#1e293b",
      }}
    >
      <AdminSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        {/* Top bar */}
        <header
          style={{
            height: 60,
            background: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            padding: "0 28px",
            justifyContent: "space-between",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
            position: "sticky",
            top: 0,
            zIndex: 40,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#0f172a",
                letterSpacing: "-0.01em",
              }}
            >
              {getSectionTitle()}
            </div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "2px 8px",
                background: "#ecfdf5",
                color: "#059669",
                border: "1px solid #a7f3d0",
                borderRadius: "12px",
                fontSize: "11px",
                fontWeight: 600,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
              Live CMS
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: "#64748b",
                background: "#f8fafc",
                padding: "5px 12px",
                borderRadius: "4px",
                border: "1px solid #e2e8f0",
              }}
            >
              <Clock size={13} color="#94a3b8" />
              <span>{new Date().toDateString()}</span>
            </div>

            <Link
              href="/"
              target="_blank"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                background: "#0f172a",
                color: "#ffffff",
                fontSize: 12,
                fontWeight: 600,
                borderRadius: "4px",
                textDecoration: "none",
                transition: "all 0.15s ease",
              }}
            >
              <Globe size={13} />
              <span>Live Site</span>
              <ExternalLink size={12} style={{ opacity: 0.7 }} />
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main
          style={{
            flex: 1,
            padding: "28px 32px",
            overflowY: "auto",
            maxWidth: "1600px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
