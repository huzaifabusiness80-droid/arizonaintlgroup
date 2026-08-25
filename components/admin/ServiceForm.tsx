"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface ServiceFormData {
  slug: string;
  name: string;
  description: string;
  tag: string;
  image: string;
  basePrice: string;
  about: string;
  gallery: string[];
  options: {
    name: string;
    price: string;
    period: string;
    capacity: string;
    badge: string;
    desc: string;
  }[];
  isActive: boolean;
  sortOrder: number;
  // Visa-only fields
  country?: string;
  flag?: string;
  region?: string;
  regionName?: string;
  type?: string;
  processingTime?: string;
  entryType?: string;
  validity?: string;
  heroImage?: string;
  cardImage?: string;
  tagline?: string;
  overview?: string;
  requirements?: string[];
  processSteps?: { step: string; title: string; desc: string }[];
  included?: string[];
  // Mobile-only fields
  brand?: string;
}

const S: Record<string, React.CSSProperties> = {
  form: { fontFamily: "system-ui, -apple-system, sans-serif", maxWidth: 820 },
  fieldGroup: { marginBottom: 20 },
  label: { display: "block", fontSize: 11, fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 },
  input: { width: "100%", padding: "9px 12px", border: "1px solid #d4d4d4", fontSize: 13, color: "#111", background: "#fff", outline: "none", boxSizing: "border-box" as const },
  textarea: { width: "100%", padding: "9px 12px", border: "1px solid #d4d4d4", fontSize: 13, color: "#111", background: "#fff", outline: "none", boxSizing: "border-box" as const, minHeight: 100, resize: "vertical" as const, fontFamily: "inherit" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 },
  row3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 },
  sectionTitle: { fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14, marginTop: 28, paddingTop: 20, borderTop: "1px solid #eee" },
  addBtn: { padding: "7px 14px", background: "#fff", border: "1px solid #ccc", color: "#444", fontSize: 12, cursor: "pointer", marginTop: 8 },
  removeBtn: { padding: "5px 10px", background: "#fff", border: "1px solid #ffcccc", color: "#c00", fontSize: 11, cursor: "pointer" },
  optionCard: { border: "1px solid #e8e8e8", padding: "14px 16px", marginBottom: 10, background: "#fafafa" },
  submitBtn: { padding: "11px 28px", background: "#111", color: "#fff", border: "none", fontSize: 13, cursor: "pointer", fontWeight: 600, letterSpacing: "0.04em" },
  cancelBtn: { padding: "11px 20px", background: "#fff", border: "1px solid #ccc", color: "#555", fontSize: 13, cursor: "pointer", marginLeft: 10 },
  checkRow: { display: "flex", alignItems: "center", gap: 10 },
  statusBar: { padding: "10px 14px", marginBottom: 16, fontSize: 13 },
};

interface ServiceFormProps {
  mode: "create" | "edit";
  type: "visa" | "car" | "tour" | "mobile" | "bahrain";
  apiPath: string;
  backPath: string;
  initialData?: Partial<ServiceFormData>;
  itemId?: string;
}

const EMPTY_OPTION = { name: "", price: "", period: "", capacity: "", badge: "", desc: "" };
const EMPTY_STEP = { step: "", title: "", desc: "" };

function makeSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function ServiceForm({ mode, type, apiPath, backPath, initialData, itemId }: ServiceFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const [form, setForm] = useState<ServiceFormData>({
    slug: initialData?.slug || "",
    name: initialData?.name || "",
    description: initialData?.description || "",
    tag: initialData?.tag || "",
    image: initialData?.image || "",
    basePrice: initialData?.basePrice || "",
    about: initialData?.about || "",
    gallery: initialData?.gallery || [],
    options: (initialData?.options as any[]) || [],
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
    sortOrder: initialData?.sortOrder || 0,
    // Visa fields
    country: initialData?.country || "",
    flag: initialData?.flag || "",
    region: initialData?.region || "asia",
    regionName: initialData?.regionName || "",
    type: initialData?.type || "",
    processingTime: initialData?.processingTime || "",
    entryType: initialData?.entryType || "",
    validity: initialData?.validity || "",
    heroImage: initialData?.heroImage || "",
    cardImage: initialData?.cardImage || "",
    tagline: initialData?.tagline || "",
    overview: initialData?.overview || "",
    requirements: (initialData?.requirements as string[]) || [],
    processSteps: (initialData?.processSteps as any[]) || [],
    included: (initialData?.included as string[]) || [],
    // Mobile
    brand: initialData?.brand || "",
  });

  function update(field: keyof ServiceFormData, val: any) {
    setForm((prev) => ({ ...prev, [field]: val }));
  }

  function autoSlug(name: string) {
    if (mode === "create") update("slug", makeSlug(name));
  }

  // Options
  function addOption() { update("options", [...form.options, { ...EMPTY_OPTION }]); }
  function updateOption(i: number, field: string, val: string) {
    const opts = [...form.options];
    (opts[i] as any)[field] = val;
    update("options", opts);
  }
  function removeOption(i: number) { update("options", form.options.filter((_, idx) => idx !== i)); }

  // Requirements
  function addRequirement() { update("requirements", [...(form.requirements || []), ""]); }
  function updateRequirement(i: number, val: string) {
    const arr = [...(form.requirements || [])];
    arr[i] = val;
    update("requirements", arr);
  }
  function removeRequirement(i: number) { update("requirements", (form.requirements || []).filter((_, idx) => idx !== i)); }

  // Process Steps
  function addStep() { update("processSteps", [...(form.processSteps || []), { ...EMPTY_STEP }]); }
  function updateStep(i: number, field: string, val: string) {
    const steps = [...(form.processSteps || [])];
    (steps[i] as any)[field] = val;
    update("processSteps", steps);
  }
  function removeStep(i: number) { update("processSteps", (form.processSteps || []).filter((_, idx) => idx !== i)); }

  // Included
  function addIncluded() { update("included", [...(form.included || []), ""]); }
  function updateIncluded(i: number, val: string) {
    const arr = [...(form.included || [])];
    arr[i] = val;
    update("included", arr);
  }
  function removeIncluded(i: number) { update("included", (form.included || []).filter((_, idx) => idx !== i)); }

  // Gallery
  function addGallery() { update("gallery", [...form.gallery, ""]); }
  function updateGallery(i: number, val: string) {
    const arr = [...form.gallery];
    arr[i] = val;
    update("gallery", arr);
  }
  function removeGallery(i: number) { update("gallery", form.gallery.filter((_, idx) => idx !== i)); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const url = mode === "edit" ? `${apiPath}/${itemId}` : apiPath;
      const method = mode === "edit" ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ type: "success", msg: mode === "edit" ? "Saved successfully." : "Created successfully." });
        setTimeout(() => router.push(backPath), 1000);
      } else {
        setStatus({ type: "error", msg: data.error || "Failed to save." });
      }
    } catch {
      setStatus({ type: "error", msg: "Network error." });
    } finally {
      setSaving(false);
    }
  }

  const inputStyle = S.input;
  const labelStyle = S.label;

  return (
    <form onSubmit={handleSubmit} style={S.form}>
      {status && (
        <div style={{ ...S.statusBar, background: status.type === "success" ? "#e8f5e9" : "#fff0f0", border: `1px solid ${status.type === "success" ? "#c8e6c9" : "#ffcccc"}`, color: status.type === "success" ? "#2e7d32" : "#c00" }}>
          {status.msg}
        </div>
      )}

      {/* === BASIC INFO === */}
      <div style={S.sectionTitle}>Basic Information</div>

      {type === "mobile" && (
        <div style={S.fieldGroup}>
          <label style={labelStyle}>Brand</label>
          <input style={inputStyle} value={form.brand || ""} onChange={(e) => update("brand", e.target.value)} placeholder="e.g. Apple, Samsung, Huawei" />
        </div>
      )}

      <div style={S.fieldGroup}>
        <label style={labelStyle}>Name *</label>
        <input style={inputStyle} required value={form.name} onChange={(e) => { update("name", e.target.value); autoSlug(e.target.value); }} placeholder="Service / Product name" />
      </div>

      <div style={S.row}>
        <div>
          <label style={labelStyle}>Slug (URL Key) *</label>
          <input style={inputStyle} required value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="e.g. daily-rentals" />
        </div>
        <div>
          <label style={labelStyle}>Tag / Badge</label>
          <input style={inputStyle} value={form.tag} onChange={(e) => update("tag", e.target.value)} placeholder="e.g. Best Seller" />
        </div>
      </div>

      <div style={S.row}>
        <div>
          <label style={labelStyle}>Base Price</label>
          <input style={inputStyle} value={form.basePrice} onChange={(e) => update("basePrice", e.target.value)} placeholder="e.g. Starting from PKR 5,000" />
        </div>
        <div>
          <label style={labelStyle}>Sort Order</label>
          <input style={inputStyle} type="number" value={form.sortOrder} onChange={(e) => update("sortOrder", parseInt(e.target.value) || 0)} placeholder="0" />
        </div>
      </div>

      <div style={S.fieldGroup}>
        <label style={labelStyle}>Short Description</label>
        <textarea style={S.textarea} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Brief description shown in listings..." />
      </div>

      <div style={S.fieldGroup}>
        <label style={labelStyle}>Main Image URL</label>
        <input style={inputStyle} value={form.image} onChange={(e) => update("image", e.target.value)} placeholder="https://..." />
        {form.image && <img src={form.image} alt="" style={{ marginTop: 8, height: 80, objectFit: "cover", border: "1px solid #eee" }} />}
      </div>

      <div style={S.fieldGroup}>
        <label style={labelStyle}>About (Full Detail)</label>
        <textarea style={{ ...S.textarea, minHeight: 120 }} value={form.about} onChange={(e) => update("about", e.target.value)} placeholder="Full description shown on detail page..." />
      </div>

      {/* Status toggle */}
      <div style={{ ...S.fieldGroup, ...S.checkRow }}>
        <input type="checkbox" id="isActive" checked={form.isActive} onChange={(e) => update("isActive", e.target.checked)} style={{ width: 16, height: 16 }} />
        <label htmlFor="isActive" style={{ fontSize: 13, color: "#333", cursor: "pointer" }}>
          Show on website (Active)
        </label>
      </div>

      {/* === VISA-ONLY FIELDS === */}
      {type === "visa" && (
        <>
          <div style={S.sectionTitle}>Visa Details</div>
          <div style={S.row}>
            <div>
              <label style={labelStyle}>Country Name</label>
              <input style={inputStyle} value={form.country || ""} onChange={(e) => update("country", e.target.value)} placeholder="e.g. Malaysia" />
            </div>
            <div>
              <label style={labelStyle}>Flag Emoji</label>
              <input style={inputStyle} value={form.flag || ""} onChange={(e) => update("flag", e.target.value)} placeholder="🇲🇾" />
            </div>
          </div>
          <div style={S.row3}>
            <div>
              <label style={labelStyle}>Region</label>
              <select style={inputStyle} value={form.region || "asia"} onChange={(e) => update("region", e.target.value)}>
                <option value="europe">Europe</option>
                <option value="gcc">GCC</option>
                <option value="asia">Asia</option>
                <option value="americas">Americas</option>
                <option value="africa">Africa</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Region Name</label>
              <input style={inputStyle} value={form.regionName || ""} onChange={(e) => update("regionName", e.target.value)} placeholder="e.g. Southeast Asia" />
            </div>
            <div>
              <label style={labelStyle}>Visa Type</label>
              <input style={inputStyle} value={form.type || ""} onChange={(e) => update("type", e.target.value)} placeholder="e.g. Tourist eVisa" />
            </div>
          </div>
          <div style={S.row3}>
            <div>
              <label style={labelStyle}>Processing Time</label>
              <input style={inputStyle} value={form.processingTime || ""} onChange={(e) => update("processingTime", e.target.value)} placeholder="e.g. 3 - 5 Days" />
            </div>
            <div>
              <label style={labelStyle}>Entry Type</label>
              <input style={inputStyle} value={form.entryType || ""} onChange={(e) => update("entryType", e.target.value)} placeholder="e.g. Single Entry" />
            </div>
            <div>
              <label style={labelStyle}>Validity</label>
              <input style={inputStyle} value={form.validity || ""} onChange={(e) => update("validity", e.target.value)} placeholder="e.g. 30 Days" />
            </div>
          </div>
          <div style={S.row}>
            <div>
              <label style={labelStyle}>Hero Image URL</label>
              <input style={inputStyle} value={form.heroImage || ""} onChange={(e) => update("heroImage", e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <label style={labelStyle}>Card Image URL</label>
              <input style={inputStyle} value={form.cardImage || ""} onChange={(e) => update("cardImage", e.target.value)} placeholder="https://..." />
            </div>
          </div>
          <div style={S.fieldGroup}>
            <label style={labelStyle}>Tagline</label>
            <input style={inputStyle} value={form.tagline || ""} onChange={(e) => update("tagline", e.target.value)} placeholder="Short marketing tagline..." />
          </div>
          <div style={S.fieldGroup}>
            <label style={labelStyle}>Overview</label>
            <textarea style={{ ...S.textarea, minHeight: 120 }} value={form.overview || ""} onChange={(e) => update("overview", e.target.value)} placeholder="Detailed overview..." />
          </div>

          {/* Requirements */}
          <div style={S.sectionTitle}>Requirements</div>
          {(form.requirements || []).map((req, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input style={{ ...inputStyle, flex: 1 }} value={req} onChange={(e) => updateRequirement(i, e.target.value)} placeholder="Requirement..." />
              <button type="button" style={S.removeBtn} onClick={() => removeRequirement(i)}>Remove</button>
            </div>
          ))}
          <button type="button" style={S.addBtn} onClick={addRequirement}>+ Add Requirement</button>

          {/* Process Steps */}
          <div style={S.sectionTitle}>Process Steps</div>
          {(form.processSteps || []).map((step: any, i) => (
            <div key={i} style={S.optionCard}>
              <div style={S.row3}>
                <div>
                  <label style={labelStyle}>Step No.</label>
                  <input style={inputStyle} value={step.step} onChange={(e) => updateStep(i, "step", e.target.value)} placeholder="01" />
                </div>
                <div>
                  <label style={labelStyle}>Title</label>
                  <input style={inputStyle} value={step.title} onChange={(e) => updateStep(i, "title", e.target.value)} placeholder="Step title..." />
                </div>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <button type="button" style={S.removeBtn} onClick={() => removeStep(i)}>Remove</button>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Description</label>
                <input style={inputStyle} value={step.desc} onChange={(e) => updateStep(i, "desc", e.target.value)} placeholder="Step description..." />
              </div>
            </div>
          ))}
          <button type="button" style={S.addBtn} onClick={addStep}>+ Add Step</button>

          {/* Included */}
          <div style={S.sectionTitle}>Included in Service</div>
          {(form.included || []).map((inc, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input style={{ ...inputStyle, flex: 1 }} value={inc} onChange={(e) => updateIncluded(i, e.target.value)} placeholder="e.g. BLS Slot Booking" />
              <button type="button" style={S.removeBtn} onClick={() => removeIncluded(i)}>Remove</button>
            </div>
          ))}
          <button type="button" style={S.addBtn} onClick={addIncluded}>+ Add Included Item</button>
        </>
      )}

      {/* === PRICING OPTIONS === */}
      <div style={S.sectionTitle}>Pricing Options</div>
      <p style={{ fontSize: 12, color: "#999", marginBottom: 12 }}>Add one or more pricing tiers. Each will show as a package card on the website.</p>
      {form.options.map((opt: any, i) => (
        <div key={i} style={S.optionCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#555" }}>Option {i + 1}</span>
            <button type="button" style={S.removeBtn} onClick={() => removeOption(i)}>Remove</button>
          </div>
          <div style={S.row}>
            <div>
              <label style={labelStyle}>Option Name</label>
              <input style={inputStyle} value={opt.name} onChange={(e) => updateOption(i, "name", e.target.value)} placeholder="e.g. Economy Sedan" />
            </div>
            <div>
              <label style={labelStyle}>Badge Label</label>
              <input style={inputStyle} value={opt.badge} onChange={(e) => updateOption(i, "badge", e.target.value)} placeholder="e.g. Best Seller" />
            </div>
          </div>
          <div style={S.row3}>
            <div>
              <label style={labelStyle}>Price</label>
              <input style={inputStyle} value={opt.price} onChange={(e) => updateOption(i, "price", e.target.value)} placeholder="e.g. PKR 5,000" />
            </div>
            <div>
              <label style={labelStyle}>Period / Unit</label>
              <input style={inputStyle} value={opt.period} onChange={(e) => updateOption(i, "period", e.target.value)} placeholder="e.g. per day" />
            </div>
            <div>
              <label style={labelStyle}>Capacity</label>
              <input style={inputStyle} value={opt.capacity} onChange={(e) => updateOption(i, "capacity", e.target.value)} placeholder="e.g. 4 Passengers" />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Description</label>
            <textarea style={{ ...S.textarea, minHeight: 70 }} value={opt.desc} onChange={(e) => updateOption(i, "desc", e.target.value)} placeholder="Short description of this option..." />
          </div>
        </div>
      ))}
      <button type="button" style={S.addBtn} onClick={addOption}>+ Add Pricing Option</button>

      {/* Gallery */}
      <div style={S.sectionTitle}>Gallery Images</div>
      {form.gallery.map((url, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input style={{ ...inputStyle, flex: 1 }} value={url} onChange={(e) => updateGallery(i, e.target.value)} placeholder="https://..." />
          <button type="button" style={S.removeBtn} onClick={() => removeGallery(i)}>Remove</button>
        </div>
      ))}
      <button type="button" style={S.addBtn} onClick={addGallery}>+ Add Gallery Image</button>

      {/* Submit */}
      <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid #eee" }}>
        <button type="submit" disabled={saving} style={{ ...S.submitBtn, background: saving ? "#888" : "#111" }}>
          {saving ? "Saving..." : mode === "edit" ? "Save Changes" : "Create"}
        </button>
        <button type="button" style={S.cancelBtn} onClick={() => router.push(backPath)}>
          Cancel
        </button>
      </div>
    </form>
  );
}
