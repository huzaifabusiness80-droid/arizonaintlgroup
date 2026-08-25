"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const S: Record<string, React.CSSProperties> = {
  page: { fontFamily: "system-ui, -apple-system, sans-serif" },
  heading: { fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 4 },
  sub: { fontSize: 13, color: "#888", marginBottom: 28 },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 32 },
  statCard: { background: "#fff", border: "1px solid #e8e8e8", padding: "20px 18px" },
  statNum: { fontSize: 28, fontWeight: 700, color: "#111", marginBottom: 4 },
  statLabel: { fontSize: 11, color: "#888", textTransform: "uppercase" as const, letterSpacing: "0.06em" },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 13, fontWeight: 600, color: "#111", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #eee" },
  table: { width: "100%", borderCollapse: "collapse" as const, fontSize: 13, background: "#fff", border: "1px solid #e8e8e8" },
  th: { padding: "10px 16px", textAlign: "left" as const, fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase" as const, letterSpacing: "0.06em", borderBottom: "1px solid #eee", background: "#fafafa" },
  td: { padding: "11px 16px", color: "#333", borderBottom: "1px solid #f0f0f0" },
  badge: { padding: "3px 8px", fontSize: 10, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.05em", border: "1px solid" },
  quickLinks: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 32 },
  quickCard: { background: "#fff", border: "1px solid #e8e8e8", padding: "16px 18px", textDecoration: "none", display: "block" },
  quickTitle: { fontSize: 13, fontWeight: 600, color: "#111", marginBottom: 2 },
  quickSub: { fontSize: 12, color: "#999" },
};

const QUICK_LINKS = [
  { href: "/admin/visas/new", title: "Add Visa", sub: "Create new visa listing" },
  { href: "/admin/rent-a-car/new", title: "Add Car Service", sub: "Add rental vehicle option" },
  { href: "/admin/travel-tours/new", title: "Add Tour Package", sub: "Create travel package" },
  { href: "/admin/mobiles-tech/new", title: "Add Mobile Product", sub: "List new device" },
  { href: "/admin/bahrain-services/new", title: "Add Bahrain Service", sub: "Corporate setup service" },
  { href: "/admin/inquiries", title: "View Inquiries", sub: "Manage client inquiries" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setStats(d.stats);
          setInquiries(d.recentInquiries || []);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={S.page}>
      <div style={S.heading}>Dashboard</div>
      <div style={S.sub}>Welcome back. Here's a live overview of your content.</div>

      {/* Stats */}
      <div style={S.statsGrid}>
        {[
          { label: "Visa Listings", value: stats?.visas ?? "—", link: "/admin/visas" },
          { label: "Car Services", value: stats?.cars ?? "—", link: "/admin/rent-a-car" },
          { label: "Tour Packages", value: stats?.tours ?? "—", link: "/admin/travel-tours" },
          { label: "Mobile Products", value: stats?.mobiles ?? "—", link: "/admin/mobiles-tech" },
          { label: "Bahrain Services", value: stats?.bahrain ?? "—", link: "/admin/bahrain-services" },
          { label: "Unread Inquiries", value: stats?.unreadInquiries ?? "—", link: "/admin/inquiries", highlight: true },
        ].map((s) => (
          <Link key={s.label} href={s.link} style={{ textDecoration: "none" }}>
            <div style={{ ...S.statCard, borderLeft: s.highlight && (stats?.unreadInquiries || 0) > 0 ? "3px solid #c9a227" : "1px solid #e8e8e8" }}>
              <div style={{ ...S.statNum, color: s.highlight ? "#c9a227" : "#111" }}>
                {loading ? "..." : s.value}
              </div>
              <div style={S.statLabel}>{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={S.section}>
        <div style={S.sectionTitle}>Quick Actions</div>
        <div style={S.quickLinks}>
          {QUICK_LINKS.map((q) => (
            <Link key={q.href} href={q.href} style={S.quickCard}>
              <div style={S.quickTitle}>{q.title}</div>
              <div style={S.quickSub}>{q.sub}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Inquiries */}
      <div style={S.section}>
        <div style={S.sectionTitle}>Recent Inquiries</div>
        {inquiries.length === 0 ? (
          <div style={{ color: "#aaa", fontSize: 13, padding: "20px 0" }}>No inquiries yet.</div>
        ) : (
          <table style={S.table}>
            <thead>
              <tr>
                {["Name", "Phone", "Service", "Status", "Date"].map((h) => (
                  <th key={h} style={S.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq: any) => (
                <tr key={inq.id}>
                  <td style={S.td}>{inq.name}</td>
                  <td style={S.td}>{inq.phone}</td>
                  <td style={S.td}>{inq.service}</td>
                  <td style={S.td}>
                    <span style={{
                      ...S.badge,
                      color: inq.status === "NEW" ? "#1565c0" : inq.status === "RESOLVED" ? "#2e7d32" : "#555",
                      borderColor: inq.status === "NEW" ? "#bbdefb" : inq.status === "RESOLVED" ? "#c8e6c9" : "#e0e0e0",
                      background: inq.status === "NEW" ? "#e3f2fd" : inq.status === "RESOLVED" ? "#e8f5e9" : "#f5f5f5",
                    }}>{inq.status}</span>
                  </td>
                  <td style={S.td}>{new Date(inq.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
