"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at center, #1e293b 0%, #0f172a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "#0f172a",
          border: "1px solid #334155",
          borderRadius: "8px",
          padding: "44px 36px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(37, 99, 235, 0.15)",
        }}
      >
        {/* Logo/Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link href="/" style={{ display: "inline-block", marginBottom: "16px" }}>
            <img
              src="/arizona-logo.png"
              alt="Arizona International Group"
              style={{
                height: "56px",
                width: "auto",
                objectFit: "contain",
              }}
            />
          </Link>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(37, 99, 235, 0.2)",
              color: "#93c5fd",
              border: "1px solid rgba(59, 130, 246, 0.35)",
              padding: "4px 12px",
              borderRadius: "14px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            <ShieldCheck size={13} color="#60a5fa" />
            Executive Admin Portal
          </div>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
            Sign in to access corporate CMS & management tools
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                color: "#e2e8f0",
                marginBottom: "6px",
                letterSpacing: "0.04em",
              }}
            >
              Administrator Email
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@arizonaintlgroup.com"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "4px",
                  fontSize: "13px",
                  color: "#ffffff",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                color: "#e2e8f0",
                marginBottom: "6px",
                letterSpacing: "0.04em",
              }}
            >
              Security Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••••••"
              style={{
                width: "100%",
                padding: "12px 14px",
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "4px",
                fontSize: "13px",
                color: "#ffffff",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                marginBottom: "20px",
                padding: "10px 14px",
                background: "rgba(220, 38, 38, 0.15)",
                border: "1px solid rgba(220, 38, 38, 0.4)",
                color: "#fca5a5",
                fontSize: "12px",
                borderRadius: "4px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px 0",
              background: loading ? "rgba(37, 99, 235, 0.6)" : "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "4px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.04em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
            }}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                Sign In to Admin Portal
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        <div
          style={{
            marginTop: "28px",
            paddingTop: "20px",
            borderTop: "1px solid #1e293b",
            fontSize: "11px",
            color: "#64748b",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <Lock size={12} color="#60a5fa" />
          Restricted Access &bull; 256-Bit Encrypted Admin Session
        </div>
      </div>
    </div>
  );
}
