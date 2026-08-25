"use client";

import ServiceForm from "@/components/admin/ServiceForm";

export default function NewCarPage() {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 4 }}>
        Add New Car Rental Service
      </div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>
        Create a new vehicle rental category (e.g. Daily Rentals, VIP Chauffeur, Wedding Cars) with multiple vehicle options.
      </div>
      <ServiceForm
        mode="create"
        type="car"
        apiPath="/api/admin/cars"
        backPath="/admin/rent-a-car"
      />
    </div>
  );
}
