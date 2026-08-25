"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // If on login page, render full screen without sidebar and header
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
        background: "#f8f8f8",
      }}
    >
      <AdminSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <header
          style={{
            height: 52,
            background: "#fff",
            borderBottom: "1px solid #e8e8e8",
            display: "flex",
            alignItems: "center",
            padding: "0 28px",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 13, color: "#888" }}>
            Arizona International Group — Content Management System
          </span>
          <span style={{ fontSize: 11, color: "#bbb", letterSpacing: "0.08em" }}>
            {new Date().toDateString()}
          </span>
        </header>

        {/* Main content */}
        <main style={{ flex: 1, padding: "28px", overflowY: "auto" }}>{children}</main>
      </div>
    </div>
  );
}
