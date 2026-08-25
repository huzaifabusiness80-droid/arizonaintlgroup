"use client";

import ServiceForm from "@/components/admin/ServiceForm";

export default function NewVisaPage() {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 4 }}>Add New Visa</div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>Fill in the details below. This visa will appear on the website once saved and set to Active.</div>
      <ServiceForm
        mode="create"
        type="visa"
        apiPath="/api/admin/visas"
        backPath="/admin/visas"
      />
    </div>
  );
}
