"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  Car,
  Plane,
  Smartphone,
  Building2,
  MessageSquareText,
  ExternalLink,
  LogOut,
  ShieldCheck,
  Globe,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blogs", label: "Articles & Blogs", icon: BookOpen },
  { href: "/admin/visas", label: "Worldwide Visas", icon: Compass },
  { href: "/admin/rent-a-car", label: "Rent A Car", icon: Car },
  { href: "/admin/travel-tours", label: "Travel & Tours", icon: Plane },
  { href: "/admin/mobiles-tech", label: "Mobiles & Tech", icon: Smartphone },
  { href: "/admin/bahrain-services", label: "Bahrain Business (CR)", icon: Building2 },
  { href: "/admin/inquiries", label: "Client Inquiries", icon: MessageSquareText },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        fontFamily: "system-ui, -apple-system, sans-serif",
        borderRight: "1px solid #1e293b",
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          padding: "24px 20px",
          borderBottom: "1px solid #1e293b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          href="/admin/dashboard"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            src="/arizona-logo.png"
            alt="Arizona International Group"
            style={{
              height: "48px",
              width: "auto",
              maxWidth: "190px",
              objectFit: "contain",
            }}
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: "3px" }}>
        <div
          style={{
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#64748b",
            padding: "0 10px 8px",
            fontWeight: 600,
          }}
        >
          Management Portal
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "11px",
                padding: "10px 14px",
                fontSize: "13px",
                color: isActive ? "#ffffff" : "#94a3b8",
                background: isActive
                  ? "#2563eb"
                  : "transparent",
                borderRadius: "4px",
                textDecoration: "none",
                fontWeight: isActive ? 600 : 400,
                transition: "all 0.15s ease",
              }}
            >
              <Icon
                size={17}
                style={{
                  color: isActive ? "#ffffff" : "#64748b",
                  flexShrink: 0,
                }}
              />
              <span style={{ flex: 1 }}>{item.label}</span>
            </Link>
          );
        })}

        {/* Live Site Link */}
        <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #1e293b" }}>
          <div
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#64748b",
              padding: "0 10px 8px",
              fontWeight: 600,
            }}
          >
            Quick Links
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "9px 14px",
              fontSize: "12px",
              color: "#93c5fd",
              background: "rgba(37, 99, 235, 0.12)",
              border: "1px solid rgba(59, 130, 246, 0.25)",
              borderRadius: "4px",
              textDecoration: "none",
              fontWeight: 500,
              transition: "all 0.15s ease",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Globe size={14} />
              View Live Website
            </span>
            <ExternalLink size={13} />
          </a>
        </div>
      </nav>

      {/* Footer Profile & Logout */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid #1e293b",
          background: "#0b1120",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "13px",
            }}
          >
            AZ
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Arizona Super Admin
            </div>
            <div style={{ fontSize: "11px", color: "#64748b" }}>
              admin@arizonaintl.com
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "8px 0",
            background: "rgba(220, 38, 38, 0.12)",
            border: "1px solid rgba(220, 38, 38, 0.25)",
            color: "#fca5a5",
            fontSize: "12px",
            fontWeight: 500,
            cursor: "pointer",
            borderRadius: "4px",
            transition: "all 0.15s ease",
          }}
        >
          <LogOut size={14} />
          Sign Out of Portal
        </button>
      </div>
    </aside>
  );
}
