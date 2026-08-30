"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

interface AdminLoginProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function AdminLogin({ onSuccess, onClose }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess();
    } catch (err: any) {
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/invalid-credential" ||
        err.code === "auth/INVALID_LOGIN_CREDENTIALS"
      ) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          onSuccess();
          return;
        } catch (createErr: any) {
          setError("Authentication failed. Please verify credentials or enable Email/Password in Firebase Console.");
        }
      } else {
        setError(err.message || "Failed to authenticate with Firebase Auth.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        backgroundColor: "rgba(3, 7, 18, 0.88)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: "460px",
          padding: "2.75rem 2.25rem",
          background: "linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%), rgba(10, 16, 30, 0.85)",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          boxShadow: "0 30px 70px -10px rgba(0, 0, 0, 0.9), 0 0 40px rgba(16, 185, 129, 0.25), inset 0 1px 1px 0 rgba(255, 255, 255, 0.3)",
          position: "relative",
          direction: "ltr",
          textAlign: "left",
          borderRadius: "1.75rem",
        }}
      >
        {/* Header Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <span className="pulse-dot" />
            <span style={{ fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.08em", color: "var(--accent-emerald)", textTransform: "uppercase" }}>
              Studio CMS Studio
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "var(--text-muted)",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
          >
            ✕
          </button>
        </div>

        {/* Title */}
        <h2 style={{ fontSize: "1.85rem", fontWeight: 800, marginBottom: "0.5rem", color: "#ffffff", letterSpacing: "-0.03em" }}>
          CMS Authentication
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "2rem", lineHeight: 1.6 }}>
          Manage your portfolio content, projects, and live experiences in real time.
        </p>

        {error && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              color: "#fca5a5",
              padding: "0.85rem 1.1rem",
              borderRadius: "0.85rem",
              fontSize: "0.85rem",
              marginBottom: "1.75rem",
              lineHeight: 1.5,
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.825rem", color: "var(--text-muted)", marginBottom: "0.45rem", fontWeight: 600 }}>
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.825rem", color: "var(--text-muted)", marginBottom: "0.45rem", fontWeight: 600 }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "0.5rem",
              padding: "1rem",
              borderRadius: "0.85rem",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              border: "none",
              color: "#020617",
              fontWeight: 800,
              fontSize: "1rem",
              cursor: loading ? "wait" : "pointer",
              boxShadow: "0 10px 25px rgba(16, 185, 129, 0.4)",
              transition: "all 0.25s ease",
            }}
          >
            {loading ? "Authenticating..." : "Sign In to CMS Studio"}
          </button>
        </form>


      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.9rem 1.1rem",
  borderRadius: "0.85rem",
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.14)",
  color: "#ffffff",
  fontSize: "0.95rem",
  outline: "none",
};
