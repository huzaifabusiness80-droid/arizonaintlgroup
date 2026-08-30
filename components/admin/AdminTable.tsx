"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileSpreadsheet, Plus, Edit, Trash2, CheckCircle2, EyeOff, Sparkles } from "lucide-react";
import BulkImportModal from "./BulkImportModal";

interface Column {
  key: string;
  label: string;
  render?: (val: any, row: any) => React.ReactNode;
}

interface AdminTableProps {
  title: string;
  section: string; // e.g. "visas", "rent-a-car", "travel-tours", "mobiles-tech", "bahrain-services"
  apiPath: string; // e.g. "/api/admin/visas"
  columns: Column[];
  items: any[];
  onRefresh: () => void;
  addHref: string;
}

export default function AdminTable({ title, section, apiPath, columns, items, onRefresh, addHref }: AdminTableProps) {
  const router = useRouter();
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleToggle(item: any) {
    await fetch(`${apiPath}/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !item.isActive }),
    });
    onRefresh();
  }

  async function handleDelete(item: any) {
    if (!confirm(`Delete "${item.name}"? This action cannot be undone.`)) return;
    setDeletingId(item.id);
    try {
      await fetch(`${apiPath}/${item.id}`, { method: "DELETE" });
      onRefresh();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "6px",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Table Header Action Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: "1px solid #e2e8f0",
          background: "#ffffff",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>{title}</span>{" "}
          <span
            style={{
              fontSize: "11px",
              background: "#f1f5f9",
              color: "#475569",
              padding: "2px 8px",
              borderRadius: "12px",
              fontWeight: 600,
              marginLeft: "6px",
            }}
          >
            {items.length} records
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => setIsImportOpen(true)}
            style={{
              padding: "8px 16px",
              background: "#2563eb",
              color: "#ffffff",
              border: "none",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              borderRadius: "4px",
              boxShadow: "0 1px 2px rgba(37, 99, 235, 0.2)",
              transition: "all 0.15s ease",
            }}
            title="Bulk Import from Excel / CSV"
          >
            <FileSpreadsheet size={15} />
            Bulk Import
          </button>

          <button
            onClick={() => router.push(addHref)}
            style={{
              padding: "8px 16px",
              background: "#2563eb",
              color: "#ffffff",
              border: "none",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              borderRadius: "4px",
              transition: "all 0.15s ease",
            }}
          >
            <Plus size={15} /> Add New
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div style={{ padding: "48px 24px", textAlign: "center", color: "#64748b", background: "#f8fafc" }}>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
            No records found in this section
          </div>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 16px 0" }}>
            Get started by creating an individual record or importing from an Excel/CSV spreadsheet.
          </p>
          <div style={{ display: "inline-flex", gap: "10px" }}>
            <button
              onClick={() => setIsImportOpen(true)}
              style={{
                padding: "8px 16px",
                background: "#2563eb",
                border: "none",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                borderRadius: "4px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 1px 2px rgba(37, 99, 235, 0.2)",
              }}
            >
              <FileSpreadsheet size={15} /> Bulk Import
            </button>
            <button
              onClick={() => router.push(addHref)}
              style={{
                padding: "8px 16px",
                background: "#2563eb",
                color: "#ffffff",
                border: "none",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                borderRadius: "4px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Plus size={15} /> Add First Item
            </button>
          </div>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    style={{
                      padding: "11px 16px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {col.label}
                  </th>
                ))}
                <th
                  style={{
                    padding: "11px 16px",
                    textAlign: "center",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    padding: "11px 16px",
                    textAlign: "right",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: "1px solid #f1f5f9",
                    background: item.isActive ? "#ffffff" : "#fcfcfd",
                  }}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{
                        padding: "12px 16px",
                        color: "#1e293b",
                        verticalAlign: "middle",
                      }}
                    >
                      {col.render ? col.render(item[col.key], item) : (item[col.key] ?? "—")}
                    </td>
                  ))}
                  <td style={{ padding: "12px 16px", textAlign: "center", verticalAlign: "middle" }}>
                    <button
                      onClick={() => handleToggle(item)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "4px 9px",
                        fontSize: "11px",
                        fontWeight: 600,
                        borderRadius: "12px",
                        cursor: "pointer",
                        background: item.isActive ? "#ecfdf5" : "#f1f5f9",
                        color: item.isActive ? "#059669" : "#64748b",
                        border: `1px solid ${item.isActive ? "#a7f3d0" : "#cbd5e1"}`,
                      }}
                      title="Click to toggle publish status"
                    >
                      {item.isActive ? <CheckCircle2 size={12} /> : <EyeOff size={12} />}
                      {item.isActive ? "Active" : "Hidden"}
                    </button>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "right", verticalAlign: "middle" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <button
                        onClick={() => router.push(`/admin/${section}/${item.id}`)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "5px 10px",
                          background: "#ffffff",
                          border: "1px solid #cbd5e1",
                          color: "#0f172a",
                          fontSize: "12px",
                          fontWeight: 500,
                          borderRadius: "3px",
                          cursor: "pointer",
                        }}
                      >
                        <Edit size={12} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        disabled={deletingId === item.id}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "5px 8px",
                          background: "#fef2f2",
                          border: "1px solid #fecaca",
                          color: "#dc2626",
                          fontSize: "12px",
                          borderRadius: "3px",
                          cursor: deletingId === item.id ? "not-allowed" : "pointer",
                        }}
                        title="Delete Record"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Bulk Import Modal */}
      <BulkImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        section={section}
        title={title}
        onSuccess={onRefresh}
      />
    </div>
  );
}
