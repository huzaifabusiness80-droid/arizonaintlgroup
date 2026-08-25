"use client";

import { useRouter } from "next/navigation";

interface Column {
  key: string;
  label: string;
  render?: (val: any, row: any) => React.ReactNode;
}

interface AdminTableProps {
  title: string;
  section: string; // e.g. "visas", "rent-a-car"
  apiPath: string; // e.g. "/api/admin/visas"
  columns: Column[];
  items: any[];
  onRefresh: () => void;
  addHref: string;
}

const S: Record<string, React.CSSProperties> = {
  container: { background: "#fff", border: "1px solid #e8e8e8" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #eee" },
  title: { fontSize: 14, fontWeight: 600, color: "#111" },
  addBtn: { padding: "7px 16px", background: "#111", color: "#fff", border: "none", fontSize: 12, cursor: "pointer", letterSpacing: "0.04em" },
  table: { width: "100%", borderCollapse: "collapse" as const, fontSize: 13 },
  th: { padding: "10px 16px", textAlign: "left" as const, fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase" as const, letterSpacing: "0.06em", borderBottom: "1px solid #eee", background: "#fafafa" },
  td: { padding: "12px 16px", color: "#333", borderBottom: "1px solid #f0f0f0", verticalAlign: "middle" as const },
  editBtn: { padding: "5px 12px", background: "transparent", border: "1px solid #ccc", color: "#555", fontSize: 12, cursor: "pointer", marginRight: 6 },
  deleteBtn: { padding: "5px 12px", background: "transparent", border: "1px solid #ffcccc", color: "#c00", fontSize: 12, cursor: "pointer" },
  toggle: { padding: "4px 10px", fontSize: 11, border: "none", cursor: "pointer" },
  empty: { padding: "40px", textAlign: "center" as const, color: "#aaa", fontSize: 13 },
};

export default function AdminTable({ title, section, apiPath, columns, items, onRefresh, addHref }: AdminTableProps) {
  const router = useRouter();

  async function handleToggle(item: any) {
    await fetch(`${apiPath}/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !item.isActive }),
    });
    onRefresh();
  }

  async function handleDelete(item: any) {
    if (!confirm(`Delete "${item.name}"? This cannot be undone.`)) return;
    await fetch(`${apiPath}/${item.id}`, { method: "DELETE" });
    onRefresh();
  }

  return (
    <div style={S.container}>
      <div style={S.header}>
        <span style={S.title}>{title} <span style={{ color: "#aaa", fontWeight: 400 }}>({items.length})</span></span>
        <button style={S.addBtn} onClick={() => router.push(addHref)}>+ Add New</button>
      </div>

      {items.length === 0 ? (
        <div style={S.empty}>No items yet. Click "Add New" to get started.</div>
      ) : (
        <table style={S.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={S.th}>{col.label}</th>
              ))}
              <th style={S.th}>Status</th>
              <th style={S.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} style={{ background: item.isActive ? "#fff" : "#fafafa" }}>
                {columns.map((col) => (
                  <td key={col.key} style={S.td}>
                    {col.render ? col.render(item[col.key], item) : (item[col.key] ?? "—")}
                  </td>
                ))}
                <td style={S.td}>
                  <button
                    onClick={() => handleToggle(item)}
                    style={{
                      ...S.toggle,
                      background: item.isActive ? "#e6f4ea" : "#f5f5f5",
                      color: item.isActive ? "#2e7d32" : "#999",
                      border: `1px solid ${item.isActive ? "#c8e6c9" : "#e0e0e0"}`,
                    }}
                  >
                    {item.isActive ? "Active" : "Hidden"}
                  </button>
                </td>
                <td style={S.td}>
                  <button style={S.editBtn} onClick={() => router.push(`/admin/${section}/${item.id}`)}>Edit</button>
                  <button style={S.deleteBtn} onClick={() => handleDelete(item)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
