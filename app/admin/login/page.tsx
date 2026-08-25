"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div style={{ minHeight: "100vh", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ width: 380, background: "#fff", border: "1px solid #e0e0e0", padding: "40px 36px" }}>

        {/* Logo/Brand */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#c9a227", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
            Arizona International Group
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111", margin: 0 }}>
            Admin Portal
          </h1>
          <p style={{ fontSize: 13, color: "#777", marginTop: 4 }}>
            Sign in to manage content
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#444", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@arizonaintlgroup.com"
              style={{ width: "100%", padding: "10px 12px", border: "1px solid #d0d0d0", fontSize: 14, color: "#111", background: "#fff", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#444", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{ width: "100%", padding: "10px 12px", border: "1px solid #d0d0d0", fontSize: 14, color: "#111", background: "#fff", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {error && (
            <div style={{ marginBottom: 16, padding: "10px 12px", background: "#fff0f0", border: "1px solid #ffcccc", color: "#c00", fontSize: 13 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "11px 0", background: loading ? "#aaa" : "#111", color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", letterSpacing: "0.05em", textTransform: "uppercase" }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid #eee", fontSize: 12, color: "#aaa", textAlign: "center" }}>
          Restricted Access — Authorized Personnel Only
        </div>
      </div>
    </div>
  );
}
