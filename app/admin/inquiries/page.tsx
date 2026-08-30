"use client";

import { useEffect, useState, useCallback } from "react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/inquiries")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setInquiries(d.items || []);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, isRead: true }),
    });
    load();
  }

  const filtered = inquiries.filter((inq) => {
    if (filter === "ALL") return true;
    return inq.status === filter;
  });

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 4 }}>
            Customer Inquiries & Leads
          </div>
          <div style={{ fontSize: 13, color: "#888" }}>
            All contact forms and service inquiries submitted from the website.
          </div>
        </div>

        {/* Filter buttons */}
        <div style={{ display: "flex", gap: 6 }}>
          {["ALL", "NEW", "IN_PROGRESS", "RESOLVED"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "6px 14px",
                fontSize: 12,
                cursor: "pointer",
                background: filter === f ? "#111" : "#fff",
                color: filter === f ? "#fff" : "#555",
                border: "1px solid #ccc",
              }}
            >
              {f.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ color: "#aaa", fontSize: 13 }}>Loading inquiries...</div>
      ) : filtered.length === 0 ? (
        <div style={{ background: "#fff", border: "1px solid #e8e8e8", padding: "48px", textAlign: "center", color: "#aaa", fontSize: 13 }}>
          No inquiries found matching this filter.
        </div>
      ) : (
        <div style={{ background: "#fff", border: "1px solid #e8e8e8" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#fafafa", borderBottom: "1px solid #eee" }}>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em" }}>Client</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em" }}>Contact Info</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em" }}>Service & Message</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em" }}>Status</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inq) => {
                const phoneClean = (inq.phone || "").replace(/[^0-9]/g, "");
                const waLink = phoneClean ? `https://wa.me/${phoneClean}` : null;

                return (
                  <tr key={inq.id} style={{ borderBottom: "1px solid #f0f0f0", background: inq.status === "NEW" ? "#fafcff" : "#fff" }}>
                    <td style={{ padding: "14px 16px", verticalAlign: "top" }}>
                      <div style={{ fontWeight: 600, color: "#111", fontSize: 13 }}>{inq.name}</div>
                      <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{inq.country || "Global"}</div>
                      <div style={{ fontSize: 11, color: "#aaa", marginTop: 4 }}>
                        {new Date(inq.createdAt).toLocaleString()}
                      </div>
                    </td>

                    <td style={{ padding: "14px 16px", verticalAlign: "top" }}>
                      <div style={{ fontSize: 12, color: "#111" }}>{inq.phone}</div>
                      <div style={{ fontSize: 12, color: "#777", marginTop: 2 }}>{inq.email}</div>
                      {waLink && (
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: "inline-block", marginTop: 6, fontSize: 11, color: "#1b8755", textDecoration: "none", fontWeight: 500 }}
                        >
                          → WhatsApp Chat
                        </a>
                      )}
                    </td>

                    <td style={{ padding: "14px 16px", verticalAlign: "top", maxWidth: 320 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        {inq.service}
                      </div>
                      <div style={{ fontSize: 12, color: "#555", marginTop: 4, lineHeight: 1.5 }}>
                        {inq.message || "—"}
                      </div>
                    </td>

                    <td style={{ padding: "14px 16px", verticalAlign: "top" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "3px 8px",
                          fontSize: 10,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          border: "1px solid",
                          color:
                            inq.status === "NEW"
                              ? "#1565c0"
                              : inq.status === "IN_PROGRESS"
                              ? "#e65100"
                              : "#2e7d32",
                          borderColor:
                            inq.status === "NEW"
                              ? "#bbdefb"
                              : inq.status === "IN_PROGRESS"
                              ? "#ffe0b2"
                              : "#c8e6c9",
                          background:
                            inq.status === "NEW"
                              ? "#e3f2fd"
                              : inq.status === "IN_PROGRESS"
                              ? "#fff3e0"
                              : "#e8f5e9",
                        }}
                      >
                        {inq.status.replace("_", " ")}
                      </span>
                    </td>

                    <td style={{ padding: "14px 16px", verticalAlign: "top" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {inq.status !== "IN_PROGRESS" && (
                          <button
                            onClick={() => updateStatus(inq.id, "IN_PROGRESS")}
                            style={{ padding: "4px 8px", fontSize: 11, background: "#fff", border: "1px solid #ccc", color: "#555", cursor: "pointer", textAlign: "left" }}
                          >
                            Mark In Progress
                          </button>
                        )}
                        {inq.status !== "RESOLVED" && (
                          <button
                            onClick={() => updateStatus(inq.id, "RESOLVED")}
                            style={{ padding: "4px 8px", fontSize: 11, background: "#fff", border: "1px solid #c8e6c9", color: "#2e7d32", cursor: "pointer", textAlign: "left" }}
                          >
                            Mark Resolved
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
