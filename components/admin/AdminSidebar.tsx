"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "▣" },
  { href: "/admin/visas", label: "Visas", icon: "⊞" },
  { href: "/admin/rent-a-car", label: "Rent a Car", icon: "◈" },
  { href: "/admin/travel-tours", label: "Travel & Tours", icon: "◉" },
  { href: "/admin/mobiles-tech", label: "Mobiles & Tech", icon: "▦" },
  { href: "/admin/bahrain-services", label: "Bahrain Business", icon: "◇" },
  { href: "/admin/inquiries", label: "Inquiries", icon: "▤" },
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
    <aside style={{
      width: 220,
      minHeight: "100vh",
      background: "#111",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      {/* Brand */}
      <div style={{ padding: "28px 20px 20px", borderBottom: "1px solid #222" }}>
        <div style={{ fontSize: 11, color: "#c9a227", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 2 }}>
          Arizona Intl.
        </div>
        <div style={{ fontSize: 13, color: "#999", fontWeight: 400 }}>
          Admin Portal
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "12px 0" }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 20px",
                fontSize: 13,
                color: isActive ? "#fff" : "#888",
                background: isActive ? "#1a1a1a" : "transparent",
                borderLeft: isActive ? "2px solid #c9a227" : "2px solid transparent",
                textDecoration: "none",
                fontWeight: isActive ? 500 : 400,
                transition: "color 0.15s",
              }}
            >
              <span style={{ fontSize: 12, opacity: 0.7 }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid #222" }}>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "9px 0",
            background: "transparent",
            border: "1px solid #333",
            color: "#888",
            fontSize: 12,
            cursor: "pointer",
            textAlign: "center",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
