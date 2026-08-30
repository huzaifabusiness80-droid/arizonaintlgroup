"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  PhoneCall,
  CreditCard,
  Banknote,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Loader2,
  MapPin,
  Mail,
  User,
  Phone,
  Building2,
  Sparkles,
  Navigation,
  Copy,
  Check,
  Smartphone,
  Wallet,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGeoLocation } from "@/context/GeoContext";
import { ServiceOptionItem } from "./DetailContentLayout";
import { getLocalizedPrice } from "@/lib/pricing-helper";

interface ProductOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  categoryTag?: string;
  heroImage?: string;
  startingPrice?: string;
  startingPricePkr?: string;
  startingPriceBhd?: string;
  serviceOptions?: ServiceOptionItem[];
}

export default function ProductOrderModal({
  isOpen,
  onClose,
  title,
  categoryTag,
  heroImage,
  startingPrice = "",
  startingPricePkr,
  startingPriceBhd,
  serviceOptions = [],
}: ProductOrderModalProps) {
  const { isArabic } = useLanguage();
  const { contact, isPakistan } = useGeoLocation();

  // Selected option / variant
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("cod");
  const [deliveryZone, setDeliveryZone] = useState<"local" | "standard">("local");

  // Form Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [whatsAppLink, setWhatsAppLink] = useState("");

  // Copy States
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setOrderCompleted(false);
      setSelectedOptionIdx(0);
      setPaymentMethod("cod");
      setDeliveryZone("local");
      setCopiedKey(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentOption = serviceOptions[selectedOptionIdx];

  const effectivePrice = currentOption
    ? getLocalizedPrice(
        {
          pricePkr: currentOption.pricePkr,
          priceBhd: currentOption.priceBhd,
          price: currentOption.price,
        },
        isPakistan
      )
    : isPakistan
    ? startingPricePkr || getLocalizedPrice({ price: startingPrice }, true)
    : startingPriceBhd || getLocalizedPrice({ price: startingPrice }, false);

  const deliveryChargeText =
    deliveryZone === "local"
      ? isArabic
        ? "مجانًا (ضمن نطاق 25 كم من دولتالہ)"
        : "FREE (Within 25 KM of Daultala)"
      : isArabic
      ? "250 روبية (خارج نطاق 25 كم / شحن لكافة المناطق)"
      : "PKR 250 (Outside 25 KM / Nationwide Delivery)";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert(isArabic ? "يرجى ملء الاسم ورقم الهاتف" : "Please enter your name and phone number.");
      return;
    }

    setSubmitting(true);
    const refCode = `AZ-${Date.now().toString().slice(-6)}`;
    setOrderRef(refCode);

    const variantName = currentOption ? currentOption.name : "Standard Edition";
    const paymentLabel =
      paymentMethod === "online"
        ? isArabic
          ? "دفع إلكتروني (EasyPaisa / JazzCash / Faysal Bank IBAN)"
          : "Online Payment (EasyPaisa / JazzCash / Faysal Bank IBAN)"
        : isArabic
        ? "الدفع عند الاستلام (COD)"
        : "Cash on Delivery (COD)";

    const formattedMessage = `🛒 *NEW ORDER - ARIZONA INTERNATIONAL*
──────────────────────────────
📦 *Product / Service:* ${title}
🏷️ *Variant / Option:* ${variantName}
💰 *Product Price:* ${effectivePrice || "Contact for Quote"}
🚚 *Delivery Charges:* ${deliveryChargeText}
💳 *Payment Method:* ${paymentLabel}

👤 *Customer Details:*
• *Name:* ${name.trim()}
• *Phone:* ${phone.trim()}
• *Email:* ${email.trim() || "Not provided"}
• *Delivery Address:* ${address.trim() || "City Center"}, ${city.trim() || (isPakistan ? "Pakistan" : "Bahrain")}
• *Delivery Zone:* ${deliveryZone === "local" ? "Within 25 KM of Daultala (FREE Delivery)" : "Outside 25 KM (PKR 250 Charges)"}
• *Country:* ${isPakistan ? "Pakistan 🇵🇰" : "Kingdom of Bahrain 🇧🇭"}

📝 *Special Instructions:* ${notes.trim() || "None"}
──────────────────────────────
🔖 *Reference ID:* ${refCode}`;

    const waUrl = contact.whatsappLink(formattedMessage);
    setWhatsAppLink(waUrl);

    try {
      // Save order into database
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          service: `[Order: ${title}] - ${variantName} (${paymentMethod === "online" ? "Online Pay" : "COD"}) [${deliveryZone === "local" ? "Free 25km Delivery" : "PKR 250 Delivery"}]`,
          message: formattedMessage,
          country: isPakistan ? "Pakistan" : "Bahrain",
        }),
      });
    } catch (err) {
      console.error("Failed to save order to database:", err);
    } finally {
      setSubmitting(false);
      setOrderCompleted(true);

      // Open WhatsApp automatically
      if (typeof window !== "undefined") {
        window.open(waUrl, "_blank");
      }
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "16px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !submitting) onClose();
      }}
    >
      <div
        style={{
          background: "#ffffff",
          width: "100%",
          maxWidth: "640px",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
          overflow: "hidden",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "18px 22px",
            background: "#0f172a",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #2563eb",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "6px",
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <Truck size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}>
                {isArabic ? "طلب وحجز فوري عبر الواتساب" : "Order & Direct WhatsApp Booking"}
              </h2>
              <p style={{ fontSize: "12px", color: "#94a3b8", margin: "2px 0 0 0" }}>
                {isArabic
                  ? "اختر طريقة الدفع وأدخل بيانات التوصيل للمتابعة فوراً"
                  : "Select payment method & delivery radius to place your order"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={submitting}
            style={{
              background: "transparent",
              border: "none",
              color: "#94a3b8",
              cursor: "pointer",
              padding: "6px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1 }}>
          {orderCompleted ? (
            /* Confirmation Success State */
            <div style={{ textAlign: "center", padding: "24px 12px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "#dcfce7",
                  color: "#16a34a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px auto",
                }}
              >
                <CheckCircle2 size={32} />
              </div>

              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                {isArabic ? "تم استلام طلبك بنجاح!" : "Order Submitted Successfully!"}
              </h3>
              <p style={{ fontSize: "13px", color: "#64748b", maxWidth: "440px", margin: "0 auto 16px auto" }}>
                {isArabic
                  ? `تم حفظ الطلب برقم المرجع #${orderRef}. تم فتح محادثة الواتساب مع مستشارك لتأكيد الشحن والتسليم.`
                  : `Your order #${orderRef} has been recorded. WhatsApp has been opened with your pre-filled order details.`}
              </p>

              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  padding: "14px 18px",
                  marginBottom: "20px",
                  textAlign: "left",
                  fontSize: "12px",
                  color: "#334155",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ color: "#64748b" }}>{isArabic ? "المنتج:" : "Item:"}</span>
                  <strong style={{ color: "#0f172a" }}>{title}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ color: "#64748b" }}>{isArabic ? "رسوم التوصيل:" : "Delivery Charges:"}</span>
                  <strong style={{ color: deliveryZone === "local" ? "#16a34a" : "#2563eb" }}>
                    {deliveryZone === "local" ? "FREE (Within 25 KM of Daultala)" : "PKR 250 (Outside 25 KM)"}
                  </strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ color: "#64748b" }}>{isArabic ? "طريقة الدفع:" : "Payment:"}</span>
                  <strong style={{ color: "#2563eb" }}>
                    {paymentMethod === "online" ? "Online Payment (Bank / EasyPaisa / JazzCash)" : "Cash on Delivery (COD)"}
                  </strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#64748b" }}>{isArabic ? "السعر:" : "Product Price:"}</span>
                  <strong style={{ color: "#059669", fontSize: "14px" }}>{effectivePrice}</strong>
                </div>
              </div>

              {/* Online Payment Details (If Chosen) */}
              {paymentMethod === "online" && (
                <div
                  style={{
                    background: "#f0fdf4",
                    border: "1px solid #86efac",
                    borderRadius: "6px",
                    padding: "14px 16px",
                    marginBottom: "20px",
                    textAlign: "left",
                  }}
                >
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#166534", marginBottom: "8px" }}>
                    💳 {isArabic ? "بيانات التحويل البنكي وحسابات الدفع:" : "Official Payment Accounts for Transfer:"}
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {/* EasyPaisa */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "#ffffff",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        border: "1px solid #bbf7d0",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: "11px", fontWeight: 700, color: "#15803d" }}>EasyPaisa Account:</div>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", fontFamily: "monospace" }}>03135921434</div>
                      </div>
                      <button
                        onClick={() => copyToClipboard("03135921434", "ep")}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "4px 8px",
                          background: copiedKey === "ep" ? "#dcfce7" : "#f1f5f9",
                          border: "1px solid #cbd5e1",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: 600,
                          cursor: "pointer",
                          color: copiedKey === "ep" ? "#16a34a" : "#334155",
                        }}
                      >
                        {copiedKey === "ep" ? <Check size={12} /> : <Copy size={12} />}
                        {copiedKey === "ep" ? "Copied" : "Copy"}
                      </button>
                    </div>

                    {/* JazzCash */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "#ffffff",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        border: "1px solid #bbf7d0",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: "11px", fontWeight: 700, color: "#b91c1c" }}>JazzCash Account:</div>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", fontFamily: "monospace" }}>03029795921</div>
                      </div>
                      <button
                        onClick={() => copyToClipboard("03029795921", "jc")}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "4px 8px",
                          background: copiedKey === "jc" ? "#dcfce7" : "#f1f5f9",
                          border: "1px solid #cbd5e1",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: 600,
                          cursor: "pointer",
                          color: copiedKey === "jc" ? "#16a34a" : "#334155",
                        }}
                      >
                        {copiedKey === "jc" ? <Check size={12} /> : <Copy size={12} />}
                        {copiedKey === "jc" ? "Copied" : "Copy"}
                      </button>
                    </div>

                    {/* Faysal Bank IBAN */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "#ffffff",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        border: "1px solid #bbf7d0",
                      }}
                    >
                      <div style={{ maxWidth: "75%" }}>
                        <div style={{ fontSize: "11px", fontWeight: 700, color: "#1e40af" }}>Faysal Bank Limited (IBAN):</div>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", fontFamily: "monospace", wordBreak: "break-all" }}>
                          PK17FAYS3664301000000533
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard("PK17FAYS3664301000000533", "iban")}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "4px 8px",
                          background: copiedKey === "iban" ? "#dcfce7" : "#f1f5f9",
                          border: "1px solid #cbd5e1",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: 600,
                          cursor: "pointer",
                          color: copiedKey === "iban" ? "#16a34a" : "#334155",
                        }}
                      >
                        {copiedKey === "iban" ? <Check size={12} /> : <Copy size={12} />}
                        {copiedKey === "iban" ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>

                  <p style={{ fontSize: "11px", color: "#166534", margin: "8px 0 0 0", lineHeight: "1.4" }}>
                    ℹ️ {isArabic
                      ? "يرجى إرسال إيصال التحويل عبر محادثة الواتساب المفتوحة لتأكيد المعالجة فوراً."
                      : "Please send payment receipt / screenshot on the WhatsApp chat to confirm instant dispatch."}
                  </p>
                </div>
              )}

              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                {whatsAppLink && (
                  <a
                    href={whatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 20px",
                      background: "#2563eb",
                      color: "#ffffff",
                      borderRadius: "4px",
                      fontSize: "13px",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <PhoneCall size={15} />
                    {isArabic ? "فتح الواتساب مرة أخرى" : "Re-open WhatsApp Chat"}
                  </a>
                )}
                <button
                  onClick={onClose}
                  style={{
                    padding: "10px 18px",
                    background: "#f1f5f9",
                    border: "1px solid #cbd5e1",
                    color: "#334155",
                    borderRadius: "4px",
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  {isArabic ? "إغلاق" : "Close"}
                </button>
              </div>
            </div>
          ) : (
            /* Order Input Form */
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Product Summary Header Card */}
              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                {heroImage ? (
                  <img
                    src={heroImage}
                    alt={title}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      border: "1px solid #cbd5e1",
                      background: "#ffffff",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "4px",
                      background: "#e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#64748b",
                      flexShrink: 0,
                    }}
                  >
                    <Building2 size={24} />
                  </div>
                )}

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#2563eb",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {categoryTag || "Official Service"}
                  </div>
                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#0f172a",
                      margin: "2px 0 4px 0",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {title}
                  </h3>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#059669" }}>
                    {effectivePrice || "Special Pricing"}
                  </div>
                </div>
              </div>

              {/* Delivery Policy Highlights Banner */}
              <div
                style={{
                  background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
                  border: "1px solid #bbf7d0",
                  borderRadius: "6px",
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <Truck size={20} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#166534" }}>
                    🚚 {isArabic ? "سياسة التوصيل والشحن:" : "Delivery Policy & Coverage:"}
                  </div>
                  <div style={{ fontSize: "11px", color: "#15803d", marginTop: "2px", lineHeight: "1.4" }}>
                    • <strong>{isArabic ? "توصيل مجاني 100%" : "FREE Home Delivery"}</strong>{" "}
                    {isArabic
                      ? "ضمن مسافة 25 كم من دولتالہ (Daultala)."
                      : "within 25 KM radius of Daultala / local area."}
                    <br />
                    • <strong>{isArabic ? "رسوم الشحن:" : "Delivery Charges:"}</strong>{" "}
                    {isArabic
                      ? "250 روبية فقط للتوصيل خارج 25 كم ولكافة المدن."
                      : "Only PKR 250 for delivery outside 25 KM radius."}
                  </div>
                </div>
              </div>

              {/* Delivery Radius Selection */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#334155",
                    marginBottom: "8px",
                  }}
                >
                  {isArabic ? "اختر منطقة التوصيل:" : "Select Delivery Location / Radius:"}
                </label>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {/* Within 25 KM Daultala - FREE */}
                  <div
                    onClick={() => setDeliveryZone("local")}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "6px",
                      border: deliveryZone === "local" ? "2px solid #16a34a" : "1px solid #cbd5e1",
                      background: deliveryZone === "local" ? "#f0fdf4" : "#ffffff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: deliveryZone === "local" ? "#16a34a" : "#f1f5f9",
                        color: deliveryZone === "local" ? "#ffffff" : "#64748b",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Navigation size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>
                        {isArabic ? "ضمن 25 كم (دولتالہ)" : "Within 25 KM"}
                      </div>
                      <div style={{ fontSize: "11px", color: "#16a34a", fontWeight: 700, marginTop: "2px" }}>
                        {isArabic ? "توصيل مجاني (0 روبية)" : "FREE Delivery (PKR 0)"}
                      </div>
                    </div>
                  </div>

                  {/* Outside 25 KM - PKR 250 */}
                  <div
                    onClick={() => setDeliveryZone("standard")}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "6px",
                      border: deliveryZone === "standard" ? "2px solid #2563eb" : "1px solid #cbd5e1",
                      background: deliveryZone === "standard" ? "#eff6ff" : "#ffffff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: deliveryZone === "standard" ? "#2563eb" : "#f1f5f9",
                        color: deliveryZone === "standard" ? "#ffffff" : "#64748b",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Truck size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>
                        {isArabic ? "خارج 25 كم" : "Outside 25 KM"}
                      </div>
                      <div style={{ fontSize: "11px", color: "#2563eb", fontWeight: 700, marginTop: "2px" }}>
                        {isArabic ? "+ 250 روبية توصيل" : "+ PKR 250 Delivery Charges"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Options / Storage / Variants (If Available) */}
              {serviceOptions.length > 0 && (
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#334155",
                      marginBottom: "6px",
                    }}
                  >
                    {isArabic ? "اختر الباقة / الموديل / السعة:" : "Select Variant / Storage / Option:"}
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    {serviceOptions.map((opt, idx) => {
                      const isSelected = selectedOptionIdx === idx;
                      const optPrice = getLocalizedPrice(
                        {
                          pricePkr: opt.pricePkr,
                          priceBhd: opt.priceBhd,
                          price: opt.price,
                        },
                        isPakistan
                      );

                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedOptionIdx(idx)}
                          style={{
                            padding: "9px 12px",
                            borderRadius: "4px",
                            border: isSelected ? "2px solid #2563eb" : "1px solid #cbd5e1",
                            background: isSelected ? "#eff6ff" : "#ffffff",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                        >
                          <div style={{ fontSize: "12px", fontWeight: 600, color: "#0f172a" }}>
                            {opt.name}
                          </div>
                          {optPrice && (
                            <div style={{ fontSize: "11px", color: "#2563eb", fontWeight: 600, marginTop: "2px" }}>
                              {optPrice}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Payment Method Selector */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#334155",
                    marginBottom: "8px",
                  }}
                >
                  {isArabic ? "طريقة الدفع المطلوبة:" : "Select Payment Method:"}
                </label>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {/* Cash On Delivery */}
                  <div
                    onClick={() => setPaymentMethod("cod")}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "6px",
                      border: paymentMethod === "cod" ? "2px solid #2563eb" : "1px solid #cbd5e1",
                      background: paymentMethod === "cod" ? "#eff6ff" : "#ffffff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: paymentMethod === "cod" ? "#2563eb" : "#f1f5f9",
                        color: paymentMethod === "cod" ? "#ffffff" : "#64748b",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Banknote size={17} />
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>
                        {isArabic ? "الدفع عند الاستلام" : "Cash on Delivery"}
                      </div>
                      <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>
                        {isArabic ? "ادفع نقداً عند التوصيل لبابك" : "Pay cash upon doorstep delivery"}
                      </div>
                    </div>
                  </div>

                  {/* Online Payment */}
                  <div
                    onClick={() => setPaymentMethod("online")}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "6px",
                      border: paymentMethod === "online" ? "2px solid #2563eb" : "1px solid #cbd5e1",
                      background: paymentMethod === "online" ? "#eff6ff" : "#ffffff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: paymentMethod === "online" ? "#2563eb" : "#f1f5f9",
                        color: paymentMethod === "online" ? "#ffffff" : "#64748b",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <CreditCard size={17} />
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>
                        {isArabic ? "دفع إلكتروني / تحويل" : "Online Payment"}
                      </div>
                      <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>
                        {isArabic ? "EasyPaisa / JazzCash / Faysal Bank" : "EasyPaisa, JazzCash & Faysal Bank IBAN"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Online Payment Details Box (Expands if Online Payment is selected) */}
              {paymentMethod === "online" && (
                <div
                  style={{
                    background: "#f8fafc",
                    border: "2px solid #3b82f6",
                    borderRadius: "6px",
                    padding: "14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.08)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#1e40af" }}>
                    <Wallet size={16} />
                    <span style={{ fontSize: "12px", fontWeight: 700 }}>
                      {isArabic ? "حسابات التحويل المعتمدة (اضغط للنسخ):" : "Official Transfer Accounts (Click to Copy):"}
                    </span>
                  </div>

                  {/* 1. EasyPaisa */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "#ffffff",
                      padding: "9px 12px",
                      borderRadius: "4px",
                      border: "1px solid #cbd5e1",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "#22c55e",
                        }}
                      />
                      <div>
                        <div style={{ fontSize: "11px", fontWeight: 700, color: "#16a34a" }}>
                          EasyPaisa Account:
                        </div>
                        <div style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", fontFamily: "monospace" }}>
                          03135921434
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard("03135921434", "ep-form")}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "5px 10px",
                        background: copiedKey === "ep-form" ? "#dcfce7" : "#eff6ff",
                        border: "1px solid #93c5fd",
                        borderRadius: "4px",
                        fontSize: "11px",
                        fontWeight: 600,
                        cursor: "pointer",
                        color: copiedKey === "ep-form" ? "#16a34a" : "#1d4ed8",
                      }}
                    >
                      {copiedKey === "ep-form" ? <Check size={13} /> : <Copy size={13} />}
                      {copiedKey === "ep-form" ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  {/* 2. JazzCash */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "#ffffff",
                      padding: "9px 12px",
                      borderRadius: "4px",
                      border: "1px solid #cbd5e1",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "#dc2626",
                        }}
                      />
                      <div>
                        <div style={{ fontSize: "11px", fontWeight: 700, color: "#dc2626" }}>
                          JazzCash Account:
                        </div>
                        <div style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", fontFamily: "monospace" }}>
                          03029795921
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard("03029795921", "jc-form")}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "5px 10px",
                        background: copiedKey === "jc-form" ? "#dcfce7" : "#eff6ff",
                        border: "1px solid #93c5fd",
                        borderRadius: "4px",
                        fontSize: "11px",
                        fontWeight: 600,
                        cursor: "pointer",
                        color: copiedKey === "jc-form" ? "#16a34a" : "#1d4ed8",
                      }}
                    >
                      {copiedKey === "jc-form" ? <Check size={13} /> : <Copy size={13} />}
                      {copiedKey === "jc-form" ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  {/* 3. Faysal Bank IBAN */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "#ffffff",
                      padding: "9px 12px",
                      borderRadius: "4px",
                      border: "1px solid #cbd5e1",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", maxWidth: "75%" }}>
                      <span
                        style={{
                          display: "inline-block",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "#2563eb",
                        }}
                      />
                      <div>
                        <div style={{ fontSize: "11px", fontWeight: 700, color: "#1e40af" }}>
                          Faysal Bank Limited (IBAN):
                        </div>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", fontFamily: "monospace", wordBreak: "break-all" }}>
                          PK17FAYS3664301000000533
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard("PK17FAYS3664301000000533", "iban-form")}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "5px 10px",
                        background: copiedKey === "iban-form" ? "#dcfce7" : "#eff6ff",
                        border: "1px solid #93c5fd",
                        borderRadius: "4px",
                        fontSize: "11px",
                        fontWeight: 600,
                        cursor: "pointer",
                        color: copiedKey === "iban-form" ? "#16a34a" : "#1d4ed8",
                      }}
                    >
                      {copiedKey === "iban-form" ? <Check size={13} /> : <Copy size={13} />}
                      {copiedKey === "iban-form" ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  <p style={{ fontSize: "11px", color: "#475569", margin: "2px 0 0 0", lineHeight: "1.4" }}>
                    💡 {isArabic
                      ? "قم بتحويل المبلغ إلى أي حساب أعلاه، ثم اضغط 'تأكيد الطلب' لمشاركة إيصال الدفع عبر الواتساب."
                      : "Transfer amount to any account above, then click 'Confirm Order' to share receipt screenshot on WhatsApp."}
                  </p>
                </div>
              )}

              {/* Customer Contact & Address Inputs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#475569",
                      marginBottom: "4px",
                    }}
                  >
                    {isArabic ? "الاسم بالكامل *" : "Full Name *"}
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isArabic ? "أحمد علي" : "John Doe"}
                      style={{
                        width: "100%",
                        padding: "9px 10px 9px 30px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "4px",
                        fontSize: "12px",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                    <User
                      size={14}
                      color="#94a3b8"
                      style={{ position: "absolute", left: "9px", top: "11px" }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#475569",
                      marginBottom: "4px",
                    }}
                  >
                    {isArabic ? "رقم الواتساب / الهاتف *" : "WhatsApp / Phone *"}
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={isPakistan ? "+92 300 1234567" : "+973 3230 6963"}
                      style={{
                        width: "100%",
                        padding: "9px 10px 9px 30px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "4px",
                        fontSize: "12px",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                    <Phone
                      size={14}
                      color="#94a3b8"
                      style={{ position: "absolute", left: "9px", top: "11px" }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#475569",
                      marginBottom: "4px",
                    }}
                  >
                    {isArabic ? "البريد الإلكتروني" : "Email Address"}
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@example.com"
                      style={{
                        width: "100%",
                        padding: "9px 10px 9px 30px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "4px",
                        fontSize: "12px",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                    <Mail
                      size={14}
                      color="#94a3b8"
                      style={{ position: "absolute", left: "9px", top: "11px" }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#475569",
                      marginBottom: "4px",
                    }}
                  >
                    {isArabic ? "المدينة / المنطقة" : "City / Area"}
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder={isPakistan ? "Daultala / Gujar Khan / Rawalpindi" : "Manama / Riffa"}
                      style={{
                        width: "100%",
                        padding: "9px 10px 9px 30px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "4px",
                        fontSize: "12px",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                    <MapPin
                      size={14}
                      color="#94a3b8"
                      style={{ position: "absolute", left: "9px", top: "11px" }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#475569",
                    marginBottom: "4px",
                  }}
                >
                  {isArabic ? "عنوان التوصيل الكامل" : "Full Delivery Address / Street Details"}
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={
                    isArabic
                      ? "رقم المبنى، الشارع، المجمع السكني..."
                      : "House/Building number, Street, Area/Mohallah..."
                  }
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "4px",
                    fontSize: "12px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#475569",
                    marginBottom: "4px",
                  }}
                >
                  {isArabic ? "ملاحظات إضافية (اختياري)" : "Special Notes / Instructions (Optional)"}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    isArabic
                      ? "مثال: يرجى التوصيل بعد الساعة 4 مساءً"
                      : "e.g., Please deliver after 4 PM, call before arrival"
                  }
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "4px",
                    fontSize: "12px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "12px 0",
                  background: submitting ? "#93c5fd" : "#2563eb",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: submitting ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)",
                  marginTop: "6px",
                  transition: "background 0.2s ease",
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {isArabic ? "جاري تجهيز الطلب..." : "Processing Order..."}
                  </>
                ) : (
                  <>
                    <PhoneCall size={16} />
                    {isArabic ? "تأكيد الطلب والإرسال عبر الواتساب" : "Confirm Order & Send via WhatsApp"}
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Modal Footer Guarantee */}
        <div
          style={{
            padding: "12px 24px",
            background: "#f8fafc",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "11px",
            color: "#64748b",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <ShieldCheck size={14} color="#16a34a" />
            <span>{isArabic ? "ضمان رسمي 100% وأمان معتمد" : "100% Genuine Guaranteed & Secure Delivery"}</span>
          </div>
          <span>Daultala Hub &bull; Arizona International</span>
        </div>
      </div>
    </div>
  );
}
